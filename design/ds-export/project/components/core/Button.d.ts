import React from "react";

/**
 * Button — 기본 액션 컨트롤(shadcn/vega 형태, mentree 토큰).
 * 높이만 sm32·md40·lg48로 커지고, 글자는 크기 단계와 무관하게 14px·600으로 고정된다.
 * 14px는 어느 타입 토큰과도 맞지 않는 버튼 전용 값이다.
 * ghost만 좌우 패딩이 0이다 — 면도 테두리도 없고 hover에도 면이 안 뜨므로 여백이 일을 하지 않는다.
 * 높이는 그대로라 터치 타겟(md 40)은 유지된다.
 */
export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  /** ghost는 좌우 패딩 0(민무늬라 여백이 필요 없다). 나머지는 size별 패딩 14/20/28. */
  variant?: "primary" | "secondary" | "outline" | "ghost" | "destructive";
  /** sm=32 · md=40 · lg=48. 글자는 3단계 모두 14px·600 고정, 높이만 바뀐다. */
  size?: "sm" | "md" | "lg";
  /** 라벨 앞에 렌더할 HugeIcons 이름. */
  iconLeft?: string;
  /** 라벨 뒤에 렌더할 HugeIcons 이름. */
  iconRight?: string;
  fullWidth?: boolean;
  disabled?: boolean;
}

export function Button(props: ButtonProps): JSX.Element;
