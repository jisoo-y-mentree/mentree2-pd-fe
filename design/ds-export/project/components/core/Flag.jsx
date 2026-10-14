import React from "react";
import { Tooltip } from "../overlays/Tooltip.jsx";

/**
 * Flag (DS-78 · DS-90) — 국기 하나. 태그 · 아웃라인 · 글자 없음.
 *  shape="circle"(기본 · 부품 안 — 칩 · 필터 · 배지 앞자리) · "rect"(이름 옆).
 *  circle: 지름 = size, 1px --border 링. rect: 높이 = size, 폭 1.5배, 2px 안쪽 여백 · 반경 4 · 1px --border 링 —
 *  흰 바탕 국기(일본 등)가 흰 면에서 묻히지 않게(원형의 링과 같은 이유).
 *  이름 = role="img" + aria-label「국가 · 도시」. tooltip이면 Tooltip(describe={false})으로 띄우고 tabIndex=0.
 *  자산: Figma 국기 라이브러리(1758:672626) — 원형 assets/flags/ · 직사각 assets/flags-rect/(30×20).
 */
const SIZES = { sm: 16, md: 20, lg: 24, xl: 28 };
const FLAG_BASE = "../../assets/flags/"; // Badge와 같다
const FLAG_RECT_BASE = "../../assets/flags-rect/";

if (typeof document !== "undefined" && !document.getElementById("mt-flag-style")) {
  const s = document.createElement("style");
  s.id = "mt-flag-style";
  s.textContent = ".mt-flag{outline:none}.mt-flag:focus-visible{outline:2px solid var(--ring);outline-offset:2px}";
  document.head.appendChild(s);
}

export function Flag({ country, label, city, size = "md", shape = "circle", flagBase, tooltip = true, style, ...rest }) {
  const px = typeof size === "number" ? size : (SIZES[size] || SIZES.md);
  const rect = shape === "rect";
  const base = flagBase || (rect ? FLAG_RECT_BASE : FLAG_BASE);
  const name = [label, city].filter(Boolean).join(" · ");
  const [failed, setFailed] = React.useState(false);
  const flag = (
    <span
      role="img"
      aria-label={name || undefined}
      className="mt-flag"
      tabIndex={tooltip && name ? 0 : undefined}
      style={{
        display: "inline-flex",
        flex: "0 0 auto",
        boxSizing: "border-box",
        width: rect ? Math.round(px * 1.5) : px,
        height: px,
        padding: rect ? 2 : 0,
        borderRadius: rect ? 4 : "50%",
        overflow: "hidden",
        verticalAlign: "middle",
        background: rect ? "var(--card)" : "var(--sage-100)",
        boxShadow: "0 0 0 1px var(--border)",
        ...style,
      }}
      {...rest}
    >
      {country && !failed && (
        <img src={`${base}${country}.svg`} alt="" onError={() => setFailed(true)} style={{ width: "100%", height: "100%", objectFit: "cover", display: "block", borderRadius: rect ? 2 : 0 }} />
      )}
    </span>
  );
  if (!tooltip || !name) return flag;
  return <Tooltip content={name} describe={false}>{flag}</Tooltip>;
}
