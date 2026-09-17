import React from "react";
import { Icon } from "./Icon.jsx";
import { FilterChip } from "./FilterChip.jsx";
import { Chip } from "./Chip.jsx";
import { Button } from "./Button.jsx";
import { Dialog } from "../overlays/Dialog.jsx";

/**
 * FilterSelect — 조건 축의 트리거 + 그 모달 한 벌. 국가 19개·직종/키워드 더 많음 — 앵커 팝오버(minWidth 168)에
 *  안 들어가 Dialog로 간다. 새로 만든 것은 트리거와 조립뿐 — Dialog·FilterChip·Chip·Button을 그대로 쓴다.
 *  Popover·Tabs를 쓰지 않는다(그룹 3개면 한 스크롤 안 앵커로 충분 — 모르는 것에 맞춰 미리 만들지 않는다).
 *  트리거는 Button sm 기하. 0개=투명+muted-foreground, 1개 이상=--muted 채움+1px --sage-400+foreground 600
 *  (green 반전은 하지 않는다 — 반전은 안의 FilterChip 것).
 *  모달 안 선택은 "적용" 전까지 로컬 상태로만 쌓인다 — onChange는 적용에서만 부른다. 열 때마다 현재 value로 리셋.
 *  ESC·✕·바깥 클릭은 버린다. "초기화"는 로컬 선택만 비우고 모달은 열어둔다(onChange 호출 없음).
 */
export function FilterSelect({ label, groups = [], value = [], onChange, disabled = false, style, ...rest }) {
  const [open, setOpen] = React.useState(false);
  const [draft, setDraft] = React.useState(value);
  const triggerRef = React.useRef(null);

  const options = React.useMemo(() => groups.flatMap((g) => g.options), [groups]);
  const count = value.length;
  const selectedLabels = options.filter((o) => value.includes(o.value)).map((o) => o.label);
  const triggerText = count === 0 ? label : count === 1 ? selectedLabels[0] : `${selectedLabels[0]} 외 ${count - 1}`;
  const filled = count > 0;

  const openModal = () => { setDraft(value); setOpen(true); };
  const cancel = () => { setOpen(false); triggerRef.current && triggerRef.current.focus(); };
  const apply = () => { if (onChange) onChange(draft); setOpen(false); };
  const reset = () => setDraft([]);
  const toggle = (val) => setDraft((d) => (d.includes(val) ? d.filter((v) => v !== val) : [...d, val]));

  const draftLabels = options.filter((o) => draft.includes(o.value));
  const showSingleGroupTitle = groups.length > 1;

  return (
    <div style={{ display: "inline-block", ...style }} {...rest}>
      <button
        ref={triggerRef}
        type="button"
        aria-haspopup="dialog"
        aria-expanded={open}
        aria-label={`${label}, ${count}개 선택됨`}
        disabled={disabled}
        onClick={openModal}
        style={{
          display: "inline-flex",
          alignItems: "center",
          gap: 6,
          height: 32,
          padding: "0 12px",
          fontFamily: "var(--font-sans)",
          fontSize: "var(--text-caption)",
          fontWeight: filled ? 600 : 500,
          lineHeight: 1,
          letterSpacing: 0,
          whiteSpace: "nowrap",
          borderRadius: "var(--radius-md)",
          background: filled ? "var(--muted)" : "transparent",
          color: filled ? "var(--foreground)" : "var(--muted-foreground)",
          border: filled ? "1px solid var(--sage-400)" : "1px solid var(--border)",
          cursor: disabled ? "not-allowed" : "pointer",
          opacity: disabled ? 0.5 : 1,
          transition: "background-color 150ms ease, color 150ms ease, border-color 150ms ease",
        }}
      >
        {triggerText}
        <Icon name="arrow-down-01" size={14} style={{ transform: open ? "rotate(180deg)" : "none", transition: "transform 150ms ease" }} />
      </button>

      <Dialog
        open={open}
        onClose={cancel}
        title={label}
        width={600}
        footer={
          <div style={{ width: "100%", display: "flex", flexDirection: "column", gap: 12 }}>
            {draftLabels.length > 0 && (
              <div style={{ display: "flex", flexWrap: "wrap", gap: 8 }}>
                {draftLabels.map((o) => (
                  <Chip key={o.value} size="md" removeAriaLabel={`${o.label} 삭제`} onRemove={() => toggle(o.value)}>
                    {o.label}
                  </Chip>
                ))}
              </div>
            )}
            <div style={{ display: "flex", gap: 10 }}>
              <Button variant="outline" size="md" onClick={reset}>초기화</Button>
              <Button variant="primary" size="md" style={{ flex: 1 }} onClick={apply}>
                {draft.length === 0 ? "적용" : `${draft.length}개 적용하기`}
              </Button>
            </div>
          </div>
        }
      >
        <div style={{ maxHeight: "50vh", overflowY: "auto" }}>
          {groups.map((g, gi) => (
            <div key={g.label || gi} role="group" aria-label={g.label || label}>
              {g.label && showSingleGroupTitle && (
                <div style={{ fontSize: "var(--text-body)", fontWeight: 600, color: "var(--foreground)", margin: `${gi === 0 ? 0 : 20}px 0 10px` }}>
                  {g.label}
                </div>
              )}
              <div style={{ display: "flex", flexWrap: "wrap", gap: 8 }}>
                {g.options.map((o) => (
                  <FilterChip
                    key={o.value}
                    selected={draft.includes(o.value)}
                    onChange={() => toggle(o.value)}
                    leading={o.flag ? "flag" : "none"}
                    flag={o.flag}
                  >
                    {o.label}
                  </FilterChip>
                ))}
              </div>
            </div>
          ))}
        </div>
      </Dialog>
    </div>
  );
}
