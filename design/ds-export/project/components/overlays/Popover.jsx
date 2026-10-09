import React, { useEffect, useLayoutEffect, useRef } from "react";

/**
 * Popover — 앵커에 붙는 작은 오버레이 껍데기. 위치·면·닫기·포커스만 맡고, 안의 내용은 쓰는 쪽이 정한다.
 *  AnswerCard의 MenuPopover(공유·더보기)와 menuItemStyle을 이 부품으로 흡수한다. Badge의 "+N 펼침"은
 *  넣지 않는다 — 그건 "본다"(정적 펼침)이고 이건 "고른다"(role="menu", 동작이 일어남), 성격이 다르다.
 *  Badge "+N"이 MentorCard 미디어 오버레이 안에서 overflow에 잘리는 문제(DS-06)는 별도 대기 항목이다.
 *
 *  렌더 위치: position:relative인 트리거의 형제로 놓는다 —
 *  AnswerCard처럼 <div style={{position:"relative"}}><IconButton/><Popover/></div> 형태.
 *
 *  DS-74 — top layer. 열리면 내용 요소에 popover="manual"을 주고 showPopover()로 연다 → 조상의 overflow·z-index에
 *   잘리지 않는다(모달 본문·푸터 밑에 묻히지 않는다). 좌표는 트리거 rect로 계산한 position:fixed(UA의 inset·margin을 지운다).
 *   style.width가 "100%"면 트리거 폭으로 바꾼다. 위·아래는 창 기준으로 뒤집는다: 요청한 쪽 공간(창 끝 − 트리거 − 8)이
 *   목록 높이보다 작고 반대쪽이 더 크면 반대로. 둘 다 모자라면 큰 쪽에 붙이고 max-height를 그 공간에 맞춘다.
 *   조상 어디의 스크롤이든(capture) · 창 크기 변화에 다시 계산하고, 트리거가 보이는 곳 밖으로 나가면 닫는다.
 *   DOM 자리는 그대로(트리거의 형제) — Dialog의 포커스 가두기와 바깥 클릭 판정이 지금처럼 먹는다.
 *   showPopover가 없는 브라우저는 이전의 absolute 방식.
 *
 *  ⚠️ 모바일 분기는 이 부품의 책임이 아니다 — "공유는 PC에서 클립보드 카피, 모바일에서는 OS공유"라는
 *  와이어대로, 모바일에서 공유를 누르면 이 Popover가 아니라 OS 공유(navigator.share)가 떠야 한다.
 *  그 분기는 화면·카드가 정한다. Popover는 "연다"고 결정된 뒤에만 쓰인다 — 이 분기가 없으면 모바일에서
 *  Popover와 OS공유가 같이 뜬다. 둘 다 안 되는 브라우저의 폴백(클립보드 복사+토스트)은 DS-09(아직 없음).
 */

const GAP = 4;
const EDGE = 8;
const TOP_LAYER = typeof HTMLElement !== "undefined" && typeof HTMLElement.prototype.showPopover === "function";

// 트리거가 스크롤로 보이는 곳 밖으로 나갔는가 — 창과 overflow가 visible이 아닌 조상 모두를 본다.
function clippedOut(el) {
  const r = el.getBoundingClientRect();
  if (r.bottom <= 0 || r.top >= window.innerHeight || r.right <= 0 || r.left >= window.innerWidth) return true;
  for (let p = el.parentElement; p && p !== document.body && p !== document.documentElement; p = p.parentElement) {
    const cs = getComputedStyle(p);
    if (cs.overflowX === "visible" && cs.overflowY === "visible") continue;
    const pr = p.getBoundingClientRect();
    if (r.bottom <= pr.top || r.top >= pr.bottom || r.right <= pr.left || r.left >= pr.right) return true;
  }
  return false;
}

export function Popover({
  open,
  onClose,
  side = "bottom",
  align = "start",
  minWidth = 168,
  role,
  triggerRef,
  style,
  children,
  ...rest
}) {
  const ref = useRef(null);
  const wasOpen = useRef(open);
  const onCloseRef = useRef(onClose);
  onCloseRef.current = onClose;

  useEffect(() => {
    if (!open) return;
    const onPointerDown = (e) => { if (ref.current && !ref.current.contains(e.target)) onClose && onClose(); };
    const onKeyDown = (e) => { if (e.key === "Escape") onClose && onClose(); };
    document.addEventListener("pointerdown", onPointerDown);
    document.addEventListener("keydown", onKeyDown);
    return () => {
      document.removeEventListener("pointerdown", onPointerDown);
      document.removeEventListener("keydown", onKeyDown);
    };
  }, [open, onClose]);

  // 닫히면(open: true→false) 포커스를 트리거로 되돌린다. triggerRef가 실제 포커스 가능한 노드를 가리켜야 한다.
  useEffect(() => {
    if (wasOpen.current && !open && triggerRef && triggerRef.current) {
      triggerRef.current.focus();
    }
    wasOpen.current = open;
  }, [open, triggerRef]);

  // DS-74 — top layer에 올리고 fixed 좌표를 계산한다.
  useLayoutEffect(() => {
    if (!open || !TOP_LAYER) return;
    const el = ref.current;
    if (!el) return;
    const anchorOf = () => (triggerRef && triggerRef.current) || el.parentElement;
    const capMax = style && typeof style.maxHeight === "number" ? style.maxHeight : Infinity;
    const fullWidth = style && style.width === "100%";
    try { el.showPopover(); } catch (_) {}

    let raf = 0;
    const place = () => {
      raf = 0;
      const a = anchorOf();
      if (!a) return;
      if (clippedOut(a)) { onCloseRef.current && onCloseRef.current(); return; }
      const r = a.getBoundingClientRect();
      const vw = window.innerWidth, vh = window.innerHeight;
      if (fullWidth) el.style.width = r.width + "px";
      el.style.maxHeight = capMax === Infinity ? "" : capMax + "px";
      const h = Math.min(el.scrollHeight + 2, capMax);
      const w = el.offsetWidth;
      let top, left;
      if (side === "bottom" || side === "top") {
        const below = vh - r.bottom - EDGE;
        const above = r.top - EDGE;
        let s = side;
        const want = side === "bottom" ? below : above;
        const other = side === "bottom" ? above : below;
        if (want < h + GAP && other > want) s = side === "bottom" ? "top" : "bottom";
        const room = (s === "bottom" ? below : above) - GAP;
        const hh = Math.min(h, room);
        if (hh < h) el.style.maxHeight = Math.max(0, room) + "px";
        top = s === "bottom" ? r.bottom + GAP : r.top - GAP - hh;
        left = align === "end" ? r.right - w : r.left;
      } else {
        left = side === "right" ? r.right + GAP : r.left - GAP - w;
        top = align === "end" ? r.bottom - el.offsetHeight : r.top;
      }
      left = Math.max(EDGE, Math.min(left, vw - w - EDGE));
      el.style.top = Math.round(top) + "px";
      el.style.left = Math.round(left) + "px";
    };
    place();
    const onScroll = (e) => {
      if (e.target && e.target.nodeType === 1 && el.contains(e.target)) return; // 목록 자신의 스크롤
      if (!raf) raf = requestAnimationFrame(place);
    };
    const onResize = () => { if (!raf) raf = requestAnimationFrame(place); };
    document.addEventListener("scroll", onScroll, true);
    window.addEventListener("resize", onResize);
    let ro;
    if (typeof ResizeObserver !== "undefined") { ro = new ResizeObserver(onResize); ro.observe(el); }
    return () => {
      document.removeEventListener("scroll", onScroll, true);
      window.removeEventListener("resize", onResize);
      if (ro) ro.disconnect();
      if (raf) cancelAnimationFrame(raf);
      try { el.hidePopover(); } catch (_) {}
    };
  }, [open, side, align]);

  if (!open) return null;

  const SIDE = {
    bottom: { top: "calc(100% + 4px)" },
    top: { bottom: "calc(100% + 4px)" },
    right: { left: "calc(100% + 4px)" },
    left: { right: "calc(100% + 4px)" },
  };
  const CROSS = {
    bottom: { start: { left: 0 }, end: { right: 0 } },
    top: { start: { left: 0 }, end: { right: 0 } },
    right: { start: { top: 0 }, end: { bottom: 0 } },
    left: { start: { top: 0 }, end: { bottom: 0 } },
  };
  const surface = {
    zIndex: 30,
    minWidth,
    display: "flex",
    flexDirection: "column",
    padding: 4,
    borderRadius: "var(--radius-md)",
    background: "var(--card)",
    border: "1px solid var(--border)",
    boxShadow: "var(--shadow-md)",
  };
  const pos = TOP_LAYER
    ? { position: "fixed", inset: "auto", top: 0, left: 0, margin: 0, color: "inherit", overflow: "visible", boxSizing: "border-box" }
    : { position: "absolute", ...(SIDE[side] || SIDE.bottom), ...((CROSS[side] || CROSS.bottom)[align] || CROSS.bottom.start) };
  const { width: _w, maxHeight: _mh, ...styleRest } = style || {};
  const sized = TOP_LAYER ? { ...styleRest, ...(style && style.width !== "100%" && style.width != null ? { width: style.width } : null) } : style;

  return (
    <div
      ref={ref}
      role={role}
      {...(TOP_LAYER ? { popover: "manual" } : null)}
      style={{ ...surface, ...pos, ...sized }}
      {...rest}
    >
      {children}
    </div>
  );
}

if (typeof document !== "undefined" && !document.getElementById("mt-popover-menuitem-style")) {
  const s = document.createElement("style");
  s.id = "mt-popover-menuitem-style";
  s.textContent = ".mt-popover-menuitem:hover{background:var(--secondary);}";
  document.head.appendChild(s);
}

/**
 * popoverMenuItemStyle — Popover를 메뉴로 쓸 때의 항목 레시피. className="mt-popover-menuitem"과 함께 쓴다
 *  (hover 옅은 sage는 이 클래스의 CSS가 담당 — 인라인 style만으론 hover를 표현할 수 없어서다).
 *  파괴적 항목(삭제 등)은 {...popoverMenuItemStyle, color: "var(--destructive)"}로 덮어쓴다.
 */
export const popoverMenuItemStyle = {
  display: "flex", alignItems: "center", gap: 8, width: "100%", padding: "8px 10px", border: "none",
  background: "none", borderRadius: "var(--radius-sm)", font: "inherit", fontSize: "var(--text-body)",
  lineHeight: "var(--text-body--line-height)", letterSpacing: "var(--text-body--letter-spacing)",
  color: "var(--foreground)", textAlign: "left", cursor: "pointer",
};
