import { jsx, jsxs } from 'react/jsx-runtime';

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
  return /* @__PURE__ */ jsx(
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
  return /* @__PURE__ */ jsx("span", { ...props, className: joinClasses(InputGroup_default.text, className), children });
};
var InputGroupButton = ({
  variant = "default",
  children,
  className = "",
  type = "button",
  ...props
}) => {
  return /* @__PURE__ */ jsx("button", { ...props, type, className: joinClasses(InputGroup_default.button, InputGroup_default[`button${variant}`], className), children });
};
var InputGroupInput = ({ className = "", ...props }) => {
  return /* @__PURE__ */ jsx("input", { ...props, className: joinClasses(InputGroup_default.input, className) });
};
var InputGroupSelect = ({ children, className = "", ...props }) => {
  return /* @__PURE__ */ jsx("select", { ...props, className: joinClasses(InputGroup_default.select, className), children });
};
var InputGroupCheck = ({ type = "checkbox", label, className = "", ...props }) => {
  return /* @__PURE__ */ jsxs("label", { className: joinClasses(InputGroup_default.check, className), children: [
    /* @__PURE__ */ jsx("input", { ...props, type }),
    /* @__PURE__ */ jsx("span", { children: label })
  ] });
};

export { InputGroup, InputGroupButton, InputGroupCheck, InputGroupInput, InputGroupSelect, InputGroupText };
//# sourceMappingURL=index.mjs.map
//# sourceMappingURL=index.mjs.map