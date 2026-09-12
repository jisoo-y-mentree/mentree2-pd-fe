import React from "react";

/**
 * Skeleton — 로딩 중 자리를 잡아두는 회색 덩어리 프리미티브 하나.
 *
 * 카드/목록 모양을 미리 만들지 않는다 — 화면이 이 덩어리를 배치해서 형태를 만든다.
 * 은은한 펄스 하나만 쓰고(shimmer 금지) prefers-reduced-motion에서 멈춘다. 색은 --muted만.
 * 자기 자신은 aria-hidden="true" — 감싸는 영역에 aria-busy="true"를 두는 것은 화면의 일이다.
 */
export interface SkeletonProps extends React.HTMLAttributes<HTMLDivElement> {
  /** 폭. 숫자(px)나 문자열. 기본 "100%". */
  width?: number | string;
  /** 높이. 숫자(px)나 문자열. 기본은 본문 한 줄 높이. */
  height?: number | string;
  /** 모서리. "full"은 아바타 자리. 기본 "sm". */
  radius?: "sm" | "md" | "full";
  /** 여러 줄을 한 번에. 2 이상이면 줄 간격을 두고 쌓이고 마지막 줄은 폭 60%. 기본 1. */
  count?: number;
}

export function Skeleton(props: SkeletonProps): JSX.Element;
