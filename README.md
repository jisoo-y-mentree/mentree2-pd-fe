# mentree2-pd-fe

mentree 리뉴얼의 **디자인과 디자인 시스템** 리포다.

## 무엇이 어디에 있는가

| 디렉터리 | 내용 |
|---|---|
| `design/` | 화면의 정본(UI-SPEC·template·리뷰 기록)과 디자인 규칙 |
| `packages/design-system/` | `@mentree/design-system` — 토큰·컴포넌트·Storybook |
| `docs/guidelines/` | 일하는 방식과 문서 규약 |
| `.claude/` | AI 상설 지시·스킬·훅 |

**제품 앱과 백엔드는 이 리포에 없다.** 구현 빌드의 행선지는 미정이다.

## 처음 오면 읽는 것

| 순 | 파일 | 무엇을 알 수 있는가 |
|---|---|---|
| 1 | [CLAUDE.md](CLAUDE.md) | 이 리포의 규약 전체 |
| 2 | [designer-workflow.md](docs/guidelines/designer-workflow.md) | 화면 1장을 만드는 흐름 |
| 3 | [DESIGN-CHARTER.md](design/DESIGN-CHARTER.md) | 디자인 문서를 심사하는 8원칙 |
| 4 | [DS-update-list.md](design/DS-update-list.md) | 디자인 시스템 갱신 요구의 그릇 |
| 5 | [korean-writing-rules.md](docs/guidelines/korean-writing-rules.md) | 문장 규약 |

환경 구축 순서는 [SETUP.md](SETUP.md) 에 있다.

## 자주 쓰는 명령

```sh
pnpm storybook        # 디자인 시스템을 띄운다(사인오프는 이것으로 대조한다)
pnpm lint             # oxlint
pnpm typecheck        # tsc --noEmit
pnpm test             # vitest
pnpm test:a11y        # axe 베이스라인과 대조. 늘면 실패한다
```

## 일하는 방식 요약

```
UI-SPEC §1~5 → UX승인 → /design-bolt → Draft PR → 별 세션 /pr-review → Ready → 머지
                                ↓
                        DS-nn 기표 → 구현 → Storybook → 사인오프
```

| 역할 | 담당 |
|---|---|
| 요구·사인오프 | 디자이너 |
| 구현 | Claude Code |
| 검토 | **별 세션의** Claude |
| 백엔드 | 엔지니어(별 리포) |

⚠️ **구현과 검토를 같은 세션에서 하지 않는다.** 구현자가 Claude 하나이므로 세션 분리가 유일한 견제 장치다.
