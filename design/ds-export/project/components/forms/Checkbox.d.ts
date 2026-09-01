import React from "react";

/**
 * Checkbox — 인라인 라벨(선택)이 있는 제어형 불리언 토글.
 */
export interface CheckboxProps {
  checked?: boolean;
  onChange?: (next: boolean) => void;
  disabled?: boolean;
  /** 인라인 라벨(선택); 클릭 가능한 <label> 렌더. */
  label?: React.ReactNode;
  id?: string;
}

export function Checkbox(props: CheckboxProps): JSX.Element;
