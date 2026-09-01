import React from "react";

/**
 * Field — 컨트롤을 라벨·설명·에러와 함께 감싼다.
 */
export interface FieldProps extends React.HTMLAttributes<HTMLDivElement> {
  label?: string;
  htmlFor?: string;
  description?: string;
  /** 에러 메시지; 설정 시 설명을 대체하고 빨갛게. */
  error?: string;
  required?: boolean;
}

export function Field(props: FieldProps): JSX.Element;

/**
 * FieldGroup — Field들의 세로 스택.
 */
export interface FieldGroupProps extends React.HTMLAttributes<HTMLDivElement> {
  /** 필드 간 간격(px). 기본 18. */
  gap?: number;
}

export function FieldGroup(props: FieldGroupProps): JSX.Element;
