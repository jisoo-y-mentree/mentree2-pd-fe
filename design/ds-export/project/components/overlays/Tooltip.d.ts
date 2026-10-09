import React from "react";

/**
 * Tooltip (DS-77) — 가리키는 요소 하나에 붙는 짧은 설명. 글자만 — 누를 것을 넣지 않는다(그러면 Popover).
 * 마우스 300ms 뒤 · 키보드 포커스 즉시 · 터치 탭 토글(바깥 탭에 닫힘) · Esc 닫기.
 * top layer(popover="manual") + 트리거 기준 fixed — 모달 · 스크롤 상자 안에서도 잘리지 않는다.
 * 면 --sage-900 · 글자 --sage-50 · caption · radius-sm · 최대 폭 240 · 꼬리.
 */
export interface TooltipProps extends Omit<React.HTMLAttributes<HTMLSpanElement>, "content"> {
  /** 띄울 글자. 글자만. */
  content: React.ReactNode;
  /** 가리키는 요소 하나(포커스를 받을 수 있어야 키보드로 열린다). */
  children: React.ReactElement;
  /** 기본 "top". 자리가 모자라면 반대로 뒤집는다. */
  side?: "top" | "bottom";
  /** true면 자식에 aria-describedby로 잇는다. 자식의 이름이 content와 같으면 false. 기본 true. */
  describe?: boolean;
  /** 처음부터 열어 둔다 — 카드 · 문서의 정지 상태 전용. 화면에서는 쓰지 않는다. 기본 false. */
  defaultOpen?: boolean;
}

export function Tooltip(props: TooltipProps): JSX.Element;
