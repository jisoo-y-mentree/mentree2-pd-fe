# template 의 출처 — 알림 간략형 · 전체형이 한 장이다

- Claude Design: 프로젝트 **`Mentree 2.0 Notification`**(radarlab 계정). 공개 공유 링크는 적지 않는다([ADR-0002](../../../../docs/adr/0002-rebuild-design-system-instead-of-sharing.md))
- 원본: `design/_import/export-1008/Mentree 2.0 Notification build (1014).zip` · SHA-256 `7c575d85e1d6` · **생성 2026-10-14 16:38**. 프롬프트 `_import/prompts/notification-1014.md`(결정 9건 반영판)
- 대응 UI-SPEC: [`../UI-SPEC.md`](../UI-SPEC.md) — 2026-10-14 확정 · 같은 날 리포 검수 6건 반영
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
| `TopBackdrop.dc.html` | **간략형의 바탕 — 진짜 TOP.** 아래 「손댄 곳」 |
| `notification-data.js` | 표본 알림 · 카드 뷰모델 · 쓸기 거동 |
| `notification.css` | 알림 카드 · 공지 띠 조립(`.nt-` · `data-temp="DS-117"`) |

## 여는 법

| 판정 조건 | 아크션 |
|---|---|
| 화면을 본다 | **리포 루트에서 `python3 -m http.server 8765` 를 돌리고 `http://127.0.0.1:8765/design/screens/notification/template/Notification.dc.html` 을 연다.** 주소 값으로 상태를 고른다 |
| 파일을 더블클릭해 `file://` 로 연다 | **바탕 · 간략형 · 전체형이 회색 상자로 남는다.** 입구가 부품 3본(`NotificationPanel` · `NotificationPage` · `TopBackdrop`)을 `dc-import` 로 읽어 오는데 브라우저가 `file://` 의 읽기를 막는다. 원본 export 도 같다 — 배치 때문이 아니다. Q&A 는 한 파일이라 `file://` 로도 열린다 |

## 손댄 곳

| 무엇 | 원본 | 리포 | 왜 |
|---|---|---|---|
| 디자인 시스템 | `../../_ds/m2-design-system-<uuid>/` | `../../../ds-export/project/` | 사본을 두지 않는다 |
| 자산 심 | 없음 | `ds-asset-path.js`(TOP export 의 `ds-asset-base.js` 를 바탕으로 자산 루트만 ds-export 로) | 헤더 로고 · 부품 기본 자산이 `../../assets/` 를 가리킨다 |
| **TOP 바탕** | `TopSkeleton.dc.html`(블록 윤곽) | **`TopBackdrop.dc.html`** — 이 화면의 헤더 ＋ 진짜 TOP(`../../top/template/Top.dc.html?embed=1`)을 헤더 아래부터 | 상혁 2026-10-14 「톱화면을 포함해서」. TOP 의 모양은 TOP 의 template 이 정본이고 여기서 고치지 않는다 |
| 카드 모양 3건 | `notification.css` | 점은 L1 에만 · 본문 최대 2줄(빈 줄 없음) · L3 는 읽어도 안 흐려짐 · 768 이하 ✕ 늘 보임 | 리포 검수 ①②③⑤ — [UI-REVIEW](../UI-REVIEW.md) |
| **와이어 수치 대조 12곳** | `notification.css` · `NotificationPanel` · `NotificationPage` · `Notification`(팝오버 자리 · 반경) · `notification-data.js`(아이콘 · href) | 팝오버 자리 · 모서리 32 · 제목 24 · 바닥 링크 20 · 카드 반경 16 · 안쪽 16/24 · 메타 12/16 · 「자세히 보기」 글자 링크 ＋ 아이콘 · 빨강 카드 왼쪽 바 삭제 · 원형 되돌아가기 · 공지 띠 | 2차 검수 — [UI-REVIEW](../UI-REVIEW.md) 「2차 검수」 |
| 표본 2건 | `notification-data.js` | 얼굴(아이콘 그림 → 사진 · 이니셜) · 출시 초기 5패턴 밖 문장 교체 | 리포 검수 ④⑥ |

**Claude Design 쪽에도 같은 고침을 돌려야 한다.** 다음 export 가 이 고침을 덮어쓰지 않게 프롬프트 `_import/prompts/notification-r2-1014.md` 를 돌린다 — 리포 검수 6건 ＋ 와이어 대조 12곳 ＋ 진짜 TOP. 배치는 `design/_import/place-notification.sh`(TopSkeleton → TopBackdrop 교체 포함).

**캡처** — 헤드리스 Chrome · 간략형은 창 1440×900, 전체형은 1440 전체 높이, 모바일은 390 iframe. `~/Desktop/notification-1014/`.
