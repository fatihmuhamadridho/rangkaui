import { jsx, jsxs } from 'react/jsx-runtime';

// src/Divider/Divider.module.css
var Divider_default = {};
var Divider = ({
  orientation = "horizontal",
  variant = "solid",
  align = "center",
  children,
  className = "",
  ...props
}) => {
  if (orientation === "vertical") {
    return /* @__PURE__ */ jsx(
      "div",
      {
        className: [Divider_default.divider, Divider_default.vertical, Divider_default[variant], className].filter(Boolean).join(" "),
        role: "separator",
        "aria-orientation": "vertical",
        ...props
      }
    );
  }
  return /* @__PURE__ */ jsxs(
    "div",
    {
      className: [
        Divider_default.divider,
        Divider_default.horizontal,
        Divider_default[variant],
        children ? Divider_default.withLabel : Divider_default.withoutLabel,
        Divider_default[align],
        className
      ].filter(Boolean).join(" "),
      role: "separator",
      "aria-orientation": "horizontal",
      ...props,
      children: [
        /* @__PURE__ */ jsx("span", { className: Divider_default.rule, "aria-hidden": "true" }),
        children && /* @__PURE__ */ jsx("span", { className: Divider_default.label, children }),
        children && /* @__PURE__ */ jsx("span", { className: Divider_default.rule, "aria-hidden": "true" })
      ]
    }
  );
};

export { Divider };
//# sourceMappingURL=index.mjs.map
//# sourceMappingURL=index.mjs.map