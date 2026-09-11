## 경계 — 2층

**1층 — 무엇을 나타내나.** "누르면 무엇이 일어나는가"는 기준이 아니다(칩도 이동하고, 버튼도 모달을 연다).
- Badge = 데이터다. 안 눌린다.
- 칩 계열(Chip·FilterChip) = 데이터다. 눌린다.
- Button = 행동이다. primary·secondary·ghost 위계를 가진다.

  가르는 세 가지: 라벨의 품사(명사 "일본취업" vs 동사구 "다른 답변 보기") · 서는 법(여럿이 세트로·동격 vs 단독) · 위계(없다 vs 있다).
  **동사구 라벨은 Chip에 넣지 않는다 — 그건 Button이다.**

**2층 — 칩 안에서.**
- FilterChip = 상태가 있다(켜짐/꺼짐).
- Chip = 상태가 없다(이동·제거·표시).  ← 이것

# Chip

데이터를 나타내는, 상태를 갖지 않는 칩(라벨은 명사, 여럿이 세트로 놓이며 위계가 없다).
눌리지만 켜지지 않는다 — 이동하거나(`href`), 제거하거나(`onRemove`), 표시만 한다.
그래서 `selected`가 없다. 켜짐(선택 토글)이 필요하면 **FilterChip**을, 동사구 행동이 필요하면 **Button**을 쓴다.

## 형태

- 면 `--muted`(sage-100) 채움. **아웃라인 없음** — 이 "채움 + 아웃라인 없음"이 Badge·FilterChip과 가르는 유일한 시각 신호.
- 라벨 `--sage-700`.
- **size 2종**
  - `sm`: 높이 22(Badge sm과 동일) · radius `--radius-sm` · 12px/500 · padding 좌우 8 — 카드 안 해시태그
  - `md`: 높이 32(FilterChip과 동일) · radius `--radius-md` · caption/500 · padding 좌우 12 — 필터 모달의 걸린 조건
- **pill 금지** — 높이 22에서 radius 11 이상은 완전 pill이라 쓰지 않는다(sm은 `--radius-sm`=8).
- Badge md(28)는 만들지 않는다 — 두 크기의 쓰임이 이미 갈린다.

## 슬롯과 거동

- `prefix` → 라벨 앞에 붙는 문자. 기본값 없음. 해시태그는 `prefix="#"`, 걸린 필터 조건은 붙이지 않는다.
  **라벨 문자열에 `#`를 넣지 않는다** — 넣으면 같은 데이터가 두 가지로 저장된다.
- `href` → `<a>`로 렌더. hover 시 라벨이 `--primary`(green).
- `onRemove` → trailing에 ✕(HugeIcons `cancel-01`)를 단다. ✕는 별도 `<button>` —
  칩 본체가 링크일 때 링크 안에 버튼이 들어가지 않도록 **형제**로 둔다.
- 둘 다 없으면 표시 전용 `<span>`.
- **leading 슬롯 없음** — 지금 쓰는 데가 없다.

## 상태

`default · hover · active · focus-visible · disabled`

- **hover**: 면 `--sage-200`(`--muted`보다 한 단 진하게). href면 라벨도 `--primary`.
- **active**: 0.5px 눌림(Button·FilterChip과 같은 프레스).
- **focus-visible**: `--ring`.
- **disabled**: 흐리게, 커서 없음.

## 터치 영역

`sm`의 시각 높이는 22(Badge sm 정렬). 터치 영역은 시각 높이보다 넓힌다 —
`onRemove` 버튼은 투명 패딩(`::after` ±4)으로 24×24 이상을 확보한다.

## 어디에 쓰나

- `sm` + `href` — Q&A 카드의 해시태그.
- `md` + `onRemove` — 필터 모달 안의 "지금 걸린 조건".

```jsx
<Chip size="sm" prefix="#" href="/tags/디자인">디자인</Chip>
<Chip size="md" onRemove={() => removeFilter("서울")}>서울</Chip>
<Chip size="md">읽기 전용</Chip>
```
