**Sidebar** — 앱 네비게이션 레일. `sidebar-*` 토큰을 쓰며 활성 항목은 초록(`sidebar-primary`)으로 채워진다.

> ⚠ **참조용 · 레거시.** 이 제품은 사이드바를 기본 네비게이션으로 쓰지 **않는다**.
> 제품 기본 네비게이션은 상단 고정 헤더(`Header`) + 푸터(`Footer`)다. Sidebar는 과거
> 앱 셸 참조용으로만 남겨둔 것이니 새 화면의 canon으로 쓰지 말 것.

```jsx
<Sidebar
  active={route} onSelect={setRoute}
  header={<img src="…/mentree-logo.svg" height={22} />}
  items={[
    { key: "home", label: "홈", icon: "home-01" },
    { key: "sessions", label: "멘토링", icon: "mentoring", badge: 3, section: "활동" },
  ]}
/>
```

`section`으로 그룹화, `badge`는 카운트. (레거시 API — 유지보수만.)
