# template 의 출처 — 마이페이지는 멘티 · 멘토가 한 장이다

- Claude Design: 프로젝트 **`Mentree 2.0 My Page`**(radarlab 계정). 공개 공유 링크는 적지 않는다([ADR-0002](../../../../docs/adr/0002-rebuild-design-system-instead-of-sharing.md))
- 원본: `design/_import/export-1008/Mentree 2.0 My Page (1020 r5).zip` · SHA-256 `acc5339b70fc` · **생성 2026-10-20 13:14 · 5판**. 5차 프롬프트 `design/_import/prompts/mypage-r5-1020.md`(「나의 1:1 멘토링은 카드만」)를 상혁이 돌린 판이다. **1:1 카드의 버튼 · 「자세히 보기」 · 사람 줄은 눌러도 아무 일도 없고, 1:1 상세 모달(`MentoringDetailModal`)은 걷어냈다.** 카드를 누른 뒤의 화면은 전부 [`mentoring-apply`](../../mentoring-apply/template/SOURCE.md) 의 것이다(상혁 결정 2026-10-20)
- 4판은 없다 — 4차(`mypage-r4-1015.md`)의 제목 크기 · 스크랩 건수 줄은 10-19 17:39 판에 들어 있었고, 모달 관련 3건은 5판에서 모달이 걷히며 닫혔다. 3판: `(1015 r3).zip` · `de4c15a257e4` · 10-15 18:31(기준 화면 일원화)
- 2판: `(1015 r2).zip` · `cca8ac9dce3d` · 15:04(카드 일람 · 1차 검수). 1판: `(1014).zip` · `d86d01a26a42` · 10-14 23:56
- 대응 UI-SPEC: [`../UI-SPEC.md`](../UI-SPEC.md)(틀) · [`../../mypage-mentor/UI-SPEC.md`](../../mypage-mentor/UI-SPEC.md)(멘토의 차이) — 둘 다 기안 · UX승인 대기. 미결 14건은 §11 의 기본값대로 만들어졌다
- 디자인 시스템: `ds-export/` 의 **2026-10-14 판**(53본 · zip `af278860480b`). export 의 `_ds` 사본(12파일)은 번들 · 토큰이 이 판과 **바이트까지 같다.** 경로만 `../../../ds-export/project/` 로 돌렸다
- 검수: [`../UI-REVIEW.md`](../UI-REVIEW.md) 1차 · 카드 일람 대조 · 2차 · 기준 화면 대조 · 3차(모두 2026-10-15) · **5판(2026-10-20 · 카드 동작 끊김 확인)**

## 무엇이 들어 있나

**입구는 한 장이다 — `MyPage.dc.html`.** 역할 · 메뉴 · 하위 탭 · 상태 · 모달 · 뷰를 **주소의 값으로 고른다.** 위쪽 데모 줄로도 바꿔 볼 수 있다(`?frame=1` 이면 숨긴다). 멘토 화면(`mypage-mentor`)은 같은 파일의 `role=mentor` 다 — 멘토 폴더에는 `SOURCE.md` 만 둔다.

| 값 | 선택지 |
|---|---|
| `role` | `mentee` · `mentor` |
| `tab` | `profile` · `qna` · `mentoring` · `favorites` · `scrap` · `payment`(멘티) ／ `settlement`(멘토) · `account` |
| `sub` | qna: `answered` · `waiting`(멘티) ／ `answered` · `asked`(멘토) ／ mentoring: `ongoing` · `done`(멘티) ／ `received-ongoing` · `received-done` · `sent-ongoing` · `sent-done`(멘토) ／ favorites(멘토): `followers` · `mentors` ／ scrap: `qna` · `article` ／ settlement: `payout` · `payment` |
| `state` | `normal` · `loading` · `empty` · `error` |
| `modal` | 편집 대화상자만 — `profile-edit` · `photo` · `intro` · `countries` · `jobs` · `timezone` · `mail` · `notify` · `password` · `dormant` · `leave` · `min-price` · `donate-confirm` · `mentee-profile` · `bank` · `bank-form` · `bank-done` · `bank-email` · `bank-email-done` · `settle-done` · `delete-question`. **1:1 멘토링의 모달 값은 5판부터 받지 않는다**(주소로 와도 목록만 보인다) |
| `editState` | 편집 대화상자의 상태(3판) — `dirty`(닫기 확인) · `saving` · `error` |
| `view` | `desktop` · `mobile`(390 iframe) |

예: `MyPage.dc.html?frame=1&role=mentor&tab=mentoring&sub=received-ongoing&state=normal&view=desktop`

**1:1 카드는 상태별 모양까지만 보여 준다(5판).** 버튼 · 「자세히 보기」 · 사람 줄의 모양은 그대로이고 동작만 없다. 어느 버튼이 흐름의 어느 화면을 여는지는 [`../UI-SPEC.md`](../UI-SPEC.md) §6 3 의 대응표에 있다.

| 파일 | 무엇 |
|---|---|
| `MyPage.dc.html` | 입구 · 셸(헤더 · 세로 메뉴 `data-temp="DS-17"` · 탭 머리 · 하단 탭바) · 탭 7 의 본문 · 편집 모달 16 · 표본 데이터 · 토스트 |
| `MentoringCard.dc.html` | 멘토링 카드(`data-temp="DS-18"`) — 상태 6 × 역할 2 |
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

UI-REVIEW 2차의 표가 정본이다. 남은 것은 다음 Claude Design 회차로 고친다. 리포에서 CSS 로 손보지 않는다.

- `html` 의 `lang="ko"` 는 스크립트가 넣는다(정적 속성 없음)
- 최소 금액 슬라이더는 `input[type=range]` 를 화면 CSS(`.mp-slider` · `data-temp="DS-120"`)로 조립했다 — DS 에 Slider 가 없다
- 외부 라이브러리 없음. 스크립트 · 스타일의 CDN 참조 없음(표본 데이터의 회의 · 캘린더 주소는 링크일 뿐이다)
