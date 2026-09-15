# mentree — 디자인 시스템

**mentree**를 위한 밝고 따뜻한 단일 테마 디자인 시스템입니다. 한국에서, 한국인이, 한국 제품을 위해 만들며 **한국어로 만들고 관리**합니다. **shadcn/ui**(프리셋 `b4Ea0IP4Ey` — Style *Vega*, Theme *Green*, Radius *Large*) 위에 세 가지 델타를 얹습니다.

- **뉴트럴 크롬**을 Mist에서 저채도 **Sage** 스케일로 교체.
- **배경**은 모든 화면에서 **white**. sage-50 배경 포인트는 Hero·WorldMap 두 섹션만.
- **타입**은 **Pretendard JP Variable**(KR + JP 글리프 안정).
- **아이콘**은 **HugeIcons**.

프리셋의 **Green** 브랜드 토큰(`primary`, `accent`, `chart-*`, `sidebar-primary`, `destructive`, `radius`)은 그대로 유지합니다. 라이트 단일 테마.

> **토큰은 확정입니다.** sage/green, 타입스케일, 禁則, HugeIcons, tabular, radius/elevation/spacing 토큰은 정확하니 그대로 둡니다. 이 문서와 컴포넌트는 그 위의 **레이어(네비게이션·브랜드·컴포넌트 위생)** 만 다룹니다.

---

## 제품 기본 네비게이션 — 상단 헤더 + 푸터 (사이드바 아님)

**이 제품은 사이드바를 쓰지 않습니다.** 기본 네비게이션은 상단에 붙는 **일반 sticky top bar**(`Header`)입니다 — 플로팅이 아니라 여백/라운드/블러 없이 상단에 그대로 붙습니다. 하단은 **`Footer`** 로 마감합니다.

- `Sidebar` 컴포넌트와 사이드바/대시보드 앱 셸(`ui_kits/mentree-app`)은 **참조용·레거시**입니다. canon으로 쓰지 마세요.

### 네비게이션 IA — 헤더·푸터 공통 소스(SSoT)

링크·라벨의 단일 소스는 **`components/navigation/nav-ia.js`** 하나입니다. 헤더와 푸터가 이 파일을 공통 참조하므로, 바꿀 때는 여기만 고칩니다.

- **최상위:** 멘토 찾기 · Q&A 멘토링 · 멘트리 인사이트 · **기업 서비스(Biz)**
- **인증:** 회원가입 · 로그인
- **부가:** 공지사항 · 뉴스
- **하위 상세(네비게이션 비노출):** 멘토 상세 · Q&A 상세 · 아티클 상세 · 이벤트 상세 · 나의 성향 분석

> **기업 서비스(Biz)** 는 mentree 본체가 아니라 **외부 사이트로 나가는 출구 링크**입니다. 내부 페이지처럼 다루지 말고 외부 이탈 진입점으로 취급합니다(`external` + 외부 링크 표시).

---

## 브랜드 자산

- **로고:** mentree 워드마크(**`assets/logo/mentree-logo.svg`**, canon). 잎사귀 글리프 + “mentree” 워드마크, **brand-ink `#004418`**. 사용 규칙 3버전 — on white / on card(white) / reversed on `--primary`(green). 화면의 로고 자리는 이 로고를 쓴다.
- **`--brand-ink` (`#004418`):** canon. 로고 워드마크 잉크색.
- **컬러 3D 아이콘(히어로/메뉴):** ⚠ provisional placeholder. 확정 자산 대기 — canon화 금지. 확정 아이콘 세트는 **HugeIcons**(모노, stroke 1.5).

---

## 콘텐츠 원칙

제품은 **한국어 우선**(부분적으로 일본어·라틴 폴백)이며, 타입스케일도 CJK 글리프 안정성을 기준으로 선택했습니다.

- **톤:** 차분하고 담백한, 지시적인 문장. 규칙은 “\~하지 말 것 / \~만 사용” 형태로 명료하게.
- **호칭:** 사용자에게는 존댓말 레지스터로 담백하게. 수다스럽지 않게.
- **케이싱:** UI 라벨·제목은 문장형. 전부 대문자(외침) 금지. 라틴 약어는 그대로.
- **숫자·데이터:** 항상 tabular(`.tabular`, `tabular-nums`)로 열·카운터가 흔들리지 않게.
- **이모지:** 사용하지 않음. 아이콘은 HugeIcons만.
- **禁則処理:** `word-break: break-all` **금지** → `word-break: keep-all`(CJK 어절 보호) + `overflow-wrap: break-word`(넘침 안전망)(`tokens/base.css`에서 전역 강제).
- **분위기:** 따뜻한 뉴트럴, 차분하고 학구적. 초록은 성장, sage는 나머지를 조용하게.

---

## 비주얼 파운데이션

**색.** 따뜻한 베이스 위 2계열 시스템.

- *뉴트럴* — **Sage**(hue 150, 저채도): 텍스트·경계·입력·muted 표면 등 크롬 전체. 배경 기본값은 **white**; sage-50은 Hero·WorldMap 두 섹션의 배경 포인트로만.
- *브랜드* — **Green**(`--primary`): 프라이머리 버튼, 포커스/브랜드 강조, 차트, 활성 항목. `--accent`는 primary와 같은 초록.
- *Biz 서브브랜드* — **파랑**(`--biz-*`): 외부 “기업 서비스(Biz)” **전용**. ⚠ 본체 시맨틱 토큰(`primary/accent/chart` 등)에 파랑을 절대 섞지 말 것 — Biz 진입점/밴드에만.
- 카드/팝오버는 **흰색**. hex 하드코딩 금지 — 시맨틱 토큰(`--card`, `--muted-foreground`, `--border`…) 또는 노출된 raw 스케일(`--sage-*`)만.

**타입.** Pretendard JP Variable, 전부. 스케일: `h1` 24/1.3 · `h2` 20/1.4 · `h3` 16/1.5 · `body` 14/1.7 · `caption` 12/1.6. Inter / DM Sans / Nunito **금지**.

**간격.** 4px 베이스 스케일. 카드 안쪽은 넉넉하게, 답답하지 않게.

**라운드.** Large — 베이스 `--radius: 0.875rem`(14px). 버튼 \~11px(`md`), 카드 \~14px(`lg`). vega/Large 프리셋의 시그니처.

**엘리베이션.** 부드러운 sage 틴트 그림자, 낮은 불투명도(`xs`→`lg`). 카드는 보통 헤어라인 sage 경계 + `shadow-sm`.

**경계.** `--border`(sage-200) 1px 헤어라인. 구조는 경계가, 리프트는 그림자가.

**애니메이션.** 절제. 짧은(\~150–200ms) ease. 바운스·무한 루프 없음.

**투명/블러.** 드물게. 오버레이는 `sage-950` 저알파 스크림 + 옵션 블러. 글래스모피즘 아님.

**포커스.** `--ring`(sage-400) — 초록이 아니라 크롬으로 읽히는 2–3px 아웃라인.

> **AI CTA/밴드 금지 규칙:** AI 기본 팔레트(teal/보라 그라데이션) **금지**. AI 관련 CTA·밴드도 **sage/green 시맨틱 토큰**으로만 칠합니다(보라·틴트 그라데이션 금지).

---

## 아이코노그래피

**HugeIcons만 사용합니다.** Lucide / Heroicons / 이모지 / 유니코드-아이콘 **금지**.

- 프로덕션은 `hugeicons-react`에서 import.

- HTML/프로토타입에서는 jsDelivr 정적 SVG: `https://cdn.jsdelivr.net/npm/@hugeicons/static/icons/<name>.svg`.

- 정적 SVG는 하드코딩 stroke(`#141B34`, width 1.5)라서, `.hgi` CSS 마스크(`tokens/icons.css`)로 `currentColor` 재색칠:

  ```html
  <span class="hgi" style="--hgi:url('https://cdn.jsdelivr.net/npm/@hugeicons/static/icons/home-01.svg'); font-size:20px; color:var(--muted-foreground)"></span>
  ```

- `Icon` 컴포넌트가 이 패턴을 감쌉니다.

---

## 컴포넌트

관습적 프리미티브는 현 토큰 기준으로 정돈해 유지합니다: **Button · IconButton · Icon · Badge · Chip · Avatar/AvatarGroup · BookmarkToggle · CountToggle · FilterChip · FilterSelect · Input · Field/FieldGroup · TagInput · SearchInput · Select · Checkbox · RadioGroup · Switch · ToggleGroup · Card · Table · Dialog · Sheet · Popover · Toast · Breadcrumb**. 네비게이션은 **Header · Footer**(canon), **Sidebar**(참조·레거시).

카드가 의존할 기반 프리미티브 3종:

- **Avatar / AvatarGroup** \[DS-GAP\] — 원형 아바타(이미지 + 이니셜 fallback, sage) + 겹침 그룹(흰 링 + `+K` 오버플로우).
- **Badge** — 계열(분류 뉴트럴 / 상태 green·destructive·muted / 질적태그 9색 `--badge-*`) × leading(none·dot·flag·avatar) × 사이즈. 질적태그는 green 제외·blue는 Biz 파랑과 구분. 실제 태그↔색 매핑은 미정.
- **Chip** — 눌리지만 켜지지 않는 칩(selected 없음). `--muted` 채움 + 아웃라인 없음 — Badge(흰 면+sage 아웃라인, 안 눌림)·FilterChip(흰 면+sage 아웃라인→green 반전, 눌리고 켜짐)과 구분. href(이동)·onRemove(제거)·표시 전용.
- **BookmarkToggle** — 미디어 오버레이 전용 아이콘 토글(사진 위·단독·반전). IconButton default 형태 그대로(박스 38·아이콘 18). CountToggle과 경계는 "카운트 유무"가 아니라 "어디에 놓이는가"(2026-09-11 CountToggle로 흡수 → 09-12 되돌림).
- **CountToggle** — 메타 줄 인라인 전용 아이콘+카운트 토글(도움돼요·스크랩 공용, count 필수). selected는 반전하지 않음(아이콘 fill + tone 색만, green 없음) — 목록 다수 노출 시 반전 과다를 피하는 예외.
- **FilterChip** — Toggle 계열 텍스트 칩(BookmarkToggle의 형제, 아이콘형↔텍스트칩형). 선택 가능한 필터 요소(정적 Badge와 구분). 버튼 sm 기하(높이 32·radius-md·caption/500, pill 아님). "selected=반전" 공통 원칙 상속 — FilterChip은 primary green 반전. leading none·flag(원형 국기 재사용).
- **FilterSelect** — 조건 축의 트리거+모달 한 벌(Dialog width=600). 선택지가 많아 팝오버에 안 들어가 Dialog로 간다 — 새로 만든 건 트리거와 조립뿐, Dialog·FilterChip·Chip·Button을 그대로 감싼다. 트리거는 Button sm 기하, 0개=투명+muted-foreground, 1개 이상=--muted 채움+1px --sage-400+foreground 600(green 반전 없음). 모달 안 선택은 "N개 적용하기"를 눌러야 반영(즉시 반영 없음), "초기화"는 모달만 비운다. 그룹별로 나열, 하단 요약 칩+초기화/적용 바.
- **SearchInput** — 자동완성·최근 검색어 검색창. TagInput과 같은 골격(한 자리를 갈아끼운다) — 다른 점은 제안 줄이 상자 밖 드롭다운이라는 것. 포커스+빈값=최근 검색어(Chip md+onRemove), 입력 중=자동완성(일치 부분 --primary 600), 둘을 쌓지 않는다. 정렬·필터·개수 제한은 화면의 일.

`window.MentreeDesignSystem_2f86cf`에서 읽습니다(50개). 각 컴포넌트의 `*.prompt.md` 참조.

### 배치 컴포넌트

- **SectionHeader** — 가로 양끝 정렬 섹션 헤더(좌 제목 / 우 액션). 좌: 장식 아이콘 칩·제목(30 bold, green 강조 조각)·부가 스트링·Badge 독립 슬롯. 우: 전체보기(고스트+화살표)·아웃라인 버튼·캐러셀 화살표 세그먼트 그룹(끝 도달 시 disabled). 배지·버튼·IconButton·아이콘 재사용. (DS-GAP: 제목 30은 타입스케일 밖 — h0/display 정리 별도 작업.)
- **Carousel** — 범용 스크롤/스냅 컨테이너(담는 카드 종류 무관). 조작부 없음 — 화살표는 SectionHeader가 담당, Carousel은 스크롤/스냅만. gap prop 주입, 표시 개수 컨테이너 폭에 유동, 카드/1단위 스냅. ref(scrollPrev/scrollNext)·onEdgeChange로 SectionHeader 화살표 연동. 데스크톱 기본 거동만(리스폰시브는 범위 밖).
- **CalloutBar** — 블리드 풀폭 띠(각진 radius 0). 헤더 위/아래 공지·안내·상태·경고. info(sage)·success(green)·warning(amber)·error(destructive) 4종, 옅은 배경+진한 텍스트(Badge 50/700 상속). 아이콘·인라인 링크·닫기 독립 옵션, 정렬 center/left, 2줄까지 허용.
- **Banner** — 인라인 둥근 프로모/유도 블록(자유 영역 slot). CalloutBar와 구분(둥근 인라인). 외곽 최소 규칙만 고정(radius 22·인라인·기본 패딩 16·전체 클리커블·폰트/禁則/시맨틱 상속), 배경(과감한 색·그라데이션)·효과·레이아웃·CTA는 자유. variant 없음.
- **BottomTabBar** — Mobile(\~768) 전용 하단 고정 4탭 네비(56 + safe-area). 멘토 찾기·Q&A 멘토링·멘트리 인사이트·MY 멘트리. HugeIcons 모노(헤더 오버레이의 컬러 SVG와 별개), 활성=green/비활성=muted, frosted(linen-50 반투명+blur) 배경+상단 sage hairline 풀블리드. Desktop(769+) 숨김. guest의 MY 탭은 로그인 유도 자리만(OPEN #9).

### 조립 카드 (프리미티브 조합)

- **MentorCard** — 세로형 멘토 카드. Badge·BookmarkToggle 조립. 카드 공통 셸(white·1px sage-200·shadow-sm·radius-lg, hover 시 shadow-md만)을 정의 — 이후 다른 카드가 상속. 카드 전체=상세 링크, 우상단 북마크=독립 클릭.
- **QnaCard** — 미디어 없는 Q&A 텍스트 카드. 카드 기하·elevation·동심원 상속(패딩 --card-content-padding 통일). 상단 카테고리 배지 + 조회수/좋아요(무상태 카운트), 제목 h3·발췌 2줄 고정(line-clamp), 하단 답변자 AvatarGroup + "멘토 답변 N개".
- **ArticlePreview** — **투명 콘텐츠 프리뷰(카드 아님)**. 표면 규칙상 썸네일이 경계를 만들어 카드 셸 미상속(배경 투명·테두리/그림자/마진 없음). 동심원 기하는 미디어에만(16:9 + radius 14). 제목 h3 2줄·발췌 3줄 고정, 하단 컬러 태그(질적태그 팔레트만). hover 시 썸네일에만 elevation(이동 없음). 카드 전체=아티클 상세 링크.
- **InterviewCard** — 인물 인터뷰 카드(표면 규칙 1단계). 세로형 1종(캐러셀에서 3장이 같은 크기로 선다) — 미디어 3:2 위 배지(국가+직무, 좌상단 오버레이) · 제목 2줄 · 발췌 3줄(둘 다 고정 clamp) · 인물명(강조)·직함 같은 줄, 회사 다음 줄(muted). 카드 셸·동심원은 MentorCard와 같은 값(폭은 카드가 고정하지 않음 — 부모/캐러셀이 정한다). 카드 전체=인터뷰 상세, 북마크 없음.
- **AnswerCard** — Q&A 상세의 멘토 답변 1건. QnaCard(질문·카드 전체 클릭)와 달리 갈 곳이 없어 스트레치 링크 없음(href 없음). 멘토 헤더(전환 핵심 루트)+본문 전문+도움돼요(rose)+공유+채택 표시+감사인사. 스크랩 없음(목록 단위가 질문이라 질문 카드에만).

### 표면 (surfaces)

- **EmptyState** — 목록 0건 자리에 서는 부품. 아이콘(HugeIcons·선택)·제목(필수)·설명(선택)·액션(Button 0~1개) 4단 가운데 정렬 슬롯 구성. "아직 없다"/"찾았는데 없다"를 prop으로 가르지 않고 화면이 문구로 정합니다(기본 문구 하드코딩 없음 — 한/일 2개국어). 크기 md(목록 전체)·sm(위젯·드롭다운, 아이콘 축소·설명 생략 가능). 배경·테두리 없음(카드 셸 미상속), 제목 `--foreground` / 설명·아이콘 `--muted-foreground`, 채도·일러스트 금지.
- **Skeleton** — 로딩 중 자리를 잡아두는 회색 덩어리 **프리미티브 하나**(`width`·`height`·`radius` sm/md/full·`count`). 카드/목록 모양 부품을 만들지 않습니다 — 형태는 화면이 배치해서 만듭니다(`SkeletonCard` 금지). `count`≥2는 줄 간격을 두고 쌓이며 마지막 줄 폭 60%. 스피너 대체. 은은한 펄스 하나만(shimmer 금지 — 한 화면 12장이 동시에 훑으면 시끄러움), `prefers-reduced-motion`에서 정지. 색은 `--muted`만. 자신은 `aria-hidden`, 감싸는 영역의 `aria-busy`는 화면의 일. 개수도 화면 사양이 정합니다(Q&A 피드 1페이지 6장·이후 12장).

### 내비게이션

- **Pagination** — 목록의 쪽 이동(번호 — 「더보기」 아님). 아티클 목록·공지사항·Q&A 피드·마이페이지 탭이 **같은 규칙**을 씁니다. 접기 「1 … 현재±2 … 끝」(모바일 ±1, 와이어 근거 없음), 「…」이 1페이지만 가리면 접지 않음. 처음·끝 점프 « » 는 **마지막 번호 뒤에 나란히**(‹ › 없음), 양 끝에서 비활성. 현재 페이지=`--primary` 채움 + `aria-current`(버튼 아님·눌리지 않음). 보이는 사각형 40 / 누르는 면 44x44, tabular 숫자. 제어형(`page`·`totalPages`·`onPageChange` — URL에 page를 담는 화면이 있음).
- **Tabs** — 같은 셸 안에서 내용을 바꾸는 전환(WAI-ARIA 탭 패턴). 선택 탭에 `--primary` 밑줄 + 라벨 굵기·색(색만으로 가르지 않음) — 면을 채우는 ToggleGroup(같은 목록의 조건 변경)과 구별된다. 라벨 뒤 카운트 Badge(선택=green tint / 미선택=뉴트럴), 탭 2~10개는 줄바꿈 없이 가로 스크롤 + 가장자리 페이드. 제어형.

### DS-GAP 후보 (아직 만들지 않음 — 메모만)

리스트/필터 화면에 필요할 수 있으나 확정 와이어프레임 전까지 **구현하지 않습니다**. shadcn/ui·이 시스템에 아직 없는 후보:

(**Filter chip** → `FilterChip`, **Tabs** → `Tabs`, **Pagination** → `Pagination`, 빈 상태 → `EmptyState`, 로딩 → `Skeleton`으로 구현 완료. 남은 후보 없음.)

필요해지면 `{/* DS-GAP: [컴포넌트명] — shadcn/ui 에 해당 없음, 커스텀 */}`로 명시 후 구현하고, 시각 구조는 별도 제공되는 와이어프레임을 참조합니다.

- **국기 에셋(flag leading)** — `assets/flags/{국가명}.svg`(원형, 소문자·하이픈 국가명). 파일명은 하이픈 국가명 기반이며, 개발 단계에서 국가명↔ISO 코드 매핑만 정리하면 됩니다. 현재는 프로토타입용 국가만 등록(미등록 국가는 빈 원형 placeholder).

---

## 브레이크포인트 (3구간)

| 구간 | 폭 | 핵심 차이 |
| --- | --- | --- |
| **Desktop L** | 1280+ | 컨테이너 1280. 헤더 풀메뉴(기업 서비스 버튼 포함). |
| **Desktop S** | 769–1279 | 헤더에서 **기업 서비스 버튼만 숨김**. |
| **Mobile** | \~768 | 헤더 축약(로고+회원가입/로그인+햄버거) + 하단 탭바 4탭. |

- 컨테이너: `--container-max` 1280 / `--container-pad` 24 → 16(Mobile). 배경 풀블리드, 콘텐츠만 1280 정렬. Header·본문·Footer 공통 참조로 좌우 끝선 일치.
- 타입스케일 반응형: display 40 → 24, h0 30 → 20. 나머지(h1 24 / h2 20 / h3 16 / body 14 / caption 12)는 고정.
- 캐러셀: Desktop L/S는 화살표(SectionHeader) + overflow 페이드, Mobile은 화살표·페이드 없이 스와이프.
- 헤더 햄버거 = 전체화면 오버레이(GNB 바 유지, 28px 컬러 SVG는 ⚠ placeholder). 헤더·탭바는 같은 frosted glass 표면 언어.
- 전체 지침: **`guidelines/03-responsive.md`**.

---

## 소스 (이 시스템이 만들어진 출처)

이 프로젝트는 기존 mentree 디자인 시스템 핸드오프 번들을 그대로 이식한 것입니다. 독자가 아래에 접근 가능하다고 가정하지 않지만, 추적을 위해 기록합니다.

- **코드베이스(읽기 전용 마운트):** `mentree-design-system-export/` — Claude Design 핸드오프 번들. 실제 소스는 `mentree-design-system-export/project/`(tokens · components · guidelines · assets · screens/top/TOP.html).
- **리스폰시브 스펙:** `mentree-design-system-export/03-responsive.md` → `guidelines/03-responsive.md`로 복사.
- **업로드 자산:** `uploads/` — `mentree-logo.svg`, `biz.svg`, 원형 국기 SVG 19종, `PretendardJPVariable.ttf`. 정규 위치는 `assets/logo/`, `assets/flags/`, `assets/fonts/`.
- **Figma 링크는 제공되지 않았습니다.** 모든 값은 코드(토큰 CSS + 컴포넌트 JSX)에서 그대로 옮겼으며 반올림하지 않았습니다.
- **폰트 대체 없음** — Pretendard JP Variable 실제 파일이 제공되어 그대로 사용합니다. Google Fonts 대체 불필요.

---

## 인덱스

- `styles.css` — 전역 진입점(이것만 링크). 아래 토큰을 `@import`.
- `tokens/` — `fonts.css`, `colors.css`(+ `--biz-*` 격리, `--brand-ink` canon, `--badge-{hue}` 질적태그 9색 50/200/700), `typography.css`, `spacing.css`(+ 동심원 중첩 `--card-*` 인스턴스), `icons.css`, `base.css`.
- `assets/flags/` — 원형 국기 SVG(프로토타입용, 하이픈 국가명).
- `assets/logo/mentree-logo.svg` — mentree 워드마크(canon). `assets/fonts/PretendardJPVariable.ttf`.
- `guidelines/` — 파운데이션 스펙 카드(Design System 탭).
- `components/` — 프리미티브. `navigation/nav-ia.js`가 헤더·푸터 IA의 SSoT.
- `ui_kits/mentree-top/index.html` — **TOP(메인) 화면 recreation, canon.** Design System 탭 카드 + Starting Point.
- `ui_kits/mentree-app-legacy/index.html` — 사이드바 앱 셸. 참조·레거시(canon 아님).
- `guidelines/03-responsive.md` — 리스폰시브 3구간 지침.
- `thumbnail.html` — 프로젝트 타일.
- `SKILL.md` — 에이전트 스킬 래퍼.
