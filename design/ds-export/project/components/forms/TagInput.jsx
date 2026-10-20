import React from "react";
import { Chip } from "../core/Chip.jsx";
import { IconButton } from "../core/IconButton.jsx";

/**
 * TagInput — 태그를 넣고 빼는 폼 필드. qna-compose의 본체.
 *  Chip을 대체하지 않는다 — Chip을 담는다. 화면에 보이는 태그는 전부 Chip md다(입력된 것=onRemove,
 *  제안=onClick, 둘 다 --muted 기본색 그대로 — 같은 "태그" 데이터가 화면마다 색이 다르면 안 된다).
 *  자리와 ✕ 유무로만 가른다: 입력된 것은 위(입력 줄)에 있고 ✕가 붙는다, 제안은 아래(제안 줄)에 있고 ✕가 없다.
 *
 *  바깥 상자는 Input의 테두리·radius·포커스 링 값을 그대로 가져와 쓴다(새 토큰 없음). 안쪽 어디에
 *  포커스가 있어도(칩의 ✕ 버튼, 텍스트 입력) 링은 상자 자체에 그린다 — focusin/focusout을 상자 레벨에서 추적.
 *
 *  제안 줄은 하나뿐이고 갈아끼운다(쌓지 않음) — 입력 0~1글자="추천 태그"(suggestions 최대 5),
 *  2글자 이상="이런 태그가 있어요"(completions 최대 3, 0건이면 "+ "<입력값>" 추가" 칩 1개로 자유입력 허용).
 *  정렬·필터·글자수 판정 이상의 로직은 부품이 하지 않는다 — suggestions/completions는 바깥이 이미 정렬해
 *  넘긴 배열이고, 부품은 ①자르기 ②이미 넣은 것 빼기 ③어느 목록을 보일지 고르기만 한다.
 *
 *  10개(max)가 차면 입력·+ 버튼을 비활성하고 제안 줄을 숨긴다. 카운터는 --primary로(에러 아닌 한계라 빨강 아님).
 */
export function TagInput({
  value,
  onChange,
  suggestions = [],
  completions = [],
  max = 10,
  placeholder = "태그 입력하기",
  disabled = false,
  invalid = false,
  inputValue,
  onInputChange,
  id,
  style,
  ...rest
}) {
  const [internalInput, setInternalInput] = React.useState("");
  const [highlightIndex, setHighlightIndex] = React.useState(-1);
  const [expanded, setExpanded] = React.useState(true);
  const [boxFocused, setBoxFocused] = React.useState(false);
  const boxRef = React.useRef(null);
  const counterId = id ? `${id}-count` : undefined;

  const current = inputValue !== undefined ? inputValue : internalInput;
  const setCurrent = (v) => { if (onInputChange) onInputChange(v); else setInternalInput(v); };

  const atMax = value.length >= max;
  const trimmed = current.trim();
  const already = new Set(value);
  const mode = trimmed.length >= 2 ? "completion" : "suggestion";
  const rawList = (mode === "completion" ? completions : suggestions).filter((t) => !already.has(t));
  const list = mode === "completion" ? rawList.slice(0, 3) : rawList.slice(0, 5);
  const showAddCustom = mode === "completion" && list.length === 0 && trimmed.length > 0;
  const items = showAddCustom ? [{ type: "add", value: trimmed }] : list.map((t) => ({ type: "tag", value: t }));
  const suggestionLabel = mode === "completion" ? "이런 태그가 있어요" : "추천 태그";
  const showSuggestionRow = !atMax && !disabled && expanded && items.length > 0;

  const commit = (raw) => {
    const cleaned = raw.trim().replace(/^#+/, "").trim();
    setHighlightIndex(-1);
    if (!cleaned) return;
    if (atMax) return;
    if (already.has(cleaned)) { setCurrent(""); return; }
    onChange([...value, cleaned]);
    setCurrent("");
    setExpanded(true);
  };

  const handleKeyDown = (e) => {
    if (e.nativeEvent.isComposing) return; // 조합 중에는 아무 키도 가로채지 않는다
    if (disabled || atMax) return;
    if (e.key === "Escape") { setExpanded(false); setHighlightIndex(-1); return; }
    if (e.key === "ArrowDown") { if (items.length) { e.preventDefault(); setExpanded(true); setHighlightIndex((i) => (i + 1) % items.length); } return; }
    if (e.key === "ArrowUp") { if (items.length) { e.preventDefault(); setExpanded(true); setHighlightIndex((i) => (i <= 0 ? items.length - 1 : i - 1)); } return; }
    if (e.key === "Enter") { e.preventDefault(); commit(highlightIndex >= 0 && items[highlightIndex] ? items[highlightIndex].value : current); return; }
    if (e.key === "," || e.key === " ") { e.preventDefault(); commit(current); return; }
    if (e.key === "Backspace" && current === "") { if (value.length) onChange(value.slice(0, -1)); return; }
  };

  const handleInputChange = (e) => { setCurrent(e.target.value); setHighlightIndex(-1); setExpanded(true); };

  const borderColor = invalid ? "var(--destructive)" : boxFocused ? "var(--ring)" : "var(--input)";

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 4, ...style }} {...rest}>
      <div
        ref={boxRef}
        role="group"
        aria-disabled={disabled || undefined}
        aria-label="태그"
        onFocus={() => setBoxFocused(true)}
        onBlur={(e) => { if (!e.currentTarget.contains(e.relatedTarget)) setBoxFocused(false); }}
        style={{
          display: "flex",
          flexDirection: "column",
          background: disabled ? "var(--muted)" : "var(--card)",
          border: `1px solid ${borderColor}`,
          borderRadius: "var(--radius-md)",
          boxShadow: boxFocused ? "0 0 0 3px color-mix(in oklch, var(--ring) 30%, transparent)" : "none",
          transition: "border-color 150ms ease, box-shadow 150ms ease",
          opacity: disabled ? 0.6 : 1,
        }}
      >
        <div style={{ display: "flex", flexWrap: "wrap", alignItems: "center", gap: 6, padding: "8px 8px 8px 11px", minHeight: 38 }}>
          {value.map((tag, i) => (
            <Chip key={tag + i} size="md" prefix="#" removeAriaLabel={`${tag} 삭제`} onRemove={disabled ? undefined : () => onChange(value.filter((_, idx) => idx !== i))}>
              {tag}
            </Chip>
          ))}
          <input
            id={id}
            type="text"
            value={current}
            disabled={disabled || atMax}
            placeholder={value.length === 0 ? placeholder : ""}
            aria-label={placeholder}
            aria-describedby={counterId}
            onChange={handleInputChange}
            onKeyDown={handleKeyDown}
            style={{
              flex: "1 1 80px",
              minWidth: 80,
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
          <IconButton
            icon="add-01"
            variant="ghost"
            size="sm"
            ariaLabel="태그 추가"
            disabled={disabled || atMax || !current.trim()}
            onClick={() => commit(current)}
          />
        </div>

        {showSuggestionRow && (
          <div aria-live="polite" style={{ display: "flex", flexWrap: "wrap", alignItems: "center", gap: 8, padding: "10px 11px 11px", borderTop: "1px solid var(--border)" }}>
            <span style={{ fontSize: "var(--text-caption)", color: "var(--muted-foreground)", flex: "0 0 auto" }}>{suggestionLabel}</span>
            <div style={{ display: "flex", flexWrap: "wrap", gap: 6 }}>
              {items.map((it, i) => (
                <Chip
                  key={it.value + i}
                  size="md"
                  prefix={it.type === "add" ? "+" : "#"}
                  onClick={() => commit(it.value)}
                  style={highlightIndex === i ? { boxShadow: "inset 0 0 0 1px var(--ring)" } : undefined}
                >
                  {it.type === "add" ? `"${it.value}" 추가` : it.value}
                </Chip>
              ))}
            </div>
          </div>
        )}
      </div>
      <span
        id={counterId}
        style={{
          alignSelf: "flex-end",
          fontSize: "var(--text-caption)",
          color: atMax ? "var(--primary)" : "var(--muted-foreground)",
          fontWeight: atMax ? 600 : 400,
        }}
      >
        {value.length}/{max}
      </span>
    </div>
  );
}
