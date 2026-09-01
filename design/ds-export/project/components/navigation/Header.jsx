import React from "react";
import { Icon } from "../core/Icon.jsx";
import { Button } from "../core/Button.jsx";
import { IconButton } from "../core/IconButton.jsx";
import { NAV_PRIMARY } from "./nav-ia.js";

/**
 * Header — 제품 기본 상단 네비게이션(sticky top). 좌우 3분할: 좌(로고)/중(메뉴)/우(액션).
 *  좌: mentree 워드마크 풀컬러 그린(헤더는 밝은 배경 → 풀컬러 유지), 클릭 → 홈.
 *  중: 최상위 메뉴 3개(멘토 찾기·Q&A 멘토링·멘트리 인사이트). 각 메뉴 좌측 28px 아이콘 슬롯 —
 *     HugeIcons 아님, 오리지널 컬러 SVG 예정(전역 아이콘 원칙의 명시적 예외). 지금은 placeholder.
 *     활성 메뉴 = primary green.
 *  우: 회원가입/로그인(green 버튼 하나로 합침) + 기업 서비스(중립 outline, 외부 ↗).
 *     공지사항·뉴스는 헤더에 두지 않음(푸터에만).
 *
 *  반응형 3구간:
 *   Desktop L(1280+)  — 현행 그대로.
 *   Desktop S(769–1279) — 기업 서비스 버튼만 숨김.
 *   Mobile(~768) — 중앙 3메뉴 제거, 우측 = 회원가입/로그인 + 햄버거.
 *     햄버거 → GNB 아래 전체화면 오버레이(3메뉴 + MY 멘트리 + 구분선 + 기업 서비스 + 로그아웃(로그인 시)).
 *     GNB 바는 유지, 햄버거만 X로 토글.
 *
 *  상태 분기: authState "guest"(비로그인) / "mentor" / "mentee". 지금은 guest만 실제 구현,
 *  mentor·mentee는 분기 자리만(placeholder) — 나중 확정.
 */

const HEADER_H = 64;

function ensureHeaderStyle() {
  if (typeof document === "undefined" || document.getElementById("mt-header-style")) return;
  const s = document.createElement("style");
  s.id = "mt-header-style";
  s.textContent = [
    /* Desktop S: 기업 서비스 버튼 숨김 */
    "@media (max-width:1279px){.mt-header-bizbtn{display:none !important;}}",
    /* Mobile: 중앙 메뉴 숨김 */
    "@media (max-width:768px){.mt-header-nav{display:none !important;}}",
    /* Desktop: 햄버거·오버레이 숨김 */
    "@media (min-width:769px){.mt-header-burger{display:none !important;}.mt-header-overlay{display:none !important;}}",
  ].join("\n");
  document.head.appendChild(s);
}

/* 28px 컬러 아이콘 슬롯 — HugeIcons 아님(오리지널 컬러 SVG 예정). 지금은 placeholder. */
function MenuIconSlot({ item, on }) {
  return (
    <span
      aria-hidden="true"
      style={{
        flex: "0 0 auto",
        width: 28,
        height: 28,
        borderRadius: "var(--radius-sm)",
        background: on ? "color-mix(in oklch, var(--primary) 12%, transparent)" : "var(--sage-100)",
        ...(item && item.menuIcon ? { backgroundImage: `url(${item.menuIcon})`, backgroundSize: "cover", backgroundPosition: "center" } : {}),
      }}
    >
      {item && item.menuIconEl}
    </span>
  );
}

export function Header({
  menu,
  brand,
  activeKey,
  authState = "guest",
  onNavigate,
  onAuth,
  style,
}) {
  const [open, setOpen] = React.useState(false);
  React.useEffect(ensureHeaderStyle, []);

  // 중앙 메뉴 = biz(외부 출구) 제외한 최상위 3개.
  const items = menu || NAV_PRIMARY.filter((i) => i.brand !== "biz");
  const biz = NAV_PRIMARY.find((i) => i.brand === "biz");

  const go = (e, item) => {
    setOpen(false);
    if (onNavigate) { e.preventDefault(); onNavigate(item); }
  };

  return (
    <header
      style={{
        position: "sticky",
        top: 0,
        zIndex: 50,
        width: "100%",
        background: "color-mix(in oklch, white 78%, transparent)",
        backdropFilter: "blur(12px)",
        WebkitBackdropFilter: "blur(12px)",
        borderBottom: "1px solid var(--border)",
        fontFamily: "var(--font-sans)",
        color: "var(--foreground)",
        ...style,
      }}
    >
      <div
        style={{
          display: "flex",
          alignItems: "center",
          gap: 24,
          height: HEADER_H,
          maxWidth: "var(--container-max)",
          margin: "0 auto",
          padding: "0 var(--container-pad)",
          boxSizing: "border-box",
        }}
      >
        {/* 좌: mentree 워드마크 풀컬러 그린 (canon) → 홈 */}
        <a
          href="/"
          onClick={(e) => go(e, { key: "home", label: "홈", href: "/" })}
          aria-label="mentree 홈"
          style={{ display: "flex", alignItems: "center", flex: "0 0 auto", textDecoration: "none" }}
        >
          {brand || <img src="../../assets/logo/mentree-logo.svg" alt="mentree" style={{ height: 24, display: "block" }} />}
        </a>

        {/* 중: 최상위 메뉴 3개 (아이콘 슬롯 + 라벨, 활성=green) — Mobile에선 오버레이로 이동 */}
        <nav className="mt-header-nav" style={{ display: "flex", alignItems: "center", gap: 4, flex: 1, justifyContent: "center" }}>
          {items.map((item) => {
            const on = activeKey === item.key;
            return (
              <a
                key={item.key}
                href={item.href}
                onClick={(e) => go(e, item)}
                aria-current={on ? "page" : undefined}
                style={{
                  display: "inline-flex",
                  alignItems: "center",
                  gap: 8,
                  padding: "8px 14px",
                  borderRadius: "var(--radius-md)",
                  fontSize: "var(--text-body)",
                  fontWeight: on ? 600 : 500,
                  letterSpacing: "-0.01em",
                  textDecoration: "none",
                  color: on ? "var(--primary)" : "var(--foreground)",
                  transition: "background-color 120ms ease, color 120ms ease",
                }}
                onMouseEnter={(e) => { if (!on) e.currentTarget.style.background = "var(--secondary)"; }}
                onMouseLeave={(e) => { e.currentTarget.style.background = "transparent"; }}
              >
                <MenuIconSlot item={item} on={on} />
                {item.label}
              </a>
            );
          })}
        </nav>

        {/* 우: 액션부 */}
        <div style={{ display: "flex", alignItems: "center", gap: 10, flex: "0 0 auto", marginLeft: "auto" }}>
          {authState === "guest" ? (
            <>
              <Button size="md" variant="primary" onClick={(e) => onAuth && onAuth(e, { key: "auth", label: "회원가입/로그인", href: "/login" })}>
                회원가입/로그인
              </Button>
              {biz && (
                <Button
                  className="mt-header-bizbtn"
                  size="md"
                  variant="outline"
                  onClick={(e) => go(e, biz)}
                >
                  기업 서비스
                </Button>
              )}
            </>
          ) : (
            /* 멘토·멘티 로그인 상태 — 분기 자리만(미구현 placeholder). 나중 확정. */
            <span
              data-auth-state={authState}
              style={{
                display: "inline-flex",
                alignItems: "center",
                height: 40,
                padding: "0 14px",
                borderRadius: "var(--radius-md)",
                border: "1px dashed var(--border)",
                color: "var(--muted-foreground)",
                fontSize: "var(--text-caption)",
                fontFamily: "ui-monospace, monospace",
              }}
            >
              {authState} 액션 (미구현)
            </span>
          )}
          {/* Mobile 전용: 햄버거 ↔ X 토글 */}
          <span className="mt-header-burger" style={{ display: "inline-flex" }}>
            <IconButton
              icon={open ? "cancel-01" : "menu-01"}
              variant="ghost"
              size="lg"
              ariaLabel={open ? "메뉴 닫기" : "메뉴 열기"}
              aria-expanded={open}
              onClick={() => setOpen((v) => !v)}
            />
          </span>
        </div>
      </div>

      {/* Mobile 전체화면 오버레이 — GNB 아래 영역을 채움. GNB 바는 그대로 유지. */}
      {open && (
        <div
          className="mt-header-overlay"
          role="dialog"
          aria-label="전체 메뉴"
          style={{
            position: "fixed",
            top: HEADER_H,
            left: 0,
            right: 0,
            bottom: 0,
            zIndex: 49,
            background: "var(--background)",
            overflowY: "auto",
          }}
        >
          <nav
            style={{
              maxWidth: "var(--container-max)",
              margin: "0 auto",
              padding: "12px var(--container-pad) 32px",
              boxSizing: "border-box",
              display: "flex",
              flexDirection: "column",
            }}
          >
            {/* 최상위 3메뉴 — 데스크톱과 동일한 28px 컬러 아이콘 + 텍스트 */}
            {items.map((item) => {
              const on = activeKey === item.key;
              return (
                <a
                  key={item.key}
                  href={item.href}
                  onClick={(e) => go(e, item)}
                  aria-current={on ? "page" : undefined}
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: 14,
                    minHeight: 56,
                    padding: "0 8px",
                    borderRadius: "var(--radius-md)",
                    fontSize: "var(--text-h3)",
                    fontWeight: on ? 600 : 500,
                    letterSpacing: "-0.01em",
                    textDecoration: "none",
                    color: on ? "var(--primary)" : "var(--foreground)",
                  }}
                >
                  <MenuIconSlot item={item} on={on} />
                  {item.label}
                </a>
              );
            })}
            {/* MY 멘트리 — 아이콘 placeholder(컬러 세트 미정) + 텍스트 */}
            <a
              href="/my"
              onClick={(e) => go(e, { key: "my", label: "MY 멘트리", href: "/my" })}
              style={{
                display: "flex",
                alignItems: "center",
                gap: 14,
                minHeight: 56,
                padding: "0 8px",
                borderRadius: "var(--radius-md)",
                fontSize: "var(--text-h3)",
                fontWeight: 500,
                letterSpacing: "-0.01em",
                textDecoration: "none",
                color: "var(--foreground)",
              }}
            >
              <MenuIconSlot item={null} on={false} />
              MY 멘트리
            </a>
            {/* 구분선(상시) */}
            <hr style={{ border: "none", borderTop: "1px solid var(--border)", margin: "10px 8px" }} />
            {/* 기업 서비스 — biz 파랑 텍스트 + 외부 ↗ (상시) */}
            {biz && (
              <a
                href={biz.href}
                onClick={(e) => go(e, biz)}
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: 8,
                  minHeight: 52,
                  padding: "0 8px",
                  borderRadius: "var(--radius-md)",
                  fontSize: "var(--text-h3)",
                  fontWeight: 500,
                  letterSpacing: "-0.01em",
                  textDecoration: "none",
                  color: "var(--biz-primary)",
                }}
              >
                {biz.label}
                <Icon name="arrow-up-right-01" size={18} aria-hidden="true" />
              </a>
            )}
            {/* 로그아웃 — 로그인 시에만 (guest는 미표시) */}
            {authState !== "guest" && (
              <a
                href="/logout"
                onClick={(e) => go(e, { key: "logout", label: "로그아웃", href: "/logout" })}
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: 8,
                  minHeight: 52,
                  padding: "0 8px",
                  borderRadius: "var(--radius-md)",
                  fontSize: "var(--text-h3)",
                  fontWeight: 500,
                  letterSpacing: "-0.01em",
                  textDecoration: "none",
                  color: "var(--muted-foreground)",
                }}
              >
                <Icon name="logout-03" size={20} aria-hidden="true" />
                로그아웃
              </a>
            )}
          </nav>
        </div>
      )}
    </header>
  );
}
