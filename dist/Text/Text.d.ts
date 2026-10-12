import { type ElementType, type HTMLAttributes, type ReactNode } from 'react';
export type TextVariant = 'body' | 'lead' | 'small' | 'muted' | 'bold' | 'italic' | 'mark' | 'deleted' | 'inserted' | 'subscript' | 'superscript' | 'code' | 'keyboard';
export type HeadingLevel = 1 | 2 | 3 | 4 | 5 | 6;
interface TextOwnProps {
    as?: ElementType;
    variant?: TextVariant;
    align?: 'start' | 'center' | 'end';
    truncate?: boolean;
    children?: ReactNode;
}
export type TextProps = TextOwnProps & HTMLAttributes<HTMLElement>;
export declare function Text({ as, variant, align, truncate, children, className, ...props }: TextProps): import("react").ReactElement<any, string | import("react").JSXElementConstructor<any>>;
export interface HeadingProps extends HTMLAttributes<HTMLHeadingElement> {
    level?: HeadingLevel;
    visualLevel?: HeadingLevel;
    children?: ReactNode;
}
export declare function Heading({ level, visualLevel, children, className, ...props }: HeadingProps): import("react").JSX.Element;
export interface DisplayProps extends HTMLAttributes<HTMLHeadingElement> {
    level?: HeadingLevel;
    children?: ReactNode;
}
export declare function Display({ level, children, className, ...props }: DisplayProps): import("react").JSX.Element;
export interface LeadProps extends HTMLAttributes<HTMLParagraphElement> {
    children?: ReactNode;
}
export declare function Lead({ children, className, ...props }: LeadProps): import("react").JSX.Element;
export interface BlockquoteProps extends HTMLAttributes<HTMLQuoteElement> {
    cite?: string;
    footer?: ReactNode;
    align?: 'start' | 'center' | 'end';
    children?: ReactNode;
}
export declare function Blockquote({ cite, footer, align, children, className, ...props }: BlockquoteProps): import("react").JSX.Element;
export interface TextListProps extends HTMLAttributes<HTMLOListElement> {
    as?: 'ul' | 'ol';
    unstyled?: boolean;
    inline?: boolean;
    children?: ReactNode;
}
export declare function TextList({ as, unstyled, inline, children, className, ...props }: TextListProps): import("react").JSX.Element;
export interface DescriptionListProps extends HTMLAttributes<HTMLDListElement> {
    horizontal?: boolean;
    children?: ReactNode;
}
export declare function DescriptionList({ horizontal, children, className, ...props }: DescriptionListProps): import("react").JSX.Element;
export declare function DescriptionTerm({ children, className, ...props }: HTMLAttributes<HTMLElement>): import("react").JSX.Element;
export declare function DescriptionDetails({ children, className, ...props }: HTMLAttributes<HTMLElement>): import("react").JSX.Element;
export {};
