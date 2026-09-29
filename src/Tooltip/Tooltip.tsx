import { createContext, useContext, useEffect, useId, useRef, useState, type AnchorHTMLAttributes, type ButtonHTMLAttributes, type HTMLAttributes, type ReactNode } from "react";

import styles from "./Tooltip.module.css";

export type TooltipPlacement = "top" | "right" | "bottom" | "left";
export type TooltipTriggerMode = "hover" | "focus" | "click" | "manual";

interface TooltipContextValue {
  open: boolean;
  setOpen: (open: boolean) => void;
  toggle: () => void;
  tooltipId: string;
  triggerRef: React.RefObject<HTMLElement | null>;
  contentRef: React.RefObject<HTMLDivElement | null>;
  triggerMode: TooltipTriggerMode;
}

const TooltipContext = createContext<TooltipContextValue | null>(null);

export interface TooltipProps extends Omit<HTMLAttributes<HTMLDivElement>, "content"> {
  content: ReactNode;
  placement?: TooltipPlacement;
  trigger?: TooltipTriggerMode;
  open?: boolean;
  defaultOpen?: boolean;
  onOpenChange?: (open: boolean) => void;
  interactive?: boolean;
  children?: ReactNode;
}

export interface TooltipTriggerProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  children?: ReactNode;
}

export interface TooltipLinkProps extends AnchorHTMLAttributes<HTMLAnchorElement> {
  children?: ReactNode;
}

function joinClasses(...classes: Array<string | false | undefined>) {
  return classes.filter(Boolean).join(" ");
}

const placementClasses: Record<TooltipPlacement, string> = {
  top: styles.top,
  right: styles.right,
  bottom: styles.bottom,
  left: styles.left,
};

function useTooltipContext() {
  const context = useContext(TooltipContext);
  if (!context) throw new Error("TooltipTrigger and TooltipContent must be rendered inside Tooltip.");
  return context;
}

export function Tooltip({
  content,
  placement = "top",
  trigger = "hover",
  open,
  defaultOpen = false,
  onOpenChange,
  interactive = false,
  children,
  className = "",
  ...props
}: TooltipProps) {
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
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setOpen(false);
        triggerRef.current?.focus();
      }
    };
    document.addEventListener("pointerdown", handlePointerDown);
    document.addEventListener("keydown", handleKeyDown);
    return () => {
      document.removeEventListener("pointerdown", handlePointerDown);
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [isOpen, isControlled, onOpenChange]);

  return (
    <TooltipContext.Provider value={{ open: isOpen, setOpen, toggle: () => setOpen(!isOpen), tooltipId: `${generatedId}-tooltip`, triggerRef, contentRef, triggerMode: trigger }}>
      <div {...props} ref={rootRef} className={joinClasses(styles.root, placementClasses[placement], interactive && styles.interactive, className)}>
        {children}
        {isOpen && <div ref={contentRef} id={`${generatedId}-tooltip`} className={styles.content} role="tooltip">{content}<span className={styles.arrow} aria-hidden="true" /></div>}
      </div>
    </TooltipContext.Provider>
  );
}

export function TooltipTrigger({
  children = "Show tooltip",
  className = "",
  type = "button",
  onClick,
  onMouseEnter,
  onMouseLeave,
  onFocus,
  onBlur,
  ...props
}: TooltipTriggerProps) {
  const { open, setOpen, toggle, tooltipId, triggerRef, contentRef, triggerMode } = useTooltipContext();

  return (
    <button
      {...props}
      ref={(node) => { triggerRef.current = node; }}
      type={type}
      className={joinClasses(styles.trigger, className)}
      aria-describedby={open ? tooltipId : undefined}
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
        if (triggerMode === "focus" || triggerMode === "hover") setOpen(true);
      }}
      onBlur={(event) => {
        onBlur?.(event);
        if ((triggerMode === "focus" || triggerMode === "hover") && !contentRef.current?.contains(event.relatedTarget as Node)) setOpen(false);
      }}
    >
      {children}
    </button>
  );
}

export function TooltipLink({ children, className = "", onClick, onMouseEnter, onMouseLeave, onFocus, onBlur, ...props }: TooltipLinkProps) {
  const { setOpen, toggle, tooltipId, triggerRef, contentRef, triggerMode, open } = useTooltipContext();

  return (
    <a
      {...props}
      ref={(node) => { triggerRef.current = node; }}
      className={joinClasses(styles.link, className)}
      aria-describedby={open ? tooltipId : undefined}
      onClick={(event) => {
        onClick?.(event);
        if (!event.defaultPrevented && triggerMode === "click") {
          event.preventDefault();
          toggle();
        }
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
        if (triggerMode === "focus" || triggerMode === "hover") setOpen(true);
      }}
      onBlur={(event) => {
        onBlur?.(event);
        if ((triggerMode === "focus" || triggerMode === "hover") && !contentRef.current?.contains(event.relatedTarget as Node)) setOpen(false);
      }}
    >
      {children}
    </a>
  );
}

