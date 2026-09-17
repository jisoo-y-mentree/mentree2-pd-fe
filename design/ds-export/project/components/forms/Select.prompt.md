**Select** — `Input`과 높이·경계·포커스 링을 맞춘 드롭다운.

```jsx
<Select
  placeholder="분야 선택"
  options={["디자인", "개발", "기획"]}
  value={field} onChange={setField}
/>
```

`options`는 문자열 또는 `{ value, label }`. `invalid`는 경계를 빨갛게, `disabled`는 `--muted` 면 + opacity 0.6(열리지 않는다).

## 네이티브를 버렸다

**`<select>`가 아니다.** 껍데기만 우리 것이고 목록은 OS가 그리던 문제 — 목록이 트리거를 덮고 뜨고, ✓가 왼쪽에 붙고,
면·테두리·radius·그림자가 우리 토큰이 아니고, 브라우저마다 다르게 보였다.
**새 오버레이를 만들지 않았다** — `overlays/Popover`(위치·면·바깥 클릭·Esc·포커스 복귀)를 그대로 쓴다.

| | |
|---|---|
| 트리거 | 높이 **40**(Input·SearchInput과 같다) · `--text-body`/줄높이 1/자간 0(컨트롤 예외) · 화살표 열리면 **180도** |
| 목록 | 트리거 **아래 4px** · **폭이 트리거와 같다** · max-height **320**(넘으면 스크롤) |
| 항목 | 높이 **36** · 좌 10/우 32 · `--radius-sm` · 커서 얹힘 = `--muted` 면 |
| 선택 표시 | 항목 **우측**에 `tick-02` 14, `--primary` |
| 아래가 좁으면 | 트리거 rect로 재서 **위로** 연다 |

**초록 반전을 쓰지 않는다** — `--accent`는 목록에서 너무 세다. `FilterSelect`도 트리거에 초록 반전을 안 쓴다.

## placeholder는 항목이 아니다

값이 없으면 트리거에 흐린 글자로 보인다. **목록에는 없다.** 비우는 항목도 만들지 않는다(필요해지면 그때).

## `onChange(value)`

네이티브 이벤트가 없어졌다 — **고른 항목의 `value` 문자열**을 넘긴다. `onChange={(e) => e.target.value}`는 더 이상 동작하지 않는다.

## 키보드

`Enter`·`Space`·`↓`로 연다 · `↑↓`로 커서(끝에서 멈춘다, 순환하지 않는다) · `Home`·`End` · `Enter` 확정 · `Esc` 버리고 닫기(포커스는 트리거로) · `Tab` 닫기.
**열 때 커서는 선택된 항목**(없으면 첫 항목)에 둔다. typeahead는 넣지 않았다.

접근성: 트리거 `role="combobox"`+`aria-expanded`/`aria-haspopup="listbox"`/`aria-controls`/`aria-activedescendant`, 목록 `role="listbox"`, 항목 `role="option"`+`aria-selected`.
`Field`의 `htmlFor`가 트리거를 가리킨다(`id`를 넘기면 트리거의 id가 된다).

## 경계

- **모바일에서도 같은 팝오버다** — `Sheet`로 바꾸지 않는다.
- **`FilterSelect`는 다른 부품이다** — 조건 축의 트리거 + `Dialog` 모달 한 벌. 이것과 무관하다.
