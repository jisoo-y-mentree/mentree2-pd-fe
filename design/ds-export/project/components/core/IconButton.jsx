import React from "react";
import { Icon } from "./Icon.jsx";

const SIZES = { sm: 32, md: 40, lg: 48 };
const ICON = { sm: 16, md: 18, lg: 20 };

const VARIANTS = {
  primary: { background: "var(--primary)", color: "var(--primary-foreground)", border: "1px solid transparent" },
  secondary: { background: "var(--secondary)", color: "var(--secondary-foreground)", border: "1px solid transparent" },
  outline: { background: "var(--card)", color: "var(--foreground)", border: "1px solid var(--border)" },
  ghost: { background: "transparent", color: "var(--muted-foreground)", border: "1px solid transparent" },
};

// DS-35 — 토글 상태. pressed를 주면 variant 대신 이 둘을 쓴다.
// 혼자 서는 토글은 켜지면 반전한다 — BookmarkToggle 선택 값과 같다(--sage-900 면 + --sage-50 아이콘 + 테두리 투명).
const PRESSED_OFF = VARIANTS.outline;
const PRESSED_ON = { background: "var(--sage-900)", color: "var(--sage-50)", border: "1px solid transparent" };

// 켜지면 속을 채우는 아이콘 — HugeIcons 정적 CDN에 solid가 없어 BookmarkToggle처럼 인라인 SVG로 선↔채움을 바꾼다.
// 그 밖의 아이콘은 채움 없이 반전 면만 바뀐다.
const BOOKMARK_PATH = "M5 4.6C5 3.72 5.72 3 6.6 3h10.8c.88 0 1.6.72 1.6 1.6v15.5c0 .82-.92 1.3-1.58.82L12 17.4l-5.42 3.52C5.92 21.4 5 20.92 5 20.1V4.6z";
const HEART_PATH = "M12 20.2c-.28 0-.55-.09-.78-.27C8.3 17.64 3 13.5 3 8.86 3 6.18 5.1 4 7.72 4c1.7 0 3.2.9 4.28 2.3C13.08 4.9 14.58 4 16.28 4 18.9 4 21 6.18 21 8.86c0 4.64-5.3 8.78-8.22 11.07-.23.18-.5.27-.78.27z";
const FILLABLE = { "bookmark-01": BOOKMARK_PATH, "bookmark-02": BOOKMARK_PATH, favourite: HEART_PATH };

function ensureToggleStyle() {
  if (typeof document === "undefined" || document.getElementById("mt-iconbutton-style")) return;
  const s = document.createElement("style");
  s.id = "mt-iconbutton-style";
  s.textContent = ".mt-iconbutton-toggle:focus-visible{outline:2px solid var(--ring);outline-offset:2px;}";
  document.head.appendChild(s);
}

/**
 * IconButton — square button with a single HugeIcons glyph. 높이는 Button과 맞춘다(sm32·md40·lg48).
 * DS-35: pressed(boolean)를 주면 켜짐·꺼짐 토글 — false=outline, true=반전(--sage-900 면 + 아이콘 --sage-50 + 테두리 투명).
 *  bookmark-01·bookmark-02·favourite는 켜지면 속을 채운다. aria-pressed를 단다.
 *  hover·active·focus-visible은 BookmarkToggle과 같다. pressed를 안 주면 이전과 같다(variant 그대로).
 */
export const IconButton = React.forwardRef(function IconButton({
  icon,
  variant = "ghost",
  size = "md",
  pressed,
  disabled = false,
  ariaLabel,
  style,
  className,
  ...rest
}, ref) {
  const dim = SIZES[size] || SIZES.md;
  const iconSize = ICON[size] || ICON.md;
  const isToggle = typeof pressed === "boolean";
  const [hover, setHover] = React.useState(false);
  const [down, setDown] = React.useState(false);
  React.useEffect(() => { if (isToggle) ensureToggleStyle(); }, [isToggle]);

  if (isToggle) {
    const v = pressed ? PRESSED_ON : PRESSED_OFF;
    const path = FILLABLE[icon];
    return (
      <button
        ref={ref}
        type="button"
        className={"mt-iconbutton-toggle" + (className ? " " + className : "")}
        disabled={disabled}
        aria-label={ariaLabel || icon}
        aria-pressed={pressed}
        onMouseEnter={() => setHover(true)}
        onMouseLeave={() => { setHover(false); setDown(false); }}
        onMouseDown={() => { if (!disabled) setDown(true); }}
        onMouseUp={() => setDown(false)}
        style={{
          display: "inline-flex",
          alignItems: "center",
          justifyContent: "center",
          width: dim,
          height: dim,
          padding: 0,
          borderRadius: "var(--radius-md)",
          border: v.border,
          color: v.color,
          background: !pressed && hover && !disabled ? "var(--secondary)" : v.background,
          filter: !disabled && pressed && hover ? "brightness(0.92)" : "none",
          cursor: disabled ? "not-allowed" : "pointer",
          opacity: disabled ? 0.5 : 1,
          transform: down ? "translateY(0.5px)" : "none",
          transition: "background-color 150ms ease, color 150ms ease, filter 150ms ease, transform 120ms ease",
          ...style,
        }}
        {...rest}
      >
        {path ? (
          <svg width={iconSize} height={iconSize} viewBox="0 0 24 24" fill={pressed ? "currentColor" : "none"} stroke="currentColor" strokeWidth={1.6} strokeLinejoin="round" strokeLinecap="round" aria-hidden="true">
            <path d={path} />
          </svg>
        ) : (
          <Icon name={icon} size={iconSize} aria-hidden="true" />
        )}
      </button>
    );
  }

  const v = VARIANTS[variant] || VARIANTS.ghost;
  const ghostHover = variant === "ghost";
  return (
    <button
      ref={ref}
      disabled={disabled}
      aria-label={ariaLabel || icon}
      className={className}
      style={{
        display: "inline-flex",
        alignItems: "center",
        justifyContent: "center",
        width: dim,
        height: dim,
        borderRadius: "var(--radius-md)",
        cursor: disabled ? "not-allowed" : "pointer",
        opacity: disabled ? 0.5 : 1,
        transition: "background-color 150ms ease, color 150ms ease, filter 150ms ease",
        ...v,
        ...style,
      }}
      onMouseEnter={(e) => { if (!disabled && ghostHover) e.currentTarget.style.background = "var(--secondary)"; else if (!disabled) e.currentTarget.style.filter = "brightness(0.95)"; }}
      onMouseLeave={(e) => { e.currentTarget.style.background = v.background; e.currentTarget.style.filter = "none"; }}
      {...rest}
    >
      <Icon name={icon} size={iconSize} />
    </button>
  );
});
