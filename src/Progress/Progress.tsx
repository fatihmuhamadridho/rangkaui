import type { CSSProperties, HTMLAttributes, ReactNode } from "react";

import styles from "./Progress.module.css";

export type ProgressVariant = "primary" | "secondary" | "success" | "danger" | "warning" | "info";

export interface ProgressProps extends Omit<HTMLAttributes<HTMLDivElement>, "children"> {
  value: number;
  min?: number;
  max?: number;
  variant?: ProgressVariant;
  striped?: boolean;
  animated?: boolean;
  label?: ReactNode;
  showValue?: boolean;
  children?: ReactNode;
}

export interface ProgressStackProps extends HTMLAttributes<HTMLDivElement> {
  label?: string;
  height?: number | string;
  children?: ReactNode;
}

export interface ProgressSegmentProps extends Omit<ProgressProps, "width"> {}

function joinClasses(...classes: Array<string | false | undefined>) {
  return classes.filter(Boolean).join(" ");
}

export function Progress({
  value,
  min = 0,
  max = 100,
  variant = "primary",
  striped = false,
  animated = false,
  label,
  showValue = false,
  children,
  className = "",
  style,
  "aria-label": ariaLabel,
  ...props
}: ProgressProps) {
  const range = max - min;
  const percentage = range > 0 ? Math.min(100, Math.max(0, ((value - min) / range) * 100)) : 0;
  const displayLabel = children ?? label ?? (showValue ? `${Math.round(percentage)}%` : undefined);

  return (
    <div
      {...props}
      className={joinClasses(styles.track, className)}
      role="progressbar"
      aria-label={ariaLabel ?? (typeof label === "string" ? label : undefined)}
      aria-valuemin={min}
      aria-valuemax={max}
      aria-valuenow={value}
      aria-valuetext={typeof displayLabel === "string" ? displayLabel : undefined}
      style={style}
    >
      <div
        className={joinClasses(styles.bar, styles[variant], striped && styles.striped, animated && styles.animated)}
        style={{ width: `${percentage}%` } as CSSProperties}
        aria-hidden="true"
      >
        {displayLabel}
      </div>
    </div>
  );
}

export function ProgressSegment({
  value,
  min = 0,
  max = 100,
  variant = "primary",
  striped = false,
  animated = false,
  label,
  showValue = false,
  children,
  className = "",
  style,
  "aria-label": ariaLabel,
  ...props
}: ProgressSegmentProps) {
  const range = max - min;
  const percentage = range > 0 ? Math.min(100, Math.max(0, ((value - min) / range) * 100)) : 0;
  const displayLabel = children ?? label ?? (showValue ? `${Math.round(percentage)}%` : undefined);

  return (
    <div
      {...props}
      className={joinClasses(styles.bar, styles[variant], striped && styles.striped, animated && styles.animated, className)}
      role="progressbar"
      aria-label={ariaLabel ?? (typeof label === "string" ? label : undefined)}
      aria-valuemin={min}
      aria-valuemax={max}
      aria-valuenow={value}
      aria-valuetext={typeof displayLabel === "string" ? displayLabel : undefined}
      style={{ ...style, width: `${percentage}%` } as CSSProperties}
    >
      {displayLabel}
    </div>
  );
}

export function ProgressStack({ label = "Progress", height, children, className = "", style, ...props }: ProgressStackProps) {
  const normalizedHeight = typeof height === "number" ? `${height}px` : height;

  return (
    <div
      {...props}
      className={joinClasses(styles.track, styles.stacked, className)}
      role="group"
      aria-label={label}
      style={{ ...style, ...(normalizedHeight ? { height: normalizedHeight } : {}) }}
    >
      {children}
    </div>
  );
}
