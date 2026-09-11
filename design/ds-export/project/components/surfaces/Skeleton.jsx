import React from "react";

/**
 * Skeleton — 데이터를 기다리는 동안 자리를 잡아두는 회색 덩어리 하나. surfaces에 있지만 카드가 아니다.
 * [스피너를 쓰지 않는다] 스피너는 무엇이 올지 알려주지 않고, 도착하는 순간 화면이 한 번 더 흔들린다.
 * [프리미티브 하나] 카드 모양·목록 모양을 미리 만들지 않는다(SkeletonCard 같은 것을 만들지 말 것) —
 *  화면마다 배치가 다르다. 형태는 화면이 이 덩어리를 배치해서 만든다.
 * [움직임] 은은한 펄스 하나만. 좌우로 훑는 shimmer는 쓰지 않는다 — 한 화면에 12장이 동시에 훑으면 시끄럽다.
 *  prefers-reduced-motion에서는 멈추고 정지 상태로 둔다.
 * [색] --muted만. 채도를 쓰지 않는다. 실제 콘텐츠보다 눈에 띄면 안 된다.
 * [접근성] aria-hidden="true". 감싸는 영역에 aria-busy="true"를 두는 것은 화면의 일이다.
 * [개수] 몇 개를 세우는지는 부품이 정하지 않는다 — 화면 사양이 정한다.
 */
const RADII = { sm: "var(--radius-sm)", md: "var(--radius-md)", full: "999px" };

const CSS = `@keyframes mt-skeleton-pulse{0%,100%{opacity:1}50%{opacity:.55}}
.mt-skeleton{animation:mt-skeleton-pulse 1.6s ease-in-out infinite}
@media (prefers-reduced-motion: reduce){.mt-skeleton{animation:none}}`;

export function Skeleton({ width = "100%", height, radius = "sm", count = 1, style, className, ...rest }) {
  const n = Math.max(1, Math.floor(count) || 1);
  const h = height ?? "calc(var(--text-body) * 1.7)";
  const w = typeof width === "number" ? `${width}px` : width;

  const bar = (i) => (
    <div
      key={i}
      className={["mt-skeleton", className].filter(Boolean).join(" ")}
      aria-hidden="true"
      style={{
        // 마지막 줄은 폭을 60%로 줄인다 — 문단의 끝처럼 보인다.
        width: n > 1 && i === n - 1 ? "60%" : w,
        height: typeof h === "number" ? `${h}px` : h,
        flex: "none",
        background: "var(--muted)",
        borderRadius: RADII[radius] || RADII.sm,
        ...style,
      }}
      {...(n > 1 ? {} : rest)}
    />
  );

  if (n === 1) return <React.Fragment>{bar(0)}<style>{CSS}</style></React.Fragment>;

  return (
    <div aria-hidden="true" style={{ display: "flex", flexDirection: "column", gap: 8, width: w }} {...rest}>
      {Array.from({ length: n }, (_, i) => bar(i))}
      <style>{CSS}</style>
    </div>
  );
}
