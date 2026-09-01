/* @ds-bundle: {"format":4,"namespace":"MentreeDesignSystem_2f86cf","components":[{"name":"Avatar","sourcePath":"components/core/Avatar.jsx"},{"name":"AvatarGroup","sourcePath":"components/core/Avatar.jsx"},{"name":"Badge","sourcePath":"components/core/Badge.jsx"},{"name":"BookmarkToggle","sourcePath":"components/core/BookmarkToggle.jsx"},{"name":"Button","sourcePath":"components/core/Button.jsx"},{"name":"FilterChip","sourcePath":"components/core/FilterChip.jsx"},{"name":"Icon","sourcePath":"components/core/Icon.jsx"},{"name":"IconButton","sourcePath":"components/core/IconButton.jsx"},{"name":"Checkbox","sourcePath":"components/forms/Checkbox.jsx"},{"name":"Field","sourcePath":"components/forms/Field.jsx"},{"name":"FieldGroup","sourcePath":"components/forms/Field.jsx"},{"name":"Input","sourcePath":"components/forms/Input.jsx"},{"name":"RadioGroup","sourcePath":"components/forms/RadioGroup.jsx"},{"name":"Select","sourcePath":"components/forms/Select.jsx"},{"name":"Switch","sourcePath":"components/forms/Switch.jsx"},{"name":"ToggleGroup","sourcePath":"components/forms/ToggleGroup.jsx"},{"name":"Banner","sourcePath":"components/navigation/Banner.jsx"},{"name":"BottomTabBar","sourcePath":"components/navigation/BottomTabBar.jsx"},{"name":"CalloutBar","sourcePath":"components/navigation/CalloutBar.jsx"},{"name":"Carousel","sourcePath":"components/navigation/Carousel.jsx"},{"name":"Footer","sourcePath":"components/navigation/Footer.jsx"},{"name":"Header","sourcePath":"components/navigation/Header.jsx"},{"name":"SectionHeader","sourcePath":"components/navigation/SectionHeader.jsx"},{"name":"Sidebar","sourcePath":"components/navigation/Sidebar.jsx"},{"name":"NAV_PRIMARY","sourcePath":"components/navigation/nav-ia.js"},{"name":"NAV_AUTH","sourcePath":"components/navigation/nav-ia.js"},{"name":"NAV_UTILITY","sourcePath":"components/navigation/nav-ia.js"},{"name":"NAV_DETAIL","sourcePath":"components/navigation/nav-ia.js"},{"name":"Dialog","sourcePath":"components/overlays/Dialog.jsx"},{"name":"Sheet","sourcePath":"components/overlays/Sheet.jsx"},{"name":"ArticlePreview","sourcePath":"components/surfaces/ArticlePreview.jsx"},{"name":"Card","sourcePath":"components/surfaces/Card.jsx"},{"name":"CardHeader","sourcePath":"components/surfaces/Card.jsx"},{"name":"CardTitle","sourcePath":"components/surfaces/Card.jsx"},{"name":"CardDescription","sourcePath":"components/surfaces/Card.jsx"},{"name":"CardContent","sourcePath":"components/surfaces/Card.jsx"},{"name":"CardFooter","sourcePath":"components/surfaces/Card.jsx"},{"name":"InterviewCard","sourcePath":"components/surfaces/InterviewCard.jsx"},{"name":"MentorCard","sourcePath":"components/surfaces/MentorCard.jsx"},{"name":"QnaCard","sourcePath":"components/surfaces/QnaCard.jsx"},{"name":"Table","sourcePath":"components/surfaces/Table.jsx"}],"sourceHashes":{"components/core/Avatar.jsx":"0f3ffc5f31ff","components/core/Badge.jsx":"c7b9be0e02f2","components/core/BookmarkToggle.jsx":"6f1632051627","components/core/Button.jsx":"a5114fd5d2aa","components/core/FilterChip.jsx":"4231e312e900","components/core/Icon.jsx":"021313e06cd9","components/core/IconButton.jsx":"b76b12d02e1c","components/forms/Checkbox.jsx":"f7c99f0c94f3","components/forms/Field.jsx":"fec68edbf693","components/forms/Input.jsx":"d0a1ec848714","components/forms/RadioGroup.jsx":"f8e7f8aaa3ba","components/forms/Select.jsx":"6b9e34922aed","components/forms/Switch.jsx":"f3bca0c8c43a","components/forms/ToggleGroup.jsx":"c7a2bba81517","components/navigation/Banner.jsx":"897c8f74939c","components/navigation/BottomTabBar.jsx":"25ee0db58c82","components/navigation/CalloutBar.jsx":"092df60cda63","components/navigation/Carousel.jsx":"17be8b079c53","components/navigation/Footer.jsx":"071aa679b475","components/navigation/Header.jsx":"323047247fb7","components/navigation/SectionHeader.jsx":"9092de3b1569","components/navigation/Sidebar.jsx":"d290d8096d0f","components/navigation/nav-ia.js":"00ab9777819d","components/overlays/Dialog.jsx":"6851075179eb","components/overlays/Sheet.jsx":"219e7b9172f9","components/surfaces/ArticlePreview.jsx":"5f000b4e7a01","components/surfaces/Card.jsx":"155a05c05916","components/surfaces/InterviewCard.jsx":"5dff3ebf339c","components/surfaces/MentorCard.jsx":"ebe03f29898d","components/surfaces/QnaCard.jsx":"9c45fb4207de","components/surfaces/Table.jsx":"cd55307893a4"},"inlinedExternals":[],"unexposedExports":[]} */

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
/**
 * BookmarkToggle — Toggle 기반 아이콘 토글(aria-pressed 반영).
 * 미선택=outline / 선택=반전(배경 sage-900 채움 + 아이콘 white). "selected=반전"은 토글 계열 공통 원칙
 * (추후 FilterChip도 같은 원리로 green 반전). 상태 표시이므로 북마크가 카드 장식이 아니다.
 * HugeIcons 정적 CDN에 solid 북마크가 없어, 북마크 형태를 HugeIcons 스타일
 * (stroke 1.6, 라운드)의 인라인 SVG로 그려 outline↔fill을 정확히 토글한다.
 * (서버 저장 로직은 범위 밖 — 컴포넌트 상태 표현만.)
 */
const SIZES = {
  sm: 32,
  md: 38,
  lg: 44
};
const ICON = {
  sm: 18,
  md: 20,
  lg: 22
};
function BookmarkToggle({
  selected = false,
  onChange,
  disabled = false,
  size = "md",
  ariaLabel = "북마크",
  style,
  ...rest
}) {
  const [hover, setHover] = React.useState(false);
  const px = SIZES[size] || SIZES.md;
  const isz = ICON[size] || ICON.md;
  React.useEffect(() => {
    if (document.getElementById("mt-bmk-style")) return;
    const s = document.createElement("style");
    s.id = "mt-bmk-style";
    s.textContent = ".mt-bmk:focus-visible{outline:2px solid var(--ring);outline-offset:2px;}";
    document.head.appendChild(s);
  }, []);

  // selected=반전: 배경 sage-900 채움 + 아이콘 white. default/hover는 기존 유지.
  const fg = disabled ? "var(--sage-400)" : selected ? "var(--sage-50)" : "var(--muted-foreground)";
  const bg = disabled ? "transparent" : selected ? "var(--sage-900)" : hover ? "var(--secondary)" : "transparent";
  return /*#__PURE__*/React.createElement("button", _extends({
    type: "button",
    className: "mt-bmk",
    "aria-pressed": selected,
    "aria-label": ariaLabel,
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
      width: px,
      height: px,
      border: "none",
      borderRadius: "var(--radius-md)",
      background: bg,
      color: fg,
      cursor: disabled ? "not-allowed" : "pointer",
      opacity: disabled ? 0.55 : 1,
      transition: "background-color 150ms ease, color 150ms ease, transform 120ms ease",
      ...style
    }
  }, rest), /*#__PURE__*/React.createElement("svg", {
    width: isz,
    height: isz,
    viewBox: "0 0 24 24",
    fill: selected ? "currentColor" : "none",
    stroke: "currentColor",
    strokeWidth: 1.6,
    strokeLinejoin: "round",
    strokeLinecap: "round",
    "aria-hidden": "true"
  }, /*#__PURE__*/React.createElement("path", {
    d: "M5 4.6C5 3.72 5.72 3 6.6 3h10.8c.88 0 1.6.72 1.6 1.6v15.5c0 .82-.92 1.3-1.58.82L12 17.4l-5.42 3.52C5.92 21.4 5 20.92 5 20.1V4.6z"
  })));
}
Object.assign(__ds_scope, { BookmarkToggle });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/core/BookmarkToggle.jsx", error: String((e && e.message) || e) }); }

// components/core/FilterChip.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
/**
 * FilterChip — Toggle 계열 텍스트 칩(aria-pressed 반영). BookmarkToggle의 형제.
 *  같은 Toggle 조상을 공유하되 형태가 다르다: 아이콘형=BookmarkToggle / 텍스트칩형=FilterChip.
 *  Badge(정적·인터랙션 불가)와 구분 — FilterChip은 클릭·선택 가능한 필터 요소.
 *
 * [크기·형태] 버튼 sm 체계(높이 32 · padding 0 12 · radius-md=12 · caption/500). pill 미사용.
 * [상태 — Toggle 공통 "selected=반전"] default: card 배경 + sage 아웃라인 + sage-700 텍스트 /
 *  hover: 옅은 sage 틴트(--secondary) / selected: primary green 반전(흰 텍스트) ←
 *  BookmarkToggle이 sage-900 반전인 것과 달리 FilterChip은 green 반전(필터 활성=브랜드 액션) /
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
function IconButton({
  icon,
  variant = "ghost",
  size = "md",
  disabled = false,
  ariaLabel,
  style,
  ...rest
}) {
  const dim = SIZES[size] || SIZES.md;
  const v = VARIANTS[variant] || VARIANTS.ghost;
  return /*#__PURE__*/React.createElement("button", _extends({
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
}
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

// components/surfaces/ArticlePreview.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
/**
 * ArticlePreview — 투명 콘텐츠 프리뷰(카드 아님). 표면 규칙: 썸네일 자체가 시각 경계.
 *  배경 투명 · 테두리 없음 · 그림자 없음 · 카드 마진 없음(카드 셸 상속 안 함).
 *  동심원 기하는 미디어에만: 썸네일 16:9 + radius 14. 요소 간 수직 리듬만(좌우 패딩 없음).
 *  hover: 썸네일에만 elevation 한 단계 상승(카드 elevation 토큰 재사용, 미세). 컨테이너 배경 없음.
 *  위치 이동/확대 점프 금지 — scale 없이 shadow만. 카드 전체 클릭 → 아티클 상세.
 */
const clamp = lines => ({
  display: "-webkit-box",
  WebkitBoxOrient: "vertical",
  WebkitLineClamp: lines,
  overflow: "hidden",
  wordBreak: "keep-all",
  overflowWrap: "break-word" // 禁則: break-all 금지
});
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
  return /*#__PURE__*/React.createElement("a", _extends({
    href: href,
    onMouseEnter: () => setHover(true),
    onMouseLeave: () => setHover(false),
    style: {
      display: "flex",
      flexDirection: "column",
      gap: 10,
      width: "100%",
      boxSizing: "border-box",
      textDecoration: "none",
      color: "var(--foreground)",
      fontFamily: "var(--font-sans)",
      // 투명: 배경/테두리/그림자/마진 없음. hover 신호는 썸네일 elevation으로만(컨테이너 배경 없음).
      background: "transparent",
      border: "none",
      boxShadow: "none",
      borderRadius: "var(--card-media-radius)",
      padding: 0,
      cursor: "pointer",
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
  }))), /*#__PURE__*/React.createElement("div", {
    style: {
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

// components/surfaces/InterviewCard.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
/**
 * InterviewCard — 인물 인터뷰 카드(표면 규칙 1단계: 인물 객체 → 카드).
 *  카드 셸·elevation·동심원 기하 상속. 좌우 가로 분할(좌 미디어 1:1 / 우 정보). TOP용 가로형.
 *  카드 전체 클릭 → 인터뷰 상세. 북마크 없음(후킹 섹션, 저장 액션 없음).
 *  size 변형: "featured"(대형, 발췌 있음) / "compact"(소형, 발췌 없음). 별개 컴포넌트 아님.
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
  return /*#__PURE__*/React.createElement("a", _extends({
    href: href,
    onMouseEnter: () => setHover(true),
    onMouseLeave: () => setHover(false),
    style: {
      display: "flex",
      gap: 0,
      width: "100%",
      height: s.card,
      // TOP 변형 한정: 미디어가 카드 높이 결정(featured 336 / compact 160)
      boxSizing: "border-box",
      textDecoration: "none",
      color: "var(--foreground)",
      fontFamily: "var(--font-sans)",
      background: "var(--card)",
      border: "1px solid var(--sage-200)",
      borderRadius: "var(--card-radius)",
      boxShadow: hover ? "var(--shadow-md)" : "var(--card-shadow)",
      overflow: "hidden",
      transition: "box-shadow 150ms ease",
      cursor: "pointer",
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
  }, field)), /*#__PURE__*/React.createElement("div", {
    style: {
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
 * MentorCard — 세로형 멘토 카드(고정폭 296, 리스폰시브 아님). 프리미티브(Badge·BookmarkToggle) 조립.
 *
 * [카드 공통 셸] white(card) · 1px sage-200 헤어라인 · card-shadow · card-radius(동심원).
 *  hover 시 그림자만 상승(shadow-md), 위치 이동 없음(~150ms). 카드 전체가 멘토 상세 링크.
 * [구조] 미디어(Desktop 3:2 · Mobile 5:4, cover 크롭, media-margin 인셋 + media-radius)
 *   · 좌상단: "신규 멘토" 배지(green, status/active recipe) — publishedAt 기준 공개 후 1달만 노출
 *   · 우상단: BookmarkToggle 오버레이(독립 클릭, 전파 차단)
 *   · 미디어 하단 안쪽: 배지 행 — 국가 배지(flag + "대한민국 +N ⌄", +N ⌄는 정적 표시 — 펼침은 Badge 확장 OPEN)
 *     + 직무 배지. 뉴트럴 recipe, size sm. 독립 클릭 영역(전파 차단).
 *  → 이름(h2, 1줄 …) → 직무(500, 1줄 …)/회사(muted, 1줄 …) → 소개 박스(sage-50, 1줄 …).
 * [Mobile ~768] 국가 배지 = 국기만(텍스트 숨김) · 소개 박스 2줄 허용. 폭·구조는 동일(296 고정).
 */

const NEW_WINDOW_MS = 31 * 24 * 60 * 60 * 1000; // 공개 후 1달

if (typeof document !== "undefined" && !document.getElementById("mt-mcard-style")) {
  const s = document.createElement("style");
  s.id = "mt-mcard-style";
  s.textContent = "@media (max-width:768px){.mt-mcard-clabel{display:none !important}.mt-mcard-intro{-webkit-line-clamp:2 !important}.mt-mcard-media{aspect-ratio:5/4 !important}}";
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
  const block = e => {
    e.preventDefault();
    e.stopPropagation();
  };
  return /*#__PURE__*/React.createElement("a", _extends({
    href: href,
    onMouseEnter: () => setHover(true),
    onMouseLeave: () => setHover(false),
    style: {
      display: "block",
      width: 296,
      flex: "0 0 auto",
      textDecoration: "none",
      color: "var(--foreground)",
      fontFamily: "var(--font-sans)",
      background: "var(--card)",
      border: "1px solid var(--sage-200)",
      borderRadius: "var(--card-radius)",
      boxShadow: hover ? "var(--shadow-md)" : "var(--card-shadow)",
      transition: "box-shadow 150ms ease",
      cursor: "pointer",
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
    onClick: block,
    style: {
      position: "absolute",
      top: 8,
      left: 8,
      boxShadow: "var(--shadow-sm)"
    }
  }, "\uC2E0\uADDC \uBA58\uD1A0"), /*#__PURE__*/React.createElement("div", {
    onClick: block,
    style: {
      position: "absolute",
      top: 8,
      right: 8,
      borderRadius: "var(--radius-md)",
      background: "color-mix(in oklch, white 82%, transparent)",
      backdropFilter: "blur(4px)",
      boxShadow: "var(--shadow-sm), 0 0 0 1px color-mix(in oklch, var(--sage-950) 6%, transparent)"
    }
  }, /*#__PURE__*/React.createElement(__ds_scope.BookmarkToggle, {
    selected: saved,
    onChange: setSaved
  })), /*#__PURE__*/React.createElement("div", {
    onClick: block,
    style: {
      position: "absolute",
      left: 8,
      right: 8,
      bottom: 8,
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
  }, /*#__PURE__*/React.createElement("div", {
    style: {
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
 * 카드 전체 클릭 → Q&A 상세.
 *  상단행: 카테고리 badge(분류) + 메타(조회수 눈 / 좋아요 하트, 카운트 전용·무상태).
 *  제목 h3(2줄 고정) · 발췌 body muted(2줄 고정) · hairline · 하단행 답변자 AvatarGroup + "멘토 답변 N개".
 */
const clamp2 = {
  display: "-webkit-box",
  WebkitBoxOrient: "vertical",
  WebkitLineClamp: 2,
  overflow: "hidden",
  wordBreak: "keep-all",
  overflowWrap: "break-word" // 禁則: break-all 금지
};
function QnaCard({
  category,
  views = 0,
  likes = 0,
  title,
  excerpt,
  answerers = [],
  answerCount,
  maxAvatars = 4,
  href = "#",
  style,
  ...rest
}) {
  const [hover, setHover] = React.useState(false);
  const count = answerCount != null ? answerCount : answerers.length;
  const meta = (icon, n) => /*#__PURE__*/React.createElement("span", {
    style: {
      display: "inline-flex",
      alignItems: "center",
      gap: 4,
      color: "var(--muted-foreground)",
      fontSize: "var(--text-caption)"
    }
  }, /*#__PURE__*/React.createElement(__ds_scope.Icon, {
    name: icon,
    size: 15
  }), /*#__PURE__*/React.createElement("span", {
    className: "tabular"
  }, n));
  return /*#__PURE__*/React.createElement("a", _extends({
    href: href,
    onMouseEnter: () => setHover(true),
    onMouseLeave: () => setHover(false),
    style: {
      display: "flex",
      flexDirection: "column",
      gap: 10,
      width: "100%",
      boxSizing: "border-box",
      textDecoration: "none",
      color: "var(--foreground)",
      fontFamily: "var(--font-sans)",
      background: "var(--card)",
      border: "1px solid var(--sage-200)",
      borderRadius: "var(--card-radius)",
      boxShadow: hover ? "var(--shadow-md)" : "var(--card-shadow)",
      padding: "var(--card-content-padding)",
      transition: "box-shadow 150ms ease",
      cursor: "pointer",
      ...style
    }
  }, rest), /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      alignItems: "center",
      justifyContent: "space-between",
      gap: 10
    }
  }, category && /*#__PURE__*/React.createElement(__ds_scope.Badge, {
    size: "sm"
  }, category), /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      alignItems: "center",
      gap: 12
    }
  }, meta("view", views), meta("favourite", likes))), /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: "var(--text-h3)",
      fontWeight: 600,
      lineHeight: 1.5,
      ...clamp2
    }
  }, title), /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: "var(--text-body)",
      fontWeight: 400,
      color: "var(--muted-foreground)",
      lineHeight: 1.6,
      ...clamp2
    }
  }, excerpt), /*#__PURE__*/React.createElement("div", {
    style: {
      height: 1,
      background: "var(--sage-200)",
      margin: "2px 0"
    }
  }), /*#__PURE__*/React.createElement("div", {
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
  }, count), "\uAC1C")));
}
Object.assign(__ds_scope, { QnaCard });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/surfaces/QnaCard.jsx", error: String((e && e.message) || e) }); }

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

__ds_ns.SectionHeader = __ds_scope.SectionHeader;

__ds_ns.Sidebar = __ds_scope.Sidebar;

__ds_ns.NAV_PRIMARY = __ds_scope.NAV_PRIMARY;

__ds_ns.NAV_AUTH = __ds_scope.NAV_AUTH;

__ds_ns.NAV_UTILITY = __ds_scope.NAV_UTILITY;

__ds_ns.NAV_DETAIL = __ds_scope.NAV_DETAIL;

__ds_ns.Dialog = __ds_scope.Dialog;

__ds_ns.Sheet = __ds_scope.Sheet;

__ds_ns.ArticlePreview = __ds_scope.ArticlePreview;

__ds_ns.Card = __ds_scope.Card;

__ds_ns.CardHeader = __ds_scope.CardHeader;

__ds_ns.CardTitle = __ds_scope.CardTitle;

__ds_ns.CardDescription = __ds_scope.CardDescription;

__ds_ns.CardContent = __ds_scope.CardContent;

__ds_ns.CardFooter = __ds_scope.CardFooter;

__ds_ns.InterviewCard = __ds_scope.InterviewCard;

__ds_ns.MentorCard = __ds_scope.MentorCard;

__ds_ns.QnaCard = __ds_scope.QnaCard;

__ds_ns.Table = __ds_scope.Table;

})();
