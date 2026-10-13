'use strict';

var jsxRuntime = require('react/jsx-runtime');

// src/Skeleton/Skeleton.module.css
var Skeleton_default = {};
function joinClasses(...classes) {
  return classes.filter(Boolean).join(" ");
}
var Skeleton = ({
  animation = "none",
  size,
  color = "default",
  width,
  as: Element = "span",
  className = "",
  style,
  "aria-hidden": ariaHidden = true,
  ...props
}) => {
  const normalizedWidth = typeof width === "number" ? `${width}px` : width;
  return /* @__PURE__ */ jsxRuntime.jsx(
    Element,
    {
      className: joinClasses(
        Skeleton_default.skeleton,
        Skeleton_default[animation],
        size && Skeleton_default[`size${size}`],
        Skeleton_default[color],
        className
      ),
      style: { ...style, ...normalizedWidth ? { width: normalizedWidth } : {} },
      "aria-hidden": ariaHidden,
      ...props
    }
  );
};

exports.Skeleton = Skeleton;
//# sourceMappingURL=index.cjs.map
//# sourceMappingURL=index.cjs.map