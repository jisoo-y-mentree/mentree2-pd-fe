# template 의 출처

- Claude Design: 프로젝트 **`Mentree 2.0 Q&A Feed`**(radarlab 계정). 공개 공유 링크는 적지 않는다([ADR-0002](../../../../docs/adr/0002-rebuild-design-system-instead-of-sharing.md))
- 원본: `Mentree 2.0 Q&A Feed.zip`
- **생성일: 2026-09-14**
- 대응 UI-SPEC: [`../UI-SPEC.md`](../UI-SPEC.md) — 커밋 `c81233b`
- 디자인 시스템: `ds-export/` 의 **43본 판**(SHA-256 `7649857370a5`)

## 무엇이 들어 있나

**4장.** normal · loading · empty · error

**파일마다 상태가 하나다.** 상태를 토글하는 JS 도 인라인 이벤트 핸들러도 없다.

## 손댄 곳 2군데

원본은 Claude Design 캔버스의 export 이고 프로젝트 루트를 기준으로 경로를 잡는다. 리포에 배치하면서 **경로만** 돌렸다. 화면의 내용은 고치지 않았다.

| 무엇 | 원본 | 리포 |
|---|---|---|
| 디자인 시스템 | `_ds/m2-design-system-<uuid>/` 사본 | **`../../../ds-export/project/`** 를 가리킨다 |
| 자산(국기·로고) | 루트의 `assets/` | 같은 곳의 `assets/` |

**`_ds` 사본을 커밋하지 않는다.** 디자인 시스템의 참조 정본은 `ds-export/` 하나다. 두 벌을 두면 어느 것이 최신인지 판정할 수 없다.

`ds-asset-path.js` 는 그 경로 보정을 하는 3줄짜리 shim 이다. 원본에도 들어 있었고 주석이 **「핸드오프로 옮기면 지운다」** 고 적혀 있었으나, 리포에서는 자산이 `ds-export/` 에 있으므로 **지우지 않고 목적지만 바꿨다.**

## 폰트는 빠져 있다

`Pretendard JP Variable` 의 바이너리 12MB 를 리포에 넣지 않는다([ds-export/SOURCE.md](../../../ds-export/SOURCE.md) 「무엇을 뺐는가」). **브라우저에서 열면 대체 폰트로 그려진다.** 자간과 줄바꿈이 실제와 다르게 보일 수 있다.

## `support.js` 에 대해

**JS 가 1본 남아 있다.** Claude Design 캔버스의 런타임이며 **이것이 없으면 화면이 아예 안 그려진다.**

[ADR-0005](../../../../docs/adr/0005-design-team-deliverables.md) 는 「`template/` 은 정적 HTML/CSS 4파일, JS 를 남기지 않는다」로 정했다. 그 금지의 이유는 **「토글로 가려진 것은 엔지니어가 못 본다」** 인데, 여기에는 토글이 없다 — 파일마다 상태가 하나다.

**규칙의 글자와는 어긋난다.** 판정을 사람에게 남긴다(PR 본문).
