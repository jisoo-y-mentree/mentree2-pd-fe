import React from "react";

/**
 * Flag (DS-78) — 원형 국기 하나만 크게. 태그 · 아웃라인 · 글자 없음. 1px --border 링(흰 면 국기 대비).
 * role="img" + aria-label「국가 · 도시」. tooltip이면 Tooltip(DS-77, describe={false})으로 같은 글을 띄우고 tabIndex=0.
 * 이름과 같이 쓰면 이름 오른쪽 · 글자의 세로 가운데. xl은 --text-display 이름 옆.
 */
export interface FlagProps extends React.HTMLAttributes<HTMLSpanElement> {
  /** 국기 파일명(Badge의 flag와 같다) — {flagBase}{country}.svg */
  country?: string;
  /** 국가명(예: "일본"). */
  label?: string;
  /** 도시명(예: "도쿄"). 있으면 이름이 "일본 · 도쿄". */
  city?: string;
  /** sm 16 · md 20 · lg 24 · xl 28. 기본 "md". */
  size?: "sm" | "md" | "lg" | "xl";
  /** 국기 에셋 경로. 기본 Badge와 같다("../../assets/flags/"). */
  flagBase?: string;
  /** true면 Tooltip으로 이름을 띄운다. 기본 true. */
  tooltip?: boolean;
}

export function Flag(props: FlagProps): JSX.Element;
