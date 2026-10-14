import React from "react";

/**
 * Icon — HugeIcons static SVG recolored to currentColor via CSS mask.
 * The only icon primitive; HugeIcons is the mentree icon set.
 * DS 자체 아이콘(LOCAL) — 이름이 여기 있으면 CDN 대신 이것을 쓴다. 원본은 assets/icons/<이름>.svg.
 *  마스크 url 은 문서 기준으로 풀려 소비처마다 경로가 달라지므로, 같은 파일 내용을 data URI 로 싣는다.
 *  answer-done(DS-96) — 둥근 말풍선(타원 호 몸통 · 꼬리 오른쪽 아래 · 체크 하나). 3회차 지시의 경로 그대로. HugeIcons 경로를 복사 · 뒤집지 않았다(패키지는 「있는 그대로만 사용」).
 */
const LOCAL = {
  "answer-done":
    '<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#000" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><path d="M19.28 17.29A9.5 9 0 1 0 16.01 19.66Q18.4 20.75 21 21.25Q19.95 19.45 19.28 17.29Z"/><path d="M8.25 11.75L10.75 14.25L15.75 9.25"/></svg>',
};

export function Icon({ name, size = 20, color, strokeUrl, style, className, ...rest }) {
  const url =
    strokeUrl ||
    (LOCAL[name] ? `data:image/svg+xml;utf8,${encodeURIComponent(LOCAL[name])}` : null) ||
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
