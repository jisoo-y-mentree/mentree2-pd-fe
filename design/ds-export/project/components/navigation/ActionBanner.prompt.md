# ActionBanner (DS-34)

**`Banner`와 다르다.** `Banner`는 배경·효과가 자유인 프로모 슬롯이다.
`ActionBanner`는 **모양이 고정**인 「문구 + 버튼」 유도 배너다 — 면·글자·버튼을 화면이 바꾸지 않는다.

```jsx
<ActionBanner title="이 분야 멘토에게 직접 물어보세요" actionLabel="멘토 찾기" href="/mentors" />

<ActionBanner
  layout="stacked"
  title="이 멘토와 직접 이야기 나누고 싶나요?"
  description="1:1 멘토링을 통해 자세한 커리어 히스토리와 본인의 고민거리를 물어보세요."
  actionLabel="1:1 멘토링 신청하기"
  onAction={openApply}
/>
```

- 쓰는 곳(3화면): Q&A 상세 멘토 유도 · 아티클 상세 카테고리별 CTA · 멘토 상세 탭 끝 CTA.
- **면**: 배경 `--green-100`(DS-98 · Figma Q&A 개정판 `1647:50863`과 같다) · 테두리 1px `--primary` · `--radius-lg` · 안쪽 여백 24 32.
- **title** `--text-h3` 600 · **description** `--text-body` `--sage-700` · 둘 사이 4. (`--muted-foreground`는 `--green-100` 위 3.82:1로 모자라다 — `--sage-700`은 8.87:1.)
- **inline**(기본): 왼쪽 문구 · 오른쪽 `Button primary md` · 간격 24 · 세로 가운데.
- **stacked**: 가운데 정렬 · 문구 아래 `Button primary lg` · 간격 16.
- **≤768**: `inline`이어도 `stacked`로 · 안쪽 여백 20 · 버튼 폭 100%(높이 48).
- 버튼: `href` 또는 `onAction`. `href`는 버튼 클릭 시 이동한다 — `Button`이 링크형(`<a>`)을 갖지 않기 때문이다. `onAction`에서 `preventDefault()`하면 이동하지 않는다.
- 폭은 부모를 채운다(`width: 100%`).
