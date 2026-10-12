'use strict';

var react = require('react');
var jsxRuntime = require('react/jsx-runtime');

// src/Avatar/Avatar.tsx

// src/Avatar/Avatar.module.css
var Avatar_default = {};
function joinClasses(...classes) {
  return classes.filter(Boolean).join(" ");
}
function getInitials(name) {
  if (!name) return "";
  return name.trim().split(/\s+/).slice(0, 2).map((part) => part[0]?.toUpperCase()).join("");
}
var Avatar = ({
  src,
  alt,
  name,
  initials,
  size = "md",
  shape = "circle",
  variant = "neutral",
  badge,
  dot = false,
  status,
  children,
  imageProps,
  className = "",
  style,
  ...props
}) => {
  const [imageFailed, setImageFailed] = react.useState(false);
  const customSize = typeof size === "number" ? `${size}px` : void 0;
  const displayInitials = initials ?? getInitials(name);
  return /* @__PURE__ */ jsxRuntime.jsxs(
    "span",
    {
      ...props,
      className: joinClasses(
        Avatar_default.avatar,
        typeof size === "string" && Avatar_default[size],
        Avatar_default[shape],
        Avatar_default[variant],
        className
      ),
      style: {
        ...style,
        ...customSize ? { width: customSize, height: customSize, fontSize: `calc(${customSize} * 0.38)` } : {}
      },
      role: props.role ?? (alt || name ? "img" : void 0),
      "aria-label": props["aria-label"] ?? alt ?? name,
      children: [
        children ?? (src && !imageFailed ? /* @__PURE__ */ jsxRuntime.jsx(
          "img",
          {
            ...imageProps,
            src,
            alt: alt ?? name ?? "",
            onError: (event) => {
              imageProps?.onError?.(event);
              setImageFailed(true);
            }
          }
        ) : displayInitials ? /* @__PURE__ */ jsxRuntime.jsx("span", { "aria-hidden": "true", children: displayInitials }) : /* @__PURE__ */ jsxRuntime.jsx(PersonIcon, {})),
        status && /* @__PURE__ */ jsxRuntime.jsx("span", { className: joinClasses(Avatar_default.status, Avatar_default[status]), "aria-label": status }),
        dot && !status && /* @__PURE__ */ jsxRuntime.jsx("span", { className: joinClasses(Avatar_default.badge, Avatar_default.dot), "aria-label": "New activity" }),
        badge !== void 0 && /* @__PURE__ */ jsxRuntime.jsx("span", { className: Avatar_default.badge, children: badge })
      ]
    }
  );
};
var AvatarGroup = ({ children, max, size, className = "", ...props }) => {
  const items = Array.isArray(children) ? children : [children];
  const visibleItems = max === void 0 ? items : items.slice(0, max);
  const remaining = max === void 0 ? 0 : Math.max(0, items.length - max);
  return /* @__PURE__ */ jsxRuntime.jsxs(
    "div",
    {
      ...props,
      className: joinClasses(Avatar_default.group, className),
      role: "group",
      "aria-label": props["aria-label"] ?? "Avatar group",
      children: [
        visibleItems.map(
          (child, index) => react.isValidElement(child) && size !== void 0 ? react.cloneElement(child, { size: child.props.size ?? size, key: child.key ?? index }) : child
        ),
        remaining > 0 && /* @__PURE__ */ jsxRuntime.jsxs(Avatar, { size, className: Avatar_default.more, "aria-label": `${remaining} more people`, children: [
          "+",
          remaining
        ] })
      ]
    }
  );
};
var PersonIcon = () => {
  return /* @__PURE__ */ jsxRuntime.jsxs("svg", { className: Avatar_default.person, viewBox: "0 0 24 24", "aria-hidden": "true", children: [
    /* @__PURE__ */ jsxRuntime.jsx("circle", { cx: "12", cy: "8", r: "3.5", fill: "none", stroke: "currentColor", strokeWidth: "1.6" }),
    /* @__PURE__ */ jsxRuntime.jsx(
      "path",
      {
        d: "M4.5 20c.4-4 3-6 7.5-6s7.1 2 7.5 6H4.5Z",
        fill: "none",
        stroke: "currentColor",
        strokeWidth: "1.6",
        strokeLinejoin: "round"
      }
    )
  ] });
};

exports.Avatar = Avatar;
exports.AvatarGroup = AvatarGroup;
//# sourceMappingURL=index.cjs.map
//# sourceMappingURL=index.cjs.map