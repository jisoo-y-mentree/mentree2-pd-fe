**ArticlePreview** — **투명 콘텐츠 프리뷰(카드 아님)**. 표면 규칙상 아티클은 썸네일 자체가 시각 경계를 만들므로 카드 셸을 상속하지 않는다.

```jsx
<ArticlePreview
  href="/insights/12"
  image="/a/cover.jpg"
  title="좋은 멘토링 관계를 만드는 다섯 가지 신호"
  excerpt="멘토와 멘티가 오래 함께 성장하는 관계에는 공통점이 있습니다. 첫 만남에서…"
  tags={[{ label: "디자인", hue: "indigo" }, { label: "인사이트", hue: "amber" }]}
/>
```

- **표면**: 배경 투명 · 테두리 없음 · 그림자 없음 · 카드 마진 없음. 썸네일이 시각 경계 역할.
- **동심원 기하는 미디어에만**: 썸네일 16:9 + radius 14(`--card-media-radius`). 이미지 없거나 실패 시 sage placeholder. **우상단 오버레이 없음**.
- **제목** h3 · 2줄 고정(line-clamp 2, 禁則 유지). **발췌** body muted · 3줄 고정(line-clamp 3).
- **하단 태그**: 질적태그 팔레트만(뉴트럴/회색 금지 — 아티클 태그는 항상 컬러), size sm. 기본 indigo + amber(amber 라벨은 규칙대로 800, Badge 내부 처리).
- **내부 여백**: 카드가 아니므로 content-padding 없음 — 좌우 패딩 없이 썸네일 폭에 맞춰 정렬, 요소 간 수직 리듬(gap)만.
- **hover**: 투명이라 약한 클릭 신호를 보완하되 **배경 틴트가 아니라 썸네일에만 elevation 한 단계(`shadow-sm`) 상승** — 경계를 가진 미디어 요소가 조용히 떠오르는 정도. 컨테이너(제목·발췌·태그)에는 hover 배경 없음. **위치 이동/확대(scale) 금지 — shadow만**. 카드 전체 클릭 → 아티클 상세.

> **표면 규칙**(Foundations 참조): 인물·엔티티가 주인공이거나 액션이 붙으면 카드(MentorCard), 텍스트 중심이면 카드(QnaCard), 자체 미디어가 경계를 만드는 콘텐츠 프리뷰는 투명 컨테이너(ArticlePreview).
