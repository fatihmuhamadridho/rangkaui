import { jsx } from 'react/jsx-runtime';

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
  return /* @__PURE__ */ jsx("div", { className: classes, ...props, children });
};

export { Box };
//# sourceMappingURL=index.mjs.map
//# sourceMappingURL=index.mjs.map