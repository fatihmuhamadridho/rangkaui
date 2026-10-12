import type { AnchorHTMLAttributes, HTMLAttributes, ImgHTMLAttributes, ReactNode } from 'react';
export type CardVariant = 'primary' | 'secondary' | 'success' | 'danger' | 'warning' | 'info' | 'light' | 'dark';
export type CardGroupLayout = 'group' | 'grid';
export interface CardProps extends HTMLAttributes<HTMLDivElement> {
    variant?: CardVariant;
    outline?: boolean;
    shadow?: boolean;
    horizontal?: boolean;
    children?: ReactNode;
}
export interface CardSectionProps extends HTMLAttributes<HTMLDivElement> {
    children?: ReactNode;
}
export interface CardHeadingProps extends HTMLAttributes<HTMLHeadingElement> {
    as?: 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6';
    children?: ReactNode;
}
export interface CardImageProps extends ImgHTMLAttributes<HTMLImageElement> {
    placement?: 'top' | 'bottom';
}
export interface CardGroupProps extends HTMLAttributes<HTMLDivElement> {
    layout?: CardGroupLayout;
    columns?: number;
    children?: ReactNode;
}
export declare function Card({ variant, outline, shadow, horizontal, className, children, ...props }: CardProps): import("react").JSX.Element;
export declare function CardHeader({ children, className, ...props }: CardSectionProps): import("react").JSX.Element;
export declare function CardBody({ children, className, ...props }: CardSectionProps): import("react").JSX.Element;
export declare function CardFooter({ children, className, ...props }: CardSectionProps): import("react").JSX.Element;
export declare function CardTitle({ as: Heading, children, className, ...props }: CardHeadingProps): import("react").JSX.Element;
export declare function CardSubtitle({ as: Heading, children, className, ...props }: CardHeadingProps): import("react").JSX.Element;
export declare function CardText({ children, className, ...props }: HTMLAttributes<HTMLParagraphElement>): import("react").JSX.Element;
export declare function CardLink({ children, className, ...props }: AnchorHTMLAttributes<HTMLAnchorElement>): import("react").JSX.Element;
export declare function CardImage({ placement, className, ...props }: CardImageProps): import("react").JSX.Element;
export declare function CardImageOverlay({ children, className, ...props }: CardSectionProps): import("react").JSX.Element;
export declare function CardListGroup({ children, className, ...props }: HTMLAttributes<HTMLUListElement>): import("react").JSX.Element;
export declare function CardListGroupItem({ children, className, ...props }: HTMLAttributes<HTMLLIElement>): import("react").JSX.Element;
export declare function CardGroup({ layout, columns, children, className, style, ...props }: CardGroupProps): import("react").JSX.Element;
