# template 의 출처 — 비밀번호 재설정은 로그인 template 의 `screen=password` 다

**이 폴더에 파일이 없는 것이 맞다.** 인증 4화면은 셸이 같아 한 장으로 만들었다.

- 실물: [`../../login/template/Auth.dc.html`](../../login/template/Auth.dc.html) — 주소에 `screen=password` · 완료는 `screen=password-done`
- 출처 · 여는 법 · 손댄 곳: [`../../login/template/SOURCE.md`](../../login/template/SOURCE.md)
- 대응 UI-SPEC: [`../UI-SPEC.md`](../UI-SPEC.md)
- 검수: [`../../login/UI-REVIEW.md`](../../login/UI-REVIEW.md)

예: `Auth.dc.html?frame=1&screen=password&otp=verified&state=filled&view=desktop`

이 화면만의 값 — `otp` 8상태 전부(`unregistered` 는 여기만) · `verified` 일 때만 새 비밀번호 2칸이 선다.
