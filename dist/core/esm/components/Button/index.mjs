import { jsx } from 'react/jsx-runtime';

// src/Button/Button.module.css
var Button_default = {};
var sizes = {
  small: Button_default.small,
  medium: Button_default.medium,
  large: Button_default.large
};
var iconSizes = {
  small: Button_default.iconSmall,
  medium: Button_default.iconMedium,
  large: Button_default.iconLarge
};
var variants = {
  standard: Button_default.primary,
  primary: Button_default.primary,
  secondary: Button_default.secondary,
  base: Button_default.base,
  "outline-primary": Button_default.outlinePrimary,
  "outline-secondary": Button_default.outlineSecondary,
  link: Button_default.link,
  success: Button_default.success,
  danger: Button_default.danger,
  warning: Button_default.warning,
  info: Button_default.info,
  light: Button_default.light,
  dark: Button_default.dark,
  "outline-success": Button_default.outlineSuccess,
  "outline-danger": Button_default.outlineDanger,
  "outline-warning": Button_default.outlineWarning,
  "outline-info": Button_default.outlineInfo,
  "outline-light": Button_default.outlineLight,
  "outline-dark": Button_default.outlineDark
};
var Button = ({
  variant = "primary",
  size = "medium",
  iconOnly = false,
  className = "",
  type = "button",
  children = "Button Title",
  ...props
}) => {
  return /* @__PURE__ */ jsx(
    "button",
    {
      type,
      className: `${Button_default.button} ${iconOnly ? iconSizes[size] : sizes[size]} ${variants[variant]} ${className}`,
      ...props,
      children
    }
  );
};

export { Button };
//# sourceMappingURL=index.mjs.map
//# sourceMappingURL=index.mjs.map