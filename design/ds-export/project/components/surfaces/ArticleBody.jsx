import React from "react";
import { Badge } from "../core/Badge.jsx";
import { Icon } from "../core/Icon.jsx";

/**
 * ArticleBody — 아티클 본문(DS-56). 아티클 상세와 멘토 상세 인터뷰 탭이 같은 글을 같은 폭으로 그린다.
 *  폭: max-width 720 · width 100%. 스스로 가운데 정렬하지 않는다 — 놓는 쪽이 정한다.
 *  머리(선택): badges(국가→키워드) · title(h1, --text-display 600) · date(YYYY.MM.DD caption muted tabular).
 *   가운데 정렬 · 세로 간격 16.
 *  blocks: h2(--text-h2 600, 위40·아래16, 첫 블록 위0, id 앵커, scroll-margin-top) ·
 *   p(--text-article, 아래24, 문자열 또는 조각 배열 — mark·link) ·
 *   figure(16:9 cover --radius-md, 실패 시 sage placeholder = ArticlePreview와 같음, 캡션 위8 caption muted).
 *  글자 크기는 모든 폭에서 같다(article 토큰 고정). title만 display 토큰의 반응형을 따른다.
 */

if (typeof document !== "undefined" && !document.getElementById("mt-articlebody-style")) {
  const s = document.createElement("style");
  s.id = "mt-articlebody-style";
  s.textContent =
    ".mt-ab-link{color:var(--primary);text-decoration:underline;text-underline-offset:3px;transition:color 150ms ease;}" +
    ".mt-ab-link:hover{color:color-mix(in oklch, var(--primary) 72%, var(--sage-950));}" +
    ".mt-ab-link:focus-visible{outline:2px solid var(--ring);outline-offset:2px;border-radius:2px;}";
  document.head.appendChild(s);
}

const isExternal = (href) => {
  if (!/^https?:\/\//i.test(href || "")) return false;
  try { return new URL(href).origin !== window.location.origin; } catch (e) { return true; }
};

function formatDate(d) {
  if (!d) return "";
  if (typeof d === "string" && /^\d{4}\.\d{2}\.\d{2}$/.test(d)) return d;
  const x = d instanceof Date ? d : new Date(d);
  if (isNaN(x)) return String(d);
  const p = (n) => String(n).padStart(2, "0");
  return `${x.getFullYear()}.${p(x.getMonth() + 1)}.${p(x.getDate())}`;
}

function Inline({ content }) {
  if (content == null) return null;
  const parts = Array.isArray(content) ? content : [content];
  return parts.map((c, i) => {
    if (typeof c === "string" || typeof c === "number") return <React.Fragment key={i}>{c}</React.Fragment>;
    if (c && c.mark != null) {
      return (
        <mark key={i} style={{ background: "var(--highlight)", color: "inherit", padding: "0 2px", boxDecorationBreak: "clone", WebkitBoxDecorationBreak: "clone" }}>{c.mark}</mark>
      );
    }
    if (c && c.link != null) {
      const ext = isExternal(c.href);
      return (
        <a key={i} href={c.href} className="mt-ab-link" target={ext ? "_blank" : undefined} rel={ext ? "noopener" : undefined}>{c.link}</a>
      );
    }
    return null;
  });
}

function Figure({ src, alt, caption, last }) {
  const [err, setErr] = React.useState(false);
  const show = src && !err;
  return (
    <figure style={{ margin: last ? 0 : "0 0 24px" }}>
      <div style={{ position: "relative", width: "100%", aspectRatio: "16 / 9", background: "var(--sage-100)", borderRadius: "var(--radius-md)", overflow: "hidden" }}>
        {show ? (
          <img src={src} alt={alt || ""} onError={() => setErr(true)} style={{ width: "100%", height: "100%", objectFit: "cover", display: "block" }} />
        ) : (
          <span role={alt ? "img" : undefined} aria-label={alt || undefined} style={{ position: "absolute", inset: 0, display: "flex", alignItems: "center", justifyContent: "center", color: "var(--sage-400)" }}>
            <Icon name="image-01" size={30} />
          </span>
        )}
      </div>
      {caption && (
        <figcaption style={{ marginTop: 8, fontSize: "var(--text-caption)", lineHeight: "var(--text-caption--line-height)", letterSpacing: "var(--text-caption--letter-spacing)", color: "var(--muted-foreground)" }}>{caption}</figcaption>
      )}
    </figure>
  );
}

export function ArticleBody({ badges, title, date, blocks = [], flagBase, style, ...rest }) {
  const badgeList = Array.isArray(badges) ? [
    ...badges.filter((b) => b.type === "country"),
    ...badges.filter((b) => b.type !== "country"),
  ] : [];
  const hasHead = badgeList.length > 0 || title || date;

  return (
    <div
      style={{
        maxWidth: 720,
        width: "100%",
        boxSizing: "border-box",
        color: "var(--foreground)",
        fontFamily: "var(--font-sans)",
        ...style,
      }}
      {...rest}
    >
      {hasHead && (
        <header style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 16, textAlign: "center", marginBottom: blocks.length ? 40 : 0 }}>
          {badgeList.length > 0 && (
            <div style={{ display: "flex", flexWrap: "wrap", justifyContent: "center", gap: 6 }}>
              {badgeList.map((b, i) =>
                b.type === "country"
                  ? <Badge key={i} size="md" leading="flag" flag={b.flag} {...(flagBase ? { flagBase } : {})}>{b.label}</Badge>
                  : <Badge key={i} size="md">{b.label}</Badge>
              )}
            </div>
          )}
          {title && (
            <h1 style={{ margin: 0, fontSize: "var(--text-display)", fontWeight: 600, lineHeight: "var(--text-display--line-height)", letterSpacing: "var(--text-display--letter-spacing)", textWrap: "balance" }}>{title}</h1>
          )}
          {date && (
            <time style={{ fontSize: "var(--text-caption)", lineHeight: "var(--text-caption--line-height)", letterSpacing: "var(--text-caption--letter-spacing)", color: "var(--muted-foreground)", fontVariantNumeric: "tabular-nums" }}>{formatDate(date)}</time>
          )}
        </header>
      )}
      {blocks.map((b, i) => {
        const first = i === 0;
        const last = i === blocks.length - 1;
        if (b.type === "h2") {
          return (
            <h2 key={i} id={b.id} style={{ margin: `${first ? 0 : 40}px 0 ${last ? 0 : 16}px`, fontSize: "var(--text-h2)", fontWeight: 600, lineHeight: "var(--text-h2--line-height)", letterSpacing: "var(--text-h2--letter-spacing)", scrollMarginTop: "var(--article-anchor-offset, 104px)" }}>{b.text}</h2>
          );
        }
        if (b.type === "figure") return <Figure key={i} {...b} last={last} />;
        return (
          <p key={i} style={{ margin: last ? 0 : "0 0 24px", fontSize: "var(--text-article)", fontWeight: 400, lineHeight: "var(--text-article--line-height)", letterSpacing: "var(--text-article--letter-spacing)", textWrap: "pretty" }}>
            <Inline content={b.content} />
          </p>
        );
      })}
    </div>
  );
}
