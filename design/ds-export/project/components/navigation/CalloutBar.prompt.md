**CalloutBar** — 배치 컴포넌트. **블리드 풀폭 띠**(화면 폭 꽉 참, 모서리 각짐 `radius 0`). 헤더 위/아래에 붙는 공지·안내·상태·경고 띠. 인라인 둥근 Banner와 구분 — 이건 **각진 풀폭**.

```jsx
<CalloutBar variant="info">7월 4일 새벽 2~4시 정기 점검이 예정되어 있습니다.</CalloutBar>

<CalloutBar variant="warning" align="left"
  linkLabel="자세히 보기" linkHref="/notices/12" onClose={dismiss}>
  일부 결제 수단에서 지연이 발생하고 있습니다.
</CalloutBar>
```

- **레이아웃**: 가로 띠, 얇은 한 줄 기준(min-height 44), **텍스트 2줄까지 허용**(모바일). 정렬 `center`(기본) / `left`. 구성: (아이콘 옵션) + 메시지 + (인라인 링크 "자세히 보기 >", `arrow-right-01`) + (닫기 X, `onClose` 지정 시) — 각각 독립 옵션. 닫기는 항상 오른쪽 끝.
- **variant 4종**(옅은 배경 + 진한 텍스트/아이콘, Badge 50/700 레시피 상속):
  - `info` — sage 중립(`sage-50` / `sage-700`), 가장 조용한 기본.
  - `success` — green(옅은 primary tint / 진한 primary).
  - `warning` — amber(Badge amber 규칙 상속, 라벨 800 대비 보정).
  - `error` — destructive red(옅은 배경 / 진한 red).
- 풀폭이라 배경 면적이 커 옅은 색도 존재감이 큼 — error가 과하면 톤 낮출 여지(일단 옅은 배경 레시피). **테두리선 없음 — 배경색(옅은 variant 색)만으로 경계 표현.** hex 금지·시맨틱/`--badge-*` 토큰만, HugeIcons, 禁則 유지.
