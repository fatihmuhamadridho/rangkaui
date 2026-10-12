import { type InputHTMLAttributes } from 'react';
export interface SliderProps extends Omit<InputHTMLAttributes<HTMLInputElement>, 'type' | 'value' | 'defaultValue' | 'onChange'> {
    value?: number;
    defaultValue?: number;
    onValueChange?: (value: number) => void;
    showValue?: boolean;
    label?: string;
}
export declare const Slider: ({ value, defaultValue, onValueChange, showValue, label, disabled, className, ...props }: SliderProps) => import("react").JSX.Element;
