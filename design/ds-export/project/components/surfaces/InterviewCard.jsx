import React from "react";
import { Badge } from "../core/Badge.jsx";
import { Icon } from "../core/Icon.jsx";

/**
 * InterviewCard — 인물 인터뷰 카드(표면 규칙 1단계: 인물 객체 → 카드).
 *  카드 셸·elevation·동심원 기하 상속. 좌우 가로 분할(좌 미디어 1:1 / 우 정보). TOP용 가로형.
 *  카드 전체 클릭 → 인터뷰 상세. 북마크 없음(후킹 섹션, 저장 액션 없음).
 *  size 변형: "featured"(대형, 발췌 있음) / "compact"(소형, 발췌 없음). 별개 컴포넌트 아님.
 */
const SIZES = {
  featured: {
    media: 320, card: 336, gap: "var(--card-media-gap-featured)",
    titleVar: "--text-h1", titleClamp: 2, excerpt: true,
    excerptSize: "var(--text-h3)",
    nameSize: "var(--text-h3)",
    metaSize: "var(--text-body)",
    metaInline: false, iconSize: 48,
  },
  compact: {
    media: 144, card: 160, gap: "var(--card-media-gap-compact)",
    titleVar: "--text-h3", titleClamp: 2, excerpt: false,
    nameSize: "var(--text-body)",
    metaSize: "var(--text-caption)",
    metaInline: true, iconSize: 30,
  },
};

const clamp = (lines) => ({
  display: "-webkit-box",
  WebkitBoxOrient: "vertical",
  WebkitLineClamp: lines,
  overflow: "hidden",
  wordBreak: "keep-all",
  overflowWrap: "break-word", // 禁則: break-all 금지
});

export function InterviewCard({
  size = "featured",
  title,
  excerpt,
  image,
  personName,
  company,
  jobTitle,
  field,
  country,
  countryLabel,
  href = "#",
  style,
  ...rest
}) {
  const s = SIZES[size] || SIZES.featured;
  const [hover, setHover] = React.useState(false);
  const [imgError, setImgError] = React.useState(false);
  const showImg = image && !imgError;

  return (
    <a
      href={href}
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
      style={{
        display: "flex",
        gap: 0,
        width: "100%",
        height: s.card,           // TOP 변형 한정: 미디어가 카드 높이 결정(featured 336 / compact 160)
        boxSizing: "border-box",
        textDecoration: "none",
        color: "var(--foreground)",
        fontFamily: "var(--font-sans)",
        background: "var(--card)",
        border: "1px solid var(--sage-200)",
        borderRadius: "var(--card-radius)",
        boxShadow: hover ? "var(--shadow-md)" : "var(--card-shadow)",
        overflow: "hidden",
        transition: "box-shadow 150ms ease",
        cursor: "pointer",
        ...style,
      }}
      {...rest}
    >
      {/* 좌: 미디어 1:1 고정 — 마진 8(상·하·좌) + radius 14. 우측 간격은 media-gap이 담당(이중 계산 방지). 없으면 sage placeholder */}
      <div style={{ flex: "0 0 auto", margin: "var(--card-media-margin) 0 var(--card-media-margin) var(--card-media-margin)" }}>
        <div style={{ position: "relative", width: s.media, height: s.media, background: "var(--sage-100)", borderRadius: "var(--card-media-radius)", overflow: "hidden" }}>
          {showImg ? (
            <img src={image} alt={personName || ""} onError={() => setImgError(true)} style={{ width: "100%", height: "100%", objectFit: "cover", display: "block" }} />
          ) : (
            <span style={{ position: "absolute", inset: 0, display: "flex", alignItems: "center", justifyContent: "center", color: "var(--sage-400)" }}>
              <Icon name="user" size={s.iconSize} />
            </span>
          )}
        </div>
      </div>

      {/* 우: 텍스트 — 미디어 높이에 맞춰 space-between(상단 top-align / 하단 bottom-align).
          card-media-gap 간격, content-padding이 상·우·하에 걸려 미디어 높이에 맞게 끝난다. */}
      <div style={{ flex: 1, minWidth: 0, display: "flex", flexDirection: "column", justifyContent: "space-between", gap: 10, padding: "var(--card-content-padding) var(--card-content-padding) var(--card-content-padding) 0", paddingLeft: s.gap }}>
        {/* 상단 블록 — 미디어 top 정렬: 배지 + 제목 (+ 발췌) */}
        <div style={{ display: "flex", flexDirection: "column", gap: 8, minWidth: 0 }}>
          <div style={{ display: "flex", alignItems: "center", gap: 6, flexWrap: "wrap" }}>
            {(country || countryLabel) && <Badge size="sm" leading="flag" flag={country}>{countryLabel}</Badge>}
            {field && <Badge size="sm">{field}</Badge>}
          </div>
          <div style={{ fontSize: `var(${s.titleVar})`, fontWeight: 700, letterSpacing: "0.01em", lineHeight: 1.35, ...clamp(s.titleClamp) }}>{title}</div>
          {s.excerpt && excerpt && (
            <div style={{ fontSize: s.excerptSize, fontWeight: 400, color: "var(--muted-foreground)", lineHeight: 1.6, ...clamp(2) }}>{excerpt}</div>
          )}
        </div>

        {/* 하단 블록 — 미디어 bottom 정렬: 이름 · 직무 · 회사 */}
        {s.metaInline ? (
          /* compact: 이름 + 직무 같은 행 / 그 아래 회사 */
          <div style={{ display: "flex", flexDirection: "column", gap: 1, minWidth: 0 }}>
            <div style={{ display: "flex", alignItems: "baseline", gap: 6, flexWrap: "wrap" }}>
              <span style={{ fontSize: s.nameSize, fontWeight: 600, color: "var(--foreground)" }}>{personName}</span>
              {jobTitle && <span style={{ fontSize: s.metaSize, fontWeight: 500, color: "var(--muted-foreground)" }}>{jobTitle}</span>}
            </div>
            {company && <span style={{ fontSize: s.metaSize, fontWeight: 400, color: "var(--muted-foreground)" }}>{company}</span>}
          </div>
        ) : (
          /* featured: 이름 → 직무 → 회사 세로 3행 */
          <div style={{ display: "flex", flexDirection: "column", gap: 2, minWidth: 0 }}>
            <span style={{ fontSize: s.nameSize, fontWeight: 600, color: "var(--foreground)", lineHeight: 1.4 }}>{personName}</span>
            {jobTitle && <span style={{ fontSize: s.metaSize, fontWeight: 500, color: "var(--muted-foreground)", lineHeight: 1.5 }}>{jobTitle}</span>}
            {company && <span style={{ fontSize: s.metaSize, fontWeight: 400, color: "var(--muted-foreground)", lineHeight: 1.5 }}>{company}</span>}
          </div>
        )}
      </div>
    </a>
  );
}
