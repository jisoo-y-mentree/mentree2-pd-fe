**MentorCard** — 세로형 멘토 카드. **Desktop 296px 고정** · **Mobile(~768) 폭은 부모가 정한다**(`width:100%`, `min-width:179px`, `max-width` 없음 — 2열 그리드가 넓히면 카드도 넓어진다). 프리미티브(`Badge`·`BookmarkToggle`) 조립.

```jsx
<MentorCard
  href="/mentors/123"
  photo="/u/mentor.jpg"
  country="south-korea" countryLabel="대한민국" countryExtra={2}
  field="마케팅/광고"
  publishedAt="2026-08-10"
  name="박지훈"
  role="시니어 프로덕트 디자이너"
  company="네이버"
  intro="10년차 프로덕트 디자이너, 커리어 전환 상담 환영해요."
  onBookmarkChange={(saved) => save(123, saved)}
/>
```

- **카드 공통 셸**: white(`--card`) · 1px `sage-200` · `--card-shadow` · `--card-radius`(동심원 중첩). 미디어는 `--card-media-margin`(8px) 인셋 + `--card-media-radius`(14px). hover 시 **그림자만 상승(`shadow-md`), 이동 없음**(~150ms). **카드 전체가 멘토 상세 링크**.
- **미디어(Desktop 3:2 · Mobile 5:4, `object-fit: cover` 크롭)** 오버레이 3종 — 비율이 바뀌어도 각 모서리 기준 위치 유지 — 각각 **독립 클릭 영역**(전파 차단):
  - 좌상단 **"신규 멘토"** — green(status/active recipe) 배지. `publishedAt` 기준 **공개 후 1달만** 노출.
  - 우상단 **스크랩** — `CountToggle icon="bookmark" tone="dark"`(count 없음, 아이콘만). 8px 인셋.
    CountToggle은 배경이 없으므로 사진 위에서 묻히지 않도록 **반투명 흰 받침 + 그림자**를 깐다 — 배경을 채우는 반전으로 되돌리지 않는다.
    카드의 prop 이름은 `bookmarked`·`onBookmarkChange` 그대로(카드가 쓰는 말과 부품 이름은 별개).
  - 하단 안쪽 **배지 행** — 국가 배지(flag + 라벨 + **"+N ⌄" 정적 표시** — 클릭 펼침은 Badge 확장 OPEN) + 직무 배지. 뉴트럴 recipe · size sm.
- **위계**: 이름 h2(20/600) → 직무(14/500) → 회사(14/400 muted) → **소개 박스**(`sage-50` 배경, 14px).
- **오버플로**: 이름·직무·회사·소개 1줄 `…`.
- **Mobile(~768)**: 국가 배지 = **국기만**(라벨 숨김) · 소개 박스 **2줄** 허용 — 폭과 무관, 항상 적용. **폭은 `fluid` prop으로 가른다** — 기본 `false`는 296 고정(캐러셀처럼 부모가 폭을 안 정할 때), `fluid=true`는 `width:100%`/`min-width:179px`(2열 그리드처럼 부모가 폭을 정할 때). 축은 "모바일이냐"가 아니라 "부모가 폭을 정하느냐"다.
- hex 금지·시맨틱 토큰만, 아이콘 HugeIcons, 禁則 유지.
