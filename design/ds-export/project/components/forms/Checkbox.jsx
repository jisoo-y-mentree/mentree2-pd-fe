import React from "react";
import { Icon } from "../core/Icon.jsx";

/**
 * Checkbox — controlled checkbox with a HugeIcons tick.
 */
export function Checkbox({ checked = false, onChange, disabled = false, label, id, style, ...rest }) {
  const box = (
    <span
      role="checkbox"
      aria-checked={checked}
      onClick={() => !disabled && onChange && onChange(!checked)}
      style={{
        display: "inline-flex",
        alignItems: "center",
        justifyContent: "center",
        width: 18,
        height: 18,
        flex: "0 0 auto",
        borderRadius: "var(--radius-sm)",
        border: `1.5px solid ${checked ? "var(--primary)" : "var(--input)"}`,
        background: checked ? "var(--primary)" : "var(--card)",
        cursor: disabled ? "not-allowed" : "pointer",
        transition: "background-color 120ms ease, border-color 120ms ease",
        ...style,
      }}
      {...rest}
    >
      {checked && <Icon name="tick-02" size={13} style={{ color: "var(--primary-foreground)" }} />}
    </span>
  );
  if (!label) return box;
  return (
    <label
      htmlFor={id}
      style={{
        display: "inline-flex",
        alignItems: "center",
        gap: 8,
        cursor: disabled ? "not-allowed" : "pointer",
        opacity: disabled ? 0.6 : 1,
        fontFamily: "var(--font-sans)",
        fontSize: "var(--text-body)",
        color: "var(--foreground)",
      }}
    >
      {box}
      {label}
    </label>
  );
}
