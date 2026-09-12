import React from "react";

/**
 * InterviewCard — 인물 인터뷰 카드(표면 규칙 1단계: 인물 객체 → 카드).
 *
 * 좌우 가로 분할(좌 미디어 1:1 / 우 정보), 카드 셸·elevation·동심원 기하 상속. TOP용 가로형.
 * TOP 변형 한정 절대 높이: featured 미디어 320 → 카드 336, compact 미디어 144 → 카드 160(미디어가 높이 결정).
 * 카드 전체 클릭 → 인터뷰 상세. 북마크 없음. featured/compact는 같은 컴포넌트의 size 변형.
 * 인물 위계: 이름 강조 > 회사·직함 muted.
 *
 * 루트는 <article>(스트레치 링크) — <a>가 아니다. href는 제목 링크로 넘어간다.
 */
export interface InterviewCardProps extends Omit<React.HTMLAttributes<HTMLElement>, "title"> {
  /** 크기 변형. featured=대형(발췌 있음) · compact=소형(발췌 없음). 기본 featured. */
  size?: "featured" | "compact";
  /** 제목(featured h2 / compact h3, 2줄 고정). */
  title: string;
  /** 발췌(featured만, body muted). */
  excerpt?: string;
  /** 인물 사진/일러스트(1:1). 없거나 실패 시 sage placeholder. */
  image?: string;
  /** 인물명(강조, 굵게). */
  personName?: string;
  /** 회사(muted). */
  company?: string;
  /** 직함(muted). */
  jobTitle?: string;
  /** 직무 분류(뉴트럴 배지, sm). */
  field?: string;
  /** 국기 국가명 파일(소문자·하이픈, 예: "south-korea"). assets/flags/{country}.svg */
  country?: string;
  /** 국가 배지 라벨(예: "대한민국"). */
  countryLabel?: string;
  href?: string;
}

export function InterviewCard(props: InterviewCardProps): JSX.Element;
