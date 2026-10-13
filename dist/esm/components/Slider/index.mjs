import { useState } from 'react';
import { jsxs, jsx } from 'react/jsx-runtime';

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
  const [internalValue, setInternalValue] = useState(defaultValue);
  const currentValue = controlled ? value : internalValue;
  return /* @__PURE__ */ jsxs("div", { className: Slider_default.root, children: [
    label && /* @__PURE__ */ jsx("label", { className: Slider_default.label, htmlFor: props.id, children: label }),
    /* @__PURE__ */ jsx(
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
    showValue && /* @__PURE__ */ jsx("output", { className: Slider_default.value, children: currentValue })
  ] });
};

export { Slider };
//# sourceMappingURL=index.mjs.map
//# sourceMappingURL=index.mjs.map