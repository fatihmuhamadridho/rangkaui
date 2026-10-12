import { type InputHTMLAttributes, type ReactNode } from 'react';
export type InputNumberSize = 'small' | 'medium' | 'large';
export interface InputNumberProps extends Omit<InputHTMLAttributes<HTMLInputElement>, 'type' | 'value' | 'defaultValue' | 'onChange' | 'size' | 'prefix'> {
    value?: number | '';
    defaultValue?: number | '';
    onValueChange?: (value: number | null) => void;
    prefix?: ReactNode;
    suffix?: ReactNode;
    clearable?: boolean;
    size?: InputNumberSize;
    wrapperClassName?: string;
}
export declare function InputNumber({ value, defaultValue, onValueChange, prefix, suffix, clearable, size, disabled, readOnly, className, wrapperClassName, min, max, step, onBlur, onKeyDown, ...props }: InputNumberProps): import("react").JSX.Element;
