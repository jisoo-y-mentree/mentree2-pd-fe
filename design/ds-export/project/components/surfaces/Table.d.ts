import React from "react";

export interface TableColumn<Row = any> {
  key: string;
  header: React.ReactNode;
  align?: "left" | "right" | "center";
  width?: number | string;
  /** 커스텀 셀 렌더러; row를 받는다. */
  render?: (row: Row) => React.ReactNode;
}

/**
 * Table — sage 행 호버가 있는 경계형 데이터 테이블.
 */
export interface TableProps<Row = any> extends React.HTMLAttributes<HTMLDivElement> {
  columns: TableColumn<Row>[];
  data: Row[];
}

export function Table<Row = any>(props: TableProps<Row>): JSX.Element;
