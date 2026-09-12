# ds-export — 출처와 범위

> 이 디렉터리가 답하는 것: **디자인 시스템의 값과 사양은 무엇인가.**
> **참조의 정본**이다 — 값을 알려면 여기를 본다. 값을 바꾸려면 **Claude Design**(편집의 정본)으로 간다.
> 두 축의 정의는 [docs/SOURCES.md](../../docs/SOURCES.md) 「정본의 두 축」이 갖는다. FE 인계의 입력이다([ADR-0005](../../docs/adr/0005-design-team-deliverables.md)).

- 출처: Claude Design (radarlab 계정) — 프로젝트 이름 **`M2 Design System`**
- 원본: `M2 Design System-handoff (5).zip`
- **반입일: 2026-09-12**
- 원본 SHA-256: `cb8079013e45301418f6f54a5dc0a93ba3607372f1ec7cf43796e178da7f345d`

### 교체 이력

| 반입일 | 원본 | SHA-256 앞 12자 | 무엇이 바뀌었나 |
|---|---|---|---|
| 2026-08-31 | `Mentree2 Design System-handoff.zip` | `5e43bc6d53de` | 첫 반입 |
| **2026-09-10** | `M2-Design-System-handoff.zip` | `727c5d60feaf` | **컴포넌트·토큰·guidelines 는 무변경**(166본 바이트 동일). 아래 2건만 |
| **2026-09-12** | `M2 Design System-handoff (3).zip` | `26a7c12eb6d2` | **컴포넌트가 30본에서 39본이 됐다.** 아래 |
| **2026-09-12** | `M2 Design System-handoff (5).zip` | `cb8079013e45` | **`TagInput` 1본이 늘어 40본이 됐다.** ＋ `Chip` 개정. 아래 |

### 2026-09-12(2) — TagInput 이 들어왔다

`DS-26` 이다. `qna-compose` 의 태그 입력 필드다.

| 무엇 | 내용 |
|---|---|
| **신규** — `TagInput`(`forms`) | 상자 ＋ 입력 칸 ＋ 제안 줄 ＋ 10개 제한. **안에 세우는 태그는 전부 `Chip md`** 다 |
| **개정** — `Chip` | `href`·`onRemove` 가 없고 `onClick` 만 있으면 `<button type="button">` 으로 렌더한다. **모양은 안 바뀐다.** ＋ `removeAriaLabel` |

**`Chip` 을 안 늘리고 감쌌다.** 상자·키 처리·개수 제한은 **목록 전체를 알아야 하는 일**이라 칩 하나가 못 한다. 넣었으면 `QnaCard`·`AnswerCard` 의 해시태그가 그 무게를 같이 진다.

**바깥 상자는 `Input` 의 값을 그대로 쓴다** — `--input`·`--ring`·`--destructive`·`--radius-md` 와 boxShadow·transition 이 문자열까지 같다. 새 값을 안 만들었다.

**조합 중에는 아무 키도 가로채지 않는다.** 한글은 마지막 글자가 조합 중으로 남아, 안 막으면 Enter 가 조합보다 먼저 확정을 돌린다. 리포에서 키를 가로채는 첫 부품이다.

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
| `project/components/` | 컴포넌트 **40본**. 각 `.jsx` ＋ `.d.ts` ＋ `.prompt.md` ＋ `.card.html` | ② 소스 |
| `project/_ds_bundle.js` | 컴포넌트 **52 export** 번들 | ② |
| `project/_ds_manifest.json` | 컴포넌트·카드·토큰·폰트의 목록 | ② |
| `project/guidelines/` | 원칙 16본(HTML) — 색 · 타입 · 간격 · 표면 · 동심중첩 · 브랜드 ／ **`03-responsive.md` — 반응형 3구간의 통합 지침** | ③ 원칙 |
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
