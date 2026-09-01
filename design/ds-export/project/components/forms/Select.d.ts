import React from "react";

export type SelectOption = string | { value: string; label: string };

/**
 * Select — Input에 맞춘 드롭다운.
 */
export interface SelectProps extends Omit<React.SelectHTMLAttributes<HTMLSelectElement>, "onChange"> {
  options: SelectOption[];
  placeholder?: string;
  invalid?: boolean;
  value?: string;
  onChange?: (e: React.ChangeEvent<HTMLSelectElement>) => void;
}

export function Select(props: SelectProps): JSX.Element;
