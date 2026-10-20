**Input** — 한 줄 텍스트 필드. 라벨/설명/에러는 `Field`로 감싸 조합.

```jsx
<Input placeholder="이름을 입력하세요" iconLeft="user" />
<Input invalid defaultValue="잘못된 값" />
```

**`limit`(DS-70)** — `<Input limit={20} value={v} onChange={…} />`. 상자 밖 오른쪽 아래에 「n/limit」(`--text-caption` · `--muted-foreground`). 넘치면 카운터 `--destructive` + 상자 `invalid` + `aria-invalid="true"`. **잘라내지 않는다**(네이티브 `maxlength` 안 씀). `value.length`로 센다 — 이모지는 2자. 규칙은 `Textarea`와 같다. 안 주면 이전과 같다.

`iconLeft`는 HugeIcons 이름. 포커스 시 sage 링; `invalid`는 경계를 빨갛게. 높이 38px, 라운드 `--radius-md`.
