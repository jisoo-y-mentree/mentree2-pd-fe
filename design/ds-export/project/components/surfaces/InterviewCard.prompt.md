**InterviewCard** — 인물 인터뷰 카드. 표면 규칙 1단계(인물 객체 → 카드)에 해당하며 카드 셸·elevation·동심원 기하를 상속한다.

```jsx
<InterviewCard
  size="featured"
  href="/interviews/7"
  image="/p/mentor.jpg"
  country="south-korea" countryLabel="대한민국" field="디자인"
  title="10년 차 디자이너가 말하는 성장의 변곡점"
  excerpt="주니어에서 리드로 넘어가던 시기에 가장 크게 바뀐 건 관점이었습니다…"
  personName="박지훈" company="네이버" jobTitle="Design Lead"
/>
```

- **레이아웃**: 좌우 가로 분할(좌 미디어 1:1 / 우 텍스트). **TOP용 가로형만** — 미디어에 절대 크기를 부여하고 카드 높이는 미디어에서 파생: featured 미디어 320×320 → 카드 336(=320+8+8), compact 미디어 144×144 → 카드 160. 미디어가 카드 높이를 결정하므로 텍스트가 길어도 카드가 늘어나지 않고 텍스트 영역이 미디어 높이 안에서 space-between 된다(상단 배지+제목+발췌 top / 하단 이름그룹 bottom). ⚠ 이 절대 높이는 **TOP featured/compact 변형 한정**(다른 화면·모바일 반응형에는 canon 아님). 미디어-텍스트 수평 간격 `--card-media-gap`(featured 24 / compact 12)을 실제 적용(미디어 우측 마진은 두지 않아 이중 계산 방지). 미디어 마진 8·radius 14, 카드 radius 22, 흰 표면·테두리·그림자 상속. **카드 전체 클릭 → 인터뷰 상세. 북마크 없음**.
- **size 변형**(별개 컴포넌트 아님):
  - `featured`(대형): 큰 1:1 미디어 / 상단 국기+직무 배지(sm 뉴트럴) → 제목 24 bold(h1) 2줄 clamp → 발췌 16 normal muted / 하단 세로 3행 — 이름 16 semibold, 직무 14 medium muted, 회사 14 normal muted.
  - `compact`(소형): 작은 1:1 썸네일 / 상단 배지 → 제목 16 bold(h3) 2줄 clamp, 발췌 없음 / 하단 — 이름 14 semibold + 직무 12 medium muted 같은 행, 그 아래 회사 12 normal muted.
- **위계**: 인물명 강조 > 회사·직함 muted. hex 금지·시맨틱 토큰만, HugeIcons, 禁則 유지, 미디어 로딩 전 sage placeholder.

> **배치 메모**(카드 밖 — 섹션/캐러셀 값): TOP 우측 열에서 compact 2개가 featured와 정렬 — 336 = 160 + 16 + 160. 이 세로 간격 16은 카드가 아니라 배치의 값이므로 이후 섹션 컴포넌트에서 사용.
