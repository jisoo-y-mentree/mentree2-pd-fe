import React from "react";

export type BadgeHue = "neutral" | "gray" | "blue" | "sky" | "indigo" | "amber" | "rose" | "purple" | "teal";
export type BadgeStatus = "active" | "new" | "closed" | "waiting" | "hold";

/**
 * Badge — 계열 × leading × 사이즈 색 시스템.
 *  계열: 분류(뉴트럴 sage) · 상태(green/destructive/muted) · 질적태그(9색 --badge-{hue}).
 *  leading(전 계열 공통 앞자리 슬롯): none · dot · flag(원형 국기) · avatar · icon(DS-79, 아이콘만 --primary).
 *  형태: 높이 24px(sm) 기준 radius 6px — sm 6 / md 8 / lg 10px(완전 pill 아님). 색은 시맨틱/--badge-* 토큰만.
 *  패딩(접면 기반): 각 변을 독립 판단 — 텍스트 접면 sm8/md10/lg12, 슬롯(flag/avatar/dot/"+N ⌄") 접면 sm5/md6/lg7.
 */
export interface BadgeProps extends React.HTMLAttributes<HTMLSpanElement> {
  /** 계열. 기본 "category". "accent"(DS-83) = 주황 「New」 — 면 --orange-50 · 1px --orange-700 테두리 · --orange-700 글자 · 600 · 양끝 반원. 글자는 화면이 넘긴다. 사진 위 상태 배지는 계속 status="new". */
  variant?: "category" | "status" | "tag" | "accent";
  /** DS-91. variant="category"에만 먹는다. "primary" = 흰 면(--card) · 1px --green-200 테두리 · --green-900 글자(leading="icon"이면 아이콘 --primary). 기본 "neutral". */
  tone?: "neutral" | "primary";
  /** 상태값(variant="status"): 진행중=active · 신규=new(active와 동일 green tint — 사진 오버레이 가독성) · 마감=closed · 대기=waiting · 보류=hold. */
  status?: BadgeStatus;
  /** 질적태그 색(variant="tag"). 기본 "neutral". */
  hue?: BadgeHue;
  /** 앞자리 슬롯. 기본 "none". */
  leading?: "none" | "dot" | "flag" | "avatar" | "icon";
  /** leading="icon"일 때 HugeIcons 이름(DS-79 키워드 · DS-91 직종 — taxonomy.js 의 icon). 아이콘만 --primary, 크기는 Badge 크기를 따른다(sm14 · md16 · lg18). 접면 패딩은 flag와 같다. */
  icon?: string;
  /** leading="flag" 국가명 파일명(소문자·하이픈, 예: "south-korea","japan","united-states"). assets/flags/{국가명}.svg 로드. */
  flag?: string;
  /** DS-99. leading="flag"일 때 국기 모양. "circle"(기본) = 원형 슬롯(sm16 · md18 · lg22). "rect" = 직사각 sm 21×14 · md 24×16 · lg 30×20 · 반경 2 · 1px --border 링(Flag 의 2px 흰 여백 틀은 쓰지 않는다). labelHidden과 함께 쓰면 국기만 담은 배지(좌우 padSlot — md 6+24+6 = 36×28). */
  flagShape?: "circle" | "rect";
  /** 국기 에셋 기본 경로. 기본 circle "../../assets/flags/" · rect "../../assets/flags-rect/"(DS 카드 기준). */
  flagBase?: string;
  /** leading="avatar" 아바타 데이터. */
  avatar?: { src?: string; name?: string; alt?: string };
  size?: "sm" | "md" | "lg";
  /** true면 라벨 텍스트를 눈에서 숨김(접근 이름으로는 남는다), leading(flag/dot/avatar)만 표시. 언제 켤지는 사용처 결정(Badge는 반응형 내장 안 함). extraItems 카운트·펼침은 유지. 기본 false. */
  labelHidden?: boolean;
  /** 다중 값: 대표 값(children) 외 나머지 항목 배열. 있으면 "+N ⌄" 표시, 클릭/탭 시 팝오버 목록 펼침(바깥 클릭 닫힘, 카드 클릭 전파 차단). 없거나 빈 배열이면 단일 값 배지와 동일. */
  extraItems?: string[];
}

export function Badge(props: BadgeProps): JSX.Element;
