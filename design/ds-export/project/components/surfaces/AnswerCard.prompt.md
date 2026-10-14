**AnswerCard** — Q&A 상세의 멘토 답변 1건(DS-23 개정 · Figma `1695:90003` 기본 · `1695:90005` 질문자 시점 · `1695:90004` 도움 표시 ＋ 감사 인사).

## QnaCard와의 경계

- QnaCard = 질문(카드 전체가 상세로 가는 링크) · AnswerCard = 답변(답변 상세 페이지가 없어 **카드 전체 링크가 없다**). `href`를 받지 않는다.

```jsx
<AnswerCard
  mentorName="서명진" mentorPhoto="/m/1.jpg"
  country="japan" countryLabel="일본"
  headline="데이터 애널리스트 @Google Japan (14년차)"
  mentorProfileHref="/mentors/42"
  body="말씀하신 상황이라면…(전문)"
  date="2026-07-04"
  liked={false} likeCount={77} onLike={() => api.clap(answerId)}
  accepted
  isQuestionerView onThanks={() => openThanksModal()}
  thanks={{ author: "김**", date: "2026-07-05", text: "덕분에 방향을 잡았어요." }}
/>
```

## 구조(위에서 아래로)

- **카드** — 1px `--border` · 흰 면 · 안쪽 여백 10 · 바깥 반경 `--radius-lg` + 10(머리 상자와 동심원).
- **① 머리 상자** — `--green-50` · `--radius-lg` · 16/20. **상자 전체가 멘토 상세로 가는 링크 하나**(새 창). `Avatar` 60 | 이름 `--text-h2` 700 ＋ `Flag shape="rect" size="md"` / 「국가 · 직무 @회사 (연차)」 `--text-body-sm` muted | 「멘토 프로필 보기 ›」 `--primary` · `--text-h3` 700 — 글자일 뿐 따로 링크가 아니다.
- **② 도움 표시** — `accepted` 일 때 본문 위. `checkmark-circle-02` 14 ＋ caption 500 `--primary`.
- **③ 본문** `--text-article` 전문 · **④ 날짜** caption muted. ③〜⑥ 의 왼쪽 끝은 카드 가장자리에서 18.
- **⑤ 동작 줄**(간격 8) — 하트 박스(`CountToggle appearance="box" repeat tone="dark"`) → 「감사인사 작성」(`Button outline lg` · `bubble-chat-favourite` · 질문자 시점이고 `thanks` 가 없을 때) → 공유(`IconButton outline lg` · `share-08` · Popover 「이 답변 링크 복사」).
- **⑥ 감사 인사** — `thanks` 가 있을 때 맨 아래. 왼쪽 3px `--primary` 줄 · 이니셜 `Avatar` sm · 이름 body 600 · 날짜 caption muted · 글 body. 이름은 화면이 넘긴 그대로.
- **내 답변** — 머리 상자 오른쪽 위 ⋯(수정 · 삭제). 링크 위에서 따로 눌린다.

## 하트

누를 때마다 `onLike()` — 끄는 동작이 없다. `liked` = 내가 한 번 이상 눌렀다. `onLikeChange` 는 받되 쓰지 않는다.

## 좁은 폭(카드 폭 < 560)

- 머리 상자: 「멘토 프로필 보기 ›」가 이름 묶음 아래 한 줄로 내려간다. 아바타 48.
- 동작 줄: 하트 · 공유가 첫 줄, 「감사인사 작성」은 다음 줄 전체 폭.

## 빼는 것(prop 은 받되 그리지 않는다)

「이 멘토의 다른 답변 보기」(`mentorAnswersHref`) · 동작 줄 오른쪽 채택 배지 ＋ 「감사인사 보내기」 primary · 활동지(`activityLocation`).

## 안 만드는 것

답변 작성 폼(화면이 조립) · 답변 0건 표시(EmptyState) · 스크랩(질문 단위 — QnaCard에만).
