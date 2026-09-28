import React from "react";

/**
 * IconButton — HugeIcons 글리프 하나를 담는 정사각 버튼. 높이는 Button과 맞춘다: sm32·md40·lg48.
 * DS-35: pressed를 주면 켜짐·꺼짐 토글(aria-pressed). false=outline · true=반전 — --sage-900 면 + 아이콘 --sage-50 + 테두리 투명
 *  (BookmarkToggle 선택 값과 같다). bookmark-01·bookmark-02·favourite는 켜지면 속을 채운다. 그 밖의 아이콘은 면만 반전.
 *  혼자 서는 토글은 켜지면 반전한다(BookmarkToggle·IconButton pressed). 메타 줄 토글은 CountToggle — 반전하지 않는다.
 */
export interface IconButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  /** HugeIcons 이름. */
  icon: string;
  /** pressed를 주면 무시된다. */
  variant?: "primary" | "secondary" | "outline" | "ghost";
  /** sm=32 · md=40 · lg=48(Button과 동일 치수). 아이콘 16·18·20. */
  size?: "sm" | "md" | "lg";
  /** 토글 상태. 주면 토글 버튼이 된다(aria-pressed, 켜지면 반전). 안 주면 일반 버튼. */
  pressed?: boolean;
  /** 접근성 라벨 — 필수로 전달한다. 없으면 아이콘 이름 사용. */
  ariaLabel?: string;
}

export const IconButton: React.ForwardRefExoticComponent<IconButtonProps & React.RefAttributes<HTMLButtonElement>>;
