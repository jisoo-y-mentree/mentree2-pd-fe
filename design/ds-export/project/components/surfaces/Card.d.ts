import React from "react";

/**
 * Card — 흰 엘리베이션 패널(대시보드/설정 패널, 리스트 아이템).
 */
export interface CardProps extends React.HTMLAttributes<HTMLDivElement> {}
export function Card(props: CardProps): JSX.Element;
export function CardHeader(props: React.HTMLAttributes<HTMLDivElement>): JSX.Element;
export function CardTitle(props: React.HTMLAttributes<HTMLDivElement>): JSX.Element;
export function CardDescription(props: React.HTMLAttributes<HTMLDivElement>): JSX.Element;
export function CardContent(props: React.HTMLAttributes<HTMLDivElement>): JSX.Element;
export function CardFooter(props: React.HTMLAttributes<HTMLDivElement>): JSX.Element;
