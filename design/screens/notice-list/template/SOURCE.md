# template 의 출처

- Claude Design: 프로젝트 **`Mentree 2.0 notice screens`**(radarlab 계정 · export 파일 이름이 프로젝트 이름이다). 공개 공유 링크는 적지 않는다([ADR-0002](../../../../docs/adr/0002-rebuild-design-system-instead-of-sharing.md))
- 원본: `design/_import/export-1008/Mentree 2.0 notice screens (1015).zip` · SHA-256 `b85580b08a89` · **1판 · 리포에 처음 들어왔다(2026-10-15)**. zip 안의 시각은 내려받은 시각(10-15 13:32)이다. 프롬프트는 `design/_import/prompts/notice-screens.md`(2026-09-17)이고 export 의 `uploads/` 에 같은 파일이 있다
- 대응 UI-SPEC: [`../UI-SPEC.md`](../UI-SPEC.md) — §1~11 확정(2026-09-17)
- 디자인 시스템: `ds-export/` 의 **2026-10-14 판**(53본 · zip `af278860480b`)을 가리킨다. **export 의 `_ds` 사본은 9월 판(부품 60)이다** — 그린 11단 · `--text-body-sm` 이 없다. 두 판으로 같은 페이지를 찍어 대조했다(목록 2장 · 상세 3장 × 1440 · 390). 전체 높이는 모두 같고, 보이는 차이는 헤더 오른쪽 버튼(「기업 서비스」 글자 → 비즈 로고)과 초록 단계다
- **지금 인사이트 화면보다 옛 바탕이다.** 공지 상세는 인사이트 상세의 공용 부품(`ArticleDetailScreen`) 9월 사본을 쓴다. 인사이트는 그 뒤 4〜5판까지 바뀌었다 — 어긋난 곳은 [UI-REVIEW.md](../UI-REVIEW.md)

## 이것은 무엇인가

**React 구현의 「시각적 참조」다. 「코드 이식원」이 아니다.** 여기와 UI-SPEC 이 어긋나면 UI-SPEC 이 정본이다. 레이아웃 · 구조는 Claude Design 으로 돌아가 다시 만든다.

## 무엇이 들어 있나

**얇은 페이지 5장 ＋ 공용 화면 부품 1본.** 인사이트 3판(2026-09-17)과 같은 구조다. 상태는 파일 이름으로 고른다.

| 파일 | 무엇 |
|---|---|
| `notice-list-normal.dc.html` | 고정 공지 2 ＋ 공지 10장 ＋ 「더보기」 |
| `notice-list-end.dc.html` | 고정 없음 · 4장 · 「더보기」 없음(마지막 묶음) |
| `notice-list-loading.dc.html` | 스켈레톤 |
| `notice-list-empty.dc.html` | 0건 |
| `notice-list-error.dc.html` | 통신 실패 ＋ 「다시 시도」 |
| `NoticeListScreen.dc.html` | 공용 화면 부품. 마크업 · 스타일 · 동작이 전부 여기 있다 |
| `notice-data.js` | 표본 공지 데이터. 상세로 가는 링크를 갖는다 |
| `assets/thumb-green.svg` · `thumb-sage.svg` | 표본 썸네일 2본. 공지 상세가 건너 참조한다 |

## 손댄 곳 — 경로만

배치는 `design/_import/place-notice.sh` 로 한다(커밋하지 않는 폴더). 그 밖은 한 글자도 안 고쳤다.

| 무엇 | 원본 | 리포 |
|---|---|---|
| 디자인 시스템 | `_ds/m2-design-system-<uuid>/` | `../../../ds-export/project/` |
| 로고 | `assets/logo/` | `ds-export/project/assets/logo/` |
| 상세로 가는 링크(`notice-data.js`) | `notice-detail-*.dc.html` | `../../notice-detail/template/notice-detail-*.dc.html` |
| 헤더의 인사이트 링크 | `insight-list-all.dc.html` | `../../insight-list/template/InsightList.dc.html`(지금 인사이트 입구) |
| 자산 경로 심 | 없음 | `ds-asset-path.js` 를 번들 앞에 1줄(`top` 과 같은 파일) |
| 넣지 않은 것 | `notice-index` · `notice-demo`(확인용) · `uploads/` · `.thumbnail` · `_ds/` | — |

## 여는 법

리포 루트에서 `python3 -m http.server` 를 돌리고 `/design/screens/notice-list/template/notice-list-normal.dc.html` 을 연다. `file://` 로 열지 않는다 — 얇은 페이지가 공용 부품을 `dc-import` 로 읽는데, 브라우저가 그 읽기를 막는다(알림 화면에서 확인한 것과 같은 구조).
