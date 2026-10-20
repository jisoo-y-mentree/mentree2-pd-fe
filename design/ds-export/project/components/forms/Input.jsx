import React from "react";
import { Icon } from "../core/Icon.jsx";

/**
 * Input — text field (shadcn/vega), mentree tokens.
 * DS-70 — limit: 주면 상자 밖 오른쪽 아래에 「n/limit」(--text-caption · --muted-foreground).
 *  n > limit이면 카운터 --destructive + 상자 invalid + aria-invalid="true". 잘라내지 않는다(maxlength 안 씀).
 *  세는 법은 value.length(이모지 2자). limit을 안 주면 이전과 같다.
 */
export function Input({
  iconLeft,
  invalid = false,
  disabled = false,
  limit,
  style,
  ...rest
}) {
  const [focused, setFocused] = React.useState(false);
  const hasLimit = typeof limit === "number";
  const [innerLen, setInnerLen] = React.useState(() => String(rest.defaultValue ?? "").length);
  const counterId = React.useId();
  const n = rest.value != null ? String(rest.value).length : innerLen;
  const over = hasLimit && n > limit;
  const bad = invalid || over;
  const borderColor = bad
    ? "var(--destructive)"
    : focused
    ? "var(--ring)"
    : "var(--input)";
  const box = (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        gap: 8,
        height: 40,
        padding: iconLeft ? "0 12px 0 11px" : "0 12px",
        background: disabled ? "var(--muted)" : "var(--card)",
        border: `1px solid ${borderColor}`,
        borderRadius: "var(--radius-md)",
        boxShadow: focused ? "0 0 0 3px color-mix(in oklch, var(--ring) 30%, transparent)" : "none",
        transition: "border-color 150ms ease, box-shadow 150ms ease",
        opacity: disabled ? 0.6 : 1,
        ...(hasLimit ? null : style),
      }}
    >
      {iconLeft && <Icon name={iconLeft} size={17} style={{ color: "var(--muted-foreground)" }} />}
      <input
        disabled={disabled}
        onFocus={(e) => { setFocused(true); rest.onFocus && rest.onFocus(e); }}
        onBlur={(e) => { setFocused(false); rest.onBlur && rest.onBlur(e); }}
        {...rest}
        {...(hasLimit ? {
          "aria-invalid": bad ? true : undefined,
          "aria-describedby": [rest["aria-describedby"], counterId].filter(Boolean).join(" "),
          onChange: (e) => { setInnerLen(e.target.value.length); rest.onChange && rest.onChange(e); },
        } : null)}
        style={{
          flex: 1,
          minWidth: 0,
          border: "none",
          outline: "none",
          background: "transparent",
          fontFamily: "var(--font-sans)",
          fontSize: "var(--text-body)",
          lineHeight: 1,
          letterSpacing: 0,
          color: "var(--foreground)",
        }}
      />
    </div>
  );
  if (!hasLimit) return box;
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 6, ...style }}>
      {box}
      <span
        id={counterId}
        style={{
          alignSelf: "flex-end",
          fontFamily: "var(--font-sans)",
          fontSize: "var(--text-caption)",
          lineHeight: "var(--text-caption--line-height)",
          letterSpacing: "var(--text-caption--letter-spacing)",
          fontVariantNumeric: "tabular-nums",
          color: over ? "var(--destructive)" : "var(--muted-foreground)",
        }}
      >
        {n}/{limit}
      </span>
    </div>
  );
}
