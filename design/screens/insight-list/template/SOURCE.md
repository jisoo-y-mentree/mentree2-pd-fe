# template 의 출처

- Claude Design: 프로젝트 **`Mentree 2.0 Insight feed`**(radarlab 계정). 공개 공유 링크는 적지 않는다([ADR-0002](../../../../docs/adr/0002-rebuild-design-system-instead-of-sharing.md))
- 원본: export 폴더 `Mentree 2.0 Insight feed`(20장 · 2026-09-16 16:05)
- **생성일: 2026-09-16**
- 대응 UI-SPEC: [`../UI-SPEC.md`](../UI-SPEC.md) — §1~11 확정 2026-09-16
- 디자인 시스템: `ds-export/` 의 **43본 판**(SHA-256 `7649857370a5`)을 가리킨다. **export 의 사본은 이보다 앞선 판이다** — 아래 「디자인 시스템이 어긋난다」

## 무엇이 들어 있나

**얇은 페이지 8장 ＋ 공용 화면 부품 1본.** Q&A 와 구조가 다르다.

| 파일 | 무엇 |
|---|---|
| `insight-list-all` · `insight` · `event` · `interview` | 카테고리 4형. 이벤트는 조건 축이 「종류」, 인터뷰는 국가 · 직종 · 키워드 |
| `insight-list-filtered` | 조건 칩 「일본」 「취업 준비」가 걸린 상태 |
| `insight-list-loading` · `empty` · `error` | 스켈레톤 5장 · 조건 0건 ＋ 「조건 초기화」 · 통신 실패 ＋ 「다시 시도」 |
| **`InsightListScreen.dc.html`** | **8장이 공유하는 화면 부품.** 마크업 · 스타일 · 페이지 스크립트가 전부 여기 있다 |

**얇은 페이지는 한 줄이다** — `<dc-import name="InsightListScreen" category="event" state="ok">`. 런타임이 같은 폴더에서 `InsightListScreen.dc.html` 을 읽어 그린다. 화면 상태(카테고리 · 조건 · 로딩 · 0건 · 에러)는 이 속성으로 갈린다. **파일 안에서 화면 상태를 갈아끼우는 JS 는 없다.** 부품 인터랙션의 상태(스크랩 · 조건 · 칩 · 정렬 · 페이지 · 검색)는 페이지 스크립트가 든다(2026-09-15 · 상혁 지시).

**임시 조립 2곳** — `data-temp="DS-17"`(카테고리 세로 내비) · `data-temp="DS-33"`(가로형 아티클 카드). 부품이 오면 그 자리만 바꾼다(상혁 2026-09-16).

## 손댄 곳

원본은 Claude Design 캔버스의 export 이고 프로젝트 루트를 기준으로 경로를 잡는다. 리포에 배치하면서 [`place-insight.sh`](../../../_import/place-insight.sh)(커밋 안 됨)가 **경로만** 돌렸다. 화면의 내용은 고치지 않았다.

| 무엇 | 원본 | 리포 |
|---|---|---|
| 디자인 시스템 | `_ds/m2-design-system-<uuid>/` 사본 | **`../../../ds-export/project/`** |
| 로고 · 국기 | 루트의 `assets/` | `ds-export/project/assets/` — `ds-asset-path.js`(Q&A 와 같은 shim)를 공용 부품의 helmet 에 끼웠다 |
| **사진 16본**(썸네일 · 인물) | 루트의 `assets/img/` | **`template/assets/img/`(3.4MB · 이 폴더에 한 벌).** `article-detail` 이 건너 참조한다 |
| 상세로 가는 링크 | `article-detail-*.dc.html` | `../../article-detail/template/article-detail-*.dc.html` |

**`_ds` 사본을 커밋하지 않는다.** 디자인 시스템의 참조 정본은 `ds-export/` 하나다.

**`insight-index` · `insight-demo` 는 넣지 않았다.** 확인용이다. Q&A 와 같다.

## 디자인 시스템이 어긋난다

export 의 `_ds` 사본은 리포의 43본 판보다 **앞선 판**이다 — `Header` 개정(3열 그리드 · 모바일 오버레이) · 토큰 3본(`colors` 에 green-50/100 · `spacing` 모바일 패딩 · `typography` 타입 스케일 개정) · 필터 값 데이터 5본. **이 template 은 리포의 43본 번들로 그려진다.** 헤더와 글자 크기가 Claude Design 캔버스와 조금 다르게 보일 수 있다. 디자이너가 `M2 Design System` 을 재export 해서 `ds-export/` 를 통째로 교체하면 맞는다 — 🖐 HUMAN TASK.

## 폰트는 빠져 있다

`Pretendard JP Variable` 의 바이너리를 리포에 넣지 않는다([ds-export/SOURCE.md](../../../ds-export/SOURCE.md) 「무엇을 뺐는가」). 대체 폰트로 그려진다.

## `support.js` 에 대해

**JS 가 1본 남아 있다.** Claude Design 캔버스의 런타임이며 이것이 없으면 화면이 그려지지 않는다. Q&A 의 것과 바이트가 같다. 판정은 [qna-feed 의 SOURCE.md](../../qna-feed/template/SOURCE.md) 와 같다 — ADR-0005 문구 개정을 리뷰 때 정한다.

**아이콘은 CDN 에서 온다.** DS 의 `Icon` 이 HugeIcons 를 `cdn.jsdelivr.net` 에서 mask 로 읽는다. 오프라인이면 아이콘 자리가 빈다. 디자인 시스템의 판단이며 이 화면의 것이 아니다.
