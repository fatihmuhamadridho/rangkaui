'use strict';

var jsxRuntime = require('react/jsx-runtime');

// src/Badge/Badge.module.css
var Badge_default = {};
var Badge = ({
  variant = "secondary",
  pill = false,
  position,
  dot = false,
  className = "",
  children,
  "aria-label": ariaLabel,
  ...props
}) => {
  const classes = [
    Badge_default.badge,
    Badge_default[variant],
    pill && Badge_default.pill,
    position && Badge_default[position.replace("-", "")],
    dot && Badge_default.dot,
    className
  ].filter(Boolean).join(" ");
  return /* @__PURE__ */ jsxRuntime.jsx("span", { className: classes, "aria-label": ariaLabel ?? (dot ? "Notification" : void 0), ...props, children: !dot && children });
};

exports.Badge = Badge;
//# sourceMappingURL=index.cjs.map
//# sourceMappingURL=index.cjs.map