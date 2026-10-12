import { type ButtonHTMLAttributes, type HTMLAttributes, type ReactNode } from 'react';
export type ModalSize = 'sm' | 'md' | 'lg' | 'xl' | 'fullscreen';
export interface ModalProps {
    open?: boolean;
    defaultOpen?: boolean;
    onOpenChange?: (open: boolean) => void;
    closeOnEscape?: boolean;
    closeOnBackdrop?: boolean;
    children?: ReactNode;
}
export interface ModalTriggerProps extends ButtonHTMLAttributes<HTMLButtonElement> {
    children?: ReactNode;
}
export interface ModalCloseProps extends ModalTriggerProps {
    variant?: 'primary' | 'secondary';
}
export interface ModalContentProps extends HTMLAttributes<HTMLDivElement> {
    size?: ModalSize;
    centered?: boolean;
    scrollable?: boolean;
    showCloseButton?: boolean;
    children?: ReactNode;
}
export interface ModalSectionProps extends HTMLAttributes<HTMLDivElement> {
    children?: ReactNode;
}
export interface ModalTitleProps extends HTMLAttributes<HTMLHeadingElement> {
    as?: 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6';
    children?: ReactNode;
}
export interface ModalDescriptionProps extends HTMLAttributes<HTMLParagraphElement> {
    children?: ReactNode;
}
export declare const Modal: ({ open, defaultOpen, onOpenChange, closeOnEscape, closeOnBackdrop, children, }: ModalProps) => import("react").JSX.Element;
export declare const ModalTrigger: ({ children, className, type, onClick, ...props }: ModalTriggerProps) => import("react").JSX.Element;
export declare const ModalContent: ({ size, centered, scrollable, showCloseButton, children, className, onKeyDown, onMouseDown, "aria-label": ariaLabel, ...props }: ModalContentProps) => import("react").ReactPortal | null;
export declare const ModalHeader: ({ children, className, ...props }: ModalSectionProps) => import("react").JSX.Element;
export declare const ModalTitle: ({ as: Heading, children, className, ...props }: ModalTitleProps) => import("react").JSX.Element;
export declare const ModalDescription: ({ children, className, ...props }: ModalDescriptionProps) => import("react").JSX.Element;
export declare const ModalBody: ({ children, className, ...props }: ModalSectionProps) => import("react").JSX.Element;
export declare const ModalFooter: ({ children, className, ...props }: ModalSectionProps) => import("react").JSX.Element;
export declare const ModalClose: ({ children, variant, className, type, onClick, ...props }: ModalCloseProps) => import("react").JSX.Element;
