import type { ButtonHTMLAttributes, ReactNode } from 'react';
export type ButtonVariant = 'standard' | 'primary' | 'secondary' | 'base' | 'outline-primary' | 'outline-secondary' | 'link' | 'success' | 'danger' | 'warning' | 'info' | 'light' | 'dark' | 'outline-success' | 'outline-danger' | 'outline-warning' | 'outline-info' | 'outline-light' | 'outline-dark';
export type ButtonSize = 'small' | 'medium' | 'large';
export interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
    variant?: ButtonVariant;
    size?: ButtonSize;
    iconOnly?: boolean;
    children?: ReactNode;
}
export declare const Button: ({ variant, size, iconOnly, className, type, children, ...props }: ButtonProps) => import("react").JSX.Element;
