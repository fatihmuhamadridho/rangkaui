'use strict';

var react = require('react');
var jsxRuntime = require('react/jsx-runtime');

// src/ListGroup/ListGroup.tsx

// src/ListGroup/ListGroup.module.css
var ListGroup_default = {};
var ListGroupContext = react.createContext({ semanticList: false });
var variantClasses = {
  primary: ListGroup_default.primary,
  secondary: ListGroup_default.secondary,
  success: ListGroup_default.success,
  danger: ListGroup_default.danger,
  warning: ListGroup_default.warning,
  info: ListGroup_default.info,
  light: ListGroup_default.light,
  dark: ListGroup_default.dark
};
function joinClasses(...classes) {
  return classes.filter(Boolean).join(" ");
}
var ListGroup = ({
  as: Element = "ul",
  flush = false,
  horizontal = false,
  numbered = false,
  children,
  className = "",
  ...props
}) => {
  const semanticList = Element === "ul" || Element === "ol";
  const classes = joinClasses(
    ListGroup_default.listGroup,
    semanticList && ListGroup_default.semanticList,
    flush && ListGroup_default.flush,
    horizontal && ListGroup_default.horizontal,
    (numbered || Element === "ol") && ListGroup_default.numbered,
    className
  );
  return /* @__PURE__ */ jsxRuntime.jsx(ListGroupContext.Provider, { value: { semanticList }, children: /* @__PURE__ */ jsxRuntime.jsx(Element, { className: classes, ...props, children }) });
};
var ListGroupItem = ({
  href,
  target,
  rel,
  button = false,
  active = false,
  disabled = false,
  action = false,
  variant,
  badge,
  children,
  className = "",
  onClick,
  ...props
}) => {
  const { semanticList } = react.useContext(ListGroupContext);
  const itemClasses = joinClasses(
    ListGroup_default.item,
    (action || href !== void 0 || button) && ListGroup_default.action,
    active && ListGroup_default.active,
    disabled && ListGroup_default.disabled,
    variant && variantClasses[variant],
    className
  );
  const content = /* @__PURE__ */ jsxRuntime.jsxs(jsxRuntime.Fragment, { children: [
    /* @__PURE__ */ jsxRuntime.jsx("div", { className: ListGroup_default.itemText, children }),
    badge !== void 0 && /* @__PURE__ */ jsxRuntime.jsx("span", { className: ListGroup_default.badge, children: badge })
  ] });
  const itemOnClick = (event) => {
    if (disabled) {
      event.preventDefault();
      return;
    }
    onClick?.(event);
  };
  if (semanticList) {
    return /* @__PURE__ */ jsxRuntime.jsx("li", { className: itemClasses, "aria-current": active ? "true" : void 0, "aria-disabled": disabled || void 0, children: href !== void 0 ? /* @__PURE__ */ jsxRuntime.jsx(
      "a",
      {
        ...props,
        href: disabled ? void 0 : href,
        target,
        rel,
        className: ListGroup_default.semanticContent,
        "aria-disabled": disabled || void 0,
        tabIndex: disabled ? -1 : void 0,
        onClick: itemOnClick,
        children: content
      }
    ) : button ? /* @__PURE__ */ jsxRuntime.jsx(
      "button",
      {
        ...props,
        type: "button",
        className: ListGroup_default.semanticContent,
        disabled,
        "aria-current": active ? "true" : void 0,
        onClick: itemOnClick,
        children: content
      }
    ) : /* @__PURE__ */ jsxRuntime.jsx("div", { ...props, className: ListGroup_default.semanticContent, children: content }) });
  }
  if (href !== void 0) {
    return /* @__PURE__ */ jsxRuntime.jsx(
      "a",
      {
        ...props,
        href: disabled ? void 0 : href,
        target,
        rel,
        className: itemClasses,
        "aria-current": active ? "true" : void 0,
        "aria-disabled": disabled || void 0,
        tabIndex: disabled ? -1 : void 0,
        onClick: itemOnClick,
        children: content
      }
    );
  }
  if (button) {
    return /* @__PURE__ */ jsxRuntime.jsx(
      "button",
      {
        ...props,
        type: "button",
        className: itemClasses,
        disabled,
        "aria-current": active ? "true" : void 0,
        onClick: itemOnClick,
        children: content
      }
    );
  }
  return /* @__PURE__ */ jsxRuntime.jsx(
    "div",
    {
      ...props,
      className: itemClasses,
      "aria-current": active ? "true" : void 0,
      "aria-disabled": disabled || void 0,
      children: content
    }
  );
};

exports.ListGroup = ListGroup;
exports.ListGroupItem = ListGroupItem;
//# sourceMappingURL=index.cjs.map
//# sourceMappingURL=index.cjs.map