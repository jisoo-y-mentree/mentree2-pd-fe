# Popover

앵커에 붙는 작은 오버레이 **껍데기**. 위치 · 면 · 닫기 · 포커스만 맡고, 안에 무엇을 넣을지는 쓰는 쪽이 정한다.

## 왜 만드나

같은 것이 세 곳에 따로 있었다 — AnswerCard의 `MenuPopover`(공유·더보기), 그 `menuItemStyle`,
그리고 Badge의 "+N 펼침". 앞의 둘을 이 부품으로 합친다. 셋이 각자 갖던 값(`position:absolute · z-index:30 ·
padding:4 · --radius-md · --card · 1px --border · --shadow-md`)이 이제 한 곳에 있다.

## 범위 — Badge의 "+N 펼침"은 넣지 않는다

성격이 다르다.

- 공유 · 더보기 = **고른다**. 누르면 동작이 일어난다. `role="menu"`.
- Badge의 +N = **본다**. 나머지 항목을 펼쳐 보여줄 뿐이다.

Badge의 +N은 MentorCard 미디어 오버레이 안에서 부모 `overflow`에 잘리는 문제(DS-06, 대기 중)를 따로 갖는다.
AnswerCard는 미디어가 없어 잘림이 안 걸린다 — 여기서 같이 안으면 대기 중인 판정을 끌고 들어온다.

## 형태

- `position: absolute` · `z-index: 30`.
- 면 `--card` · 1px `--border` · `--radius-md` · `--shadow-md` · padding 4.
- 앵커에서 4px 띄운다. 붙는 방향은 `side`("top"·"bottom"·"left"·"right", 기본 "bottom") +
  교차축 정렬 `align`("start"·"end", 기본 "start").
- `minWidth` 기본 168.
- 렌더 위치는 `position:relative`인 트리거의 형제 — 좌표 계산 없이 CSS만으로 붙는다.
  `<div style={{position:"relative"}}><IconButton .../><Popover .../></div>`.

## 거동

- `open` + `onClose` **제어형** — 여는 쪽이 상태를 갖는다.
- 바깥을 누르면 닫힌다(`pointerdown`).
- **ESC로 닫힌다.**
- **닫히면 포커스가 트리거로 돌아간다** — `triggerRef`(트리거 엘리먼트의 ref)를 넘기면 `open`이
  `true→false`로 바뀔 때 그 엘리먼트에 `.focus()`한다.
- 화살표 키 내비게이션은 만들지 않는다. 지금 항목이 2~3개라 Tab으로 충분하다 — 항목이 늘면 그때 추가한다.

## 메뉴로 쓸 때

메뉴가 가장 흔한 쓰임이라 항목 스타일을 같이 낸다. **별도 부품으로 만들지 않는다.**

- `role="menu"`를 prop으로 받을 수 있다(기본은 없음).
- `popoverMenuItemStyle` — 메뉴 항목 레시피(AnswerCard의 `menuItemStyle`을 옮김).
  `padding 8px 10px · --radius-sm · --text-body · 좌측 정렬`. `className="mt-popover-menuitem"`과
  함께 써야 hover(옅은 sage)가 적용된다(인라인 style만으론 hover를 못 표현해서 CSS 클래스로 낸다).
- 파괴적 항목(삭제 등)은 `{...popoverMenuItemStyle, color: "var(--destructive)"}`.

```jsx
<div style={{ position: "relative" }}>
  <IconButton ref={triggerRef} icon="more-horizontal-circle-01" onClick={() => setOpen(v => !v)} />
  <Popover open={open} onClose={() => setOpen(false)} role="menu" side="bottom" align="end" triggerRef={triggerRef}>
    <button type="button" className="mt-popover-menuitem" style={popoverMenuItemStyle} onClick={handleEdit}>수정</button>
    <button type="button" className="mt-popover-menuitem" style={{ ...popoverMenuItemStyle, color: "var(--destructive)" }} onClick={handleDelete}>삭제</button>
  </Popover>
</div>
```

## ⚠️ 모바일에서는 안 열린다 — 이 컴포넌트가 아니라 화면/카드의 책임

와이어: "공유는 로그인 무관 / PC에서는 클립보드 카피, 모바일에서는 OS공유로 접속 단말에 따라 기능변경".
모바일에서 공유를 누르면 **이 Popover가 아니라 OS 공유**(`navigator.share`)가 떠야 한다.
그 분기는 화면·카드가 정하고, Popover는 "열기"로 결정된 뒤에만 쓰인다 — 이 줄이 없으면 모바일에서
Popover와 OS 공유가 같이 뜬다. 둘 다 안 되는 브라우저는 클립보드 복사 + 토스트(DS-09, 아직 없음).

## 어디에 쓰나

qna-detail(공유·더보기) · mentor-detail(공유) · article-detail(공유).
