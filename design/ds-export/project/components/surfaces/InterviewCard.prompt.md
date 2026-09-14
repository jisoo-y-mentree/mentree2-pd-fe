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
- **미디어**: 3:2, `--card-media-margin` 인셋 + `--card-media-radius` — `MentorCard`와 같은 값. **배지 2개(국가 + 직무)를 미디어 좌상단에 겹친다** — `MentorCard`는 하단인데 여기는 상단.
- **제목**: 2줄 고정 + 말줄임. `--text-h3` · `600`.
- **발췌**: 3줄 고정 + 말줄임. `--text-body` · `--muted-foreground`.
- **인물 줄**: 이름(`600` `--foreground`) + 직함(`--muted-foreground`) 같은 줄. 회사는 다음 줄 `--muted-foreground`.
- **폭을 카드가 고정하지 않는다** — 부모(캐러셀)가 정한다(3열·2열·1열). `MentorCard`의 296 고정과 다르다. **높이도 내용이 정한다**(절대 높이 없음).
- **북마크 없음**(지금도 없다). **카드 전체 클릭 → 인터뷰 상세** — 루트 `<article>` + 스트레치 링크, `href`는 제목 링크로.
- 위계: 인물명 강조 > 회사·직함 muted. hex 금지·시맨틱 토큰만, HugeIcons, 禁則 유지, 미디어 로딩 전 sage placeholder.

### 만들지 않는 것
- `size` 변형(`featured`/`compact`) — 3장이 같은 크기다.
- 절대 높이 — 내용이 정한다.
