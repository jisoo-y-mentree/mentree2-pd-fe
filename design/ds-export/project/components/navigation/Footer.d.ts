import React from "react";
import { NavItem } from "./Header";

/**
 * Footer — mentree 사이트 푸터. 헤더와 동일한 IA(nav-ia.js, SSoT)를 공유한다.
 *
 * 로고는 mentree 워드마크(canon), 카피라이트는 mentree 기준.
 * '기업 서비스(Biz)'는 외부 출구 링크로 Biz 파랑(--biz-*)으로 격리 렌더된다.
 */
export interface FooterProps {
  /** 최상위 네비게이션. 기본값 NAV_PRIMARY. */
  primary?: NavItem[];
  /** 인증(회원가입·로그인). 기본값 NAV_AUTH. */
  auth?: NavItem[];
  /** 부가(공지사항·뉴스). 기본값 NAV_UTILITY. */
  utility?: NavItem[];
  /** 로고 슬롯. 미지정 시 mentree 워드마크 로고(canon). */
  brand?: React.ReactNode;
  /** 카피라이트 문구. */
  copyright?: React.ReactNode;
  onNavigate?: (item: NavItem) => void;
  style?: React.CSSProperties;
}

export function Footer(props: FooterProps): JSX.Element;
