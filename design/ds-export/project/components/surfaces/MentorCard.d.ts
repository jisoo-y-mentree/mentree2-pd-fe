import React from "react";

/**
 * MentorCard — 세로형 멘토 카드(DS-37 B안). Desktop 296 고정 · fluid면 Mobile(~768)에서 100% · min-width 160(375 화면 2열 = 163).
 * 셸 그대로(white · 1px · --card-radius · 안쪽 8 · --card-shadow). 루트 <article> + 이름 스트레치 링크.
 * 사진: 3:2(Mobile 5:4) · 아래쪽 검정 그라데이션 · 왼쪽 위 「신규 멘토」(--green-700 · 흰 글자) · 오른쪽 위 BookmarkToggle ·
 *  왼쪽 아래 직종 배지 하나(Badge tone="primary" sm leading="icon" — JOB_GROUPS icon). 국가 배지는 사진 위에 없다.
 * 본문: 이름(카드 폭 280+ h2 · 200〜280 h3 · 200 미만 body, 600, 1줄 …) + Flag rect sm(+N 잠정) → 직무 caption 500 --sage-700 →
 *  회사 caption muted → 소개 상자(--green-100 · 테두리 없음 · --green-900 caption 500 · 1줄 …). 간격 8 · 4 · 4 · 8 · 8.
 */
export interface MentorCardProps extends React.HTMLAttributes<HTMLElement> {
  name: string;
  /** 직무(본문, 14px medium). */
  role?: string;
  /** 회사(본문, 14px normal muted). */
  company?: string;
  /** 한 줄 소개 — --green-100 면 · 테두리 없음 · --green-900 caption 500 · 1줄 …. */
  intro?: string;
  /** 직종(taxonomy.js JOB_GROUPS 값). 사진 왼쪽 아래 Badge tone="primary" sm + 직종 아이콘. */
  field?: string;
  /** 첫 국가의 국기 파일명(예: "south-korea"). 이름 옆 Flag shape="rect" size="sm". */
  country?: string;
  /** 국가명(예: "대한민국"). 이름 옆 직사각 국기의 접근 이름. */
  countryLabel?: string;
  /** 추가 국가 수 → 국기 오른쪽 「+N」 caption muted(0이면 없음). 잠정 표기. */
  countryExtra?: number;
  /** 멘토 공개일(ISO). 오늘로부터 1달 이내면 "신규 멘토" 배지 노출. */
  publishedAt?: string;
  /** 인물 사진(cover 크롭 — Desktop 3:2 · Mobile 5:4). 없거나 실패 시 sage placeholder. */
  photo?: string;
  /** 멘토 상세 링크. */
  href?: string;
  /** 모바일에서 폭을 부모가 정한다(2열 그리드용 · min-width 160). 기본 false — 296 고정. */
  fluid?: boolean;
  /** 북마크 상태(제어형이면 onBookmarkChange와 함께). */
  bookmarked?: boolean;
  /** 북마크 토글 콜백(제어형). */
  onBookmarkChange?: (next: boolean) => void;
}

export function MentorCard(props: MentorCardProps): JSX.Element;
