import React from "react";

/**
 * EmptyState — 목록이 0건일 때 그 자리에 서는 것. 카드가 아니다(배경·테두리 없음, 카드 셸 미상속).
 *
 * "아직 없다"와 "찾았는데 없다"를 하나로 담는다 — prop으로 가르지 않고, 어느 쪽인지는 화면이 문구로 정한다.
 * 기본 문구는 하드코딩하지 않는다(한/일 2개국어, 문구는 화면이 넘긴다).
 * 구성: 아이콘(선택) → 제목(필수) → 설명(선택) → 액션(0 또는 1). 가운데 정렬, 채도 없음.
 */
export interface EmptyStateProps extends React.HTMLAttributes<HTMLDivElement> {
  /** HugeIcons 이름. 선택. --muted-foreground로만 그린다(채도 없음). */
  icon?: string;
  /** 제목(한 줄). 필수. 문구는 화면이 넘긴다. */
  title: React.ReactNode;
  /** 설명(한두 줄). 선택 — sm에서는 생략해도 된다. */
  description?: React.ReactNode;
  /** 액션 — Button 하나. 2개 이상 두지 않는다(배열이 와도 첫 하나만 선다). */
  action?: React.ReactNode;
  /** md=목록 자리 전체(본문) · sm=좁은 자리(우측 위젯·알림 드롭다운). 기본 "md". */
  size?: "md" | "sm";
}

export function EmptyState(props: EmptyStateProps): JSX.Element;
