import React from "react";
import { Icon } from "../core/Icon.jsx";
import { Avatar } from "../core/Avatar.jsx";
import { Button } from "../core/Button.jsx";
import { IconButton } from "../core/IconButton.jsx";
import { NAV_PRIMARY } from "./nav-ia.js";

/**
 * Header — 제품 기본 상단 네비게이션(sticky top). 3열 그리드(minmax(0,1fr) auto minmax(0,1fr)) — 좌(로고)/중(메뉴)/우(액션).
 *  칸은 grid-column으로 명시한다(1·2·3) — 중앙 메뉴가 Mobile에서 사라지면 자동 배치가 한 칸 당기기 때문이다.
 *  Mobile은 칸 2개(1fr auto · gap 12) — 액션부가 2번 칸이다.
 *  중앙 메뉴는 좌우 폭과 무관하게 늘 화면 폭의 중앙에 선다.
 *  좌: mentree 워드마크 풀컬러 그린(헤더는 밝은 배경 → 풀컬러 유지), 클릭 → 홈.
 *  중: 최상위 메뉴 3개(멘토 찾기·Q&A 멘토링·멘트리 인사이트). 각 메뉴 좌측 20px HugeIcons 모노 아이콘
 *     (전역 아이콘 원칙의 예외 아님). 라벨 16px·600, 활성은 굵기가 아니라 색(--primary)으로만 구분.
 *  우(guest): 회원가입/로그인(green 버튼 하나로 합침) + 기업 서비스(중립 outline, 외부 ↗).
 *     공지사항·뉴스는 헤더에 두지 않음(푸터에만).
 *  우(mentor·mentee): 알림 버튼 + 아바타, 간격 8 — 평상시 면 없이 아이콘 20 · 사진 32만 보이고 hover·focus에서만 40 원형 면.
 *     클릭·터치 영역은 항상 40×40. 회원가입·기업서비스 없음.
 *     두 상태는 모양이 같고 아바타 목적지만 다르다(mypage-mentor / mypage-mentee).
 *     아바타는 메뉴를 열지 않고 마이페이지 「프로필」 탭으로 직행. unread면 알림 아이콘(40 면이 아니다) 우상단에 빨간 점(8, 숫자 없음).
 *     알림 popover는 이 부품이 열지 않는다(onNotify까지).
 *
 *  반응형 3구간:
 *   Desktop L(1280+)  — 현행 그대로.
 *   Desktop S(769–1279) — 기업 서비스 버튼만 숨김.
 *   Mobile(~768) — 중앙 3메뉴 제거, 우측 = 회원가입/로그인(또는 알림+아바타) + 햄버거.
 *     햄버거 → GNB 아래 전체화면 오버레이(3메뉴 + MY 멘트리 + 구분선 + 기업 서비스 + 로그아웃(로그인 시)).
 *     GNB 바는 유지, 햄버거만 X로 토글.
 *
 *  상태 분기: authState "guest"(비로그인) / "mentor" / "mentee".
 */

const HEADER_H = 64;

function ensureHeaderStyle() {
  if (typeof document === "undefined" || document.getElementById("mt-header-style")) return;
  const s = document.createElement("style");
  s.id = "mt-header-style";
  s.textContent = [
    /* Desktop S: 기업 서비스 버튼 숨김 */
    "@media (max-width:1279px){.mt-header-bizbtn{display:none !important;}}",
    /* Mobile: 중앙 메뉴 숨김 + 칸을 2개로 줄이고 액셔부를 2번 칸으로. 중앙 칸이 0 폭이어도 gap 24가 두 번 들어가 48을 버리기 때문이다. */
    "@media (max-width:768px){.mt-header-nav{display:none !important;}.mt-header-bar{grid-template-columns:minmax(0,1fr) auto !important;gap:12px !important;}.mt-header-actions{grid-column:2 !important;}}",
    /* 로그인 액셔 — 평상시 면이 없고 hover·focus에서만 40 원형 면이 깔린다. 보이는 것만 달라지고 토상 여역은 항상 40×40. */
    ".mt-header-round{display:inline-flex;align-items:center;justify-content:center;width:40px;height:40px;padding:0;border:none;background:transparent;border-radius:50%;cursor:pointer;color:var(--foreground);text-decoration:none;transition:background-color 120ms ease;}",
    ".mt-header-round:hover{background:var(--secondary);}",
    ".mt-header-round:focus-visible{outline:2px solid var(--ring);outline-offset:2px;border-radius:50%;}",
    /* Desktop: 햄버거·오버레이 숨김 */
    "@media (min-width:769px){.mt-header-burger{display:none !important;}.mt-header-overlay{display:none !important;}}",
  ].join("\n");
  document.head.appendChild(s);
}

/* 중앙 메뉴 아이콘 — 20px HugeIcons 모노(전역 아이콘 원칙의 예외 아님). BottomTabBar와 같은 이름을 쓴다. */
const MENU_ICON = { mentors: "user-search-01", qna: "quiz-05", insights: "news" };

export function Header({
  menu,
  brand,
  activeKey,
  authState = "guest",
  user,
  unread,
  onNavigate,
  onAuth,
  onNotify,
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
    <>
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
        className="mt-header-bar"
        style={{
          display: "grid",
          /* minmax(0,1fr) — 그냥 1fr은 내용의 최소 폭 아래로 줄지 않아 좌우가 달라지고 중앙 메뉴가 밀린다(769–1279).
             칸은 grid-column으로 명시한다 — 중앙 메뉴가 display:none이 되면 그리드 아이템이 아니라 자동 배치가 한 칸 당긴다.
             Mobile은 칸이 2개(1fr auto · gap 12) — 중앙 칸이 0 폭이어도 gap은 두 번 들어가 48을 버린다. */
          gridTemplateColumns: "minmax(0, 1fr) auto minmax(0, 1fr)",
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
          style={{ gridColumn: 1, display: "flex", alignItems: "center", justifySelf: "start", textDecoration: "none" }}
        >
          {brand || <img src="../../assets/logo/mentree-logo.svg" alt="mentree" style={{ height: 24, display: "block" }} />}
        </a>

        {/* 중: 최상위 메뉴 3개 (20px HugeIcons 모노 + 16px/600 라벨, 활성=색만 다름) — Mobile에선 오버레이로 이동 */}
        <nav className="mt-header-nav" style={{ gridColumn: 2, display: "flex", alignItems: "center", gap: 28, justifySelf: "center" }}>
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
                  gap: 6,
                  padding: "8px 0",
                  borderRadius: "var(--radius-md)",
                  fontSize: "var(--text-body)",
                  fontWeight: 600,
                  lineHeight: "var(--text-body--line-height)",
                  letterSpacing: "var(--text-body--letter-spacing)",
                  textDecoration: "none",
                  color: on ? "var(--primary)" : "var(--foreground)",
                  transition: "color 120ms ease",
                }}
              >
                <Icon name={MENU_ICON[item.key] || "circle"} size={20} aria-hidden="true" />
                {item.label}
              </a>
            );
          })}
        </nav>

        {/* 우: 액션부 */}
        <div className="mt-header-actions" style={{ gridColumn: 3, display: "flex", alignItems: "center", gap: 10, justifySelf: "end" }}>
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
            /* 로그인(mentor·mentee) — 알림 40 + 아바타 40, 간격 8. 모양은 같고 아바타 목적지만 다르다. */
            <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
              {/* 평상시 면이 없고(아이콘 20 · 사진 32) hover·focus에서만 40 원형 면. 터치 영역은 항상 40×40.
                  IconButton은 40 면+20 아이콘 짝을 낼 수 없어(md=18·lg=48) props 없이 주입 클래스로 같은 면 계약(투명→hover --secondary)을 쓴다. */}
              <button type="button" className="mt-header-round" aria-label="알림" onClick={(e) => onNotify && onNotify(e)}>
                {/* 점이 붙는 곳은 40 hover 면이 아니라 20 아이콘이다 — 면은 평상시 안 보이므로 거기 맞추면 점이 허공에 뜬다.
                    아이콘 상자(20) 기준 외접원 둘레 45° → top -1 / right -1. 숫자는 넣지 않는다. */}
                <span style={{ position: "relative", display: "inline-flex" }}>
                  <Icon name="notification-01" size={20} />
                  {unread && (
                    <span
                      aria-hidden="true"
                      style={{
                        position: "absolute",
                        top: -1,
                        right: -1,
                        width: 8,
                        height: 8,
                        borderRadius: "50%",
                        background: "var(--destructive)",
                        boxShadow: "0 0 0 2px var(--background)",
                      }}
                    />
                  )}
                </span>
              </button>
              {/* 아바타 — <a>는 hover를 인라인으로 낼 수 없어 주입 스트시트의 같은 클래스를 쓴다. 사진은 32 그대로. */}
              <a
                className="mt-header-round"
                href={authState === "mentor" ? "/mypage-mentor" : "/mypage-mentee"}
                aria-label="마이페이지"
                onClick={(e) => go(e, { key: "mypage", label: "마이페이지", href: authState === "mentor" ? "/mypage-mentor" : "/mypage-mentee" })}
              >
                <Avatar src={user && user.avatarUrl} name={user && user.name} size={32} />
              </a>
            </div>
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
    </header>

      {/* Mobile 전체화면 오버레이 — header의 backdrop-filter가 fixed 자손의 containing block을
          가로채는 것을 피하기 위해 header 밖 형제로 둔다(안에 두면 top/bottom이 header 기준으로
          계산되어 높이가 1px로 눌린다). GNB 아래 영역을 채움. */}
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
              /* 항목의 padding 0 8은 hover 면을 넓힐는 것이니 그대로 두고, nav의 좌우 패딩에서 8을 뻐다 — 글자와 아이콘이 로고와 같은 16에 선다. */
              padding: "12px calc(var(--container-pad) - 8px) 32px",
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
                    lineHeight: "var(--text-h3--line-height)",
                    letterSpacing: "var(--text-h3--letter-spacing)",
                    textDecoration: "none",
                    color: on ? "var(--primary)" : "var(--foreground)",
                  }}
                >
                  <Icon name={MENU_ICON[item.key] || "circle"} size={20} aria-hidden="true" color={on ? "var(--primary)" : "var(--foreground)"} />
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
                lineHeight: "var(--text-h3--line-height)",
                letterSpacing: "var(--text-h3--letter-spacing)",
                textDecoration: "none",
                color: "var(--foreground)",
              }}
            >
              <Icon name="user-circle-02" size={20} aria-hidden="true" color="var(--foreground)" />
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
                  lineHeight: "var(--text-h3--line-height)",
                  letterSpacing: "var(--text-h3--letter-spacing)",
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
                  lineHeight: "var(--text-h3--line-height)",
                  letterSpacing: "var(--text-h3--letter-spacing)",
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
    </>
  );
}
