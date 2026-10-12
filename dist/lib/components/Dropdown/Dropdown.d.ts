import { type AnchorHTMLAttributes, type ButtonHTMLAttributes, type HTMLAttributes, type MouseEventHandler, type ReactNode } from 'react';
export type DropdownPlacement = 'bottom-start' | 'bottom-end' | 'top-start' | 'top-end';
export type DropdownAutoClose = boolean | 'inside' | 'outside';
export type DropdownVariant = 'primary' | 'secondary' | 'success' | 'danger' | 'warning' | 'info' | 'light' | 'dark';
export interface DropdownProps extends HTMLAttributes<HTMLDivElement> {
    open?: boolean;
    defaultOpen?: boolean;
    onOpenChange?: (open: boolean) => void;
    placement?: DropdownPlacement;
    autoClose?: DropdownAutoClose;
    dark?: boolean;
    split?: boolean;
}
export interface DropdownToggleProps extends ButtonHTMLAttributes<HTMLButtonElement> {
    split?: boolean;
    variant?: DropdownVariant;
    children?: ReactNode;
}
export interface DropdownMenuProps extends HTMLAttributes<HTMLDivElement> {
    align?: 'start' | 'end';
    dark?: boolean;
    children?: ReactNode;
}
interface DropdownItemBaseProps {
    active?: boolean;
    disabled?: boolean;
    onSelect?: () => void;
    children?: ReactNode;
    className?: string;
    onClick?: MouseEventHandler<HTMLElement>;
}
export type DropdownItemProps = DropdownItemBaseProps & (({
    href: string;
} & Omit<AnchorHTMLAttributes<HTMLAnchorElement>, keyof DropdownItemBaseProps | 'href' | 'onClick'>) | ({
    href?: undefined;
} & Omit<ButtonHTMLAttributes<HTMLButtonElement>, keyof DropdownItemBaseProps | 'href' | 'onClick'>));
export declare const Dropdown: ({ open, defaultOpen, onOpenChange, placement, autoClose, dark, split, children, className, onKeyDown, ...props }: DropdownProps) => import("react").JSX.Element;
export declare const DropdownToggle: ({ split, variant, children, className, type, onClick, ...props }: DropdownToggleProps) => import("react").JSX.Element;
export declare const DropdownMenu: ({ align, dark, children, className, onClick, ...props }: DropdownMenuProps) => import("react").JSX.Element;
export declare const DropdownItem: ({ href, active, disabled, onSelect, onClick, children, className, ...props }: DropdownItemProps) => import("react").JSX.Element;
export declare const DropdownHeader: ({ children, className, ...props }: HTMLAttributes<HTMLDivElement>) => import("react").JSX.Element;
export declare const DropdownDivider: ({ className, ...props }: HTMLAttributes<HTMLHRElement>) => import("react").JSX.Element;
export {};
