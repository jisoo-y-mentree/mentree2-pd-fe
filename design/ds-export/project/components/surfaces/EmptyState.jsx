import React from "react";
import { Icon } from "../core/Icon.jsx";

/**
 * EmptyState — 목록이 0건일 때 그 자리에 서는 것(자리를 비워두지 않는다). surfaces에 있지만 카드가 아니다.
 * [두 종류를 하나로] "아직 없다"(다음 행동으로 보냄)와 "찾았는데 없다"(조건을 풀게 함)는 낼 말이 다르지만
 *  구조가 같다 — prop으로 가르지 않는다. 어느 쪽인지는 화면이 문구로 정한다. 부품은 종류를 모른다.
 * [문구] 기본 문구를 하드코딩하지 않는다 — 한/일 2개국어이고 문구는 화면이 넘긴다.
 * [구성] 아이콘(선택) → 제목(필수·한 줄) → 설명(선택·한두 줄) → 액션(0 또는 1). 전부 가운데 정렬.
 *  액션은 1개까지 — 빈 화면에서 고민을 시키지 않는다(둘 이상을 넘겨도 첫 하나만 세운다).
 * [시각] 배경·테두리 없음(카드 셸 미상속) · 제목 --foreground · 설명·아이콘 --muted-foreground.
 *  채도를 쓰지 않는다. 일러스트를 그려 넣지 않는다(화면마다 달라진다).
 * [크기] md=목록 자리 전체 · sm=좁은 자리(우측 위젯·알림 드롭다운). sm은 아이콘이 작고 설명을 생략해도 된다.
 */
const SIZES = {
  md: { icon: 34, padV: 44, gapIcon: 14, gapText: 8, gapAction: 18, title: "var(--text-h3)", desc: "var(--text-caption)", maxW: 340 },
  sm: { icon: 22, padV: 22, gapIcon: 10, gapText: 6, gapAction: 12, title: "var(--text-body)", desc: "var(--text-caption)", maxW: 220 },
};

export function EmptyState({ icon, title, description, action, size = "md", style, ...rest }) {
  const s = SIZES[size] || SIZES.md;
  // 액션은 1개까지 — 배열이 와도 첫 하나만 세운다.
  const only = Array.isArray(action) ? action[0] : action;

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        textAlign: "center",
        width: "100%",
        boxSizing: "border-box",
        padding: `${s.padV}px 16px`,
        background: "transparent",
        border: "none",
        fontFamily: "var(--font-sans)",
        ...style,
      }}
      {...rest}
    >
      {icon && (
        <span style={{ display: "inline-flex", color: "var(--muted-foreground)", marginBottom: s.gapIcon }}>
          <Icon name={icon} size={s.icon} />
        </span>
      )}
      <div style={{ display: "flex", flexDirection: "column", gap: s.gapText, maxWidth: s.maxW }}>
        <span style={{ fontSize: s.title, fontWeight: 600, lineHeight: 1.45, color: "var(--foreground)", wordBreak: "keep-all", overflowWrap: "break-word" }}>{title}</span>
        {description && (
          <span style={{ fontSize: s.desc, fontWeight: 400, lineHeight: 1.6, color: "var(--muted-foreground)", wordBreak: "keep-all", overflowWrap: "break-word" }}>{description}</span>
        )}
      </div>
      {only && <div style={{ marginTop: s.gapAction }}>{only}</div>}
    </div>
  );
}
