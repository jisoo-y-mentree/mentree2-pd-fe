import React from "react";
import { Icon } from "../core/Icon.jsx";

/**
 * Breadcrumb — 목록에서 상세로 들어온 사람을 목록으로 되돌린다. qna-detail·article-detail 2화면.
 *  깊이는 2단이 전부다 — items로 받지만 화면에서 3단을 만들지 않는다. 마지막 항목은 href를 넘겨도
 *  무시하고 현재 페이지(<span aria-current="page">)로 렌더한다 — 부품이 강제한다, 화면마다 지키게
 *  두면 갈린다. 구분자는 CalloutBar와 같은 arrow-right-01(문자 "/"·">" 직접 쓰지 않음).
 *  긴 제목: 현재 페이지만 ellipsis로 줄어든다(flex:1 1 auto+minWidth:0) — 링크는 flex:0 0 auto로
 *  안 줄어든다. 되돌아갈 링크를 먼저 지킨다.
 */
export function Breadcrumb({ items, ariaLabel = "경로", style, ...rest }) {
  return (
    <nav aria-label={ariaLabel} style={style} {...rest}>
      <ol style={{ display: "flex", alignItems: "center", gap: 6, margin: 0, padding: 0, listStyle: "none", fontFamily: "var(--font-sans)", fontSize: "var(--text-caption)", fontWeight: 400 }}>
        {items.map((item, i) => {
          const isLast = i === items.length - 1;
          return (
            <li
              key={i}
              style={{
                display: "flex",
                alignItems: "center",
                gap: 6,
                flex: isLast ? "1 1 auto" : "0 0 auto",
                minWidth: isLast ? 0 : undefined,
              }}
            >
              {isLast ? (
                <span
                  aria-current="page"
                  style={{
                    color: "var(--foreground)",
                    fontWeight: 500,
                    overflow: "hidden",
                    textOverflow: "ellipsis",
                    whiteSpace: "nowrap",
                    minWidth: 0,
                  }}
                >
                  {item.label}
                </span>
              ) : (
                <React.Fragment>
                  <a
                    href={item.href}
                    style={{
                      color: "var(--muted-foreground)",
                      textDecoration: "none",
                      whiteSpace: "nowrap",
                      transition: "color 150ms ease",
                    }}
                    onMouseEnter={(e) => { e.currentTarget.style.color = "var(--foreground)"; }}
                    onMouseLeave={(e) => { e.currentTarget.style.color = "var(--muted-foreground)"; }}
                  >
                    {item.label}
                  </a>
                  <Icon name="arrow-right-01" size={14} aria-hidden="true" style={{ color: "var(--muted-foreground)", opacity: 0.6, flex: "0 0 auto" }} />
                </React.Fragment>
              )}
            </li>
          );
        })}
      </ol>
    </nav>
  );
}
