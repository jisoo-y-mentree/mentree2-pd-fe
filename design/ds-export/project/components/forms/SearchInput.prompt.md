# SearchInput

자동완성과 최근 검색어가 붙는 검색창. `TagInput`(DS-26)과 같은 구조다 — 한 자리를 갈아끼운다.
다른 점 하나: 제안 줄이 상자 안이 아니라 **바깥에 뜬다.** 검색 결과가 아래 목록을 덮어도 되고,
상자가 커지면 아래 목록이 밀린다.

## 한 자리를 갈아끼운다
| 판정 조건 | 무엇을 낸다 |
|---|---|
| 포커스가 있고 입력이 비어 있다 | 최근 검색어 — 라벨 "최근 검색어" + `Chip md` + `onRemove` |
| 입력 중이다 | 자동완성 목록 |
| 자동완성이 0건이다 | 드롭다운을 닫는다. "결과 없음"을 띄우지 않는다 — 아래 목록이 이미 답한다 |
| 최근 검색어가 0건이고 입력이 비었다 | 드롭다운을 안 연다 |
| 포커스가 나갔다 | 닫는다 |

둘을 쌓지 않는다 — 쌓으면 드롭다운이 아래 목록을 다 덮는다.

## 자동완성 항목
한 줄에 하나. 높이 36·좌우 padding 12·`--text-body`. 일치한 부분을 `--primary`로 칠하고 600을 준다.
나머지는 `--foreground`. hover·하이라이트: 면 `--muted`. 아이콘·부가 설명을 붙이지 않는다 —
대상이 5종(직무·회사·키워드·이름·국가)인데 종류 배지를 달면 줄이 시끄러워진다. 종류는 바깥이 정렬로 표현한다.

## 최근 검색어
`Chip md` + `onRemove`로 세운다. 가로로 감싼다. 라벨 "최근 검색어"는 `--text-caption`·`--muted-foreground`.
저장을 부품이 하지 않는다 — 받은 배열을 그리고 `onRemoveRecent`를 부른다. 로컬 저장은 화면의 일이다.

## 키보드
| 판정 조건 | 액션 |
|---|---|
| 조합 중이다 | 아무 키도 가로채지 않는다 — `e.nativeEvent.isComposing`이면 즉시 반환 |
| ↑ ↓ | 자동완성 항목을 훑는다 |
| Enter | 하이라이트가 있으면 그것을, 없으면 친 글자 그대로 검색한다. `preventDefault`로 폼 제출을 막는다 |
| ESC(드롭다운 열림) | 드롭다운을 닫는다. 입력 내용은 남긴다 |
| ESC(드롭다운 닫힘) | 입력을 비운다 |

## 상태
`default · focus · disabled · invalid`. 상자는 `Input`의 값을 그대로 쓴다 — `--input`·`--ring`·
`--destructive`·`--radius-md`. 새 값을 만들지 않는다. leading은 `Icon name="search-01" size={18}`·
`--muted-foreground`. 입력이 있으면 trailing에 ✕(`IconButton ghost sm`) — 누르면 입력을 비우고 포커스를 남긴다.

## 접근성
`role="combobox"` + `aria-expanded` + `aria-controls` + `aria-autocomplete="list"`. 드롭다운은
`role="listbox"`, 항목은 `role="option"` + `aria-selected`. 하이라이트된 항목을 `aria-activedescendant`로
가리킨다. 최근 검색어 ✕의 접근명은 "<검색어> 삭제"(`Chip`의 `removeAriaLabel`).

## 어디에 쓰나
`mentor-search`의 조건 줄 오른쪽. `top`에도 상정한다.

```jsx
<SearchInput value={q} onChange={setQ} onSearch={runSearch} completions={matched} recent={recentList} onRemoveRecent={dropRecent} />
```

## 만들지 않는 것
- "검색" 버튼 — Enter로 끝난다.
- 종류 배지(직무/회사/…) — 줄이 시끄러워진다.
- 음성 입력 — 브라우저 기본이다.
- 최근 검색어의 저장·개수 제한 — 화면의 일이다.
