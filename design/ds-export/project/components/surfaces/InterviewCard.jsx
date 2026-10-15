import React from "react";
import { Badge } from "../core/Badge.jsx";
import { Icon } from "../core/Icon.jsx";

/**
 * InterviewCard — 인물 인터뷰 카드(표면 규칙 1단계: 인물 객체 → 카드). 세로형 1종 — featured/compact 없음,
 *  캐러셀에서 3장이 같은 크기로 선다. 카드 셸은 MentorCard와 같다(white/--card·1px --sage-200·--card-shadow·
 *  --card-radius, hover 시 shadow-md만). 미디어 3:2(--card-media-margin 인셋+--card-media-radius, MentorCard와
 *  같은 값). 배지 2개(국가+직무)는 미디어 좌상단 오버레이 — MentorCard는 하단인데 여기는 상단.
 *  폭을 카드가 고정하지 않는다 — 부모(캐러셀)가 정한다(3열·2열·1열). 높이는 내용이 정한다(절대 높이 없음).
 *  북마크 없음. 루트는 <article> + 스트레치 링크(제목에 <a>, ::after가 카드 전면을 덮는다).
 */
if (typeof document !== "undefined" && !document.getElementById("mt-card-link-style")) {
  const s = document.createElement("style");
  s.id = "mt-card-link-style";
  s.textContent =
    ".mt-card-link{color:inherit;text-decoration:none;-webkit-user-drag:none;}" +
    ".mt-card-link::after{content:'';position:absolute;inset:0;z-index:1;}" +
    ".mt-card-link:focus-visible{outline:none;}" +
    "article:has(.mt-card-link:focus-visible){outline:2px solid var(--ring);outline-offset:2px;}" +
    "@media (hover:hover){article:hover a.mt-card-link{color:var(--primary);}article:hover .mt-card-media-img{transform:scale(1.03);}}.mt-card-media-img{transition:transform 250ms ease-out;}a.mt-card-link{transition:color 250ms ease-out;}@media (prefers-reduced-motion:reduce){.mt-card-media-img{transform:none !important;transition:none;}}";
  document.head.appendChild(s);
}

const clamp = (lines) => ({
  display: "-webkit-box",
  WebkitBoxOrient: "vertical",
  WebkitLineClamp: lines,
  overflow: "hidden",
  wordBreak: "keep-all",
  overflowWrap: "break-word", // 禁則: break-all 금지
});

export function InterviewCard({
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
  const [hover, setHover] = React.useState(false);
  const [imgError, setImgError] = React.useState(false);
  const showImg = image && !imgError;

  return (
    <article
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
      style={{
        position: "relative",
        display: "block",
        boxSizing: "border-box",
        color: "var(--foreground)",
        fontFamily: "var(--font-sans)",
        background: "var(--card)",
        border: "1px solid var(--sage-200)",
        borderRadius: "var(--card-radius)",
        boxShadow: hover ? "var(--shadow-md)" : "var(--card-shadow)",
        transition: "box-shadow 150ms ease",
        ...style,
      }}
      {...rest}
    >
      {/* 미디어 8:5 — MentorCard와 같은 인셋/radius. 배지 2개(국가+직무)는 좌상단 오버레이. */}
      <div style={{ position: "relative", margin: "var(--card-media-margin) var(--card-media-margin) 0", aspectRatio: "8 / 5", background: "var(--sage-100)", borderRadius: "var(--card-media-radius)", overflow: "hidden" }}>
        {showImg ? (
          <img className="mt-card-media-img" src={image} alt={personName || ""} onError={() => setImgError(true)} style={{ width: "100%", height: "100%", objectFit: "cover", display: "block" }} />
        ) : (
          <span style={{ position: "absolute", inset: 0, display: "flex", alignItems: "center", justifyContent: "center", color: "var(--sage-400)" }}>
            <Icon name="user" size={30} />
          </span>
        )}
        <div style={{ position: "absolute", left: 8, top: 8, right: 8, zIndex: 2, display: "flex", alignItems: "center", gap: 6, flexWrap: "wrap", overflow: "hidden" }}>
          {(country || countryLabel) && <Badge size="md" leading="flag" flag={country} style={{ boxShadow: "var(--shadow-sm)" }}>{countryLabel}</Badge>}
          {field && <Badge size="md" style={{ boxShadow: "var(--shadow-sm)" }}>{field}</Badge>}
        </div>
      </div>

      {/* 본문 */}
      <div style={{ padding: "var(--card-content-padding)", display: "flex", flexDirection: "column", gap: 8 }}>
        <a href={href} className="mt-card-link" style={{ display: "block", fontSize: "var(--text-h2)", fontWeight: 600, lineHeight: "var(--text-h2--line-height)", letterSpacing: "var(--text-h2--letter-spacing)", ...clamp(2) }}>{title}</a>
        {excerpt && (
          <div style={{ fontSize: "var(--text-caption)", fontWeight: 400, color: "var(--muted-foreground)", lineHeight: "var(--text-caption--line-height)", letterSpacing: "var(--text-caption--letter-spacing)", ...clamp(3) }}>{excerpt}</div>
        )}
        <div style={{ display: "flex", flexDirection: "column", gap: 1 }}>
          <div style={{ display: "flex", alignItems: "baseline", gap: 6, flexWrap: "wrap" }}>
            <span style={{ fontSize: "var(--text-caption)", fontWeight: 600, lineHeight: "var(--text-caption--line-height)", letterSpacing: "var(--text-caption--letter-spacing)", color: "var(--foreground)" }}>{personName}</span>
            {jobTitle && <span style={{ fontSize: "var(--text-caption)", fontWeight: 500, lineHeight: "var(--text-caption--line-height)", letterSpacing: "var(--text-caption--letter-spacing)", color: "var(--muted-foreground)" }}>{jobTitle}</span>}
          </div>
          {company && <span style={{ fontSize: "var(--text-caption)", fontWeight: 400, lineHeight: "var(--text-caption--line-height)", letterSpacing: "var(--text-caption--letter-spacing)", color: "var(--muted-foreground)" }}>{company}</span>}
        </div>
      </div>
    </article>
  );
}
