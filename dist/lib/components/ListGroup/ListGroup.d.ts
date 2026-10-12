import { type HTMLAttributes, type ReactNode } from 'react';
export type ListGroupElement = 'div' | 'ul' | 'ol';
export type ListGroupVariant = 'primary' | 'secondary' | 'success' | 'danger' | 'warning' | 'info' | 'light' | 'dark';
export interface ListGroupProps extends HTMLAttributes<HTMLElement> {
    as?: ListGroupElement;
    flush?: boolean;
    horizontal?: boolean;
    numbered?: boolean;
    children?: ReactNode;
}
export interface ListGroupItemProps extends HTMLAttributes<HTMLElement> {
    href?: string;
    target?: string;
    rel?: string;
    button?: boolean;
    active?: boolean;
    disabled?: boolean;
    action?: boolean;
    variant?: ListGroupVariant;
    badge?: ReactNode;
    children?: ReactNode;
}
export declare const ListGroup: ({ as: Element, flush, horizontal, numbered, children, className, ...props }: ListGroupProps) => import("react").JSX.Element;
export declare const ListGroupItem: ({ href, target, rel, button, active, disabled, action, variant, badge, children, className, onClick, ...props }: ListGroupItemProps) => import("react").JSX.Element;
