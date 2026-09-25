import type { ButtonHTMLAttributes, ReactNode } from "react";

import styles from "./Button.module.css";

export type ButtonVariant =
  | "standard"
  | "primary"
  | "secondary"
  | "base"
  | "outline-primary"
  | "outline-secondary"
  | "link"
  | "success"
  | "danger"
  | "warning"
  | "info"
  | "light"
  | "dark"
  | "outline-success"
  | "outline-danger"
  | "outline-warning"
  | "outline-info"
  | "outline-light"
  | "outline-dark";

export type ButtonSize = "small" | "medium" | "large";

export interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ButtonVariant;
  size?: ButtonSize;
  iconOnly?: boolean;
  children?: ReactNode;
}

const sizes: Record<ButtonSize, string> = {
  small: styles.small,
  medium: styles.medium,
  large: styles.large,
};

const iconSizes: Record<ButtonSize, string> = {
  small: styles.iconSmall,
  medium: styles.iconMedium,
  large: styles.iconLarge,
};

const variants: Record<ButtonVariant, string> = {
  standard: styles.primary,
  primary: styles.primary,
  secondary: styles.secondary,
  base: styles.base,
  "outline-primary": styles.outlinePrimary,
  "outline-secondary": styles.outlineSecondary,
  link: styles.link,
  success: styles.success,
  danger: styles.danger,
  warning: styles.warning,
  info: styles.info,
  light: styles.light,
  dark: styles.dark,
  "outline-success": styles.outlineSuccess,
  "outline-danger": styles.outlineDanger,
  "outline-warning": styles.outlineWarning,
  "outline-info": styles.outlineInfo,
  "outline-light": styles.outlineLight,
  "outline-dark": styles.outlineDark,
};

export function Button({
  variant = "primary",
  size = "medium",
  iconOnly = false,
  className = "",
  type = "button",
  children = "Button Title",
  ...props
}: ButtonProps) {
  return (
    <button
      type={type}
      className={`${styles.button} ${iconOnly ? iconSizes[size] : sizes[size]} ${variants[variant]} ${className}`}
      {...props}
    >
      {children}
    </button>
  );
}
