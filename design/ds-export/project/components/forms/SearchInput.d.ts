import React from "react";

/**
 * SearchInput — 자동완성·최근 검색어가 붙는 검색창. TagInput과 같은 골격(한 자리를 갈아끼운다) —
 *  다른 점: 제안 줄이 상자 밖(떠 있는 드롭다운)이다. 포커스+빈값=최근 검색어, 입력 중=자동완성(갈아끼움).
 *  상자는 Input의 테두리·radius·포커스 링을 그대로 쓴다. 정렬·필터·개수 제한은 부품이 하지 않는다 —
 *  completions/recent는 바깥이 이미 정렬해 넘긴 배열이다.
 */
export interface SearchInputProps {
  value: string;
  onChange: (v: string) => void;
  /** Enter 또는 항목 선택 시. */
  onSearch: (v: string) => void;
  /** 입력 중일 때 세우는 자동완성. 바깥이 정렬해 넘긴다. 자르지 않는다. */
  completions?: string[];
  /** 포커스+빈값일 때 세우는 최근 검색어. 최대 5개는 바깥이 지킨다. */
  recent?: string[];
  onRemoveRecent?: (v: string) => void;
  placeholder?: string;
  /** DS-97. 주면 검색창 안 오른쪽에 작은 버튼(높이 32 · 좌우 14 · 1px --border · 반경 10 · 흰 면 · --primary 600 · --text-caption).
   *  누르거나 Enter로 onSearch. 입력 중에는 부르지 않는다. 검색창 면은 초록으로 채우지 않는다. 예: "검색". */
  submitLabel?: string;
  disabled?: boolean;
  /** 에러 상태(빨간 경계) — Input의 invalid와 같다. */
  invalid?: boolean;
  id?: string;
  /** 마운트 시 포커스. 데모/즉시 검색 진입 화면에 쓴다. */
  autoFocus?: boolean;
}

export function SearchInput(props: SearchInputProps): JSX.Element;
