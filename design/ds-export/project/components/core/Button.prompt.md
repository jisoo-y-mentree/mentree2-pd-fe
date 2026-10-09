**Button** — 기본 액션 컨트롤. 폼 제출, 다이얼로그 확인, CTA에 사용.

```jsx
<Button variant="primary" iconLeft="add-01">멘토 찾기</Button>
<Button variant="outline">취소</Button>
```

variant: `primary`(초록), `secondary`(sage), `outline`(흰색+경계), `ghost`(민무늬), `destructive`(레드). 크기 `sm | md | lg` — 높이 32/40/48, 좌우 패딩 14/20/28. **`ghost`만 좌우 패딩이 0이다**(면도 테두리도 없고 hover에도 면이 안 뜨므로 아무것도 없는 곳에 여백이 붙어 있었다 — `md` 「전체보기」가 116px 중 34%가 여백이었다). 높이·글자·아이콘·gap은 그대로여서 터치 타겟은 안 줄어든다. `iconLeft`/`iconRight`는 HugeIcons 이름. 라운드 `--radius-md`; 호버 시 살짝 어두워지고 프레스 시 0.5px 내려간다.

## tone="primary" (DS-81)

`tone`(기본 `neutral`)은 **`outline` · `ghost`에만** 먹는다. primary · secondary · destructive는 무시한다.
- `outline` + `tone="primary"` — 흰 바탕 · 1px `--primary` 경계 · `--primary` 글자와 아이콘 · hover 면 `--green-50`. 예: 「이어서 보기」.
- `ghost` + `tone="primary"` — 면 · 경계 없음 · `--primary` 글자와 아이콘 · hover 밑줄. 예: 「더보기」 `iconRight="arrow-down-01"` · 「접기」 `arrow-up-01` · 「모두 보기」.
- 포커스 · 비활성 · 치수는 다른 변형과 같다. `secondary`는 고치지 않는다.
