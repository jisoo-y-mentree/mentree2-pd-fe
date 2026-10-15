**Tooltip** (DS-77) — 가리키는 요소 하나에 붙는 짧은 설명. **글자만** — 누를 것이 들어가면 `Popover`다.

```jsx
<Tooltip content="프로필 링크 복사"><IconButton icon="link-01" ariaLabel="링크 복사" /></Tooltip>
<Tooltip content="일본 · 도쿄" describe={false}><span role="img" aria-label="일본 · 도쿄" tabIndex={0}>…</span></Tooltip>
```

- **열기**: 마우스 올림 300ms 뒤 · 키보드 포커스(`:focus-visible`) 즉시 · 터치 탭(다시 탭 · 바깥 탭에 닫힘) · Esc 닫기.
- **자리**: `Popover`(DS-74)와 같은 top layer(`popover="manual"`) + 트리거 기준 `fixed`. `side` 쪽 공간이 모자라면 반대로. 스크롤 · 창 크기에 다시 잡고, 트리거가 가려지면 닫는다.
- **이름**: `describe`(기본 true)면 자식에 `aria-describedby`. 자식의 이름이 `content`와 같으면 `describe={false}` — 두 번 읽지 않게.
- **모양**: 면 `--sage-900` · 글자 `--sage-50` · `--text-caption` · `--radius-sm` · 최대 폭 240(넘으면 줄바꿈, 禁則 유지) · 가리키는 쪽 꼬리. `prefers-reduced-motion: reduce`에서 움직이지 않는다.
- `defaultOpen`은 카드 · 문서의 정지 상태 전용.
