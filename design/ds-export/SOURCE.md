# ds-export — 출처와 범위

> 이 디렉터리가 답하는 것: **디자인 시스템의 값과 사양은 무엇인가.**
> **참조의 정본**이다 — 값을 알려면 여기를 본다. 값을 바꾸려면 **Claude Design**(편집의 정본)으로 간다.
> 두 축의 정의는 [docs/SOURCES.md](../../docs/SOURCES.md) 「정본의 두 축」이 갖는다. FE 인계의 입력이다([ADR-0005](../../docs/adr/0005-design-team-deliverables.md)).

- 출처: Claude Design (radarlab 계정) — 프로젝트 이름 **`M2 Design System`**
- 원본: 폴더 `M2 Design System`(디자이너가 zip 을 풀어 `design/` 에 놓았다. zip 은 받지 않았다)
- **반입일: 2026-09-16**
- 원본 해시: `4ec9a3f66119413cea712acc3ce4e5ffb409b77d51a4643018a93d5da239ce09` — **폴더 해시**다. zip 이 없어 파일별 SHA-256 목록(경로 정렬 · `.DS_Store` 제외 · 제외 전)을 다시 SHA-256 했다. 재현: `find . -type f ! -name .DS_Store -print0 | sort -z | xargs -0 shasum -a 256 | shasum -a 256`

### 교체 이력

| 반입일 | 원본 | SHA-256 앞 12자 | 무엇이 바뀌었나 |
|---|---|---|---|
| 2026-08-31 | `Mentree2 Design System-handoff.zip` | `5e43bc6d53de` | 첫 반입 |
| **2026-09-10** | `M2-Design-System-handoff.zip` | `727c5d60feaf` | **컴포넌트·토큰·guidelines 는 무변경**(166본 바이트 동일). 아래 2건만 |
| **2026-09-12** | `M2 Design System-handoff (3).zip` | `26a7c12eb6d2` | **컴포넌트가 30본에서 39본이 됐다.** 아래 |
| **2026-09-12** | `M2 Design System-handoff (6).zip` | `06a76b378765` | **`TagInput` 1본이 늘어 40본이 됐다.** ＋ `Chip` 개정. 아래 |
| **2026-09-14** | `M2 Design System.zip` | `7649857370a5` | **40본에서 43본.** 신규 `Breadcrumb`·`FilterSelect`·`SearchInput`. 삭제 0 |
| **2026-09-16** | 폴더 `M2 Design System` | `4ec9a3f66119`(폴더 해시) | **43본 그대로. 32본 개정.** 타입 스케일 개정 · `Select` 커스텀 리스트박스 · `Header` 3열 그리드 ＋ 로그인 상태 · guidelines 2본 신규. 아래 |

### 2026-09-16 — 43본 그대로, 32본이 바뀌었다

**신규 0 · 삭제 0 · 개정 32.** 인사이트 2화면 export 의 `_ds` 사본과 **같은 판**이다(번들 바이트 동일). 인사이트 template 이 어긋나 있던 것이 이 교체로 맞았다.

| 무엇 | 내용 |
|---|---|
| **타입 스케일 개정** — 토큰 `typography.css` · guidelines `type-roles.html` · `type-scale.mobile.html` 신규 | 크기마다 `--text-*--line-height` · `--letter-spacing` 토큰이 붙었다. 읽을거리 본문용 `--text-article`(17/28)이 생겼다. 카드 제목은 폭 규칙(~280 → body · 280~360 → h3 · 360＋ → h2). 반응형은 display · h0 · h1 세 단에만 |
| **`Select` 커스텀 리스트박스** | 네이티브 `<select>` 를 버렸다. 트리거 ＋ `Popover` 목록 · 키보드 · placeholder 는 항목이 아니다. **Q&A 09-15 감사가 「국가 · 키워드 셀렉트의 펼친 목록은 브라우저 기본 팝업이라 화면에서 못 잡는다 — 기표 후보」라고 적은 것이 풀렸다** |
| **`Header` 개정** | 3열 그리드(minmax(0,1fr) auto minmax(0,1fr)) — 중앙 메뉴가 늘 화면 중앙. 메뉴 아이콘이 **28px 컬러 SVG placeholder → 20px HugeIcons 모노**(전역 아이콘 원칙의 예외가 사라졌다 · `DS-05` 의 헤더 쪽). **로그인 상태(mentor · mentee)** — 알림 ＋ 아바타. 모바일 오버레이는 header 의 형제 |
| **치수** — `Button` sm32/md40/lg48 · 글자 14 고정 · ghost 좌우 패딩 0 ／ `IconButton` sm32/md40/lg48 ／ `Badge` sm24/md28/lg34 ／ `Chip` sm h24 · md 14px | 원티드 · 토스 실측 기반(2026-09-15) |
| **`MentorCard`** | 이름 h3 · 직무 · 회사 caption · 소개 박스가 green-50 면 ＋ green-100 테두리로 미디어와 같은 폭. `fluid` 의 모바일 최소 폭 179 는 그대로다(`DS-37`) |
| **`QnaCard`** | 태그 행이 개수가 아니라 **폭**으로 접힌다(ResizeObserver · 항상 1줄 · `+N`). 카드가 자기 높이를 정하지 않는다 |
| **`Pagination`** | 390 에서 358 안에 들게 모바일 치수(히트 40 · 면 36) · 「…」 보정 끔. **시작 · 끝 형태(`DS-27`)는 여전히 없다** |
| 토큰 `colors.css` | `--green-50` · `--green-100` 추가(와이어 tailwind green/50 · 100) |
| 토큰 `spacing.css` | 컨테이너 좌우 패딩 Mobile 16 을 미디어쿼리로 |
| 그 밖 24본 | 글자 크기에 `line-height` · `letter-spacing` 토큰을 붙인 치수 정리. 동작 변화 없음 |

**열려 있는 요구 중 이 판에 들어온 것은 없다.** `DS-23`(답변 카드) · `DS-27`(페이지 시작 · 끝) · `DS-30`(칩 색) · `DS-32`(필드 라벨) · `DS-17` · `DS-33~37` 전부 그대로다. 각 행에 적었다.

**`assets/img/` 18본 중 16본을 뺐다.** 부품 · 카드 · ui_kits · readme 어디도 참조하지 않는 화면 표본 사진이고, 16본은 `design/screens/insight-list/template/assets/img/` 에 **같은 파일**이 이미 있다(바이트 동일 확인) — 사본이라 뺀다. **`14.png` · `15.png` 2본은 남겼다.** 사본도 프롬프트도 아니어서 「멈추고 묻는다」에 든다 — 디자이너가 무엇인지 말해 주면 빼거나 옮긴다.

### 2026-09-12(2) — TagInput 이 들어왔다

`DS-26` 이다. `qna-compose` 의 태그 입력 필드다.

| 무엇 | 내용 |
|---|---|
| **신규** — `TagInput`(`forms`) | 상자 ＋ 입력 칸 ＋ 제안 줄 ＋ 10개 제한. **안에 세우는 태그는 전부 `Chip md`** 다 |
| **개정** — `Chip` | `href`·`onRemove` 가 없고 `onClick` 만 있으면 `<button type="button">` 으로 렌더한다. **모양은 안 바뀐다.** ＋ `removeAriaLabel` |

**`Chip` 을 안 늘리고 감쌌다.** 상자·키 처리·개수 제한은 **목록 전체를 알아야 하는 일**이라 칩 하나가 못 한다. 넣었으면 `QnaCard`·`AnswerCard` 의 해시태그가 그 무게를 같이 진다.

**바깥 상자는 `Input` 의 값을 그대로 쓴다** — `--input`·`--ring`·`--destructive`·`--radius-md` 와 boxShadow·transition 이 문자열까지 같다. 새 값을 안 만들었다.

**조합 중에는 아무 키도 가로채지 않는다.** 한글은 마지막 글자가 조합 중으로 남아, 안 막으면 Enter 가 조합보다 먼저 확정을 돌린다. 리포에서 키를 가로채는 첫 부품이다.

**`Chip` 의 「모양은 안 바뀐다」를 두 번 만에 지켰다.** 첫 판은 `<button>` 리셋으로 `font: "inherit"` 를 넣었는데, **`font` 는 단축 속성이라 `outer` 가 정한 `fontSize`·`fontWeight`·`lineHeight`·`fontFamily` 를 전부 되돌린다.** `onRemove` 분기에는 그 줄이 없어서 **같은 `Chip` 이 ✕ 유무로 글자가 갈렸다.**

| 판정 조건 | 아크션 |
|---|---|
| 「모양이 안 바뀐다」를 확인한다 | **상수만 보지 않는다.** `SIZES` 가 그대로여도 뒤에 오는 선언이 덮으면 렌더는 바뀐다 |
| 리셋 선언을 넣는다 | **단축 속성을 쓰지 않는다.** `font`·`background`·`border` 는 옆의 개별 선언을 같이 지운다 |

버튼 리셋으로 남긴 것은 `border: "none"` 뿐이다 — 타이포는 `outer` 가 이미 넷을 다 명시한다.

### 2026-09-12 — 컴포넌트 9본이 늘었다

**Q&A 3화면의 착수가 한 번에 몰고 왔다.** 상세는 [DS-update-list.md](../DS-update-list.md) 다.

| 무엇 | 어느 요구 |
|---|---|
| **신규 9본** — `Chip` · `CountToggle` · `AnswerCard` · `Tabs` · `EmptyState` · `Pagination` · `Skeleton` · **`Popover`** · **`Toast`** | `DS-20`·`DS-21`·`DS-23`·`DS-02`·`DS-11`·`DS-01`·`DS-10`·`DS-12`·`DS-09` |
| **개정** — `QnaCard` | `DS-25`. 배지 2개 · 해시태그 `Chip` ＋ `+N` · 아바타 3명 · 토글 2개 · `compact` |
| **개정** — 카드 4종의 루트가 `<article>` 이 됐다 | `DS-22`. `QnaCard`·`MentorCard`·`InterviewCard`·`ArticlePreview` |
| **경계** — `BookmarkToggle` 과 `CountToggle` | `DS-24`. **09-11 에 합쳤다가 09-12 에 되돌렸다.** 축은 「어디에 놓이는가」다([DESIGN.md](../DESIGN.md) §8.1) |
| **부수** — `AnswerCard` 가 자체 팝오버를 버리고 `Popover` 를 쓴다 | `DS-12` 의 뒤처리 |
| **이름** — `bookmark.card.html` → `bookmarktoggle.card.html` | — |

**외부 의존성은 여전히 0이다.** `Toast` 는 실장에서 `sonner` 로 가지만 **사양으로 지정만 하고 import 하지 않는다**([SOURCES.md](../../docs/SOURCES.md) 「외부 라이브러리를 쓰기로 한 부품」). **40본의 `import` 가 `react` 와 서로뿐임을 실측했다.**

**2026-09-10 의 실질 변경은 2건이다.**

- `README.md` — 폴더·프로젝트 이름이 `mentree-design-system` / `mentree Design System` 에서 **`m2-design-system` / `M2 Design System`** 으로 바뀌었다
- `project/readme.md` — **linen 배경 문단이 삭제됐다**(「평평한 따뜻한 린넨 … `#fefaf1`」). 재개 팩의 「linen 완전 폐지 → white 기반」이 문서에도 반영됐다. 그 밖은 마크다운 이스케이프·표 구분선 서식 차이다

### 2026-09-14 — 40본에서 43본

**신규 3본.** 삭제 0.

| 부품 | 어느 요구 | 무엇 |
|---|---|---|
| **`Breadcrumb`** | `DS-16` | 목록 → 상세 2단. **3단 이상·홈 아이콘·드롭다운을 일부러 만들지 않았다** |
| **`FilterSelect`** | **기표 없음** | 조건 축 트리거 ＋ `Dialog`(600) 모달. **다중 선택**이고 「N개 적용하기」로 확정한다 |
| **`SearchInput`** | **기표 없음** | 자동완성 ＋ 최근 검색어. 제안 줄이 상자 밖 드롭다운이다 |

**뒤의 둘에 `DS-nn` 을 만들지 않는다.** [DS-update-list](../DS-update-list.md) 는 **미비·미정**의 그릇이고 저 둘은 이미 있다.

**수정 3본** — `MentorCard` · `InterviewCard` · `Carousel`.

**`FilterSelect` 는 `qna-feed` 에 쓰지 않는다.** 부품은 다중 선택 ＋ 확정 버튼인데 그 화면의 와이어(`1059:36083`)는 **「즉시, and, 각 필터 안에서는 단일선택」** 이다. 다중이 필요한 화면(`mentor-search`·`insight-list`)의 것으로 본다.

## 취급

| 판정 조건 | 아크션 |
|---|---|
| 값이나 사양을 알고 싶다 | **여기를 본다.** `tokens/` 가 값의 정본이다 |
| 없는 것·고칠 것을 발견했다 | [DS-update-list.md](../DS-update-list.md) 에 `DS-nn` 으로 기표한다 |
| 이 디렉터리의 파일을 고치고 싶다 | **고치지 않는다.** Claude Design 에서 고치고 재export 한다 |
| Claude Design 에서 고쳤다 | 이 디렉터리를 통째로 교체하고 위 SHA 를 갱신한다 |

**손으로 고치면 Claude Design 과 갈린다.** 이 디렉터리는 export 의 사본이며 편집 대상이 아니다.

## 무엇이 들어 있는가

| 경로 | 내용 | 인계 단위 |
|---|---|---|
| `project/tokens/` | 토큰 6본 — base · colors · typography · spacing · icons · fonts | ① 값의 정본 |
| `project/styles.css` | 토큰을 묶는 진입점 | ① |
| `project/components/` | 컴포넌트 **43본**. 각 `.jsx` ＋ `.d.ts` ＋ `.prompt.md` ＋ `.card.html` | ② 소스 |
| `project/_ds_bundle.js` | 컴포넌트 **52 export** 번들 | ② |
| `project/_ds_manifest.json` | 컴포넌트·카드·토큰·폰트의 목록 | ② |
| `project/guidelines/` | 원칙 18본(HTML) — 색 · 타입(역할 · 스케일 · 모바일 스케일) · 간격 · 표면 · 동심중첩 · 브랜드 ／ **`03-responsive.md` — 반응형 3구간의 통합 지침** | ③ 원칙 |
| `project/readme.md` · `SKILL.md` | DS 전체 서술과 빠른 참조 | ③ |
| `project/assets/` | 국기 SVG 19본 · 로고 2본 | 자산 |
| `project/ui_kits/mentree-top/` | TOP 화면 조립 예시(HTML) | ⑤ 화면 정적 |
| `project/_adherence.oxlintrc.json` | Claude Design 쪽 lint 설정 | 참고 |

컴포넌트가 40본인데 export 가 52개인 이유는 **하위 export** 때문이다. `Avatar`/`AvatarGroup`, `Card` 계열 6, `nav-ia.js` 의 `NAV_*` 4, `Field`/`FieldGroup` 이 별도로 세어진다.

## 무엇을 뺐는가

| 뺀 것 | 크기 | 이유 |
|---|---|---|
| `assets/fonts/PretendardJPVariable.ttf` | 13MB | **폰트 바이너리를 리포에 넣지 않는다.** 아래 참조 |
| `uploads/` | 13MB | **Claude Design 에 올린 입력물이 쌓이는 자리다.** 사양이 아니다. 아래 |
| `assets/img/` | 3.9MB | **화면 표본 사진 16본.** 부품이 참조하지 않고 `insight-list/template/assets/img/` 와 같은 파일이다(2026-09-16). 사본이다 |
| `ui_kits/mentree-app-legacy/` | 10.5MB | 2.0 데모다. 사양이 아니다([ADR-0004](../../docs/adr/0004-no-as-is-survey.md)) |

**폰트**: `Pretendard JP Variable` 을 쓴다. 지정의 정본은 `project/tokens/fonts.css` 다. 바이너리는 위 원본 zip 에 들어 있다. 배포 방식(웹폰트 호스팅 / 번들)은 FE 가 정한다.

### `uploads/` 를 통째로 빼는 판정 조건

**한 가지가 아니다.** 09-12 판의 27본에는 두 종류가 섞여 있다.

- **자산의 평면 사본** — 국기 SVG 19본 · 로고 · 폰트 `.ttf`. `assets/` 와 같은 파일이다
- **Claude Design 에 올린 프롬프트** — `DS-01-pagination.md` · `DS-10-skeleton.md` · `DS-11-empty-state.md`. Claude Code 가 쓰고 디자이너가 올린 것이다

| 판정 조건 | 아크션 |
|---|---|
| `assets/` 와 같은 파일이다 | **뺀다.** 사본이다 |
| **Claude Design 에 올린 프롬프트다** | **뺀다.** 결과는 그 부품의 `.prompt.md` 가 갖고 **그것이 참조의 정본**이다. 입력까지 들이면 정본이 둘이 되고, 갈렸을 때 어느 쪽을 믿을지가 안 정해진다 |
| **위 둘 중 어느 것도 아니다** | **멈추고 묻는다.** 근거 없이 빼지 않는다 |

**「평면 사본이다」 한 줄로 빼고 있었다**(2026-09-12 리뷰 지적). `.md` 3본에는 그 근거가 성립하지 않았다.

## 여기에 없는 것

| 무엇 | 어디에 있는가 |
|---|---|
| 미구현·미정 | [DS-update-list.md](../DS-update-list.md) 의 상태 `요구` 인 행 |
| 화면별 사양 | `design/screens/<id>/UI-SPEC.md` |
| 이관 경위·파이프라인·진행 상태 | `design/_import/resume-pack/`(커밋하지 않는다) |
