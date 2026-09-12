# BookmarkToggle

> **경계(CountToggle과)**
> BookmarkToggle = 미디어 오버레이의 아이콘 토글. 사진 위. 단독. 반전한다.
> CountToggle    = 메타 줄의 인라인 토글. 아이콘 + 숫자. 반전하지 않는다.
>
> 경계는 "카운트의 유무"가 아니라 "어디에 놓이는가"다.
> 한 번 합쳤다가 되돌렸다(09-11 → 09-12). 이 줄이 없으면 또 합치게 된다.

## 왜 다시 두나

경계를 "카운트의 유무"로 그었던 것이 틀렸다. CountToggle로 흡수한 뒤 MentorCard의 스크랩이:

- IconButton default 크기에서 인라인 아이콘 크기로 줄었다 — 사진 위 단독 액션인데 작다.
- 반전이 사라져 사진 위에서 ON/OFF가 안 보인다.

"목록에 20장 깔리면 반전이 40개 뜬다"는 근거는 Q&A 카드(카드당 토글 여러 개, 메타 줄)에만 맞는다.
멘토 카드는 카드당 토글이 1개이고 사진 위다 — 다른 자리, 다른 부품.

## 형태

- **IconButton default(md)**를 그대로 쓴다 — 같은 박스 크기(38px) · 아이콘 크기(18px) · radius(`--radius-md`).
- 미선택 = **outline**(`--card` 배경 + `--border` 아웃라인).
- 선택 = **반전**. 배경 `--sage-900` 채움 + 아이콘 `--sage-50`.
- HugeIcons 정적 CDN에 solid 북마크가 없어 stroke 1.6 라운드의 인라인 SVG로 outline↔fill을 토글한다.

## 상태

`default · hover(sage 틴트) · active(0.5px 눌림) · selected(반전) · focus-visible(--ring) · disabled`

## 제어형

`selected` + `onChange(next)` 제어형. 서버 저장 로직은 범위 밖.
**count를 받지 않는다** — 숫자가 붙는 자리는 CountToggle이다(도움돼요·Q&A 조회수 옆 등).

## 어디에 쓰나

사진/미디어 위 단독 스크랩 액션. MentorCard 우상단 오버레이.
메타 줄에 다른 요소(조회수·다른 토글)와 나란히 놓이는 자리는 CountToggle을 쓴다.

```jsx
<BookmarkToggle selected={saved} onChange={setSaved} />
```
