import React from "react";

export interface CarouselHandle {
  /** 이전 한 페이지 이동(화살표 왼쪽). */
  scrollPrev(): void;
  /** 다음 한 페이지 이동(화살표 오른쪽). */
  scrollNext(): void;
  /** 현재 끝 도달 상태. */
  getEdges(): { atStart: boolean; atEnd: boolean };
}

/**
 * Carousel — 배치 컴포넌트. 카드를 가로로 나열하는 범용 스크롤/스냅 컨테이너.
 *
 * 담기는 카드 종류 고정 안 함. 조작부(화살표) 없음 — SectionHeader의 화살표 그룹이 담당하고
 * Carousel은 스크롤/스냅 로직만. 데스크톱 기본 거동만(리스폰시브 peek/페이드/모바일은 범위 밖).
 * 표시 개수는 컨테이너 폭에 맞춰 유동. 1280 충족 시 끝에서 딱 멈춤(페이드·클리핑 없음).
 *
 * ref(CarouselHandle)로 화살표 연동: scrollPrev/scrollNext는 한 페이지(현재 표시 개수)만큼 이동.
 * 자유 스크롤의 카드 1장 스냅과는 별개. 좌우 배경(white) 페이드는 mode="peek" 전용(snap-fit/unit은 페이드 없음, 1280 기준).
 * 끝 도달은 onEdgeChange로 통지 → SectionHeader 화살표 disabled.
 */
export interface CarouselProps extends React.HTMLAttributes<HTMLDivElement> {
  children?: React.ReactNode;
  /** 카드 간 gap(px). Carousel이 고정하지 않고 사용처에서 카드 종류에 맞춰 주입. 기본 16. */
  gap?: number;
  /** 스냅 단위. "card"=카드 1장(기본) · "unit"=1단위(표시 개수=1단위인 경우). */
  snap?: "card" | "unit";
  /** 레이아웃 모드. "snap-fit"=카드가 컨테이너 폭에 딱 떨어짐(잘림 없음, 기본) · "peek"=마지막 카드가 의도적으로 걸침(N+1, "더 있음"). */
  mode?: "peek" | "snap-fit";
  /** 스크롤 위치 변화 시 끝 도달 상태 통지. */
  onEdgeChange?: (edges: { atStart: boolean; atEnd: boolean }) => void;
}

export const Carousel: React.ForwardRefExoticComponent<
  CarouselProps & React.RefAttributes<CarouselHandle>
>;
