import React from "react";
import { Badge } from "../core/Badge.jsx";
import { Icon } from "../core/Icon.jsx";

/**
 * Tabs — 같은 셸 안에서 내용을 바꾸는 전환(화면을 떠나지 않는다). WAI-ARIA tabs 패턴.
 * [ToggleGroup과의 경계] ToggleGroup=같은 목록의 조건을 바꾼다(면을 채운다) ·
 *  Tabs=내용 자체가 바뀐다(밑줄을 긋는다). 이 시각 차이로 둘을 구별한다 — Tabs는 면을 채우지 않는다.
 * [선택 표시] DS-96 — 높이 4 · 양끝 반원 · --primary 막대, 내용(아이콘 + 라벨 + 카운트) 폭. 아래 1px 구분선 위에 얹는다.
 *  + 라벨 색(--foreground)·굵기. 색만으로 가르지 않는다(WCAG 1.4.1).
 * [크기] size="s"(기본 · 멘토 상세) 라벨 폭 · 높이 42 · --text-body 600/500.
 *  size="l"(Q&A 피드) 컨테이너를 같은 폭으로 나눈다 · 높이 60 · --text-h3 700/500 ·
 *  항목 icon을 라벨 왼쪽에 22 · 간격 8(선택일 때만 --primary, 아니면 --muted-foreground).
 * [fill] DS-111 — 탭들이 줄 폭을 똑같이 나누고(둘이면 반씩) 라벨은 탭 가운데 · 선택 막대가 탭 폭 전체. s · l 둘 다. 기본(없음)은 그대로.
 * [카운트] count를 넘기면 라벨 뒤에 Badge sm — 선택 탭은 status/active(green tint), 미선택은 분류(뉴트럴).
 *  배지는 눌리지 않는다(탭 버튼 안의 표시).
 * [폭] 탭 수 2~10. 줄바꿈하지 않는다(두 줄이 되면 셸 높이가 탭 수에 따라 변한다) — 가로 스크롤 +
 *  스크롤바 감춤 + 가장자리 페이드(더 있다는 신호). 선택 탭이 화면 밖이면 보이는 자리로 스크롤한다.
 * [키보드] 좌우 화살표 이동(disabled 건너뜀) · Home/End · roving tabindex(선택 탭만 Tab 순서).
 * [제어형] value + onChange(next). URL에 담는 화면이 있어 부모가 상태를 가진다.
 */
const FADE = 28;

if (typeof document !== "undefined" && !document.getElementById("mt-tabs-style")) {
  const s = document.createElement("style");
  s.id = "mt-tabs-style";
  s.textContent =
    ".mt-tabs-list{scrollbar-width:none;-ms-overflow-style:none;}" +
    ".mt-tabs-list::-webkit-scrollbar{display:none;}" +
    ".mt-tab:focus-visible{outline:2px solid var(--ring);outline-offset:-2px;border-radius:var(--radius-sm);}";
  document.head.appendChild(s);
}

export function Tabs({
  items = [],
  value,
  onChange,
  idBase = "tabs",
  ariaLabel = "탭",
  size = "s",
  fill = false,
  style,
  ...rest
}) {
  const listRef = React.useRef(null);
  const btnRefs = React.useRef({});
  const [edges, setEdges] = React.useState({ left: false, right: false });

  const updateEdges = React.useCallback(() => {
    const el = listRef.current;
    if (!el) return;
    const max = el.scrollWidth - el.clientWidth;
    setEdges({ left: el.scrollLeft > 1, right: el.scrollLeft < max - 1 });
  }, []);

  React.useEffect(() => {
    updateEdges();
    const el = listRef.current;
    if (!el) return undefined;
    const ro = typeof ResizeObserver !== "undefined" ? new ResizeObserver(updateEdges) : null;
    if (ro) ro.observe(el);
    return () => { if (ro) ro.disconnect(); };
  }, [updateEdges, items.length]);

  // 선택 탭이 화면 밖이면 보이는 자리로(scrollIntoView 대신 컨테이너 스크롤만 움직인다).
  React.useEffect(() => {
    const el = listRef.current;
    const btn = btnRefs.current[value];
    if (!el || !btn) return;
    const left = btn.offsetLeft - FADE;
    const right = btn.offsetLeft + btn.offsetWidth + FADE;
    if (left < el.scrollLeft) el.scrollTo({ left: Math.max(0, left), behavior: "smooth" });
    else if (right > el.scrollLeft + el.clientWidth) el.scrollTo({ left: right - el.clientWidth, behavior: "smooth" });
    updateEdges();
  }, [value, updateEdges]);

  const enabled = items.filter((t) => !t.disabled);

  const move = (dir) => {
    if (enabled.length === 0) return;
    const i = enabled.findIndex((t) => t.value === value);
    const next = dir === "home" ? enabled[0]
      : dir === "end" ? enabled[enabled.length - 1]
      : enabled[(i + (dir === "next" ? 1 : -1) + enabled.length) % enabled.length];
    if (next && onChange) onChange(next.value);
    const btn = btnRefs.current[next && next.value];
    if (btn) btn.focus();
  };

  const onKeyDown = (e) => {
    if (e.key === "ArrowRight") { e.preventDefault(); move("next"); }
    else if (e.key === "ArrowLeft") { e.preventDefault(); move("prev"); }
    else if (e.key === "Home") { e.preventDefault(); move("home"); }
    else if (e.key === "End") { e.preventDefault(); move("end"); }
  };

  return (
    <div style={{ position: "relative", width: "100%", ...style }} {...rest}>
      <div
        ref={listRef}
        className="mt-tabs-list"
        role="tablist"
        aria-label={ariaLabel}
        onScroll={updateEdges}
        onKeyDown={onKeyDown}
        style={{
          display: "flex",
          alignItems: "stretch",
          // DS-111 — fill 이면 탭 사이 간격 없이 줄 폭을 똑같이 나눈다
          gap: size === "l" || fill ? 0 : 4,
          overflowX: "auto",
          overflowY: "hidden",
          flexWrap: "nowrap",
          borderBottom: "1px solid var(--border)",
          fontFamily: "var(--font-sans)",
        }}
      >
        {items.map((t) => {
          const on = t.value === value;
          return (
            <TabButton
              key={t.value}
              tab={t}
              selected={on}
              size={size}
              fill={fill}
              idBase={idBase}
              onSelect={() => { if (!t.disabled && onChange) onChange(t.value); }}
              buttonRef={(el) => { btnRefs.current[t.value] = el; }}
            />
          );
        })}
      </div>
      {/* 가장자리 페이드 — 더 있다는 신호. 클릭을 막지 않는다. */}
      {edges.left && <span aria-hidden="true" style={{ position: "absolute", left: 0, top: 0, bottom: 1, width: FADE, pointerEvents: "none", background: "linear-gradient(to right, var(--background), transparent)" }} />}
      {edges.right && <span aria-hidden="true" style={{ position: "absolute", right: 0, top: 0, bottom: 1, width: FADE, pointerEvents: "none", background: "linear-gradient(to left, var(--background), transparent)" }} />}
    </div>
  );
}

function TabButton({ tab, selected, size, fill, idBase, onSelect, buttonRef }) {
  const [hover, setHover] = React.useState(false);
  const L = size === "l";
  const color = tab.disabled
    ? "var(--sage-400)"
    : selected ? "var(--foreground)" : hover ? "var(--sage-700)" : "var(--muted-foreground)";
  return (
    <button
      type="button"
      role="tab"
      className="mt-tab"
      ref={buttonRef}
      id={`${idBase}-tab-${tab.value}`}
      aria-selected={selected}
      aria-controls={`${idBase}-panel-${tab.value}`}
      aria-disabled={tab.disabled || undefined}
      tabIndex={selected ? 0 : -1}
      disabled={tab.disabled}
      onClick={onSelect}
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
      style={{
        display: "inline-flex",
        alignItems: "stretch",
        justifyContent: "center",
        // DS-111 — fill: 같은 폭(1 1 0) · 막대 기준이 되도록 relative
        flex: L || fill ? "1 1 0" : "0 0 auto",
        minWidth: L || fill ? 0 : undefined,
        position: fill ? "relative" : undefined,
        height: L ? 60 : 42,
        padding: "0 12px",
        margin: 0,
        border: "none",
        background: "transparent",
        marginBottom: -1,
        color,
        fontFamily: "var(--font-sans)",
        fontSize: L ? "var(--text-h3)" : "var(--text-body)",
        fontWeight: selected ? (L ? 700 : 600) : 500,
        lineHeight: 1,
        whiteSpace: "nowrap",
        cursor: tab.disabled ? "not-allowed" : "pointer",
        opacity: tab.disabled ? 0.6 : 1,
        transition: "color 150ms ease",
      }}
    >
      <span style={{ position: "relative", display: "inline-flex", alignItems: "center", gap: L ? 8 : 6 }}>
        {L && tab.icon && <Icon name={tab.icon} size={22} aria-hidden="true" aria-label={undefined} role={undefined} style={{ color: selected ? "var(--primary)" : "var(--muted-foreground)", transition: "background-color 150ms ease" }} />}
        {tab.label}
        {tab.count != null && (
          <Badge size="sm" variant={selected ? "status" : "category"} status={selected ? "active" : undefined}>
            {tab.count}
          </Badge>
        )}
        {selected && !fill && <span aria-hidden="true" style={{ position: "absolute", left: 0, right: 0, bottom: 0, height: 4, borderRadius: 2, background: "var(--primary)" }} />}
      </span>
      {selected && fill && <span aria-hidden="true" style={{
        // DS-111 — fill: 선택 막대가 탭 폭 전체(높이 4 · 양끝 반원 · --primary 그대로)
        position: "absolute", left: 0, right: 0, bottom: 0, height: 4, borderRadius: 2, background: "var(--primary)",
      }} />}
    </button>
  );
}

/** 탭 패널 — Tabs와 같은 idBase를 넘긴다. 선택된 값만 렌더한다. */
export function TabPanel({ idBase = "tabs", value, children, style, ...rest }) {
  return (
    <div
      role="tabpanel"
      id={`${idBase}-panel-${value}`}
      aria-labelledby={`${idBase}-tab-${value}`}
      tabIndex={0}
      style={{ paddingTop: 16, fontFamily: "var(--font-sans)", color: "var(--foreground)", ...style }}
      {...rest}
    >
      {children}
    </div>
  );
}
