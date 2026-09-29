import { createContext, useContext, useEffect, useId, useRef, useState, type ButtonHTMLAttributes, type HTMLAttributes, type KeyboardEvent as ReactKeyboardEvent, type ReactNode } from "react";
import { createPortal } from "react-dom";

import styles from "./Modal.module.css";

export type ModalSize = "sm" | "md" | "lg" | "xl" | "fullscreen";

interface ModalContextValue {
  open: boolean;
  setOpen: (open: boolean) => void;
  titleId: string;
  descriptionId: string;
  closeOnEscape: boolean;
  closeOnBackdrop: boolean;
}

const ModalContext = createContext<ModalContextValue | null>(null);

export interface ModalProps {
  open?: boolean;
  defaultOpen?: boolean;
  onOpenChange?: (open: boolean) => void;
  closeOnEscape?: boolean;
  closeOnBackdrop?: boolean;
  children?: ReactNode;
}

export interface ModalTriggerProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  children?: ReactNode;
}

export interface ModalCloseProps extends ModalTriggerProps {
  variant?: "primary" | "secondary";
}

export interface ModalContentProps extends HTMLAttributes<HTMLDivElement> {
  size?: ModalSize;
  centered?: boolean;
  scrollable?: boolean;
  showCloseButton?: boolean;
  children?: ReactNode;
}

export interface ModalSectionProps extends HTMLAttributes<HTMLDivElement> {
  children?: ReactNode;
}

export interface ModalTitleProps extends HTMLAttributes<HTMLHeadingElement> {
  as?: "h1" | "h2" | "h3" | "h4" | "h5" | "h6";
  children?: ReactNode;
}

export interface ModalDescriptionProps extends HTMLAttributes<HTMLParagraphElement> {
  children?: ReactNode;
}

function useModalContext() {
  const context = useContext(ModalContext);
  if (!context) throw new Error("ModalTrigger and ModalContent must be rendered inside Modal.");
  return context;
}

function joinClasses(...classes: Array<string | false | undefined>) {
  return classes.filter(Boolean).join(" ");
}

export function Modal({
  open,
  defaultOpen = false,
  onOpenChange,
  closeOnEscape = true,
  closeOnBackdrop = true,
  children,
}: ModalProps) {
  const generatedId = useId().replace(/:/g, "");
  const [internalOpen, setInternalOpen] = useState(defaultOpen);
  const isControlled = open !== undefined;
  const expanded = isControlled ? open : internalOpen;
  const setOpen = (nextOpen: boolean) => {
    if (!isControlled) setInternalOpen(nextOpen);
    onOpenChange?.(nextOpen);
  };

  return (
    <ModalContext.Provider value={{
      open: expanded,
      setOpen,
      titleId: `${generatedId}-title`,
      descriptionId: `${generatedId}-description`,
      closeOnEscape,
      closeOnBackdrop,
    }}>
      {children}
    </ModalContext.Provider>
  );
}

export function ModalTrigger({ children = "Open modal", className = "", type = "button", onClick, ...props }: ModalTriggerProps) {
  const { open, setOpen } = useModalContext();
  return (
    <button
      {...props}
      type={type}
      className={joinClasses(styles.trigger, className)}
      aria-haspopup="dialog"
      aria-expanded={open}
      onClick={(event) => {
        onClick?.(event);
        if (!event.defaultPrevented) setOpen(true);
      }}
    >
      {children}
    </button>
  );
}

export function ModalContent({
  size = "md",
  centered = false,
  scrollable = false,
  showCloseButton = true,
  children,
  className = "",
  onKeyDown,
  onMouseDown,
  "aria-label": ariaLabel,
  ...props
}: ModalContentProps) {
  const { open, setOpen, titleId, descriptionId, closeOnEscape, closeOnBackdrop } = useModalContext();
  const [mounted, setMounted] = useState(false);
  const dialogRef = useRef<HTMLDivElement>(null);

  useEffect(() => setMounted(true), []);

  useEffect(() => {
    if (!open || !mounted || typeof document === "undefined") return;

    const previousFocus = document.activeElement instanceof HTMLElement ? document.activeElement : null;
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    const frame = window.requestAnimationFrame(() => {
      const firstFocusable = dialogRef.current?.querySelector<HTMLElement>(
        '[autofocus], button:not(:disabled), [href], input:not(:disabled), select:not(:disabled), textarea:not(:disabled), [tabindex]:not([tabindex="-1"])',
      );
      (firstFocusable ?? dialogRef.current)?.focus();
    });

    return () => {
      window.cancelAnimationFrame(frame);
      document.body.style.overflow = previousOverflow;
      previousFocus?.focus();
    };
  }, [open, mounted]);

  const handleKeyDown = (event: ReactKeyboardEvent<HTMLDivElement>) => {
    onKeyDown?.(event);
    if (event.defaultPrevented) return;

    if (event.key === "Escape" && closeOnEscape) {
      event.preventDefault();
      setOpen(false);
      return;
    }

    if (event.key !== "Tab") return;
    const focusable = Array.from(dialogRef.current?.querySelectorAll<HTMLElement>(
      'button:not(:disabled), [href], input:not(:disabled), select:not(:disabled), textarea:not(:disabled), [tabindex]:not([tabindex="-1"])',
    ) ?? []);
    if (!focusable.length) {
      event.preventDefault();
      dialogRef.current?.focus();
      return;
    }

    const first = focusable[0];
    const last = focusable[focusable.length - 1];
    if (event.shiftKey && document.activeElement === first) {
      event.preventDefault();
      last.focus();
    } else if (!event.shiftKey && document.activeElement === last) {
      event.preventDefault();
      first.focus();
    }
  };

  if (!open || !mounted || typeof document === "undefined") return null;

  return createPortal(
    <div
      className={joinClasses(styles.backdrop, centered && styles.centered)}
      onMouseDown={(event) => {
        onMouseDown?.(event);
        if (!event.defaultPrevented && closeOnBackdrop && event.target === event.currentTarget) setOpen(false);
      }}
    >
      <div
        {...props}
        ref={dialogRef}
        className={joinClasses(styles.dialog, styles[size], scrollable && styles.scrollable, className)}
        role="dialog"
        aria-modal="true"
        aria-labelledby={ariaLabel ? undefined : titleId}
        aria-label={ariaLabel}
        aria-describedby={descriptionId}
        tabIndex={-1}
        onKeyDown={handleKeyDown}
      >
        {showCloseButton && <ModalClose className={styles.closeButton} aria-label="Close dialog" />}
        {children}
      </div>
    </div>,
    document.body,
  );
}

export function ModalHeader({ children, className = "", ...props }: ModalSectionProps) {
  return <div className={joinClasses(styles.header, className)} {...props}>{children}</div>;
}

export function ModalTitle({ as: Heading = "h2", children, className = "", ...props }: ModalTitleProps) {
  const { titleId } = useModalContext();
  return <Heading {...props} id={titleId} className={joinClasses(styles.title, className)}>{children}</Heading>;
}

export function ModalDescription({ children, className = "", ...props }: ModalDescriptionProps) {
  const { descriptionId } = useModalContext();
  return <p {...props} id={descriptionId} className={joinClasses(styles.description, className)}>{children}</p>;
}

export function ModalBody({ children, className = "", ...props }: ModalSectionProps) {
  return <div className={joinClasses(styles.body, className)} {...props}>{children}</div>;
}

export function ModalFooter({ children, className = "", ...props }: ModalSectionProps) {
  return <div className={joinClasses(styles.footer, className)} {...props}>{children}</div>;
}

export function ModalClose({ children, variant = "secondary", className = "", type = "button", onClick, ...props }: ModalCloseProps) {
  const { setOpen } = useModalContext();
  const closeClass = children === undefined ? styles.close : joinClasses(styles.actionClose, styles[`action${variant}`]);
  return (
    <button
      {...props}
      type={type}
      className={joinClasses(closeClass, className)}
      onClick={(event) => {
        onClick?.(event);
        if (!event.defaultPrevented) setOpen(false);
      }}
    >
      {children ?? <svg aria-hidden="true" viewBox="0 0 16 16"><path d="m3 3 10 10M13 3 3 13" fill="none" stroke="currentColor" strokeLinecap="round" strokeWidth="1.5" /></svg>}
    </button>
  );
}
