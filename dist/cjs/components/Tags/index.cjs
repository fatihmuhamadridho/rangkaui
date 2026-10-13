'use strict';

var jsxRuntime = require('react/jsx-runtime');

// src/Tags/Tags.module.css
var Tags_default = {};
function joinClasses(...classes) {
  return classes.filter(Boolean).join(" ");
}
var Tag = ({
  children,
  icon = /* @__PURE__ */ jsxRuntime.jsx(TagIcon, {}),
  closable = false,
  onClose,
  closeButtonProps,
  size = "medium",
  variant = "default",
  className = "",
  ...props
}) => {
  return /* @__PURE__ */ jsxRuntime.jsxs("span", { ...props, className: joinClasses(Tags_default.tag, Tags_default[size], Tags_default[variant], className), children: [
    icon !== null && /* @__PURE__ */ jsxRuntime.jsx("span", { className: Tags_default.icon, "aria-hidden": "true", children: icon }),
    /* @__PURE__ */ jsxRuntime.jsx("span", { className: Tags_default.label, children }),
    closable && /* @__PURE__ */ jsxRuntime.jsx(
      "button",
      {
        ...closeButtonProps,
        type: "button",
        className: joinClasses(Tags_default.close, closeButtonProps?.className),
        "aria-label": closeButtonProps?.["aria-label"] ?? `Remove ${typeof children === "string" ? children : "tag"}`,
        onClick: onClose,
        children: /* @__PURE__ */ jsxRuntime.jsx(CloseIcon, {})
      }
    )
  ] });
};
var Tags = ({ children, gap = "medium", className = "", role = "list", ...props }) => {
  return /* @__PURE__ */ jsxRuntime.jsx("div", { ...props, className: joinClasses(Tags_default.tags, Tags_default[`gap${gap}`], className), role, children });
};
var TagIcon = () => {
  return /* @__PURE__ */ jsxRuntime.jsxs("svg", { viewBox: "0 0 16 16", children: [
    /* @__PURE__ */ jsxRuntime.jsx(
      "path",
      {
        d: "M2.2 2.2h5.1l6.5 6.5-5.1 5.1-6.5-6.5V2.2Z",
        fill: "none",
        stroke: "currentColor",
        strokeLinejoin: "round",
        strokeWidth: "1.3"
      }
    ),
    /* @__PURE__ */ jsxRuntime.jsx("circle", { cx: "5.1", cy: "5.1", r: ".85", fill: "currentColor" })
  ] });
};
var CloseIcon = () => {
  return /* @__PURE__ */ jsxRuntime.jsx("svg", { viewBox: "0 0 16 16", children: /* @__PURE__ */ jsxRuntime.jsx("path", { d: "m3 3 10 10M13 3 3 13", fill: "none", stroke: "currentColor", strokeLinecap: "round", strokeWidth: "1.4" }) });
};

exports.Tag = Tag;
exports.Tags = Tags;
//# sourceMappingURL=index.cjs.map
//# sourceMappingURL=index.cjs.map