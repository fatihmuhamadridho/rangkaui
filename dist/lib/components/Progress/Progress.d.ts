import type { HTMLAttributes, ReactNode } from 'react';
export type ProgressVariant = 'primary' | 'secondary' | 'success' | 'danger' | 'warning' | 'info';
export interface ProgressProps extends Omit<HTMLAttributes<HTMLDivElement>, 'children'> {
    value: number;
    min?: number;
    max?: number;
    variant?: ProgressVariant;
    striped?: boolean;
    animated?: boolean;
    label?: ReactNode;
    showValue?: boolean;
    children?: ReactNode;
}
export interface ProgressStackProps extends HTMLAttributes<HTMLDivElement> {
    label?: string;
    height?: number | string;
    children?: ReactNode;
}
export interface ProgressSegmentProps extends Omit<ProgressProps, 'width'> {
}
export declare const Progress: ({ value, min, max, variant, striped, animated, label, showValue, children, className, style, "aria-label": ariaLabel, ...props }: ProgressProps) => import("react").JSX.Element;
export declare const ProgressSegment: ({ value, min, max, variant, striped, animated, label, showValue, children, className, style, "aria-label": ariaLabel, ...props }: ProgressSegmentProps) => import("react").JSX.Element;
export declare const ProgressStack: ({ label, height, children, className, style, ...props }: ProgressStackProps) => import("react").JSX.Element;
