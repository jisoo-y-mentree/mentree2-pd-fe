import React from "react";

/**
 * IconButton — HugeIcons 글리프 하나를 담는 정사각 버튼. 높이는 Button과 맞춘다: sm32·md40·lg48.
 * DS-35 · DS-94: pressed를 주면 켜짐·꺼짐 토글(aria-pressed). false=outline · true=초록 켜짐 — 면 --green-50 · 1px --green-700 · 아이콘 --green-700
 *  (BookmarkToggle 켜짐과 같다). bookmark-01·bookmark-02·favourite는 켜지면 속을 채운다. 그 밖의 아이콘은 면만 바뀐다.
 *  혼자 서는 토글은 켜지면 초록이다(BookmarkToggle·IconButton pressed). 메타 줄 토글은 CountToggle — 면을 채우지 않는다.
 * DS-85: shape="rounded"(기본 · 반경 12) · "circle"(폭 = 높이 · 반경 50%).
 */
export interface IconButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  /** HugeIcons 이름. */
  icon: string;
  /** pressed를 주면 무시된다. */
  variant?: "primary" | "secondary" | "outline" | "ghost";
  /** sm=32 · md=40 · lg=48(Button과 동일 치수). 아이콘 16·18·20. */
  size?: "sm" | "md" | "lg";
  /** 토글 상태. 주면 토글 버튼이 된다(aria-pressed, 켜지면 초록). 안 주면 일반 버튼. */
  pressed?: boolean;
  /** DS-85. "rounded"(기본 · 반경 12) · "circle"(반경 50%). 맨 위로: variant="primary" size="lg" shape="circle" icon="arrow-up-01"(위치·나타남은 화면이 조립). */
  shape?: "rounded" | "circle";
  /** 접근성 라벨 — 필수로 전달한다. 없으면 아이콘 이름 사용. */
  ariaLabel?: string;
}

export const IconButton: React.ForwardRefExoticComponent<IconButtonProps & React.RefAttributes<HTMLButtonElement>>;
