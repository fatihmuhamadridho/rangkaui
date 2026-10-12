import { type HTMLAttributes, type ImgHTMLAttributes, type ReactNode } from 'react';
export type AvatarSize = 'xs' | 'sm' | 'md' | 'lg' | 'xl' | number;
export type AvatarShape = 'circle' | 'square';
export type AvatarVariant = 'neutral' | 'primary' | 'orange' | 'success' | 'danger';
export type AvatarStatus = 'online' | 'offline' | 'busy' | 'away';
export interface AvatarProps extends Omit<HTMLAttributes<HTMLSpanElement>, 'children'> {
    src?: string;
    alt?: string;
    name?: string;
    initials?: string;
    size?: AvatarSize;
    shape?: AvatarShape;
    variant?: AvatarVariant;
    badge?: ReactNode;
    dot?: boolean;
    status?: AvatarStatus;
    children?: ReactNode;
    imageProps?: Omit<ImgHTMLAttributes<HTMLImageElement>, 'src' | 'alt'>;
}
export interface AvatarGroupProps extends HTMLAttributes<HTMLDivElement> {
    max?: number;
    size?: AvatarSize;
    children?: ReactNode;
}
export declare const Avatar: ({ src, alt, name, initials, size, shape, variant, badge, dot, status, children, imageProps, className, style, ...props }: AvatarProps) => import("react").JSX.Element;
export declare const AvatarGroup: ({ children, max, size, className, ...props }: AvatarGroupProps) => import("react").JSX.Element;
