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

## 용어

<!-- 채운 순서
     ⓐ 도메인 개념 — Figma 「Mentree 2.0 (Claude)」 전 플로우 1회 스캔(2026-09-01)
     ⓑ 화면 ID     — design/docs/screen-inventory.md 에서 확정한 21화면
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
| 격려 메세지 | `EncouragementMessage` | 멘토링 완료 후 멘토가 멘티에게 보내는 메시지. 리뷰와 짝을 이룬다 |
| 공지사항 | `Notice` | 운영 알림. 진입은 푸터다 |
| 공지사항 목록 | `notice-list` | 화면 |
| 공지사항 상세 | `notice-detail` | 화면 |
| 기업 서비스 | `Biz` | 법인 대상 서비스. 외부 사이트로 나간다. biz blue 로 격리한다 |
| 꽃송이 | `Flower` | 멘토링 대가의 단위. **1송이 ＝ 10달러.** 멘토링 시간에 따라 최소 송이 수가 정해진다 |
| 다이얼로그 | `Dialog` | 컴포넌트. overlays |
| 도움돼요 | `Helpful` | Q&A 답변에 누르는 표시 겸 액션. 질문자가 누른 것이 정렬 최우선이다 |
| 라디오 그룹 | `RadioGroup` | 컴포넌트. forms |
| 로그인 | `login` | 화면 |
| 리뷰 | `Review` | 멘토링 완료 후 멘티가 쓴다. 멘토 상세에 쌓인다 |
| 마이페이지(멘토) | `mypage-mentor` | 화면. 탭 10 |
| 마이페이지(멘티) | `mypage-mentee` | 화면. 탭 9 |
| 멘토 | `Mentor` | 해외에서 활동하는 한국인. 답변·인터뷰·멘토링을 제공한다 |
| 멘토 상세 | `mentor-detail` | 화면. 탭 4 |
| 멘토 인터뷰 | `Interview` | 멘토를 다룬 기사. 아티클 카테고리의 하나다 |
| 멘토 찾기 | `mentor-search` | 화면 |
| 멘토 카드 | `MentorCard` | 컴포넌트. surfaces. 296 고정·미디어 3:2/5:4 |
| 멘토링 | `Mentoring` | 1:1 유료 세션. 신청 → 수락 → 일정 확정 → 완료 |
| 멘토링 상세(멘토) | `mentoring-detail-mentor` | 화면. 상태 6 |
| 멘토링 상세(멘티) | `mentoring-detail-mentee` | 화면. 상태 6 |
| 멘토링 신청 | `mentoring-apply` | 화면. 2스텝 ＋ 결제 |
| 멘트리 인사이트 | `Insight` | 멘트리가 발행하는 아티클 카테고리의 하나 |
| 멘트리 인사이트 목록 | `insight-list` | 화면. 카테고리 4 |
| 멘티 | `Mentee` | 해외 커리어를 준비하는 사람 |
| 배너 | `Banner` | 컴포넌트. navigation |
| 배지 | `Badge` | 컴포넌트. core. new 상태·+N 펼침·labelHidden |
| 버튼 | `Button` | 컴포넌트. core |
| 북마크 토글 | `BookmarkToggle` | 컴포넌트. core. 스크랩의 UI 다 |
| 비밀번호 찾기·재설정 | `password-reset` | 화면 |
| 사이드바 | `Sidebar` | 컴포넌트. navigation. **레거시.** 미사용 |
| 섹션 헤더 | `SectionHeader` | 컴포넌트. navigation |
| 셀렉트 | `Select` | 컴포넌트. forms |
| 스위치 | `Switch` | 컴포넌트. forms |
| 스크랩 | `Scrap` | Q&A·아티클을 모아두는 것. 비로그인은 로그인으로 유도한다 |
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
| 체크박스 | `Checkbox` | 컴포넌트. forms |
| 카드 | `Card` | 컴포넌트. surfaces. 하위 5본을 함께 export 한다 |
| 캐러셀 | `Carousel` | 컴포넌트. navigation |
| 커리어 Phase | `Phase` | 온보딩 설문이 묻는 4단계. 추천의 입력이다 |
| 콜아웃 바 | `CalloutBar` | 컴포넌트. navigation |
| 키워드 | `Keyword` | 질문의 대분류 태그. 국가와 함께 가장 큰 분류축이다 |
| 태그 | `Tag` | 자유입력 해시태그. 질문당 최대 10개 |
| 테이블 | `Table` | 컴포넌트. surfaces |
| 토글 그룹 | `ToggleGroup` | 컴포넌트. forms |
| 팔로워 | `Follower` | 멘토를 팔로우한 사람. 멘토 마이페이지에 보인다 |
| 푸터 | `Footer` | 컴포넌트. navigation |
| 프로모션 코드 | `PromotionCode` | 결제 시 쓰는 쿠폰 |
| 필드 | `Field` | 컴포넌트. forms. `FieldGroup` 을 함께 export 한다 |
| 필터칩 | `FilterChip` | 컴포넌트. core |
| 하단 탭바 | `BottomTabBar` | 컴포넌트. navigation. 모바일 전용 4탭 |
| 헤더 | `Header` | 컴포넌트. navigation. 반응형·오버레이 |
| 회원가입 | `signup` | 화면. 이메일 ／ 소셜 2경로 |

**72행** — 개념 21 · 화면 21 · 컴포넌트 30.

## 미결 — 한국어 명칭이 갈린다

**와이어가 같은 것을 두 이름으로 부르는 곳이다.** 정하지 않고 모았다(위 채우는 순서의 규칙).

<!-- 정해지면 위 표에 행을 넣고 이 절에서 지운다. -->

| # | 갈리는 이름 | 실측 | 무엇이 문제인가 |
|---|---|---|---|
| 1 | **직종** ／ **직무** | 59건 ／ 14건 | 같은 축이 두 이름이다. 멘토 찾기·Q&A 에서 둘 다 나온다 |
| 2 | **지역** ／ **국가** ／ **나라** | 24건 ／ 20건 ／ 혼용 | 아티클이 「지역 팝업: **국가** 토큰 다중 선택」이라 쓴다. 데이터는 「국가 : 대분류-소분류」 계층이다. **대분류를 지역, 소분류를 국가로 가를지** 하나로 통일할지 |
| 3 | **관심있는 멘토** ／ **즐겨찾기** | 8건 ／ 1건 | 멘토 상세만 「즐겨찾기 등록」이고 마이페이지는 「관심있는 멘토」다 |
| 4 | **도움돼요** ／ **채택** | 20건 ／ 3건 | Q&A 주석이 「채택(도움돼요) 표시」로 둘을 묶는다. 화면 문면은 「도움돼요」다 |

**정하지 않으면 막히는 것**: 1·2는 `mentor-search`·`qna-feed`·`insight-list` 의 필터 사양이다. 3은 `mentor-detail`·`mypage-*`. 4는 `qna-detail` 의 정렬 규칙이다.

## 여기에 넣지 않은 것

| 무엇 | 왜 |
|---|---|
| **지혜부꾸로** | 포지셔닝 문구이지 식별자가 아니다. [PRODUCT.md](../PRODUCT.md) 가 갖는다 |
| 화면의 상태·탭 이름 | 화면이 아니다. 각 `UI-SPEC.md` §6·§7 이 갖는다 |
| 버튼 라벨·안내문 | UX 라이팅이다. 위 「규칙」 참조 |
