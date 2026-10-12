import type { ButtonHTMLAttributes, HTMLAttributes, ReactNode } from 'react';
export type TagSize = 'small' | 'medium' | 'large';
export type TagVariant = 'default' | 'primary' | 'success' | 'warning' | 'danger';
export interface TagProps extends Omit<HTMLAttributes<HTMLSpanElement>, 'onRemove'> {
    children?: ReactNode;
    icon?: ReactNode;
    closable?: boolean;
    onClose?: () => void;
    closeButtonProps?: Omit<ButtonHTMLAttributes<HTMLButtonElement>, 'onClick' | 'children'>;
    size?: TagSize;
    variant?: TagVariant;
}
export interface TagsProps extends HTMLAttributes<HTMLDivElement> {
    children?: ReactNode;
    gap?: 'small' | 'medium' | 'large';
}
export declare function Tag({ children, icon, closable, onClose, closeButtonProps, size, variant, className, ...props }: TagProps): import("react").JSX.Element;
export declare function Tags({ children, gap, className, role, ...props }: TagsProps): import("react").JSX.Element;
