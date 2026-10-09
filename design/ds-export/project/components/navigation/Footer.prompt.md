**Footer** — mentree 사이트 푸터. 헤더와 **동일한 IA**(`nav-ia.js`, SSoT)를 공유한다.

```jsx
<Footer onNavigate={(item) => go(item)} />
// 서비스(NAV_PRIMARY) · 고객지원(NAV_UTILITY) · 회원(NAV_AUTH) 3개 컬럼 + 카피라이트
```

- 링크는 헤더와 같은 소스를 참조하므로 `nav-ia.js`만 고치면 둘 다 반영된다.
- 링크 글자는 `--text-caption` 14 — 헤더 메뉴(`body` 16/600)와 다르다. 푸터는 훑는 자리다.
- **로고**: mentree 워드마크를 **좌측 정렬**(슬로건 좌측선에 맞춤), 색은 **sage-500**으로 톤 다운(푸터는 조용한 영역 — 헤더 로고는 풀컬러 그린 유지).
- **기업 서비스(Biz)** 는 외부 출구 링크 — Biz 파랑(`--biz-*`)으로 격리, 외부 화살표 표시.
- 카피라이트 기본값은 `© 2026 mentree. All rights reserved.`
