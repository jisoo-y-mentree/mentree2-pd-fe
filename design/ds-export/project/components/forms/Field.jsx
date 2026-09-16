import React from "react";

/**
 * Field — label + control + description/error wrapper (shadcn Field convention).
 * FieldGroup — vertical stack of Fields.
 */
export function Field({ label, htmlFor, description, error, required = false, children, style, ...rest }) {
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 6, ...style }} {...rest}>
      {label && (
        <label
          htmlFor={htmlFor}
          style={{
            fontFamily: "var(--font-sans)",
            fontSize: "var(--text-caption)",
            lineHeight: "var(--text-caption--line-height)",
            letterSpacing: "var(--text-caption--letter-spacing)",
            fontWeight: 500,
            color: "var(--foreground)",
            display: "inline-flex",
            gap: 4,
          }}
        >
          {label}
          {required && <span style={{ color: "var(--destructive)" }}>*</span>}
        </label>
      )}
      {children}
      {error ? (
        <span style={{ fontSize: "var(--text-caption)", lineHeight: "var(--text-caption--line-height)", letterSpacing: "var(--text-caption--letter-spacing)", color: "var(--destructive)" }}>{error}</span>
      ) : description ? (
        <span style={{ fontSize: "var(--text-caption)", lineHeight: "var(--text-caption--line-height)", letterSpacing: "var(--text-caption--letter-spacing)", color: "var(--muted-foreground)" }}>{description}</span>
      ) : null}
    </div>
  );
}

export function FieldGroup({ children, gap = 18, style, ...rest }) {
  return (
    <div style={{ display: "flex", flexDirection: "column", gap, ...style }} {...rest}>
      {children}
    </div>
  );
}
