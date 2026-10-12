import { createContext, useId, useState, useEffect, useContext } from 'react';
import { jsx, jsxs } from 'react/jsx-runtime';

// src/Toast/Toast.tsx

// src/Toast/Toast.module.css
var Toast_default = {};
var ToastContext = createContext(null);
function joinClasses(...classes) {
  return classes.filter(Boolean).join(" ");
}
var placementClasses = {
  "top-start": Toast_default.topstart,
  "top-center": Toast_default.topcenter,
  "top-end": Toast_default.topend,
  "middle-start": Toast_default.middlestart,
  "middle-center": Toast_default.middlecenter,
  "middle-end": Toast_default.middleend,
  "bottom-start": Toast_default.bottomstart,
  "bottom-center": Toast_default.bottomcenter,
  "bottom-end": Toast_default.bottomend
};
function useToastContext() {
  const context = useContext(ToastContext);
  if (!context) throw new Error("ToastClose must be rendered inside Toast.");
  return context;
}
var Toast = ({
  title,
  variant = "light",
  autohide = false,
  delay = 5e3,
  open,
  defaultOpen = true,
  onOpenChange,
  onClose,
  closeButton = true,
  children,
  className = "",
  ...props
}) => {
  const generatedId = useId().replace(/:/g, "");
  const [internalOpen, setInternalOpen] = useState(defaultOpen);
  const isControlled = open !== void 0;
  const isOpen = isControlled ? open : internalOpen;
  const close = () => {
    if (!isControlled) setInternalOpen(false);
    onOpenChange?.(false);
    onClose?.();
  };
  useEffect(() => {
    if (!isOpen || !autohide || delay <= 0) return;
    const timeout = window.setTimeout(close, delay);
    return () => window.clearTimeout(timeout);
  }, [isOpen, autohide, delay, isControlled, onOpenChange, onClose]);
  if (!isOpen) return null;
  return /* @__PURE__ */ jsx(ToastContext.Provider, { value: { titleId: `${generatedId}-title`, close }, children: /* @__PURE__ */ jsxs(
    "div",
    {
      ...props,
      className: joinClasses(Toast_default.toast, Toast_default[variant], className),
      role: "status",
      "aria-live": variant === "danger" ? "assertive" : "polite",
      "aria-atomic": "true",
      children: [
        /* @__PURE__ */ jsxs("div", { className: Toast_default.header, children: [
          title !== void 0 && /* @__PURE__ */ jsx("strong", { id: `${generatedId}-title`, className: Toast_default.title, children: title }),
          closeButton && /* @__PURE__ */ jsx(ToastClose, { "aria-label": "Close notification" })
        ] }),
        children !== void 0 && /* @__PURE__ */ jsx("div", { className: Toast_default.body, children })
      ]
    }
  ) });
};
var ToastClose = ({ children, className = "", onClick, type = "button", ...props }) => {
  const { close } = useToastContext();
  return /* @__PURE__ */ jsx(
    "button",
    {
      ...props,
      type,
      className: joinClasses(Toast_default.close, className),
      onClick: (event) => {
        onClick?.(event);
        if (!event.defaultPrevented) close();
      },
      children: children ?? /* @__PURE__ */ jsx("svg", { "aria-hidden": "true", viewBox: "0 0 16 16", children: /* @__PURE__ */ jsx("path", { d: "m3 3 10 10M13 3 3 13", fill: "none", stroke: "currentColor", strokeLinecap: "round", strokeWidth: "1.5" }) })
    }
  );
};
var ToastContainer = ({
  placement = "top-end",
  stacked = false,
  children,
  className = "",
  ...props
}) => {
  return /* @__PURE__ */ jsx(
    "div",
    {
      ...props,
      className: joinClasses(Toast_default.container, placementClasses[placement], stacked && Toast_default.stacked, className),
      "aria-label": "Notifications",
      children
    }
  );
};

export { Toast, ToastClose, ToastContainer };
//# sourceMappingURL=index.mjs.map
//# sourceMappingURL=index.mjs.map