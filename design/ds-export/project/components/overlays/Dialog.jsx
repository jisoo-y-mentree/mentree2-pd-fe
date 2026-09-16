import React from "react";
import { IconButton } from "../core/IconButton.jsx";

/**
 * Dialog — centered modal over a dimmed scrim.
 */
export function Dialog({ open, onClose, title, description, children, footer, width = 460, style }) {
  if (!open) return null;
  return (
    <div
      onClick={onClose}
      style={{
        position: "fixed",
        inset: 0,
        zIndex: 60,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        padding: 20,
        background: "color-mix(in oklch, var(--sage-950) 45%, transparent)",
        backdropFilter: "blur(2px)",
        animation: "mt-fade 150ms ease",
      }}
    >
      <div
        role="dialog"
        aria-modal="true"
        onClick={(e) => e.stopPropagation()}
        style={{
          width: "100%",
          maxWidth: width,
          background: "var(--popover)",
          color: "var(--popover-foreground)",
          border: "1px solid var(--border)",
          borderRadius: "var(--radius-xl)",
          boxShadow: "var(--shadow-lg)",
          animation: "mt-pop 150ms ease",
          ...style,
        }}
      >
        <div style={{ display: "flex", alignItems: "flex-start", justifyContent: "space-between", gap: 12, padding: "20px 20px 0" }}>
          <div style={{ display: "flex", flexDirection: "column", gap: 4 }}>
            {title && <div style={{ fontSize: "var(--text-h2)", fontWeight: 600, lineHeight: "var(--text-h2--line-height)", letterSpacing: "var(--text-h2--letter-spacing)" }}>{title}</div>}
            {description && <div style={{ fontSize: "var(--text-caption)", lineHeight: "var(--text-caption--line-height)", letterSpacing: "var(--text-caption--letter-spacing)", color: "var(--muted-foreground)" }}>{description}</div>}
          </div>
          <IconButton icon="cancel-01" variant="ghost" size="sm" ariaLabel="닫기" onClick={onClose} />
        </div>
        <div style={{ padding: "16px 20px" }}>{children}</div>
        {footer && (
          <div style={{ display: "flex", justifyContent: "flex-end", gap: 10, padding: "0 20px 20px" }}>{footer}</div>
        )}
      </div>
      <style>{`@keyframes mt-fade{from{opacity:0}to{opacity:1}}@keyframes mt-pop{from{opacity:0;transform:scale(0.97)}to{opacity:1;transform:scale(1)}}`}</style>
    </div>
  );
}
