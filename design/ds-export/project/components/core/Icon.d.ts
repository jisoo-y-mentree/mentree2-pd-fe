import React from "react";

/**
 * Icon — HugeIcons 정적 SVG를 CSS 마스크로 currentColor 재색칠.
 */
export interface IconProps extends React.HTMLAttributes<HTMLSpanElement> {
  /** 확장자 없는 HugeIcons 파일명. 예: "home-01", "mentoring". */
  name: string;
  /** px 크기(가로·세로). 기본 20. */
  size?: number;
  /** 색 오버라이드. 기본 currentColor. */
  color?: string;
  /** 전체 URL 오버라이드(CDN 이름 조회 우회). */
  strokeUrl?: string;
}

export function Icon(props: IconProps): JSX.Element;
