**QnaCard** — 미디어 없는 텍스트 카드(Q&A). 카드 기하·elevation·동심원 원칙을 상속한다.

```jsx
<QnaCard
  href="/qna/42"
  country="south-korea" countryLabel="대한민국" keyword="취업 준비"
  title="주니어 디자이너인데 이직 타이밍이 고민입니다"
  excerpt="지금 회사에서 2년 차인데 성장이 정체된 느낌이에요. 포트폴리오는…"
  tags={["이직", "포트폴리오", "커리어"]}
  answerers={[{ name: "박지훈" }, { src: "/u/2.jpg", name: "김도윤" }, { name: "이서연" }]}
  answerCount={5}
  views={1280} liked={false} likes={20} onLikeChange={setLiked} scrapped scraps={20} onScrapChange={setScrapped}
/>
```

## 구조(상→하)

1. **상단 — 분류**: 국가(`Badge size="md" leading="flag"`) + 키워드(`Badge size="md"`).
2. **제목** h3 · 2줄 고정(line-clamp 2, 禁則 유지) — 카드의 유일한 링크.
3. **발췌** `--text-caption` 14 muted · **2줄** 고정 — 목록에서 훑는 카드 안 글이다(말줄임이 걸린 곳).
4. **해시태그 행 — 항상 1줄. 개수가 아니라 폭이 정한다.** `Chip size="sm" prefix="#"`, **태그는 Chip이다 — 눌린다.**
   행은 `nowrap`이고 **한 줄에 들어가는 만큼만 세운다. 넘어가는 것은 전부 "+N" 하나로 접는다** — 개수 상한(옛 `MAX_TAGS = 5`)은 없다.
   재는 방법: 숨은 측정 상자에 태그 전부 + `+99`를 한 줄로 그려 칩마다의 폭과 배지 폭 B를 얻고, 행의 실제 폭 W(`ResizeObserver`로 계속 지켜본다)에서
   왼쪽부터 `gap 6`을 끼워 누적한다. 전부 들어가면 "+N"을 안 그린다. 아니면 "+N" 자리 `6 + B`를 남기고 들어가는 최대 개수 k를 세운다.
   k가 0이 되면(첫 태그 하나도 안 들어간다) **1개는 세우고** 그 칩을 `text-overflow: ellipsis`로 줄인다. 접히는 게 1개뿐이면 그대로 `+1`이다 — 억지로 세우지 않는다.
   **"+N"은 Badge다** — 태그가 아니라 개수이고 눌리지 않는다(클릭 핸들러 없음·펼치지 않음). 자리는 행의 맨 끝이다.
   펼치지 않는 이유: 격자 6장의 높이가 고정돼야 하고, 카드 안에서 펼치면 옆 카드를 덮는다. 전부는 상세에서 본다.
   1줄이므로 `maxHeight` 상한은 없다 — **태그가 3개든 8개든 카드 높이가 같다.**
5. hairline(sage).
6. **답변 요약** — `AvatarGroup max=3`(초과는 "+K") + "멘토 답변 **N**개"(N은 tabular·primary green).
   **사진만 3장으로 줄인다 — N은 실제 답변 수 그대로.** 아바타 순서는 부모가 정해서 넘긴다(카드가 정렬하지 않는다).
   0건이면 아바타 행 대신 "아직 작성된 답변이 없습니다"(primary green) — hairline은 유지.
7. **하단 메타 행** — 좌: 조회수(**표시 전용**, HugeIcons `view`+tabular, 눌리지 않는다).
   우: `CountToggle` 2개 — 도움돼요(`tone="rose"`) · 스크랩(`tone="dark"`). **둘 다 표시이자 액션 버튼**이고 **제어형**이다 —
   카드가 숫자를 스스로 바꾸지 않는다(`liked`/`likes`/`onLikeChange`, `scrapped`/`scraps`/`onScrapChange`).
   상단은 분류, 하단은 반응 — 액션 버튼을 제목 옆에 붙이지 않는다.

## variant — `compact` 하나

레이아웃 variant는 만들지 않는다. `compact`는 우측 위젯의 "나의 Q&A" 목록용 —
**해시태그 행만 통째로 감춘다**(폭이 좁아 한 줄에 거의 안 들어간다). 나머지 구성은 같다.

## 색 예산

정적 상태에서 채도를 쓰는 자리는 **국기 · 아바타 사진 · "멘토 답변 N개"의 N**, 이 3곳뿐이다.
해시태그는 색 있는 배지로 만들지 않는다 — Chip 기본값(`--muted` 채움)을 그대로 쓴다.
답변 0건이면 아바타 행 자리를 "아직 작성된 답변이 없습니다"로 채운다 — **자리를 비우지 않는다**(카드 높이가 달라진다).
서브 정보가 카드에서 가장 큰 색 면이 되면 계층이 뒤집힌다.

## 안 바뀌는 것

`--card-radius` · `--card-content-padding` · elevation(hover 시 `shadow-md`) · hairline(sage) · 제목 2줄 고정과 禁則.

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
