'use strict';

var jsxRuntime = require('react/jsx-runtime');

// src/Progress/Progress.module.css
var Progress_default = {};
function joinClasses(...classes) {
  return classes.filter(Boolean).join(" ");
}
var Progress = ({
  value,
  min = 0,
  max = 100,
  variant = "primary",
  striped = false,
  animated = false,
  label,
  showValue = false,
  children,
  className = "",
  style,
  "aria-label": ariaLabel,
  ...props
}) => {
  const range = max - min;
  const percentage = range > 0 ? Math.min(100, Math.max(0, (value - min) / range * 100)) : 0;
  const displayLabel = children ?? label ?? (showValue ? `${Math.round(percentage)}%` : void 0);
  return /* @__PURE__ */ jsxRuntime.jsx(
    "div",
    {
      ...props,
      className: joinClasses(Progress_default.track, className),
      role: "progressbar",
      "aria-label": ariaLabel ?? (typeof label === "string" ? label : void 0),
      "aria-valuemin": min,
      "aria-valuemax": max,
      "aria-valuenow": value,
      "aria-valuetext": typeof displayLabel === "string" ? displayLabel : void 0,
      style,
      children: /* @__PURE__ */ jsxRuntime.jsx(
        "div",
        {
          className: joinClasses(Progress_default.bar, Progress_default[variant], striped && Progress_default.striped, animated && Progress_default.animated),
          style: { width: `${percentage}%` },
          "aria-hidden": "true",
          children: displayLabel
        }
      )
    }
  );
};
var ProgressSegment = ({
  value,
  min = 0,
  max = 100,
  variant = "primary",
  striped = false,
  animated = false,
  label,
  showValue = false,
  children,
  className = "",
  style,
  "aria-label": ariaLabel,
  ...props
}) => {
  const range = max - min;
  const percentage = range > 0 ? Math.min(100, Math.max(0, (value - min) / range * 100)) : 0;
  const displayLabel = children ?? label ?? (showValue ? `${Math.round(percentage)}%` : void 0);
  return /* @__PURE__ */ jsxRuntime.jsx(
    "div",
    {
      ...props,
      className: joinClasses(
        Progress_default.bar,
        Progress_default[variant],
        striped && Progress_default.striped,
        animated && Progress_default.animated,
        className
      ),
      role: "progressbar",
      "aria-label": ariaLabel ?? (typeof label === "string" ? label : void 0),
      "aria-valuemin": min,
      "aria-valuemax": max,
      "aria-valuenow": value,
      "aria-valuetext": typeof displayLabel === "string" ? displayLabel : void 0,
      style: { ...style, width: `${percentage}%` },
      children: displayLabel
    }
  );
};
var ProgressStack = ({
  label = "Progress",
  height,
  children,
  className = "",
  style,
  ...props
}) => {
  const normalizedHeight = typeof height === "number" ? `${height}px` : height;
  return /* @__PURE__ */ jsxRuntime.jsx(
    "div",
    {
      ...props,
      className: joinClasses(Progress_default.track, Progress_default.stacked, className),
      role: "group",
      "aria-label": label,
      style: { ...style, ...normalizedHeight ? { height: normalizedHeight } : {} },
      children
    }
  );
};

exports.Progress = Progress;
exports.ProgressSegment = ProgressSegment;
exports.ProgressStack = ProgressStack;
//# sourceMappingURL=index.cjs.map
//# sourceMappingURL=index.cjs.map