import React from "react";
import { Badge } from "../core/Badge.jsx";
import { Icon } from "../core/Icon.jsx";

/**
 * ArticlePreview — 투명 콘텐츠 프리뷰(카드 아님). 표면 규칙: 썸네일 자체가 시각 경계.
 *  배경 투명 · 테두리 없음 · 그림자 없음 · 카드 마진 없음(카드 셸 상속 안 함).
 *  동심원 기하는 미디어에만: 썸네일 16:9 + radius 14. 요소 간 수직 리듬만(좌우 패딩 없음).
 *  hover: 썸네일에만 elevation 한 단계 상승(카드 elevation 토큰 재사용, 미세). 컨테이너 배경 없음.
 * [스트레치 링크] 루트는 <article>(position:relative) — <a>가 아니다. 제목에만 <a>를 걸고 그 ::after가
 *  카드 전면을 덮어 카드 전체 클릭을 낸다. 카드의 접근 이름 = 제목 링크 텍스트.
 */
const clamp = (lines) => ({
  display: "-webkit-box",
  WebkitBoxOrient: "vertical",
  WebkitLineClamp: lines,
  overflow: "hidden",
  wordBreak: "keep-all",
  overflowWrap: "break-word", // 禁則: break-all 금지
});

if (typeof document !== "undefined" && !document.getElementById("mt-card-link-style")) {
  const s = document.createElement("style");
  s.id = "mt-card-link-style";
  s.textContent =
    ".mt-card-link{color:inherit;text-decoration:none;-webkit-user-drag:none;}" +
    ".mt-card-link::after{content:'';position:absolute;inset:0;z-index:1;}" +
    ".mt-card-link:focus-visible{outline:none;}" +
    // 포커스 링은 제목 글자가 아니라 카드 테두리에 그린다 — 무엇이 선택됐는지 보이게.
    "article:has(.mt-card-link:focus-visible){outline:2px solid var(--ring);outline-offset:2px;}";
  document.head.appendChild(s);
}

export function ArticlePreview({
  title,
  excerpt,
  image,
  tags = [{ label: "디자인", hue: "indigo" }, { label: "인사이트", hue: "amber" }],
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
        display: "flex",
        flexDirection: "column",
        gap: 10,
        width: "100%",
        boxSizing: "border-box",
        color: "var(--foreground)",
        fontFamily: "var(--font-sans)",
        // 투명: 배경/테두리/그림자/마진 없음. hover 신호는 썸네일 elevation으로만(컨테이너 배경 없음).
        background: "transparent",
        border: "none",
        boxShadow: "none",
        borderRadius: "var(--card-media-radius)",
        padding: 0,
        ...style,
      }}
      {...rest}
    >
      {/* 썸네일 16:9 — 동심원 기하는 미디어에만(radius 14). hover 시 elevation 한 단계 상승(shadow만). 없으면 sage placeholder */}
      <div style={{ position: "relative", width: "100%", aspectRatio: "16 / 9", background: "var(--sage-100)", borderRadius: "var(--card-media-radius)", overflow: "hidden", boxShadow: hover ? "var(--shadow-sm)" : "none", transition: "box-shadow 150ms ease" }}>
        {showImg ? (
          <img
            src={image}
            alt=""
            onError={() => setImgError(true)}
            style={{ width: "100%", height: "100%", objectFit: "cover", display: "block" }}
          />
        ) : (
          <span style={{ position: "absolute", inset: 0, display: "flex", alignItems: "center", justifyContent: "center", color: "var(--sage-400)" }}>
            <Icon name="image-01" size={30} />
          </span>
        )}
      </div>

      {/* 제목 h3, 2줄 고정 — 카드의 유일한 링크(스트레치 링크). */}
      <a href={href} className="mt-card-link" style={{ display: "block", fontSize: "var(--text-h3)", fontWeight: 600, lineHeight: 1.5, ...clamp(2) }}>{title}</a>
      {/* 발췌 body muted, 3줄 고정 */}
      <div style={{ fontSize: "var(--text-body)", fontWeight: 400, color: "var(--muted-foreground)", lineHeight: 1.6, ...clamp(3) }}>{excerpt}</div>
      {/* 하단 컬러 태그 — 질적태그 팔레트(뉴트럴/회색 금지), size sm */}
      {tags.length > 0 && (
        <div style={{ display: "flex", alignItems: "center", gap: 6, flexWrap: "wrap", marginTop: 2 }}>
          {tags.map((t, i) => (
            <Badge key={i} variant="tag" hue={t.hue} size="sm">{t.label}</Badge>
          ))}
        </div>
      )}
    </article>
  );
}
