**Select** — `Input`과 높이·경계·포커스 링을 맞춘 드롭다운.

```jsx
<Select
  placeholder="분야 선택"
  options={["디자인", "개발", "기획"]}
  value={field} onChange={(e) => setField(e.target.value)}
/>
```

`options`는 문자열 또는 `{ value, label }`. HugeIcons 셰브론 표시; `invalid`는 경계를 빨갛게.
