import { type HTMLAttributes, type ReactNode } from 'react';
export interface AccordionItemData {
    id: string;
    title: ReactNode;
    content: ReactNode;
    disabled?: boolean;
}
export interface AccordionProps extends HTMLAttributes<HTMLDivElement> {
    items: AccordionItemData[];
    defaultOpen?: string | string[];
    openItems?: string[];
    onOpenItemsChange?: (openItems: string[]) => void;
    allowMultiple?: boolean;
    flush?: boolean;
    headingLevel?: 2 | 3 | 4 | 5 | 6;
}
export declare const Accordion: ({ items, defaultOpen, openItems, onOpenItemsChange, allowMultiple, flush, headingLevel, className, ...props }: AccordionProps) => import("react").JSX.Element;
