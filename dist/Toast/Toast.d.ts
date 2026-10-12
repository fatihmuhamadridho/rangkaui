import { type ButtonHTMLAttributes, type HTMLAttributes, type ReactNode } from 'react';
export type ToastVariant = 'primary' | 'secondary' | 'success' | 'danger' | 'warning' | 'info' | 'light' | 'dark';
export type ToastPlacement = 'top-start' | 'top-center' | 'top-end' | 'middle-start' | 'middle-center' | 'middle-end' | 'bottom-start' | 'bottom-center' | 'bottom-end';
export interface ToastProps extends Omit<HTMLAttributes<HTMLDivElement>, 'title'> {
    title?: ReactNode;
    variant?: ToastVariant;
    autohide?: boolean;
    delay?: number;
    open?: boolean;
    defaultOpen?: boolean;
    onOpenChange?: (open: boolean) => void;
    onClose?: () => void;
    closeButton?: boolean;
    children?: ReactNode;
}
export interface ToastContainerProps extends HTMLAttributes<HTMLDivElement> {
    placement?: ToastPlacement;
    stacked?: boolean;
    children?: ReactNode;
}
export interface ToastCloseProps extends ButtonHTMLAttributes<HTMLButtonElement> {
    children?: ReactNode;
}
export declare function Toast({ title, variant, autohide, delay, open, defaultOpen, onOpenChange, onClose, closeButton, children, className, ...props }: ToastProps): import("react").JSX.Element | null;
export declare function ToastClose({ children, className, onClick, type, ...props }: ToastCloseProps): import("react").JSX.Element;
export declare function ToastContainer({ placement, stacked, children, className, ...props }: ToastContainerProps): import("react").JSX.Element;
