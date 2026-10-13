import { jsx } from 'react/jsx-runtime';

// src/Card/Card.module.css
var Card_default = {};
var variantClasses = {
  primary: Card_default.primary,
  secondary: Card_default.secondary,
  success: Card_default.success,
  danger: Card_default.danger,
  warning: Card_default.warning,
  info: Card_default.info,
  light: Card_default.light,
  dark: Card_default.dark
};
function classes(...values) {
  return values.filter(Boolean).join(" ");
}
var Card = ({
  variant,
  outline = false,
  shadow = false,
  horizontal = false,
  className = "",
  children,
  ...props
}) => {
  return /* @__PURE__ */ jsx(
    "div",
    {
      className: classes(
        Card_default.card,
        variant && variantClasses[variant],
        outline && Card_default.outline,
        shadow && Card_default.shadow,
        horizontal && Card_default.horizontal,
        className
      ),
      ...props,
      children
    }
  );
};
var CardHeader = ({ children, className = "", ...props }) => {
  return /* @__PURE__ */ jsx("div", { className: classes(Card_default.header, className), ...props, children });
};
var CardBody = ({ children, className = "", ...props }) => {
  return /* @__PURE__ */ jsx("div", { className: classes(Card_default.body, className), ...props, children });
};
var CardFooter = ({ children, className = "", ...props }) => {
  return /* @__PURE__ */ jsx("div", { className: classes(Card_default.footer, className), ...props, children });
};
var CardTitle = ({ as: Heading = "h5", children, className = "", ...props }) => {
  return /* @__PURE__ */ jsx(Heading, { className: classes(Card_default.title, className), ...props, children });
};
var CardSubtitle = ({ as: Heading = "h6", children, className = "", ...props }) => {
  return /* @__PURE__ */ jsx(Heading, { className: classes(Card_default.subtitle, className), ...props, children });
};
var CardText = ({ children, className = "", ...props }) => {
  return /* @__PURE__ */ jsx("p", { className: classes(Card_default.text, className), ...props, children });
};
var CardLink = ({ children, className = "", ...props }) => {
  return /* @__PURE__ */ jsx("a", { className: classes(Card_default.link, className), ...props, children });
};
var CardImage = ({ placement = "top", className = "", ...props }) => {
  return /* @__PURE__ */ jsx("img", { className: classes(Card_default.image, placement === "bottom" && Card_default.imageBottom, className), ...props });
};
var CardImageOverlay = ({ children, className = "", ...props }) => {
  return /* @__PURE__ */ jsx("div", { className: classes(Card_default.imageOverlay, className), ...props, children });
};
var CardListGroup = ({ children, className = "", ...props }) => {
  return /* @__PURE__ */ jsx("ul", { className: classes(Card_default.listGroup, className), ...props, children });
};
var CardListGroupItem = ({ children, className = "", ...props }) => {
  return /* @__PURE__ */ jsx("li", { className: classes(Card_default.listGroupItem, className), ...props, children });
};
var CardGroup = ({
  layout = "group",
  columns = 3,
  children,
  className = "",
  style,
  ...props
}) => {
  const groupStyle = { ...style, "--card-columns": Math.max(1, columns) };
  return /* @__PURE__ */ jsx("div", { className: classes(Card_default.cardGroup, Card_default[layout], className), style: groupStyle, ...props, children });
};

export { Card, CardBody, CardFooter, CardGroup, CardHeader, CardImage, CardImageOverlay, CardLink, CardListGroup, CardListGroupItem, CardSubtitle, CardText, CardTitle };
//# sourceMappingURL=index.mjs.map
//# sourceMappingURL=index.mjs.map