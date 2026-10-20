# template 의 출처

- Claude Design: 프로젝트 **`mentor-detail`**(radarlab 계정 · export 파일 이름이 프로젝트 이름이다). 공개 공유 링크는 적지 않는다([ADR-0002](../../../../docs/adr/0002-rebuild-design-system-instead-of-sharing.md))
- 원본: `design/_import/export-1008/mentor-detail (1015).zip` · SHA-256 `b2e0fec825a0` · **생성 2026-10-15 13:32 · 5차**(지수). **편집 면이 처음 들어온 판이다.** 4차(2026-09-28 09:16)는 방문자 면만 있었다
- **생성일: 2026-10-15**
- 대응 UI-SPEC: [`../UI-SPEC.md`](../UI-SPEC.md) — 방문자 면(1 · 2부)과 편집 면(3 · 4부)
- 디자인 시스템: `ds-export/` 의 **2026-10-14 판**(53본 · zip `af278860480b`)을 가리킨다. **export 의 `_ds` 사본은 그보다 옛 판이다** — `DS-100`(헤더의 기업 서비스 로고) · `DS-111`(`Tabs fill`) · `DS-115` · `DS-116` · `DS-29`(`SectionHeader size`)가 없다. 두 판으로 같은 상태(전체 페이지 7 · 편집 모달 4)를 찍어 대조했다. 전체 높이는 모두 같고, 보이는 차이는 헤더 오른쪽 버튼 하나다(옛 판 「기업 서비스」 글자 → 10-14 판 비즈 로고)

## 이것은 무엇인가

**React 구현의 「시각적 참조」다. 「코드 이식원」이 아니다.**

| 판정 조건 | 아크션 |
|---|---|
| 화면이 어떻게 생겼는지 보고 싶다 | **`MentorDetail.dc.html` 을 로컬 서버로 연다.** 아래 「여는 법」 |
| 구현할 때 CSS 를 가져오고 싶다 | **가져오지 않는다.** 구현은 디자인 시스템의 토큰과 컴포넌트로 한다 |
| 여기와 UI-SPEC 이 어긋난다 | **UI-SPEC 이 정본이다.** 양쪽을 고친다 |
| 레이아웃·구조를 고쳐야 한다 | **Claude Design 으로 돌아가 재생성한다.** 여기서 고치지 않는다 |

## 무엇이 들어 있나

**화면 1장이다.** 역할 · 데이터 · 상태 · 탭 · 편집 모달을 URL 인자로 바꾼다. 맨 위의 데모 줄(`data-demo-shell`)이 같은 일을 하는 선택 상자다.

| 파일 | 무엇 |
|---|---|
| `MentorDetail.dc.html` | 화면. 데모 줄 ＋ 멘토 상세(방문자 면 · 편집 면) ＋ 모바일 목업 틀(`view=mobile` 을 iframe 으로 다시 연다) |
| `support.js` | `<x-import>` 와 `{{ }}` 를 해석하는 런타임. **없으면 빈 페이지가 된다.** 4차 판과 바이트가 같다 |
| `ds-asset-path.js` | DS 부품의 기본 자산 경로 `../../assets/` 를 `ds-export/project/assets/` 로 돌리는 심. `top` 과 같은 파일이다 |
| `assets/img/2-avatar.png` · `2-cover-alt.png` | 이 화면에만 쓰는 사진 — 본인 아바타 · 인터뷰 2편 데이터의 두 번째 표지. 4차 판과 바이트가 같다 |
| `assets/map/world-d.js` | 세계지도의 경로 데이터(Natural Earth 110m). **자리표시다** — 화풍은 아트디렉션에서 정한다(`DS-54`) |

### 상태를 여는 주소 — UI-SPEC §7 · 편집 §7

| 상태 | 주소 |
|---|---|
| 정상 | `MentorDetail.dc.html` |
| 로딩 · 없음(404) · 에러 · 탭 에러 | `?state=loading` · `?state=404` · `?state=error` · `?state=tab-error` |
| 빈 상태 | **없다** — §7 「화면 전체의 빈 상태는 없다」. 섹션 · 탭의 0건은 `?data=new` 에서 숨는다 |
| 편집 모달 | `?role=self&edit=<키>` — 키는 아래 표 |
| 편집 모달의 상태 | `&editState=saving` · `error` · `dirty`(닫으려 할 때의 확인) |

**4상태가 4파일로 나뉘어 있지 않다.** 한 파일에 토글로 들어 있다. design-bolt 의 판정 「4상태가 한 파일에 토글로 들어 있다 → 그대로 둔다」를 따랐다.

### 그 밖의 인자

| 인자 | 값 | 무엇 |
|---|---|---|
| `role` | `guest` · `mentee` · `mentor` · `self` | 비로그인 · 멘티 · 다른 멘토 · 본인(§4 「본인 프로필일 때」). 기본 `guest` |
| `data` | `default` · `two-interviews` · `many` · `new` · `senior` | 기본 · 인터뷰 2편 · 항목이 많은 멘토 · 신규 멘토(Q&A · 리뷰 탭과 학력 · N문N답이 숨는다) · 연차가 긴 멘토 |
| `tab` | `profile` · `interview` · `qna` · `review` | 여는 탭. 기본 `profile` |
| `view` | `mobile` | 모바일 판. **창을 768 이하로 줄여도 같은 판이 된다** |
| `edit` | `profile` · `photo` · `insight` · `career-add` · `career-edit` · `edu-add` · `edu-edit` · `intro` · `qna` · `activity` | 편집 §6 의 모달 10종. `role=self` 와 같이 쓴다 |

### 임시 조립 2곳

`data-temp` 로 표시했다. 아트디렉션에서 부품으로 만든 뒤 갈아끼운다. 4차의 `DS-57`(Q&A 탭의 한 건) 표시는 없어졌다 — `QnaListItem variant="answer"` 로 갈아끼웠다.

| 표시 | 자리 |
|---|---|
| `data-temp="DS-54"` | 페이지 헤더(세계지도 ＋ 핀) |
| `data-temp="DS-67"` | 프로필 탭의 인터뷰 표지(가로형) |

## 배치할 때 고친 것 — 재export 때 다시 한다

**경로만 돌렸다. 그 밖은 한 글자도 안 고쳤다.** 배치는 `design/_import/place-mentor-detail.sh` 로 한다(커밋하지 않는 폴더).

| 무엇 | 원본 | 리포 |
|---|---|---|
| 디자인 시스템 | `_ds/m2-design-system-<UUID>/` 사본 | `../../../ds-export/project/` — 13곳 |
| 화면 표본 사진 5장(`2` · `4` · `6` · `7` · `8`) | `_ds/…/assets/img/` · 상수 `IMG` | 위 치환으로 `ds-export/project/assets/img/` 를 가리킨다. 10-14 판부터 ds-export 가 표본 사진을 갖는다 |
| 자산 경로 심 | 없음 | `ds-asset-path.js` 를 번들 앞에 1줄 넣었다 |
| 넣지 않은 것 | `MentorDetail v1.dc.html`(편집 면이 없는 옛 방문자 판 사본) · `screenshots/` · `assets/map/world.svg`(어디서도 참조하지 않는다) · `.thumbnail` · `_ds/` | — |

## 여는 법

| 판정 조건 | 아크션 |
|---|---|
| 화면을 본다 | **리포 루트에서 `python3 -m http.server` 를 돌리고 `/design/screens/mentor-detail/template/MentorDetail.dc.html` 을 연다.** 모든 상태가 그대로 선다 |
| 파일을 더블클릭해 `file://` 로 연다 | 런타임이 자기 파일을 다시 읽다가 브라우저에 막혀 일부가 빠진다. 로컬 서버로 연다 |

## 폰트 · 아이콘

- 폰트는 `ds-export/project/assets/fonts/` 의 PretendardJP 가변 폰트를 읽는다(`tokens/fonts.css`)
- 아이콘은 DS 의 `Icon` 이 CDN(jsdelivr 의 HugeIcons)에서 읽는다
