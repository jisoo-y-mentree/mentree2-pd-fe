**Flag** (DS-78) — 국기만 크게. 국기 + 국가명 태그(`Badge leading="flag"`) 대신 원형 국기 하나.

```jsx
<h1 style={{ display: "flex", alignItems: "center", gap: "var(--space-2)" }}>
  박서연 <Flag country="japan" label="일본" city="도쿄" size="xl" />
</h1>
```

- 크기 `sm` 16 · `md` 20 · `lg` 24 · `xl` 28(`--text-display` 이름 옆).
- 원형 국기 하나. 태그 · 아웃라인 · 글자 없음. **1px `--border` 링** — 흰 면 국기(일본 등)가 흰 바탕에 묻히지 않게.
- 이름: `role="img"` + `aria-label`「국가 · 도시」(도시 없으면 국가만).
- `tooltip`(기본 true): `Tooltip` 으로 같은 글을 띄운다(`describe={false}`) · `tabIndex=0` · 포커스 링은 원을 따른다.
- 이름과 같이 쓰면 **이름 오른쪽**, 이름 글자의 세로 가운데(`display:flex; align-items:center`).
- 국기 배지(`Badge leading="flag"`)를 쓰는 부품은 아직 그대로다 — 멘토 상세에 먼저 쓴다.
