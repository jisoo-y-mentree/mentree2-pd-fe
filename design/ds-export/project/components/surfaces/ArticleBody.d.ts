import * as React from "react";

/**
 * ArticleBody — 아티클 본문(DS-56). 아티클 상세·멘토 상세 인터뷰 탭이 같은 글을 같은 폭으로 그린다.
 * 폭 max-width 720 · width 100%. 스스로 가운데 정렬하지 않는다(놓는 쪽이 정한다).
 * 머리(선택): badges(국가→키워드) · title(h1 --text-display 600) · date(YYYY.MM.DD). 가운데 정렬 · 간격 16.
 * 본문: blocks — h2 · p(--text-article, mark·link 조각) · figure(16:9, 실패 시 sage placeholder).
 */
export type ArticleInline = string | { mark: string } | { link: string; href: string };

export type ArticleBlock =
  | { type: "h2"; id?: string; text: string }
  | { type: "p"; content: string | ArticleInline[] }
  | { type: "figure"; src?: string; alt?: string; caption?: string };

export type ArticleBadge =
  | { type: "country"; label: string; flag?: string }
  | { type: "keyword"; label: string };

export interface ArticleBodyProps extends Omit<React.HTMLAttributes<HTMLDivElement>, "title"> {
  /** 머리 배지. 순서와 무관하게 국가 → 키워드로 선다. */
  badges?: ArticleBadge[];
  /** 글 제목 — h1. */
  title?: React.ReactNode;
  /** 게시일. "YYYY.MM.DD" 문자열 또는 Date/ISO — YYYY.MM.DD로 표기. */
  date?: string | Date;
  /** 본문 블록 배열. */
  blocks?: ArticleBlock[];
  /** 국기 에셋 경로(Badge flagBase로 전달). */
  flagBase?: string;
}

export declare function ArticleBody(props: ArticleBodyProps): React.ReactElement;
