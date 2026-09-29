import { createContext, useContext, type HTMLAttributes, type MouseEventHandler, type ReactNode } from "react";

import styles from "./ListGroup.module.css";

export type ListGroupElement = "div" | "ul" | "ol";
export type ListGroupVariant = "primary" | "secondary" | "success" | "danger" | "warning" | "info" | "light" | "dark";

interface ListGroupContextValue {
  semanticList: boolean;
}

const ListGroupContext = createContext<ListGroupContextValue>({ semanticList: false });

export interface ListGroupProps extends HTMLAttributes<HTMLElement> {
  as?: ListGroupElement;
  flush?: boolean;
  horizontal?: boolean;
  numbered?: boolean;
  children?: ReactNode;
}

export interface ListGroupItemProps extends HTMLAttributes<HTMLElement> {
  href?: string;
  target?: string;
  rel?: string;
  button?: boolean;
  active?: boolean;
  disabled?: boolean;
  action?: boolean;
  variant?: ListGroupVariant;
  badge?: ReactNode;
  children?: ReactNode;
}

const variantClasses: Record<ListGroupVariant, string> = {
  primary: styles.primary,
  secondary: styles.secondary,
  success: styles.success,
  danger: styles.danger,
  warning: styles.warning,
  info: styles.info,
  light: styles.light,
  dark: styles.dark,
};

function joinClasses(...classes: Array<string | false | undefined>) {
  return classes.filter(Boolean).join(" ");
}

export function ListGroup({
  as: Element = "ul",
  flush = false,
  horizontal = false,
  numbered = false,
  children,
  className = "",
  ...props
}: ListGroupProps) {
  const semanticList = Element === "ul" || Element === "ol";
  const classes = joinClasses(
    styles.listGroup,
    semanticList && styles.semanticList,
    flush && styles.flush,
    horizontal && styles.horizontal,
    (numbered || Element === "ol") && styles.numbered,
    className,
  );

  return (
    <ListGroupContext.Provider value={{ semanticList }}>
      <Element className={classes} {...props}>
        {children}
      </Element>
    </ListGroupContext.Provider>
  );
}

export function ListGroupItem({
  href,
  target,
  rel,
  button = false,
  active = false,
  disabled = false,
  action = false,
  variant,
  badge,
  children,
  className = "",
  onClick,
  ...props
}: ListGroupItemProps) {
  const { semanticList } = useContext(ListGroupContext);
  const itemClasses = joinClasses(
    styles.item,
    (action || href !== undefined || button) && styles.action,
    active && styles.active,
    disabled && styles.disabled,
    variant && variantClasses[variant],
    className,
  );
  const content = <>
    <div className={styles.itemText}>{children}</div>
    {badge !== undefined && <span className={styles.badge}>{badge}</span>}
  </>;
  const itemOnClick = (event: React.MouseEvent<HTMLElement>) => {
    if (disabled) {
      event.preventDefault();
      return;
    }
    (onClick as MouseEventHandler<HTMLElement> | undefined)?.(event);
  };

  if (semanticList) {
    return (
      <li className={itemClasses} aria-current={active ? "true" : undefined} aria-disabled={disabled || undefined}>
        {href !== undefined ? (
          <a {...props} href={disabled ? undefined : href} target={target} rel={rel} className={styles.semanticContent} aria-disabled={disabled || undefined} tabIndex={disabled ? -1 : undefined} onClick={itemOnClick}>{content}</a>
        ) : button ? (
          <button {...props} type="button" className={styles.semanticContent} disabled={disabled} aria-current={active ? "true" : undefined} onClick={itemOnClick}>{content}</button>
        ) : (
          <div {...props} className={styles.semanticContent}>{content}</div>
        )}
      </li>
    );
  }

  if (href !== undefined) {
    return <a {...props} href={disabled ? undefined : href} target={target} rel={rel} className={itemClasses} aria-current={active ? "true" : undefined} aria-disabled={disabled || undefined} tabIndex={disabled ? -1 : undefined} onClick={itemOnClick}>{content}</a>;
  }
  if (button) {
    return <button {...props} type="button" className={itemClasses} disabled={disabled} aria-current={active ? "true" : undefined} onClick={itemOnClick}>{content}</button>;
  }
  return <div {...props} className={itemClasses} aria-current={active ? "true" : undefined} aria-disabled={disabled || undefined}>{content}</div>;
}
