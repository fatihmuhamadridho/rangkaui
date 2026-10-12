import { type ButtonHTMLAttributes, type HTMLAttributes, type ReactNode } from 'react';
export type PopoverPlacement = 'top' | 'right' | 'bottom' | 'left';
export type PopoverTriggerMode = 'click' | 'hover' | 'focus' | 'manual';
export interface PopoverProps extends HTMLAttributes<HTMLDivElement> {
    open?: boolean;
    defaultOpen?: boolean;
    onOpenChange?: (open: boolean) => void;
    placement?: PopoverPlacement;
    trigger?: PopoverTriggerMode;
}
export interface PopoverTriggerProps extends ButtonHTMLAttributes<HTMLButtonElement> {
    children?: ReactNode;
}
export interface PopoverContentProps extends Omit<HTMLAttributes<HTMLDivElement>, 'title'> {
    title?: ReactNode;
    children?: ReactNode;
}
export declare const Popover: ({ open, defaultOpen, onOpenChange, placement, trigger, children, className, onKeyDown, ...props }: PopoverProps) => import("react").JSX.Element;
export declare const PopoverTrigger: ({ children, className, type, onClick, onMouseEnter, onMouseLeave, onFocus, onBlur, ...props }: PopoverTriggerProps) => import("react").JSX.Element;
export declare const PopoverContent: ({ title, children, className, onMouseEnter, onMouseLeave, ...props }: PopoverContentProps) => import("react").JSX.Element | null;
