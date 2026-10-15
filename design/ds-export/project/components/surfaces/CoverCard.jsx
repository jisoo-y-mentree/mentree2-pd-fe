import React from "react";
import { Badge } from "../core/Badge.jsx";
import { Flag } from "../core/Flag.jsx";
import { Icon } from "../core/Icon.jsx";

/**
 * CoverCard (DS-67) — 이미지 반쪽 + 표지색 패널 반쪽의 가로형 표지. TOP 인터뷰 표지 · 인사이트 피처드가 같은 부품이다
 *  (Figma TOP 1610:26692 · 좁은 폭 1599:28246 · 4색 1610:29494 · 인사이트 피처드 1697:64466). InterviewCard(세로형)와 별개.
 * [판] 부품 자신의 폭(container query)으로 가른다 — 768 이상 넓은 판(왼쪽 이미지 · 오른쪽 패널, 정확히 반반), 미만 좁은 판(이미지 16:9 위 · 패널 아래).
 *  이미지 칸은 반쪽 폭을 넘지 않는다. 16:10은 패널이 그보다 낮을 때의 최소 높이일 뿐 — 칸 높이는 패널을 따르고 이미지는 cover로 잘린다.
 * [셸] --card-radius · overflow hidden · 테두리 · 그림자 없음.
 * [패널] 면 = tone 의 --cover-*(green · sky · rose · gray). 돌리는 순서는 화면이 정한다 — 부품은 받은 tone 하나만.
 *  넓은 판 · 좁은 판 모두 가로 가운데 정렬(묶음 · text-align center, R5). 넓은 판: 안쪽 좌우 56 · 세로 가운데 · 배지 → 16 → 제목 display 600 --sage-50 2줄 → 12 → 발췌 h3 400 --sage-200 3줄 → 16 → 사람.
 *  좁은 판: 안쪽 20/24 · 제목 h2 · 발췌 caption · 이름 h3 + Flag rect sm.
 *  사람(person 선택): 이름 h2 600 --sage-50 + Flag rect lg / 4 / 직무(500) · 회사(300) caption --sage-200. 없으면 줄이 없다.
 * [꼬리표 label] 이미지 왼쪽 위 — --green-700 · 흰 글자 body-sm 600 · 좌우 12 · 높이 31 · 왼쪽 위 반경 = 셸 · 오른쪽 아래 16.
 * [링크] 제목 <a className="mt-card-link"> 스트레치. hover = 이미지 scale(1.03)만 — 패널 위 제목 색은 바꾸지 않는다.
 */
const TONES = { green: "var(--cover-green)", sky: "var(--cover-sky)", rose: "var(--cover-rose)", gray: "var(--cover-gray)" };

if (typeof document !== "undefined" && !document.getElementById("mt-cover-style")) {
  const s = document.createElement("style");
  s.id = "mt-cover-style";
  s.textContent =
    ".mt-cover{container-type:inline-size;}" +
    ".mt-cover-g{display:grid;grid-template-columns:minmax(0,1fr);}" +
    ".mt-cover-media{min-width:0;}.mt-cover-sizer{display:block;padding-top:56.25%;}" +
    ".mt-cover-panel{padding:24px 20px;}" +
    ".mt-cover-title{font-size:var(--text-h2);line-height:var(--text-h2--line-height);letter-spacing:var(--text-h2--letter-spacing);}" +
    ".mt-cover-ex{font-size:var(--text-caption);line-height:var(--text-caption--line-height);letter-spacing:var(--text-caption--letter-spacing);}" +
    ".mt-cover-name{font-size:var(--text-h3);line-height:var(--text-h3--line-height);letter-spacing:var(--text-h3--letter-spacing);}" +
    ".mt-cover-flag-w{display:none !important;}" +
    "@container (min-width:768px){" +
    ".mt-cover-g{grid-template-columns:minmax(0,1fr) minmax(0,1fr);}" +
    ".mt-cover-sizer{padding-top:62.5%;}" +
    ".mt-cover-panel{padding:40px 56px;}" +
    ".mt-cover-title{font-size:var(--text-display);line-height:var(--text-display--line-height);letter-spacing:var(--text-display--letter-spacing);}" +
    ".mt-cover-ex{font-size:var(--text-h3);line-height:var(--text-h3--line-height);letter-spacing:var(--text-h3--letter-spacing);}" +
    ".mt-cover-name{font-size:var(--text-h2);line-height:var(--text-h2--line-height);letter-spacing:var(--text-h2--letter-spacing);}" +
    ".mt-cover-flag-w{display:inline-flex !important;}.mt-cover-flag-n{display:none !important;}}" +
    ".mt-cover a.mt-card-link,.mt-cover:hover a.mt-card-link{color:var(--sage-50) !important;}" +
    ".mt-card-link{text-decoration:none;}.mt-card-link::after{content:'';position:absolute;inset:0;z-index:1;}.mt-card-link:focus-visible{outline:none;}" +
    "article.mt-cover:has(.mt-card-link:focus-visible){outline:2px solid var(--ring);outline-offset:2px;}" +
    ".mt-cover-img{transition:transform 250ms ease-out;}@media (hover:hover){.mt-cover:hover .mt-cover-img{transform:scale(1.03);}}" +
    "@media (prefers-reduced-motion:reduce){.mt-cover-img{transform:none !important;transition:none;}}";
  document.head.appendChild(s);
}

const clamp = (n) => ({ display: "-webkit-box", WebkitBoxOrient: "vertical", WebkitLineClamp: n, overflow: "hidden", wordBreak: "keep-all", overflowWrap: "break-word" });

export function CoverCard({
  href = "#",
  image,
  tone = "green",
  badge,
  title,
  excerpt,
  person,
  label,
  headingLevel = 3,
  style,
  className,
  ...rest
}) {
  const H = `h${Math.min(4, Math.max(2, headingLevel))}`;
  const [imgError, setImgError] = React.useState(false);
  const showImg = image && !imgError;
  return (
    <article
      className={["mt-cover", className].filter(Boolean).join(" ")}
      style={{ position: "relative", display: "block", width: "100%", boxSizing: "border-box", borderRadius: "var(--card-radius)", overflow: "hidden", fontFamily: "var(--font-sans)", background: TONES[tone] || TONES.green, ...style }}
      {...rest}
    >
      <div className="mt-cover-g">
        <div className="mt-cover-media" style={{ position: "relative", overflow: "hidden", background: "var(--sage-200)" }}>
          {/* R5 — 칸 폭은 그리드 반쪽 그대로. 16:10(좁은 판 16:9)은 이 받침의 padding-top으로 최소 높이만 정한다.
              패널이 더 높으면 행이 늘고 칸이 따라 늘며, 이미지는 absolute로 칸을 채워 cover로 잘린다. */}
          <span className="mt-cover-sizer" aria-hidden="true" />
          {showImg ? (
            <img className="mt-cover-img" src={image} alt="" onError={() => setImgError(true)} style={{ position: "absolute", inset: 0, width: "100%", height: "100%", objectFit: "cover", display: "block" }} />
          ) : (
            <span style={{ position: "absolute", inset: 0, display: "flex", alignItems: "center", justifyContent: "center", color: "var(--sage-400)" }}><Icon name="image-01" size={32} /></span>
          )}
          {label && (
            <span style={{ position: "absolute", top: 0, left: 0, display: "inline-flex", alignItems: "center", height: 31, padding: "0 12px", background: "var(--green-700)", color: "var(--card)", fontSize: "var(--text-body-sm)", fontWeight: 600, lineHeight: 1, whiteSpace: "nowrap", borderRadius: "var(--card-radius) 0 16px 0" }}>{label}</span>
          )}
        </div>
        <div className="mt-cover-panel" style={{ display: "flex", flexDirection: "column", justifyContent: "center", alignItems: "center", textAlign: "center", minWidth: 0, boxSizing: "border-box" }}>
          {badge && <Badge size="sm" style={{ marginBottom: 16 }}>{badge}</Badge>}
          <H className="mt-cover-title" style={{ margin: 0, fontWeight: 600, color: "var(--sage-50)" }}>
            <a href={href} className="mt-card-link" style={{
              display: "block",
              ...clamp(2),
              // DS-104 — 제목 두 줄을 고르게(text-wrap: balance)
              textWrap: "balance",
            }}>{title}</a>
          </H>
          {excerpt && <p className="mt-cover-ex" style={{ margin: "12px 0 0", fontWeight: 400, color: "var(--sage-200)", ...clamp(3) }}>{excerpt}</p>}
          {person && (
            <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 4, marginTop: 16, minWidth: 0, maxWidth: "100%" }}>
              <div style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: 8, minWidth: 0, maxWidth: "100%" }}>
                <span className="mt-cover-name" style={{ fontWeight: 600, color: "var(--sage-50)", overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>{person.name}</span>
                {person.country && <Flag className="mt-cover-flag-w" country={person.country} label={person.countryLabel} shape="rect" size="lg" tooltip={false} />}
                {person.country && <Flag className="mt-cover-flag-n" country={person.country} label={person.countryLabel} shape="rect" size="sm" tooltip={false} />}
              </div>
              {(person.role || person.company) && (
                <span style={{ display: "flex", justifyContent: "center", gap: 6, flexWrap: "wrap", fontSize: "var(--text-caption)", lineHeight: "var(--text-caption--line-height)", letterSpacing: "var(--text-caption--letter-spacing)", color: "var(--sage-200)" }}>
                  {person.role && <span style={{ fontWeight: 500 }}>{person.role}</span>}
                  {person.company && <span style={{ fontWeight: 300 }}>{person.company}</span>}
                </span>
              )}
            </div>
          )}
        </div>
      </div>
    </article>
  );
}
