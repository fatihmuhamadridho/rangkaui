import { CSSProperties, ButtonHTMLAttributes, forwardRef } from "react";

export type ButtonVariant = "solid" | "outline" | "ghost";
export type ButtonSize = "sm" | "md" | "lg";

export interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ButtonVariant;
  size?: ButtonSize;
  style?: CSSProperties;
}

const baseStyle: CSSProperties = {
  display: "inline-flex",
  alignItems: "center",
  justifyContent: "center",
  borderRadius: 9999,
  border: "1px solid transparent",
  fontWeight: 600,
  textTransform: "none",
  cursor: "pointer",
  userSelect: "none",
  transition: "background-color 150ms ease, border-color 150ms ease, color 150ms ease, opacity 150ms ease",
};

const variantStyleMap: Record<ButtonVariant, CSSProperties> = {
  solid: {
    backgroundColor: "#0f172a",
    color: "#f8fafc",
    borderColor: "transparent",
  },
  outline: {
    backgroundColor: "transparent",
    color: "#0f172a",
    borderColor: "#0f172a",
  },
  ghost: {
    backgroundColor: "transparent",
    color: "#0f172a",
    borderColor: "transparent",
  },
};

const sizeStyleMap: Record<ButtonSize, CSSProperties> = {
  sm: {
    fontSize: "0.75rem",
    padding: "0.25rem 0.75rem",
  },
  md: {
    fontSize: "0.875rem",
    padding: "0.5rem 1rem",
  },
  lg: {
    fontSize: "1rem",
    padding: "0.75rem 1.25rem",
  },
};

const disabledStyle: CSSProperties = {
  opacity: 0.5,
  cursor: "not-allowed",
};

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(function Button(
  { variant = "solid", size = "md", className, style, disabled, ...props },
  ref
) {
  const variantStyle = variantStyleMap[variant];
  const sizeStyle = sizeStyleMap[size];
  const mergedStyle: CSSProperties = {
    ...baseStyle,
    ...variantStyle,
    ...sizeStyle,
    ...(disabled ? disabledStyle : undefined),
    ...style,
  };

  return (
    <button
      ref={ref}
      className={className}
      style={mergedStyle}
      disabled={disabled}
      {...props}
    />
  );
});
