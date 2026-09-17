# template — 출처와 범위

- 출처: Claude Design (radarlab 계정) — 프로젝트 **`Mentree 2.0 Insight feed`**
- 원본: `Mentree 2.0 Insight feed-handoff` export 의 `project/`
- **생성일: 2026-09-17**
- 대응 UI-SPEC: 이 커밋

**공유 링크를 적지 않는다.** 조직 이동으로 깨진다([ADR-0002](../../../../docs/adr/0002-rebuild-design-system-instead-of-sharing.md)). 계정과 프로젝트 이름으로 찾는다.

## 🔴 여는 법 — **더블클릭하면 빈 화면이다**

**이 template 은 로컬 서버로 열어야 한다.**

```
cd design/screens/insight-list/template
python3 -m http.server 8080
→ 브라우저에서 http://127.0.0.1:8080/insight-list-all.dc.html
```

**왜 그런가**: 상태 파일 8본은 `InsightListScreen.dc.html` 을 `<dc-import>` 로 가져오는 **얇은 래퍼**(340B 안팎)이고, 런타임이 형제 파일을 `fetch` 로 읽는다. **`file://` 에서는 브라우저가 CORS 로 막아 본문이 0자가 된다.**

```
[dc-runtime] sibling fetch for "InsightListScreen" threw: ./InsightListScreen.dc.html
Access to fetch at 'file:///…' has been blocked by CORS policy
```

**`InsightListScreen.dc.html` 하나만은 더블클릭으로도 열린다**(정상 상태). 나머지 상태를 보려면 서버가 필요하다.

**이것은 `CLAUDE.md` 의 「`template/` 은 브라우저로 바로 열리는 4상태다」에 대한 예외다**(2026-09-17 디자이너 판단). 다음 재생성 때 각 상태를 독립 파일로 뽑아 예외를 없앤다.

## 이것은 무엇인가

**React 구현의 「시각적 참조」다. 「코드 이식원」이 아니다.**

| 판정 조건 | 아크션 |
|---|---|
| 화면이 어떻게 생겼는지 보고 싶다 | **위의 손순서로 로컬 서버를 띄운다** |
| 구현할 때 CSS 를 가져오고 싶다 | **가져오지 않는다.** 구현은 디자인 시스템의 토큰과 컴포넌트로 한다 |
| 여기와 UI-SPEC 이 어긋난다 | **UI-SPEC 이 정본이다.** 양쪽을 고친다 |
| 레이아웃·구조를 고쳐야 한다 | **Claude Design 으로 돌아가 재생성한다.** 여기서 고치지 않는다 |

## 무엇이 들어 있는가

| 경로 | 내용 |
|---|---|
| `InsightListScreen.dc.html` | **화면의 실체**(30KB). 아래 8본이 이것을 부른다 |
| `insight-list-all` · `insight` · `event` · `interview` | **카테고리 4종.** UI-SPEC §6 의 카테고리와 같은 이름이다 |
| `insight-list-filtered` | 조건이 걸린 상태 |
| `insight-list-empty` · `error` · `loading` | 나머지 3상태 |
| `support.js` | `<dc-import>` 와 `{{ }}` 를 해석하는 런타임. **없으면 빈 페이지가 된다** |
| `_ds/` | 토큰 6본 ＋ `styles.css` ＋ 컴포넌트 번들 |
| `assets/img/` | 썸네일 7본(`1`〜`7`) |
| `assets/flags/` · `assets/logo/` | 국기 21본 ＋ 로고 |

**빌드는 필요 없다.** 서버만 있으면 된다.

## 배치할 때 고친 것 — 재export 때 다시 한다

| 무엇 | 어떻게 |
|---|---|
| `_ds/m2-design-system-<UUID>/` | **`_ds/`** — UUID 폴더명을 평탄화했다 |
| `_ds_bundle.js` 의 `FLAG_BASE` | `"../../assets/flags/"` → **`"./assets/flags/"`** — 원본은 DS 카드(`components/core/`) 기준이라 화면에서 밖으로 나간다 |

**이 두 화면은 국기를 0건 쓴다.** `FLAG_BASE` 는 나중에 국가 배지가 붙을 때를 위해 미리 고쳐 뒀다.

## 무엇을 뺐는가

| 뺀 것 | 크기 | 이유 |
|---|---|---|
| `_ds/assets/fonts/PretendardJPVariable.ttf` | 12MB | **폰트 바이너리를 리포에 넣지 않는다.** `ds-export` 와 같은 이유 |
| `assets/img/` 중 이 화면이 안 쓰는 8본 | 2MB | `8`〜`15` 는 `article-detail` 쪽에서 쓴다 |
| `insight-index.dc.html` · `insight-demo.dc.html` | — | **20개 파일을 가로지르는 프로젝트 색인**이지 이 화면의 상태가 아니다. `article-detail` 파일까지 `iframe` 으로 부르므로 여기서는 반만 동작한다 |

**폰트를 뺐으므로 열면 시스템 폰트가 뜬다.** 자간·줄높이는 맞고 글자꼴만 다르다. 지정의 정본은 `ds-export/project/tokens/fonts.css` 다.

## 검증 기록 (2026-09-17)

**로컬 서버 · 1280 · Chrome 에서 8본 전부 확인했다.**

```
가로 넘침 0건 · 깨진 이미지 0건 · JS 오류 0건
DS 스냅샷  DS-51·52·53 반영 (accentFirst · scale(1.03) · h0 모바일 20)
```
