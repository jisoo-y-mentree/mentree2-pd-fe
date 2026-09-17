**Badge** — **계열 × leading × 사이즈** 색 시스템.

```jsx
{/* 계열(variant) */}
<Badge>프로덕트 디자이너</Badge>                                  {/* 분류 — 뉴트럴 sage(기본) */}
<Badge variant="status" status="active" leading="dot">진행중</Badge> {/* 상태 — green */}
<Badge variant="status" status="closed">마감</Badge>                 {/* destructive */}
<Badge variant="tag" hue="indigo">디자인</Badge>                     {/* 질적태그 — 9색 */}

{/* leading 슬롯(전 계열 공통): none · dot · flag · avatar */}
<Badge leading="flag" flag="south-korea">대한민국</Badge>
<Badge leading="avatar" avatar={{ name: "박지훈" }}>박지훈</Badge>
```

- **계열 3**: `category`(분류·뉴트럴 sage) · `status`(active=진행중 green · closed=마감 destructive · waiting=대기 · hold=보류 muted) · `tag`(질적태그).
- **질적태그 9색** `hue`: neutral(white)·gray·blue·sky·indigo·amber·rose·purple·teal. 각 hue = 배경 `{hue}-50` · 아웃라인 `{hue}-200` · 라벨 `{hue}-700`(amber 등 밝은 hue는 800). green은 상태(진행중)와 겹쳐 제외, blue는 Biz 파랑과 구분. **실제 태그↔색 매핑은 하지 않는다**(팔레트만).
- **leading**: `none` · `dot`(현재 색) · `flag`(원형 국기, `flag`=소문자·하이픈 국가명 → `assets/flags/{국가명}.svg`) · `avatar`({src,name}). 미등록 국가/로드 실패는 빈 원형 placeholder. 국기는 국가 분류, dot은 상태, avatar는 인물에 주로 쓰지만 슬롯은 공통.
- **size** sm(h24)·md(h28)·lg(h34). 글자는 sm=`--text-micro`(12)·md=`--text-caption`(14)·lg=`14px`(Button과 같은 고정값). **형태** radius 6/8/10px(완전 pill 아님). 라벨은 텍스트(tabular 불필요), hex 금지.

> **DS-GAP** — 국기 파일명은 하이픈 국가명 기반. 개발 단계에서 국가명↔ISO 코드 매핑만 정리하면 됨. 현재 프로토타입용 국가만 등록(australia·belgium·canada·china·denmark·france·germany·hong-kong·italy·japan·malaysia·netherlands·south-korea·sweden·switzerland·taiwan·uae·united-kingdom·united-states).
