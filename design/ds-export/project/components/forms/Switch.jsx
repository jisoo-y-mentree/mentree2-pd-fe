import React from "react";
import { ensureControlFocusStyle } from "./controlFocus.js";

/**
 * Switch — on/off toggle.
 * DS-75 — 속에 네이티브 <input type="checkbox" role="switch">(트랙과 같은 자리 · opacity 0). Tab · Space.
 *  라벨 글자가 이름(없으면 aria-label). disabled는 네이티브. 키보드 포커스면 트랙 둘레에 --ring. 겉모양은 이전 그대로.
 */
export function Switch({ checked = false, onChange, disabled = false, label, id, style, ...rest }) {
  React.useEffect(ensureControlFocusStyle, []);
  const control = (
    <span style={{ position: "relative", display: "inline-flex", flex: "0 0 auto" }}>
      <input
        type="checkbox"
        role="switch"
        id={id}
        className="mt-ctl-input"
        checked={checked}
        aria-checked={checked}
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
          position: "relative",
          display: "inline-flex",
          alignItems: "center",
          width: 38,
          height: 22,
          flex: "0 0 auto",
          boxSizing: "border-box",
          borderRadius: "999px",
          background: checked ? "var(--primary)" : "var(--sage-300)",
          cursor: disabled ? "not-allowed" : "pointer",
          transition: "background-color 150ms ease",
          padding: 2,
          ...style,
        }}
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
