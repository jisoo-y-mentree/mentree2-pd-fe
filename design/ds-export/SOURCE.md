# ds-export — 출처와 범위

> 이 디렉터리가 답하는 것: **디자인 시스템의 값과 사양은 무엇인가.**
> **참조의 정본**이다 — 값을 알려면 여기를 본다. 값을 바꾸려면 **Claude Design**(편집의 정본)으로 간다.
> 두 축의 정의는 [docs/SOURCES.md](../../docs/SOURCES.md) 「정본의 두 축」이 갖는다. FE 인계의 입력이다([ADR-0005](../../docs/adr/0005-design-team-deliverables.md)).

- 출처: Claude Design (radarlab 계정) — 프로젝트 이름 **`M2 Design System`**
- 원본: `M2 Design System 260911.zip`
- **반입일: 2026-09-11**
- 원본 SHA-256: `1883a5874eb2acd355c140f4a62166ec5f31949e18daa99c105ecc777eb2d232`

### 교체 이력

| 반입일 | 원본 | SHA-256 앞 12자 | 무엇이 바뀌었나 |
|---|---|---|---|
| 2026-08-31 | `Mentree2 Design System-handoff.zip` | `5e43bc6d53de` | 첫 반입 |
| 2026-09-10 | `M2-Design-System-handoff.zip` | `727c5d60feaf` | **컴포넌트·토큰·guidelines 는 무변경**(166본 바이트 동일). 아래 2건만 |
| **2026-09-11** | `M2 Design System 260911.zip` | `1883a5874eb2` | **컴포넌트가 30본에서 36본이 됐다.** 아래 |

### 2026-09-11 — 컴포넌트 7본이 늘고 1본이 빠졌다

**Q&A 착수로 하루에 10건이 들어왔다.** 상세는 [DS-update-list.md](../DS-update-list.md) 다.

| 무엇 | 어느 요구 |
|---|---|
| **신규 7본** — `Chip` · `CountToggle` · `AnswerCard` · `Tabs` · `EmptyState` · `Pagination` · `Skeleton` | `DS-20`·`DS-21`·`DS-23`·`DS-02`·`DS-11`·`DS-01`·`DS-10` |
| **제거 1본** — `BookmarkToggle` | `DS-24`. `CountToggle` 이 흡수했다 |
| **개정** — `QnaCard` | `DS-25`. 배지 2개 · 해시태그 `+N` · 아바타 3명 · 토글 2개 · `compact` |
| **개정** — 카드 4종의 루트가 `<article>` 이 됐다 | `DS-22`. `QnaCard`·`MentorCard`·`InterviewCard`·`ArticlePreview` |
| **부수** — `FilterChip` 의 `BookmarkToggle` 참조가 `CountToggle` 로 바뀌었다 | `DS-24` 의 뒤처리 |

**`MentorCard` 의 미디어 위 오버레이가 바뀌었다.** `IconButton` 형태에서 **반투명 받침 ＋ `CountToggle`** 이 됐다. 이것이 미디어 위 오버레이의 정본이며 [DESIGN.md](../DESIGN.md) §7 이 그렇게 가리킨다.

**2026-09-10 의 실질 변경은 2건이었다.**

- `README.md` — 폴더·프로젝트 이름이 `mentree-design-system` / `mentree Design System` 에서 **`m2-design-system` / `M2 Design System`** 으로 바뀌었다
- `project/readme.md` — **linen 배경 문단이 삭제됐다**(「평평한 따뜻한 린넨 … `#fefaf1`」). 재개 팩의 「linen 완전 폐지 → white 기반」이 문서에도 반영됐다. 그 밖은 마크다운 이스케이프·표 구분선 서식 차이다

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
| `project/components/` | **컴포넌트 36본.** 각 `.jsx` ＋ `.d.ts` ＋ `.prompt.md` ＋ `.card.html` | ② 소스 |
| `project/_ds_bundle.js` | 컴포넌트 **48 export** 번들 | ② |
| `project/_ds_manifest.json` | 컴포넌트·카드·토큰·폰트의 목록 | ② |
| `project/guidelines/` | 원칙 17본(HTML·md) — 색 · 타입 · 간격 · 표면 · 동심중첩 · 브랜드 ／ **`03-responsive.md` — 반응형 3구간의 통합 지침** | ③ 원칙 |
| `project/readme.md` · `SKILL.md` | DS 전체 서술과 빠른 참조 | ③ |
| `project/assets/` | 국기 SVG 19본 · 로고 2본 | 자산 |
| `project/ui_kits/mentree-top/` | TOP 화면 조립 예시(HTML) | ⑤ 화면 정적 |
| `project/_adherence.oxlintrc.json` | Claude Design 쪽 lint 설정 | 참고 |

컴포넌트가 36본인데 export 가 48개인 이유는 **하위 export** 때문이다. `Avatar`/`AvatarGroup`, `Card` 계열 6, `nav-ia.js` 의 `NAV_*` 4, `Field`/`FieldGroup`, `Tabs`/`TabPanel` 이 별도로 세어진다.

## 무엇을 뺐는가

| 뺀 것 | 크기 | 이유 |
|---|---|---|
| `assets/fonts/PretendardJPVariable.ttf` | 13MB | **폰트 바이너리를 리포에 넣지 않는다.** 아래 참조 |
| `uploads/` | 13MB | `assets/` 와 같은 파일의 평면 사본이다 |
| `ui_kits/mentree-app-legacy/` | 10.5MB | 2.0 데모다. 사양이 아니다([ADR-0004](../../docs/adr/0004-no-as-is-survey.md)) |

**폰트**: `Pretendard JP Variable` 을 쓴다. 지정의 정본은 `project/tokens/fonts.css` 다. 바이너리는 위 원본 zip 에 들어 있다. 배포 방식(웹폰트 호스팅 / 번들)은 FE 가 정한다.

## 여기에 없는 것

| 무엇 | 어디에 있는가 |
|---|---|
| 미구현·미정 | [DS-update-list.md](../DS-update-list.md). **09-11 시점에 남은 것은 `DS-03`~`DS-09`·`DS-12`~`DS-19` 다** |
| 화면별 사양 | `design/screens/<id>/UI-SPEC.md` |
| 이관 경위·파이프라인·진행 상태 | `design/_import/resume-pack/`(커밋하지 않는다) |
