**MultiSelect** (DS-71) — 목록에서 여러 개를 고른다. 「커리어 경험이 있는 국가」 · 「인사이트 태그」.

```jsx
import { COUNTRY_GROUPS } from "…/components/taxonomy.js"; // 화면이 넘긴다 — 부품은 import하지 않는다

<Field label="커리어 경험이 있는 국가" htmlFor="countries">
  <MultiSelect id="countries" groups={COUNTRY_GROUPS} value={v} onChange={setV} placeholder="경험 국가를 선택해주세요." />
</Field>
```

- **고른 것**: 트리거 **위**에 `Chip`(md) 줄. ⊗가 뺀다(`removeAriaLabel` 「{이름} 빼기」). 넘치면 여러 줄로 접힌다. 칩은 고른 순서.
- **트리거**: `Select`와 같은 겉모양(높이 40 · `Input`의 면/경계/링/`invalid`). 고른 것이 있어도 placeholder를 둔다.
- **목록**: `Popover` · 트리거 아래 4px · 트리거 폭 · max-height 320. 항목마다 체크 상자(켜짐 = `--primary` 면 + tick). **항목을 눌러도 닫지 않는다.** 바깥 · Esc · Tab이 닫는다.
- `groups`(`taxonomy.js` `COUNTRY_GROUPS` · `KEYWORD_GROUPS` 모양)를 주면 묶음 제목이 선다(`--text-micro` 600 · 고를 수 없음). 빈 제목은 그리지 않는다.
- **키보드**: Enter/Space/↓ 열기 · ↑↓ Home End · Space/Enter 켜고 끄기 · 첫 글자로 건너뛰기.
- **접근성**: `role="listbox"` + `aria-multiselectable="true"`, 항목 `aria-selected`. 트리거 `role="combobox"`.
- **경계**: 하나만 고르면 `Select`. 필터 모달은 `FilterSelect` — 편집 모달 안에서는 모달이 겹치므로 이것을 쓴다.
