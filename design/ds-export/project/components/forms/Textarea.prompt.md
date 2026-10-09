**Textarea** (DS-70) — 여러 줄 입력. 멘토 소개글(500자) · N문N답 답변. 한 줄은 `Input`.

```jsx
<Field label="소개글" htmlFor="intro">
  <Textarea id="intro" value={v} onChange={(e) => setV(e.target.value)} placeholder="멘토님을 소개해주세요." limit={500} />
</Field>
```

- 겉모양(면 · 경계 · 반경 · 포커스 링 · `invalid` · `disabled`)은 **`Input`과 같다.** 글자 `--text-body` / 줄 높이 24 · 위아래 8 · 좌우 12.
- `rows`(기본 3)에서 시작, 글이 늘면 `maxRows`(기본 8)까지 상자가 따라 커진다. 넘으면 상자 안에서 스크롤. 손잡이로 크기를 바꾸지 않는다(`resize: none`).
- `limit` — 상자 **밖** 오른쪽 아래에 「n/limit」(`--text-caption` · `--muted-foreground`). n > limit → 카운터 `--destructive` + 상자 `invalid` + `aria-invalid="true"`. **잘라내지 않는다**(네이티브 `maxlength` 안 씀). 세는 법은 `value.length` — 이모지는 2자.
- 같은 `limit` 규칙이 `Input`에도 있다(한 줄 요약 20자 · Q&A 제목 50자).
