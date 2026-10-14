// DS-75 — Checkbox · Switch · RadioGroup 공용: 속의 네이티브 입력이 키보드로 포커스되면 겉 상자 둘레에 --ring.
export function ensureControlFocusStyle() {
  if (typeof document === "undefined" || document.getElementById("mt-ctl-focus-style")) return;
  const s = document.createElement("style");
  s.id = "mt-ctl-focus-style";
  s.textContent = ".mt-ctl-input:focus-visible+.mt-ctl-face{outline:2px solid var(--ring);outline-offset:2px;}";
  document.head.appendChild(s);
}
