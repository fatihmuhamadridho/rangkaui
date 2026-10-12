import { type HTMLAttributes } from 'react';
export type DatePickerMode = 'date' | 'range' | 'month' | 'year' | 'quarter';
export type DatePickerTheme = 'default' | 'primary' | 'success' | 'danger';
export type DateRangeValue = {
    start: string;
    end: string;
};
export interface DatePickerProps extends Omit<HTMLAttributes<HTMLDivElement>, 'onChange' | 'defaultValue'> {
    mode?: DatePickerMode;
    value?: string | DateRangeValue;
    defaultValue?: string | DateRangeValue;
    onChange?: (value: string | DateRangeValue) => void;
    placeholder?: string;
    theme?: DatePickerTheme;
    disabled?: boolean;
    monthsToShow?: 1 | 2;
    showTime?: boolean;
    minDate?: string;
    maxDate?: string;
    weekStartsOn?: 0 | 1;
    closeOnSelect?: boolean;
}
export declare function DatePicker({ mode, value, defaultValue, onChange, placeholder, theme, disabled, monthsToShow, showTime, minDate, maxDate, weekStartsOn, closeOnSelect, className, ...props }: DatePickerProps): import("react").JSX.Element;
