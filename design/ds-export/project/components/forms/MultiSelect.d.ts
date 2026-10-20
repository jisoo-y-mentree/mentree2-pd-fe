import React from "react";

export type MultiSelectOption = string | { value: string; label: string; [key: string]: unknown };
export interface MultiSelectGroup {
  /** 묶음 제목. 빈 문자열이면 제목 없이 항목만 선다(taxonomy.js COUNTRY_GROUPS의 첫 묶음). */
  label: string;
  options: MultiSelectOption[];
}

/**
 * MultiSelect — 여러 개를 고르는 셀렉트(DS-71). 트리거·목록·키보드는 Select와 같다.
 *  고른 것은 트리거 위 Chip(md) 줄. 항목을 눌러도 목록이 닫히지 않는다. role="listbox" + aria-multiselectable.
 */
export interface MultiSelectProps extends Omit<React.ButtonHTMLAttributes<HTMLButtonElement>, "onChange" | "value"> {
  options?: MultiSelectOption[];
  /** 묶음이 있는 목록 — taxonomy.js COUNTRY_GROUPS · KEYWORD_GROUPS와 같은 모양. 주면 options 대신 쓴다. */
  groups?: MultiSelectGroup[];
  /** 고른 값의 배열. 기본 []. 칩은 이 순서로 선다. */
  value?: string[];
  /** 새 배열을 넘긴다. */
  onChange?: (value: string[]) => void;
  /** 트리거의 흐린 글자. 고른 것이 있어도 둔다. 목록의 항목이 아니다. */
  placeholder?: string;
  invalid?: boolean;
  disabled?: boolean;
}

export function MultiSelect(props: MultiSelectProps): JSX.Element;
