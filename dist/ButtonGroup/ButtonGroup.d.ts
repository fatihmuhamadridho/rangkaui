import { type HTMLAttributes, type ReactNode } from 'react';
export type ButtonGroupOrientation = 'horizontal' | 'vertical';
export type ButtonGroupSize = 'small' | 'medium' | 'large';
export interface ButtonGroupProps extends HTMLAttributes<HTMLDivElement> {
    children?: ReactNode;
    orientation?: ButtonGroupOrientation;
    size?: ButtonGroupSize;
}
export interface ButtonToolbarProps extends HTMLAttributes<HTMLDivElement> {
    children?: ReactNode;
}
export interface ButtonGroupToggleOption {
    value: string;
    label: ReactNode;
    disabled?: boolean;
}
export interface ButtonGroupToggleProps extends Omit<HTMLAttributes<HTMLDivElement>, 'defaultValue'> {
    options: ButtonGroupToggleOption[];
    type: 'checkbox' | 'radio';
    name?: string;
    value?: string[];
    defaultValue?: string[];
    onValueChange?: (value: string[]) => void;
}
export declare function ButtonGroup({ children, orientation, size, className, role, 'aria-label': ariaLabel, ...props }: ButtonGroupProps): import("react").JSX.Element;
export declare function ButtonToolbar({ children, className, role, 'aria-label': ariaLabel, ...props }: ButtonToolbarProps): import("react").JSX.Element;
export declare function ButtonGroupToggle({ options, type, name, value, defaultValue, onValueChange, className, 'aria-label': ariaLabel, ...props }: ButtonGroupToggleProps): import("react").JSX.Element;
