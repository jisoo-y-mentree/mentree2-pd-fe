**BookmarkToggle** — Toggle 기반 아이콘 토글. `aria-pressed`를 반영하고 전 상태를 시각화한다.

```jsx
<BookmarkToggle selected={saved} onChange={setSaved} />
<BookmarkToggle selected disabled />
```

- 미선택 = outline, **선택 = 반전**(배경 `sage-900` 채움 + 아이콘 `sage-50` white). "selected=반전"은 토글 계열 공통 원칙(추후 FilterChip도 같은 원리로 green 반전). 카드 위 장식이 아니라 상태 표시.
- 상태: default · hover(sage) · active(pressed, 0.5px 눌림) · selected(반전) · focus-visible(`--ring`, sage-400) · disabled.
- 서버 저장 로직은 범위 밖 — 컴포넌트는 상태 표현만.
- HugeIcons 정적 CDN에 solid 북마크가 없어, 북마크는 HugeIcons 스타일(stroke 1.6, 라운드)의 인라인 형태로 outline↔fill을 토글한다.
