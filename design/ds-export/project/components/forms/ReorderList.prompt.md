**ReorderList** (DS-73) — 항목의 순서를 바꾸는 목록. N문N답 · 커리어 관련 활동.

```jsx
<ReorderList
  items={qnas}
  itemLabel={(q, i) => q.question || `${i + 1}번째 질문`}
  onReorder={setQnas}
  renderItem={(q) => (
    <Field label="질문"><Input value={q.question} onChange={…} /></Field>
  )}
/>
```

- **1건**이면 핸들을 감춘다(와이어 메모 `1413:86154`). **2건 이상**이면 항목마다 왼쪽 위에 ≡(`menu-01` 18 · 28px 칸) — 첫 칸의 라벨 줄에 선다.
- **끌기**: 마우스 = 핸들을 눌러 바로 · 터치 = 핸들을 약 300ms **길게 눌러**(그 전에 8px 넘게 움직이면 취소). 끄는 항목은 `--shadow-md`로 뜨고, 나머지가 비켜서 들어갈 자리를 보인다. 놓으면 `onReorder(새 배열)`.
- **키보드**(WCAG 2.1.1): 핸들에 포커스 → Space(Enter)로 집기(링 + 그림자) → ↑ ↓ 로 옮기기 → Space로 놓기 · Esc 취소. 놓을 때만 `onReorder`를 부른다.
- **알림**: `aria-live` — 조사를 항목 이름에 붙이지 않는다. 집기 「{항목} — 집었습니다. 위아래 화살표로 옮기고 스페이스로 놓습니다」 · 놓기 「{항목} — N번째로 옮겼습니다」 · 취소 「{항목} — 옮기지 않았습니다」.
- `prefers-reduced-motion: reduce` — 비키는 전환 없이 자리만 바꾼다.
- 외부 라이브러리 없음.
