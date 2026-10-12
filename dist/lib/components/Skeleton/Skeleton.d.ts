import type { HTMLAttributes, ReactNode } from 'react';
export type SkeletonAnimation = 'none' | 'glow' | 'wave';
export type SkeletonSize = 'xs' | 'sm' | 'md' | 'lg';
export type SkeletonColor = 'default' | 'primary' | 'secondary' | 'success' | 'danger' | 'warning' | 'info' | 'light' | 'dark';
export interface SkeletonProps extends HTMLAttributes<HTMLSpanElement> {
    animation?: SkeletonAnimation;
    size?: SkeletonSize;
    color?: SkeletonColor;
    width?: string | number;
    as?: 'span' | 'div';
    children?: ReactNode;
}
export declare const Skeleton: ({ animation, size, color, width, as: Element, className, style, "aria-hidden": ariaHidden, ...props }: SkeletonProps) => import("react").JSX.Element;
