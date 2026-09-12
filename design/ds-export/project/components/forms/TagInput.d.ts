import React from "react";

/**
 * TagInput — 태그를 넣고 빼는 폼 필드(qna-compose 본체). Chip을 대체하지 않는다 — Chip을 담는다.
 *  화면에 보이는 태그는 전부 Chip md(입력된 것=onRemove·✕있음, 제안=onClick·✕없음, 둘 다 --muted 기본색).
 *  바깥 상자는 Input의 테두리·radius·포커스 링을 그대로 쓴다(새 토큰 없음).
 *  제안 줄은 하나뿐이고 갈아끼운다(쌓지 않음) — 정렬·필터·글자수 판정 이상은 부품이 하지 않는다.
 */
export interface TagInputProps {
  /** 확정된 태그(# 없이 저장). */
  value: string[];
  onChange: (next: string[]) => void;
  /** 입력이 비었거나 1글자일 때 세우는 추천. 부품이 최대 5건으로 자른다. 바깥이 이미 정렬해 넘긴다. */
  suggestions?: string[];
  /** 입력이 2글자 이상일 때 세우는 자동완성. 부품이 최대 3건으로 자른다. 바깥이 이미 정렬해 넘긴다. */
  completions?: string[];
  /** 최대 태그 수. 기본 10. */
  max?: number;
  /** 기본 "태그 입력하기". */
  placeholder?: string;
  disabled?: boolean;
  /** 에러 상태(빨간 경계) — Input의 invalid와 같다. */
  invalid?: boolean;
  /** 지금 치고 있는 글자(제어할 때만). 생략 시 내부 상태로 동작. */
  inputValue?: string;
  onInputChange?: (v: string) => void;
  /** 텍스트 입력의 id(Field의 htmlFor와 연결). 카운터도 이 id 기반으로 aria-describedby를 잇는다. */
  id?: string;
}

export function TagInput(props: TagInputProps): JSX.Element;
