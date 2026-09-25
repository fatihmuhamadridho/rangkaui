import type { HTMLAttributes, ReactNode } from "react";

import styles from "./Box.module.css";

export interface BoxProps extends HTMLAttributes<HTMLDivElement> {
  children?: ReactNode;
  padded?: boolean;
  bordered?: boolean;
  rounded?: boolean;
  shadow?: boolean;
}

export function Box({
  children,
  className = "",
  padded = false,
  bordered = false,
  rounded = false,
  shadow = false,
  ...props
}: BoxProps) {
  const classes = [
    styles.box,
    padded && styles.padded,
    bordered && styles.bordered,
    rounded && styles.rounded,
    shadow && styles.shadow,
    className,
  ]
    .filter(Boolean)
    .join(" ");

  return (
    <div className={classes} {...props}>
      {children}
    </div>
  );
}
