# SETUP.md — mentree2-pd-fe 환경 구축 순서

> 이 문서는 **설치를 실행하는 사람(또는 Claude 세션)이 읽는 절차서**다.
> 대상 리포: `jisoo-y-mentree/mentree2-pd-fe`
> 출처: DataSpace-v2(`radarlab-inc/DataSpace-v2`)의 디자인 파이프라인을 이식한 것. 이식 판단의 근거는 §7에 남긴다.

## 0. 이 리포가 맡는 것 / 맡지 않는 것

| 판정 조건 | 아크션 |
|---|---|
| 디자인 산출물(UI-SPEC·template·리뷰 기록)을 둔다 | ✅ 이 리포 `design/` |
| 디자인 시스템(토큰·컴포넌트·Storybook)을 둔다 | ✅ 이 리포 `packages/design-system/` |
| 제품 앱(Next.js 실장 빌드)을 둔다 | ❌ **미정.** 구현 빌드의 행선지가 미정이다. 이 리포에 `apps/`를 만들지 않는다 |
| 백엔드 | ❌ 엔지니어 리포 |

**`apps/`를 지금 만들지 않는 것이 이 설계의 핵심이다.** 실장 빌드의 행선지가 논의 전이므로, 디자인 시스템을 **어느 리포에서도 소비 가능한 패키지**(`@mentree/design-system`)로 두고 앱은 나중에 붙인다.

## 1. 사전 준비 (사람이 하는 것)

- [ ] Node 24 이상 / pnpm(corepack) 사용 가능
- [ ] VS Code + Claude Code 확장 설치
- [ ] Claude Code를 **mentree 계정으로** 기동할 수 있는 상태 (radarlab 계정과 분리)
- [ ] 리포를 로컬에 clone

## 2. 설치 순서

각 단계는 **1 PR**로 끊는다. 한 번에 넣지 않는다.

| 단계 | 넣는 것 | 끝났다고 판정하는 조건 |
|---|---|---|
| **S1** | `CLAUDE.md`·`README.md`·`.gitignore`·`.github/pull_request_template.md`·`.github/CODEOWNERS` | PR을 만들면 템플릿이 뜬다 |
| **S2** | `.claude/hooks/` **훅 4본 ＋ 자기검사 4본 ＋ `guard-pr.wiring.py`** ＋ `.claude/settings.json` | 4본의 `*.test.sh` 가 전부 통과한다(feature 브랜치에서) |
| **S3** | `docs/guidelines/korean-writing-rules.md`·`designer-workflow.md` | S2의 훅이 가리키는 정본이 존재한다 |
| **S4** | `design/` 문서 6본 ＋ `docs/adr/README.md` ＋ **`scripts/check-docs.py`** | `python3 scripts/check-docs.py` 가 exit 0 |
| **S5** | `.claude/skills/` **3본**(`design-bolt`·`pr`·`pr-review`) | `/design-bolt` 를 부를 수 있다 |
| **S6** | `package.json`·`pnpm-workspace.yaml`·`.nvmrc` ＋ `packages/design-system/` 스캐폴드 ＋ Storybook | `pnpm storybook` 이 뜬다 |
| **S7** | a11y 하니스(`scripts/a11y.mjs`·`a11y-baseline.mjs`) ＋ 베이스라인 생성 | `pnpm test:a11y` 가 exit 0 |
| **S8** | `.github/workflows/ci.yml` | PR에서 `checks`·`node` 2잡이 녹색 |

### 순서를 이렇게 잡은 이유

**`ci.yml` 을 마지막에 넣는다.** `checks` 잡이 훅의 자기검사 4본(S2)과 `check-docs.py`(S4)를 부르고, `node` 잡이 design-system(S6·S7)을 쓴다. **먼저 넣으면 아직 없는 파일을 불러 빨갛게 된다.**

**S6 이전에 S7을 시도하지 않는다.** 검사할 대상이 없으면 a11y 하니스는 아무것도 안 잡는다.

### S2의 주의 — 훅 자기검사는 실행 위치에 따라 거짓 실패한다

`guard-git.test.sh`는 **git 리포 안 + feature 브랜치**를 전제한다. 그 밖에서 돌리면 실패가 나오는데 결함이 아니다.

| 실행 위치 | 결과 | 이유 |
|---|---|---|
| feature 브랜치 | 전부 통과 | 정상 |
| **기본 브랜치(main)** | `git push` 계열이 실패로 나온다 | 훅이 **정상적으로 차단**하는데 테스트는 허용을 기대한다 |
| **git 리포 밖** | `git push` 계열이 실패로 나온다 | 브랜치 판정 재료가 없어 **설계대로 허용 측으로 떨어진다** |

**설치 직후에 이 실패를 보고 훅을 고치지 않는다.** feature 브랜치에서 다시 돌려 확인한다. CI(S7)는 항상 feature 브랜치에서 돌므로 문제되지 않는다.

## 3. S6의 스캐폴드

킷에 `package.json`·`pnpm-workspace.yaml`·`packages/design-system/package.json` 의 뼈대가 들어 있다. shadcn 스캐폴드는 `packages/design-system` 안에서 실행한다.

**토큰 프리셋은 mentree용으로 새로 고른다.** DataSpace의 프리셋(Vega·Mist·Blue·radius 0.875rem)은 B2B 고밀도 전제이므로 그대로 쓰지 않는다.

**결정해야 하는 것**: 팔레트 / 타이포 스케일 / 폰트 / radius. 이것은 `design/DESIGN.md` 의 첫 내용이 된다.

`packages/design-system/package.json` 의 `name`·`exports` 는 **바꾸지 않는다.** 나중에 다른 리포가 `@mentree/design-system` 을 소비할 수 있게 하려고 지금 잡아둔 것이다.

## 4. 첫 왕복으로 파이프라인을 실증한다 (S8 이후)

화면 1장으로 아래를 한 바퀴 돌린다. **여기서 나온 어긋남을 고치는 것까지가 환경 구축이다.**

```
UI-SPEC §1~5 작성 → 승인 → Claude Design 생성 → template/ 배치 + SOURCE.md
  → UI-SPEC §6~11 작성 → 6품질축 감사 → UI-REVIEW.md
  → DS-nn 기표(디자인 시스템에 부족한 것) → 구현 → Storybook
  → 지수 대조 → Approve = 사인오프 → 완료
```

DataSpace도 「첫 디자인 Bolt의 회고로 가이드를 고칠 전제」로 출발했고, 실제로 DS-update-list 상태 기계는 한 번 크게 고쳐졌다. **처음부터 완성형을 노리지 않는다.**

## 5. 역할

| 역할 | 담당 | 하는 일 |
|---|---|---|
| 요구 | 지수 | DS-nn 기표·UI-SPEC 작성·사인오프 |
| 구현 | Claude Code | 디자인 시스템 구현·PR 기표 |
| 검토 | 별도 Claude 세션 | Draft PR에 `/pr-review` 1회 |
| BE | 엔지니어 | 별도 리포. 이 리포의 규약을 따르지 않아도 된다 |

**「구현」과 「검토」를 같은 세션에서 하지 않는다.** DataSpace는 사람 둘(구현·승인)의 상호 견제가 있었으나 여기는 Claude 하나이므로, **세션 분리가 유일한 견제 장치**다.

## 6. 하지 않는 것 (DataSpace에서 가져오지 않은 것)

| 대상 | 가져오지 않는 이유 |
|---|---|
| AI-DLC 전체(`/inception`·`/bolt`·`/prebolt`·spec 상태 기계) | 8컨텍스트 규모에서 나온 것. 3인 팀에 과중하다 |
| 별도 `specs/` 층 | UI-SPEC 자체를 spec으로 삼는다(§7-③) |
| `contracts/`·유비쿼터스 언어 3칼럼 표 | 다국어·다컨텍스트 사정에서 나온 구조 |
| PD 트래커 | DataSpace가 88행까지 늘어 2026-08-28에 스스로 축소 재정했다. 처음부터 만들지 않는다 |
| 해시 채번·완료 spec 취급 규칙·post-camp 절차 | 전부 규모에서 파생된 것 |

## 7. DataSpace와 의도적으로 다르게 한 것

**①  `webui/` 층을 두지 않는다.** DataSpace는 Java(Maven) 레인과 Node 레인을 가르려고 `webui/`를 만들었다. 이 리포는 FE 전용이므로 pnpm workspace를 리포 루트에 둔다.

**② `frontend/`가 아니라 `design/`.** DataSpace에서 `frontend/`(디자인 산출물)와 `webui/`(구현)를 이름만 보고 혼동하는 사고가 있었다.

**③ 별도 spec 층을 두지 않고 UI-SPEC을 spec으로 삼는다.**
- DataSpace는 `specs/frontend/`의 승인된 UoW를 `/design-bolt`의 입력으로 삼는다.
- UI-SPEC v2의 §1~5가 요건 그 자체다(화면의 사명·대상 사용자·액션 방침·구성과 하이어라키·적용 패턴).
- 3인 팀에서는 중복이다. **§1~5를 먼저 승인하고 §6~11로 진행하는 2단 승인**으로 대체한다.

**④ HtmlTemplate의 JS·CSS 제약을 폐지한다.**
- DataSpace의 제약은 정적 HTML/CSS만·JS 전량 제거·4상태 4파일·CSS 공통화다.
- 근거는 「기술 스택 확정 전에도 작업 가능한 형태를 유지한다」였다. mentree는 Next.js+shadcn 확정이므로 근거가 없다.
- **대신 남기는 원칙**: `template/`은 React 구현의 **시각적 참조**이지 **코드 이식원이 아니다**. CSS를 그대로 옮기지 않는다.
- **추가**: `template/SOURCE.md`(Claude Design 링크·생성일·대응 UI-SPEC)를 둔다. 없으면 템플릿과 UI-SPEC의 정합을 판정할 수 없다.

**⑤ 사인오프는 지수 1명 원칙.** DataSpace는 「원칙 2명, 부재 시 1명」이나 3인 팀에는 무겁다. 판단이 갈릴 때만 Hyeok을 넣는다.

**⑥ DS-update-list의 「반영」을 Storybook 등재 시점으로 고정한다.** 구현 빌드의 행선지가 미정이다. 「앱에 반영되었는가」를 기준으로 삼으면 리포가 갈린 순간 상태 기계가 무너진다.

## 8. 멘트리 세션에 붙여넣는 첫 프롬프트

리포 루트에서 킷을 푼 뒤, VS Code 의 Claude Code 에 아래를 그대로 붙여넣는다.

```
이 리포(jisoo-y-mentree/mentree2-pd-fe)에 디자인 파이프라인을 설치한다.

루트의 SETUP.md 가 절차서다. 먼저 전부 읽어라. 특히 §2(설치 순서)와
§7(DataSpace 와 의도적으로 다르게 한 것)을 읽고 나서 움직여라.

진행 방식:
- S1 부터 순서대로. 각 단계를 1 PR 로 끊는다. 한꺼번에 넣지 않는다
- 각 단계의 「끝났다고 판정하는 조건」을 실제로 실행해서 확인한 뒤 다음으로 간다
- 순서를 바꾸지 않는다. ci.yml 이 마지막인 데는 이유가 있다(§2)
- 판단이 필요한 점이 나오면 멈추고 선택지와 추천을 제시해라. 혼자 정하지 마라

먼저 S1 의 계획만 제시해라. 승인 전에 파일을 고치지 마라.
제시의 말미는 「A) 수정을 의뢰한다 / B) 진행한다」 2택으로.
```

**S1 이전에 `git switch -c` 로 작업 브랜치를 만들어야 한다.** `guard-git.sh` 가 기본 브랜치로의 push 를 막는다.

## 9. 남은 미결

| 항목 | 언제 정하는가 |
|---|---|
| 토큰 프리셋(팔레트·타이포·폰트·radius) | S6 |
| 구현 빌드의 행선지(이 리포 / 엔지니어 리포) | 엔지니어와 논의 후. **이 리포의 설계는 어느 쪽이어도 깨지지 않는다** |
| `@mentree/design-system`의 배포 방식(npm / git 참조 / workspace) | 위가 정해진 뒤 |
| FE 인원 추가 시의 역할 재배치 | 추가가 확정된 뒤 |
