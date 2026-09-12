/* @ds-bundle: {"format":4,"namespace":"MentreeDesignSystem_2f86cf","components":[{"name":"Avatar","sourcePath":"components/core/Avatar.jsx"},{"name":"AvatarGroup","sourcePath":"components/core/Avatar.jsx"},{"name":"Badge","sourcePath":"components/core/Badge.jsx"},{"name":"BookmarkToggle","sourcePath":"components/core/BookmarkToggle.jsx"},{"name":"Button","sourcePath":"components/core/Button.jsx"},{"name":"Chip","sourcePath":"components/core/Chip.jsx"},{"name":"CountToggle","sourcePath":"components/core/CountToggle.jsx"},{"name":"FilterChip","sourcePath":"components/core/FilterChip.jsx"},{"name":"Icon","sourcePath":"components/core/Icon.jsx"},{"name":"IconButton","sourcePath":"components/core/IconButton.jsx"},{"name":"Checkbox","sourcePath":"components/forms/Checkbox.jsx"},{"name":"Field","sourcePath":"components/forms/Field.jsx"},{"name":"FieldGroup","sourcePath":"components/forms/Field.jsx"},{"name":"Input","sourcePath":"components/forms/Input.jsx"},{"name":"RadioGroup","sourcePath":"components/forms/RadioGroup.jsx"},{"name":"Select","sourcePath":"components/forms/Select.jsx"},{"name":"Switch","sourcePath":"components/forms/Switch.jsx"},{"name":"ToggleGroup","sourcePath":"components/forms/ToggleGroup.jsx"},{"name":"Banner","sourcePath":"components/navigation/Banner.jsx"},{"name":"BottomTabBar","sourcePath":"components/navigation/BottomTabBar.jsx"},{"name":"CalloutBar","sourcePath":"components/navigation/CalloutBar.jsx"},{"name":"Carousel","sourcePath":"components/navigation/Carousel.jsx"},{"name":"Footer","sourcePath":"components/navigation/Footer.jsx"},{"name":"Header","sourcePath":"components/navigation/Header.jsx"},{"name":"Pagination","sourcePath":"components/navigation/Pagination.jsx"},{"name":"SectionHeader","sourcePath":"components/navigation/SectionHeader.jsx"},{"name":"Sidebar","sourcePath":"components/navigation/Sidebar.jsx"},{"name":"Tabs","sourcePath":"components/navigation/Tabs.jsx"},{"name":"TabPanel","sourcePath":"components/navigation/Tabs.jsx"},{"name":"NAV_PRIMARY","sourcePath":"components/navigation/nav-ia.js"},{"name":"NAV_AUTH","sourcePath":"components/navigation/nav-ia.js"},{"name":"NAV_UTILITY","sourcePath":"components/navigation/nav-ia.js"},{"name":"NAV_DETAIL","sourcePath":"components/navigation/nav-ia.js"},{"name":"Dialog","sourcePath":"components/overlays/Dialog.jsx"},{"name":"Popover","sourcePath":"components/overlays/Popover.jsx"},{"name":"Sheet","sourcePath":"components/overlays/Sheet.jsx"},{"name":"Toast","sourcePath":"components/overlays/Toast.jsx"},{"name":"AnswerCard","sourcePath":"components/surfaces/AnswerCard.jsx"},{"name":"ArticlePreview","sourcePath":"components/surfaces/ArticlePreview.jsx"},{"name":"Card","sourcePath":"components/surfaces/Card.jsx"},{"name":"CardHeader","sourcePath":"components/surfaces/Card.jsx"},{"name":"CardTitle","sourcePath":"components/surfaces/Card.jsx"},{"name":"CardDescription","sourcePath":"components/surfaces/Card.jsx"},{"name":"CardContent","sourcePath":"components/surfaces/Card.jsx"},{"name":"CardFooter","sourcePath":"components/surfaces/Card.jsx"},{"name":"EmptyState","sourcePath":"components/surfaces/EmptyState.jsx"},{"name":"InterviewCard","sourcePath":"components/surfaces/InterviewCard.jsx"},{"name":"MentorCard","sourcePath":"components/surfaces/MentorCard.jsx"},{"name":"QnaCard","sourcePath":"components/surfaces/QnaCard.jsx"},{"name":"Skeleton","sourcePath":"components/surfaces/Skeleton.jsx"},{"name":"Table","sourcePath":"components/surfaces/Table.jsx"}],"sourceHashes":{"components/core/Avatar.jsx":"0f3ffc5f31ff","components/core/Badge.jsx":"c7b9be0e02f2","components/core/BookmarkToggle.jsx":"7ea2c991107e","components/core/Button.jsx":"a5114fd5d2aa","components/core/Chip.jsx":"e1c1f9b42269","components/core/CountToggle.jsx":"aca1e44ee376","components/core/FilterChip.jsx":"3c34090cb434","components/core/Icon.jsx":"021313e06cd9","components/core/IconButton.jsx":"e1db1fbc8c1b","components/forms/Checkbox.jsx":"f7c99f0c94f3","components/forms/Field.jsx":"fec68edbf693","components/forms/Input.jsx":"d0a1ec848714","components/forms/RadioGroup.jsx":"f8e7f8aaa3ba","components/forms/Select.jsx":"6b9e34922aed","components/forms/Switch.jsx":"f3bca0c8c43a","components/forms/ToggleGroup.jsx":"c7a2bba81517","components/navigation/Banner.jsx":"897c8f74939c","components/navigation/BottomTabBar.jsx":"25ee0db58c82","components/navigation/CalloutBar.jsx":"092df60cda63","components/navigation/Carousel.jsx":"17be8b079c53","components/navigation/Footer.jsx":"071aa679b475","components/navigation/Header.jsx":"323047247fb7","components/navigation/Pagination.jsx":"ca08ef086066","components/navigation/SectionHeader.jsx":"9092de3b1569","components/navigation/Sidebar.jsx":"d290d8096d0f","components/navigation/Tabs.jsx":"93fd0080e9ef","components/navigation/nav-ia.js":"00ab9777819d","components/overlays/Dialog.jsx":"6851075179eb","components/overlays/Popover.jsx":"7a3071566620","components/overlays/Sheet.jsx":"219e7b9172f9","components/overlays/Toast.jsx":"18da6504e680","components/surfaces/AnswerCard.jsx":"21af1ca32fc6","components/surfaces/ArticlePreview.jsx":"e9a45a89b3cd","components/surfaces/Card.jsx":"155a05c05916","components/surfaces/EmptyState.jsx":"d3665e72f51e","components/surfaces/InterviewCard.jsx":"4e535f7526a6","components/surfaces/MentorCard.jsx":"8e23d0cd3232","components/surfaces/QnaCard.jsx":"9a4940c9725b","components/surfaces/Skeleton.jsx":"5816ddc5bd5d","components/surfaces/Table.jsx":"cd55307893a4"},"inlinedExternals":[],"unexposedExports":[{"name":"popoverMenuItemStyle","sourcePath":"components/overlays/Popover.jsx"}]} */

(() => {

const __ds_ns = (window.MentreeDesignSystem_2f86cf = window.MentreeDesignSystem_2f86cf || {});

const __ds_scope = {};

(__ds_ns.__errors = __ds_ns.__errors || []);

// components/core/Avatar.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
const SIZES = {
  xs: 20,
  sm: 24,
  md: 32,
  lg: 40
};
const CJK = /[\u3400-\u9FFF\uAC00-\uD7AF\u3040-\u30FF]/;
function initials(name) {
  if (!name) return "";
  const parts = String(name).trim().split(/\s+/).filter(Boolean);
  if (parts.length >= 2) return (parts[0][0] + parts[1][0]).toUpperCase();
  const w = parts[0] || "";
  return CJK.test(w[0]) ? w.slice(0, 1) : w.slice(0, 2).toUpperCase();
}

/**
 * Avatar — 원형 아바타. 이미지가 있으면 AvatarImage, 없거나 실패하면 AvatarFallback(이니셜).
 * 이미지 로딩 전에는 sage placeholder(sage-100)가 보인다.
 */
function Avatar({
  src,
  name,
  alt,
  size = "md",
  style,
  ...rest
}) {
  const px = typeof size === "number" ? size : SIZES[size] || SIZES.md;
  const [errored, setErrored] = React.useState(false);
  const [loaded, setLoaded] = React.useState(false);
  const showImg = !!src && !errored;
  const fs = Math.max(9, Math.round(px * 0.4));
  return /*#__PURE__*/React.createElement("span", _extends({
    role: "img",
    "aria-label": alt || name || "avatar",
    title: name || undefined,
    style: {
      position: "relative",
      display: "inline-flex",
      alignItems: "center",
      justifyContent: "center",
      width: px,
      height: px,
      borderRadius: "50%",
      overflow: "hidden",
      flex: "0 0 auto",
      background: "var(--sage-100)",
      color: "var(--sage-700)",
      fontFamily: "var(--font-sans)",
      fontSize: fs,
      fontWeight: 600,
      lineHeight: 1,
      letterSpacing: "-0.01em",
      userSelect: "none",
      ...style
    }
  }, rest), (!showImg || !loaded) && /*#__PURE__*/React.createElement("span", {
    "aria-hidden": showImg ? "true" : undefined,
    style: {
      position: "absolute",
      inset: 0,
      display: "flex",
      alignItems: "center",
      justifyContent: "center"
    }
  }, showImg ? null : initials(name)), showImg && /*#__PURE__*/React.createElement("img", {
    src: src,
    alt: alt || name || "",
    onLoad: () => setLoaded(true),
    onError: () => setErrored(true),
    style: {
      position: "absolute",
      inset: 0,
      width: "100%",
      height: "100%",
      objectFit: "cover",
      opacity: loaded ? 1 : 0,
      transition: "opacity 150ms ease"
    }
  }));
}

/**
 * AvatarGroup — 아바타 겹쳐 쌓기. 음수 마진 겹침 + 각 아바타 흰색 링(카드 위 분리용).
 * max 초과분은 "+K" 오버플로우 칩(마지막 자리, sage 배경).
 */
function AvatarGroup({
  items = [],
  max = 4,
  size = "sm",
  style,
  ...rest
}) {
  const px = typeof size === "number" ? size : SIZES[size] || SIZES.sm;
  const overlap = Math.round(px * 0.32);
  const ring = "0 0 0 2px var(--card)";
  const shown = items.slice(0, max);
  const extra = items.length - shown.length;
  const cell = (child, i) => /*#__PURE__*/React.createElement("span", {
    key: i,
    style: {
      marginLeft: i === 0 ? 0 : -overlap,
      borderRadius: "50%",
      boxShadow: ring,
      position: "relative",
      zIndex: i + 1,
      display: "inline-flex"
    }
  }, child);
  return /*#__PURE__*/React.createElement("span", _extends({
    style: {
      display: "inline-flex",
      alignItems: "center",
      ...style
    }
  }, rest), shown.map((it, i) => cell(/*#__PURE__*/React.createElement(Avatar, _extends({}, it, {
    size: px
  })), i)), extra > 0 && cell(/*#__PURE__*/React.createElement("span", {
    className: "tabular",
    style: {
      display: "inline-flex",
      alignItems: "center",
      justifyContent: "center",
      width: px,
      height: px,
      borderRadius: "50%",
      background: "var(--secondary)",
      color: "var(--secondary-foreground)",
      fontFamily: "var(--font-sans)",
      fontSize: Math.max(9, Math.round(px * 0.36)),
      fontWeight: 600,
      lineHeight: 1
    }
  }, "+", extra), shown.length));
}
Object.assign(__ds_scope, { Avatar, AvatarGroup });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/core/Avatar.jsx", error: String((e && e.message) || e) }); }

// components/core/BookmarkToggle.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
const {
  useState,
  useEffect
} = React;
/**
 * BookmarkToggle — 경계는 CountToggle 참조(경계는 "카운트의 유무"가 아니라 "어디에 놓이는가"다):
 *  BookmarkToggle = 미디어 오버레이의 아이콘 토글. 사진 위. 단독. 반전한다.
 *  CountToggle    = 메타 줄의 인라인 토글. 아이콘 + 숫자. 반전하지 않는다.
 *  한 번 합쳤다가 되돌렸다(2026-09-11 CountToggle로 흡수 → 2026-09-12 되돌림). 이 줄이 없으면 또 합치게 된다.
 *
 *  형태는 IconButton default(md)를 그대로 쓴다 — 같은 박스 38·아이콘 18·radius-md.
 *  미선택=outline(card+sage 아웃라인), 선택=반전(배경 --sage-900 채움 + 아이콘 --sage-50).
 *  HugeIcons 정적 CDN에 solid 북마크가 없어 stroke 1.6 라운드 인라인 SVG로 outline↔fill을 토글한다.
 *  제어형: selected + onChange(next). 서버 저장 로직은 범위 밖. count는 받지 않는다(그 자리는 CountToggle).
 */
const BOOKMARK_PATH = "M5 4.6C5 3.72 5.72 3 6.6 3h10.8c.88 0 1.6.72 1.6 1.6v15.5c0 .82-.92 1.3-1.58.82L12 17.4l-5.42 3.52C5.92 21.4 5 20.92 5 20.1V4.6z";
function BookmarkToggle({
  selected = false,
  onChange,
  disabled = false,
  ariaLabel = "스크랩",
  style,
  ...rest
}) {
  const [hover, setHover] = useState(false);
  const [pressed, setPressed] = useState(false);
  useEffect(() => {
    if (document.getElementById("mt-bookmarktoggle-style")) return;
    const s = document.createElement("style");
    s.id = "mt-bookmarktoggle-style";
    s.textContent = ".mt-bookmarktoggle:focus-visible{outline:2px solid var(--ring);outline-offset:2px;}";
    document.head.appendChild(s);
  }, []);
  const bg = selected ? "var(--sage-900)" : hover ? "var(--secondary)" : "var(--card)";
  const border = selected ? "1px solid transparent" : "1px solid var(--border)";
  const color = selected ? "var(--sage-50)" : "var(--foreground)";
  const filter = !disabled && selected && hover ? "brightness(0.92)" : "none";
  return /*#__PURE__*/React.createElement("button", _extends({
    type: "button",
    className: "mt-bookmarktoggle",
    "aria-pressed": selected,
    "aria-label": ariaLabel,
    disabled: disabled,
    onClick: () => {
      if (!disabled && onChange) onChange(!selected);
    },
    onMouseEnter: () => setHover(true),
    onMouseLeave: () => {
      setHover(false);
      setPressed(false);
    },
    onMouseDown: () => {
      if (!disabled) setPressed(true);
    },
    onMouseUp: () => setPressed(false),
    style: {
      display: "inline-flex",
      alignItems: "center",
      justifyContent: "center",
      width: 38,
      height: 38,
      borderRadius: "var(--radius-md)",
      background: bg,
      border,
      color,
      filter,
      cursor: disabled ? "not-allowed" : "pointer",
      opacity: disabled ? 0.5 : 1,
      transform: pressed ? "translateY(0.5px)" : "none",
      transition: "background-color 150ms ease, color 150ms ease, filter 150ms ease, transform 120ms ease",
      ...style
    }
  }, rest), /*#__PURE__*/React.createElement("svg", {
    width: 18,
    height: 18,
    viewBox: "0 0 24 24",
    fill: selected ? "currentColor" : "none",
    stroke: "currentColor",
    strokeWidth: 1.6,
    strokeLinejoin: "round",
    strokeLinecap: "round",
    "aria-hidden": "true"
  }, /*#__PURE__*/React.createElement("path", {
    d: BOOKMARK_PATH
  })));
}
Object.assign(__ds_scope, { BookmarkToggle });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/core/BookmarkToggle.jsx", error: String((e && e.message) || e) }); }

// components/core/CountToggle.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
const {
  useState,
  useEffect
} = React;
/**
 * CountToggle — 메타 줄 인라인 전용 토글(aria-pressed). "도움돼요"·"스크랩"이 이 하나로 통일된다 —
 *  거동은 완전히 같고 아이콘(icon prop)만 다르다. count는 필수다(메타 줄 조회수 등과 나란히 놓이는 자리).
 *  [경계] BookmarkToggle(미디어 오버레이, 사진 위, 반전)과 다른 자리 — 경계는 "카운트 유무"가 아니라
 *  "어디에 놓이는가"다(한 번 합쳤다 되돌림, 09-11→09-12). 사진 위 단독 액션은 BookmarkToggle을 쓴다.
 *  [반전 원칙 예외] Toggle 계열의 "selected=반전"(FilterChip=green 채움)을
 *  CountToggle은 따르지 않는다 — 목록 카드 20장에 반전 40개가 뜨면 카드가 안 읽힌다. 대신 아이콘 fill + tone 텍스트로만 표시.
 *  [tone] green은 쓰지 않는다 — 화면에 이미 "멘토 답변 N개"·"도움돼요 누른 답변" 등 다른 의미로 쓰이는 색이라 겹치면 3가지 의미가 한 색이 된다.
 *   tone="rose"(도움돼요) selected=아이콘 fill+--badge-rose-700 · tone="dark"(스크랩) selected=아이콘 fill+--sage-900.
 *   도움돼요·스크랩이 나란히 놓이므로 색으로 갈라야 어느 쪽을 눌렀는지 한눈에 보인다. 숫자도 아이콘과 같은 색. 배경은 여전히 없음(반전 아님).
 *  HugeIcons 정적 CDN에 해당 solid가 없어, stroke 1.6 라운드 인라인 SVG로 outline↔fill을 토글한다.
 *  (서버 저장·비로그인 유도는 범위 밖 — 화면이 onChange를 가로챈다. 컴포넌트는 상태 표현만.)
 */
const PATHS = {
  favourite: "M12 20.25c-.24 0-.47-.07-.67-.2-1.02-.66-3.64-2.44-5.86-4.79C3.33 12.98 2 10.86 2 8.66 2 5.92 4.19 3.75 6.9 3.75c2.02 0 3.6 1.1 5.1 2.98 1.5-1.88 3.08-2.98 5.1-2.98 2.71 0 4.9 2.17 4.9 4.91 0 2.2-1.33 4.32-3.47 6.6-2.22 2.35-4.84 4.13-5.86 4.79-.2.13-.43.2-.67.2z",
  bookmark: "M5 4.6C5 3.72 5.72 3 6.6 3h10.8c.88 0 1.6.72 1.6 1.6v15.5c0 .82-.92 1.3-1.58.82L12 17.4l-5.42 3.52C5.92 21.4 5 20.92 5 20.1V4.6z"
};
const LABEL = {
  favourite: "도움돼요",
  bookmark: "스크랩"
};
const TONE = {
  rose: "var(--badge-rose-700)",
  dark: "var(--sage-900)"
};
function CountToggle({
  icon = "favourite",
  tone = "dark",
  selected = false,
  onChange,
  count,
  disabled = false,
  ariaLabel,
  style,
  ...rest
}) {
  const [hover, setHover] = useState(false);
  const [pressed, setPressed] = useState(false);
  useEffect(() => {
    if (document.getElementById("mt-counttoggle-style")) return;
    const s = document.createElement("style");
    s.id = "mt-counttoggle-style";
    s.textContent = ".mt-counttoggle:focus-visible{outline:2px solid var(--ring);outline-offset:2px;}";
    document.head.appendChild(s);
  }, []);
  const color = disabled ? "var(--sage-400)" : selected ? TONE[tone] || TONE.dark : hover ? "var(--sage-700)" : "var(--muted-foreground)";
  return /*#__PURE__*/React.createElement("button", _extends({
    type: "button",
    className: "mt-counttoggle",
    "aria-pressed": selected,
    "aria-label": ariaLabel || LABEL[icon] || "토글",
    disabled: disabled,
    onClick: () => {
      if (!disabled && onChange) onChange(!selected);
    },
    onMouseEnter: () => setHover(true),
    onMouseLeave: () => {
      setHover(false);
      setPressed(false);
    },
    onMouseDown: () => {
      if (!disabled) setPressed(true);
    },
    onMouseUp: () => setPressed(false),
    style: {
      display: "inline-flex",
      alignItems: "center",
      gap: 5,
      border: "none",
      background: "transparent",
      padding: "4px 2px",
      margin: 0,
      fontFamily: "var(--font-sans)",
      fontSize: "var(--text-caption)",
      fontWeight: 500,
      color,
      cursor: disabled ? "not-allowed" : "pointer",
      opacity: disabled ? 0.55 : 1,
      transform: pressed ? "translateY(0.5px)" : "none",
      transition: "color 150ms ease, transform 120ms ease",
      ...style
    }
  }, rest), /*#__PURE__*/React.createElement("svg", {
    width: 16,
    height: 16,
    viewBox: "0 0 24 24",
    fill: selected ? "currentColor" : "none",
    stroke: "currentColor",
    strokeWidth: 1.6,
    strokeLinejoin: "round",
    strokeLinecap: "round",
    "aria-hidden": "true"
  }, /*#__PURE__*/React.createElement("path", {
    d: PATHS[icon] || PATHS.favourite
  })), count != null && /*#__PURE__*/React.createElement("span", {
    style: {
      fontVariantNumeric: "tabular-nums",
      lineHeight: 1
    }
  }, count));
}
Object.assign(__ds_scope, { CountToggle });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/core/CountToggle.jsx", error: String((e && e.message) || e) }); }

// components/core/FilterChip.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
/**
 * FilterChip — Toggle 계열 텍스트 칩(aria-pressed 반영).
 *  같은 Toggle 조상을 공유하는 형제: 아이콘형=BookmarkToggle / 텍스트칩형=FilterChip.
 *  둘 다 "selected=반전" 공통 원칙을 따른다 — CountToggle이 그 예외다(메타 줄 인라인, 반전 안 함).
 *  Badge(정적·인터랙션 불가)와 구분 — FilterChip은 클릭·선택 가능한 필터 요소.
 *
 * [크기·형태] 버튼 sm 체계(높이 32 · padding 0 12 · radius-md=12 · caption/500). pill 미사용.
 * [상태 — Toggle 공통 "selected=반전"] default: card 배경 + sage 아웃라인 + sage-700 텍스트 /
 *  hover: 옅은 sage 틴트(--secondary) / selected: primary green 반전(흰 텍스트) ←
 *  CountToggle이 반전하지 않는 것과 달리 FilterChip은 green 반전(필터 활성=브랜드 액션) /
 *  focus-visible: --ring / disabled: 흐리게.
 * [leading] none(직무 등) · flag(국가 — Badge flag leading의 원형 국기 SVG 재사용).
 *  selected 시 국기는 고유색 유지(green 배경 위 국기 그대로).
 */
const FLAG_BASE = "../../assets/flags/";
function FilterChip({
  selected = false,
  onChange,
  disabled = false,
  leading = "none",
  flag,
  flagBase = FLAG_BASE,
  children,
  style,
  ...rest
}) {
  const [hover, setHover] = React.useState(false);
  React.useEffect(() => {
    if (document.getElementById("mt-filterchip-style")) return;
    const s = document.createElement("style");
    s.id = "mt-filterchip-style";
    s.textContent = ".mt-filterchip:focus-visible{outline:2px solid var(--ring);outline-offset:2px;}";
    document.head.appendChild(s);
  }, []);

  // selected=반전(green). default/hover는 sage 아웃라인 칩.
  const bg = disabled ? selected ? "var(--primary)" : "var(--card)" : selected ? "var(--primary)" : hover ? "var(--secondary)" : "var(--card)";
  const fg = selected ? "var(--primary-foreground)" : "var(--sage-700)";
  const border = selected ? "1px solid transparent" : "1px solid var(--border)";
  let lead = null;
  if (leading === "flag") {
    // 원형 국기 — Badge flag leading 재사용(assets/flags/{국가명}.svg). 실패 시 빈 원형.
    lead = /*#__PURE__*/React.createElement("span", {
      style: {
        width: 18,
        height: 18,
        borderRadius: "50%",
        overflow: "hidden",
        flex: "0 0 auto",
        background: "var(--sage-100)",
        display: "inline-flex",
        boxShadow: "0 0 0 1px color-mix(in oklch, var(--sage-950) 8%, transparent)"
      }
    }, flag && /*#__PURE__*/React.createElement("img", {
      src: `${flagBase}${flag}.svg`,
      alt: "",
      onError: e => {
        e.currentTarget.style.display = "none";
      },
      style: {
        width: "100%",
        height: "100%",
        objectFit: "cover"
      }
    }));
  }
  return /*#__PURE__*/React.createElement("button", _extends({
    type: "button",
    className: "mt-filterchip",
    "aria-pressed": selected,
    disabled: disabled,
    onClick: () => {
      if (!disabled && onChange) onChange(!selected);
    },
    onMouseEnter: () => setHover(true),
    onMouseLeave: e => {
      setHover(false);
      e.currentTarget.style.transform = "none";
    },
    onMouseDown: e => {
      if (!disabled) e.currentTarget.style.transform = "translateY(0.5px)";
    },
    onMouseUp: e => {
      e.currentTarget.style.transform = "none";
    },
    style: {
      display: "inline-flex",
      alignItems: "center",
      justifyContent: "center",
      gap: 6,
      height: 32,
      padding: "0 12px",
      fontFamily: "var(--font-sans)",
      fontSize: "var(--text-caption)",
      fontWeight: 500,
      lineHeight: 1,
      letterSpacing: "-0.01em",
      whiteSpace: "nowrap",
      borderRadius: "var(--radius-md)",
      background: bg,
      color: fg,
      border,
      cursor: disabled ? "not-allowed" : "pointer",
      opacity: disabled ? 0.5 : 1,
      transition: "background-color 150ms ease, color 150ms ease, transform 120ms ease",
      ...style
    }
  }, rest), lead, children);
}
Object.assign(__ds_scope, { FilterChip });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/core/FilterChip.jsx", error: String((e && e.message) || e) }); }

// components/core/Icon.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
/**
 * Icon — HugeIcons static SVG recolored to currentColor via CSS mask.
 * The only icon primitive; HugeIcons is the mentree icon set.
 */
function Icon({
  name,
  size = 20,
  color,
  strokeUrl,
  style,
  className,
  ...rest
}) {
  const url = strokeUrl || `https://cdn.jsdelivr.net/npm/@hugeicons/static/icons/${name}.svg`;
  return /*#__PURE__*/React.createElement("span", _extends({
    role: "img",
    "aria-label": name,
    className: className,
    style: {
      display: "inline-block",
      width: size,
      height: size,
      flex: "0 0 auto",
      backgroundColor: color || "currentColor",
      WebkitMask: `url("${url}") center / contain no-repeat`,
      mask: `url("${url}") center / contain no-repeat`,
      ...style
    }
  }, rest));
}
Object.assign(__ds_scope, { Icon });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/core/Icon.jsx", error: String((e && e.message) || e) }); }

// components/core/Badge.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
const {
  useEffect,
  useRef,
  useState
} = React;
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
  sm: {
    h: 22,
    radius: 6,
    padText: 8,
    padSlot: 5,
    fs: 12,
    gap: 5,
    slot: 15,
    dot: 5
  },
  md: {
    h: 28,
    radius: 8,
    padText: 10,
    padSlot: 6,
    fs: 13,
    gap: 6,
    slot: 18,
    dot: 6
  },
  lg: {
    h: 34,
    radius: 10,
    padText: 12,
    padSlot: 7,
    fs: 14,
    gap: 7,
    slot: 22,
    dot: 7
  }
};

// flag 국기 에셋 기본 경로(DS 카드 기준). 소비처는 flagBase prop으로 재정의.
const FLAG_BASE = "../../assets/flags/";

// 질적 태그 8색 — [배경 50, 아웃라인 200, 라벨 700(밝은 hue는 800)]
const HUES = {
  neutral: ["--badge-neutral-50", "--badge-neutral-200", "--badge-neutral-700"],
  // white 배경
  gray: ["--badge-gray-50", "--badge-gray-200", "--badge-gray-700"],
  blue: ["--badge-blue-50", "--badge-blue-200", "--badge-blue-700"],
  sky: ["--badge-sky-50", "--badge-sky-200", "--badge-sky-700"],
  indigo: ["--badge-indigo-50", "--badge-indigo-200", "--badge-indigo-700"],
  amber: ["--badge-amber-50", "--badge-amber-200", "--badge-amber-800"],
  // 밝은 hue → 라벨 800
  rose: ["--badge-rose-50", "--badge-rose-200", "--badge-rose-700"],
  purple: ["--badge-purple-50", "--badge-purple-200", "--badge-purple-700"],
  teal: ["--badge-teal-50", "--badge-teal-200", "--badge-teal-700"]
};

// 상태 계열 색 (시스템 의미)
const STATUS = {
  active: {
    bg: "color-mix(in oklch, var(--primary) 12%, white)",
    line: "color-mix(in oklch, var(--primary) 24%, transparent)",
    text: "var(--primary)"
  },
  // new(신규) — active와 동일 tint. 멘토 사진(초록 배경 가능) 오버레이용이라 solid green 금지 — tint라야 어느 사진 위서도 읽힘.
  new: {
    bg: "color-mix(in oklch, var(--primary) 12%, white)",
    line: "color-mix(in oklch, var(--primary) 24%, transparent)",
    text: "var(--primary)"
  },
  closed: {
    bg: "color-mix(in oklch, var(--destructive) 12%, white)",
    line: "color-mix(in oklch, var(--destructive) 24%, transparent)",
    text: "var(--destructive)"
  },
  waiting: {
    bg: "var(--muted)",
    line: "var(--sage-200)",
    text: "var(--muted-foreground)"
  },
  hold: {
    bg: "var(--muted)",
    line: "var(--sage-200)",
    text: "var(--muted-foreground)"
  }
};
function palette(variant, status, hue) {
  if (variant === "status") return STATUS[status] || STATUS.waiting;
  const h = variant === "tag" ? HUES[hue] || HUES.neutral : HUES.neutral;
  return {
    bg: `var(${h[0]})`,
    line: `var(${h[1]})`,
    text: `var(${h[2]})`
  };
}
function Badge({
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
    const onDoc = e => {
      if (rootRef.current && !rootRef.current.contains(e.target)) setOpen(false);
    };
    document.addEventListener("pointerdown", onDoc);
    return () => document.removeEventListener("pointerdown", onDoc);
  }, [open]);
  let lead = null;
  if (leading === "dot") {
    lead = /*#__PURE__*/React.createElement("span", {
      style: {
        width: s.dot,
        height: s.dot,
        borderRadius: "50%",
        background: "currentColor",
        flex: "0 0 auto"
      }
    });
  } else if (leading === "flag") {
    // 원형 국기 SVG(assets/flags/{국가명}.svg). 미등록/실패 시 빈 원형 placeholder.
    lead = /*#__PURE__*/React.createElement("span", {
      style: {
        width: s.slot,
        height: s.slot,
        borderRadius: "50%",
        overflow: "hidden",
        flex: "0 0 auto",
        background: "var(--sage-100)",
        display: "inline-flex",
        boxShadow: "0 0 0 1px color-mix(in oklch, var(--sage-950) 8%, transparent)"
      }
    }, flag && /*#__PURE__*/React.createElement("img", {
      src: `${flagBase}${flag}.svg`,
      alt: "",
      onError: e => {
        e.currentTarget.style.display = "none";
      },
      style: {
        width: "100%",
        height: "100%",
        objectFit: "cover"
      }
    }));
  } else if (leading === "avatar" && avatar) {
    lead = /*#__PURE__*/React.createElement(__ds_scope.Avatar, _extends({}, avatar, {
      size: s.slot
    }));
  }

  // 펼침 트리거 — 카드 전체 클릭(이동) 안으로 전파 금지.
  const onToggle = e => {
    e.stopPropagation();
    e.preventDefault();
    setOpen(v => !v);
  };
  return /*#__PURE__*/React.createElement("span", _extends({
    ref: rootRef,
    style: {
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
      ...style
    }
  }, rest), lead, !labelHidden && children, hasExtra && /*#__PURE__*/React.createElement("button", {
    type: "button",
    onClick: onToggle,
    onPointerDown: e => e.stopPropagation(),
    "aria-expanded": open,
    style: {
      display: "inline-flex",
      alignItems: "center",
      gap: 2,
      margin: 0,
      padding: 0,
      border: "none",
      background: "none",
      font: "inherit",
      color: "inherit",
      cursor: "pointer",
      lineHeight: 1
    }
  }, "+", extraItems.length, /*#__PURE__*/React.createElement(__ds_scope.Icon, {
    name: "arrow-down-01",
    size: s.fs + 1,
    style: {
      color: "currentColor",
      transform: open ? "rotate(180deg)" : "none",
      transition: "transform 120ms ease"
    }
  })), hasExtra && open && /*#__PURE__*/React.createElement("span", {
    role: "listbox",
    onClick: e => {
      e.stopPropagation();
      e.preventDefault();
    },
    style: {
      position: "absolute",
      top: "calc(100% + 4px)",
      left: 0,
      zIndex: 30,
      minWidth: "100%",
      display: "flex",
      flexDirection: "column",
      padding: 4,
      borderRadius: "var(--radius-md)",
      background: "var(--card)",
      border: "1px solid var(--border)",
      boxShadow: "var(--shadow-md)",
      whiteSpace: "nowrap"
    }
  }, extraItems.map((it, i) => /*#__PURE__*/React.createElement("span", {
    key: i,
    style: {
      padding: "5px 9px",
      borderRadius: "var(--radius-sm)",
      fontSize: s.fs,
      fontWeight: 500,
      color: "var(--foreground)",
      lineHeight: 1.3
    }
  }, it))));
}
Object.assign(__ds_scope, { Badge });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/core/Badge.jsx", error: String((e && e.message) || e) }); }

// components/core/Button.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
const RADIUS = "var(--radius-md)";
const SIZES = {
  sm: {
    height: 32,
    padding: "0 12px",
    fontSize: "var(--text-caption)",
    gap: 6,
    icon: 16
  },
  md: {
    height: 38,
    padding: "0 16px",
    fontSize: "var(--text-body)",
    gap: 8,
    icon: 18
  },
  lg: {
    height: 44,
    padding: "0 22px",
    fontSize: "var(--text-h3)",
    gap: 8,
    icon: 20
  }
};
const VARIANTS = {
  primary: {
    background: "var(--primary)",
    color: "var(--primary-foreground)",
    border: "1px solid transparent"
  },
  secondary: {
    background: "var(--secondary)",
    color: "var(--secondary-foreground)",
    border: "1px solid transparent"
  },
  outline: {
    background: "var(--card)",
    color: "var(--foreground)",
    border: "1px solid var(--border)"
  },
  ghost: {
    background: "transparent",
    color: "var(--foreground)",
    border: "1px solid transparent"
  },
  destructive: {
    background: "var(--destructive)",
    color: "var(--destructive-foreground)",
    border: "1px solid transparent"
  }
};

/**
 * Button — shadcn/vega button in mentree tokens.
 */
function Button({
  variant = "primary",
  size = "md",
  iconLeft,
  iconRight,
  disabled = false,
  fullWidth = false,
  children,
  style,
  ...rest
}) {
  const s = SIZES[size] || SIZES.md;
  const v = VARIANTS[variant] || VARIANTS.primary;
  return /*#__PURE__*/React.createElement("button", _extends({
    disabled: disabled,
    style: {
      display: "inline-flex",
      alignItems: "center",
      justifyContent: "center",
      gap: s.gap,
      height: s.height,
      padding: s.padding,
      width: fullWidth ? "100%" : "auto",
      fontFamily: "var(--font-sans)",
      fontSize: s.fontSize,
      fontWeight: 500,
      lineHeight: 1,
      letterSpacing: "-0.01em",
      borderRadius: RADIUS,
      cursor: disabled ? "not-allowed" : "pointer",
      opacity: disabled ? 0.5 : 1,
      transition: "background-color 150ms ease, box-shadow 150ms ease, transform 120ms ease, filter 150ms ease",
      whiteSpace: "nowrap",
      ...v,
      ...style
    },
    onMouseDown: e => {
      if (!disabled) e.currentTarget.style.transform = "translateY(0.5px)";
    },
    onMouseUp: e => {
      e.currentTarget.style.transform = "none";
    },
    onMouseEnter: e => {
      if (!disabled) e.currentTarget.style.filter = "brightness(0.95)";
    },
    onMouseLeave: e => {
      e.currentTarget.style.filter = "none";
      e.currentTarget.style.transform = "none";
    }
  }, rest), iconLeft && /*#__PURE__*/React.createElement(__ds_scope.Icon, {
    name: iconLeft,
    size: s.icon
  }), children, iconRight && /*#__PURE__*/React.createElement(__ds_scope.Icon, {
    name: iconRight,
    size: s.icon
  }));
}
Object.assign(__ds_scope, { Button });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/core/Button.jsx", error: String((e && e.message) || e) }); }

// components/core/Chip.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
const {
  useState,
  useEffect
} = React;
/**
 * Chip — 눌리지만 켜지지 않는 칩. Badge(안 눌림)·FilterChip(눌리고 켜짐)과 다른 세 번째 계열.
 *  형태: --muted(sage-100) 채움 + 아웃라인 없음 — 이것이 Badge·FilterChip과 가르는 유일한 시각 신호.
 *  selected 없음. 켜짐이 필요하면 FilterChip을 쓴다.
 * [슬롯] href → <a>(hover 시 라벨 --primary) · onRemove → 형제 <button>(✕, HugeIcons cancel-01) ·
 *  둘 다 없으면 표시 전용 <span>. leading 슬롯 없음.
 * [크기] sm: h22(Badge sm과 동일)·radius --radius-sm·12px/500·padX8 — 카드 안 해시태그 /
 *  md: h32(FilterChip과 동일)·radius --radius-md·caption/500·padX12 — 필터 모달의 걸린 조건. pill 금지.
 * [prefix] 라벨 앞 문자(해시태그는 prefix="#"). 라벨 문자열에 #를 넣지 않는다 — 같은 데이터가 두 가지로 저장된다.
 * [상태] hover: 면 --sage-200 / active: 0.5px 눌림(Button·FilterChip과 동일 프레스) / focus-visible: --ring / disabled: 흐리게.
 * [터치] sm 시각 높이 22(Badge sm 정렬). onRemove 버튼은 투명 패딩(::after ±4)으로 타겟을 24 이상으로 넓힌다.
 */
const SIZES = {
  sm: {
    h: 22,
    radius: "var(--radius-sm)",
    pad: 8,
    padRight: 4,
    fs: 12,
    gap: 4,
    removeBtn: 18,
    iconSize: 12
  },
  md: {
    h: 32,
    radius: "var(--radius-md)",
    pad: 12,
    padRight: 6,
    fs: "var(--text-caption)",
    gap: 6,
    removeBtn: 22,
    iconSize: 13
  }
};
function Chip({
  href,
  prefix,
  onRemove,
  disabled = false,
  size = "md",
  children,
  style,
  ...rest
}) {
  const [hover, setHover] = useState(false);
  const [pressed, setPressed] = useState(false);
  useEffect(() => {
    if (document.getElementById("mt-chip-style")) return;
    const s = document.createElement("style");
    s.id = "mt-chip-style";
    s.textContent = ".mt-chip:focus-visible{outline:2px solid var(--ring);outline-offset:2px;}" + ".mt-chip-remove{position:relative;}" + ".mt-chip-remove::after{content:'';position:absolute;inset:-4px;}" + ".mt-chip-remove:focus-visible{outline:2px solid var(--ring);outline-offset:2px;}";
    document.head.appendChild(s);
  }, []);
  const s = SIZES[size] || SIZES.md;
  const interactive = !disabled && (href || onRemove);
  const bg = hover && !disabled ? "var(--sage-200)" : "var(--muted)";
  const labelColor = href && hover && !disabled ? "var(--primary)" : "var(--sage-700)";
  const outer = {
    display: "inline-flex",
    alignItems: "center",
    justifyContent: "center",
    gap: s.gap,
    height: s.h,
    borderRadius: s.radius,
    background: bg,
    fontFamily: "var(--font-sans)",
    fontSize: s.fs,
    fontWeight: 500,
    lineHeight: 1,
    letterSpacing: "-0.01em",
    whiteSpace: "nowrap",
    transition: "background-color 150ms ease, color 150ms ease, transform 120ms ease",
    opacity: disabled ? 0.5 : 1,
    transform: pressed ? "translateY(0.5px)" : "none"
  };
  const hoverHandlers = interactive ? {
    onMouseEnter: () => setHover(true),
    onMouseLeave: () => {
      setHover(false);
      setPressed(false);
    }
  } : {};
  if (!onRemove) {
    // 슬롯 없음(표시 전용) 또는 href만 — 단일 엘리먼트.
    const Tag = href ? "a" : "span";
    const tagProps = href ? disabled ? {
      "aria-disabled": true,
      tabIndex: -1,
      style: {
        pointerEvents: "none"
      }
    } : {
      href
    } : {};
    return /*#__PURE__*/React.createElement(Tag, _extends({
      className: "mt-chip"
    }, hoverHandlers, {
      onMouseDown: href && !disabled ? () => setPressed(true) : undefined,
      onMouseUp: href ? () => setPressed(false) : undefined,
      style: {
        ...outer,
        padding: `0 ${s.pad}px`,
        color: labelColor,
        textDecoration: "none",
        cursor: disabled ? "not-allowed" : href ? "pointer" : "default",
        ...style
      }
    }, tagProps, rest), prefix, children);
  }

  // onRemove — 라벨(span 또는 a)과 ✕ 버튼을 형제로 둔다(링크 안에 버튼 금지).
  return /*#__PURE__*/React.createElement("span", _extends({
    className: "mt-chip"
  }, hoverHandlers, {
    style: {
      ...outer,
      padding: `0 ${s.padRight}px 0 ${s.pad}px`,
      ...style
    }
  }, rest), href ? /*#__PURE__*/React.createElement("a", _extends({
    href: disabled ? undefined : href,
    onMouseDown: !disabled ? () => setPressed(true) : undefined,
    onMouseUp: () => setPressed(false)
  }, disabled ? {
    "aria-disabled": true,
    tabIndex: -1
  } : {}, {
    style: {
      color: labelColor,
      textDecoration: "none",
      cursor: disabled ? "not-allowed" : "pointer",
      pointerEvents: disabled ? "none" : "auto"
    }
  }), prefix, children) : /*#__PURE__*/React.createElement("span", {
    style: {
      color: labelColor
    }
  }, prefix, children), /*#__PURE__*/React.createElement("button", {
    type: "button",
    className: "mt-chip-remove",
    "aria-label": "\uC0AD\uC81C",
    disabled: disabled,
    onClick: e => {
      e.stopPropagation();
      if (!disabled) onRemove();
    },
    onMouseDown: !disabled ? () => setPressed(true) : undefined,
    onMouseUp: () => setPressed(false),
    style: {
      width: s.removeBtn,
      height: s.removeBtn,
      display: "inline-flex",
      alignItems: "center",
      justifyContent: "center",
      padding: 0,
      border: "none",
      background: "transparent",
      borderRadius: "50%",
      color: labelColor,
      cursor: disabled ? "not-allowed" : "pointer",
      flex: "0 0 auto"
    }
  }, /*#__PURE__*/React.createElement(__ds_scope.Icon, {
    name: "cancel-01",
    size: s.iconSize
  })));
}
Object.assign(__ds_scope, { Chip });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/core/Chip.jsx", error: String((e && e.message) || e) }); }

// components/core/IconButton.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
const SIZES = {
  sm: 32,
  md: 38,
  lg: 44
};
const ICON = {
  sm: 16,
  md: 18,
  lg: 20
};
const VARIANTS = {
  primary: {
    background: "var(--primary)",
    color: "var(--primary-foreground)",
    border: "1px solid transparent"
  },
  secondary: {
    background: "var(--secondary)",
    color: "var(--secondary-foreground)",
    border: "1px solid transparent"
  },
  outline: {
    background: "var(--card)",
    color: "var(--foreground)",
    border: "1px solid var(--border)"
  },
  ghost: {
    background: "transparent",
    color: "var(--muted-foreground)",
    border: "1px solid transparent"
  }
};

/**
 * IconButton — square button with a single HugeIcons glyph.
 */
const IconButton = React.forwardRef(function IconButton({
  icon,
  variant = "ghost",
  size = "md",
  disabled = false,
  ariaLabel,
  style,
  ...rest
}, ref) {
  const dim = SIZES[size] || SIZES.md;
  const v = VARIANTS[variant] || VARIANTS.ghost;
  return /*#__PURE__*/React.createElement("button", _extends({
    ref: ref,
    disabled: disabled,
    "aria-label": ariaLabel || icon,
    style: {
      display: "inline-flex",
      alignItems: "center",
      justifyContent: "center",
      width: dim,
      height: dim,
      borderRadius: "var(--radius-md)",
      cursor: disabled ? "not-allowed" : "pointer",
      opacity: disabled ? 0.5 : 1,
      transition: "background-color 150ms ease, filter 150ms ease",
      ...v,
      ...style
    },
    onMouseEnter: e => {
      if (!disabled && variant === "ghost") e.currentTarget.style.background = "var(--secondary)";else if (!disabled) e.currentTarget.style.filter = "brightness(0.95)";
    },
    onMouseLeave: e => {
      e.currentTarget.style.background = v.background;
      e.currentTarget.style.filter = "none";
    }
  }, rest), /*#__PURE__*/React.createElement(__ds_scope.Icon, {
    name: icon,
    size: ICON[size] || ICON.md
  }));
});
Object.assign(__ds_scope, { IconButton });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/core/IconButton.jsx", error: String((e && e.message) || e) }); }

// components/forms/Checkbox.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
/**
 * Checkbox — controlled checkbox with a HugeIcons tick.
 */
function Checkbox({
  checked = false,
  onChange,
  disabled = false,
  label,
  id,
  style,
  ...rest
}) {
  const box = /*#__PURE__*/React.createElement("span", _extends({
    role: "checkbox",
    "aria-checked": checked,
    onClick: () => !disabled && onChange && onChange(!checked),
    style: {
      display: "inline-flex",
      alignItems: "center",
      justifyContent: "center",
      width: 18,
      height: 18,
      flex: "0 0 auto",
      borderRadius: "var(--radius-sm)",
      border: `1.5px solid ${checked ? "var(--primary)" : "var(--input)"}`,
      background: checked ? "var(--primary)" : "var(--card)",
      cursor: disabled ? "not-allowed" : "pointer",
      transition: "background-color 120ms ease, border-color 120ms ease",
      ...style
    }
  }, rest), checked && /*#__PURE__*/React.createElement(__ds_scope.Icon, {
    name: "tick-02",
    size: 13,
    style: {
      color: "var(--primary-foreground)"
    }
  }));
  if (!label) return box;
  return /*#__PURE__*/React.createElement("label", {
    htmlFor: id,
    style: {
      display: "inline-flex",
      alignItems: "center",
      gap: 8,
      cursor: disabled ? "not-allowed" : "pointer",
      opacity: disabled ? 0.6 : 1,
      fontFamily: "var(--font-sans)",
      fontSize: "var(--text-body)",
      color: "var(--foreground)"
    }
  }, box, label);
}
Object.assign(__ds_scope, { Checkbox });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/forms/Checkbox.jsx", error: String((e && e.message) || e) }); }

// components/forms/Field.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
/**
 * Field — label + control + description/error wrapper (shadcn Field convention).
 * FieldGroup — vertical stack of Fields.
 */
function Field({
  label,
  htmlFor,
  description,
  error,
  required = false,
  children,
  style,
  ...rest
}) {
  return /*#__PURE__*/React.createElement("div", _extends({
    style: {
      display: "flex",
      flexDirection: "column",
      gap: 6,
      ...style
    }
  }, rest), label && /*#__PURE__*/React.createElement("label", {
    htmlFor: htmlFor,
    style: {
      fontFamily: "var(--font-sans)",
      fontSize: "var(--text-caption)",
      fontWeight: 500,
      color: "var(--foreground)",
      display: "inline-flex",
      gap: 4
    }
  }, label, required && /*#__PURE__*/React.createElement("span", {
    style: {
      color: "var(--destructive)"
    }
  }, "*")), children, error ? /*#__PURE__*/React.createElement("span", {
    style: {
      fontSize: "var(--text-caption)",
      color: "var(--destructive)"
    }
  }, error) : description ? /*#__PURE__*/React.createElement("span", {
    style: {
      fontSize: "var(--text-caption)",
      color: "var(--muted-foreground)"
    }
  }, description) : null);
}
function FieldGroup({
  children,
  gap = 18,
  style,
  ...rest
}) {
  return /*#__PURE__*/React.createElement("div", _extends({
    style: {
      display: "flex",
      flexDirection: "column",
      gap,
      ...style
    }
  }, rest), children);
}
Object.assign(__ds_scope, { Field, FieldGroup });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/forms/Field.jsx", error: String((e && e.message) || e) }); }

// components/forms/Input.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
/**
 * Input — text field (shadcn/vega), mentree tokens.
 */
function Input({
  iconLeft,
  invalid = false,
  disabled = false,
  style,
  ...rest
}) {
  const [focused, setFocused] = React.useState(false);
  const borderColor = invalid ? "var(--destructive)" : focused ? "var(--ring)" : "var(--input)";
  return /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      alignItems: "center",
      gap: 8,
      height: 38,
      padding: iconLeft ? "0 12px 0 11px" : "0 12px",
      background: disabled ? "var(--muted)" : "var(--card)",
      border: `1px solid ${borderColor}`,
      borderRadius: "var(--radius-md)",
      boxShadow: focused ? "0 0 0 3px color-mix(in oklch, var(--ring) 30%, transparent)" : "none",
      transition: "border-color 150ms ease, box-shadow 150ms ease",
      opacity: disabled ? 0.6 : 1,
      ...style
    }
  }, iconLeft && /*#__PURE__*/React.createElement(__ds_scope.Icon, {
    name: iconLeft,
    size: 17,
    style: {
      color: "var(--muted-foreground)"
    }
  }), /*#__PURE__*/React.createElement("input", _extends({
    disabled: disabled,
    onFocus: e => {
      setFocused(true);
      rest.onFocus && rest.onFocus(e);
    },
    onBlur: e => {
      setFocused(false);
      rest.onBlur && rest.onBlur(e);
    }
  }, rest, {
    style: {
      flex: 1,
      minWidth: 0,
      border: "none",
      outline: "none",
      background: "transparent",
      fontFamily: "var(--font-sans)",
      fontSize: "var(--text-body)",
      letterSpacing: "-0.01em",
      color: "var(--foreground)"
    }
  })));
}
Object.assign(__ds_scope, { Input });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/forms/Input.jsx", error: String((e && e.message) || e) }); }

// components/forms/RadioGroup.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
/**
 * RadioGroup — single-select list of options.
 */
function RadioGroup({
  options = [],
  value,
  onChange,
  name,
  disabled = false,
  style,
  ...rest
}) {
  return /*#__PURE__*/React.createElement("div", _extends({
    role: "radiogroup",
    style: {
      display: "flex",
      flexDirection: "column",
      gap: 10,
      ...style
    }
  }, rest), options.map(o => {
    const val = typeof o === "string" ? o : o.value;
    const lab = typeof o === "string" ? o : o.label;
    const selected = value === val;
    return /*#__PURE__*/React.createElement("label", {
      key: val,
      style: {
        display: "inline-flex",
        alignItems: "center",
        gap: 9,
        cursor: disabled ? "not-allowed" : "pointer",
        opacity: disabled ? 0.6 : 1,
        fontFamily: "var(--font-sans)",
        fontSize: "var(--text-body)",
        color: "var(--foreground)"
      }
    }, /*#__PURE__*/React.createElement("span", {
      role: "radio",
      "aria-checked": selected,
      onClick: () => !disabled && onChange && onChange(val),
      style: {
        display: "inline-flex",
        alignItems: "center",
        justifyContent: "center",
        width: 18,
        height: 18,
        flex: "0 0 auto",
        borderRadius: "50%",
        border: `1.5px solid ${selected ? "var(--primary)" : "var(--input)"}`,
        background: "var(--card)",
        transition: "border-color 120ms ease"
      }
    }, selected && /*#__PURE__*/React.createElement("span", {
      style: {
        width: 9,
        height: 9,
        borderRadius: "50%",
        background: "var(--primary)"
      }
    })), lab);
  }));
}
Object.assign(__ds_scope, { RadioGroup });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/forms/RadioGroup.jsx", error: String((e && e.message) || e) }); }

// components/forms/Select.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
/**
 * Select — native-backed select styled to match Input.
 */
function Select({
  options = [],
  placeholder,
  invalid = false,
  disabled = false,
  value,
  onChange,
  style,
  ...rest
}) {
  const [focused, setFocused] = React.useState(false);
  const borderColor = invalid ? "var(--destructive)" : focused ? "var(--ring)" : "var(--input)";
  return /*#__PURE__*/React.createElement("div", {
    style: {
      position: "relative",
      display: "flex",
      alignItems: "center",
      height: 38,
      background: disabled ? "var(--muted)" : "var(--card)",
      border: `1px solid ${borderColor}`,
      borderRadius: "var(--radius-md)",
      boxShadow: focused ? "0 0 0 3px color-mix(in oklch, var(--ring) 30%, transparent)" : "none",
      transition: "border-color 150ms ease, box-shadow 150ms ease",
      opacity: disabled ? 0.6 : 1,
      ...style
    }
  }, /*#__PURE__*/React.createElement("select", _extends({
    disabled: disabled,
    value: value,
    onChange: onChange,
    onFocus: () => setFocused(true),
    onBlur: () => setFocused(false)
  }, rest, {
    style: {
      appearance: "none",
      WebkitAppearance: "none",
      flex: 1,
      height: "100%",
      border: "none",
      outline: "none",
      background: "transparent",
      padding: "0 36px 0 12px",
      fontFamily: "var(--font-sans)",
      fontSize: "var(--text-body)",
      letterSpacing: "-0.01em",
      color: value ? "var(--foreground)" : "var(--muted-foreground)",
      cursor: disabled ? "not-allowed" : "pointer"
    }
  }), placeholder && /*#__PURE__*/React.createElement("option", {
    value: ""
  }, placeholder), options.map(o => {
    const val = typeof o === "string" ? o : o.value;
    const lab = typeof o === "string" ? o : o.label;
    return /*#__PURE__*/React.createElement("option", {
      key: val,
      value: val
    }, lab);
  })), /*#__PURE__*/React.createElement(__ds_scope.Icon, {
    name: "arrow-down-01",
    size: 16,
    style: {
      position: "absolute",
      right: 11,
      color: "var(--muted-foreground)",
      pointerEvents: "none"
    }
  }));
}
Object.assign(__ds_scope, { Select });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/forms/Select.jsx", error: String((e && e.message) || e) }); }

// components/forms/Switch.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
/**
 * Switch — on/off toggle.
 */
function Switch({
  checked = false,
  onChange,
  disabled = false,
  label,
  style,
  ...rest
}) {
  const control = /*#__PURE__*/React.createElement("span", _extends({
    role: "switch",
    "aria-checked": checked,
    onClick: () => !disabled && onChange && onChange(!checked),
    style: {
      position: "relative",
      display: "inline-flex",
      alignItems: "center",
      width: 38,
      height: 22,
      flex: "0 0 auto",
      borderRadius: "999px",
      background: checked ? "var(--primary)" : "var(--sage-300)",
      cursor: disabled ? "not-allowed" : "pointer",
      transition: "background-color 150ms ease",
      padding: 2,
      ...style
    }
  }, rest), /*#__PURE__*/React.createElement("span", {
    style: {
      width: 18,
      height: 18,
      borderRadius: "50%",
      background: "white",
      boxShadow: "var(--shadow-xs)",
      transform: checked ? "translateX(16px)" : "translateX(0)",
      transition: "transform 150ms ease"
    }
  }));
  if (!label) return control;
  return /*#__PURE__*/React.createElement("label", {
    style: {
      display: "inline-flex",
      alignItems: "center",
      gap: 10,
      cursor: disabled ? "not-allowed" : "pointer",
      opacity: disabled ? 0.6 : 1,
      fontFamily: "var(--font-sans)",
      fontSize: "var(--text-body)",
      color: "var(--foreground)"
    }
  }, control, label);
}
Object.assign(__ds_scope, { Switch });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/forms/Switch.jsx", error: String((e && e.message) || e) }); }

// components/forms/ToggleGroup.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
/**
 * ToggleGroup — segmented single/multi select (shadcn ToggleGroup).
 * Prefer this over a row of buttons for pick-one / pick-many option sets.
 */
function ToggleGroup({
  options = [],
  value,
  onChange,
  multiple = false,
  size = "md",
  style,
  ...rest
}) {
  const h = size === "sm" ? 32 : 38;
  const pad = size === "sm" ? "0 12px" : "0 16px";
  const isOn = val => multiple ? Array.isArray(value) && value.includes(val) : value === val;
  const toggle = val => {
    if (!onChange) return;
    if (multiple) {
      const arr = Array.isArray(value) ? value : [];
      onChange(arr.includes(val) ? arr.filter(v => v !== val) : [...arr, val]);
    } else {
      onChange(val);
    }
  };
  return /*#__PURE__*/React.createElement("div", _extends({
    role: "group",
    style: {
      display: "inline-flex",
      padding: 3,
      gap: 3,
      background: "var(--secondary)",
      borderRadius: "var(--radius-md)",
      ...style
    }
  }, rest), options.map(o => {
    const val = typeof o === "string" ? o : o.value;
    const lab = typeof o === "string" ? o : o.label;
    const icon = typeof o === "object" ? o.icon : null;
    const on = isOn(val);
    return /*#__PURE__*/React.createElement("button", {
      key: val,
      onClick: () => toggle(val),
      style: {
        display: "inline-flex",
        alignItems: "center",
        gap: 6,
        height: h,
        padding: pad,
        border: "none",
        borderRadius: "calc(var(--radius-md) - 3px)",
        background: on ? "var(--card)" : "transparent",
        color: on ? "var(--foreground)" : "var(--muted-foreground)",
        boxShadow: on ? "var(--shadow-xs)" : "none",
        fontFamily: "var(--font-sans)",
        fontSize: "var(--text-caption)",
        fontWeight: 500,
        cursor: "pointer",
        transition: "background-color 120ms ease, color 120ms ease",
        whiteSpace: "nowrap"
      }
    }, icon && /*#__PURE__*/React.createElement(__ds_scope.Icon, {
      name: icon,
      size: 15
    }), lab);
  }));
}
Object.assign(__ds_scope, { ToggleGroup });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/forms/ToggleGroup.jsx", error: String((e && e.message) || e) }); }

// components/navigation/Banner.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
/**
 * Banner — 배치 컴포넌트. 인라인 둥근 프로모/유도 블록(페이지 흐름 중간 삽입).
 *  CalloutBar(각진 풀폭 공지)와 구분 — 이건 둥근 인라인 프로모. 목적은 "눈에 띄기".
 *  "자유 영역(slot)" 성격: 내부 표현을 엄격히 규정하지 않는다.
 *
 *  [고정 — 외곽 최소 규칙] radius 22(카드와 같은 표면 언어) · 인라인(좌우 여백) · 기본 패딩 16 ·
 *   기본 전체 클리커블 · 전역 뼈대 상속(Pretendard JP · 禁則 · 시맨틱 구조).
 *  [자유] 배경(팔레트 벗어난 과감한 색·그라데이션 허용) · 표현 효과 · 레이아웃/높이/CTA — background,
 *   style, children로 매번 다르게. variant 없음.
 */
function Banner({
  href,
  onClick,
  background,
  padding = 16,
  clickable,
  children,
  style,
  ...rest
}) {
  // href나 onClick이 있으면 기본 클리커블. clickable=false로 명시 해제 가능.
  const isClickable = clickable != null ? clickable : Boolean(href || onClick);
  const Tag = href ? "a" : "div";
  const base = {
    display: "block",
    position: "relative",
    boxSizing: "border-box",
    width: "100%",
    // 고정: radius 22(카드와 같은 표면 언어) — 자유 영역이라도 이것만은 통일.
    borderRadius: "var(--card-radius)",
    padding: typeof padding === "number" ? `${padding}px` : padding,
    // 전역 뼈대 상속 필수: 폰트 · 禁則.
    fontFamily: "var(--font-sans)",
    wordBreak: "keep-all",
    overflowWrap: "break-word",
    color: "var(--foreground)",
    textDecoration: "none",
    // 자유: 배경은 팔레트를 벗어날 수 있음(그라데이션 등). 미지정 시 투명.
    background: background || "transparent",
    cursor: isClickable ? "pointer" : "default",
    overflow: "hidden",
    ...style
  };
  return /*#__PURE__*/React.createElement(Tag, _extends({
    href: href,
    onClick: onClick,
    style: base
  }, rest), children);
}
Object.assign(__ds_scope, { Banner });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/navigation/Banner.jsx", error: String((e && e.message) || e) }); }

// components/navigation/BottomTabBar.jsx
try { (() => {
/**
 * BottomTabBar — Mobile(~768) 전용 하단 고정 탭 네비게이션. 4탭: 멘토 찾기 · Q&A 멘토링 ·
 * 멘트리 인사이트 · MY 멘트리. 아이콘(위)+라벨(아래) 세로 배치, HugeIcons 모노톤 —
 * 헤더 오버레이(컬러 SVG)와 별개의 차분한 UI. 활성=primary green / 비활성=muted.
 * 높이 56 + iOS safe-area 하단 여백. 배경 frosted glass(white 반투명 + backdrop blur) + 상단 sage hairline. 풀블리드 fixed.
 * Desktop(769+)에선 렌더돼도 CSS로 숨김.
 *
 * MY 멘트리: guest는 로그인 유도 자리만(onAuth 콜백) — 로그인 후 동작은 OPEN #9.
 */

const TABS = [{
  key: "mentors",
  label: "멘토 찾기",
  icon: "user-search-01",
  href: "/mentors"
}, {
  key: "qna",
  label: "Q&A 멘토링",
  icon: "quiz-05",
  href: "/qna"
}, {
  key: "insights",
  label: "멘트리 인사이트",
  icon: "news",
  href: "/insights"
}, {
  key: "my",
  label: "MY 멘트리",
  icon: "user-circle-02",
  href: "/my"
}];
function ensureTabBarStyle() {
  if (typeof document === "undefined" || document.getElementById("mt-tabbar-style")) return;
  const s = document.createElement("style");
  s.id = "mt-tabbar-style";
  s.textContent = "@media (min-width:769px){.mt-tabbar{display:none !important;}}";
  document.head.appendChild(s);
}
function BottomTabBar({
  activeKey,
  authState = "guest",
  onNavigate,
  onAuth,
  style
}) {
  React.useEffect(ensureTabBarStyle, []);
  const go = (e, tab) => {
    if (tab.key === "my" && authState === "guest") {
      // 비로그인 — 로그인 유도 (자리만; 로그인 후 동작은 OPEN #9)
      if (onAuth) {
        e.preventDefault();
        onAuth(e, tab);
      } else e.preventDefault();
      return;
    }
    if (onNavigate) {
      e.preventDefault();
      onNavigate(tab);
    }
  };
  return /*#__PURE__*/React.createElement("nav", {
    className: "mt-tabbar",
    "aria-label": "\uD558\uB2E8 \uD0ED \uB124\uBE44\uAC8C\uC774\uC158",
    style: {
      position: "fixed",
      left: 0,
      right: 0,
      bottom: 0,
      zIndex: 50,
      background: "color-mix(in oklch, white 78%, transparent)",
      backdropFilter: "blur(12px)",
      WebkitBackdropFilter: "blur(12px)",
      borderTop: "1px solid var(--sage-200)",
      paddingBottom: "env(safe-area-inset-bottom, 0px)",
      fontFamily: "var(--font-sans)",
      ...style
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      height: 56
    }
  }, TABS.map(tab => {
    const on = activeKey === tab.key;
    return /*#__PURE__*/React.createElement("a", {
      key: tab.key,
      href: tab.href,
      onClick: e => go(e, tab),
      "aria-current": on ? "page" : undefined,
      style: {
        flex: 1,
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        gap: 3,
        textDecoration: "none",
        color: on ? "var(--primary)" : "var(--muted-foreground)"
      }
    }, /*#__PURE__*/React.createElement(__ds_scope.Icon, {
      name: tab.icon,
      size: 22,
      "aria-hidden": "true"
    }), /*#__PURE__*/React.createElement("span", {
      style: {
        fontSize: "var(--text-caption)",
        lineHeight: 1,
        fontWeight: on ? 600 : 500,
        letterSpacing: "-0.01em"
      }
    }, tab.label));
  })));
}
Object.assign(__ds_scope, { BottomTabBar });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/navigation/BottomTabBar.jsx", error: String((e && e.message) || e) }); }

// components/navigation/CalloutBar.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
/**
 * CalloutBar — 배치 컴포넌트. 블리드 풀폭 띠(화면 폭 꽉 참, 모서리 각짐 radius 0).
 *  헤더 위/아래에 붙는 공지·안내·상태·경고 띠. (인라인 둥근 Banner와 구분 — 이건 각진 풀폭.)
 *  얇은 한 줄 기준(44 전후), 텍스트 2줄까지 허용(모바일). 정렬 center(기본)/left.
 *  구성: (아이콘) + 메시지 + (인라인 링크 "자세히 보기 >") + (닫기 X) — 각각 독립 옵션.
 *  variant 4종: 옅은 배경 + 진한 텍스트/아이콘(Badge 50/700 패턴 상속).
 */
const VARIANTS = {
  info: {
    bg: "var(--sage-50)",
    text: "var(--sage-700)",
    line: "var(--sage-200)",
    defaultIcon: "information-circle"
  },
  success: {
    bg: "color-mix(in oklch, var(--primary) 10%, white)",
    text: "var(--primary)",
    line: "color-mix(in oklch, var(--primary) 22%, transparent)",
    defaultIcon: "checkmark-circle-02"
  },
  warning: {
    bg: "var(--badge-amber-50)",
    text: "var(--badge-amber-800)",
    line: "var(--badge-amber-200)",
    defaultIcon: "alert-02"
  },
  error: {
    bg: "color-mix(in oklch, var(--destructive) 9%, white)",
    text: "var(--destructive)",
    line: "color-mix(in oklch, var(--destructive) 22%, transparent)",
    defaultIcon: "alert-circle"
  }
};
function CalloutBar({
  variant = "info",
  align = "center",
  icon,
  showIcon = true,
  children,
  linkLabel,
  linkHref,
  onLinkClick,
  onClose,
  style,
  ...rest
}) {
  const v = VARIANTS[variant] || VARIANTS.info;
  const iconName = icon || v.defaultIcon;
  return /*#__PURE__*/React.createElement("div", _extends({
    role: variant === "error" || variant === "warning" ? "alert" : "status",
    style: {
      width: "100%",
      boxSizing: "border-box",
      display: "flex",
      alignItems: "center",
      // 중앙 정렬 기본 / 좌측 정렬 변형. 닫기 X는 항상 오른쪽 끝.
      justifyContent: align === "left" ? "flex-start" : "center",
      gap: 10,
      minHeight: 44,
      padding: "10px 20px",
      // 블리드 풀폭 — 모서리 각짐(radius 0)
      borderRadius: 0,
      background: v.bg,
      color: v.text,
      fontFamily: "var(--font-sans)",
      fontSize: "var(--text-body)",
      lineHeight: 1.5,
      wordBreak: "keep-all",
      overflowWrap: "break-word",
      // 禁則: break-all 금지
      ...style
    }
  }, rest), /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      alignItems: "center",
      gap: 8,
      minWidth: 0,
      flexWrap: "wrap",
      justifyContent: align === "left" ? "flex-start" : "center"
    }
  }, showIcon && /*#__PURE__*/React.createElement(__ds_scope.Icon, {
    name: iconName,
    size: 18,
    style: {
      flex: "0 0 auto",
      color: v.text
    }
  }), /*#__PURE__*/React.createElement("span", {
    style: {
      fontWeight: 500
    }
  }, children), linkLabel && /*#__PURE__*/React.createElement("a", {
    href: linkHref || "#",
    onClick: onLinkClick,
    style: {
      display: "inline-flex",
      alignItems: "center",
      gap: 2,
      color: v.text,
      fontWeight: 600,
      textDecoration: "underline",
      textUnderlineOffset: 2
    }
  }, linkLabel, /*#__PURE__*/React.createElement(__ds_scope.Icon, {
    name: "arrow-right-01",
    size: 15,
    style: {
      color: v.text
    }
  }))), onClose && /*#__PURE__*/React.createElement("button", {
    type: "button",
    onClick: onClose,
    "aria-label": "\uB2EB\uAE30",
    style: {
      marginLeft: "auto",
      flex: "0 0 auto",
      display: "inline-flex",
      alignItems: "center",
      justifyContent: "center",
      width: 28,
      height: 28,
      padding: 0,
      border: "none",
      background: "transparent",
      color: v.text,
      borderRadius: "var(--radius-sm)",
      cursor: "pointer"
    }
  }, /*#__PURE__*/React.createElement(__ds_scope.Icon, {
    name: "cancel-01",
    size: 16
  })));
}
Object.assign(__ds_scope, { CalloutBar });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/navigation/CalloutBar.jsx", error: String((e && e.message) || e) }); }

// components/navigation/Carousel.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
/**
 * Carousel — 배치 컴포넌트. 카드를 가로로 나열하는 범용 스크롤/스냅 컨테이너.
 *  담기는 카드 종류 고정 안 함(멘토·인터뷰·아티클 등 무엇이든). 조작부(화살표)는 없음 —
 *  좌우 화살표는 SectionHeader가 담당하고, Carousel은 스크롤/스냅 로직만.
 *  데스크톱 기본 거동. mode("peek"|"snap-fit")와 좌우 배경(white) 페이드 추가.
 *   peek: 마지막 카드가 의도적으로 잘려 걸침(N+1) — "더 있음" 강조. snap-fit: 컨테이너 폭에 딱 떨어짐(잘림 없음).
 *   페이드: peek 모드 전용(overflow 시 우측 배경색(white), 시작이 아니면 좌측에도). snap-fit/unit은 페이드 없음. 1280 데스크톱 기준.
 *   세로 그림자: 스크롤 트랙 상하 여유 패딩 + 동일 크기 음수 마진으로, 가로 스크롤을 유지하면서 카드 세로 그림자가 잘리지 않게(외부 점유 박스 불변).
 *
 *  화살표 연동: ref로 scrollPrev()/scrollNext() 호출(1단위=현재 표시 개수만큼 이동).
 *  끝 도달은 onEdgeChange({atStart, atEnd})로 통지 → SectionHeader 화살표 disabled.
 */
const Carousel = React.forwardRef(function Carousel({
  children,
  gap = 16,
  snap = "card",
  mode = "snap-fit",
  onEdgeChange,
  style,
  ...rest
}, ref) {
  const trackRef = React.useRef(null);
  const [fade, setFade] = React.useState({
    left: false,
    right: false
  });
  // 세로 그림자가 스크롤 오버플로(overflow-x:auto → y도 auto로 클립)에 잘리지 않도록
  // 트랙 상하에 그림자 여유 패딩을 두고, 같은 크기의 음수 마진으로 되돌려 점유 박스는 동일하게 유지.
  const SHADOW_PAD = 18;
  const readEdges = React.useCallback(() => {
    const el = trackRef.current;
    if (!el) return;
    const overflow = el.scrollWidth - el.clientWidth > 1;
    const atStart = el.scrollLeft <= 1;
    const atEnd = el.scrollLeft >= el.scrollWidth - el.clientWidth - 1;
    // 페이드는 peek 모드 전용("더 있음" 강조). snap-fit/unit은 overflow여도 페이드 없음.
    const peek = mode === "peek";
    setFade({
      left: peek && overflow && !atStart,
      right: peek && overflow && !atEnd
    });
    if (onEdgeChange) onEdgeChange({
      atStart,
      atEnd
    });
  }, [onEdgeChange, mode]);

  // 화살표 = 한 페이지 넘기기. 자유 스크롤의 카드 1장 스냅과는 별개.
  //  snap="unit": 1단위 = 트랙 가시 폭 한 화면.
  //  snap="card": 현재 표시 개수(컨테이너 폭 ÷ (카드폭+gap))만큼 = 한 페이지.
  const stepBy = React.useCallback(dir => {
    const el = trackRef.current;
    if (!el) return;
    const items = Array.from(el.children);
    if (!items.length) return;
    let amount;
    if (snap === "unit") {
      amount = el.clientWidth + gap;
    } else {
      const cardW = items[0].getBoundingClientRect().width;
      const perView = Math.max(1, Math.floor((el.clientWidth + gap) / (cardW + gap)));
      amount = (cardW + gap) * perView;
    }
    el.scrollBy({
      left: dir * amount,
      behavior: "smooth"
    });
  }, [gap, snap]);
  React.useImperativeHandle(ref, () => ({
    scrollPrev: () => stepBy(-1),
    scrollNext: () => stepBy(1),
    getEdges: () => {
      const el = trackRef.current;
      if (!el) return {
        atStart: true,
        atEnd: true
      };
      return {
        atStart: el.scrollLeft <= 1,
        atEnd: el.scrollLeft >= el.scrollWidth - el.clientWidth - 1
      };
    }
  }), [stepBy]);
  React.useEffect(() => {
    readEdges();
    const el = trackRef.current;
    if (!el) return;
    el.addEventListener("scroll", readEdges, {
      passive: true
    });
    window.addEventListener("resize", readEdges);
    return () => {
      el.removeEventListener("scroll", readEdges);
      window.removeEventListener("resize", readEdges);
    };
  }, [readEdges]);
  return /*#__PURE__*/React.createElement("div", {
    style: {
      position: "relative",
      ...style
    }
  }, /*#__PURE__*/React.createElement("div", _extends({
    ref: trackRef,
    style: {
      display: "flex",
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
      marginBottom: -SHADOW_PAD
    }
  }, rest), React.Children.map(children, child => {
    if (!React.isValidElement(child)) return child;
    return React.cloneElement(child, {
      style: {
        flex: "0 0 auto",
        scrollSnapAlign: "start",
        scrollSnapStop: "always",
        ...(child.props.style || {})
      }
    });
  })), /*#__PURE__*/React.createElement("div", {
    "aria-hidden": "true",
    style: {
      position: "absolute",
      top: 0,
      bottom: 0,
      left: 0,
      width: 40,
      pointerEvents: "none",
      background: "linear-gradient(90deg, var(--background), transparent)",
      opacity: fade.left ? 1 : 0,
      transition: "opacity 150ms ease"
    }
  }), /*#__PURE__*/React.createElement("div", {
    "aria-hidden": "true",
    style: {
      position: "absolute",
      top: 0,
      bottom: 0,
      right: 0,
      width: 40,
      pointerEvents: "none",
      background: "linear-gradient(270deg, var(--background), transparent)",
      opacity: fade.right ? 1 : 0,
      transition: "opacity 150ms ease"
    }
  }));
});
Object.assign(__ds_scope, { Carousel });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/navigation/Carousel.jsx", error: String((e && e.message) || e) }); }

// components/navigation/Pagination.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
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
function Pagination({
  page,
  totalPages,
  onPageChange,
  style,
  ...rest
}) {
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
  const go = n => {
    if (n !== cur && onPageChange) onPageChange(n);
  };
  const face = extra => ({
    display: "inline-flex",
    alignItems: "center",
    justifyContent: "center",
    width: FACE,
    height: FACE,
    borderRadius: "var(--radius-md)",
    fontSize: "var(--text-body)",
    fontVariantNumeric: "tabular-nums",
    transition: "background .12s, color .12s",
    ...extra
  });
  return /*#__PURE__*/React.createElement("nav", _extends({
    "aria-label": "\uD398\uC774\uC9C0",
    style: {
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      gap: 0,
      fontFamily: "var(--font-sans)",
      ...style
    }
  }, rest), items.map((it, i) => it === "…" ?
  /*#__PURE__*/
  // 「…」은 버튼이 아니다 — 눌리지 않는다.
  React.createElement("span", {
    key: `e${i}`,
    "aria-hidden": "true",
    style: {
      width: 24,
      height: HIT,
      display: "inline-flex",
      alignItems: "center",
      justifyContent: "center",
      color: "var(--muted-foreground)",
      fontSize: "var(--text-body)"
    }
  }, "\u2026") : it === cur ?
  /*#__PURE__*/
  // 현재 페이지 — 버튼이 아니라 위치 표시. 눌러도 아무 일이 없다.
  React.createElement("span", {
    key: it,
    "aria-current": "page",
    style: {
      width: HIT,
      height: HIT,
      display: "inline-flex",
      alignItems: "center",
      justifyContent: "center"
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: face({
      background: "var(--primary)",
      color: "var(--primary-foreground)",
      fontWeight: 600
    })
  }, it)) : /*#__PURE__*/React.createElement("button", {
    key: it,
    type: "button",
    className: "mt-pg-btn",
    onClick: () => go(it),
    style: {
      width: HIT,
      height: HIT,
      display: "inline-flex",
      alignItems: "center",
      justifyContent: "center"
    },
    "aria-label": `${it}페이지`
  }, /*#__PURE__*/React.createElement("span", {
    className: "mt-pg-face",
    style: face()
  }, it))), /*#__PURE__*/React.createElement("button", {
    type: "button",
    className: "mt-pg-btn",
    onClick: () => go(1),
    disabled: cur === 1,
    style: {
      width: HIT,
      height: HIT,
      display: "inline-flex",
      alignItems: "center",
      justifyContent: "center",
      marginLeft: 4
    },
    "aria-label": "\uCCAB \uD398\uC774\uC9C0"
  }, /*#__PURE__*/React.createElement("span", {
    className: "mt-pg-face",
    style: face({
      border: "1px solid var(--border)"
    })
  }, "\xAB")), /*#__PURE__*/React.createElement("button", {
    type: "button",
    className: "mt-pg-btn",
    onClick: () => go(total),
    disabled: cur === total,
    style: {
      width: HIT,
      height: HIT,
      display: "inline-flex",
      alignItems: "center",
      justifyContent: "center"
    },
    "aria-label": "\uB9C8\uC9C0\uB9C9 \uD398\uC774\uC9C0"
  }, /*#__PURE__*/React.createElement("span", {
    className: "mt-pg-face",
    style: face({
      border: "1px solid var(--border)"
    })
  }, "\xBB")), /*#__PURE__*/React.createElement("style", null, CSS));
}
Object.assign(__ds_scope, { Pagination });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/navigation/Pagination.jsx", error: String((e && e.message) || e) }); }

// components/navigation/SectionHeader.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
/**
 * SectionHeader — 배치 컴포넌트. 가로 한 줄, 좌우 양끝 정렬(좌 제목 / 우 액션).
 *  중앙정렬형은 미포함(개별 대응). 배지·버튼·IconButton·아이콘은 기존 컴포넌트 재사용.
 *
 *  좌: [장식 아이콘 칩(옵션)] 제목(30 semibold, green 강조 조각 옵션) [부가 스트링(옵션)] [Badge(옵션)]
 *  우: 전체보기(고스트+화살표) / 아웃라인 버튼(옵션) / 캐러셀 화살표 IconButton 2개(옵션)
 *
 *  DS-GAP: 섹션 제목 30 은 현재 타입스케일(h1=24) 밖. 히어로·페이지 타이틀 등 큰 텍스트와
 *  함께 스케일 상단(h0/display) 정리 필요 — 별도 작업. 지금은 30/semibold 임시 지정.
 */
function SectionHeader({
  icon,
  title,
  titleAccent,
  suffix,
  badge,
  viewAll,
  onViewAll,
  action,
  carousel = false,
  onPrev,
  onNext,
  prevDisabled = false,
  nextDisabled = false,
  style,
  ...rest
}) {
  return /*#__PURE__*/React.createElement("div", _extends({
    style: {
      display: "flex",
      alignItems: "center",
      justifyContent: "space-between",
      gap: 16,
      width: "100%",
      fontFamily: "var(--font-sans)",
      color: "var(--foreground)",
      ...style
    }
  }, rest), /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      alignItems: "center",
      gap: 12,
      minWidth: 0
    }
  }, icon && /*#__PURE__*/React.createElement("span", {
    style: {
      flex: "0 0 auto",
      display: "inline-flex",
      alignItems: "center",
      justifyContent: "center",
      width: 44,
      height: 44,
      borderRadius: 12,
      background: "var(--sage-50)",
      color: "var(--sage-700)",
      border: "1px solid var(--sage-200)"
    }
  }, /*#__PURE__*/React.createElement(__ds_scope.Icon, {
    name: icon,
    size: 24
  })), /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      alignItems: "center",
      gap: 10,
      minWidth: 0,
      flexWrap: "wrap"
    }
  }, /*#__PURE__*/React.createElement("h2", {
    style: {
      margin: 0,
      fontSize: "var(--text-h0)",
      fontWeight: 600,
      letterSpacing: "var(--text-h0--letter-spacing)",
      lineHeight: "var(--text-h0--line-height)",
      wordBreak: "keep-all",
      overflowWrap: "break-word"
    }
  }, title, titleAccent && /*#__PURE__*/React.createElement("span", {
    style: {
      color: "var(--primary)"
    }
  }, titleAccent)), suffix && /*#__PURE__*/React.createElement("span", {
    style: {
      fontSize: "var(--text-body)",
      color: "var(--muted-foreground)"
    }
  }, suffix), badge)), (viewAll || action || carousel) && /*#__PURE__*/React.createElement("div", {
    style: {
      flex: "0 0 auto",
      display: "flex",
      alignItems: "center",
      gap: 8
    }
  }, action, viewAll && /*#__PURE__*/React.createElement(__ds_scope.Button, {
    variant: "ghost",
    size: "md",
    iconRight: "circle-arrow-up-right",
    onClick: onViewAll
  }, "\uC804\uCCB4\uBCF4\uAE30"), carousel &&
  /*#__PURE__*/
  /* 세그먼트 그룹 — 바깥 모서리만 radius(12), 맞붙는 안쪽은 각짐.
     오른쪽 버튼 marginLeft -1 로 두 테두리를 겹쳐 가운데 hairline divider 하나로. */
  React.createElement("div", {
    style: {
      display: "inline-flex",
      alignItems: "center"
    }
  }, /*#__PURE__*/React.createElement(__ds_scope.IconButton, {
    icon: "arrow-left-02",
    variant: "outline",
    ariaLabel: "\uC774\uC804",
    onClick: onPrev,
    disabled: prevDisabled,
    style: {
      borderRadius: "var(--radius-md) 0 0 var(--radius-md)"
    }
  }), /*#__PURE__*/React.createElement(__ds_scope.IconButton, {
    icon: "arrow-right-02",
    variant: "outline",
    ariaLabel: "\uB2E4\uC74C",
    onClick: onNext,
    disabled: nextDisabled,
    style: {
      borderRadius: "0 var(--radius-md) var(--radius-md) 0",
      marginLeft: -1
    }
  }))));
}
Object.assign(__ds_scope, { SectionHeader });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/navigation/SectionHeader.jsx", error: String((e && e.message) || e) }); }

// components/navigation/Sidebar.jsx
try { (() => {
/**
 * Sidebar — app navigation rail using the sidebar-* tokens.
 * items: [{ key, label, icon, badge?, section? }] — group by `section`.
 */
function Sidebar({
  items = [],
  active,
  onSelect,
  header,
  footer,
  width = 248,
  style
}) {
  // group by section preserving order
  const groups = [];
  items.forEach(it => {
    const sec = it.section || "";
    let g = groups.find(x => x.section === sec);
    if (!g) {
      g = {
        section: sec,
        items: []
      };
      groups.push(g);
    }
    g.items.push(it);
  });
  return /*#__PURE__*/React.createElement("nav", {
    style: {
      width,
      minHeight: 0,
      display: "flex",
      flexDirection: "column",
      background: "var(--sidebar)",
      borderRight: "1px solid var(--sidebar-border)",
      color: "var(--sidebar-foreground)",
      fontFamily: "var(--font-sans)",
      ...style
    }
  }, header && /*#__PURE__*/React.createElement("div", {
    style: {
      padding: "18px 16px 10px"
    }
  }, header), /*#__PURE__*/React.createElement("div", {
    style: {
      flex: 1,
      overflow: "auto",
      padding: "6px 10px"
    }
  }, groups.map((g, gi) => /*#__PURE__*/React.createElement("div", {
    key: gi,
    style: {
      marginBottom: 10
    }
  }, g.section && /*#__PURE__*/React.createElement("div", {
    style: {
      padding: "8px 10px 4px",
      fontSize: 11,
      fontWeight: 600,
      letterSpacing: "0.06em",
      textTransform: "uppercase",
      color: "var(--muted-foreground)"
    }
  }, g.section), g.items.map(it => {
    const on = active === it.key;
    return /*#__PURE__*/React.createElement("button", {
      key: it.key,
      onClick: () => onSelect && onSelect(it.key),
      style: {
        display: "flex",
        alignItems: "center",
        gap: 10,
        width: "100%",
        padding: "9px 10px",
        marginBottom: 2,
        border: "none",
        borderRadius: "var(--radius-md)",
        background: on ? "var(--sidebar-primary)" : "transparent",
        color: on ? "var(--sidebar-primary-foreground)" : "var(--sidebar-foreground)",
        fontSize: "var(--text-body)",
        fontWeight: on ? 600 : 500,
        letterSpacing: "-0.01em",
        cursor: "pointer",
        textAlign: "left",
        transition: "background-color 120ms ease, color 120ms ease"
      },
      onMouseEnter: e => {
        if (!on) e.currentTarget.style.background = "var(--sidebar-accent)";
      },
      onMouseLeave: e => {
        if (!on) e.currentTarget.style.background = "transparent";
      }
    }, it.icon && /*#__PURE__*/React.createElement(__ds_scope.Icon, {
      name: it.icon,
      size: 19
    }), /*#__PURE__*/React.createElement("span", {
      style: {
        flex: 1,
        whiteSpace: "nowrap",
        overflow: "hidden",
        textOverflow: "ellipsis"
      }
    }, it.label), it.badge != null && /*#__PURE__*/React.createElement("span", {
      className: "tabular",
      style: {
        fontSize: 11,
        fontWeight: 600,
        padding: "1px 7px",
        borderRadius: 999,
        background: on ? "color-mix(in oklch, white 25%, transparent)" : "var(--secondary)",
        color: on ? "var(--sidebar-primary-foreground)" : "var(--secondary-foreground)"
      }
    }, it.badge));
  })))), footer && /*#__PURE__*/React.createElement("div", {
    style: {
      padding: "10px 12px",
      borderTop: "1px solid var(--sidebar-border)"
    }
  }, footer));
}
Object.assign(__ds_scope, { Sidebar });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/navigation/Sidebar.jsx", error: String((e && e.message) || e) }); }

// components/navigation/Tabs.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
/**
 * Tabs — 같은 셸 안에서 내용을 바꾸는 전환(화면을 떠나지 않는다). WAI-ARIA tabs 패턴.
 * [ToggleGroup과의 경계] ToggleGroup=같은 목록의 조건을 바꾼다(면을 채운다) ·
 *  Tabs=내용 자체가 바뀐다(밑줄을 긋는다). 이 시각 차이로 둘을 구별한다 — Tabs는 면을 채우지 않는다.
 * [선택 표시] 밑줄(--primary 2px) + 라벨 색(--foreground/600). 색만으로 가르지 않는다(WCAG 1.4.1).
 * [카운트] count를 넘기면 라벨 뒤에 Badge sm — 선택 탭은 status/active(green tint), 미선택은 분류(뉴트럴).
 *  배지는 눌리지 않는다(탭 버튼 안의 표시).
 * [폭] 탭 수 2~10. 줄바꿈하지 않는다(두 줄이 되면 셸 높이가 탭 수에 따라 변한다) — 가로 스크롤 +
 *  스크롤바 감춤 + 가장자리 페이드(더 있다는 신호). 선택 탭이 화면 밖이면 보이는 자리로 스크롤한다.
 * [키보드] 좌우 화살표 이동(disabled 건너뜀) · Home/End · roving tabindex(선택 탭만 Tab 순서).
 * [제어형] value + onChange(next). URL에 담는 화면이 있어 부모가 상태를 가진다.
 */
const FADE = 28;
if (typeof document !== "undefined" && !document.getElementById("mt-tabs-style")) {
  const s = document.createElement("style");
  s.id = "mt-tabs-style";
  s.textContent = ".mt-tabs-list{scrollbar-width:none;-ms-overflow-style:none;}" + ".mt-tabs-list::-webkit-scrollbar{display:none;}" + ".mt-tab:focus-visible{outline:2px solid var(--ring);outline-offset:-2px;border-radius:var(--radius-sm);}";
  document.head.appendChild(s);
}
function Tabs({
  items = [],
  value,
  onChange,
  idBase = "tabs",
  ariaLabel = "탭",
  style,
  ...rest
}) {
  const listRef = React.useRef(null);
  const btnRefs = React.useRef({});
  const [edges, setEdges] = React.useState({
    left: false,
    right: false
  });
  const updateEdges = React.useCallback(() => {
    const el = listRef.current;
    if (!el) return;
    const max = el.scrollWidth - el.clientWidth;
    setEdges({
      left: el.scrollLeft > 1,
      right: el.scrollLeft < max - 1
    });
  }, []);
  React.useEffect(() => {
    updateEdges();
    const el = listRef.current;
    if (!el) return undefined;
    const ro = typeof ResizeObserver !== "undefined" ? new ResizeObserver(updateEdges) : null;
    if (ro) ro.observe(el);
    return () => {
      if (ro) ro.disconnect();
    };
  }, [updateEdges, items.length]);

  // 선택 탭이 화면 밖이면 보이는 자리로(scrollIntoView 대신 컨테이너 스크롤만 움직인다).
  React.useEffect(() => {
    const el = listRef.current;
    const btn = btnRefs.current[value];
    if (!el || !btn) return;
    const left = btn.offsetLeft - FADE;
    const right = btn.offsetLeft + btn.offsetWidth + FADE;
    if (left < el.scrollLeft) el.scrollTo({
      left: Math.max(0, left),
      behavior: "smooth"
    });else if (right > el.scrollLeft + el.clientWidth) el.scrollTo({
      left: right - el.clientWidth,
      behavior: "smooth"
    });
    updateEdges();
  }, [value, updateEdges]);
  const enabled = items.filter(t => !t.disabled);
  const move = dir => {
    if (enabled.length === 0) return;
    const i = enabled.findIndex(t => t.value === value);
    const next = dir === "home" ? enabled[0] : dir === "end" ? enabled[enabled.length - 1] : enabled[(i + (dir === "next" ? 1 : -1) + enabled.length) % enabled.length];
    if (next && onChange) onChange(next.value);
    const btn = btnRefs.current[next && next.value];
    if (btn) btn.focus();
  };
  const onKeyDown = e => {
    if (e.key === "ArrowRight") {
      e.preventDefault();
      move("next");
    } else if (e.key === "ArrowLeft") {
      e.preventDefault();
      move("prev");
    } else if (e.key === "Home") {
      e.preventDefault();
      move("home");
    } else if (e.key === "End") {
      e.preventDefault();
      move("end");
    }
  };
  return /*#__PURE__*/React.createElement("div", _extends({
    style: {
      position: "relative",
      width: "100%",
      ...style
    }
  }, rest), /*#__PURE__*/React.createElement("div", {
    ref: listRef,
    className: "mt-tabs-list",
    role: "tablist",
    "aria-label": ariaLabel,
    onScroll: updateEdges,
    onKeyDown: onKeyDown,
    style: {
      display: "flex",
      alignItems: "stretch",
      gap: 4,
      overflowX: "auto",
      overflowY: "hidden",
      flexWrap: "nowrap",
      borderBottom: "1px solid var(--border)",
      fontFamily: "var(--font-sans)"
    }
  }, items.map(t => {
    const on = t.value === value;
    return /*#__PURE__*/React.createElement(TabButton, {
      key: t.value,
      tab: t,
      selected: on,
      idBase: idBase,
      onSelect: () => {
        if (!t.disabled && onChange) onChange(t.value);
      },
      buttonRef: el => {
        btnRefs.current[t.value] = el;
      }
    });
  })), edges.left && /*#__PURE__*/React.createElement("span", {
    "aria-hidden": "true",
    style: {
      position: "absolute",
      left: 0,
      top: 0,
      bottom: 1,
      width: FADE,
      pointerEvents: "none",
      background: "linear-gradient(to right, var(--background), transparent)"
    }
  }), edges.right && /*#__PURE__*/React.createElement("span", {
    "aria-hidden": "true",
    style: {
      position: "absolute",
      right: 0,
      top: 0,
      bottom: 1,
      width: FADE,
      pointerEvents: "none",
      background: "linear-gradient(to left, var(--background), transparent)"
    }
  }));
}
function TabButton({
  tab,
  selected,
  idBase,
  onSelect,
  buttonRef
}) {
  const [hover, setHover] = React.useState(false);
  const color = tab.disabled ? "var(--sage-400)" : selected ? "var(--foreground)" : hover ? "var(--sage-700)" : "var(--muted-foreground)";
  return /*#__PURE__*/React.createElement("button", {
    type: "button",
    role: "tab",
    className: "mt-tab",
    ref: buttonRef,
    id: `${idBase}-tab-${tab.value}`,
    "aria-selected": selected,
    "aria-controls": `${idBase}-panel-${tab.value}`,
    "aria-disabled": tab.disabled || undefined,
    tabIndex: selected ? 0 : -1,
    disabled: tab.disabled,
    onClick: onSelect,
    onMouseEnter: () => setHover(true),
    onMouseLeave: () => setHover(false),
    style: {
      display: "inline-flex",
      alignItems: "center",
      gap: 6,
      flex: "0 0 auto",
      height: 42,
      padding: "0 12px",
      margin: 0,
      border: "none",
      background: "transparent",
      borderBottom: `2px solid ${selected ? "var(--primary)" : "transparent"}`,
      marginBottom: -1,
      color,
      fontFamily: "var(--font-sans)",
      fontSize: "var(--text-body)",
      fontWeight: selected ? 600 : 500,
      lineHeight: 1,
      whiteSpace: "nowrap",
      cursor: tab.disabled ? "not-allowed" : "pointer",
      opacity: tab.disabled ? 0.6 : 1,
      transition: "color 150ms ease, border-color 150ms ease"
    }
  }, tab.label, tab.count != null && /*#__PURE__*/React.createElement(__ds_scope.Badge, {
    size: "sm",
    variant: selected ? "status" : "category",
    status: selected ? "active" : undefined
  }, tab.count));
}

/** 탭 패널 — Tabs와 같은 idBase를 넘긴다. 선택된 값만 렌더한다. */
function TabPanel({
  idBase = "tabs",
  value,
  children,
  style,
  ...rest
}) {
  return /*#__PURE__*/React.createElement("div", _extends({
    role: "tabpanel",
    id: `${idBase}-panel-${value}`,
    "aria-labelledby": `${idBase}-tab-${value}`,
    tabIndex: 0,
    style: {
      paddingTop: 16,
      fontFamily: "var(--font-sans)",
      color: "var(--foreground)",
      ...style
    }
  }, rest), children);
}
Object.assign(__ds_scope, { Tabs, TabPanel });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/navigation/Tabs.jsx", error: String((e && e.message) || e) }); }

// components/navigation/nav-ia.js
try { (() => {
/* ============================================================================
   mentree — nav-ia.js
   네비게이션 정보구조(IA)의 단일 소스(SSoT).
   상단 헤더(Header)와 푸터(Footer)가 이 파일 하나를 공통으로 참조한다.
   ⚠ 링크/라벨을 바꿀 때는 여기만 고친다 — 헤더·푸터가 함께 반영된다.
   ========================================================================== */

/* 최상위 네비게이션 (헤더/푸터 공통).
   ※ '기업 서비스(Biz)'는 mentree 본체가 아니라 외부 사이트로 나가는 출구 링크다.
     external:true 로 표시하고 Biz 서브브랜드(파랑, --biz-*)로 격리해 렌더한다. */
const NAV_PRIMARY = [{
  key: "mentors",
  label: "멘토 찾기",
  href: "/mentors"
}, {
  key: "qna",
  label: "Q&A 멘토링",
  href: "/qna"
}, {
  key: "insights",
  label: "멘트리 인사이트",
  href: "/insights"
}, {
  key: "biz",
  label: "기업 서비스",
  href: "https://biz.mentree.co.kr",
  external: true,
  brand: "biz"
}];

/* 인증 (헤더는 버튼, 푸터는 링크로 렌더). */
const NAV_AUTH = [{
  key: "signup",
  label: "회원가입",
  href: "/signup",
  variant: "primary"
}, {
  key: "login",
  label: "로그인",
  href: "/login",
  variant: "ghost"
}];

/* 부가 (공지/뉴스). */
const NAV_UTILITY = [{
  key: "notices",
  label: "공지사항",
  href: "/notices"
}, {
  key: "news",
  label: "뉴스",
  href: "/news"
}];

/* 하위 상세 페이지 — 네비게이션에는 노출하지 않는다(딥링크/내부 이동 대상).
   멘토 상세 · Q&A 상세 · 아티클 상세 · 이벤트 상세 · 나의 성향 분석 */
const NAV_DETAIL = [{
  key: "mentor-detail",
  label: "멘토 상세",
  parent: "mentors"
}, {
  key: "qna-detail",
  label: "Q&A 상세",
  parent: "qna"
}, {
  key: "article-detail",
  label: "아티클 상세",
  parent: "insights"
}, {
  key: "event-detail",
  label: "이벤트 상세",
  parent: "insights"
}, {
  key: "aptitude",
  label: "나의 성향 분석",
  parent: "mentors"
}];
Object.assign(__ds_scope, { NAV_PRIMARY, NAV_AUTH, NAV_UTILITY, NAV_DETAIL });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/navigation/nav-ia.js", error: String((e && e.message) || e) }); }

// components/navigation/Footer.jsx
try { (() => {
/**
 * Footer — mentree 사이트 푸터. 헤더와 동일한 IA(nav-ia.js, SSoT)를 공유한다.
 * 로고는 mentree 워드마크이며 푸터에서는 sage-500로 톤 다운(헤더는 풀컴러). 좌측 정렬, brand prop으로 교체 가능.
 * '기업 서비스(Biz)'는 외부 출구 링크(푸터 링크 목록에서는 기존 표기 유지).
 */
function Footer({
  primary = __ds_scope.NAV_PRIMARY,
  auth = __ds_scope.NAV_AUTH,
  utility = __ds_scope.NAV_UTILITY,
  brand,
  copyright = "© 2026 mentree. All rights reserved.",
  onNavigate,
  style
}) {
  const go = (e, item) => {
    if (onNavigate) {
      e.preventDefault();
      onNavigate(item);
    }
  };
  const linkStyle = isBiz => ({
    display: "inline-flex",
    alignItems: "center",
    gap: 4,
    fontSize: "var(--text-body)",
    letterSpacing: "-0.01em",
    textDecoration: "none",
    color: isBiz ? "var(--biz-primary)" : "var(--muted-foreground)",
    width: "fit-content"
  });
  const Column = ({
    title,
    items
  }) => /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      flexDirection: "column",
      gap: 10,
      minWidth: 120
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: "var(--text-caption)",
      fontWeight: 600,
      color: "var(--foreground)",
      letterSpacing: "0.02em"
    }
  }, title), items.map(item => {
    const isBiz = item.brand === "biz";
    return /*#__PURE__*/React.createElement("a", {
      key: item.key,
      href: item.href,
      onClick: e => go(e, item),
      target: item.external ? "_blank" : undefined,
      rel: item.external ? "noopener noreferrer" : undefined,
      style: linkStyle(isBiz),
      onMouseEnter: e => {
        e.currentTarget.style.color = isBiz ? "var(--biz-primary)" : "var(--foreground)";
      },
      onMouseLeave: e => {
        e.currentTarget.style.color = isBiz ? "var(--biz-primary)" : "var(--muted-foreground)";
      }
    }, item.label, item.external && /*#__PURE__*/React.createElement(__ds_scope.Icon, {
      name: "arrow-up-right-01",
      size: 13,
      style: {
        color: isBiz ? "var(--biz-primary)" : "var(--muted-foreground)"
      }
    }));
  }));
  return /*#__PURE__*/React.createElement("footer", {
    style: {
      width: "100%",
      background: "var(--background)",
      borderTop: "1px solid var(--border)",
      fontFamily: "var(--font-sans)",
      color: "var(--foreground)",
      ...style
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      maxWidth: "var(--container-max)",
      margin: "0 auto",
      padding: "40px var(--container-pad) 28px",
      boxSizing: "border-box"
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      flexWrap: "wrap",
      gap: 48,
      justifyContent: "space-between"
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      flexDirection: "column",
      alignItems: "flex-start",
      gap: 12,
      maxWidth: 260
    }
  }, brand || /*#__PURE__*/React.createElement("span", {
    "aria-label": "mentree",
    style: {
      display: "block",
      width: 120,
      height: 24,
      background: "var(--sage-500)",
      WebkitMaskImage: "url(../../assets/logo/mentree-logo.svg)",
      maskImage: "url(../../assets/logo/mentree-logo.svg)",
      WebkitMaskRepeat: "no-repeat",
      maskRepeat: "no-repeat",
      WebkitMaskPosition: "left center",
      maskPosition: "left center",
      WebkitMaskSize: "contain",
      maskSize: "contain"
    }
  }), /*#__PURE__*/React.createElement("p", {
    style: {
      fontSize: "var(--text-caption)",
      color: "var(--muted-foreground)",
      lineHeight: 1.6,
      margin: 0
    }
  }, "\uBA58\uD1A0\uC640 \uBA58\uD2F0\uB97C \uC787\uB294 \uBA58\uD1A0\uB9C1 \uD50C\uB7AB\uD3FC")), /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      flexWrap: "wrap",
      gap: 48
    }
  }, /*#__PURE__*/React.createElement(Column, {
    title: "\uC11C\uBE44\uC2A4",
    items: primary
  }), /*#__PURE__*/React.createElement(Column, {
    title: "\uACE0\uAC1D\uC9C0\uC6D0",
    items: utility
  }), /*#__PURE__*/React.createElement(Column, {
    title: "\uD68C\uC6D0",
    items: auth
  }))), /*#__PURE__*/React.createElement("div", {
    style: {
      marginTop: 32,
      paddingTop: 20,
      borderTop: "1px solid var(--border)",
      display: "flex",
      flexWrap: "wrap",
      gap: 12,
      alignItems: "center",
      justifyContent: "space-between"
    }
  }, /*#__PURE__*/React.createElement("span", {
    className: "tabular",
    style: {
      fontSize: "var(--text-caption)",
      color: "var(--muted-foreground)"
    }
  }, copyright), /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      gap: 16
    }
  }, /*#__PURE__*/React.createElement("a", {
    href: "/terms",
    style: {
      fontSize: "var(--text-caption)",
      color: "var(--muted-foreground)",
      textDecoration: "none"
    }
  }, "\uC774\uC6A9\uC57D\uAD00"), /*#__PURE__*/React.createElement("a", {
    href: "/privacy",
    style: {
      fontSize: "var(--text-caption)",
      color: "var(--muted-foreground)",
      textDecoration: "none",
      fontWeight: 600
    }
  }, "\uAC1C\uC778\uC815\uBCF4\uCC98\uB9AC\uBC29\uCE68")))));
}
Object.assign(__ds_scope, { Footer });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/navigation/Footer.jsx", error: String((e && e.message) || e) }); }

// components/navigation/Header.jsx
try { (() => {
/**
 * Header — 제품 기본 상단 네비게이션(sticky top). 좌우 3분할: 좌(로고)/중(메뉴)/우(액션).
 *  좌: mentree 워드마크 풀컬러 그린(헤더는 밝은 배경 → 풀컬러 유지), 클릭 → 홈.
 *  중: 최상위 메뉴 3개(멘토 찾기·Q&A 멘토링·멘트리 인사이트). 각 메뉴 좌측 28px 아이콘 슬롯 —
 *     HugeIcons 아님, 오리지널 컬러 SVG 예정(전역 아이콘 원칙의 명시적 예외). 지금은 placeholder.
 *     활성 메뉴 = primary green.
 *  우: 회원가입/로그인(green 버튼 하나로 합침) + 기업 서비스(중립 outline, 외부 ↗).
 *     공지사항·뉴스는 헤더에 두지 않음(푸터에만).
 *
 *  반응형 3구간:
 *   Desktop L(1280+)  — 현행 그대로.
 *   Desktop S(769–1279) — 기업 서비스 버튼만 숨김.
 *   Mobile(~768) — 중앙 3메뉴 제거, 우측 = 회원가입/로그인 + 햄버거.
 *     햄버거 → GNB 아래 전체화면 오버레이(3메뉴 + MY 멘트리 + 구분선 + 기업 서비스 + 로그아웃(로그인 시)).
 *     GNB 바는 유지, 햄버거만 X로 토글.
 *
 *  상태 분기: authState "guest"(비로그인) / "mentor" / "mentee". 지금은 guest만 실제 구현,
 *  mentor·mentee는 분기 자리만(placeholder) — 나중 확정.
 */

const HEADER_H = 64;
function ensureHeaderStyle() {
  if (typeof document === "undefined" || document.getElementById("mt-header-style")) return;
  const s = document.createElement("style");
  s.id = "mt-header-style";
  s.textContent = [/* Desktop S: 기업 서비스 버튼 숨김 */
  "@media (max-width:1279px){.mt-header-bizbtn{display:none !important;}}", /* Mobile: 중앙 메뉴 숨김 */
  "@media (max-width:768px){.mt-header-nav{display:none !important;}}", /* Desktop: 햄버거·오버레이 숨김 */
  "@media (min-width:769px){.mt-header-burger{display:none !important;}.mt-header-overlay{display:none !important;}}"].join("\n");
  document.head.appendChild(s);
}

/* 28px 컬러 아이콘 슬롯 — HugeIcons 아님(오리지널 컬러 SVG 예정). 지금은 placeholder. */
function MenuIconSlot({
  item,
  on
}) {
  return /*#__PURE__*/React.createElement("span", {
    "aria-hidden": "true",
    style: {
      flex: "0 0 auto",
      width: 28,
      height: 28,
      borderRadius: "var(--radius-sm)",
      background: on ? "color-mix(in oklch, var(--primary) 12%, transparent)" : "var(--sage-100)",
      ...(item && item.menuIcon ? {
        backgroundImage: `url(${item.menuIcon})`,
        backgroundSize: "cover",
        backgroundPosition: "center"
      } : {})
    }
  }, item && item.menuIconEl);
}
function Header({
  menu,
  brand,
  activeKey,
  authState = "guest",
  onNavigate,
  onAuth,
  style
}) {
  const [open, setOpen] = React.useState(false);
  React.useEffect(ensureHeaderStyle, []);

  // 중앙 메뉴 = biz(외부 출구) 제외한 최상위 3개.
  const items = menu || __ds_scope.NAV_PRIMARY.filter(i => i.brand !== "biz");
  const biz = __ds_scope.NAV_PRIMARY.find(i => i.brand === "biz");
  const go = (e, item) => {
    setOpen(false);
    if (onNavigate) {
      e.preventDefault();
      onNavigate(item);
    }
  };
  return /*#__PURE__*/React.createElement("header", {
    style: {
      position: "sticky",
      top: 0,
      zIndex: 50,
      width: "100%",
      background: "color-mix(in oklch, white 78%, transparent)",
      backdropFilter: "blur(12px)",
      WebkitBackdropFilter: "blur(12px)",
      borderBottom: "1px solid var(--border)",
      fontFamily: "var(--font-sans)",
      color: "var(--foreground)",
      ...style
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      alignItems: "center",
      gap: 24,
      height: HEADER_H,
      maxWidth: "var(--container-max)",
      margin: "0 auto",
      padding: "0 var(--container-pad)",
      boxSizing: "border-box"
    }
  }, /*#__PURE__*/React.createElement("a", {
    href: "/",
    onClick: e => go(e, {
      key: "home",
      label: "홈",
      href: "/"
    }),
    "aria-label": "mentree \uD648",
    style: {
      display: "flex",
      alignItems: "center",
      flex: "0 0 auto",
      textDecoration: "none"
    }
  }, brand || /*#__PURE__*/React.createElement("img", {
    src: "../../assets/logo/mentree-logo.svg",
    alt: "mentree",
    style: {
      height: 24,
      display: "block"
    }
  })), /*#__PURE__*/React.createElement("nav", {
    className: "mt-header-nav",
    style: {
      display: "flex",
      alignItems: "center",
      gap: 4,
      flex: 1,
      justifyContent: "center"
    }
  }, items.map(item => {
    const on = activeKey === item.key;
    return /*#__PURE__*/React.createElement("a", {
      key: item.key,
      href: item.href,
      onClick: e => go(e, item),
      "aria-current": on ? "page" : undefined,
      style: {
        display: "inline-flex",
        alignItems: "center",
        gap: 8,
        padding: "8px 14px",
        borderRadius: "var(--radius-md)",
        fontSize: "var(--text-body)",
        fontWeight: on ? 600 : 500,
        letterSpacing: "-0.01em",
        textDecoration: "none",
        color: on ? "var(--primary)" : "var(--foreground)",
        transition: "background-color 120ms ease, color 120ms ease"
      },
      onMouseEnter: e => {
        if (!on) e.currentTarget.style.background = "var(--secondary)";
      },
      onMouseLeave: e => {
        e.currentTarget.style.background = "transparent";
      }
    }, /*#__PURE__*/React.createElement(MenuIconSlot, {
      item: item,
      on: on
    }), item.label);
  })), /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      alignItems: "center",
      gap: 10,
      flex: "0 0 auto",
      marginLeft: "auto"
    }
  }, authState === "guest" ? /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement(__ds_scope.Button, {
    size: "md",
    variant: "primary",
    onClick: e => onAuth && onAuth(e, {
      key: "auth",
      label: "회원가입/로그인",
      href: "/login"
    })
  }, "\uD68C\uC6D0\uAC00\uC785/\uB85C\uADF8\uC778"), biz && /*#__PURE__*/React.createElement(__ds_scope.Button, {
    className: "mt-header-bizbtn",
    size: "md",
    variant: "outline",
    onClick: e => go(e, biz)
  }, "\uAE30\uC5C5 \uC11C\uBE44\uC2A4")) :
  /*#__PURE__*/
  /* 멘토·멘티 로그인 상태 — 분기 자리만(미구현 placeholder). 나중 확정. */
  React.createElement("span", {
    "data-auth-state": authState,
    style: {
      display: "inline-flex",
      alignItems: "center",
      height: 40,
      padding: "0 14px",
      borderRadius: "var(--radius-md)",
      border: "1px dashed var(--border)",
      color: "var(--muted-foreground)",
      fontSize: "var(--text-caption)",
      fontFamily: "ui-monospace, monospace"
    }
  }, authState, " \uC561\uC158 (\uBBF8\uAD6C\uD604)"), /*#__PURE__*/React.createElement("span", {
    className: "mt-header-burger",
    style: {
      display: "inline-flex"
    }
  }, /*#__PURE__*/React.createElement(__ds_scope.IconButton, {
    icon: open ? "cancel-01" : "menu-01",
    variant: "ghost",
    size: "lg",
    ariaLabel: open ? "메뉴 닫기" : "메뉴 열기",
    "aria-expanded": open,
    onClick: () => setOpen(v => !v)
  })))), open && /*#__PURE__*/React.createElement("div", {
    className: "mt-header-overlay",
    role: "dialog",
    "aria-label": "\uC804\uCCB4 \uBA54\uB274",
    style: {
      position: "fixed",
      top: HEADER_H,
      left: 0,
      right: 0,
      bottom: 0,
      zIndex: 49,
      background: "var(--background)",
      overflowY: "auto"
    }
  }, /*#__PURE__*/React.createElement("nav", {
    style: {
      maxWidth: "var(--container-max)",
      margin: "0 auto",
      padding: "12px var(--container-pad) 32px",
      boxSizing: "border-box",
      display: "flex",
      flexDirection: "column"
    }
  }, items.map(item => {
    const on = activeKey === item.key;
    return /*#__PURE__*/React.createElement("a", {
      key: item.key,
      href: item.href,
      onClick: e => go(e, item),
      "aria-current": on ? "page" : undefined,
      style: {
        display: "flex",
        alignItems: "center",
        gap: 14,
        minHeight: 56,
        padding: "0 8px",
        borderRadius: "var(--radius-md)",
        fontSize: "var(--text-h3)",
        fontWeight: on ? 600 : 500,
        letterSpacing: "-0.01em",
        textDecoration: "none",
        color: on ? "var(--primary)" : "var(--foreground)"
      }
    }, /*#__PURE__*/React.createElement(MenuIconSlot, {
      item: item,
      on: on
    }), item.label);
  }), /*#__PURE__*/React.createElement("a", {
    href: "/my",
    onClick: e => go(e, {
      key: "my",
      label: "MY 멘트리",
      href: "/my"
    }),
    style: {
      display: "flex",
      alignItems: "center",
      gap: 14,
      minHeight: 56,
      padding: "0 8px",
      borderRadius: "var(--radius-md)",
      fontSize: "var(--text-h3)",
      fontWeight: 500,
      letterSpacing: "-0.01em",
      textDecoration: "none",
      color: "var(--foreground)"
    }
  }, /*#__PURE__*/React.createElement(MenuIconSlot, {
    item: null,
    on: false
  }), "MY \uBA58\uD2B8\uB9AC"), /*#__PURE__*/React.createElement("hr", {
    style: {
      border: "none",
      borderTop: "1px solid var(--border)",
      margin: "10px 8px"
    }
  }), biz && /*#__PURE__*/React.createElement("a", {
    href: biz.href,
    onClick: e => go(e, biz),
    style: {
      display: "flex",
      alignItems: "center",
      gap: 8,
      minHeight: 52,
      padding: "0 8px",
      borderRadius: "var(--radius-md)",
      fontSize: "var(--text-h3)",
      fontWeight: 500,
      letterSpacing: "-0.01em",
      textDecoration: "none",
      color: "var(--biz-primary)"
    }
  }, biz.label, /*#__PURE__*/React.createElement(__ds_scope.Icon, {
    name: "arrow-up-right-01",
    size: 18,
    "aria-hidden": "true"
  })), authState !== "guest" && /*#__PURE__*/React.createElement("a", {
    href: "/logout",
    onClick: e => go(e, {
      key: "logout",
      label: "로그아웃",
      href: "/logout"
    }),
    style: {
      display: "flex",
      alignItems: "center",
      gap: 8,
      minHeight: 52,
      padding: "0 8px",
      borderRadius: "var(--radius-md)",
      fontSize: "var(--text-h3)",
      fontWeight: 500,
      letterSpacing: "-0.01em",
      textDecoration: "none",
      color: "var(--muted-foreground)"
    }
  }, /*#__PURE__*/React.createElement(__ds_scope.Icon, {
    name: "logout-03",
    size: 20,
    "aria-hidden": "true"
  }), "\uB85C\uADF8\uC544\uC6C3"))));
}
Object.assign(__ds_scope, { Header });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/navigation/Header.jsx", error: String((e && e.message) || e) }); }

// components/overlays/Dialog.jsx
try { (() => {
/**
 * Dialog — centered modal over a dimmed scrim.
 */
function Dialog({
  open,
  onClose,
  title,
  description,
  children,
  footer,
  width = 460,
  style
}) {
  if (!open) return null;
  return /*#__PURE__*/React.createElement("div", {
    onClick: onClose,
    style: {
      position: "fixed",
      inset: 0,
      zIndex: 60,
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      padding: 20,
      background: "color-mix(in oklch, var(--sage-950) 45%, transparent)",
      backdropFilter: "blur(2px)",
      animation: "mt-fade 150ms ease"
    }
  }, /*#__PURE__*/React.createElement("div", {
    role: "dialog",
    "aria-modal": "true",
    onClick: e => e.stopPropagation(),
    style: {
      width: "100%",
      maxWidth: width,
      background: "var(--popover)",
      color: "var(--popover-foreground)",
      border: "1px solid var(--border)",
      borderRadius: "var(--radius-xl)",
      boxShadow: "var(--shadow-lg)",
      animation: "mt-pop 150ms ease",
      ...style
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      alignItems: "flex-start",
      justifyContent: "space-between",
      gap: 12,
      padding: "20px 20px 0"
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      flexDirection: "column",
      gap: 4
    }
  }, title && /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: "var(--text-h2)",
      fontWeight: 600,
      lineHeight: 1.4
    }
  }, title), description && /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: "var(--text-caption)",
      color: "var(--muted-foreground)"
    }
  }, description)), /*#__PURE__*/React.createElement(__ds_scope.IconButton, {
    icon: "cancel-01",
    variant: "ghost",
    size: "sm",
    ariaLabel: "\uB2EB\uAE30",
    onClick: onClose
  })), /*#__PURE__*/React.createElement("div", {
    style: {
      padding: "16px 20px"
    }
  }, children), footer && /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      justifyContent: "flex-end",
      gap: 10,
      padding: "0 20px 20px"
    }
  }, footer)), /*#__PURE__*/React.createElement("style", null, `@keyframes mt-fade{from{opacity:0}to{opacity:1}}@keyframes mt-pop{from{opacity:0;transform:scale(0.97)}to{opacity:1;transform:scale(1)}}`));
}
Object.assign(__ds_scope, { Dialog });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/overlays/Dialog.jsx", error: String((e && e.message) || e) }); }

// components/overlays/Popover.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
const {
  useEffect,
  useRef
} = React;
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
function Popover({
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
    const onPointerDown = e => {
      if (ref.current && !ref.current.contains(e.target)) onClose && onClose();
    };
    const onKeyDown = e => {
      if (e.key === "Escape") onClose && onClose();
    };
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
    bottom: {
      top: "calc(100% + 4px)"
    },
    top: {
      bottom: "calc(100% + 4px)"
    },
    right: {
      left: "calc(100% + 4px)"
    },
    left: {
      right: "calc(100% + 4px)"
    }
  };
  const CROSS = {
    bottom: {
      start: {
        left: 0
      },
      end: {
        right: 0
      }
    },
    top: {
      start: {
        left: 0
      },
      end: {
        right: 0
      }
    },
    right: {
      start: {
        top: 0
      },
      end: {
        bottom: 0
      }
    },
    left: {
      start: {
        top: 0
      },
      end: {
        bottom: 0
      }
    }
  };
  return /*#__PURE__*/React.createElement("div", _extends({
    ref: ref,
    role: role,
    style: {
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
      ...style
    }
  }, rest), children);
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
const popoverMenuItemStyle = {
  display: "flex",
  alignItems: "center",
  gap: 8,
  width: "100%",
  padding: "8px 10px",
  border: "none",
  background: "none",
  borderRadius: "var(--radius-sm)",
  font: "inherit",
  fontSize: "var(--text-body)",
  color: "var(--foreground)",
  textAlign: "left",
  cursor: "pointer"
};
Object.assign(__ds_scope, { Popover, popoverMenuItemStyle });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/overlays/Popover.jsx", error: String((e && e.message) || e) }); }

// components/overlays/Sheet.jsx
try { (() => {
/**
 * Sheet — panel that slides in from an edge over a dimmed scrim.
 */
function Sheet({
  open,
  onClose,
  side = "right",
  title,
  description,
  children,
  footer,
  size = 380,
  style
}) {
  if (!open) return null;
  const horizontal = side === "left" || side === "right";
  const from = {
    right: "translateX(100%)",
    left: "translateX(-100%)",
    top: "translateY(-100%)",
    bottom: "translateY(100%)"
  }[side];
  const panelStyle = {
    position: "absolute",
    background: "var(--popover)",
    color: "var(--popover-foreground)",
    boxShadow: "var(--shadow-lg)",
    display: "flex",
    flexDirection: "column",
    animation: "mt-slide 200ms ease",
    "--mt-from": from,
    ...(horizontal ? {
      top: 0,
      bottom: 0,
      width: size,
      [side]: 0,
      borderLeft: side === "right" ? "1px solid var(--border)" : "none",
      borderRight: side === "left" ? "1px solid var(--border)" : "none"
    } : {
      left: 0,
      right: 0,
      height: size,
      [side]: 0,
      borderTop: side === "bottom" ? "1px solid var(--border)" : "none",
      borderBottom: side === "top" ? "1px solid var(--border)" : "none"
    }),
    ...style
  };
  return /*#__PURE__*/React.createElement("div", {
    onClick: onClose,
    style: {
      position: "fixed",
      inset: 0,
      zIndex: 60,
      background: "color-mix(in oklch, var(--sage-950) 45%, transparent)",
      backdropFilter: "blur(2px)",
      animation: "mt-fade 150ms ease"
    }
  }, /*#__PURE__*/React.createElement("div", {
    role: "dialog",
    "aria-modal": "true",
    onClick: e => e.stopPropagation(),
    style: panelStyle
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      alignItems: "flex-start",
      justifyContent: "space-between",
      gap: 12,
      padding: "20px 20px 14px",
      borderBottom: "1px solid var(--border)"
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      flexDirection: "column",
      gap: 4
    }
  }, title && /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: "var(--text-h3)",
      fontWeight: 600
    }
  }, title), description && /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: "var(--text-caption)",
      color: "var(--muted-foreground)"
    }
  }, description)), /*#__PURE__*/React.createElement(__ds_scope.IconButton, {
    icon: "cancel-01",
    variant: "ghost",
    size: "sm",
    ariaLabel: "\uB2EB\uAE30",
    onClick: onClose
  })), /*#__PURE__*/React.createElement("div", {
    style: {
      flex: 1,
      overflow: "auto",
      padding: "16px 20px"
    }
  }, children), footer && /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      justifyContent: "flex-end",
      gap: 10,
      padding: "14px 20px",
      borderTop: "1px solid var(--border)"
    }
  }, footer)), /*#__PURE__*/React.createElement("style", null, `@keyframes mt-fade{from{opacity:0}to{opacity:1}}@keyframes mt-slide{from{transform:var(--mt-from)}to{transform:none}}`));
}
Object.assign(__ds_scope, { Sheet });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/overlays/Sheet.jsx", error: String((e && e.message) || e) }); }

// components/overlays/Toast.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
const {
  useEffect,
  useRef,
  useState
} = React;
/**
 * 구현은 sonner(2.0.8 · MIT · 런타임 의존 react·react-dom)를 쓴다.
 * 이 파일은 그 위에 얹을 우리 쪽 규칙이다 — 토큰·체류 시간·액션 수·정지 조건.
 * .jsx는 시각과 거동의 참조이지 이식원이 아니다.
 *
 * Toast — 화면 위에 잠깐 떴다 사라지는 알림. variant 없음 — 셋의 차이는 액션 수뿐이다
 *  (0개=공유 대체 안내 · 1개=스크랩+실행취소 · 2개=알람 수신 여부 질문).
 * 체류 시간은 액션 수가 정한다: 0~1개=3000ms · 2개=6000ms(읽는 양이 배라 길게). 색·치수가 아니라
 *  거동값이라 토큰화하지 않고 이 파일이 상수로 갖는다.
 * hover·focus 시 타이머 정지, 벗어나면 남은 시간부터 재개(리셋 아님) — 실행취소를 누를 시간을 준다.
 * 큐 관리(여러 개 쌓기·최대 3개·중복 리셋)는 실장(sonner)의 일 — 여기서 만들지 않는다. 이 컴포넌트는
 *  단일 토스트 1개의 모양·타이머·정지 조건만 낸다. open+onDismiss 제어형, 문구·actions는 화면이 준다.
 */
const DURATION_SHORT = 3000; // 액션 0~1개
const DURATION_LONG = 6000; // 액션 2개

if (typeof document !== "undefined" && !document.getElementById("mt-toast-style")) {
  const s = document.createElement("style");
  s.id = "mt-toast-style";
  s.textContent = ".mt-toast{position:fixed;left:50%;bottom:calc(16px + env(safe-area-inset-bottom));transform:translateX(-50%) translateY(8px);}" + "@media (min-width:769px){.mt-toast{left:auto;right:24px;bottom:24px;transform:translateY(8px);}}" + "@media (max-width:768px){.mt-toast{bottom:calc(56px + env(safe-area-inset-bottom) + 16px);}}" +
  // BottomTabBar(56) 위로
  ".mt-toast.mt-toast-entered{transform:translateY(0) !important;}" + "@media (min-width:769px){.mt-toast.mt-toast-entered{transform:translateY(0) !important;}}" + "@media (max-width:768px){.mt-toast.mt-toast-entered{transform:translateX(-50%) translateY(0) !important;}}";
  document.head.appendChild(s);
}
function Toast({
  open,
  message,
  actions = [],
  onDismiss,
  style,
  ...rest
}) {
  const [mounted, setMounted] = useState(open);
  const [entered, setEntered] = useState(false);
  const [paused, setPaused] = useState(false);
  const remaining = useRef(0);
  const armedAt = useRef(0);
  const timeoutId = useRef(null);
  const duration = actions.length >= 2 ? DURATION_LONG : DURATION_SHORT;
  const clearArmed = () => {
    if (timeoutId.current) {
      clearTimeout(timeoutId.current);
      timeoutId.current = null;
    }
  };
  const arm = () => {
    clearArmed();
    armedAt.current = Date.now();
    timeoutId.current = setTimeout(() => {
      onDismiss && onDismiss();
    }, remaining.current);
  };
  useEffect(() => {
    if (open) {
      setMounted(true);
      setEntered(false);
      const raf = requestAnimationFrame(() => setEntered(true));
      remaining.current = duration;
      arm();
      return () => {
        cancelAnimationFrame(raf);
        clearArmed();
      };
    }
    if (mounted) {
      setEntered(false);
      clearArmed();
      const t = setTimeout(() => setMounted(false), 180);
      return () => clearTimeout(t);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [open, message]);
  const pause = () => {
    if (paused || !open) return;
    setPaused(true);
    clearArmed();
    remaining.current = Math.max(0, remaining.current - (Date.now() - armedAt.current));
  };
  const resume = () => {
    if (!paused || !open) return;
    setPaused(false);
    arm();
  };
  if (!mounted) return null;
  const phase = !entered ? open ? "entering" : "leaving" : paused ? "hovered" : "visible";
  return /*#__PURE__*/React.createElement("div", _extends({
    role: "status",
    "aria-live": "polite",
    "data-phase": phase,
    className: `mt-toast${entered ? " mt-toast-entered" : ""}`,
    onMouseEnter: pause,
    onMouseLeave: resume,
    onFocus: pause,
    onBlur: resume,
    style: {
      zIndex: 80,
      display: "flex",
      alignItems: "center",
      gap: 16,
      maxWidth: 420,
      padding: "12px 14px",
      background: "var(--card)",
      border: "1px solid var(--border)",
      borderRadius: "var(--radius-md)",
      boxShadow: "var(--shadow-md)",
      opacity: entered ? 1 : 0,
      transition: "opacity 180ms ease, transform 180ms ease",
      ...style
    }
  }, rest), /*#__PURE__*/React.createElement("span", {
    style: {
      flex: "1 1 auto",
      fontSize: "var(--text-body)",
      color: "var(--foreground)",
      lineHeight: 1.5
    }
  }, message), actions.length > 0 && /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      alignItems: "center",
      gap: 12,
      flex: "0 0 auto"
    }
  }, actions.map((a, i) => /*#__PURE__*/React.createElement("button", {
    key: i,
    type: "button",
    onClick: a.onClick,
    style: {
      height: 32,
      padding: "0 4px",
      background: "transparent",
      border: "none",
      fontFamily: "var(--font-sans)",
      fontSize: "var(--text-caption)",
      fontWeight: 500,
      letterSpacing: "-0.01em",
      color: a.emphasis === "primary" ? "var(--primary)" : "var(--foreground)",
      cursor: "pointer",
      whiteSpace: "nowrap"
    }
  }, a.label))));
}
Object.assign(__ds_scope, { Toast });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/overlays/Toast.jsx", error: String((e && e.message) || e) }); }

// components/surfaces/AnswerCard.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
/**
 * AnswerCard — Q&A 상세의 멘토 답변 1건. QnaCard(질문)와 다르다: 답변은 갈 곳이 없다
 *  (답변 상세 페이지가 없다) — 그래서 스트레치 링크를 만들지 않는다. href를 받지 않는다. 루트는 <article>.
 *
 * [구조] 멘토 헤더(아바타 큰 사이즈 + 이름 + 국가 flag 배지 + 활동지 + 헤드라인 — 헤더 블록 전체가 이름에 걸린 스트레치
 *  링크로 멘토 상세行, 새 창. 접근 이름="멘토명" 하나) → "이 멘토의 다른 답변 보기"(outline, 헤더 링크 밖·독립 클릭 —
 *  이 카드에서 테두리를 가진 것은 이 버튼 하나뿐. 헤드라인과는 좁은 간격으로 한 덩어리, 본문과는 넓은 간격으로 분리) →
 *  본문(전문, line-clamp 없음·禁則 유지) → 날짜(연월일만) →
 *  액션 줄 한 줄(좌: 도움돼요 CountToggle tone="rose"·공유(Popover) / 우: 채택 배지+감사인사 보내기, space-between).
 *  이 카드의 유일한 primary 버튼은 "감사인사 보내기"뿐 — 멘토 프로필 이동은 버튼이 아니라 헤더 블록 자체가 링크.
 *  공유·더보기는 overlays/Popover(앵커·닫힘·ESC·포커스 복귀 공통 컴포넌트)를 쓴다 — 각자 자신을 가지지 않는다.
 * [스크랩 없음] 스크랩의 목록 단위는 질문이라 답변마다 두면 한 질문에 여러 개가 동시에 켜진다 — 스크랩은 QnaCard(질문)에만.
 * [채택 표시] 질문자가 도움돼요를 누른 답변에만. 질문자는 "김**"로 익명화되므로 질문자 아바타는 병기하지 않는다.
 * [상태] 기본 · accepted(채택) · isQuestionerView(질문자 시점 → 감사인사 버튼) · isMine(내 답변 → 더보기 메뉴).
 *  네 상태는 배타가 아니다 — 동시에 겹칠 수 있다.
 * [범위 밖] 답변 작성 폼(qna-detail 화면이 Card+Avatar+RichTextEditor+Button으로 조립) · 답변 0건 표시(EmptyState).
 *
 * QnaCard와의 경계: QnaCard=질문(카드 전체 클릭 → 상세로 이동) · AnswerCard=답변(갈 곳이 없어 카드 전체 클릭이 없다).
 */
const clampNone = {
  wordBreak: "keep-all",
  overflowWrap: "break-word"
}; // 禁則: break-all 금지. line-clamp 없음(전문 노출)

function formatDate(d) {
  if (!d) return "";
  const dt = typeof d === "string" ? new Date(d) : d;
  if (Number.isNaN(dt.getTime())) return String(d);
  const p = n => String(n).padStart(2, "0");
  return `${dt.getFullYear()}.${p(dt.getMonth() + 1)}.${p(dt.getDate())}`;
}

// Button은 <button> 고정(새 창 이동이 불가) — 멘토 이동 버튼 2개만 같은 sm 레시피를 쓰는 <a>로 직접 구현.
function linkButtonStyle(variant) {
  const v = variant === "primary" ? {
    background: "var(--primary)",
    color: "var(--primary-foreground)",
    border: "1px solid transparent"
  } : {
    background: "var(--card)",
    color: "var(--foreground)",
    border: "1px solid var(--border)"
  }; // outline — 이 카드에서 테두리를 가진 유일한 요소. secondary(sage-100 채움) 금지: Chip과 같은 채움이라 버튼·칩이 같아 보인다.
  return {
    display: "inline-flex",
    alignItems: "center",
    justifyContent: "center",
    height: 32,
    padding: "0 12px",
    fontFamily: "var(--font-sans)",
    fontSize: "var(--text-caption)",
    fontWeight: 500,
    lineHeight: 1,
    letterSpacing: "-0.01em",
    borderRadius: "var(--radius-md)",
    textDecoration: "none",
    whiteSpace: "nowrap",
    ...v
  };
}
if (typeof document !== "undefined" && !document.getElementById("mt-answercard-link-style")) {
  const s = document.createElement("style");
  s.id = "mt-answercard-link-style";
  s.textContent = ".mt-ac-mentor-link{position:relative;color:inherit;text-decoration:none;}" + ".mt-ac-mentor-link::after{content:'';position:absolute;inset:0;z-index:1;}" + ".mt-ac-mentor-link:hover .mt-ac-mentor-name{color:var(--primary);text-decoration:underline;}" + ".mt-ac-mentor-link:focus-visible{outline:2px solid var(--ring);outline-offset:2px;border-radius:4px;}";
  document.head.appendChild(s);
}
function AnswerCard({
  mentorName,
  mentorPhoto,
  country,
  countryLabel,
  activityLocation,
  headline,
  mentorProfileHref = "#",
  mentorAnswersHref = "#",
  body,
  date,
  liked = false,
  onLikeChange,
  likeCount = 0,
  answerUrl,
  onCopyLink,
  accepted = false,
  isQuestionerView = false,
  onThanks,
  isMine = false,
  onEdit,
  onDelete,
  style,
  ...rest
}) {
  const likeControlled = onLikeChange != null;
  const [likedU, setLikedU] = React.useState(liked);
  const isLiked = likeControlled ? liked : likedU;
  const setLiked = n => {
    if (likeControlled) onLikeChange(n);else setLikedU(n);
  };
  const [shareOpen, setShareOpen] = React.useState(false);
  const [moreOpen, setMoreOpen] = React.useState(false);
  const shareTriggerRef = React.useRef(null);
  const moreTriggerRef = React.useRef(null);
  const copyLink = () => {
    if (onCopyLink) onCopyLink();else if (answerUrl && navigator.clipboard) navigator.clipboard.writeText(answerUrl);
    setShareOpen(false);
  };
  return /*#__PURE__*/React.createElement("article", _extends({
    style: {
      position: "relative",
      display: "flex",
      flexDirection: "column",
      gap: 16,
      width: "100%",
      boxSizing: "border-box",
      color: "var(--foreground)",
      fontFamily: "var(--font-sans)",
      background: "var(--card)",
      border: "1px solid var(--sage-200)",
      borderRadius: "var(--card-radius)",
      boxShadow: "var(--card-shadow)",
      padding: "var(--card-content-padding)",
      ...style
    }
  }, rest), isMine && /*#__PURE__*/React.createElement("div", {
    style: {
      position: "absolute",
      top: 14,
      right: 14,
      zIndex: 2
    }
  }, /*#__PURE__*/React.createElement(__ds_scope.IconButton, {
    ref: moreTriggerRef,
    icon: "more-horizontal-circle-01",
    variant: "ghost",
    size: "sm",
    ariaLabel: "\uB354\uBCF4\uAE30",
    onClick: () => setMoreOpen(v => !v)
  }), /*#__PURE__*/React.createElement(__ds_scope.Popover, {
    open: moreOpen,
    onClose: () => setMoreOpen(false),
    role: "menu",
    side: "bottom",
    align: "end",
    triggerRef: moreTriggerRef
  }, /*#__PURE__*/React.createElement("button", {
    type: "button",
    className: "mt-popover-menuitem",
    style: __ds_scope.popoverMenuItemStyle,
    onClick: () => {
      setMoreOpen(false);
      onEdit && onEdit();
    }
  }, "\uC218\uC815"), /*#__PURE__*/React.createElement("button", {
    type: "button",
    className: "mt-popover-menuitem",
    style: {
      ...__ds_scope.popoverMenuItemStyle,
      color: "var(--destructive)"
    },
    onClick: () => {
      setMoreOpen(false);
      onDelete && onDelete();
    }
  }, "\uC0AD\uC81C"))), /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      flexDirection: "column",
      gap: 8,
      paddingRight: isMine ? 32 : 0
    }
  }, /*#__PURE__*/React.createElement("a", {
    href: mentorProfileHref,
    target: "_blank",
    rel: "noopener noreferrer",
    className: "mt-ac-mentor-link",
    "aria-label": mentorName,
    style: {
      display: "flex",
      flexDirection: "column",
      gap: 10,
      cursor: "pointer"
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      alignItems: "flex-start",
      gap: 10
    }
  }, /*#__PURE__*/React.createElement(__ds_scope.Avatar, {
    src: mentorPhoto,
    name: mentorName,
    size: "lg"
  }), /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      flexDirection: "column",
      gap: 4,
      minWidth: 0
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      alignItems: "center",
      gap: 6,
      flexWrap: "wrap"
    }
  }, /*#__PURE__*/React.createElement("span", {
    className: "mt-ac-mentor-name",
    style: {
      fontSize: "var(--text-h3)",
      fontWeight: 600
    }
  }, mentorName), (country || countryLabel) && /*#__PURE__*/React.createElement(__ds_scope.Badge, {
    size: "sm",
    leading: "flag",
    flag: country
  }, countryLabel), activityLocation && /*#__PURE__*/React.createElement("span", {
    style: {
      fontSize: "var(--text-caption)",
      color: "var(--muted-foreground)"
    }
  }, activityLocation)), headline && /*#__PURE__*/React.createElement("span", {
    style: {
      fontSize: "var(--text-body)",
      fontWeight: 500,
      color: "var(--muted-foreground)"
    }
  }, headline)))), /*#__PURE__*/React.createElement("a", {
    href: mentorAnswersHref,
    target: "_blank",
    rel: "noopener noreferrer",
    style: {
      position: "relative",
      zIndex: 2,
      alignSelf: "flex-start",
      ...linkButtonStyle("outline")
    }
  }, "\uC774 \uBA58\uD1A0\uC758 \uB2E4\uB978 \uB2F5\uBCC0 \uBCF4\uAE30", /*#__PURE__*/React.createElement(__ds_scope.Icon, {
    name: "arrow-up-right-01",
    size: 14,
    style: {
      marginLeft: 4
    }
  }))), /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: "var(--text-body)",
      fontWeight: 400,
      color: "var(--foreground)",
      lineHeight: 1.7,
      whiteSpace: "pre-wrap",
      ...clampNone
    }
  }, body), date && /*#__PURE__*/React.createElement("span", {
    style: {
      fontSize: "var(--text-caption)",
      color: "var(--muted-foreground)"
    }
  }, formatDate(date)), /*#__PURE__*/React.createElement("div", {
    style: {
      position: "relative",
      zIndex: 2,
      display: "flex",
      alignItems: "center",
      justifyContent: "space-between",
      gap: 12,
      flexWrap: "wrap"
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      alignItems: "center",
      gap: 10
    }
  }, /*#__PURE__*/React.createElement(__ds_scope.CountToggle, {
    icon: "favourite",
    tone: "rose",
    selected: isLiked,
    count: likeCount,
    onChange: setLiked
  }), /*#__PURE__*/React.createElement("div", {
    style: {
      position: "relative"
    }
  }, /*#__PURE__*/React.createElement(__ds_scope.IconButton, {
    ref: shareTriggerRef,
    icon: "share-08",
    variant: "ghost",
    size: "sm",
    ariaLabel: "\uACF5\uC720",
    onClick: () => setShareOpen(v => !v)
  }), /*#__PURE__*/React.createElement(__ds_scope.Popover, {
    open: shareOpen,
    onClose: () => setShareOpen(false),
    role: "menu",
    side: "bottom",
    align: "start",
    triggerRef: shareTriggerRef
  }, /*#__PURE__*/React.createElement("button", {
    type: "button",
    className: "mt-popover-menuitem",
    style: __ds_scope.popoverMenuItemStyle,
    onClick: copyLink
  }, /*#__PURE__*/React.createElement(__ds_scope.Icon, {
    name: "link-square-01",
    size: 16,
    style: {
      color: "var(--muted-foreground)"
    }
  }), "\uC774 \uB2F5\uBCC0 \uB9C1\uD06C \uBCF5\uC0AC")))), (accepted || isQuestionerView) && /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      alignItems: "center",
      gap: 12,
      flexWrap: "wrap",
      justifyContent: "flex-end"
    }
  }, accepted && /*#__PURE__*/React.createElement("span", {
    style: {
      display: "inline-flex",
      alignItems: "center",
      gap: 4,
      fontSize: "var(--text-caption)",
      fontWeight: 500,
      color: "var(--primary)",
      whiteSpace: "nowrap"
    }
  }, /*#__PURE__*/React.createElement(__ds_scope.Icon, {
    name: "checkmark-circle-02",
    size: 15
  }), "\uC9C8\uBB38\uC790\uAC00 \uB3C4\uC6C0\uB41C\uB2E4\uACE0 \uD55C \uB2F5\uBCC0\uC785\uB2C8\uB2E4"), isQuestionerView && /*#__PURE__*/React.createElement(__ds_scope.Button, {
    variant: "primary",
    size: "sm",
    onClick: onThanks
  }, "\uAC10\uC0AC\uC778\uC0AC \uBCF4\uB0B4\uAE30"))));
}
Object.assign(__ds_scope, { AnswerCard });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/surfaces/AnswerCard.jsx", error: String((e && e.message) || e) }); }

// components/surfaces/ArticlePreview.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
/**
 * ArticlePreview — 투명 콘텐츠 프리뷰(카드 아님). 표면 규칙: 썸네일 자체가 시각 경계.
 *  배경 투명 · 테두리 없음 · 그림자 없음 · 카드 마진 없음(카드 셸 상속 안 함).
 *  동심원 기하는 미디어에만: 썸네일 16:9 + radius 14. 요소 간 수직 리듬만(좌우 패딩 없음).
 *  hover: 썸네일에만 elevation 한 단계 상승(카드 elevation 토큰 재사용, 미세). 컨테이너 배경 없음.
 * [스트레치 링크] 루트는 <article>(position:relative) — <a>가 아니다. 제목에만 <a>를 걸고 그 ::after가
 *  카드 전면을 덮어 카드 전체 클릭을 낸다. 카드의 접근 이름 = 제목 링크 텍스트.
 */
const clamp = lines => ({
  display: "-webkit-box",
  WebkitBoxOrient: "vertical",
  WebkitLineClamp: lines,
  overflow: "hidden",
  wordBreak: "keep-all",
  overflowWrap: "break-word" // 禁則: break-all 금지
});
if (typeof document !== "undefined" && !document.getElementById("mt-card-link-style")) {
  const s = document.createElement("style");
  s.id = "mt-card-link-style";
  s.textContent = ".mt-card-link{color:inherit;text-decoration:none;-webkit-user-drag:none;}" + ".mt-card-link::after{content:'';position:absolute;inset:0;z-index:1;}" + ".mt-card-link:focus-visible{outline:none;}" +
  // 포커스 링은 제목 글자가 아니라 카드 테두리에 그린다 — 무엇이 선택됐는지 보이게.
  "article:has(.mt-card-link:focus-visible){outline:2px solid var(--ring);outline-offset:2px;}";
  document.head.appendChild(s);
}
function ArticlePreview({
  title,
  excerpt,
  image,
  tags = [{
    label: "디자인",
    hue: "indigo"
  }, {
    label: "인사이트",
    hue: "amber"
  }],
  href = "#",
  style,
  ...rest
}) {
  const [hover, setHover] = React.useState(false);
  const [imgError, setImgError] = React.useState(false);
  const showImg = image && !imgError;
  return /*#__PURE__*/React.createElement("article", _extends({
    onMouseEnter: () => setHover(true),
    onMouseLeave: () => setHover(false),
    style: {
      position: "relative",
      display: "flex",
      flexDirection: "column",
      gap: 10,
      width: "100%",
      boxSizing: "border-box",
      color: "var(--foreground)",
      fontFamily: "var(--font-sans)",
      // 투명: 배경/테두리/그림자/마진 없음. hover 신호는 썸네일 elevation으로만(컨테이너 배경 없음).
      background: "transparent",
      border: "none",
      boxShadow: "none",
      borderRadius: "var(--card-media-radius)",
      padding: 0,
      ...style
    }
  }, rest), /*#__PURE__*/React.createElement("div", {
    style: {
      position: "relative",
      width: "100%",
      aspectRatio: "16 / 9",
      background: "var(--sage-100)",
      borderRadius: "var(--card-media-radius)",
      overflow: "hidden",
      boxShadow: hover ? "var(--shadow-sm)" : "none",
      transition: "box-shadow 150ms ease"
    }
  }, showImg ? /*#__PURE__*/React.createElement("img", {
    src: image,
    alt: "",
    onError: () => setImgError(true),
    style: {
      width: "100%",
      height: "100%",
      objectFit: "cover",
      display: "block"
    }
  }) : /*#__PURE__*/React.createElement("span", {
    style: {
      position: "absolute",
      inset: 0,
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      color: "var(--sage-400)"
    }
  }, /*#__PURE__*/React.createElement(__ds_scope.Icon, {
    name: "image-01",
    size: 30
  }))), /*#__PURE__*/React.createElement("a", {
    href: href,
    className: "mt-card-link",
    style: {
      display: "block",
      fontSize: "var(--text-h3)",
      fontWeight: 600,
      lineHeight: 1.5,
      ...clamp(2)
    }
  }, title), /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: "var(--text-body)",
      fontWeight: 400,
      color: "var(--muted-foreground)",
      lineHeight: 1.6,
      ...clamp(3)
    }
  }, excerpt), tags.length > 0 && /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      alignItems: "center",
      gap: 6,
      flexWrap: "wrap",
      marginTop: 2
    }
  }, tags.map((t, i) => /*#__PURE__*/React.createElement(__ds_scope.Badge, {
    key: i,
    variant: "tag",
    hue: t.hue,
    size: "sm"
  }, t.label))));
}
Object.assign(__ds_scope, { ArticlePreview });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/surfaces/ArticlePreview.jsx", error: String((e && e.message) || e) }); }

// components/surfaces/Card.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
/**
 * Card — white surface, delineated by border/shadow over the white background.
 * CardHeader / CardTitle / CardDescription / CardContent / CardFooter compose it.
 */
function Card({
  children,
  style,
  ...rest
}) {
  return /*#__PURE__*/React.createElement("div", _extends({
    style: {
      background: "var(--card)",
      color: "var(--card-foreground)",
      border: "1px solid var(--border)",
      borderRadius: "var(--radius-lg)",
      boxShadow: "var(--shadow-sm)",
      overflow: "hidden",
      ...style
    }
  }, rest), children);
}
function CardHeader({
  children,
  style,
  ...rest
}) {
  return /*#__PURE__*/React.createElement("div", _extends({
    style: {
      padding: "18px 20px 0",
      display: "flex",
      flexDirection: "column",
      gap: 4,
      ...style
    }
  }, rest), children);
}
function CardTitle({
  children,
  style,
  ...rest
}) {
  return /*#__PURE__*/React.createElement("div", _extends({
    style: {
      fontSize: "var(--text-h3)",
      fontWeight: 600,
      lineHeight: 1.5,
      color: "var(--foreground)",
      ...style
    }
  }, rest), children);
}
function CardDescription({
  children,
  style,
  ...rest
}) {
  return /*#__PURE__*/React.createElement("div", _extends({
    style: {
      fontSize: "var(--text-caption)",
      color: "var(--muted-foreground)",
      ...style
    }
  }, rest), children);
}
function CardContent({
  children,
  style,
  ...rest
}) {
  return /*#__PURE__*/React.createElement("div", _extends({
    style: {
      padding: "16px 20px",
      ...style
    }
  }, rest), children);
}
function CardFooter({
  children,
  style,
  ...rest
}) {
  return /*#__PURE__*/React.createElement("div", _extends({
    style: {
      padding: "0 20px 18px",
      display: "flex",
      alignItems: "center",
      gap: 10,
      ...style
    }
  }, rest), children);
}
Object.assign(__ds_scope, { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/surfaces/Card.jsx", error: String((e && e.message) || e) }); }

// components/surfaces/EmptyState.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
/**
 * EmptyState — 목록이 0건일 때 그 자리에 서는 것(자리를 비워두지 않는다). surfaces에 있지만 카드가 아니다.
 * [두 종류를 하나로] "아직 없다"(다음 행동으로 보냄)와 "찾았는데 없다"(조건을 풀게 함)는 낼 말이 다르지만
 *  구조가 같다 — prop으로 가르지 않는다. 어느 쪽인지는 화면이 문구로 정한다. 부품은 종류를 모른다.
 * [문구] 기본 문구를 하드코딩하지 않는다 — 한/일 2개국어이고 문구는 화면이 넘긴다.
 * [구성] 아이콘(선택) → 제목(필수·한 줄) → 설명(선택·한두 줄) → 액션(0 또는 1). 전부 가운데 정렬.
 *  액션은 1개까지 — 빈 화면에서 고민을 시키지 않는다(둘 이상을 넘겨도 첫 하나만 세운다).
 * [시각] 배경·테두리 없음(카드 셸 미상속) · 제목 --foreground · 설명·아이콘 --muted-foreground.
 *  채도를 쓰지 않는다. 일러스트를 그려 넣지 않는다(화면마다 달라진다).
 * [크기] md=목록 자리 전체 · sm=좁은 자리(우측 위젯·알림 드롭다운). sm은 아이콘이 작고 설명을 생략해도 된다.
 */
const SIZES = {
  md: {
    icon: 34,
    padV: 44,
    gapIcon: 14,
    gapText: 8,
    gapAction: 18,
    title: "var(--text-h3)",
    desc: "var(--text-body)",
    maxW: 340
  },
  sm: {
    icon: 22,
    padV: 22,
    gapIcon: 10,
    gapText: 6,
    gapAction: 12,
    title: "var(--text-body)",
    desc: "var(--text-caption)",
    maxW: 220
  }
};
function EmptyState({
  icon,
  title,
  description,
  action,
  size = "md",
  style,
  ...rest
}) {
  const s = SIZES[size] || SIZES.md;
  // 액션은 1개까지 — 배열이 와도 첫 하나만 세운다.
  const only = Array.isArray(action) ? action[0] : action;
  return /*#__PURE__*/React.createElement("div", _extends({
    style: {
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      justifyContent: "center",
      textAlign: "center",
      width: "100%",
      boxSizing: "border-box",
      padding: `${s.padV}px 16px`,
      background: "transparent",
      border: "none",
      fontFamily: "var(--font-sans)",
      ...style
    }
  }, rest), icon && /*#__PURE__*/React.createElement("span", {
    style: {
      display: "inline-flex",
      color: "var(--muted-foreground)",
      marginBottom: s.gapIcon
    }
  }, /*#__PURE__*/React.createElement(__ds_scope.Icon, {
    name: icon,
    size: s.icon
  })), /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      flexDirection: "column",
      gap: s.gapText,
      maxWidth: s.maxW
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      fontSize: s.title,
      fontWeight: 600,
      lineHeight: 1.45,
      color: "var(--foreground)",
      wordBreak: "keep-all",
      overflowWrap: "break-word"
    }
  }, title), description && /*#__PURE__*/React.createElement("span", {
    style: {
      fontSize: s.desc,
      fontWeight: 400,
      lineHeight: 1.6,
      color: "var(--muted-foreground)",
      wordBreak: "keep-all",
      overflowWrap: "break-word"
    }
  }, description)), only && /*#__PURE__*/React.createElement("div", {
    style: {
      marginTop: s.gapAction
    }
  }, only));
}
Object.assign(__ds_scope, { EmptyState });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/surfaces/EmptyState.jsx", error: String((e && e.message) || e) }); }

// components/surfaces/InterviewCard.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
/**
 * InterviewCard — 인물 인터뷰 카드(표면 규칙 1단계: 인물 객체 → 카드).
 *  카드 셸·elevation·동심원 기하 상속. 좌우 가로 분할(좌 미디어 1:1 / 우 정보). TOP용 가로형.
 *  북마크 없음(후킹 섹션, 저장 액션 없음). size 변형: "featured"(대형, 발췌 있음) / "compact"(소형, 발췌 없음).
 * [스트레치 링크] 루트는 <article>(position:relative) — <a>가 아니다. 제목에만 <a>를 걸고 그 ::after가
 *  카드 전면을 덮어 카드 전체 클릭을 낸다. 카드의 접근 이름 = 제목 링크 텍스트.
 */
const SIZES = {
  featured: {
    media: 320,
    card: 336,
    gap: "var(--card-media-gap-featured)",
    titleVar: "--text-h1",
    titleClamp: 2,
    excerpt: true,
    excerptSize: "var(--text-h3)",
    nameSize: "var(--text-h3)",
    metaSize: "var(--text-body)",
    metaInline: false,
    iconSize: 48
  },
  compact: {
    media: 144,
    card: 160,
    gap: "var(--card-media-gap-compact)",
    titleVar: "--text-h3",
    titleClamp: 2,
    excerpt: false,
    nameSize: "var(--text-body)",
    metaSize: "var(--text-caption)",
    metaInline: true,
    iconSize: 30
  }
};
const clamp = lines => ({
  display: "-webkit-box",
  WebkitBoxOrient: "vertical",
  WebkitLineClamp: lines,
  overflow: "hidden",
  wordBreak: "keep-all",
  overflowWrap: "break-word" // 禁則: break-all 금지
});
if (typeof document !== "undefined" && !document.getElementById("mt-card-link-style")) {
  const s = document.createElement("style");
  s.id = "mt-card-link-style";
  s.textContent = ".mt-card-link{color:inherit;text-decoration:none;-webkit-user-drag:none;}" + ".mt-card-link::after{content:'';position:absolute;inset:0;z-index:1;}" + ".mt-card-link:focus-visible{outline:none;}" +
  // 포커스 링은 제목 글자가 아니라 카드 테두리에 그린다 — 무엇이 선택됐는지 보이게.
  "article:has(.mt-card-link:focus-visible){outline:2px solid var(--ring);outline-offset:2px;}";
  document.head.appendChild(s);
}
function InterviewCard({
  size = "featured",
  title,
  excerpt,
  image,
  personName,
  company,
  jobTitle,
  field,
  country,
  countryLabel,
  href = "#",
  style,
  ...rest
}) {
  const s = SIZES[size] || SIZES.featured;
  const [hover, setHover] = React.useState(false);
  const [imgError, setImgError] = React.useState(false);
  const showImg = image && !imgError;
  return /*#__PURE__*/React.createElement("article", _extends({
    onMouseEnter: () => setHover(true),
    onMouseLeave: () => setHover(false),
    style: {
      position: "relative",
      display: "flex",
      gap: 0,
      width: "100%",
      height: s.card,
      // TOP 변형 한정: 미디어가 카드 높이 결정(featured 336 / compact 160)
      boxSizing: "border-box",
      color: "var(--foreground)",
      fontFamily: "var(--font-sans)",
      background: "var(--card)",
      border: "1px solid var(--sage-200)",
      borderRadius: "var(--card-radius)",
      boxShadow: hover ? "var(--shadow-md)" : "var(--card-shadow)",
      overflow: "hidden",
      transition: "box-shadow 150ms ease",
      ...style
    }
  }, rest), /*#__PURE__*/React.createElement("div", {
    style: {
      flex: "0 0 auto",
      margin: "var(--card-media-margin) 0 var(--card-media-margin) var(--card-media-margin)"
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      position: "relative",
      width: s.media,
      height: s.media,
      background: "var(--sage-100)",
      borderRadius: "var(--card-media-radius)",
      overflow: "hidden"
    }
  }, showImg ? /*#__PURE__*/React.createElement("img", {
    src: image,
    alt: personName || "",
    onError: () => setImgError(true),
    style: {
      width: "100%",
      height: "100%",
      objectFit: "cover",
      display: "block"
    }
  }) : /*#__PURE__*/React.createElement("span", {
    style: {
      position: "absolute",
      inset: 0,
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      color: "var(--sage-400)"
    }
  }, /*#__PURE__*/React.createElement(__ds_scope.Icon, {
    name: "user",
    size: s.iconSize
  })))), /*#__PURE__*/React.createElement("div", {
    style: {
      flex: 1,
      minWidth: 0,
      display: "flex",
      flexDirection: "column",
      justifyContent: "space-between",
      gap: 10,
      padding: "var(--card-content-padding) var(--card-content-padding) var(--card-content-padding) 0",
      paddingLeft: s.gap
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      flexDirection: "column",
      gap: 8,
      minWidth: 0
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      alignItems: "center",
      gap: 6,
      flexWrap: "wrap"
    }
  }, (country || countryLabel) && /*#__PURE__*/React.createElement(__ds_scope.Badge, {
    size: "sm",
    leading: "flag",
    flag: country
  }, countryLabel), field && /*#__PURE__*/React.createElement(__ds_scope.Badge, {
    size: "sm"
  }, field)), /*#__PURE__*/React.createElement("a", {
    href: href,
    className: "mt-card-link",
    style: {
      display: "block",
      fontSize: `var(${s.titleVar})`,
      fontWeight: 700,
      letterSpacing: "0.01em",
      lineHeight: 1.35,
      ...clamp(s.titleClamp)
    }
  }, title), s.excerpt && excerpt && /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: s.excerptSize,
      fontWeight: 400,
      color: "var(--muted-foreground)",
      lineHeight: 1.6,
      ...clamp(2)
    }
  }, excerpt)), s.metaInline ?
  /*#__PURE__*/
  /* compact: 이름 + 직무 같은 행 / 그 아래 회사 */
  React.createElement("div", {
    style: {
      display: "flex",
      flexDirection: "column",
      gap: 1,
      minWidth: 0
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      alignItems: "baseline",
      gap: 6,
      flexWrap: "wrap"
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      fontSize: s.nameSize,
      fontWeight: 600,
      color: "var(--foreground)"
    }
  }, personName), jobTitle && /*#__PURE__*/React.createElement("span", {
    style: {
      fontSize: s.metaSize,
      fontWeight: 500,
      color: "var(--muted-foreground)"
    }
  }, jobTitle)), company && /*#__PURE__*/React.createElement("span", {
    style: {
      fontSize: s.metaSize,
      fontWeight: 400,
      color: "var(--muted-foreground)"
    }
  }, company)) :
  /*#__PURE__*/
  /* featured: 이름 → 직무 → 회사 세로 3행 */
  React.createElement("div", {
    style: {
      display: "flex",
      flexDirection: "column",
      gap: 2,
      minWidth: 0
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      fontSize: s.nameSize,
      fontWeight: 600,
      color: "var(--foreground)",
      lineHeight: 1.4
    }
  }, personName), jobTitle && /*#__PURE__*/React.createElement("span", {
    style: {
      fontSize: s.metaSize,
      fontWeight: 500,
      color: "var(--muted-foreground)",
      lineHeight: 1.5
    }
  }, jobTitle), company && /*#__PURE__*/React.createElement("span", {
    style: {
      fontSize: s.metaSize,
      fontWeight: 400,
      color: "var(--muted-foreground)",
      lineHeight: 1.5
    }
  }, company))));
}
Object.assign(__ds_scope, { InterviewCard });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/surfaces/InterviewCard.jsx", error: String((e && e.message) || e) }); }

// components/surfaces/MentorCard.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
/**
 * MentorCard — 세로형 멘토 카드(고정폭 296, 리스폰시브 아님). 프리미티브(Badge·CountToggle) 조립.
 *
 * [카드 공통 셸] white(card) · 1px sage-200 헤어라인 · card-shadow · card-radius(동심원).
 *  hover 시 그림자만 상승(shadow-md), 위치 이동 없음(~150ms).
 * [스트레치 링크] 루트는 <article>(position:relative) — <a>가 아니다. 이름에만 <a>를 걸고 그 ::after가
 *  카드 전면(inset:0·z-index:1)을 덮어 카드 전체 클릭을 낸다. 스크랩·배지 행 오버레이는 z-index:2로
 *  그 위에서 독립 클릭. 카드의 접근 이름 = 이름 링크 텍스트. 탭 순서 = 이름 링크 → 스크랩 → 배지 행.
 * [구조] 미디어(Desktop 3:2 · Mobile 5:4, cover 크롭, media-margin 인셋 + media-radius)
 *   · 좌상단: "신규 멘토" 배지(green, status/active recipe) — publishedAt 기준 공개 후 1달만 노출
 *   · 우상단: 스크랩 오버레이 — BookmarkToggle(미디어 오버레이 전용, 선택 시 반전). 받침(반투명 흰 면+blur)은
 *     카드 것 그대로 유지 — BookmarkToggle 자체가 IconButton default 크기·radius를 가지므로 패딩 없이 바로 앉힌다.
 *     prop 이름은 카드의 말(bookmarked·onBookmarkChange) 그대로 — 부품 이름과 별개다.
 *   · 미디어 하단 안쪽: 배지 행 — 국가 배지(flag + "대한민국 +N ⌄", +N ⌄는 정적 표시 — 펼침은 Badge 확장 OPEN)
 *     + 직무 배지. 뉴트럴 recipe, size sm. 독립 클릭 영역.
 *  → 이름(h2, 1줄 …, 카드의 유일한 링크) → 직무(500, 1줄 …)/회사(muted, 1줄 …) → 소개 박스(sage-50, 1줄 …).
 * [Mobile ~768] 국가 배지 = 국기만(텍스트 숨김) · 소개 박스 2줄 허용. 폭·구조는 동일(296 고정).
 */

const NEW_WINDOW_MS = 31 * 24 * 60 * 60 * 1000; // 공개 후 1달

if (typeof document !== "undefined" && !document.getElementById("mt-mcard-style")) {
  const s = document.createElement("style");
  s.id = "mt-mcard-style";
  s.textContent = "@media (max-width:768px){.mt-mcard-clabel{display:none !important}.mt-mcard-intro{-webkit-line-clamp:2 !important}.mt-mcard-media{aspect-ratio:5/4 !important}}";
  document.head.appendChild(s);
}
if (typeof document !== "undefined" && !document.getElementById("mt-card-link-style")) {
  const s = document.createElement("style");
  s.id = "mt-card-link-style";
  s.textContent = ".mt-card-link{color:inherit;text-decoration:none;-webkit-user-drag:none;}" + ".mt-card-link::after{content:'';position:absolute;inset:0;z-index:1;}" + ".mt-card-link:focus-visible{outline:none;}" +
  // 포커스 링은 제목 글자가 아니라 카드 테두리에 그린다 — 무엇이 선택됐는지 보이게.
  "article:has(.mt-card-link:focus-visible){outline:2px solid var(--ring);outline-offset:2px;}";
  document.head.appendChild(s);
}
const ellipsis1 = {
  overflow: "hidden",
  textOverflow: "ellipsis",
  whiteSpace: "nowrap"
};
function MentorCard({
  name,
  role,
  company,
  intro,
  field,
  country,
  countryLabel,
  countryExtra = 0,
  publishedAt,
  photo,
  href = "#",
  bookmarked = false,
  onBookmarkChange,
  style,
  ...rest
}) {
  const controlled = onBookmarkChange != null;
  const [savedU, setSavedU] = React.useState(bookmarked);
  const saved = controlled ? bookmarked : savedU;
  const setSaved = n => {
    if (controlled) onBookmarkChange(n);else setSavedU(n);
  };
  const [hover, setHover] = React.useState(false);
  const [imgError, setImgError] = React.useState(false);
  const showImg = photo && !imgError;
  const isNew = publishedAt && Date.now() - new Date(publishedAt).getTime() <= NEW_WINDOW_MS;
  return /*#__PURE__*/React.createElement("article", _extends({
    onMouseEnter: () => setHover(true),
    onMouseLeave: () => setHover(false),
    style: {
      position: "relative",
      display: "block",
      width: 296,
      flex: "0 0 auto",
      color: "var(--foreground)",
      fontFamily: "var(--font-sans)",
      background: "var(--card)",
      border: "1px solid var(--sage-200)",
      borderRadius: "var(--card-radius)",
      boxShadow: hover ? "var(--shadow-md)" : "var(--card-shadow)",
      transition: "box-shadow 150ms ease",
      ...style
    }
  }, rest), /*#__PURE__*/React.createElement("div", {
    className: "mt-mcard-media",
    style: {
      position: "relative",
      margin: "var(--card-media-margin) var(--card-media-margin) 0",
      aspectRatio: "3 / 2",
      background: "var(--sage-100)",
      borderRadius: "var(--card-media-radius)",
      overflow: "hidden"
    }
  }, showImg ? /*#__PURE__*/React.createElement("img", {
    src: photo,
    alt: name || "",
    onError: () => setImgError(true),
    style: {
      width: "100%",
      height: "100%",
      objectFit: "cover",
      display: "block"
    }
  }) : /*#__PURE__*/React.createElement("span", {
    style: {
      position: "absolute",
      inset: 0,
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      color: "var(--sage-400)"
    }
  }, /*#__PURE__*/React.createElement(__ds_scope.Icon, {
    name: "user",
    size: 30
  })), isNew && /*#__PURE__*/React.createElement(__ds_scope.Badge, {
    variant: "status",
    status: "active",
    size: "sm",
    style: {
      position: "absolute",
      top: 8,
      left: 8,
      boxShadow: "var(--shadow-sm)"
    }
  }, "\uC2E0\uADDC \uBA58\uD1A0"), /*#__PURE__*/React.createElement("div", {
    style: {
      position: "absolute",
      top: 8,
      right: 8,
      zIndex: 2,
      borderRadius: "var(--radius-md)",
      background: "color-mix(in oklch, white 82%, transparent)",
      backdropFilter: "blur(4px)",
      boxShadow: "var(--shadow-sm), 0 0 0 1px color-mix(in oklch, var(--sage-950) 6%, transparent)",
      display: "inline-flex"
    }
  }, /*#__PURE__*/React.createElement(__ds_scope.BookmarkToggle, {
    ariaLabel: "\uC2A4\uD06C\uB7A9",
    selected: saved,
    onChange: setSaved
  })), /*#__PURE__*/React.createElement("div", {
    style: {
      position: "absolute",
      left: 8,
      right: 8,
      bottom: 8,
      zIndex: 2,
      display: "flex",
      alignItems: "center",
      gap: 6,
      overflow: "hidden"
    }
  }, (country || countryLabel) && /*#__PURE__*/React.createElement(__ds_scope.Badge, {
    size: "sm",
    leading: "flag",
    flag: country,
    style: {
      boxShadow: "var(--shadow-sm)"
    }
  }, /*#__PURE__*/React.createElement("span", {
    className: "mt-mcard-clabel",
    style: {
      display: "inline-flex",
      alignItems: "center",
      gap: 5
    }
  }, countryLabel, countryExtra > 0 && /*#__PURE__*/React.createElement("span", {
    style: {
      display: "inline-flex",
      alignItems: "center",
      gap: 1,
      color: "var(--muted-foreground)"
    }
  }, "+", countryExtra, /*#__PURE__*/React.createElement(__ds_scope.Icon, {
    name: "arrow-down-01",
    size: 13
  })))), field && /*#__PURE__*/React.createElement(__ds_scope.Badge, {
    size: "sm",
    style: {
      boxShadow: "var(--shadow-sm)"
    }
  }, field))), /*#__PURE__*/React.createElement("div", {
    style: {
      padding: "var(--card-content-padding)",
      display: "flex",
      flexDirection: "column",
      gap: 8
    }
  }, /*#__PURE__*/React.createElement("a", {
    href: href,
    className: "mt-card-link",
    style: {
      display: "block",
      fontSize: "var(--text-h2)",
      fontWeight: 600,
      letterSpacing: "0.01em",
      lineHeight: 1.3,
      ...ellipsis1
    }
  }, name), /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      flexDirection: "column",
      gap: 2
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      fontSize: "var(--text-body)",
      fontWeight: 500,
      color: "var(--foreground)",
      ...ellipsis1
    }
  }, role), /*#__PURE__*/React.createElement("span", {
    style: {
      fontSize: "var(--text-body)",
      fontWeight: 400,
      color: "var(--muted-foreground)",
      ...ellipsis1
    }
  }, company)), intro && /*#__PURE__*/React.createElement("div", {
    style: {
      background: "var(--sage-50)",
      border: "1px solid var(--sage-100)",
      borderRadius: "var(--radius-md)",
      padding: "8px 10px"
    }
  }, /*#__PURE__*/React.createElement("span", {
    className: "mt-mcard-intro",
    style: {
      display: "-webkit-box",
      WebkitBoxOrient: "vertical",
      WebkitLineClamp: 1,
      overflow: "hidden",
      fontSize: "var(--text-body)",
      lineHeight: 1.5,
      color: "var(--sage-700)"
    }
  }, intro))));
}
Object.assign(__ds_scope, { MentorCard });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/surfaces/MentorCard.jsx", error: String((e && e.message) || e) }); }

// components/surfaces/QnaCard.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
/**
 * QnaCard — 미디어 없는 텍스트 카드(Q&A). 카드 기하·elevation·동심원 원칙 상속.
 * 미디어가 없으므로 카드 전체 콘텐츠 패딩 = --card-content-padding(18px) 통일.
 *
 * [구조] 상단 분류(국가 flag Badge md → 키워드 Badge md, 순서 고정) → 제목 h3(2줄 고정) → 발췌(2줄 고정) →
 *  해시태그 행(Chip sm prefix="#", 최대 5 + Badge "+N") → hairline →
 *  답변 요약(AvatarGroup max 3 + "멘토 답변 N개", 0건이면 "아직 작성된 답변이 없습니다" — 자리를 비우지 않는다) →
 *  하단 메타 행(조회수 표시 전용 / 도움돼요·스크랩 CountToggle).
 *  상단=분류, 하단=반응 — 액션 버튼은 제목 옆에 붙지 않는다.
 * [variant] compact 하나뿐(우측 위젯 "나의 Q&A" — 폭이 좁아 해시태그 행만 통째로 감춘다). 레이아웃 variant는 만들지 않는다.
 * [반응] 도움돼요·스크랩은 제어형(liked/likes · scrapped/scraps) — 카드가 숫자를 스스로 바꾸지 않는다. 조회수는 표시 전용.
 * [CountToggle tone] 도움돼요=rose · 스크랩=dark. green은 쓰지 않는다(이미 "멘토 답변 N개" 등에 쓰임).
 * [해시태그] 태그는 Chip(눌린다, prefix="#" — 라벨에 #를 넣지 않는다). "+N"은 Badge다 — 태그가 아니라 개수이고
 *  눌리지 않는다. 클릭 핸들러·펼침 없음(격자 6장의 높이가 고정돼야 하고, 카드 안에서 펼치면 옆 카드를 덮는다).
 *  전부는 카드 전면 링크가 가는 상세에서 본다.
 * [아바타] 사진만 3장으로 줄인다 — "멘토 답변 N개"의 N은 실제 답변 수 그대로. 순서는 부모가 정해 넘긴다.
 * [색 예산] 정적 상태에서 채도를 쓰는 자리는 국기 · 아바타 사진 · "멘토 답변 N개"의 N, 이 3곳뿐.
 *  해시태그는 항상 --muted 채움(Chip 기본) — 색 있는 배지로 만들지 않는다.
 * [스트레치 링크] 루트는 <article>(position:relative) — <a>가 아니다. 제목에만 <a>(mt-card-link)를 걸고
 *  그 ::after가 카드 전면을 덮는다. 해시태그 Chip·CountToggle은 z-index:2로 그 위에서 독립 클릭.
 *  카드의 접근 이름 = 제목 링크 텍스트. 탭 순서 = 제목 → 해시태그 → 도움돼요 → 스크랩.
 */
const MAX_TAGS = 5; // 5개까지 세우고 나머지는 "+N" 하나로 접는다(펼치지 않는다).

const clamp = lines => ({
  display: "-webkit-box",
  WebkitBoxOrient: "vertical",
  WebkitLineClamp: lines,
  overflow: "hidden",
  wordBreak: "keep-all",
  overflowWrap: "break-word" // 禁則: break-all 금지
});
if (typeof document !== "undefined" && !document.getElementById("mt-card-link-style")) {
  const s = document.createElement("style");
  s.id = "mt-card-link-style";
  s.textContent = ".mt-card-link{color:inherit;text-decoration:none;-webkit-user-drag:none;}" + ".mt-card-link::after{content:'';position:absolute;inset:0;z-index:1;}" + ".mt-card-link:focus-visible{outline:none;}" +
  // 포커스 링은 제목 글자가 아니라 카드 테두리에 그린다 — 무엇이 선택됐는지 보이게.
  "article:has(.mt-card-link:focus-visible){outline:2px solid var(--ring);outline-offset:2px;}";
  document.head.appendChild(s);
}
function QnaCard({
  country,
  countryLabel,
  keyword,
  title,
  excerpt,
  tags = [],
  compact = false,
  answerers = [],
  answerCount,
  maxAvatars = 3,
  views = 0,
  liked = false,
  onLikeChange,
  likes = 0,
  scrapped = false,
  onScrapChange,
  scraps = 0,
  href = "#",
  style,
  ...rest
}) {
  const [hover, setHover] = React.useState(false);
  const count = answerCount != null ? answerCount : answerers.length;
  const shownTags = tags.slice(0, MAX_TAGS);
  const extraTags = tags.length - shownTags.length;
  return /*#__PURE__*/React.createElement("article", _extends({
    onMouseEnter: () => setHover(true),
    onMouseLeave: () => setHover(false),
    style: {
      position: "relative",
      display: "flex",
      flexDirection: "column",
      gap: 10,
      width: "100%",
      boxSizing: "border-box",
      color: "var(--foreground)",
      fontFamily: "var(--font-sans)",
      background: "var(--card)",
      border: "1px solid var(--sage-200)",
      borderRadius: "var(--card-radius)",
      boxShadow: hover ? "var(--shadow-md)" : "var(--card-shadow)",
      padding: "var(--card-content-padding)",
      transition: "box-shadow 150ms ease",
      ...style
    }
  }, rest), (country || countryLabel || keyword) && /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      alignItems: "center",
      gap: 6,
      flexWrap: "wrap"
    }
  }, (country || countryLabel) && /*#__PURE__*/React.createElement(__ds_scope.Badge, {
    size: "md",
    leading: "flag",
    flag: country
  }, countryLabel), keyword && /*#__PURE__*/React.createElement(__ds_scope.Badge, {
    size: "md"
  }, keyword)), /*#__PURE__*/React.createElement("a", {
    href: href,
    className: "mt-card-link",
    style: {
      display: "block",
      fontSize: "var(--text-h3)",
      fontWeight: 600,
      lineHeight: 1.5,
      ...clamp(2)
    }
  }, title), /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: "var(--text-body)",
      fontWeight: 400,
      color: "var(--muted-foreground)",
      lineHeight: 1.6,
      ...clamp(2)
    }
  }, excerpt), !compact && shownTags.length > 0 && /*#__PURE__*/React.createElement("div", {
    style: {
      position: "relative",
      zIndex: 2,
      display: "flex",
      flexWrap: "wrap",
      alignItems: "center",
      rowGap: 8,
      columnGap: 6,
      maxHeight: 52,
      overflow: "hidden"
    }
  }, shownTags.map((t, i) => /*#__PURE__*/React.createElement(__ds_scope.Chip, {
    key: i,
    size: "sm",
    prefix: "#",
    href: `/tags/${t}`
  }, t)), extraTags > 0 && /*#__PURE__*/React.createElement(__ds_scope.Badge, {
    size: "sm"
  }, "+", extraTags)), /*#__PURE__*/React.createElement("div", {
    style: {
      height: 1,
      background: "var(--sage-200)",
      margin: "2px 0"
    }
  }), count > 0 ? /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      alignItems: "center",
      gap: 10
    }
  }, answerers.length > 0 && /*#__PURE__*/React.createElement(__ds_scope.AvatarGroup, {
    items: answerers,
    max: maxAvatars,
    size: "sm"
  }), /*#__PURE__*/React.createElement("span", {
    style: {
      fontSize: "var(--text-body)",
      color: "var(--muted-foreground)"
    }
  }, "\uBA58\uD1A0 \uB2F5\uBCC0 ", /*#__PURE__*/React.createElement("b", {
    className: "tabular",
    style: {
      color: "var(--primary)",
      fontWeight: 600
    }
  }, count), "\uAC1C")) : /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: "var(--text-body)",
      fontWeight: 500,
      color: "var(--primary)"
    }
  }, "\uC544\uC9C1 \uC791\uC131\uB41C \uB2F5\uBCC0\uC774 \uC5C6\uC2B5\uB2C8\uB2E4"), /*#__PURE__*/React.createElement("div", {
    style: {
      position: "relative",
      zIndex: 2,
      display: "flex",
      alignItems: "center",
      justifyContent: "space-between"
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      display: "inline-flex",
      alignItems: "center",
      gap: 4,
      color: "var(--muted-foreground)",
      fontSize: "var(--text-caption)"
    }
  }, /*#__PURE__*/React.createElement(__ds_scope.Icon, {
    name: "view",
    size: 15
  }), /*#__PURE__*/React.createElement("span", {
    className: "tabular"
  }, views)), /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      alignItems: "center",
      gap: 14
    }
  }, /*#__PURE__*/React.createElement(__ds_scope.CountToggle, {
    icon: "favourite",
    tone: "rose",
    selected: liked,
    count: likes,
    onChange: onLikeChange
  }), /*#__PURE__*/React.createElement(__ds_scope.CountToggle, {
    icon: "bookmark",
    tone: "dark",
    selected: scrapped,
    count: scraps,
    onChange: onScrapChange
  }))));
}
Object.assign(__ds_scope, { QnaCard });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/surfaces/QnaCard.jsx", error: String((e && e.message) || e) }); }

// components/surfaces/Skeleton.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
/**
 * Skeleton — 데이터를 기다리는 동안 자리를 잡아두는 회색 덩어리 하나. surfaces에 있지만 카드가 아니다.
 * [스피너를 쓰지 않는다] 스피너는 무엇이 올지 알려주지 않고, 도착하는 순간 화면이 한 번 더 흔들린다.
 * [프리미티브 하나] 카드 모양·목록 모양을 미리 만들지 않는다(SkeletonCard 같은 것을 만들지 말 것) —
 *  화면마다 배치가 다르다. 형태는 화면이 이 덩어리를 배치해서 만든다.
 * [움직임] 은은한 펄스 하나만. 좌우로 훑는 shimmer는 쓰지 않는다 — 한 화면에 12장이 동시에 훑으면 시끄럽다.
 *  prefers-reduced-motion에서는 멈추고 정지 상태로 둔다.
 * [색] --muted만. 채도를 쓰지 않는다. 실제 콘텐츠보다 눈에 띄면 안 된다.
 * [접근성] aria-hidden="true". 감싸는 영역에 aria-busy="true"를 두는 것은 화면의 일이다.
 * [개수] 몇 개를 세우는지는 부품이 정하지 않는다 — 화면 사양이 정한다.
 */
const RADII = {
  sm: "var(--radius-sm)",
  md: "var(--radius-md)",
  full: "999px"
};
const CSS = `@keyframes mt-skeleton-pulse{0%,100%{opacity:1}50%{opacity:.55}}
.mt-skeleton{animation:mt-skeleton-pulse 1.6s ease-in-out infinite}
@media (prefers-reduced-motion: reduce){.mt-skeleton{animation:none}}`;
function Skeleton({
  width = "100%",
  height,
  radius = "sm",
  count = 1,
  style,
  className,
  ...rest
}) {
  const n = Math.max(1, Math.floor(count) || 1);
  const h = height ?? "calc(var(--text-body) * 1.7)";
  const w = typeof width === "number" ? `${width}px` : width;
  const bar = i => /*#__PURE__*/React.createElement("div", _extends({
    key: i,
    className: ["mt-skeleton", className].filter(Boolean).join(" "),
    "aria-hidden": "true",
    style: {
      // 마지막 줄은 폭을 60%로 줄인다 — 문단의 끝처럼 보인다.
      width: n > 1 && i === n - 1 ? "60%" : w,
      height: typeof h === "number" ? `${h}px` : h,
      flex: "none",
      background: "var(--muted)",
      borderRadius: RADII[radius] || RADII.sm,
      ...style
    }
  }, n > 1 ? {} : rest));
  if (n === 1) return /*#__PURE__*/React.createElement(React.Fragment, null, bar(0), /*#__PURE__*/React.createElement("style", null, CSS));
  return /*#__PURE__*/React.createElement("div", _extends({
    "aria-hidden": "true",
    style: {
      display: "flex",
      flexDirection: "column",
      gap: 8,
      width: w
    }
  }, rest), Array.from({
    length: n
  }, (_, i) => bar(i)), /*#__PURE__*/React.createElement("style", null, CSS));
}
Object.assign(__ds_scope, { Skeleton });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/surfaces/Skeleton.jsx", error: String((e && e.message) || e) }); }

// components/surfaces/Table.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
/**
 * Table — data table. Row hover uses a sage accent (per USAGE-RULES).
 * columns: [{ key, header, align?, width?, render?(row) }]
 */
function Table({
  columns = [],
  data = [],
  style,
  ...rest
}) {
  const [hover, setHover] = React.useState(-1);
  return /*#__PURE__*/React.createElement("div", _extends({
    style: {
      border: "1px solid var(--border)",
      borderRadius: "var(--radius-lg)",
      overflow: "hidden",
      background: "var(--card)",
      ...style
    }
  }, rest), /*#__PURE__*/React.createElement("table", {
    style: {
      width: "100%",
      borderCollapse: "collapse",
      fontFamily: "var(--font-sans)"
    }
  }, /*#__PURE__*/React.createElement("thead", null, /*#__PURE__*/React.createElement("tr", null, columns.map(c => /*#__PURE__*/React.createElement("th", {
    key: c.key,
    style: {
      textAlign: c.align || "left",
      padding: "11px 16px",
      fontSize: "var(--text-caption)",
      fontWeight: 600,
      color: "var(--muted-foreground)",
      background: "var(--sage-50)",
      borderBottom: "1px solid var(--border)",
      width: c.width,
      whiteSpace: "nowrap"
    }
  }, c.header)))), /*#__PURE__*/React.createElement("tbody", null, data.map((row, i) => /*#__PURE__*/React.createElement("tr", {
    key: i,
    onMouseEnter: () => setHover(i),
    onMouseLeave: () => setHover(-1),
    style: {
      background: hover === i ? "var(--secondary)" : "transparent",
      transition: "background-color 120ms ease"
    }
  }, columns.map(c => /*#__PURE__*/React.createElement("td", {
    key: c.key,
    style: {
      textAlign: c.align || "left",
      padding: "12px 16px",
      fontSize: "var(--text-body)",
      color: "var(--foreground)",
      borderBottom: i === data.length - 1 ? "none" : "1px solid var(--border)",
      fontVariantNumeric: c.align === "right" ? "tabular-nums" : "normal"
    }
  }, c.render ? c.render(row) : row[c.key])))))));
}
Object.assign(__ds_scope, { Table });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/surfaces/Table.jsx", error: String((e && e.message) || e) }); }

__ds_ns.Avatar = __ds_scope.Avatar;

__ds_ns.AvatarGroup = __ds_scope.AvatarGroup;

__ds_ns.Badge = __ds_scope.Badge;

__ds_ns.BookmarkToggle = __ds_scope.BookmarkToggle;

__ds_ns.Button = __ds_scope.Button;

__ds_ns.Chip = __ds_scope.Chip;

__ds_ns.CountToggle = __ds_scope.CountToggle;

__ds_ns.FilterChip = __ds_scope.FilterChip;

__ds_ns.Icon = __ds_scope.Icon;

__ds_ns.IconButton = __ds_scope.IconButton;

__ds_ns.Checkbox = __ds_scope.Checkbox;

__ds_ns.Field = __ds_scope.Field;

__ds_ns.FieldGroup = __ds_scope.FieldGroup;

__ds_ns.Input = __ds_scope.Input;

__ds_ns.RadioGroup = __ds_scope.RadioGroup;

__ds_ns.Select = __ds_scope.Select;

__ds_ns.Switch = __ds_scope.Switch;

__ds_ns.ToggleGroup = __ds_scope.ToggleGroup;

__ds_ns.Banner = __ds_scope.Banner;

__ds_ns.BottomTabBar = __ds_scope.BottomTabBar;

__ds_ns.CalloutBar = __ds_scope.CalloutBar;

__ds_ns.Carousel = __ds_scope.Carousel;

__ds_ns.Footer = __ds_scope.Footer;

__ds_ns.Header = __ds_scope.Header;

__ds_ns.Pagination = __ds_scope.Pagination;

__ds_ns.SectionHeader = __ds_scope.SectionHeader;

__ds_ns.Sidebar = __ds_scope.Sidebar;

__ds_ns.Tabs = __ds_scope.Tabs;

__ds_ns.TabPanel = __ds_scope.TabPanel;

__ds_ns.NAV_PRIMARY = __ds_scope.NAV_PRIMARY;

__ds_ns.NAV_AUTH = __ds_scope.NAV_AUTH;

__ds_ns.NAV_UTILITY = __ds_scope.NAV_UTILITY;

__ds_ns.NAV_DETAIL = __ds_scope.NAV_DETAIL;

__ds_ns.Dialog = __ds_scope.Dialog;

__ds_ns.Popover = __ds_scope.Popover;

__ds_ns.Sheet = __ds_scope.Sheet;

__ds_ns.Toast = __ds_scope.Toast;

__ds_ns.AnswerCard = __ds_scope.AnswerCard;

__ds_ns.ArticlePreview = __ds_scope.ArticlePreview;

__ds_ns.Card = __ds_scope.Card;

__ds_ns.CardHeader = __ds_scope.CardHeader;

__ds_ns.CardTitle = __ds_scope.CardTitle;

__ds_ns.CardDescription = __ds_scope.CardDescription;

__ds_ns.CardContent = __ds_scope.CardContent;

__ds_ns.CardFooter = __ds_scope.CardFooter;

__ds_ns.EmptyState = __ds_scope.EmptyState;

__ds_ns.InterviewCard = __ds_scope.InterviewCard;

__ds_ns.MentorCard = __ds_scope.MentorCard;

__ds_ns.QnaCard = __ds_scope.QnaCard;

__ds_ns.Skeleton = __ds_scope.Skeleton;

__ds_ns.Table = __ds_scope.Table;

})();
