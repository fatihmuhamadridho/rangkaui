import type { HTMLAttributes } from "react";

import styles from "./Spinner.module.css";

export type SpinnerVariant = "border" | "grow";
export type SpinnerColor = "primary" | "secondary" | "success" | "danger" | "warning" | "info" | "light" | "dark";
export type SpinnerSize = "sm" | "md";

export interface SpinnerProps extends HTMLAttributes<HTMLSpanElement> {
  variant?: SpinnerVariant;
  color?: SpinnerColor;
  size?: SpinnerSize;
  label?: string;
}

function joinClasses(...classes: Array<string | false | undefined>) {
  return classes.filter(Boolean).join(" ");
}

export function Spinner({
  variant = "border",
  color,
  size,
  label = "Loading...",
  className = "",
  ...props
}: SpinnerProps) {
  return (
    <span
      {...props}
      className={joinClasses(styles.spinner, styles[variant], color && styles[color], size === "sm" && styles.small, className)}
      role="status"
      aria-label={label}
    >
      <span className={styles.visuallyHidden}>{label}</span>
    </span>
  );
}
