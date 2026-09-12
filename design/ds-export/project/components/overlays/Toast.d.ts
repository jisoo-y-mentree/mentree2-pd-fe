import React from "react";

/**
 * 구현은 sonner(2.0.8 · MIT · 런타임 의존 react·react-dom)를 쓴다.
 * 이 파일은 그 위에 얹을 우리 쪽 규칙이다 — 토큰·체류 시간·액션 수·정지 조건.
 * .jsx는 시각과 거동의 참조이지 이식원이 아니다.
 *
 * Toast — 잠깐 떴다 사라지는 알림. variant 없음 — 셋의 차이는 액션 수뿐(0=안내·1=실행취소류·2=양자택일 질문).
 * 체류 시간(토큰 아님, 거동값): 액션 0~1개=3000ms · 2개=6000ms. hover·focus 시 타이머 정지, 벗어나면
 * 남은 시간부터 재개. 큐 관리(스택·최대 3개·중복 리셋)는 실장(sonner) 책임 — 이 컴포넌트는 단일 토스트만.
 *
 * ⚠️ 액션 2개(알람 수신 여부 질문)에서 타임아웃 응답 없이 사라지면 그 자체로 "선택"이 된다 — 화면이
 * onDismiss에서 기본값을 "안 받음"으로 확정해야 한다(놓쳐도 손해 없는 쪽). 컴포넌트는 기본값을 정하지
 * 않는다 — 화면 책임. 여기 문서는 "타임아웃이 곧 선택이 되는 쓰임이 있다"는 사실만 남긴다.
 */
export interface ToastAction {
  label: string;
  onClick?: () => void;
  /** "primary"=--primary 텍스트(실행취소류). 기본 없음(--foreground). destructive 없음. */
  emphasis?: "primary";
}

export interface ToastProps {
  open: boolean;
  message: React.ReactNode;
  /** 0개=안내만 · 1개=실행취소류(체류 3s) · 2개=양자택일 질문(체류 6s). */
  actions?: ToastAction[];
  /** 체류 시간이 다 되거나(자동) 액션 클릭 후 화면이 닫을 때 호출. */
  onDismiss?: () => void;
}

export function Toast(props: ToastProps): JSX.Element | null;
