import React from "react";
import { Icon } from "../core/Icon.jsx";

/**
 * BottomTabBar — Mobile(~768) 전용 하단 고정 탭 네비게이션. 4탭: 멘토 찾기 · Q&A 멘토링 ·
 * 멘트리 인사이트 · MY 멘트리. 아이콘(위)+라벨(아래) 세로 배치, HugeIcons 모노톤 —
 * 헤더 오버레이(컬러 SVG)와 별개의 차분한 UI. 활성=primary green / 비활성=muted.
 * 높이 56 + iOS safe-area 하단 여백. 배경 frosted glass(white 반투명 + backdrop blur) + 상단 sage hairline. 풀블리드 fixed.
 * Desktop(769+)에선 렌더돼도 CSS로 숨김.
 *
 * MY 멘트리: guest는 로그인 유도 자리만(onAuth 콜백) — 로그인 후 동작은 OPEN #9.
 *
 * DS-55 — 위에 얹는 칸(accessory)과 스크롤 숨김(hideOnScroll).
 *  고정 컨테이너 하나 = [accessory 칸 8/16][탭 줄 56][safe-area]. frosted·hairline은 컨테이너에 한 번만.
 *  두 줄을 한 부품이 함께 움직인다 — 따로 두면 움직일 때 사이가 벌어진다.
 *  숨김 = 컨테이너 translateY(56px). accessory가 safe-area 바로 위로 내려온다. 탭 줄은 inert.
 *  탭 줄은 숨을 때 opacity도 0으로 간다 — safe-area가 있는 기기에서 탭 줄 윗부분이
 *  safe-area 띠 안에 비쳐 보이기 때문이다(레이아웃과 무관한 속성이라 흔들림 없음).
 *  높이(accessory + 56, safe-area 제외)를 :root의 --mt-bottom-bar-height로 쓴다 — 숨김과 무관한 고정값.
 */

const TABS = [
  { key: "mentors",  label: "멘토 찾기",       icon: "user-search-01",  href: "/mentors" },
  { key: "qna",      label: "Q&A 멘토링",      icon: "quiz-05",         href: "/qna" },
  { key: "insights", label: "멘트리 인사이트", icon: "news",            href: "/insights" },
  { key: "my",       label: "MY 멘트리",       icon: "user-circle-02",  href: "/my" },
];

const TAB_ROW = 56;
const SCROLL_DELTA = 8;
const HEIGHT_VAR = "--mt-bottom-bar-height";

function ensureTabBarStyle() {
  if (typeof document === "undefined" || document.getElementById("mt-tabbar-style")) return;
  const s = document.createElement("style");
  s.id = "mt-tabbar-style";
  s.textContent =
    "@media (min-width:769px){.mt-tabbar{display:none !important;}}" +
    "@media (prefers-reduced-motion:reduce){.mt-tabbar,.mt-tabbar-row{transition:none !important;}}";
  document.head.appendChild(s);
}

function resolveTarget(sc) {
  if (!sc) return typeof window !== "undefined" ? window : null;
  if (sc === window || sc.nodeType === 1) return sc;
  if ("current" in sc) return sc.current || null;
  return null;
}
const readY = (t) => (t === window ? window.scrollY || document.documentElement.scrollTop || 0 : t.scrollTop);

export function BottomTabBar({ activeKey, authState = "guest", onNavigate, onAuth, accessory, hideOnScroll = false, scrollContainer, style }) {
  React.useEffect(ensureTabBarStyle, []);
  const [hidden, setHidden] = React.useState(false);
  const accRef = React.useRef(null);
  const rowRef = React.useRef(null);
  const focusIn = React.useRef(false);
  const hasAcc = accessory != null && accessory !== false;

  // 높이 → :root 변수. accessory 높이가 바뀌면 다시 쓰고, 사라지면 지운다.
  React.useEffect(() => {
    const root = document.documentElement;
    const write = () => root.style.setProperty(HEIGHT_VAR, ((accRef.current ? accRef.current.offsetHeight : 0) + TAB_ROW) + "px");
    write();
    let ro;
    if (accRef.current && typeof ResizeObserver !== "undefined") { ro = new ResizeObserver(write); ro.observe(accRef.current); }
    return () => { if (ro) ro.disconnect(); root.style.removeProperty(HEIGHT_VAR); };
  }, [hasAcc]);

  // 스크롤 판정 — 8px 이상 움직였을 때만 기준점을 옮긴다(작은 흔들림은 누적).
  React.useEffect(() => {
    if (!hideOnScroll) { setHidden(false); return; }
    const t = resolveTarget(scrollContainer);
    if (!t) return;
    let last = readY(t);
    const onScroll = () => {
      const y = readY(t);
      if (y <= TAB_ROW) { setHidden(false); last = y; return; }
      const dy = y - last;
      if (dy >= SCROLL_DELTA) { if (!focusIn.current) setHidden(true); last = y; }
      else if (dy <= -SCROLL_DELTA) { setHidden(false); last = y; }
    };
    t.addEventListener("scroll", onScroll, { passive: true });
    return () => t.removeEventListener("scroll", onScroll);
  }, [hideOnScroll, scrollContainer]);

  // 숨었을 때 탭 줄 inert — 스크린리더·탭 키가 들어가지 않는다.
  React.useEffect(() => { if (rowRef.current) rowRef.current.inert = hidden; }, [hidden]);

  const go = (e, tab) => {
    if (tab.key === "my" && authState === "guest") {
      // 비로그인 — 로그인 유도 (자리만; 로그인 후 동작은 OPEN #9)
      if (onAuth) { e.preventDefault(); onAuth(e, tab); }
      else e.preventDefault();
      return;
    }
    if (onNavigate) { e.preventDefault(); onNavigate(tab); }
  };

  return (
    <div
      className="mt-tabbar"
      data-hidden={hidden ? "true" : undefined}
      style={{
        position: "fixed",
        left: 0,
        right: 0,
        bottom: 0,
        zIndex: 50,
        background: "color-mix(in oklch, white 78%, transparent)",
        backdropFilter: "blur(12px)",
        WebkitBackdropFilter: "blur(12px)",
        borderTop: "1px solid var(--sage-200)",
        paddingBottom: "env(safe-area-inset-bottom, 0px)",
        fontFamily: "var(--font-sans)",
        transform: hidden ? `translateY(${TAB_ROW}px)` : "none",
        transition: "transform 200ms ease-out",
        ...style,
      }}
    >
      {hasAcc && <div ref={accRef} style={{ padding: "8px 16px" }}>{accessory}</div>}
      <nav
        ref={rowRef}
        className="mt-tabbar-row"
        aria-label="하단 탭 네비게이션"
        onFocus={() => { focusIn.current = true; setHidden(false); }}
        onBlur={(e) => { if (!e.currentTarget.contains(e.relatedTarget)) focusIn.current = false; }}
        style={{ display: "flex", height: TAB_ROW, opacity: hidden ? 0 : 1, transition: "opacity 200ms ease-out" }}
      >
        {TABS.map((tab) => {
          const on = activeKey === tab.key;
          return (
            <a
              key={tab.key}
              href={tab.href}
              onClick={(e) => go(e, tab)}
              aria-current={on ? "page" : undefined}
              style={{
                flex: 1,
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                justifyContent: "center",
                gap: 3,
                textDecoration: "none",
                color: on ? "var(--primary)" : "var(--muted-foreground)",
              }}
            >
              <Icon name={tab.icon} size={22} aria-hidden="true" />
              <span style={{ fontSize: "var(--text-micro)", lineHeight: 1, fontWeight: on ? 600 : 500, letterSpacing: 0 }}>
                {tab.label}
              </span>
            </a>
          );
        })}
      </nav>
    </div>
  );
}
