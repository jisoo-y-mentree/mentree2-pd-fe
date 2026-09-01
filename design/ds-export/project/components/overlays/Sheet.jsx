import React from "react";
import { IconButton } from "../core/IconButton.jsx";

/**
 * Sheet — panel that slides in from an edge over a dimmed scrim.
 */
export function Sheet({ open, onClose, side = "right", title, description, children, footer, size = 380, style }) {
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
      <div role="dialog" aria-modal="true" onClick={(e) => e.stopPropagation()} style={panelStyle}>
        <div style={{ display: "flex", alignItems: "flex-start", justifyContent: "space-between", gap: 12, padding: "20px 20px 14px", borderBottom: "1px solid var(--border)" }}>
          <div style={{ display: "flex", flexDirection: "column", gap: 4 }}>
            {title && <div style={{ fontSize: "var(--text-h3)", fontWeight: 600 }}>{title}</div>}
            {description && <div style={{ fontSize: "var(--text-caption)", color: "var(--muted-foreground)" }}>{description}</div>}
          </div>
          <IconButton icon="cancel-01" variant="ghost" size="sm" ariaLabel="닫기" onClick={onClose} />
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
