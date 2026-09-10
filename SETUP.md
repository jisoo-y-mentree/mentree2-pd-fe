# SETUP.md — mentree2-pd-fe 환경 구축

> 이 문서는 **설치를 실행하는 사람(또는 Claude 세션)이 읽는 절차서**다.
> 대상 리포: `jisoo-y-mentree/mentree2-pd-fe`
> 출처: DataSpace-v2(`radarlab-inc/DataSpace-v2`)의 디자인 파이프라인을 이식했다. 이식 판단의 근거는 §8에 남긴다.

**세션을 새로 열었다면 §3(진행 상황)과 [docs/SOURCES.md](docs/SOURCES.md) 「순서」부터 읽어라.** 어디까지 됐는지는 §3 에, 무엇을 어느 순서로 하는지는 「순서」에 있다.

## 0. 이 리포가 맡는 것 / 맡지 않는 것

| 판정 조건 | 아크션 |
|---|---|
| 디자인 산출물(UI-SPEC·template·리뷰 기록)을 둔다 | ✅ 이 리포 `design/screens/` |
| 디자인 시스템 **사양**(토큰·컴포넌트 소스·원칙)을 둔다 | ✅ 이 리포 `design/ds-export/` |
| 디자인 시스템 **구현**(빌드·Storybook·a11y 검사)을 한다 | ❌ 엔지니어 |
| 제품 앱·백엔드 | ❌ 엔지니어 리포 |

**이 리포는 구현하지 않는다**([ADR-0005](docs/adr/0005-design-team-deliverables.md)). 산출물 6종은 전부 마크다운과 정적 HTML 이며 빌드가 없다. `apps/` 도 `packages/` 도 만들지 않는다.

## 1. 사전 준비 (사람이 하는 것)

- [ ] VS Code ＋ Claude Code 확장
- [ ] 리포를 로컬에 clone

**빌드도 의존 설치도 없다.** 산출물이 마크다운과 정적 HTML 뿐이다([ADR-0005](docs/adr/0005-design-team-deliverables.md)). 검사는 `python3 scripts/check-docs.py` 하나다.

### gh 계정 전환 (실제로 막혔던 지점)

`jisoo-y-mentree` 는 `jisoo-y` 와 **별개 계정**이다. gh 의 활성 계정이 다르면 push 가 404 로 막힌다.

```sh
gh auth switch --hostname github.com --user jisoo-y-mentree
gh auth status          # Active account: true 확인
gh auth setup-git       # 이것을 빼면 git 이 keychain 의 옛 자격증명을 계속 쓴다
```

되돌릴 때는 `--user jisoo-y` 로 같은 명령을 쓴다.

### 이 리포의 스크립트가 만족해야 하는 것

**둘 다 실제로 터졌던 것이고, CI 로는 절대 잡히지 않는다.** CI 는 Python 3.12·bash 5.x 이고 macOS 는 3.9·3.2 다.

| 대상 | 요건 | 지키는 법 |
|---|---|---|
| Python | **3.9(macOS 시스템 파이썬)에서 동작할 것** | `str \| None`(PEP 604)은 3.10 부터다. 파일 앞에 `from __future__ import annotations` 를 넣는다 |
| bash | **3.2(macOS 기본)에서 동작할 것** | `$var` 뒤에 공백 없이 비ASCII 가 오면 변수명으로 삼켜진다. `${var}` 로 감싼다 |

## 2. 설치 순서

각 단계는 **1 PR** 로 끊는다. 한 번에 넣지 않는다.

**실행 순서는 S1 → S2 → S3 → S4 → S5 → S8 이었고 전부 끝났다.** 단계 ID 는 PR·커밋에서 참조하므로 바꾸지 않는다.

**S6·S7 은 하지 않는다**([ADR-0005](docs/adr/0005-design-team-deliverables.md)). 이 리포가 디자인 시스템을 구현하지 않으므로 대상이 없다. ID 는 결번으로 남긴다.

**이 문서는 킷 설치 단계(S1~S8)의 ID 를 정의한다. S9 이후는 [docs/SOURCES.md](docs/SOURCES.md) 가 정의한다.**

| ID | 넣는 것 | 끝났다고 판정하는 조건 |
|---|---|---|
| **S1** | `CLAUDE.md`·`README.md`·`.gitignore`·`.github/pull_request_template.md`·`.github/CODEOWNERS` | PR 을 만들면 템플릿이 뜬다 |
| **S2** | `.claude/hooks/` 10본 ＋ `.claude/settings.json` | 4본의 `*.test.sh` 가 전부 실패 0 |
| **S3** | `docs/guidelines/` 2본 | 훅과 `CLAUDE.md` 가 거는 링크가 실재한다 |
| **S4** | `design/` 문서 8본 ＋ `docs/adr/README.md` ＋ `scripts/check-docs.py` | `python3 scripts/check-docs.py` 가 exit 0 |
| **S5** | `.claude/skills/` 3본 | `/design-bolt` 를 부르면 세션이 로드한다 |
| **S8** | `.github/workflows/ci.yml` | PR 에서 `checks` 가 녹색 |
| ~~S6~~ | ~~`packages/design-system/` ＋ Storybook~~ | **결번.** 하지 않는다 |
| ~~S7~~ | ~~a11y 하니스 ＋ 베이스라인~~ | **결번.** 하지 않는다 |

### CI 의 잡은 `checks` 하나다

훅 자기검사(S2)와 `check-docs.py`(S4)를 부른다. 디자인 시스템 잡은 ADR-0005 로 지웠다. **영구히 건너뛰는 잡은 가짜 그린이 된다.**

### 훅 자기검사의 기본 브랜치 해석

`guard-git.test.sh` 는 `guard-git.sh` 의 기본 브랜치 해석과 **같은 3단 폴백**으로 기본 브랜치를 해석한다(origin/HEAD → init.defaultBranch → main).

이 폴백이 없으면 detached HEAD(CI)나 origin/HEAD 미설정 환경에서 `current_branch` 와 `default_branch` 가 둘 다 빈 문자열이 되어 우연히 같아진다. 테스트가 그것을 「기본 브랜치 위에 있다」로 오인해 차단을 기대하고, 훅은 판정 재료가 없어 허용하므로 거짓 실패가 난다.

**통과 개수는 조건부 블록 때문에 환경마다 다르다. 판정 기준은 「실패 0」이다.**

---

## 3. 진행 상황

### 킷 설치 (S1~S8)

| 단계 | 상태 | 비고 |
|---|---|---|
| S1 기본 문서 | ✅ PR #1 | |
| S2 훅 10본 | ✅ PR #2 | **버그 2건 수정** — §1 의 Python·bash 요건이 여기서 나왔다 |
| S3 규약 2본 | ✅ PR #3 | 훅 라이브 스모크 통과(세션에 실제로 배선됨을 확인) |
| S4 design 문서 ＋ 검사기 | ✅ PR #4 | RED→GREEN 3건. python 3.9.6 에서 동작 실증 |
| S5 스킬 3본 | ✅ PR #5 | `/design-bolt` 로드 확인 |
| **S8 CI** | ✅ PR #6 | 순서를 앞당겼다(위 §2). `guard-git.test.sh` 폴백 버그 1건 수정 |
| ~~S6 design-system~~ | ⛔ | **하지 않는다**([ADR-0005](docs/adr/0005-design-team-deliverables.md)) |
| ~~S7 a11y 베이스라인~~ | ⛔ | **하지 않는다**(같음) |

### 문서·내용 (S9~S16)

단계별 내용의 정본은 [docs/SOURCES.md](docs/SOURCES.md) 「순서」 절이다. 여기에 복제하지 않는다.

**이 표는 「순서」의 전 항목을 갖는다.** 빠진 행이 있으면 §9 가 그 단계에 도달하지 못한다.

| 기호 | 뜻 |
|---|---|
| ✅ | **이 단계의 작업이 끝났다.** 문서가 나중에 더 자라는 것과 무관하다 |
| 🔄 | **남은 작업이 있다** |
| ⏸ | 착수 전 |
| ⛔ | 하지 않는다 |

| 순 | 단계 | 상태 |
|---|---|---|
| — | S9 SOURCES ＋ `.gitignore` ＋ `CLAUDE.md` 판정 표 | ✅ PR #9 |
| **①** | export 반입 — `ds-export/` ＋ `_import/` | ✅ PR #14 |
| **②** | Figma 정리 | ✅ 09-01 반입 / **09-10 에 14섹션으로 늘었다** |
| **③** | S12 screen-inventory ＋ component-coverage ＋ **transition-map** ＋ `DS-nn` ／ S11 `docs/PRODUCT.md` | ✅ **19화면** ＋ 커버리지 ＋ 로그인 후 전이도 ＋ `DS-01`〜`DS-19`. **미결 3건은 사람 대기이지 남은 작업이 아니다** |
| **④** | S10 용어집 | ✅ 88행. 명칭 충돌 4건 결착 |
| **⑤** | 고아 분석 → `DS-nn` 기표 | ✅ 갭 12건 ＋ 보류 후보 6건 |
| **⑥** | **DS 갱신 — Claude Design 작업 ＋ 재export** | ⏸ **🖐 디자이너.** 차례는 `Tabs` → `EmptyState` → `Pagination` |
| **⑦** | **S16** `DESIGN.md` 파운데이션 | ✅ **11절 채움.** 입력은 `guidelines/` 17본 |
| **⑧** | S13 UI-SPEC §1~5 ＋ `template/` | ⏸ 첫 화면은 `notice-list` |
| — | S14 team-members ＋ CODEOWNERS | ⏸ 독립 |
| — | S15 UX 라이팅의 그릇 | ⏸ 보류 |

### 미검증으로 남은 것

- `check-docs.py` 의 **UI-SPEC 상태欄 검사**와 **`template/SOURCE.md` 존재 검사** — `design/screens/<id>/` 가 없어 코드 경로 자체가 안 돈다. **첫 화면 작업 때 실제로 먹는지 확인한다.**

---

## 4. 산출물의 종단

**정본은 [ADR-0005](docs/adr/0005-design-team-deliverables.md) 다.** 여기에 복제하지 않는다.

한 줄로: **디자인팀의 산출물은 6종에서 끝나고, 구현과 검증은 엔지니어가 한다.**

## 5. 첫 왕복으로 파이프라인을 실증한다

화면 1장으로 아래를 한 바퀴 돌린다. **여기서 나온 어긋남을 고치는 것까지가 환경 구축이다.**

```
UI-SPEC §1~5 작성 → UX승인 → Claude Design 생성 → template/ 배치 + SOURCE.md
  → UI-SPEC §6~11 작성 → 6품질축 감사 → UI-REVIEW.md
  → DS-nn 기표 → Claude Design 에서 수정 → 재export → ds-export/ 교체
```

DataSpace 도 「첫 디자인 Bolt 의 회고로 가이드를 고칠 전제」로 출발했고, 실제로 DS-update-list 상태 기계는 한 번 크게 고쳐졌다. **처음부터 완성형을 노리지 않는다.**

## 6. 역할

| 역할 | 담당 | 하는 일 |
|---|---|---|
| 요구·사인오프 | 디자이너(지수·Hyeok) | `DS-nn` 기표·UI-SPEC 작성·사인오프 |
| 문서 작성 | Claude Code | UI-SPEC·규칙 문서·PR 기표 |
| Claude Design 조작 | **디자이너** | AI 는 조작할 수 없다. Claude Code 는 프롬프트를 쓴다 |
| 검토 | **별도 Claude 세션** | Draft PR 에 `/pr-review` 1회 |
| 실장·BE | 엔지니어 | 별도 리포. 이 리포의 규약을 따르지 않아도 된다 |

**「작성」과 「검토」를 같은 세션에서 하지 않는다.** 작성자가 Claude 하나이므로 세션 분리가 견제 장치다.

### 두 사람이 화면을 나눌 때

화면은 디렉터리가 갈리므로 충돌하지 않는다(`design/screens/<screen-id>/`).

**사인오프는 요구자와 승인자를 가른다.**

| 판정 조건 | 아크션 |
|---|---|
| Hyeok 이 `DS-nn` 을 기표했다 | **지수가 사인오프** |
| 지수가 `DS-nn` 을 기표했다 | **Hyeok 이 사인오프** |
| 둘 다 관여했다 | 둘 중 하나. 판단이 갈리면 둘 다 |

**충돌하는 곳은 공유 표 3개뿐이다** — `DS-update-list.md`·`UX-PATTERNS.md`·`screen-inventory.md`.

**index 파일을 손으로 병합하지 않는다.** DataSpace 가 한 PR 에서 7번 겪은 사고다.

```sh
git checkout origin/main -- design/DS-update-list.md
# 자기 행만 다시 추가한다
git diff origin/main   # 의도한 행만 있는지 확인한다
```

### Hyeok 합류 시 할 일

1. **GitHub 계정에 이 리포 접근 권한 부여** (🖐 사람이 한다)
2. `.github/CODEOWNERS` 에 핸들 추가
3. `CLAUDE.md` 역할표를 두 명 구조로 개정

## 7. 하지 않는 것 (DataSpace 에서 가져오지 않은 것)

| 대상 | 가져오지 않는 이유 |
|---|---|
| AI-DLC 전체(`/inception`·`/bolt`·`/prebolt`·spec 상태 기계) | 8컨텍스트 규모에서 나온 것. 소수 팀에 과중하다 |
| 별도 `specs/` 층 | UI-SPEC 자체를 spec 으로 삼는다(§8-③) |
| `contracts/`·유비쿼터스 언어 3칼럼 표 | 다국어·다컨텍스트 사정에서 나온 구조 |
| PD 트래커 | DataSpace 가 88행까지 늘어 스스로 축소 재정했다. 처음부터 만들지 않는다 |
| 해시 채번·완료 spec 취급 규칙 | 전부 규모에서 파생된 것 |

## 8. DataSpace 와 의도적으로 다르게 한 것

**① `webui/` 층을 두지 않는다.** DataSpace 는 Java(Maven) 레인과 Node 레인을 가르려고 `webui/` 를 만들었다. 이 리포는 **Node 레인 자체가 없다**([ADR-0005](docs/adr/0005-design-team-deliverables.md)). 가를 대상이 없다.

**② `frontend/` 가 아니라 `design/`.** DataSpace 에서 `frontend/`(디자인 산출물)와 `webui/`(구현)를 이름만 보고 혼동하는 사고가 있었다.

**③ 별도 spec 층을 두지 않고 UI-SPEC 을 spec 으로 삼는다.**
- DataSpace 는 `specs/frontend/` 의 승인된 UoW 를 `/design-bolt` 의 입력으로 삼는다.
- UI-SPEC 의 §1~5 가 요건 그 자체다(화면의 사명·대상 사용자·액션 방침·구성과 하이어라키·적용 패턴).
- 소수 팀에서는 중복이다. **§1~5 를 먼저 승인하고 §6~11 로 진행하는 2단 승인**으로 대체한다.

**④ HtmlTemplate 의 JS·CSS 제약을 폐지했다가 되살렸다.**
- DataSpace 의 제약은 정적 HTML/CSS 만·JS 전량 제거·4상태 4파일·CSS 공통화다.
- 처음에는 폐지했다. 근거는 「기술 스택 확정 전에도 작업 가능한 형태를 유지한다」였고, mentree 는 React 확정이라 그 근거가 없었다.
- **2026-09-01 에 되살렸다**([ADR-0005](docs/adr/0005-design-team-deliverables.md)). **근거가 바뀌었다** — `template/` 이 인계 산출물이 되었다. 엔지니어가 열어서 바로 보므로 토글로 가려진 상태를 남길 수 없다.
- **남는 원칙**: `template/` 은 **시각적 참조**이지 **코드 이식원이 아니다**. CSS 를 그대로 옮기지 않는다.
- **추가**: `template/SOURCE.md`(Claude Design 링크·생성일·대응 UI-SPEC)를 둔다. 없으면 템플릿과 UI-SPEC 의 정합을 판정할 수 없다.

**⑤ 사인오프의 주체를 요구자와 가른다.** DataSpace 는 「원칙 2명, 부재 시 1명」이다. 여기는 §6 의 표를 따른다.

**⑥ DS-update-list 의 상태 기계를 5단에서 3단으로 줄인다.**
- 처음에는 「반영 ＝ Storybook 등재」로 고정했다. 구현 빌드의 행선지가 미정이었기 때문이다.
- **2026-09-01 에 고쳤다**([ADR-0005](docs/adr/0005-design-team-deliverables.md)). Storybook 을 만들지 않으므로 기준이 없어졌다.
- 지금은 **요구 → 반영(Claude Design) → 완료(`ds-export/` 교체)** 다.

**⑦ a11y 의 블로커를 세우지 않는다.**
- DataSpace 는 공공조달 요건(JIS X 8341-3)이 있어 WCAG 2.1 AA 미대응을 전부 블로커로 삼는다.
- mentree 는 민간 B2C 다. 기준선은 2.1 AA 로 두되 처음에는 **블로커를 axe 베이스라인 증가에 한정**했다.
- **2026-09-01 에 axe 하니스 자체를 만들지 않기로 했다**(ADR-0005). 기계가 없으므로 헌장 원칙 5에 따라 **블로커가 0이다.** 전부 `DS-nn` 기표나 `UI-REVIEW.md` 기록으로 보낸다.

## 9. 세션을 새로 열 때 쓰는 프롬프트

```
이 리포(jisoo-y-mentree/mentree2-pd-fe)에서 SETUP.md §3 이 가리키는 다음 단계를 이어서 한다.

루트의 SETUP.md 가 절차서다. 먼저 전부 읽어라.
§3(진행 상황)이 현황이고, 단계의 정의와 의존 관계는 docs/SOURCES.md 「순서」에 있다. 둘 다 읽어라.

진행 방식:
- 각 단계를 1 PR 로 끊는다. 한꺼번에 넣지 않는다
- 각 단계의 「끝났다고 판정하는 조건」을 실제로 실행해서 확인한 뒤 다음으로 간다
- 실행 순서는 §3 「끼워지는 순서」와 docs/SOURCES.md 「순서」를 따른다
- 판단이 필요한 점이 나오면 멈추고 선택지와 추천을 제시해라. 혼자 정하지 마라
- 개수·수치는 내 말보다 네 실측을 정본으로 삼아라

다음 단계는 docs/SOURCES.md 「순서」 표를 위에서부터 읽어, §3 에서 그 단계의 상태가 ⏸ 또는 🔄 인 첫 번째 것이다.
그 단계의 계획만 제시해라. 승인 전에 파일을 고치지 마라.
제시의 말미는 「A) 수정을 의뢰한다 / B) 진행한다」 2택으로.
```

## 10. 남은 미결

| 항목 | 언제 정하는가 |
|---|---|
| ~~구현 빌드의 행선지~~ | **정해졌다.** 이 리포 밖이다([ADR-0005](docs/adr/0005-design-team-deliverables.md)) |
| ~~`@mentree/design-system` 의 소비 방식~~ | **이 리포의 미결이 아니다.** 패키지를 만들지 않으므로 엔지니어가 정한다 |
| **`DESIGN.md` 를 언제 채우는가** | S16 으로 뺐다. 착수 조건은 `ds-export/` 반입 완료다 |
| 이 문서의 종단 | 전 단계 완료 후 §8 을 ADR 로 옮기고 이 파일을 삭제한다. 전문은 git 이력에 남는다 |
| CODEOWNERS 의 실효성 | **자동 리뷰 요청까지만 하고 강제하지 않는다.** 강제하려면 리포를 공개로 바꾸거나 GitHub Pro 가 필요하다. hyeok 이 PR 을 내기 시작하면 자동 요청이 발화한다 |
| Draft·`/pr-review` 의 예외 조항 | 같은 종류가 3건 쌓이면 그때 경계를 긋는다. `CLAUDE.md` 「Git」은 예외를 두지 않는다. PR #7(문서·주석의 문자열 치환 3행)은 Draft 없이 냈으므로 규칙 위반이다. **예외를 넣지 않기로 정했다.** 경계 후보는 「diff 가 문서·주석·설정값의 문자열 치환에 그치고 코드의 거동을 바꾸지 않는다」이고, `.claude/hooks/`·`scripts/`·`.github/workflows/` 의 로직 변경은 아무리 작아도 예외에 넣지 않는다 |
