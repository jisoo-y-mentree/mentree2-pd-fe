# template 의 출처 — 알림 간략형 · 전체형이 한 장이다

- Claude Design: 프로젝트 **`Mentree 2.0 Notification`**(radarlab 계정). 공개 공유 링크는 적지 않는다([ADR-0002](../../../../docs/adr/0002-rebuild-design-system-instead-of-sharing.md))
- 원본: `design/_import/export-1008/Mentree 2.0 Notification build (1014 r2).zip` · SHA-256 `4f224844ada7` · **생성 2026-10-14 18:15 · 2판**. **상혁이 Claude Design 에서 직접 고친 판**이다 — 1판(16:38 · `7c575d85e1d6`)을 리포에서 손보던 것을 버리고 이 판을 그대로 취임했다. 프롬프트 `_import/prompts/notification-r2-1014.md` 는 재료였고, 값은 거기서 상혁이 정했다
- 대응 UI-SPEC: [`../UI-SPEC.md`](../UI-SPEC.md) — 2026-10-14 확정 · 같은 날 2판 값으로 고쳤다
- 디자인 시스템: `ds-export/` 의 **2026-10-14 판**(53본 · zip `af278860480b`). export 의 `_ds` 사본(12파일)은 번들 · 토큰이 이 판과 **바이트까지 같다.** 경로만 `../../../ds-export/project/` 로 돌렸다

## 무엇이 들어 있나

**입구는 한 장이다 — `Notification.dc.html`.** 간략형 · 전체형과 상태 전부를 **주소의 값으로 고른다.** 위쪽 데모 줄로도 바꿔 볼 수 있다(`?frame=1` 이면 숨긴다).

| 값 | 선택지 |
|---|---|
| `screen` | `popover`(간략형 · TOP 위) · `page`(전체형) |
| `role` | `mentee` · `mentor` |
| `state` | `normal` · `read` · `empty` · `loading` · `error` · `end`(전체형) |
| `view` | `desktop` · `mobile`(390 iframe). `mobile` 에서 `popover` 를 고르면 전체형이 선다 |

예: `Notification.dc.html?frame=1&screen=popover&role=mentor&state=normal&view=desktop`

| 파일 | 무엇 |
|---|---|
| `Notification.dc.html` | 입구 · 상태 · 팝오버 · 삭제 토스트 |
| `NotificationPanel.dc.html` | 간략형(팝오버 안) |
| `NotificationPage.dc.html` | 전체형(페이지) |
| `TopBackdrop.dc.html` | **간략형의 바탕 — 진짜 TOP.** 알림 프로젝트 안에 다시 그린 것(지수의 Top 10-14 구성 · 링크는 `#`) |
| `world-map.html` | 지도 iframe — d3 · topojson · world-atlas 를 **CDN 에서** 받는다(UI-SPEC §11 4번) |
| `notification-data.js` | 표본 알림 · 카드 뷰모델 · 쓸기 거동 |
| `notification.css` | 알림 카드 · 공지 띠 조립(`.nt-` · `data-temp="DS-117"`) |

## 여는 법

| 판정 조건 | 아크션 |
|---|---|
| 화면을 본다 | **리포 루트에서 `python3 -m http.server 8765` 를 돌리고 `http://127.0.0.1:8765/design/screens/notification/template/Notification.dc.html` 을 연다.** 주소 값으로 상태를 고른다 |
| 파일을 더블클릭해 `file://` 로 연다 | **바탕 · 간략형 · 전체형이 회색 상자로 남는다.** 입구가 부품 3본(`NotificationPanel` · `NotificationPage` · `TopBackdrop`)을 `dc-import` 로 읽어 오는데 브라우저가 `file://` 의 읽기를 막는다. 원본 export 도 같다 — 배치 때문이 아니다. Q&A 는 한 파일이라 `file://` 로도 열린다 |

## 손댄 곳 — 경로 ＋ 가드 1건

| 무엇 | 원본 | 리포 | 왜 |
|---|---|---|---|
| 디자인 시스템 | `../../_ds/m2-design-system-<uuid>/` | `../../../ds-export/project/` | 사본을 두지 않는다 |
| 표본 사진 · 국기 · 로고(biz · mentree-logo) | 루트 `assets/` | `ds-export/project/assets/`(바이트 같음) | 자산의 정본은 ds-export |
| 흰 로고 | `assets/logo/mentree-logo-white.svg` | `template/assets/logo/` 사본 | ds-export 에 없다 |
| 자산 심 | 없음 | `ds-asset-path.js` | 부품 기본 자산 `../../assets/` 를 ds-export 로 |
| 캐러셀 가드 | `TopBackdrop` `setEdges` 무조건 `setState` | 값이 바뀔 때만 | [UI-REVIEW](../UI-REVIEW.md) 「3차」 |

1판 때 리포에서 고치던 카드 모양 · 표본 · 와이어 수치 대조는 **2판이 대신한다.** 리포 CSS 손질은 없다.

**Claude Design 쪽에 돌릴 것은 캐러셀 가드 1건뿐이다**(다음 프롬프트에 한 줄). 배치는 `design/_import/place-notification.sh`(2판용).

**캡처** — 헤드리스 Chrome · 간략형은 창 1440×900, 전체형은 1440 전체 높이, 모바일은 390 iframe. 2판은 `~/Desktop/notification-1014-r2/`.
