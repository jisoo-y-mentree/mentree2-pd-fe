**QnaListItem** (DS-57) — Q&A 한 건을 **목록의 한 줄**로. 카드 격자는 `QnaCard` 가 그대로 맡는다.

```jsx
<QnaListItem variant="default" href="/qna/42" headingLevel={3}
  country="netherlands" countryLabel="네덜란드" keyword="현지 생활"
  title="암스테르담 정착 초기, 집 계약에서 무엇을 확인해야 합니까?"
  excerpt="회사가 정한 3개월 임시 숙소가 끝납니다…"
  tags={["정착 생활", "비자·영주권", "재테크", "주거", "세금"]}
  answerers={[{ name: "김도윤" }, { name: "이서연" }]} answerCount={2}
  views={431} likes={11} liked={liked} onLikeChange={setLiked} scraps={3} scrapped={scrapped} onScrapChange={setScrapped} />
```

## 변형 — 이름은 자리가 아니라 강조점

- **default**(전부 · Q&A 피드 질문 목록): 머리 국가·키워드 `Badge` / 오른쪽 위 조회 + 도움돼요 + 스크랩. 제목 h3 2줄 · 발췌 caption muted 2줄. 끝 줄 `AvatarGroup` + 「멘토 답변 **N**개」 / 오른쪽 해시태그 `Chip sm #` **3개** + 「+N」 `Badge`. 0건 → 「아직 작성된 답변이 없습니다」. 줄 폭 ≤768 → 해시태그가 한 줄을 따로 쓴다.
- **compact**(제목만 · 나의 Q&A): 머리 「국가 · 키워드」 글자 / 오른쪽 「답변 **N**」(primary 600, 0건 「답변 대기」). 제목 body 600 1줄. `showScrap` → 스크랩 토글, 끄면 `onScrapChange(false)` — 줄은 남는다.
- **answer**(그 멘토의 답변 · 멘토 상세 Q&A 탭): 제목 h3 1줄 · `answerExcerpt` body **--foreground** 3줄. 끝 줄 도움돼요 + 조회 / 스크랩. 배지·태그·아바타 없음. 테두리 카드 아님.
- **question**(질문과 답변 수 · TOP 밴드): 「Q.」(primary) + 키워드 · 제목 h3 2줄 · 「조회 N · 도움돼요 N」 글자. 오른쪽 답변 수 `--text-display` 600 tabular + 「멘토 답변」, 0건 「답변 대기」. 누를 곳은 제목 하나.

## 공통

- **셸 없음.** 줄 위아래 hairline `--sage-200`, 줄끼리 `margin-top:-1px` 로 겹쳐 사이는 1px. 면을 칠하지 않는다 — hover 만 `--sage-50`.
- 루트 `<article>` · 제목 `<hN><a class="mt-card-link">` 가 줄 전체로 늘어난다. 포커스 링은 줄 전체.
- **DOM 은 제목이 먼저**, 반응 묶음은 grid-area 로 오른쪽 위에 둔다. 포커스 = 제목 → 해시태그 → 도움돼요 → 스크랩.
- 768 판정은 **줄 자신의 폭**(container query)이다.
- 좁은 폭: default · compact · answer 는 제목이 두 칸을 다 쓴다 — 오른쪽 칸은 머리 줄에서만 자리를 다툰다. question 의 답변 수 칸은 내용 폭(1〜2자)만 쓴다. 숫자는 줄바꿈하지 않는다.
- `loading` → 같은 구성의 `Skeleton`. 감싸는 목록에 `aria-busy` 를 두는 것은 화면의 일.
- 색 예산: 국기 · 아바타 · 답변 수 · 「Q.」 뿐. 해시태그는 늘 `--muted`.

## DS-84 개정

- **default**(Figma `1646:33282`): 머리 = 원형 국기 20 ＋ 국가 · 키워드 아이콘 20(`--primary`) ＋ 키워드 — caption 500 `--sage-700`, **테두리 · 면 없는 글자 묶음**(사이 12). 오른쪽 「New」 = `Badge variant="accent" size="md"`(`isNew`). 제목 h3 700(넓으면 1줄 · 768 이하 2줄) → 발췌 caption muted 2줄 → **해시태그 따로 한 줄**(Chip sm # 3개 ＋ 「+N」) → 끝 줄: `AvatarGroup` 40(4개) ＋ 「멘토 답변 **N**개」 body 500 `--primary` / 오른쪽 조회 16 · 하트 · 스크랩. 간격 8 · 12 · 16 · 12, 줄 위아래 24. 520 이하에서는 반응 묶음이 답변 수 아래 줄로.
- 키워드 아이콘은 `taxonomy.js` 의 `KEYWORD_GROUPS[].options[].icon` 에서 찾는다 — `keyword` 는 키워드 값(대분류 이름이 아니다).
- **question**(Figma `1567:22871`): 카드 모양 — `--radius-lg` · 안 여백 20 · 줄 안 간격 16 · 형제 줄 사이 16 · hairline 없음. 면 없음 · **호버 면 `--green-100`**(DS-107 — Figma 첫 줄의 green 면은 호버 상태였다. `highlight` prop 은 없앴다). 제목 색은 호버에도 그대로 · 포커스는 `--ring`. 다른 변형의 호버는 `--sage-50`. 키워드 → 제목 h2 600 1줄 → 끝 줄(아바타 ＋ 답변 수 / 조회 · 하트 **표시만**). 「Q.」와 큰 답변 수 칸은 뺐다.

- **DS-102 — `question` 좁으면 제목 2줄**: 줄 자신의 폭 768 이하(container query, `default` 와 같은 판정)면 제목 2줄 · 넘치면 말줄임. 769 이상은 1줄. 크기 · 굵기 · 행간 · `highlight` 는 그대로.
- **DS-108** — 키워드가 대분류(취업준비 · 커리어 · 현지 생활 · 학업/재정/그 외)면 `KEYWORD_GROUPS` 그룹의 `icon`(briefcase-01 · chart-increase · location-01 · book-open-01), 세부 태그면 그 태그의 `icon`.
- **DS-109** — 답변자 얼굴 기본 3명 ＋ 「+K」(`AvatarGroup`). 「멘토 답변 N개」는 실제 수. `maxAvatars` 가 이긴다.
