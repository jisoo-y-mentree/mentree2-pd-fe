import React from "react";
import { Icon } from "./Icon.jsx";

const RADIUS = "var(--radius-md)";

const SIZES = {
  sm: { height: 32, padding: "0 14px", fontSize: 14, gap: 6, icon: 16 },
  md: { height: 40, padding: "0 20px", fontSize: 14, gap: 8, icon: 18 },
  lg: { height: 48, padding: "0 28px", fontSize: 14, gap: 8, icon: 20 },
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
 * 글자는 크기 단계와 무관하게 14px·600으로 고정된다(원티드 실측 — 버튼 안 글자는 안 움직이고 높이만 커진다).
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
        // ghost는 좌우 패딩 0 — 면도 테두리도 없고 hover에도 면이 안 뜨므로(brightness만) 아무것도 없는 곳에
        // 40px이 붙어 있었다(md 116px 중 34%가 여백). 면이 있는 variant는 여백이 일을 하므로 그대로 둔다.
        // 세로 패딩은 원래 없고 높이도 그대로라 터치 타겟(md 40)은 안 줄어든다.
        padding: variant === "ghost" ? 0 : s.padding,
        width: fullWidth ? "100%" : "auto",
        fontFamily: "var(--font-sans)",
        fontSize: s.fontSize,
        fontWeight: 600,
        lineHeight: 1,
        letterSpacing: 0,
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
