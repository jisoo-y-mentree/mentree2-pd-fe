import React from "react";
import { Icon } from "./Icon.jsx";

const SIZES = { sm: 32, md: 38, lg: 44 };
const ICON = { sm: 16, md: 18, lg: 20 };

const VARIANTS = {
  primary: { background: "var(--primary)", color: "var(--primary-foreground)", border: "1px solid transparent" },
  secondary: { background: "var(--secondary)", color: "var(--secondary-foreground)", border: "1px solid transparent" },
  outline: { background: "var(--card)", color: "var(--foreground)", border: "1px solid var(--border)" },
  ghost: { background: "transparent", color: "var(--muted-foreground)", border: "1px solid transparent" },
};

/**
 * IconButton — square button with a single HugeIcons glyph.
 */
export const IconButton = React.forwardRef(function IconButton({
  icon,
  variant = "ghost",
  size = "md",
  disabled = false,
  ariaLabel,
  style,
  ...rest
}, ref) {
  const dim = SIZES[size] || SIZES.md;
  const v = VARIANTS[variant] || VARIANTS.ghost;
  return (
    <button
      ref={ref}
      disabled={disabled}
      aria-label={ariaLabel || icon}
      style={{
        display: "inline-flex",
        alignItems: "center",
        justifyContent: "center",
        width: dim,
        height: dim,
        borderRadius: "var(--radius-md)",
        cursor: disabled ? "not-allowed" : "pointer",
        opacity: disabled ? 0.5 : 1,
        transition: "background-color 150ms ease, filter 150ms ease",
        ...v,
        ...style,
      }}
      onMouseEnter={(e) => { if (!disabled && variant === "ghost") e.currentTarget.style.background = "var(--secondary)"; else if (!disabled) e.currentTarget.style.filter = "brightness(0.95)"; }}
      onMouseLeave={(e) => { e.currentTarget.style.background = v.background; e.currentTarget.style.filter = "none"; }}
      {...rest}
    >
      <Icon name={icon} size={ICON[size] || ICON.md} />
    </button>
  );
});
