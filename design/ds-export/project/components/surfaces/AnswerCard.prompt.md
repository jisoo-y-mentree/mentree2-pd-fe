**AnswerCard** — Q&A 상세의 멘토 답변 1건.

## QnaCard와의 경계

- **질문/답변**: QnaCard = 질문 · AnswerCard = 답변.
- **카드 전체 클릭 여부**: QnaCard는 카드 전체가 상세로 가는 링크(스트레치 링크). AnswerCard는 답변 상세 페이지가
  없어 **갈 곳이 없다** — 스트레치 링크를 만들지 않는다. `href`를 받지 않는다.

(나중에 "둘을 합치자"는 말이 나오면 위 두 줄을 근거로 반대한다 — 링크 유무 자체가 다른 컴포넌트다.)

```jsx
<AnswerCard
  mentorName="서명진" mentorPhoto="/m/1.jpg"
  country="japan" countryLabel="일본" activityLocation="도쿄에서 활동"
  headline="데이터 애널리스트 @Google Japan (14년차)"
  mentorProfileHref="/mentors/42" mentorAnswersHref="/mentors/42/answers"
  body="말씀하신 상황이라면…(전문, 말줄임 없음)"
  date="2026-07-04"
  likeCount={20}
  accepted
  isQuestionerView
  onThanks={() => openThanksModal()}
/>
```

## 구조

1. **멘토 헤더 — 전환의 핵심 루트, 오브젝트 자체가 링크.** 버튼이 아니라 아바타·이름·국기·활동지·헤드라인이 담긴
   헤더 블록 전체를 누르면 멘토 상세로 간다(새 창). 구현은 이름에만 `<a>`를 걸고 그 `::after`로 헤더 블록만 덮는다
   (카드 전체가 아니다 — 본문·액션 줄은 덮지 않음). 접근 이름은 "멘토명" 하나(헤드라인까지 읽히지 않게).
   hover 시 이름이 `--primary`+밑줄 — 버튼이 없어졌으니 이것이 유일한 "눌린다" 신호.
   답변이 여러 개 깔려도 초록 버튼이 반복되지 않는다.
2. **이 멘토의 다른 답변 보기** — `Button sm variant="outline"` + 새 창 아이콘. **이 카드에서 테두리를 가진 것은 이
   버튼 하나뿐**(secondary=sage-100 채움은 쓰지 않는다 — Chip도 `--muted` 채움이라 버튼과 칩이 같아 보인다).
   헤더 블록·버튼을 한 덩어리로 묶어 헤드라인-버튼 사이는 좁게, 버튼-본문 사이는 넓게 — 헤더+버튼과 본문이 분리되어 보이게 한다.
   이 카드의 **유일한 primary는 "감사인사 보내기"뿐**.
3. **본문** — 전문 그대로. **line-clamp 없음**(QnaCard와 다름). 禁則 유지.
4. **날짜** — 연월일만(시간 없음).
5. **액션 줄 — 한 줄, 좌우 양끝 정렬.** 좌: 도움돼요(`CountToggle tone="rose"`) · 공유(IconButton, `overlays/Popover`로 "이
   답변 링크 복사"). 공유·더보기 둘 다 Popover(앵커·닫힘·ESC·포커스 복귀 공통 컴포넌트)를 쓴다.
   ⚠️ 모바일에서 공유는 이 Popover가 아니라 OS 공유가 뜬다 — 그 분기는 화면 책임(Popover.prompt.md 참조), 지금
   AnswerCard의 거동은 그대로다(범위 밖). 우: 채택 배지 + 감사인사 보내기(Button primary sm) — 둘은 갈라놓지 않고 항상 함께 움직인다(좁은 폭에서
   넘치면 우측 그룹 전체가 다음 줄로 내려간다). **스크랩 없음** — 스크랩의 목록 단위는 질문이라 답변마다 두면 한 질문에
   여러 개가 동시에 켜진다. 스크랩은 QnaCard에만.
6. **채택 표시** — 질문자가 도움된다고 한 답변에만, 액션 줄 우측 그룹에 "✓ 질문자가 도움된다고 한 답변입니다"(primary
   green) — 조작("~를 누른")이 아니라 의미를 말한다. 질문자는 "김\*\*"로 익명화되므로 질문자 아바타는 병기하지 않는다.
   복수 허용·해제 허용(도움돼요 토글 그대로).
7. **감사인사 보내기** — 질문자가 볼 때만, 그 사람의 질문에 달린 답변에만. Button primary, 액션 줄 우측 그룹 안.
   누르면 모달 — 모달 자체는 이 컴포넌트 범위 밖(화면이 조립).
8. **더보기(⋯)** — 내가 쓴 답변에만, 카드 우상단(헤더 링크 위 z-index로 독립 클릭). `overlays/Popover`로 "수정"·"삭제". 남의 답변에는 안 뜬다.

## 상태

기본 · 채택됨(5) · 질문자 시점(6) · 내 답변(7). **배타가 아니다** — 겹칠 수 있다.

## 안 만드는 것

- 답변 작성 폼 — qna-detail 화면이 Card+Avatar+RichTextEditor+Button으로 조립. variant로 넣지 않는다.
- 답변 0건 표시 — EmptyState.
