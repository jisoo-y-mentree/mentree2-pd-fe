import React from "react";

export interface NavItem {
  key: string;
  label: React.ReactNode;
  href?: string;
  external?: boolean;
  brand?: "biz";
  /** 28px 컬러 아이콘 이미지 URL(중앙 메뉴 전용, HugeIcons 아님). */
  menuIcon?: string;
  /** 28px 컬러 아이콘 엘리먼트(url 대신 직접 주입). */
  menuIconEl?: React.ReactNode;
}

export type AuthState = "guest" | "mentor" | "mentee";

/**
 * Header — 제품 기본 상단 네비게이션(sticky top). 좌우 3분할: 좌(로고)/중(메뉴)/우(액션).
 *
 * 좌: mentree 워드마크 풀컬러 그린(→ 홈). 중: 최상위 3개(멘토 찾기·Q&A·멘트리 인사이트),
 * 각 메뉴 28px 컬러 아이콘 슬롯(HugeIcons 아님 — 오리지널 컬러 SVG 예정, 전역 아이콘 원칙의 예외),
 * 활성=primary green. 우: 회원가입/로그인(green 버튼 하나) + 기업 서비스(중립 outline, 외부 ↗·파랑 없음).
 * 공지·뉴스는 헤더에 없음(푸터에만). 상태 분기 guest/mentor/mentee — guest만 구현.
 */
export interface HeaderProps {
  /** 중앙 메뉴. 기본 NAV_PRIMARY에서 biz 제외한 3개. 항목의 menuIcon(url)/menuIconEl로 28px 컬러 아이콘 주입. */
  menu?: NavItem[];
  /** 로고 슬롯. 미지정 시 mentree 워드마크(풀컬러 그린). */
  brand?: React.ReactNode;
  /** 현재 활성 항목 key(활성 메뉴 primary green). */
  activeKey?: string;
  /** 로그인 상태 분기. 기본 "guest"(비로그인). mentor·mentee는 분기 자리만(미구현). */
  authState?: AuthState;
  /** 메뉴/로고/기업서비스 이동 콜백. */
  onNavigate?: (item: NavItem) => void;
  /** 회원가입/로그인 버튼 콜백. */
  onAuth?: (e: React.MouseEvent, item: NavItem) => void;
  style?: React.CSSProperties;
}

export function Header(props: HeaderProps): JSX.Element;
