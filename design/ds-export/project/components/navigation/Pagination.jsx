import React from "react";

/**
 * Pagination — 목록의 쪽 이동. 「더보기」가 아니라 번호다.
 * [전 화면 공통] 아티클 목록·공지사항·Q&A 피드·마이페이지 각 탭이 같은 규칙을 쓴다(화면마다 다르게 만들지 않는다).
 * [접는 규칙] 와이어의 3형태 — 시작 1 2 3 4 5 6 7 … 30 · 중간 1 … 5 6 [7] 8 9 … 30 · 끝 1 … 25 … 30.
 *  중간형은 「1 … 현재±2 … 끝」. 「…」이 1페이지만 가리면 접지 않고 그 번호를 세운다.
 * [점프] « » 는 둘 다 마지막 번호 뒤에 나란히 선다(« 를 왼쪽 끝에 두지 않는다). 이전·다음(‹ ›)은 없다 —
 *  번호가 이미 옆에 있다. 갈 곳이 없는 끝에서는 비활성(와이어에 양 끝 그림이 없어 여기서 정한 것).
 * [현재 페이지] --primary 채움 + aria-current="page". 버튼이 아니라 현재 위치 표시이므로 눌러도 아무 일이 없다.
 * [누르는 면] 보이는 사각형(40)보다 누르는 면을 크게 — 최소 44x44. 숫자는 tabular(자릿수가 바뀌어도 폭이 안 흔들린다).
 * [제어형] page + totalPages + onPageChange. URL에 page를 담는 화면이 있어 부모가 상태를 가진다.
 * [모바일] 와이어 근거 없음 — 여기서 정한 것: 양옆 ±2를 ±1로 줄이고 « » 는 남긴다.
 *  번호를 없애고 「이전/다음」으로 바꾸지 않는다(지금 몇 페이지인지가 안 보인다).
 */
const CSS = `.mt-pg-btn{background:none;border:none;padding:0;margin:0;cursor:pointer;font:inherit;color:var(--muted-foreground)}
.mt-pg-btn:hover:not(:disabled) .mt-pg-face{background:var(--muted);color:var(--foreground)}
.mt-pg-btn:disabled{cursor:default;opacity:.4}
.mt-pg-btn:focus-visible{outline:2px solid var(--ring);outline-offset:-4px;border-radius:var(--radius-md)}`;

function pageList(page, total, span) {
  const out = [];
  const lo = Math.max(2, page - span);
  const hi = Math.min(total - 1, page + span);
  out.push(1);
  // 「…」이 1페이지만 가리면 접지 않고 그 번호를 세운다.
  if (lo > 2) out.push(lo === 3 ? 2 : "…");
  for (let i = lo; i <= hi; i++) out.push(i);
  if (hi < total - 1) out.push(hi === total - 2 ? total - 1 : "…");
  if (total > 1) out.push(total);
  return out;
}

const HIT = 44;
const FACE = 40;

export function Pagination({ page, totalPages, onPageChange, style, ...rest }) {
  const [narrow, setNarrow] = React.useState(false);
  React.useEffect(() => {
    if (typeof window === "undefined" || !window.matchMedia) return;
    const mq = window.matchMedia("(max-width: 768px)");
    const on = () => setNarrow(mq.matches);
    on();
    mq.addEventListener("change", on);
    return () => mq.removeEventListener("change", on);
  }, []);

  const total = Math.max(1, totalPages || 1);
  const cur = Math.min(Math.max(1, page || 1), total);
  const items = pageList(cur, total, narrow ? 1 : 2);
  const go = (n) => { if (n !== cur && onPageChange) onPageChange(n); };

  const face = (extra) => ({
    display: "inline-flex", alignItems: "center", justifyContent: "center",
    width: FACE, height: FACE, borderRadius: "var(--radius-md)",
    fontSize: "var(--text-body)", fontVariantNumeric: "tabular-nums",
    transition: "background .12s, color .12s", ...extra,
  });

  return (
    <nav
      aria-label="페이지"
      style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: 0, fontFamily: "var(--font-sans)", ...style }}
      {...rest}
    >
      {items.map((it, i) =>
        it === "…" ? (
          // 「…」은 버튼이 아니다 — 눌리지 않는다.
          <span key={`e${i}`} aria-hidden="true" style={{ width: 24, height: HIT, display: "inline-flex", alignItems: "center", justifyContent: "center", color: "var(--muted-foreground)", fontSize: "var(--text-body)" }}>…</span>
        ) : it === cur ? (
          // 현재 페이지 — 버튼이 아니라 위치 표시. 눌러도 아무 일이 없다.
          <span key={it} aria-current="page" style={{ width: HIT, height: HIT, display: "inline-flex", alignItems: "center", justifyContent: "center" }}>
            <span style={face({ background: "var(--primary)", color: "var(--primary-foreground)", fontWeight: 600 })}>{it}</span>
          </span>
        ) : (
          <button key={it} type="button" className="mt-pg-btn" onClick={() => go(it)} style={{ width: HIT, height: HIT, display: "inline-flex", alignItems: "center", justifyContent: "center" }} aria-label={`${it}페이지`}>
            <span className="mt-pg-face" style={face()}>{it}</span>
          </button>
        )
      )}
      {/* « » 는 둘 다 마지막 번호 뒤에 나란히 — 번호 줄과 점프 버튼이 갈려 있는 배치 */}
      <button type="button" className="mt-pg-btn" onClick={() => go(1)} disabled={cur === 1} style={{ width: HIT, height: HIT, display: "inline-flex", alignItems: "center", justifyContent: "center", marginLeft: 4 }} aria-label="첫 페이지">
        <span className="mt-pg-face" style={face({ border: "1px solid var(--border)" })}>«</span>
      </button>
      <button type="button" className="mt-pg-btn" onClick={() => go(total)} disabled={cur === total} style={{ width: HIT, height: HIT, display: "inline-flex", alignItems: "center", justifyContent: "center" }} aria-label="마지막 페이지">
        <span className="mt-pg-face" style={face({ border: "1px solid var(--border)" })}>»</span>
      </button>
      <style>{CSS}</style>
    </nav>
  );
}
