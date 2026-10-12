import { type AnchorHTMLAttributes, type ButtonHTMLAttributes, type HTMLAttributes, type ReactNode } from 'react';
export type NavbarExpand = 'sm' | 'md' | 'lg' | 'xl' | 'xxl' | 'never';
export type NavbarTheme = 'light' | 'dark' | 'primary' | 'secondary' | 'success' | 'danger' | 'warning' | 'info' | 'transparent';
export type NavbarPosition = 'static' | 'fixed-top' | 'fixed-bottom' | 'sticky-top';
export interface NavbarProps extends HTMLAttributes<HTMLElement> {
    expand?: NavbarExpand;
    theme?: NavbarTheme;
    position?: NavbarPosition;
    defaultExpanded?: boolean;
    expanded?: boolean;
    onExpandedChange?: (expanded: boolean) => void;
    children?: ReactNode;
}
export interface NavbarToggleProps extends ButtonHTMLAttributes<HTMLButtonElement> {
    children?: ReactNode;
}
export interface NavbarCollapseProps extends HTMLAttributes<HTMLDivElement> {
    children?: ReactNode;
}
export interface NavbarNavProps extends HTMLAttributes<HTMLUListElement> {
    align?: 'start' | 'center' | 'end';
    children?: ReactNode;
}
export interface NavbarContainerProps extends HTMLAttributes<HTMLDivElement> {
    fluid?: boolean;
    children?: ReactNode;
}
export interface NavbarLinkProps extends AnchorHTMLAttributes<HTMLAnchorElement> {
    active?: boolean;
    disabled?: boolean;
    children?: ReactNode;
}
export declare function Navbar({ expand, theme, position, defaultExpanded, expanded, onExpandedChange, children, className, 'aria-label': ariaLabel, ...props }: NavbarProps): import("react").JSX.Element;
export declare function NavbarBrand({ children, className, ...props }: AnchorHTMLAttributes<HTMLAnchorElement>): import("react").JSX.Element;
export declare function NavbarToggle({ children, className, type, onClick, ...props }: NavbarToggleProps): import("react").JSX.Element;
export declare function NavbarCollapse({ children, className, ...props }: NavbarCollapseProps): import("react").JSX.Element;
export declare function NavbarNav({ align, children, className, ...props }: NavbarNavProps): import("react").JSX.Element;
export declare function NavbarItem({ children, className, ...props }: HTMLAttributes<HTMLLIElement>): import("react").JSX.Element;
export declare function NavbarLink({ active, disabled, children, className, onClick, ...props }: NavbarLinkProps): import("react").JSX.Element;
export declare function NavbarText({ children, className, ...props }: HTMLAttributes<HTMLSpanElement>): import("react").JSX.Element;
export declare function NavbarContainer({ fluid, children, className, ...props }: NavbarContainerProps): import("react").JSX.Element;
