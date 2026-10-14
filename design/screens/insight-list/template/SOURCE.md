# template 의 출처

- Claude Design: 프로젝트 **`Mentree 2.0 Insight feed`**(radarlab 계정). 공개 공유 링크는 적지 않는다([ADR-0002](../../../../docs/adr/0002-rebuild-design-system-instead-of-sharing.md))
- 원본: `design/_import/export-1008/Mentree 2.0 Insight feed (1014).zip` · SHA-256 `ae1e7d3eb661` · **생성 2026-10-14 11:14**(5판). 프롬프트 `_import/prompts/round3-1014-qna-insight.md` 「프롬프트 B」. 1〜4판은 2026-09-16〜10-09
- 대응 UI-SPEC: [`../UI-SPEC.md`](../UI-SPEC.md) — 2026-10-14 개정(§4 · §6)
- 디자인 시스템: `ds-export/` 의 **2026-10-14 판**(53본 · zip `af278860480b`). export 의 `_ds` 사본과 같은 판

## 무엇이 들어 있나

**2본.** 얇은 페이지 8장은 2026-10-14 에 지웠다 — 상태는 주소로 고른다.

| 파일 | 무엇 |
|---|---|
| **`InsightList.dc.html`** | 입구. `?category=all|insight|event|interview&state=normal|filtered|loading|empty|error&view=desktop|mobile` 을 읽어 아래 부품에 넘긴다. 위쪽 데모 줄(`frame=1` 이면 숨김) |
| **`InsightListScreen.dc.html`** | 공용 화면 부품. 마크업 · 스타일 · 동작이 전부 여기 있다. 혼자 열면 기본 상태만 보인다 |

**5판(2026-10-14)에서 바뀐 것** — 「이전 페이지로」 「다음 페이지로」 가 769 이상에서 페이지네이션과 같은 줄 양 끝, 768 이하는 페이지네이션 위 반반(이전이 없으면 다음이 오른쪽 반만) · 디자인 시스템 10-14 판 적용(피처드 `CoverCard` · 가로 카드 `ArticlePreview row` · 스크랩 초록 부품 기본 · 토큰 덮어쓰기 걷음) · 얇은 페이지 → 주소 상태.

## 손댄 곳 — 경로만

| 무엇 | 원본 | 리포 |
|---|---|---|
| 디자인 시스템 | `_ds/m2-design-system-<uuid>/` | `../../../ds-export/project/` |
| 로고 · 국기 | 루트의 `assets/` | `ds-export/project/assets/` |
| 표본 사진 | `assets/img/` | **`template/assets/img/`**(한 벌. `article-detail` 은 건너 참조한다) |
| 상세로 가는 링크 | `ArticleDetail.dc.html` | `../../article-detail/template/ArticleDetail.dc.html` |

`support.js` 는 export 의 것, `ds-asset-path.js` 는 리포의 것이다(공용 부품의 helmet 에 끼운다). 배치는 `design/_import/place-1014.sh`.
