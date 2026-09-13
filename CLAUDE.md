# mentree2-pd-fe — 프로젝트 문맥

## 이 리포가 맡는 것

**mentree 리뉴얼의 디자인과 디자인 시스템**을 담는다.

| 대상 | 위치 | 소유 |
|---|---|---|
| 화면의 정본(UI-SPEC·template·리뷰 기록) | `design/screens/` | 디자이너 |
| 디자인 규칙(요소·패턴·갱신 요구·심사 기준) | `design/*.md` | 디자이너 |
| 디자인 시스템 사양 | `design/ds-export/` | 디자이너(Claude Design 에서 갱신) |
| 디자인 시스템 구현·제품 앱·백엔드 | **이 리포 밖** | 엔지니어 |

**이 리포는 구현하지 않는다**([ADR-0005](docs/adr/0005-design-team-deliverables.md)). `apps/` 도 `packages/` 도 만들지 않는다. 산출물은 전부 마크다운과 정적 HTML 이다.

## 일하는 방식

- 디자인 워크플로의 정본은 [designer-workflow.md](docs/guidelines/designer-workflow.md) 다.
- 화면 1장의 1사이클은 **`/design-bolt`** 로 돈다.
- **계획 → 승인 → 실행의 순서를 지킨다.** 방침은 먼저 제시하고 승인을 받은 뒤 고쳐 쓴다.
- 제시의 말미는 **「A) 수정을 의뢰한다 / B) 진행한다」** 2택으로 한다.
- **언제 멈추고 묻는가는 판정 조건으로 정한다.** 「애매하면 묻는다」는 작동하지 않는다 — AI는 자기가 애매한지 모른다.

  | 판정 조건 | 아크션 |
  |---|---|
  | 되돌리려면 **여러 파일**을 고쳐야 한다 — 개념의 이름 · 화면 ID · 토큰 값 · 화면의 범위 | **멈추고 묻는다** |
  | 사실이 **아직 존재하지 않는다** — 아무도 정한 적이 없다 | **멈추고 묻는다.** 지금 정할지 「미결」로 남길지를 함께 제안한다 |
  | 답이 Figma · 기획 · 리포에 **있는데 못 찾았다** | **묻지 않는다. 더 찾는다** |
  | 영향이 그 문서 안에 닫히고 나중에 PR로 뒤집을 수 있다 | **정하고 진행한다.** 판단과 이유를 PR 본문에 쓴다 |

  물을 때는 ① 선택지 ② 추천 1개와 이유 ③ **이것을 정하지 않으면 무엇이 막히는가** 를 함께 낸다. 기록할 곳까지 제안한다. 상세는 [docs/SOURCES.md](docs/SOURCES.md) 「사람의 결정」.
- AI가 해서는 안 되는 작업(크레덴셜 투입·외부 환경 설정·배포 등 비가역 조작)은 **🖐 HUMAN TASK** 로 손순서를 써내고 사람의 완료 확인을 기다린다. 대행하지 않는다.

## 역할과 승인

| 역할 | 담당 |
|---|---|
| 요구·사인오프 | 디자이너(지수). 판단이 갈리면 Hyeok을 넣는다 |
| 문서 작성 | Claude Code |
| **Claude Design 조작** | **디자이너.** AI 는 조작할 수 없다. Claude Code 는 프롬프트를 쓴다 |
| 검토 | **별 세션의** Claude (`/pr-review`) |
| 실장·백엔드 | 엔지니어(별 리포) |

⚠️ **구현과 검토를 같은 세션에서 하지 않는다.** 구현자가 Claude 하나이므로 세션 분리가 유일한 견제 장치다.

## 문장 표현 (쓰는 것 전부에 공통)

- **결론을 먼저 쓴다. 판정은 OK/NG·한다/하지 않는다의 두 값으로 쓴다.**
- **애매어·LLM 말투·비유를 쓰지 않는다.**
- 금지어와 바꿔 쓰기, 1문의 상한, 예외는 [korean-writing-rules.md](docs/guidelines/korean-writing-rules.md) 가 정본이다.
- 마크다운을 쓰는 순간 [check-korean.sh](.claude/hooks/check-korean.sh) 가 해당 부분을 지적한다.

## 문서 작법

- 비즈니스 규칙은 **「판정 조건」과 「아크션」** 의 형태로 명문화한다.
- 성과물은 AI가 가공 없이 읽을 수 있는 형식으로 통일한다. 문서＝마크다운, 도식＝Mermaid.
- `design/` 문서군에 규칙을 추가·개정할 때는 [DESIGN-CHARTER.md](design/DESIGN-CHARTER.md) 의 8원칙 테스트를 통과시킨다.

## 산출물 규약

산출물은 **6종으로 끝난다**([ADR-0005](docs/adr/0005-design-team-deliverables.md)) — `design/ds-export/` · `DS-update-list.md` · `DESIGN.md` · `UX-PATTERNS.md` · 화면당 `UI-SPEC.md` · 화면당 `template/`.

- **식별자는 [용어집](docs/glossary/ubiquitous-language.md) English 열을 그대로 쓴다.** 표에 없는 영어명을 발명하지 않는다.
- **정본에 축이 둘이다** — 값을 **바꾸려면 Claude Design**(편집의 정본), 값을 **알려면 `design/ds-export/`**(참조의 정본). 정의는 [docs/SOURCES.md](docs/SOURCES.md) 「정본의 두 축」이다.
- **색·치수를 문서에 복제하지 않는다.** `design/ds-export/project/tokens/` 를 가리킨다.
- **`design/ds-export/` 를 손으로 고치지 않는다.** 고치면 두 축이 갈린다.
- **`template/` 은 브라우저로 바로 열리는 4상태다.** 파일을 열면 도는 런타임은 함께 둔다. **빌드가 필요한 것을 넣지 않는다.**
- **`template/` 의 CSS를 다른 곳으로 옮기지 않는다.** 그것은 시각적 참조이지 이식원이 아니다.
- 디자인 시스템에 없는 요소를 화면에서 즉석으로 만들지 않는다. [DS-update-list.md](design/DS-update-list.md) 에 기표한다.
- 문서를 고치면 `python3 scripts/check-docs.py` 를 돌리고 나서 리뷰에 낸다.

## Git

- **main에 직접 push하지 않는다.** 브랜치 ＋ PR 플로우. [guard-git.sh](.claude/hooks/guard-git.sh) 가 기계적으로 막는다.
- push는 **`git push -u origin <브랜치명>`**. `HEAD` 를 쓰지 않는다.
- **PR은 Draft로 만든다.** CI 실행 후에 **별 세션**에서 `/pr-review` 를 자기 Draft PR에 1회 통과시킨다. 지적을 결착시킨 뒤 Ready로 한다.
- **리뷰어는 Draft 동안에는 설정하지 않는다.** Ready화와 같은 호출로 설정한다.
- 커밋은 작게. 메시지는 「무엇을·왜」를 쓴다.
- AI가 주로 생성한 커밋에는 `Co-Authored-By: Claude <noreply@anthropic.com>` 를 붙인다.
- **PR의 제목·본문·코멘트·커밋 메시지는 한국어로 쓴다.**

## 보안

- 인증 정보·API 키·토큰을 코드·설정·로그·커밋에 쓰지 않는다. 시크릿은 환경 변수 경유로 한다.
- 인증·인가·암호·입력 검증 주변의 변경은 그 취지를 리뷰 시에 명시한다.
- **외부 라이브러리의 신규 추가는 제안 이유와 라이선스를 붙여 사람의 승인을 받는다.**

## 셸 조작

- 임시 파일은 **Write 도구로** 만든다. `cat <<'EOF' > file` 은 정적 해석이 안 돼 막힐 수 있다.
- 여러 줄 처리를 원라이너로 짜지 않는다. 스크립트로 만들어 `bash <파일>` 로 실행한다.
