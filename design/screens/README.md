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

> **`template/` 은 React 구현의 시각적 참조다. 코드 이식원이 아니다. CSS를 그대로 옮기지 않는다.**

- JS·인라인 이벤트를 제거하지 않는다. 인터랙션 의도가 보존되는 편이 참조 가치가 높다
- 4상태의 파일 분할을 강제하지 않는다. 요건은 「4상태를 확인할 수 있을 것」이다
- **`SOURCE.md` 없이 커밋하지 않는다.** 없으면 나중에 UI-SPEC 과의 정합을 판정할 수 없다
- **React 구현이 끝나면 동결한다.** 이후 살아있는 정본은 Storybook 이 이어받는다

## SOURCE.md 의 형태

```
- Claude Design: <공유 링크>
- 생성일: <YYYY-MM-DD>
- 대응 UI-SPEC: <커밋 해시 또는 버전>
```
