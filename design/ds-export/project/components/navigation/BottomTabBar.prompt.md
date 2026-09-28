# BottomTabBar

```jsx
<BottomTabBar activeKey="mentors" authState="guest" onNavigate={nav} onAuth={promptLogin} />

{/* DS-55 — 신청 바를 얹고 스크롤로 탭 줄만 숨긴다 */}
<BottomTabBar
  activeKey="mentors"
  hideOnScroll
  accessory={
    <div style={{ display: "flex", gap: 8 }}>
      <Button size="lg" style={{ flex: 1 }}>1:1 멘토링 신청하기</Button>
      <IconButton size="lg" icon="bookmark-02" pressed={saved} onClick={toggle} ariaLabel="관심있는 멘토" />
      <IconButton size="lg" icon="share-08" variant="outline" ariaLabel="공유" />
    </div>
  }
/>
```

- Mobile(~768) 전용 하단 고정 탭 네비. Desktop L/S(769+)에선 CSS로 숨김.
- 4탭(아이콘 위 + 라벨 아래): 멘토 찾기 `user-search-01` · Q&A 멘토링 `quiz-05` · 멘트리 인사이트 `news` · MY 멘트리 `user-circle-02`. HugeIcons **모노** — 헤더 오버레이(컬러 SVG)와 별개 UI.
- 높이 56, 풀블리드 fixed, iOS safe-area(`env(safe-area-inset-bottom)`) 하단 여백. 배경 frosted glass(white 반투명 + backdrop blur) + 상단 sage hairline.
- 활성 = 아이콘+라벨 primary green / 비활성 = muted-foreground. 라벨 `--text-micro`(12) — caption(14)이 아니라 micro다, 56 높이에 아이콘과 함께 들어가는 크기.
- MY 멘트리: guest는 `onAuth` 로그인 유도 자리만 — 로그인 후 동작은 OPEN #9.

## DS-55 — accessory · hideOnScroll · scrollContainer

셋 다 안 주면 이전과 같다.

- **구조**: 고정 컨테이너 하나 = `[accessory 칸][탭 줄 56][safe-area]`. frosted 배경·상단 hairline은 컨테이너 전체에 한 번. accessory 안쪽 여백 `8px 16px`.
  두 바를 따로 두지 않는다 — 움직일 때 사이가 벌어진다.
- **hideOnScroll**
  - 아래로 8px 이상 + 스크롤 위치 > 56 → 컨테이너 `translateY(56px)`. 탭 줄은 화면 밖, accessory는 safe-area 바로 위.
  - 위로 8px 이상 → 원위치. 스크롤 위치 ≤ 56 → 원위치.
  - 탭 줄에 키보드 포커스가 들어오면 원위치(포커스가 있는 동안 숨지 않는다).
  - 숨은 동안 탭 줄 `inert`.
  - `transform` 200ms ease-out. 탭 줄은 `opacity`도 함께 0 — safe-area가 있는 기기에서 탭 줄 윗부분이 safe-area 띠에 비치지 않게. 둘 다 레이아웃을 건드리지 않는다.
  - `prefers-reduced-motion: reduce` → 애니메이션 없이 바로.
- **scrollContainer**: 기본 `window`. 엘리먼트나 ref. 카드 데모(폰 틀 안 스크롤)용이다.
- **`--mt-bottom-bar-height`**: 컨테이너 높이(accessory + 56, safe-area 제외)를 `document.documentElement`에 쓴다. 숨김과 무관한 **고정값**(스크롤 중 본문 여백이 안 흔들린다). accessory 높이가 바뀌면 다시 쓰고(ResizeObserver), 언마운트 시 지운다.
  769+에서는 부품이 숨으므로 **모바일 미디어쿼리 안에서만** 쓴다:
  `@media (max-width:768px){ main{ padding-bottom: calc(var(--mt-bottom-bar-height, 56px) + env(safe-area-inset-bottom, 0px)); } }`
