# template 의 출처 — Q&A 3화면이 한 장이다

- Claude Design: 프로젝트 **`Mentree 2.0 Q&A Feed`**(radarlab 계정). 공개 공유 링크는 적지 않는다([ADR-0002](../../../../docs/adr/0002-rebuild-design-system-instead-of-sharing.md))
- 원본: `design/_import/export-1008/Mentree 2.0 Q&A Feed (1014).zip` · SHA-256 `a2d4b27dc9c8` · **생성 2026-10-14 11:14**. 프롬프트 `_import/prompts/round3-1014-qna-insight.md` 「프롬프트 A」. 바탕은 지수가 2026-10-13 에 맞춘 단일 페이지(`Mentree 2.0 Q&A Feed (jisoo).zip` · `a2d4…` 이전 판)
- 대응 UI-SPEC: [`qna-feed`](../UI-SPEC.md) · [`qna-detail`](../../qna-detail/UI-SPEC.md) · [`qna-compose`](../../qna-compose/UI-SPEC.md) — 셋 다 2026-10-14 개정
- 디자인 시스템: `ds-export/` 의 **2026-10-14 판**(53본 · zip `af278860480b`). export 의 `_ds` 사본과 **같은 판**이다. 경로만 `../../../ds-export/project/` 로 돌렸다

## 무엇이 들어 있나

**한 장이다 — `Qna.dc.html`.** 피드 · 상세 · 작성 세 화면과 그 상태 전부가 이 파일 안에 있고, **주소의 값으로 고른다.** 위쪽 데모 줄로도 바꿔 볼 수 있다(`?frame=1` 이면 데모 줄을 숨긴다). 2026-09-15 의 「파일마다 화면 상태 하나」 규칙은 **2026-10-14 에 폐기했다**(상혁 · 지수의 방식을 채택).

| 값 | 선택지 |
|---|---|
| `screen` | `feed` · `detail` · `compose` |
| `role` | `guest` · `mentee` · `questioner` · `mentor` |
| `state` | feed: `normal` · `loading` · `error` · `search` · `search-empty` · `reco-empty` ／ detail: `normal` · `empty` · `mine`(멘토) · `loading` · `error` ／ compose: `normal` · `loading` · `error` |
| `modal` | detail: `thanks`(질문자) · `answer`(멘토) ／ compose: `phone` · `submit` · `leave` |
| `view` | `desktop` · `mobile`(390 iframe) |
| `detail` | `side`(간단보기 패널 · 769 이상) · `full` |
| `id` · `q` · `tab` | 질문 id(`f1` 기본) · 검색어 · 탭 |

예: `Qna.dc.html?frame=1&screen=detail&role=questioner&state=normal&id=f1&detail=full`

**3차 개정(2026-10-14)에서 바뀐 것** — 키워드 축 삭제(검색 줄 · 행 배지 · 조건 칩 · 추천 항목 · 상세 · 작성) · 768 이하 추천 Q&A 가 세로 3건 ＋ 더보기 · 「감사인사 작성」 primary 채움 · 디자인 시스템 10-14 판 적용(화면 CSS 덮어쓰기 걷음). 간단보기 패널은 그대로다.

## 손댄 곳 — 경로만

| 무엇 | 원본 | 리포 |
|---|---|---|
| 디자인 시스템 | `_ds/m2-design-system-<uuid>/` | `../../../ds-export/project/` |
| 로고 · 국기 · 아이콘 · 표본 사진 | 루트의 `assets/` | `ds-export/project/assets/` |
| 히어로 일러스트 | `assets/qna-feed-hero-illustration.png` | `template/assets/`(화면 자신의 그림) |

`support.js`(dc 런타임)는 export 의 것, `ds-asset-path.js` 는 리포의 것(자산 루트를 ds-export 로 돌린 판)이다. 배치는 `design/_import/place-1014.sh`.

**캡처** — 주소로 상태를 지정해 헤드리스 Chrome 으로 찍는다(1440 · 390). 비교판은 Figma 「10월 13일 정리」.
