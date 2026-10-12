import { type AnchorHTMLAttributes, type HTMLAttributes, type ReactNode } from 'react';
export type NavsTabsVariant = 'tabs' | 'pills' | 'underline' | 'plain';
export type NavsTabsOrientation = 'horizontal' | 'vertical';
export interface NavsTabsProps extends Omit<HTMLAttributes<HTMLDivElement>, 'onChange'> {
    defaultActiveKey?: string;
    activeKey?: string;
    onChange?: (key: string) => void;
    variant?: NavsTabsVariant;
    orientation?: NavsTabsOrientation;
    justified?: boolean;
    fill?: boolean;
    children?: ReactNode;
}
export interface NavsTabsListProps extends HTMLAttributes<HTMLDivElement> {
    label?: string;
    children?: ReactNode;
}
export interface NavsTabsTabProps extends Omit<AnchorHTMLAttributes<HTMLAnchorElement>, 'onChange'> {
    tabKey: string;
    disabled?: boolean;
    children?: ReactNode;
}
export interface NavsTabsPanelProps extends HTMLAttributes<HTMLDivElement> {
    tabKey: string;
    children?: ReactNode;
}
export declare const NavsTabs: ({ defaultActiveKey, activeKey, onChange, variant, orientation, justified, fill, children, className, ...props }: NavsTabsProps) => import("react").JSX.Element;
export declare const NavsTabsList: ({ label, children, className, ...props }: NavsTabsListProps) => import("react").JSX.Element;
export declare const NavsTabsTab: ({ tabKey, disabled, children, className, onClick, onFocus, ...props }: NavsTabsTabProps) => import("react").JSX.Element;
export declare const NavsTabsPanel: ({ tabKey, children, className, ...props }: NavsTabsPanelProps) => import("react").JSX.Element;
