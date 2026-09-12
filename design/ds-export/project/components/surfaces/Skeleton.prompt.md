# Skeleton

데이터를 기다리는 동안 자리를 잡아두는 **회색 덩어리 하나**. `surfaces`에 있지만 카드가 아니다.

와이어프레임 3장(`mentor-search` · `qna-feed` · `article-detail`)이 「로딩: 스켈레톤 UI」를 명시한다. `qna-feed`의 4상태 중 「로딩」이 이 부품이다.

## 스피너를 쓰지 않는다

스피너는 무엇이 올지 알려주지 않고, 도착하는 순간 화면이 한 번 더 흔들린다.

## 프리미티브 하나로 쓴다

**`SkeletonCard` 같은 모양 부품을 만들지 마세요.** 화면마다 배치가 다르다. Skeleton은 덩어리 하나고, 형태는 화면이 그것을 배치해서 만든다.

```jsx
// QnaCard 자리를 흉내내는 것은 화면의 일이다
<div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
  <Skeleton width={72} height={22} radius="md" />
  <Skeleton height={20} />
  <Skeleton count={3} />
  <div style={{ display: "flex", gap: 8, alignItems: "center" }}>
    <Skeleton width={28} height={28} radius="full" />
    <Skeleton width={120} />
  </div>
</div>
```

## props

| prop | 기본 | 비고 |
|---|---|---|
| `width` | `"100%"` | 숫자(px)나 문자열 |
| `height` | 본문 한 줄 높이 | 숫자(px)나 문자열 |
| `radius` | `"sm"` | `"sm"` · `"md"` · `"full"`(아바타 자리) |
| `count` | `1` | 2 이상이면 줄 간격을 두고 쌓이고 **마지막 줄은 폭 60%**(문단의 끝처럼) |

## 움직임

은은한 펄스 하나만. **좌우로 훑는 shimmer는 쓰지 않는다** — 한 화면에 카드 12장이 깔리는데 12개가 동시에 훑으면 시끄럽다. `prefers-reduced-motion`이 켜져 있으면 멈추고 정지 상태로 둔다.

## 색

`--muted`만. 채도를 쓰지 않는다. 실제 콘텐츠보다 눈에 띄면 안 된다.

## 접근성 — 화면이 할 일

Skeleton은 스스로 `aria-hidden="true"`를 단다(스크린리더가 회색 덩어리를 읽을 이유가 없다).

**감싸는 영역에 `aria-busy="true"`를 두는 것은 화면의 일이다.**

```jsx
<section aria-busy={loading}>
  {loading ? <Skeleton count={3} /> : <QnaList items={items} />}
</section>
```

## 몇 개를 세우나 — 부품이 정하지 않는다

화면 사양이 정한다. 예: Q&A 피드는 그 페이지가 실을 카드 수와 같게 — 1페이지 6장, 2페이지부터 12장. 이 규칙을 부품에 넣지 마세요.
