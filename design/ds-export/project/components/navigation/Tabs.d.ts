import React from "react";

export interface TabItem {
  /** 값(제어형 value와 대조, id 생성에도 쓰인다). */
  value: string;
  label: string;
  /** 라벨 뒤 카운트 배지(Badge sm). 넘기지 않으면 배지가 붙지 않는다. 선택 탭은 green tint, 미선택은 뉴트럴. */
  count?: number;
  disabled?: boolean;
}

/**
 * Tabs — 같은 셸 안에서 내용을 바꾸는 전환(화면을 떠나지 않는다). WAI-ARIA tabs 패턴.
 *
 * ToggleGroup과의 경계: ToggleGroup=같은 목록의 조건을 바꾼다(면을 채운다) · Tabs=내용 자체가 바뀐다(밑줄).
 * 선택 표시는 밑줄(--primary 2px) + 라벨 색·굵기 — 색만으로 가르지 않는다(WCAG 1.4.1).
 * 탭 수 2~10. 줄바꿈하지 않고 가로 스크롤(스크롤바 감춤 + 가장자리 페이드), 선택 탭은 보이는 자리로 스크롤.
 * 키보드: ←/→ 이동(disabled 건너뜀) · Home/End · roving tabindex. 제어형(value + onChange).
 */
export interface TabsProps extends Omit<React.HTMLAttributes<HTMLDivElement>, "onChange"> {
  items: TabItem[];
  /** 선택된 탭 값(제어형). URL에 담는 화면이 있어 부모가 상태를 가진다. */
  value: string;
  onChange?: (next: string) => void;
  /** id 접두사 — 탭은 `${idBase}-tab-${value}`, 패널은 `${idBase}-panel-${value}`. 기본 "tabs". */
  idBase?: string;
  /** tablist의 접근 이름. 기본 "탭". */
  ariaLabel?: string;
}

export interface TabPanelProps extends React.HTMLAttributes<HTMLDivElement> {
  /** Tabs와 같은 idBase. */
  idBase?: string;
  /** 이 패널이 대응하는 탭 값. */
  value: string;
}

export function Tabs(props: TabsProps): JSX.Element;
export function TabPanel(props: TabPanelProps): JSX.Element;
