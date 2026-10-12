'use strict';

var jsxRuntime = require('react/jsx-runtime');

// src/InputGroup/InputGroup.module.css
var InputGroup_default = {};
function joinClasses(...classes) {
  return classes.filter(Boolean).join(" ");
}
var InputGroup = ({
  size = "medium",
  rounding = "default",
  wrap = true,
  children,
  className = "",
  role = "group",
  "aria-label": ariaLabel = "Input group",
  ...props
}) => {
  return /* @__PURE__ */ jsxRuntime.jsx(
    "div",
    {
      ...props,
      className: joinClasses(InputGroup_default.group, InputGroup_default[size], InputGroup_default[rounding], wrap && InputGroup_default.wrap, className),
      role,
      "aria-label": ariaLabel,
      children
    }
  );
};
var InputGroupText = ({ children, className = "", ...props }) => {
  return /* @__PURE__ */ jsxRuntime.jsx("span", { ...props, className: joinClasses(InputGroup_default.text, className), children });
};
var InputGroupButton = ({
  variant = "default",
  children,
  className = "",
  type = "button",
  ...props
}) => {
  return /* @__PURE__ */ jsxRuntime.jsx("button", { ...props, type, className: joinClasses(InputGroup_default.button, InputGroup_default[`button${variant}`], className), children });
};
var InputGroupInput = ({ className = "", ...props }) => {
  return /* @__PURE__ */ jsxRuntime.jsx("input", { ...props, className: joinClasses(InputGroup_default.input, className) });
};
var InputGroupSelect = ({ children, className = "", ...props }) => {
  return /* @__PURE__ */ jsxRuntime.jsx("select", { ...props, className: joinClasses(InputGroup_default.select, className), children });
};
var InputGroupCheck = ({ type = "checkbox", label, className = "", ...props }) => {
  return /* @__PURE__ */ jsxRuntime.jsxs("label", { className: joinClasses(InputGroup_default.check, className), children: [
    /* @__PURE__ */ jsxRuntime.jsx("input", { ...props, type }),
    /* @__PURE__ */ jsxRuntime.jsx("span", { children: label })
  ] });
};

exports.InputGroup = InputGroup;
exports.InputGroupButton = InputGroupButton;
exports.InputGroupCheck = InputGroupCheck;
exports.InputGroupInput = InputGroupInput;
exports.InputGroupSelect = InputGroupSelect;
exports.InputGroupText = InputGroupText;
//# sourceMappingURL=index.cjs.map
//# sourceMappingURL=index.cjs.map