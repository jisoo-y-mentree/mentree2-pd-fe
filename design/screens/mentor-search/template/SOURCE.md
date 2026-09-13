# template — 출처와 범위

- 출처: Claude Design (radarlab 계정) — 프로젝트 **`Screen States`**
- 원본: `mentree-screen-states` export 의 `project/screens/mentor-search/`
- **생성일: 2026-09-13**
- 대응 UI-SPEC: **`bec4829`**

**공유 링크를 적지 않는다.** 조직 이동으로 깨진다([ADR-0002](../../../../docs/adr/0002-rebuild-design-system-instead-of-sharing.md)). 계정과 프로젝트 이름으로 찾는다.

## 이것은 무엇인가

**React 구현의 「시각적 참조」다. 「코드 이식원」이 아니다.**

| 판정 조건 | 아크션 |
|---|---|
| 화면이 어떻게 생겼는지 보고 싶다 | **`normal.html` 을 브라우저로 연다.** 더블클릭하면 된다 |
| 구현할 때 CSS 를 가져오고 싶다 | **가져오지 않는다.** 구현은 디자인 시스템의 토큰과 컴포넌트로 한다 |
| 여기와 UI-SPEC 이 어긋난다 | **UI-SPEC 이 정본이다.** 양쪽을 고친다 |
| 레이아웃·구조를 고쳐야 한다 | **Claude Design 으로 돌아가 재생성한다.** 여기서 고치지 않는다 |

## 무엇이 들어 있는가

| 경로 | 내용 |
|---|---|
| `normal.html` · `loading.html` · `empty.html` · `error.html` | **4상태.** UI-SPEC §7 과 같은 이름이다 |
| `support.js` | `<x-import>` 와 `{{ }}` 를 해석하는 런타임. **없으면 빈 페이지가 된다** |
| `_ds/` | 토큰 6본 ＋ `styles.css` ＋ 컴포넌트 번들 |
| `assets/` | 국기 3본 ＋ 로고 |

**이 export 는 정적 HTML 이 아니다.** `<x-import component-from-global-scope="…">` 커스텀 엘리먼트와 `{{ }}` 템플릿이고 런타임이 해석해야 화면이 나온다. **빌드는 필요 없다** — 파일을 열면 돈다.

## 배치할 때 고친 것 — 재export 때 다시 한다

**원 export 는 `project/screens/<id>/` 아래에 있어 상대경로가 두 단계 위를 가리킨다.** 평탄화하면서 셋을 다시 걸었다.

| 무엇 | 어떻게 |
|---|---|
| `../../_ds/<UUID>/` | **`./_ds/`** — UUID 폴더명을 평탄화했다 |
| `../../assets/` (로고) | **`./assets/`** |
| `_ds_bundle.js` 의 `"../../assets/flags/"` | **`"./assets/flags/"`** — `Badge` 의 `FLAG_BASE` 가 **DS 카드(`components/core/`) 기준**이라 화면에서 밖으로 나간다. **안 고치면 국기가 전부 빈 원이 된다** |

**손순서는 `scripts/` 가 아니라 세션의 배치 스크립트가 갖는다.** 다음 화면에서 같은 일을 한다.

## 무엇을 뺐는가

| 뺀 것 | 크기 | 이유 |
|---|---|---|
| `assets/fonts/PretendardJPVariable.ttf` | 12MB | **폰트 바이너리를 리포에 넣지 않는다.** `ds-export` 와 같은 이유 |
| 최상위 `support.js` 중복 1벌 | 69KB | 화면 폴더의 것과 **바이트 동일**하다 |

**폰트를 뺐으므로 열면 시스템 폰트가 뜬다.** 자간·줄높이는 맞고 글자꼴만 다르다. 지정의 정본은 `ds-export/project/tokens/fonts.css` 다.

## 알려진 어긋남

**`UI-REVIEW.md` 가 정본이다.** 2026-09-13 시점에 **블로커 2건**이 열려 있다 — 반응형 미구현과 걸린 조건 칩의 ✕ 누락.
