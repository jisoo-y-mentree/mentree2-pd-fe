import React from "react";
import { Icon } from "../core/Icon.jsx";

/**
 * Sidebar — app navigation rail using the sidebar-* tokens.
 * items: [{ key, label, icon, badge?, section? }] — group by `section`.
 */
export function Sidebar({ items = [], active, onSelect, header, footer, width = 248, style }) {
  // group by section preserving order
  const groups = [];
  items.forEach((it) => {
    const sec = it.section || "";
    let g = groups.find((x) => x.section === sec);
    if (!g) { g = { section: sec, items: [] }; groups.push(g); }
    g.items.push(it);
  });
  return (
    <nav
      style={{
        width,
        minHeight: 0,
        display: "flex",
        flexDirection: "column",
        background: "var(--sidebar)",
        borderRight: "1px solid var(--sidebar-border)",
        color: "var(--sidebar-foreground)",
        fontFamily: "var(--font-sans)",
        ...style,
      }}
    >
      {header && <div style={{ padding: "18px 16px 10px" }}>{header}</div>}
      <div style={{ flex: 1, overflow: "auto", padding: "6px 10px" }}>
        {groups.map((g, gi) => (
          <div key={gi} style={{ marginBottom: 10 }}>
            {g.section && (
              <div style={{ padding: "8px 10px 4px", fontSize: 11, fontWeight: 600, letterSpacing: "0.06em", textTransform: "uppercase", color: "var(--muted-foreground)" }}>
                {g.section}
              </div>
            )}
            {g.items.map((it) => {
              const on = active === it.key;
              return (
                <button
                  key={it.key}
                  onClick={() => onSelect && onSelect(it.key)}
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: 10,
                    width: "100%",
                    padding: "9px 10px",
                    marginBottom: 2,
                    border: "none",
                    borderRadius: "var(--radius-md)",
                    background: on ? "var(--sidebar-primary)" : "transparent",
                    color: on ? "var(--sidebar-primary-foreground)" : "var(--sidebar-foreground)",
                    fontSize: "var(--text-body)",
                    fontWeight: on ? 600 : 500,
                    letterSpacing: "-0.01em",
                    cursor: "pointer",
                    textAlign: "left",
                    transition: "background-color 120ms ease, color 120ms ease",
                  }}
                  onMouseEnter={(e) => { if (!on) e.currentTarget.style.background = "var(--sidebar-accent)"; }}
                  onMouseLeave={(e) => { if (!on) e.currentTarget.style.background = "transparent"; }}
                >
                  {it.icon && <Icon name={it.icon} size={19} />}
                  <span style={{ flex: 1, whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>{it.label}</span>
                  {it.badge != null && (
                    <span
                      className="tabular"
                      style={{
                        fontSize: 11,
                        fontWeight: 600,
                        padding: "1px 7px",
                        borderRadius: 999,
                        background: on ? "color-mix(in oklch, white 25%, transparent)" : "var(--secondary)",
                        color: on ? "var(--sidebar-primary-foreground)" : "var(--secondary-foreground)",
                      }}
                    >
                      {it.badge}
                    </span>
                  )}
                </button>
              );
            })}
          </div>
        ))}
      </div>
      {footer && <div style={{ padding: "10px 12px", borderTop: "1px solid var(--sidebar-border)" }}>{footer}</div>}
    </nav>
  );
}
