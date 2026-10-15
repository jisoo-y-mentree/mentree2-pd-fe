// 리포 배치용(2026-10-15, Claude Code). DS 부품의 기본 자산 경로 "../../assets/"(DS 카드 기준)를
// design/ds-export/project/assets/ 로 바꾼다. 자산의 정본은 ds-export 다. template/ 에 사본을 두지 않는다. 번들보다 먼저 읽는다.
(function () {
  var D = new URL("../../../ds-export/project/assets/", location.href).href;
  var fix = function (v) { return typeof v === "string" && v.indexOf("../../assets/") !== -1 ? v.split("../../assets/").join(D) : v; };
  var sa = Element.prototype.setAttribute;
  Element.prototype.setAttribute = function (n, v) { if (n === "src" || n === "srcset") v = fix(v); return sa.call(this, n, v); };
  var d = Object.getOwnPropertyDescriptor(HTMLImageElement.prototype, "src");
  if (d && d.set) Object.defineProperty(HTMLImageElement.prototype, "src", { get: d.get, set: function (v) { d.set.call(this, fix(v)); }, configurable: true });
  var protos = [window.CSSStyleDeclaration && CSSStyleDeclaration.prototype, window.CSS2Properties && CSS2Properties.prototype].filter(Boolean);
  ["maskImage", "webkitMaskImage", "WebkitMaskImage", "backgroundImage", "background", "mask", "webkitMask", "WebkitMask"].forEach(function (p) {
    protos.forEach(function (pr) {
      var o = Object.getOwnPropertyDescriptor(pr, p);
      if (o && o.set) Object.defineProperty(pr, p, { get: o.get, set: function (v) { o.set.call(this, fix(v)); }, configurable: true });
    });
  });
  var sp = CSSStyleDeclaration.prototype.setProperty;
  CSSStyleDeclaration.prototype.setProperty = function (n, v, pr) { return sp.call(this, n, String(n).indexOf("--") === 0 ? v : fix(v), pr); };
})();
