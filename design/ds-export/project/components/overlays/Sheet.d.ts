import React from "react";

/**
 * Sheet — dim 스크림 위 가장자리 고정 패널(드로어).
 * DS-113 — Esc → onClose · 열리면 첫 조작 요소로 포커스 · Tab 가두기 · 닫히면 연 요소로 포커스 · 뒤 문서 스크롤 잠금 · aria-labelledby(제목).
 * DS-114 — 위에 다른 모달(aria-modal)이 열려 포커스가 그 안에 있으면 Esc · Tab 은 그 모달이 받는다(맨 위 층만). 닫히면 다시 Sheet 가 받는다.
 */
export interface SheetProps {
  open: boolean;
  /** Esc · 어두운 막 · ✕ 에서 부른다. */
  onClose?: () => void;
  side?: "left" | "right" | "top" | "bottom";
  title?: React.ReactNode;
  description?: React.ReactNode;
  /** DS-113 — 머리의 닫기(✕) 왼쪽 자리(사이 4px). 예: 「전체 페이지에서 보기」 글자 링크. 없으면 ✕ 만. */
  headerAction?: React.ReactNode;
  footer?: React.ReactNode;
  /** 폭(left/right) 또는 높이(top/bottom), px. 기본 380. */
  size?: number;
  style?: React.CSSProperties;
  children?: React.ReactNode;
}

export function Sheet(props: SheetProps): JSX.Element | null;
