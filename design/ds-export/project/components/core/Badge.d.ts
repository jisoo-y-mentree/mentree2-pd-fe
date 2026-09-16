import React from "react";

export type BadgeHue = "neutral" | "gray" | "blue" | "sky" | "indigo" | "amber" | "rose" | "purple" | "teal";
export type BadgeStatus = "active" | "new" | "closed" | "waiting" | "hold";

/**
 * Badge — 계열 × leading × 사이즈 색 시스템.
 *  계열: 분류(뉴트럴 sage) · 상태(green/destructive/muted) · 질적태그(9색 --badge-{hue}).
 *  leading(전 계열 공통 앞자리 슬롯): none · dot · flag(원형 국기) · avatar.
 *  형태: 높이 24px(sm) 기준 radius 6px — sm 6 / md 8 / lg 10px(완전 pill 아님). 색은 시맨틱/--badge-* 토큰만.
 *  패딩(접면 기반): 각 변을 독립 판단 — 텍스트 접면 sm8/md10/lg12, 슬롯(flag/avatar/dot/"+N ⌄") 접면 sm5/md6/lg7.
 */
export interface BadgeProps extends React.HTMLAttributes<HTMLSpanElement> {
  /** 계열. 기본 "category". */
  variant?: "category" | "status" | "tag";
  /** 상태값(variant="status"): 진행중=active · 신규=new(active와 동일 green tint — 사진 오버레이 가독성) · 마감=closed · 대기=waiting · 보류=hold. */
  status?: BadgeStatus;
  /** 질적태그 색(variant="tag"). 기본 "neutral". */
  hue?: BadgeHue;
  /** 앞자리 슬롯. 기본 "none". */
  leading?: "none" | "dot" | "flag" | "avatar";
  /** leading="flag" 국가명 파일명(소문자·하이픈, 예: "south-korea","japan","united-states"). assets/flags/{국가명}.svg 로드. */
  flag?: string;
  /** 국기 에셋 기본 경로. 기본 "../../assets/flags/"(DS 카드 기준). */
  flagBase?: string;
  /** leading="avatar" 아바타 데이터. */
  avatar?: { src?: string; name?: string; alt?: string };
  size?: "sm" | "md" | "lg";
  /** true면 라벨 텍스트 숨김, leading(flag/dot/avatar)만 표시. 언제 켤지는 사용처 결정(Badge는 반응형 내장 안 함). extraItems 카운트·펼침은 유지. 기본 false. */
  labelHidden?: boolean;
  /** 다중 값: 대표 값(children) 외 나머지 항목 배열. 있으면 "+N ⌄" 표시, 클릭/탭 시 팝오버 목록 펼침(바깥 클릭 닫힘, 카드 클릭 전파 차단). 없거나 빈 배열이면 단일 값 배지와 동일. */
  extraItems?: string[];
}

export function Badge(props: BadgeProps): JSX.Element;
