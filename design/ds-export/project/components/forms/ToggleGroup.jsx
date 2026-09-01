import React from "react";
import { Icon } from "../core/Icon.jsx";

/**
 * ToggleGroup — segmented single/multi select (shadcn ToggleGroup).
 * Prefer this over a row of buttons for pick-one / pick-many option sets.
 */
export function ToggleGroup({ options = [], value, onChange, multiple = false, size = "md", style, ...rest }) {
  const h = size === "sm" ? 32 : 38;
  const pad = size === "sm" ? "0 12px" : "0 16px";
  const isOn = (val) => (multiple ? Array.isArray(value) && value.includes(val) : value === val);
  const toggle = (val) => {
    if (!onChange) return;
    if (multiple) {
      const arr = Array.isArray(value) ? value : [];
      onChange(arr.includes(val) ? arr.filter((v) => v !== val) : [...arr, val]);
    } else {
      onChange(val);
    }
  };
  return (
    <div
      role="group"
      style={{
        display: "inline-flex",
        padding: 3,
        gap: 3,
        background: "var(--secondary)",
        borderRadius: "var(--radius-md)",
        ...style,
      }}
      {...rest}
    >
      {options.map((o) => {
        const val = typeof o === "string" ? o : o.value;
        const lab = typeof o === "string" ? o : o.label;
        const icon = typeof o === "object" ? o.icon : null;
        const on = isOn(val);
        return (
          <button
            key={val}
            onClick={() => toggle(val)}
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: 6,
              height: h,
              padding: pad,
              border: "none",
              borderRadius: "calc(var(--radius-md) - 3px)",
              background: on ? "var(--card)" : "transparent",
              color: on ? "var(--foreground)" : "var(--muted-foreground)",
              boxShadow: on ? "var(--shadow-xs)" : "none",
              fontFamily: "var(--font-sans)",
              fontSize: "var(--text-caption)",
              fontWeight: 500,
              cursor: "pointer",
              transition: "background-color 120ms ease, color 120ms ease",
              whiteSpace: "nowrap",
            }}
          >
            {icon && <Icon name={icon} size={15} />}
            {lab}
          </button>
        );
      })}
    </div>
  );
}
