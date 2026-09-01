**Sheet** — 필터·상세 패널·모바일 메뉴용, 가장자리에서 슬라이드되는 드로어.

```jsx
<Sheet open={open} onClose={close} side="right" title="필터"
  footer={<Button fullWidth>적용</Button>}>
  …필터 컨트롤…
</Sheet>
```

`side` = `left | right | top | bottom`. 본문 스크롤; 경계 있는 헤더/푸터. 슬라이드 ~200ms.
