import * as React from "react";

/**
 * BottomTabBar — Mobile(~768) 전용 하단 고정 탭 네비(높이 56 + safe-area).
 * 4탭: 멘토 찾기(user-search-01) · Q&A 멘토링(quiz-05) · 멘트리 인사이트(news) ·
 * MY 멘트리(user-circle-02). HugeIcons 모노 — 헤더 오버레이(컬러 SVG)와 별개.
 * 활성=primary green / 비활성=muted-foreground. 라벨 --text-micro(12) — 56 높이에 아이콘과 함께 들어가는 크기.
 * 배경 frosted(white 반투명+blur) + 상단 sage hairline, 풀블리드.
 * Desktop(769+) CSS 숨김. MY 멘트리: guest는 onAuth로 로그인 유도(자리만 — OPEN #9).
 *
 * DS-55: 고정 컨테이너 = [accessory 칸(8/16)][탭 줄 56][safe-area]. hideOnScroll이면 아래 스크롤 시
 * 컨테이너를 56px 내려 탭 줄만 숨기고 accessory를 바닥에 남긴다. 높이(accessory+56)를
 * :root의 --mt-bottom-bar-height로 쓴다(숨김과 무관한 고정값, 언마운트 시 삭제).
 * accessory·hideOnScroll·scrollContainer를 안 주면 DS-55 이전과 같다.
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
  /** 탭 줄 위에 얹는 칸(안쪽 여백 8px 16px). 내용은 화면이 넣는다. 기본 없음. */
  accessory?: React.ReactNode;
  /** 스크롤로 탭 줄을 숨긴다. 기본 false. */
  hideOnScroll?: boolean;
  /** 스크롤을 읽을 대상(엘리먼트 또는 ref). 기본 window — 카드 데모용. */
  scrollContainer?: HTMLElement | React.RefObject<HTMLElement> | Window;
  /** 고정 컨테이너에 병합. */
  style?: React.CSSProperties;
}

export declare function BottomTabBar(props: BottomTabBarProps): React.ReactElement;
