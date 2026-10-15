import React, { useEffect, useLayoutEffect, useRef, useState } from "react";

/**
 * Tooltip (DS-77) — 가리키는 요소 하나에 붙는 짧은 설명. 글자만 — 누를 것이 들어가면 Popover다.
 *  열기: 마우스 300ms 뒤 · 키보드 포커스(:focus-visible) 즉시 · 터치 탭 토글(바깥 탭 · 다시 탭에 닫힘) · Esc 닫기.
 *  자리: Popover(DS-74)와 같이 top layer(popover="manual") + 트리거 rect 기준 fixed. 위에 자리가 모자라면 아래로 뒤집는다.
 *   조상의 스크롤(capture) · 창 크기에 다시 잡고, 트리거가 보이는 곳 밖으로 나가면 닫는다. showPopover가 없으면 absolute.
 *  이름: describe면 자식에 aria-describedby. 자식의 접근 이름이 content와 같으면 describe={false}(두 번 읽지 않게).
 *  면 --sage-900 · 글자 --sage-50 · caption · radius-sm · 최대 폭 240 · 꼬리. reduced-motion에서는 나타남 움직임 없음.
 */
const GAP = 8;
const EDGE = 8;
const DELAY = 300;
const TOP_LAYER = typeof HTMLElement !== "undefined" && typeof HTMLElement.prototype.showPopover === "function";

if (typeof document !== "undefined" && !document.getElementById("mt-tooltip-style")) {
  const s = document.createElement("style");
  s.id = "mt-tooltip-style";
  s.textContent =
    "@keyframes mt-tooltip-in{from{opacity:0;transform:translateY(var(--mt-tt-dy,2px))}to{opacity:1;transform:none}}" +
    ".mt-tooltip{animation:mt-tooltip-in 120ms ease-out}" +
    "@media (prefers-reduced-motion:reduce){.mt-tooltip{animation:none}}";
  document.head.appendChild(s);
}

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

export function Tooltip({ content, children, side = "top", describe = true, defaultOpen = false, style, ...rest }) {
  const [open, setOpen] = useState(!!defaultOpen);
  const [placed, setPlaced] = useState(side);
  const wrapRef = useRef(null);
  const tipRef = useRef(null);
  const tailRef = useRef(null);
  const timer = useRef(0);
  const lastTouch = useRef(0);
  const byTouch = useRef(false);
  const id = "mt-tt-" + React.useId().replace(/:/g, "");

  const clear = () => { if (timer.current) { clearTimeout(timer.current); timer.current = 0; } };
  const show = () => { clear(); setOpen(true); };
  const hide = () => { clear(); byTouch.current = false; setOpen(false); };
  useEffect(() => clear, []);

  // Esc · 터치로 연 뒤 바깥 탭
  useEffect(() => {
    if (!open) return;
    const onKey = (e) => { if (e.key === "Escape") hide(); };
    const onDown = (e) => { if (byTouch.current && wrapRef.current && !wrapRef.current.contains(e.target)) hide(); };
    document.addEventListener("keydown", onKey);
    document.addEventListener("pointerdown", onDown);
    return () => { document.removeEventListener("keydown", onKey); document.removeEventListener("pointerdown", onDown); };
  }, [open]);

  useLayoutEffect(() => {
    if (!open) return;
    const el = tipRef.current, a = wrapRef.current;
    if (!el || !a) return;
    if (TOP_LAYER) { try { el.showPopover(); } catch (_) {} }
    let raf = 0;
    const place = () => {
      raf = 0;
      if (clippedOut(a)) { hide(); return; }
      const r = a.getBoundingClientRect();
      const w = el.offsetWidth, h = el.offsetHeight;
      const above = r.top - EDGE, below = window.innerHeight - r.bottom - EDGE;
      let s = side;
      if (s === "top" && above < h + GAP && below > above) s = "bottom";
      if (s === "bottom" && below < h + GAP && above > below) s = "top";
      const cx = r.left + r.width / 2;
      let left = Math.max(EDGE, Math.min(cx - w / 2, window.innerWidth - w - EDGE));
      const top = s === "top" ? r.top - GAP - h : r.bottom + GAP;
      if (TOP_LAYER) {
        el.style.left = Math.round(left) + "px";
        el.style.top = Math.round(top) + "px";
      } else {
        el.style.left = Math.round(left - r.left) + "px";
        el.style.top = Math.round(top - r.top) + "px";
      }
      if (tailRef.current) tailRef.current.style.left = Math.round(Math.max(10, Math.min(w - 10, cx - left))) + "px";
      setPlaced(s);
    };
    place();
    const again = () => { if (!raf) raf = requestAnimationFrame(place); };
    document.addEventListener("scroll", again, true);
    window.addEventListener("resize", again);
    return () => {
      document.removeEventListener("scroll", again, true);
      window.removeEventListener("resize", again);
      if (raf) cancelAnimationFrame(raf);
      if (TOP_LAYER) { try { el.hidePopover(); } catch (_) {} }
    };
  }, [open, side, content]);

  const child = React.Children.only(children);
  const trigger = describe && React.isValidElement(child)
    ? React.cloneElement(child, { "aria-describedby": [child.props["aria-describedby"], open ? id : null].filter(Boolean).join(" ") || undefined })
    : child;

  const isTop = placed === "top";
  const pos = TOP_LAYER
    ? { position: "fixed", inset: "auto", top: 0, left: 0, margin: 0 }
    : { position: "absolute", top: 0, left: 0, zIndex: 40 };

  return (
    <span
      ref={wrapRef}
      style={{ position: "relative", display: "inline-flex", verticalAlign: "middle", ...style }}
      onPointerEnter={(e) => { if (e.pointerType === "mouse") { clear(); timer.current = setTimeout(() => setOpen(true), DELAY); } }}
      onPointerLeave={(e) => { if (e.pointerType === "mouse" && !byTouch.current) hide(); }}
      onPointerUp={(e) => {
        if (e.pointerType !== "touch" && e.pointerType !== "pen") return;
        lastTouch.current = Date.now();
        if (tipRef.current && tipRef.current.contains(e.target)) return;
        if (open) hide(); else { byTouch.current = true; show(); }
      }}
      onFocus={(e) => {
        if (Date.now() - lastTouch.current < 800) return;
        let fv = true;
        try { fv = e.target.matches(":focus-visible"); } catch (_) {}
        if (fv) show();
      }}
      onBlur={(e) => { if (!byTouch.current && !(wrapRef.current && wrapRef.current.contains(e.relatedTarget))) hide(); }}
      {...rest}
    >
      {trigger}
      {open && (
        <span
          ref={tipRef}
          id={id}
          role="tooltip"
          className="mt-tooltip"
          {...(TOP_LAYER ? { popover: "manual" } : null)}
          style={{
            ...pos,
            "--mt-tt-dy": isTop ? "2px" : "-2px",
            boxSizing: "border-box",
            display: "block",
            width: "max-content",
            maxWidth: 240,
            padding: "var(--space-1) var(--space-2)",
            border: "none",
            borderRadius: "var(--radius-sm)",
            background: "var(--sage-900)",
            color: "var(--sage-50)",
            fontFamily: "var(--font-sans)",
            fontSize: "var(--text-caption)",
            lineHeight: "var(--text-caption--line-height)",
            letterSpacing: "var(--text-caption--letter-spacing)",
            fontWeight: 500,
            textAlign: "left",
            whiteSpace: "normal",
            wordBreak: "keep-all",
            overflowWrap: "break-word",
            overflow: "visible",
            pointerEvents: "none",
          }}
        >
          {content}
          <span
            ref={tailRef}
            aria-hidden="true"
            style={{ position: "absolute", left: "50%", [isTop ? "bottom" : "top"]: -4, width: 8, height: 8, marginLeft: -4, background: "var(--sage-900)", transform: "rotate(45deg)", borderRadius: 1 }}
          />
        </span>
      )}
    </span>
  );
}
