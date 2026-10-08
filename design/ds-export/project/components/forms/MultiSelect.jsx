import React from "react";
import { Icon } from "../core/Icon.jsx";
import { Chip } from "../core/Chip.jsx";
import { Popover } from "../overlays/Popover.jsx";

/**
 * MultiSelect — 여러 개를 고르는 셀렉트(DS-71). Select를 고치지 않은 새 부품. 트리거·목록·키보드는 Select에 맞춘다.
 *  [칩 줄] 고른 것은 트리거 위에 Chip(md)으로 선다(⊗ = 빼기, 「{이름} 빼기」). 넘치면 여러 줄로 접힌다.
 *  [트리거] 고른 것이 있어도 placeholder를 둔다(--muted-foreground). 높이 40 · Input과 같은 겉모양.
 *  [목록] Popover · 트리거 아래 4px · 트리거 폭 · max-height 320. 항목마다 체크 상자. 항목을 눌러도 닫지 않는다.
 *   role="listbox" + aria-multiselectable="true", 항목 aria-selected. groups를 주면 묶음 제목(고를 수 없음).
 *  [키보드] Enter/Space/↓로 열기 · ↑↓ Home End 커서 · Space/Enter 켜고 끄기 · 첫 글자로 건너뛰기 · Esc/바깥/Tab 닫기.
 */

const MAX_LIST_H = 320;
const norm = (o) => (typeof o === "string" ? { value: o, label: o } : o);

if (typeof document !== "undefined" && !document.getElementById("mt-multiselect-style")) {
  const s = document.createElement("style");
  s.id = "mt-multiselect-style";
  s.textContent = ".mt-multiselect-option:hover{background:var(--muted);}";
  document.head.appendChild(s);
}

export function MultiSelect({
  options = [],
  groups,
  value = [],
  onChange,
  placeholder,
  invalid = false,
  disabled = false,
  id,
  style,
  ...rest
}) {
  const rows = React.useMemo(() => {
    if (groups) {
      const r = [];
      groups.forEach((g, gi) => {
        if (g.label) r.push({ type: "group", label: g.label, key: `g${gi}` });
        (g.options || []).forEach((o) => r.push({ type: "opt", ...norm(o) }));
      });
      return r;
    }
    return options.map((o) => ({ type: "opt", ...norm(o) }));
  }, [options, groups]);
  const opts = React.useMemo(() => rows.filter((r) => r.type === "opt"), [rows]);
  const labelOf = (v) => (opts.find((o) => o.value === v) || { label: v }).label;

  const [open, setOpen] = React.useState(false);
  const [focused, setFocused] = React.useState(false);
  const [side, setSide] = React.useState("bottom");
  const [cursor, setCursor] = React.useState(0);
  const triggerRef = React.useRef(null);
  const wasOpenOnDown = React.useRef(false);
  const typeBuf = React.useRef({ s: "", t: 0 });
  const autoId = React.useId();
  const baseId = id || `mt-ms-${autoId.replace(/:/g, "")}`;
  const listId = `${baseId}-list`;

  const openList = () => {
    if (disabled) return;
    const el = triggerRef.current;
    if (el) {
      const r = el.getBoundingClientRect();
      const need = Math.min(MAX_LIST_H, rows.length * 36 + 8) + 8;
      setSide(window.innerHeight - r.bottom < need && r.top > need ? "top" : "bottom");
    }
    const first = opts.findIndex((o) => value.includes(o.value));
    setCursor(first < 0 ? 0 : first);
    setOpen(true);
  };

  const toggle = (i) => {
    const o = opts[i];
    if (!o || !onChange) return;
    onChange(value.includes(o.value) ? value.filter((v) => v !== o.value) : [...value, o.value]);
  };
  const remove = (v) => onChange && onChange(value.filter((x) => x !== v));

  React.useEffect(() => {
    if (!open) return;
    const list = document.getElementById(listId);
    const item = document.getElementById(`${listId}-${cursor}`);
    if (!list || !item) return;
    const top = item.offsetTop;
    const bottom = top + item.offsetHeight;
    if (top < list.scrollTop) list.scrollTop = Math.max(0, top - 28);
    else if (bottom > list.scrollTop + list.clientHeight) list.scrollTop = bottom - list.clientHeight;
  }, [open, cursor, listId]);

  const typeahead = (ch) => {
    const now = Date.now();
    const buf = now - typeBuf.current.t > 600 ? ch : typeBuf.current.s + ch;
    typeBuf.current = { s: buf, t: now };
    const q = buf.toLowerCase();
    const start = buf.length === 1 ? cursor + 1 : cursor;
    for (let k = 0; k < opts.length; k++) {
      const i = (start + k) % opts.length;
      if (String(opts[i].label).toLowerCase().startsWith(q)) { setCursor(i); return true; }
    }
    return false;
  };

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
    else if (e.key === "Enter" || e.key === " ") { e.preventDefault(); toggle(cursor); }
    else if (e.key === "Tab") { setOpen(false); }
    else if (e.key.length === 1 && !e.ctrlKey && !e.metaKey && !e.altKey) { if (typeahead(e.key)) e.preventDefault(); }
    // Esc는 Popover가 처리한다(닫히면 포커스가 트리거로 돌아온다).
  };

  const borderColor = invalid ? "var(--destructive)" : focused || open ? "var(--ring)" : "var(--input)";
  let optIndex = -1;

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 8, ...style }}>
      {value.length > 0 && (
        <div style={{ display: "flex", flexWrap: "wrap", gap: 8 }}>
          {value.map((v) => (
            <Chip key={v} size="md" disabled={disabled} onRemove={disabled ? undefined : () => remove(v)} removeAriaLabel={`${labelOf(v)} 빼기`}>
              {labelOf(v)}
            </Chip>
          ))}
        </div>
      )}
      <div style={{ position: "relative" }}>
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
          onPointerDown={() => { wasOpenOnDown.current = open; }}
          onClick={() => { if (open || wasOpenOnDown.current) { setOpen(false); wasOpenOnDown.current = false; } else openList(); }}
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
            color: "var(--muted-foreground)",
            cursor: disabled ? "not-allowed" : "pointer",
          }}
        >
          <span style={{ flex: 1, overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>{placeholder}</span>
          <Icon
            name="arrow-down-01"
            size={16}
            style={{ position: "absolute", right: 11, color: "var(--muted-foreground)", pointerEvents: "none", transform: open ? "rotate(180deg)" : "none", transition: "transform 150ms ease" }}
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
          aria-multiselectable="true"
          aria-labelledby={baseId}
          style={{ width: "100%", maxHeight: MAX_LIST_H, overflowY: "auto", boxSizing: "border-box" }}
        >
          {rows.map((r) => {
            if (r.type === "group") {
              return (
                <div key={r.key} role="presentation" style={{ flex: "0 0 auto", padding: "10px 10px 4px", fontFamily: "var(--font-sans)", fontSize: "var(--text-micro)", lineHeight: "var(--text-micro--line-height)", letterSpacing: "var(--text-micro--letter-spacing)", fontWeight: 600, color: "var(--muted-foreground)" }}>
                  {r.label}
                </div>
              );
            }
            optIndex += 1;
            const i = optIndex;
            const isSel = value.includes(r.value);
            const isCur = i === cursor;
            return (
              <div
                key={r.value}
                id={`${listId}-${i}`}
                className="mt-multiselect-option"
                role="option"
                aria-selected={isSel}
                onMouseDown={(e) => e.preventDefault()}
                onClick={() => { setCursor(i); toggle(i); }}
                onMouseEnter={() => setCursor(i)}
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: 10,
                  flex: "0 0 auto",
                  height: 36,
                  boxSizing: "border-box",
                  padding: "0 10px",
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
                <span
                  aria-hidden="true"
                  style={{
                    flex: "0 0 auto",
                    display: "inline-flex",
                    alignItems: "center",
                    justifyContent: "center",
                    width: 16,
                    height: 16,
                    boxSizing: "border-box",
                    borderRadius: 4,
                    border: `1px solid ${isSel ? "var(--primary)" : "var(--input)"}`,
                    background: isSel ? "var(--primary)" : "var(--card)",
                    color: "var(--primary-foreground)",
                  }}
                >
                  {isSel && <Icon name="tick-02" size={12} />}
                </span>
                <span style={{ flex: 1, overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>{r.label}</span>
              </div>
            );
          })}
        </Popover>
      </div>
    </div>
  );
}
