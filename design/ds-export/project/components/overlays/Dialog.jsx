import React from "react";
import { IconButton } from "../core/IconButton.jsx";

/**
 * Dialog — centered modal over a dimmed scrim.
 *
 * DS-69 — 긴 본문 · 모바일 전체 화면 · 쌓는 푸터 · 닫기와 포커스.
 *  [긴 본문] 머리(제목 + ✕ + 설명)와 푸터를 고정하고 본문만 스크롤한다. 모달 높이 ≤ 창 높이 − 48(위아래 24).
 *   머리 아래 hairline 하나. 푸터 위 hairline은 본문이 푸터 밑으로 이어질 때만(끝까지 내리면 없다).
 *  [닫기] Esc · 스크림 · ✕ → onClose. 닫을지는 화면이 정한다(open을 true로 두면 그대로 남는다).
 *   Esc는 안에 열린 목록([aria-expanded="true"])이 있거나 안쪽 부품이 이미 처리(preventDefault)했으면 넘긴다.
 *  [포커스] 열리면 안에 가둔다 — 첫 입력 칸, 없으면 ✕. 닫히면 연 요소로 돌려준다.
 *  [footerLayout] "end"(기본, 오른쪽 정렬) · "stack"(세로 — 첫 버튼 폭 전체, 그 아래 버튼은 가운데).
 *  [mobile] "center"(기본) · "fullscreen" — ≤768에서 화면 전체, 반경·스크림 없음, 푸터는 바닥 + safe-area.
 *   visualViewport로 소프트 키보드 위에 푸터를 남긴다. 뒤로가기 → onClose(열 때 기록 하나를 쌓고, 화면이 안 닫으면 다시 쌓는다).
 *   fullscreen(≤768)에서 열리면 포커스는 제목(tabIndex -1) — 키보드가 바로 올라오지 않게. 769 이상은 첫 입력 칸.
 *  [스크롤 잠금] 열리면 뒤 페이지를 잠근다 — body fixed + top = −scrollY(iOS Safari 포함) + 스크롤바 폭만큼 padding-right.
 *   닫히면 풀고 스크롤 위치를 되돌린다. 둘 이상 열려 있으면 마지막이 닫힐 때 푼다.
 */

let lockCount = 0;
let lockSaved = null;
function lockScroll() {
  if (typeof document === "undefined") return;
  lockCount += 1;
  if (lockCount > 1) return;
  const b = document.body, h = document.documentElement;
  const y = window.scrollY || h.scrollTop || 0;
  const sbw = window.innerWidth - h.clientWidth;
  const pr = parseFloat(getComputedStyle(b).paddingRight) || 0;
  lockSaved = { y, style: b.getAttribute("style") };
  b.style.position = "fixed";
  b.style.top = -y + "px";
  b.style.left = "0";
  b.style.right = "0";
  b.style.width = "100%";
  b.style.overflow = "hidden";
  if (sbw > 0) b.style.paddingRight = pr + sbw + "px";
  b.dataset.mtScrollLock = String(y);
}
function unlockScroll() {
  if (typeof document === "undefined" || lockCount === 0) return;
  lockCount -= 1;
  if (lockCount > 0 || !lockSaved) return;
  const b = document.body, h = document.documentElement;
  const { y, style } = lockSaved;
  lockSaved = null;
  if (style == null) b.removeAttribute("style"); else b.setAttribute("style", style);
  delete b.dataset.mtScrollLock;
  const prev = h.style.scrollBehavior;
  h.style.scrollBehavior = "auto";
  window.scrollTo(0, y);
  h.style.scrollBehavior = prev;
}

const FOCUSABLE = 'a[href],button:not([disabled]),input:not([disabled]):not([type="hidden"]),select:not([disabled]),textarea:not([disabled]),[tabindex]:not([tabindex="-1"])';
const FIRST_FIELD = 'input:not([disabled]):not([type="hidden"]),textarea:not([disabled]),select:not([disabled]),[role="combobox"]:not([disabled])';
const MQ = "(max-width: 768px)";

function ensureDialogStyle() {
  if (typeof document === "undefined" || document.getElementById("mt-dialog-style")) return;
  const s = document.createElement("style");
  s.id = "mt-dialog-style";
  s.textContent = [
    "@keyframes mt-fade{from{opacity:0}to{opacity:1}}@keyframes mt-pop{from{opacity:0;transform:scale(0.97)}to{opacity:1;transform:scale(1)}}",
    ".mt-dialog-footer[data-layout=stack]>:first-child{width:100%}",
    ".mt-dialog-title{outline:none;border-radius:var(--radius-sm)}.mt-dialog-title:focus-visible{outline:2px solid var(--ring);outline-offset:2px}",
    ".mt-dialog-footer[data-layout=stack]>:not(:first-child){align-self:center}",
    "@media (max-width:768px){",
    ".mt-dialog-overlay[data-mobile=fullscreen]{padding:0 !important;background:transparent !important;backdrop-filter:none !important;align-items:stretch !important}",
    ".mt-dialog-overlay[data-mobile=fullscreen]>.mt-dialog-panel{max-width:none !important;max-height:none !important;height:100%;border:0 !important;border-radius:0 !important;box-shadow:none !important;animation:none !important}",
    ".mt-dialog-overlay[data-mobile=fullscreen] .mt-dialog-footer{padding-bottom:calc(20px + env(safe-area-inset-bottom)) !important}",
    "}",
    "@media (prefers-reduced-motion:reduce){.mt-dialog-overlay,.mt-dialog-panel{animation:none !important}}",
  ].join("");
  document.head.appendChild(s);
}

export function Dialog({
  open,
  onClose,
  title,
  description,
  children,
  footer,
  width = 460,
  footerLayout = "end",
  mobile = "center",
  style,
}) {
  const panelRef = React.useRef(null);
  const bodyRef = React.useRef(null);
  const innerRef = React.useRef(null);
  const closeRef = React.useRef(null);
  const titleRef = React.useRef(null);
  const downOnScrim = React.useRef(false);
  const onCloseRef = React.useRef(onClose);
  onCloseRef.current = onClose;
  const openRef = React.useRef(open);
  openRef.current = open;
  const titleId = React.useId();
  const descId = React.useId();
  const [narrow, setNarrow] = React.useState(() => typeof window !== "undefined" && !!window.matchMedia && window.matchMedia(MQ).matches);
  const [moreBelow, setMoreBelow] = React.useState(false);
  const [vv, setVv] = React.useState(null);
  const isFs = mobile === "fullscreen" && narrow;

  React.useEffect(ensureDialogStyle, []);
  React.useEffect(() => {
    if (!window.matchMedia) return;
    const m = window.matchMedia(MQ);
    const f = () => setNarrow(m.matches);
    f();
    m.addEventListener("change", f);
    return () => m.removeEventListener("change", f);
  }, []);

  // 스크롤 잠금
  React.useEffect(() => {
    if (!open) return;
    lockScroll();
    return unlockScroll;
  }, [open]);

  // 포커스: fullscreen(≤768)은 제목 · 그 밖은 첫 입력 칸 → 없으면 ✕. 닫히면 연 요소로.
  React.useEffect(() => {
    if (!open) return;
    const prev = document.activeElement;
    const panel = panelRef.current;
    const fsNow = mobile === "fullscreen" && !!window.matchMedia && window.matchMedia(MQ).matches;
    const first = panel && panel.querySelector(FIRST_FIELD);
    const target = fsNow ? titleRef.current || closeRef.current : first || closeRef.current;
    if (target && target.focus) target.focus({ preventScroll: true });
    return () => {
      if (prev && prev.focus && document.contains(prev)) prev.focus({ preventScroll: true });
    };
  }, [open]);

  // Esc · Tab 가두기 · 밖으로 나간 포커스 되돌리기
  React.useEffect(() => {
    if (!open) return;
    const focusables = () => {
      const panel = panelRef.current;
      return panel ? Array.from(panel.querySelectorAll(FOCUSABLE)).filter((el) => el.offsetParent !== null || el === document.activeElement) : [];
    };
    const onKey = (e) => {
      const panel = panelRef.current;
      if (!panel) return;
      if (e.key === "Escape") {
        if (e.defaultPrevented || panel.querySelector('[aria-expanded="true"]')) return;
        onCloseRef.current && onCloseRef.current();
        return;
      }
      if (e.key !== "Tab") return;
      const f = focusables();
      if (!f.length) { e.preventDefault(); return; }
      const first = f[0];
      const last = f[f.length - 1];
      const a = document.activeElement;
      if (!panel.contains(a)) { e.preventDefault(); first.focus(); }
      else if (e.shiftKey && a === first) { e.preventDefault(); last.focus(); }
      else if (!e.shiftKey && a === last) { e.preventDefault(); first.focus(); }
    };
    const onFocusIn = (e) => {
      const panel = panelRef.current;
      if (panel && !panel.contains(e.target)) {
        const f = focusables();
        (f[0] || panel).focus && (f[0] || panel).focus({ preventScroll: true });
      }
    };
    document.addEventListener("keydown", onKey);
    document.addEventListener("focusin", onFocusIn);
    return () => {
      document.removeEventListener("keydown", onKey);
      document.removeEventListener("focusin", onFocusIn);
    };
  }, [open]);

  // 푸터 위 hairline — 본문이 푸터 밑으로 이어질 때만.
  const measure = React.useCallback(() => {
    const b = bodyRef.current;
    if (!b) return;
    setMoreBelow(b.scrollHeight - b.scrollTop - b.clientHeight > 1);
  }, []);
  React.useLayoutEffect(() => {
    if (!open) return;
    measure();
    if (typeof ResizeObserver === "undefined") return;
    const ro = new ResizeObserver(measure);
    if (bodyRef.current) ro.observe(bodyRef.current);
    if (innerRef.current) ro.observe(innerRef.current);
    return () => ro.disconnect();
  }, [open, measure]);

  // 전체 화면: 소프트 키보드 위에 푸터를 남긴다.
  React.useEffect(() => {
    const v = typeof window !== "undefined" ? window.visualViewport : null;
    if (!open || !isFs || !v) { setVv(null); return; }
    const f = () => setVv({ top: v.offsetTop, h: v.height });
    f();
    v.addEventListener("resize", f);
    v.addEventListener("scroll", f);
    return () => { v.removeEventListener("resize", f); v.removeEventListener("scroll", f); };
  }, [open, isFs]);

  // 전체 화면: 뒤로가기 → onClose.
  React.useEffect(() => {
    if (!open || !isFs) return;
    let pushed = true;
    let alive = true;
    history.pushState({ mtDialog: true }, "");
    const onPop = () => {
      pushed = false;
      onCloseRef.current && onCloseRef.current();
      setTimeout(() => {
        if (alive && openRef.current) { history.pushState({ mtDialog: true }, ""); pushed = true; }
      }, 0);
    };
    window.addEventListener("popstate", onPop);
    return () => {
      alive = false;
      window.removeEventListener("popstate", onPop);
      if (pushed && history.state && history.state.mtDialog) history.back();
    };
  }, [open, isFs]);

  if (!open) return null;
  const stack = footerLayout === "stack";

  return (
    <div
      className="mt-dialog-overlay"
      data-mobile={mobile}
      onMouseDown={(e) => { downOnScrim.current = e.target === e.currentTarget; }}
      onClick={(e) => { if (e.target === e.currentTarget && downOnScrim.current && onClose) onClose(); }}
      style={{
        position: "fixed",
        inset: 0,
        zIndex: 60,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        padding: "24px 20px",
        boxSizing: "border-box",
        background: "color-mix(in oklch, var(--sage-950) 45%, transparent)",
        backdropFilter: "blur(2px)",
        animation: "mt-fade 150ms ease",
        ...(vv ? { top: vv.top, height: vv.h, bottom: "auto" } : null),
      }}
    >
      <div
        ref={panelRef}
        className="mt-dialog-panel"
        role="dialog"
        aria-modal="true"
        aria-labelledby={title ? titleId : undefined}
        aria-describedby={description ? descId : undefined}
        tabIndex={-1}
        style={{
          display: "flex",
          flexDirection: "column",
          width: "100%",
          maxWidth: width,
          maxHeight: "calc(100dvh - 48px)",
          boxSizing: "border-box",
          overflow: "hidden",
          outline: "none",
          background: "var(--popover)",
          color: "var(--popover-foreground)",
          border: "1px solid var(--border)",
          borderRadius: "var(--radius-xl)",
          boxShadow: "var(--shadow-lg)",
          animation: "mt-pop 150ms ease",
          ...style,
        }}
      >
        <div style={{ flex: "0 0 auto", display: "flex", alignItems: "flex-start", justifyContent: "space-between", gap: 12, padding: "20px 20px 16px", borderBottom: "1px solid var(--border)" }}>
          <div style={{ display: "flex", flexDirection: "column", gap: 4, minWidth: 0 }}>
            {title && <div id={titleId} ref={titleRef} tabIndex={-1} className="mt-dialog-title" style={{ fontSize: "var(--text-h2)", fontWeight: 600, lineHeight: "var(--text-h2--line-height)", letterSpacing: "var(--text-h2--letter-spacing)" }}>{title}</div>}
            {description && <div id={descId} style={{ fontSize: "var(--text-caption)", lineHeight: "var(--text-caption--line-height)", letterSpacing: "var(--text-caption--letter-spacing)", color: "var(--muted-foreground)" }}>{description}</div>}
          </div>
          <IconButton ref={closeRef} icon="cancel-01" variant="ghost" size="sm" ariaLabel="닫기" onClick={onClose} />
        </div>
        <div ref={bodyRef} className="mt-dialog-body" onScroll={measure} style={{ flex: "1 1 auto", minHeight: 0, overflowY: "auto", overscrollBehavior: "contain", padding: footer ? "16px 20px" : "16px 20px 20px" }}>
          <div ref={innerRef}>{children}</div>
        </div>
        {footer && (
          <div
            className="mt-dialog-footer"
            data-layout={stack ? "stack" : "end"}
            style={{
              flex: "0 0 auto",
              display: "flex",
              flexDirection: stack ? "column" : "row",
              alignItems: stack ? "center" : "center",
              justifyContent: stack ? "flex-start" : "flex-end",
              gap: stack ? 8 : 10,
              padding: "16px 20px 20px",
              borderTop: `1px solid ${moreBelow ? "var(--border)" : "transparent"}`,
            }}
          >
            {footer}
          </div>
        )}
      </div>
    </div>
  );
}
