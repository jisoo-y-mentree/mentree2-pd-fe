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
 */

const TABS = [
  { key: "mentors",  label: "멘토 찾기",       icon: "user-search-01",  href: "/mentors" },
  { key: "qna",      label: "Q&A 멘토링",      icon: "quiz-05",         href: "/qna" },
  { key: "insights", label: "멘트리 인사이트", icon: "news",            href: "/insights" },
  { key: "my",       label: "MY 멘트리",       icon: "user-circle-02",  href: "/my" },
];

function ensureTabBarStyle() {
  if (typeof document === "undefined" || document.getElementById("mt-tabbar-style")) return;
  const s = document.createElement("style");
  s.id = "mt-tabbar-style";
  s.textContent = "@media (min-width:769px){.mt-tabbar{display:none !important;}}";
  document.head.appendChild(s);
}

export function BottomTabBar({ activeKey, authState = "guest", onNavigate, onAuth, style }) {
  React.useEffect(ensureTabBarStyle, []);

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
    <nav
      className="mt-tabbar"
      aria-label="하단 탭 네비게이션"
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
        ...style,
      }}
    >
      <div style={{ display: "flex", height: 56 }}>
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
              <span style={{ fontSize: "var(--text-caption)", lineHeight: 1, fontWeight: on ? 600 : 500, letterSpacing: "-0.01em" }}>
                {tab.label}
              </span>
            </a>
          );
        })}
      </div>
    </nav>
  );
}
