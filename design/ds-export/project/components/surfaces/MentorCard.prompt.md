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
- **위계**: 이름 `--text-h3`(18/lh 26/600 — 카드 제목은 카드 폭이 정한다: ~280 body 16 · 280–360 h3 18 · 360+ h2 20). **`fluid`로 폭이 179까지 줄 때만** 모바일에서 `--text-body` 16이다(주입 스타일시트). `fluid`가 아닌 296 고정 카드는 캐러셀 안이라 모바일에서도 18 →(4) 직무(`--text-caption` 14/lh 20/500) →(4) 회사(`--text-caption` 14/400 muted) →(8) **소개 박스**(`green-50` 면·`green-100` 테두리 — 와이어의 `tailwind colors/green/50`·`green/100`. 글자는 `sage-700` 그대로, `--text-caption` 14/lh 20 — 말줄임이 걸린 카드 안 글이다).
- **본문 기하**: 본문 상자 `padding: 8px 18px`(위아래 8 · 좌우는 `--card-content-padding` 18) · 요소 간 `gap: 4`, 소개 박스만 `margin-top: 4`로 8을 낸다. 미디어 → 이름 8, 소개 박스 → 카드 바닥 8.
- **소개 박스는 본문 글자가 아니라 미디어와 같은 폭이다** — 카드 좌우 **8** 인셋(본문 글자는 18 그대로). 본문 좌우 패딩 18에서 **음수 마진 10**으로 뺀다(Mobile은 좌우 12이므로 -4).
- **오버플로**: 이름·직무·회사·소개 1줄 `…`.
- **좁은 판은 카드 폭이 가른다 — 화면 폭이 아니다.** 좁은 판의 값(미디어 **5:4** · 국가 배지 **국기만** · 소개 **2줄** · 본문 상자 `padding: 6px 12px 8px` · 소개 박스 음수 마진 −4 · 이름 `--text-body` 16)은 **전부 `fluid`일 때만** 걸린다(주입 스타일시트가 `.mt-mcard-fluid` 하위로 한정한다). 이 규칙들이 있는 이유는 **카드가 179로 좁아지기 때문**이지 화면이 좁아서가 아니다 — `fluid`가 아닌 296 고정 카드(캐러셀 안)는 **390에서도 Desktop과 완전히 같다**(미디어 3:2 · 국가 라벨 표시 · 소개 1줄 · 패딩 8/18 · 이름 18 · 높이 335±3). `DS-48`의 「카드 제목은 카드 폭이 정한다」와 같은 원칙이다.
- **`fluid` prop이 축이다** — 기본 `false`는 296 고정(캐러셀처럼 부모가 폭을 안 정할 때), `fluid=true`는 `width:100%`/`min-width:179px`(2열 그리드처럼 부모가 폭을 정할 때). 축은 "모바일이냐"가 아니라 "부모가 폭을 정하느냐"다.
- hex 금지·시맨틱 토큰만, 아이콘 HugeIcons, 禁則 유지.

- **높이**: 카드는 자기 높이를 스스로 정하지 않는다 — 늘릴지 말지는 담는 쪽이 정한다. 격자·트랙은 `align-items: start`를 준다(카드 높이를 서로 맞추지 않는다). 카드 부품 자신에게 `alignSelf`를 박지 않는다 — 세로 flex 부모에서는 가로 정렬이 되어 카드가 폭을 잃는다.

## hover — 카드 공통 한 규칙

```
그림자 한 단 상승 (현행)
＋ 제목 → var(--primary)
＋ 미디어 img → scale(1.03)       미디어가 있는 카드만
전이 250ms ease-out
```

**각 카드는 자기가 가진 것만 반응한다** — 없는 것을 만들지 않는다(`QnaCard`에 미디어를 만들지 마라).

- **제목 색은 부품이 갖는다.** 화면의 전역 `a:hover`(0,1,1)에 지지 않게 선택자를 `article:hover a.mt-card-link`(0,1,2)로 올렸다 — 어느 화면에서 쓰든 같다.
- **테두리와 면은 hover에서 안 바뀐다** — 평상시도 hover도 테두리 `--sage-200`, 면 `--card` 흰색이다.
- **확대는 `img`에만.** 미디어 상자에 걸면 배지·스크랩 토글이 같이 커진다. 상자는 이미 `overflow: hidden`이라 확대분은 잘린다. 1.03을 넘기지 않는다 — 「움직였다」가 아니라 「살아났다」로 읽혀야 한다.
- **가드 둘**: `@media (hover: hover)`로 감싼다(터치에서는 hover가 눌린 채 붙어 탭한 카드가 계속 커져 있다) · `prefers-reduced-motion: reduce`에서는 **확대만** 끈다(색·그림자는 움직임이 아니다).
