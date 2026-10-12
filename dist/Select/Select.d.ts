import type { ReactNode, SelectHTMLAttributes } from 'react';
export type SelectSize = 'small' | 'medium' | 'large';
export interface SelectProps extends Omit<SelectHTMLAttributes<HTMLSelectElement>, 'size'> {
    size?: SelectSize;
    nativeSize?: number;
    children?: ReactNode;
}
export declare function Select({ size, nativeSize, multiple, disabled, className, children, ...props }: SelectProps): import("react").JSX.Element;
