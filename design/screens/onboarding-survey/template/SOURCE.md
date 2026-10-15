# template 의 출처 — 온보딩 설문은 로그인 template 의 `screen=survey` 다

**이 폴더에 파일이 없는 것이 맞다.** 인증 4화면은 셸이 같아 한 장으로 만들었다.

- 실물: [`../../login/template/Auth.dc.html`](../../login/template/Auth.dc.html) — 주소에 `screen=survey&step=1|2|3` · 완료는 `screen=done`
- 출처 · 여는 법 · 손댄 곳: [`../../login/template/SOURCE.md`](../../login/template/SOURCE.md)
- 대응 UI-SPEC: [`../UI-SPEC.md`](../UI-SPEC.md)
- 검수: [`../../login/UI-REVIEW.md`](../../login/UI-REVIEW.md)

예: `Auth.dc.html?frame=1&screen=survey&step=2&state=filled&view=desktop`

이 화면만의 값 — `step` · `state=filled`. 진행 막대는 `StepBar.dc.html`(`DS-121`), 국가 · 직종 칩은 `taxonomy.js` 에서 온다.
