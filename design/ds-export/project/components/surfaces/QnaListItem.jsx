import React from "react";
import { Badge } from "../core/Badge.jsx";
import { Chip } from "../core/Chip.jsx";
import { CountToggle } from "../core/CountToggle.jsx";
import { AvatarGroup } from "../core/Avatar.jsx";
import { Icon } from "../core/Icon.jsx";
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
 */
void QnaCard;

const MAX_TAGS = 3;

if (typeof document !== "undefined" && !document.getElementById("mt-qna-row-style")) {
  const s = document.createElement("style");
  s.id = "mt-qna-row-style";
  s.textContent =
    ".mt-qna-row{container-type:inline-size;}" +
    "@media (hover:hover){.mt-qna-row:hover{background:var(--sage-50);}}" +
    ".mt-qli-g{display:grid;grid-template-columns:minmax(0,1fr) auto;column-gap:var(--space-3);}" +
    ".mt-qli-default{row-gap:var(--space-2);grid-template-areas:'head react' 'title title' 'excerpt excerpt' 'ans tags';}" +
    ".mt-qli-default>.mt-qli-react{justify-self:end;}.mt-qli-default>.mt-qli-tags{justify-self:end;}" +
    "@container (max-width:768px){.mt-qli-default{grid-template-areas:'head react' 'title title' 'excerpt excerpt' 'ans ans' 'tags tags';}.mt-qli-default>.mt-qli-tags{justify-self:start;}}" +
    ".mt-qli-compact{row-gap:var(--space-1);grid-template-areas:'head right' 'title title';}" +
    ".mt-qli-answer{row-gap:var(--space-2);grid-template-areas:'title title' 'body body' 'left right';}" +
    ".mt-qli-question{row-gap:var(--space-1);column-gap:var(--space-6);grid-template-areas:'head count' 'title count' 'meta count';}";
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
const PAD = { default: "var(--space-4)", compact: "var(--space-3)", answer: "var(--space-4)", question: "var(--space-4)" };

function Views({ n }) {
  return (
    <span style={{ display: "inline-flex", alignItems: "center", gap: 4, color: "var(--muted-foreground)", ...type("caption"), ...nowrap }}>
      <Icon name="view" size={15} />
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
    {g("head", <Lines lh="caption" width={80} />)}
    {g("title", <Lines n={2} lh="h3" />)}
    {g("meta", <Lines lh="caption" width={140} />)}
    {g("count", <Skeleton width={40} height="var(--text-display--line-height)" />, { alignSelf: "center" })}
  </>);
  return (<>
    {g("head", <Skeleton width={160} height={28} />)}
    <div className="mt-qli-react" style={{ gridArea: "react" }}><Skeleton width={140} height={28} /></div>
    {g("title", <Lines n={2} lh="h3" />)}
    {g("excerpt", <Lines n={2} lh="caption" />)}
    {g("ans", <Skeleton width={150} height={24} />)}
    <div className="mt-qli-tags" style={{ gridArea: "tags" }}><Skeleton width={180} height={24} /></div>
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
  maxAvatars = 3,
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

  const shell = {
    position: "relative",
    display: "block",
    boxSizing: "border-box",
    width: "100%",
    marginTop: -1,
    borderTop: "1px solid var(--sage-200)",
    borderBottom: "1px solid var(--sage-200)",
    padding: `${PAD[v]} var(--space-4)`,
    color: "var(--foreground)",
    fontFamily: "var(--font-sans)",
    transition: "background-color 150ms ease",
    ...style,
  };
  const cls = ["mt-qna-row", className].filter(Boolean).join(" ");
  const grid = `mt-qli-g mt-qli-${v}`;

  if (loading) {
    return (
      <div className={cls} aria-hidden="true" style={shell} {...rest}>
        <div className={grid}><RowSkeleton variant={v} /></div>
      </div>
    );
  }

  const titleType = v === "compact" ? "body" : "h3";
  const titleLines = v === "compact" || v === "answer" ? 1 : 2;
  const heading = (
    <H style={{ gridArea: "title", margin: 0, minWidth: 0, fontWeight: 600, ...type(titleType) }}>
      <a href={href} className="mt-card-link" style={{ display: "block", ...clamp(titleLines) }}>{title}</a>
    </H>
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
        <div style={{ gridArea: "head", display: "flex", alignItems: "center", gap: 6, flexWrap: "wrap", minWidth: 0 }}>
          {(country || countryLabel) && <Badge size="md" leading="flag" flag={country}>{countryLabel}</Badge>}
          {keyword && <Badge size="md">{keyword}</Badge>}
        </div>
      )}
      {excerpt && <p style={{ gridArea: "excerpt", margin: 0, color: "var(--muted-foreground)", ...type("caption"), ...clamp(2) }}>{excerpt}</p>}
      <div style={{ gridArea: "ans", alignSelf: "center", display: "flex", alignItems: "center", gap: 10, minWidth: 0 }}>
        {count > 0 ? (<>
          {answerers.length > 0 && <AvatarGroup items={answerers} max={maxAvatars} size="sm" />}
          <span style={{ color: "var(--muted-foreground)", ...type("caption"), ...nowrap }}>
            멘토 답변 <b className="tabular" style={{ color: "var(--primary)", fontWeight: 600 }}>{count}</b>개
          </span>
        </>) : (
          <span style={{ color: "var(--primary)", fontWeight: 500, ...type("caption") }}>아직 작성된 답변이 없습니다</span>
        )}
      </div>
      {tags.length > 0 && (
        <div className="mt-qli-tags" style={{ gridArea: "tags", alignSelf: "center", display: "flex", flexWrap: "nowrap", alignItems: "center", gap: 6, minWidth: 0, maxWidth: "100%", ...above }}>
          {shown.map((t, i) => (
            <Chip key={i} size="sm" prefix="#" href={tagHref ? tagHref(t) : `/tags/${t}`} style={{ minWidth: 0, overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>{t}</Chip>
          ))}
          {extra > 0 && <Badge size="sm" style={{ flex: "0 0 auto" }}>+{extra}</Badge>}
        </div>
      )}
      <div className="mt-qli-react" style={{ gridArea: "react", alignSelf: "start", display: "flex", alignItems: "center", gap: "var(--space-4)", ...above }}>
        <Views n={views} />{like}{scrap}
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
      <div style={{ gridArea: "head", display: "flex", alignItems: "baseline", gap: "var(--space-2)", minWidth: 0, ...type("caption") }}>
        <span style={{ color: "var(--primary)", fontWeight: 600 }}>Q.</span>
        {keyword && <span style={{ color: "var(--muted-foreground)" }}>{keyword}</span>}
      </div>
      <div className="tabular" style={{ gridArea: "meta", color: "var(--muted-foreground)", ...type("caption"), ...nowrap }}>
        조회 {views.toLocaleString("ko-KR")} · 도움돼요 {likes.toLocaleString("ko-KR")}
      </div>
      <div style={{ gridArea: "count", alignSelf: "center", display: "flex", flexDirection: "column", alignItems: "center", ...nowrap }}>
        {count > 0 ? (<>
          <span className="tabular" style={{ color: "var(--foreground)", fontWeight: 600, ...type("display") }}>{count}</span>
          <span style={{ color: "var(--muted-foreground)", ...type("caption") }}>멘토 답변</span>
        </>) : (
          <span style={{ color: "var(--primary)", ...type("caption") }}>답변 대기</span>
        )}
      </div>
    </>);
  }

  return (
    <article className={cls} style={shell} {...rest}>
      <div className={grid}>{body}</div>
    </article>
  );
}
