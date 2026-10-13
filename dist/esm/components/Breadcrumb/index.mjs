import { jsx } from 'react/jsx-runtime';

// src/Breadcrumb/Breadcrumb.module.css
var Breadcrumb_default = {};
var Breadcrumb = ({
  items,
  divider = "/",
  className = "",
  "aria-label": ariaLabel = "Breadcrumb",
  style,
  ...props
}) => {
  const breadcrumbStyle = {
    ...style,
    "--breadcrumb-divider": divider ? `"${divider.replace(/\\/g, "\\\\").replace(/"/g, '\\"').replace(/[\r\n]/g, " ")}"` : '""'
  };
  return /* @__PURE__ */ jsx(
    "nav",
    {
      className: [Breadcrumb_default.breadcrumb, !divider && Breadcrumb_default.noDivider, className].filter(Boolean).join(" "),
      "aria-label": ariaLabel,
      style: breadcrumbStyle,
      ...props,
      children: /* @__PURE__ */ jsx("ol", { className: Breadcrumb_default.list, children: items.map((item, index) => {
        const isCurrent = index === items.length - 1;
        return /* @__PURE__ */ jsx(
          "li",
          {
            className: [Breadcrumb_default.item, isCurrent && Breadcrumb_default.current].filter(Boolean).join(" "),
            "aria-current": isCurrent ? "page" : void 0,
            children: !isCurrent && item.href ? /* @__PURE__ */ jsx("a", { href: item.href, children: item.label }) : /* @__PURE__ */ jsx("span", { children: item.label })
          },
          item.id ?? `${index}-${String(item.label)}`
        );
      }) })
    }
  );
};

export { Breadcrumb };
//# sourceMappingURL=index.mjs.map
//# sourceMappingURL=index.mjs.map