import React from "react";

/**
 * Dialog — dim·약한 블러 스크림 위 중앙 모달.
 *  DS-69: 긴 본문이면 머리·푸터 고정 + 본문만 스크롤(높이 ≤ 창 − 48). Esc·스크림·✕ → onClose(닫을지는 화면이 정한다).
 *  열리면 포커스를 가두고(첫 입력 칸 → 없으면 ✕), 닫히면 연 요소로 돌려준다.
 */
export interface DialogProps {
  open: boolean;
  /** Esc · 스크림 · ✕ · (fullscreen) 뒤로가기. 부르기만 한다 — open을 true로 두면 모달은 남는다. */
  onClose?: () => void;
  title?: React.ReactNode;
  description?: React.ReactNode;
  /** 푸터 액션(보통 Button). */
  footer?: React.ReactNode;
  /** DS-69 — "end"(기본, 오른쪽 정렬) · "stack"(세로: 첫 버튼 폭 전체, 그 아래 버튼은 가운데). */
  footerLayout?: "end" | "stack";
  /** DS-69 — "center"(기본) · "fullscreen"(≤768에서 화면 전체 · 반경/스크림 없음 · 푸터 바닥+safe-area · 키보드 위 · 뒤로가기=onClose). */
  mobile?: "center" | "fullscreen";
  /** 최대 폭(px). 기본 460. */
  width?: number;
  children?: React.ReactNode;
  style?: React.CSSProperties;
}

export function Dialog(props: DialogProps): JSX.Element | null;
