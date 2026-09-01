**Header** — 제품 기본 상단 네비게이션(**sticky top**). 좌우 3분할: 좌(로고) / 중(메뉴) / 우(액션). 이 제품은 사이드바를 쓰지 않는다(`Sidebar`는 참조·레거시). 푸터는 `Footer`.

```jsx
<Header
  activeKey="mentors"
  authState="guest"
  onNavigate={(item) => go(item)}
  onAuth={() => openAuth()}
/>
```

- **좌 — 로고**: mentree 워드마크 **풀컬러 그린**(헤더는 밝은 배경 → 풀컬러 유지, 푸터 다운과 별개). 클릭 → 홈.
- **중 — 최상위 메뉴 3개**: 멘토 찾기 · Q&A 멘토링 · 멘트리 인사이트(biz 제외). 각 메뉴 좌측 **28px 컬러 아이콘 슬롯** — HugeIcons(모노톤) **아님**, 오리지널 컬러 SVG 이미지 예정(**전역 아이콘 원칙의 명시적 예외**). 지금은 placeholder 슬롯(`menuIcon` url / `menuIconEl`로 주입). **활성 메뉴 = primary green**.
- **우 — 액션(비로그인)**: **회원가입/로그인**을 green 버튼 **하나로 합침**(분리 안 함) + **기업 서비스**(중립 outline 버튼 — 테두리·텍스트 모두 중립 시맨틱 토큰, 외부 ↗·파랑 없음). 공지사항·뉴스는 헤더에 **두지 않음**(푸터에만).
- **상태 분기**: `authState` guest(비로그인) / mentor / mentee. 지금은 **guest만 실제 구현**, mentor·mentee는 분기 자리만(placeholder) — 나중 확정.
- 로고·기업서비스 파란색 외 배경/텍스트는 시맨틱 토큰, 禁則·Pretendard JP 상속.
