**Table** — sage 틴트 헤더 + sage 행 호버가 있는 경계형 데이터 테이블(USAGE-RULES 준수).

```jsx
<Table
  columns={[
    { key: "name", header: "멘티" },
    { key: "topic", header: "주제" },
    { key: "count", header: "세션", align: "right" },
  ]}
  data={rows}
/>
```

우측 정렬 숫자 컬럼에는 `align: "right"`(tabular-nums 적용). 셀 안 배지/액션은 `render` 사용.
