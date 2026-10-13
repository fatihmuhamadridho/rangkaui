import { createElement } from 'react';
import { jsx, jsxs, Fragment } from 'react/jsx-runtime';

// src/Text/Text.tsx

// src/Text/Text.module.css
var Text_default = {};
function joinClasses(...classes) {
  return classes.filter(Boolean).join(" ");
}
var Text = ({
  as = "p",
  variant = "body",
  align,
  truncate = false,
  children,
  className = "",
  ...props
}) => {
  return createElement(
    as,
    {
      ...props,
      className: joinClasses(
        Text_default.text,
        Text_default[variant],
        align && Text_default[`align${align}`],
        truncate && Text_default.truncate,
        className
      )
    },
    children
  );
};
var Heading = ({ level = 2, visualLevel = level, children, className = "", ...props }) => {
  const Component = `h${level}`;
  return /* @__PURE__ */ jsx(Component, { ...props, className: joinClasses(Text_default.heading, Text_default[`heading${visualLevel}`], className), children });
};
var Display = ({ level = 1, children, className = "", ...props }) => {
  return /* @__PURE__ */ jsx("h1", { ...props, className: joinClasses(Text_default.display, Text_default[`display${level}`], className), children });
};
var Lead = ({ children, className = "", ...props }) => {
  return /* @__PURE__ */ jsx("p", { ...props, className: joinClasses(Text_default.text, Text_default.lead, className), children });
};
var Blockquote = ({ cite, footer, align, children, className = "", ...props }) => {
  return /* @__PURE__ */ jsxs("figure", { className: joinClasses(Text_default.blockquoteFigure, align && Text_default[`align${align}`]), children: [
    /* @__PURE__ */ jsx("blockquote", { ...props, cite, className: joinClasses(Text_default.blockquote, className), children }),
    footer !== void 0 && /* @__PURE__ */ jsxs("figcaption", { className: Text_default.blockquoteFooter, children: [
      footer,
      cite && /* @__PURE__ */ jsxs(Fragment, { children: [
        " ",
        "\u2014 ",
        /* @__PURE__ */ jsx("cite", { children: cite })
      ] })
    ] })
  ] });
};
var TextList = ({
  as = "ul",
  unstyled = false,
  inline = false,
  children,
  className = "",
  ...props
}) => {
  const Component = as;
  return /* @__PURE__ */ jsx(
    Component,
    {
      ...props,
      className: joinClasses(Text_default.list, unstyled && Text_default.unstyled, inline && Text_default.inlineList, className),
      children
    }
  );
};
var DescriptionList = ({ horizontal = false, children, className = "", ...props }) => {
  return /* @__PURE__ */ jsx("dl", { ...props, className: joinClasses(Text_default.descriptionList, horizontal && Text_default.horizontal, className), children });
};
var DescriptionTerm = ({ children, className = "", ...props }) => {
  return /* @__PURE__ */ jsx("dt", { ...props, className: joinClasses(Text_default.term, className), children });
};
var DescriptionDetails = ({ children, className = "", ...props }) => {
  return /* @__PURE__ */ jsx("dd", { ...props, className: joinClasses(Text_default.details, className), children });
};

export { Blockquote, DescriptionDetails, DescriptionList, DescriptionTerm, Display, Heading, Lead, Text, TextList };
//# sourceMappingURL=index.mjs.map
//# sourceMappingURL=index.mjs.map