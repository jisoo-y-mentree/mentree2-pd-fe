# CountToggle

아이콘 + 카운트가 붙은 **메타 줄 인라인 전용** 토글. **"도움돼요"와 "스크랩"이 이 하나로 통일**된다 — 거동은 완전히 같고 `icon`만 다르다.

> **경계(BookmarkToggle과)**
> BookmarkToggle = 미디어 오버레이의 아이콘 토글. 사진 위. 단독. 반전한다.
> CountToggle    = 메타 줄의 인라인 토글. 아이콘 + 숫자. 반전하지 않는다.
>
> 경계는 "카운트의 유무"가 아니라 "어디에 놓이는가"다.
> 한 번 합쳤다가 되돌렸다(09-11 → 09-12). 이 줄이 없으면 또 합치게 된다.

## 카운트는 필수다

`count`는 필수 prop이다. 숫자가 없는 자리(사진 위 단독 스크랩 액션 등)는 **BookmarkToggle**이 맡는다.
한 번 카운트 유무로 경계를 그어 옛 아이콘 전용 토글을 이 컴포넌트로 흡수한 적 있었으나(2026-09-11),
MentorCard 스크랩이 작아지고 반전이 사라지는 문제가 생겨 되돌렸다(2026-09-12) — 경계는 자리(장소)로 다시 그었다.

## ⚠️ 반전 원칙의 예외

Toggle 계열은 "selected = 반전"이 원칙(FilterChip = green 채움)이지만,
**CountToggle은 반전하지 않는다** — 목록에 카드가 20장 깔리면 반전이 40개 뜨고 카드가 안 읽힌다.
대신 **아이콘 fill + tone 텍스트(숫자도 같은 색), 배경 없음**으로만 표시한다. 이 컴포넌트에 한정된 예외다.

## tone — green은 쓰지 않는다

화면에 green은 이미 "멘토 답변 N개"·"질문자가 도움돼요를 누른 답변" 등 다른 의미로 쓰인다. 겹치면 3가지 의미가 한 색이 된다.

- `tone="rose"` — 도움돼요. selected 시 아이콘 fill + `--badge-rose-700`.
- `tone="dark"` — 스크랩. selected 시 아이콘 fill + `--sage-900`.

도움돼요·스크랩이 나란히 놓이므로 색으로 갈라야 어느 쪽을 눌렀는지 한눈에 보인다.

## 형태

- 아이콘(HugeIcons 16) + 간격 + 숫자(tabular-nums). 배경·테두리 없음, 인라인.
- HugeIcons 정적 CDN에 solid가 없는 아이콘(favourite·bookmark)은 stroke 1.6 라운드의 인라인 SVG로 outline↔fill을 토글한다.
- 사진 위 미디어 오버레이는 이 부품의 자리가 아니다 — 그 자리는 BookmarkToggle.

## 상태

`default · hover(--sage-700) · active(0.5px 눌림) · selected(아이콘 fill + tone 색, 배경 없음) · focus-visible(--ring) · disabled`

## 제어형

`selected` + `onChange(next)` 제어형. 카운트는 `count` prop으로 받는다(생략 가능).
서버 저장 로직은 범위 밖.

## 비로그인

컴포넌트는 상태 표현만 한다. "비로그인이면 로그인으로 유도"는 화면이 정한다 — 화면이 `onChange`를 가로챈다.
컴포넌트에 로그인 개념을 넣지 않는다.

## 터치 영역

아이콘+숫자가 인라인이라 세로가 얇다. 투명 패딩(위아래 4px)으로 터치 영역 24 이상을 확보한다.

## appearance="box" · repeat (DS-86 · DS-23)

- `appearance="box"` — 높이 48 · 반경 `--radius-md`(12) · 1px `--border` · 흰 면 · 좌우 16 · 아이콘 18 + 간격 6 + 수(`--text-caption` · tabular). `IconButton` lg 와 나란히 서면 높이 · 반경이 같다. `tone="dark"` 켜짐은 `--foreground` 로 채운다. 기본 `"inline"` 은 그대로다.
- `repeat` — 누를 때마다 `onIncrement()` 를 부르고 수를 하나 올린다. **끄는 동작이 없다**(「1.0 의 박수」). `selected` 는 「내가 한 번 이상 눌렀다」. 상한은 부품이 정하지 않는다.
- `repeat` 이면 `aria-pressed` 를 달지 않는다. 접근 이름은 「도움돼요 77」, 수가 바뀌면 `aria-live="polite"`.
- 쓰는 곳: `AnswerCard` 의 하트 박스.

## 어디에 쓰나

- `icon="favourite"` — 도움돼요
- `icon="bookmark"` — 스크랩(메타 줄에 조회수 등과 나란히 놓일 때만 — 사진 위 단독이면 BookmarkToggle)
Q&A 카드 · Q&A 상세 · TOP

```jsx
<CountToggle icon="favourite" tone="rose" selected={liked} count={helpfulCount} onChange={setLiked} />
<CountToggle icon="bookmark" tone="dark" selected={saved} count={scrapCount} onChange={setSaved} />
```
