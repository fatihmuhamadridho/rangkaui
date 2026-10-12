import { type HTMLAttributes } from 'react';
export type TimePickerTheme = 'default' | 'primary' | 'success' | 'danger';
export interface TimeRangeValue {
    start: string;
    end: string;
}
export interface TimePickerProps extends Omit<HTMLAttributes<HTMLDivElement>, 'onChange' | 'defaultValue'> {
    mode?: 'single' | 'range';
    value?: string | TimeRangeValue;
    defaultValue?: string | TimeRangeValue;
    onChange?: (value: string | TimeRangeValue) => void;
    theme?: TimePickerTheme;
    disabled?: boolean;
    useSeconds?: boolean;
    hour12?: boolean;
    minuteStep?: number;
    secondStep?: number;
    placeholder?: string;
}
export declare const TimePicker: ({ mode, value, defaultValue, onChange, theme, disabled, useSeconds, hour12, minuteStep, secondStep, placeholder, className, ...props }: TimePickerProps) => import("react").JSX.Element;
