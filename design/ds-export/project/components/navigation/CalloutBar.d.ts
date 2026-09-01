import React from "react";

/**
 * CalloutBar — 배치 컴포넌트. 블리드 풀폭 띠(화면 폭 꽉 참, 모서리 각짐 radius 0).
 *
 * 헤더 위/아래에 붙는 공지·안내·상태·경고 띠. 인라인 둥근 Banner와 구분(이건 각진 풀폭).
 * 얇은 한 줄 기준(44 전후), 텍스트 2줄까지 허용. variant는 옅은 배경 + 진한 텍스트(Badge 50/700 상속).
 */
export interface CalloutBarProps extends React.HTMLAttributes<HTMLDivElement> {
  /** 역할. info(sage 중립·기본) · success(green) · warning(amber) · error(destructive). */
  variant?: "info" | "success" | "warning" | "error";
  /** 텍스트 정렬. center(기본) / left(아이콘과 함께 왼쪽 정렬). */
  align?: "center" | "left";
  /** 아이콘 이름(HugeIcons). 미지정 시 variant 기본 아이콘. */
  icon?: string;
  /** 아이콘 표시 여부. 기본 true. */
  showIcon?: boolean;
  /** 메시지 텍스트. */
  children?: React.ReactNode;
  /** 인라인 링크 라벨(옵션, 예: "자세히 보기"). arrow-right-01 자동 부착. */
  linkLabel?: React.ReactNode;
  linkHref?: string;
  onLinkClick?: React.MouseEventHandler;
  /** 지정 시 닫기(X) 버튼 표시(오른쪽 끝). */
  onClose?: React.MouseEventHandler;
}

export function CalloutBar(props: CalloutBarProps): JSX.Element;
