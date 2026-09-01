import React from "react";
import { Badge } from "../core/Badge.jsx";
import { BookmarkToggle } from "../core/BookmarkToggle.jsx";
import { Icon } from "../core/Icon.jsx";

/**
 * MentorCard — 세로형 멘토 카드(고정폭 296, 리스폰시브 아님). 프리미티브(Badge·BookmarkToggle) 조립.
 *
 * [카드 공통 셸] white(card) · 1px sage-200 헤어라인 · card-shadow · card-radius(동심원).
 *  hover 시 그림자만 상승(shadow-md), 위치 이동 없음(~150ms). 카드 전체가 멘토 상세 링크.
 * [구조] 미디어(Desktop 3:2 · Mobile 5:4, cover 크롭, media-margin 인셋 + media-radius)
 *   · 좌상단: "신규 멘토" 배지(green, status/active recipe) — publishedAt 기준 공개 후 1달만 노출
 *   · 우상단: BookmarkToggle 오버레이(독립 클릭, 전파 차단)
 *   · 미디어 하단 안쪽: 배지 행 — 국가 배지(flag + "대한민국 +N ⌄", +N ⌄는 정적 표시 — 펼침은 Badge 확장 OPEN)
 *     + 직무 배지. 뉴트럴 recipe, size sm. 독립 클릭 영역(전파 차단).
 *  → 이름(h2, 1줄 …) → 직무(500, 1줄 …)/회사(muted, 1줄 …) → 소개 박스(sage-50, 1줄 …).
 * [Mobile ~768] 국가 배지 = 국기만(텍스트 숨김) · 소개 박스 2줄 허용. 폭·구조는 동일(296 고정).
 */

const NEW_WINDOW_MS = 31 * 24 * 60 * 60 * 1000; // 공개 후 1달

if (typeof document !== "undefined" && !document.getElementById("mt-mcard-style")) {
  const s = document.createElement("style");
  s.id = "mt-mcard-style";
  s.textContent = "@media (max-width:768px){.mt-mcard-clabel{display:none !important}.mt-mcard-intro{-webkit-line-clamp:2 !important}.mt-mcard-media{aspect-ratio:5/4 !important}}";
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
  const block = (e) => { e.preventDefault(); e.stopPropagation(); };

  return (
    <a
      href={href}
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
      style={{
        display: "block",
        width: 296,
        flex: "0 0 auto",
        textDecoration: "none",
        color: "var(--foreground)",
        fontFamily: "var(--font-sans)",
        background: "var(--card)",
        border: "1px solid var(--sage-200)",
        borderRadius: "var(--card-radius)",
        boxShadow: hover ? "var(--shadow-md)" : "var(--card-shadow)",
        transition: "box-shadow 150ms ease",
        cursor: "pointer",
        ...style,
      }}
      {...rest}
    >
      {/* 1) 미디어 — Desktop 3:2, Mobile 5:4(cover 크롭). media-margin 인셋 + media-radius(동심원). 사진 없으면 sage placeholder */}
      <div className="mt-mcard-media" style={{ position: "relative", margin: "var(--card-media-margin) var(--card-media-margin) 0", aspectRatio: "3 / 2", background: "var(--sage-100)", borderRadius: "var(--card-media-radius)", overflow: "hidden" }}>
        {showImg ? (
          <img
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
        {/* 좌상단 신규 멘토 배지 — green(status/active recipe). 공개 후 1달 노출. 독립(링크 전파 차단 불필요 — 정적) */}
        {isNew && (
          <Badge variant="status" status="active" size="sm" onClick={block}
            style={{ position: "absolute", top: 8, left: 8, boxShadow: "var(--shadow-sm)" }}>신규 멘토</Badge>
        )}
        {/* 우상단 북마크 오버레이 — IconButton default 형태(md/radius-md), 미디어 안쪽 8px 인셋.
            흰 칩 + 그림자. 카드 링크와 별개 독립 클릭(전파 차단). 오버레이용 radius 임의 생성 금지. */}
        <div
          onClick={block}
          style={{
            position: "absolute",
            top: 8,
            right: 8,
            borderRadius: "var(--radius-md)",
            background: "color-mix(in oklch, white 82%, transparent)",
            backdropFilter: "blur(4px)",
            boxShadow: "var(--shadow-sm), 0 0 0 1px color-mix(in oklch, var(--sage-950) 6%, transparent)",
          }}
        >
          <BookmarkToggle selected={saved} onChange={setSaved} />
        </div>
        {/* 하단 배지 행 — 국가(flag + 라벨 + "+N ⌄") + 직무. 뉴트럴 sm. 독립 클릭(정적 — 펼침은 OPEN). */}
        <div onClick={block} style={{ position: "absolute", left: 8, right: 8, bottom: 8, display: "flex", alignItems: "center", gap: 6, overflow: "hidden" }}>
          {(country || countryLabel) && (
            <Badge size="sm" leading="flag" flag={country} style={{ boxShadow: "var(--shadow-sm)" }}>
              <span className="mt-mcard-clabel" style={{ display: "inline-flex", alignItems: "center", gap: 5 }}>
                {countryLabel}
                {countryExtra > 0 && (
                  <span style={{ display: "inline-flex", alignItems: "center", gap: 1, color: "var(--muted-foreground)" }}>
                    +{countryExtra}<Icon name="arrow-down-01" size={13} />
                  </span>
                )}
              </span>
            </Badge>
          )}
          {field && <Badge size="sm" style={{ boxShadow: "var(--shadow-sm)" }}>{field}</Badge>}
        </div>
      </div>

      {/* 본문 */}
      <div style={{ padding: "var(--card-content-padding)", display: "flex", flexDirection: "column", gap: 8 }}>
        {/* 2) 이름 h2 — 1줄 … */}
        <div style={{ fontSize: "var(--text-h2)", fontWeight: 600, letterSpacing: "0.01em", lineHeight: 1.3, ...ellipsis1 }}>{name}</div>
        {/* 3) 직무(500) / 회사(400, muted) — 웨이트+색 위계, 각 1줄 … */}
        <div style={{ display: "flex", flexDirection: "column", gap: 2 }}>
          <span style={{ fontSize: "var(--text-body)", fontWeight: 500, color: "var(--foreground)", ...ellipsis1 }}>{role}</span>
          <span style={{ fontSize: "var(--text-body)", fontWeight: 400, color: "var(--muted-foreground)", ...ellipsis1 }}>{company}</span>
        </div>
        {/* 4) 소개 박스 — sage-50, Desktop 1줄 …(Mobile 2줄) */}
        {intro && (
          <div style={{ background: "var(--sage-50)", border: "1px solid var(--sage-100)", borderRadius: "var(--radius-md)", padding: "8px 10px" }}>
            <span className="mt-mcard-intro" style={{ display: "-webkit-box", WebkitBoxOrient: "vertical", WebkitLineClamp: 1, overflow: "hidden", fontSize: "var(--text-body)", lineHeight: 1.5, color: "var(--sage-700)" }}>{intro}</span>
          </div>
        )}
      </div>
    </a>
  );
}
