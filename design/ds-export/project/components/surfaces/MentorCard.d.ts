import React from "react";

/**
 * MentorCard — 세로형 멘토 카드. Desktop 296px 고정. Mobile(~768)에서 폭을 부모가 정하느냐는 `fluid`로 가른다
 *  (기본 false=296 고정 — 캐러셀처럼 부모가 폭을 안 정할 때, true=100%/min-width 179 — 2열 그리드처럼 부모가 정할 때).
 *  프리미티브(Badge·BookmarkToggle) 조립.
 *
 * 카드 공통 셸: white(card) · 1px sage-200 · --card-shadow · --card-radius(동심원),
 * 미디어(Desktop 3:2 · Mobile 5:4, cover 크롭)는 --card-media-margin 인셋 + --card-media-radius. hover 시 shadow-md만(이동 없음, ~150ms).
 * 카드 전체가 멘토 상세 링크; 미디어 오버레이 3종은 각각 독립(전파 차단):
 *  좌상단 "신규 멘토"(green status 배지, publishedAt 기준 공개 후 1달 노출) ·
 *  우상단 스크랩(BookmarkToggle — 미디어 오버레이 전용, IconButton default 형태·반전, 8px 인셋) ·
 *  하단 배지 행 — 국가 배지(flag + 라벨 + "+N ⌄" 정적, 펼침은 Badge 확장 OPEN) + 직무 배지(뉴트럴 sm).
 * 텍스트 오버플로: 이름·직무·회사·소개 1줄 …; Mobile(~768) 국가 배지는 국기만, 소개는 2줄 허용(폭·무관). `fluid`일 때만 폭 100%(min-width 179px).
 * 이름은 --text-h3(18, 296px 카드 폭 구간) — 카드 제목은 카드 폭이 정한다(~280 body 16 · 280-360 h3 18 · 360+ h2 20).
 *  fluid로 폭이 179까지 줄 때만 Mobile에서 --text-body 16. 소개·직무·회사는 --text-caption 14(카드 안 글).
 *
 * 루트는 <article>(스트레치 링크) — <a>가 아니다. href는 이름 링크로 넘어간다.
 */
export interface MentorCardProps extends React.HTMLAttributes<HTMLElement> {
  name: string;
  /** 직무(본문, 14px medium). */
  role?: string;
  /** 회사(본문, 14px normal muted). */
  company?: string;
  /** 한 줄 소개 — green-50 면 + green-100 테두리 박스(글자 sage-700). Desktop 1줄 …(Mobile 2줄). */
  intro?: string;
  /** 직무 분류(뉴트럴 배지, sm). */
  field?: string;
  /** 국기 국가명 파일(소문자·하이픈, 예: "south-korea"). assets/flags/{country}.svg */
  country?: string;
  /** 국가 배지 라벨(예: "대한민국"). Mobile에선 숨김(국기만). */
  countryLabel?: string;
  /** 추가 국가 수 → "+N ⌄" 정적 표시(0이면 없음). */
  countryExtra?: number;
  /** 멘토 공개일(ISO). 오늘로부터 1달 이내면 "신규 멘토" 배지 노출. */
  publishedAt?: string;
  /** 인물 사진(cover 크롭 — Desktop 3:2 · Mobile 5:4). 없거나 실패 시 sage placeholder. */
  photo?: string;
  /** 멘토 상세 링크. */
  href?: string;
  /** 모바일에서 폭을 부모가 정한다(2열 그리드용). 기본 false — 캐러셀처럼 부모가 폭을 안 정하면 296 고정. */
  fluid?: boolean;
  /** 북마크 상태(제어형이면 onBookmarkChange와 함께). */
  bookmarked?: boolean;
  /** 북마크 토글 콜백(제어형). */
  onBookmarkChange?: (next: boolean) => void;
}

export function MentorCard(props: MentorCardProps): JSX.Element;
