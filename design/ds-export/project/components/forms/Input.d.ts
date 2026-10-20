import React from "react";

/**
 * Input — 한 줄 텍스트 필드.
 */
export interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  /** 내부 왼쪽에 표시할 HugeIcons 이름. */
  iconLeft?: string;
  /** 에러 상태(빨간 경계). */
  invalid?: boolean;
  /** DS-70 — 글자 수 한도. 주면 상자 밖 오른쪽 아래에 「n/limit」. 넘치면 카운터 --destructive + invalid + aria-invalid. 잘라내지 않는다. value.length로 센다(이모지 2자). */
  limit?: number;
}

export function Input(props: InputProps): JSX.Element;
