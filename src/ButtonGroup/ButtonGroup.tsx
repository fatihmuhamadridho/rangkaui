import { useState, type HTMLAttributes, type ReactNode } from "react";

import styles from "./ButtonGroup.module.css";

export type ButtonGroupOrientation = "horizontal" | "vertical";
export type ButtonGroupSize = "small" | "medium" | "large";

export interface ButtonGroupProps extends HTMLAttributes<HTMLDivElement> {
  children?: ReactNode;
  orientation?: ButtonGroupOrientation;
  size?: ButtonGroupSize;
}

export interface ButtonToolbarProps extends HTMLAttributes<HTMLDivElement> {
  children?: ReactNode;
}

export interface ButtonGroupToggleOption {
  value: string;
  label: ReactNode;
  disabled?: boolean;
}

export interface ButtonGroupToggleProps extends Omit<HTMLAttributes<HTMLDivElement>, "defaultValue"> {
  options: ButtonGroupToggleOption[];
  type: "checkbox" | "radio";
  name?: string;
  value?: string[];
  defaultValue?: string[];
  onValueChange?: (value: string[]) => void;
}

function joinClasses(...classes: Array<string | false | undefined>) {
  return classes.filter(Boolean).join(" ");
}

export function ButtonGroup({
  children,
  orientation = "horizontal",
  size,
  className = "",
  role = "group",
  "aria-label": ariaLabel = "Button group",
  ...props
}: ButtonGroupProps) {
  return (
    <div
      className={joinClasses(styles.buttonGroup, styles[orientation], size && styles[size], className)}
      role={role}
      aria-label={ariaLabel}
      {...props}
    >
      {children}
    </div>
  );
}

export function ButtonToolbar({
  children,
  className = "",
  role = "toolbar",
  "aria-label": ariaLabel = "Button toolbar",
  ...props
}: ButtonToolbarProps) {
  return (
    <div className={joinClasses(styles.toolbar, className)} role={role} aria-label={ariaLabel} {...props}>
      {children}
    </div>
  );
}

export function ButtonGroupToggle({
  options,
  type,
  name,
  value,
  defaultValue = [],
  onValueChange,
  className = "",
  "aria-label": ariaLabel = `${type === "radio" ? "Radio" : "Checkbox"} button group`,
  ...props
}: ButtonGroupToggleProps) {
  const [internalValue, setInternalValue] = useState(defaultValue);
  const isControlled = value !== undefined;
  const selectedValues = isControlled ? value : internalValue;

  const updateValue = (optionValue: string, checked: boolean) => {
    const nextValue = type === "radio"
      ? checked ? [optionValue] : []
      : checked
        ? [...selectedValues, optionValue]
        : selectedValues.filter((selected) => selected !== optionValue);

    if (!isControlled) setInternalValue(nextValue);
    onValueChange?.(nextValue);
  };

  return (
    <div className={joinClasses(styles.buttonGroup, styles.horizontal, styles.toggleGroup, className)} role="group" aria-label={ariaLabel} {...props}>
      {options.map((option) => {
        const checked = selectedValues.includes(option.value);
        return (
          <label key={option.value} className={joinClasses(styles.toggle, checked && styles.toggleChecked, option.disabled && styles.toggleDisabled)}>
            <input
              className={styles.toggleInput}
              type={type}
              name={name}
              value={option.value}
              checked={checked}
              disabled={option.disabled}
              onChange={(event) => updateValue(option.value, event.target.checked)}
            />
            <span>{option.label}</span>
          </label>
        );
      })}
    </div>
  );
}
