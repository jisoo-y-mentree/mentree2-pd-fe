import React from "react";

export interface QnaAnswerer {
  src?: string;
  name?: string;
  alt?: string;
}

/**
 * QnaCard — 미디어 없는 텍스트 카드(Q&A). 카드 기하·elevation·동심원 원칙 상속.
 *
 * 콘텐츠 패딩 = --card-content-padding(18px), radius --card-radius(22), elevation 상속.
 * 상단=분류(국가 flag Badge → 키워드 Badge, 순서 고정) · 해시태그=Chip sm prefix="#"(눌림, 최대 5 + "+N" Badge) ·
 * 하단=반응(조회수 표시 전용 + 도움돼요·스크랩 CountToggle, 둘 다 제어형).
 * 색 예산: 국기·아바타 사진·"멘토 답변 N개"의 N만 채도 사용 — 해시태그는 항상 --muted.
 * 루트는 <article>(스트레치 링크) — <a>가 아니다. href는 제목 링크로 넘어간다.
 */
export interface QnaCardProps extends Omit<React.HTMLAttributes<HTMLElement>, "title"> {
  /** 국기 국가명 파일(소문자·하이픈, 예: "south-korea"). assets/flags/{country}.svg */
  country?: string;
  /** 국가 배지 라벨(예: "대한민국"). */
  countryLabel?: string;
  /** 키워드 배지(뉴트럴, md). 예: "취업 준비". */
  keyword?: string;
  /** 제목(h3, 2줄 고정). */
  title: string;
  /** 발췌(body muted, 2줄 고정). */
  excerpt?: string;
  /** 해시태그(문자열 배열, "#" 없이). Chip sm prefix="#"로 5개까지 — 6개 이상이면 5개 뒤에 "+N" Badge(안 눌림·펼치지 않음). */
  tags?: string[];
  /** 좁은 폭(우측 위젯 "나의 Q&A") — 해시태그 행을 통째로 감춘다. 나머지 구성은 같다. 기본 false. */
  compact?: boolean;
  /** 답변자 아바타 목록(AvatarGroup). 표시 순서는 호출부가 결정(질문자가 도움돼요 누른 답변 → 도움돼요 수 → 최신). */
  answerers?: QnaAnswerer[];
  /** "멘토 답변 N개"의 N. 미지정 시 answerers 길이. 0이면 "아직 작성된 답변이 없습니다"(primary green). */
  answerCount?: number;
  /** AvatarGroup 최대 노출(초과분 "+K"). 사진만 줄인다 — answerCount의 N은 그대로. 기본 3. */
  maxAvatars?: number;
  /** 조회수(HugeIcons view + tabular). 무상태. */
  views?: number;
  /** 도움돼요 선택 여부(제어형). */
  liked?: boolean;
  /** 도움돼요 토글 콜백(제어형 — 카드가 숫자를 스스로 바꾸지 않는다). 비로그인 유도는 화면이 가로챈다. */
  onLikeChange?: (next: boolean) => void;
  /** 도움돼요 카운트. */
  likes?: number;
  /** 스크랩 선택 여부(제어형). */
  scrapped?: boolean;
  /** 스크랩 토글 콜백(제어형). */
  onScrapChange?: (next: boolean) => void;
  /** 스크랩 카운트. */
  scraps?: number;
  href?: string;
}

export function QnaCard(props: QnaCardProps): JSX.Element;
