import React from "react";

/**
 * Icon — HugeIcons static SVG recolored to currentColor via CSS mask.
 * The only icon primitive; HugeIcons is the mentree icon set.
 */
export function Icon({ name, size = 20, color, strokeUrl, style, className, ...rest }) {
  const url =
    strokeUrl ||
    `https://cdn.jsdelivr.net/npm/@hugeicons/static/icons/${name}.svg`;
  return (
    <span
      role="img"
      aria-label={name}
      className={className}
      style={{
        display: "inline-block",
        width: size,
        height: size,
        flex: "0 0 auto",
        backgroundColor: color || "currentColor",
        WebkitMask: `url("${url}") center / contain no-repeat`,
        mask: `url("${url}") center / contain no-repeat`,
        ...style,
      }}
      {...rest}
    />
  );
}
