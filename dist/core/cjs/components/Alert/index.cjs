'use strict';

var react = require('react');
var jsxRuntime = require('react/jsx-runtime');

// src/Alert/Alert.tsx

// src/Alert/Alert.module.css
var Alert_default = {};
var variants = {
  primary: Alert_default.primary,
  secondary: Alert_default.secondary,
  success: Alert_default.success,
  danger: Alert_default.danger,
  warning: Alert_default.warning,
  info: Alert_default.info,
  light: Alert_default.light,
  dark: Alert_default.dark
};
var CloseIcon = () => {
  return /* @__PURE__ */ jsxRuntime.jsx("svg", { "aria-hidden": "true", viewBox: "0 0 16 16", className: Alert_default.closeIcon, children: /* @__PURE__ */ jsxRuntime.jsx("path", { d: "m3 3 10 10M13 3 3 13", fill: "none", stroke: "currentColor", strokeLinecap: "round", strokeWidth: "1.5" }) });
};
var Alert = ({
  variant = "primary",
  dismissible = false,
  onClose,
  icon,
  title,
  children,
  className = "",
  role = "alert",
  ...props
}) => {
  const [isVisible, setIsVisible] = react.useState(true);
  if (!isVisible) return null;
  const close = () => {
    setIsVisible(false);
    onClose?.();
  };
  return /* @__PURE__ */ jsxRuntime.jsxs(
    "div",
    {
      className: [Alert_default.alert, variants[variant], dismissible && Alert_default.dismissible, className].filter(Boolean).join(" "),
      role,
      ...props,
      children: [
        icon && /* @__PURE__ */ jsxRuntime.jsx("span", { className: Alert_default.icon, "aria-hidden": "true", children: icon }),
        /* @__PURE__ */ jsxRuntime.jsxs("div", { className: Alert_default.content, children: [
          title && /* @__PURE__ */ jsxRuntime.jsx("div", { className: Alert_default.title, children: title }),
          children
        ] }),
        dismissible && /* @__PURE__ */ jsxRuntime.jsx("button", { type: "button", className: Alert_default.closeButton, "aria-label": "Close alert", onClick: close, children: /* @__PURE__ */ jsxRuntime.jsx(CloseIcon, {}) })
      ]
    }
  );
};

exports.Alert = Alert;
//# sourceMappingURL=index.cjs.map
//# sourceMappingURL=index.cjs.map