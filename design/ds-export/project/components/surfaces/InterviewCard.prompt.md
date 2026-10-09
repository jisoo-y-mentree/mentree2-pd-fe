**InterviewCard** — 인물 인터뷰 카드. 표면 규칙 1단계(인물 객체 → 카드)에 해당하며 카드 셸·elevation·동심원 기하를 상속한다. **세로형 1종** — `featured`/`compact` 없음, 캐러셀에서 3장이 같은 크기로 선다.

```jsx
<InterviewCard
  href="/interviews/7"
  image="/p/mentor.jpg"
  country="south-korea" countryLabel="대한민국" field="디자인"
  title="10년 차 디자이너가 말하는 성장의 변곡점"
  excerpt="주니어에서 리드로 넘어가던 시기에 가장 크게 바뀐 건 관점이었습니다. 문제를 보는 층위가 달라지자 팀과의 대화도 달라졌어요."
  personName="박지훈" company="네이버" jobTitle="Design Lead"
/>
```

- **레이아웃**: 세로 — 미디어 위 / 정보 아래. 카드 397×486(1280+ 기준, 참고값 — 실제 폭은 부모가 정한다). 카드 셸은 `MentorCard`와 같다(white `--card` · 1px `--sage-200` · `--card-shadow` · `--card-radius`, hover 시 `shadow-md`만).
- **미디어**: 8:5, `--card-media-margin` 인셋 + `--card-media-radius` — `MentorCard`와 같은 값. **배지 2개(국가 + 직무)를 미디어 좌상단에 겹친다**(size `md`, 24) — `MentorCard`는 하단인데 여기는 상단.
- **제목**: 2줄 고정 + 말줄임. `--text-h2`(20, 400px 카드 폭 = 360+ 구간 — 카드 제목은 카드 폭이 정한다. 모바일에서도 안 바뀐다) · `600`. 자간은 인라인으로 지정하지 않는다 — 토큰의 자간이 그대로 먹는다.
- **발췌**: 3줄 고정 + 말줄임. `--text-caption` 14 · `--muted-foreground` — 카드 안 글이다.
- **인물 줄**: `--text-caption` 14. 이름(`600` `--foreground`) + 직함(`--muted-foreground`) 같은 줄. 회사는 다음 줄 `--muted-foreground`.
- **폭을 카드가 고정하지 않는다** — 부모(캐러셀)가 정한다(3열·2열·1열). `MentorCard`의 296 고정과 다르다. **높이도 내용이 정한다**(절대 높이 없음).
- **북마크 없음**(지금도 없다). **카드 전체 클릭 → 인터뷰 상세** — 루트 `<article>` + 스트레치 링크, `href`는 제목 링크로.
- 위계: 인물명 강조 > 회사·직함 muted. hex 금지·시맨틱 토큰만, HugeIcons, 禁則 유지, 미디어 로딩 전 sage placeholder.

### 만들지 않는 것
- `size` 변형(`featured`/`compact`) — 3장이 같은 크기다.
- 절대 높이 — 내용이 정한다.

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
