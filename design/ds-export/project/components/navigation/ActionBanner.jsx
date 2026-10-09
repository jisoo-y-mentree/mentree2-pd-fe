import React from "react";
import { Button } from "../core/Button.jsx";

/**
 * ActionBanner — 문구 + 버튼 배너(DS-34). 모양이 고정이다.
 *  Banner(자유 프로모 슬롯, 배경·효과 자유)와 다르다 — 이 부품은 면·글자·버튼 규칙이 정해져 있다.
 *  쓰는 곳: Q&A 상세 멘토 유도 · 아티클 상세 카테고리 CTA · 멘토 상세 탭 끝 CTA.
 *  면: --green-50 · 1px --primary · --radius-lg · 24/32.
 *  inline(기본): 문구 좌 · Button primary md 우 · 간격 24 · 세로 가운데.
 *  stacked: 가운데 정렬 · 문구 아래 Button primary lg · 간격 16.
 *  ≤768: inline도 stacked로 · 안쪽 여백 20 · 버튼 폭 100%(높이 48 = lg).
 *  href는 Button 클릭 시 이동한다(Button이 링크형을 갖지 않는다).
 */

if (typeof document !== "undefined" && !document.getElementById("mt-actionbanner-style")) {
  const s = document.createElement("style");
  s.id = "mt-actionbanner-style";
  s.textContent =
    "@media (max-width:768px){" +
    ".mt-actionbanner{flex-direction:column !important;align-items:stretch !important;text-align:center !important;gap:16px !important;padding:20px !important;}" +
    ".mt-actionbanner-action,.mt-actionbanner-action>button{width:100% !important;}" +
    ".mt-actionbanner-action>button{height:48px !important;}" +
    "}";
  document.head.appendChild(s);
}

export function ActionBanner({ title, description, actionLabel, href, onAction, layout = "inline", style, ...rest }) {
  const stacked = layout === "stacked";
  const click = (e) => {
    if (onAction) onAction(e);
    if (href && !e.defaultPrevented) window.location.assign(href);
  };
  return (
    <div
      className="mt-actionbanner"
      data-layout={stacked ? "stacked" : "inline"}
      style={{
        display: "flex",
        flexDirection: stacked ? "column" : "row",
        alignItems: "center",
        justifyContent: stacked ? "center" : "space-between",
        textAlign: stacked ? "center" : "left",
        gap: stacked ? 16 : 24,
        padding: "24px 32px",
        boxSizing: "border-box",
        width: "100%",
        background: "var(--green-50)",
        border: "1px solid var(--primary)",
        borderRadius: "var(--radius-lg)",
        color: "var(--foreground)",
        fontFamily: "var(--font-sans)",
        ...style,
      }}
      {...rest}
    >
      <div style={{ display: "flex", flexDirection: "column", gap: 4, minWidth: 0 }}>
        <div style={{ fontSize: "var(--text-h3)", fontWeight: 600, lineHeight: "var(--text-h3--line-height)", letterSpacing: "var(--text-h3--letter-spacing)", textWrap: "balance" }}>{title}</div>
        {description && (
          <div style={{ fontSize: "var(--text-body)", lineHeight: "var(--text-body--line-height)", letterSpacing: "var(--text-body--letter-spacing)", color: "var(--muted-foreground)", textWrap: "pretty" }}>{description}</div>
        )}
      </div>
      {actionLabel && (
        <div className="mt-actionbanner-action" style={{ flex: "0 0 auto", display: "flex", justifyContent: "center" }}>
          <Button variant="primary" size={stacked ? "lg" : "md"} onClick={click}>{actionLabel}</Button>
        </div>
      )}
    </div>
  );
}
