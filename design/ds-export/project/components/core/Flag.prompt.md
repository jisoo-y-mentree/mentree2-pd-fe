**Flag** (DS-78 · DS-90) — 국기 하나. 태그 · 아웃라인 · 글자 없음.

```jsx
<h1 style={{ display: "flex", alignItems: "center", gap: "var(--space-2)" }}>
  박서연 <Flag country="japan" label="일본" city="도쿄" size="xl" shape="rect" />
</h1>
```

- **모양**: `shape="circle"`(기본) · `"rect"`. **이름 옆은 `rect`, 부품 안(칩 · 필터 · 배지 앞자리)은 `circle`.**
- 크기 `sm` 16 · `md` 20 · `lg` 24 · `xl` 28. `rect` 는 높이가 이 값, 폭 1.5배(24×16 · 30×20 · 36×24 · 42×28).
- circle: **1px `--border` 링**. rect: **2px 안쪽 여백 · 반경 4 · 1px `--border` 링** — 흰 바탕 국기(일본 등)가 흰 면에 묻히지 않게.
- 자산: Figma 국기 라이브러리(`1758:672626`) — 원형 `assets/flags/<이름>.svg` · 직사각 `assets/flags-rect/<이름>.svg`(30×20). 이름은 `taxonomy.js` 의 `flag`, ISO 는 `iso`. **국기를 직접 그리지 않는다.**
- 이름: `role="img"` + `aria-label`「국가 · 도시」(도시 없으면 국가만).
- `tooltip`(기본 true): `Tooltip` 으로 같은 글을 띄운다(`describe={false}`) · `tabIndex=0` · 포커스 링은 모양을 따른다.
- 이름과 같이 쓰면 **이름 오른쪽**, 이름 글자의 세로 가운데.
