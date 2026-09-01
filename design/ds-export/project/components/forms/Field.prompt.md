**Field / FieldGroup** — shadcn 폼 관습: 맨 입력을 흩뿌리지 말 것. 각 컨트롤을 `Field`(라벨 + 설명/에러)로 감싸고 `FieldGroup`으로 쌓는다.

```jsx
<FieldGroup>
  <Field label="이름" htmlFor="name" required>
    <Input id="name" placeholder="홍길동" />
  </Field>
  <Field label="이메일" htmlFor="email" error="올바른 이메일이 아닙니다">
    <Input id="email" invalid />
  </Field>
</FieldGroup>
```

`error`는 `description`을 덮고 헬퍼 텍스트를 빨갛게 만든다.
