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
3. **발췌** body muted · **2줄** 고정.
4. **해시태그 행** — `Chip size="sm" prefix="#"`. **태그는 Chip이다 — 눌린다.** 5개까지, 6개 이상이면 5개 뒤에 **"+N"**.
   **"+N"은 Badge다** — 태그가 아니라 개수이고 눌리지 않는다(클릭 핸들러 없음·펼치지 않음). 크기는 Chip sm과 같은 22.
   펼치지 않는 이유: 격자 6장의 높이가 고정돼야 하고, 카드 안에서 펼치면 옆 카드를 덮는다. 전부는 상세에서 본다.
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
**해시태그 행만 통째로 감춘다**(폭이 좁아 5개가 안 들어간다). 나머지 구성은 같다.

## 색 예산

정적 상태에서 채도를 쓰는 자리는 **국기 · 아바타 사진 · "멘토 답변 N개"의 N**, 이 3곳뿐이다.
해시태그는 색 있는 배지로 만들지 않는다 — Chip 기본값(`--muted` 채움)을 그대로 쓴다.
답변 0건이면 아바타 행 자리를 "아직 작성된 답변이 없습니다"로 채운다 — **자리를 비우지 않는다**(카드 높이가 달라진다).
서브 정보가 카드에서 가장 큰 색 면이 되면 계층이 뒤집힌다.

## 안 바뀌는 것

`--card-radius` · `--card-content-padding` · elevation(hover 시 `shadow-md`) · hairline(sage) · 제목 2줄 고정과 禁則.
