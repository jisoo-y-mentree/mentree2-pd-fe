**Dialog** — 확인·짧은 폼용 중앙 모달. dim sage 스크림 + 은은한 블러 위에 렌더; 페이드 + 팝(~150ms).

```jsx
<Dialog open={open} onClose={close}
  title="멘토링 취소" description="이 작업은 되돌릴 수 없습니다."
  footer={<><Button variant="ghost" onClick={close}>닫기</Button><Button variant="destructive">취소하기</Button></>}>
  정말 이 세션을 취소하시겠어요?
</Dialog>
```

스크림이나 ✕로 닫힘. 사이드 패널은 `Sheet`를 사용.
