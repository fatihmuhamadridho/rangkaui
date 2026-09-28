import * as react from 'react';
import { ButtonHTMLAttributes, ReactNode, HTMLAttributes } from 'react';

type ButtonVariant = "standard" | "primary" | "secondary" | "base" | "outline-primary" | "outline-secondary" | "link" | "success" | "danger" | "warning" | "info" | "light" | "dark" | "outline-success" | "outline-danger" | "outline-warning" | "outline-info" | "outline-light" | "outline-dark";
type ButtonSize = "small" | "medium" | "large";
interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
    variant?: ButtonVariant;
    size?: ButtonSize;
    iconOnly?: boolean;
    children?: ReactNode;
}
declare function Button({ variant, size, iconOnly, className, type, children, ...props }: ButtonProps): react.JSX.Element;

interface BoxProps extends HTMLAttributes<HTMLDivElement> {
    children?: ReactNode;
    padded?: boolean;
    bordered?: boolean;
    rounded?: boolean;
    shadow?: boolean;
}
declare function Box({ children, className, padded, bordered, rounded, shadow, ...props }: BoxProps): react.JSX.Element;

interface PaginationProps {
    currentPage: number;
    totalItems: number;
    pageSize: number;
    onPageChange: (page: number) => void;
    onPageSizeChange: (pageSize: number) => void;
    pageSizeOptions?: number[];
    className?: string;
}
declare function Pagination({ currentPage, totalItems, pageSize, onPageChange, onPageSizeChange, pageSizeOptions, className, }: PaginationProps): react.JSX.Element;

export { Box, type BoxProps, Button, type ButtonProps, type ButtonSize, type ButtonVariant, Pagination, type PaginationProps };
