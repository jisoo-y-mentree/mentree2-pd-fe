**Icon** — HugeIcons 글리프를 `currentColor` 상속으로 재색칠해 렌더. mentree UI에 아이콘이 필요한 어디에나(HugeIcons가 유일 허용 세트).

```jsx
<Icon name="home-01" size={20} />
<Icon name="mentoring" style={{ color: "var(--primary)" }} />
```

이름은 HugeIcons 정적 파일명(확장자 없음): `home-01`, `search-01`, `settings-01`, `user-group`, `mentoring`, `graduation-scroll`, `calendar-03`, `message-01`, `notification-01`. 크기 기본 20px; `color` 미지정 시 텍스트 색을 따른다.
