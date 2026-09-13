# design/screens/ — 화면별 산출물

화면 1장에 디렉터리 1개다.

```
design/screens/<screen-id>/
├── UI-SPEC.md          ← 화면의 정본. TEMPLATE-UI-SPEC.md 를 복사해서 만든다
├── template/
│   ├── SOURCE.md       ← 필수. Claude Design 링크·생성일·대응 UI-SPEC
│   └── (Claude Design 익스포트)
└── UI-REVIEW.md        ← 6품질축 감사·표시 확인의 기록
```

## 만드는 순서

1. `screen-id` 를 정하고 [screen-inventory](../docs/screen-inventory.md) 에 행을 추가한다
2. [TEMPLATE-UI-SPEC.md](TEMPLATE-UI-SPEC.md) 를 복사해 `UI-SPEC.md` 를 만든다
3. **§1~5(UX 설계 의도)만 먼저 쓰고 승인을 받는다** — 상태를 `UX승인` 으로
4. `/design-bolt` 를 돌린다

## template/ 의 취급

> **`template/` 은 비주얼의 정본이자 인계 산출물이다.** 엔지니어가 열어서 바로 본다([ADR-0005](../../docs/adr/0005-design-team-deliverables.md)).

- **4상태를 1파일씩 가른다** — `normal` · `loading` · `empty` · `error`. **브라우저로 바로 열린다** — Claude Design 의 export 는 `<x-import>` 와 `{{ }}` 를 쓰므로 `support.js` 와 `_ds/` 를 함께 둔다. **빌드가 필요한 것은 넣지 않는다**
- **JS 를 남기지 않는다.** 토글로 가려진 것은 엔지니어가 못 본다. 인터랙션 의도는 UI-SPEC §8 이 갖는다
- **반응형 3구간은 CSS 가 처리한다.** 구간마다 파일을 늘리지 않는다
- **빌드가 필요한 것을 넣지 않는다.** 브라우저에서 파일을 열면 그대로 보여야 한다
- **`SOURCE.md` 없이 커밋하지 않는다.** 없으면 나중에 UI-SPEC 과의 정합을 판정할 수 없다
- **CSS 를 다른 곳으로 옮기지 않는다.** 시각적 참조이지 이식원이 아니다

## SOURCE.md 의 형태

```
- Claude Design: <공유 링크>
- 생성일: <YYYY-MM-DD>
- 대응 UI-SPEC: <커밋 해시 또는 버전>
```
