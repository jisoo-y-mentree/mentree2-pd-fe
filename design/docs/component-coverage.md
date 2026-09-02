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

`mentor-detail` 은 컴포넌트 인스턴스가 **0개**다. 프레임과 텍스트로만 그려져 있어 부품을 읽을 수 없다. **화면을 눈으로 보고 뽑았다**(2026-09-02).

### 정정 — 「사이드바」는 두 가지다

**초판이 둘을 뭉뚱그렸다.** 실측해서 가른다.

| | 무엇 | 판정 |
|---|---|---|
| **`ds-export` 의 `Sidebar`** | **앱 네비게이션 레일**(대시보드 셸). `readme.md` 가 「**참조·레거시. canon 으로 쓰지 마세요**」라고 명시한다 | **제거한다**(`DS-19`). 어느 화면도 쓰지 않는다 |
| **와이어의 「사이드바」** | 페이지 안의 **세로 내비** — 마이페이지 좌측(7~8항목) · 아티클 좌측 카테고리(4항목) | **별개다.** `VerticalNav` 로 신설한다(`DS-17`) |

`qna-feed` 의 **우측 위젯 영역**(질문하기 CTA · 나의 Q&A 미니 목록)은 또 다른 것이다. **부품이 아니라 화면 조립**으로 본다. 2화면째에 같은 구조가 나오면 승격시킨다(헌장 원칙 7).

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
| 사이드바 | **어느 화면도 요구하지 않는다** | ⛔ `Sidebar` | **제거 대상**(`DS-19`). 아래 「정정」 참조 |

## 갭 후보 — DS-cd 에 없다

**기표하는 것과 보류하는 것을 가른다.**

| 판정 조건 | 아크션 |
|---|---|
| **2화면 이상**이 요구한다 | **`DS-nn` 으로 기표한다.** 아래 표 |
| **1화면**만 요구한다 | **기표하지 않는다.** 아래 「보류 후보」. 2화면째에 승격시킨다(헌장 원칙 7) |

**목록은 지금 확정하고, 사양은 화면에서 나온다.** 실사용 없이 사양을 정하면 안 맞는다 — 재개 팩이 이미 겪었다(「`CtaSection` 컴포넌트화 보류. **샘플이 1개뿐이라 공통 규칙을 뽑을 수 없었다**」).

### 기표한다 — 12건

**우선순위는 요구 화면 수로 매긴다.** 위에서부터 만들면 덮이는 화면이 빨리 는다.

| `DS-nn` | 요소 | 화면 수 | 어느 화면이 요구하나 | 근거 |
|---|---|---|---|---|
| `DS-02` | **Tabs** | **7** | `mentor-detail`(4탭) · `mypage-mentee`(9) · `mypage-mentor`(10) · `qna-feed` · `qna-detail` · `insight-list` · `mentoring-detail-*` | 기존. **가장 많이 쓰인다.** 카운트 배지를 함께 쓴다 |
| `DS-11` | **EmptyState** | **5** | `mentor-search` · `qna-feed` · `notification` · `mypage-mentee` · `mypage-mentor` | 「찾으시는 결과값의 멘토가 아직 없습니다」·「아직 질문이 없으시네요!」·「새 알림이 없습니다」 |
| `DS-01` | **Pagination** | **4** | `insight-list` · `notice-list` · `qna-feed` · `mypage-*` | 기존. 와이어에 「시작/중간/끝」 3형태가 있다 |
| `DS-18` | **MentoringCard** | **4** | `mypage-mentee` · `mypage-mentor` · `mentoring-detail-mentee` · `mentoring-detail-mentor` | 상태 배지 ＋ 제목 ＋ 상대 미니카드 ＋ 상태 문구 ＋ 액션 1~2개. **`MentorCard` 와 다르다** |
| `DS-10` | **Skeleton** | **3** | `mentor-search` · `qna-feed` · `article-detail` | 「로딩: 스켈레톤 UI」가 3화면의 주석에 있다 |
| `DS-12` | **Popover** | **3** | `mentor-detail` · `qna-detail` · `article-detail` | 「웹의 경우 popover → 링크 복사/공유하기」 |
| `DS-14` | **Stepper** | **3** | `signup` · `onboarding-survey` · `mentoring-apply` | 1.0 계통이 `Stepper / 1-2`·`2-2`·`3-3` 을 쓴다 |
| `DS-17` | **VerticalNav** | **3** | `mypage-mentee` · `mypage-mentor` · `insight-list` | 마이페이지 좌측 7~8항목 · 아티클 좌측 카테고리 4항목. 선택 시 초록 강조 |
| `DS-09` | **Toast** | **2** | `mentor-search` · `article-detail` | 「완료 토스트 노출 3초·해제 문구·실행취소」 ／ 와이어에 `Sonner` |
| `DS-13` | **Calendar** | **2** | `mentoring-detail-mentee` · `mentoring-detail-mentor` | 일정 확정·재조정. 와이어에 월 달력이 있다 |
| `DS-15` | **RichTextEditor** | **2** | `qna-compose` · `qna-detail`(답변) | 「텍스트 에디터, 0/1000자」. 와이어가 blocknote 를 링크한다 |
| `DS-16` | **Breadcrumb** | **2** | `qna-detail` · `article-detail` | 「Q&A 목록 ＜ 상세」·「멘트리 인사이트 ＜ 상세」 |

**＋ `DS-19` `Sidebar` 제거** — 요구 화면 0.

**위 4건(`Tabs`·`EmptyState`·`Pagination`·`MentoringCard`)만 만들어도 21화면 중 절반 이상이 덮인다.**

### 보류 후보 — 1화면만 요구한다

**기표하지 않는다.** 그 화면을 만들 때 판정한다.

| 요소 | 어느 화면 | 무엇 |
|---|---|---|
| **Slider** | `onboarding-survey` | 사진 트리밍의 확대·축소 |
| **Timeline** | `mentor-detail` | 「학력/커리어 히스토리」 — 회사 로고 ＋ 기간 ＋ 회사명 ＋ 직책 |
| **LinkCard** | `mentor-detail` | 「커리어 관련 활동」 — 썸네일 ＋ 출처(Youtube·brunch) ＋ 제목 |
| **QuoteBlock** | `mentor-detail` | 멘토의 인용문 블록 |
| **QaPairItem** | `mentor-detail` | 「멘토 N문N답」 — Q/A 쌍 그리드 |
| **목차(우측 앵커)** | `article-detail` | 「H2 자동 추출 · 현재 섹션 하이라이트」. **화면 고유의 조립**으로 본다 |

**`mentor-detail` 에서 5건이 나온다.** 이 화면이 제품 고유성이 가장 높다는 뜻이며, 상용 패턴 참조의 대상이 아니다.

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

| 순 | 무엇 | 상태 |
|---|---|---|
| 1 | 갭 12건 ＋ `Sidebar` 제거를 **`DS-nn` 으로 기표** | ✅ `DS-09`〜`DS-19` |
| 2 | `Sidebar` 의 정체를 가른다 | ✅ 위 「정정」 |
| 3 | `mentor-detail` 의 부품을 화면에서 추출 | ✅ 보류 후보 5건 |
| 4 | **화면 수 순으로 Claude Design 에서 만든다** | ⏸ `Tabs` → `EmptyState` → `Pagination` → `MentoringCard` |
| 5 | 아이콘 5계통을 HugeIcon 으로 모은다 | ⏸ 화면마다 |
| 6 | **1.0 계통 2덩어리를 다시 그릴지** | ⏸ **대기.** 아래 |

### 1.0 계통 — 지금 다시 그리지 않는다

**해당 화면을 작업할 시점에 정리한다.** 지금 손대면 쓰지도 않을 부품을 만들게 된다.

| 판정 조건 | 아크션 |
|---|---|
| 온보딩·멘토링 신청/확정을 착수한다 | **그때 shadcn 계통으로 정리한다.** `screen-inventory` 의 「착수 전 준비」에 **1.0 계통 판정**으로 적혀 있다 |
| 그 전에 부품을 만든다 | **만들지 않는다.** 1.0 계통의 `Stepper`·`Slider` 는 형태가 바뀔 수 있다 |

`DS-14`(`Stepper`)는 기표하되 **사양을 비워둔다.** 1.0 계통 판정이 끝난 뒤에 정한다.

### 사양은 어디서 따오나

**부품을 만들 때도 바퀴를 재발명하지 않는다.** `Tabs`·`Popover`·`Calendar`·`Breadcrumb` 는 상태 기계와 키보드 조작이 이미 표준화돼 있다.

참조원과 규칙의 정본은 [UX-PATTERNS.md](../UX-PATTERNS.md) 「참조원」이다.
