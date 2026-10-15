import React from "react";

export type SelectOption = string | { value: string; label: string };

/**
 * Select — Input에 높이·경계·포커스 링을 맞춘 커스텀 리스트박스(네이티브 <select>가 아니다).
 *  목록은 Popover로 트리거 아래 4px, 트리거와 같은 폭으로 내려온다.
 */
export interface SelectProps extends Omit<React.ButtonHTMLAttributes<HTMLButtonElement>, "onChange" | "value"> {
  options: SelectOption[];
  /** 값이 없을 때 트리거에 흐린 글자로 보인다. 목록의 항목이 아니다. */
  placeholder?: string;
  invalid?: boolean;
  value?: string;
  /** 고른 항목의 value를 넘긴다(네이티브 이벤트가 아니다). */
  onChange?: (value: string) => void;
}

export function Select(props: SelectProps): JSX.Element;
