---
name: mentree-design
description: mentree를 위한 잘 브랜딩된 화면·자산을 만들 때 사용하는 스킬입니다(프로덕션·프로토타입·목업 모두). 핵심 디자인 가이드, 색·타입·폰트·자산·UI 컴포넌트를 담고 있습니다. mentree는 한국 제품이며 디자인 시스템은 한국어로 만들고 관리합니다.
user-invocable: true
---

이 스킬의 `readme.md`를 먼저 읽고, 나머지 파일도 살펴보세요.

시각 자산(슬라이드·목업·프로토타입 등)을 만들 때는 자산을 복사해 정적 HTML로 만들어 사용자에게 보여줍니다. 프로덕션 코드 작업이라면 여기 자산과 규칙을 익혀 이 브랜드의 전문가로 디자인합니다.

가이드 없이 이 스킬만 호출됐다면, 무엇을 만들지 물어보고 몇 가지 질문을 한 뒤 HTML 산출물 또는 프로덕션 코드를 내는 전문 디자이너로서 작업합니다.

## 빠른 참조
- **베이스:** shadcn/ui, 프리셋 `b4Ea0IP4Ey`(Style Vega, Theme Green, Radius Large). 라이트 단일 테마.
- **전역 CSS:** `styles.css` 링크(→ `tokens/*` import). 모든 것이 CSS 커스텀 프로퍼티 — hex 하드코딩 금지.
- **색:** 배경은 white(`--background`); sage-50 배경 포인트는 Hero·WorldMap 두 섹션만. 카드는 흰색; 크롬/텍스트/경계는 sage; 브랜드 강조(primary/active/chart)는 green.
- **Biz 파랑:** 외부 “기업 서비스(Biz)” 전용 `--biz-*`. 본체 토큰과 절대 혼용 금지 — Biz 진입점/밴드에만.
- **네비게이션:** 제품 기본은 **상단 고정 헤더(`Header`) + 푸터(`Footer`)**. 사이드바 안 씀(`Sidebar`는 참조·레거시). 링크는 `navigation/nav-ia.js`가 SSoT.
- **로고:** mentree 워드마크(`assets/logo/mentree-logo.svg`, canon) — brand-ink `#004418`. on white / on card / reversed on green 3버전.
- **타입:** Pretendard JP Variable만(KR+JP+Latin). 스케일 h1 24 / h2 20 / h3 16 / body 14 / caption 12. 데이터는 `.tabular`.
- **아이콘:** HugeIcons만. HTML에서는 정적 SVG CDN + `.hgi` 마스크 또는 `Icon` 컴포넌트. 이모지/Lucide/Heroicons 금지.
- **禁則:** `word-break: break-all` 금지 → `keep-all` + `overflow-wrap: break-word` 전역 강제.
- **AI 밴드:** 보라/틴트 그라데이션 금지 → sage/green 시맨틱 토큰으로만.
- **컴포넌트:** `window.MentreeDesignSystem_2f86cf` (41개) — Button · IconButton · Icon · Badge · Avatar/AvatarGroup · BookmarkToggle · FilterChip · Input · Field/FieldGroup · Select · Checkbox · RadioGroup · Switch · ToggleGroup · Card(+Header/Title/Description/Content/Footer) · Table · Dialog · Sheet · Header · Footer · SectionHeader · Carousel · CalloutBar · Banner · BottomTabBar · MentorCard · QnaCard · ArticlePreview · InterviewCard · Sidebar(레거시). `components/*/*.prompt.md` 참조.
- **DS-GAP 후보(미구현):** Filter chip, Pagination, Tabs.
- **타입 상단:** display 40 / h0 30 (모바일 24 / 20).
- **브레이크포인트:** Desktop L 1280+ / Desktop S 769–1279(헤더에서 기업 서비스 버튼만 숨김) / Mobile ~768(헤더 축약 + 하단 탭바 4탭). 상세는 `guidelines/03-responsive.md`.
- **컨테이너:** max 1280, 좌우 패딩 24(모바일 16). 배경 풀블리드, 콘텐츠만 1280 정렬.
- **UI kit:** `ui_kits/mentree-top/` — TOP(메인) 화면, canon. `ui_kits/mentree-app-legacy/` — 참조·레거시 앱 셸(canon 아님).
