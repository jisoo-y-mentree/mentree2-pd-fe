# template 의 출처 — 멘토링 흐름은 신청 · 상세 대화상자가 한 장이다

- Claude Design: 프로젝트 **`Mentree 2.0 Mentoring Flow`**(radarlab 계정). 공개 공유 링크는 적지 않는다([ADR-0002](../../../../docs/adr/0002-rebuild-design-system-instead-of-sharing.md))
- 원본: `design/_import/export-1008/Mentree 2.0 Mentoring Flow (1020 r3).zip` · SHA-256 `82c941fb2c4e` · **생성 2026-10-20 13:15 · 3판**. 3차 프롬프트 `design/_import/prompts/mentoring-flow-r3-1020.md`(확정 블록의 「구글 캘린더 추가」 · 「링크 복사하기」)를 상혁이 돌린 판이다
- 2판: 12:55(`mentoring-flow-1020b` · 2차 `mentoring-flow-r2-1020.md` — 완료 뒤 리뷰 · 취소 뒤 메세지 · 노쇼). 1판: 12:26(`mentoring-flow-1020` · 1차 `mentoring-flow-1019.md`)
- 정본: Figma `zFWjJinW6NAtyMMzMujNl2` 섹션 **`1059:31880` 「멘토링 신청 / 확정 Flow」**(상혁 2026-10-19 「최신본」) — 「멘토링 신청 Flow」 `1059:31881`(멘티) · 「멘토링 수락 Flow」 `1059:33275`(멘토)
- 대응 UI-SPEC: [`../UI-SPEC.md`](../UI-SPEC.md) — 기안 · UX승인 대기
- 디자인 시스템: `ds-export/` 의 **2026-10-14 판**(53본). export 의 `_ds` 사본은 번들 · 토큰이 이 판과 바이트까지 같다. 경로만 `../../../ds-export/project/` 로 돌렸다
- 이 export 에만 있는 사진 **1본**(`mentor-park.png` · 표본 멘토 사진)은 `template/assets/img/` 에 둔다. `ds-export/` 는 손으로 고치지 않는다
- 검수: [`../UI-REVIEW.md`](../UI-REVIEW.md) — 1판 · 2판 · 3판 교차 검증(모두 2026-10-20)

## 무엇이 들어 있나

**입구는 한 장이다 — `MentoringFlow.dc.html`.** 역할 · 화면 · 멘토링 상태 · 갈래를 **주소의 값으로 고른다.** 위쪽 데모 줄로도 바꿔 볼 수 있다(`?embed=1` 이면 숨긴다). 멘토 쪽은 같은 파일의 `role=mentor` 다.

| 값 | 선택지 |
|---|---|
| `role` | `mentee` · `mentor` |
| `screen` | 멘티: `apply-1` · `apply-2` · `apply-pay` · `apply-done` · `card` · `detail` · `fix-schedule` · `fix-done` · `reschedule-request` · `reschedule-sent` · `cancel` · `cancel-done` · `review` · `review-done` · `cheer-read` ／ 멘토: `card` · `detail` · `accept` · `accept-done` · `decline` · `reschedule` · `reschedule-done` · `cancel` · `cancel-done` · `cheer-write` · `cheer-sent` · `cheer-view` · `cancel-msg-write` · `cancel-msg-sent` |
| `status` | 멘티: `applied` · `scheduling-received` · `reschedule-requested` · `rescheduled` · `rescheduled-by-mentor` · `fixed` · `fixed-24h` · `done` · `cancelled` ／ 멘토: `applied` · `scheduling-sent` · `reschedule-requested` · `rescheduled` · `fixed` · `done` · `cancelled` |
| `cancelBy` | `cancelled` 일 때 — `me` · `other` · `noshow` |
| `reply` | `cancelled` 일 때 — `0` · `1`(상대에게 메세지를 보냈다) |
| `review` | `done` 일 때 — `0` · `1`(멘티가 리뷰를 썼다) |
| `cheer` | `done` 일 때 — `0` · `1`(멘토가 격려 메세지를 보냈다) |
| `state` | `normal` · `loading` · `error` ／ `fail=1` 이면 보내기가 실패한다 |
| `view` | `desktop` · `mobile`(390 틀) ／ `embed=1` 은 틀 안의 화면 자체 |

예: `MentoringFlow.dc.html?role=mentor&screen=detail&status=cancelled&cancelBy=other&reply=0&embed=1`

**화면 · 상태 조합이 맞지 않으면** 그 화면이 성립하는 첫 상태로 고친다(`VALID` 표). 데모 줄에서 역할을 바꾸면 같은 멘토링을 반대쪽에서 본다 — 멘티의 `me` 는 멘토의 `other` 가 된다.

| 파일 | 무엇 |
|---|---|
| `MentoringFlow.dc.html` | 입구 · 데모 줄 · 공용 Header · 표본(멘티 「김멘티」 · 멘토 「박멘토」) · 상태 기계 · 대화상자 뒤 배경 카드 |
| `ApplyPage.dc.html` | 멘티 신청 페이지 — 1/2 신청 · 2/2 꽃 선물 · 결제 · 진행 막대(`data-temp="DS-121"`) · 이탈 확인 |
| `FlowDialog.dc.html` | 상세 · 일정 확정 · 재조정 · 수락 · 사양 · 취소 · 리뷰 · 격려 · 취소 뒤 메세지 · 완료형 대화상자 전부. 달력 ＋ 시간 칩(`data-temp="DS-13"`) · 확정 블록(캘린더 · 링크 복사) |
| `MentoringCard.dc.html` | 마이페이지와 같은 1:1 카드(`data-temp="DS-18"`). 배경 · `screen=card` 용. **정본은 마이페이지 쪽**이다 |
| `PersonCard.dc.html` | 상대 미니카드(`data-temp="DS-119"`) |
| `support.js` | Claude Design 런타임(dc-import). 화면 로직이 아니다 |
| `ds-asset-path.js` | 리포 배치용 자산 경로 심(마이페이지와 같은 파일) |
| `assets/img/mentor-park.png` | 이 export 에만 있는 표본 사진 |

**JS 에 대하여.** `support.js` 와 `.dc.html` 안의 `<script type="text/x-dc">` 는 Claude Design 의 화면 정의 형식이다. 마이페이지 · 인증 template 과 같은 취급이다([ADR-0005](../../../../docs/adr/0005-design-team-deliverables.md) 의 「JS 를 남기지 않는다」는 빌드 산출물 · 앱 코드를 말한다).
