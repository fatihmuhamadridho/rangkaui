'use strict';

var react = require('react');
var reactDom = require('react-dom');
var jsxRuntime = require('react/jsx-runtime');

// src/Modal/Modal.tsx

// src/Modal/Modal.module.css
var Modal_default = {};
var ModalContext = react.createContext(null);
function useModalContext() {
  const context = react.useContext(ModalContext);
  if (!context) throw new Error("ModalTrigger and ModalContent must be rendered inside Modal.");
  return context;
}
function joinClasses(...classes) {
  return classes.filter(Boolean).join(" ");
}
var Modal = ({
  open,
  defaultOpen = false,
  onOpenChange,
  closeOnEscape = true,
  closeOnBackdrop = true,
  children
}) => {
  const generatedId = react.useId().replace(/:/g, "");
  const [internalOpen, setInternalOpen] = react.useState(defaultOpen);
  const isControlled = open !== void 0;
  const expanded = isControlled ? open : internalOpen;
  const setOpen = (nextOpen) => {
    if (!isControlled) setInternalOpen(nextOpen);
    onOpenChange?.(nextOpen);
  };
  return /* @__PURE__ */ jsxRuntime.jsx(
    ModalContext.Provider,
    {
      value: {
        open: expanded,
        setOpen,
        titleId: `${generatedId}-title`,
        descriptionId: `${generatedId}-description`,
        closeOnEscape,
        closeOnBackdrop
      },
      children
    }
  );
};
var ModalTrigger = ({
  children = "Open modal",
  className = "",
  type = "button",
  onClick,
  ...props
}) => {
  const { open, setOpen } = useModalContext();
  return /* @__PURE__ */ jsxRuntime.jsx(
    "button",
    {
      ...props,
      type,
      className: joinClasses(Modal_default.trigger, className),
      "aria-haspopup": "dialog",
      "aria-expanded": open,
      onClick: (event) => {
        onClick?.(event);
        if (!event.defaultPrevented) setOpen(true);
      },
      children
    }
  );
};
var ModalContent = ({
  size = "md",
  centered = false,
  scrollable = false,
  showCloseButton = true,
  children,
  className = "",
  onKeyDown,
  onMouseDown,
  "aria-label": ariaLabel,
  ...props
}) => {
  const { open, setOpen, titleId, descriptionId, closeOnEscape, closeOnBackdrop } = useModalContext();
  const [mounted, setMounted] = react.useState(false);
  const dialogRef = react.useRef(null);
  react.useEffect(() => setMounted(true), []);
  react.useEffect(() => {
    if (!open || !mounted || typeof document === "undefined") return;
    const previousFocus = document.activeElement instanceof HTMLElement ? document.activeElement : null;
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    const frame = window.requestAnimationFrame(() => {
      const firstFocusable = dialogRef.current?.querySelector(
        '[autofocus], button:not(:disabled), [href], input:not(:disabled), select:not(:disabled), textarea:not(:disabled), [tabindex]:not([tabindex="-1"])'
      );
      (firstFocusable ?? dialogRef.current)?.focus();
    });
    return () => {
      window.cancelAnimationFrame(frame);
      document.body.style.overflow = previousOverflow;
      previousFocus?.focus();
    };
  }, [open, mounted]);
  const handleKeyDown = (event) => {
    onKeyDown?.(event);
    if (event.defaultPrevented) return;
    if (event.key === "Escape" && closeOnEscape) {
      event.preventDefault();
      setOpen(false);
      return;
    }
    if (event.key !== "Tab") return;
    const focusable = Array.from(
      dialogRef.current?.querySelectorAll(
        'button:not(:disabled), [href], input:not(:disabled), select:not(:disabled), textarea:not(:disabled), [tabindex]:not([tabindex="-1"])'
      ) ?? []
    );
    if (!focusable.length) {
      event.preventDefault();
      dialogRef.current?.focus();
      return;
    }
    const first = focusable[0];
    const last = focusable[focusable.length - 1];
    if (event.shiftKey && document.activeElement === first) {
      event.preventDefault();
      last.focus();
    } else if (!event.shiftKey && document.activeElement === last) {
      event.preventDefault();
      first.focus();
    }
  };
  if (!open || !mounted || typeof document === "undefined") return null;
  return reactDom.createPortal(
    /* @__PURE__ */ jsxRuntime.jsx(
      "div",
      {
        className: joinClasses(Modal_default.backdrop, centered && Modal_default.centered),
        onMouseDown: (event) => {
          onMouseDown?.(event);
          if (!event.defaultPrevented && closeOnBackdrop && event.target === event.currentTarget) setOpen(false);
        },
        children: /* @__PURE__ */ jsxRuntime.jsxs(
          "div",
          {
            ...props,
            ref: dialogRef,
            className: joinClasses(Modal_default.dialog, Modal_default[size], scrollable && Modal_default.scrollable, className),
            role: "dialog",
            "aria-modal": "true",
            "aria-labelledby": ariaLabel ? void 0 : titleId,
            "aria-label": ariaLabel,
            "aria-describedby": descriptionId,
            tabIndex: -1,
            onKeyDown: handleKeyDown,
            children: [
              showCloseButton && /* @__PURE__ */ jsxRuntime.jsx(ModalClose, { className: Modal_default.closeButton, "aria-label": "Close dialog" }),
              children
            ]
          }
        )
      }
    ),
    document.body
  );
};
var ModalHeader = ({ children, className = "", ...props }) => {
  return /* @__PURE__ */ jsxRuntime.jsx("div", { className: joinClasses(Modal_default.header, className), ...props, children });
};
var ModalTitle = ({ as: Heading = "h2", children, className = "", ...props }) => {
  const { titleId } = useModalContext();
  return /* @__PURE__ */ jsxRuntime.jsx(Heading, { ...props, id: titleId, className: joinClasses(Modal_default.title, className), children });
};
var ModalDescription = ({ children, className = "", ...props }) => {
  const { descriptionId } = useModalContext();
  return /* @__PURE__ */ jsxRuntime.jsx("p", { ...props, id: descriptionId, className: joinClasses(Modal_default.description, className), children });
};
var ModalBody = ({ children, className = "", ...props }) => {
  return /* @__PURE__ */ jsxRuntime.jsx("div", { className: joinClasses(Modal_default.body, className), ...props, children });
};
var ModalFooter = ({ children, className = "", ...props }) => {
  return /* @__PURE__ */ jsxRuntime.jsx("div", { className: joinClasses(Modal_default.footer, className), ...props, children });
};
var ModalClose = ({
  children,
  variant = "secondary",
  className = "",
  type = "button",
  onClick,
  ...props
}) => {
  const { setOpen } = useModalContext();
  const closeClass = children === void 0 ? Modal_default.close : joinClasses(Modal_default.actionClose, Modal_default[`action${variant}`]);
  return /* @__PURE__ */ jsxRuntime.jsx(
    "button",
    {
      ...props,
      type,
      className: joinClasses(closeClass, className),
      onClick: (event) => {
        onClick?.(event);
        if (!event.defaultPrevented) setOpen(false);
      },
      children: children ?? /* @__PURE__ */ jsxRuntime.jsx("svg", { "aria-hidden": "true", viewBox: "0 0 16 16", children: /* @__PURE__ */ jsxRuntime.jsx("path", { d: "m3 3 10 10M13 3 3 13", fill: "none", stroke: "currentColor", strokeLinecap: "round", strokeWidth: "1.5" }) })
    }
  );
};

exports.Modal = Modal;
exports.ModalBody = ModalBody;
exports.ModalClose = ModalClose;
exports.ModalContent = ModalContent;
exports.ModalDescription = ModalDescription;
exports.ModalFooter = ModalFooter;
exports.ModalHeader = ModalHeader;
exports.ModalTitle = ModalTitle;
exports.ModalTrigger = ModalTrigger;
//# sourceMappingURL=index.cjs.map
//# sourceMappingURL=index.cjs.map