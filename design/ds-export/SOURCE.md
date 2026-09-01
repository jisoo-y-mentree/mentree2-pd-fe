# ds-export — 출처와 범위

> 이 디렉터리가 답하는 것: **디자인 시스템의 값과 사양은 무엇인가.**
> 디자인 시스템 사양의 정본이다. FE 인계의 입력이다([ADR-0005](../../docs/adr/0005-design-team-deliverables.md)).

- 출처: Claude Design (radarlab 계정)
- 원본: `Mentree2 Design System-handoff.zip`
- 반입일: 2026-08-31
- 원본 SHA-256: `5e43bc6d53deaf104c3338fd9c2cea298b9b1ec0e55275492030658dcca6014c`

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
| `project/components/` | 컴포넌트 30본. 각 `.jsx` ＋ `.d.ts` ＋ `.prompt.md` ＋ `.card.html` | ② 소스 |
| `project/_ds_bundle.js` | 컴포넌트 41 export 번들 | ② |
| `project/_ds_manifest.json` | 컴포넌트·카드·토큰·폰트의 목록 | ② |
| `project/guidelines/` | 원칙 16본(HTML) — 색 · 타입 · 간격 · 표면 · 동심중첩 · 브랜드 ／ **`03-responsive.md` — 반응형 3구간의 통합 지침** | ③ 원칙 |
| `project/readme.md` · `SKILL.md` | DS 전체 서술과 빠른 참조 | ③ |
| `project/assets/` | 국기 SVG 19본 · 로고 2본 | 자산 |
| `project/ui_kits/mentree-top/` | TOP 화면 조립 예시(HTML) | ⑤ 화면 정적 |
| `project/_adherence.oxlintrc.json` | Claude Design 쪽 lint 설정 | 참고 |

컴포넌트가 30본인데 export 가 41개인 이유는 **하위 export** 때문이다. `Avatar`/`AvatarGroup`, `Card` 계열 6, `nav-ia.js` 의 `NAV_*` 4, `Field`/`FieldGroup` 이 별도로 세어진다.

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
| 미구현·미정 8건 | [DS-update-list.md](../DS-update-list.md) `DS-01`〜`DS-08` |
| 화면별 사양 | `design/screens/<id>/UI-SPEC.md` |
| 이관 경위·파이프라인·진행 상태 | `design/_import/resume-pack/`(커밋하지 않는다) |
