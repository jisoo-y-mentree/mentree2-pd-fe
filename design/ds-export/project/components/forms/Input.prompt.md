**Input** — 한 줄 텍스트 필드. 라벨/설명/에러는 `Field`로 감싸 조합.

```jsx
<Input placeholder="이름을 입력하세요" iconLeft="user" />
<Input invalid defaultValue="잘못된 값" />
```

`iconLeft`는 HugeIcons 이름. 포커스 시 sage 링; `invalid`는 경계를 빨갛게. 높이 38px, 라운드 `--radius-md`.
