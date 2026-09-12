import React, { useEffect, useRef } from "react";

/**
 * Popover — 앵커에 붙는 작은 오버레이 껍데기. 위치·면·닫기·포커스만 맡고, 안의 내용은 쓰는 쪽이 정한다.
 *  AnswerCard의 MenuPopover(공유·더보기)와 menuItemStyle을 이 부품으로 흡수한다. Badge의 "+N 펼침"은
 *  넣지 않는다 — 그건 "본다"(정적 펼침)이고 이건 "고른다"(role="menu", 동작이 일어남), 성격이 다르다.
 *  Badge "+N"이 MentorCard 미디어 오버레이 안에서 overflow에 잘리는 문제(DS-06)는 별도 대기 항목이다.
 *
 *  렌더 위치: position:relative인 트리거의 형제로 놓는다(앵커 좌표 계산 없이 CSS만으로 붙는다) —
 *  AnswerCard처럼 <div style={{position:"relative"}}><IconButton/><Popover/></div> 형태.
 *
 *  ⚠️ 모바일 분기는 이 부품의 책임이 아니다 — "공유는 PC에서 클립보드 카피, 모바일에서는 OS공유"라는
 *  와이어대로, 모바일에서 공유를 누르면 이 Popover가 아니라 OS 공유(navigator.share)가 떠야 한다.
 *  그 분기는 화면·카드가 정한다. Popover는 "연다"고 결정된 뒤에만 쓰인다 — 이 분기가 없으면 모바일에서
 *  Popover와 OS공유가 같이 뜬다. 둘 다 안 되는 브라우저의 폴백(클립보드 복사+토스트)은 DS-09(아직 없음).
 */
export function Popover({
  open,
  onClose,
  side = "bottom",
  align = "start",
  minWidth = 168,
  role,
  triggerRef,
  style,
  children,
  ...rest
}) {
  const ref = useRef(null);
  const wasOpen = useRef(open);

  useEffect(() => {
    if (!open) return;
    const onPointerDown = (e) => { if (ref.current && !ref.current.contains(e.target)) onClose && onClose(); };
    const onKeyDown = (e) => { if (e.key === "Escape") onClose && onClose(); };
    document.addEventListener("pointerdown", onPointerDown);
    document.addEventListener("keydown", onKeyDown);
    return () => {
      document.removeEventListener("pointerdown", onPointerDown);
      document.removeEventListener("keydown", onKeyDown);
    };
  }, [open, onClose]);

  // 닫히면(open: true→false) 포커스를 트리거로 되돌린다. triggerRef가 실제 포커스 가능한 노드를 가리켜야 한다.
  useEffect(() => {
    if (wasOpen.current && !open && triggerRef && triggerRef.current) {
      triggerRef.current.focus();
    }
    wasOpen.current = open;
  }, [open, triggerRef]);

  if (!open) return null;

  const SIDE = {
    bottom: { top: "calc(100% + 4px)" },
    top: { bottom: "calc(100% + 4px)" },
    right: { left: "calc(100% + 4px)" },
    left: { right: "calc(100% + 4px)" },
  };
  const CROSS = {
    bottom: { start: { left: 0 }, end: { right: 0 } },
    top: { start: { left: 0 }, end: { right: 0 } },
    right: { start: { top: 0 }, end: { bottom: 0 } },
    left: { start: { top: 0 }, end: { bottom: 0 } },
  };

  return (
    <div
      ref={ref}
      role={role}
      style={{
        position: "absolute",
        zIndex: 30,
        minWidth,
        display: "flex",
        flexDirection: "column",
        padding: 4,
        borderRadius: "var(--radius-md)",
        background: "var(--card)",
        border: "1px solid var(--border)",
        boxShadow: "var(--shadow-md)",
        ...(SIDE[side] || SIDE.bottom),
        ...((CROSS[side] || CROSS.bottom)[align] || CROSS.bottom.start),
        ...style,
      }}
      {...rest}
    >
      {children}
    </div>
  );
}

if (typeof document !== "undefined" && !document.getElementById("mt-popover-menuitem-style")) {
  const s = document.createElement("style");
  s.id = "mt-popover-menuitem-style";
  s.textContent = ".mt-popover-menuitem:hover{background:var(--secondary);}";
  document.head.appendChild(s);
}

/**
 * popoverMenuItemStyle — Popover를 메뉴로 쓸 때의 항목 레시피. className="mt-popover-menuitem"과 함께 쓴다
 *  (hover 옅은 sage는 이 클래스의 CSS가 담당 — 인라인 style만으론 hover를 표현할 수 없어서다).
 *  파괴적 항목(삭제 등)은 {...popoverMenuItemStyle, color: "var(--destructive)"}로 덮어쓴다.
 */
export const popoverMenuItemStyle = {
  display: "flex", alignItems: "center", gap: 8, width: "100%", padding: "8px 10px", border: "none",
  background: "none", borderRadius: "var(--radius-sm)", font: "inherit", fontSize: "var(--text-body)",
  color: "var(--foreground)", textAlign: "left", cursor: "pointer",
};
