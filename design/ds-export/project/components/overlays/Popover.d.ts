import React from "react";

/**
 * Popover — 앵커에 붙는 오버레이 껍데기(위치·면·닫기·포커스만). 안의 내용은 쓰는 쪽이 정한다.
 *  Badge의 "+N 펼침"(정적 펼침, "본다")과 다른 자리 — Popover는 "고른다"(role="menu" 가능, 동작이 일어남).
 *  렌더 위치: position:relative 트리거의 형제로 둔다(좌표 계산 없이 CSS로 붙는다).
 *  ⚠️ 모바일에서 공유처럼 OS 공유로 대체돼야 하는 트리거는, 열기로 결정된 뒤에만 이 Popover를 쓴다 —
 *  분기 자체는 화면/카드 책임(컴포넌트 설명 참조).
 */
export interface PopoverProps {
  open: boolean;
  onClose?: () => void;
  /** 앵커에서 붙는 방향. 기본 "bottom". */
  side?: "top" | "bottom" | "left" | "right";
  /** side축과 수직인 정렬. 기본 "start"(좌/상 정렬), "end"=우/하 정렬. */
  align?: "start" | "end";
  /** 최소 폭(px). 기본 168. */
  minWidth?: number;
  /** 메뉴로 쓸 때 "menu". 기본 없음. */
  role?: string;
  /** 닫힐 때 포커스를 되돌릴 트리거 엘리먼트의 ref. */
  triggerRef?: React.RefObject<HTMLElement>;
  children?: React.ReactNode;
}

export function Popover(props: PopoverProps): JSX.Element | null;

/** Popover를 메뉴로 쓸 때 항목 스타일. className="mt-popover-menuitem"과 함께 적용(hover는 그 클래스가 담당). */
export const popoverMenuItemStyle: React.CSSProperties;
