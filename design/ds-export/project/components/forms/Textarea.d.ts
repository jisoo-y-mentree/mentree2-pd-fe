import React from "react";

/**
 * Textarea — 여러 줄 입력(DS-70). 겉모양은 Input과 같다.
 *  rows에서 시작해 maxRows까지 글을 따라 커지고, 넘으면 상자 안에서 스크롤한다.
 */
export interface TextareaProps extends Omit<React.TextareaHTMLAttributes<HTMLTextAreaElement>, "rows"> {
  /** 에러 상태(빨간 경계). */
  invalid?: boolean;
  /** 처음 줄 수. 기본 3. */
  rows?: number;
  /** 이만큼까지 상자가 커지고, 넘으면 스크롤. 기본 8. */
  maxRows?: number;
  /** 글자 수 한도. 주면 상자 밖 오른쪽 아래에 「n/limit」. 넘치면 카운터 --destructive + invalid + aria-invalid. 잘라내지 않는다. value.length로 센다(이모지 2자). */
  limit?: number;
}

export function Textarea(props: TextareaProps): JSX.Element;
