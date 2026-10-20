# template 의 출처

- Claude Design: 프로젝트 **`Mentree 2.0 notice screens`**(radarlab 계정 · export 파일 이름이 프로젝트 이름이다). 공개 공유 링크는 적지 않는다([ADR-0002](../../../../docs/adr/0002-rebuild-design-system-instead-of-sharing.md))
- 원본: `design/_import/export-1008/Mentree 2.0 notice screens (1015).zip` · SHA-256 `b85580b08a89` · **1판 · 리포에 처음 들어왔다(2026-10-15)**. 프롬프트는 `design/_import/prompts/notice-screens.md`(2026-09-17)
- 대응 UI-SPEC: [`../UI-SPEC.md`](../UI-SPEC.md) — §1~11 확정(2026-09-17)
- 디자인 시스템: `ds-export/` 의 **2026-10-14 판**을 가리킨다. export 의 `_ds` 사본은 9월 판이다 — 대조 결과는 [notice-list 의 SOURCE.md](../../notice-list/template/SOURCE.md) 와 같다
- **화면 부품은 인사이트 상세의 9월 사본(`ArticleDetailScreen` · `variant="notice"`)이다.** 지금 `article-detail/template/` 의 부품과 다른 파일이다. 어긋난 곳은 [notice-list 의 UI-REVIEW.md](../../notice-list/UI-REVIEW.md)

## 무엇이 들어 있나

**얇은 페이지 5장 ＋ 공용 화면 부품 1본.**

| 파일 | 무엇 |
|---|---|
| `notice-detail-normal.dc.html` | 이미지 ＋ 본문 ＋ 「목록으로 돌아가기」 |
| `notice-detail-banner.dc.html` | 위에 외부 링크 배너가 더 있는 판 |
| `notice-detail-loading.dc.html` | 스켈레톤 |
| `notice-detail-404.dc.html` | 글을 찾을 수 없음 ＋ 「공지사항으로」 |
| `notice-detail-error.dc.html` | 통신 실패 ＋ 「다시 시도」 |
| `ArticleDetailScreen.dc.html` | 공용 화면 부품(공지 변형) |
| `notice-data.js` | 표본 공지 데이터. 표지는 `notice-list/template/assets/` 를 건너 참조한다 |

## 손댄 곳 — 경로만

배치는 `design/_import/place-notice.sh` 로 한다. 그 밖은 한 글자도 안 고쳤다.

| 무엇 | 원본 | 리포 |
|---|---|---|
| 디자인 시스템 · 로고 | `_ds/…/` · `assets/logo/` | `../../../ds-export/project/` |
| 목록으로 가는 링크(빵부스러기 · 「목록으로 돌아가기」 · 404 버튼) | `notice-list-normal.dc.html` | `../../notice-list/template/notice-list-normal.dc.html` |
| 헤더의 인사이트 링크 | `insight-list-all.dc.html` | `../../insight-list/template/InsightList.dc.html` |
| 표지(`notice-data.js`) | `assets/thumb-*.svg` | `../../notice-list/template/assets/thumb-*.svg` |
| 자산 경로 심 | 없음 | `ds-asset-path.js` 를 번들 앞에 1줄 |

## 여는 법

리포 루트에서 `python3 -m http.server` 를 돌리고 `/design/screens/notice-detail/template/notice-detail-normal.dc.html` 을 연다.
