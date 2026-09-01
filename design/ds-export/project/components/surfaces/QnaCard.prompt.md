**QnaCard** — 미디어 없는 텍스트 카드(Q&A). 카드 기하·elevation·동심원 원칙을 상속한다.

```jsx
<QnaCard
  href="/qna/42"
  category="커리어"
  views={1280} likes={34}
  title="주니어 디자이너인데 이직 타이밍이 고민입니다"
  excerpt="지금 회사에서 2년 차인데 성장이 정체된 느낌이에요. 포트폴리오는…"
  answerers={[{ name: "박지훈" }, { src: "/u/2.jpg", name: "김도윤" }, { name: "이서연" }, { name: "최유진" }, { name: "정하늘" }]}
  answerCount={5}
/>
```

- 미디어가 없으므로 콘텐츠 패딩 = `--card-content-padding`(18px) 통일, radius `--card-radius`(22), elevation 상속(hover 시 `shadow-md`만). **카드 전체 클릭 → Q&A 상세**.
- **상단 행**: 좌측 카테고리 배지(분류 계열) + 우측 메타 — 조회수(HugeIcons `view` + tabular) · 좋아요(HugeIcons `favourite` + tabular). **좋아요는 카운트 표시 전용(무상태, 안 눌러짐)**.
- **제목** h3 · 2줄 고정(line-clamp 2, 禁則 유지). **발췌** body muted · 2줄 고정.
- hairline(sage) 아래 **하단 행**: 답변자 `AvatarGroup` + "멘토 답변 **N**개"(N은 tabular · primary green 강조).
- **변형**: 답변 다수 → AvatarGroup + "+N" 오버플로우 / 답변 1명 → 아바타 1개, "+N" 없음(items 길이로 자동).
