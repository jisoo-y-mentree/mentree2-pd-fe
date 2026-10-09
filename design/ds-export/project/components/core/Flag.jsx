import React from "react";
import { Tooltip } from "../overlays/Tooltip.jsx";

/**
 * Flag (DS-78) — 원형 국기 하나. 태그 · 아웃라인 · 글자 없음. 흰 면이 많은 국기가 묻히지 않게 1px --border 링.
 *  이름 = role="img" + aria-label「국가 · 도시」. tooltip이면 Tooltip(describe={false} — 이름과 같은 글)으로 띄우고
 *  tabIndex=0으로 키보드가 닿는다. 포커스 링은 원을 따른다. 이름과 같이 쓰면 이름 오른쪽, 글자의 세로 가운데.
 */
const SIZES = { sm: 16, md: 20, lg: 24, xl: 28 };
const FLAG_BASE = "../../assets/flags/"; // Badge와 같다

if (typeof document !== "undefined" && !document.getElementById("mt-flag-style")) {
  const s = document.createElement("style");
  s.id = "mt-flag-style";
  s.textContent = ".mt-flag{outline:none}.mt-flag:focus-visible{outline:2px solid var(--ring);outline-offset:2px}";
  document.head.appendChild(s);
}

export function Flag({ country, label, city, size = "md", flagBase = FLAG_BASE, tooltip = true, style, ...rest }) {
  const px = typeof size === "number" ? size : (SIZES[size] || SIZES.md);
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
        width: px,
        height: px,
        borderRadius: "50%",
        overflow: "hidden",
        verticalAlign: "middle",
        background: "var(--sage-100)",
        boxShadow: "0 0 0 1px var(--border)",
        ...style,
      }}
      {...rest}
    >
      {country && !failed && (
        <img src={`${flagBase}${country}.svg`} alt="" onError={() => setFailed(true)} style={{ width: "100%", height: "100%", objectFit: "cover", display: "block" }} />
      )}
    </span>
  );
  if (!tooltip || !name) return flag;
  return <Tooltip content={name} describe={false}>{flag}</Tooltip>;
}
