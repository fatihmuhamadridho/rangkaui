import type { HTMLAttributes, ReactNode } from 'react';
export interface BreadcrumbItemData {
    label: ReactNode;
    href?: string;
    id?: string;
}
export interface BreadcrumbProps extends HTMLAttributes<HTMLElement> {
    items: BreadcrumbItemData[];
    divider?: string;
}
export declare function Breadcrumb({ items, divider, className, 'aria-label': ariaLabel, style, ...props }: BreadcrumbProps): import("react").JSX.Element;
