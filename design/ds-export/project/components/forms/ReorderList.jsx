import React from "react";
import { Icon } from "../core/Icon.jsx";

/**
 * ReorderList — 순서를 바꾸는 목록(DS-73). 항목 내용은 화면이 renderItem으로 넣는다.
 *  [핸들] 1건이면 감춘다. 2건 이상이면 항목마다 왼쪽 위(첫 칸의 라벨 줄)에 ≡(menu-01).
 *  [끌기] 마우스 = 핸들을 눌러 바로 · 터치 = 핸들을 약 300ms 길게 눌러. 끄는 항목은 --shadow-md로 뜨고
 *   나머지가 비켜서 들어갈 자리를 보인다. 놓으면 onReorder(새 배열).
 *  [키보드] 핸들 포커스 → Space(Enter)로 집기 → ↑↓ 옮기기 → Space로 놓기 · Esc 취소(WCAG 2.1.1).
 *  [알림] aria-live — 「{항목} — N번째로 옮겼습니다」(조사를 항목 이름에 붙이지 않는다).
 *  [움직임] prefers-reduced-motion: reduce면 비키는 전환 없이 자리만 바꾼다.
 */

const LONG_PRESS = 300;
const SLOP = 8;

const moveItem = (arr, from, to) => { const a = arr.slice(); const [x] = a.splice(from, 1); a.splice(to, 0, x); return a; };

if (typeof document !== "undefined" && !document.getElementById("mt-reorder-style")) {
  const s = document.createElement("style");
  s.id = "mt-reorder-style";
  s.textContent = ".mt-reorder-handle:focus-visible{outline:2px solid var(--ring);outline-offset:2px;}.mt-reorder-handle:hover{background:var(--secondary);color:var(--foreground);}";
  document.head.appendChild(s);
}

export function ReorderList({ items = [], renderItem, onReorder, itemLabel, gap = 12, style }) {
  const labelOf = (it, i) => (itemLabel ? itemLabel(it, i) : `${i + 1}번째 항목`);
  const [drag, setDrag] = React.useState(null); // { id, from, to, dy, startY, rects }
  const [grab, setGrab] = React.useState(null); // { id, from }
  const [order, setOrder] = React.useState(null); // 키보드로 옮기는 중의 id 순서
  const [msg, setMsg] = React.useState("");
  const [reduce, setReduce] = React.useState(false);
  const itemRefs = React.useRef({});
  const handleRefs = React.useRef({});
  const dragRef = React.useRef(null);
  dragRef.current = drag;
  const itemsRef = React.useRef(items);
  itemsRef.current = items;
  const pressTimer = React.useRef(null);
  const hintId = React.useId();
  const showHandle = items.length >= 2;

  React.useEffect(() => {
    if (!window.matchMedia) return;
    const m = window.matchMedia("(prefers-reduced-motion: reduce)");
    const f = () => setReduce(m.matches);
    f();
    m.addEventListener("change", f);
    return () => m.removeEventListener("change", f);
  }, []);

  const say = (t) => { setMsg(""); requestAnimationFrame(() => setMsg(t)); };

  const begin = (id, clientY) => {
    const list = itemsRef.current;
    const from = list.findIndex((it) => it.id === id);
    if (from < 0) return;
    const rects = list.map((it) => { const el = itemRefs.current[it.id]; return el ? el.getBoundingClientRect() : { top: 0, height: 0 }; });
    setGrab(null);
    setOrder(null);
    setDrag({ id, from, to: from, dy: 0, startY: clientY, rects });
  };

  React.useEffect(() => {
    if (!drag) return;
    const move = (e) => {
      e.preventDefault && e.cancelable && e.preventDefault();
      setDrag((d) => {
        if (!d) return d;
        const dy = e.clientY - d.startY;
        const r = d.rects[d.from];
        const center = r.top + r.height / 2 + dy;
        let to = 0;
        d.rects.forEach((rc, i) => { if (i !== d.from && center > rc.top + rc.height / 2) to++; });
        return { ...d, dy, to };
      });
    };
    const up = () => {
      const d = dragRef.current;
      setDrag(null);
      if (!d) return;
      const list = itemsRef.current;
      if (d.to !== d.from && onReorder) {
        onReorder(moveItem(list, d.from, d.to));
        const l = labelOf(list[d.from], d.from);
        say(`${l} — ${d.to + 1}번째로 옮겼습니다`);
      }
    };
    window.addEventListener("pointermove", move, { passive: false });
    window.addEventListener("pointerup", up);
    window.addEventListener("pointercancel", up);
    return () => {
      window.removeEventListener("pointermove", move);
      window.removeEventListener("pointerup", up);
      window.removeEventListener("pointercancel", up);
    };
  }, [!!drag]);

  const onHandleDown = (id) => (e) => {
    if (!showHandle || e.button > 0) return;
    if (e.pointerType === "mouse" || !e.pointerType) { e.preventDefault(); begin(id, e.clientY); return; }
    const x0 = e.clientX, y0 = e.clientY;
    const cancel = () => {
      clearTimeout(pressTimer.current);
      window.removeEventListener("pointermove", early);
      window.removeEventListener("pointerup", cancel);
      window.removeEventListener("pointercancel", cancel);
    };
    const early = (ev) => { if (Math.abs(ev.clientX - x0) > SLOP || Math.abs(ev.clientY - y0) > SLOP) cancel(); };
    window.addEventListener("pointermove", early);
    window.addEventListener("pointerup", cancel);
    window.addEventListener("pointercancel", cancel);
    pressTimer.current = setTimeout(() => {
      cancel();
      if (navigator.vibrate) navigator.vibrate(10);
      begin(id, y0);
    }, LONG_PRESS);
  };

  // 키보드
  const current = order ? order.map((id) => items.find((it) => it.id === id)).filter(Boolean) : items;
  const onHandleKey = (id) => (e) => {
    if (!showHandle) return;
    const idx = current.findIndex((it) => it.id === id);
    const l = labelOf(items.find((it) => it.id === id), items.findIndex((it) => it.id === id));
    if (e.key === " " || e.key === "Enter") {
      e.preventDefault();
      if (!grab) {
        setGrab({ id, from: idx });
        setOrder(items.map((it) => it.id));
        say(`${l} — 집었습니다. 위아래 화살표로 옮기고 스페이스로 놓습니다`);
      } else {
        const next = current;
        const changed = next.some((it, i) => it.id !== items[i].id);
        setGrab(null);
        setOrder(null);
        if (changed && onReorder) onReorder(next);
        say(changed ? `${l} — ${idx + 1}번째로 옮겼습니다` : `${l} — 옮기지 않았습니다`);
      }
    } else if (grab && (e.key === "ArrowUp" || e.key === "ArrowDown")) {
      e.preventDefault();
      const to = e.key === "ArrowUp" ? idx - 1 : idx + 1;
      if (to < 0 || to >= current.length) return;
      setOrder(moveItem(current.map((it) => it.id), idx, to));
      say(`${to + 1}번째`);
    } else if (grab && e.key === "Escape") {
      e.preventDefault();
      setGrab(null);
      setOrder(null);
      say(`${l} — 옮기지 않았습니다`);
    }
  };

  // DOM 이동으로 포커스가 빠지면 되돌린다.
  React.useLayoutEffect(() => {
    if (!grab) return;
    const h = handleRefs.current[grab.id];
    if (h && document.activeElement !== h) h.focus({ preventScroll: true });
  }, [order, grab]);

  const shiftFor = (i) => {
    if (!drag || i === drag.from) return 0;
    const h = drag.rects[drag.from].height + gap;
    if (drag.from < drag.to && i > drag.from && i <= drag.to) return -h;
    if (drag.from > drag.to && i >= drag.to && i < drag.from) return h;
    return 0;
  };

  return (
    <div style={{ position: "relative", ...style }}>
      <ul style={{ listStyle: "none", margin: 0, padding: 0, display: "flex", flexDirection: "column", gap }}>
        {current.map((it) => {
          const i = items.findIndex((x) => x.id === it.id);
          const isDrag = drag && drag.id === it.id;
          const isGrab = grab && grab.id === it.id;
          const lifted = isDrag || isGrab;
          const ty = isDrag ? drag.dy : shiftFor(i);
          const l = labelOf(it, i);
          return (
            <li
              key={it.id}
              ref={(el) => { itemRefs.current[it.id] = el; }}
              style={{
                position: "relative",
                zIndex: lifted ? 2 : 1,
                display: "grid",
                gridTemplateColumns: showHandle ? "28px minmax(0, 1fr)" : "minmax(0, 1fr)",
                columnGap: 8,
                alignItems: "start",
                background: "var(--background)",
                borderRadius: "var(--radius-md)",
                boxShadow: lifted ? "var(--shadow-md)" : "none",
                outline: isGrab ? "2px solid var(--ring)" : "none",
                outlineOffset: 4,
                transform: ty ? `translateY(${ty}px)` : "none",
                transition: isDrag || reduce ? "none" : "transform 150ms ease, box-shadow 150ms ease",
              }}
            >
              {showHandle && (
                <button
                  type="button"
                  ref={(el) => { handleRefs.current[it.id] = el; }}
                  className="mt-reorder-handle"
                  aria-label={`${l} 순서 바꾸기`}
                  aria-describedby={hintId}
                  aria-pressed={isGrab ? true : false}
                  onPointerDown={onHandleDown(it.id)}
                  onKeyDown={onHandleKey(it.id)}
                  onContextMenu={(e) => e.preventDefault()}
                  style={{
                    display: "inline-flex",
                    alignItems: "center",
                    justifyContent: "center",
                    width: 28,
                    height: 28,
                    marginTop: -2,
                    padding: 0,
                    border: "none",
                    borderRadius: "var(--radius-sm)",
                    background: isGrab ? "var(--secondary)" : "transparent",
                    color: lifted ? "var(--foreground)" : "var(--muted-foreground)",
                    cursor: isDrag ? "grabbing" : "grab",
                    touchAction: "none",
                    WebkitTouchCallout: "none",
                    userSelect: "none",
                  }}
                >
                  <Icon name="menu-01" size={18} />
                </button>
              )}
              <div style={{ minWidth: 0 }}>{renderItem ? renderItem(it, i) : null}</div>
            </li>
          );
        })}
      </ul>
      <span id={hintId} style={{ position: "absolute", width: 1, height: 1, overflow: "hidden", clip: "rect(0 0 0 0)", whiteSpace: "nowrap" }}>
        Space로 집고 위아래 화살표로 옮긴 뒤 Space로 놓습니다. Esc는 취소입니다.
      </span>
      <div aria-live="assertive" role="status" style={{ position: "absolute", width: 1, height: 1, overflow: "hidden", clip: "rect(0 0 0 0)", whiteSpace: "nowrap" }}>{msg}</div>
    </div>
  );
}
