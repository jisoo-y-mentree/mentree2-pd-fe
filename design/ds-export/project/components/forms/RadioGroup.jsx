import React from "react";

/**
 * RadioGroup — single-select list of options.
 */
export function RadioGroup({ options = [], value, onChange, name, disabled = false, style, ...rest }) {
  return (
    <div role="radiogroup" style={{ display: "flex", flexDirection: "column", gap: 10, ...style }} {...rest}>
      {options.map((o) => {
        const val = typeof o === "string" ? o : o.value;
        const lab = typeof o === "string" ? o : o.label;
        const selected = value === val;
        return (
          <label
            key={val}
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: 9,
              cursor: disabled ? "not-allowed" : "pointer",
              opacity: disabled ? 0.6 : 1,
              fontFamily: "var(--font-sans)",
              fontSize: "var(--text-body)",
              color: "var(--foreground)",
            }}
          >
            <span
              role="radio"
              aria-checked={selected}
              onClick={() => !disabled && onChange && onChange(val)}
              style={{
                display: "inline-flex",
                alignItems: "center",
                justifyContent: "center",
                width: 18,
                height: 18,
                flex: "0 0 auto",
                borderRadius: "50%",
                border: `1.5px solid ${selected ? "var(--primary)" : "var(--input)"}`,
                background: "var(--card)",
                transition: "border-color 120ms ease",
              }}
            >
              {selected && <span style={{ width: 9, height: 9, borderRadius: "50%", background: "var(--primary)" }} />}
            </span>
            {lab}
          </label>
        );
      })}
    </div>
  );
}
