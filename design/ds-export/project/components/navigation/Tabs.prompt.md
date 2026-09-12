# Tabs

같은 셸 안에서 **내용을 바꾸는 전환**. 화면을 떠나지 않는다.
쓰는 곳: 멘토 상세 4탭 · 마이페이지 9~10탭 · Q&A 피드 2탭 · Q&A 상세 · 아티클 목록.

## ToggleGroup과의 경계

- **ToggleGroup** — 같은 목록의 **조건**을 바꾼다. "답변 완료된 질문 / 답변 기다리는 질문". **면을 채운다.**
- **Tabs** — **내용 자체**가 바뀐다. "결제 내역 / 알림 설정". **밑줄을 긋는다.**

이 시각 차이가 두 부품을 구별하는 유일한 신호다 — Tabs는 선택 탭에 면을 채우지 않는다.

## 형태

- 탭 줄 아래 1px 헤어라인(`--border`), 선택 탭에만 **2px `--primary` 밑줄**(헤어라인 위에 겹친다).
- 라벨 body/500, 선택 시 600 + `--foreground`. **색만으로 가르지 않는다**(WCAG 1.4.1 — 밑줄 + 굵기 + 색).
- 높이 42, 좌우 패딩 12.

## 카운트 배지

`count`를 넘기면 라벨 뒤에 **Badge sm**. 넘기지 않으면 붙지 않는다. 배지는 눌리지 않는다.

- 선택 탭 — `variant="status" status="active"`(green tint)
- 미선택 탭 — 분류(뉴트럴 sage)

선택/미선택의 배지 색이 같으면 어느 탭이 선택됐는지 흐려진다.

## 폭이 넘칠 때

탭이 10개면 한 줄에 안 들어간다. **줄바꿈하지 않는다** — 두 줄이 되면 셸의 높이가 탭 수에 따라 변한다.

- 가로 스크롤(`overflow-x: auto`, `flex-wrap: nowrap`).
- 스크롤바는 감추고, 스크롤 여지가 있는 쪽 **가장자리에 페이드**를 둔다(더 있다는 신호, 클릭은 막지 않는다).
- 선택 탭이 화면 밖이면 컨테이너를 움직여 보이는 자리로 스크롤한다.

## 키보드·접근성

WAI-ARIA tabs 패턴. `role="tablist" / "tab" / "tabpanel"`, `aria-selected`, `aria-controls`.

- ←/→ 로 탭 이동(양끝에서 순환, `disabled` 탭은 건너뛴다) · Home/End 로 처음·끝.
- **roving tabindex** — 선택된 탭만 Tab 키 순서에 들어간다.
- 패널은 `TabPanel`이 `id`/`aria-labelledby`를 맞춰 낸다(같은 `idBase`를 넘긴다).

## 상태

`default · hover · selected · focus-visible(--ring) · disabled`

## 제어형

`value` + `onChange(next)`. URL에 담는 화면이 있어 부모가 상태를 가진다.

```jsx
const [tab, setTab] = React.useState("questions");

<Tabs
  idBase="mypage"
  ariaLabel="마이페이지"
  value={tab}
  onChange={setTab}
  items={[
    { value: "questions", label: "내가 질문한", count: 12 },
    { value: "answers", label: "받은 답변", count: 34 },
    { value: "scraps", label: "스크랩" },
    { value: "payments", label: "결제 내역", disabled: true },
  ]}
/>
<TabPanel idBase="mypage" value={tab}>…</TabPanel>
```
