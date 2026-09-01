# FilterChip

선택 가능한 **필터 칩**. Toggle 계열 — BookmarkToggle과 같은 Toggle 조상을 공유하는 형제다
(아이콘형=BookmarkToggle / 텍스트칩형=FilterChip). 정적 표시 전용인 **Badge와 구분**된다:
FilterChip은 클릭·선택이 가능한 인터랙션 요소.

## 언제 쓰나
- 국가·직무 등 목록을 좁히는 **필터 칩 줄**. 다중 선택 토글.
- 단일 정적 라벨/분류에는 Badge를, 저장 액션 아이콘 토글에는 BookmarkToggle을 쓴다.

## 크기·형태
- **버튼 sm 체계**: 높이 32px, padding 0 12px, radius `--radius-md`(12px), caption/500.
- pill(완전 둥근) **금지** — 우리는 pill 미사용.

## 상태 (Toggle 공통 "selected=반전" 원칙)
- **default**: `--card` 배경 + `--border`(sage) 아웃라인 + `--sage-700` 텍스트.
- **hover**: 옅은 sage 틴트(`--secondary`).
- **selected**: `--primary`(green) 배경 + `--primary-foreground`(흰) 텍스트 — 확실한 반전.
  BookmarkToggle이 sage-900 반전인 것과 달리 FilterChip은 **green 반전**(필터 활성 = 브랜드 액션).
- **focus-visible**: `--ring`. **disabled**: 흐리게.

## leading
- `none` — 텍스트만(직무 칩 등).
- `flag` — 국가 칩. Badge flag leading의 **원형 국기 SVG를 재사용**. 국가 칩에만.
  selected 시 국기는 고유색 유지(green 배경 위에 국기 그대로 — 튀면 나중 조정).

## 제어형
BookmarkToggle과 동일하게 `selected` + `onChange(next)` 제어형. 서버/필터 로직은 범위 밖.

```jsx
<FilterChip leading="flag" flag="japan" selected={sel==="japan"} onChange={() => setSel("japan")}>일본</FilterChip>
<FilterChip selected={job==="디자인"} onChange={() => setJob("디자인")}>디자인</FilterChip>
```
