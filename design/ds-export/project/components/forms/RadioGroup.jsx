import React from "react";
import { ensureControlFocusStyle } from "./controlFocus.js";

/**
 * RadioGroup — single-select list of options.
 * DS-75 — 항목마다 네이티브 <input type="radio">(같은 name · 원과 같은 자리 · opacity 0).
 *  Tab은 그룹에 한 번 닿고 화살표로 옮긴다(네이티브). 라벨 글자가 이름. disabled는 네이티브.
 *  키보드 포커스면 원 둘레에 --ring. 겉모양은 이전 그대로.
 */
export function RadioGroup({ options = [], value, onChange, name, disabled = false, style, ...rest }) {
  React.useEffect(ensureControlFocusStyle, []);
  const auto = React.useId();
  const groupName = name || `mt-radio-${auto.replace(/:/g, "")}`;
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
            <span style={{ position: "relative", display: "inline-flex", flex: "0 0 auto" }}>
              <input
                type="radio"
                name={groupName}
                value={val}
                className="mt-ctl-input"
                checked={selected}
                disabled={disabled}
                onChange={() => onChange && onChange(val)}
                readOnly={!onChange}
                style={{ position: "absolute", inset: 0, width: "100%", height: "100%", margin: 0, opacity: 0, cursor: disabled ? "not-allowed" : "pointer", zIndex: 1 }}
              />
              <span
                className="mt-ctl-face"
                aria-hidden="true"
                style={{
                  display: "inline-flex",
                  alignItems: "center",
                  justifyContent: "center",
                  width: 18,
                  height: 18,
                  flex: "0 0 auto",
                  boxSizing: "border-box",
                  borderRadius: "50%",
                  border: `1.5px solid ${selected ? "var(--primary)" : "var(--input)"}`,
                  background: "var(--card)",
                  transition: "border-color 120ms ease",
                }}
              >
                {selected && <span style={{ width: 9, height: 9, borderRadius: "50%", background: "var(--primary)" }} />}
              </span>
            </span>
            {lab}
          </label>
        );
      })}
    </div>
  );
}
