import { type HTMLAttributes } from 'react';
export interface RGBAColor {
    r: number;
    g: number;
    b: number;
    a: number;
}
export interface ColorPickerProps extends Omit<HTMLAttributes<HTMLDivElement>, 'onChange'> {
    value?: string;
    defaultValue?: string;
    onChange?: (color: string, rgba: RGBAColor) => void;
    label?: string;
    disabled?: boolean;
    showAlpha?: boolean;
}
export declare const ColorPicker: ({ value, defaultValue, onChange, label, disabled, showAlpha, className, ...props }: ColorPickerProps) => import("react").JSX.Element;
