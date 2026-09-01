import React from "react";

/**
 * IconButton — HugeIcons 글리프 하나를 담는 정사각 버튼.
 */
export interface IconButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  /** HugeIcons 이름. */
  icon: string;
  variant?: "primary" | "secondary" | "outline" | "ghost";
  size?: "sm" | "md" | "lg";
  /** 접근성 라벨; 없으면 아이콘 이름 사용. */
  ariaLabel?: string;
}

export function IconButton(props: IconButtonProps): JSX.Element;
