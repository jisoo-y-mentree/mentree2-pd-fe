import React from "react";

/**
 * Switch — on/off 이진 토글.
 *  DS-75: 속에 네이티브 <input type="checkbox" role="switch"> — Tab · Space · 라벨이 이름 · 키보드 포커스 링.
 */
export interface SwitchProps {
  checked?: boolean;
  onChange?: (next: boolean) => void;
  disabled?: boolean;
  /** 뒤따르는 라벨(선택). */
  label?: React.ReactNode;
  id?: string;
  /** DS-75 — 라벨이 없을 때의 이름. 속의 네이티브 입력에 붙는다. */
  "aria-label"?: string;
}

export function Switch(props: SwitchProps): JSX.Element;
