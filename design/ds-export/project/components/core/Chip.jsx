import React, { useState, useEffect } from "react";
import { Icon } from "./Icon.jsx";

/**
 * Chip — 눌리지만 켜지지 않는 칩. Badge(안 눌림)·FilterChip(눌리고 켜짐)과 다른 세 번째 계열.
 *  형태: --muted(sage-100) 채움 + 아웃라인 없음 — 이것이 Badge·FilterChip과 가르는 유일한 시각 신호.
 *  selected 없음. 켜짐이 필요하면 FilterChip을 쓴다.
 * [슬롯] href → <a>(hover 시 라벨 --primary) · onRemove → 형제 <button>(✕, HugeIcons cancel-01) ·
 *  둘 다 없으면 표시 전용 <span>. leading 슬롯 없음.
 * [크기] sm: h22(Badge sm과 동일)·radius --radius-sm·12px/500·padX8 — 카드 안 해시태그 /
 *  md: h32(FilterChip과 동일)·radius --radius-md·caption/500·padX12 — 필터 모달의 걸린 조건. pill 금지.
 * [prefix] 라벨 앞 문자(해시태그는 prefix="#"). 라벨 문자열에 #를 넣지 않는다 — 같은 데이터가 두 가지로 저장된다.
 * [상태] hover: 면 --sage-200 / active: 0.5px 눌림(Button·FilterChip과 동일 프레스) / focus-visible: --ring / disabled: 흐리게.
 * [터치] sm 시각 높이 22(Badge sm 정렬). onRemove 버튼은 투명 패딩(::after ±4)으로 타겟을 24 이상으로 넓힌다.
 */
const SIZES = {
  sm: { h: 22, radius: "var(--radius-sm)", pad: 8, padRight: 4, fs: 12, gap: 4, removeBtn: 18, iconSize: 12 },
  md: { h: 32, radius: "var(--radius-md)", pad: 12, padRight: 6, fs: "var(--text-caption)", gap: 6, removeBtn: 22, iconSize: 13 },
};

export function Chip({
  href,
  prefix,
  onRemove,
  onClick,
  removeAriaLabel = "삭제",
  disabled = false,
  size = "md",
  children,
  style,
  ...rest
}) {
  const [hover, setHover] = useState(false);
  const [pressed, setPressed] = useState(false);

  useEffect(() => {
    if (document.getElementById("mt-chip-style")) return;
    const s = document.createElement("style");
    s.id = "mt-chip-style";
    s.textContent =
      ".mt-chip:focus-visible{outline:2px solid var(--ring);outline-offset:2px;}" +
      ".mt-chip-remove{position:relative;}" +
      ".mt-chip-remove::after{content:'';position:absolute;inset:-4px;}" +
      ".mt-chip-remove:focus-visible{outline:2px solid var(--ring);outline-offset:2px;}";
    document.head.appendChild(s);
  }, []);

  const s = SIZES[size] || SIZES.md;
  const interactive = !disabled && (href || onRemove || onClick);
  const bg = hover && !disabled ? "var(--sage-200)" : "var(--muted)";
  const labelColor = href && hover && !disabled ? "var(--primary)" : "var(--sage-700)";

  const outer = {
    display: "inline-flex",
    alignItems: "center",
    justifyContent: "center",
    gap: s.gap,
    height: s.h,
    borderRadius: s.radius,
    background: bg,
    fontFamily: "var(--font-sans)",
    fontSize: s.fs,
    fontWeight: 500,
    lineHeight: 1,
    letterSpacing: "-0.01em",
    whiteSpace: "nowrap",
    transition: "background-color 150ms ease, color 150ms ease, transform 120ms ease",
    opacity: disabled ? 0.5 : 1,
    transform: pressed ? "translateY(0.5px)" : "none",
  };

  const hoverHandlers = interactive
    ? {
        onMouseEnter: () => setHover(true),
        onMouseLeave: () => { setHover(false); setPressed(false); },
      }
    : {};

  if (!onRemove) {
    // 슬롯 없음(표시 전용) 또는 href만 또는 onClick만 — 단일 엘리먼트.
    const Tag = href ? "a" : onClick ? "button" : "span";
    const tagProps = href
      ? disabled
        ? { "aria-disabled": true, tabIndex: -1, style: { pointerEvents: "none" } }
        : { href }
      : onClick
        ? { type: "button", disabled, onClick: disabled ? undefined : onClick }
        : {};
    return (
      <Tag
        className="mt-chip"
        {...hoverHandlers}
        onMouseDown={(href || onClick) && !disabled ? () => setPressed(true) : undefined}
        onMouseUp={href || onClick ? () => setPressed(false) : undefined}
        style={{
          ...outer,
          padding: `0 ${s.pad}px`,
          color: labelColor,
          textDecoration: "none",
          border: "none",
          font: "inherit",
          fontFamily: "inherit",
          cursor: disabled ? "not-allowed" : href || onClick ? "pointer" : "default",
          ...style,
        }}
        {...tagProps}
        {...rest}
      >
        {prefix}{children}
      </Tag>
    );
  }

  // onRemove — 라벨(span 또는 a)과 ✕ 버튼을 형제로 둔다(링크 안에 버튼 금지).
  return (
    <span
      className="mt-chip"
      {...hoverHandlers}
      style={{
        ...outer,
        padding: `0 ${s.padRight}px 0 ${s.pad}px`,
        ...style,
      }}
      {...rest}
    >
      {href ? (
        <a
          href={disabled ? undefined : href}
          onMouseDown={!disabled ? () => setPressed(true) : undefined}
          onMouseUp={() => setPressed(false)}
          {...(disabled ? { "aria-disabled": true, tabIndex: -1 } : {})}
          style={{
            color: labelColor,
            textDecoration: "none",
            cursor: disabled ? "not-allowed" : "pointer",
            pointerEvents: disabled ? "none" : "auto",
          }}
        >
          {prefix}{children}
        </a>
      ) : (
        <span style={{ color: labelColor }}>{prefix}{children}</span>
      )}
      <button
        type="button"
        className="mt-chip-remove"
        aria-label={removeAriaLabel}
        disabled={disabled}
        onClick={(e) => { e.stopPropagation(); if (!disabled) onRemove(); }}
        onMouseDown={!disabled ? () => setPressed(true) : undefined}
        onMouseUp={() => setPressed(false)}
        style={{
          width: s.removeBtn,
          height: s.removeBtn,
          display: "inline-flex",
          alignItems: "center",
          justifyContent: "center",
          padding: 0,
          border: "none",
          background: "transparent",
          borderRadius: "50%",
          color: labelColor,
          cursor: disabled ? "not-allowed" : "pointer",
          flex: "0 0 auto",
        }}
      >
        <Icon name="cancel-01" size={s.iconSize} />
      </button>
    </span>
  );
}
