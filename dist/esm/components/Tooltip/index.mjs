import { createContext, useId, useState, useRef, useEffect, useContext } from 'react';
import { jsx, jsxs } from 'react/jsx-runtime';

// src/Tooltip/Tooltip.tsx

// src/Tooltip/Tooltip.module.css
var Tooltip_default = {};
var TooltipContext = createContext(null);
function joinClasses(...classes) {
  return classes.filter(Boolean).join(" ");
}
var placementClasses = {
  top: Tooltip_default.top,
  right: Tooltip_default.right,
  bottom: Tooltip_default.bottom,
  left: Tooltip_default.left
};
function useTooltipContext() {
  const context = useContext(TooltipContext);
  if (!context) throw new Error("TooltipTrigger and TooltipContent must be rendered inside Tooltip.");
  return context;
}
var Tooltip = ({
  content,
  placement = "top",
  trigger = "hover",
  open,
  defaultOpen = false,
  onOpenChange,
  interactive = false,
  children,
  className = "",
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
    const handleKeyDown = (event) => {
      if (event.key === "Escape") {
        setOpen(false);
        triggerRef.current?.focus();
      }
    };
    document.addEventListener("pointerdown", handlePointerDown);
    document.addEventListener("keydown", handleKeyDown);
    return () => {
      document.removeEventListener("pointerdown", handlePointerDown);
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [isOpen, isControlled, onOpenChange]);
  return /* @__PURE__ */ jsx(
    TooltipContext.Provider,
    {
      value: {
        open: isOpen,
        setOpen,
        toggle: () => setOpen(!isOpen),
        tooltipId: `${generatedId}-tooltip`,
        triggerRef,
        contentRef,
        triggerMode: trigger
      },
      children: /* @__PURE__ */ jsxs(
        "div",
        {
          ...props,
          ref: rootRef,
          className: joinClasses(Tooltip_default.root, placementClasses[placement], interactive && Tooltip_default.interactive, className),
          children: [
            children,
            isOpen && /* @__PURE__ */ jsxs("div", { ref: contentRef, id: `${generatedId}-tooltip`, className: Tooltip_default.content, role: "tooltip", children: [
              content,
              /* @__PURE__ */ jsx("span", { className: Tooltip_default.arrow, "aria-hidden": "true" })
            ] })
          ]
        }
      )
    }
  );
};
var TooltipTrigger = ({
  children = "Show tooltip",
  className = "",
  type = "button",
  onClick,
  onMouseEnter,
  onMouseLeave,
  onFocus,
  onBlur,
  ...props
}) => {
  const { open, setOpen, toggle, tooltipId, triggerRef, contentRef, triggerMode } = useTooltipContext();
  return /* @__PURE__ */ jsx(
    "button",
    {
      ...props,
      ref: (node) => {
        triggerRef.current = node;
      },
      type,
      className: joinClasses(Tooltip_default.trigger, className),
      "aria-describedby": open ? tooltipId : void 0,
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
        if (triggerMode === "focus" || triggerMode === "hover") setOpen(true);
      },
      onBlur: (event) => {
        onBlur?.(event);
        if ((triggerMode === "focus" || triggerMode === "hover") && !contentRef.current?.contains(event.relatedTarget))
          setOpen(false);
      },
      children
    }
  );
};
var TooltipLink = ({
  children,
  className = "",
  onClick,
  onMouseEnter,
  onMouseLeave,
  onFocus,
  onBlur,
  ...props
}) => {
  const { setOpen, toggle, tooltipId, triggerRef, contentRef, triggerMode, open } = useTooltipContext();
  return /* @__PURE__ */ jsx(
    "a",
    {
      ...props,
      ref: (node) => {
        triggerRef.current = node;
      },
      className: joinClasses(Tooltip_default.link, className),
      "aria-describedby": open ? tooltipId : void 0,
      onClick: (event) => {
        onClick?.(event);
        if (!event.defaultPrevented && triggerMode === "click") {
          event.preventDefault();
          toggle();
        }
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
        if (triggerMode === "focus" || triggerMode === "hover") setOpen(true);
      },
      onBlur: (event) => {
        onBlur?.(event);
        if ((triggerMode === "focus" || triggerMode === "hover") && !contentRef.current?.contains(event.relatedTarget))
          setOpen(false);
      },
      children
    }
  );
};

export { Tooltip, TooltipLink, TooltipTrigger };
//# sourceMappingURL=index.mjs.map
//# sourceMappingURL=index.mjs.map