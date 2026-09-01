import React from "react";
import { Icon } from "../core/Icon.jsx";

/**
 * Select — native-backed select styled to match Input.
 */
export function Select({ options = [], placeholder, invalid = false, disabled = false, value, onChange, style, ...rest }) {
  const [focused, setFocused] = React.useState(false);
  const borderColor = invalid ? "var(--destructive)" : focused ? "var(--ring)" : "var(--input)";
  return (
    <div
      style={{
        position: "relative",
        display: "flex",
        alignItems: "center",
        height: 38,
        background: disabled ? "var(--muted)" : "var(--card)",
        border: `1px solid ${borderColor}`,
        borderRadius: "var(--radius-md)",
        boxShadow: focused ? "0 0 0 3px color-mix(in oklch, var(--ring) 30%, transparent)" : "none",
        transition: "border-color 150ms ease, box-shadow 150ms ease",
        opacity: disabled ? 0.6 : 1,
        ...style,
      }}
    >
      <select
        disabled={disabled}
        value={value}
        onChange={onChange}
        onFocus={() => setFocused(true)}
        onBlur={() => setFocused(false)}
        {...rest}
        style={{
          appearance: "none",
          WebkitAppearance: "none",
          flex: 1,
          height: "100%",
          border: "none",
          outline: "none",
          background: "transparent",
          padding: "0 36px 0 12px",
          fontFamily: "var(--font-sans)",
          fontSize: "var(--text-body)",
          letterSpacing: "-0.01em",
          color: value ? "var(--foreground)" : "var(--muted-foreground)",
          cursor: disabled ? "not-allowed" : "pointer",
        }}
      >
        {placeholder && <option value="">{placeholder}</option>}
        {options.map((o) => {
          const val = typeof o === "string" ? o : o.value;
          const lab = typeof o === "string" ? o : o.label;
          return <option key={val} value={val}>{lab}</option>;
        })}
      </select>
      <Icon
        name="arrow-down-01"
        size={16}
        style={{ position: "absolute", right: 11, color: "var(--muted-foreground)", pointerEvents: "none" }}
      />
    </div>
  );
}
