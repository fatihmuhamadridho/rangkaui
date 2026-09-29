import { createContext, useContext, useEffect, useId, useRef, useState, type ButtonHTMLAttributes, type HTMLAttributes, type ReactNode } from "react";

import styles from "./Popover.module.css";

export type PopoverPlacement = "top" | "right" | "bottom" | "left";
export type PopoverTriggerMode = "click" | "hover" | "focus" | "manual";

interface PopoverContextValue {
  open: boolean;
  setOpen: (open: boolean) => void;
  toggle: () => void;
  contentId: string;
  titleId: string;
  triggerRef: React.RefObject<HTMLButtonElement | null>;
  contentRef: React.RefObject<HTMLDivElement | null>;
  placement: PopoverPlacement;
  triggerMode: PopoverTriggerMode;
}

const PopoverContext = createContext<PopoverContextValue | null>(null);

export interface PopoverProps extends HTMLAttributes<HTMLDivElement> {
  open?: boolean;
  defaultOpen?: boolean;
  onOpenChange?: (open: boolean) => void;
  placement?: PopoverPlacement;
  trigger?: PopoverTriggerMode;
}

export interface PopoverTriggerProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  children?: ReactNode;
}

export interface PopoverContentProps extends Omit<HTMLAttributes<HTMLDivElement>, "title"> {
  title?: ReactNode;
  children?: ReactNode;
}

function joinClasses(...classes: Array<string | false | undefined>) {
  return classes.filter(Boolean).join(" ");
}

function usePopoverContext() {
  const context = useContext(PopoverContext);
  if (!context) throw new Error("PopoverTrigger and PopoverContent must be rendered inside Popover.");
  return context;
}

export function Popover({
  open,
  defaultOpen = false,
  onOpenChange,
  placement = "top",
  trigger = "click",
  children,
  className = "",
  onKeyDown,
  ...props
}: PopoverProps) {
  const generatedId = useId().replace(/:/g, "");
  const [internalOpen, setInternalOpen] = useState(defaultOpen);
  const rootRef = useRef<HTMLDivElement>(null);
  const triggerRef = useRef<HTMLButtonElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const isControlled = open !== undefined;
  const isOpen = isControlled ? open : internalOpen;

  const setOpen = (nextOpen: boolean) => {
    if (!isControlled) setInternalOpen(nextOpen);
    onOpenChange?.(nextOpen);
  };

  useEffect(() => {
    if (!isOpen) return;
    const handlePointerDown = (event: PointerEvent) => {
      if (!rootRef.current?.contains(event.target as Node)) setOpen(false);
    };
    const handleDocumentKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setOpen(false);
        triggerRef.current?.focus();
      }
    };
    document.addEventListener("pointerdown", handlePointerDown);
    document.addEventListener("keydown", handleDocumentKeyDown);
    return () => {
      document.removeEventListener("pointerdown", handlePointerDown);
      document.removeEventListener("keydown", handleDocumentKeyDown);
    };
  }, [isOpen, isControlled, onOpenChange]);

  return (
    <PopoverContext.Provider value={{
      open: isOpen,
      setOpen,
      toggle: () => setOpen(!isOpen),
      contentId: `${generatedId}-content`,
      titleId: `${generatedId}-title`,
      triggerRef,
      contentRef,
      placement,
      triggerMode: trigger,
    }}>
      <div
        {...props}
        ref={rootRef}
        className={joinClasses(styles.root, styles[placement], className)}
        onKeyDown={(event) => {
          onKeyDown?.(event);
          if (!event.defaultPrevented && event.key === "Escape" && isOpen) {
            setOpen(false);
            triggerRef.current?.focus();
          }
        }}
      >
        {children}
      </div>
    </PopoverContext.Provider>
  );
}

export function PopoverTrigger({
  children = "Toggle popover",
  className = "",
  type = "button",
  onClick,
  onMouseEnter,
  onMouseLeave,
  onFocus,
  onBlur,
  ...props
}: PopoverTriggerProps) {
  const { open, setOpen, toggle, contentId, triggerRef, contentRef, triggerMode } = usePopoverContext();

  return (
    <button
      {...props}
      ref={triggerRef}
      type={type}
      className={joinClasses(styles.trigger, className)}
      aria-haspopup="dialog"
      aria-expanded={open}
      aria-controls={contentId}
      aria-describedby={open ? contentId : undefined}
      onClick={(event) => {
        onClick?.(event);
        if (!event.defaultPrevented && triggerMode === "click") toggle();
      }}
      onMouseEnter={(event) => {
        onMouseEnter?.(event);
        if (triggerMode === "hover") setOpen(true);
      }}
      onMouseLeave={(event) => {
        onMouseLeave?.(event);
        if (triggerMode === "hover" && !contentRef.current?.matches(":hover")) setOpen(false);
      }}
      onFocus={(event) => {
        onFocus?.(event);
        if (triggerMode === "focus") setOpen(true);
      }}
      onBlur={(event) => {
        onBlur?.(event);
        if (triggerMode === "focus" && !contentRef.current?.contains(event.relatedTarget as Node)) setOpen(false);
      }}
    >
      {children}
    </button>
  );
}

export function PopoverContent({
  title,
  children,
  className = "",
  onMouseEnter,
  onMouseLeave,
  ...props
}: PopoverContentProps) {
  const { open, setOpen, contentId, titleId, contentRef, triggerMode } = usePopoverContext();
  if (!open) return null;

  return (
    <div
      {...props}
      ref={contentRef}
      id={contentId}
      className={joinClasses(styles.content, className)}
      role="dialog"
      aria-labelledby={title !== undefined ? titleId : undefined}
      onMouseEnter={(event) => {
        onMouseEnter?.(event);
        if (triggerMode === "hover") setOpen(true);
      }}
      onMouseLeave={(event) => {
        onMouseLeave?.(event);
        if (triggerMode === "hover" && !event.currentTarget.parentElement?.matches(":hover")) setOpen(false);
      }}
    >
      <span className={styles.arrow} aria-hidden="true" />
      {title !== undefined && <div id={titleId} className={styles.header}>{title}</div>}
      <div className={styles.body}>{children}</div>
    </div>
  );
}
