import { createContext, useContext, useId, useState, type AnchorHTMLAttributes, type ButtonHTMLAttributes, type HTMLAttributes, type ReactNode } from "react";

import styles from "./Navbar.module.css";

export type NavbarExpand = "sm" | "md" | "lg" | "xl" | "xxl" | "never";
export type NavbarTheme = "light" | "dark" | "primary" | "secondary" | "success" | "danger" | "warning" | "info" | "transparent";
export type NavbarPosition = "static" | "fixed-top" | "fixed-bottom" | "sticky-top";

interface NavbarContextValue {
  collapseId: string;
  expanded: boolean;
  setExpanded: (expanded: boolean) => void;
}

const NavbarContext = createContext<NavbarContextValue | null>(null);

export interface NavbarProps extends HTMLAttributes<HTMLElement> {
  expand?: NavbarExpand;
  theme?: NavbarTheme;
  position?: NavbarPosition;
  defaultExpanded?: boolean;
  expanded?: boolean;
  onExpandedChange?: (expanded: boolean) => void;
  children?: ReactNode;
}

export interface NavbarToggleProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  children?: ReactNode;
}

export interface NavbarCollapseProps extends HTMLAttributes<HTMLDivElement> {
  children?: ReactNode;
}

export interface NavbarNavProps extends HTMLAttributes<HTMLUListElement> {
  align?: "start" | "center" | "end";
  children?: ReactNode;
}

export interface NavbarContainerProps extends HTMLAttributes<HTMLDivElement> {
  fluid?: boolean;
  children?: ReactNode;
}

export interface NavbarLinkProps extends AnchorHTMLAttributes<HTMLAnchorElement> {
  active?: boolean;
  disabled?: boolean;
  children?: ReactNode;
}

function useNavbarContext() {
  const context = useContext(NavbarContext);
  if (!context) throw new Error("NavbarToggle and NavbarCollapse must be rendered inside Navbar.");
  return context;
}

function joinClasses(...classes: Array<string | false | undefined>) {
  return classes.filter(Boolean).join(" ");
}

const positionClasses: Record<NavbarPosition, string | undefined> = {
  static: undefined,
  "fixed-top": styles.fixedtop,
  "fixed-bottom": styles.fixedbottom,
  "sticky-top": styles.stickytop,
};

export function Navbar({
  expand = "lg",
  theme = "light",
  position = "static",
  defaultExpanded = false,
  expanded,
  onExpandedChange,
  children,
  className = "",
  "aria-label": ariaLabel = "Main navigation",
  ...props
}: NavbarProps) {
  const generatedId = useId().replace(/:/g, "");
  const [internalExpanded, setInternalExpanded] = useState(defaultExpanded);
  const isControlled = expanded !== undefined;
  const isExpanded = isControlled ? expanded : internalExpanded;
  const setExpanded = (nextExpanded: boolean) => {
    if (!isControlled) setInternalExpanded(nextExpanded);
    onExpandedChange?.(nextExpanded);
  };

  return (
    <NavbarContext.Provider value={{ collapseId: `${generatedId}-collapse`, expanded: isExpanded, setExpanded }}>
      <nav
        className={joinClasses(styles.navbar, styles[`expand${expand}`], styles[theme], positionClasses[position], className)}
        aria-label={ariaLabel}
        {...props}
      >
        {children}
      </nav>
    </NavbarContext.Provider>
  );
}

export function NavbarBrand({ children, className = "", ...props }: AnchorHTMLAttributes<HTMLAnchorElement>) {
  return <a className={joinClasses(styles.brand, className)} {...props}>{children}</a>;
}

export function NavbarToggle({ children, className = "", type = "button", onClick, ...props }: NavbarToggleProps) {
  const { collapseId, expanded, setExpanded } = useNavbarContext();
  return (
    <button
      {...props}
      type={type}
      className={joinClasses(styles.toggle, className)}
      aria-label={props["aria-label"] ?? "Toggle navigation"}
      aria-controls={collapseId}
      aria-expanded={expanded}
      onClick={(event) => {
        onClick?.(event);
        if (!event.defaultPrevented) setExpanded(!expanded);
      }}
    >
      {children ?? <span className={styles.toggleIcon} aria-hidden="true"><span /><span /><span /></span>}
    </button>
  );
}

export function NavbarCollapse({ children, className = "", ...props }: NavbarCollapseProps) {
  const { collapseId, expanded } = useNavbarContext();
  return (
    <div
      id={collapseId}
      className={joinClasses(styles.collapse, expanded && styles.expanded, className)}
      {...props}
    >
      {children}
    </div>
  );
}

export function NavbarNav({ align = "start", children, className = "", ...props }: NavbarNavProps) {
  return <ul className={joinClasses(styles.nav, styles[`align${align}`], className)} {...props}>{children}</ul>;
}

export function NavbarItem({ children, className = "", ...props }: HTMLAttributes<HTMLLIElement>) {
  return <li className={joinClasses(styles.item, className)} {...props}>{children}</li>;
}

export function NavbarLink({ active = false, disabled = false, children, className = "", onClick, ...props }: NavbarLinkProps) {
  return (
    <a
      {...props}
      className={joinClasses(styles.link, active && styles.active, disabled && styles.disabled, className)}
      aria-current={active ? "page" : undefined}
      aria-disabled={disabled || undefined}
      tabIndex={disabled ? -1 : props.tabIndex}
      onClick={(event) => {
        onClick?.(event);
        if (disabled) event.preventDefault();
      }}
    >
      {children}
    </a>
  );
}

export function NavbarText({ children, className = "", ...props }: HTMLAttributes<HTMLSpanElement>) {
  return <span className={joinClasses(styles.text, className)} {...props}>{children}</span>;
}

export function NavbarContainer({ fluid = false, children, className = "", ...props }: NavbarContainerProps) {
  return <div className={joinClasses(styles.container, fluid && styles.fluid, className)} {...props}>{children}</div>;
}
