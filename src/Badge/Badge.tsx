import type { HTMLAttributes, ReactNode } from "react";

import styles from "./Badge.module.css";

export type BadgeVariant = "primary" | "secondary" | "success" | "danger" | "warning" | "info" | "light" | "dark";
export type BadgePosition = "top-start" | "top-end" | "bottom-start" | "bottom-end";

export interface BadgeProps extends HTMLAttributes<HTMLSpanElement> {
  variant?: BadgeVariant;
  pill?: boolean;
  position?: BadgePosition;
  dot?: boolean;
  children?: ReactNode;
}

export function Badge({
  variant = "secondary",
  pill = false,
  position,
  dot = false,
  className = "",
  children,
  "aria-label": ariaLabel,
  ...props
}: BadgeProps) {
  const classes = [
    styles.badge,
    styles[variant],
    pill && styles.pill,
    position && styles[position.replace("-", "")],
    dot && styles.dot,
    className,
  ].filter(Boolean).join(" ");

  return (
    <span className={classes} aria-label={ariaLabel ?? (dot ? "Notification" : undefined)} {...props}>
      {!dot && children}
    </span>
  );
}
