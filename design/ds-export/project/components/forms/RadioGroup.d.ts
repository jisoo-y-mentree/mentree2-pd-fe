import React from "react";

export type RadioOption = string | { value: string; label: React.ReactNode };

/**
 * RadioGroup — 단일 선택 옵션 목록.
 */
export interface RadioGroupProps extends Omit<React.HTMLAttributes<HTMLDivElement>, "onChange"> {
  options: RadioOption[];
  value?: string;
  onChange?: (value: string) => void;
  name?: string;
  disabled?: boolean;
}

export function RadioGroup(props: RadioGroupProps): JSX.Element;
