import React from "react";
import { Icon } from "../core/Icon.jsx";
import { NAV_PRIMARY, NAV_AUTH, NAV_UTILITY } from "./nav-ia.js";

/**
 * Footer — mentree 사이트 푸터. 헤더와 동일한 IA(nav-ia.js, SSoT)를 공유한다.
 * 로고는 mentree 워드마크이며 푸터에서는 sage-500로 톤 다운(헤더는 풀컴러). 좌측 정렬, brand prop으로 교체 가능.
 * '기업 서비스(Biz)'는 외부 출구 링크(푸터 링크 목록에서는 기존 표기 유지).
 */
export function Footer({
  primary = NAV_PRIMARY,
  auth = NAV_AUTH,
  utility = NAV_UTILITY,
  brand,
  copyright = "© 2026 mentree. All rights reserved.",
  onNavigate,
  style,
}) {
  const go = (e, item) => {
    if (onNavigate) { e.preventDefault(); onNavigate(item); }
  };

  const linkStyle = (isBiz) => ({
    display: "inline-flex",
    alignItems: "center",
    gap: 4,
    fontSize: "var(--text-caption)",
    lineHeight: "var(--text-caption--line-height)",
    letterSpacing: "var(--text-caption--letter-spacing)",
    textDecoration: "none",
    color: isBiz ? "var(--biz-primary)" : "var(--muted-foreground)",
    width: "fit-content",
  });

  const Column = ({ title, items }) => (
    <div style={{ display: "flex", flexDirection: "column", gap: 10, minWidth: 120 }}>
      <div style={{ fontSize: "var(--text-caption)", fontWeight: 600, color: "var(--foreground)", lineHeight: "var(--text-caption--line-height)", letterSpacing: "var(--text-caption--letter-spacing)" }}>
        {title}
      </div>
      {items.map((item) => {
        const isBiz = item.brand === "biz";
        return (
          <a
            key={item.key}
            href={item.href}
            onClick={(e) => go(e, item)}
            target={item.external ? "_blank" : undefined}
            rel={item.external ? "noopener noreferrer" : undefined}
            style={linkStyle(isBiz)}
            onMouseEnter={(e) => { e.currentTarget.style.color = isBiz ? "var(--biz-primary)" : "var(--foreground)"; }}
            onMouseLeave={(e) => { e.currentTarget.style.color = isBiz ? "var(--biz-primary)" : "var(--muted-foreground)"; }}
          >
            {item.label}
            {item.external && <Icon name="arrow-up-right-01" size={13} style={{ color: isBiz ? "var(--biz-primary)" : "var(--muted-foreground)" }} />}
          </a>
        );
      })}
    </div>
  );

  return (
    <footer
      style={{
        width: "100%",
        background: "var(--background)",
        borderTop: "1px solid var(--border)",
        fontFamily: "var(--font-sans)",
        color: "var(--foreground)",
        ...style,
      }}
    >
      <div style={{ maxWidth: "var(--container-max)", margin: "0 auto", padding: "40px var(--container-pad) 28px", boxSizing: "border-box" }}>
        <div style={{ display: "flex", flexWrap: "wrap", gap: 48, justifyContent: "space-between" }}>
          {/* 브랜드 / mentree 워드마크 — 푸터는 조용한 영역라로 sage-500로 톤 다운(헤더는 풀컴러 유지). 좌측 정렬. */}
          <div style={{ display: "flex", flexDirection: "column", alignItems: "flex-start", gap: 12, maxWidth: 260 }}>
            {brand || (
              <span
                aria-label="mentree"
                style={{
                  display: "block",
                  width: 120,
                  height: 24,
                  background: "var(--sage-500)",
                  WebkitMaskImage: "url(../../assets/logo/mentree-logo.svg)",
                  maskImage: "url(../../assets/logo/mentree-logo.svg)",
                  WebkitMaskRepeat: "no-repeat",
                  maskRepeat: "no-repeat",
                  WebkitMaskPosition: "left center",
                  maskPosition: "left center",
                  WebkitMaskSize: "contain",
                  maskSize: "contain",
                }}
              />
            )}
            <p style={{ fontSize: "var(--text-caption)", color: "var(--muted-foreground)", lineHeight: "var(--text-caption--line-height)", letterSpacing: "var(--text-caption--letter-spacing)", margin: 0 }}>
              멘토와 멘티를 잇는 멘토링 플랫폼
            </p>
          </div>

          {/* 링크 컬럼 — 헤더와 동일한 IA */}
          <div style={{ display: "flex", flexWrap: "wrap", gap: 48 }}>
            <Column title="서비스" items={primary} />
            <Column title="고객지원" items={utility} />
            <Column title="회원" items={auth} />
          </div>
        </div>

        {/* 하단 바 — 카피라이트 */}
        <div
          style={{
            marginTop: 32,
            paddingTop: 20,
            borderTop: "1px solid var(--border)",
            display: "flex",
            flexWrap: "wrap",
            gap: 12,
            alignItems: "center",
            justifyContent: "space-between",
          }}
        >
          <span className="tabular" style={{ fontSize: "var(--text-caption)", lineHeight: "var(--text-caption--line-height)", letterSpacing: "var(--text-caption--letter-spacing)", color: "var(--muted-foreground)" }}>
            {copyright}
          </span>
          <div style={{ display: "flex", gap: 16 }}>
            <a href="/terms" style={{ fontSize: "var(--text-caption)", lineHeight: "var(--text-caption--line-height)", letterSpacing: "var(--text-caption--letter-spacing)", color: "var(--muted-foreground)", textDecoration: "none" }}>이용약관</a>
            <a href="/privacy" style={{ fontSize: "var(--text-caption)", lineHeight: "var(--text-caption--line-height)", letterSpacing: "var(--text-caption--letter-spacing)", color: "var(--muted-foreground)", textDecoration: "none", fontWeight: 600 }}>개인정보처리방침</a>
          </div>
        </div>
      </div>
    </footer>
  );
}
