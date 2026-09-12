# ubiquitous-language.md — 용어집

> 이 문서가 답하는 것: **이 개념의 이름은 무엇인가.**

- 상태: 기안
- 기안일: 2026-08-31
- 채운 날: 2026-09-02

## 규칙

- **코드의 식별자(컴포넌트·변수·API·화면 ID)는 English 열을 그대로 쓴다.**
- **표에 없는 영어명을 발명하지 않는다.** 새 이름은 여기에 행을 먼저 추가하고 쓴다.
- 행은 **한국어 가나다순**으로 정렬한다. 중복을 눈으로 잡기 위해서다.
- **도메인 개념 · 화면 ID · 컴포넌트 명칭을 한 표에 넣는다.** 나누지 않는다.
- **UX 라이팅(화면에 나오는 문구)은 이 표가 아니다.** 경계는 [docs/SOURCES.md](../SOURCES.md) 「용어집과 UX 라이팅의 경계」가 정본이다. 여기에 복제하지 않는다.
- **UI 표기 열을 만들지 않는다.**

### 표기의 구분

| 종류 | English 의 표기 | 예 |
|---|---|---|
| 도메인 개념 | PascalCase | `Mentor` · `Flower` |
| 화면 ID | 소문자와 하이픈 | `qna-feed` · `mypage-mentee` |
| 컴포넌트 | PascalCase | `MentorCard` · `BottomTabBar` |
| **모달** | PascalCase ＋ `Modal` | `MentoringDetailModal` |

**소문자와 하이픈은 화면에만 쓴다.** 모달은 URL 을 갖지 않으므로 화면 ID 의 표기를 쓰지 않는다.

## 용어

<!-- 채운 순서
     ⓐ 도메인 개념 — Figma 「Mentree 2.0 (Claude)」 전 플로우 1회 스캔(2026-09-01)
     ⓑ 화면 ID     — design/docs/screen-inventory.md 에서 확정한 19화면
                     (초판은 21화면이었다. 09-10 에 멘토링 상세 2화면이 모달로 내려갔다)
     ⓒ 컴포넌트 명칭 — design/ds-export/project/components/ 의 30본

     English 가 이미 정해진 것(컴포넌트)은 그대로 쓴다. 새로 짓지 않는다.
     한국어 명칭이 갈리는 것은 정하지 말고 아래 「미결」에 모은다.
     정렬은 손으로 하지 않는다 — ko_KR 로케일로 생성했다. -->

| 한국어 | English | 설명 |
|---|---|---|
| Q&A 멘토링 | `Qna` | 멘티의 질문에 멘토가 답하는 것. 1인 1답이다 |
| Q&A 상세 | `qna-detail` | 화면. 간단보기·전체보기 2형태 |
| Q&A 질문 작성 | `qna-compose` | 화면. 전화번호 인증이 필요하다 |
| Q&A 카드 | `QnaCard` | 컴포넌트. surfaces |
| Q&A 피드 | `qna-feed` | 화면 |
| TOP | `top` | 화면. 허브 |
| 감사인사 | `ThanksNote` | Q&A 질문자가 개별 답변에 보내는 글. **화면에 표시하지 않고 멘토에게 직접 전달한다.** `Review` 와 다르다 — 그쪽은 공개다 |
| 격려 메세지 | `EncouragementMessage` | 멘토링 완료 후 멘토가 멘티에게 보내는 메시지. 리뷰와 짝을 이룬다 |
| 공지사항 | `Notice` | 운영 알림. 진입은 푸터다 |
| 공지사항 목록 | `notice-list` | 화면 |
| 공지사항 상세 | `notice-detail` | 화면 |
| 관심있는 멘토 | `FavoriteMentor` | 멘토를 모아두는 것. 멘토 상세의 등록 버튼도 이 말을 쓴다 |
| 국가 | `Country` | `Region` 의 소분류. 일본·한국 등 |
| 기업 서비스 | `Biz` | 법인 대상 서비스. 외부 사이트로 나간다. biz blue 로 격리한다 |
| 꽃송이 | `Flower` | 멘토링 대가의 단위. **1송이 ＝ 10달러.** 멘토링 시간에 따라 최소 송이 수가 정해진다 |
| 다이얼로그 | `Dialog` | 컴포넌트. overlays |
| 달력 | `Calendar` | **미구현**(`DS-13`). 멘토링 일정 선택 |
| 답변 카드 | `AnswerCard` | 컴포넌트. surfaces. Q&A 상세의 멘토 답변 1건. 카드 전체가 클릭 대상이 아니다 |
| 도움돼요 | `Helpful` | Q&A 답변에 누르는 표시 겸 액션. 아이콘은 하트다. **질문자가 누르면 텍스트 배지가 붙고** 그것이 실질적인 채택이다. 정렬 최우선 |
| 라디오 그룹 | `RadioGroup` | 컴포넌트. forms |
| 로그인 | `login` | 화면 |
| 리뷰 | `Review` | 멘토링 완료 후 멘티가 쓴다. 멘토 상세에 쌓인다 |
| 리치 텍스트 에디터 | `RichTextEditor` | **DS 밖**(`DS-15` 각하 2026-09-12). Q&A 질문·답변 작성. **blocknote 를 FE 가 직접 붙인다** — 사양은 그 화면의 `UI-SPEC.md` 가 갖는다 |
| 마이페이지(멘토) | `mypage-mentor` | 화면. 탭 10 |
| 마이페이지(멘티) | `mypage-mentee` | 화면. 탭 9 |
| 멘토 | `Mentor` | 해외에서 활동하는 한국인. 답변·인터뷰·멘토링을 제공한다 |
| 멘토 상세 | `mentor-detail` | 화면. 탭 4 |
| 멘토 인터뷰 | `Interview` | 멘토를 다룬 기사. 아티클 카테고리의 하나다 |
| 멘토 찾기 | `mentor-search` | 화면 |
| 멘토 카드 | `MentorCard` | 컴포넌트. surfaces. 296 고정·미디어 3:2/5:4 |
| 멘토링 | `Mentoring` | 1:1 유료 세션. 신청 → 수락 → 일정 확정 → 완료 |
| 멘토링 상세 모달 | `MentoringDetailModal` | **모달.** 상태 6. `mypage-mentee`·`mypage-mentor` 의 §6 이다. 역할로 액션이 갈린다 |
| 멘토링 신청 | `mentoring-apply` | 화면. 2스텝 ＋ 결제. 진입은 `mentor-detail` |
| 멘토링 카드 | `MentoringCard` | **미구현**(`DS-18`). 멘토링 1건의 상태·상대·액션. `MentorCard` 와 다르다 |
| 멘트리 인사이트 | `Insight` | 멘트리가 발행하는 아티클 카테고리의 하나 |
| 멘트리 인사이트 목록 | `insight-list` | 화면. 카테고리 4 |
| 멘티 | `Mentee` | 해외 커리어를 준비하는 사람 |
| 배너 | `Banner` | 컴포넌트. navigation |
| 배지 | `Badge` | 컴포넌트. core. new 상태·+N 펼침·labelHidden |
| 버튼 | `Button` | 컴포넌트. core |
| 북마크 토글 | `BookmarkToggle` | 컴포넌트. core. 스크랩의 UI 다 |
| 브레드크럼 | `Breadcrumb` | **미구현**(`DS-16`). 목록 ＞ 상세. 깊이 2단이고 마지막은 링크가 아니다 |
| 비밀번호 찾기·재설정 | `password-reset` | 화면 |
| 빈 상태 | `EmptyState` | 컴포넌트. surfaces. 0건일 때의 표시와 다음 행동 유도 |
| 사이드바 | `Sidebar` | 컴포넌트. navigation. **제거 대상**(`DS-19`) — 앱 네비 레일이며 어느 화면도 쓰지 않는다 |
| 세로 내비 | `VerticalNav` | **미구현**(`DS-17`). 마이페이지 좌측 · 아티클 카테고리 |
| 섹션 헤더 | `SectionHeader` | 컴포넌트. navigation |
| 셀렉트 | `Select` | 컴포넌트. forms |
| 스위치 | `Switch` | 컴포넌트. forms |
| 스켈레톤 | `Skeleton` | 컴포넌트. surfaces. 로딩 중의 자리표시 |
| 스크랩 | `Scrap` | Q&A·아티클을 모아두는 것. 비로그인은 로그인으로 유도한다 |
| 스테퍼 | `Stepper` | **미구현**(`DS-14`). 다단계 플로우의 진행 표시 |
| 시트 | `Sheet` | 컴포넌트. overlays |
| 아바타 | `Avatar` | 컴포넌트. core. `AvatarGroup` 을 함께 export 한다 |
| 아이콘 | `Icon` | 컴포넌트. core. HugeIcons 모노 |
| 아이콘 버튼 | `IconButton` | 컴포넌트. core |
| 아티클 | `Article` | 읽을거리의 총칭. 카테고리는 인사이트·이벤트·멘토 인터뷰다 |
| 아티클 상세 | `article-detail` | 화면 |
| 아티클 프리뷰 | `ArticlePreview` | 컴포넌트. surfaces |
| 알림 | `notification` | 화면. 드롭다운 ＋ 페이지 2형태 |
| 온보딩 설문 | `onboarding-survey` | 화면. 3스텝 ＋ 완료 |
| 이벤트 | `Event` | 멘트리 클라쓰 등. 아티클 카테고리의 하나다 |
| 이벤트 상세 | `event-detail` | 화면. **와이어 없음** |
| 인터뷰 카드 | `InterviewCard` | 컴포넌트. surfaces. 모바일 세로형 미구현(`DS-07`) |
| 인풋 | `Input` | 컴포넌트. forms |
| 정산 | `Settlement` | 멘토가 받은 꽃송이를 현금으로 받는 것 |
| 지역 | `Region` | `Country` 의 대분류 계층. 유럽·아시아/중동·북미/오세아니아. **필터의 축이 아니고 화면 라벨로도 쓰지 않는다** — 축과 라벨은 「국가」로 통일한다(2026-09-11) |
| 직무 | `JobTitle` | 개인의 직책. 「사업 프로듀서」처럼 멘토 카드에 뜬다 |
| 직종 | `JobCategory` | 분류축. 필터와 온보딩 설문이 쓴다. 대분류-소분류 계층이다 |
| 체크박스 | `Checkbox` | 컴포넌트. forms |
| 칩 | `Chip` | 컴포넌트. core. **데이터를 나타내고 눌리지만 켜지지 않는다** — 해시태그·걸린 조건. 행동이면 `Button` 이다([DESIGN.md](../../design/DESIGN.md) §12) |
| 카드 | `Card` | 컴포넌트. surfaces. 하위 5본을 함께 export 한다 |
| 카운트 토글 | `CountToggle` | 컴포넌트. core. 아이콘 ＋ 카운트 토글. **메타 줄 인라인 전용**이고 반전하지 않는다. 미디어 위는 `BookmarkToggle` 이다(§8.1) |
| 캐러셀 | `Carousel` | 컴포넌트. navigation |
| 커리어 Phase | `Phase` | 온보딩 설문이 묻는 4단계. **추천의 입력값이다.** 진단 컨텐츠는 MVP 밖이다([PRODUCT.md](../PRODUCT.md) 「MVP 범위 밖」) |
| 콜아웃 바 | `CalloutBar` | 컴포넌트. navigation |
| 키워드 | `Keyword` | **테마 태그의 대분류.** 국가와 함께 가장 큰 분류축이다. **목록은 상정 중이며 바뀐다**(2026-09-11). 값에 의존하는 판단을 UI-SPEC 에 쓰지 않는다 |
| 태그 | `Tag` | 자유입력 해시태그. 질문당 최대 10개 |
| 태그 입력 | `TagInput` | 컴포넌트. forms. 태그를 넣고 빼는 폼 필드. **안에 세우는 태그는 전부 `Chip md`** 다 — 입력된 것은 `onRemove`, 제안은 `onClick` |
| 탭 | `Tabs` | 컴포넌트. navigation. 같은 셸에서 내용을 바꾼다. 카운트 배지를 함께 쓴다 |
| 테이블 | `Table` | 컴포넌트. surfaces |
| 토글 그룹 | `ToggleGroup` | 컴포넌트. forms |
| 토스트 | `Toast` | 컴포넌트. overlays. 액션 수가 종류를 정한다 — 0개 알림 · 1개 실행취소 · 2개 질문. 실장은 `sonner` 다 |
| 팔로워 | `Follower` | 멘토를 팔로우한 사람. 멘토 마이페이지에 보인다 |
| 팝오버 | `Popover` | 컴포넌트. overlays. 앵커에 붙는 껍데기. 공유·더보기. `Badge` 의 「+N 펼침」은 범위 밖이다 |
| 페이지네이션 | `Pagination` | 컴포넌트. navigation. 목록의 쪽 이동. 시작·중간·끝 3형태 |
| 푸터 | `Footer` | 컴포넌트. navigation |
| 프로모션 코드 | `PromotionCode` | 결제 시 쓰는 쿠폰 |
| 필드 | `Field` | 컴포넌트. forms. `FieldGroup` 을 함께 export 한다 |
| 필터칩 | `FilterChip` | 컴포넌트. core |
| 하단 탭바 | `BottomTabBar` | 컴포넌트. navigation. 모바일 전용 4탭 |
| 헤더 | `Header` | 컴포넌트. navigation. 반응형·오버레이 |
| 회원가입 | `signup` | 화면. 이메일 ／ 소셜 2경로 |

**93행** — 개념 **28**(모달 1 포함) · 화면 **19** · 컴포넌트 **40** · **미구현 5** · **DS 밖 1**.

> **09-12 에 미구현 9본이 실물이 됐다** — `Pagination`·`Tabs`·`Toast`·`Skeleton`·`EmptyState`·`Popover`·`Chip`·`CountToggle`·`AnswerCard`. 행 수는 그대로이고 설명만 바뀐다.
>
> **같은 날 `TagInput` 1행이 늘었고 바로 실물이 됐다**(`DS-26`). 컴포넌트는 **40본**, 미구현은 **6본**이다 — `Calendar`·`Stepper`·`RichTextEditor`·`Breadcrumb`·`VerticalNav`·`MentoringCard`.

> **09-10 에 89행에서 1행 줄었다.** `mentoring-detail-mentee`·`mentoring-detail-mentor` 2행을 `MentoringDetailModal` 1행으로 합쳤다. 부모 화면이 이미 역할을 가르므로 이름에 역할을 다시 넣지 않는다.
>
> **09-11 에 4행 늘었다.** `Chip`(`DS-20`) · `CountToggle`(`DS-21`) · `AnswerCard`(`DS-23`) ＋ **`ThanksNote`**. 마지막은 **말이 겹쳐서 가른 것**이다 — 와이어가 Q&A 답변에 보내는 글도 「리뷰」라고 불렀는데, `Review` 는 1:1 멘토링의 **공개** 리뷰다. Q&A 쪽은 화면에 안 뜨고 멘토에게 직접 간다. 화면 문구를 따라 「감사인사」로 이름을 붙였다.

「미구현」은 `ds-export/` 에 **아직** 없는 것이다. **이름을 먼저 정하고 Claude Design 에서 만든다**(`docs/SOURCES.md` 「예외 — 이름은 용어집이 정본이다」).

**「DS 밖」은 `ds-export/` 에 앞으로도 안 만드는 것이다.** 라이브러리가 UI 와 상태 기계를 통째로 갖고 우리가 정할 것이 기능의 on/off 뿐인 경우다(`docs/SOURCES.md` 「그래도 부품을 만드는가」). **이름은 여기 남는다** — 화면 UI-SPEC 이 그 이름으로 부른다.

## 쓰지 않는 말

**같은 것을 두 이름으로 부르면 나중에 어느 쪽이 맞는지 판정할 수 없다.** 한쪽을 버린다.

**이 표는 [check-docs.py](../../scripts/check-docs.py) 가 읽는다.** 행을 추가하면 그 말이 리포 전체에서 걸린다. 검사기를 고치지 않는다.

| 쓰지 않는 말 | 대신 쓸 말 | 왜 |
|---|---|---|
| 지역 | 국가 | 분류축은 `Country` 하나다. `Region` 은 그 안의 대분류 계층이며 화면에 나오지 않는다 |

### 이 표에 행을 더할 때

| 판정 조건 | 아크션 |
|---|---|
| 같은 것을 두 이름으로 부르고 있다 | **한쪽을 버리고 여기에 1행 넣는다.** 「왜」를 반드시 채운다 |
| 버린 말이 다른 뜻으로도 쓰인다 | **넣지 않는다.** 기계가 정당한 용법까지 잡는다 |
| 버린 말을 개념의 이름으로는 남긴다 | **남겨도 된다.** 위 「용어」 표의 설명에 **화면 라벨로 쓰지 않는다**를 적는다 |

### 버린 말을 가리켜야 할 때

「와이어의 ○○은 잘못된 단어다」처럼 **그 말 자체를 가리키는 문장**이 나온다. 이것까지 잡으면 결정의 근거를 못 쓴다.

| 판정 조건 | 아크션 |
|---|---|
| 그 말을 **쓴다**(축·라벨·설명으로) | 걸린다. 대신 쓸 말로 바꾼다 |
| 그 말을 **가리킨다**(단어 자체를 화제로 삼는다) | **백틱으로 감싼다.** 검사가 지나간다 |
| 코드블록 안이다 | 검사하지 않는다 |

### 검사에서 빼는 곳

| 어디 | 왜 |
|---|---|
| 이 문서 | 버린 말을 표에 적어야 한다 |
| `design/ds-export/` | 손대지 않는 사본이다. 고치면 Claude Design 과 갈린다 |
| `design/_import/` | 와이어의 원문을 그대로 두는 자리다 |

**자동으로 고치지 않는다.** 기계가 문장을 바꾸면 뜻이 틀어진다. 어느 파일 몇 행인지만 찍는다.

## 여기에 넣지 않은 것

| 무엇 | 왜 |
|---|---|
| **지혜부꾸로** | 포지셔닝 문구이지 식별자가 아니다. [PRODUCT.md](../PRODUCT.md) 가 갖는다 |
| 화면의 상태·탭 이름 | 화면이 아니다. 각 `UI-SPEC.md` §6·§7 이 갖는다 |
| 버튼 라벨·안내문 | UX 라이팅이다. 위 「규칙」 참조 |
