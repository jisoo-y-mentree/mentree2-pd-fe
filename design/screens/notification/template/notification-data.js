// notification-data.js — 알림 화면 공용 데이터 · 카드 뷰모델 · 쓸기 거동. 모양은 notification.css(.nt-)에 있다.
const IMG = "../../../ds-export/project/assets/img/";
// 리포 검수 2026-10-14 ④: a · b · c.png 는 사람이 아니라 진입 아이콘 그림이다. 멘티 얼굴은 표본이 없어 이니셜로 둔다.
//  멘토 본인은 사진 마스터(8 · 박지훈 — top · mentor-search · qna-feed 공통)를 쓴다.
const AVATARS = [
  { name: "정하은" },
  { name: "이준호" },
  { name: "김하늘" },
];

export const USERS = {
  mentor: { name: "박지훈", avatarUrl: IMG + "8.png" },
  mentee: { name: "박지우" },
};

export const BANNER = { label: "이벤트 · 08.20까지", title: "첫 1:1 멘토링 30% 할인 쿠폰", href: "#" };

const L1 = (id, text, time, href) => ({ id, level: 1, text, time, action: { label: "자세히 보기", href: href || "#" }, read: false });
const R = (id, text, time) => ({ ...L1(id, text, time), read: true });

const MENTOR_UNREAD = [
  { id: "m1", level: 3, text: "정산 계좌 정보가 일치하지 않아 8월 정산이 보류되었습니다.", deadline: "08.25까지 미수정 시 다음 회차로 이월", action: { label: "계좌 정보 수정", href: "#" }, read: false },
  { id: "m2", level: 2, text: "꽃송이가 지급되었습니다.", time: "2026.08.25", action: { label: "상세 보기", href: "#" }, read: false },
  L1("m3", "회원님이 올리신 “지금 제 상황으로 일본취업이 가능할까요?” 글에 멘토의 답변이 등록되었습니다.", "12분 전"),
  { ...L1("m4", "회원님의 답변에 12명이 도움돼요를 눌렀습니다."), time: undefined, group: { avatars: AVATARS, more: "외 9명의 멘티" } },
  L1("m5", "내 전문 분야에 새 질문이 올라왔습니다 — “도쿄 스타트업 디자이너 이직, 포트폴리오는 몇 개가 적당할까요?”", "1시간 전"),
];
const MENTOR_READ = [
  R("m6", "정하은 멘티와의 세션이 확정되었습니다. 8월 27일(수) 오후 9시입니다.", "어제"),
  R("m7", "이준호 멘티가 후기를 남겼습니다. “현지 면접 분위기를 미리 알 수 있어 큰 도움이 됐어요.”", "어제"),
  R("m8", "회원님이 답변한 질문에 다른 멘토의 답변이 등록되었습니다.", "2일 전"),
  R("m9", "정하은 멘티가 세션 일정을 골랐습니다.", "3일 전"),
  R("m10", "“싱가포르 핀테크 이직, 영어 면접은 어떻게 준비하셨나요?” 질문이 회원님께 지정되었습니다.", "4일 전"),
  R("m11", "7월 정산 내역이 확정되었습니다. 정산 탭에서 확인할 수 있습니다.", "지난주"),
  R("m12", "이준호 멘티의 결제가 완료되어 세션이 확정되었습니다.", "지난주"),
];
const MENTOR_MORE = [
  R("m13", "김하늘 멘티가 세션 일정 변경을 요청했습니다.", "지난주"),
  R("m14", "회원님의 인터뷰 아티클이 멘트리 인사이트에 게재되었습니다.", "지난주"),
  R("m15", "“독일 취업 비자, 블루카드 조건이 궁금합니다” 글에 회원님의 답변이 채택되었습니다.", "2주 전"),
  R("m16", "관심 멘토로 등록한 멘티가 새 질문을 올렸습니다.", "2주 전"),
  R("m17", "최지우 멘티가 멘토링 신청을 취소했습니다.", "2주 전"),
  R("m18", "“도쿄 IT 기업 연봉 협상, 어느 정도가 적정선일까요?” 질문에 남긴 답변에 질문자가 도움돼요를 눌렀습니다.", "3주 전"),
  R("m19", "정산 계좌 정보가 등록되었습니다.", "3주 전"),
  R("m20", "6월 정산 내역이 확정되었습니다.", "지난달"),
  R("m21", "멘토 가이드가 업데이트되었습니다. 세션 노쇼 정책을 확인해 주세요.", "지난달"),
  R("m22", "멘토 등록이 승인되었습니다. 멘트리에 오신 것을 환영합니다.", "지난달"),
];

const MENTEE_UNREAD = [
  { id: "e1", level: 3, text: "등록한 결제수단이 09.30에 만료됩니다.", deadline: "만료 전 갱신하지 않으면 예약한 세션이 취소됩니다", action: { label: "결제수단 갱신", href: "#" }, read: false },
  { id: "e2", level: 2, text: "첫 멘토링 쿠폰 1장이 지급되었습니다.", time: "2026.08.25", action: { label: "상세 보기", href: "#" }, read: false },
  L1("e3", "회원님이 올리신 “지금 제 상황으로 일본취업이 가능할까요?” 글에 멘토의 답변이 등록되었습니다.", "12분 전"),
  L1("e4", "김민수 멘토가 멘토링 신청을 수락했습니다. 일정을 골라 주세요.", "2시간 전"),
  L1("e5", "스크랩한 질문 “미국 취업 비자, 어떤 순서로 준비하나요?” 에 새 답변이 달렸습니다.", "어제"),
];
const MENTEE_READ = [
  R("e6", "김민수 멘토와의 세션이 확정되었습니다. 8월 27일(수) 오후 9시입니다.", "어제"),
  R("e7", "세션 후기를 남겨 주세요. 다음 멘토링 쿠폰이 지급됩니다.", "어제"),
  R("e8", "회원님의 질문 “미국 취업 비자, 어떤 순서로 준비하나요?” 에 멘토 답변이 2개 달렸습니다.", "2일 전"),
  R("e9", "관심 멘토 이서연 님이 새 인터뷰 아티클을 올렸습니다.", "3일 전"),
  R("e10", "멘토링 결제가 완료되었습니다. 영수증은 마이페이지에서 확인할 수 있습니다.", "4일 전"),
  R("e11", "스크랩한 질문에 채택된 답변이 등록되었습니다.", "지난주"),
  R("e12", "관심 멘토 이서연 님이 새 질문에 답변했습니다.", "지난주"),
];
const MENTEE_MORE = [
  R("e13", "박지훈 멘토가 멘토링 신청을 거절했습니다. 다른 멘토를 찾아보세요.", "지난주"),
  R("e14", "멘토링 신청이 접수되었습니다. 멘토의 수락을 기다려 주세요.", "지난주"),
  R("e15", "회원님의 질문이 「지금 주목받는 Q&A」에 선정되었습니다.", "2주 전"),
  R("e16", "관심 멘토 다나카 유키 님의 9월 세션 예약이 열렸습니다.", "2주 전"),
  R("e17", "멘트리 클라쓰 11 「미국 테크 기업 레주메 클리닉」 신청이 완료되었습니다.", "2주 전"),
  R("e18", "환불이 완료되었습니다. 카드사에 따라 3~5영업일이 걸립니다.", "3주 전"),
  R("e19", "다나카 유키 멘토가 회원님의 후기에 답글을 남겼습니다.", "3주 전"),
  R("e20", "새 아티클 “싱가포르 1년 차, 월세와 생활비 정리” 가 올라왔습니다.", "지난달"),
  R("e21", "회원가입 7일 기념 쿠폰이 지급되었습니다.", "지난달"),
  R("e22", "멘트리에 오신 것을 환영합니다. 먼저 관심 국가를 골라 보세요.", "지난달"),
];

const POOL = {
  mentor: { unread: MENTOR_UNREAD, read: MENTOR_READ, more: MENTOR_MORE },
  mentee: { unread: MENTEE_UNREAD, read: MENTEE_READ, more: MENTEE_MORE },
};

const clone = (arr) => arr.map((i) => ({ ...i }));

/** 주소 파라미터(role · state) → 목록. items = 지금 보이는 카드, more = 「더보기」가 붙일 다음 묶음, banner = 띠 노출 여부. */
export function getItems(role, state) {
  const p = POOL[role] || POOL.mentee;
  switch (state) {
    case "normal": return { items: clone(p.unread).concat(clone(p.read)), more: clone(p.more), banner: true };
    case "read": return { items: clone(p.unread).concat(clone(p.read)).map((i) => ({ ...i, read: true })), more: clone(p.more), banner: false };
    case "end": return { items: clone(p.read).slice(0, 4), more: [], banner: false };
    default: return { items: [], more: [], banner: false };
  }
}

// 와이어 1059:41331 의 아이콘 — 거래는 돼지저금통, 경고는 alert-square
const ICON = { 2: "piggy-bank", 3: "alert-square" };

/**
 * 카드 뷰모델 — 템플릿이 그대로 읽는 평평한 값과 핸들러.
 * ctx: { onRead(id) · onDelete(id) · afterAction() · swipe({id,dx,dragging}) · swipeHandlers(item) · wide }
 */
export function cardViewModels(items, ctx) {
  const sw = ctx.swipe || {};
  return items.map((it) => {
    const dx = sw.id === it.id ? sw.dx : 0;
    const href = it.action.href;
    const h = ctx.swipeHandlers ? ctx.swipeHandlers(it) : {};
    return {
      id: it.id,
      cls: ["nt-card", "nt-l" + it.level, it.read ? "nt-read" : "nt-unread", ctx.wide ? "nt-card--wide" : "", dx ? "nt-dragging" : ""].filter(Boolean).join(" "),
      isL1: it.level === 1,
      notL1: it.level !== 1,
      hasIcon: it.level > 1,
      icon: ICON[it.level] || "",
      text: it.text,
      hasTime: !!it.time,
      time: it.time || "",
      hasDeadline: !!it.deadline,
      deadline: it.deadline || "",
      hasGroup: !!it.group,
      avatars: it.group ? it.group.avatars : [],
      more: it.group ? it.group.more : "",
      actionLabel: it.action.label,
      href: href || "#",
      canDelete: it.level < 3,
      swiping: dx < 0,
      swipeStyle: dx ? { transform: "translateX(" + dx + "px)" } : undefined,
      onAction: (e) => {
        if (e && e.preventDefault) e.preventDefault(); // <a> 의 기본 이동 대신 아래에서 간다(읽음 처리 뒤)
        if (sw.moved) return;
        ctx.onRead && ctx.onRead(it.id);
        ctx.afterAction && ctx.afterAction();
        if (href && href !== "#") location.assign(href);
      },
      onDelete: () => ctx.onDelete && ctx.onDelete(it.id),
      onDown: h.down, onMove: h.move, onUp: h.up,
    };
  });
}

/**
 * 왼쪽 쓸기(768 이하 · L1 · L2 만). host 는 setState 를 가진 컴포넌트, host.state.swipe = {id, dx}.
 * 끝까지(96px 또는 카드 폭 40% 이상) 쓸면 onDelete(id). 포인터 캡처는 끌기가 시작된 뒤에만 — 탭이 버튼 클릭으로 남게.
 */
export function makeSwipe(host, onDelete) {
  let id = null, x0 = 0, y0 = 0, dragging = false, width = 0, moved = false;
  const narrow = () => window.matchMedia("(max-width: 768px)").matches;
  const reset = () => { id = null; dragging = false; host.setState({ swipe: { id: null, dx: 0, moved } }); };
  return (it) => ({
    down: (e) => {
      if (it.level === 3 || !narrow()) return;
      if (e.pointerType === "mouse" && e.button !== 0) return;
      id = it.id; x0 = e.clientX; y0 = e.clientY; dragging = false; moved = false;
      width = e.currentTarget.offsetWidth;
    },
    move: (e) => {
      if (id !== it.id) return;
      const dx = e.clientX - x0, dy = e.clientY - y0;
      if (!dragging) {
        if (Math.abs(dx) < 8) return;
        if (Math.abs(dy) > Math.abs(dx)) { id = null; return; }
        dragging = true; moved = true;
        try { e.currentTarget.setPointerCapture(e.pointerId); } catch (_) {}
      }
      host.setState({ swipe: { id, dx: Math.min(0, dx), moved: true } });
    },
    up: () => {
      if (id !== it.id) return;
      const dx = host.state.swipe && host.state.swipe.id === id ? host.state.swipe.dx : 0;
      const far = dragging && -dx >= Math.max(96, width * 0.4);
      reset();
      if (far) onDelete(it.id);
      setTimeout(() => { moved = false; host.setState({ swipe: { id: null, dx: 0, moved: false } }); }, 50);
    },
  });
}
