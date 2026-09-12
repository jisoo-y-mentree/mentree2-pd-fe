# 컴포넌트 커버리지

> 이 문서가 답하는 것: **와이어가 요구하는 요소를 디자인 시스템이 덮는가.**
> 고아 분석의 **입력**이다. 갭의 확정과 `DS-nn` 기표는 여기서 하지 않는다([DS-update-list.md](../DS-update-list.md)).

- 상태: 기안
- 기안일: 2026-09-02
- 실측 대상: Figma 「Mentree 2.0 (Claude)」 **13섹션**(2026-09-02 시점) ／ `design/ds-export/project/components/` **30본**
- **섹션의 목록과 id 는 [screen-inventory](screen-inventory.md) 「스캔의 범위」가 정본이다.** 여기에 복제하지 않는다. **09-10 에 14섹션이 됐으나 늘어난 것은 화면이 아니라 진척 보드다** — 실측을 다시 하지 않았다

## 읽는 방법

**와이어의 요소명과 디자인 시스템의 컴포넌트명은 다르다.** 와이어는 shadcn 프리미티브와 1.0 부품으로 그려졌고, 디자인 시스템은 그 위에 새로 세웠다.

| 판정 조건 | 아크션 |
|---|---|
| 와이어의 요소명을 코드에 쓰고 싶다 | **쓰지 않는다.** 이름의 정본은 [용어집](../../docs/glossary/ubiquitous-language.md)이다 |
| 와이어에 있는데 여기 표에 없다 | **아이콘·자리표시자다.** 아래 「세지 않은 것」 참조 |
| 갭을 발견했다 | **여기에 후보로 적는다.** `DS-nn` 기표는 고아 분석에서 한다 |

## 발견 — 와이어는 두 계통으로 그려져 있다

### 세는 방법

**instance 노드의 이름으로 판정한다.** 재현할 수 있게 기준을 적는다.

| 판정 조건 | 아크션 |
|---|---|
| 이름이 `Button / …` · `Input_box…` · `Input/…` · `Stepper /…` · `Slider /…` · `Number /…` · `Toggle Button /…` · `Header / Normal…` · `close_24px` · `visibility_24px` · `24 / …` 다 | **1.0 계통**으로 센다 |
| `IconPlaceholder` · `KbdGroup` · `Aspect Ratio` · `Flex` · `Container` 다 | **세지 않는다.** shadcn 의 자리표시자·레이아웃 프리미티브이며 계통을 나타내지 않는다 |
| 그 밖 | shadcn 계통으로 센다 |

**자리표시자를 세면 판정이 뒤집힌다.** 온보딩은 자리표시자를 포함하면 shadcn 우세로 나오지만, `IconPlaceholder` 82 ＋ `KbdGroup` 41 이 그 대부분이다.

### 실측 (2026-09-02 · 13섹션)

| 섹션 | 1.0 | 그 밖 | 판정 |
|---|---|---|---|
| **멘토 상세**(`1078:80583`) | **108** | 0 | **1.0 100%** |
| **멘토링 신청 / 확정 Flow** | **130** | 23 | **1.0 84%** |
| **온보딩(로그인/가입/설문)** | **40** | 38 | **1.0 51%** — 경계다 |
| 알림 | 18 | 153 | shadcn 90% |
| 아티클/공지사항/뉴스 | 2 | 136 | shadcn 99% |
| D-Q&A · TOP · 멘토찾기 · 마이페이지 · 국가·직무 | 0~11 | 75~1,108 | shadcn 99~100% |
| C-멘토 상세 · 기획 문서 · 천이도 | — | — | **instance 0** |

**1.0 계통은 3덩어리다.** 새로 설계한 것이 아니라 1.0 화면을 가져온 것이며, **사양 주석이 0인 이유가 이것이다** — 이미 돌고 있는 화면이라 규칙을 다시 적지 않았다.

| 판정 조건 | 아크션 |
|---|---|
| 1.0 계통 화면의 UI-SPEC 을 쓴다 | **와이어를 사양으로 읽지 않는다.** 1.0 의 실동작을 확인해야 §7·§8 이 채워진다 |
| 1.0 계통 화면의 부품을 세운다 | **shadcn 계통으로 다시 그린다.** 두 계통을 그대로 두면 부품이 두 벌이 된다 |
| 비율이 얼마든 | **같다.** 온보딩의 51% 도 멘토 상세의 100% 도 다시 그린다(아래 「1.0 계통 — 구성만 답습한다」) |

### `mentor-detail` 은 섹션이 둘이다

| 섹션 | instance | 무엇 |
|---|---|---|
| `1059:30815` **C-멘토 상세** | **0** | 프레임과 텍스트로만 그려져 있다. **화면을 눈으로 보고 부품을 뽑았다**(2026-09-02) |
| `1078:80583` **멘토 상세** | **108** | **2026-09-02 에 발견.** 4탭 재작도 ＋ **「본인 프로필일 경우」** ＋ 편집 모달 |

**초판이 「인스턴스가 0개다」라고 단정한 것은 앞의 섹션에서만 맞다.** 뒤의 섹션은 첫 스캔(09-01) 시점에 없었다.

### 정정 — 「사이드바」는 두 가지다

**초판이 둘을 뭉뚱그렸다.** 실측해서 가른다.

| | 무엇 | 판정 |
|---|---|---|
| **`ds-export` 의 `Sidebar`** | **앱 네비게이션 레일**(대시보드 셸). `readme.md` 가 「**참조·레거시. canon 으로 쓰지 마세요**」라고 명시한다 | **제거한다**(`DS-19`). 어느 화면도 쓰지 않는다 |
| **와이어의 「사이드바」** | 페이지 안의 **세로 내비** — 마이페이지 좌측(7~8항목) · 아티클 좌측 카테고리(4항목) | **별개다.** `VerticalNav` 로 신설한다(`DS-17`) |

`qna-feed` 의 **우측 위젯 영역**(질문하기 CTA · 나의 Q&A 미니 목록)은 또 다른 것이다. **부품이 아니라 화면 조립**으로 본다. 2화면째에 같은 구조가 나오면 승격시킨다(헌장 원칙 7).

## 커버리지 — 요소별

**있음** ＝ `ds-export/project/components/` 에 실물이 있다. **없음** ＝ 갭 후보다.

| 요소 | 어느 화면이 요구하나 | `ds-export` | 비고 |
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

## 갭 후보 — `ds-export` 에 없다

**기표하는 것과 보류하는 것을 가른다.**

| 판정 조건 | 아크션 |
|---|---|
| **2화면 이상**이 요구한다 | **`DS-nn` 으로 기표한다.** 아래 표 |
| **1화면**만 요구한다 | **기표하지 않는다.** 아래 「보류 후보」. 2화면째에 승격시킨다(헌장 원칙 7) |
| **1화면이지만 그 화면의 본체다** | **기표한다.** 보류하면 그 화면을 못 만든다. 예: `AnswerCard` 가 없으면 `qna-detail` 이 빈다 |

**목록은 지금 확정하고, 사양은 화면에서 나온다.** 실사용 없이 사양을 정하면 안 맞는다 — 재개 팩이 이미 겪었다(「`CtaSection` 컴포넌트화 보류. **샘플이 1개뿐이라 공통 규칙을 뽑을 수 없었다**」).

### 기표한다 — 16건

**우선순위는 요구 화면 수로 매긴다.** 위에서부터 만들면 덮이는 화면이 빨리 는다.

**`*` 글롭을 펼쳐서 센다** — `mypage-*` 는 2다. 접어서 세면 순위가 뒤집힌다.

**모달은 부모 화면으로 센다.** `MentoringDetailModal` 이 요구하는 것은 `mypage-mentee`·`mypage-mentor` 의 요구다. 따로 세면 2중 계상이 된다.

| `DS-nn` | 요소 | 화면 수 | 어느 화면이 요구하나 | 근거 |
|---|---|---|---|---|
| `DS-02` | **Tabs** | **6** | `mentor-detail`(4탭) · `mypage-mentee`(9) · `mypage-mentor`(10) · `qna-feed` · `qna-detail` · `insight-list` | 기존. **가장 많이 쓰인다.** 카운트 배지를 함께 쓴다 |
| `DS-11` | **EmptyState** | **5** | `mentor-search` · `qna-feed` · `notification` · `mypage-mentee` · `mypage-mentor` | 「찾으시는 결과값의 멘토가 아직 없습니다」·「아직 질문이 없으시네요!」·「새 알림이 없습니다」 |
| `DS-01` | **Pagination** | **5** | `insight-list` · `notice-list` · `qna-feed` · `mypage-mentee` · `mypage-mentor` | 기존. 와이어에 「시작/중간/끝」 3형태가 있다 |
| `DS-18` | **MentoringCard** | **2** | `mypage-mentee` · `mypage-mentor` | 상태 배지 ＋ 제목 ＋ 상대 미니카드 ＋ 상태 문구 ＋ 액션 1~2개. **`MentorCard` 와 다르다** |
| `DS-10` | **Skeleton** | **3** | `mentor-search` · `qna-feed` · `article-detail` | 「로딩: 스켈레톤 UI」가 3화면의 주석에 있다 |
| `DS-12` | **Popover** | **3** | `mentor-detail` · `qna-detail` · `article-detail` | 「웹의 경우 popover → 링크 복사/공유하기」 |
| `DS-14` | **Stepper** | **3** | `signup` · `onboarding-survey` · `mentoring-apply` | 1.0 계통이 `Stepper / 1-2`·`2-2`·`3-3` 을 쓴다 |
| `DS-17` | **VerticalNav** | **3** | `mypage-mentee` · `mypage-mentor` · `insight-list` | 마이페이지 좌측 7~8항목 · 아티클 좌측 카테고리 4항목. 선택 시 초록 강조 |
| `DS-09` | **Toast** | **2** | `mentor-search` · `article-detail` | 「완료 토스트 노출 3초·해제 문구·실행취소」 ／ 와이어에 `Sonner` |
| `DS-13` | **Calendar** | **2** | `mypage-mentee` · `mypage-mentor` | 일정 확정·재조정. 와이어에 월 달력이 있다. **`MentoringDetailModal` 안에서 쓴다** |
| `DS-15` | **RichTextEditor** | **2** | `qna-compose` · `qna-detail`(답변) | 「텍스트 에디터, 0/1000자」. 와이어가 blocknote 를 링크한다 |
| `DS-16` | **Breadcrumb** | **2** | `qna-detail` · `article-detail` | 「Q&A 목록 ＜ 상세」·「멘트리 인사이트 ＜ 상세」 |
| **`DS-20`** | **Chip** | **4** | `qna-feed` · `qna-detail` · `top` · `mentor-search` | 「해시태그(노출 개수 5개 ＋ 오버플로)」 ／ 필터 모달의 「걸린 조건 해제」. **눌리지만 켜지지 않는다** |
| **`DS-21`** | **CountToggle** | **3** | `qna-feed` · `qna-detail` · `top` | 「**도움돼요·스크랩은 표시이자 액션 버튼**」. `BookmarkToggle` 은 카운트를 못 받는다 |
| **`DS-22`** | **카드 4종의 루트 요소** | **4컴포넌트** | `QnaCard` · `MentorCard` · `InterviewCard` · `ArticlePreview` | 루트가 `<a>` 라 안에 버튼·링크를 못 넣는다. **`DS-21` 이 들어가는 순간 깨진다** |
| **`DS-23`** | **AnswerCard** | **1** | `qna-detail` | 「답변 카드 — 멘토 정보 강조 … **전환이 일어나는 핵심 루트**」. **1화면이나 그 화면의 본체다** — 보류 후보로 두면 화면을 못 만든다 |

**＋ `DS-19` `Sidebar` 제거** — 요구 화면 0.

> **`DS-20`〜`DS-23` 은 09-02 스캔이 놓친 것이다.** 주석에 「해시태그」·「액션 버튼」이 적혀 있었으나 **요소가 아니라 거동으로 적혀 있어** 요소 표에 안 걸렸다. `QnaCard`·`AnswerCard` 를 실제로 조립해보고 나왔다(2026-09-11).
>
> | 판정 조건 | 아크션 |
> |---|---|
> | 주석이 요소가 아니라 **거동**으로 적혀 있다 | **부품이 있는지 따로 확인한다.** 「눌린다」·「액션 버튼」·「해제 가능」은 요소명이 없어도 부품을 요구한다 |

**위 4건(`Tabs`·`EmptyState`·`Pagination`·`Chip`)만 만들어도 19화면 중 10화면이 덮인다.**

합집합을 펼치면 — `mentor-detail` · `mypage-mentee` · `mypage-mentor` · `qna-feed` · `qna-detail` · `insight-list` · `mentor-search` · `notification` · `notice-list` · `top` **＝ 10/19.**

**5번째는 3화면짜리가 5건 동률이다** — `CountToggle`·`Skeleton`·`Popover`·`Stepper`·`VerticalNav`.

| 판정 조건 | 아크션 |
|---|---|
| 화면 수가 갈린다 | **많은 것부터 만든다** |
| **화면 수가 동률이다** | **지금 착수 중인 화면이 요구하는 것**을 고른다 |
| **착수 중인 화면이 막혔다** | **화면 수를 무시하고 그것부터 만든다.** 순위는 기본값이지 잠금이 아니다 |

**09-11 에 세 번째 행이 적용됐다** — Q&A 화면이 먼저 들어가서 `Chip`·`CountToggle`·`QnaCard`·`DS-22` 를 먼저 만든다.

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
| **`FilterChip` 의 trailing 슬롯** | `mentor-search` | 모달을 여는 필터 칩(「정규직 **외 2** ▾」)과 그 값 표시. **`mentor-search` 착수 때 정한다** — 값이 걸렸을 때의 시각과 「외 N」 규칙이 그 와이어에서 나온다 |

**`mentor-detail` 에서 4건이 나온다.** 전부 **열람 면**의 부품이다. 이 면은 제품 고유성이 높아 상용 패턴 참조의 대상이 아니다.

**반대로 같은 화면의 편집 면(「본인 프로필」)은 1.0 계통 100% 다.** 한 화면 안에서 열람은 고유, 편집은 1.0 이므로 **면을 갈라서 다뤄야 한다.**

## 아이콘 — 6계통이 섞여 있다

디자인 시스템은 **HugeIcons 모노**로 정해져 있다. 와이어는 그렇지 않다.

| 계통 | 어디에 |
|---|---|
| **HugeIcon** | shadcn 계통 전부. **정본이다** |
| `24 / basic / …` | **1.0 계통 3덩어리**(온보딩 · 멘토링 신청/확정 · 멘토 상세) |
| Lucide | `qna-feed` · `insight-list` |
| Phosphor | `qna-feed` · `insight-list` |
| Remix | `insight-list` |
| Tabler | `insight-list` |

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
| `Pro Blocks / *` · `Blog post card` | shadcn 의 조합 블록이다. `ds-export` 의 카드류가 대응한다 |

## 다음 — 고아 분석에서 할 것

| 순 | 무엇 | 상태 |
|---|---|---|
| 1 | 갭을 **`DS-nn` 으로 기표** | ✅ `DS-09`〜`DS-19` ／ **09-11 에 `DS-20`〜`DS-23` 추가** |
| 2 | `Sidebar` 의 정체를 가른다 | ✅ 위 「정정」 |
| 3 | `mentor-detail` 의 부품을 화면에서 추출 | ✅ 보류 후보 5건 |
| 4 | **Claude Design 에서 만든다** | 🔄 **화면 수 순이 기본이나 착수 중인 화면이 이긴다.** 아래 |
| 5 | 아이콘 **6계통**을 HugeIcon 으로 모은다 | ⏸ 화면마다 |
| 6 | **1.0 계통 3덩어리를 다시 그릴지** | ✅ **결착.** 아래 |

### 1.0 계통 — 구성만 답습한다

**2026-09-10 에 결착됐다.** 화면마다 판정하지 않는다.

> **와이어의 1.0 컴포넌트는 구성의 지시이지 UI 의 지시가 아니다.** 정보의 배치와 순서만 따르고, 요소는 전부 `ds-export` 의 것으로 다시 그린다.

대상은 **3덩어리**다 — 온보딩(1.0 51%) · 멘토링 신청/확정(84%) · **멘토 상세**(100%).

| 판정 조건 | 아크션 |
|---|---|
| 와이어가 1.0 컴포넌트로 그려져 있다 | **`ds-export` 의 것으로 바꿔 그린다.** 형태를 그대로 옮기지 않는다 |
| 요소의 수와 종류까지 다르다 | **구성의 차이다.** 위 규칙으로 안 풀린다 — 디자이너에게 낸다(예: `mentor-detail` 의 헤더) |

`DS-14`(`Stepper`)의 「판정:」을 지웠다. 쓰이는 곳이 `signup`(3스텝) · `onboarding-survey`(3스텝) · `mentoring-apply`(2스텝)로 확정됐으므로 **착수 대상이 됐다.**

**「판정:」이 붙은 4행은 착수 대상이 아니다** — `DS-05`·`DS-06`·`DS-08`·`DS-15`. **`DS-12` 는 2026-09-12 에 풀렸다** — `Popover` 의 범위에서 `Badge` 의 「+N 펼침」을 빼면서 `DS-06` 의 잘림 판정에 안 걸리게 됐다. 무엇을 기다리는지가 그 칸에 적혀 있다([DS-update-list](../DS-update-list.md) 「사양이 미정인 행은 착수 대상이 아니다」). 위 3건에는 하나도 걸리지 않는다.

### 사양은 어디서 따오나

**부품을 만들 때도 바퀴를 재발명하지 않는다.** `Tabs`·`Popover`·`Calendar`·`Breadcrumb` 는 상태 기계와 키보드 조작이 이미 표준화돼 있다.

참조원과 규칙의 정본은 [UX-PATTERNS.md](../UX-PATTERNS.md) 「참조원」이다.
