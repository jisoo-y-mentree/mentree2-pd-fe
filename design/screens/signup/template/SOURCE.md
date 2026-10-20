# template 의 출처 — 회원가입은 로그인 template 의 `screen=signup` 이다

**이 폴더에 파일이 없는 것이 맞다.** 인증 4화면(로그인 · 회원가입 · 비밀번호 재설정 · 온보딩 설문)은 셸이 같아 한 장으로 만들었다.

- 실물: [`../../login/template/Auth.dc.html`](../../login/template/Auth.dc.html) — 주소에 `screen=signup&mode=email|social`
- 출처 · 여는 법 · 손댄 곳: [`../../login/template/SOURCE.md`](../../login/template/SOURCE.md)
- 대응 UI-SPEC: [`../UI-SPEC.md`](../UI-SPEC.md)
- 검수: [`../../login/UI-REVIEW.md`](../../login/UI-REVIEW.md)

예: `Auth.dc.html?frame=1&screen=signup&mode=email&otp=verified&state=filled&view=desktop` ／ `screen=signup&mode=social`

이 화면만의 값 — `mode` · `otp`(`unregistered` 는 비밀번호 재설정에만) · `state=filled|error`. 인증 번호 칸은 `OtpField.dc.html`(`DS-122`)을 비밀번호 재설정과 같이 쓴다.
