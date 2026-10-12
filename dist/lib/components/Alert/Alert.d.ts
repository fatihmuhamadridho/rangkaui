import { type HTMLAttributes, type ReactNode } from 'react';
export type AlertVariant = 'primary' | 'secondary' | 'success' | 'danger' | 'warning' | 'info' | 'light' | 'dark';
export interface AlertProps extends Omit<HTMLAttributes<HTMLDivElement>, 'title'> {
    variant?: AlertVariant;
    dismissible?: boolean;
    onClose?: () => void;
    icon?: ReactNode;
    title?: ReactNode;
    children?: ReactNode;
}
export declare const Alert: ({ variant, dismissible, onClose, icon, title, children, className, role, ...props }: AlertProps) => import("react").JSX.Element | null;
