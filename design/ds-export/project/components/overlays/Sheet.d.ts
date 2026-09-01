import React from "react";

/**
 * Sheet — dim 스크림 위 가장자리 고정 패널(드로어).
 */
export interface SheetProps {
  open: boolean;
  onClose?: () => void;
  side?: "left" | "right" | "top" | "bottom";
  title?: React.ReactNode;
  description?: React.ReactNode;
  footer?: React.ReactNode;
  /** 폭(left/right) 또는 높이(top/bottom), px. 기본 380. */
  size?: number;
  children?: React.ReactNode;
}

export function Sheet(props: SheetProps): JSX.Element | null;
