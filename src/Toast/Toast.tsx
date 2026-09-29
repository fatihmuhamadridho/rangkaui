import { createContext, useContext, useEffect, useId, useState, type ButtonHTMLAttributes, type HTMLAttributes, type ReactNode } from "react";

import styles from "./Toast.module.css";

export type ToastVariant = "primary" | "secondary" | "success" | "danger" | "warning" | "info" | "light" | "dark";
export type ToastPlacement = "top-start" | "top-center" | "top-end" | "middle-start" | "middle-center" | "middle-end" | "bottom-start" | "bottom-center" | "bottom-end";

interface ToastContextValue {
  titleId: string;
  close: () => void;
}

const ToastContext = createContext<ToastContextValue | null>(null);

export interface ToastProps extends Omit<HTMLAttributes<HTMLDivElement>, "title"> {
  title?: ReactNode;
  variant?: ToastVariant;
  autohide?: boolean;
  delay?: number;
  open?: boolean;
  defaultOpen?: boolean;
  onOpenChange?: (open: boolean) => void;
  onClose?: () => void;
  closeButton?: boolean;
  children?: ReactNode;
}

export interface ToastContainerProps extends HTMLAttributes<HTMLDivElement> {
  placement?: ToastPlacement;
  stacked?: boolean;
  children?: ReactNode;
}

export interface ToastCloseProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  children?: ReactNode;
}

function joinClasses(...classes: Array<string | false | undefined>) {
  return classes.filter(Boolean).join(" ");
}

const placementClasses: Record<ToastPlacement, string> = {
  "top-start": styles.topstart,
  "top-center": styles.topcenter,
  "top-end": styles.topend,
  "middle-start": styles.middlestart,
  "middle-center": styles.middlecenter,
  "middle-end": styles.middleend,
  "bottom-start": styles.bottomstart,
  "bottom-center": styles.bottomcenter,
  "bottom-end": styles.bottomend,
};

function useToastContext() {
  const context = useContext(ToastContext);
  if (!context) throw new Error("ToastClose must be rendered inside Toast.");
  return context;
}

export function Toast({
  title,
  variant = "light",
  autohide = false,
  delay = 5000,
  open,
  defaultOpen = true,
  onOpenChange,
  onClose,
  closeButton = true,
  children,
  className = "",
  ...props
}: ToastProps) {
  const generatedId = useId().replace(/:/g, "");
  const [internalOpen, setInternalOpen] = useState(defaultOpen);
  const isControlled = open !== undefined;
  const isOpen = isControlled ? open : internalOpen;

  const close = () => {
    if (!isControlled) setInternalOpen(false);
    onOpenChange?.(false);
    onClose?.();
  };

  useEffect(() => {
    if (!isOpen || !autohide || delay <= 0) return;
    const timeout = window.setTimeout(close, delay);
    return () => window.clearTimeout(timeout);
  }, [isOpen, autohide, delay, isControlled, onOpenChange, onClose]);

  if (!isOpen) return null;

  return (
    <ToastContext.Provider value={{ titleId: `${generatedId}-title`, close }}>
      <div
        {...props}
        className={joinClasses(styles.toast, styles[variant], className)}
        role="status"
        aria-live={variant === "danger" ? "assertive" : "polite"}
        aria-atomic="true"
      >
        <div className={styles.header}>
          {title !== undefined && <strong id={`${generatedId}-title`} className={styles.title}>{title}</strong>}
          {closeButton && <ToastClose aria-label="Close notification" />}
        </div>
        {children !== undefined && <div className={styles.body}>{children}</div>}
      </div>
    </ToastContext.Provider>
  );
}

export function ToastClose({ children, className = "", onClick, type = "button", ...props }: ToastCloseProps) {
  const { close } = useToastContext();
  return (
    <button
      {...props}
      type={type}
      className={joinClasses(styles.close, className)}
      onClick={(event) => {
        onClick?.(event);
        if (!event.defaultPrevented) close();
      }}
    >
      {children ?? <svg aria-hidden="true" viewBox="0 0 16 16"><path d="m3 3 10 10M13 3 3 13" fill="none" stroke="currentColor" strokeLinecap="round" strokeWidth="1.5" /></svg>}
    </button>
  );
}

export function ToastContainer({ placement = "top-end", stacked = false, children, className = "", ...props }: ToastContainerProps) {
  return (
    <div
      {...props}
      className={joinClasses(styles.container, placementClasses[placement], stacked && styles.stacked, className)}
      aria-label="Notifications"
    >
      {children}
    </div>
  );
}
