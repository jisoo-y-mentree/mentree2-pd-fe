import React from "react";
import { Icon } from "../core/Icon.jsx";
import { IconButton } from "../core/IconButton.jsx";
import { Chip } from "../core/Chip.jsx";

/**
 * SearchInput — 자동완성·최근 검색어가 붙는 검색창. TagInput(DS-26)과 같은 골격(한 자리를 갈아끼운다) —
 *  다른 점 하나: 제안 줄이 상자 안이 아니라 바깥에 뜬다(떠 있는 드롭다운, 상자를 덮거나 밀지 않는다).
 *  포커스+입력 빈값=최근 검색어, 입력 중=자동완성. 둘을 쌓지 않는다(갈아끼움).
 *  자동완성 0건이면 드롭다운을 닫는다("결과 없음"을 띄우지 않는다 — 아래 목록이 이미 답한다).
 *  정렬·필터·개수 제한은 부품이 하지 않는다 — completions/recent는 바깥이 이미 정렬해 넘긴 배열이다.
 */
function highlightMatch(item, query) {
  if (!query) return item;
  const idx = item.toLowerCase().indexOf(query.toLowerCase());
  if (idx === -1) return item;
  return (
    <React.Fragment>
      {item.slice(0, idx)}
      <span style={{ color: "var(--primary)", fontWeight: 600 }}>{item.slice(idx, idx + query.length)}</span>
      {item.slice(idx + query.length)}
    </React.Fragment>
  );
}

export function SearchInput({
  value,
  onChange,
  onSearch,
  completions = [],
  recent = [],
  onRemoveRecent,
  placeholder = "검색어를 입력하세요",
  disabled = false,
  invalid = false,
  id,
  autoFocus,
  style,
  ...rest
}) {
  const [focused, setFocused] = React.useState(false);
  const [closedByEsc, setClosedByEsc] = React.useState(false);
  const [highlightIndex, setHighlightIndex] = React.useState(-1);
  const inputRef = React.useRef(null);
  const listboxId = id ? `${id}-listbox` : "search-listbox";

  const typing = value.length > 0;
  const items = typing ? completions : [];
  const showCompletionPanel = focused && !closedByEsc && typing && items.length > 0;
  const showRecentPanel = focused && !closedByEsc && !typing && recent.length > 0;
  const open = showCompletionPanel || showRecentPanel;
  const activeId = showCompletionPanel && highlightIndex >= 0 && items[highlightIndex] ? `${listboxId}-opt-${highlightIndex}` : undefined;

  const commitSearch = (text) => {
    setHighlightIndex(-1);
    if (onSearch) onSearch(text);
  };

  const handleChange = (e) => {
    onChange(e.target.value);
    setHighlightIndex(-1);
    setClosedByEsc(false);
  };

  const handleKeyDown = (e) => {
    if (e.nativeEvent.isComposing) return; // 조합 중에는 아무 키도 가로채지 않는다
    if (e.key === "ArrowDown") {
      if (showCompletionPanel) { e.preventDefault(); setHighlightIndex((i) => (i + 1) % items.length); }
      return;
    }
    if (e.key === "ArrowUp") {
      if (showCompletionPanel) { e.preventDefault(); setHighlightIndex((i) => (i <= 0 ? items.length - 1 : i - 1)); }
      return;
    }
    if (e.key === "Enter") {
      e.preventDefault();
      const chosen = showCompletionPanel && highlightIndex >= 0 && items[highlightIndex] ? items[highlightIndex] : value;
      commitSearch(chosen);
      return;
    }
    if (e.key === "Escape") {
      if (open) { setClosedByEsc(true); setHighlightIndex(-1); }
      else { onChange(""); }
      return;
    }
  };

  const borderColor = invalid ? "var(--destructive)" : focused ? "var(--ring)" : "var(--input)";

  return (
    <div
      style={{ position: "relative", ...style }}
      onFocus={() => { setFocused(true); setClosedByEsc(false); }}
      onBlur={(e) => { if (!e.currentTarget.contains(e.relatedTarget)) { setFocused(false); setClosedByEsc(false); setHighlightIndex(-1); } }}
      {...rest}
    >
      <div
        style={{
          display: "flex",
          alignItems: "center",
          gap: 8,
          height: 40,
          padding: "0 8px 0 11px",
          background: disabled ? "var(--muted)" : "var(--card)",
          border: `1px solid ${borderColor}`,
          borderRadius: "var(--radius-md)",
          boxShadow: focused ? "0 0 0 3px color-mix(in oklch, var(--ring) 30%, transparent)" : "none",
          transition: "border-color 150ms ease, box-shadow 150ms ease",
          opacity: disabled ? 0.6 : 1,
        }}
      >
        <Icon name="search-01" size={18} style={{ color: "var(--muted-foreground)" }} />
        <input
          ref={inputRef}
          id={id}
          type="text"
          role="combobox"
          aria-expanded={open}
          aria-controls={listboxId}
          aria-autocomplete="list"
          aria-activedescendant={activeId}
          value={value}
          disabled={disabled}
          placeholder={placeholder}
          autoFocus={autoFocus}
          onChange={handleChange}
          onKeyDown={handleKeyDown}
          style={{
            flex: 1,
            minWidth: 0,
            border: "none",
            outline: "none",
            background: "transparent",
            fontFamily: "var(--font-sans)",
            fontSize: "var(--text-body)",
            lineHeight: 1,
            letterSpacing: 0,
            color: "var(--foreground)",
          }}
        />
        {value && !disabled && (
          <IconButton
            icon="cancel-01"
            variant="ghost"
            size="sm"
            ariaLabel="검색어 지우기"
            onClick={() => { onChange(""); inputRef.current && inputRef.current.focus(); }}
            style={{ width: 24, height: 24 }}
          />
        )}
      </div>

      {open && (
        <div
          id={listboxId}
          role="listbox"
          style={{
            position: "absolute",
            top: "calc(100% + 4px)",
            left: 0,
            right: 0,
            zIndex: 30,
            display: "flex",
            flexDirection: "column",
            padding: 4,
            borderRadius: "var(--radius-md)",
            background: "var(--card)",
            border: "1px solid var(--border)",
            boxShadow: "var(--shadow-md)",
          }}
        >
          {showCompletionPanel && items.map((it, i) => (
            <div
              key={it + i}
              id={`${listboxId}-opt-${i}`}
              role="option"
              aria-selected={highlightIndex === i}
              onMouseEnter={() => setHighlightIndex(i)}
              onMouseDown={(e) => { e.preventDefault(); commitSearch(it); }}
              style={{
                height: 36,
                display: "flex",
                alignItems: "center",
                padding: "0 12px",
                borderRadius: "var(--radius-sm)",
                fontFamily: "var(--font-sans)",
                fontSize: "var(--text-body)",
                lineHeight: 1,
                letterSpacing: 0,
                color: "var(--foreground)",
                background: highlightIndex === i ? "var(--muted)" : "transparent",
                cursor: "pointer",
              }}
            >
              {highlightMatch(it, value)}
            </div>
          ))}
          {showRecentPanel && (
            <div style={{ display: "flex", flexDirection: "column", gap: 8, padding: "6px 8px" }}>
              <span style={{ fontFamily: "var(--font-sans)", fontSize: "var(--text-caption)", color: "var(--muted-foreground)" }}>최근 검색어</span>
              <div style={{ display: "flex", flexWrap: "wrap", gap: 6 }}>
                {recent.map((r) => (
                  <span key={r} onClick={() => commitSearch(r)} style={{ display: "inline-flex", cursor: "pointer" }}>
                    <Chip size="md" removeAriaLabel={`${r} 삭제`} onRemove={() => onRemoveRecent && onRemoveRecent(r)}>
                      {r}
                    </Chip>
                  </span>
                ))}
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
