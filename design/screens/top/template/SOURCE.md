# template 의 출처 — TOP

- Claude Design: radarlab 계정. **프로젝트 이름은 확인하지 못했다** — export 파일 이름이 `top.zip` 이다. 상혁이 2026-10-14 에 받아 다운로드 폴더에 두었다. 공개 공유 링크는 적지 않는다([ADR-0002](../../../../docs/adr/0002-rebuild-design-system-instead-of-sharing.md))
- 원본: `design/_import/export-1008/top (1014).zip` · SHA-256 `f06be5a10cad` · **생성 2026-10-14 13:08**
- 대응 UI-SPEC: **이 가지에 없다.** `design/top-uispec`(#35 · 2026-09-28)에 있고 **옛 와이어(`1135:81185`) 기준이라 이 template 과 어긋난다** — 아래 「사양과 어긋나는 곳」
- 디자인 시스템: `ds-export/` 의 **2026-10-14 판**(최신)을 가리킨다. export 의 `_ds` 사본은 **그보다 낡은 판**이었다(시트 포커스 가두기 · 본문 없는 다이얼로그 · 큰 필터 셀렉트 등 `DS-112`〜`116` 이 없다). 최신 판으로 1440 · 390 을 렌더해 깨지는 곳이 없음을 확인했다(2026-10-14)

## 왜 지금 들어왔나

**알림 간략형의 바탕으로 쓴다**(상혁 2026-10-14 「톱화면을 포함해서」). `notification/template/TopBackdrop.dc.html` 이 이 파일을 `?embed=1` 로 불러 헤더 아래부터 보인다. **TOP 화면 자체의 취임(UI-SPEC · 감사)은 지수의 일이다** — 이 배치는 그것을 대신하지 않는다.

## 무엇이 들어 있나

**한 장 — `Top.dc.html`.** 주소로 고른다.

| 값 | 선택지 |
|---|---|
| `role` | `guest` · `mentee` · `mentor` |
| `state` | `normal` · `loading` · `empty` · `error` |
| `event` | `on` · `off`(히어로 아래 이벤트 띠) |
| `view` | `desktop` · `mobile`(390 iframe) |
| `embed` | 있으면 데모 줄을 숨긴다 |

## 손댄 곳 — 경로만

| 무엇 | 원본 | 리포 |
|---|---|---|
| 디자인 시스템 · 표본 사진 · 국기 | `_ds/m2-design-system-<uuid>/` | `../../../ds-export/project/`(사진 11장 · 국기 전부 ds-export 에 있다) |
| 자산 심 | `ds-asset-base.js` | `ds-asset-path.js`(같은 내용 · 자산 루트만 ds-export) |
| 로고 | 루트 `assets/logo/` | ds-export(바이트 같음) |
| TOP 고유 그림 8장 | `assets/top/` | `template/assets/top/`(사본 — 이 화면의 그림이다) |

루트의 `assets/flags/`(21장)는 쓰지 않아 넣지 않았다 — 페이지는 ds-export 의 국기를 부른다.

## 사양과 어긋나는 곳 — 지수의 UI-SPEC 다시 쓰기를 기다린다

**#35 의 UI-SPEC 은 옛 와이어 기준이다.** 이 template 과 최신 Figma(`1856:25912` 오른쪽 판)는 서로 맞는다.

| 블록 | #35 UI-SPEC | template · 최신 Figma |
|---|---|---|
| 히어로 문구 | 「당신의 해외 커리어가 시작되는 곳」 | 「해외 커리어, 먼저 경험한 선배와 함께」 |
| 이벤트 띠 | 없다 | 히어로 아래 `CalloutBar event` |
| 멘토의 이야기 | `InterviewCard` 3장 캐러셀 | `CoverCard` 1장씩(색 4종) |
| 주목받는 Q&A | `QnaCard` 4장 캐러셀 | 왼쪽 소개 글 ＋ 오른쪽 `QnaListItem` 3건 |
| 멘트리 인사이트 | `ArticlePreview` 4장 캐러셀 | 큰 피처드 1 ＋ 목록 4 |
