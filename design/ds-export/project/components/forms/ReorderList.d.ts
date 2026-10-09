import React from "react";

export interface ReorderItem {
  id: string | number;
  [key: string]: unknown;
}

/**
 * ReorderList — 순서를 바꾸는 목록(DS-73). 1건이면 핸들 없음, 2건 이상이면 항목마다 ≡ 핸들.
 *  마우스 = 눌러 끌기 · 터치 = 약 300ms 길게 눌러 끌기 · 키보드 = Space 집기 → ↑↓ → Space 놓기 / Esc 취소.
 */
export interface ReorderListProps<T extends ReorderItem = ReorderItem> {
  /** 항목 배열 — 각 id 필수. */
  items: T[];
  /** 항목 하나를 그린다. 내용은 화면이 넣는다. 핸들은 그 왼쪽 위(첫 칸의 라벨 줄)에 선다. */
  renderItem: (item: T, index: number) => React.ReactNode;
  /** 새 순서의 배열. */
  onReorder?: (items: T[]) => void;
  /** 스크린리더가 읽을 항목 이름. 기본 「N번째 항목」. */
  itemLabel?: (item: T, index: number) => string;
  /** 항목 간격(px). 기본 12. */
  gap?: number;
  style?: React.CSSProperties;
}

export function ReorderList<T extends ReorderItem = ReorderItem>(props: ReorderListProps<T>): JSX.Element;
