import React from "react";

/**
 * Chip — 눌리지만 켜지지 않는 칩(selected 없음). Badge(안 눌림)·FilterChip(눌리고 켜짐)과 구분되는 세 번째 계열.
 *  형태: --muted 채움 + 아웃라인 없음(Badge·FilterChip의 흰 면 + sage 아웃라인과 가르는 유일한 시각 신호).
 *  href → <a>(hover 시 라벨 --primary) · onRemove → 형제 <button>(✕) · 둘 다 없으면 표시 전용 <span>.
 *  size 2종: sm(h24, 12px/500 — 카드 안 해시태그) · md(h32, 14px/500 — Button·FilterChip과 같은 고정 14, 필터 모달의 걸린 조건). pill 아님.
 *  prefix로 라벨 앞 문자를 붙인다(해시태그 prefix="#") — 라벨 문자열에 #를 넣지 않는다.
 */
export interface ChipProps extends React.HTMLAttributes<HTMLElement> {
  /** 링크로 렌더(<a>). hover 시 라벨이 --primary. onRemove와 함께 쓰면 형제로 배치된다. */
  href?: string;
  /** ✕ 버튼의 접근명. 기본 "삭제" — 목록에 여러 Chip이 있으면 "<태그명> 삭제"처럼 구체적으로 넘긴다(TagInput 등). */
  removeAriaLabel?: string;
  /** href·onRemove가 없을 때만 <button type="button">으로 렌더. 눌려도 켜지지 않음(라벨 색 안 바뀜) — 상태 없이 "더한다·고른다"에 쓴다. 켜짐이 필요하면 FilterChip. */
  onClick?: () => void;
  /** 라벨 앞에 붙는 문자(해시태그는 "#"). 기본값 없음 — 라벨 문자열에 #를 넣지 않는다. */
  prefix?: string;
  /** 제거 콜백. 있으면 trailing에 ✕(HugeIcons cancel-01) 버튼이 별도 엘리먼트로 붙는다. */
  onRemove?: () => void;
  disabled?: boolean;
  /** 기본 "md". sm=h24/radius-sm/12px, md=h32/radius-md/14px(Button·FilterChip과 같은 고정값). */
  size?: "sm" | "md";
  children?: React.ReactNode;
}

export function Chip(props: ChipProps): JSX.Element;
