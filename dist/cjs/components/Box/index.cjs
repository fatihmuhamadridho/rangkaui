'use strict';

var jsxRuntime = require('react/jsx-runtime');

// src/Box/Box.module.css
var Box_default = {};
var Box = ({
  children,
  className = "",
  padded = false,
  bordered = false,
  rounded = false,
  shadow = false,
  ...props
}) => {
  const classes = [
    Box_default.box,
    padded && Box_default.padded,
    bordered && Box_default.bordered,
    rounded && Box_default.rounded,
    shadow && Box_default.shadow,
    className
  ].filter(Boolean).join(" ");
  return /* @__PURE__ */ jsxRuntime.jsx("div", { className: classes, ...props, children });
};

exports.Box = Box;
//# sourceMappingURL=index.cjs.map
//# sourceMappingURL=index.cjs.map