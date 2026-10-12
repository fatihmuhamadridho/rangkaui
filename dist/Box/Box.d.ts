import type { HTMLAttributes, ReactNode } from 'react';
export interface BoxProps extends HTMLAttributes<HTMLDivElement> {
    children?: ReactNode;
    padded?: boolean;
    bordered?: boolean;
    rounded?: boolean;
    shadow?: boolean;
}
export declare function Box({ children, className, padded, bordered, rounded, shadow, ...props }: BoxProps): import("react").JSX.Element;
