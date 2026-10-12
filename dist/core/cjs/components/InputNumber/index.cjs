'use strict';

var react = require('react');
var jsxRuntime = require('react/jsx-runtime');

// src/InputNumber/InputNumber.tsx

// src/InputNumber/InputNumber.module.css
var InputNumber_default = {};
function joinClasses(...classes) {
  return classes.filter(Boolean).join(" ");
}
var InputNumber = ({
  value,
  defaultValue = "",
  onValueChange,
  prefix,
  suffix,
  clearable = false,
  size = "medium",
  disabled = false,
  readOnly = false,
  className = "",
  wrapperClassName = "",
  min,
  max,
  step = 1,
  onBlur,
  onKeyDown,
  ...props
}) => {
  const controlled = value !== void 0;
  const [internalValue, setInternalValue] = react.useState(String(defaultValue));
  const currentValue = controlled ? String(value) : internalValue;
  const updateValue = (next) => {
    if (!controlled) setInternalValue(next);
    if (next === "") onValueChange?.(null);
    else {
      const numeric = Number(next);
      onValueChange?.(Number.isFinite(numeric) ? numeric : null);
    }
  };
  const clear = () => {
    if (disabled || readOnly) return;
    updateValue("");
  };
  return /* @__PURE__ */ jsxRuntime.jsxs("div", { className: joinClasses(InputNumber_default.wrapper, InputNumber_default[size], disabled && InputNumber_default.disabled, wrapperClassName), children: [
    prefix !== void 0 && /* @__PURE__ */ jsxRuntime.jsx("span", { className: InputNumber_default.addon, children: prefix }),
    /* @__PURE__ */ jsxRuntime.jsx(
      "input",
      {
        ...props,
        type: "number",
        min,
        max,
        step,
        value: currentValue,
        disabled,
        readOnly,
        className: joinClasses(InputNumber_default.input, className),
        onChange: (event) => updateValue(event.currentTarget.value),
        onBlur: (event) => {
          onBlur?.(event);
          if (event.defaultPrevented) return;
          const numeric = Number(event.currentTarget.value);
          if (event.currentTarget.value !== "" && Number.isFinite(numeric)) {
            const lower = min === void 0 ? numeric : Math.max(numeric, Number(min));
            const bounded = max === void 0 ? lower : Math.min(lower, Number(max));
            if (bounded !== numeric) updateValue(String(bounded));
          }
        },
        onKeyDown: (event) => {
          onKeyDown?.(event);
          if (event.key === "Escape") event.currentTarget.blur();
        }
      }
    ),
    clearable && currentValue !== "" && !disabled && !readOnly && /* @__PURE__ */ jsxRuntime.jsx("button", { type: "button", className: InputNumber_default.clear, "aria-label": "Clear number", onClick: clear, children: /* @__PURE__ */ jsxRuntime.jsx(ClearIcon, {}) }),
    suffix !== void 0 && /* @__PURE__ */ jsxRuntime.jsx("span", { className: InputNumber_default.addon, children: suffix })
  ] });
};
var ClearIcon = () => {
  return /* @__PURE__ */ jsxRuntime.jsxs("svg", { "aria-hidden": "true", viewBox: "0 0 16 16", children: [
    /* @__PURE__ */ jsxRuntime.jsx("circle", { cx: "8", cy: "8", r: "6", fill: "currentColor" }),
    /* @__PURE__ */ jsxRuntime.jsx("path", { d: "m6 6 4 4m0-4-4 4", fill: "none", stroke: "white", strokeLinecap: "round", strokeWidth: "1.5" })
  ] });
};

exports.InputNumber = InputNumber;
//# sourceMappingURL=index.cjs.map
//# sourceMappingURL=index.cjs.map