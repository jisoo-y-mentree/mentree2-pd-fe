/**
 * taxonomy.js — 국가·직무·테마 태그의 단일 소스(SSoT).
 *  화면이 값을 지어내지 않는다. 바꿀 때는 여기만 고친다. nav-ia.js와 같은 성격이다.
 *  Figma 「국가, 직무 & 태그 정리」(node 1059:35100, 2026-09-15)를 그대로 옮긴 것이다.
 *  value는 한국어 라벨 그대로다 — 백엔드 코드값이 아직 없다. 지금 영어 식별자를 지어내면
 *  나중에 두 벌이 된다. 코드값이 정해지면 그때 매핑을 붙인다.
 *  국가만 flag 필드에 국기 파일명(영문, assets/flags/<flag>.svg)을 따로 둔다 — 이미 있는 값이다.
 *
 * [구조] FilterSelect가 바로 먹는 모양이다 — groups = [{ label, options: [{ value, label, flag }] }].
 *  첫 그룹의 label은 빈 문자열이다. FilterSelect는 g.label이 있을 때만 제목을 그리므로
 *  제목 없이 칩만 선다.
 * [표기] 「호주」 — 「오스트레일리아」를 쓰지 않는다(칩에 들어가는 길이로 고른 것이다).
 *  직무 대분류는 「그 외」가 아니라 「기타」다 — 홈 표시(JOB_TOP)와 말이 하나로 모인다.
 *  테마 태그 대분류 「학업/재정/그 외」는 대분류 이름이라 그대로다. 그 안의 태그 「기타」와는 다른 층이다.
 * [범위] 이 파일은 데이터만 둔다. 부품이 이것을 import하지 않는다 —
 *  FilterSelect는 groups를 받는 구조 그대로, MentorCard는 country/countryLabel prop 그대로,
 *  Badge는 flag prop 그대로다. 화면이 참조하게 하는 것은 화면 라운드의 일이다.
 */

// 국가 — 15개국 / 대분류 4. 앞의 4개국은 대분류 없이 단독으로 선다.
export const COUNTRY_GROUPS = [
  { label: "", options: [
    { value: "일본",      label: "일본",      flag: "japan" },
    { value: "미국",      label: "미국",      flag: "united-states" },
    { value: "대한민국",  label: "대한민국",  flag: "south-korea" },
    { value: "싱가포르",  label: "싱가포르",  flag: "singapore" },
  ] },
  { label: "유럽", options: [
    { value: "네덜란드",  label: "네덜란드",  flag: "netherlands" },
    { value: "독일",      label: "독일",      flag: "germany" },
    { value: "스페인",    label: "스페인",    flag: "spain" },
    { value: "영국",      label: "영국",      flag: "united-kingdom" },
    { value: "이탈리아",  label: "이탈리아",  flag: "italy" },
  ] },
  { label: "아시아/중동", options: [
    { value: "말레이시아", label: "말레이시아", flag: "malaysia" },
    { value: "중국",      label: "중국",      flag: "china" },
    { value: "홍콩",      label: "홍콩",      flag: "hong-kong" },
    { value: "UAE",       label: "UAE",       flag: "uae" },
  ] },
  { label: "북미/오세아니아", options: [
    { value: "캐나다",    label: "캐나다",    flag: "canada" },
    { value: "호주",      label: "호주",      flag: "australia" },
  ] },
];

// 직무 — 12개 / 대분류 2. 앞의 8개는 단독, 나머지 4개는 「기타」 아래.
export const JOB_GROUPS = [
  { label: "", options: [
    { value: "개발", label: "개발" },
    { value: "디자인", label: "디자인" },
    { value: "마케팅/광고", label: "마케팅/광고" },
    { value: "영업/컨설팅", label: "영업/컨설팅" },
    { value: "금융", label: "금융" },
    { value: "HR", label: "HR" },
    { value: "교육", label: "교육" },
    { value: "엔지니어링/제조", label: "엔지니어링/제조" },
  ] },
  { label: "기타", options: [
    { value: "고객서비스/리테일", label: "고객서비스/리테일" },
    { value: "공공복지", label: "공공복지" },
    { value: "법률", label: "법률" },
    { value: "학생", label: "학생" },
  ] },
];

// 테마 태그(키워드) — 25개 / 대분류 4.
export const KEYWORD_GROUPS = [
  { label: "취업준비", options: [
    { value: "취업 전략", label: "취업 전략" },
    { value: "이력서·지원서류", label: "이력서·지원서류" },
    { value: "면접 준비", label: "면접 준비" },
    { value: "출국 준비", label: "출국 준비" },
  ] },
  { label: "커리어", options: [
    { value: "승진", label: "승진" },
    { value: "매니징", label: "매니징" },
    { value: "연봉 협상", label: "연봉 협상" },
    { value: "네트워킹", label: "네트워킹" },
    { value: "커뮤니케이션", label: "커뮤니케이션" },
    { value: "자기 개발", label: "자기 개발" },
    { value: "커리어 전환", label: "커리어 전환" },
    { value: "이직하기", label: "이직하기" },
    { value: "한국 리턴", label: "한국 리턴" },
    { value: "창업", label: "창업" },
    { value: "프리랜서·부업", label: "프리랜서·부업" },
  ] },
  { label: "현지 생활", options: [
    { value: "정착 생활", label: "정착 생활" },
    { value: "비자·영주권", label: "비자·영주권" },
    { value: "워라밸·근무 방식", label: "워라밸·근무 방식" },
    { value: "여성 커리어", label: "여성 커리어" },
    { value: "번아웃", label: "번아웃" },
    { value: "취미 생활", label: "취미 생활" },
    { value: "육아와 일 병행", label: "육아와 일 병행" },
  ] },
  { label: "학업/재정/그 외", options: [
    { value: "대학/대학원 진학", label: "대학/대학원 진학" },
    { value: "재테크", label: "재테크" },
    { value: "기타", label: "기타" },
  ] },
];

// 홈 표시 — 국가 7개. 개별 국가만 국기가 붙고 묶음 대분류(유럽·아시아/중동·북미/오세아니아)에는 아이콘이 없다.
export const COUNTRY_TOP = [
  { value: "일본", label: "일본", flag: "japan" },
  { value: "미국", label: "미국", flag: "united-states" },
  { value: "대한민국", label: "대한민국", flag: "south-korea" },
  { value: "싱가포르", label: "싱가포르", flag: "singapore" },
  { value: "아시아/중동", label: "아시아/중동" },
  { value: "북미/오세아니아", label: "북미/오세아니아" },
  { value: "유럽", label: "유럽" },
];

// 홈 표시 — 직무 9개.
export const JOB_TOP = [
  { value: "개발", label: "개발" },
  { value: "디자인", label: "디자인" },
  { value: "마케팅/광고", label: "마케팅/광고" },
  { value: "영업/컨설팅", label: "영업/컨설팅" },
  { value: "금융", label: "금융" },
  { value: "HR", label: "HR" },
  { value: "교육", label: "교육" },
  { value: "엔지니어링/제조", label: "엔지니어링/제조" },
  { value: "기타", label: "기타" },
];
