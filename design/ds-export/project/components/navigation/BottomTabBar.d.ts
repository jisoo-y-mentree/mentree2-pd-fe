import * as React from "react";

/**
 * BottomTabBar — Mobile(~768) 전용 하단 고정 탭 네비(높이 56 + safe-area).
 * 4탭: 멘토 찾기(user-search-01) · Q&A 멘토링(quiz-05) · 멘트리 인사이트(news) ·
 * MY 멘트리(user-circle-02). HugeIcons 모노 — 헤더 오버레이(컬러 SVG)와 별개.
 * 활성=primary green / 비활성=muted-foreground. 배경 frosted(white 반투명+blur) + 상단 sage hairline, 풀블리드.
 * Desktop(769+) CSS 숨김. MY 멘트리: guest는 onAuth로 로그인 유도(자리만 — OPEN #9).
 */
export interface BottomTabBarProps {
  /** 현재 위치 탭 key: "mentors" | "qna" | "insights" | "my" */
  activeKey?: string;
  /** "guest"(기본) | "mentor" | "mentee" — guest의 MY 탭은 로그인 유도. */
  authState?: "guest" | "mentor" | "mentee";
  /** 탭 이동 콜백 (tab) => void. */
  onNavigate?: (tab: { key: string; label: string; href: string }) => void;
  /** guest가 MY 멘트리 탭 시 로그인 유도 콜백. */
  onAuth?: (e: React.MouseEvent, tab: { key: string; label: string; href: string }) => void;
  style?: React.CSSProperties;
}

export declare function BottomTabBar(props: BottomTabBarProps): React.ReactElement;
