import { createContext, useId, useState, useRef, useEffect, useContext } from 'react';
import { jsx, jsxs } from 'react/jsx-runtime';

// src/Dropdown/Dropdown.tsx

// src/Dropdown/Dropdown.module.css
var Dropdown_default = {};
var DropdownContext = createContext(null);
var toggleVariants = {
  primary: Dropdown_default.primaryToggle,
  secondary: Dropdown_default.secondaryToggle,
  success: Dropdown_default.successToggle,
  danger: Dropdown_default.dangerToggle,
  warning: Dropdown_default.warningToggle,
  info: Dropdown_default.infoToggle,
  light: Dropdown_default.lightToggle,
  dark: Dropdown_default.darkToggle
};
function useDropdownContext() {
  const context = useContext(DropdownContext);
  if (!context) throw new Error("DropdownToggle and DropdownMenu must be rendered inside Dropdown.");
  return context;
}
function joinClasses(...classes) {
  return classes.filter(Boolean).join(" ");
}
var Dropdown = ({
  open,
  defaultOpen = false,
  onOpenChange,
  placement = "bottom-start",
  autoClose = true,
  dark = false,
  split = false,
  children,
  className = "",
  onKeyDown,
  ...props
}) => {
  const generatedId = useId().replace(/:/g, "");
  const [internalOpen, setInternalOpen] = useState(defaultOpen);
  const rootRef = useRef(null);
  const triggerRef = useRef(null);
  const menuRef = useRef(null);
  const isControlled = open !== void 0;
  const expanded = isControlled ? open : internalOpen;
  const setOpen = (nextOpen) => {
    if (!isControlled) setInternalOpen(nextOpen);
    onOpenChange?.(nextOpen);
  };
  useEffect(() => {
    if (!expanded || autoClose !== true && autoClose !== "outside") return;
    const handlePointerDown = (event) => {
      if (!rootRef.current?.contains(event.target)) setOpen(false);
    };
    document.addEventListener("pointerdown", handlePointerDown);
    return () => document.removeEventListener("pointerdown", handlePointerDown);
  }, [expanded, autoClose, isControlled, onOpenChange]);
  const focusMenuItem = (edge) => {
    window.requestAnimationFrame(() => {
      const menuItems = menuRef.current?.querySelectorAll(
        '[data-dropdown-item]:not([aria-disabled="true"]):not(:disabled)'
      );
      if (!menuItems?.length) return;
      menuItems[edge === "first" ? 0 : menuItems.length - 1].focus();
    });
  };
  const handleKeyDown = (event) => {
    onKeyDown?.(event);
    if (event.defaultPrevented) return;
    if (event.key === "Escape" && expanded) {
      event.preventDefault();
      setOpen(false);
      triggerRef.current?.focus();
      return;
    }
    if (event.target === triggerRef.current && (event.key === "ArrowDown" || event.key === "ArrowUp")) {
      event.preventDefault();
      setOpen(true);
      focusMenuItem(event.key === "ArrowDown" ? "first" : "last");
      return;
    }
    const menuItems = Array.from(
      menuRef.current?.querySelectorAll(
        '[data-dropdown-item]:not([aria-disabled="true"]):not(:disabled)'
      ) ?? []
    );
    const currentIndex = menuItems.indexOf(event.target);
    if (currentIndex < 0 || !["ArrowDown", "ArrowUp", "Home", "End"].includes(event.key)) return;
    event.preventDefault();
    const nextIndex = event.key === "Home" ? 0 : event.key === "End" ? menuItems.length - 1 : (currentIndex + (event.key === "ArrowDown" ? 1 : menuItems.length - 1)) % menuItems.length;
    menuItems[nextIndex]?.focus();
  };
  const context = {
    menuId: `${generatedId}-menu`,
    open: expanded,
    setOpen,
    toggle: () => setOpen(!expanded),
    autoClose,
    dark,
    triggerRef,
    menuRef
  };
  return /* @__PURE__ */ jsx(DropdownContext.Provider, { value: context, children: /* @__PURE__ */ jsx(
    "div",
    {
      ref: rootRef,
      className: joinClasses(
        Dropdown_default.dropdown,
        Dropdown_default[placement],
        dark && Dropdown_default.dark,
        split && Dropdown_default.split,
        className
      ),
      onKeyDown: handleKeyDown,
      ...props,
      children
    }
  ) });
};
var DropdownToggle = ({
  split = false,
  variant = "primary",
  children = split ? null : "Toggle dropdown",
  className = "",
  type = "button",
  onClick,
  ...props
}) => {
  const { menuId, open, toggle, triggerRef } = useDropdownContext();
  return /* @__PURE__ */ jsxs(
    "button",
    {
      ...props,
      ref: triggerRef,
      type,
      className: joinClasses(Dropdown_default.toggle, toggleVariants[variant], split && Dropdown_default.splitToggle, className),
      "aria-haspopup": "menu",
      "aria-expanded": open,
      "aria-controls": menuId,
      onClick: (event) => {
        onClick?.(event);
        if (!event.defaultPrevented) toggle();
      },
      children: [
        children,
        !split && /* @__PURE__ */ jsx("span", { className: Dropdown_default.caret, "aria-hidden": "true" }),
        split && /* @__PURE__ */ jsx("span", { className: Dropdown_default.srOnly, children: "Toggle dropdown menu" })
      ]
    }
  );
};
var DropdownMenu = ({
  align,
  dark = false,
  children,
  className = "",
  onClick,
  ...props
}) => {
  const { menuId, open, autoClose, dark: rootDark, menuRef, setOpen } = useDropdownContext();
  return /* @__PURE__ */ jsx(
    "div",
    {
      ...props,
      ref: menuRef,
      id: menuId,
      className: joinClasses(
        Dropdown_default.menu,
        align && Dropdown_default[`align${align}`],
        (dark || rootDark) && Dropdown_default.menuDark,
        className
      ),
      role: "menu",
      hidden: !open,
      onClick: (event) => {
        onClick?.(event);
        if (!event.defaultPrevented && (autoClose === true || autoClose === "inside")) setOpen(false);
      },
      children
    }
  );
};
var DropdownItem = ({
  href,
  active = false,
  disabled = false,
  onSelect,
  onClick,
  children,
  className = "",
  ...props
}) => {
  const classes = joinClasses(Dropdown_default.item, active && Dropdown_default.active, disabled && Dropdown_default.disabled, className);
  const handleClick = (event) => {
    onClick?.(event);
    if (disabled) {
      event.preventDefault();
      return;
    }
    if (!event.defaultPrevented) onSelect?.();
  };
  if (href !== void 0) {
    return /* @__PURE__ */ jsx(
      "a",
      {
        ...props,
        href: disabled ? void 0 : href,
        className: classes,
        role: "menuitem",
        "data-dropdown-item": "",
        "aria-current": active ? "true" : void 0,
        "aria-disabled": disabled || void 0,
        tabIndex: disabled ? -1 : 0,
        onClick: handleClick,
        children
      }
    );
  }
  return /* @__PURE__ */ jsx(
    "button",
    {
      ...props,
      type: "button",
      className: classes,
      role: "menuitem",
      "data-dropdown-item": "",
      "aria-current": active ? "true" : void 0,
      "aria-disabled": disabled || void 0,
      disabled,
      tabIndex: disabled ? -1 : 0,
      onClick: handleClick,
      children
    }
  );
};
var DropdownHeader = ({ children, className = "", ...props }) => {
  return /* @__PURE__ */ jsx("div", { className: joinClasses(Dropdown_default.header, className), role: "presentation", ...props, children });
};
var DropdownDivider = ({ className = "", ...props }) => {
  return /* @__PURE__ */ jsx("hr", { className: joinClasses(Dropdown_default.divider, className), role: "separator", ...props });
};

export { Dropdown, DropdownDivider, DropdownHeader, DropdownItem, DropdownMenu, DropdownToggle };
//# sourceMappingURL=index.mjs.map
//# sourceMappingURL=index.mjs.map