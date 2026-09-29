import type { ButtonHTMLAttributes, HTMLAttributes, ReactNode } from "react";

import styles from "./Tags.module.css";

export type TagSize = "small" | "medium" | "large";
export type TagVariant = "default" | "primary" | "success" | "warning" | "danger";

export interface TagProps extends Omit<HTMLAttributes<HTMLSpanElement>, "onRemove"> {
  children?: ReactNode;
  icon?: ReactNode;
  closable?: boolean;
  onClose?: () => void;
  closeButtonProps?: Omit<ButtonHTMLAttributes<HTMLButtonElement>, "onClick" | "children">;
  size?: TagSize;
  variant?: TagVariant;
}

export interface TagsProps extends HTMLAttributes<HTMLDivElement> {
  children?: ReactNode;
  gap?: "small" | "medium" | "large";
}

function joinClasses(...classes: Array<string | false | undefined>) {
  return classes.filter(Boolean).join(" ");
}

export function Tag({
  children,
  icon = <TagIcon />,
  closable = false,
  onClose,
  closeButtonProps,
  size = "medium",
  variant = "default",
  className = "",
  ...props
}: TagProps) {
  return (
    <span {...props} className={joinClasses(styles.tag, styles[size], styles[variant], className)}>
      {icon !== null && <span className={styles.icon} aria-hidden="true">{icon}</span>}
      <span className={styles.label}>{children}</span>
      {closable && <button {...closeButtonProps} type="button" className={joinClasses(styles.close, closeButtonProps?.className)} aria-label={closeButtonProps?.["aria-label"] ?? `Remove ${typeof children === "string" ? children : "tag"}`} onClick={onClose}><CloseIcon /></button>}
    </span>
  );
}

export function Tags({ children, gap = "medium", className = "", role = "list", ...props }: TagsProps) {
  return <div {...props} className={joinClasses(styles.tags, styles[`gap${gap}`], className)} role={role}>{children}</div>;
}

function TagIcon() {
  return <svg viewBox="0 0 16 16"><path d="M2.2 2.2h5.1l6.5 6.5-5.1 5.1-6.5-6.5V2.2Z" fill="none" stroke="currentColor" strokeLinejoin="round" strokeWidth="1.3"/><circle cx="5.1" cy="5.1" r=".85" fill="currentColor"/></svg>;
}

function CloseIcon() {
  return <svg viewBox="0 0 16 16"><path d="m3 3 10 10M13 3 3 13" fill="none" stroke="currentColor" strokeLinecap="round" strokeWidth="1.4"/></svg>;
}
