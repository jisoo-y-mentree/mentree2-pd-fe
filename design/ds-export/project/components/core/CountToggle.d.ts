import React from "react";

/**
 * CountToggle — 메타 줄 인라인 전용 토글(aria-pressed). "도움돼요"·"스크랩" 공용(icon만 다름).
 *  count는 필수 — 숫자가 없는 사진 위 단독 액션은 BookmarkToggle이 맡는다.
 *  [경계] BookmarkToggle=미디어 오버레이(사진 위·단독·반전) / CountToggle=메타 줄(인라인·아이콘+숫자·반전 안 함).
 *  경계는 "카운트 유무"가 아니라 "어디에 놓이는가"다.
 *  [반전 원칙 예외] selected는 반전(배경 채움)하지 않는다 — 아이콘 fill + tone 텍스트만. 이유: 목록 카드 다수 노출 시 반전이 과함.
 *  [tone] green은 쓰지 않는다(다른 의미로 이미 쓰임). "rose"=도움돼요(--badge-rose-700) · "dark"=스크랩(--sage-900).
 *  배경·테두리 없음, 인라인. 서버 저장·비로그인 유도는 범위 밖(화면이 onChange를 가로챈다).
 */
export interface CountToggleProps {
  /** 아이콘 종류. "favourite"=도움돼요(하트) · "bookmark"=스크랩. 기본 "favourite". 사진 위 단독 액션은 BookmarkToggle을 쓴다. */
  icon?: "favourite" | "bookmark";
  /** selected 색. "rose"=도움돼요 · "dark"=스크랩(sage-900). green 없음. 기본 "dark". */
  tone?: "rose" | "dark";
  /** 선택 여부(제어형). 아이콘 fill + tone 색으로 표시(반전 아님). */
  selected?: boolean;
  /** 토글 콜백. 다음 selected 값을 넘긴다. */
  onChange?: (next: boolean) => void;
  /** 카운트 숫자. tabular로 표시. 메타 줄 자리라 필수. */
  count: number;
  disabled?: boolean;
  /** 접근성 라벨. 기본 icon에 따라 "도움돼요"/"스크랩". */
  ariaLabel?: string;
}

export function CountToggle(props: CountToggleProps): JSX.Element;
