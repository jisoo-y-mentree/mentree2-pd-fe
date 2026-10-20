import React from "react";
import { BadgeHue } from "../core/Badge";

export interface ArticleTag {
  label: string;
  /** 질적태그 팔레트 hue(뉴트럴/회색 제외 — 아티클 태그는 항상 컬러). */
  hue: BadgeHue;
}

/**
 * ArticlePreview — 투명 콘텐츠 프리뷰(카드 아님). 표면 규칙상 썸네일이 시각 경계를 만든다.
 *
 * 배경 투명 · 테두리/그림자/카드 마진 없음(카드 셸 상속 안 함). 동심원 기하는 미디어에만(썸네일 16:9 + radius 14).
 * 좌우 패딩 없이 썸네일 폭 정렬, 요소 간 수직 리듬만. hover 시 썸네일에만 elevation 한 단계 상승(배경 틴트 아님).
 * 카드 전체 클릭 → 아티클 상세. 루트는 <article>(스트레치 링크) — <a>가 아니다. href는 제목 링크로 넘어간다.
 * DS-33: variant "default"(세로형) · "row"(인사이트 목록 한 줄 — 글 왼쪽 · 썸네일 296 16:9 오른쪽 + BookmarkToggle · hairline) ·
 *  "compact"(TOP 밴드 작은 줄 — 썸네일 196 3:2 + 제목 h2 1줄 + 태그). 세로형 제목·발췌는 카드 폭 560+에서 h0 · body 500.
 */
export interface ArticlePreviewProps extends Omit<React.HTMLAttributes<HTMLElement>, "title"> {
  title: string;
  /** 발췌(body muted, 3줄 고정). */
  excerpt?: string;
  /** 썸네일(16:9). 없거나 실패 시 sage placeholder. */
  image?: string;
  /** 컬러 태그(질적태그 팔레트, sm). 기본 indigo + amber. */
  tags?: ArticleTag[];
  href?: string;
  /** DS-33. 기본 "default". */
  variant?: "default" | "row" | "compact";
  /** default 썸네일 비율. 기본 "16:9" · TOP 큰 카드 "3:2". row는 16:9 · compact는 3:2 고정. */
  ratio?: "16:9" | "3:2";
  /** default — 제목 위 작은 글자(예: "신규 아티클") body 600 --primary. */
  label?: string;
  /** row — 발췌 아래 날짜(ISO 또는 Date) caption muted · YYYY.MM.DD. */
  date?: string | Date;
  /** row — 썸네일 오른쪽 위 BookmarkToggle(제어형이면 onBookmarkChange와 함께). */
  bookmarked?: boolean;
  onBookmarkChange?: (next: boolean) => void;
}

export function ArticlePreview(props: ArticlePreviewProps): JSX.Element;
