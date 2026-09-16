// 핸드오프 배치용으로 고쳤다(2026-09-14, Claude Code).
// 원본은 프로젝트 루트 기준으로 "assets/" 를 가리켰다.
// 리포에서는 자산이 design/ds-export/project/assets/ 에 있으므로 그쪽으로 돌린다.
// 자산의 정본은 ds-export 다. template/ 에 사본을 두지 않는다.
(function () {
  var PREFIX = "../../assets/";
  var root = new URL("../../../ds-export/project/assets/", location.href).href;
  function fix(v) {
    return typeof v === "string" && v.indexOf(PREFIX) === 0 ? root + v.slice(PREFIX.length) : v;
  }
  var setAttr = Element.prototype.setAttribute;
  Element.prototype.setAttribute = function (name, value) {
    if (this.tagName === "IMG" && name === "src") value = fix(value);
    return setAttr.call(this, name, value);
  };
  var d = Object.getOwnPropertyDescriptor(HTMLImageElement.prototype, "src");
  Object.defineProperty(HTMLImageElement.prototype, "src", {
    configurable: true,
    enumerable: d.enumerable,
    get: d.get,
    set: function (v) { d.set.call(this, fix(v)); },
  });
})();
