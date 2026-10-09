**Dialog** — 확인·짧은 폼·편집 모달. dim sage 스크림 + 은은한 블러 위에 렌더; 페이드 + 팝(~150ms).

```jsx
<Dialog open={open} onClose={close}
  title="멘토링 취소" description="이 작업은 되돌릴 수 없습니다."
  footer={<><Button variant="ghost" onClick={close}>닫기</Button><Button variant="destructive">취소하기</Button></>}>
  정말 이 세션을 취소하시겠어요?
</Dialog>

{/* DS-69 — 편집 모달: 쌓는 푸터 + 모바일 전체 화면 */}
<Dialog open={open} onClose={askDiscard} title="커리어" mobile="fullscreen" footerLayout="stack"
  footer={<><Button fullWidth onClick={save}>수정하기</Button><Button variant="ghost" size="sm" onClick={remove}>커리어 삭제</Button></>}>
  …칸 9개…
</Dialog>
```

- **긴 본문**: 머리(제목 + ✕ + 설명)와 푸터는 고정, 본문만 스크롤. 모달 높이 ≤ 창 높이 − 48(위아래 24). 머리 아래 hairline(`--border`) 하나. 푸터 위 hairline은 본문이 푸터 밑으로 이어질 때만 — 끝까지 내리면 없어진다.
- **닫기**: Esc · 스크림 · ✕ → `onClose`. **닫을지는 화면이 정한다** — `open`을 `true`로 두면 모달은 남는다(편집 중 내용을 묻는 화면). 안에 열린 목록(`Select` · `MultiSelect`)이 있으면 Esc는 목록만 닫는다.
- **포커스**: 열리면 모달 안에 가둔다 — 첫 입력 칸, 없으면 ✕. `mobile="fullscreen"`이 ~768에서 열리면 **제목**(`tabIndex={-1}`, 포커스 링 `--ring`) — 소프트 키보드가 바로 올라오지 않게. 닫히면 연 요소로 돌려준다.
- **스크롤 잠금**: 열리면 뒤 페이지를 잠근다 — `body`를 fixed로 두고 `top`을 −scrollY로(iOS Safari 포함), 스크롤바 폭만큼 오른쪽 여백. 닫히면 풀고 스크롤 위치를 되돌린다. 둘 이상 열려 있으면 마지막이 닫힐 때 푼다.
- **안의 목록**: `Select` · `MultiSelect`의 목록은 `Popover`(DS-74)라 top layer에 뜬다 — 본문 끝에서 잘리거나 푸터 밑에 묻히지 않는다.
- **`footerLayout`**: `"end"`(기본) 오른쪽 정렬 · `"stack"` 세로 — 첫 버튼(primary)은 폭 전체, 그 아래(ghost sm)는 가운데.
- **`mobile`**: `"center"`(기본) · `"fullscreen"` — ~768에서 화면 전체, 반경·스크림 없음, ✕는 머리에, 푸터는 바닥 + safe-area. 소프트 키보드가 올라오면 푸터가 키보드 위에 남는다(`visualViewport`). 뒤로가기 → `onClose`(열 때 기록 하나를 쌓고, 화면이 닫지 않으면 다시 쌓는다).

사이드 패널은 `Sheet`를 사용.
