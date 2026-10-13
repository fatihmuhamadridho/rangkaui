import { useState } from 'react';
import { jsx, jsxs } from 'react/jsx-runtime';

// src/Accordion/Accordion.tsx

// src/Accordion/Accordion.module.css
var Accordion_default = {};
function asList(value) {
  if (value === void 0) return [];
  return Array.isArray(value) ? value : [value];
}
var Accordion = ({
  items,
  defaultOpen,
  openItems,
  onOpenItemsChange,
  allowMultiple = false,
  flush = false,
  headingLevel = 3,
  className = "",
  ...props
}) => {
  const [internalOpenItems, setInternalOpenItems] = useState(() => asList(defaultOpen));
  const isControlled = openItems !== void 0;
  const selectedItems = isControlled ? openItems : internalOpenItems;
  const activeItems = allowMultiple ? selectedItems : selectedItems.slice(0, 1);
  const toggleItem = (id) => {
    const isOpen = activeItems.includes(id);
    const nextItems = isOpen ? activeItems.filter((itemId) => itemId !== id) : allowMultiple ? [...activeItems, id] : [id];
    if (!isControlled) setInternalOpenItems(nextItems);
    onOpenItemsChange?.(nextItems);
  };
  const Heading = `h${headingLevel}`;
  return /* @__PURE__ */ jsx("div", { className: [Accordion_default.accordion, flush && Accordion_default.flush, className].filter(Boolean).join(" "), ...props, children: items.map((item) => {
    const expanded = activeItems.includes(item.id);
    const triggerId = `${item.id}-trigger`;
    const panelId = `${item.id}-panel`;
    return /* @__PURE__ */ jsxs("section", { className: Accordion_default.item, children: [
      /* @__PURE__ */ jsx(Heading, { className: Accordion_default.heading, children: /* @__PURE__ */ jsxs(
        "button",
        {
          id: triggerId,
          type: "button",
          className: [Accordion_default.trigger, expanded && Accordion_default.expanded].filter(Boolean).join(" "),
          "aria-expanded": expanded,
          "aria-controls": panelId,
          disabled: item.disabled,
          onClick: () => toggleItem(item.id),
          children: [
            /* @__PURE__ */ jsx("span", { children: item.title }),
            /* @__PURE__ */ jsx("span", { className: Accordion_default.chevron, "aria-hidden": "true" })
          ]
        }
      ) }),
      /* @__PURE__ */ jsx(
        "div",
        {
          id: panelId,
          className: [Accordion_default.panel, expanded && Accordion_default.panelExpanded].filter(Boolean).join(" "),
          role: "region",
          "aria-labelledby": triggerId,
          "aria-hidden": !expanded,
          inert: !expanded,
          children: /* @__PURE__ */ jsx("div", { className: Accordion_default.panelInner, children: /* @__PURE__ */ jsx("div", { className: Accordion_default.body, children: item.content }) })
        }
      )
    ] }, item.id);
  }) });
};

export { Accordion };
//# sourceMappingURL=index.mjs.map
//# sourceMappingURL=index.mjs.map