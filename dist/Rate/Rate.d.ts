import { type HTMLAttributes } from 'react';
export type RateIcon = 'star' | 'face';
export type RateSize = 'small' | 'medium' | 'large';
export interface RateProps extends Omit<HTMLAttributes<HTMLDivElement>, 'onChange'> {
    value?: number;
    defaultValue?: number;
    onChange?: (value: number) => void;
    count?: number;
    allowHalf?: boolean;
    allowClear?: boolean;
    readOnly?: boolean;
    disabled?: boolean;
    icon?: RateIcon;
    size?: RateSize;
    label?: string;
}
export declare function Rate({ value, defaultValue, onChange, count, allowHalf, allowClear, readOnly, disabled, icon, size, label, className, ...props }: RateProps): import("react").JSX.Element;
