import type { ButtonHTMLAttributes, HTMLAttributes, InputHTMLAttributes, ReactNode, SelectHTMLAttributes } from "react";

import styles from "./InputGroup.module.css";

export type InputGroupSize = "small" | "medium" | "large";
export type InputGroupRounding = "default" | "rounded" | "pill";

export interface InputGroupProps extends HTMLAttributes<HTMLDivElement> {
  size?: InputGroupSize;
  rounding?: InputGroupRounding;
  wrap?: boolean;
  children?: ReactNode;
}

export interface InputGroupTextProps extends HTMLAttributes<HTMLSpanElement> {
  children?: ReactNode;
}

export interface InputGroupButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "default" | "primary" | "secondary";
  children?: ReactNode;
}

export interface InputGroupInputProps extends InputHTMLAttributes<HTMLInputElement> {}

export interface InputGroupSelectProps extends SelectHTMLAttributes<HTMLSelectElement> {
  children?: ReactNode;
}

export interface InputGroupCheckProps extends Omit<InputHTMLAttributes<HTMLInputElement>, "type"> {
  type?: "checkbox" | "radio";
  label?: ReactNode;
}

function joinClasses(...classes: Array<string | false | undefined>) {
  return classes.filter(Boolean).join(" ");
}

export function InputGroup({ size = "medium", rounding = "default", wrap = true, children, className = "", role = "group", "aria-label": ariaLabel = "Input group", ...props }: InputGroupProps) {
  return <div {...props} className={joinClasses(styles.group, styles[size], styles[rounding], wrap && styles.wrap, className)} role={role} aria-label={ariaLabel}>{children}</div>;
}

export function InputGroupText({ children, className = "", ...props }: InputGroupTextProps) {
  return <span {...props} className={joinClasses(styles.text, className)}>{children}</span>;
}

export function InputGroupButton({ variant = "default", children, className = "", type = "button", ...props }: InputGroupButtonProps) {
  return <button {...props} type={type} className={joinClasses(styles.button, styles[`button${variant}`], className)}>{children}</button>;
}

export function InputGroupInput({ className = "", ...props }: InputGroupInputProps) {
  return <input {...props} className={joinClasses(styles.input, className)} />;
}

export function InputGroupSelect({ children, className = "", ...props }: InputGroupSelectProps) {
  return <select {...props} className={joinClasses(styles.select, className)}>{children}</select>;
}

export function InputGroupCheck({ type = "checkbox", label, className = "", ...props }: InputGroupCheckProps) {
  return <label className={joinClasses(styles.check, className)}><input {...props} type={type} /><span>{label}</span></label>;
}
