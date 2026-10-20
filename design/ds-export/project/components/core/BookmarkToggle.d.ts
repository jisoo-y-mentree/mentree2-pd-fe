import React from "react";

/**
 * BookmarkToggle — 미디어 오버레이의 아이콘 토글(aria-pressed). 사진 위에 단독으로 선다.
 *  CountToggle(메타 줄 인라인, 아이콘+숫자, 반전 안 함)의 형제 겸 경계 대상 — 경계는 "카운트의 유무"가
 *  아니라 "어디에 놓이는가"다. 한 번 CountToggle로 흡수됐다가 되돌아왔다(09-11 → 09-12).
 *
 *  형태 = IconButton default(md) 그대로(박스 38 · 아이콘 18 · radius-md).
 *  미선택 = outline(card 배경 + sage 아웃라인). 선택 = 초록(DS-94 — 면 --green-50 · 1px --green-700 · 채운 --green-700 아이콘). 반경 12.
 *  count를 받지 않는다 — 숫자가 붙는 자리는 CountToggle.
 */
export interface BookmarkToggleProps {
  /** 선택(스크랩) 여부(제어형). 선택 시 면 --green-50 · 1px --green-700 · 채운 --green-700 아이콘. */
  selected?: boolean;
  /** 토글 콜백. 다음 selected 값을 넘긴다. */
  onChange?: (next: boolean) => void;
  disabled?: boolean;
  /** 접근성 라벨. 기본 "스크랩". */
  ariaLabel?: string;
}

export function BookmarkToggle(props: BookmarkToggleProps): JSX.Element;
