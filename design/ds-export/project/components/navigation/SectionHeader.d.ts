import React from "react";

/**
 * SectionHeader — 배치 컴포넌트. 가로 한 줄, 좌우 양끝 정렬(좌 제목 / 우 액션).
 *
 * 중앙정렬형 미포함(개별 대응). 배지·버튼·IconButton·아이콘은 기존 컴포넌트 재사용.
 * 액션 조합 변형: 전체보기만 / 화살표만 / 둘 다 / 없음. 캐러셀 끝 도달 시 IconButton disabled 사용.
 */
export interface SectionHeaderProps extends Omit<React.HTMLAttributes<HTMLDivElement>, "title"> {
  /** 장식 아이콘(옵션, 제목 앞 사각 sage 칩). HugeIcons 이름. IconButton 아님. */
  icon?: string;
  /** 제목(--text-h0 semibold). */
  title: React.ReactNode;
  /** green 강조 조각(옵션). 기본은 제목 뒤 — accentFirst면 앞. */
  titleAccent?: React.ReactNode;
  /** titleAccent를 제목 앞에 둔다(기본 false = 뒤). */
  accentFirst?: boolean;
  /** 부가 스트링(옵션, 제목 오른쪽 muted). 예: "3,200명의 멘토". */
  suffix?: React.ReactNode;
  /** 제목 옆 Badge(옵션). Badge 엘리먼트를 그대로 전달. */
  badge?: React.ReactNode;
  /** 전체보기 고스트 버튼(→ 화살표 포함) 표시. */
  viewAll?: boolean;
  onViewAll?: React.MouseEventHandler;
  /** 추가 액션(옵션, 아웃라인 버튼 등 임의 엘리먼트). */
  action?: React.ReactNode;
  /** 캐러셀 좌우 화살표 IconButton 2개 표시. */
  carousel?: boolean;
  onPrev?: React.MouseEventHandler;
  onNext?: React.MouseEventHandler;
  /** 캐러셀 끝 도달 시 해당 화살표 disabled(기존 IconButton disabled 상태). */
  prevDisabled?: boolean;
  nextDisabled?: boolean;
}

export function SectionHeader(props: SectionHeaderProps): JSX.Element;
