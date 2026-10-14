import React from "react";
import { Avatar } from "../core/Avatar.jsx";
import { Button } from "../core/Button.jsx";
import { IconButton } from "../core/IconButton.jsx";
import { CountToggle } from "../core/CountToggle.jsx";
import { Flag } from "../core/Flag.jsx";
import { Icon } from "../core/Icon.jsx";
import { Popover, popoverMenuItemStyle } from "../overlays/Popover.jsx";

/**
 * AnswerCard — Q&A 상세의 멘토 답변 1건(DS-23 개정 · Figma 1695:90003 / 90005 / 90004). 루트는 <article>.
 *  답변은 갈 곳이 없다(답변 상세 페이지 없음) — 카드 전체 링크를 만들지 않는다. 링크는 머리 상자 하나뿐.
 *
 * [구조] 위에서 아래로.
 *  카드 = 1px --border · 흰 면 · 안쪽 여백 10 · 바깥 반경 = --radius-lg + 10(머리 상자와 동심원, DESIGN.md §7).
 *  ① 머리 상자 = --green-50 · --radius-lg · 16/20. 상자 전체가 멘토 상세로 가는 <a> 하나(새 창).
 *     Avatar 60 | 이름 --text-h2 700 + Flag rect md / 「국가 · 직무 @회사 (연차)」 --text-body-sm muted | 「멘토 프로필 보기 ›」 --primary h3 700(글자일 뿐).
 *  ② 도움 표시(accepted) — checkmark-circle-02 14 + caption 500 --primary.
 *  ③ 본문 --text-article 전문 · ④ 날짜 caption muted. ③〜⑥ 의 왼쪽 끝은 카드 가장자리에서 18(머리 상자보다 8 안쪽).
 *  ⑤ 동작 줄(간격 8) — 하트 박스(CountToggle box repeat · dark) → 「감사인사 작성」(질문자 시점 · thanks 없을 때) → 공유(IconButton outline lg).
 *  ⑥ 감사 인사(thanks) — 왼쪽 3px --primary 줄 · 이니셜 Avatar sm · 이름 body 600 · 날짜 caption muted · 글 body.
 *  내 답변 ⋯ 메뉴는 머리 상자 오른쪽 위 — 링크 위에서 따로 눌린다.
 * [좁은 폭 < 560] 머리 상자: 「멘토 프로필 보기 ›」가 이름 묶음 아래 한 줄로 내려간다(아바타 48).
 *  동작 줄: 하트 · 공유가 첫 줄, 「감사인사 작성」은 다음 줄 전체 폭.
 * [빼는 것] 「이 멘토의 다른 답변 보기」 · 오른쪽 채택 배지 + 「감사인사 보내기」 · activityLocation — prop 은 받되 그리지 않는다.
 */
const NARROW = 560;
const clampNone = { wordBreak: "keep-all", overflowWrap: "break-word" };

function formatDate(d) {
  if (!d) return "";
  const dt = typeof d === "string" ? new Date(d) : d;
  if (Number.isNaN(dt.getTime())) return String(d);
  const p = (n) => String(n).padStart(2, "0");
  return `${dt.getFullYear()}.${p(dt.getMonth() + 1)}.${p(dt.getDate())}`;
}

if (typeof document !== "undefined" && !document.getElementById("mt-answercard-link-style")) {
  const s = document.createElement("style");
  s.id = "mt-answercard-link-style";
  s.textContent =
    ".mt-ac-head{color:inherit;text-decoration:none;transition:filter 150ms ease;}" +
    ".mt-ac-head:hover{filter:brightness(0.985);}" +
    ".mt-ac-head:hover .mt-ac-go{text-decoration:underline;text-underline-offset:3px;}" +
    ".mt-ac-head:focus-visible{outline:2px solid var(--ring);outline-offset:2px;}";
  document.head.appendChild(s);
}

const cap = { fontSize: "var(--text-caption)", lineHeight: "var(--text-caption--line-height)", letterSpacing: "var(--text-caption--letter-spacing)" };

export function AnswerCard({
  mentorName,
  mentorPhoto,
  country,
  countryLabel,
  activityLocation, // eslint-disable-line no-unused-vars — DS-23: 그리지 않는다
  headline,
  mentorProfileHref = "#",
  mentorAnswersHref, // eslint-disable-line no-unused-vars — DS-23: 그리지 않는다
  body,
  date,
  liked = false,
  onLike,
  onLikeChange, // eslint-disable-line no-unused-vars — 남겨 두되 쓰지 않는다
  likeCount = 0,
  answerUrl,
  onCopyLink,
  accepted = false,
  isQuestionerView = false,
  onThanks,
  thanks,
  isMine = false,
  onEdit,
  onDelete,
  style,
  ...rest
}) {
  const rootRef = React.useRef(null);
  const [narrow, setNarrow] = React.useState(false);
  React.useEffect(() => {
    const el = rootRef.current;
    if (!el || typeof ResizeObserver === "undefined") return undefined;
    const ro = new ResizeObserver(([e]) => setNarrow(e.contentRect.width < NARROW));
    ro.observe(el);
    return () => ro.disconnect();
  }, []);


  const [shareOpen, setShareOpen] = React.useState(false);
  const [moreOpen, setMoreOpen] = React.useState(false);
  const shareTriggerRef = React.useRef(null);
  const moreTriggerRef = React.useRef(null);

  const copyLink = () => {
    if (onCopyLink) onCopyLink();
    else if (answerUrl && navigator.clipboard) navigator.clipboard.writeText(answerUrl);
    setShareOpen(false);
  };

  const sub = [countryLabel, headline].filter(Boolean).join(" · ");
  const showThanksBtn = isQuestionerView && !thanks;

  const go = (
    <span className="mt-ac-go" style={{ display: "inline-flex", alignItems: "center", gap: 2, flex: "0 0 auto", color: "var(--primary)", fontSize: "var(--text-h3)", lineHeight: "var(--text-h3--line-height)", letterSpacing: "var(--text-h3--letter-spacing)", fontWeight: 700, whiteSpace: "nowrap" }}>
      멘토 프로필 보기
      <Icon name="arrow-right-01" size={18} aria-hidden="true" aria-label={undefined} role={undefined} />
    </span>
  );

  return (
    <article
      ref={rootRef}
      style={{
        position: "relative",
        display: "flex",
        flexDirection: "column",
        width: "100%",
        boxSizing: "border-box",
        padding: 10,
        color: "var(--foreground)",
        fontFamily: "var(--font-sans)",
        background: "var(--card)",
        border: "1px solid var(--border)",
        borderRadius: "calc(var(--radius-lg) + 10px)",
        ...style,
      }}
      {...rest}
    >
      {isMine && (
        <div style={{ position: "absolute", top: 18, right: 18, zIndex: 2 }}>
          <IconButton ref={moreTriggerRef} icon="more-horizontal-circle-01" variant="ghost" size="sm" ariaLabel="더보기" onClick={() => setMoreOpen((v) => !v)} />
          <Popover open={moreOpen} onClose={() => setMoreOpen(false)} role="menu" side="bottom" align="end" triggerRef={moreTriggerRef}>
            <button type="button" className="mt-popover-menuitem" style={popoverMenuItemStyle} onClick={() => { setMoreOpen(false); onEdit && onEdit(); }}>수정</button>
            <button type="button" className="mt-popover-menuitem" style={{ ...popoverMenuItemStyle, color: "var(--destructive)" }} onClick={() => { setMoreOpen(false); onDelete && onDelete(); }}>삭제</button>
          </Popover>
        </div>
      )}

      {/* ① 머리 상자 — 상자 전체가 링크 하나. 안의 국기는 tooltip 없음(링크 안에 포커스 둘을 만들지 않는다). */}
      <a
        href={mentorProfileHref}
        target="_blank"
        rel="noopener noreferrer"
        className="mt-ac-head"
        aria-label={`${mentorName} 멘토 프로필 보기`}
        style={{
          display: "flex",
          flexDirection: narrow ? "column" : "row",
          alignItems: narrow ? "stretch" : "flex-end", /* R4 — 「멘토 프로필 보기 ›」는 메타 줄과 같은 높이(오른쪽 아래) */
          gap: narrow ? 12 : 16,
          padding: "16px 20px",
          paddingRight: isMine ? 52 : 20,
          borderRadius: "var(--radius-lg)",
          background: "var(--green-50)",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: 14, flex: "1 1 auto", minWidth: 0 }}>
          <Avatar src={mentorPhoto} name={mentorName} size={narrow ? 48 : 60} />
          <div style={{ display: "flex", flexDirection: "column", gap: 4, minWidth: 0 }}>
            <div style={{ display: "flex", alignItems: "center", gap: 8, minWidth: 0 }}>
              <span style={{ fontSize: "var(--text-h2)", lineHeight: "var(--text-h2--line-height)", letterSpacing: "var(--text-h2--letter-spacing)", fontWeight: 700, overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>{mentorName}</span>
              {country && <Flag country={country} label={countryLabel} shape="rect" size="md" tooltip={false} aria-hidden="true" />}
            </div>
            {sub && <span style={{ fontSize: "var(--text-body-sm)", lineHeight: "var(--text-body-sm--line-height)", letterSpacing: "var(--text-body-sm--letter-spacing)", color: "var(--muted-foreground)", ...clampNone }}>{sub}</span>}
          </div>
        </div>
        {go}
      </a>

      <div style={{ display: "flex", flexDirection: "column", padding: "20px 8px 10px" }}>
        {accepted && (
          <span style={{ display: "inline-flex", alignItems: "center", gap: 4, marginBottom: 12, ...cap, fontWeight: 500, color: "var(--primary)" }}>
            <Icon name="checkmark-circle-02" size={14} aria-hidden="true" aria-label={undefined} role={undefined} />
            질문자가 도움된다고 한 답변입니다
          </span>
        )}

        <div style={{ fontSize: "var(--text-article)", lineHeight: "var(--text-article--line-height)", letterSpacing: "var(--text-article--letter-spacing)", whiteSpace: "pre-wrap", ...clampNone }}>{body}</div>

        {date && <span style={{ marginTop: 12, ...cap, color: "var(--muted-foreground)" }}>{formatDate(date)}</span>}

        {/* ⑤ 동작 줄 */}
        <div style={{ display: "flex", alignItems: "center", gap: 8, flexWrap: "wrap", marginTop: 20 }}>
          <CountToggle
            appearance="box"
            repeat
            icon="favourite"
            tone="dark"
            // DS-116 — 하트는 likeCount · liked 만 따른다. 누르면 onLike 만(부품 안 상태로 채움을 켜지 않는다).
            selected={liked}
            count={likeCount}
            onIncrement={onLike}
          />
          {showThanksBtn && (
            <Button variant="outline" size="lg" iconLeft="bubble-chat-favourite" onClick={onThanks} style={narrow ? { order: 3, flex: "1 1 100%" } : undefined}>감사인사 작성</Button>
          )}
          <div style={{ position: "relative", order: narrow ? 2 : undefined }}>
            <IconButton ref={shareTriggerRef} icon="share-08" variant="outline" size="lg" ariaLabel="공유" onClick={() => setShareOpen((v) => !v)} />
            <Popover open={shareOpen} onClose={() => setShareOpen(false)} role="menu" side="bottom" align="start" triggerRef={shareTriggerRef}>
              <button type="button" className="mt-popover-menuitem" style={popoverMenuItemStyle} onClick={copyLink}>
                <Icon name="link-square-01" size={16} style={{ color: "var(--muted-foreground)" }} />
                이 답변 링크 복사
              </button>
            </Popover>
          </div>
        </div>

        {/* ⑥ 감사 인사 */}
        {thanks && (
          <div style={{ display: "flex", gap: 12, marginTop: 24, paddingLeft: 14, borderLeft: "3px solid var(--primary)" }}>
            <Avatar name={thanks.author} size="sm" />
            <div style={{ display: "flex", flexDirection: "column", gap: 4, minWidth: 0 }}>
              <div style={{ display: "flex", alignItems: "baseline", gap: 8, flexWrap: "wrap" }}>
                <span style={{ fontSize: "var(--text-body)", lineHeight: "var(--text-body--line-height)", fontWeight: 600 }}>{thanks.author}</span>
                {thanks.date && <span style={{ ...cap, color: "var(--muted-foreground)" }}>{formatDate(thanks.date)}</span>}
              </div>
              <div style={{ fontSize: "var(--text-body)", lineHeight: "var(--text-body--line-height)", letterSpacing: "var(--text-body--letter-spacing)", whiteSpace: "pre-wrap", ...clampNone }}>{thanks.text}</div>
            </div>
          </div>
        )}
      </div>
    </article>
  );
}
