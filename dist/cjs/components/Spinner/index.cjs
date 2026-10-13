'use strict';

var jsxRuntime = require('react/jsx-runtime');

// src/Spinner/Spinner.module.css
var Spinner_default = {};
function joinClasses(...classes) {
  return classes.filter(Boolean).join(" ");
}
var Spinner = ({
  variant = "border",
  color,
  size,
  label = "Loading...",
  className = "",
  ...props
}) => {
  return /* @__PURE__ */ jsxRuntime.jsx(
    "span",
    {
      ...props,
      className: joinClasses(
        Spinner_default.spinner,
        Spinner_default[variant],
        color && Spinner_default[color],
        size === "sm" && Spinner_default.small,
        className
      ),
      role: "status",
      "aria-label": label,
      children: /* @__PURE__ */ jsxRuntime.jsx("span", { className: Spinner_default.visuallyHidden, children: label })
    }
  );
};

exports.Spinner = Spinner;
//# sourceMappingURL=index.cjs.map
//# sourceMappingURL=index.cjs.map