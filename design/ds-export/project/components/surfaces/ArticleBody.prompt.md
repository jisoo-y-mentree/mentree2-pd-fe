# ArticleBody (DS-56)

아티클 상세와 멘토 상세 인터뷰 탭이 **같은 글을 같은 폭으로** 그리는 본문. 화면이 본문을 조립하지 않는다.

```jsx
<ArticleBody
  badges={[{ type: "keyword", label: "이직" }, { type: "country", label: "일본", flag: "japan" }]}
  title="도쿄에서 5년, 디자이너로 살아남기"
  date="2026-09-20"
  blocks={[
    { type: "h2", id: "s1", text: "처음 1년" },
    { type: "p", content: ["비자는 ", { mark: "회사가 스폰서가 되는 경우" }, "가 대부분이다. ", { link: "출입국재류관리청", href: "https://www.moj.go.jp/isa/" }, "에서 확인한다."] },
    { type: "figure", src: "/img/tokyo.jpg", alt: "사무실 전경", caption: "시부야 사무실" },
  ]}
/>
```

## 폭
- `max-width: 720px; width: 100%`. **스스로 가운데 정렬하지 않는다** — 아티클 상세는 3단 격자의 가운데, 멘토 상세는 오른쪽 열에 놓는 쪽이 정한다.

## 머리(선택) — 가운데 정렬 · 세로 간격 16
- `badges` → `Badge md`. **국가(`leading="flag"`) → 키워드** 순서로 정렬해서 선다.
- `title` → `h1` · `--text-display` · 600 · 토큰 줄높이·자간.
- `date` → `YYYY.MM.DD` · `--text-caption` · `--muted-foreground` · tabular-nums.
- 머리와 본문 사이 40.

## blocks
- `h2` — `--text-h2` 600 · 위 40 · 아래 16 · **첫 블록이면 위 0** · `id` 그대로(목차 앵커) · `scroll-margin-top: var(--article-anchor-offset, 104px)`.
- `p` — `--text-article` + 줄높이·자간 토큰 · 아래 24. `content`는 문자열 또는 조각 배열 `["글", { mark: "강조" }, { link: "글", href }]`.
- `figure` — 폭 100% · 16:9 · cover · `--radius-md` · 아래 24. 캡션 위 8 · `--text-caption` muted. 이미지 실패 시 sage placeholder(`ArticlePreview`와 같음).
- 마지막 블록은 아래 여백 0.

## 조각
- **mark** — 배경 `--highlight` · 글자색 상속 · 좌우 2px · `box-decoration-break: clone`(두 줄에 걸쳐도 배경이 끊기지 않는다).
- **link** — `--primary` + 밑줄. hover에서 진해진다. 바깥 주소면 새 창(`target="_blank" rel="noopener"`).

## 반응형
- 본문 글자 크기는 모든 폭에서 같다(`--text-article`은 고정 토큰). 제목만 `--text-display`의 모바일 값(26)을 따른다.
