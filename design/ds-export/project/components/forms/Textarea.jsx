import React from "react";

/**
 * Textarea — 여러 줄 입력(DS-70). 겉모양(면·경계·반경·포커스 링·invalid·disabled)은 Input과 같다.
 *  rows(기본 3)에서 시작해 글이 늘면 maxRows(기본 8)까지 상자가 따라 커지고, 넘으면 상자 안에서 스크롤한다.
 *  limit: 상자 밖 오른쪽 아래 「n/limit」. n > limit → 카운터 --destructive + invalid + aria-invalid="true".
 *  잘라내지 않는다(maxlength 안 씀). value.length로 센다 — 이모지 2자.
 */
const LH = 24;
const PAD_Y = 8;

export function Textarea({
  value,
  defaultValue,
  onChange,
  placeholder,
  disabled = false,
  invalid = false,
  rows = 3,
  maxRows = 8,
  limit,
  style,
  onFocus,
  onBlur,
  ...rest
}) {
  const ref = React.useRef(null);
  const [focused, setFocused] = React.useState(false);
  const [innerLen, setInnerLen] = React.useState(() => String(defaultValue ?? "").length);
  const [scrolls, setScrolls] = React.useState(false);
  const counterId = React.useId();
  const hasLimit = typeof limit === "number";
  const n = value != null ? String(value).length : innerLen;
  const over = hasLimit && n > limit;
  const bad = invalid || over;

  const fit = React.useCallback(() => {
    const el = ref.current;
    if (!el) return;
    const min = rows * LH + PAD_Y * 2 + 2;
    const max = maxRows * LH + PAD_Y * 2 + 2;
    el.style.height = "auto";
    const h = el.scrollHeight + 2;
    el.style.height = Math.min(Math.max(h, min), max) + "px";
    setScrolls(h > max);
  }, [rows, maxRows]);

  React.useLayoutEffect(fit, [value, fit]);
  React.useEffect(() => {
    window.addEventListener("resize", fit);
    return () => window.removeEventListener("resize", fit);
  }, [fit]);

  const borderColor = bad ? "var(--destructive)" : focused ? "var(--ring)" : "var(--input)";

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 6, ...style }}>
      <textarea
        ref={ref}
        rows={rows}
        value={value}
        defaultValue={defaultValue}
        placeholder={placeholder}
        disabled={disabled}
        aria-invalid={bad ? true : undefined}
        aria-describedby={hasLimit ? [rest["aria-describedby"], counterId].filter(Boolean).join(" ") : rest["aria-describedby"]}
        onChange={(e) => { setInnerLen(e.target.value.length); if (value == null) fit(); onChange && onChange(e); }}
        onFocus={(e) => { setFocused(true); onFocus && onFocus(e); }}
        onBlur={(e) => { setFocused(false); onBlur && onBlur(e); }}
        {...rest}
        style={{
          display: "block",
          width: "100%",
          boxSizing: "border-box",
          resize: "none",
          overflowY: scrolls ? "auto" : "hidden",
          padding: `${PAD_Y}px 12px`,
          background: disabled ? "var(--muted)" : "var(--card)",
          border: `1px solid ${borderColor}`,
          borderRadius: "var(--radius-md)",
          boxShadow: focused ? "0 0 0 3px color-mix(in oklch, var(--ring) 30%, transparent)" : "none",
          transition: "border-color 150ms ease, box-shadow 150ms ease",
          opacity: disabled ? 0.6 : 1,
          outline: "none",
          fontFamily: "var(--font-sans)",
          fontSize: "var(--text-body)",
          lineHeight: `${LH}px`,
          letterSpacing: 0,
          color: "var(--foreground)",
          cursor: disabled ? "not-allowed" : "text",
        }}
      />
      {hasLimit && (
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
      )}
    </div>
  );
}
