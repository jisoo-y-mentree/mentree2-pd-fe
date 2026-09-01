import React from "react";

/**
 * Switch — on/off 이진 토글.
 */
export interface SwitchProps {
  checked?: boolean;
  onChange?: (next: boolean) => void;
  disabled?: boolean;
  /** 뒤따르는 라벨(선택). */
  label?: React.ReactNode;
}

export function Switch(props: SwitchProps): JSX.Element;
