import React from "react";
import { Badge } from "../core/Badge.jsx";
import { Icon } from "../core/Icon.jsx";
import { BookmarkToggle } from "../core/BookmarkToggle.jsx";

/**
 * ArticlePreview — 투명 콘텐츠 프리뷰(카드 아님). 표면 규칙: 썸네일 자체가 시각 경계.
 *  배경 투명 · 테두리 없음 · 그림자 없음 · 카드 마진 없음(카드 셸 상속 안 함).
 *  동심원 기하는 미디어에만: 썸네일 16:9 + radius 14. 요소 간 수직 리듬만(좌우 패딩 없음).
 *  hover: 썸네일에만 elevation 한 단계 상승(카드 elevation 토큰 재사용, 미세). 컨테이너 배경 없음.
 * [스트레치 링크] 루트는 <article>(position:relative) — <a>가 아니다. 제목에만 <a>를 걸고 그 ::after가
 *  카드 전면을 덮어 카드 전체 클릭을 낸다. 카드의 접근 이름 = 제목 링크 텍스트.
 * [DS-33 variant]
 *  default — 세로형. ratio "16:9"(기본) · "3:2"(TOP 큰 카드). label = 제목 위 body 600 --primary(「신규 아티클」).
 *   제목 · 발췌 크기는 카드 폭이 정한다 — 560+ 제목 h0 600 · 발췌 body 500 muted / 그보다 좁으면 h3 · caption.
 *  row — 인사이트 목록 한 줄(Figma 1695:90429). 왼쪽 글 · 오른쪽 썸네일 296 16:9 + BookmarkToggle(안쪽 8).
 *   셸 없음 · hairline --border · 위아래 24 · 사이 40. 태그 → 8 → 제목 h3 700 2줄 → 12 → 발췌 body muted 3줄 → 12 → 날짜 caption muted.
 *   좁은 폭: 640 미만 썸네일 160 · 사이 20 · 발췌 2줄 / 440 미만 썸네일 128 · 사이 16.
 *  compact — TOP 인사이트 밴드의 작은 줄(Figma 1610:30038). 썸네일 196 3:2 · 0.5px --border → 16 → 제목 h2 600 1줄 / 16 / 태그. 형제 줄 사이 24.
 *   DS-103 — 줄 폭 560 미만이면 썸네일 120(120×80) · 제목 2줄 말줄임.
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
    "article:has(.mt-card-link:focus-visible){outline:2px solid var(--ring);outline-offset:2px;}" +
    "@media (hover:hover){article:hover a.mt-card-link{color:var(--primary);}article:hover .mt-card-media-img{transform:scale(1.03);}}.mt-card-media-img{transition:transform 250ms ease-out;}a.mt-card-link{transition:color 250ms ease-out;}@media (prefers-reduced-motion:reduce){.mt-card-media-img{transform:none !important;transition:none;}}";
  document.head.appendChild(s);
}

if (typeof document !== "undefined" && !document.getElementById("mt-ap-style")) {
  const s = document.createElement("style");
  s.id = "mt-ap-style";
  s.textContent =
    ".mt-ap{container-type:inline-size;}" +
    ".mt-ap-t{font-size:var(--text-h3);line-height:var(--text-h3--line-height);letter-spacing:var(--text-h3--letter-spacing);}" +
    ".mt-ap-x{font-size:var(--text-caption);line-height:var(--text-caption--line-height);letter-spacing:var(--text-caption--letter-spacing);font-weight:400;}" +
    "@container (min-width:560px){.mt-ap-t{font-size:var(--text-h0);line-height:var(--text-h0--line-height);letter-spacing:var(--text-h0--letter-spacing);}.mt-ap-x{font-size:var(--text-body);line-height:var(--text-body--line-height);letter-spacing:var(--text-body--letter-spacing);font-weight:500;}}" +
    ".mt-ap-row-g{display:grid;grid-template-columns:minmax(0,1fr) 296px;column-gap:40px;align-items:start;}" +
    ".mt-ap-row-x{-webkit-line-clamp:3;}" +
    "@container (max-width:639px){.mt-ap-row-g{grid-template-columns:minmax(0,1fr) 160px;column-gap:20px;}.mt-ap-row-x{-webkit-line-clamp:2;}}" +
    "@container (max-width:439px){.mt-ap-row-g{grid-template-columns:minmax(0,1fr) 128px;column-gap:16px;}}" +
    ".mt-ap-crow+.mt-ap-crow{margin-top:24px;}" +
    // DS-103 — compact: 줄 폭 560 미만이면 썸네일 120(3:2 · 120×80) · 제목 2줄. 560 이상은 196 · 1줄.
    ".mt-ap-c-th{flex:0 0 196px;}" +
    ".mt-ap-c-t{display:block;overflow:hidden;text-overflow:ellipsis;white-space:nowrap;}" +
    "@container (max-width:559px){.mt-ap-c-th{flex-basis:120px;}.mt-ap-c-t{display:-webkit-box;-webkit-box-orient:vertical;-webkit-line-clamp:2;white-space:normal;word-break:keep-all;overflow-wrap:break-word;}}";
  document.head.appendChild(s);
}

function formatDate(d) {
  if (!d) return "";
  const dt = typeof d === "string" ? new Date(d) : d;
  if (Number.isNaN(dt.getTime())) return String(d);
  const p = (n) => String(n).padStart(2, "0");
  return `${dt.getFullYear()}.${p(dt.getMonth() + 1)}.${p(dt.getDate())}`;
}

function Thumb({ image, ratio, width = "100%", hover, border, children }) {
  const [imgError, setImgError] = React.useState(false);
  const showImg = image && !imgError;
  return (
    <div style={{ position: "relative", width, aspectRatio: ratio, background: "var(--sage-100)", borderRadius: "var(--card-media-radius)", overflow: "hidden", boxShadow: [hover ? "var(--shadow-sm)" : null, border ? "inset 0 0 0 0.5px var(--border)" : null].filter(Boolean).join(", ") || "none", transition: "box-shadow 150ms ease" }}>
      {showImg ? (
        <img className="mt-card-media-img" src={image} alt="" onError={() => setImgError(true)} style={{ width: "100%", height: "100%", objectFit: "cover", display: "block" }} />
      ) : (
        <span style={{ position: "absolute", inset: 0, display: "flex", alignItems: "center", justifyContent: "center", color: "var(--sage-400)" }}><Icon name="image-01" size={30} /></span>
      )}
      {children}
    </div>
  );
}

const Tags = ({ tags, style }) => tags.length > 0 ? (
  <div style={{ display: "flex", alignItems: "center", gap: 6, flexWrap: "wrap", ...style }}>
    {tags.map((tg, i) => <Badge key={i} variant="tag" hue={tg.hue} size="sm">{tg.label}</Badge>)}
  </div>
) : null;

const DEFAULT_TAGS = [{ label: "디자인", hue: "indigo" }, { label: "인사이트", hue: "amber" }];

export function ArticlePreview({
  variant = "default",
  title,
  excerpt,
  image,
  tags = DEFAULT_TAGS,
  href = "#",
  ratio = "16:9",
  label,
  date,
  bookmarked = false,
  onBookmarkChange,
  className,
  style,
  ...rest
}) {
  const [hover, setHover] = React.useState(false);
  const controlled = onBookmarkChange != null;
  const [savedU, setSavedU] = React.useState(bookmarked);
  const saved = controlled ? bookmarked : savedU;
  const setSaved = (n) => { if (controlled) onBookmarkChange(n); else setSavedU(n); };
  const hov = { onMouseEnter: () => setHover(true), onMouseLeave: () => setHover(false) };
  const base = { position: "relative", boxSizing: "border-box", width: "100%", color: "var(--foreground)", fontFamily: "var(--font-sans)", background: "transparent" };
  const cls = (x) => ["mt-ap", x, className].filter(Boolean).join(" ");

  if (variant === "row") {
    return (
      <article className={cls("mt-ap-row")} {...hov} style={{ ...base, display: "block", padding: "24px 0", marginTop: -1, borderTop: "1px solid var(--border)", borderBottom: "1px solid var(--border)", ...style }} {...rest}>
        <div className="mt-ap-row-g">
          <div style={{ display: "flex", flexDirection: "column", minWidth: 0 }}>
            <Tags tags={tags} style={{ marginBottom: 8 }} />
            <a href={href} className="mt-card-link" style={{ display: "block", fontSize: "var(--text-h3)", fontWeight: 700, lineHeight: "var(--text-h3--line-height)", letterSpacing: "var(--text-h3--letter-spacing)", ...clamp(2) }}>{title}</a>
            {excerpt && <p className="mt-ap-row-x" style={{ margin: "12px 0 0", fontSize: "var(--text-body)", lineHeight: "var(--text-body--line-height)", letterSpacing: "var(--text-body--letter-spacing)", color: "var(--muted-foreground)", display: "-webkit-box", WebkitBoxOrient: "vertical", overflow: "hidden", wordBreak: "keep-all", overflowWrap: "break-word" }}>{excerpt}</p>}
            {date && <span style={{ marginTop: 12, fontSize: "var(--text-caption)", lineHeight: "var(--text-caption--line-height)", color: "var(--muted-foreground)" }}>{formatDate(date)}</span>}
          </div>
          <Thumb image={image} ratio="16 / 9" hover={hover}>
            <div style={{ position: "absolute", top: 8, right: 8, zIndex: 2, display: "inline-flex" }}>
              <BookmarkToggle ariaLabel="스크랩" selected={saved} onChange={setSaved} />
            </div>
          </Thumb>
        </div>
      </article>
    );
  }

  if (variant === "compact") {
    return (
      <article className={cls("mt-ap-crow")} {...hov} style={{ ...base, display: "flex", alignItems: "center", gap: 16, ...style }} {...rest}>
        {/* DS-103 — 썸네일 폭은 줄 폭이 정한다(196 / 560 미만 120) */}
        <div className="mt-ap-c-th"><Thumb image={image} ratio="3 / 2" hover={hover} border /></div>
        <div style={{ display: "flex", flexDirection: "column", gap: 16, minWidth: 0, flex: "1 1 auto" }}>
          <a href={href} className="mt-card-link mt-ap-c-t" style={{ fontSize: "var(--text-h2)", fontWeight: 600, lineHeight: "var(--text-h2--line-height)", letterSpacing: "var(--text-h2--letter-spacing)" }}>{title}</a>
          <Tags tags={tags} />
        </div>
      </article>
    );
  }

  return (
    <article className={cls()} {...hov} style={{ ...base, display: "flex", flexDirection: "column", gap: 10, border: "none", boxShadow: "none", borderRadius: "var(--card-media-radius)", padding: 0, ...style }} {...rest}>
      <Thumb image={image} ratio={ratio === "3:2" ? "3 / 2" : "16 / 9"} hover={hover} />
      {label && <span style={{ fontSize: "var(--text-body)", lineHeight: "var(--text-body--line-height)", fontWeight: 600, color: "var(--primary)" }}>{label}</span>}
      <a href={href} className="mt-card-link mt-ap-t" style={{ display: "block", fontWeight: 600, ...clamp(2) }}>{title}</a>
      {excerpt && <div className="mt-ap-x" style={{ color: "var(--muted-foreground)", ...clamp(3) }}>{excerpt}</div>}
      <Tags tags={tags} style={{ marginTop: 2 }} />
    </article>
  );
}
