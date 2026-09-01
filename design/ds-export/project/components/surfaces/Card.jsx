import React from "react";

/**
 * Card — white surface, delineated by border/shadow over the white background.
 * CardHeader / CardTitle / CardDescription / CardContent / CardFooter compose it.
 */
export function Card({ children, style, ...rest }) {
  return (
    <div
      style={{
        background: "var(--card)",
        color: "var(--card-foreground)",
        border: "1px solid var(--border)",
        borderRadius: "var(--radius-lg)",
        boxShadow: "var(--shadow-sm)",
        overflow: "hidden",
        ...style,
      }}
      {...rest}
    >
      {children}
    </div>
  );
}

export function CardHeader({ children, style, ...rest }) {
  return (
    <div style={{ padding: "18px 20px 0", display: "flex", flexDirection: "column", gap: 4, ...style }} {...rest}>
      {children}
    </div>
  );
}

export function CardTitle({ children, style, ...rest }) {
  return (
    <div style={{ fontSize: "var(--text-h3)", fontWeight: 600, lineHeight: 1.5, color: "var(--foreground)", ...style }} {...rest}>
      {children}
    </div>
  );
}

export function CardDescription({ children, style, ...rest }) {
  return (
    <div style={{ fontSize: "var(--text-caption)", color: "var(--muted-foreground)", ...style }} {...rest}>
      {children}
    </div>
  );
}

export function CardContent({ children, style, ...rest }) {
  return (
    <div style={{ padding: "16px 20px", ...style }} {...rest}>
      {children}
    </div>
  );
}

export function CardFooter({ children, style, ...rest }) {
  return (
    <div style={{ padding: "0 20px 18px", display: "flex", alignItems: "center", gap: 10, ...style }} {...rest}>
      {children}
    </div>
  );
}
