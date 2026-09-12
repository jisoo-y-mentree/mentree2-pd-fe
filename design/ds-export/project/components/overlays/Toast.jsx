import React, { useEffect, useRef, useState } from "react";

/**
 * 구현은 sonner(2.0.8 · MIT · 런타임 의존 react·react-dom)를 쓴다.
 * 이 파일은 그 위에 얹을 우리 쪽 규칙이다 — 토큰·체류 시간·액션 수·정지 조건.
 * .jsx는 시각과 거동의 참조이지 이식원이 아니다.
 *
 * Toast — 화면 위에 잠깐 떴다 사라지는 알림. variant 없음 — 셋의 차이는 액션 수뿐이다
 *  (0개=공유 대체 안내 · 1개=스크랩+실행취소 · 2개=알람 수신 여부 질문).
 * 체류 시간은 액션 수가 정한다: 0~1개=3000ms · 2개=6000ms(읽는 양이 배라 길게). 색·치수가 아니라
 *  거동값이라 토큰화하지 않고 이 파일이 상수로 갖는다.
 * hover·focus 시 타이머 정지, 벗어나면 남은 시간부터 재개(리셋 아님) — 실행취소를 누를 시간을 준다.
 * 큐 관리(여러 개 쌓기·최대 3개·중복 리셋)는 실장(sonner)의 일 — 여기서 만들지 않는다. 이 컴포넌트는
 *  단일 토스트 1개의 모양·타이머·정지 조건만 낸다. open+onDismiss 제어형, 문구·actions는 화면이 준다.
 */
const DURATION_SHORT = 3000; // 액션 0~1개
const DURATION_LONG = 6000; // 액션 2개

if (typeof document !== "undefined" && !document.getElementById("mt-toast-style")) {
  const s = document.createElement("style");
  s.id = "mt-toast-style";
  s.textContent =
    ".mt-toast{position:fixed;left:50%;bottom:calc(16px + env(safe-area-inset-bottom));transform:translateX(-50%) translateY(8px);}" +
    "@media (min-width:769px){.mt-toast{left:auto;right:24px;bottom:24px;transform:translateY(8px);}}" +
    "@media (max-width:768px){.mt-toast{bottom:calc(56px + env(safe-area-inset-bottom) + 16px);}}" + // BottomTabBar(56) 위로
    ".mt-toast.mt-toast-entered{transform:translateY(0) !important;}" +
    "@media (min-width:769px){.mt-toast.mt-toast-entered{transform:translateY(0) !important;}}" +
    "@media (max-width:768px){.mt-toast.mt-toast-entered{transform:translateX(-50%) translateY(0) !important;}}";
  document.head.appendChild(s);
}

export function Toast({ open, message, actions = [], onDismiss, style, ...rest }) {
  const [mounted, setMounted] = useState(open);
  const [entered, setEntered] = useState(false);
  const [paused, setPaused] = useState(false);
  const remaining = useRef(0);
  const armedAt = useRef(0);
  const timeoutId = useRef(null);
  const duration = actions.length >= 2 ? DURATION_LONG : DURATION_SHORT;

  const clearArmed = () => { if (timeoutId.current) { clearTimeout(timeoutId.current); timeoutId.current = null; } };
  const arm = () => {
    clearArmed();
    armedAt.current = Date.now();
    timeoutId.current = setTimeout(() => { onDismiss && onDismiss(); }, remaining.current);
  };

  useEffect(() => {
    if (open) {
      setMounted(true);
      setEntered(false);
      const raf = requestAnimationFrame(() => setEntered(true));
      remaining.current = duration;
      arm();
      return () => { cancelAnimationFrame(raf); clearArmed(); };
    }
    if (mounted) {
      setEntered(false);
      clearArmed();
      const t = setTimeout(() => setMounted(false), 180);
      return () => clearTimeout(t);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [open, message]);

  const pause = () => {
    if (paused || !open) return;
    setPaused(true);
    clearArmed();
    remaining.current = Math.max(0, remaining.current - (Date.now() - armedAt.current));
  };
  const resume = () => {
    if (!paused || !open) return;
    setPaused(false);
    arm();
  };

  if (!mounted) return null;

  const phase = !entered ? (open ? "entering" : "leaving") : paused ? "hovered" : "visible";

  return (
    <div
      role="status"
      aria-live="polite"
      data-phase={phase}
      className={`mt-toast${entered ? " mt-toast-entered" : ""}`}
      onMouseEnter={pause}
      onMouseLeave={resume}
      onFocus={pause}
      onBlur={resume}
      style={{
        zIndex: 80,
        display: "flex",
        alignItems: "center",
        gap: 16,
        maxWidth: 420,
        padding: "12px 14px",
        background: "var(--card)",
        border: "1px solid var(--border)",
        borderRadius: "var(--radius-md)",
        boxShadow: "var(--shadow-md)",
        opacity: entered ? 1 : 0,
        transition: "opacity 180ms ease, transform 180ms ease",
        ...style,
      }}
      {...rest}
    >
      <span style={{ flex: "1 1 auto", fontSize: "var(--text-body)", color: "var(--foreground)", lineHeight: 1.5 }}>{message}</span>
      {actions.length > 0 && (
        <div style={{ display: "flex", alignItems: "center", gap: 12, flex: "0 0 auto" }}>
          {actions.map((a, i) => (
            <button
              key={i}
              type="button"
              onClick={a.onClick}
              style={{
                height: 32,
                padding: "0 4px",
                background: "transparent",
                border: "none",
                fontFamily: "var(--font-sans)",
                fontSize: "var(--text-caption)",
                fontWeight: 500,
                letterSpacing: "-0.01em",
                color: a.emphasis === "primary" ? "var(--primary)" : "var(--foreground)",
                cursor: "pointer",
                whiteSpace: "nowrap",
              }}
            >
              {a.label}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
