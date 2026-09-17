import React from "react";
import { Icon } from "../core/Icon.jsx";
import { Popover } from "../overlays/Popover.jsx";

/**
 * Select — 네이티브 <select>를 버린 커스텀 리스트박스. 껍데기만 우리 것이고 목록은 OS가 그리던 문제
 *  (목록이 트리거를 덮고 뜸 · ✓가 왼쪽 · 면/테두리/radius가 우리 토큰이 아님 · placeholder가 첫 항목으로 들어감 ·
 *  브라우저마다 다름)를 없앤다. 새 오버레이를 만들지 않고 `overlays/Popover`를 쓴다 —
 *  트리거를 position:relative 상자에 넣고 Popover를 형제로 둔다(AnswerCard 방식).
 *
 * [트리거] role="combobox" · 높이 40(Input·SearchInput과 같다) · padding 0 36 0 12 · --text-body/lh 1/자간 0(컨트롤 예외).
 *  값 없음=placeholder를 --muted-foreground로. 화살표 arrow-down-01 16(우측 11), 열리면 180도(150ms).
 * [목록] role="listbox" · 트리거 아래 4px · 폭=트리거와 같다(minWidth 0 + width 100%) · max-height 320(넘으면 스크롤).
 *  항목 36 높이 · 좌 10/우 32 · radius-sm · --text-body. 커서 얹힘=--muted 면(초록 반전을 쓰지 않는다 — 목록에서 너무 세다).
 *  선택된 항목은 우측 tick-02 14, --primary.
 * [placeholder는 항목이 아니다] 목록에 넣지 않는다. 비우는 항목도 만들지 않는다(필요해지면 그때).
 * [아래 공간] 트리거 rect로 재서 남은 높이 < 목록 높이 + 8이면 side="top".
 * [키보드] Enter/Space/↓로 열기 · ↑↓ 커서(순환하지 않음) · Home/End · Enter 확정 · Esc 버리고 닫기 · Tab 닫기.
 *  열 때 커서는 선택된 항목(없으면 첫 항목). typeahead 없음.
 * [경계] `FilterSelect`는 다른 부품이다(모달) — 이것과 무관. 모바일에서도 같은 팝오버다(Sheet로 바꾸지 않는다).
 */

const MAX_LIST_H = 320;

if (typeof document !== "undefined" && !document.getElementById("mt-select-option-style")) {
  const s = document.createElement("style");
  s.id = "mt-select-option-style";
  s.textContent = ".mt-select-option:hover{background:var(--muted);color:var(--foreground);}";
  document.head.appendChild(s);
}

const norm = (o) => (typeof o === "string" ? { value: o, label: o } : o);

export function Select({ options = [], placeholder, invalid = false, disabled = false, value, onChange, id, style, ...rest }) {
  const opts = React.useMemo(() => options.map(norm), [options]);
  const [open, setOpen] = React.useState(false);
  const [focused, setFocused] = React.useState(false);
  const [side, setSide] = React.useState("bottom");
  const selectedIndex = opts.findIndex((o) => o.value === value);
  const [cursor, setCursor] = React.useState(selectedIndex < 0 ? 0 : selectedIndex);
  const triggerRef = React.useRef(null);
  const baseId = React.useMemo(() => id || `mt-select-${Math.random().toString(36).slice(2, 8)}`, [id]);
  const listId = `${baseId}-list`;
  const selected = selectedIndex >= 0 ? opts[selectedIndex] : null;

  const openList = () => {
    if (disabled) return;
    const el = triggerRef.current;
    if (el) {
      const r = el.getBoundingClientRect();
      const need = Math.min(MAX_LIST_H, opts.length * 36 + 8) + 8;
      setSide(window.innerHeight - r.bottom < need ? "top" : "bottom");
    }
    setCursor(selectedIndex < 0 ? 0 : selectedIndex);
    setOpen(true);
  };

  const commit = (i) => {
    const o = opts[i];
    if (o && onChange) onChange(o.value);
    setOpen(false);
  };

  // 커서 항목이 목록 밖이면 스크롤로 끌어온다(scrollIntoView는 쓰지 않는다).
  React.useEffect(() => {
    if (!open) return;
    const list = document.getElementById(listId);
    const item = document.getElementById(`${listId}-${cursor}`);
    if (!list || !item) return;
    const top = item.offsetTop;
    const bottom = top + item.offsetHeight;
    if (top < list.scrollTop) list.scrollTop = top;
    else if (bottom > list.scrollTop + list.clientHeight) list.scrollTop = bottom - list.clientHeight;
  }, [open, cursor, listId]);

  const onKeyDown = (e) => {
    if (disabled) return;
    if (!open) {
      if (e.key === "Enter" || e.key === " " || e.key === "ArrowDown") { e.preventDefault(); openList(); }
      return;
    }
    if (e.key === "ArrowDown") { e.preventDefault(); setCursor((c) => Math.min(opts.length - 1, c + 1)); }
    else if (e.key === "ArrowUp") { e.preventDefault(); setCursor((c) => Math.max(0, c - 1)); }
    else if (e.key === "Home") { e.preventDefault(); setCursor(0); }
    else if (e.key === "End") { e.preventDefault(); setCursor(opts.length - 1); }
    else if (e.key === "Enter" || e.key === " ") { e.preventDefault(); commit(cursor); }
    else if (e.key === "Tab") { setOpen(false); }
    // Esc는 Popover가 처리한다(닫히면 포커스가 triggerRef로 돌아온다).
  };

  const borderColor = invalid ? "var(--destructive)" : focused || open ? "var(--ring)" : "var(--input)";

  return (
    <div style={{ position: "relative", ...style }}>
      <button
        type="button"
        id={baseId}
        ref={triggerRef}
        role="combobox"
        aria-expanded={open}
        aria-haspopup="listbox"
        aria-controls={open ? listId : undefined}
        aria-activedescendant={open ? `${listId}-${cursor}` : undefined}
        aria-invalid={invalid || undefined}
        disabled={disabled}
        onClick={() => (open ? setOpen(false) : openList())}
        onKeyDown={onKeyDown}
        onFocus={() => setFocused(true)}
        onBlur={() => setFocused(false)}
        {...rest}
        style={{
          position: "relative",
          display: "flex",
          alignItems: "center",
          width: "100%",
          height: 40,
          boxSizing: "border-box",
          padding: "0 36px 0 12px",
          textAlign: "left",
          background: disabled ? "var(--muted)" : "var(--card)",
          border: `1px solid ${borderColor}`,
          borderRadius: "var(--radius-md)",
          boxShadow: focused || open ? "0 0 0 3px color-mix(in oklch, var(--ring) 30%, transparent)" : "none",
          transition: "border-color 150ms ease, box-shadow 150ms ease",
          opacity: disabled ? 0.6 : 1,
          outline: "none",
          fontFamily: "var(--font-sans)",
          fontSize: "var(--text-body)",
          lineHeight: 1,
          letterSpacing: 0,
          color: selected ? "var(--foreground)" : "var(--muted-foreground)",
          cursor: disabled ? "not-allowed" : "pointer",
        }}
      >
        <span style={{ flex: 1, overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>
          {selected ? selected.label : placeholder}
        </span>
        <Icon
          name="arrow-down-01"
          size={16}
          style={{
            position: "absolute",
            right: 11,
            color: "var(--muted-foreground)",
            pointerEvents: "none",
            transform: open ? "rotate(180deg)" : "none",
            transition: "transform 150ms ease",
          }}
        />
      </button>
      <Popover
        open={open}
        onClose={() => setOpen(false)}
        side={side}
        align="start"
        minWidth={0}
        triggerRef={triggerRef}
        id={listId}
        role="listbox"
        aria-labelledby={baseId}
        style={{ width: "100%", maxHeight: MAX_LIST_H, overflowY: "auto", boxSizing: "border-box" }}
      >
        {opts.map((o, i) => {
          const isSel = o.value === value;
          const isCur = i === cursor;
          return (
            <div
              key={o.value}
              id={`${listId}-${i}`}
              data-i={i}
              className="mt-select-option"
              role="option"
              aria-selected={isSel}
              onClick={() => commit(i)}
              onMouseEnter={() => setCursor(i)}
              style={{
                position: "relative",
                display: "flex",
                alignItems: "center",
                flex: "0 0 auto",
                height: 36,
                boxSizing: "border-box",
                padding: "0 32px 0 10px",
                borderRadius: "var(--radius-sm)",
                background: isCur ? "var(--muted)" : "transparent",
                color: "var(--foreground)",
                fontFamily: "var(--font-sans)",
                fontSize: "var(--text-body)",
                lineHeight: 1,
                letterSpacing: 0,
                cursor: "pointer",
              }}
            >
              <span style={{ flex: 1, overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>{o.label}</span>
              {isSel && (
                <Icon name="tick-02" size={14} style={{ position: "absolute", right: 10, color: "var(--primary)" }} />
              )}
            </div>
          );
        })}
      </Popover>
    </div>
  );
}
