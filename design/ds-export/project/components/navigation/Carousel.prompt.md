**Carousel** — 배치 컴포넌트. 카드를 가로로 나열하는 **범용 스크롤/스냅 컨테이너**(담기는 카드 종류 고정 안 함). 데스크톱 기본 거동만 — 리스폰시브 peek/페이드/모바일은 범위 밖.

```jsx
const car = React.useRef(null);
const [edges, setEdges] = React.useState({ atStart: true, atEnd: false });

<SectionHeader
  title="이달의 인터뷰"
  carousel
  onPrev={() => car.current.scrollPrev()}
  onNext={() => car.current.scrollNext()}
  prevDisabled={edges.atStart}
  nextDisabled={edges.atEnd}
/>
<Carousel ref={car} gap={16} onEdgeChange={setEdges}>
  <InterviewCard style={{ width: 360 }} … />
  <InterviewCard style={{ width: 360 }} … />
  …
</Carousel>
```

- **조작부 없음**: 좌우 화살표는 `SectionHeader`가 담당(별개 컴포넌트, 화면에서 조합). Carousel은 스크롤/스냅 로직만.
- **gap**: Carousel이 고정하지 않고 prop으로 열어둠. 기본 16, 사용처에서 카드 종류에 맞춰 오버라이드(예: 인터뷰 16).
- **표시 개수**: 컨테이너 폭에 맞춰 유동(고정 개수 아님). 카드에 폭을 주면 흐른다.
- **끝 처리(데스크톱 기본)**: 1280 충족 시 끝에서 딱 멈춤.
- **mode**: `snap-fit`(기본) = 카드가 컨테이너 폭에 딱 떨어짐(잘림 없음) · `peek` = 마지막 카드가 의도적으로 걸침(N+1, "더 있음" 강조).
- **페이드**: 콘텐츠가 컨테이너 폭을 넘칠(overflow) 때 우측 끝에 white 배경 페이드, 스크롤이 시작이 아니면 좌측에도. peek는 1280에서 이미 overflow → 페이드 상시, snap-fit은 1280에서 딱 맞아 overflow 없음 → 페이드 없음. (폭 축소 반응은 범위 밖.)
- **스크롤·스냅**: 자유 스크롤 + 카드 1장 단위 스냅(손 스크롤 정렬). 화살표 이동 단위는 이와 **별개** — 현재 표시 개수(컨테이너 폭 ÷ (카드폭+gap))만큼 = **한 페이지 넘기기**(4개 보이면 4장, 3이면 3장). `snap="unit"`이면 1단위(표시 개수=1단위, 예: 인터뷰 featured 1 + compact 2) 구성만큼 이동.
- **화살표 연동**: `ref`(CarouselHandle)의 `scrollPrev/scrollNext`(한 페이지 이동), 끝 도달은 `onEdgeChange({atStart, atEnd})` → SectionHeader 화살표 disabled.
