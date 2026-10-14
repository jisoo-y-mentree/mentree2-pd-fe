import React from "react";

/**
 * CoverCard (DS-67) — 이미지 반쪽 + 표지색 패널 반쪽의 가로형 표지. TOP 인터뷰 표지 · 인사이트 피처드가 같은 부품이다.
 * 판은 부품 자신의 폭(container query)으로 가른다: 768 이상 넓은 판(왼쪽 이미지 16:10 · 오른쪽 패널, 좌우 56) ·
 * 미만 좁은 판(이미지 16:9 위 · 패널 아래, 20/24 · 제목 h2 · 발췌 caption · 이름 h3 + Flag rect sm).
 * 셸 --card-radius · overflow hidden · 테두리 · 그림자 없음. 제목 스트레치 링크(mt-card-link). hover는 이미지 scale(1.03)만.
 * 패널 위 글자: 제목 --sage-50 · 본문 --sage-200(4색 모두 11:1 이상).
 */
export interface CoverCardPerson {
  name: string;
  /** 국기 파일명(taxonomy.js flag). Flag shape="rect" — 넓은 판 lg · 좁은 판 sm. */
  country?: string;
  /** 국가명 — 국기의 접근 이름. */
  countryLabel?: string;
  /** 직무 caption 500 --sage-200. */
  role?: string;
  /** 회사 caption 300 --sage-200. */
  company?: string;
}

export interface CoverCardProps extends Omit<React.HTMLAttributes<HTMLElement>, "title"> {
  href?: string;
  /** 이미지(object-fit cover · 원본 3:2). 없거나 실패 시 placeholder. */
  image?: string;
  /** 패널 면 — --cover-green · --cover-sky · --cover-rose · --cover-gray. 돌리는 순서(1→4)는 화면이 정한다. 기본 "green". */
  tone?: "green" | "sky" | "rose" | "gray";
  /** 패널 맨 위 Badge category sm(흰 면 뉴트럴) — 직무 또는 키워드. */
  badge?: string;
  /** 제목 — 넓은 판 --text-display 600 · 좁은 판 --text-h2, 2줄 말줄임. */
  title: string;
  /** 발췌 — 넓은 판 --text-h3 400 · 좁은 판 --text-caption, 3줄 말줄임. */
  excerpt?: string;
  /** 사람 줄(인터뷰). 안 주면 줄이 없다(인사이트 아티클). */
  person?: CoverCardPerson;
  /** 이미지 왼쪽 위 꼬리표(예: "신규 아티클") — --green-700 · 흰 body-sm 600 · 높이 31. */
  label?: string;
  /** 제목 heading 요소 h2〜h4. 기본 3. */
  headingLevel?: 2 | 3 | 4;
}

export function CoverCard(props: CoverCardProps): JSX.Element;
