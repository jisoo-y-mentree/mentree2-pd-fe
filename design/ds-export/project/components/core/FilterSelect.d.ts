import React from "react";

/**
 * FilterSelect — 조건 축의 트리거 + 모달 한 벌(Dialog width=600). 국가·직종·키워드가 팝오버에
 *  안 들어가 Dialog로 간다. 모달 안 선택은 "N개 적용하기"를 눌러야 onChange가 불린다 — 즉시 반영하지 않는다.
 */
export interface FilterSelectOption {
  value: string;
  label: string;
  /** leading="flag"로 넘길 국기 파일명(국가 축에서만). */
  flag?: string;
}

export interface FilterSelectGroup {
  /** 그룹 제목. 그룹이 하나뿐이면 생략(제목을 세우지 않는다). */
  label?: string;
  options: FilterSelectOption[];
}

export interface FilterSelectProps extends React.HTMLAttributes<HTMLDivElement> {
  /** 축 이름. 트리거(0개일 때)와 모달 제목에 같이 쓴다. */
  label: string;
  /** DS-97. 칩 라벨 왼쪽 선 아이콘(HugeIcons) · --primary · 14. 예: 국가 globe-02 · 키워드 tag-01 · 직종 briefcase-01. 칩 크기·글자는 그대로. */
  icon?: string;
  /** DS-112. 트리거 높이. "md"(기본) 32 · "lg" 40 — SearchInput · Select 와 같은 줄에 설 때. lg 는 글자 --text-body · 아이콘 16 · 좌우 14 · 반경 --radius-md. 모달은 그대로. */
  size?: "md" | "lg";
  groups: FilterSelectGroup[];
  /** 적용된 값(다중). "N개 적용하기"에서만 갱신된다. */
  value: string[];
  onChange: (next: string[]) => void;
  disabled?: boolean;
}

export function FilterSelect(props: FilterSelectProps): JSX.Element;
