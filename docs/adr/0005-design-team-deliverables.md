# ADR-0005: 디자인팀의 산출물을 6종으로 한정한다

- 상태: 승인
- 날짜: 2026-09-01

## 문맥

이 리포는 디자인 시스템의 **구현까지** 하는 전제로 세웠다. S6(`packages/design-system`)와 S7(a11y 베이스라인)이 그것이다. [ADR-0001](0001-ssot-is-implementation-repo.md) 은 「repo 적재」를 컷오버 시점으로 정했고, [ADR-0003](0003-design-system-package-placement.md) 은 패키지의 자리를 정했다.

**그 전제를 바꾼다.** 디자인팀에 FE 인력이 없다. 구현을 떠안으면 완수 시점을 약속할 수 없다.

## 결정

**디자인팀의 산출물은 아래 6종으로 끝난다.** 실장과 검증은 엔지니어가 한다.

| 산출물 | 성격 |
|---|---|
| `design/ds-export/` | **디자인 시스템 사양의 正** — 토큰·컴포넌트 소스·원칙 |
| `design/DS-update-list.md` | 그 사양의 **미비·미정 목록**(`DS-nn`) |
| `design/DESIGN.md` | 디자인 원칙 |
| `design/UX-PATTERNS.md` | 화면에 닫히지 않는 공통 패턴(`P-nn`) |
| `design/screens/<id>/UI-SPEC.md` | **구현 입력의 正** — 설계 의도·블록별 규칙·4상태·전이·판정 조건과 아크션 |
| `design/screens/<id>/template/` | **비주얼의 正** — 정적 HTML/CSS. JS 없음, 빌드 불요 |

**만들지 않는다**: `packages/design-system` · Storybook · a11y 자동 검사 · 앱 코드.

`design/ds-export/` 는 이 결정과 함께 신설한다. `DS-update-list.md` 는 **갱신 요구의 그릇**이지 사양이 아니다. 사양의 그릇이 따로 없으면 인계할 값이 없다.

## 근거

- **디자인팀에 FE 인력이 없다.** 구현을 스코프에 넣으면 약속을 지킬 수 없다. 못 지킬 약속을 하지 않는다.
- **6종이 전부 마크다운과 정적 HTML 이다.** 빌드도 배포도 의존도 없다. 디자이너 3인이 유지할 수 있는 형태다.
- **핸드오프의 최종 형태가 이 6종이므로 리포 자체가 인계 매체가 된다.** 「정리해서 넘긴다」는 단계가 사라진다. 머지된 것이 넘긴 것이다.
- 채택하지 않은 안: **S6 까지 한다.** 디자인 시스템 코드·Storybook·a11y 검사는 FE 작업이다. 디자인팀이 착수하면 완료를 담보할 수 없고, 미완의 코드가 인계를 오히려 어렵게 한다.
- 채택하지 않은 안: **리포를 접고 Figma 와 문서 도구로 돌아간다.** `template/` 은 HTML 파일이고 `UI-SPEC` 은 Mermaid 도식을 포함한다. 문서 도구에 들어가지 않는다. 3인 분담의 충돌 감지와 「무엇이 최신인가」를 사람이 관리하게 된다.

## 귀결

**이 결정으로 판단이 바뀌는 곳이 6곳이다. 같은 PR 에서 고친다.**

| 어디 | 무엇이 바뀌는가 |
|---|---|
| [ADR-0001](0001-ssot-is-implementation-repo.md) | **컷오버가 없어진다.** 대신 정본에 축이 둘이 된다 — **편집은 Claude Design, 참조는 `ds-export/`**(`docs/SOURCES.md` 「정본의 두 축」) |
| [ADR-0003](0003-design-system-package-placement.md) | **폐기한다.** `packages/design-system` 을 만들지 않는다 |
| [DS-update-list.md](../../design/DS-update-list.md) | 「반영 ＝ Storybook 등재」가 성립하지 않는다. **상태 기계를 5단에서 3단으로** 재정의한다 |
| [DESIGN-CHARTER.md](../../design/DESIGN-CHARTER.md) 원칙 5 | 집행층의 `[lint]` 가 **문서 검사로 좁혀진다.** 토큰·DS·a11y 의 기계 검출이 없어진다 |
| `.claude/skills/design-bolt` 페이즈 3 | a11y 블로커가 없어진다. `template/` 이 **JS 없는 4파일**로 고정된다 |
| `.github/workflows/ci.yml` | `node` 잡을 지운다. 영구히 건너뛰는 잡은 가짜 그린이다 |

**위 6곳을 따라가는 문언 수정이 14곳 더 있다** — `CLAUDE.md` · `README.md` · `SETUP.md` · `docs/SOURCES.md` · `docs/glossary/ubiquitous-language.md` · `docs/guidelines/designer-workflow.md` · `design/screens/README.md` · `design/DESIGN.md` · `.claude/skills/pr-review` · `.claude/hooks/check-korean.py` · `.github/pull_request_template.md` · `.claude/settings.json` · `.gitignore` · `package.json`(삭제).

그 밖의 귀결.

- **`DESIGN.md` 를 채우는 시점이 S6 였다.** S6 가 없어지므로 **S16** 으로 뺀다. 채우는 입력은 `ds-export/project/guidelines/` 다(반응형 지침 `03-responsive.md` 도 그 안에 있다).
- **a11y 의 블로커가 0이 된다.** 기계 검출이 없어지므로 헌장 원칙 5에 따라 블로커를 세울 수 없다. 대비·포커스·타겟 사이즈의 미달은 `DS-nn` 으로 기표해 FE 로 넘긴다.
- `packages/`·`pnpm-workspace.yaml`·`.nvmrc` 는 커밋하지 않은 채였다. 그대로 버린다.
- 되돌리려면 위 6곳과 이 문서를 되돌리고 S6·S7 을 다시 세워야 한다. **범위가 다시 넓어지면 새 ADR 로 남긴다.**
- 관련: [ADR-0001](0001-ssot-is-implementation-repo.md) · [ADR-0002](0002-rebuild-design-system-instead-of-sharing.md) · [ADR-0003](0003-design-system-package-placement.md)
