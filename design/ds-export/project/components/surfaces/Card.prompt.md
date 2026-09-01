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
