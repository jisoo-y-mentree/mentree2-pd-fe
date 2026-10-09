**Field / FieldGroup** — shadcn 폼 관습: 맨 입력을 흩뿌리지 말 것. 각 컨트롤을 `Field`(라벨 + 설명 + 에러)로 감싸고 `FieldGroup`으로 쌓는다.

```jsx
<FieldGroup>
  <Field label="이름" htmlFor="name" required>
    <Input id="name" placeholder="홍길동" />
  </Field>
  <Field label="이메일" htmlFor="email" description="로그인에 씁니다" error="올바른 이메일이 아닙니다">
    <Input id="email" invalid />
  </Field>

  {/* DS-32 — 묶음 제목 + 작은 라벨 둘 */}
  <FieldGroup label="거주중인 국가" required columns={2}>
    <Field label="나라" htmlFor="country"><Select id="country" … /></Field>
    <Field label="도시" htmlFor="city"><Select id="city" … /></Field>
  </FieldGroup>
</FieldGroup>
```

- **라벨**: `--text-body` · 600 — `RadioGroup` · `Checkbox`의 선택지 글자(`--text-body` 400)보다 작지 않다. `required`면 옆에 `*`(`--destructive`).
- **설명**: 라벨 **바로 아래, 컨트롤 위**(`--text-caption` · `--muted-foreground`). 컨트롤이 둘인 필드에서도 필드 전체의 설명으로 읽힌다.
- **에러**: 컨트롤 아래(`--destructive`, `role="alert"`). 설명과 함께 설 수 있다(자리가 다르다).
- **`FieldGroup label`**: 묶음 제목(Field 라벨과 같은 모양, `role="group"`). 그 안의 `Field` 라벨은 **작은 라벨**(`--text-caption` · 500). `columns={2}`면 안의 `Field` 둘이 한 줄에 반씩(간격 12). `label` · `columns`를 안 주면 이전과 같다(간격만).
