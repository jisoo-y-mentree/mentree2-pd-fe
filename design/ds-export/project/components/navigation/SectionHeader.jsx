import React from "react";
import { Badge } from "../core/Badge.jsx";
import { Button } from "../core/Button.jsx";
import { IconButton } from "../core/IconButton.jsx";
import { Icon } from "../core/Icon.jsx";

/**
 * SectionHeader — 배치 컴포넌트. 가로 한 줄, 좌우 양끝 정렬(좌 제목 / 우 액션).
 *  중앙정렬형은 미포함(개별 대응). 배지·버튼·IconButton·아이콘은 기존 컴포넌트 재사용.
 *
 *  좌: [장식 아이콘 칩(옵션)] 제목(30 semibold, green 강조 조각 옵션) [부가 스트링(옵션)] [Badge(옵션)]
 *  우: 전체보기(고스트+화살표) / 아웃라인 버튼(옵션) / 캐러셀 화살표 IconButton 2개(옵션)
 *
 *  DS-GAP: 섹션 제목 30 은 현재 타입스케일(h1=24) 밖. 히어로·페이지 타이틀 등 큰 텍스트와
 *  함께 스케일 상단(h0/display) 정리 필요 — 별도 작업. 지금은 30/semibold 임시 지정.
 */
export function SectionHeader({
  icon,
  title,
  titleAccent,
  suffix,
  badge,
  viewAll,
  onViewAll,
  action,
  carousel = false,
  onPrev,
  onNext,
  prevDisabled = false,
  nextDisabled = false,
  style,
  ...rest
}) {
  return (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        gap: 16,
        width: "100%",
        fontFamily: "var(--font-sans)",
        color: "var(--foreground)",
        ...style,
      }}
      {...rest}
    >
      {/* 좌: 제목 영역 */}
      <div style={{ display: "flex", alignItems: "center", gap: 12, minWidth: 0 }}>
        {icon && (
          <span
            style={{
              flex: "0 0 auto",
              display: "inline-flex",
              alignItems: "center",
              justifyContent: "center",
              width: 44,
              height: 44,
              borderRadius: 12,
              background: "var(--sage-50)",
              color: "var(--sage-700)",
              border: "1px solid var(--sage-200)",
            }}
          >
            <Icon name={icon} size={24} />
          </span>
        )}
        <div style={{ display: "flex", alignItems: "center", gap: 10, minWidth: 0, flexWrap: "wrap" }}>
          {/* 제목 30 semibold — 일반 + green 강조 조각(옵션) */}
          <h2 style={{ margin: 0, fontSize: "var(--text-h0)", fontWeight: 600, letterSpacing: "var(--text-h0--letter-spacing)", lineHeight: "var(--text-h0--line-height)", wordBreak: "keep-all", overflowWrap: "break-word" }}>
            {title}
            {titleAccent && <span style={{ color: "var(--primary)" }}>{titleAccent}</span>}
          </h2>
          {/* 부가 스트링(옵션) — muted */}
          {suffix && <span style={{ fontSize: "var(--text-body)", color: "var(--muted-foreground)" }}>{suffix}</span>}
          {/* 배지(옵션) */}
          {badge}
        </div>
      </div>

      {/* 우: 액션 영역(버튼그룹) */}
      {(viewAll || action || carousel) && (
        <div style={{ flex: "0 0 auto", display: "flex", alignItems: "center", gap: 8 }}>
          {action}
          {viewAll && (
            <Button variant="ghost" size="md" iconRight="circle-arrow-up-right" onClick={onViewAll}>
              전체보기
            </Button>
          )}
          {carousel && (
            /* 세그먼트 그룹 — 바깥 모서리만 radius(12), 맞붙는 안쪽은 각짐.
               오른쪽 버튼 marginLeft -1 로 두 테두리를 겹쳐 가운데 hairline divider 하나로. */
            <div style={{ display: "inline-flex", alignItems: "center" }}>
              <IconButton
                icon="arrow-left-02" variant="outline" ariaLabel="이전"
                onClick={onPrev} disabled={prevDisabled}
                style={{ borderRadius: "var(--radius-md) 0 0 var(--radius-md)" }}
              />
              <IconButton
                icon="arrow-right-02" variant="outline" ariaLabel="다음"
                onClick={onNext} disabled={nextDisabled}
                style={{ borderRadius: "0 var(--radius-md) var(--radius-md) 0", marginLeft: -1 }}
              />
            </div>
          )}
        </div>
      )}
    </div>
  );
}
