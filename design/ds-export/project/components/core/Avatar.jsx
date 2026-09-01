import React from "react";

const SIZES = { xs: 20, sm: 24, md: 32, lg: 40 };

const CJK = /[\u3400-\u9FFF\uAC00-\uD7AF\u3040-\u30FF]/;

function initials(name) {
  if (!name) return "";
  const parts = String(name).trim().split(/\s+/).filter(Boolean);
  if (parts.length >= 2) return (parts[0][0] + parts[1][0]).toUpperCase();
  const w = parts[0] || "";
  return CJK.test(w[0]) ? w.slice(0, 1) : w.slice(0, 2).toUpperCase();
}

/**
 * Avatar — 원형 아바타. 이미지가 있으면 AvatarImage, 없거나 실패하면 AvatarFallback(이니셜).
 * 이미지 로딩 전에는 sage placeholder(sage-100)가 보인다.
 */
export function Avatar({ src, name, alt, size = "md", style, ...rest }) {
  const px = typeof size === "number" ? size : (SIZES[size] || SIZES.md);
  const [errored, setErrored] = React.useState(false);
  const [loaded, setLoaded] = React.useState(false);
  const showImg = !!src && !errored;
  const fs = Math.max(9, Math.round(px * 0.4));

  return (
    <span
      role="img"
      aria-label={alt || name || "avatar"}
      title={name || undefined}
      style={{
        position: "relative",
        display: "inline-flex",
        alignItems: "center",
        justifyContent: "center",
        width: px,
        height: px,
        borderRadius: "50%",
        overflow: "hidden",
        flex: "0 0 auto",
        background: "var(--sage-100)",
        color: "var(--sage-700)",
        fontFamily: "var(--font-sans)",
        fontSize: fs,
        fontWeight: 600,
        lineHeight: 1,
        letterSpacing: "-0.01em",
        userSelect: "none",
        ...style,
      }}
      {...rest}
    >
      {/* Fallback: 이니셜(이미지 없음/실패) — 로딩 중에는 sage-100 배경이 placeholder */}
      {(!showImg || !loaded) && (
        <span aria-hidden={showImg ? "true" : undefined} style={{ position: "absolute", inset: 0, display: "flex", alignItems: "center", justifyContent: "center" }}>
          {showImg ? null : initials(name)}
        </span>
      )}
      {showImg && (
        <img
          src={src}
          alt={alt || name || ""}
          onLoad={() => setLoaded(true)}
          onError={() => setErrored(true)}
          style={{ position: "absolute", inset: 0, width: "100%", height: "100%", objectFit: "cover", opacity: loaded ? 1 : 0, transition: "opacity 150ms ease" }}
        />
      )}
    </span>
  );
}

/**
 * AvatarGroup — 아바타 겹쳐 쌓기. 음수 마진 겹침 + 각 아바타 흰색 링(카드 위 분리용).
 * max 초과분은 "+K" 오버플로우 칩(마지막 자리, sage 배경).
 */
export function AvatarGroup({ items = [], max = 4, size = "sm", style, ...rest }) {
  const px = typeof size === "number" ? size : (SIZES[size] || SIZES.sm);
  const overlap = Math.round(px * 0.32);
  const ring = "0 0 0 2px var(--card)";
  const shown = items.slice(0, max);
  const extra = items.length - shown.length;

  const cell = (child, i) => (
    <span
      key={i}
      style={{ marginLeft: i === 0 ? 0 : -overlap, borderRadius: "50%", boxShadow: ring, position: "relative", zIndex: i + 1, display: "inline-flex" }}
    >
      {child}
    </span>
  );

  return (
    <span style={{ display: "inline-flex", alignItems: "center", ...style }} {...rest}>
      {shown.map((it, i) => cell(<Avatar {...it} size={px} />, i))}
      {extra > 0 && cell(
        <span
          className="tabular"
          style={{
            display: "inline-flex",
            alignItems: "center",
            justifyContent: "center",
            width: px,
            height: px,
            borderRadius: "50%",
            background: "var(--secondary)",
            color: "var(--secondary-foreground)",
            fontFamily: "var(--font-sans)",
            fontSize: Math.max(9, Math.round(px * 0.36)),
            fontWeight: 600,
            lineHeight: 1,
          }}
        >
          +{extra}
        </span>,
        shown.length
      )}
    </span>
  );
}
