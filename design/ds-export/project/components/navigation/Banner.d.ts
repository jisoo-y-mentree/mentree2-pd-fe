import React from "react";

/**
 * Banner — 인라인 둥근 프로모/유도 블록(페이지 흐름 중간 삽입). CalloutBar와 구분(둥근 인라인).
 *
 * "자유 영역(slot)" 컴포넌트 — 내부 표현을 엄격히 규정하지 않는다.
 * 고정(외곽 최소): radius 22 · 인라인(좌우 여백) · 기본 패딩 16 · 기본 전체 클리커블 ·
 * 전역 뼈대 상속(Pretendard JP · 禁則 · 시맨틱). 자유: 배경(과감한 색·그라데이션)·효과·레이아웃·CTA.
 */
export interface BannerProps extends React.HTMLAttributes<HTMLElement> {
  /** 지정 시 <a>로 렌더(전체 링크). */
  href?: string;
  /** 배경(자유 — 팔레트 벗어난 색·그라데이션 허용). CSS background 값. */
  background?: string;
  /** 내부 패딩. 기본 16(px 또는 CSS 문자열). 콘텐츠에 따라 가변. */
  padding?: number | string;
  /** 클리커블 여부. 기본: href/onClick 있으면 true. */
  clickable?: boolean;
  /** 자유 내용 — 아이콘·제목/부제·CTA 버튼 등 자유 조합. */
  children?: React.ReactNode;
}

export function Banner(props: BannerProps): JSX.Element;
