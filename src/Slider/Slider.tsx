import { useState, type InputHTMLAttributes } from "react";

import styles from "./Slider.module.css";

export interface SliderProps extends Omit<InputHTMLAttributes<HTMLInputElement>, "type" | "value" | "defaultValue" | "onChange"> {
  value?: number;
  defaultValue?: number;
  onValueChange?: (value: number) => void;
  showValue?: boolean;
  label?: string;
}

export function Slider({
  value,
  defaultValue = 0,
  onValueChange,
  showValue = false,
  label,
  disabled = false,
  className = "",
  ...props
}: SliderProps) {
  const controlled = value !== undefined;
  const [internalValue, setInternalValue] = useState(defaultValue);
  const currentValue = controlled ? value : internalValue;

  return (
    <div className={styles.root}>
      {label && <label className={styles.label} htmlFor={props.id}>{label}</label>}
      <input
        {...props}
        type="range"
        value={currentValue}
        disabled={disabled}
        className={`${styles.slider} ${className}`.trim()}
        onChange={(event) => {
          const nextValue = Number(event.currentTarget.value);
          if (!controlled) setInternalValue(nextValue);
          onValueChange?.(nextValue);
        }}
      />
      {showValue && <output className={styles.value}>{currentValue}</output>}
    </div>
  );
}
