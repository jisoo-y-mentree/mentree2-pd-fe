import React from "react";

/**
 * Table — data table. Row hover uses a sage accent (per USAGE-RULES).
 * columns: [{ key, header, align?, width?, render?(row) }]
 */
export function Table({ columns = [], data = [], style, ...rest }) {
  const [hover, setHover] = React.useState(-1);
  return (
    <div
      style={{
        border: "1px solid var(--border)",
        borderRadius: "var(--radius-lg)",
        overflow: "hidden",
        background: "var(--card)",
        ...style,
      }}
      {...rest}
    >
      <table style={{ width: "100%", borderCollapse: "collapse", fontFamily: "var(--font-sans)" }}>
        <thead>
          <tr>
            {columns.map((c) => (
              <th
                key={c.key}
                style={{
                  textAlign: c.align || "left",
                  padding: "11px 16px",
                  fontSize: "var(--text-caption)",
                  fontWeight: 600,
                  color: "var(--muted-foreground)",
                  background: "var(--sage-50)",
                  borderBottom: "1px solid var(--border)",
                  width: c.width,
                  whiteSpace: "nowrap",
                }}
              >
                {c.header}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {data.map((row, i) => (
            <tr
              key={i}
              onMouseEnter={() => setHover(i)}
              onMouseLeave={() => setHover(-1)}
              style={{
                background: hover === i ? "var(--secondary)" : "transparent",
                transition: "background-color 120ms ease",
              }}
            >
              {columns.map((c) => (
                <td
                  key={c.key}
                  style={{
                    textAlign: c.align || "left",
                    padding: "12px 16px",
                    fontSize: "var(--text-body)",
                    color: "var(--foreground)",
                    borderBottom: i === data.length - 1 ? "none" : "1px solid var(--border)",
                    fontVariantNumeric: c.align === "right" ? "tabular-nums" : "normal",
                  }}
                >
                  {c.render ? c.render(row) : row[c.key]}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
