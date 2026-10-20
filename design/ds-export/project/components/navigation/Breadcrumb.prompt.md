# Breadcrumb

목록에서 상세로 들어온 사람을 목록으로 되돌린다. 쓰는 곳은 2화면 — `qna-detail`(「Q&A 목록 › 상세」) ·
`article-detail`(「멘트리 인사이트 › 상세」).

## 구조

- **깊이는 2단이 전부다.** 3단 이상이 필요한 화면이 지금 없다. `items`로 받아 열지만 화면에서 3단을
  만들지 않는다.
- **마지막 항목은 링크가 아니다.** `<span aria-current="page">`다. 지금 있는 곳을 다시 누르게 하지 않는다
  — `items`의 마지막은 `href`를 넘겨도 무시하고 현재 페이지로 렌더한다. 부품이 강제한다, 화면마다 지키게
  두면 갈린다.
- 구분자는 `Icon name="arrow-right-01" size={14}` — `CalloutBar`가 쓰는 것과 같은 아이콘. 문자
  `/`·`>`를 직접 쓰지 않는다.
- 본문 블록의 맨 위, 제목 바로 위에 선다.

## 형태

- 타이포 `--text-caption` · `fontWeight: 400`. 제목보다 확실히 작아야 한다 — 위치 표시이지 읽을 것이 아니다.
- 링크 `--muted-foreground`, hover에서 `--foreground`.
- 현재 페이지 `--foreground` · `fontWeight: 500`.
- 구분자 `--muted-foreground` · `opacity: 0.6`.
- 항목 사이 `gap: 6`.
- 면·테두리·배경 없음 — 텍스트 줄 하나.

## 긴 제목

상세 제목은 길다. 그대로 두면 모바일에서 두세 줄이 된다.

- 현재 페이지 라벨이 한 줄을 넘으면 **말줄임**(`ellipsis`·`nowrap`·`overflow:hidden`) — 줄바꿈하지 않는다.
- 앞의 링크 항목은 말줄임하지 않는다 — 「Q&A 목록」·「멘트리 인사이트」로 짧다.
- 전체가 화면 폭을 넘으면 **현재 페이지만 줄어든다**(`flex:1 1 auto`+`minWidth:0`). 링크는
  `flex:0 0 auto`로 안 줄어든다.

되돌아갈 링크를 먼저 지킨다 — 이 부품의 일이 그것이다.

## 접근성

- 루트는 `<nav aria-label="경로">` + 안에 `<ol>`·`<li>`.
- 현재 페이지에 `aria-current="page"`.
- 구분자는 `aria-hidden="true"` — 스크린리더가 「오른쪽 화살표」를 항목마다 읽지 않게 한다.
- 링크는 `<a>`다. `onClick`만 달린 `<div>`로 만들지 않는다.

## 상태

`default · hover · focus-visible`

- hover: 링크 색만 바뀐다. 밑줄을 넣지 않는다 — 줄이 작아서 밑줄이 글자를 먹는다.
- focus-visible: `--ring`. 다른 부품과 같다.
- disabled 없음 — 경로는 비활성되지 않는다.

```jsx
<Breadcrumb items={[
  { label: "Q&A 목록", href: "/qna" },
  { label: question.title },
]} />
```

## 만들지 않는 것

홈 아이콘 항목(헤더 로고가 그 일을 한다) · `…`로 접는 3단 이상 · 드롭다운으로 형제 항목 보기 · size 2종.
