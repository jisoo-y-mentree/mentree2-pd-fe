import React from "react";

/**
 * Banner — 배치 컴포넌트. 인라인 둥근 프로모/유도 블록(페이지 흐름 중간 삽입).
 *  CalloutBar(각진 풀폭 공지)와 구분 — 이건 둥근 인라인 프로모. 목적은 "눈에 띄기".
 *  "자유 영역(slot)" 성격: 내부 표현을 엄격히 규정하지 않는다.
 *
 *  [고정 — 외곽 최소 규칙] radius 22(카드와 같은 표면 언어) · 인라인(좌우 여백) · 기본 패딩 16 ·
 *   기본 전체 클리커블 · 전역 뼈대 상속(Pretendard JP · 禁則 · 시맨틱 구조).
 *  [자유] 배경(팔레트 벗어난 과감한 색·그라데이션 허용) · 표현 효과 · 레이아웃/높이/CTA — background,
 *   style, children로 매번 다르게. variant 없음.
 */
export function Banner({
  href,
  onClick,
  background,
  padding = 16,
  clickable,
  children,
  style,
  ...rest
}) {
  // href나 onClick이 있으면 기본 클리커블. clickable=false로 명시 해제 가능.
  const isClickable = clickable != null ? clickable : Boolean(href || onClick);
  const Tag = href ? "a" : "div";

  const base = {
    display: "block",
    position: "relative",
    boxSizing: "border-box",
    width: "100%",
    // 고정: radius 22(카드와 같은 표면 언어) — 자유 영역이라도 이것만은 통일.
    borderRadius: "var(--card-radius)",
    padding: typeof padding === "number" ? `${padding}px` : padding,
    // 전역 뼈대 상속 필수: 폰트 · 禁則.
    fontFamily: "var(--font-sans)",
    wordBreak: "keep-all",
    overflowWrap: "break-word",
    color: "var(--foreground)",
    textDecoration: "none",
    // 자유: 배경은 팔레트를 벗어날 수 있음(그라데이션 등). 미지정 시 투명.
    background: background || "transparent",
    cursor: isClickable ? "pointer" : "default",
    overflow: "hidden",
    ...style,
  };

  return (
    <Tag href={href} onClick={onClick} style={base} {...rest}>
      {children}
    </Tag>
  );
}
