**CoverCard** (DS-67) — 이미지 반쪽 ＋ 표지색 패널 반쪽의 가로형 표지. TOP 인터뷰 표지와 인사이트 피처드가 같은 부품이다. `InterviewCard`(세로형)와 별개다.

```jsx
<CoverCard href="/interviews/12" image="/i/12.jpg" tone="green" badge="개발"
  title="도쿄에서 백엔드 개발자로 5년" excerpt="신졸 입사부터 이직까지…"
  person={{ name: "서명진", country: "japan", countryLabel: "일본", role: "백엔드 개발자", company: "LINE" }} />

<CoverCard href="/insight/3" image="/a/3.jpg" tone="sky" badge="취업 전략" label="신규 아티클"
  title="오퍼 레터에서 꼭 확인할 다섯 줄" excerpt="…" />
```

- **판은 부품 폭으로 가른다**(container query, 768). 넓은 판 = 왼쪽 이미지 · 오른쪽 패널, **정확히 반반**(좌우 56 · 세로 가운데). 이미지 칸은 반쪽을 넘지 않고, 16:10은 최소 높이일 뿐이다 — 패널이 높으면 칸이 따라 늘고 이미지는 cover로 잘린다. 좁은 판 = 이미지 16:9 위 · 패널 아래(20/24).
- 패널 글은 **가로 가운데 정렬**(넓은 판 · 좁은 판 모두 · 사람 줄 포함).
- 패널 순서: 배지 → 16 → 제목(넓은 판 display / 좁은 판 h2, `--sage-50`, 2줄) → 12 → 발췌(h3 / caption, `--sage-200`, 3줄) → 16 → 사람(이름 h2 / h3 ＋ `Flag shape="rect"` lg / sm, 아래 직무 500 · 회사 300 caption `--sage-200`).
- `tone`: `green` · `sky` · `rose` · `gray` → `--cover-*`. **돌리는 순서(1→4)는 화면이 정한다.**
- `label`: 이미지 왼쪽 위 꼬리표(`--green-700` · 흰 body-sm 600 · 높이 31 · 왼쪽 위 반경 = 셸 · 오른쪽 아래 16).
- 링크는 제목에 걸고 카드 전체로 늘인다. hover는 이미지 `scale(1.03)`만 — 패널 위 제목 색은 바꾸지 않는다.
- 셸: `--card-radius` · overflow hidden · 테두리 · 그림자 없음.

- **DS-104** — 제목에 `text-wrap: balance`(넓은 판 · 좁은 판). 끝 단어 하나만 아래로 떨어지지 않는다. 2줄 말줄임 · 크기 · 색은 그대로.
