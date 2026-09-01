**MentorCard** — 세로형 멘토 카드(**고정폭 296px**, 리스폰시브 아님). 프리미티브(`Badge`·`BookmarkToggle`) 조립.

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
  - 우상단 **BookmarkToggle** — IconButton default 형태(md/`radius-md`), 8px 인셋, 흰 칩 + 그림자.
  - 하단 안쪽 **배지 행** — 국가 배지(flag + 라벨 + **"+N ⌄" 정적 표시** — 클릭 펼침은 Badge 확장 OPEN) + 직무 배지. 뉴트럴 recipe · size sm.
- **위계**: 이름 h2(20/600) → 직무(14/500) → 회사(14/400 muted) → **소개 박스**(`sage-50` 배경, 14px).
- **오버플로**: 이름·직무·회사·소개 1줄 `…`.
- **Mobile(~768)**: 국가 배지 = **국기만**(라벨 숨김) · 소개 박스 **2줄** 허용. 폭·구조는 동일(296 고정).
- hex 금지·시맨틱 토큰만, 아이콘 HugeIcons, 禁則 유지.
