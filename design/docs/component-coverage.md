# 컴포넌트 커버리지

> 이 문서가 답하는 것: **와이어가 요구하는 요소를 디자인 시스템이 덮는가.**
> 고아 분석의 **입력**이다. 갭의 확정과 `DS-nn` 기표는 여기서 하지 않는다([DS-update-list.md](../DS-update-list.md)).

- 상태: 기안
- 기안일: 2026-09-02
- 실측: Figma 「Mentree 2.0 (Claude)」 12덩어리 16,457노드 ／ `design/ds-export/project/components/` 30본

## 읽는 방법

**와이어의 요소명과 디자인 시스템의 컴포넌트명은 다르다.** 와이어는 shadcn 프리미티브와 1.0 부품으로 그려졌고, 디자인 시스템은 그 위에 새로 세웠다.

| 판정 조건 | 아크션 |
|---|---|
| 와이어의 요소명을 코드에 쓰고 싶다 | **쓰지 않는다.** 이름의 정본은 [용어집](../../docs/glossary/ubiquitous-language.md)이다 |
| 와이어에 있는데 여기 표에 없다 | **아이콘·자리표시자다.** 아래 「세지 않은 것」 참조 |
| 갭을 발견했다 | **여기에 후보로 적는다.** `DS-nn` 기표는 고아 분석에서 한다 |

## 발견 — 와이어는 두 계통으로 그려져 있다

| 계통 | 어느 덩어리 | 요소명의 형태 |
|---|---|---|
| **shadcn 계통** | TOP · 멘토찾기 · Q&A · 알림 · 아티클 | `Card` · `Badge` · `InputGroup / Addon Inline` · `Aspect Ratio` · `Pro Blocks / Navbar Link` |
| **1.0 계통** | **온보딩** · **멘토링 신청/확정** | `Button / Primary_large / normal` · `Input_box / Normal` · `Stepper / 3-3` · `Slider / Large` · `Number / Active` · `Header / Normal, PC` |

**1.0 계통의 두 덩어리는 새로 설계한 것이 아니라 1.0 화면을 가져온 것이다.** 사양 주석이 0인 이유가 이것이다 — 이미 돌고 있는 화면이라 규칙을 다시 적지 않았다.

| 판정 조건 | 아크션 |
|---|---|
| 1.0 계통 화면의 UI-SPEC 을 쓴다 | **와이어를 사양으로 읽지 않는다.** 1.0 의 실동작을 확인해야 §7·§8 이 채워진다 |
| 1.0 계통 화면의 부품을 세운다 | **shadcn 계통으로 다시 그린다.** 두 계통을 그대로 두면 디자인 시스템이 갈린다 |

`mentor-detail` 은 컴포넌트 인스턴스가 **0개**다. 프레임과 텍스트로만 그려져 있어 부품을 읽을 수 없다.

## 커버리지 — 요소별

**있음** ＝ `ds-export/project/components/` 에 실물이 있다. **없음** ＝ 갭 후보다.

| 요소 | 어느 화면이 요구하나 | DS-cd | 비고 |
|---|---|---|---|
| 버튼 | 전 화면 | ✅ `Button` | |
| 아이콘 버튼 | 전 화면 | ✅ `IconButton` | |
| 배지 | `mentor-search` · `qna-*` · `insight-list` · `mypage-*` | ✅ `Badge` | 펼침 팝오버가 카드에서 잘릴 수 있다(`DS-06`) |
| 아바타 | `qna-*` · `notification` · `mypage-*` | ✅ `Avatar` ＋ `AvatarGroup` | |
| 카드 | `top` · `mentor-search` · `qna-feed` · `insight-list` | ✅ `Card` ＋ 하위 5 | |
| 멘토 카드 | `top` · `mentor-search` · `mypage-*` | ✅ `MentorCard` | |
| Q&A 카드 | `top` · `qna-feed` · `mypage-*` | ✅ `QnaCard` | |
| 인터뷰 카드 | `top` · `mentor-detail` | ✅ `InterviewCard` | 모바일 세로형 미구현(`DS-07`) |
| 아티클 프리뷰 | `top` · `insight-list` · `article-detail` | ✅ `ArticlePreview` | |
| 헤더 | 전 화면 | ✅ `Header` | 1.0 계통은 `Header / Normal, PC` 를 쓴다 |
| 푸터 | 전 화면 | ✅ `Footer` | `notice-list` 의 진입점이다 |
| 하단 탭바 | 전 화면(모바일) | ✅ `BottomTabBar` | |
| 섹션 헤더 | `top` · `insight-list` | ✅ `SectionHeader` | |
| 캐러셀 | `top` | ✅ `Carousel` | |
| 배너 | `article-detail` | ✅ `Banner` | A·B·C 3종으로 CTA 가 갈린다 |
| 콜아웃 바 | `top` | ✅ `CalloutBar` | |
| 필터칩 | `mentor-search` · `qna-feed` · `insight-list` | ✅ `FilterChip` | |
| 인풋 | `mentor-search` · `qna-compose` · `login` · `signup` | ✅ `Input` | |
| 필드 | `signup` · `qna-compose` · `mentoring-apply` | ✅ `Field` ＋ `FieldGroup` | |
| 셀렉트 | `qna-compose` · `insight-list` · `mypage-*` | ✅ `Select` | |
| 체크박스 | `signup` | ✅ `Checkbox` | |
| 라디오 | `login`(연령확인) · `onboarding-survey` · `qna-compose` | ✅ `RadioGroup` | |
| 스위치 | `mypage-*`(알림 설정) | ✅ `Switch` | |
| 토글 그룹 | `qna-feed` · `insight-list` | ✅ `ToggleGroup` | |
| 다이얼로그 | `qna-*` · `mentoring-*` · `login` | ✅ `Dialog` | |
| 시트 | `insight-list`(지역 팝업) | ✅ `Sheet` | |
| 테이블 | `mypage-*`(결제·정산 이력) | ✅ `Table` | |
| 북마크 토글 | `mentor-search` · `qna-*` · `article-detail` | ✅ `BookmarkToggle` | |
| 사이드바 | **`qna-feed`(나의 Q&A)** · `insight-list`(카테고리) | ⚠️ `Sidebar` | **레거시·미사용으로 표시돼 있다.** 되살릴지 새로 세울지 판단이 필요하다 |

## 갭 후보 — DS-cd 에 없다

**11건이다.** `DS-01`·`DS-02` 는 이미 기표돼 있고 나머지 9건은 이번 실측에서 나왔다.

| # | 요소 | 어느 화면이 요구하나 | 근거 |
|---|---|---|---|
| 1 | **Pagination** | `insight-list` · `notice-list` · `qna-feed` · `mypage-*` | 이미 `DS-01`. 와이어에 「페이지네이션-시작/중간/끝」 3형태가 있다 |
| 2 | **Tabs** | `mentor-detail`(4) · `mypage-mentee`(9) · `mypage-mentor`(10) · `qna-feed` · `insight-list` | 이미 `DS-02`. **가장 많이 쓰인다** |
| 3 | **Toast** | `mentor-search` · `article-detail` | 「완료 토스트 노출 시간 3초·해제 문구·실행취소」 ／ 와이어에 `Sonner` 가 있다 |
| 4 | **Skeleton** | `mentor-search` · `qna-feed` · `article-detail` | 「로딩: 스켈레톤 UI」가 3화면의 주석에 있다 |
| 5 | **EmptyState** | `mentor-search` · `qna-feed` · `notification` · `mypage-*` | 「찾으시는 결과값의 멘토가 아직 없습니다」·「아직 질문이 없으시네요!」·「새 알림이 없습니다」 |
| 6 | **Popover** | `mentor-detail` · `qna-detail` · `article-detail` | 「웹의 경우 popover → 링크 복사/공유하기」 |
| 7 | **Calendar** | `mentoring-detail-mentee` · `mentoring-detail-mentor` | 일정 확정·재조정의 날짜 선택. 와이어에 월 달력이 있다 |
| 8 | **Stepper** | `signup` · `onboarding-survey` · `mentoring-apply` | 1.0 계통이 `Stepper / 1-2`·`2-2`·`3-3` 을 쓴다 |
| 9 | **Slider** | `onboarding-survey`(사진 트리밍) | 1.0 계통이 `Slider / Small`·`Large` 를 쓴다 |
| 10 | **RichTextEditor** | `qna-compose` · `qna-detail`(답변) | 「텍스트 에디터, 0/1000자」. 와이어가 blocknote 를 링크한다 |
| 11 | **Breadcrumb** | `qna-detail` · `article-detail` | 「Q&A 목록 ＜ 상세」·「멘트리 인사이트 ＜ 상세」 |

**아티클 상세의 목차(우측 앵커)는 갭으로 세지 않았다.** 「H2 자동 추출·현재 섹션 하이라이트」는 화면 고유의 조립이며 부품이 아니다. 2화면째에 나오면 승격시킨다(헌장 원칙 7).

## 아이콘 — 5계통이 섞여 있다

디자인 시스템은 **HugeIcons 모노**로 정해져 있다. 와이어는 그렇지 않다.

| 계통 | 어디에 |
|---|---|
| **HugeIcon** | shadcn 계통 전부. **정본이다** |
| `24 / basic / …` | 1.0 계통(온보딩·멘토링 신청) |
| Lucide | `qna-feed` · `insight-list` |
| Phosphor | `qna-feed` · `insight-list` |
| Remix · Tabler | `insight-list` |

| 판정 조건 | 아크션 |
|---|---|
| 와이어가 HugeIcon 이 아닌 아이콘을 쓴다 | **HugeIcon 으로 바꾼다.** 대응이 없으면 `DS-nn` 으로 기표한다 |
| 헤더·진입의 28px 컬러 SVG 다 | **예외다.** 확정 자산 대기(`DS-05`) |

## 세지 않은 것

| 무엇 | 왜 |
|---|---|
| `IconPlaceholder` · `KbdGroup` · `Aspect Ratio` · `Flex` · `Container` | shadcn 의 자리표시자·레이아웃 프리미티브다. 부품이 아니다 |
| `Japan-JP-square` · `Flag` | 국기 SVG 19본이 `ds-export/project/assets/flags/` 에 있다. 자산이지 컴포넌트가 아니다 |
| `Cheers` · `Thanks` | 일러스트다. 자산으로 다룬다 |
| `Pro Blocks / *` · `Blog post card` | shadcn 의 조합 블록이다. DS-cd 의 카드류가 대응한다 |

## 다음 — 고아 분석에서 할 것

| 순 | 무엇 |
|---|---|
| 1 | 위 갭 후보 11건을 **`DS-nn` 으로 기표**한다(3~11 의 9건이 신규) |
| 2 | `Sidebar` 를 되살릴지 새로 세울지 정한다 |
| 3 | **1.0 계통 2덩어리를 shadcn 계통으로 다시 그릴지** 정한다. 정하지 않으면 부품이 두 벌이 된다 |
| 4 | 아이콘 5계통을 HugeIcon 으로 모은다 |
| 5 | `mentor-detail` 은 인스턴스가 0이라 **화면을 보고 부품을 추출**한다 |
