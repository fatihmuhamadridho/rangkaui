import { type AnchorHTMLAttributes, type ButtonHTMLAttributes, type HTMLAttributes, type ReactNode } from 'react';
export type TooltipPlacement = 'top' | 'right' | 'bottom' | 'left';
export type TooltipTriggerMode = 'hover' | 'focus' | 'click' | 'manual';
export interface TooltipProps extends Omit<HTMLAttributes<HTMLDivElement>, 'content'> {
    content: ReactNode;
    placement?: TooltipPlacement;
    trigger?: TooltipTriggerMode;
    open?: boolean;
    defaultOpen?: boolean;
    onOpenChange?: (open: boolean) => void;
    interactive?: boolean;
    children?: ReactNode;
}
export interface TooltipTriggerProps extends ButtonHTMLAttributes<HTMLButtonElement> {
    children?: ReactNode;
}
export interface TooltipLinkProps extends AnchorHTMLAttributes<HTMLAnchorElement> {
    children?: ReactNode;
}
export declare const Tooltip: ({ content, placement, trigger, open, defaultOpen, onOpenChange, interactive, children, className, ...props }: TooltipProps) => import("react").JSX.Element;
export declare const TooltipTrigger: ({ children, className, type, onClick, onMouseEnter, onMouseLeave, onFocus, onBlur, ...props }: TooltipTriggerProps) => import("react").JSX.Element;
export declare const TooltipLink: ({ children, className, onClick, onMouseEnter, onMouseLeave, onFocus, onBlur, ...props }: TooltipLinkProps) => import("react").JSX.Element;
