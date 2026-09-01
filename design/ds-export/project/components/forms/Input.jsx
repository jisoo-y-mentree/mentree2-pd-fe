import React from "react";
import { Icon } from "../core/Icon.jsx";

/**
 * Input — text field (shadcn/vega), mentree tokens.
 */
export function Input({
  iconLeft,
  invalid = false,
  disabled = false,
  style,
  ...rest
}) {
  const [focused, setFocused] = React.useState(false);
  const borderColor = invalid
    ? "var(--destructive)"
    : focused
    ? "var(--ring)"
    : "var(--input)";
  return (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        gap: 8,
        height: 38,
        padding: iconLeft ? "0 12px 0 11px" : "0 12px",
        background: disabled ? "var(--muted)" : "var(--card)",
        border: `1px solid ${borderColor}`,
        borderRadius: "var(--radius-md)",
        boxShadow: focused ? "0 0 0 3px color-mix(in oklch, var(--ring) 30%, transparent)" : "none",
        transition: "border-color 150ms ease, box-shadow 150ms ease",
        opacity: disabled ? 0.6 : 1,
        ...style,
      }}
    >
      {iconLeft && <Icon name={iconLeft} size={17} style={{ color: "var(--muted-foreground)" }} />}
      <input
        disabled={disabled}
        onFocus={(e) => { setFocused(true); rest.onFocus && rest.onFocus(e); }}
        onBlur={(e) => { setFocused(false); rest.onBlur && rest.onBlur(e); }}
        {...rest}
        style={{
          flex: 1,
          minWidth: 0,
          border: "none",
          outline: "none",
          background: "transparent",
          fontFamily: "var(--font-sans)",
          fontSize: "var(--text-body)",
          letterSpacing: "-0.01em",
          color: "var(--foreground)",
        }}
      />
    </div>
  );
}
