import type { HTMLAttributes, ReactNode } from "react";

import styles from "./Skeleton.module.css";

export type SkeletonAnimation = "none" | "glow" | "wave";
export type SkeletonSize = "xs" | "sm" | "md" | "lg";
export type SkeletonColor = "default" | "primary" | "secondary" | "success" | "danger" | "warning" | "info" | "light" | "dark";

export interface SkeletonProps extends HTMLAttributes<HTMLSpanElement> {
  animation?: SkeletonAnimation;
  size?: SkeletonSize;
  color?: SkeletonColor;
  width?: string | number;
  as?: "span" | "div";
  children?: ReactNode;
}

function joinClasses(...classes: Array<string | false | undefined>) {
  return classes.filter(Boolean).join(" ");
}

export function Skeleton({
  animation = "none",
  size,
  color = "default",
  width,
  as: Element = "span",
  className = "",
  style,
  "aria-hidden": ariaHidden = true,
  ...props
}: SkeletonProps) {
  const normalizedWidth = typeof width === "number" ? `${width}px` : width;

  return (
    <Element
      className={joinClasses(styles.skeleton, styles[animation], size && styles[`size${size}`], styles[color], className)}
      style={{ ...style, ...(normalizedWidth ? { width: normalizedWidth } : {}) }}
      aria-hidden={ariaHidden}
      {...props}
    />
  );
}
