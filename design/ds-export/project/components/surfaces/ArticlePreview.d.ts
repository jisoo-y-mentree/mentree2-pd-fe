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
 * 카드 전체 클릭 → 아티클 상세.
 */
export interface ArticlePreviewProps extends Omit<React.AnchorHTMLAttributes<HTMLAnchorElement>, "title"> {
  title: string;
  /** 발췌(body muted, 3줄 고정). */
  excerpt?: string;
  /** 썸네일(16:9). 없거나 실패 시 sage placeholder. */
  image?: string;
  /** 컬러 태그(질적태그 팔레트, sm). 기본 indigo + amber. */
  tags?: ArticleTag[];
  href?: string;
}

export function ArticlePreview(props: ArticlePreviewProps): JSX.Element;
