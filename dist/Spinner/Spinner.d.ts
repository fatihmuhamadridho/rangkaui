import type { HTMLAttributes } from 'react';
export type SpinnerVariant = 'border' | 'grow';
export type SpinnerColor = 'primary' | 'secondary' | 'success' | 'danger' | 'warning' | 'info' | 'light' | 'dark';
export type SpinnerSize = 'sm' | 'md';
export interface SpinnerProps extends HTMLAttributes<HTMLSpanElement> {
    variant?: SpinnerVariant;
    color?: SpinnerColor;
    size?: SpinnerSize;
    label?: string;
}
export declare function Spinner({ variant, color, size, label, className, ...props }: SpinnerProps): import("react").JSX.Element;
