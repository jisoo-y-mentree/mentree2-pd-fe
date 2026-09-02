# mentree2-pd-fe

mentree 리뉴얼의 **디자인과 디자인 시스템** 리포다.

## 무엇이 어디에 있는가

| 디렉터리 | 내용 |
|---|---|
| `design/screens/` | 화면의 정본 — `UI-SPEC.md` · `template/` · 리뷰 기록 |
| `design/ds-export/` | 디자인 시스템 사양 — 토큰·컴포넌트 소스·원칙 |
| `design/*.md` | 디자인 규칙 — `DESIGN.md` · `UX-PATTERNS.md` · `DS-update-list.md` |
| `docs/guidelines/` | 일하는 방식과 문서 규약 |
| `.claude/` | AI 상설 지시·스킬·훅 |

**이 리포는 구현하지 않는다**([ADR-0005](docs/adr/0005-design-team-deliverables.md)). 산출물은 마크다운과 정적 HTML 뿐이다. 디자인 시스템 구현·앱·백엔드는 엔지니어가 별 리포에서 한다.

## 처음 오면 읽는 것

| 순 | 파일 | 무엇을 알 수 있는가 |
|---|---|---|
| 1 | [PRODUCT.md](docs/PRODUCT.md) | **무엇을 만드는가.** 제품 전제와 MVP 범위 |
| 2 | [screen-inventory.md](design/docs/screen-inventory.md) | **화면 21장의 목록과 만드는 차례** |
| 3 | [CLAUDE.md](CLAUDE.md) | 이 리포의 규약 전체 |
| 4 | [designer-workflow.md](docs/guidelines/designer-workflow.md) | 화면 1장을 만드는 흐름 |
| 5 | [ADR-0005](docs/adr/0005-design-team-deliverables.md) | 무엇까지 만들고 무엇을 넘기는가 |
| 6 | [DESIGN-CHARTER.md](design/DESIGN-CHARTER.md) | 디자인 문서를 심사하는 8원칙 |
| 7 | [ubiquitous-language.md](docs/glossary/ubiquitous-language.md) | **이름의 정본.** 개념·화면 ID·컴포넌트 |
| 8 | [DS-update-list.md](design/DS-update-list.md) | 디자인 시스템의 미비·미정 |
| 9 | [korean-writing-rules.md](docs/guidelines/korean-writing-rules.md) | 문장 규약 |

환경 구축 순서는 [SETUP.md](SETUP.md) 에 있다.

## 자주 쓰는 명령

빌드도 의존 설치도 없다. 클론하면 바로 읽힌다.

```sh
python3 scripts/check-docs.py    # 문서의 기계적 정합성. 커밋 전에 돌린다
```

## 일하는 방식 요약

```
UI-SPEC §1~5 → UX승인 → /design-bolt → Draft PR → 별 세션 /pr-review → Ready → 머지
                                ↓
              DS-nn 기표 → Claude Design 에서 수정 → 재export → ds-export/ 교체
```

| 역할 | 담당 |
|---|---|
| 요구·사인오프 | 디자이너 |
| 문서 작성 | Claude Code |
| Claude Design 조작 | **디자이너.** AI 는 조작할 수 없다 |
| 검토 | **별 세션의** Claude |
| 실장·백엔드 | 엔지니어(별 리포) |

⚠️ **작성과 검토를 같은 세션에서 하지 않는다.** 작성자가 Claude 하나이므로 세션 분리가 유일한 견제 장치다.
