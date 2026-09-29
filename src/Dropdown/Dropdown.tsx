import {
  createContext,
  useContext,
  useEffect,
  useId,
  useRef,
  useState,
  type AnchorHTMLAttributes,
  type ButtonHTMLAttributes,
  type HTMLAttributes,
  type KeyboardEvent as ReactKeyboardEvent,
  type MouseEvent as ReactMouseEvent,
  type MouseEventHandler,
  type RefObject,
  type ReactNode,
} from "react";

import styles from "./Dropdown.module.css";

export type DropdownPlacement = "bottom-start" | "bottom-end" | "top-start" | "top-end";
export type DropdownAutoClose = boolean | "inside" | "outside";
export type DropdownVariant = "primary" | "secondary" | "success" | "danger" | "warning" | "info" | "light" | "dark";

interface DropdownContextValue {
  menuId: string;
  open: boolean;
  setOpen: (open: boolean) => void;
  toggle: () => void;
  autoClose: DropdownAutoClose;
  dark: boolean;
  triggerRef: RefObject<HTMLButtonElement | null>;
  menuRef: RefObject<HTMLDivElement | null>;
}

const DropdownContext = createContext<DropdownContextValue | null>(null);

export interface DropdownProps extends HTMLAttributes<HTMLDivElement> {
  open?: boolean;
  defaultOpen?: boolean;
  onOpenChange?: (open: boolean) => void;
  placement?: DropdownPlacement;
  autoClose?: DropdownAutoClose;
  dark?: boolean;
  split?: boolean;
}

export interface DropdownToggleProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  split?: boolean;
  variant?: DropdownVariant;
  children?: ReactNode;
}

export interface DropdownMenuProps extends HTMLAttributes<HTMLDivElement> {
  align?: "start" | "end";
  dark?: boolean;
  children?: ReactNode;
}

interface DropdownItemBaseProps {
  active?: boolean;
  disabled?: boolean;
  onSelect?: () => void;
  children?: ReactNode;
  className?: string;
  onClick?: MouseEventHandler<HTMLElement>;
}

export type DropdownItemProps = DropdownItemBaseProps & (
  | ({ href: string } & Omit<AnchorHTMLAttributes<HTMLAnchorElement>, keyof DropdownItemBaseProps | "href" | "onClick">)
  | ({ href?: undefined } & Omit<ButtonHTMLAttributes<HTMLButtonElement>, keyof DropdownItemBaseProps | "href" | "onClick">)
);

const toggleVariants: Record<DropdownVariant, string> = {
  primary: styles.primaryToggle,
  secondary: styles.secondaryToggle,
  success: styles.successToggle,
  danger: styles.dangerToggle,
  warning: styles.warningToggle,
  info: styles.infoToggle,
  light: styles.lightToggle,
  dark: styles.darkToggle,
};

function useDropdownContext() {
  const context = useContext(DropdownContext);
  if (!context) throw new Error("DropdownToggle and DropdownMenu must be rendered inside Dropdown.");
  return context;
}

function joinClasses(...classes: Array<string | false | undefined>) {
  return classes.filter(Boolean).join(" ");
}

export function Dropdown({
  open,
  defaultOpen = false,
  onOpenChange,
  placement = "bottom-start",
  autoClose = true,
  dark = false,
  split = false,
  children,
  className = "",
  onKeyDown,
  ...props
}: DropdownProps) {
  const generatedId = useId().replace(/:/g, "");
  const [internalOpen, setInternalOpen] = useState(defaultOpen);
  const rootRef = useRef<HTMLDivElement>(null);
  const triggerRef = useRef<HTMLButtonElement>(null);
  const menuRef = useRef<HTMLDivElement>(null);
  const isControlled = open !== undefined;
  const expanded = isControlled ? open : internalOpen;

  const setOpen = (nextOpen: boolean) => {
    if (!isControlled) setInternalOpen(nextOpen);
    onOpenChange?.(nextOpen);
  };

  useEffect(() => {
    if (!expanded || (autoClose !== true && autoClose !== "outside")) return;
    const handlePointerDown = (event: PointerEvent) => {
      if (!rootRef.current?.contains(event.target as Node)) setOpen(false);
    };
    document.addEventListener("pointerdown", handlePointerDown);
    return () => document.removeEventListener("pointerdown", handlePointerDown);
  }, [expanded, autoClose, isControlled, onOpenChange]);

  const focusMenuItem = (edge: "first" | "last") => {
    window.requestAnimationFrame(() => {
      const menuItems = menuRef.current?.querySelectorAll<HTMLElement>(
        '[data-dropdown-item]:not([aria-disabled="true"]):not(:disabled)',
      );
      if (!menuItems?.length) return;
      menuItems[edge === "first" ? 0 : menuItems.length - 1].focus();
    });
  };

  const handleKeyDown = (event: ReactKeyboardEvent<HTMLDivElement>) => {
    onKeyDown?.(event);
    if (event.defaultPrevented) return;

    if (event.key === "Escape" && expanded) {
      event.preventDefault();
      setOpen(false);
      triggerRef.current?.focus();
      return;
    }

    if (event.target === triggerRef.current && (event.key === "ArrowDown" || event.key === "ArrowUp")) {
      event.preventDefault();
      setOpen(true);
      focusMenuItem(event.key === "ArrowDown" ? "first" : "last");
      return;
    }

    const menuItems = Array.from(menuRef.current?.querySelectorAll<HTMLElement>(
      '[data-dropdown-item]:not([aria-disabled="true"]):not(:disabled)',
    ) ?? []);
    const currentIndex = menuItems.indexOf(event.target as HTMLElement);
    if (currentIndex < 0 || !["ArrowDown", "ArrowUp", "Home", "End"].includes(event.key)) return;

    event.preventDefault();
    const nextIndex = event.key === "Home"
      ? 0
      : event.key === "End"
        ? menuItems.length - 1
        : (currentIndex + (event.key === "ArrowDown" ? 1 : menuItems.length - 1)) % menuItems.length;
    menuItems[nextIndex]?.focus();
  };

  const context: DropdownContextValue = {
    menuId: `${generatedId}-menu`,
    open: expanded,
    setOpen,
    toggle: () => setOpen(!expanded),
    autoClose,
    dark,
    triggerRef,
    menuRef,
  };

  return (
    <DropdownContext.Provider value={context}>
      <div
        ref={rootRef}
        className={joinClasses(styles.dropdown, styles[placement], dark && styles.dark, split && styles.split, className)}
        onKeyDown={handleKeyDown}
        {...props}
      >
        {children}
      </div>
    </DropdownContext.Provider>
  );
}

export function DropdownToggle({
  split = false,
  variant = "primary",
  children = split ? null : "Toggle dropdown",
  className = "",
  type = "button",
  onClick,
  ...props
}: DropdownToggleProps) {
  const { menuId, open, toggle, triggerRef } = useDropdownContext();
  return (
    <button
      {...props}
      ref={triggerRef}
      type={type}
      className={joinClasses(styles.toggle, toggleVariants[variant], split && styles.splitToggle, className)}
      aria-haspopup="menu"
      aria-expanded={open}
      aria-controls={menuId}
      onClick={(event) => {
        onClick?.(event);
        if (!event.defaultPrevented) toggle();
      }}
    >
      {children}
      {!split && <span className={styles.caret} aria-hidden="true" />}
      {split && <span className={styles.srOnly}>Toggle dropdown menu</span>}
    </button>
  );
}

export function DropdownMenu({
  align,
  dark = false,
  children,
  className = "",
  onClick,
  ...props
}: DropdownMenuProps) {
  const { menuId, open, autoClose, dark: rootDark, menuRef, setOpen } = useDropdownContext();
  return (
    <div
      {...props}
      ref={menuRef}
      id={menuId}
      className={joinClasses(styles.menu, align && styles[`align${align}`], (dark || rootDark) && styles.menuDark, className)}
      role="menu"
      hidden={!open}
      onClick={(event) => {
        onClick?.(event);
        if (!event.defaultPrevented && (autoClose === true || autoClose === "inside")) setOpen(false);
      }}
    >
      {children}
    </div>
  );
}

export function DropdownItem({
  href,
  active = false,
  disabled = false,
  onSelect,
  onClick,
  children,
  className = "",
  ...props
}: DropdownItemProps) {
  const classes = joinClasses(styles.item, active && styles.active, disabled && styles.disabled, className);
  const handleClick = (event: ReactMouseEvent<HTMLElement>) => {
    onClick?.(event);
    if (disabled) {
      event.preventDefault();
      return;
    }
    if (!event.defaultPrevented) onSelect?.();
  };

  if (href !== undefined) {
    return (
      <a
        {...props as AnchorHTMLAttributes<HTMLAnchorElement>}
        href={disabled ? undefined : href}
        className={classes}
        role="menuitem"
        data-dropdown-item=""
        aria-current={active ? "true" : undefined}
        aria-disabled={disabled || undefined}
        tabIndex={disabled ? -1 : 0}
        onClick={handleClick as MouseEventHandler<HTMLAnchorElement>}
      >
        {children}
      </a>
    );
  }

  return (
    <button
      {...props as ButtonHTMLAttributes<HTMLButtonElement>}
      type="button"
      className={classes}
      role="menuitem"
      data-dropdown-item=""
      aria-current={active ? "true" : undefined}
      aria-disabled={disabled || undefined}
      disabled={disabled}
      tabIndex={disabled ? -1 : 0}
      onClick={handleClick as MouseEventHandler<HTMLButtonElement>}
    >
      {children}
    </button>
  );
}

export function DropdownHeader({ children, className = "", ...props }: HTMLAttributes<HTMLDivElement>) {
  return <div className={joinClasses(styles.header, className)} role="presentation" {...props}>{children}</div>;
}

export function DropdownDivider({ className = "", ...props }: HTMLAttributes<HTMLHRElement>) {
  return <hr className={joinClasses(styles.divider, className)} role="separator" {...props} />;
}
