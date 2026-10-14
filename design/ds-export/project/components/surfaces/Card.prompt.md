**Card** — 대시보드 패널·설정 블록·리스트 아이템용 엘리베이션 표면. 흰 채움, 1px sage 경계, `shadow-sm`, `--radius-lg`. 카드를 린넨으로 채우지 말 것.

```jsx
<Card>
  <CardHeader>
    <CardTitle>이번 주 멘토링</CardTitle>
    <CardDescription>예정된 세션 3건</CardDescription>
  </CardHeader>
  <CardContent>…</CardContent>
  <CardFooter><Button>자세히</Button></CardFooter>
</Card>
```

하위 파트(`CardHeader/Title/Description/Content/Footer`)는 선택 — 필요한 것만 조합.

- **높이**: 카드는 자기 높이를 스스로 정하지 않는다 — 늘릴지 말지는 담는 쪽이 정한다. 격자·트랙은 `align-items: start`를 준다(카드 높이를 서로 맞추지 않는다). 카드 부품 자신에게 `alignSelf`를 박지 않는다 — 세로 flex 부모에서는 가로 정렬이 되어 카드가 폭을 잃는다.
