import React from "react";

/**
 * Button — 기본 액션 컨트롤(shadcn/vega 형태, mentree 토큰).
 */
export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "secondary" | "outline" | "ghost" | "destructive";
  size?: "sm" | "md" | "lg";
  /** 라벨 앞에 렌더할 HugeIcons 이름. */
  iconLeft?: string;
  /** 라벨 뒤에 렌더할 HugeIcons 이름. */
  iconRight?: string;
  fullWidth?: boolean;
  disabled?: boolean;
}

export function Button(props: ButtonProps): JSX.Element;
