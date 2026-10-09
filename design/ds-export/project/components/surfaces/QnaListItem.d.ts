import React from "react";
import type { QnaAnswerer } from "./QnaCard";

/**
 * QnaListItem (DS-57) — Q&A 한 건을 목록의 한 줄로. 카드 셸 없이 줄 위아래 hairline(--sage-200).
 * 변형 이름은 자리가 아니라 강조점이다: default=전부 · compact=제목만 · answer=그 멘토의 답변 · question=질문과 답변 수.
 * props 이름·뜻은 QnaCard와 같다 — 같은 데이터를 카드와 줄에 넘긴다. 새 prop은 answerExcerpt · variant · headingLevel · showScrap · loading.
 * 루트 <article>, 제목 <a>가 줄 전체로 늘어난다(QnaCard의 .mt-card-link). 포커스 = 제목 → 해시태그 → 도움돼요 → 스크랩.
 * hover = --sage-50 면 · 포커스 링은 줄 전체. 면을 칠하지 않는다 — 밴드 면은 화면이 깐다.
 */
export interface QnaListItemProps extends Omit<React.HTMLAttributes<HTMLElement>, "title"> {
  /** 강조점. 기본 "default". */
  variant?: "default" | "compact" | "answer" | "question";
  /** 줄 전체가 가는 곳. */
  href?: string;
  /** 질문 제목. default·question 2줄, compact·answer 1줄에서 말줄임. */
  title: string;
  /** 제목 heading 요소 h2〜h4. 목록 섹션이 h2면 3. 기본 3. */
  headingLevel?: 2 | 3 | 4;
  /** QnaCard와 같다 — 국기 파일명. default만 그린다. */
  country?: string;
  /** QnaCard와 같다. default=국가 Badge · compact=「국가 · 키워드」 글자. */
  countryLabel?: string;
  /** QnaCard와 같다. default=Badge · compact·question=글자. */
  keyword?: string;
  /** 질문 본문 발췌(default, caption muted 2줄). */
  excerpt?: string;
  /** 그 멘토의 답변 발췌(answer, body --foreground 3줄). 이 prop만 새로 생겼다. */
  answerExcerpt?: string;
  /** 해시태그("#" 없이). default만 — Chip sm 3개까지 + 넘으면 「+N」 Badge(안 눌림). QnaCard(폭으로 자름)와 다르다. */
  tags?: string[];
  /** 해시태그 Chip의 href를 만든다. (tag) => string. 안 주면 `/tags/{태그}`. 「+N」 Badge는 링크가 아니다. */
  tagHref?: (tag: string) => string;
  /** QnaCard와 같다. default만 그린다. */
  answerers?: QnaAnswerer[];
  /** QnaCard와 같다. 미지정 시 answerers 길이. 0이면 변형별 「답변 없음」 표기. */
  answerCount?: number;
  /** QnaCard와 같다. 기본 3. */
  maxAvatars?: number;
  views?: number;
  likes?: number;
  /** 도움돼요(제어형). default·answer에서 토글, question은 수만 글자로. */
  liked?: boolean;
  onLikeChange?: (next: boolean) => void;
  scraps?: number;
  /** 스크랩(제어형). default·answer, compact는 showScrap일 때만. */
  scrapped?: boolean;
  onScrapChange?: (next: boolean) => void;
  /** compact에서만 — 「답변 N」 오른쪽에 스크랩 CountToggle. 누르면 onScrapChange(false). 줄을 뺄지는 화면이 정한다. 기본 false. */
  showScrap?: boolean;
  /** 그 변형 모양의 Skeleton 줄. 기본 false. */
  loading?: boolean;
}

export function QnaListItem(props: QnaListItemProps): JSX.Element;
