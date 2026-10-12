import type { HTMLAttributes, ReactNode } from 'react';
export type BadgeVariant = 'primary' | 'secondary' | 'success' | 'danger' | 'warning' | 'info' | 'light' | 'dark';
export type BadgePosition = 'top-start' | 'top-end' | 'bottom-start' | 'bottom-end';
export interface BadgeProps extends HTMLAttributes<HTMLSpanElement> {
    variant?: BadgeVariant;
    pill?: boolean;
    position?: BadgePosition;
    dot?: boolean;
    children?: ReactNode;
}
export declare const Badge: ({ variant, pill, position, dot, className, children, "aria-label": ariaLabel, ...props }: BadgeProps) => import("react").JSX.Element;
