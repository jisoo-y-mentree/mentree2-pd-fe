import React from "react";

/**
 * Pagination — 목록의 쪽 이동(번호). 전 화면이 같은 규칙을 쓴다.
 *
 * 접는 규칙: 「1 … 현재±2 … 끝」(모바일 ±1). 「…」이 1페이지만 가리면 접지 않는다.
 * « »(처음·끝 점프)는 둘 다 마지막 번호 뒤에 나란히 선다. 이전·다음(‹ ›)은 없다.
 * 제어형 — 컴포넌트가 스스로 페이지를 바꾸지 않는다(URL에 page를 담는 화면이 있다).
 */
export interface PaginationProps extends Omit<React.HTMLAttributes<HTMLElement>, "onChange"> {
  /** 현재 페이지(1-base). --primary 채움 + aria-current="page", 눌리지 않는다. */
  page: number;
  /** 총 페이지 수. */
  totalPages: number;
  /** 페이지 이동 요청. 부모가 상태를 바꾼다. */
  onPageChange?: (next: number) => void;
}

export function Pagination(props: PaginationProps): JSX.Element;
