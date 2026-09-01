/* ============================================================================
   mentree — nav-ia.js
   네비게이션 정보구조(IA)의 단일 소스(SSoT).
   상단 헤더(Header)와 푸터(Footer)가 이 파일 하나를 공통으로 참조한다.
   ⚠ 링크/라벨을 바꿀 때는 여기만 고친다 — 헤더·푸터가 함께 반영된다.
   ========================================================================== */

/* 최상위 네비게이션 (헤더/푸터 공통).
   ※ '기업 서비스(Biz)'는 mentree 본체가 아니라 외부 사이트로 나가는 출구 링크다.
     external:true 로 표시하고 Biz 서브브랜드(파랑, --biz-*)로 격리해 렌더한다. */
export const NAV_PRIMARY = [
  { key: "mentors",  label: "멘토 찾기",       href: "/mentors" },
  { key: "qna",      label: "Q&A 멘토링",      href: "/qna" },
  { key: "insights", label: "멘트리 인사이트", href: "/insights" },
  { key: "biz",      label: "기업 서비스",     href: "https://biz.mentree.co.kr", external: true, brand: "biz" },
];

/* 인증 (헤더는 버튼, 푸터는 링크로 렌더). */
export const NAV_AUTH = [
  { key: "signup", label: "회원가입", href: "/signup", variant: "primary" },
  { key: "login",  label: "로그인",   href: "/login",  variant: "ghost" },
];

/* 부가 (공지/뉴스). */
export const NAV_UTILITY = [
  { key: "notices", label: "공지사항", href: "/notices" },
  { key: "news",    label: "뉴스",     href: "/news" },
];

/* 하위 상세 페이지 — 네비게이션에는 노출하지 않는다(딥링크/내부 이동 대상).
   멘토 상세 · Q&A 상세 · 아티클 상세 · 이벤트 상세 · 나의 성향 분석 */
export const NAV_DETAIL = [
  { key: "mentor-detail",  label: "멘토 상세",     parent: "mentors" },
  { key: "qna-detail",     label: "Q&A 상세",      parent: "qna" },
  { key: "article-detail", label: "아티클 상세",   parent: "insights" },
  { key: "event-detail",   label: "이벤트 상세",   parent: "insights" },
  { key: "aptitude",       label: "나의 성향 분석", parent: "mentors" },
];
