import type { ButtonHTMLAttributes, HTMLAttributes, InputHTMLAttributes, ReactNode, SelectHTMLAttributes } from 'react';
export type InputGroupSize = 'small' | 'medium' | 'large';
export type InputGroupRounding = 'default' | 'rounded' | 'pill';
export interface InputGroupProps extends HTMLAttributes<HTMLDivElement> {
    size?: InputGroupSize;
    rounding?: InputGroupRounding;
    wrap?: boolean;
    children?: ReactNode;
}
export interface InputGroupTextProps extends HTMLAttributes<HTMLSpanElement> {
    children?: ReactNode;
}
export interface InputGroupButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
    variant?: 'default' | 'primary' | 'secondary';
    children?: ReactNode;
}
export interface InputGroupInputProps extends InputHTMLAttributes<HTMLInputElement> {
}
export interface InputGroupSelectProps extends SelectHTMLAttributes<HTMLSelectElement> {
    children?: ReactNode;
}
export interface InputGroupCheckProps extends Omit<InputHTMLAttributes<HTMLInputElement>, 'type'> {
    type?: 'checkbox' | 'radio';
    label?: ReactNode;
}
export declare function InputGroup({ size, rounding, wrap, children, className, role, 'aria-label': ariaLabel, ...props }: InputGroupProps): import("react").JSX.Element;
export declare function InputGroupText({ children, className, ...props }: InputGroupTextProps): import("react").JSX.Element;
export declare function InputGroupButton({ variant, children, className, type, ...props }: InputGroupButtonProps): import("react").JSX.Element;
export declare function InputGroupInput({ className, ...props }: InputGroupInputProps): import("react").JSX.Element;
export declare function InputGroupSelect({ children, className, ...props }: InputGroupSelectProps): import("react").JSX.Element;
export declare function InputGroupCheck({ type, label, className, ...props }: InputGroupCheckProps): import("react").JSX.Element;
