import React from "react";

export interface QnaAnswerer {
  src?: string;
  name?: string;
  alt?: string;
}

/**
 * QnaCard — 미디어 없는 텍스트 카드(Q&A). 카드 기하·elevation·동심원 원칙 상속.
 *
 * 미디어가 없어 콘텐츠 패딩 = --card-content-padding(18px) 통일, radius --card-radius(22),
 * elevation 상속. 카드 전체 클릭 → Q&A 상세. 좋아요는 카운트 표시 전용(무상태).
 */
export interface QnaCardProps extends Omit<React.AnchorHTMLAttributes<HTMLAnchorElement>, "title"> {
  /** 카테고리(분류 계열 배지). */
  category?: string;
  /** 조회수(눈 아이콘 + tabular). */
  views?: number;
  /** 좋아요 수(하트 아이콘 + tabular) — 카드에서 상태 없음, 카운트 전용. */
  likes?: number;
  /** 제목(h3, 2줄 고정). */
  title: string;
  /** 발췌(body muted, 2줄 고정). */
  excerpt?: string;
  /** 답변자 아바타 목록(AvatarGroup). */
  answerers?: QnaAnswerer[];
  /** "멘토 답변 N개"의 N. 미지정 시 answerers 길이. */
  answerCount?: number;
  /** AvatarGroup 최대 노출(초과분 "+K"). 기본 4. */
  maxAvatars?: number;
  href?: string;
}

export function QnaCard(props: QnaCardProps): JSX.Element;
