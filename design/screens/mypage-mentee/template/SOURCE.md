# template 의 출처 — 마이페이지는 멘티 · 멘토가 한 장이다

- Claude Design: 프로젝트 **`Mentree 2.0 My Page`**(radarlab 계정). 공개 공유 링크는 적지 않는다([ADR-0002](../../../../docs/adr/0002-rebuild-design-system-instead-of-sharing.md))
- 원본: `design/_import/export-1008/Mentree 2.0 My Page (1014).zip` · SHA-256 `d86d01a26a42` · **생성 2026-10-14 23:56 · 1판**. 프롬프트는 `design/_import/prompts/mypage-1014.md` 2판
- 대응 UI-SPEC: [`../UI-SPEC.md`](../UI-SPEC.md)(틀) · [`../../mypage-mentor/UI-SPEC.md`](../../mypage-mentor/UI-SPEC.md)(멘토의 차이) — 둘 다 기안 · UX승인 대기. 미결 14건은 §11 의 기본값대로 만들어졌다
- 디자인 시스템: `ds-export/` 의 **2026-10-14 판**(53본 · zip `af278860480b`). export 의 `_ds` 사본(12파일)은 번들 · 토큰이 이 판과 **바이트까지 같다.** 경로만 `../../../ds-export/project/` 로 돌렸다
- 검수: [`../UI-REVIEW.md`](../UI-REVIEW.md) 1차(2026-10-15)

## 무엇이 들어 있나

**입구는 한 장이다 — `MyPage.dc.html`.** 역할 · 메뉴 · 하위 탭 · 상태 · 모달 · 뷰를 **주소의 값으로 고른다.** 위쪽 데모 줄로도 바꿔 볼 수 있다(`?frame=1` 이면 숨긴다). 멘토 화면(`mypage-mentor`)은 같은 파일의 `role=mentor` 다 — 멘토 폴더에는 `SOURCE.md` 만 둔다.

| 값 | 선택지 |
|---|---|
| `role` | `mentee` · `mentor` |
| `tab` | `profile` · `qna` · `mentoring` · `favorites` · `scrap` · `payment`(멘티) ／ `settlement`(멘토) · `account` |
| `sub` | qna: `answered` · `waiting`(멘티) ／ `answered` · `asked`(멘토) ／ mentoring: `ongoing` · `done`(멘티) ／ `received-ongoing` · `received-done` · `sent-ongoing` · `sent-done`(멘토) ／ favorites(멘토): `followers` · `mentors` ／ scrap: `qna` · `article` ／ settlement: `payout` · `payment` |
| `state` | `normal` · `loading` · `empty` · `error` |
| `modal` | 상세 `detail-applied` · `detail-scheduling-received` · `detail-scheduling-sent` · `detail-fixed` · `detail-done` · `detail-done-reviewed` · `detail-cancelled` ／ 갈아끼우기 `cancel-1` · `cancel-2` · `fix-schedule` · `reschedule` · `accept` · `accept-done` · `review` · `review-done` · `cheer-read` · `cheer-write` · `cheer-sent` ／ 편집 `profile-edit` · `photo` · `intro` · `countries` · `jobs` · `timezone` · `mail` · `notify` · `password` · `dormant` · `leave` · `delete-question` · `min-price` · `donate-confirm` · `mentee-profile` · `bank` |
| `view` | `desktop` · `mobile`(390 iframe) |

예: `MyPage.dc.html?frame=1&role=mentor&tab=mentoring&sub=received-ongoing&state=normal&view=desktop`

**상세 모달을 주소로 열면** 그 역할의 카드 중 상태가 맞는 첫 장을 고른다. 갈아끼우기 화면(`cancel-1` 등)은 첫 카드를 고르므로 격려 메세지처럼 카드의 값이 필요한 화면은 비어 보일 수 있다 — 화면 안에서 눌러 열면 맞는 카드로 열린다(UI-REVIEW 1차 K).

| 파일 | 무엇 |
|---|---|
| `MyPage.dc.html` | 입구 · 셸(헤더 · 세로 메뉴 `data-temp="DS-17"` · 탭 머리 · 하단 탭바) · 탭 7 의 본문 · 편집 모달 16 · 표본 데이터 · 토스트 |
| `MentoringCard.dc.html` | 멘토링 카드(`data-temp="DS-18"`) — 상태 6 × 역할 2 |
| `MentoringDetailModal.dc.html` | 멘토링 상세 모달 ＋ 갈아끼우는 화면 11 |
| `PersonCard.dc.html` | 사람 미니카드(`data-temp="DS-119"`) |
| `support.js` | Claude Design 런타임(dc-import 로더). 손대지 않는다 |
| `ds-asset-path.js` | **리포 배치용 심.** DS 부품의 기본 자산 경로를 `ds-export` 로 돌린다 |

## 여는 법

`file://` 로 열면 부품(`dc-import`)이 읽히지 않아 회색 상자만 보인다. 리포 루트에서 서버를 띄운다.

```
cd <리포 루트> && python3 -m http.server 8765
open "http://127.0.0.1:8765/design/screens/mypage-mentee/template/MyPage.dc.html?role=mentee&tab=mentoring"
```

## 손댄 곳 — 경로만. 모양은 손대지 않았다

| 무엇 | 어떻게 |
|---|---|
| `_ds/m2-design-system-<uuid>/` | `../../../ds-export/project/` |
| `../../assets/img/` (표본 사진 · 상수 `IMG` · 부품 기본값 안) | `../../../ds-export/project/assets/img/` |
| DS 부품의 기본 자산 경로 | `ds-asset-path.js` 를 번들 앞에 넣었다 |

배치는 `design/_import/place-mypage.sh` 가 한다. **새 export 가 오기 전에 다시 돌리면 리포에서 손본 것이 덮인다**(지금은 손본 것이 없다).

## 사양과 다른 곳 · 넘긴 것

UI-REVIEW 1차의 표가 정본이다. 요지 — 2판 Claude Design 프롬프트(`design/_import/prompts/mypage-r2-1015.md`)로 고친다. 리포에서 CSS 로 손보지 않는다.

- `html` 의 `lang="ko"` 는 스크립트가 넣는다(정적 속성 없음)
- 최소 금액 슬라이더는 브라우저 기본 `input[type=range]` 다 — DS 에 Slider 가 없다(`DS-120`)
- 외부 라이브러리 없음. CDN 참조 없음
