import React from "react";
import { Badge } from "../core/Badge.jsx";
import { Chip } from "../core/Chip.jsx";
import { CountToggle } from "../core/CountToggle.jsx";
import { AvatarGroup } from "../core/Avatar.jsx";
import { Icon } from "../core/Icon.jsx";

/**
 * QnaCard — 미디어 없는 텍스트 카드(Q&A). 카드 기하·elevation·동심원 원칙 상속.
 * 미디어가 없으므로 카드 전체 콘텐츠 패딩 = --card-content-padding(18px) 통일.
 *
 * [구조] 상단 분류(국가 flag Badge md → 키워드 Badge md, 순서 고정) → 제목 h3(2줄 고정) → 발췌(2줄 고정) →
 *  해시태그 행(Chip sm prefix="#", 최대 5 + Badge "+N") → hairline →
 *  답변 요약(AvatarGroup max 3 + "멘토 답변 N개", 0건이면 "아직 작성된 답변이 없습니다" — 자리를 비우지 않는다) →
 *  하단 메타 행(조회수 표시 전용 / 도움돼요·스크랩 CountToggle).
 *  상단=분류, 하단=반응 — 액션 버튼은 제목 옆에 붙지 않는다.
 * [variant] compact 하나뿐(우측 위젯 "나의 Q&A" — 폭이 좁아 해시태그 행만 통째로 감춘다). 레이아웃 variant는 만들지 않는다.
 * [반응] 도움돼요·스크랩은 제어형(liked/likes · scrapped/scraps) — 카드가 숫자를 스스로 바꾸지 않는다. 조회수는 표시 전용.
 * [CountToggle tone] 도움돼요=rose · 스크랩=dark. green은 쓰지 않는다(이미 "멘토 답변 N개" 등에 쓰임).
 * [해시태그] 태그는 Chip(눌린다, prefix="#" — 라벨에 #를 넣지 않는다). "+N"은 Badge다 — 태그가 아니라 개수이고
 *  눌리지 않는다. 클릭 핸들러·펼침 없음(격자 6장의 높이가 고정돼야 하고, 카드 안에서 펼치면 옆 카드를 덮는다).
 *  전부는 카드 전면 링크가 가는 상세에서 본다.
 * [아바타] 사진만 3장으로 줄인다 — "멘토 답변 N개"의 N은 실제 답변 수 그대로. 순서는 부모가 정해 넘긴다.
 * [색 예산] 정적 상태에서 채도를 쓰는 자리는 국기 · 아바타 사진 · "멘토 답변 N개"의 N, 이 3곳뿐.
 *  해시태그는 항상 --muted 채움(Chip 기본) — 색 있는 배지로 만들지 않는다.
 * [스트레치 링크] 루트는 <article>(position:relative) — <a>가 아니다. 제목에만 <a>(mt-card-link)를 걸고
 *  그 ::after가 카드 전면을 덮는다. 해시태그 Chip·CountToggle은 z-index:2로 그 위에서 독립 클릭.
 *  카드의 접근 이름 = 제목 링크 텍스트. 탭 순서 = 제목 → 해시태그 → 도움돼요 → 스크랩.
 */
const MAX_TAGS = 5; // 5개까지 세우고 나머지는 "+N" 하나로 접는다(펼치지 않는다).

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

export function QnaCard({
  country,
  countryLabel,
  keyword,
  title,
  excerpt,
  tags = [],
  compact = false,
  answerers = [],
  answerCount,
  maxAvatars = 3,
  views = 0,
  liked = false,
  onLikeChange,
  likes = 0,
  scrapped = false,
  onScrapChange,
  scraps = 0,
  href = "#",
  style,
  ...rest
}) {
  const [hover, setHover] = React.useState(false);
  const count = answerCount != null ? answerCount : answerers.length;

  const shownTags = tags.slice(0, MAX_TAGS);
  const extraTags = tags.length - shownTags.length;

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
        background: "var(--card)",
        border: "1px solid var(--sage-200)",
        borderRadius: "var(--card-radius)",
        boxShadow: hover ? "var(--shadow-md)" : "var(--card-shadow)",
        padding: "var(--card-content-padding)",
        transition: "box-shadow 150ms ease",
        ...style,
      }}
      {...rest}
    >
      {/* 1) 상단 — 분류(국가 + 키워드), Badge md */}
      {(country || countryLabel || keyword) && (
        <div style={{ display: "flex", alignItems: "center", gap: 6, flexWrap: "wrap" }}>
          {(country || countryLabel) && <Badge size="md" leading="flag" flag={country}>{countryLabel}</Badge>}
          {keyword && <Badge size="md">{keyword}</Badge>}
        </div>
      )}

      {/* 2) 제목 h3, 2줄 고정 — 카드의 유일한 링크(스트레치 링크). */}
      <a href={href} className="mt-card-link" style={{ display: "block", fontSize: "var(--text-h3)", fontWeight: 600, lineHeight: 1.5, ...clamp(2) }}>{title}</a>

      {/* 3) 발췌 body muted, 3줄 고정 */}
      <div style={{ fontSize: "var(--text-body)", fontWeight: 400, color: "var(--muted-foreground)", lineHeight: 1.6, ...clamp(2) }}>{excerpt}</div>

      {/* 4) 해시태그 — Chip(눌림, prefix="#") 최대 5개 + "+N"은 Badge(개수·안 눌림, 펼치지 않음). compact면 행 전체를 감춘다. */}
      {!compact && shownTags.length > 0 && (
        <div style={{ position: "relative", zIndex: 2, display: "flex", flexWrap: "wrap", alignItems: "center", rowGap: 8, columnGap: 6, maxHeight: 52, overflow: "hidden" }}>
          {shownTags.map((t, i) => (
            <Chip key={i} size="sm" prefix="#" href={`/tags/${t}`}>{t}</Chip>
          ))}
          {extraTags > 0 && <Badge size="sm">+{extraTags}</Badge>}
        </div>
      )}

      {/* 구분선 */}
      <div style={{ height: 1, background: "var(--sage-200)", margin: "2px 0" }} />

      {/* 5) 답변 요약 — 표시 순서(질문자가 도움돼요 누른 답변 → 도움돼요 수 → 최신)는 answerers 배열 순서로 전달받는다. */}
      {count > 0 ? (
        <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
          {answerers.length > 0 && <AvatarGroup items={answerers} max={maxAvatars} size="sm" />}
          <span style={{ fontSize: "var(--text-body)", color: "var(--muted-foreground)" }}>
            멘토 답변 <b className="tabular" style={{ color: "var(--primary)", fontWeight: 600 }}>{count}</b>개
          </span>
        </div>
      ) : (
        <div style={{ fontSize: "var(--text-body)", fontWeight: 500, color: "var(--primary)" }}>아직 작성된 답변이 없습니다</div>
      )}

      {/* 6) 하단 메타 행 — 좌 조회수(무상태) / 우 도움돼요·스크랩(CountToggle). 상단=분류, 하단=반응. */}
      <div style={{ position: "relative", zIndex: 2, display: "flex", alignItems: "center", justifyContent: "space-between" }}>
        <span style={{ display: "inline-flex", alignItems: "center", gap: 4, color: "var(--muted-foreground)", fontSize: "var(--text-caption)" }}>
          <Icon name="view" size={15} />
          <span className="tabular">{views}</span>
        </span>
        <div style={{ display: "flex", alignItems: "center", gap: 14 }}>
          <CountToggle icon="favourite" tone="rose" selected={liked} count={likes} onChange={onLikeChange} />
          <CountToggle icon="bookmark" tone="dark" selected={scrapped} count={scraps} onChange={onScrapChange} />
        </div>
      </div>
    </article>
  );
}
