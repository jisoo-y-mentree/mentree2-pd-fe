**SectionHeader** — 배치 컴포넌트. 가로 한 줄, 좌우 양끝 정렬(좌 제목 / 우 액션). 중앙정렬형은 미포함(개별 대응).

```jsx
{/* 전체보기 + 부가 스트링 + green 강조 */}
<SectionHeader
  icon="user-group"
  title="지금 주목받는 " titleAccent="Q&A 멘토링"
  suffix="3,200명의 멘토"
  viewAll onViewAll={() => go("/qna")}
/>

{/* 캐러셀 — 좌우 화살표(끝 도달 시 disabled) */}
<SectionHeader
  title="이달의 인터뷰"
  carousel onPrev={prev} onNext={next}
  prevDisabled={atStart} nextDisabled={atEnd}
/>
```

- **좌(제목 영역)**: 장식 아이콘 칩(옵션, HugeIcons·radius 12·sage-50 배경·sage-200 아웃라인, IconButton 아님) + 제목(30 semibold, `titleAccent`로 green 강조 조각) + 부가 스트링(옵션, muted) + Badge(옵션). 부가 스트링·배지는 제목과 높이 가운데 정렬. 아이콘/부가스트링/배지는 각각 독립 슬롯.
- **우(액션 영역)**: `viewAll`=전체보기 고스트 버튼(→ 화살표) / `action`=임의 아웃라인 버튼(옵션) / `carousel`=좌우 화살표 세그먼트 그룹(캐러셀 섹션 한정) — 이전(`arrow-left-02`)·다음(`arrow-right-02`) IconButton 2개를 하나로 결합: 바깥 모서리만 radius-md(12), 맞붙는 안쪽은 각짐, 가운데 hairline divider 하나로 캡슐형. 각 버튼 hover·active·disabled는 기존 IconButton 상태 그대로, 끝 도달 시 해당 방향만 disabled. 조합 변형: 전체보기만 / 화살표만 / 둘 다 / 없음.
- 배지·버튼·IconButton·아이콘은 기존 컴포넌트 재사용. hex 금지·시맨틱 토큰만, HugeIcons, 禁則 유지.

> **DS-GAP**: 섹션 제목 30은 현재 타입스케일(h1=24) 밖. 히어로·페이지 타이틀 등 큰 텍스트와 함께 스케일 상단(h0/display) 정리 필요 — 별도 작업. 지금은 30/bold 임시 지정.
