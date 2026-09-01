import React from "react";

/**
 * BookmarkToggle — Toggle 기반 아이콘 토글(aria-pressed). 미선택=outline / 선택=fill.
 * selected 색은 --foreground(상태 표시이므로 초록 아님). focus-visible는 --ring(sage-400).
 * (서버 저장 로직은 범위 밖 — 컴포넌트 상태 표현만.)
 */
export interface BookmarkToggleProps {
  /** 북마크됨 여부(제어형). fill로 표시. */
  selected?: boolean;
  /** 토글 콜백. 다음 selected 값을 넘긴다. */
  onChange?: (next: boolean) => void;
  disabled?: boolean;
  size?: "sm" | "md" | "lg";
  /** 접근성 라벨. 기본 "북마크". */
  ariaLabel?: string;
}

export function BookmarkToggle(props: BookmarkToggleProps): JSX.Element;
