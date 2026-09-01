import React, { useEffect, useRef, useState } from "react";
import { Avatar } from "./Avatar.jsx";
import { Icon } from "./Icon.jsx";

/**
 * Badge — 계열 × leading × 사이즈 색 시스템.
 *  계열(variant): "category"(분류·뉴트럴 sage) · "status"(상태) · "tag"(질적태그 8색).
 *  status(상태값): "active"(진행중·green) · "new"(신규·green tint) · "closed"(마감·destructive) · "waiting"(대기·muted) · "hold"(보류·muted).
 *  hue(질적태그 8색): neutral·blue·sky·indigo·amber·rose·purple·teal.
 *  leading(전 계열 공통 앞자리 슬롯): "none" · "dot" · "flag"(국기) · "avatar".
 *  패딩(접면 기반·좌우 독립): 텍스트 접면 sm8/md10/lg12 · 슬롯(flag/avatar/dot/"+N ⌄") 접면 sm5/md6/lg7.
 *  size: sm·md·lg. 형태: radius-md(완전 pill 아님). 라벨은 텍스트(tabular 불필요).
 */
const SIZES = {
  sm: { h: 22, radius: 6,  padText: 8,  padSlot: 5, fs: 12, gap: 5, slot: 15, dot: 5 },
  md: { h: 28, radius: 8,  padText: 10, padSlot: 6, fs: 13, gap: 6, slot: 18, dot: 6 },
  lg: { h: 34, radius: 10, padText: 12, padSlot: 7, fs: 14, gap: 7, slot: 22, dot: 7 },
};

// flag 국기 에셋 기본 경로(DS 카드 기준). 소비처는 flagBase prop으로 재정의.
const FLAG_BASE = "../../assets/flags/";

// 질적 태그 8색 — [배경 50, 아웃라인 200, 라벨 700(밝은 hue는 800)]
const HUES = {
  neutral: ["--badge-neutral-50", "--badge-neutral-200", "--badge-neutral-700"], // white 배경
  gray:    ["--badge-gray-50", "--badge-gray-200", "--badge-gray-700"],
  blue:    ["--badge-blue-50", "--badge-blue-200", "--badge-blue-700"],
  sky:     ["--badge-sky-50", "--badge-sky-200", "--badge-sky-700"],
  indigo:  ["--badge-indigo-50", "--badge-indigo-200", "--badge-indigo-700"],
  amber:   ["--badge-amber-50", "--badge-amber-200", "--badge-amber-800"], // 밝은 hue → 라벨 800
  rose:    ["--badge-rose-50", "--badge-rose-200", "--badge-rose-700"],
  purple:  ["--badge-purple-50", "--badge-purple-200", "--badge-purple-700"],
  teal:    ["--badge-teal-50", "--badge-teal-200", "--badge-teal-700"],
};

// 상태 계열 색 (시스템 의미)
const STATUS = {
  active:  { bg: "color-mix(in oklch, var(--primary) 12%, white)", line: "color-mix(in oklch, var(--primary) 24%, transparent)", text: "var(--primary)" },
  // new(신규) — active와 동일 tint. 멘토 사진(초록 배경 가능) 오버레이용이라 solid green 금지 — tint라야 어느 사진 위서도 읽힘.
  new:     { bg: "color-mix(in oklch, var(--primary) 12%, white)", line: "color-mix(in oklch, var(--primary) 24%, transparent)", text: "var(--primary)" },
  closed:  { bg: "color-mix(in oklch, var(--destructive) 12%, white)", line: "color-mix(in oklch, var(--destructive) 24%, transparent)", text: "var(--destructive)" },
  waiting: { bg: "var(--muted)", line: "var(--sage-200)", text: "var(--muted-foreground)" },
  hold:    { bg: "var(--muted)", line: "var(--sage-200)", text: "var(--muted-foreground)" },
};

function palette(variant, status, hue) {
  if (variant === "status") return STATUS[status] || STATUS.waiting;
  const h = variant === "tag" ? (HUES[hue] || HUES.neutral) : HUES.neutral;
  return { bg: `var(${h[0]})`, line: `var(${h[1]})`, text: `var(${h[2]})` };
}

export function Badge({
  variant = "category",
  status,
  hue = "neutral",
  leading = "none",
  flag,
  flagBase = FLAG_BASE,
  avatar,
  size = "md",
  labelHidden = false,
  extraItems,
  children,
  style,
  ...rest
}) {
  const s = SIZES[size] || SIZES.md;
  const p = palette(variant, status, hue);
  // 접면 기반 좌우 패딩 — 각 변을 독립 판단: 텍스트 접면=padText, 슬롯(국기·아바타·dot·"+N ⌄") 접면=padSlot.
  const hasLead = leading !== "none" && !(leading === "avatar" && !avatar);
  const labelShown = !labelHidden && children != null && children !== "";
  // 우변 접면: "+N ⌄" 있으면 슬롯, 없으면 라벨(텍스트), 라벨도 없으면(국기만 등) 슬롯.
  // "+N" 펼침(팝오버) — extraItems 있을 때만. 바깥 클릭 시 닫힘.
  const hasExtra = Array.isArray(extraItems) && extraItems.length > 0;
  const [open, setOpen] = useState(false);
  const rootRef = useRef(null);
  useEffect(() => {
    if (!open) return;
    const onDoc = (e) => { if (rootRef.current && !rootRef.current.contains(e.target)) setOpen(false); };
    document.addEventListener("pointerdown", onDoc);
    return () => document.removeEventListener("pointerdown", onDoc);
  }, [open]);

  let lead = null;
  if (leading === "dot") {
    lead = <span style={{ width: s.dot, height: s.dot, borderRadius: "50%", background: "currentColor", flex: "0 0 auto" }} />;
  } else if (leading === "flag") {
    // 원형 국기 SVG(assets/flags/{국가명}.svg). 미등록/실패 시 빈 원형 placeholder.
    lead = (
      <span style={{ width: s.slot, height: s.slot, borderRadius: "50%", overflow: "hidden", flex: "0 0 auto", background: "var(--sage-100)", display: "inline-flex", boxShadow: "0 0 0 1px color-mix(in oklch, var(--sage-950) 8%, transparent)" }}>
        {flag && (
          <img
            src={`${flagBase}${flag}.svg`}
            alt=""
            onError={(e) => { e.currentTarget.style.display = "none"; }}
            style={{ width: "100%", height: "100%", objectFit: "cover" }}
          />
        )}
      </span>
    );
  } else if (leading === "avatar" && avatar) {
    lead = <Avatar {...avatar} size={s.slot} />;
  }

  // 펼침 트리거 — 카드 전체 클릭(이동) 안으로 전파 금지.
  const onToggle = (e) => { e.stopPropagation(); e.preventDefault(); setOpen((v) => !v); };

  return (
    <span
      ref={rootRef}
      style={{
        position: hasExtra ? "relative" : undefined,
        display: "inline-flex",
        alignItems: "center",
        gap: s.gap,
        height: s.h,
        paddingLeft: hasLead ? s.padSlot : s.padText,
        paddingRight: hasExtra || !labelShown ? s.padSlot : s.padText,
        fontFamily: "var(--font-sans)",
        fontSize: s.fs,
        fontWeight: 500,
        lineHeight: 1,
        borderRadius: s.radius,
        background: p.bg,
        color: p.text,
        border: `1px solid ${p.line}`,
        whiteSpace: "nowrap",
        ...style,
      }}
      {...rest}
    >
      {lead}
      {!labelHidden && children}
      {hasExtra && (
        <button
          type="button"
          onClick={onToggle}
          onPointerDown={(e) => e.stopPropagation()}
          aria-expanded={open}
          style={{ display: "inline-flex", alignItems: "center", gap: 2, margin: 0, padding: 0, border: "none", background: "none", font: "inherit", color: "inherit", cursor: "pointer", lineHeight: 1 }}
        >
          +{extraItems.length}
          <Icon name="arrow-down-01" size={s.fs + 1} style={{ color: "currentColor", transform: open ? "rotate(180deg)" : "none", transition: "transform 120ms ease" }} />
        </button>
      )}
      {hasExtra && open && (
        <span
          role="listbox"
          onClick={(e) => { e.stopPropagation(); e.preventDefault(); }}
          style={{ position: "absolute", top: "calc(100% + 4px)", left: 0, zIndex: 30, minWidth: "100%", display: "flex", flexDirection: "column", padding: 4, borderRadius: "var(--radius-md)", background: "var(--card)", border: "1px solid var(--border)", boxShadow: "var(--shadow-md)", whiteSpace: "nowrap" }}
        >
          {extraItems.map((it, i) => (
            <span key={i} style={{ padding: "5px 9px", borderRadius: "var(--radius-sm)", fontSize: s.fs, fontWeight: 500, color: "var(--foreground)", lineHeight: 1.3 }}>{it}</span>
          ))}
        </span>
      )}
    </span>
  );
}
