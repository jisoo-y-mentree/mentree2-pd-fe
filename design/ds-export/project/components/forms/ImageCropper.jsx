import React from "react";
import { Icon } from "../core/Icon.jsx";
import { IconButton } from "../core/IconButton.jsx";
import { Button } from "../core/Button.jsx";

/**
 * ImageCropper — 사진 한 장에서 두 영역을 잡는다(DS-72). 원형 = 아바타, 직사각형 = 멘토카드 사진(3:2).
 *  「좌우 드래그로 직사각형 에리어, 상하 드래그로 원형 에리어의 위치를 조정 · 슬라이더로 확대/축소」.
 *  [무대] 2:1 · 사진은 무대를 덮는다(cover) × zoom(1〜3), 가운데 기준. 영역 밖은 어둡게.
 *  [직사각형] 높이 = 무대의 84%, 비율 rectAspect. 좌우로만 옮긴다.
 *  [원] 지름 = 직사각형 짧은 변의 62%, 직사각형 가운데 세로줄 위에서 상하로만 옮긴다 — 늘 직사각형 안.
 *  [확대] 두 영역은 크기를 유지하고 사진만 커진다. [↻] 90° 회전. [🗑] onRemove.
 *  [키보드] 영역은 role="slider" — 직사각형 ←→ · 원 ↑↓(Shift = 큰 걸음). 확대 슬라이더 ←→ Home End.
 *  [값] rotation을 적용한 원본 픽셀 좌표 — rect{x,y,w,h} · circle{cx,cy,r} · zoom · rotation.
 *   영역 위치는 부품 안에 둔다. zoom · rotation은 value로 받으면 그 값을 따른다.
 *  외부 라이브러리 없음. 슬라이더는 이 부품 안에만 있다(따로 Slider 부품을 만들지 않는다).
 */

const STAGE_ASPECT = 2;
const RECT_H = 0.84;
const CIRCLE_D = 0.62;
const clamp = (v, a = 0, b = 1) => Math.min(b, Math.max(a, v));
const SHADE = "color-mix(in oklch, var(--sage-950) 55%, transparent)";
const SHADE_SOFT = "color-mix(in oklch, var(--sage-950) 22%, transparent)";

if (typeof document !== "undefined" && !document.getElementById("mt-cropper-style")) {
  const s = document.createElement("style");
  s.id = "mt-cropper-style";
  s.textContent = ".mt-cropper-focus:focus-visible{outline:2px solid var(--ring);outline-offset:2px;}";
  document.head.appendChild(s);
}

export function ImageCropper({ src, onPick, rectAspect = 3 / 2, value, onChange, onRemove, error, style }) {
  const stageRef = React.useRef(null);
  const fileRef = React.useRef(null);
  const trackRef = React.useRef(null);
  const onChangeRef = React.useRef(onChange);
  onChangeRef.current = onChange;
  const [size, setSize] = React.useState({ w: 0, h: 0 });
  const [nat, setNat] = React.useState(null);
  const [pos, setPos] = React.useState({ rx: 0.5, cy: 0.5 });
  const [zoom, setZoom] = React.useState(value && value.zoom ? value.zoom : 1);
  const [rotation, setRotation] = React.useState(value && value.rotation ? value.rotation : 0);
  const [over, setOver] = React.useState(false);
  const errId = React.useId();

  React.useEffect(() => { if (value && typeof value.zoom === "number") setZoom(clamp(value.zoom, 1, 3)); }, [value && value.zoom]);
  React.useEffect(() => { if (value && typeof value.rotation === "number") setRotation(((value.rotation % 360) + 360) % 360); }, [value && value.rotation]);
  React.useEffect(() => { setNat(null); }, [src]);

  React.useLayoutEffect(() => {
    const el = stageRef.current;
    if (!el) return;
    const f = () => setSize({ w: el.clientWidth, h: el.clientHeight });
    f();
    if (typeof ResizeObserver === "undefined") return;
    const ro = new ResizeObserver(f);
    ro.observe(el);
    return () => ro.disconnect();
  }, [src]);

  // 기하
  const W = size.w, H = size.h;
  let rh = H * RECT_H, rw = rh * rectAspect;
  if (rw > W) { rw = W; rh = rw / rectAspect; }
  const rTravel = Math.max(0, W - rw);
  const rLeft = rTravel * pos.rx;
  const rTop = (H - rh) / 2;
  const d = Math.min(rw, rh) * CIRCLE_D;
  const cTravel = Math.max(0, rh - d);
  const cTop = cTravel * pos.cy;
  const cLeft = (rw - d) / 2;
  const rot90 = rotation % 180 !== 0;
  const iw = nat ? nat.w : 0, ih = nat ? nat.h : 0;
  const bw = rot90 ? ih : iw, bh = rot90 ? iw : ih;
  const s = nat && W && H ? Math.max(W / bw, H / bh) * zoom : 0;

  // 값 알림 — rotation을 적용한 원본 픽셀 좌표
  React.useEffect(() => {
    if (!s || !onChangeRef.current) return;
    const toImg = (x, y) => ({ x: (x - W / 2) / s + bw / 2, y: (y - H / 2) / s + bh / 2 });
    const r0 = toImg(rLeft, rTop);
    const c0 = toImg(rLeft + cLeft + d / 2, rTop + cTop + d / 2);
    const R = (n) => Math.round(n);
    onChangeRef.current({
      rect: { x: R(r0.x), y: R(r0.y), w: R(rw / s), h: R(rh / s) },
      circle: { cx: R(c0.x), cy: R(c0.y), r: R(d / 2 / s) },
      zoom: Math.round(zoom * 100) / 100,
      rotation,
    });
  }, [s, pos.rx, pos.cy, zoom, rotation, W, H]);

  const dragArea = (kind) => (e) => {
    if (e.button > 0) return;
    e.preventDefault();
    e.stopPropagation();
    e.currentTarget.focus({ preventScroll: true });
    const travel = kind === "rect" ? rTravel : cTravel;
    if (travel <= 0) return;
    const start = kind === "rect" ? e.clientX : e.clientY;
    const p0 = kind === "rect" ? pos.rx : pos.cy;
    const move = (ev) => {
      const v = clamp(p0 + ((kind === "rect" ? ev.clientX : ev.clientY) - start) / travel);
      setPos((p) => (kind === "rect" ? { ...p, rx: v } : { ...p, cy: v }));
    };
    const up = () => {
      window.removeEventListener("pointermove", move);
      window.removeEventListener("pointerup", up);
      window.removeEventListener("pointercancel", up);
    };
    window.addEventListener("pointermove", move);
    window.addEventListener("pointerup", up);
    window.addEventListener("pointercancel", up);
  };
  const keyArea = (kind) => (e) => {
    const step = e.shiftKey ? 0.2 : 0.05;
    const keys = kind === "rect" ? { ArrowLeft: -step, ArrowRight: step } : { ArrowUp: -step, ArrowDown: step };
    let dv = keys[e.key];
    if (e.key === "Home") dv = -1;
    if (e.key === "End") dv = 1;
    if (dv == null) return;
    e.preventDefault();
    setPos((p) => (kind === "rect" ? { ...p, rx: clamp(p.rx + dv) } : { ...p, cy: clamp(p.cy + dv) }));
  };

  const zoomFromX = (x) => {
    const t = trackRef.current;
    if (!t) return;
    const r = t.getBoundingClientRect();
    setZoom(Math.round((1 + 2 * clamp((x - r.left) / r.width)) * 100) / 100);
  };
  const dragZoom = (e) => {
    if (e.button > 0) return;
    e.preventDefault();
    e.currentTarget.focus({ preventScroll: true });
    zoomFromX(e.clientX);
    const move = (ev) => zoomFromX(ev.clientX);
    const up = () => { window.removeEventListener("pointermove", move); window.removeEventListener("pointerup", up); };
    window.addEventListener("pointermove", move);
    window.addEventListener("pointerup", up);
  };
  const keyZoom = (e) => {
    const m = { ArrowLeft: -0.1, ArrowDown: -0.1, ArrowRight: 0.1, ArrowUp: 0.1 };
    if (e.key === "Home") { e.preventDefault(); setZoom(1); return; }
    if (e.key === "End") { e.preventDefault(); setZoom(3); return; }
    if (m[e.key] == null) return;
    e.preventDefault();
    setZoom((z) => Math.round(clamp(z + m[e.key], 1, 3) * 10) / 10);
  };

  const pick = (file) => { if (file && onPick) onPick(file); };
  const errNode = error ? (
    <div id={errId} role="alert" style={{ fontFamily: "var(--font-sans)", fontSize: "var(--text-caption)", lineHeight: "var(--text-caption--line-height)", letterSpacing: "var(--text-caption--letter-spacing)", color: "var(--destructive)" }}>{error}</div>
  ) : null;
  const fileInput = (
    <input ref={fileRef} type="file" accept="image/*" tabIndex={-1} aria-hidden="true" style={{ display: "none" }}
      onChange={(e) => { pick(e.target.files && e.target.files[0]); e.target.value = ""; }} />
  );

  if (!src) {
    return (
      <div style={{ display: "flex", flexDirection: "column", gap: 8, ...style }}>
        <div
          onDragOver={(e) => { e.preventDefault(); setOver(true); }}
          onDragLeave={() => setOver(false)}
          onDrop={(e) => { e.preventDefault(); setOver(false); pick(e.dataTransfer.files && e.dataTransfer.files[0]); }}
          aria-describedby={error ? errId : undefined}
          style={{
            aspectRatio: `${STAGE_ASPECT} / 1`,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            gap: 12,
            padding: 16,
            boxSizing: "border-box",
            borderRadius: "var(--radius-lg)",
            border: `1.5px dashed ${error ? "var(--destructive)" : over ? "var(--primary)" : "var(--input)"}`,
            background: over ? "var(--secondary)" : "var(--muted)",
            textAlign: "center",
            transition: "background-color 150ms ease, border-color 150ms ease",
          }}
        >
          <Icon name="image-01" size={28} style={{ color: "var(--muted-foreground)" }} />
          <Button variant="outline" size="sm" iconLeft="upload-04" onClick={() => fileRef.current && fileRef.current.click()}>사진 올리기</Button>
          <span style={{ fontFamily: "var(--font-sans)", fontSize: "var(--text-caption)", lineHeight: "var(--text-caption--line-height)", color: "var(--muted-foreground)" }}>또는 사진을 여기로 끌어다 놓으세요</span>
          {fileInput}
        </div>
        {errNode}
      </div>
    );
  }

  const imgW = iw * (s || 0), imgH = ih * (s || 0);
  const zoomT = (zoom - 1) / 2;

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 12, ...style }}>
      <div
        ref={stageRef}
        aria-describedby={error ? errId : undefined}
        style={{ position: "relative", aspectRatio: `${STAGE_ASPECT} / 1`, overflow: "hidden", borderRadius: "var(--radius-lg)", background: "var(--sage-900)", userSelect: "none", touchAction: "none" }}
      >
        <img
          src={src}
          alt=""
          draggable={false}
          onLoad={(e) => setNat({ w: e.currentTarget.naturalWidth, h: e.currentTarget.naturalHeight })}
          style={{
            position: "absolute",
            left: "50%",
            top: "50%",
            width: s ? imgW : "100%",
            height: s ? imgH : "100%",
            maxWidth: "none",
            objectFit: s ? "fill" : "cover",
            transform: `translate(-50%, -50%) rotate(${rotation}deg)`,
            pointerEvents: "none",
          }}
        />
        {s > 0 && (
          <div
            className="mt-cropper-focus"
            role="slider"
            tabIndex={0}
            aria-label="직사각형 영역 위치(좌우)"
            aria-orientation="horizontal"
            aria-valuemin={0}
            aria-valuemax={100}
            aria-valuenow={Math.round(pos.rx * 100)}
            onPointerDown={dragArea("rect")}
            onKeyDown={keyArea("rect")}
            style={{
              position: "absolute",
              left: rLeft,
              top: rTop,
              width: rw,
              height: rh,
              boxSizing: "border-box",
              border: "2px solid var(--background)",
              boxShadow: `0 0 0 9999px ${SHADE}`,
              cursor: rTravel > 0 ? "ew-resize" : "default",
              overflow: "hidden",
            }}
          >
            <div
              className="mt-cropper-focus"
              role="slider"
              tabIndex={0}
              aria-label="원형 영역 위치(상하)"
              aria-orientation="vertical"
              aria-valuemin={0}
              aria-valuemax={100}
              aria-valuenow={Math.round(pos.cy * 100)}
              onPointerDown={dragArea("circle")}
              onKeyDown={keyArea("circle")}
              style={{
                position: "absolute",
                left: cLeft - 2,
                top: cTop - 2,
                width: d,
                height: d,
                boxSizing: "border-box",
                borderRadius: "50%",
                border: "2px solid var(--background)",
                boxShadow: `0 0 0 9999px ${SHADE_SOFT}`,
                cursor: cTravel > 0 ? "ns-resize" : "default",
              }}
            />
          </div>
        )}
      </div>
      {errNode}
      <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", gap: 12, flexWrap: "wrap" }}>
        <div style={{ display: "flex", gap: 4 }}>
          <IconButton icon="rotate-clockwise" variant="ghost" size="sm" ariaLabel="회전" onClick={() => setRotation((r) => (r + 90) % 360)} />
          <IconButton icon="delete-02" variant="ghost" size="sm" ariaLabel="사진 삭제" onClick={onRemove} />
        </div>
        <div style={{ display: "flex", alignItems: "center", gap: 10, flex: "0 1 200px", minWidth: 140 }}>
          <Icon name="search-01" size={16} style={{ color: "var(--muted-foreground)", flex: "0 0 auto" }} />
          <div
            ref={trackRef}
            className="mt-cropper-focus"
            role="slider"
            tabIndex={0}
            aria-label="확대"
            aria-valuemin={1}
            aria-valuemax={3}
            aria-valuenow={zoom}
            aria-valuetext={`${zoom.toFixed(1)}배`}
            onPointerDown={dragZoom}
            onKeyDown={keyZoom}
            style={{ position: "relative", flex: 1, height: 24, cursor: "pointer", touchAction: "none", borderRadius: "var(--radius-sm)" }}
          >
            <div style={{ position: "absolute", left: 0, right: 0, top: 10, height: 4, borderRadius: 2, background: "var(--muted)" }} />
            <div style={{ position: "absolute", left: 0, width: `${zoomT * 100}%`, top: 10, height: 4, borderRadius: 2, background: "var(--primary)" }} />
            <div style={{ position: "absolute", top: 4, left: `calc(${zoomT * 100}% - 8px)`, width: 16, height: 16, boxSizing: "border-box", borderRadius: "50%", background: "var(--background)", border: "2px solid var(--primary)", boxShadow: "var(--shadow-sm)" }} />
          </div>
        </div>
      </div>
      {fileInput}
    </div>
  );
}
