import React, { useState, useEffect } from "react";

/**
 * CountToggle — 메타 줄 인라인 전용 토글(aria-pressed). "도움돼요"·"스크랩"이 이 하나로 통일된다 —
 *  거동은 완전히 같고 아이콘(icon prop)만 다르다. count는 필수다(메타 줄 조회수 등과 나란히 놓이는 자리).
 *  [경계] BookmarkToggle(미디어 오버레이, 사진 위, 반전)과 다른 자리 — 경계는 "카운트 유무"가 아니라
 *  "어디에 놓이는가"다(한 번 합쳤다 되돌림, 09-11→09-12). 사진 위 단독 액션은 BookmarkToggle을 쓴다.
 *  [반전 원칙 예외] Toggle 계열의 "selected=반전"(FilterChip=green 채움)을
 *  CountToggle은 따르지 않는다 — 목록 카드 20장에 반전 40개가 뜨면 카드가 안 읽힌다. 대신 아이콘 fill + tone 텍스트로만 표시.
 *  [tone] green은 쓰지 않는다 — 화면에 이미 "멘토 답변 N개"·"도움돼요 누른 답변" 등 다른 의미로 쓰이는 색이라 겹치면 3가지 의미가 한 색이 된다.
 *   tone="rose"(도움돼요) selected=아이콘 fill+--badge-rose-700 · tone="dark"(스크랩) selected=아이콘 fill+--sage-900.
 *   도움돼요·스크랩이 나란히 놓이므로 색으로 갈라야 어느 쪽을 눌렀는지 한눈에 보인다. 숫자도 아이콘과 같은 색. 배경은 여전히 없음(반전 아님).
 *  HugeIcons 정적 CDN에 해당 solid가 없어, stroke 1.6 라운드 인라인 SVG로 outline↔fill을 토글한다.
 *  (서버 저장·비로그인 유도는 범위 밖 — 화면이 onChange를 가로챈다. 컴포넌트는 상태 표현만.)
 */
const PATHS = {
  favourite: "M12 20.25c-.24 0-.47-.07-.67-.2-1.02-.66-3.64-2.44-5.86-4.79C3.33 12.98 2 10.86 2 8.66 2 5.92 4.19 3.75 6.9 3.75c2.02 0 3.6 1.1 5.1 2.98 1.5-1.88 3.08-2.98 5.1-2.98 2.71 0 4.9 2.17 4.9 4.91 0 2.2-1.33 4.32-3.47 6.6-2.22 2.35-4.84 4.13-5.86 4.79-.2.13-.43.2-.67.2z",
  bookmark: "M5 4.6C5 3.72 5.72 3 6.6 3h10.8c.88 0 1.6.72 1.6 1.6v15.5c0 .82-.92 1.3-1.58.82L12 17.4l-5.42 3.52C5.92 21.4 5 20.92 5 20.1V4.6z",
};
const LABEL = { favourite: "도움돼요", bookmark: "스크랩" };
const TONE = { rose: "var(--badge-rose-700)", dark: "var(--sage-900)" };

export function CountToggle({
  icon = "favourite",
  tone = "dark",
  selected = false,
  onChange,
  count,
  disabled = false,
  ariaLabel,
  style,
  ...rest
}) {
  const [hover, setHover] = useState(false);
  const [pressed, setPressed] = useState(false);

  useEffect(() => {
    if (document.getElementById("mt-counttoggle-style")) return;
    const s = document.createElement("style");
    s.id = "mt-counttoggle-style";
    s.textContent = ".mt-counttoggle:focus-visible{outline:2px solid var(--ring);outline-offset:2px;}";
    document.head.appendChild(s);
  }, []);

  const color = disabled
    ? "var(--sage-400)"
    : selected
      ? (TONE[tone] || TONE.dark)
      : hover ? "var(--sage-700)" : "var(--muted-foreground)";

  return (
    <button
      type="button"
      className="mt-counttoggle"
      aria-pressed={selected}
      aria-label={ariaLabel || LABEL[icon] || "토글"}
      disabled={disabled}
      onClick={() => { if (!disabled && onChange) onChange(!selected); }}
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => { setHover(false); setPressed(false); }}
      onMouseDown={() => { if (!disabled) setPressed(true); }}
      onMouseUp={() => setPressed(false)}
      style={{
        display: "inline-flex",
        alignItems: "center",
        gap: 5,
        border: "none",
        background: "transparent",
        padding: "4px 2px",
        margin: 0,
        fontFamily: "var(--font-sans)",
        fontSize: "var(--text-caption)",
        fontWeight: 500,
        color,
        cursor: disabled ? "not-allowed" : "pointer",
        opacity: disabled ? 0.55 : 1,
        transform: pressed ? "translateY(0.5px)" : "none",
        transition: "color 150ms ease, transform 120ms ease",
        ...style,
      }}
      {...rest}
    >
      <svg width={16} height={16} viewBox="0 0 24 24" fill={selected ? "currentColor" : "none"} stroke="currentColor" strokeWidth={1.6} strokeLinejoin="round" strokeLinecap="round" aria-hidden="true">
        <path d={PATHS[icon] || PATHS.favourite} />
      </svg>
      {count != null && <span style={{ fontVariantNumeric: "tabular-nums", lineHeight: 1 }}>{count}</span>}
    </button>
  );
}
