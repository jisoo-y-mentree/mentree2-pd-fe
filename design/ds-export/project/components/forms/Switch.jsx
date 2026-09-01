import React from "react";

/**
 * Switch — on/off toggle.
 */
export function Switch({ checked = false, onChange, disabled = false, label, style, ...rest }) {
  const control = (
    <span
      role="switch"
      aria-checked={checked}
      onClick={() => !disabled && onChange && onChange(!checked)}
      style={{
        position: "relative",
        display: "inline-flex",
        alignItems: "center",
        width: 38,
        height: 22,
        flex: "0 0 auto",
        borderRadius: "999px",
        background: checked ? "var(--primary)" : "var(--sage-300)",
        cursor: disabled ? "not-allowed" : "pointer",
        transition: "background-color 150ms ease",
        padding: 2,
        ...style,
      }}
      {...rest}
    >
      <span
        style={{
          width: 18,
          height: 18,
          borderRadius: "50%",
          background: "white",
          boxShadow: "var(--shadow-xs)",
          transform: checked ? "translateX(16px)" : "translateX(0)",
          transition: "transform 150ms ease",
        }}
      />
    </span>
  );
  if (!label) return control;
  return (
    <label
      style={{
        display: "inline-flex",
        alignItems: "center",
        gap: 10,
        cursor: disabled ? "not-allowed" : "pointer",
        opacity: disabled ? 0.6 : 1,
        fontFamily: "var(--font-sans)",
        fontSize: "var(--text-body)",
        color: "var(--foreground)",
      }}
    >
      {control}
      {label}
    </label>
  );
}
