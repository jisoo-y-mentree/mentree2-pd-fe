import React from "react";

export type ToggleOption = string | { value: string; label: React.ReactNode; icon?: string };

/**
 * ToggleGroup — 하나(또는 여럿) 선택용 세그먼티드 컨트롤.
 */
export interface ToggleGroupProps extends Omit<React.HTMLAttributes<HTMLDivElement>, "onChange"> {
  options: ToggleOption[];
  /** 단일 선택은 string, 다중은 string[]. */
  value?: string | string[];
  onChange?: (value: string | string[]) => void;
  multiple?: boolean;
  size?: "sm" | "md";
}

export function ToggleGroup(props: ToggleGroupProps): JSX.Element;
