import React from "react";

/**
 * AnswerCard — Q&A 상세의 멘토 답변 1건. QnaCard(질문)와 다르다: 답변은 갈 곳이 없어(답변 상세 페이지 없음)
 * 스트레치 링크를 만들지 않는다 — href를 받지 않는다. 루트는 <article>.
 *
 * QnaCard와의 경계: QnaCard=질문(카드 전체 클릭 → 상세로 이동) · AnswerCard=답변(갈 곳이 없어 카드 전체 클릭이 없다).
 * 스크랩 없음(목록 단위가 질문이라 답변마다 두면 한 질문에 여러 개가 동시에 켜진다 — 스크랩은 QnaCard에만).
 * 상태(기본·accepted·isQuestionerView·isMine)는 배타가 아니다 — 동시에 겹칠 수 있다.
 * 범위 밖: 답변 작성 폼(qna-detail 화면이 조립) · 답변 0건 표시(EmptyState).
 */
export interface AnswerCardProps extends React.HTMLAttributes<HTMLElement> {
  mentorName: string;
  /** 멘토 사진. 없거나 실패 시 이니셜 폴백(Avatar). */
  mentorPhoto?: string;
  /** 국기 국가명 파일(소문자·하이픈, 예: "japan"). assets/flags/{country}.svg */
  country?: string;
  /** 국가 배지 라벨(예: "일본"). */
  countryLabel?: string;
  /** 활동지 텍스트(예: "도쿄에서 활동"). */
  activityLocation?: string;
  /** 헤드라인(예: "데이터 애널리스트 @Google Japan (14년차)"). */
  headline?: string;
  /** 멘토 프로필 링크. 헤더 블록 전체(이름에 걸린 스트레치 링크)가 이 href로 이동, 새 창. */
  mentorProfileHref?: string;
  /** 이 멘토의 다른 답변 링크(outline 버튼 — 이 카드에서 테두리를 가진 유일한 요소). 새 창으로 연다. */
  mentorAnswersHref?: string;
  /** 답변 본문(전문). --text-article 17(읽을거리 본문). line-clamp 없음 — QnaCard와 다르다. */
  body: string;
  /** 작성일(ISO 문자열 또는 Date). 연월일만 표시(시간 없음). */
  date?: string | Date;
  /** 도움돼요 선택 여부(제어형이면 onLikeChange와 함께). */
  liked?: boolean;
  /** 도움돼요 토글 콜백(제어형). tone="rose". */
  onLikeChange?: (next: boolean) => void;
  /** 도움돼요 카운트. */
  likeCount?: number;
  /** 공유 Popover의 "이 답변 링크 복사" 대상 URL(onCopyLink 없으면 클립보드에 직접 복사). */
  answerUrl?: string;
  /** 링크 복사 콜백(제공 시 answerUrl 대신 이걸 호출). */
  onCopyLink?: () => void;
  /** 채택 여부 — 질문자가 도움된다고 한 답변. true면 "질문자가 도움된다고 한 답변입니다"(primary green). */
  accepted?: boolean;
  /** 질문자 시점 여부 — true면 "감사인사 보내기" 버튼 노출(그 질문자의 질문에 달린 답변에서만). */
  isQuestionerView?: boolean;
  /** 감사인사 보내기 클릭 콜백. 모달은 이 컴포넌트 범위 밖(화면이 조립). */
  onThanks?: () => void;
  /** 내 답변 여부 — true면 카드 우상단에 더보기(⋯) 메뉴(수정·삭제) 노출. */
  isMine?: boolean;
  onEdit?: () => void;
  onDelete?: () => void;
}

export function AnswerCard(props: AnswerCardProps): JSX.Element;
