# template 의 출처

- Claude Design: 프로젝트 **`Mentree 2.0 Insight feed`**(radarlab 계정). 공개 공유 링크는 적지 않는다([ADR-0002](../../../../docs/adr/0002-rebuild-design-system-instead-of-sharing.md))
- 원본: `design/_import/export-1008/Mentree 2.0 Insight feed (1014).zip` · SHA-256 `ae1e7d3eb661` · **생성 2026-10-14 11:14**(5판). 프롬프트 `_import/prompts/round3-1014-qna-insight.md` 「프롬프트 B」
- 대응 UI-SPEC: [`../UI-SPEC.md`](../UI-SPEC.md) — 2026-10-14 개정(§2 · §4 · §6 · §8 · §9)
- 디자인 시스템: `ds-export/` 의 **2026-10-14 판**(53본). export 의 `_ds` 사본과 같은 판

## 무엇이 들어 있나

**2본.** 얇은 페이지 8장은 2026-10-14 에 지웠다 — 상태는 주소로 고른다.

| 파일 | 무엇 |
|---|---|
| **`ArticleDetail.dc.html`** | 입구. `?type=insight|event|interview|plain&state=normal|loading|404|error&view=desktop|mobile` 을 읽어 아래 부품에 넘긴다. 데모 줄(`frame=1` 이면 숨김) |
| **`ArticleDetailScreen.dc.html`** | 공용 화면 부품 |

**5판(2026-10-14)에서 바뀐 것** — 인사이트 글(B)의 「이 주제와 관련된 멘토를 확인하고 싶다면?」 박스를 지우고, **「이 아티클과 관련된 멘토」 섹션**(`MentorCard` 4장 ＋ 「더보기 >」)을 관련 아티클 위에 둔다. 이벤트 글(A)의 「참여 멘토」 도 같은 이름 · 같은 부품. 멘토 칩 CSS 는 지웠다. 디자인 시스템 10-14 판 적용(스크랩 초록 부품 기본 · 토큰 덮어쓰기 걷음).

## 손댄 곳 — 경로만

디자인 시스템 · 로고 · 국기는 `../../../ds-export/project/`, 표본 사진은 `../../insight-list/template/assets/img/`(한 벌), 목록으로 가는 링크는 `../../insight-list/template/InsightList.dc.html`. `support.js` 는 export 의 것, `ds-asset-path.js` 는 리포의 것. 배치는 `design/_import/place-1014.sh`.
