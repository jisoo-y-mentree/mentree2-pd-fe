import React from "react";

/**
 * Breadcrumb — 목록→상세 2단 경로. 마지막 항목은 href가 있어도 무시하고 현재 페이지로 렌더한다.
 *  깊이 2단뿐 — 3단 이상·홈 아이콘·드롭다운·size 2종을 만들지 않는다.
 */
export interface BreadcrumbItem {
  label: string;
  /** 마지막 항목에서는 무시된다(항상 현재 페이지로 렌더). */
  href?: string;
}

export interface BreadcrumbProps extends React.HTMLAttributes<HTMLElement> {
  /** 마지막이 현재 페이지. */
  items: BreadcrumbItem[];
  /** 기본 "경로". */
  ariaLabel?: string;
}

export function Breadcrumb(props: BreadcrumbProps): JSX.Element;
