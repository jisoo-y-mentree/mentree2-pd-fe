import React from "react";

/**
 * Checkbox — 인라인 라벨(선택)이 있는 제어형 불리언 토글.
 *  DS-75: 속에 네이티브 <input type="checkbox"> — Tab · Space · 라벨이 이름 · 키보드 포커스 링.
 */
export interface CheckboxProps {
  checked?: boolean;
  onChange?: (next: boolean) => void;
  disabled?: boolean;
  /** 인라인 라벨(선택); 클릭 가능한 <label> 렌더. */
  label?: React.ReactNode;
  id?: string;
  /** DS-75 — 라벨이 없을 때의 이름. 속의 네이티브 입력에 붙는다. */
  "aria-label"?: string;
}

export function Checkbox(props: CheckboxProps): JSX.Element;
