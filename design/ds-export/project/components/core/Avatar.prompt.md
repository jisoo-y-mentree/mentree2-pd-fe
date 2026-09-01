**Avatar / AvatarGroup** — 원형 아바타와 겹침 그룹. [DS-GAP — shadcn 기본 아님]

```jsx
<Avatar name="박지훈" size="md" />                    {/* 이니셜 fallback */}
<Avatar src="/u/1.jpg" name="김도윤" size="lg" />      {/* 이미지, 실패 시 이니셜 */}

<AvatarGroup
  size="sm" max={4}
  items={[{ name:"박지훈" }, { src:"/u/2.jpg", name:"김도윤" }, { name:"이서연" }, { name:"John Doe" }, { name:"최유진" }]}
/>  {/* 5명 중 4명 노출 + "+1" 칩 */}
```

- **Avatar**: 이미지가 있으면 표시, 없거나 실패하면 이니셜(sage-100 배경 / sage-700 텍스트). 로딩 전엔 sage placeholder. 크기 `xs`(20)·`sm`(24)·`md`(32)·`lg`(40) 또는 px 숫자.
- **AvatarGroup**: 음수 마진으로 겹치고 각 아바타에 흰색 링(`--card`)으로 분리. `max` 초과분은 마지막 자리에 sage `+K` 칩(`.tabular`).
- 재사용처: Q&A 카드, 지도 팝오버, 세션/멘토링 목록.
