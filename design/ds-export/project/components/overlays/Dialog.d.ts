import React from "react";

/**
 * Dialog — dim·약한 블러 스크림 위 중앙 모달.
 */
export interface DialogProps {
  open: boolean;
  onClose?: () => void;
  title?: React.ReactNode;
  description?: React.ReactNode;
  /** 푸터 액션(보통 Button), 우측 정렬. */
  footer?: React.ReactNode;
  /** 최대 폭(px). 기본 460. */
  width?: number;
  children?: React.ReactNode;
}

export function Dialog(props: DialogProps): JSX.Element | null;
