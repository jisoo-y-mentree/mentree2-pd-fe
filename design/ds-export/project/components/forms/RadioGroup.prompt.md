**RadioGroup** — 단일 선택 목록. 정확히 하나를 고를 때 흩어진 라디오 대신 사용.

```jsx
<RadioGroup
  options={["주 1회", "주 2회", "격주"]}
  value={cadence} onChange={setCadence}
/>
```

옵션은 문자열 또는 `{ value, label }`. 선택 점은 초록.
