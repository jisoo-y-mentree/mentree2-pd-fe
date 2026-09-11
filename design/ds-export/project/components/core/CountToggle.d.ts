import React from "react";

/**
 * CountToggle — 아이콘+카운트 토글(aria-pressed). "도움돼요"·"스크랩" 공용(icon만 다름).
 *  count를 넘기지 않으면 아이콘만 뜬다 — 카운트 유무와 무관하게 스크랩 표현은 이 하나다.
 *  [반전 원칙 예외] selected는 반전(배경 채움)하지 않는다 — 아이콘 fill + tone 텍스트만. 이유: 목록 카드 다수 노출 시 반전이 과함.
 *  [tone] green은 쓰지 않는다(다른 의미로 이미 쓰임). "rose"=도움돼요(--badge-rose-700) · "dark"=스크랩(--sage-900).
 *  배경·테두리 없음, 인라인. 서버 저장·비로그인 유도는 범위 밖(화면이 onChange를 가로챈다).
 */
export interface CountToggleProps {
  /** 아이콘 종류. "favourite"=도움돼요(하트) · "bookmark"=스크랩. 기본 "favourite". */
  icon?: "favourite" | "bookmark";
  /** selected 색. "rose"=도움돼요 · "dark"=스크랩(sage-900). green 없음. 기본 "dark". */
  tone?: "rose" | "dark";
  /** 선택 여부(제어형). 아이콘 fill + tone 색으로 표시(반전 아님). */
  selected?: boolean;
  /** 토글 콜백. 다음 selected 값을 넘긴다. */
  onChange?: (next: boolean) => void;
  /** 카운트 숫자. tabular로 표시. */
  count?: number;
  disabled?: boolean;
  /** 접근성 라벨. 기본 icon에 따라 "도움돼요"/"스크랩". */
  ariaLabel?: string;
}

export function CountToggle(props: CountToggleProps): JSX.Element;
