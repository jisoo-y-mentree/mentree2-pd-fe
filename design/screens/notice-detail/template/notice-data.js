// 공지사항 샘플 데이터 — 목록 14건(고정 2 + 일반 12) · 상세 2편. 화면 부품이 import() 로 읽는다.
export const PINNED = [
  { id: "privacy-2026-09", title: "개인정보 처리방침 개정 안내", date: "2026.09.01",
    excerpt: "2026년 9월 15일부터 개인정보 처리방침이 개정됩니다. 수집 항목과 보유 기간, 위탁 업체 목록이 달라지니 시행 전에 한 번 확인해 주세요.",
    image: "../../notice-list/template/assets/thumb-sage.svg", pinned: true, href: "notice-detail-normal.dc.html" },
  { id: "maint-2026-09", title: "9월 시스템 점검 안내 — 9월 20일(토) 02:00~05:00", date: "2026.09.10",
    excerpt: "서버 안정화를 위해 9월 20일 새벽 2시부터 5시까지 서비스가 일시 중단됩니다. 점검 중에는 로그인과 결제, Q&A 답변 등록이 되지 않습니다.",
    image: null, pinned: true, href: "notice-detail-normal.dc.html" },
];

export const NOTICES = [
  { id: "jiran-japan", title: "멘트리, 지란재팬과 함께 일본 진출 지원을 한 단계 더 강화합니다", date: "2026.09.12",
    excerpt: "멘트리가 지란재팬과 업무 협약을 맺었습니다. 일본 취업을 준비하는 멘티에게 현지 채용 정보와 비자 상담을 함께 제공합니다.",
    image: "../../notice-list/template/assets/thumb-green.svg", href: "notice-detail-banner.dc.html" },
  { id: "chuseok-support", title: "추석 연휴 고객지원 운영 안내", date: "2026.09.08",
    excerpt: "추석 연휴 기간(9월 24일~27일)에는 고객지원 답변이 쉽니다. 연휴 중 접수된 문의는 9월 28일부터 순서대로 답변드립니다.",
    image: null, href: "notice-detail-normal.dc.html" },
  { id: "intl-card", title: "멘토링 결제 수단에 해외 카드가 추가됐습니다", date: "2026.09.03",
    excerpt: "이제 Visa·Mastercard·JCB 해외 발급 카드로도 멘토링을 결제할 수 있습니다. 결제 통화는 원화 기준이며 환율은 카드사 정산 시점에 적용됩니다.",
    image: "../../notice-list/template/assets/thumb-sage.svg", href: "notice-detail-normal.dc.html" },
  { id: "jump-partnership", title: "멘트리가 사단법인 JUMP와 함께 미래세대의 글로벌 성장을 응원합니다", date: "2026.08.28",
    excerpt: "사단법인 JUMP의 청소년 교육 프로그램에 멘트리 멘토 30명이 참여합니다. 참여 멘토에게는 활동 인증과 정산 우대가 제공됩니다.",
    image: "../../notice-list/template/assets/thumb-green.svg", href: "notice-detail-normal.dc.html" },
  { id: "qna-mail-delay", title: "Q&A 멘토링 답변 알림 메일 발송 지연 안내", date: "2026.08.21",
    excerpt: "8월 20일 오후 3시부터 약 4시간 동안 답변 알림 메일이 늦게 발송되었습니다. 현재는 정상화되었으며, 지연된 메일은 모두 발송을 마쳤습니다.",
    image: null, href: "notice-detail-normal.dc.html" },
  { id: "terms-2026-08", title: "이용약관 개정 안내(2026년 8월)", date: "2026.08.14",
    excerpt: "멘토링 환불 기준과 분쟁 조정 절차를 명확히 하는 방향으로 이용약관을 개정합니다. 개정 약관은 2026년 9월 1일부터 적용됩니다.",
    image: null, href: "notice-detail-normal.dc.html" },
  { id: "settlement-schedule", title: "멘토 정산 일정 변경 안내", date: "2026.08.07",
    excerpt: "9월부터 멘토 정산일이 매월 10일에서 매월 5일로 앞당겨집니다. 8월 활동분은 9월 5일에 첫 적용됩니다.",
    image: "../../notice-list/template/assets/thumb-sage.svg", href: "notice-detail-normal.dc.html" },
  { id: "mentree-2-open", title: "멘트리 2.0 오픈 안내", date: "2026.07.30",
    excerpt: "새로워진 멘트리 2.0을 열었습니다. 멘토 찾기 필터와 Q&A 멘토링이 개편되었고, 멘트리 인사이트 아티클을 새로 만나볼 수 있습니다.",
    image: "../../notice-list/template/assets/thumb-green.svg", href: "notice-detail-normal.dc.html" },
  { id: "summer-support", title: "여름 휴가철 고객지원 운영 안내", date: "2026.07.22",
    excerpt: "7월 28일부터 8월 1일까지 고객지원 운영 시간이 오전 10시~오후 4시로 줄어듭니다. 긴급 결제 문의는 앱 내 채팅으로 접수해 주세요.",
    image: null, href: "notice-detail-normal.dc.html" },
  { id: "app-login-fix", title: "앱 로그인 오류 조치 완료 안내", date: "2026.07.15",
    excerpt: "iOS 앱에서 소셜 로그인 후 첫 화면이 비어 보이던 문제를 수정했습니다. 앱을 최신 버전(2.0.3)으로 업데이트하면 해결됩니다.",
    image: null, href: "notice-detail-normal.dc.html" },
  { id: "pw-mail-delay", title: "비밀번호 재설정 메일 지연 안내", date: "2026.07.09",
    excerpt: "일부 이메일 서비스에서 비밀번호 재설정 메일이 스팸함으로 분류되고 있습니다. 메일이 보이지 않으면 스팸함을 확인해 주세요.",
    image: "../../notice-list/template/assets/thumb-sage.svg", href: "notice-detail-normal.dc.html" },
  { id: "insight-subscribe", title: "멘트리 인사이트 구독 서비스 안내", date: "2026.07.01",
    excerpt: "매주 화요일, 해외 취업과 커리어 아티클을 메일로 보내드립니다. 멘트리 인사이트 페이지에서 이메일만 남기면 구독이 시작됩니다.",
    image: "../../notice-list/template/assets/thumb-green.svg", href: "notice-detail-normal.dc.html" },
];

// 상세 본문 — blocks: h2 · p(parts: text/mark/href) · ul(items)
export const DETAILS = {
  normal: {
    title: "개인정보 처리방침 개정 안내", date: "2026.09.01", image: null,
    blocks: [
      { type: "p", parts: [{ text: "멘트리는 회원의 개인정보를 더 안전하게 보호하기 위해 개인정보 처리방침을 개정합니다. 이번 개정은 멘토링 결제 수단 확대와 해외 파트너 연계에 따라 수집·위탁 항목을 현행화하는 것이 목적입니다." }] },
      { type: "p", parts: [{ text: "주요 변경 사항은 다음과 같습니다." }] },
      { type: "ul", items: [
        "수집 항목: 해외 카드 결제 시 카드 발급 국가 정보를 추가로 수집합니다.",
        "보유 기간: 탈퇴 후 분쟁 대응을 위한 거래 기록 보관 기간을 3년에서 5년으로 조정합니다.",
        "처리 위탁: 일본 현지 채용 상담을 위해 지란재팬(JIRAN JAPAN)을 위탁 업체로 추가합니다.",
      ] },
      { type: "p", parts: [
        { text: "개정된 처리방침은 " }, { text: "2026년 9월 15일(화)부터 시행됩니다.", mark: true },
        { text: " 시행일 이후에도 서비스를 계속 이용하시면 변경 내용에 동의한 것으로 봅니다. 동의하지 않으시는 경우 시행일 전에 회원 탈퇴를 진행하실 수 있습니다." },
      ] },
      { type: "p", parts: [
        { text: "개정 내용에 관해 궁금한 점은 " }, { text: "privacy@mentree.co.kr", href: "mailto:privacy@mentree.co.kr" }, { text: " 로 문의해 주세요. 전문은 " },
        { text: "개인정보처리방침 페이지", href: "#" }, { text: "에서 확인하실 수 있습니다." },
      ] },
    ],
  },
  banner: {
    title: "멘트리, 지란재팬과 함께 일본 진출 지원을 한 단계 더 강화합니다", date: "2026.09.12", image: "../../notice-list/template/assets/thumb-green.svg",
    blocks: [
      { type: "p", parts: [{ text: "멘트리가 일본 IT 기업 지란재팬(JIRAN JAPAN)과 업무 협약을 맺었습니다. 두 회사는 일본 취업을 준비하는 한국 인재에게 채용 정보와 현지 정착 지원을 함께 제공하기로 했습니다." }] },
      { type: "p", parts: [
        { text: "이번 협약으로 멘트리 멘티는 지란재팬이 소개하는 " }, { text: "현지 채용 공고와 비자·주거 상담을 멘토링과 한 흐름으로 받을 수 있습니다.", mark: true },
        { text: " 일본 현직 멘토의 Q&A 답변에는 관련 채용 정보가 함께 연결됩니다." },
      ] },
      { type: "p", parts: [{ text: "첫 프로그램은 10월 중 온라인 설명회로 시작합니다. 일정과 신청 방법은 확정되는 대로 공지사항과 멘트리 인사이트에서 안내드리겠습니다." }] },
    ],
  },
};
