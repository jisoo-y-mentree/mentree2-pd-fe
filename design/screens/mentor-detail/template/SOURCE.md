# template 의 출처

- Claude Design: 프로젝트 **`mentor-design`**(radarlab 계정). 공개 공유 링크는 적지 않는다([ADR-0002](../../../../docs/adr/0002-rebuild-design-system-instead-of-sharing.md))
- 원본: export 폴더 `mentor-detail`(**4차 2026-09-28 09:16**)
- **생성일: 2026-09-28**
- 대응 UI-SPEC: [`../UI-SPEC.md`](../UI-SPEC.md) — `fc0c4c2`
- 디자인 시스템: `ds-export/` 의 **2026-09-28 판**(폴더 해시 `e2f9d58c9470`)을 가리킨다. export 의 `_ds` 사본과 같은 판이다 — 다른 것은 `iconbutton.card.html` 1본이고 이 화면은 그 카드를 부르지 않는다

## 이것은 무엇인가

**React 구현의 「시각적 참조」다. 「코드 이식원」이 아니다.**

| 판정 조건 | 아크션 |
|---|---|
| 화면이 어떻게 생겼는지 보고 싶다 | **`MentorDetail.dc.html` 을 로컬 서버로 연다.** 아래 「여는 법」 |
| 구현할 때 CSS 를 가져오고 싶다 | **가져오지 않는다.** 구현은 디자인 시스템의 토큰과 컴포넌트로 한다 |
| 여기와 UI-SPEC 이 어긋난다 | **UI-SPEC 이 정본이다.** 양쪽을 고친다 |
| 레이아웃·구조를 고쳐야 한다 | **Claude Design 으로 돌아가 재생성한다.** 여기서 고치지 않는다 |

## 무엇이 들어 있나

**화면 1장이다.** 상태 · 역할 · 데이터 · 탭을 URL 인자로 바꾼다. 맨 위의 데모 줄(`data-demo-shell`)이 같은 일을 하는 선택 상자다.

| 파일 | 무엇 |
|---|---|
| `MentorDetail.dc.html` | 화면. 데모 줄 ＋ 멘토 상세 ＋ 모바일 목업 틀(`view=mobile` 을 iframe 으로 다시 연다) |
| `support.js` | `<x-import>` 와 `{{ }}` 를 해석하는 런타임. **없으면 빈 페이지가 된다.** 혁님 template 의 것과 바이트가 같다 |
| `assets/img/2-avatar.png` · `2-cover-alt.png` | 이 화면에만 쓰는 사진 — 멘토 아바타 · 인터뷰 2편 데이터의 두 번째 표지 |
| `assets/map/world-d.js` | 세계지도의 경로 데이터(Natural Earth 110m). **자리표시다** — 화풍은 아트디렉션에서 정한다(`DS-54`) |

### 상태를 여는 주소 — UI-SPEC §7

| §7 의 상태 | 주소 |
|---|---|
| 정상 | `MentorDetail.dc.html` |
| 로딩 | `?state=loading` |
| 없음(404) | `?state=404` |
| 에러 | `?state=error` |
| 탭 에러 | `?state=tab-error` |
| 빈 상태 | **없다** — §7 「화면 전체의 빈 상태는 없다」. 섹션 · 탭의 0건은 `?data=new` 에서 숨는다 |

**4상태가 4파일로 나뉘어 있지 않다.** 한 파일에 토글로 들어 있다. design-bolt 의 판정 「4상태가 한 파일에 토글로 들어 있다 → 그대로 둔다」를 따랐다. 파일로 나누려면 Claude Design 에서 다시 만들어야 한다.

### 그 밖의 인자

| 인자 | 값 | 무엇 |
|---|---|---|
| `role` | `guest` · `mentee` · `mentor` · `self` | 비로그인 · 멘티 · 다른 멘토 · 본인(§4 「본인 프로필일 때」). 기본 `guest` |
| `data` | `default` · `two-interviews` · `new` | 기본 · 인터뷰 2편(지난 편 목록이 선다) · 신규 멘토(Q&A · 리뷰 탭과 학력 · N문N답이 숨는다) |
| `tab` | `profile` · `interview` · `qna` · `review` | 여는 탭. 기본 `profile` |
| `view` | `mobile` | 모바일 판. **창을 768 이하로 줄여도 같은 판이 된다** |

### 임시 조립 3곳

`data-temp` 로 표시했다. 아트디렉션에서 부품으로 만든 뒤 갈아끼운다.

| 표시 | 자리 |
|---|---|
| `data-temp="DS-54"` | 페이지 헤더(세계지도 ＋ 핀) |
| `data-temp="DS-57"` | Q&A 탭의 한 건(답변 강조형) |
| `data-temp="DS-67"` | 프로필 탭의 인터뷰 표지(가로형) |

## 배치할 때 고친 것 — 재export 때 다시 한다

**경로만 돌렸다. 그 밖은 한 글자도 안 고쳤다.** 원본과 리포 판을 19가지 조건에서 찍어 대조했다 — [UI-REVIEW.md](../UI-REVIEW.md) 「배치의 확인」.

| 무엇 | 원본 | 리포 |
|---|---|---|
| 디자인 시스템 | `_ds/m2-design-system-<UUID>/` 사본 | `../../../ds-export/project/` — 13곳 |
| 화면 표본 사진 5장(`2` · `4` · `6` · `7` · `8`) | `_ds/…/assets/img/` · 상수 `IMG` | **`../../insight-list/template/assets/img/`** — 한 벌만 둔다. 바이트 동일을 확인했다. `ds-export` 는 표본 사진을 갖지 않는다([ds-export/SOURCE.md](../../../ds-export/SOURCE.md) 「표본 사진을 가르는 판정 조건」) |
| 넣지 않은 것 | `MentorDetail v1.dc.html`(옛 판) · `assets/map/world.svg`(어디서도 참조하지 않는다) · `.thumbnail` · `_ds/` | — |

## 여는 법

| 판정 조건 | 아크션 |
|---|---|
| 화면을 본다 | **리포 루트에서 `python3 -m http.server` 를 돌리고 `/design/screens/mentor-detail/template/MentorDetail.dc.html` 을 연다.** 모든 상태가 그대로 선다 |
| 파일을 더블클릭해 `file://` 로 연다 | 화면은 그려지지만 **탭 끝 CTA 박스의 버튼 1개가 빠진다.** 런타임이 자기 파일을 다시 읽다가 브라우저에 막힌다. 원본 export 도 같다 — 배치 때문이 아니다 |

## 폰트 · `support.js` · 아이콘

[insight-list 의 SOURCE.md](../../insight-list/template/SOURCE.md) 와 같다. 폰트 바이너리는 리포에 없어 대체 폰트로 그려진다. 아이콘은 DS 의 `Icon` 이 CDN 에서 읽는다.

**콘솔에 `React error #130` 이 뜬다.** 런타임 쪽의 것이고 혁님 template 에도 똑같이 뜬다. 화면은 그려진다.
