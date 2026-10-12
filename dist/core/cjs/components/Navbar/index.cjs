'use strict';

var react = require('react');
var jsxRuntime = require('react/jsx-runtime');

// src/Navbar/Navbar.tsx

// src/Navbar/Navbar.module.css
var Navbar_default = {};
var NavbarContext = react.createContext(null);
function useNavbarContext() {
  const context = react.useContext(NavbarContext);
  if (!context) throw new Error("NavbarToggle and NavbarCollapse must be rendered inside Navbar.");
  return context;
}
function joinClasses(...classes) {
  return classes.filter(Boolean).join(" ");
}
var positionClasses = {
  static: void 0,
  "fixed-top": Navbar_default.fixedtop,
  "fixed-bottom": Navbar_default.fixedbottom,
  "sticky-top": Navbar_default.stickytop
};
var Navbar = ({
  expand = "lg",
  theme = "light",
  position = "static",
  defaultExpanded = false,
  expanded,
  onExpandedChange,
  children,
  className = "",
  "aria-label": ariaLabel = "Main navigation",
  ...props
}) => {
  const generatedId = react.useId().replace(/:/g, "");
  const [internalExpanded, setInternalExpanded] = react.useState(defaultExpanded);
  const isControlled = expanded !== void 0;
  const isExpanded = isControlled ? expanded : internalExpanded;
  const setExpanded = (nextExpanded) => {
    if (!isControlled) setInternalExpanded(nextExpanded);
    onExpandedChange?.(nextExpanded);
  };
  return /* @__PURE__ */ jsxRuntime.jsx(NavbarContext.Provider, { value: { collapseId: `${generatedId}-collapse`, expanded: isExpanded, setExpanded }, children: /* @__PURE__ */ jsxRuntime.jsx(
    "nav",
    {
      className: joinClasses(
        Navbar_default.navbar,
        Navbar_default[`expand${expand}`],
        Navbar_default[theme],
        positionClasses[position],
        className
      ),
      "aria-label": ariaLabel,
      ...props,
      children
    }
  ) });
};
var NavbarBrand = ({ children, className = "", ...props }) => {
  return /* @__PURE__ */ jsxRuntime.jsx("a", { className: joinClasses(Navbar_default.brand, className), ...props, children });
};
var NavbarToggle = ({ children, className = "", type = "button", onClick, ...props }) => {
  const { collapseId, expanded, setExpanded } = useNavbarContext();
  return /* @__PURE__ */ jsxRuntime.jsx(
    "button",
    {
      ...props,
      type,
      className: joinClasses(Navbar_default.toggle, className),
      "aria-label": props["aria-label"] ?? "Toggle navigation",
      "aria-controls": collapseId,
      "aria-expanded": expanded,
      onClick: (event) => {
        onClick?.(event);
        if (!event.defaultPrevented) setExpanded(!expanded);
      },
      children: children ?? /* @__PURE__ */ jsxRuntime.jsxs("span", { className: Navbar_default.toggleIcon, "aria-hidden": "true", children: [
        /* @__PURE__ */ jsxRuntime.jsx("span", {}),
        /* @__PURE__ */ jsxRuntime.jsx("span", {}),
        /* @__PURE__ */ jsxRuntime.jsx("span", {})
      ] })
    }
  );
};
var NavbarCollapse = ({ children, className = "", ...props }) => {
  const { collapseId, expanded } = useNavbarContext();
  return /* @__PURE__ */ jsxRuntime.jsx("div", { id: collapseId, className: joinClasses(Navbar_default.collapse, expanded && Navbar_default.expanded, className), ...props, children });
};
var NavbarNav = ({ align = "start", children, className = "", ...props }) => {
  return /* @__PURE__ */ jsxRuntime.jsx("ul", { className: joinClasses(Navbar_default.nav, Navbar_default[`align${align}`], className), ...props, children });
};
var NavbarItem = ({ children, className = "", ...props }) => {
  return /* @__PURE__ */ jsxRuntime.jsx("li", { className: joinClasses(Navbar_default.item, className), ...props, children });
};
var NavbarLink = ({
  active = false,
  disabled = false,
  children,
  className = "",
  onClick,
  ...props
}) => {
  return /* @__PURE__ */ jsxRuntime.jsx(
    "a",
    {
      ...props,
      className: joinClasses(Navbar_default.link, active && Navbar_default.active, disabled && Navbar_default.disabled, className),
      "aria-current": active ? "page" : void 0,
      "aria-disabled": disabled || void 0,
      tabIndex: disabled ? -1 : props.tabIndex,
      onClick: (event) => {
        onClick?.(event);
        if (disabled) event.preventDefault();
      },
      children
    }
  );
};
var NavbarText = ({ children, className = "", ...props }) => {
  return /* @__PURE__ */ jsxRuntime.jsx("span", { className: joinClasses(Navbar_default.text, className), ...props, children });
};
var NavbarContainer = ({ fluid = false, children, className = "", ...props }) => {
  return /* @__PURE__ */ jsxRuntime.jsx("div", { className: joinClasses(Navbar_default.container, fluid && Navbar_default.fluid, className), ...props, children });
};

exports.Navbar = Navbar;
exports.NavbarBrand = NavbarBrand;
exports.NavbarCollapse = NavbarCollapse;
exports.NavbarContainer = NavbarContainer;
exports.NavbarItem = NavbarItem;
exports.NavbarLink = NavbarLink;
exports.NavbarNav = NavbarNav;
exports.NavbarText = NavbarText;
exports.NavbarToggle = NavbarToggle;
//# sourceMappingURL=index.cjs.map
//# sourceMappingURL=index.cjs.map