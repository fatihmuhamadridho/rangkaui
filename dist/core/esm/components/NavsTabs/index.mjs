import { createContext, useId, useState, useContext } from 'react';
import { jsx } from 'react/jsx-runtime';

// src/NavsTabs/NavsTabs.tsx

// src/NavsTabs/NavsTabs.module.css
var NavsTabs_default = {};
var NavsTabsContext = createContext(null);
function joinClasses(...classes) {
  return classes.filter(Boolean).join(" ");
}
function useNavsTabs() {
  const context = useContext(NavsTabsContext);
  if (!context) throw new Error("NavsTabs parts must be rendered inside NavsTabs.");
  return context;
}
var NavsTabs = ({
  defaultActiveKey,
  activeKey,
  onChange,
  variant = "tabs",
  orientation = "horizontal",
  justified = false,
  fill = false,
  children,
  className = "",
  ...props
}) => {
  const generatedId = useId().replace(/:/g, "");
  const [internalKey, setInternalKey] = useState(defaultActiveKey ?? "");
  const [keys, setKeys] = useState([]);
  const selectedKey = activeKey ?? internalKey;
  const setActiveKey = (key) => {
    if (activeKey === void 0) setInternalKey(key);
    onChange?.(key);
  };
  const registerKey = (key) => {
    setKeys((current) => current.includes(key) ? current : [...current, key]);
  };
  return /* @__PURE__ */ jsx(
    NavsTabsContext.Provider,
    {
      value: { baseId: generatedId, activeKey: selectedKey, setActiveKey, variant, orientation, keys, registerKey },
      children: /* @__PURE__ */ jsx(
        "div",
        {
          className: joinClasses(NavsTabs_default.root, NavsTabs_default[`orientation${orientation}`], className),
          "data-variant": variant,
          "data-fill": fill || void 0,
          "data-justified": justified || void 0,
          ...props,
          children
        }
      )
    }
  );
};
var NavsTabsList = ({ label = "Tabs", children, className = "", ...props }) => {
  const { orientation, variant, keys, activeKey, setActiveKey } = useNavsTabs();
  const handleKeyDown = (event) => {
    props.onKeyDown?.(event);
    if (event.defaultPrevented) return;
    const isVertical = orientation === "vertical";
    const nextKey = isVertical ? event.key === "ArrowDown" ? 1 : event.key === "ArrowUp" ? -1 : 0 : event.key === "ArrowRight" ? 1 : event.key === "ArrowLeft" ? -1 : 0;
    if (event.key === "Home") {
      event.preventDefault();
      const first = keys[0];
      if (first) setActiveKey(first);
      return;
    }
    if (event.key === "End") {
      event.preventDefault();
      const last = keys.at(-1);
      if (last) setActiveKey(last);
      return;
    }
    if (!nextKey || !keys.length) return;
    event.preventDefault();
    const currentIndex = Math.max(0, keys.indexOf(activeKey));
    setActiveKey(keys[(currentIndex + nextKey + keys.length) % keys.length]);
  };
  return /* @__PURE__ */ jsx(
    "div",
    {
      className: joinClasses(NavsTabs_default.list, NavsTabs_default[`list${variant}`], className),
      role: variant === "plain" ? "navigation" : "tablist",
      "aria-label": label,
      "aria-orientation": orientation === "vertical" ? "vertical" : void 0,
      onKeyDown: handleKeyDown,
      ...props,
      children
    }
  );
};
var NavsTabsTab = ({
  tabKey,
  disabled = false,
  children,
  className = "",
  onClick,
  onFocus,
  ...props
}) => {
  const { baseId, activeKey, setActiveKey, variant, registerKey } = useNavsTabs();
  const selected = activeKey === tabKey;
  registerKey(tabKey);
  return /* @__PURE__ */ jsx(
    "a",
    {
      ...props,
      id: `${baseId}-tab-${tabKey}`,
      href: props.href ?? `#${baseId}-panel-${tabKey}`,
      className: joinClasses(NavsTabs_default.tab, selected && NavsTabs_default.selected, disabled && NavsTabs_default.disabled, className),
      role: variant === "plain" ? void 0 : "tab",
      "aria-selected": variant === "plain" ? void 0 : selected,
      "aria-controls": variant === "plain" ? void 0 : `${baseId}-panel-${tabKey}`,
      "aria-current": variant === "plain" && selected ? "page" : void 0,
      "aria-disabled": disabled || void 0,
      tabIndex: variant === "plain" ? void 0 : selected ? 0 : -1,
      onFocus: (event) => {
        onFocus?.(event);
        if (!event.defaultPrevented && variant !== "plain" && !disabled) setActiveKey(tabKey);
      },
      onClick: (event) => {
        onClick?.(event);
        if (disabled) event.preventDefault();
        else if (variant !== "plain" && !event.defaultPrevented) {
          event.preventDefault();
          setActiveKey(tabKey);
        }
      },
      children
    }
  );
};
var NavsTabsPanel = ({ tabKey, children, className = "", ...props }) => {
  const { baseId, activeKey } = useNavsTabs();
  const selected = activeKey === tabKey;
  return /* @__PURE__ */ jsx(
    "div",
    {
      ...props,
      id: `${baseId}-panel-${tabKey}`,
      className: joinClasses(NavsTabs_default.panel, selected && NavsTabs_default.panelSelected, className),
      role: "tabpanel",
      "aria-labelledby": `${baseId}-tab-${tabKey}`,
      hidden: !selected,
      tabIndex: 0,
      children
    }
  );
};

export { NavsTabs, NavsTabsList, NavsTabsPanel, NavsTabsTab };
//# sourceMappingURL=index.mjs.map
//# sourceMappingURL=index.mjs.map