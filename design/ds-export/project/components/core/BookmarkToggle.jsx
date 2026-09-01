import React from "react";

/**
 * BookmarkToggle — Toggle 기반 아이콘 토글(aria-pressed 반영).
 * 미선택=outline / 선택=반전(배경 sage-900 채움 + 아이콘 white). "selected=반전"은 토글 계열 공통 원칙
 * (추후 FilterChip도 같은 원리로 green 반전). 상태 표시이므로 북마크가 카드 장식이 아니다.
 * HugeIcons 정적 CDN에 solid 북마크가 없어, 북마크 형태를 HugeIcons 스타일
 * (stroke 1.6, 라운드)의 인라인 SVG로 그려 outline↔fill을 정확히 토글한다.
 * (서버 저장 로직은 범위 밖 — 컴포넌트 상태 표현만.)
 */
const SIZES = { sm: 32, md: 38, lg: 44 };
const ICON = { sm: 18, md: 20, lg: 22 };

export function BookmarkToggle({ selected = false, onChange, disabled = false, size = "md", ariaLabel = "북마크", style, ...rest }) {
  const [hover, setHover] = React.useState(false);
  const px = SIZES[size] || SIZES.md;
  const isz = ICON[size] || ICON.md;

  React.useEffect(() => {
    if (document.getElementById("mt-bmk-style")) return;
    const s = document.createElement("style");
    s.id = "mt-bmk-style";
    s.textContent = ".mt-bmk:focus-visible{outline:2px solid var(--ring);outline-offset:2px;}";
    document.head.appendChild(s);
  }, []);

  // selected=반전: 배경 sage-900 채움 + 아이콘 white. default/hover는 기존 유지.
  const fg = disabled ? "var(--sage-400)" : selected ? "var(--sage-50)" : "var(--muted-foreground)";
  const bg = disabled
    ? "transparent"
    : selected
      ? "var(--sage-900)"
      : hover ? "var(--secondary)" : "transparent";

  return (
    <button
      type="button"
      className="mt-bmk"
      aria-pressed={selected}
      aria-label={ariaLabel}
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
        width: px,
        height: px,
        border: "none",
        borderRadius: "var(--radius-md)",
        background: bg,
        color: fg,
        cursor: disabled ? "not-allowed" : "pointer",
        opacity: disabled ? 0.55 : 1,
        transition: "background-color 150ms ease, color 150ms ease, transform 120ms ease",
        ...style,
      }}
      {...rest}
    >
      <svg width={isz} height={isz} viewBox="0 0 24 24" fill={selected ? "currentColor" : "none"} stroke="currentColor" strokeWidth={1.6} strokeLinejoin="round" strokeLinecap="round" aria-hidden="true">
        <path d="M5 4.6C5 3.72 5.72 3 6.6 3h10.8c.88 0 1.6.72 1.6 1.6v15.5c0 .82-.92 1.3-1.58.82L12 17.4l-5.42 3.52C5.92 21.4 5 20.92 5 20.1V4.6z" />
      </svg>
    </button>
  );
}
