import React from "react";

/**
 * FilterChip — Toggle 계열 텍스트 칩. BookmarkToggle의 형제(아이콘형↔텍스트칩형).
 *  Badge(정적)와 달리 클릭·선택 가능한 필터 요소. 버튼 sm 기하(높이 32 · radius-md · 14px/500 — Button·Chip과 같은 고정값, pill 아님).
 *  "selected=반전" 공통 원칙 상속(BookmarkToggle과 공유) — FilterChip은 primary green 반전(필터 활성=브랜드 액션).
 *  CountToggle은 이 원칙의 예외(메타 줄 인라인, 반전 안 함) — FilterChip의 형제가 아니다.
 *  focus-visible=--ring, disabled=흐리게. leading: none · flag(원형 국기, Badge flag 재사용).
 */
export interface FilterChipProps extends Omit<React.ButtonHTMLAttributes<HTMLButtonElement>, "onChange"> {
  /** 선택 여부(제어형). green 반전으로 표시. */
  selected?: boolean;
  /** 토글 콜백. 다음 selected 값을 넘긴다(Toggle 계열 공통 시그니처). */
  onChange?: (next: boolean) => void;
  disabled?: boolean;
  /** 앞자리 슬롯. 기본 "none". "flag"=원형 국기(국가 칩 전용). */
  leading?: "none" | "flag";
  /** leading="flag" 국가명 파일명(소문자·하이픈, 예: "south-korea"). assets/flags/{국가명}.svg */
  flag?: string;
  /** 국기 에셋 기본 경로. 기본 "../../assets/flags/". */
  flagBase?: string;
  /** 칩 라벨. */
  children?: React.ReactNode;
}

export function FilterChip(props: FilterChipProps): JSX.Element;
