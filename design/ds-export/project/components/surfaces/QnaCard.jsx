import React from "react";
import { Badge } from "../core/Badge.jsx";
import { AvatarGroup } from "../core/Avatar.jsx";
import { Icon } from "../core/Icon.jsx";

/**
 * QnaCard — 미디어 없는 텍스트 카드(Q&A). 카드 기하·elevation·동심원 원칙 상속.
 * 미디어가 없으므로 카드 전체 콘텐츠 패딩 = --card-content-padding(18px) 통일.
 * 카드 전체 클릭 → Q&A 상세.
 *  상단행: 카테고리 badge(분류) + 메타(조회수 눈 / 좋아요 하트, 카운트 전용·무상태).
 *  제목 h3(2줄 고정) · 발췌 body muted(2줄 고정) · hairline · 하단행 답변자 AvatarGroup + "멘토 답변 N개".
 */
const clamp2 = {
  display: "-webkit-box",
  WebkitBoxOrient: "vertical",
  WebkitLineClamp: 2,
  overflow: "hidden",
  wordBreak: "keep-all",
  overflowWrap: "break-word", // 禁則: break-all 금지
};

export function QnaCard({
  category,
  views = 0,
  likes = 0,
  title,
  excerpt,
  answerers = [],
  answerCount,
  maxAvatars = 4,
  href = "#",
  style,
  ...rest
}) {
  const [hover, setHover] = React.useState(false);
  const count = answerCount != null ? answerCount : answerers.length;

  const meta = (icon, n) => (
    <span style={{ display: "inline-flex", alignItems: "center", gap: 4, color: "var(--muted-foreground)", fontSize: "var(--text-caption)" }}>
      <Icon name={icon} size={15} />
      <span className="tabular">{n}</span>
    </span>
  );

  return (
    <a
      href={href}
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
      style={{
        display: "flex",
        flexDirection: "column",
        gap: 10,
        width: "100%",
        boxSizing: "border-box",
        textDecoration: "none",
        color: "var(--foreground)",
        fontFamily: "var(--font-sans)",
        background: "var(--card)",
        border: "1px solid var(--sage-200)",
        borderRadius: "var(--card-radius)",
        boxShadow: hover ? "var(--shadow-md)" : "var(--card-shadow)",
        padding: "var(--card-content-padding)",
        transition: "box-shadow 150ms ease",
        cursor: "pointer",
        ...style,
      }}
      {...rest}
    >
      {/* 1) 상단 행 */}
      <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", gap: 10 }}>
        {category && <Badge size="sm">{category}</Badge>}
        <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
          {meta("view", views)}
          {meta("favourite", likes)}
        </div>
      </div>

      {/* 2) 제목 h3, 2줄 고정 */}
      <div style={{ fontSize: "var(--text-h3)", fontWeight: 600, lineHeight: 1.5, ...clamp2 }}>{title}</div>

      {/* 3) 발췌 body muted, 2줄 고정 */}
      <div style={{ fontSize: "var(--text-body)", fontWeight: 400, color: "var(--muted-foreground)", lineHeight: 1.6, ...clamp2 }}>{excerpt}</div>

      {/* 구분선 */}
      <div style={{ height: 1, background: "var(--sage-200)", margin: "2px 0" }} />

      {/* 4) 하단 행 — 답변자 + 멘토 답변 N개 */}
      <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
        {answerers.length > 0 && <AvatarGroup items={answerers} max={maxAvatars} size="sm" />}
        <span style={{ fontSize: "var(--text-body)", color: "var(--muted-foreground)" }}>
          멘토 답변 <b className="tabular" style={{ color: "var(--primary)", fontWeight: 600 }}>{count}</b>개
        </span>
      </div>
    </a>
  );
}
