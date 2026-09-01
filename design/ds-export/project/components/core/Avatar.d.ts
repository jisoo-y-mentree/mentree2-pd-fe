import React from "react";

export interface AvatarProps extends React.HTMLAttributes<HTMLSpanElement> {
  /** 이미지 URL. 없거나 실패하면 이니셜 fallback. */
  src?: string;
  /** 이니셜 생성 및 title/aria 용 이름. */
  name?: string;
  /** 대체 텍스트(미지정 시 name). */
  alt?: string;
  /** xs(20) · sm(24) · md(32) · lg(40), 또는 px 숫자. */
  size?: "xs" | "sm" | "md" | "lg" | number;
}

/**
 * Avatar — 원형 아바타. AvatarImage + AvatarFallback(이니셜, sage-100 / sage-700).
 * 로딩 전 sage placeholder, 이미지 실패 시 fallback.
 */
export function Avatar(props: AvatarProps): JSX.Element;

export interface AvatarItem {
  src?: string;
  name?: string;
  alt?: string;
}

export interface AvatarGroupProps extends React.HTMLAttributes<HTMLSpanElement> {
  /** 아바타 목록. */
  items: AvatarItem[];
  /** 최대 노출 개수. 초과분은 "+K" 칩. 기본 4. */
  max?: number;
  /** 아바타 크기(그룹 공통). 기본 sm. */
  size?: "xs" | "sm" | "md" | "lg" | number;
}

/**
 * AvatarGroup — 겹쳐 쌓은 아바타. 흰색 링으로 분리, 초과분은 sage "+K" 칩.
 */
export function AvatarGroup(props: AvatarGroupProps): JSX.Element;
