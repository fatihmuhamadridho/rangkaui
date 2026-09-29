import { useState, type HTMLAttributes, type ReactNode } from "react";

import styles from "./Alert.module.css";

export type AlertVariant = "primary" | "secondary" | "success" | "danger" | "warning" | "info" | "light" | "dark";

export interface AlertProps extends Omit<HTMLAttributes<HTMLDivElement>, "title"> {
  variant?: AlertVariant;
  dismissible?: boolean;
  onClose?: () => void;
  icon?: ReactNode;
  title?: ReactNode;
  children?: ReactNode;
}

const variants: Record<AlertVariant, string> = {
  primary: styles.primary,
  secondary: styles.secondary,
  success: styles.success,
  danger: styles.danger,
  warning: styles.warning,
  info: styles.info,
  light: styles.light,
  dark: styles.dark,
};

function CloseIcon() {
  return (
    <svg aria-hidden="true" viewBox="0 0 16 16" className={styles.closeIcon}>
      <path d="m3 3 10 10M13 3 3 13" fill="none" stroke="currentColor" strokeLinecap="round" strokeWidth="1.5" />
    </svg>
  );
}

export function Alert({
  variant = "primary",
  dismissible = false,
  onClose,
  icon,
  title,
  children,
  className = "",
  role = "alert",
  ...props
}: AlertProps) {
  const [isVisible, setIsVisible] = useState(true);

  if (!isVisible) return null;

  const close = () => {
    setIsVisible(false);
    onClose?.();
  };

  return (
    <div
      className={[styles.alert, variants[variant], dismissible && styles.dismissible, className].filter(Boolean).join(" ")}
      role={role}
      {...props}
    >
      {icon && <span className={styles.icon} aria-hidden="true">{icon}</span>}
      <div className={styles.content}>
        {title && <div className={styles.title}>{title}</div>}
        {children}
      </div>
      {dismissible && (
        <button type="button" className={styles.closeButton} aria-label="Close alert" onClick={close}>
          <CloseIcon />
        </button>
      )}
    </div>
  );
}
