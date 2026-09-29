import { useState, type InputHTMLAttributes, type ReactNode } from "react";

import styles from "./InputNumber.module.css";

export type InputNumberSize = "small" | "medium" | "large";

export interface InputNumberProps extends Omit<InputHTMLAttributes<HTMLInputElement>, "type" | "value" | "defaultValue" | "onChange" | "size" | "prefix"> {
  value?: number | "";
  defaultValue?: number | "";
  onValueChange?: (value: number | null) => void;
  prefix?: ReactNode;
  suffix?: ReactNode;
  clearable?: boolean;
  size?: InputNumberSize;
  wrapperClassName?: string;
}

function joinClasses(...classes: Array<string | false | undefined>) {
  return classes.filter(Boolean).join(" ");
}

export function InputNumber({
  value,
  defaultValue = "",
  onValueChange,
  prefix,
  suffix,
  clearable = false,
  size = "medium",
  disabled = false,
  readOnly = false,
  className = "",
  wrapperClassName = "",
  min,
  max,
  step = 1,
  onBlur,
  onKeyDown,
  ...props
}: InputNumberProps) {
  const controlled = value !== undefined;
  const [internalValue, setInternalValue] = useState<string>(String(defaultValue));
  const currentValue = controlled ? String(value) : internalValue;

  const updateValue = (next: string) => {
    if (!controlled) setInternalValue(next);
    if (next === "") onValueChange?.(null);
    else {
      const numeric = Number(next);
      onValueChange?.(Number.isFinite(numeric) ? numeric : null);
    }
  };

  const clear = () => {
    if (disabled || readOnly) return;
    updateValue("");
  };

  return (
    <div className={joinClasses(styles.wrapper, styles[size], disabled && styles.disabled, wrapperClassName)}>
      {prefix !== undefined && <span className={styles.addon}>{prefix}</span>}
      <input
        {...props}
        type="number"
        min={min}
        max={max}
        step={step}
        value={currentValue}
        disabled={disabled}
        readOnly={readOnly}
        className={joinClasses(styles.input, className)}
        onChange={(event) => updateValue(event.currentTarget.value)}
        onBlur={(event) => {
          onBlur?.(event);
          if (event.defaultPrevented) return;
          const numeric = Number(event.currentTarget.value);
          if (event.currentTarget.value !== "" && Number.isFinite(numeric)) {
            const lower = min === undefined ? numeric : Math.max(numeric, Number(min));
            const bounded = max === undefined ? lower : Math.min(lower, Number(max));
            if (bounded !== numeric) updateValue(String(bounded));
          }
        }}
        onKeyDown={(event) => {
          onKeyDown?.(event);
          if (event.key === "Escape") event.currentTarget.blur();
        }}
      />
      {clearable && currentValue !== "" && !disabled && !readOnly && <button type="button" className={styles.clear} aria-label="Clear number" onClick={clear}><ClearIcon /></button>}
      {suffix !== undefined && <span className={styles.addon}>{suffix}</span>}
    </div>
  );
}

function ClearIcon() {
  return <svg aria-hidden="true" viewBox="0 0 16 16"><circle cx="8" cy="8" r="6" fill="currentColor"/><path d="m6 6 4 4m0-4-4 4" fill="none" stroke="white" strokeLinecap="round" strokeWidth="1.5"/></svg>;
}
