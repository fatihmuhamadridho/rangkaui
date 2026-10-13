'use strict';

var react = require('react');
var jsxRuntime = require('react/jsx-runtime');

// src/Collapse/Collapse.tsx

// src/Collapse/Collapse.module.css
var Collapse_default = {};
var CollapseContext = react.createContext(null);
function useCollapseContext() {
  const context = react.useContext(CollapseContext);
  if (!context) throw new Error("CollapseTrigger and CollapsePanel must be rendered inside Collapse.");
  return context;
}
var Collapse = ({
  open,
  defaultOpen = false,
  onOpenChange,
  horizontal = false,
  panelId,
  children,
  className = "",
  ...props
}) => {
  const generatedId = react.useId().replace(/:/g, "");
  const [internalOpen, setInternalOpen] = react.useState(defaultOpen);
  const isControlled = open !== void 0;
  const expanded = isControlled ? open : internalOpen;
  const resolvedPanelId = panelId ?? `${generatedId}-panel`;
  const toggle = () => {
    const nextOpen = !expanded;
    if (!isControlled) setInternalOpen(nextOpen);
    onOpenChange?.(nextOpen);
  };
  return /* @__PURE__ */ jsxRuntime.jsx(CollapseContext.Provider, { value: { panelId: resolvedPanelId, open: expanded, toggle }, children: /* @__PURE__ */ jsxRuntime.jsx(
    "div",
    {
      className: [Collapse_default.collapse, horizontal && Collapse_default.horizontal, className].filter(Boolean).join(" "),
      ...props,
      children
    }
  ) });
};
var CollapseTrigger = ({
  children,
  className = "",
  type = "button",
  onClick,
  ...props
}) => {
  const { panelId, open, toggle } = useCollapseContext();
  return /* @__PURE__ */ jsxRuntime.jsx(
    "button",
    {
      ...props,
      type,
      className: [Collapse_default.trigger, className].filter(Boolean).join(" "),
      "aria-expanded": open,
      "aria-controls": panelId,
      onClick: (event) => {
        onClick?.(event);
        if (!event.defaultPrevented) toggle();
      },
      children
    }
  );
};
var CollapsePanel = ({ children, className = "", ...props }) => {
  const { panelId, open } = useCollapseContext();
  return /* @__PURE__ */ jsxRuntime.jsx(
    "div",
    {
      ...props,
      id: panelId,
      className: [Collapse_default.panel, open && Collapse_default.open, className].filter(Boolean).join(" "),
      "aria-hidden": !open,
      inert: !open,
      children: /* @__PURE__ */ jsxRuntime.jsx("div", { className: Collapse_default.panelInner, children: /* @__PURE__ */ jsxRuntime.jsx("div", { className: Collapse_default.content, children }) })
    }
  );
};

exports.Collapse = Collapse;
exports.CollapsePanel = CollapsePanel;
exports.CollapseTrigger = CollapseTrigger;
//# sourceMappingURL=index.cjs.map
//# sourceMappingURL=index.cjs.map