import React from "react";

export interface SidebarItem {
  key: string;
  label: React.ReactNode;
  /** HugeIcons 이름. */
  icon?: string;
  /** 우측에 표시할 카운트/배지. */
  badge?: React.ReactNode;
  /** 이 항목이 속한 섹션 헤딩. */
  section?: string;
}

/**
 * Sidebar — 앱 네비게이션 레일 (sidebar-* 토큰, 활성 항목은 초록).
 *
 * ⚠ 참조용 · 레거시: 이 제품은 사이드바를 기본 네비게이션으로 쓰지 않는다.
 *   제품 기본 네비게이션은 상단 고정 헤더(Header) + 푸터(Footer)다.
 *   Sidebar는 과거 앱 셸 참조용으로만 남겨둔다 — canon으로 쓰지 말 것.
 *   (그래서 startingPoint에서 제외됨.)
 */
export interface SidebarProps {
  items: SidebarItem[];
  active?: string;
  onSelect?: (key: string) => void;
  /** 상단 브랜드/로고 영역. */
  header?: React.ReactNode;
  /** 하단 사용자/계정 영역. */
  footer?: React.ReactNode;
  width?: number;
}

export function Sidebar(props: SidebarProps): JSX.Element;
