import React from "react";

/**
 * FilterChip — Toggle 계열 텍스트 칩(aria-pressed 반영). BookmarkToggle의 형제.
 *  같은 Toggle 조상을 공유하되 형태가 다르다: 아이콘형=BookmarkToggle / 텍스트칩형=FilterChip.
 *  Badge(정적·인터랙션 불가)와 구분 — FilterChip은 클릭·선택 가능한 필터 요소.
 *
 * [크기·형태] 버튼 sm 체계(높이 32 · padding 0 12 · radius-md=12 · caption/500). pill 미사용.
 * [상태 — Toggle 공통 "selected=반전"] default: card 배경 + sage 아웃라인 + sage-700 텍스트 /
 *  hover: 옅은 sage 틴트(--secondary) / selected: primary green 반전(흰 텍스트) ←
 *  BookmarkToggle이 sage-900 반전인 것과 달리 FilterChip은 green 반전(필터 활성=브랜드 액션) /
 *  focus-visible: --ring / disabled: 흐리게.
 * [leading] none(직무 등) · flag(국가 — Badge flag leading의 원형 국기 SVG 재사용).
 *  selected 시 국기는 고유색 유지(green 배경 위 국기 그대로).
 */
const FLAG_BASE = "../../assets/flags/";

export function FilterChip({
  selected = false,
  onChange,
  disabled = false,
  leading = "none",
  flag,
  flagBase = FLAG_BASE,
  children,
  style,
  ...rest
}) {
  const [hover, setHover] = React.useState(false);

  React.useEffect(() => {
    if (document.getElementById("mt-filterchip-style")) return;
    const s = document.createElement("style");
    s.id = "mt-filterchip-style";
    s.textContent = ".mt-filterchip:focus-visible{outline:2px solid var(--ring);outline-offset:2px;}";
    document.head.appendChild(s);
  }, []);

  // selected=반전(green). default/hover는 sage 아웃라인 칩.
  const bg = disabled
    ? (selected ? "var(--primary)" : "var(--card)")
    : selected
      ? "var(--primary)"
      : hover ? "var(--secondary)" : "var(--card)";
  const fg = selected ? "var(--primary-foreground)" : "var(--sage-700)";
  const border = selected ? "1px solid transparent" : "1px solid var(--border)";

  let lead = null;
  if (leading === "flag") {
    // 원형 국기 — Badge flag leading 재사용(assets/flags/{국가명}.svg). 실패 시 빈 원형.
    lead = (
      <span style={{ width: 18, height: 18, borderRadius: "50%", overflow: "hidden", flex: "0 0 auto", background: "var(--sage-100)", display: "inline-flex", boxShadow: "0 0 0 1px color-mix(in oklch, var(--sage-950) 8%, transparent)" }}>
        {flag && (
          <img
            src={`${flagBase}${flag}.svg`}
            alt=""
            onError={(e) => { e.currentTarget.style.display = "none"; }}
            style={{ width: "100%", height: "100%", objectFit: "cover" }}
          />
        )}
      </span>
    );
  }

  return (
    <button
      type="button"
      className="mt-filterchip"
      aria-pressed={selected}
      disabled={disabled}
      onClick={() => { if (!disabled && onChange) onChange(!selected); }}
      onMouseEnter={() => setHover(true)}
      onMouseLeave={(e) => { setHover(false); e.currentTarget.style.transform = "none"; }}
      onMouseDown={(e) => { if (!disabled) e.currentTarget.style.transform = "translateY(0.5px)"; }}
      onMouseUp={(e) => { e.currentTarget.style.transform = "none"; }}
      style={{
        display: "inline-flex",
        alignItems: "center",
        justifyContent: "center",
        gap: 6,
        height: 32,
        padding: "0 12px",
        fontFamily: "var(--font-sans)",
        fontSize: "var(--text-caption)",
        fontWeight: 500,
        lineHeight: 1,
        letterSpacing: "-0.01em",
        whiteSpace: "nowrap",
        borderRadius: "var(--radius-md)",
        background: bg,
        color: fg,
        border,
        cursor: disabled ? "not-allowed" : "pointer",
        opacity: disabled ? 0.5 : 1,
        transition: "background-color 150ms ease, color 150ms ease, transform 120ms ease",
        ...style,
      }}
      {...rest}
    >
      {lead}
      {children}
    </button>
  );
}
