import React from "react";
import { Icon } from "../core/Icon.jsx";
import { ensureControlFocusStyle } from "./controlFocus.js";

/**
 * Checkbox — controlled checkbox with a HugeIcons tick.
 * DS-75 — 속에 네이티브 <input type="checkbox">(상자와 같은 자리 · opacity 0). Tab이 닿고 Space로 켜고 끈다.
 *  라벨 글자가 이름이 된다(없으면 aria-label). disabled는 네이티브. 키보드로 닿으면 상자 둘레에 --ring(:focus-visible).
 *  겉모양은 이전 그대로.
 */
export function Checkbox({ checked = false, onChange, disabled = false, label, id, style, ...rest }) {
  React.useEffect(ensureControlFocusStyle, []);
  const box = (
    <span style={{ position: "relative", display: "inline-flex", flex: "0 0 auto" }}>
      <input
        type="checkbox"
        id={id}
        className="mt-ctl-input"
        checked={checked}
        disabled={disabled}
        onChange={(e) => onChange && onChange(e.target.checked)}
        readOnly={!onChange}
        {...rest}
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
          borderRadius: "var(--radius-sm)",
          border: `1.5px solid ${checked ? "var(--primary)" : "var(--input)"}`,
          background: checked ? "var(--primary)" : "var(--card)",
          cursor: disabled ? "not-allowed" : "pointer",
          transition: "background-color 120ms ease, border-color 120ms ease",
          ...style,
        }}
      >
        {checked && <Icon name="tick-02" size={13} style={{ color: "var(--primary-foreground)" }} />}
      </span>
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
