import React from "react";

/**
 * AnswerCard — Q&A 상세의 멘토 답변 1건. QnaCard(질문)와 다르다: 답변은 갈 곳이 없어(답변 상세 페이지 없음)
 * 스트레치 링크를 만들지 않는다 — href를 받지 않는다. 루트는 <article>.
 *
 * QnaCard와의 경계: QnaCard=질문(카드 전체 클릭 → 상세로 이동) · AnswerCard=답변(갈 곳이 없어 카드 전체 클릭이 없다).
 * 스크랩 없음(목록 단위가 질문이라 답변마다 두면 한 질문에 여러 개가 동시에 켜진다 — 스크랩은 QnaCard에만).
 * 상태(기본·accepted·isQuestionerView·isMine)는 배타가 아니다 — 동시에 겹칠 수 있다.
 * 범위 밖: 답변 작성 폼(qna-detail 화면이 조립) · 답변 0건 표시(EmptyState).
 * DS-23 개정: 머리 상자(--green-50 · 상자 전체가 멘토 상세 링크) → 도움 표시 → 본문 → 날짜 → 동작 줄(하트 박스 · 감사인사 작성 · 공유) → 감사 인사.
 *  좁은 폭(< 560): 「멘토 프로필 보기 ›」가 이름 아래 줄로, 「감사인사 작성」은 동작 줄 다음 줄 전체 폭.
 */
export interface AnswerCardProps extends React.HTMLAttributes<HTMLElement> {
  mentorName: string;
  /** 멘토 사진. 없거나 실패 시 이니셜 폴백(Avatar). */
  mentorPhoto?: string;
  /** 국기 국가명 파일(소문자·하이픈, 예: "japan"). assets/flags/{country}.svg */
  country?: string;
  /** 국가 배지 라벨(예: "일본"). */
  countryLabel?: string;
  /** @deprecated DS-23 — 받아도 그리지 않는다. */
  activityLocation?: string;
  /** 헤드라인(예: "데이터 애널리스트 @Google Japan (14년차)"). 머리 상자 둘째 줄에 「국가 · 헤드라인」으로 선다. */
  headline?: string;
  /** 멘토 프로필 링크. 머리 상자 전체가 이 href 하나로 이동, 새 창. */
  mentorProfileHref?: string;
  /** @deprecated DS-23 — 「이 멘토의 다른 답변 보기」를 뺐다. 받아도 그리지 않는다. */
  mentorAnswersHref?: string;
  /** 답변 본문(전문). --text-article 17(읽을거리 본문). line-clamp 없음 — QnaCard와 다르다. */
  body: string;
  /** 작성일(ISO 문자열 또는 Date). 연월일만 표시(시간 없음). */
  date?: string | Date;
  /** 내가 하트를 누른 적이 있다(아이콘 채움). DS-116 — 채움은 이 값만 따른다(누른다고 부품이 켜지 않는다). */
  liked?: boolean;
  /** 하트를 누를 때마다 부른다(DS-23 · 끄는 동작 없음). DS-116 — 부르기만 한다. 올릴지(likeCount · liked)는 화면이 정한다 — 비로그인이면 그대로 둔다. */
  onLike?: () => void;
  /** @deprecated DS-23 — 남겨 두되 쓰지 않는다. onLike를 쓴다. */
  onLikeChange?: (next: boolean) => void;
  /** 도움돼요 카운트. DS-116 — 보이는 수 = 이 값(부품이 로컬로 올리지 않는다). */
  likeCount?: number;
  /** 공유 Popover의 "이 답변 링크 복사" 대상 URL(onCopyLink 없으면 클립보드에 직접 복사). */
  answerUrl?: string;
  /** 링크 복사 콜백(제공 시 answerUrl 대신 이걸 호출). */
  onCopyLink?: () => void;
  /** 질문자가 도움된다고 한 답변. true면 본문 위에 「✓ 질문자가 도움된다고 한 답변입니다」. */
  accepted?: boolean;
  /** 질문자 시점 — true이고 thanks가 없으면 동작 줄에 「감사인사 작성」(outline lg). */
  isQuestionerView?: boolean;
  /** 「감사인사 작성」 클릭 콜백. 모달은 화면이 연다. */
  onThanks?: () => void;
  /** 질문자가 쓴 감사 인사. 있으면 카드 맨 아래에 그리고 「감사인사 작성」을 숨긴다. author는 화면이 넘긴 그대로(익명 표기는 화면 규칙). */
  thanks?: { author: string; date?: string | Date; text: string };
  /** 내 답변 여부 — true면 카드 우상단에 더보기(⋯) 메뉴(수정·삭제) 노출. */
  isMine?: boolean;
  onEdit?: () => void;
  onDelete?: () => void;
}

export function AnswerCard(props: AnswerCardProps): JSX.Element;
