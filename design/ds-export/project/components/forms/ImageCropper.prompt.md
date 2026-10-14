**ImageCropper** (DS-72) — 멘토 프로필 사진 한 장에서 **원형(아바타)** 과 **직사각형(멘토카드 사진 3:2)** 두 영역을 함께 잡는다.

```jsx
<ImageCropper src={url} onPick={(file) => upload(file).then(setUrl)} onChange={setCrop}
  onRemove={() => setUrl(null)} error={failed ? "사진을 올리지 못했습니다. 다시 시도해주세요." : undefined} />
```

- **빈 상태**(`src` 없음): 2:1 점선 자리 + 「사진 올리기」(outline sm) + 끌어다 놓기 안내. 끌어 올리면 테두리 `--primary`.
- **무대**: 2:1. 사진은 무대를 덮고(cover) 가운데 기준으로 `zoom` 배. 영역 밖은 어둡게(`--sage-950` 55%), 직사각형 안 · 원 밖은 옅게(22%).
- **직사각형**: 높이 = 무대의 84%, 비율 `rectAspect`(기본 3/2). **좌우로만** 끈다.
- **원**: 지름 = 직사각형 짧은 변의 62%. 직사각형 가운데 세로줄에서 **상하로만** 끈다 — 늘 직사각형 안.
- **슬라이더**: 1〜3배. 두 영역은 크기를 유지하고 사진만 커진다. 이 부품 안에만 있다(`Slider` 부품 없음).
- **↻** 「회전」 = 90° · **🗑** 「사진 삭제」 = `onRemove`.
- **키보드**: 영역은 `role="slider"` — 직사각형 ← →, 원 ↑ ↓(Shift = 큰 걸음, Home/End = 끝). 확대 슬라이더 ← → Home End.
- **값**(`onChange`): rotation을 적용한 원본 픽셀 좌표 `{ rect:{x,y,w,h}, circle:{cx,cy,r}, zoom, rotation }`. 영역 위치는 부품 안에 둔다. `value.zoom` · `value.rotation`을 주면 그 값을 따른다.
- `error`: 사진 자리 아래 `--destructive`, `role="alert"`.
