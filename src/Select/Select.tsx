import type { ReactNode, SelectHTMLAttributes } from "react";

import styles from "./Select.module.css";

export type SelectSize = "small" | "medium" | "large";

export interface SelectProps extends Omit<SelectHTMLAttributes<HTMLSelectElement>, "size"> {
  size?: SelectSize;
  nativeSize?: number;
  children?: ReactNode;
}

function joinClasses(...classes: Array<string | false | undefined>) {
  return classes.filter(Boolean).join(" ");
}

export function Select({ size = "medium", nativeSize, multiple = false, disabled = false, className = "", children, ...props }: SelectProps) {
  return (
    <select
      {...props}
      size={nativeSize}
      multiple={multiple}
      disabled={disabled}
      className={joinClasses(styles.select, styles[size], multiple && styles.multiple, disabled && styles.disabled, className)}
    >
      {children}
    </select>
  );
}
