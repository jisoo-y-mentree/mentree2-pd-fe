import React from "react";
import { Badge } from "../core/Badge.jsx";
import { Chip } from "../core/Chip.jsx";
import { CountToggle } from "../core/CountToggle.jsx";
import { AvatarGroup } from "../core/Avatar.jsx";
import { Icon } from "../core/Icon.jsx";
import { Flag } from "../core/Flag.jsx";
import { KEYWORD_GROUPS } from "../taxonomy.js";
import { Skeleton } from "./Skeleton.jsx";
import { QnaCard } from "./QnaCard.jsx";

/**
 * QnaListItem (DS-57) — Q&A 한 건을 목록의 한 줄로. 변형 이름은 자리가 아니라 강조점이다.
 *  default=전부 · compact=제목만 · answer=그 멘토의 답변 · question=질문과 답변 수.
 * [셸] 카드가 아니다. 줄 위아래 hairline(--sage-200) — 매 줄이 위·아래 선을 갖고 margin-top:-1px로 겹친다.
 *  그래서 첫 줄 위 · 끝 줄 아래에도 선이 서고, 줄 사이는 1px 하나다(li로 감싸도 같다).
 * [링크] 루트 <article>. 제목 <a className="mt-card-link"> — QnaCard의 스트레치 링크 규칙을 그대로 쓴다
 *  (QnaCard를 import해 그 규칙이 먼저 깔리게 한다). 칩·토글은 z-index:2로 위에서 따로 눌린다.
 * [읽는 순서] DOM은 제목이 먼저. 반응 묶음이 오른쪽 위에 보이는 것은 grid-area로 옮긴 것이다.
 *  포커스 = 제목 → 해시태그 → 도움돼요 → 스크랩.
 * [폭] 768 이하 판정은 viewport가 아니라 줄 자신의 폭(container query)으로 한다 — 좁은 칸에 들어가도 같게.
 * [DS-84 default] Figma 1646:33282. 머리(원형 국기 20 + 국가 · 키워드 아이콘 20 --primary + 키워드 — caption 500 --sage-700, 테두리·면 없음, 묶음 사이 12)
 *  + 오른쪽 「New」(Badge accent md · isNew) → 제목 h3 700(넓으면 1줄 · 768 이하 2줄) → 발췌 caption muted 2줄 → 해시태그 한 줄(Chip sm # 3개 + 「+N」)
 *  → 끝 줄(AvatarGroup 40 · 4개 + 「멘토 답변 N개」 body 500 --primary / 오른쪽 조회 · 하트 · 스크랩). 간격 8 · 12 · 16 · 12 · 줄 위아래 24.
 *  키워드 아이콘은 taxonomy.js KEYWORD_GROUPS 에서 찾는다(prop 없음) — 대분류 이름이면 그룹 icon · 세부 태그면 태그 icon(DS-108). 얼굴 최대 3 + 「+K」(DS-109).
 * [DS-84 question] Figma 1567:22871. 카드 모양 — --radius-lg · 안 여백 20 · 줄 안 간격 16 · 형제 줄 사이 16 · hairline 없음.
 *  면 없음 · 호버 면 --green-100(DS-107 — Figma 첫 줄의 green 면은 호버 상태였다. 제목 색은 바꾸지 않는다). 키워드 → 제목 h2 600 1줄(DS-102 — 줄 폭 768 이하 2줄) → 끝 줄(아바타 + 답변 수 / 조회 · 하트 표시만).
 */
const KW_ICON = {};
// DS-108 — 키워드 아이콘은 대분류 이름(그룹 icon)도 찾는다. 세부 태그는 지금처럼 그 태그의 icon.
KEYWORD_GROUPS.forEach((g) => { if (g.icon) KW_ICON[g.label] = g.icon; g.options.forEach((o) => { KW_ICON[o.value] = o.icon; }); });
void QnaCard;

const MAX_TAGS = 3;
// DS-109 — 답변자 얼굴은 3명까지(+K 는 AvatarGroup). maxAvatars prop 이 이긴다.
const MAX_AVATARS = 3;

if (typeof document !== "undefined" && !document.getElementById("mt-qna-row-style")) {
  const s = document.createElement("style");
  s.id = "mt-qna-row-style";
  s.textContent =
    ".mt-qna-row{container-type:inline-size;}" +
    "@media (hover:hover){.mt-qna-row:hover{background:var(--sage-50);}}" +
    // DS-107 — question 호버 면 --green-100 · 제목 색 그대로(스트레치 링크의 hover --primary 를 이 변형에서만 되돌린다). 포커스 링은 그대로.
    "@media (hover:hover){.mt-qna-row.mt-qna-qrow:hover{background:var(--green-100);}.mt-qna-row.mt-qna-qrow:hover a.mt-card-link{color:inherit;}}" +
    ".mt-qli-g{display:grid;grid-template-columns:minmax(0,1fr) auto;column-gap:var(--space-3);}" +
    ".mt-qli-default{row-gap:0;grid-template-areas:'head new' 'title title' 'excerpt excerpt' 'tags tags' 'ans react';}" +
    ".mt-qli-default>.mt-qli-react{justify-self:end;}" +
    ".mt-qli-t1{-webkit-line-clamp:1;}" +
    "@container (max-width:768px){.mt-qli-t1{-webkit-line-clamp:2;}}" +
    "@container (max-width:520px){.mt-qli-default{grid-template-areas:'head new' 'title title' 'excerpt excerpt' 'tags tags' 'ans ans' 'react react';}.mt-qli-default>.mt-qli-react{justify-self:start;margin-top:12px;}}" +
    ".mt-qna-qrow+.mt-qna-qrow{margin-top:16px !important;}" +
    ".mt-qli-compact{row-gap:var(--space-1);grid-template-areas:'head right' 'title title';}" +
    ".mt-qli-answer{row-gap:var(--space-2);grid-template-areas:'title title' 'body body' 'left right';}" +
    ".mt-qli-question{row-gap:16px;grid-template-areas:'head head' 'title title' 'ans react';}";
  document.head.appendChild(s);
}

const clamp = (lines) => ({
  display: "-webkit-box",
  WebkitBoxOrient: "vertical",
  WebkitLineClamp: lines,
  overflow: "hidden",
  wordBreak: "keep-all",
  overflowWrap: "break-word",
});
const type = (t) => ({
  fontSize: `var(--text-${t})`,
  lineHeight: `var(--text-${t}--line-height)`,
  letterSpacing: `var(--text-${t}--letter-spacing)`,
});
const nowrap = { whiteSpace: "nowrap" };
const above = { position: "relative", zIndex: 2 };
const PAD = { default: "var(--space-6)", compact: "var(--space-3)", answer: "var(--space-4)", question: "20px" };
const noA11y = { "aria-hidden": "true", "aria-label": undefined, role: undefined };

function Views({ n, size = 15 }) {
  return (
    <span style={{ display: "inline-flex", alignItems: "center", gap: 4, color: "var(--muted-foreground)", ...type("caption"), ...nowrap }}>
      <Icon name="view" size={size} />
      <span className="tabular">{n.toLocaleString("ko-KR")}</span>
    </span>
  );
}

// 막대 높이 = 그 자리 글자의 line-height(여러 줄은 줄마다 한 칸), 부품 자리는 그 부품의 높이. 칸 사이 간격은 실제 줄의 grid gap 그대로.
function Lines({ n = 1, lh, width = "100%" }) {
  return (
    <div style={{ display: "flex", flexDirection: "column" }}>
      {Array.from({ length: n }, (_, i) => (
        <div key={i} style={{ height: `var(--text-${lh}--line-height)`, display: "flex", alignItems: "center" }}>
          <Skeleton width={n > 1 && i === n - 1 ? "60%" : width} height="calc(100% - var(--space-2))" />
        </div>
      ))}
    </div>
  );
}

function RowSkeleton({ variant }) {
  const g = (area, el, extra) => <div style={{ gridArea: area, minWidth: 0, ...extra }}>{el}</div>;
  if (variant === "compact") return (<>
    {g("head", <Lines lh="caption" width={120} />)}
    {g("right", <Lines lh="caption" width={48} />)}
    {g("title", <Lines lh="body" width="85%" />)}
  </>);
  if (variant === "answer") return (<>
    {g("title", <Lines lh="h3" width="70%" />)}
    {g("body", <Lines n={3} lh="body" />)}
    {g("left", <Skeleton width={120} height={24} />)}
    {g("right", <Skeleton width={40} height={24} />)}
  </>);
  if (variant === "question") return (<>
    {g("head", <Lines lh="caption" width={100} />)}
    {g("title", <Lines lh="h2" width="80%" />)}
    {g("ans", <Skeleton width={200} height={40} />)}
    {g("react", <Lines lh="caption" width={100} />, { alignSelf: "center" })}
  </>);
  return (<>
    {g("head", <Lines lh="caption" width={180} />)}
    {g("title", <Lines lh="h3" width="80%" />, { marginTop: 8 })}
    {g("excerpt", <Lines n={2} lh="caption" />, { marginTop: 12 })}
    {g("tags", <Skeleton width={200} height={24} />, { marginTop: 16 })}
    {g("ans", <Skeleton width={220} height={40} />, { marginTop: 12 })}
    <div className="mt-qli-react" style={{ gridArea: "react", marginTop: 12, alignSelf: "center" }}><Lines lh="caption" width={150} /></div>
  </>);
}

export function QnaListItem({
  variant = "default",
  href = "#",
  title,
  headingLevel = 3,
  country,
  countryLabel,
  keyword,
  excerpt,
  answerExcerpt,
  tags = [],
  tagHref,
  answerers = [],
  answerCount,
  maxAvatars = MAX_AVATARS,
  isNew = false,
  views = 0,
  likes = 0,
  liked = false,
  onLikeChange,
  scraps = 0,
  scrapped = false,
  onScrapChange,
  showScrap = false,
  loading = false,
  className,
  style,
  ...rest
}) {
  const v = ["default", "compact", "answer", "question"].includes(variant) ? variant : "default";
  const count = answerCount != null ? answerCount : answerers.length;
  const H = `h${Math.min(4, Math.max(2, headingLevel))}`;

  const isQ = v === "question";
  const shell = {
    position: "relative",
    display: "block",
    boxSizing: "border-box",
    width: "100%",
    marginTop: isQ ? 0 : -1,
    borderTop: isQ ? "none" : "1px solid var(--sage-200)",
    borderBottom: isQ ? "none" : "1px solid var(--sage-200)",
    borderRadius: isQ ? "var(--radius-lg)" : undefined,
    padding: isQ ? "20px" : `${PAD[v]} var(--space-4)`,
    color: "var(--foreground)",
    fontFamily: "var(--font-sans)",
    transition: "background-color 150ms ease",
    ...style,
  };
  const cls = ["mt-qna-row", isQ ? "mt-qna-qrow" : null, className].filter(Boolean).join(" ");
  const grid = `mt-qli-g mt-qli-${v}`;

  if (loading) {
    return (
      <div className={cls} aria-hidden="true" style={shell} {...rest}>
        <div className={grid}><RowSkeleton variant={v} /></div>
      </div>
    );
  }

  const titleType = v === "compact" ? "body" : isQ ? "h2" : "h3";
  // DS-102 — question 도 default 와 같은 mt-qli-t1(1줄 · 줄 폭 768 이하 2줄, container query)을 쓴다.
  const titleLines = v === "default" || isQ ? null : 1;
  const heading = (
    <H style={{ gridArea: "title", margin: 0, marginTop: v === "default" ? 8 : 0, minWidth: 0, fontWeight: v === "default" ? 700 : 600, ...type(titleType) }}>
      {titleLines == null
        ? <a href={href} className="mt-card-link mt-qli-t1" style={{ display: "-webkit-box", WebkitBoxOrient: "vertical", overflow: "hidden", wordBreak: "keep-all", overflowWrap: "break-word" }}>{title}</a>
        : <a href={href} className="mt-card-link" style={{ display: "block", ...clamp(titleLines) }}>{title}</a>}
    </H>
  );
  const kwIcon = keyword ? KW_ICON[keyword] : null;
  const kwLabel = keyword && (
    <span style={{ display: "inline-flex", alignItems: "center", gap: 6, minWidth: 0 }}>
      {kwIcon && <Icon name={kwIcon} size={20} {...noA11y} style={{ color: "var(--primary)" }} />}
      <span style={{ overflow: "hidden", textOverflow: "ellipsis", ...nowrap }}>{keyword}</span>
    </span>
  );
  const metaText = { color: "var(--sage-700)", fontWeight: 500, ...type("caption") };
  const answersFoot = (
    <div style={{ gridArea: "ans", alignSelf: "center", display: "flex", alignItems: "center", gap: 10, minWidth: 0, marginTop: v === "default" ? 12 : 0 }}>
      {count > 0 ? (<>
        {answerers.length > 0 && <AvatarGroup items={answerers} max={maxAvatars} size={40} />}
        <span style={{ color: "var(--primary)", fontWeight: 500, ...type("body"), ...nowrap }}>
          멘토 답변 <b className="tabular" style={{ fontWeight: 700 }}>{count}</b>개
        </span>
      </>) : (
        <span style={{ color: "var(--primary)", fontWeight: 500, ...type(isQ ? "caption" : "body") }}>아직 작성된 답변이 없습니다</span>
      )}
    </div>
  );

  const like = <CountToggle icon="favourite" tone="rose" selected={liked} count={likes} onChange={onLikeChange} />;
  const scrap = <CountToggle icon="bookmark" tone="dark" selected={scrapped} count={scraps} onChange={onScrapChange} />;

  let body;
  if (v === "default") {
    const shown = tags.slice(0, MAX_TAGS);
    const extra = tags.length - shown.length;
    body = (<>
      {heading}
      {(country || countryLabel || keyword) && (
        <div style={{ gridArea: "head", display: "flex", alignItems: "center", gap: 12, flexWrap: "wrap", minWidth: 0, ...metaText }}>
          {(country || countryLabel) && (
            <span style={{ display: "inline-flex", alignItems: "center", gap: 6, ...nowrap }}>
              {country && <Flag country={country} size="md" tooltip={false} aria-hidden="true" />}
              {countryLabel}
            </span>
          )}
          {kwLabel}
        </div>
      )}
      {isNew && <div style={{ gridArea: "new", alignSelf: "center", justifySelf: "end" }}><Badge variant="accent" size="md">New</Badge></div>}
      {excerpt && <p style={{ gridArea: "excerpt", margin: 0, marginTop: 12, color: "var(--muted-foreground)", ...type("caption"), ...clamp(2) }}>{excerpt}</p>}
      {tags.length > 0 && (
        <div className="mt-qli-tags" style={{ gridArea: "tags", marginTop: 16, display: "flex", flexWrap: "nowrap", alignItems: "center", gap: 6, minWidth: 0, maxWidth: "100%", ...above }}>
          {shown.map((tg, i) => (
            <Chip key={i} size="sm" prefix="#" href={tagHref ? tagHref(tg) : `/tags/${tg}`} style={{ minWidth: 0, overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>{tg}</Chip>
          ))}
          {extra > 0 && <Badge size="sm" style={{ flex: "0 0 auto" }}>+{extra}</Badge>}
        </div>
      )}
      {answersFoot}
      <div className="mt-qli-react" style={{ gridArea: "react", alignSelf: "center", marginTop: 12, display: "flex", alignItems: "center", gap: "var(--space-4)", ...above }}>
        <Views n={views} size={16} />{like}{scrap}
      </div>
    </>);
  } else if (v === "compact") {
    const meta = [countryLabel, keyword].filter(Boolean).join(" · ");
    body = (<>
      {heading}
      <div style={{ gridArea: "head", minWidth: 0, color: "var(--muted-foreground)", ...type("caption"), overflow: "hidden", textOverflow: "ellipsis", ...nowrap }}>{meta}</div>
      <div style={{ gridArea: "right", display: "flex", alignItems: "center", gap: "var(--space-3)", ...above }}>
        <span style={{ color: "var(--primary)", fontWeight: 600, ...type("caption"), ...nowrap }}>
          {count > 0 ? <>답변 <span className="tabular">{count}</span></> : "답변 대기"}
        </span>
        {showScrap && scrap}
      </div>
    </>);
  } else if (v === "answer") {
    body = (<>
      {heading}
      {answerExcerpt && <p style={{ gridArea: "body", margin: 0, color: "var(--foreground)", ...type("body"), ...clamp(3) }}>{answerExcerpt}</p>}
      <div style={{ gridArea: "left", display: "flex", alignItems: "center", gap: "var(--space-4)", ...above }}>{like}<Views n={views} /></div>
      <div style={{ gridArea: "right", display: "flex", alignItems: "center", ...above }}>{scrap}</div>
    </>);
  } else {
    body = (<>
      {heading}
      {keyword && <div style={{ gridArea: "head", display: "flex", minWidth: 0, ...metaText }}>{kwLabel}</div>}
      {answersFoot}
      {/* 표시만 — 누를 곳은 제목 하나 */}
      <div style={{ gridArea: "react", alignSelf: "center", display: "flex", alignItems: "center", gap: "var(--space-4)" }}>
        <Views n={views} size={16} />
        <span style={{ display: "inline-flex", alignItems: "center", gap: 4, color: "var(--muted-foreground)", ...type("caption"), ...nowrap }}>
          <Icon name="favourite" size={16} {...noA11y} />
          <span className="tabular">{likes.toLocaleString("ko-KR")}</span>
          <span style={{ position: "absolute", width: 1, height: 1, overflow: "hidden", clip: "rect(0 0 0 0)" }}>도움돼요</span>
        </span>
      </div>
    </>);
  }

  return (
    <article className={cls} style={shell} {...rest}>
      <div className={grid}>{body}</div>
    </article>
  );
}
