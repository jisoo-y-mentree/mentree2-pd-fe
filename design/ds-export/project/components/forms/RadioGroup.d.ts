import React from "react";

export type RadioOption = string | { value: string; label: React.ReactNode };

/**
 * RadioGroup — 단일 선택 옵션 목록.
 *  DS-75: 항목마다 네이티브 <input type="radio">(같은 name, 안 주면 자동) — Tab은 그룹에 한 번, 화살표로 옮긴다.
 */
export interface RadioGroupProps extends Omit<React.HTMLAttributes<HTMLDivElement>, "onChange"> {
  options: RadioOption[];
  value?: string;
  onChange?: (value: string) => void;
  name?: string;
  disabled?: boolean;
}

export function RadioGroup(props: RadioGroupProps): JSX.Element;
