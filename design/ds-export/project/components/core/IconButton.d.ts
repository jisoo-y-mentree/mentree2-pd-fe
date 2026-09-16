import React from "react";

/**
 * IconButton — HugeIcons 글리프 하나를 담는 정사각 버튼. 높이는 Button과 맞춘다: sm32·md40·lg48.
 */
export interface IconButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  /** HugeIcons 이름. */
  icon: string;
  variant?: "primary" | "secondary" | "outline" | "ghost";
  /** sm=32 · md=40 · lg=48(Button과 동일 치수). */
  size?: "sm" | "md" | "lg";
  /** 접근성 라벨; 없으면 아이콘 이름 사용. */
  ariaLabel?: string;
}

export const IconButton: React.ForwardRefExoticComponent<IconButtonProps & React.RefAttributes<HTMLButtonElement>>;
