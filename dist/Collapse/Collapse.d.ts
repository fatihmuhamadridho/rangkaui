import { type ButtonHTMLAttributes, type HTMLAttributes, type ReactNode } from 'react';
export interface CollapseProps extends HTMLAttributes<HTMLDivElement> {
    open?: boolean;
    defaultOpen?: boolean;
    onOpenChange?: (open: boolean) => void;
    horizontal?: boolean;
    panelId?: string;
    children?: ReactNode;
}
export interface CollapseTriggerProps extends ButtonHTMLAttributes<HTMLButtonElement> {
    children?: ReactNode;
}
export interface CollapsePanelProps extends HTMLAttributes<HTMLDivElement> {
    children?: ReactNode;
}
export declare function Collapse({ open, defaultOpen, onOpenChange, horizontal, panelId, children, className, ...props }: CollapseProps): import("react").JSX.Element;
export declare function CollapseTrigger({ children, className, type, onClick, ...props }: CollapseTriggerProps): import("react").JSX.Element;
export declare function CollapsePanel({ children, className, ...props }: CollapsePanelProps): import("react").JSX.Element;
