import React from "react";

/**
 * Field — label + description + control + error wrapper (shadcn Field convention).
 * FieldGroup — vertical stack of Fields.
 *
 * DS-32 — 제목의 크기 · 설명의 자리 · 묶음 제목.
 *  라벨 --text-body · 600(선택지 글자보다 작지 않다). 설명은 라벨 바로 아래 · 컨트롤 위. 에러는 컨트롤 아래.
 *  FieldGroup label → 묶음 제목(Field 라벨과 같은 모양) + 안의 Field 라벨은 작은 라벨(--text-caption · 500).
 *  columns={2} → 안의 Field가 한 줄에 반씩. label·columns를 안 주면 이전과 같다(간격만).
 */
const SmallLabelCtx = React.createContext(false);

const TITLE = {
  fontFamily: "var(--font-sans)",
  fontSize: "var(--text-body)",
  lineHeight: "var(--text-body--line-height)",
  letterSpacing: "var(--text-body--letter-spacing)",
  fontWeight: 600,
  color: "var(--foreground)",
  display: "inline-flex",
  gap: 4,
};
const SMALL = {
  fontFamily: "var(--font-sans)",
  fontSize: "var(--text-caption)",
  lineHeight: "var(--text-caption--line-height)",
  letterSpacing: "var(--text-caption--letter-spacing)",
  fontWeight: 500,
  color: "var(--foreground)",
  display: "inline-flex",
  gap: 4,
};
const HELP = {
  fontFamily: "var(--font-sans)",
  fontSize: "var(--text-caption)",
  lineHeight: "var(--text-caption--line-height)",
  letterSpacing: "var(--text-caption--letter-spacing)",
};
const Req = () => <span aria-hidden="true" style={{ color: "var(--destructive)" }}>*</span>;

export function Field({ label, htmlFor, description, error, required = false, children, style, ...rest }) {
  const small = React.useContext(SmallLabelCtx);
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: small ? 6 : 8, minWidth: 0, ...style }} {...rest}>
      {(label || description) && (
        <div style={{ display: "flex", flexDirection: "column", gap: 2 }}>
          {label && (
            <label htmlFor={htmlFor} style={small ? SMALL : TITLE}>
              {label}
              {required && <Req />}
            </label>
          )}
          {description && <span style={{ ...HELP, color: "var(--muted-foreground)" }}>{description}</span>}
        </div>
      )}
      {children}
      {error && <span role="alert" style={{ ...HELP, color: "var(--destructive)" }}>{error}</span>}
    </div>
  );
}

export function FieldGroup({ label, required = false, columns, children, gap = 18, style, ...rest }) {
  const labelId = React.useId();
  const cols = typeof columns === "number" && columns > 1 ? columns : 0;
  if (!label && !cols) {
    return (
      <div style={{ display: "flex", flexDirection: "column", gap, ...style }} {...rest}>
        {children}
      </div>
    );
  }
  const innerStyle = cols
    ? { display: "grid", gridTemplateColumns: `repeat(${cols}, minmax(0, 1fr))`, gap: 12, alignItems: "start" }
    : { display: "flex", flexDirection: "column", gap: 12 };
  if (!label) {
    return <div style={{ ...innerStyle, ...style }} {...rest}>{children}</div>;
  }
  return (
    <div role="group" aria-labelledby={labelId} style={{ display: "flex", flexDirection: "column", gap: 8, ...style }} {...rest}>
      <div id={labelId} style={TITLE}>
        {label}
        {required && <Req />}
      </div>
      <SmallLabelCtx.Provider value={true}>
        <div style={innerStyle}>{children}</div>
      </SmallLabelCtx.Provider>
    </div>
  );
}
