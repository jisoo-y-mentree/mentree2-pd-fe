# template 의 출처

- Claude Design: 프로젝트 **`Mentree 2.0 Insight feed`**(radarlab 계정). 공개 공유 링크는 적지 않는다([ADR-0002](../../../../docs/adr/0002-rebuild-design-system-instead-of-sharing.md))
- 원본: export 폴더 `Mentree 2.0 Insight feed`(20장 · **3판 2026-09-17 14:09** · 2판 09-17 11:14 · 1판 09-16 16:05)
- **생성일: 2026-09-17**
- 대응 UI-SPEC: [`../UI-SPEC.md`](../UI-SPEC.md) — §1~11 확정 2026-09-16
- 디자인 시스템: `ds-export/` 의 **2026-09-16 판**(폴더 해시 `4ec9a3f66119`). export 의 사본과 같은 판이다 — [insight-list 의 SOURCE.md](../../insight-list/template/SOURCE.md) 「디자인 시스템이 어긋났었다」

## 무엇이 들어 있나

**얇은 페이지 8장 ＋ 공용 화면 부품 1본.**

| 파일 | 무엇 |
|---|---|
| `article-detail-insight` | B형 인사이트 글 — 와이어 그대로. 목차 3항목 · 배너 「관련 멘토 보기」 · **「목록으로 돌아가기」** · 관련 아티클 4장(**`Carousel`**) · 구독 카드(**`IntersectionObserver` 표지 · 닫기 기억 글 단위** — 3판) |
| `article-detail-event` | A형 이벤트 기사 — 배너 「참여 신청하기」 · 「목록으로 돌아가기」 · 참여 멘토 4장(**`Carousel` peek**) |
| `article-detail-interview` | C형 멘토 인터뷰 — 배너 「멘토링 신청하기」 · 이 글의 멘토 1장 |
| `article-detail-plain` | B형인데 H2 없음 → 목차 없음 · 관련 0건 → 블록 없음 · 구독 카드 닫힘 |
| `article-detail-modal-mentors` | B형 위에 관련 멘토 모달이 열린 상태. 닫으면 `article-detail-insight` 로 |
| `article-detail-loading` · `404` · `error` | 스켈레톤 · 「글을 찾을 수 없어요」 ＋ 「멘트리 인사이트로」 · 「글을 불러오지 못했어요」 ＋ 「다시 시도」 |
| **`ArticleDetailScreen.dc.html`** | **8장이 공유하는 화면 부품** |

**얇은 페이지는 한 줄이다** — `<dc-import name="ArticleDetailScreen" variant="event" state="ok">`. 화면 상태는 이 속성으로 갈린다. 부품 인터랙션의 상태(스크랩 · 도움돼요 · 공유 토스트 · 목차 현재 · 구독 카드 · 모달)는 페이지 스크립트가 든다.

**임시 조립 3곳** — `data-temp="rail"`(좌측 고정 레일 · `DS-35`) · `data-temp="toc"`(우측 목차 · `DS-17` 앵커 변형) · `data-temp="subscribe"`(구독 카드 · `DS-36`). 배너는 조립이고 `DS-34` 다.

## 손댄 곳

[`place-insight.sh`](../../../_import/place-insight.sh)(커밋 안 됨)가 경로만 돌렸다. **2판에서는 스타일을 손대지 않았다.** 1판 때 댔던 참여 멘토 줄의 두 패치(`!important` 1열 · `overflow-x:auto`)는 원본이 `Carousel` 로 바뀌어 필요가 없어졌고 스크립트에서도 지웠다.

| 무엇 | 원본 | 리포 |
|---|---|---|
| 디자인 시스템 | `_ds/…` 사본 | `../../../ds-export/project/` |
| 로고 · 국기 | 루트의 `assets/` | `ds-export/project/assets/` — `ds-asset-path.js` shim |
| 사진 | 루트의 `assets/img/` | **`../../insight-list/template/assets/img/`** — 한 벌만 둔다 |
| 목록으로 가는 링크 | `insight-list-all.dc.html` | `../../insight-list/template/insight-list-all.dc.html` |

## 폰트 · `support.js` · 아이콘

[insight-list 의 SOURCE.md](../../insight-list/template/SOURCE.md) 와 같다.
