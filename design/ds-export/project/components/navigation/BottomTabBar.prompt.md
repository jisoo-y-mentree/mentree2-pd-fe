# BottomTabBar

```jsx
<BottomTabBar activeKey="mentors" authState="guest" onNavigate={nav} onAuth={promptLogin} />
```

- Mobile(~768) 전용 하단 고정 탭 네비. Desktop L/S(769+)에선 CSS로 숨김.
- 4탭(아이콘 위 + 라벨 아래): 멘토 찾기 `user-search-01` · Q&A 멘토링 `quiz-05` · 멘트리 인사이트 `news` · MY 멘트리 `user-circle-02`. HugeIcons **모노** — 헤더 오버레이(컬러 SVG)와 별개 UI.
- 높이 56, 풀블리드 fixed, iOS safe-area(`env(safe-area-inset-bottom)`) 하단 여백. 배경 frosted glass(white 반투명 + backdrop blur) + 상단 sage hairline.
- 활성 = 아이콘+라벨 primary green / 비활성 = muted-foreground. 라벨 `--text-micro`(12) — caption(14)이 아니라 micro다, 56 높이에 아이콘과 함께 들어가는 크기.
- MY 멘트리: guest는 `onAuth` 로그인 유도 자리만 — 로그인 후 동작은 OPEN #9.
