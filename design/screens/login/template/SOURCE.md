# template 의 출처 — 인증 4화면이 한 장이다

- Claude Design: 프로젝트 **`Mentree 2.0 온보딩 진행`**(radarlab 계정 · 프롬프트는 `Mentree 2.0 Auth` 로 적었으나 상혁이 이 이름으로 만들었다). 공개 공유 링크는 적지 않는다([ADR-0002](../../../../docs/adr/0002-rebuild-design-system-instead-of-sharing.md))
- 원본: `design/_import/export-1008/Mentree 2.0 Auth (1015).zip` · SHA-256 `e681a51f4616` · **생성 2026-10-15 12:26 · 1판**. 프롬프트는 [auth-1015.md](../../../_import/prompts/auth-1015.md)
- 대응 UI-SPEC: [`../UI-SPEC.md`](../UI-SPEC.md)(로그인 · 틀) · [`../../signup/UI-SPEC.md`](../../signup/UI-SPEC.md) · [`../../password-reset/UI-SPEC.md`](../../password-reset/UI-SPEC.md) · [`../../onboarding-survey/UI-SPEC.md`](../../onboarding-survey/UI-SPEC.md) — 전부 export 값으로 기안했다(2026-10-15)
- 디자인 시스템: `ds-export/` 의 **2026-10-14 판**(53본 · zip `af278860480b`). export 의 `_ds` 사본은 번들 · 토큰 · 매니페스트가 이 판과 **바이트까지 같다.** 경로만 `../../../ds-export/project/` 로 돌렸다
- 검수: [`../UI-REVIEW.md`](../UI-REVIEW.md) 1차(2026-10-15)

## 무엇이 들어 있나

**입구는 한 장이다 — `Auth.dc.html`.** 화면 · 모드 · 스텝 · 인증 상태 · 상태 · 뷰를 **주소의 값으로 고른다.** 위쪽 데모 줄로도 바꿔 볼 수 있다(`?frame=1` 이면 숨긴다). `signup` · `password-reset` · `onboarding-survey` 폴더에는 `SOURCE.md` 만 둔다 — 실물은 이 파일의 `screen=` 이다.

| 값 | 선택지 |
|---|---|
| `screen` | `login` · `signup` · `survey` · `done` · `password` · `password-done` |
| `mode` | signup: `email` · `social` |
| `step` | survey: `1` · `2` · `3` |
| `otp` | 인증 번호 칸 — `before` · `sent` · `verified` · `timeout` · `mismatch` · `invalid` · `unregistered`(password 만) · `limit` |
| `state` | `normal` · `filled` · `error` · `age`(로그인 · 연령 모달) · `age-no`(미만 선택 뒤) |
| `view` | `desktop` · `mobile`(390 iframe) |

예: `Auth.dc.html?frame=1&screen=password&otp=verified&view=desktop`

| 파일 | 무엇 |
|---|---|
| `Auth.dc.html` | 입구 · 6화면 · 표본 · 토스트 |
| `AuthShell.dc.html` | 로고만 있는 헤더 ＋ 가운데 기둥 400 |
| `OtpField.dc.html` | 인증 번호 칸(`data-temp="DS-122"`) — 상태 8 |
| `StepBar.dc.html` | 3스텝 진행 막대(`data-temp="DS-121"`) |
| `ConsentGroup.dc.html` | 전체 동의 ＋ 4항목 |
| `AgeDialog.dc.html` | 만 14세 확인 모달 |
| `taxonomy.js` | 국가 · 직종 · 태그의 단일 소스(export 가 가져온 사본 · Figma `1059:35100`) |
| `support.js` | Claude Design 런타임. 손대지 않는다 |
| `ds-asset-path.js` | **리포 배치용 심.** DS 부품의 기본 자산 경로를 `ds-export` 로 돌린다 |

## 여는 법

`file://` 로 열면 부품이 읽히지 않아 회색 상자만 보인다. 리포 루트에서 서버를 띄운다.

```
cd <리포 루트> && python3 -m http.server 8765
open "http://127.0.0.1:8765/design/screens/login/template/Auth.dc.html?screen=login"
```

## 손댄 곳 — 경로만. 모양은 손대지 않았다

| 무엇 | 어떻게 |
|---|---|
| `_ds/m2-design-system-<uuid>/` | `../../../ds-export/project/` |
| `../../assets/img/9.png` · `../../assets/logo/mentree-logo.svg` | `../../../ds-export/project/assets/…` |
| DS 부품의 기본 자산 경로 | `ds-asset-path.js` 를 번들 앞에 넣었다 |

배치는 [place-auth.sh](../../../_import/place-auth.sh) 가 한다. 새 export 가 오기 전에 다시 돌리면 리포에서 손본 것이 덮인다(지금은 손본 것이 없다).

## 넘긴 것

UI-REVIEW 1차의 표가 정본이다. 고칠 것은 2차 프롬프트([auth-r2-1015.md](../../../_import/prompts/auth-r2-1015.md))로 돌린다 — 소셜 버튼의 브랜드 로고가 첫째다(상혁 2026-10-15). 리포에서 CSS 로 손보지 않는다. 외부 라이브러리 없음.
