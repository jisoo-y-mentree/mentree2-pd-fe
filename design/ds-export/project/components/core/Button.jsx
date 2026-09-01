import React from "react";
import { Icon } from "./Icon.jsx";

const RADIUS = "var(--radius-md)";

const SIZES = {
  sm: { height: 32, padding: "0 12px", fontSize: "var(--text-caption)", gap: 6, icon: 16 },
  md: { height: 38, padding: "0 16px", fontSize: "var(--text-body)", gap: 8, icon: 18 },
  lg: { height: 44, padding: "0 22px", fontSize: "var(--text-h3)", gap: 8, icon: 20 },
};

const VARIANTS = {
  primary: {
    background: "var(--primary)",
    color: "var(--primary-foreground)",
    border: "1px solid transparent",
  },
  secondary: {
    background: "var(--secondary)",
    color: "var(--secondary-foreground)",
    border: "1px solid transparent",
  },
  outline: {
    background: "var(--card)",
    color: "var(--foreground)",
    border: "1px solid var(--border)",
  },
  ghost: {
    background: "transparent",
    color: "var(--foreground)",
    border: "1px solid transparent",
  },
  destructive: {
    background: "var(--destructive)",
    color: "var(--destructive-foreground)",
    border: "1px solid transparent",
  },
};

/**
 * Button — shadcn/vega button in mentree tokens.
 */
export function Button({
  variant = "primary",
  size = "md",
  iconLeft,
  iconRight,
  disabled = false,
  fullWidth = false,
  children,
  style,
  ...rest
}) {
  const s = SIZES[size] || SIZES.md;
  const v = VARIANTS[variant] || VARIANTS.primary;
  return (
    <button
      disabled={disabled}
      style={{
        display: "inline-flex",
        alignItems: "center",
        justifyContent: "center",
        gap: s.gap,
        height: s.height,
        padding: s.padding,
        width: fullWidth ? "100%" : "auto",
        fontFamily: "var(--font-sans)",
        fontSize: s.fontSize,
        fontWeight: 500,
        lineHeight: 1,
        letterSpacing: "-0.01em",
        borderRadius: RADIUS,
        cursor: disabled ? "not-allowed" : "pointer",
        opacity: disabled ? 0.5 : 1,
        transition: "background-color 150ms ease, box-shadow 150ms ease, transform 120ms ease, filter 150ms ease",
        whiteSpace: "nowrap",
        ...v,
        ...style,
      }}
      onMouseDown={(e) => { if (!disabled) e.currentTarget.style.transform = "translateY(0.5px)"; }}
      onMouseUp={(e) => { e.currentTarget.style.transform = "none"; }}
      onMouseEnter={(e) => { if (!disabled) e.currentTarget.style.filter = "brightness(0.95)"; }}
      onMouseLeave={(e) => { e.currentTarget.style.filter = "none"; e.currentTarget.style.transform = "none"; }}
      {...rest}
    >
      {iconLeft && <Icon name={iconLeft} size={s.icon} />}
      {children}
      {iconRight && <Icon name={iconRight} size={s.icon} />}
    </button>
  );
}
