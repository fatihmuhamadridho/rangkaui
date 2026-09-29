import type { HTMLAttributes, ReactNode } from "react";

import styles from "./Divider.module.css";

export type DividerOrientation = "horizontal" | "vertical";
export type DividerStyle = "solid" | "dashed";
export type DividerAlign = "left" | "center" | "right";

export interface DividerProps extends HTMLAttributes<HTMLDivElement> {
  orientation?: DividerOrientation;
  variant?: DividerStyle;
  align?: DividerAlign;
  children?: ReactNode;
}

export function Divider({
  orientation = "horizontal",
  variant = "solid",
  align = "center",
  children,
  className = "",
  ...props
}: DividerProps) {
  if (orientation === "vertical") {
    return (
      <div
        className={[styles.divider, styles.vertical, styles[variant], className].filter(Boolean).join(" ")}
        role="separator"
        aria-orientation="vertical"
        {...props}
      />
    );
  }

  return (
    <div
      className={[
        styles.divider,
        styles.horizontal,
        styles[variant],
        children ? styles.withLabel : styles.withoutLabel,
        styles[align],
        className,
      ].filter(Boolean).join(" ")}
      role="separator"
      aria-orientation="horizontal"
      {...props}
    >
      <span className={styles.rule} aria-hidden="true" />
      {children && <span className={styles.label}>{children}</span>}
      {children && <span className={styles.rule} aria-hidden="true" />}
    </div>
  );
}
