import * as React from "react";

/**
 * ActionBanner — 문구 + 버튼 배너(DS-34). 모양 고정 — 자유 프로모 슬롯 Banner와 다르다.
 * 면 --green-50 · 1px --primary · --radius-lg · 24/32. title --text-h3 600 · description --text-body muted.
 * inline: 좌 문구 · 우 Button primary md(간격 24). stacked: 가운데 · 아래 Button primary lg(간격 16).
 * ≤768: 항상 stacked · 여백 20 · 버튼 폭 100%.
 */
export interface ActionBannerProps extends Omit<React.HTMLAttributes<HTMLDivElement>, "title"> {
  /** 문구 — 한 줄 또는 두 줄. */
  title: React.ReactNode;
  /** 선택. 문구 아래 설명. */
  description?: React.ReactNode;
  /** 버튼 라벨. */
  actionLabel?: string;
  /** 버튼을 누르면 이동할 주소. */
  href?: string;
  /** 버튼 콜백. e.preventDefault()하면 href 이동을 막는다. */
  onAction?: (e: React.MouseEvent<HTMLButtonElement>) => void;
  /** "inline"(기본) | "stacked". */
  layout?: "inline" | "stacked";
}

export declare function ActionBanner(props: ActionBannerProps): React.ReactElement;
