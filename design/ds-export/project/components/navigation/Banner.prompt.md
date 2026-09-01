**Banner** — 인라인 둥근 프로모/유도 블록(페이지 흐름 중간 삽입). CalloutBar(각진 풀폭 공지)와 구분 — 이건 **둥근 인라인 프로모**. 목적은 "눈에 띄기"라 내부 표현을 엄격히 규정하지 않는 **"자유 영역(slot)"** 컴포넌트다.

```jsx
{/* 진한 브랜드 배경 + 제목/부제 + 우측 CTA */}
<Banner href="/events/1" background="var(--primary)" style={{ color: "var(--primary-foreground)" }}>
  <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", gap: 16 }}>
    <div>
      <div style={{ fontSize: "var(--text-h3)", fontWeight: 600 }}>첫 멘토링 30% 할인</div>
      <div style={{ opacity: 0.85 }}>지금 신청하고 커리어를 시작하세요</div>
    </div>
    <Button variant="secondary">신청하기</Button>
  </div>
</Banner>
```

- **고정(외곽 최소 규칙만)**: `radius 22`(`--card-radius`, 카드와 같은 표면 언어 — 이것만은 통일해 시스템 소속감) · 인라인(콘텐츠 max-width 안, 좌우 여백) · 기본 패딩 16(콘텐츠에 따라 가변) · 기본 전체 클리커블(`href`/`onClick`; 내부 CTA 자유) · **전역 뼈대 상속 필수(Pretendard JP · 禁則 · 시맨틱)**.
- **자유(스펙 고정 안 함)**: 배경(`background` — 팔레트 벗어난 과감한 색·그라데이션 허용) · 표현 효과(그라데이션 아웃라인·흐르는 라인 애니메이션·텍스트/아이콘 전환 등, 옵션) · 레이아웃/높이/CTA(유무·위치·개수 자유). **variant 없음** — 매번 다르게.
- Banner의 "자유"는 **배경·효과에 한한다**. 폰트·禁則·radius 뼈대는 반드시 상속. 내부 색/레이아웃은 `children`·`style`로 구성.
