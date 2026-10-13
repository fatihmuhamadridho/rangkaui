import { jsx } from 'react/jsx-runtime';

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
  return /* @__PURE__ */ jsx(
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

export { Skeleton };
//# sourceMappingURL=index.mjs.map
//# sourceMappingURL=index.mjs.map