'use strict';

var react = require('react');
var jsxRuntime = require('react/jsx-runtime');

// src/Slider/Slider.tsx

// src/Slider/Slider.module.css
var Slider_default = {};
var Slider = ({
  value,
  defaultValue = 0,
  onValueChange,
  showValue = false,
  label,
  disabled = false,
  className = "",
  ...props
}) => {
  const controlled = value !== void 0;
  const [internalValue, setInternalValue] = react.useState(defaultValue);
  const currentValue = controlled ? value : internalValue;
  return /* @__PURE__ */ jsxRuntime.jsxs("div", { className: Slider_default.root, children: [
    label && /* @__PURE__ */ jsxRuntime.jsx("label", { className: Slider_default.label, htmlFor: props.id, children: label }),
    /* @__PURE__ */ jsxRuntime.jsx(
      "input",
      {
        ...props,
        type: "range",
        value: currentValue,
        disabled,
        className: `${Slider_default.slider} ${className}`.trim(),
        onChange: (event) => {
          const nextValue = Number(event.currentTarget.value);
          if (!controlled) setInternalValue(nextValue);
          onValueChange?.(nextValue);
        }
      }
    ),
    showValue && /* @__PURE__ */ jsxRuntime.jsx("output", { className: Slider_default.value, children: currentValue })
  ] });
};

exports.Slider = Slider;
//# sourceMappingURL=index.cjs.map
//# sourceMappingURL=index.cjs.map