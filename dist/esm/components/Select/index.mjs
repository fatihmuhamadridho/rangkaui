import { jsx } from 'react/jsx-runtime';

// src/Select/Select.module.css
var Select_default = {};
function joinClasses(...classes) {
  return classes.filter(Boolean).join(" ");
}
var Select = ({
  size = "medium",
  nativeSize,
  multiple = false,
  disabled = false,
  className = "",
  children,
  ...props
}) => {
  return /* @__PURE__ */ jsx(
    "select",
    {
      ...props,
      size: nativeSize,
      multiple,
      disabled,
      className: joinClasses(
        Select_default.select,
        Select_default[size],
        multiple && Select_default.multiple,
        disabled && Select_default.disabled,
        className
      ),
      children
    }
  );
};

export { Select };
//# sourceMappingURL=index.mjs.map
//# sourceMappingURL=index.mjs.map