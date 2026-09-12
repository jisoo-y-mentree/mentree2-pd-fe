import React, { useState, useEffect } from "react";

/**
 * BookmarkToggle — 경계는 CountToggle 참조(경계는 "카운트의 유무"가 아니라 "어디에 놓이는가"다):
 *  BookmarkToggle = 미디어 오버레이의 아이콘 토글. 사진 위. 단독. 반전한다.
 *  CountToggle    = 메타 줄의 인라인 토글. 아이콘 + 숫자. 반전하지 않는다.
 *  한 번 합쳤다가 되돌렸다(2026-09-11 CountToggle로 흡수 → 2026-09-12 되돌림). 이 줄이 없으면 또 합치게 된다.
 *
 *  형태는 IconButton default(md)를 그대로 쓴다 — 같은 박스 38·아이콘 18·radius-md.
 *  미선택=outline(card+sage 아웃라인), 선택=반전(배경 --sage-900 채움 + 아이콘 --sage-50).
 *  HugeIcons 정적 CDN에 solid 북마크가 없어 stroke 1.6 라운드 인라인 SVG로 outline↔fill을 토글한다.
 *  제어형: selected + onChange(next). 서버 저장 로직은 범위 밖. count는 받지 않는다(그 자리는 CountToggle).
 */
const BOOKMARK_PATH = "M5 4.6C5 3.72 5.72 3 6.6 3h10.8c.88 0 1.6.72 1.6 1.6v15.5c0 .82-.92 1.3-1.58.82L12 17.4l-5.42 3.52C5.92 21.4 5 20.92 5 20.1V4.6z";

export function BookmarkToggle({
  selected = false,
  onChange,
  disabled = false,
  ariaLabel = "스크랩",
  style,
  ...rest
}) {
  const [hover, setHover] = useState(false);
  const [pressed, setPressed] = useState(false);

  useEffect(() => {
    if (document.getElementById("mt-bookmarktoggle-style")) return;
    const s = document.createElement("style");
    s.id = "mt-bookmarktoggle-style";
    s.textContent = ".mt-bookmarktoggle:focus-visible{outline:2px solid var(--ring);outline-offset:2px;}";
    document.head.appendChild(s);
  }, []);

  const bg = selected
    ? "var(--sage-900)"
    : hover ? "var(--secondary)" : "var(--card)";
  const border = selected ? "1px solid transparent" : "1px solid var(--border)";
  const color = selected ? "var(--sage-50)" : "var(--foreground)";
  const filter = !disabled && selected && hover ? "brightness(0.92)" : "none";

  return (
    <button
      type="button"
      className="mt-bookmarktoggle"
      aria-pressed={selected}
      aria-label={ariaLabel}
      disabled={disabled}
      onClick={() => { if (!disabled && onChange) onChange(!selected); }}
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => { setHover(false); setPressed(false); }}
      onMouseDown={() => { if (!disabled) setPressed(true); }}
      onMouseUp={() => setPressed(false)}
      style={{
        display: "inline-flex",
        alignItems: "center",
        justifyContent: "center",
        width: 38,
        height: 38,
        borderRadius: "var(--radius-md)",
        background: bg,
        border,
        color,
        filter,
        cursor: disabled ? "not-allowed" : "pointer",
        opacity: disabled ? 0.5 : 1,
        transform: pressed ? "translateY(0.5px)" : "none",
        transition: "background-color 150ms ease, color 150ms ease, filter 150ms ease, transform 120ms ease",
        ...style,
      }}
      {...rest}
    >
      <svg width={18} height={18} viewBox="0 0 24 24" fill={selected ? "currentColor" : "none"} stroke="currentColor" strokeWidth={1.6} strokeLinejoin="round" strokeLinecap="round" aria-hidden="true">
        <path d={BOOKMARK_PATH} />
      </svg>
    </button>
  );
}
