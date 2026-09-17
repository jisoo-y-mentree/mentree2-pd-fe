import React from "react";

export interface NavItem {
  key: string;
  label: React.ReactNode;
  href?: string;
  external?: boolean;
  brand?: "biz";
}

export type AuthState = "guest" | "mentor" | "mentee";

/**
 * Header — 제품 기본 상단 네비게이션(sticky top). 3열 그리드(`1fr auto 1fr`) — 좌(로고)/중(메뉴)/우(액션).
 * 중앙 메뉴는 좌우 폭과 무관하게 늘 화면 폭의 중앙에 선다.
 *
 * 좌: mentree 워드마크 풀컬러 그린(→ 홈). 중: 최상위 3개(멘토 찾기·Q&A·멘트리 인사이트).
 * 메뉴 아이콘은 20px HugeIcons 모노다. 전역 아이콘 원칙의 예외가 아니다. 라벨은 16px·600 이고,
 * 활성은 굵기가 아니라 색(`--primary`)으로 나눈다. 공지·뉴스는 헤더에 없음(푸터에만).
 *
 * 로그인(`mentor`·`mentee`)은 우측이 알림 버튼(40, `secondary`) + 아바타(40), 간격 8 이다.
 * 회원가입·기업 서비스는 나오지 않는다. 두 상태의 모양은 같고 아바타의 목적지만 다르다 —
 * 멘토는 `mypage-mentor`, 멘티는 `mypage-mentee`. 아바타는 메뉴를 열지 않고 마이페이지 「프로필」
 * 탭으로 직행한다. `unread`면 알림 버튼 우상단에 빨간 점(8, 숫자 없음). 알림 popover는 이 부품이
 * 열지 않는다(`onNotify`까지).
 *
 * Mobile(~768): 중앙 메뉴가 햄버거로 접히고, 누르면 GNB 아래를 채우는 전체화면 오버레이가 열린다.
 * 오버레이는 `<header>`의 형제다 — 안에 두면 `backdrop-filter`가 기준 상자를 가로채 높이가 0이 된다.
 */
export interface HeaderProps {
  /** 중앙 메뉴. 기본 NAV_PRIMARY에서 biz 제외한 3개. 항목의 menuIcon(url)/menuIconEl로 28px 컬러 아이콘 주입. */
  menu?: NavItem[];
  /** 로고 슬롯. 미지정 시 mentree 워드마크(풀컬러 그린). */
  brand?: React.ReactNode;
  /** 현재 활성 항목 key(활성 메뉴 primary green). */
  activeKey?: string;
  /** 로그인 상태 분기. 기본 "guest"(비로그인). mentor·mentee는 우측이 알림+아바타. */
  authState?: AuthState;
  /** 로그인 유저. authState가 "mentor"·"mentee"일 때 아바타에 쓴다. */
  user?: { name?: string; avatarUrl?: string };
  /** 읽지 않은 알림이 있다 — 알림 버튼 우상단에 빨간 점. 숫자는 넣지 않는다. */
  unread?: boolean;
  /** 메뉴/로고/기업서비스/아바타 이동 콜백. */
  onNavigate?: (item: NavItem) => void;
  /** 회원가입/로그인 버튼 콜백(guest). */
  onAuth?: (e: React.MouseEvent, item: NavItem) => void;
  /** 알림 버튼 클릭. 이 부품은 popover를 열지 않는다 — 여는 것은 화면의 일이다. */
  onNotify?: (e: React.MouseEvent) => void;
  style?: React.CSSProperties;
}

export function Header(props: HeaderProps): JSX.Element;
