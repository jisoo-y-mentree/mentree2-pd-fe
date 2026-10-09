import React from "react";

/**
 * InterviewCard — 인물 인터뷰 카드(표면 규칙 1단계: 인물 객체 → 카드). 세로형 1종(size 변형 없음) —
 * 3장이 같은 크기로 선다. 카드 셸·미디어 인셋/radius는 MentorCard와 같은 값. 미디어 8:5, 배지(국가+직무)는
 * 좌상단 오버레이(MentorCard는 하단, 배지 size md). 제목 2줄 고정 + 말줄임, 발췌 3줄 고정 + 말줄임.
 * 제목은 --text-h2(20, 카드 폭 400 = 360+ 구간 — 카드 제목은 카드 폭이 정한다: ~280 body 16 · 280-360 h3 18 · 360+ h2 20).
 * 발췌·인물 이름·직함·회사는 --text-caption 14(카드 안 글).
 * 인물 줄: 이름(강조)+직함 같은 줄, 회사는 다음 줄(둘 다 muted).
 * 폭을 카드가 고정하지 않는다 — 부모(캐러셀)가 정한다. 높이는 내용이 정한다(절대 높이 없음). 북마크 없음.
 * 루트는 <article>(스트레치 링크) — <a>가 아니다. href는 제목 링크로 넘어간다.
 */
export interface InterviewCardProps extends Omit<React.HTMLAttributes<HTMLElement>, "title"> {
  /** 제목(h3, 2줄 고정 + 말줄임). */
  title: string;
  /** 발췌(body muted, 3줄 고정 + 말줄임). */
  excerpt?: string;
  /** 인물 사진/일러스트(3:2). 없거나 실패 시 sage placeholder. */
  image?: string;
  /** 인물명(강조, 굵게). */
  personName?: string;
  /** 회사(muted, 다음 줄). */
  company?: string;
  /** 직함(muted, 이름과 같은 줄). */
  jobTitle?: string;
  /** 직무 분류(뉴트럴 배지, sm). 미디어 좌상단 오버레이. */
  field?: string;
  /** 국기 국가명 파일(소문자·하이픈, 예: "south-korea"). assets/flags/{country}.svg */
  country?: string;
  /** 국가 배지 라벨(예: "대한민국"). 미디어 좌상단 오버레이. */
  countryLabel?: string;
  href?: string;
}

export function InterviewCard(props: InterviewCardProps): JSX.Element;
