import React from "react";
import { Badge } from "../core/Badge.jsx";
import { BookmarkToggle } from "../core/BookmarkToggle.jsx";
import { Icon } from "../core/Icon.jsx";
import { Flag } from "../core/Flag.jsx";
import { JOB_GROUPS } from "../taxonomy.js";

const JOB_ICON = {};
JOB_GROUPS.forEach((g) => g.options.forEach((o) => { JOB_ICON[o.value] = o.icon; }));

/**
 * MentorCard — 세로형 멘토 카드(DS-37 B안 · Figma 1646:32976). Desktop 296px 고정. `fluid`면 폭을 부모가 정한다(Mobile ~768 · 100% · min-width 160).
 *
 * [카드 공통 셸] white(card) · 1px sage-200 · card-shadow · card-radius · 안쪽 8. hover 시 그림자만 상승(shadow-md).
 * [스트레치 링크] 루트 <article>. 이름에만 <a>를 걸고 ::after가 카드 전면을 덮는다. 스크랩은 z-index:2로 위에서 따로 눌린다.
 * [구조] 미디어(Desktop 3:2 · Mobile 5:4 · --card-media-radius) — 아래쪽 검정 그라데이션(바닥 60% → 44% 지점 0)
 *   · 왼쪽 위 「신규 멘토」 — 면 --green-700 · 흰 글자 caption 500 · 반경 8 · 좌우 6(green-600은 흰 글자 3.76:1로 모자라 700 · 5.02:1). 공개 후 1달만.
 *   · 오른쪽 위 스크랩 — BookmarkToggle(사진 위 스크랩은 이것, DESIGN.md §8.1). 안쪽 8.
 *   · 왼쪽 아래 직종 배지 하나 — Badge category tone="primary" sm leading="icon"(JOB_GROUPS icon). 국가 배지는 사진 위에 없다.
 *  →(8) 이름 h2 600 1줄 … + Flag rect sm(줄지 않는다) + countryExtra 「+N」 caption muted(잠정 표기)
 *  →(4) 직무 caption 500 --sage-700 →(4) 회사 caption muted →(8) 소개 상자(--green-100 · 테두리 없음 · --green-900 caption 500 · 1줄 … · 미디어와 같은 폭) →(8) 바닥.
 * [이름 크기] 카드 폭이 정한다(container query) — 280+ h2 · 200〜280 h3 · 200 미만 body.
 */

const NEW_WINDOW_MS = 31 * 24 * 60 * 60 * 1000; // 공개 후 1달

if (typeof document !== "undefined" && !document.getElementById("mt-mcard-style")) {
  const s = document.createElement("style");
  s.id = "mt-mcard-style";
  s.textContent =
    ".mt-mcard{container-type:inline-size;}" +
    ".mt-mcard-name{font-size:var(--text-h2);line-height:var(--text-h2--line-height);letter-spacing:var(--text-h2--letter-spacing);}" +
    "@container (max-width:279px){.mt-mcard-name{font-size:var(--text-h3);line-height:var(--text-h3--line-height);letter-spacing:var(--text-h3--letter-spacing);}}" +
    "@container (max-width:199px){.mt-mcard-name{font-size:var(--text-body);line-height:var(--text-body--line-height);letter-spacing:var(--text-body--letter-spacing);}}" +
    "@media (max-width:768px){.mt-mcard-fluid{width:100% !important;min-width:160px !important}.mt-mcard-fluid .mt-mcard-media{aspect-ratio:5/4 !important}.mt-mcard-fluid .mt-mcard-body{padding:8px 12px !important}.mt-mcard-fluid .mt-mcard-introbox{margin-left:-4px !important;margin-right:-4px !important}}";
  document.head.appendChild(s);
}
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

const ellipsis1 = { overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" };

export function MentorCard({
  name,
  role,
  company,
  intro,
  field,
  country,
  countryLabel,
  countryExtra = 0,
  publishedAt,
  photo,
  href = "#",
  fluid = false,
  bookmarked = false,
  onBookmarkChange,
  style,
  ...rest
}) {
  const controlled = onBookmarkChange != null;
  const [savedU, setSavedU] = React.useState(bookmarked);
  const saved = controlled ? bookmarked : savedU;
  const setSaved = (n) => { if (controlled) onBookmarkChange(n); else setSavedU(n); };
  const [hover, setHover] = React.useState(false);
  const [imgError, setImgError] = React.useState(false);
  const showImg = photo && !imgError;
  const isNew = publishedAt && (Date.now() - new Date(publishedAt).getTime()) <= NEW_WINDOW_MS;

  return (
    <article
      className={fluid ? "mt-mcard mt-mcard-fluid" : "mt-mcard"}
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
      style={{
        position: "relative",
        display: "block",
        width: 296,
        flex: "0 0 auto",
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
      {/* 1) 미디어 — Desktop 3:2, Mobile 5:4(cover 크롭). media-margin 인셋 + media-radius(동심원). 사진 없으면 sage placeholder */}
      <div className="mt-mcard-media" style={{ position: "relative", margin: "var(--card-media-margin) var(--card-media-margin) 0", aspectRatio: "3 / 2", background: "var(--sage-100)", borderRadius: "var(--card-media-radius)", overflow: "hidden" }}>
        {showImg ? (
          <img
            className="mt-card-media-img"
            src={photo}
            alt={name || ""}
            onError={() => setImgError(true)}
            style={{ width: "100%", height: "100%", objectFit: "cover", display: "block" }}
          />
        ) : (
          <span style={{ position: "absolute", inset: 0, display: "flex", alignItems: "center", justifyContent: "center", color: "var(--sage-400)" }}>
            <Icon name="user" size={30} />
          </span>
        )}
        {/* 아래쪽 검정 그라데이션 — 바닥 60% → 44% 지점 0 */}
        <span aria-hidden="true" style={{ position: "absolute", inset: 0, pointerEvents: "none", background: "linear-gradient(to top, color-mix(in oklch, var(--sage-950) 60%, transparent) 0%, transparent 44%)" }} />
        {isNew && (
          <span style={{ position: "absolute", top: 8, left: 8, display: "inline-flex", alignItems: "center", height: 24, padding: "0 6px", borderRadius: 8, background: "var(--green-700)", color: "var(--card)", fontSize: "var(--text-caption)", fontWeight: 500, lineHeight: 1, whiteSpace: "nowrap" }}>신규 멘토</span>
        )}
        <div style={{ position: "absolute", top: 8, right: 8, zIndex: 2, display: "inline-flex" }}>
          <BookmarkToggle ariaLabel="스크랩" selected={saved} onChange={setSaved} />
        </div>
        {field && (
          <div style={{ position: "absolute", left: 8, right: 8, bottom: 8, display: "flex", overflow: "hidden" }}>
            <Badge tone="primary" size="sm" leading={JOB_ICON[field] ? "icon" : "none"} icon={JOB_ICON[field]} style={{ maxWidth: "100%", overflow: "hidden" }}>{field}</Badge>
          </div>
        )}
      </div>

      <div className="mt-mcard-body" style={{ padding: "8px var(--card-content-padding)", display: "flex", flexDirection: "column" }}>
        <div style={{ display: "flex", alignItems: "center", gap: 6, minWidth: 0 }}>
          <a href={href} className="mt-card-link mt-mcard-name" style={{ display: "block", minWidth: 0, fontWeight: 600, ...ellipsis1 }}>{name}</a>
          {country && <Flag country={country} label={countryLabel} shape="rect" size="sm" tooltip={false} style={{ flex: "0 0 auto" }} />}
          {countryExtra > 0 && <span style={{ flex: "0 0 auto", fontSize: "var(--text-caption)", lineHeight: 1, color: "var(--muted-foreground)" }}>+{countryExtra}</span>}
        </div>
        {role && <span style={{ marginTop: 4, fontSize: "var(--text-caption)", fontWeight: 500, lineHeight: "var(--text-caption--line-height)", letterSpacing: "var(--text-caption--letter-spacing)", color: "var(--sage-700)", ...ellipsis1 }}>{role}</span>}
        {company && <span style={{ marginTop: 4, fontSize: "var(--text-caption)", fontWeight: 400, lineHeight: "var(--text-caption--line-height)", letterSpacing: "var(--text-caption--letter-spacing)", color: "var(--muted-foreground)", ...ellipsis1 }}>{company}</span>}
        {intro && (
          <div className="mt-mcard-introbox" style={{ marginTop: 8, marginLeft: -10, marginRight: -10, background: "var(--green-100)", borderRadius: "var(--card-media-radius)", padding: 10 }}>
            <span style={{ display: "block", fontSize: "var(--text-caption)", fontWeight: 500, lineHeight: "var(--text-caption--line-height)", letterSpacing: "var(--text-caption--letter-spacing)", color: "var(--green-900)", ...ellipsis1 }}>{intro}</span>
          </div>
        )}
      </div>
    </article>
  );
}
