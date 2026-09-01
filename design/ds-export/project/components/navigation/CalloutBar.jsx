import React from "react";
import { Icon } from "../core/Icon.jsx";

/**
 * CalloutBar — 배치 컴포넌트. 블리드 풀폭 띠(화면 폭 꽉 참, 모서리 각짐 radius 0).
 *  헤더 위/아래에 붙는 공지·안내·상태·경고 띠. (인라인 둥근 Banner와 구분 — 이건 각진 풀폭.)
 *  얇은 한 줄 기준(44 전후), 텍스트 2줄까지 허용(모바일). 정렬 center(기본)/left.
 *  구성: (아이콘) + 메시지 + (인라인 링크 "자세히 보기 >") + (닫기 X) — 각각 독립 옵션.
 *  variant 4종: 옅은 배경 + 진한 텍스트/아이콘(Badge 50/700 패턴 상속).
 */
const VARIANTS = {
  info:    { bg: "var(--sage-50)",                                        text: "var(--sage-700)",        line: "var(--sage-200)",  defaultIcon: "information-circle" },
  success: { bg: "color-mix(in oklch, var(--primary) 10%, white)",        text: "var(--primary)",         line: "color-mix(in oklch, var(--primary) 22%, transparent)",     defaultIcon: "checkmark-circle-02" },
  warning: { bg: "var(--badge-amber-50)",                                 text: "var(--badge-amber-800)", line: "var(--badge-amber-200)", defaultIcon: "alert-02" },
  error:   { bg: "color-mix(in oklch, var(--destructive) 9%, white)",     text: "var(--destructive)",     line: "color-mix(in oklch, var(--destructive) 22%, transparent)", defaultIcon: "alert-circle" },
};

export function CalloutBar({
  variant = "info",
  align = "center",
  icon,
  showIcon = true,
  children,
  linkLabel,
  linkHref,
  onLinkClick,
  onClose,
  style,
  ...rest
}) {
  const v = VARIANTS[variant] || VARIANTS.info;
  const iconName = icon || v.defaultIcon;

  return (
    <div
      role={variant === "error" || variant === "warning" ? "alert" : "status"}
      style={{
        width: "100%",
        boxSizing: "border-box",
        display: "flex",
        alignItems: "center",
        // 중앙 정렬 기본 / 좌측 정렬 변형. 닫기 X는 항상 오른쪽 끝.
        justifyContent: align === "left" ? "flex-start" : "center",
        gap: 10,
        minHeight: 44,
        padding: "10px 20px",
        // 블리드 풀폭 — 모서리 각짐(radius 0)
        borderRadius: 0,
        background: v.bg,
        color: v.text,
        fontFamily: "var(--font-sans)",
        fontSize: "var(--text-body)",
        lineHeight: 1.5,
        wordBreak: "keep-all",
        overflowWrap: "break-word", // 禁則: break-all 금지
        ...style,
      }}
      {...rest}
    >
      {/* 콘텐츠 묶음(아이콘 + 메시지 + 인라인 링크) */}
      <div style={{ display: "flex", alignItems: "center", gap: 8, minWidth: 0, flexWrap: "wrap", justifyContent: align === "left" ? "flex-start" : "center" }}>
        {showIcon && <Icon name={iconName} size={18} style={{ flex: "0 0 auto", color: v.text }} />}
        <span style={{ fontWeight: 500 }}>{children}</span>
        {linkLabel && (
          <a
            href={linkHref || "#"}
            onClick={onLinkClick}
            style={{ display: "inline-flex", alignItems: "center", gap: 2, color: v.text, fontWeight: 600, textDecoration: "underline", textUnderlineOffset: 2 }}
          >
            {linkLabel}
            <Icon name="arrow-right-01" size={15} style={{ color: v.text }} />
          </a>
        )}
      </div>

      {/* 닫기 X (옵션) — 항상 오른쪽 끝 */}
      {onClose && (
        <button
          type="button"
          onClick={onClose}
          aria-label="닫기"
          style={{ marginLeft: "auto", flex: "0 0 auto", display: "inline-flex", alignItems: "center", justifyContent: "center", width: 28, height: 28, padding: 0, border: "none", background: "transparent", color: v.text, borderRadius: "var(--radius-sm)", cursor: "pointer" }}
        >
          <Icon name="cancel-01" size={16} />
        </button>
      )}
    </div>
  );
}
