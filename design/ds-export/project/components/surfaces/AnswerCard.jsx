import React from "react";
import { Avatar } from "../core/Avatar.jsx";
import { Badge } from "../core/Badge.jsx";
import { Button } from "../core/Button.jsx";
import { IconButton } from "../core/IconButton.jsx";
import { CountToggle } from "../core/CountToggle.jsx";
import { Icon } from "../core/Icon.jsx";
import { Popover, popoverMenuItemStyle } from "../overlays/Popover.jsx";

/**
 * AnswerCard — Q&A 상세의 멘토 답변 1건. QnaCard(질문)와 다르다: 답변은 갈 곳이 없다
 *  (답변 상세 페이지가 없다) — 그래서 스트레치 링크를 만들지 않는다. href를 받지 않는다. 루트는 <article>.
 *
 * [구조] 멘토 헤더(아바타 큰 사이즈 + 이름 + 국가 flag 배지 + 활동지 + 헤드라인 — 헤더 블록 전체가 이름에 걸린 스트레치
 *  링크로 멘토 상세行, 새 창. 접근 이름="멘토명" 하나) → "이 멘토의 다른 답변 보기"(outline, 헤더 링크 밖·독립 클릭 —
 *  이 카드에서 테두리를 가진 것은 이 버튼 하나뿐. 헤드라인과는 좁은 간격으로 한 덩어리, 본문과는 넓은 간격으로 분리) →
 *  본문(전문, line-clamp 없음·禁則 유지) → 날짜(연월일만) →
 *  액션 줄 한 줄(좌: 도움돼요 CountToggle tone="rose"·공유(Popover) / 우: 채택 배지+감사인사 보내기, space-between).
 *  이 카드의 유일한 primary 버튼은 "감사인사 보내기"뿐 — 멘토 프로필 이동은 버튼이 아니라 헤더 블록 자체가 링크.
 *  공유·더보기는 overlays/Popover(앵커·닫힘·ESC·포커스 복귀 공통 컴포넌트)를 쓴다 — 각자 자신을 가지지 않는다.
 * [스크랩 없음] 스크랩의 목록 단위는 질문이라 답변마다 두면 한 질문에 여러 개가 동시에 켜진다 — 스크랩은 QnaCard(질문)에만.
 * [채택 표시] 질문자가 도움돼요를 누른 답변에만. 질문자는 "김**"로 익명화되므로 질문자 아바타는 병기하지 않는다.
 * [상태] 기본 · accepted(채택) · isQuestionerView(질문자 시점 → 감사인사 버튼) · isMine(내 답변 → 더보기 메뉴).
 *  네 상태는 배타가 아니다 — 동시에 겹칠 수 있다.
 * [범위 밖] 답변 작성 폼(qna-detail 화면이 Card+Avatar+RichTextEditor+Button으로 조립) · 답변 0건 표시(EmptyState).
 *
 * QnaCard와의 경계: QnaCard=질문(카드 전체 클릭 → 상세로 이동) · AnswerCard=답변(갈 곳이 없어 카드 전체 클릭이 없다).
 */
const clampNone = { wordBreak: "keep-all", overflowWrap: "break-word" }; // 禁則: break-all 금지. line-clamp 없음(전문 노출)

function formatDate(d) {
  if (!d) return "";
  const dt = typeof d === "string" ? new Date(d) : d;
  if (Number.isNaN(dt.getTime())) return String(d);
  const p = (n) => String(n).padStart(2, "0");
  return `${dt.getFullYear()}.${p(dt.getMonth() + 1)}.${p(dt.getDate())}`;
}

// Button은 <button> 고정(새 창 이동이 불가) — 멘토 이동 버튼 2개만 같은 sm 레시피를 쓰는 <a>로 직접 구현.
function linkButtonStyle(variant) {
  const v = variant === "primary"
    ? { background: "var(--primary)", color: "var(--primary-foreground)", border: "1px solid transparent" }
    : { background: "var(--card)", color: "var(--foreground)", border: "1px solid var(--border)" }; // outline — 이 카드에서 테두리를 가진 유일한 요소. secondary(sage-100 채움) 금지: Chip과 같은 채움이라 버튼·칩이 같아 보인다.
  return {
    display: "inline-flex", alignItems: "center", justifyContent: "center", height: 32, padding: "0 12px",
    fontFamily: "var(--font-sans)", fontSize: "var(--text-caption)", fontWeight: 500, lineHeight: 1,
    letterSpacing: "-0.01em", borderRadius: "var(--radius-md)", textDecoration: "none", whiteSpace: "nowrap", ...v,
  };
}

if (typeof document !== "undefined" && !document.getElementById("mt-answercard-link-style")) {
  const s = document.createElement("style");
  s.id = "mt-answercard-link-style";
  s.textContent =
    ".mt-ac-mentor-link{position:relative;color:inherit;text-decoration:none;}" +
    ".mt-ac-mentor-link::after{content:'';position:absolute;inset:0;z-index:1;}" +
    ".mt-ac-mentor-link:hover .mt-ac-mentor-name{color:var(--primary);text-decoration:underline;}" +
    ".mt-ac-mentor-link:focus-visible{outline:2px solid var(--ring);outline-offset:2px;border-radius:4px;}";
  document.head.appendChild(s);
}

export function AnswerCard({
  mentorName,
  mentorPhoto,
  country,
  countryLabel,
  activityLocation,
  headline,
  mentorProfileHref = "#",
  mentorAnswersHref = "#",
  body,
  date,
  liked = false,
  onLikeChange,
  likeCount = 0,
  answerUrl,
  onCopyLink,
  accepted = false,
  isQuestionerView = false,
  onThanks,
  isMine = false,
  onEdit,
  onDelete,
  style,
  ...rest
}) {
  const likeControlled = onLikeChange != null;
  const [likedU, setLikedU] = React.useState(liked);
  const isLiked = likeControlled ? liked : likedU;
  const setLiked = (n) => { if (likeControlled) onLikeChange(n); else setLikedU(n); };

  const [shareOpen, setShareOpen] = React.useState(false);
  const [moreOpen, setMoreOpen] = React.useState(false);
  const shareTriggerRef = React.useRef(null);
  const moreTriggerRef = React.useRef(null);

  const copyLink = () => {
    if (onCopyLink) onCopyLink();
    else if (answerUrl && navigator.clipboard) navigator.clipboard.writeText(answerUrl);
    setShareOpen(false);
  };

  return (
    <article
      style={{
        position: "relative",
        display: "flex",
        flexDirection: "column",
        gap: 16,
        width: "100%",
        boxSizing: "border-box",
        color: "var(--foreground)",
        fontFamily: "var(--font-sans)",
        background: "var(--card)",
        border: "1px solid var(--sage-200)",
        borderRadius: "var(--card-radius)",
        boxShadow: "var(--card-shadow)",
        padding: "var(--card-content-padding)",
        ...style,
      }}
      {...rest}
    >
      {/* 더보기(⋯) — 내 답변에만, 카드 우상단. Popover: 수정·삭제. */}
      {isMine && (
        <div style={{ position: "absolute", top: 14, right: 14, zIndex: 2 }}>
          <IconButton ref={moreTriggerRef} icon="more-horizontal-circle-01" variant="ghost" size="sm" ariaLabel="더보기" onClick={() => setMoreOpen((v) => !v)} />
          <Popover open={moreOpen} onClose={() => setMoreOpen(false)} role="menu" side="bottom" align="end" triggerRef={moreTriggerRef}>
            <button type="button" className="mt-popover-menuitem" style={popoverMenuItemStyle} onClick={() => { setMoreOpen(false); onEdit && onEdit(); }}>수정</button>
            <button type="button" className="mt-popover-menuitem" style={{ ...popoverMenuItemStyle, color: "var(--destructive)" }} onClick={() => { setMoreOpen(false); onDelete && onDelete(); }}>삭제</button>
          </Popover>
        </div>
      )}

      {/* 1) 멘토 헤더 — 전환의 핵심 루트. 헤더 블록 전체가 이름에만 걸린 <a>의 ::after로 덮인다(카드 전체 아님, 본문·액션줄 제외).
          접근 이름 = "멘토명" 하나(블록을 통챏로 감싸지 않음). hover 시 이름이 primary+밑줄 — 버튼이 사라진 유일한 "눈린다" 신호. */}
      {/* 헤더 블록 + "다른 답변 보기" 버튼을 한 덬어리로 묶는다(좌은 간격). 이 덬어리 아래 본문과는 article의 기본 gap(넘은 간격)으로 분리된다. */}
      <div style={{ display: "flex", flexDirection: "column", gap: 8, paddingRight: isMine ? 32 : 0 }}>
        <a href={mentorProfileHref} target="_blank" rel="noopener noreferrer" className="mt-ac-mentor-link" aria-label={mentorName} style={{ display: "flex", flexDirection: "column", gap: 10, cursor: "pointer" }}>
          <div style={{ display: "flex", alignItems: "flex-start", gap: 10 }}>
            <Avatar src={mentorPhoto} name={mentorName} size="lg" />
            <div style={{ display: "flex", flexDirection: "column", gap: 4, minWidth: 0 }}>
              <div style={{ display: "flex", alignItems: "center", gap: 6, flexWrap: "wrap" }}>
                <span className="mt-ac-mentor-name" style={{ fontSize: "var(--text-h3)", fontWeight: 600 }}>{mentorName}</span>
                {(country || countryLabel) && <Badge size="sm" leading="flag" flag={country}>{countryLabel}</Badge>}
                {activityLocation && <span style={{ fontSize: "var(--text-caption)", color: "var(--muted-foreground)" }}>{activityLocation}</span>}
              </div>
              {headline && <span style={{ fontSize: "var(--text-body)", fontWeight: 500, color: "var(--muted-foreground)" }}>{headline}</span>}
            </div>
          </div>
        </a>

        {/* 이 멘토의 다른 답변 보기 — outline(이 카드에서 테두리를 가진 유일한 요소). secondary 금지(sage-100 채움이라 Chip과 같아 보임).
            헤더 덮개 밖(z-index:2)에서 독립 클릭. 이 카드의 primary는 감사인사 버튼 하나뿐. */}
        <a href={mentorAnswersHref} target="_blank" rel="noopener noreferrer" style={{ position: "relative", zIndex: 2, alignSelf: "flex-start", ...linkButtonStyle("outline") }}>
          이 멘토의 다른 답변 보기
          <Icon name="arrow-up-right-01" size={14} style={{ marginLeft: 4 }} />
        </a>
      </div>

      {/* 2) 본문 — 전문, line-clamp 없음(QnaCard와 다름). 禁則 유지. */}
      <div style={{ fontSize: "var(--text-body)", fontWeight: 400, color: "var(--foreground)", lineHeight: 1.7, whiteSpace: "pre-wrap", ...clampNone }}>{body}</div>

      {/* 3) 날짜 — 연월일만 */}
      {date && <span style={{ fontSize: "var(--text-caption)", color: "var(--muted-foreground)" }}>{formatDate(date)}</span>}

      {/* 4)+5)+6) 액션 줄 — 한 줄, 좌우 양끝 정렬(space-between). 좌: 도움돼요·공유. 우: 채택 배지+감사인사 보내기(함께 내려간다, 갈라지지 않음). */}
      <div style={{ position: "relative", zIndex: 2, display: "flex", alignItems: "center", justifyContent: "space-between", gap: 12, flexWrap: "wrap" }}>
        <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
          <CountToggle icon="favourite" tone="rose" selected={isLiked} count={likeCount} onChange={setLiked} />
          {/* ⚠️ 모바일 분기(OS 공유로 대체)는 이 카드가 아니라 화면 책임 — 지금 거동은 그대로(항상 Popover),
              모바일 대응은 화면이 이 onClick을 가로채 navigator.share로 바꿔치기한다(Popover.prompt.md 참조). */}
          <div style={{ position: "relative" }}>
            <IconButton ref={shareTriggerRef} icon="share-08" variant="ghost" size="sm" ariaLabel="공유" onClick={() => setShareOpen((v) => !v)} />
            <Popover open={shareOpen} onClose={() => setShareOpen(false)} role="menu" side="bottom" align="start" triggerRef={shareTriggerRef}>
              <button type="button" className="mt-popover-menuitem" style={popoverMenuItemStyle} onClick={copyLink}>
                <Icon name="link-square-01" size={16} style={{ color: "var(--muted-foreground)" }} />
                이 답변 링크 복사
              </button>
            </Popover>
          </div>
        </div>

        {(accepted || isQuestionerView) && (
          <div style={{ display: "flex", alignItems: "center", gap: 12, flexWrap: "wrap", justifyContent: "flex-end" }}>
            {accepted && (
              <span style={{ display: "inline-flex", alignItems: "center", gap: 4, fontSize: "var(--text-caption)", fontWeight: 500, color: "var(--primary)", whiteSpace: "nowrap" }}>
                <Icon name="checkmark-circle-02" size={15} />
                질문자가 도움된다고 한 답변입니다
              </span>
            )}
            {isQuestionerView && (
              <Button variant="primary" size="sm" onClick={onThanks}>감사인사 보내기</Button>
            )}
          </div>
        )}
      </div>
    </article>
  );
}
