'use strict';

var react = require('react');
var jsxRuntime = require('react/jsx-runtime');

// src/Rate/Rate.tsx

// src/Rate/Rate.module.css
var Rate_default = {};
function joinClasses(...classes) {
  return classes.filter(Boolean).join(" ");
}
var Rate = ({
  value,
  defaultValue = 0,
  onChange,
  count = 5,
  allowHalf = false,
  allowClear = true,
  readOnly = false,
  disabled = false,
  icon = "star",
  size = "medium",
  label = "Rating",
  className = "",
  ...props
}) => {
  const [internalValue, setInternalValue] = react.useState(defaultValue);
  const [hoverValue, setHoverValue] = react.useState(0);
  const controlled = value !== void 0;
  const selected = controlled ? value : internalValue;
  const displayed = hoverValue || selected;
  const step = allowHalf ? 0.5 : 1;
  const selectValue = (next, clearIfSelected = true) => {
    const normalized = clearIfSelected && allowClear && next === selected ? 0 : next;
    if (!controlled) setInternalValue(normalized);
    onChange?.(normalized);
  };
  return /* @__PURE__ */ jsxRuntime.jsx(
    "div",
    {
      ...props,
      className: joinClasses(Rate_default.rate, Rate_default[size], disabled && Rate_default.disabled, className),
      role: "radiogroup",
      "aria-label": label,
      "aria-disabled": disabled || void 0,
      onMouseLeave: () => setHoverValue(0),
      children: Array.from({ length: count }, (_, index) => {
        const rating = index + 1;
        const amount = Math.max(0, Math.min(1, displayed - index));
        const options = allowHalf ? [rating - 0.5, rating] : [rating];
        return /* @__PURE__ */ jsxRuntime.jsx("span", { className: Rate_default.item, onMouseLeave: () => void 0, children: options.map((option) => /* @__PURE__ */ jsxRuntime.jsxs(
          "button",
          {
            type: "button",
            className: joinClasses(Rate_default.choice, Rate_default[icon], option % 1 !== 0 && Rate_default.halfChoice),
            role: "radio",
            "aria-checked": selected === option,
            "aria-label": `${option} out of ${count}`,
            "aria-pressed": selected === option,
            disabled: disabled || readOnly,
            tabIndex: selected === option || selected === 0 && option === (allowHalf ? 0.5 : 1) ? 0 : -1,
            onMouseEnter: () => !disabled && !readOnly && setHoverValue(option),
            onFocus: () => !disabled && !readOnly && setHoverValue(option),
            onBlur: () => setHoverValue(0),
            onClick: () => selectValue(option),
            onKeyDown: (event) => {
              if (!["ArrowRight", "ArrowUp", "ArrowLeft", "ArrowDown", "Home", "End"].includes(event.key)) return;
              event.preventDefault();
              const current = options.indexOf(selected);
              const next = event.key === "Home" ? step : event.key === "End" ? count : Math.max(
                step,
                Math.min(count, selected + (["ArrowRight", "ArrowUp"].includes(event.key) ? step : -step))
              );
              selectValue(next, false);
              if (event.key === "Home" || event.key === "End" || current >= 0) {
                const sibling = event.currentTarget.parentElement?.parentElement?.querySelector(
                  `button[aria-label="${next} out of ${count}"]`
                );
                sibling?.focus();
              }
            },
            children: [
              /* @__PURE__ */ jsxRuntime.jsx("span", { className: Rate_default.iconBase, children: /* @__PURE__ */ jsxRuntime.jsx(RatingIcon, { type: icon }) }),
              /* @__PURE__ */ jsxRuntime.jsx(
                "span",
                {
                  className: Rate_default.iconFill,
                  style: { clipPath: `inset(0 ${100 - amount * 100}% 0 0)` },
                  "aria-hidden": "true",
                  children: /* @__PURE__ */ jsxRuntime.jsx(RatingIcon, { type: icon })
                }
              )
            ]
          },
          option
        )) }, rating);
      })
    }
  );
};
var RatingIcon = ({ type }) => {
  if (type === "face") {
    return /* @__PURE__ */ jsxRuntime.jsxs("svg", { viewBox: "0 0 24 24", fill: "none", "aria-hidden": "true", children: [
      /* @__PURE__ */ jsxRuntime.jsx("circle", { cx: "12", cy: "12", r: "9.5", stroke: "currentColor", strokeWidth: "1.8" }),
      /* @__PURE__ */ jsxRuntime.jsx("ellipse", { cx: "9", cy: "9.5", rx: "1", ry: "1.6", fill: "currentColor" }),
      /* @__PURE__ */ jsxRuntime.jsx("ellipse", { cx: "15", cy: "9.5", rx: "1", ry: "1.6", fill: "currentColor" }),
      /* @__PURE__ */ jsxRuntime.jsx("path", { d: "M7.5 14c.8 2 2.3 3 4.5 3s3.7-1 4.5-3", stroke: "currentColor", strokeWidth: "1.6", strokeLinecap: "round" })
    ] });
  }
  return /* @__PURE__ */ jsxRuntime.jsx("svg", { viewBox: "0 0 24 24", "aria-hidden": "true", children: /* @__PURE__ */ jsxRuntime.jsx(
    "path",
    {
      d: "m12 2.4 2.95 5.98 6.6.96-4.78 4.66 1.13 6.57L12 17.47l-5.9 3.1 1.13-6.57-4.78-4.66 6.6-.96L12 2.4Z",
      fill: "currentColor"
    }
  ) });
};

exports.Rate = Rate;
//# sourceMappingURL=index.cjs.map
//# sourceMappingURL=index.cjs.map