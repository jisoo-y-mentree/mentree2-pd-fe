**ToggleGroup** — 세그먼티드 컨트롤. USAGE-RULES에 따라, 하나/여럿 선택 및 뷰 전환에는 버튼 행이 아니라 이것을 사용.

```jsx
<ToggleGroup
  options={[{ value: "list", label: "목록", icon: "menu-01" }, { value: "grid", label: "격자", icon: "dashboard-square-01" }]}
  value={view} onChange={setView}
/>
```

`multiple`을 주면 다중선택(value가 배열). 선택된 세그먼트는 `shadow-xs`가 있는 흰 카드로 떠오른다.
