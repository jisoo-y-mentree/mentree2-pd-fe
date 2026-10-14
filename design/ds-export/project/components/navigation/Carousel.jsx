import React from "react";

/**
 * Carousel — 배치 컴포넌트. 카드를 가로로 나열하는 범용 스크롤/스냅 컨테이너.
 *  담기는 카드 종류 고정 안 함(멘토·인터뷰·아티클 등 무엇이든). 조작부(화살표)는 없음 —
 *  좌우 화살표는 SectionHeader가 담당하고, Carousel은 스크롤/스냅 로직만.
 *  데스크톱 기본 거동. mode("peek"|"snap-fit")와 좌우 배경(white) 페이드 추가.
 *   peek: 마지막 카드가 의도적으로 잘려 걸침(N+1) — "더 있음" 강조. snap-fit: 컨테이너 폭에 딱 떨어짐(잘림 없음).
 *   페이드: 넘치고 그 방향에 더 있으면 걸린다(mode·폭과 무관 — 1280이 아니어도 동작). Mobile(~768)은 페이드하지 않는다(CSS로 끈다).
 *   DS-101 — 1장씩(첫 카드 폭 = 트랙 보이는 폭)이면 페이드를 걸지 않는다.
 *   세로 그림자: 스크롤 트랙 상하 여유 패딩 + 동일 크기 음수 마진으로, 가로 스크롤을 유지하면서 카드 세로 그림자가 잘리지 않게(외부 점유 박스 불변).
 *
 *  화살표 연동: ref로 scrollPrev()/scrollNext() 호출(1단위=현재 표시 개수만큼 이동).
 *  끝 도달은 onEdgeChange({atStart, atEnd})로 통지 → SectionHeader 화살표 disabled.
 */
// DS-106 — display:contents 감싸개(화면의 div.sc-host-x 등)는 건너뛰고 그 안으로 내려가 상자 있는 첫 요소를 찾는다.
function boxesOf(node, out, firstOnly) {
  for (const c of Array.from(node.children)) {
    if (getComputedStyle(c).display === "contents") { boxesOf(c, out, firstOnly); }
    else out.push(c);
    if (firstOnly && out.length) return out;
  }
  return out;
}
// DS-106 — 카드 폭은 첫 실물 카드에서 잰다. 없으면 0.
function firstCardWidth(el) {
  const b = boxesOf(el, [], true)[0];
  return b ? b.getBoundingClientRect().width : 0;
}

export const Carousel = React.forwardRef(function Carousel(
  { children, gap = 16, snap = "card", mode = "snap-fit", fade: fadeOn = true, onEdgeChange, style, ...rest },
  ref
) {
  const trackRef = React.useRef(null);
  const [fade, setFade] = React.useState({ left: false, right: false });
  // 세로 그림자가 스크롤 오버플로(overflow-x:auto → y도 auto로 클립)에 잘리지 않도록
  // 트랙 상하에 그림자 여유 패딩을 두고, 같은 크기의 음수 마진으로 되돌려 점유 박스는 동일하게 유지.
  const SHADOW_PAD = 18;

  if (typeof document !== "undefined" && !document.getElementById("mt-carousel-style")) {
    const s = document.createElement("style");
    s.id = "mt-carousel-style";
    s.textContent = "@media (max-width:768px){.mt-carousel-fade{display:none !important}}";
    document.head.appendChild(s);
  }

  const readEdges = React.useCallback(() => {
    const el = trackRef.current;
    if (!el) return;
    const overflow = el.scrollWidth - el.clientWidth > 1;
    const atStart = el.scrollLeft <= 1;
    const atEnd = el.scrollLeft >= el.scrollWidth - el.clientWidth - 1;
    // 페이드는 넘치는 방향에 대해 걸린다. mode·폭과 무관 — peek든 snap-fit이든, 1280이 아니어도 동일.
    // Mobile(~768)에서는 CSS로 끈다(className 참조, matchMedia로 JS 분기하지 않는다).
    // DS-101 — 1장씩(첫 카드 폭 = 트랙 보이는 폭, 차 1 이하)이면 양쪽 페이드를 걸지 않는다. 넘치든 아니든 같다.
    //  페이드는 「걸친 카드가 더 있다」 신호인데 1장씩이면 걸친 카드가 없고 ← → 가 그 일을 한다.
    //  (페이드가 그림자 여유 18까지 덮어 위 SectionHeader → 버튼 아래 테두리를 지우던 문제도 함께 사라진다.)
    // DS-106 — 「첫 카드」는 감싸개 너머의 첫 실물 카드(firstCardWidth). fade={false}면 늘 걸지 않는다.
    const cw = firstCardWidth(el);
    const single = cw > 0 && Math.abs(cw - el.clientWidth) <= 1;
    const on = fadeOn && !single && overflow;
    setFade({ left: on && !atStart, right: on && !atEnd });
    if (onEdgeChange) onEdgeChange({ atStart, atEnd });
  }, [onEdgeChange, fadeOn]);

  // 화살표 = 한 페이지 넘기기. 자유 스크롤의 카드 1장 스냅과는 별개.
  //  snap="unit": 1단위 = 트랙 가시 폭 한 화면.
  //  snap="card": 현재 표시 개수(컨테이너 폭 ÷ (카드폭+gap))만큼 = 한 페이지.
  const stepBy = React.useCallback((dir) => {
    const el = trackRef.current;
    if (!el) return;
    let amount;
    if (snap === "unit") {
      amount = el.clientWidth + gap;
    } else {
      // DS-106 — 한 페이지 이동도 감싸개 너머의 첫 실물 카드 폭을 쓴다. 0이면 넘기지 않는다.
      const cardW = firstCardWidth(el);
      if (!cardW) return;
      const perView = Math.max(1, Math.floor((el.clientWidth + gap) / (cardW + gap)));
      amount = (cardW + gap) * perView;
    }
    el.scrollBy({ left: dir * amount, behavior: "smooth" });
  }, [gap, snap]);

  React.useImperativeHandle(ref, () => ({
    scrollPrev: () => stepBy(-1),
    scrollNext: () => stepBy(1),
    getEdges: () => {
      const el = trackRef.current;
      if (!el) return { atStart: true, atEnd: true };
      return {
        atStart: el.scrollLeft <= 1,
        atEnd: el.scrollLeft >= el.scrollWidth - el.clientWidth - 1,
      };
    },
  }), [stepBy]);

  // DS-106 — 감싸개 안의 카드에도 트랙 자식과 같은 flex:0 0 auto · 스냅 정렬을 준다(cloneElement 는 감싸개에만 닿는다).
  React.useLayoutEffect(() => {
    const el = trackRef.current;
    if (!el) return;
    Array.from(el.children).forEach((c) => {
      if (getComputedStyle(c).display !== "contents") return;
      boxesOf(c, [], false).forEach((b) => {
        if (!b.style.flex) b.style.flex = "0 0 auto";
        if (!b.style.scrollSnapAlign) { b.style.scrollSnapAlign = "start"; b.style.scrollSnapStop = "always"; }
      });
    });
  });

  React.useEffect(() => {
    readEdges();
    const el = trackRef.current;
    if (!el) return;
    el.addEventListener("scroll", readEdges, { passive: true });
    window.addEventListener("resize", readEdges);
    // DS-101 — 트랙 · 첫 카드 폭이 바뀌면(창 크기 · 부모 폭) 1장씩 판정을 다시 한다.
    let ro;
    if (typeof ResizeObserver !== "undefined") { ro = new ResizeObserver(() => readEdges()); ro.observe(el); const b = boxesOf(el, [], true)[0]; if (b) ro.observe(b); }
    return () => {
      el.removeEventListener("scroll", readEdges);
      window.removeEventListener("resize", readEdges);
      if (ro) ro.disconnect();
    };
  }, [readEdges]);

  return (
    <div style={{ position: "relative", ...style }}>
      <div
        ref={trackRef}
        style={{
          display: "flex",
          // 카드는 자기 내용만큼만 높다 — stretch면 짧은 카드가 가장 긴 카드에 맞춰 늘어나 아래에 빈 공간이 생긴다.
          // 카드 높이를 서로 맞추지 않는다(격자도 align-items: start).
          alignItems: "flex-start",
          gap,
          overflowX: "auto",
          // 카드/단위 스냅. peek 모드는 마지막 카드가 걸치도록 우측 스크롤 패딩.
          scrollSnapType: "x mandatory",
          scrollPaddingRight: mode === "peek" ? 48 : 0,
          scrollbarWidth: "none",
          WebkitOverflowScrolling: "touch",
          // 세로 그림자 여유(상하) — 음수 마진으로 상쇄해 외부 레이아웃 간격은 불변. peek 페이드 유지.
          paddingTop: SHADOW_PAD,
          paddingBottom: SHADOW_PAD,
          marginTop: -SHADOW_PAD,
          marginBottom: -SHADOW_PAD,
        }}
        {...rest}
      >
        {React.Children.map(children, (child) => {
          if (!React.isValidElement(child)) return child;
          return React.cloneElement(child, {
            style: {
              flex: "0 0 auto",
              scrollSnapAlign: "start",
              scrollSnapStop: "always",
              ...(child.props.style || {}),
            },
          });
        })}
      </div>
      {/* 좌우 배경(white) 페이드 — overflow + 스크롤 위치에 따라(mode·폭 무관). 클릭 통과.
          Mobile(~768)은 CSS로 숨긴다 — 가장자리 폭이 귀하고 스와이프가 그 일을 대신한다. */}
      <div aria-hidden="true" className="mt-carousel-fade" style={{ position: "absolute", top: 0, bottom: 0, left: 0, width: 40, pointerEvents: "none", background: "linear-gradient(90deg, var(--background), transparent)", opacity: fade.left ? 1 : 0, transition: "opacity 150ms ease" }} />
      <div aria-hidden="true" className="mt-carousel-fade" style={{ position: "absolute", top: 0, bottom: 0, right: 0, width: 40, pointerEvents: "none", background: "linear-gradient(270deg, var(--background), transparent)", opacity: fade.right ? 1 : 0, transition: "opacity 150ms ease" }} />
    </div>
  );
});
