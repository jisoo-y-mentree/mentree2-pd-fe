**IconButton** — 툴바·헤더·테이블 행 액션용 정사각 아이콘 전용 버튼.

```jsx
<IconButton icon="search-01" ariaLabel="검색" />
<IconButton icon="more-horizontal-circle-01" variant="ghost" ariaLabel="더보기" />

{/* DS-35 — 켜짐·꺼짐 토글 */}
<IconButton icon="bookmark-02" pressed={saved} onClick={() => setSaved(v => !v)} ariaLabel="스크랩" />
```

- variant `primary | secondary | outline | ghost`(ghost가 기본, 호버 시 sage로 채워짐).
- 크기 `sm | md | lg` = **32 / 40 / 48** — `Button`과 같은 높이. 아이콘 16 / 18 / 20. `Button` 옆에 같은 size로 두면 줄이 맞는다.
- **`pressed`(DS-35)**: 주면 토글 버튼. `false` = outline(card 면 + sage 테두리) · `true` = **반전** — `--sage-900` 면 + 아이콘 `--sage-50` + 테두리 투명(`BookmarkToggle` 선택 값과 같다). `aria-pressed`를 단다. `variant`는 무시된다. 안 주면 이전과 같다.
  - 켜지면 속을 채우는 아이콘: `bookmark-01` · `bookmark-02`(관심있는 멘토 · 스크랩) · `favourite`(도움돼요) — 인라인 SVG 선↔채움. 그 밖의 아이콘은 채움 없이 면만 반전한다.
  - hover(꺼짐 = `--secondary` 틴트 · 켜짐 = brightness 0.92) · active(0.5px 눌림) · focus-visible(`--ring` 2px)은 `BookmarkToggle`과 같다.
- **경계**: 혼자 서는 토글은 켜지면 반전한다 — `BookmarkToggle`(사진 위) · `IconButton pressed`(사진 밖). 메타 줄 안의 토글은 `CountToggle`이고 반전하지 않는다.
  숫자가 붙는 토글은 `CountToggle`, 사진 위 오버레이 토글은 `BookmarkToggle` — 이 토글은 숫자 없는 일반 자리(아티클 좌측 레일 스크랩·도움돼요, 멘토 상세 관심있는 멘토).
- `ariaLabel`은 항상 전달.
