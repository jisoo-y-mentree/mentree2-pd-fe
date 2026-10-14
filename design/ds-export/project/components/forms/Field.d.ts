import React from "react";

/**
 * Field — 컨트롤을 라벨·설명·에러와 함께 감싼다.
 *  DS-32: 라벨 --text-body · 600. 설명은 라벨 바로 아래 · 컨트롤 위. 에러는 컨트롤 아래.
 *  라벨이 붙은 FieldGroup 안에서는 작은 라벨(--text-caption · 500)로 그린다.
 */
export interface FieldProps extends React.HTMLAttributes<HTMLDivElement> {
  label?: string;
  htmlFor?: string;
  /** 라벨 바로 아래, 컨트롤 위. */
  description?: string;
  /** 에러 메시지. 컨트롤 아래 --destructive. */
  error?: string;
  required?: boolean;
}

export function Field(props: FieldProps): JSX.Element;

/**
 * FieldGroup — Field들의 세로 스택. DS-32: label을 주면 묶음 제목(「거주중인 국가 → 나라 · 도시」).
 */
export interface FieldGroupProps extends React.HTMLAttributes<HTMLDivElement> {
  /** 필드 간 간격(px). 기본 18. label·columns가 없을 때만 쓴다. */
  gap?: number;
  /** 묶음 제목 — Field 라벨과 같은 모양. 주면 안의 Field 라벨은 작은 라벨(--text-caption). */
  label?: string;
  /** 묶음 제목 옆 *(--destructive). */
  required?: boolean;
  /** 2면 안의 Field 둘이 한 줄에 반씩(간격 12). */
  columns?: number;
}

export function FieldGroup(props: FieldGroupProps): JSX.Element;
