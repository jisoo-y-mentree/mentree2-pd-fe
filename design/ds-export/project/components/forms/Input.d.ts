import React from "react";

/**
 * Input — 한 줄 텍스트 필드.
 */
export interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  /** 내부 왼쪽에 표시할 HugeIcons 이름. */
  iconLeft?: string;
  /** 에러 상태(빨간 경계). */
  invalid?: boolean;
}

export function Input(props: InputProps): JSX.Element;
