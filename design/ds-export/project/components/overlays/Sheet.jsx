import React from "react";
import { IconButton } from "../core/IconButton.jsx";

/**
 * Sheet — panel that slides in from an edge over a dimmed scrim.
 *
 * DS-113 — 키보드 · 포커스 · 스크롤 잠금 · headerAction.
 *  [Esc] 열려 있으면 onClose. 안에 열린 목록([aria-expanded="true"])이 있거나 안쪽 부품이 이미 처리(preventDefault)했으면 넘긴다.
 *  [포커스] 열리면 패널 안 첫 조작 요소로 · Tab/Shift+Tab 은 패널 안에서만 돈다 · 닫히면 열기 직전 요소로 되돌린다.
 *  [스크롤 잠금] 열리면 뒤 문서를 잠근다(body fixed + top = −scrollY + 스크롤바 폭 padding). 닫으면 풀고 위치를 되돌린다.
 *   Dialog 등이 이미 잠갔으면(body[data-mt-scroll-lock]) 건드리지 않는다.
 *  [aria-labelledby] 제목이 있으면 제목 id.
 *  [headerAction] 머리의 ✕ 왼쪽 자리(간격 4). 없으면 지금 그대로.
 *
 * DS-114 — 맨 위 층만 키를 받는다. 포커스가 Sheet 패널이 아닌 다른 aria-modal(위에 띄운 Dialog 등) 안에 있으면
 *  Sheet 는 Esc · Tab 을 처리하지 않는다. 그 모달이 닫히면 포커스가 패널 안 연 요소로 돌아오고 다시 Sheet 가 받는다.
 *  스크롤 잠금은 그대로(모달이 닫혀도 Sheet 가 열려 있으면 잠긴 채).
 */

const SHEET_FOCUSABLE = 'a[href],button:not([disabled]),input:not([disabled]):not([type="hidden"]),select:not([disabled]),textarea:not([disabled]),[tabindex]:not([tabindex="-1"])';
let sheetSeq = 0;

// DS-113 — 뒤 문서 스크롤 잠금. 이미 다른 부품이 잠갔으면 null(건드리지 않음).
function sheetLockScroll() {
  if (typeof document === "undefined") return null;
  const b = document.body, h = document.documentElement;
  if (b.dataset.mtScrollLock != null) return null;
  const y = window.scrollY || h.scrollTop || 0;
  const sbw = window.innerWidth - h.clientWidth;
  const pr = parseFloat(getComputedStyle(b).paddingRight) || 0;
  const saved = { y, style: b.getAttribute("style") };
  Object.assign(b.style, { position: "fixed", top: -y + "px", left: "0", right: "0", width: "100%", overflow: "hidden" });
  if (sbw > 0) b.style.paddingRight = pr + sbw + "px";
  b.dataset.mtScrollLock = String(y);
  return saved;
}
function sheetUnlockScroll(saved) {
  if (!saved || typeof document === "undefined") return;
  const b = document.body, h = document.documentElement;
  if (saved.style == null) b.removeAttribute("style"); else b.setAttribute("style", saved.style);
  delete b.dataset.mtScrollLock;
  const prev = h.style.scrollBehavior;
  h.style.scrollBehavior = "auto";
  window.scrollTo(0, saved.y);
  h.style.scrollBehavior = prev;
}

export function Sheet({ open, onClose, side = "right", title, description, children, footer, headerAction, size = 380, style }) {
  const panelRef = React.useRef(null);
  const closeRef = React.useRef(onClose);
  closeRef.current = onClose;
  const [titleId] = React.useState(() => "mt-sheet-title-" + ++sheetSeq);

  // DS-113 — 열림: 포커스 이동 · 스크롤 잠금 · Esc · Tab 가두기. 닫힘: 포커스 되돌림 · 잠금 해제.
  React.useEffect(() => {
    if (!open) return;
    const opener = typeof document !== "undefined" ? document.activeElement : null;
    const saved = sheetLockScroll();
    const panel = panelRef.current;
    const items = () => (panel ? Array.from(panel.querySelectorAll(SHEET_FOCUSABLE)).filter((el) => el.offsetParent !== null || el === document.activeElement) : []);
    const raf = requestAnimationFrame(() => {
      const first = items()[0];
      (first || panel)?.focus({ preventScroll: true });
    });
    const onKey = (e) => {
      if (!panel) return;
      if (e.key !== "Escape" && e.key !== "Tab") return;
      // DS-114 — 포커스가 다른 aria-modal(위 층) 안이면 키를 양보한다.
      const a0 = document.activeElement;
      const top = a0 && a0.closest ? a0.closest('[aria-modal="true"]') : null;
      if (top && top !== panel) return;
      if (e.key === "Escape") {
        if (e.defaultPrevented || panel.querySelector('[aria-expanded="true"]')) return;
        e.preventDefault();
        closeRef.current?.();
        return;
      }
      if (e.key !== "Tab") return;
      const list = items();
      if (!list.length) { e.preventDefault(); panel.focus(); return; }
      const first = list[0], last = list[list.length - 1], a = document.activeElement;
      if (!panel.contains(a)) { e.preventDefault(); (e.shiftKey ? last : first).focus(); }
      else if (e.shiftKey && (a === first || a === panel)) { e.preventDefault(); last.focus(); }
      else if (!e.shiftKey && a === last) { e.preventDefault(); first.focus(); }
    };
    document.addEventListener("keydown", onKey);
    return () => {
      cancelAnimationFrame(raf);
      document.removeEventListener("keydown", onKey);
      sheetUnlockScroll(saved);
      if (opener && typeof opener.focus === "function" && document.contains(opener)) opener.focus({ preventScroll: true });
    };
  }, [open]);

  if (!open) return null;
  const horizontal = side === "left" || side === "right";
  const from = { right: "translateX(100%)", left: "translateX(-100%)", top: "translateY(-100%)", bottom: "translateY(100%)" }[side];
  const panelStyle = {
    position: "absolute",
    background: "var(--popover)",
    color: "var(--popover-foreground)",
    boxShadow: "var(--shadow-lg)",
    display: "flex",
    flexDirection: "column",
    outline: "none",
    animation: "mt-slide 200ms ease",
    "--mt-from": from,
    ...(horizontal
      ? { top: 0, bottom: 0, width: size, [side]: 0, borderLeft: side === "right" ? "1px solid var(--border)" : "none", borderRight: side === "left" ? "1px solid var(--border)" : "none" }
      : { left: 0, right: 0, height: size, [side]: 0, borderTop: side === "bottom" ? "1px solid var(--border)" : "none", borderBottom: side === "top" ? "1px solid var(--border)" : "none" }),
    ...style,
  };
  return (
    <div
      onClick={onClose}
      style={{
        position: "fixed",
        inset: 0,
        zIndex: 60,
        background: "color-mix(in oklch, var(--sage-950) 45%, transparent)",
        backdropFilter: "blur(2px)",
        animation: "mt-fade 150ms ease",
      }}
    >
      {/* DS-113 — aria-labelledby(제목) · tabIndex -1(조작 요소가 없을 때 포커스 받을 자리) */}
      <div ref={panelRef} role="dialog" aria-modal="true" aria-labelledby={title ? titleId : undefined} tabIndex={-1} onClick={(e) => e.stopPropagation()} style={panelStyle}>
        <div style={{ display: "flex", alignItems: "flex-start", justifyContent: "space-between", gap: 12, padding: "20px 20px 14px", borderBottom: "1px solid var(--border)" }}>
          <div style={{ display: "flex", flexDirection: "column", gap: 4, minWidth: 0 }}>
            {title && <div id={titleId} style={{ fontSize: "var(--text-h3)", fontWeight: 600, lineHeight: "var(--text-h3--line-height)", letterSpacing: "var(--text-h3--letter-spacing)" }}>{title}</div>}
            {description && <div style={{ fontSize: "var(--text-caption)", lineHeight: "var(--text-caption--line-height)", letterSpacing: "var(--text-caption--letter-spacing)", color: "var(--muted-foreground)" }}>{description}</div>}
          </div>
          {headerAction ? (
            // DS-113 — headerAction 은 ✕ 왼쪽, 사이 4px. ✕ 와 세로 가운데 정렬.
            <div style={{ display: "flex", alignItems: "center", gap: 4, flexShrink: 0 }}>
              {headerAction}
              <IconButton icon="cancel-01" variant="ghost" size="sm" ariaLabel="닫기" onClick={onClose} />
            </div>
          ) : (
            <IconButton icon="cancel-01" variant="ghost" size="sm" ariaLabel="닫기" onClick={onClose} />
          )}
        </div>
        <div style={{ flex: 1, overflow: "auto", padding: "16px 20px" }}>{children}</div>
        {footer && (
          <div style={{ display: "flex", justifyContent: "flex-end", gap: 10, padding: "14px 20px", borderTop: "1px solid var(--border)" }}>{footer}</div>
        )}
      </div>
      <style>{`@keyframes mt-fade{from{opacity:0}to{opacity:1}}@keyframes mt-slide{from{transform:var(--mt-from)}to{transform:none}}`}</style>
    </div>
  );
}
