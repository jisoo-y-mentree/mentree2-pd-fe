import React from "react";

export interface ImageCropValue {
  /** 직사각형 영역(멘토카드 사진). rotation을 적용한 원본 픽셀 좌표. */
  rect: { x: number; y: number; w: number; h: number };
  /** 원형 영역(아바타). 같은 좌표계. */
  circle: { cx: number; cy: number; r: number };
  /** 1〜3. */
  zoom: number;
  /** 0 · 90 · 180 · 270. */
  rotation: number;
}

/**
 * ImageCropper — 사진 한 장에서 원형(아바타)과 직사각형(멘토카드 사진) 두 영역을 함께 잡는다(DS-72).
 *  직사각형은 좌우 · 원은 상하로 끈다. 슬라이더 1〜3배. ↻ 90° 회전. 키보드로도 옮긴다.
 */
export interface ImageCropperProps {
  /** 올린 사진. 없으면 빈 상태(「사진 올리기」 + 끌어다 놓기). */
  src?: string;
  /** 파일을 골랐을 때(버튼 · 끌어다 놓기). 화면이 올리고 src를 넘긴다. */
  onPick?: (file: File) => void;
  /** 직사각형 비율. 기본 3/2 — MentorCard 사진과 같다. */
  rectAspect?: number;
  /** zoom · rotation을 주면 그 값을 따른다. 영역 위치는 부품 안에 둔다. */
  value?: Partial<ImageCropValue>;
  /** 영역 · 확대 · 회전이 바뀔 때마다. */
  onChange?: (value: ImageCropValue) => void;
  /** 휴지통(「사진 삭제」). */
  onRemove?: () => void;
  /** 올리기 실패 문구. 사진 자리 아래 --destructive. */
  error?: string;
  style?: React.CSSProperties;
}

export function ImageCropper(props: ImageCropperProps): JSX.Element;
