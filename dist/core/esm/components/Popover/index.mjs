import { createContext, useId, useState, useRef, useEffect, useContext } from 'react';
import { jsx, jsxs } from 'react/jsx-runtime';

// src/Popover/Popover.tsx

// src/Popover/Popover.module.css
var Popover_default = {};
var PopoverContext = createContext(null);
function joinClasses(...classes) {
  return classes.filter(Boolean).join(" ");
}
function usePopoverContext() {
  const context = useContext(PopoverContext);
  if (!context) throw new Error("PopoverTrigger and PopoverContent must be rendered inside Popover.");
  return context;
}
var Popover = ({
  open,
  defaultOpen = false,
  onOpenChange,
  placement = "top",
  trigger = "click",
  children,
  className = "",
  onKeyDown,
  ...props
}) => {
  const generatedId = useId().replace(/:/g, "");
  const [internalOpen, setInternalOpen] = useState(defaultOpen);
  const rootRef = useRef(null);
  const triggerRef = useRef(null);
  const contentRef = useRef(null);
  const isControlled = open !== void 0;
  const isOpen = isControlled ? open : internalOpen;
  const setOpen = (nextOpen) => {
    if (!isControlled) setInternalOpen(nextOpen);
    onOpenChange?.(nextOpen);
  };
  useEffect(() => {
    if (!isOpen) return;
    const handlePointerDown = (event) => {
      if (!rootRef.current?.contains(event.target)) setOpen(false);
    };
    const handleDocumentKeyDown = (event) => {
      if (event.key === "Escape") {
        setOpen(false);
        triggerRef.current?.focus();
      }
    };
    document.addEventListener("pointerdown", handlePointerDown);
    document.addEventListener("keydown", handleDocumentKeyDown);
    return () => {
      document.removeEventListener("pointerdown", handlePointerDown);
      document.removeEventListener("keydown", handleDocumentKeyDown);
    };
  }, [isOpen, isControlled, onOpenChange]);
  return /* @__PURE__ */ jsx(
    PopoverContext.Provider,
    {
      value: {
        open: isOpen,
        setOpen,
        toggle: () => setOpen(!isOpen),
        contentId: `${generatedId}-content`,
        titleId: `${generatedId}-title`,
        triggerRef,
        contentRef,
        placement,
        triggerMode: trigger
      },
      children: /* @__PURE__ */ jsx(
        "div",
        {
          ...props,
          ref: rootRef,
          className: joinClasses(Popover_default.root, Popover_default[placement], className),
          onKeyDown: (event) => {
            onKeyDown?.(event);
            if (!event.defaultPrevented && event.key === "Escape" && isOpen) {
              setOpen(false);
              triggerRef.current?.focus();
            }
          },
          children
        }
      )
    }
  );
};
var PopoverTrigger = ({
  children = "Toggle popover",
  className = "",
  type = "button",
  onClick,
  onMouseEnter,
  onMouseLeave,
  onFocus,
  onBlur,
  ...props
}) => {
  const { open, setOpen, toggle, contentId, triggerRef, contentRef, triggerMode } = usePopoverContext();
  return /* @__PURE__ */ jsx(
    "button",
    {
      ...props,
      ref: triggerRef,
      type,
      className: joinClasses(Popover_default.trigger, className),
      "aria-haspopup": "dialog",
      "aria-expanded": open,
      "aria-controls": contentId,
      "aria-describedby": open ? contentId : void 0,
      onClick: (event) => {
        onClick?.(event);
        if (!event.defaultPrevented && triggerMode === "click") toggle();
      },
      onMouseEnter: (event) => {
        onMouseEnter?.(event);
        if (triggerMode === "hover") setOpen(true);
      },
      onMouseLeave: (event) => {
        onMouseLeave?.(event);
        if (triggerMode === "hover" && !contentRef.current?.matches(":hover")) setOpen(false);
      },
      onFocus: (event) => {
        onFocus?.(event);
        if (triggerMode === "focus") setOpen(true);
      },
      onBlur: (event) => {
        onBlur?.(event);
        if (triggerMode === "focus" && !contentRef.current?.contains(event.relatedTarget)) setOpen(false);
      },
      children
    }
  );
};
var PopoverContent = ({
  title,
  children,
  className = "",
  onMouseEnter,
  onMouseLeave,
  ...props
}) => {
  const { open, setOpen, contentId, titleId, contentRef, triggerMode } = usePopoverContext();
  if (!open) return null;
  return /* @__PURE__ */ jsxs(
    "div",
    {
      ...props,
      ref: contentRef,
      id: contentId,
      className: joinClasses(Popover_default.content, className),
      role: "dialog",
      "aria-labelledby": title !== void 0 ? titleId : void 0,
      onMouseEnter: (event) => {
        onMouseEnter?.(event);
        if (triggerMode === "hover") setOpen(true);
      },
      onMouseLeave: (event) => {
        onMouseLeave?.(event);
        if (triggerMode === "hover" && !event.currentTarget.parentElement?.matches(":hover")) setOpen(false);
      },
      children: [
        /* @__PURE__ */ jsx("span", { className: Popover_default.arrow, "aria-hidden": "true" }),
        title !== void 0 && /* @__PURE__ */ jsx("div", { id: titleId, className: Popover_default.header, children: title }),
        /* @__PURE__ */ jsx("div", { className: Popover_default.body, children })
      ]
    }
  );
};

export { Popover, PopoverContent, PopoverTrigger };
//# sourceMappingURL=index.mjs.map
//# sourceMappingURL=index.mjs.map