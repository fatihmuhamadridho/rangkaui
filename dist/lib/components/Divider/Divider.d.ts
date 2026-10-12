import type { HTMLAttributes, ReactNode } from 'react';
export type DividerOrientation = 'horizontal' | 'vertical';
export type DividerStyle = 'solid' | 'dashed';
export type DividerAlign = 'left' | 'center' | 'right';
export interface DividerProps extends HTMLAttributes<HTMLDivElement> {
    orientation?: DividerOrientation;
    variant?: DividerStyle;
    align?: DividerAlign;
    children?: ReactNode;
}
export declare const Divider: ({ orientation, variant, align, children, className, ...props }: DividerProps) => import("react").JSX.Element;
