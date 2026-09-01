**Button** — 기본 액션 컨트롤. 폼 제출, 다이얼로그 확인, CTA에 사용.

```jsx
<Button variant="primary" iconLeft="add-01">멘토 찾기</Button>
<Button variant="outline">취소</Button>
```

variant: `primary`(초록), `secondary`(sage), `outline`(흰색+경계), `ghost`(민무늬), `destructive`(레드). 크기 `sm | md | lg`. `iconLeft`/`iconRight`는 HugeIcons 이름. 라운드 `--radius-md`; 호버 시 살짝 어두워지고 프레스 시 0.5px 내려간다.
