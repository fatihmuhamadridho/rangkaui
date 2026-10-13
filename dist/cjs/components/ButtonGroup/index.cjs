'use strict';

var react = require('react');
var jsxRuntime = require('react/jsx-runtime');

// src/ButtonGroup/ButtonGroup.tsx

// src/ButtonGroup/ButtonGroup.module.css
var ButtonGroup_default = {};
function joinClasses(...classes) {
  return classes.filter(Boolean).join(" ");
}
var ButtonGroup = ({
  children,
  orientation = "horizontal",
  size,
  className = "",
  role = "group",
  "aria-label": ariaLabel = "Button group",
  ...props
}) => {
  return /* @__PURE__ */ jsxRuntime.jsx(
    "div",
    {
      className: joinClasses(ButtonGroup_default.buttonGroup, ButtonGroup_default[orientation], size && ButtonGroup_default[size], className),
      role,
      "aria-label": ariaLabel,
      ...props,
      children
    }
  );
};
var ButtonToolbar = ({
  children,
  className = "",
  role = "toolbar",
  "aria-label": ariaLabel = "Button toolbar",
  ...props
}) => {
  return /* @__PURE__ */ jsxRuntime.jsx("div", { className: joinClasses(ButtonGroup_default.toolbar, className), role, "aria-label": ariaLabel, ...props, children });
};
var ButtonGroupToggle = ({
  options,
  type,
  name,
  value,
  defaultValue = [],
  onValueChange,
  className = "",
  "aria-label": ariaLabel = `${type === "radio" ? "Radio" : "Checkbox"} button group`,
  ...props
}) => {
  const [internalValue, setInternalValue] = react.useState(defaultValue);
  const isControlled = value !== void 0;
  const selectedValues = isControlled ? value : internalValue;
  const updateValue = (optionValue, checked) => {
    const nextValue = type === "radio" ? checked ? [optionValue] : [] : checked ? [...selectedValues, optionValue] : selectedValues.filter((selected) => selected !== optionValue);
    if (!isControlled) setInternalValue(nextValue);
    onValueChange?.(nextValue);
  };
  return /* @__PURE__ */ jsxRuntime.jsx(
    "div",
    {
      className: joinClasses(ButtonGroup_default.buttonGroup, ButtonGroup_default.horizontal, ButtonGroup_default.toggleGroup, className),
      role: "group",
      "aria-label": ariaLabel,
      ...props,
      children: options.map((option) => {
        const checked = selectedValues.includes(option.value);
        return /* @__PURE__ */ jsxRuntime.jsxs(
          "label",
          {
            className: joinClasses(
              ButtonGroup_default.toggle,
              checked && ButtonGroup_default.toggleChecked,
              option.disabled && ButtonGroup_default.toggleDisabled
            ),
            children: [
              /* @__PURE__ */ jsxRuntime.jsx(
                "input",
                {
                  className: ButtonGroup_default.toggleInput,
                  type,
                  name,
                  value: option.value,
                  checked,
                  disabled: option.disabled,
                  onChange: (event) => updateValue(option.value, event.target.checked)
                }
              ),
              /* @__PURE__ */ jsxRuntime.jsx("span", { children: option.label })
            ]
          },
          option.value
        );
      })
    }
  );
};

exports.ButtonGroup = ButtonGroup;
exports.ButtonGroupToggle = ButtonGroupToggle;
exports.ButtonToolbar = ButtonToolbar;
//# sourceMappingURL=index.cjs.map
//# sourceMappingURL=index.cjs.map