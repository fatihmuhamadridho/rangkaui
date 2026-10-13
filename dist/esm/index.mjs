import { jsx, jsxs, Fragment } from 'react/jsx-runtime';
import { createContext, useState, useEffect, useId, useRef, useContext, isValidElement, cloneElement, createElement } from 'react';
import { createPortal } from 'react-dom';

// src/Button/Button.module.css
var Button_default = {};
var sizes = {
  small: Button_default.small,
  medium: Button_default.medium,
  large: Button_default.large
};
var iconSizes = {
  small: Button_default.iconSmall,
  medium: Button_default.iconMedium,
  large: Button_default.iconLarge
};
var variants = {
  standard: Button_default.primary,
  primary: Button_default.primary,
  secondary: Button_default.secondary,
  base: Button_default.base,
  "outline-primary": Button_default.outlinePrimary,
  "outline-secondary": Button_default.outlineSecondary,
  link: Button_default.link,
  success: Button_default.success,
  danger: Button_default.danger,
  warning: Button_default.warning,
  info: Button_default.info,
  light: Button_default.light,
  dark: Button_default.dark,
  "outline-success": Button_default.outlineSuccess,
  "outline-danger": Button_default.outlineDanger,
  "outline-warning": Button_default.outlineWarning,
  "outline-info": Button_default.outlineInfo,
  "outline-light": Button_default.outlineLight,
  "outline-dark": Button_default.outlineDark
};
var Button = ({
  variant = "primary",
  size = "medium",
  iconOnly = false,
  className = "",
  type = "button",
  children = "Button Title",
  ...props
}) => {
  return /* @__PURE__ */ jsx(
    "button",
    {
      type,
      className: `${Button_default.button} ${iconOnly ? iconSizes[size] : sizes[size]} ${variants[variant]} ${className}`,
      ...props,
      children
    }
  );
};

// src/Box/Box.module.css
var Box_default = {};
var Box = ({
  children,
  className = "",
  padded = false,
  bordered = false,
  rounded = false,
  shadow = false,
  ...props
}) => {
  const classes2 = [
    Box_default.box,
    padded && Box_default.padded,
    bordered && Box_default.bordered,
    rounded && Box_default.rounded,
    shadow && Box_default.shadow,
    className
  ].filter(Boolean).join(" ");
  return /* @__PURE__ */ jsx("div", { className: classes2, ...props, children });
};

// src/Pagination/Pagination.module.css
var Pagination_default = {};
function getPageItems(currentPage, totalPages) {
  if (totalPages <= 7) {
    return Array.from({ length: totalPages }, (_, index) => index + 1);
  }
  const firstSibling = Math.max(2, currentPage - 2);
  const lastSibling = Math.min(totalPages - 1, currentPage + 2);
  const items = [1];
  if (firstSibling > 2) items.push("start-ellipsis");
  for (let page = firstSibling; page <= lastSibling; page += 1) items.push(page);
  if (lastSibling < totalPages - 1) items.push("end-ellipsis");
  items.push(totalPages);
  return items;
}
var Chevron = ({ direction }) => {
  return /* @__PURE__ */ jsx("svg", { "aria-hidden": "true", viewBox: "0 0 16 16", className: Pagination_default.chevron, children: /* @__PURE__ */ jsx(
    "path",
    {
      d: direction === "previous" ? "m10 3-5 5 5 5" : "m6 3 5 5-5 5",
      fill: "none",
      stroke: "currentColor",
      strokeLinecap: "round",
      strokeLinejoin: "round",
      strokeWidth: "1.5"
    }
  ) });
};
var Pagination = ({
  currentPage,
  totalItems,
  pageSize,
  onPageChange,
  onPageSizeChange,
  pageSizeOptions = [10, 20, 50, 100],
  className = ""
}) => {
  const totalPages = Math.max(1, Math.ceil(totalItems / pageSize));
  const page = Math.min(Math.max(currentPage, 1), totalPages);
  const [pageInput, setPageInput] = useState("");
  const goToPage = () => {
    const requestedPage = Number(pageInput);
    if (pageInput && Number.isInteger(requestedPage) && requestedPage >= 1 && requestedPage <= totalPages) {
      onPageChange(requestedPage);
      setPageInput("");
    }
  };
  const handlePageInputKeyDown = (event) => {
    if (event.key === "Enter") goToPage();
  };
  const handlePageSizeChange = (event) => {
    onPageSizeChange(Number(event.target.value));
  };
  return /* @__PURE__ */ jsxs("nav", { "aria-label": "Pagination", className: `${Pagination_default.pagination} ${className}`.trim(), children: [
    /* @__PURE__ */ jsx("span", { className: Pagination_default.total, children: `Total ${totalItems} items` }),
    /* @__PURE__ */ jsxs("div", { className: Pagination_default.controls, children: [
      /* @__PURE__ */ jsxs("div", { className: Pagination_default.pageList, "aria-label": `Page ${page} of ${totalPages}`, children: [
        /* @__PURE__ */ jsx(
          "button",
          {
            type: "button",
            className: `${Pagination_default.pageButton} ${Pagination_default.arrow}`,
            "aria-label": "Previous page",
            disabled: page <= 1,
            onClick: () => onPageChange(page - 1),
            children: /* @__PURE__ */ jsx(Chevron, { direction: "previous" })
          }
        ),
        getPageItems(page, totalPages).map(
          (item) => typeof item === "number" ? /* @__PURE__ */ jsx(
            "button",
            {
              type: "button",
              className: `${Pagination_default.pageButton} ${page === item ? Pagination_default.active : ""}`,
              "aria-label": `Page ${item}`,
              "aria-current": page === item ? "page" : void 0,
              onClick: () => onPageChange(item),
              children: item
            },
            item
          ) : /* @__PURE__ */ jsx("span", { className: `${Pagination_default.pageButton} ${Pagination_default.ellipsis}`, "aria-hidden": "true", children: "\u2026" }, item)
        ),
        /* @__PURE__ */ jsx(
          "button",
          {
            type: "button",
            className: `${Pagination_default.pageButton} ${Pagination_default.arrow}`,
            "aria-label": "Next page",
            disabled: page >= totalPages,
            onClick: () => onPageChange(page + 1),
            children: /* @__PURE__ */ jsx(Chevron, { direction: "next" })
          }
        )
      ] }),
      /* @__PURE__ */ jsxs("label", { className: Pagination_default.pageSizeLabel, children: [
        /* @__PURE__ */ jsx("span", { className: Pagination_default.srOnly, children: "Items per page" }),
        /* @__PURE__ */ jsx("select", { className: Pagination_default.pageSize, value: pageSize, onChange: handlePageSizeChange, children: pageSizeOptions.map((size) => /* @__PURE__ */ jsx("option", { value: size, children: `${size} / page` }, size)) })
      ] }),
      /* @__PURE__ */ jsxs("label", { className: Pagination_default.goToLabel, children: [
        /* @__PURE__ */ jsx("span", { children: "Go to" }),
        /* @__PURE__ */ jsx(
          "input",
          {
            className: Pagination_default.goToInput,
            type: "number",
            min: 1,
            max: totalPages,
            value: pageInput,
            "aria-label": "Go to page",
            onChange: (event) => setPageInput(event.target.value),
            onKeyDown: handlePageInputKeyDown
          }
        )
      ] })
    ] })
  ] });
};

// src/Alert/Alert.module.css
var Alert_default = {};
var variants2 = {
  primary: Alert_default.primary,
  secondary: Alert_default.secondary,
  success: Alert_default.success,
  danger: Alert_default.danger,
  warning: Alert_default.warning,
  info: Alert_default.info,
  light: Alert_default.light,
  dark: Alert_default.dark
};
var CloseIcon = () => {
  return /* @__PURE__ */ jsx("svg", { "aria-hidden": "true", viewBox: "0 0 16 16", className: Alert_default.closeIcon, children: /* @__PURE__ */ jsx("path", { d: "m3 3 10 10M13 3 3 13", fill: "none", stroke: "currentColor", strokeLinecap: "round", strokeWidth: "1.5" }) });
};
var Alert = ({
  variant = "primary",
  dismissible = false,
  onClose,
  icon,
  title,
  children,
  className = "",
  role = "alert",
  ...props
}) => {
  const [isVisible, setIsVisible] = useState(true);
  if (!isVisible) return null;
  const close = () => {
    setIsVisible(false);
    onClose?.();
  };
  return /* @__PURE__ */ jsxs(
    "div",
    {
      className: [Alert_default.alert, variants2[variant], dismissible && Alert_default.dismissible, className].filter(Boolean).join(" "),
      role,
      ...props,
      children: [
        icon && /* @__PURE__ */ jsx("span", { className: Alert_default.icon, "aria-hidden": "true", children: icon }),
        /* @__PURE__ */ jsxs("div", { className: Alert_default.content, children: [
          title && /* @__PURE__ */ jsx("div", { className: Alert_default.title, children: title }),
          children
        ] }),
        dismissible && /* @__PURE__ */ jsx("button", { type: "button", className: Alert_default.closeButton, "aria-label": "Close alert", onClick: close, children: /* @__PURE__ */ jsx(CloseIcon, {}) })
      ]
    }
  );
};

// src/Divider/Divider.module.css
var Divider_default = {};
var Divider = ({
  orientation = "horizontal",
  variant = "solid",
  align = "center",
  children,
  className = "",
  ...props
}) => {
  if (orientation === "vertical") {
    return /* @__PURE__ */ jsx(
      "div",
      {
        className: [Divider_default.divider, Divider_default.vertical, Divider_default[variant], className].filter(Boolean).join(" "),
        role: "separator",
        "aria-orientation": "vertical",
        ...props
      }
    );
  }
  return /* @__PURE__ */ jsxs(
    "div",
    {
      className: [
        Divider_default.divider,
        Divider_default.horizontal,
        Divider_default[variant],
        children ? Divider_default.withLabel : Divider_default.withoutLabel,
        Divider_default[align],
        className
      ].filter(Boolean).join(" "),
      role: "separator",
      "aria-orientation": "horizontal",
      ...props,
      children: [
        /* @__PURE__ */ jsx("span", { className: Divider_default.rule, "aria-hidden": "true" }),
        children && /* @__PURE__ */ jsx("span", { className: Divider_default.label, children }),
        children && /* @__PURE__ */ jsx("span", { className: Divider_default.rule, "aria-hidden": "true" })
      ]
    }
  );
};

// src/Badge/Badge.module.css
var Badge_default = {};
var Badge = ({
  variant = "secondary",
  pill = false,
  position,
  dot = false,
  className = "",
  children,
  "aria-label": ariaLabel,
  ...props
}) => {
  const classes2 = [
    Badge_default.badge,
    Badge_default[variant],
    pill && Badge_default.pill,
    position && Badge_default[position.replace("-", "")],
    dot && Badge_default.dot,
    className
  ].filter(Boolean).join(" ");
  return /* @__PURE__ */ jsx("span", { className: classes2, "aria-label": ariaLabel ?? (dot ? "Notification" : void 0), ...props, children: !dot && children });
};

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
  const Heading2 = `h${headingLevel}`;
  return /* @__PURE__ */ jsx("div", { className: [Accordion_default.accordion, flush && Accordion_default.flush, className].filter(Boolean).join(" "), ...props, children: items.map((item) => {
    const expanded = activeItems.includes(item.id);
    const triggerId = `${item.id}-trigger`;
    const panelId = `${item.id}-panel`;
    return /* @__PURE__ */ jsxs("section", { className: Accordion_default.item, children: [
      /* @__PURE__ */ jsx(Heading2, { className: Accordion_default.heading, children: /* @__PURE__ */ jsxs(
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

// src/ButtonGroup/ButtonGroup.module.css
var ButtonGroup_default = {};
function joinClasses(...classes2) {
  return classes2.filter(Boolean).join(" ");
}
var ButtonGroup = ({
  children,
  orientation = "horizontal",
  size,
  className = "",
  role = "group",
  "aria-label": ariaLabel = "Button group",
  ...props
}) => {
  return /* @__PURE__ */ jsx(
    "div",
    {
      className: joinClasses(ButtonGroup_default.buttonGroup, ButtonGroup_default[orientation], size && ButtonGroup_default[size], className),
      role,
      "aria-label": ariaLabel,
      ...props,
      children
    }
  );
};
var ButtonToolbar = ({
  children,
  className = "",
  role = "toolbar",
  "aria-label": ariaLabel = "Button toolbar",
  ...props
}) => {
  return /* @__PURE__ */ jsx("div", { className: joinClasses(ButtonGroup_default.toolbar, className), role, "aria-label": ariaLabel, ...props, children });
};
var ButtonGroupToggle = ({
  options,
  type,
  name,
  value,
  defaultValue = [],
  onValueChange,
  className = "",
  "aria-label": ariaLabel = `${type === "radio" ? "Radio" : "Checkbox"} button group`,
  ...props
}) => {
  const [internalValue, setInternalValue] = useState(defaultValue);
  const isControlled = value !== void 0;
  const selectedValues = isControlled ? value : internalValue;
  const updateValue = (optionValue, checked) => {
    const nextValue = type === "radio" ? checked ? [optionValue] : [] : checked ? [...selectedValues, optionValue] : selectedValues.filter((selected) => selected !== optionValue);
    if (!isControlled) setInternalValue(nextValue);
    onValueChange?.(nextValue);
  };
  return /* @__PURE__ */ jsx(
    "div",
    {
      className: joinClasses(ButtonGroup_default.buttonGroup, ButtonGroup_default.horizontal, ButtonGroup_default.toggleGroup, className),
      role: "group",
      "aria-label": ariaLabel,
      ...props,
      children: options.map((option) => {
        const checked = selectedValues.includes(option.value);
        return /* @__PURE__ */ jsxs(
          "label",
          {
            className: joinClasses(
              ButtonGroup_default.toggle,
              checked && ButtonGroup_default.toggleChecked,
              option.disabled && ButtonGroup_default.toggleDisabled
            ),
            children: [
              /* @__PURE__ */ jsx(
                "input",
                {
                  className: ButtonGroup_default.toggleInput,
                  type,
                  name,
                  value: option.value,
                  checked,
                  disabled: option.disabled,
                  onChange: (event) => updateValue(option.value, event.target.checked)
                }
              ),
              /* @__PURE__ */ jsx("span", { children: option.label })
            ]
          },
          option.value
        );
      })
    }
  );
};

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
var CardTitle = ({ as: Heading2 = "h5", children, className = "", ...props }) => {
  return /* @__PURE__ */ jsx(Heading2, { className: classes(Card_default.title, className), ...props, children });
};
var CardSubtitle = ({ as: Heading2 = "h6", children, className = "", ...props }) => {
  return /* @__PURE__ */ jsx(Heading2, { className: classes(Card_default.subtitle, className), ...props, children });
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

// src/Carousel/Carousel.module.css
var Carousel_default = {};
var Arrow = ({ direction }) => {
  return /* @__PURE__ */ jsx("svg", { "aria-hidden": "true", viewBox: "0 0 16 16", className: Carousel_default.arrow, children: /* @__PURE__ */ jsx(
    "path",
    {
      d: direction === "previous" ? "m10 2-6 6 6 6" : "m6 2 6 6-6 6",
      fill: "none",
      stroke: "currentColor",
      strokeLinecap: "round",
      strokeLinejoin: "round",
      strokeWidth: "1.5"
    }
  ) });
};
var Carousel = ({
  slides,
  activeIndex,
  defaultActiveIndex = 0,
  onSlideChange,
  showControls = true,
  showIndicators = true,
  interval = false,
  pauseOnHover = true,
  wrap = true,
  dark = false,
  transitionDuration = 600,
  className = "",
  style,
  "aria-label": ariaLabel = "Carousel",
  onMouseEnter,
  onMouseLeave,
  ...props
}) => {
  const [internalIndex, setInternalIndex] = useState(defaultActiveIndex);
  const [paused, setPaused] = useState(false);
  const isControlled = activeIndex !== void 0;
  const requestedIndex = isControlled ? activeIndex : internalIndex;
  const currentIndex = slides.length ? Math.min(Math.max(requestedIndex, 0), slides.length - 1) : 0;
  const goTo = (nextIndex) => {
    if (!slides.length) return;
    const boundedIndex = wrap ? (nextIndex + slides.length) % slides.length : Math.min(Math.max(nextIndex, 0), slides.length - 1);
    if (boundedIndex === currentIndex) return;
    if (!isControlled) setInternalIndex(boundedIndex);
    onSlideChange?.(boundedIndex);
  };
  useEffect(() => {
    if (!interval || interval <= 0 || paused || slides.length < 2) return;
    const timer = window.setInterval(() => goTo(currentIndex + 1), interval);
    return () => window.clearInterval(timer);
  }, [interval, paused, currentIndex, slides.length, wrap, isControlled, onSlideChange]);
  const carouselStyle = {
    ...style,
    "--carousel-duration": `${Math.max(0, transitionDuration)}ms`
  };
  return /* @__PURE__ */ jsxs(
    "div",
    {
      className: [Carousel_default.carousel, dark && Carousel_default.dark, className].filter(Boolean).join(" "),
      role: "region",
      "aria-roledescription": "carousel",
      "aria-label": ariaLabel,
      style: carouselStyle,
      onMouseEnter: (event) => {
        if (pauseOnHover) setPaused(true);
        onMouseEnter?.(event);
      },
      onMouseLeave: (event) => {
        setPaused(false);
        onMouseLeave?.(event);
      },
      ...props,
      children: [
        /* @__PURE__ */ jsx("div", { className: Carousel_default.viewport, children: /* @__PURE__ */ jsx("div", { className: Carousel_default.track, style: { transform: `translateX(-${currentIndex * 100}%)` }, children: slides.map((slide, index) => {
          const isActive = index === currentIndex;
          return /* @__PURE__ */ jsxs(
            "div",
            {
              className: Carousel_default.slide,
              role: "group",
              "aria-roledescription": "slide",
              "aria-label": slide.label ?? `${index + 1} of ${slides.length}`,
              "aria-hidden": !isActive,
              inert: !isActive,
              children: [
                /* @__PURE__ */ jsx("div", { className: Carousel_default.content, children: slide.content }),
                slide.caption && /* @__PURE__ */ jsx("div", { className: Carousel_default.caption, children: slide.caption })
              ]
            },
            slide.id ?? index
          );
        }) }) }),
        showControls && slides.length > 1 && /* @__PURE__ */ jsxs(Fragment, { children: [
          /* @__PURE__ */ jsx(
            "button",
            {
              type: "button",
              className: [Carousel_default.control, Carousel_default.previous].join(" "),
              "aria-label": "Previous slide",
              disabled: !wrap && currentIndex === 0,
              onClick: () => goTo(currentIndex - 1),
              children: /* @__PURE__ */ jsx(Arrow, { direction: "previous" })
            }
          ),
          /* @__PURE__ */ jsx(
            "button",
            {
              type: "button",
              className: [Carousel_default.control, Carousel_default.next].join(" "),
              "aria-label": "Next slide",
              disabled: !wrap && currentIndex === slides.length - 1,
              onClick: () => goTo(currentIndex + 1),
              children: /* @__PURE__ */ jsx(Arrow, { direction: "next" })
            }
          )
        ] }),
        showIndicators && slides.length > 1 && /* @__PURE__ */ jsx("div", { className: Carousel_default.indicators, role: "group", "aria-label": "Choose slide", children: slides.map((slide, index) => /* @__PURE__ */ jsx(
          "button",
          {
            type: "button",
            className: [Carousel_default.indicator, index === currentIndex && Carousel_default.indicatorActive].filter(Boolean).join(" "),
            "aria-label": `Go to slide ${index + 1}`,
            "aria-current": index === currentIndex ? "true" : void 0,
            onClick: () => goTo(index)
          },
          slide.id ?? index
        )) })
      ]
    }
  );
};

// src/Collapse/Collapse.module.css
var Collapse_default = {};
var CollapseContext = createContext(null);
function useCollapseContext() {
  const context = useContext(CollapseContext);
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
  const generatedId = useId().replace(/:/g, "");
  const [internalOpen, setInternalOpen] = useState(defaultOpen);
  const isControlled = open !== void 0;
  const expanded = isControlled ? open : internalOpen;
  const resolvedPanelId = panelId ?? `${generatedId}-panel`;
  const toggle = () => {
    const nextOpen = !expanded;
    if (!isControlled) setInternalOpen(nextOpen);
    onOpenChange?.(nextOpen);
  };
  return /* @__PURE__ */ jsx(CollapseContext.Provider, { value: { panelId: resolvedPanelId, open: expanded, toggle }, children: /* @__PURE__ */ jsx(
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
  return /* @__PURE__ */ jsx(
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
  return /* @__PURE__ */ jsx(
    "div",
    {
      ...props,
      id: panelId,
      className: [Collapse_default.panel, open && Collapse_default.open, className].filter(Boolean).join(" "),
      "aria-hidden": !open,
      inert: !open,
      children: /* @__PURE__ */ jsx("div", { className: Collapse_default.panelInner, children: /* @__PURE__ */ jsx("div", { className: Collapse_default.content, children }) })
    }
  );
};

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
function joinClasses2(...classes2) {
  return classes2.filter(Boolean).join(" ");
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
      className: joinClasses2(
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
      className: joinClasses2(Dropdown_default.toggle, toggleVariants[variant], split && Dropdown_default.splitToggle, className),
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
      className: joinClasses2(
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
  const classes2 = joinClasses2(Dropdown_default.item, active && Dropdown_default.active, disabled && Dropdown_default.disabled, className);
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
        className: classes2,
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
      className: classes2,
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
  return /* @__PURE__ */ jsx("div", { className: joinClasses2(Dropdown_default.header, className), role: "presentation", ...props, children });
};
var DropdownDivider = ({ className = "", ...props }) => {
  return /* @__PURE__ */ jsx("hr", { className: joinClasses2(Dropdown_default.divider, className), role: "separator", ...props });
};

// src/ListGroup/ListGroup.module.css
var ListGroup_default = {};
var ListGroupContext = createContext({ semanticList: false });
var variantClasses2 = {
  primary: ListGroup_default.primary,
  secondary: ListGroup_default.secondary,
  success: ListGroup_default.success,
  danger: ListGroup_default.danger,
  warning: ListGroup_default.warning,
  info: ListGroup_default.info,
  light: ListGroup_default.light,
  dark: ListGroup_default.dark
};
function joinClasses3(...classes2) {
  return classes2.filter(Boolean).join(" ");
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
  const classes2 = joinClasses3(
    ListGroup_default.listGroup,
    semanticList && ListGroup_default.semanticList,
    flush && ListGroup_default.flush,
    horizontal && ListGroup_default.horizontal,
    (numbered || Element === "ol") && ListGroup_default.numbered,
    className
  );
  return /* @__PURE__ */ jsx(ListGroupContext.Provider, { value: { semanticList }, children: /* @__PURE__ */ jsx(Element, { className: classes2, ...props, children }) });
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
  const { semanticList } = useContext(ListGroupContext);
  const itemClasses = joinClasses3(
    ListGroup_default.item,
    (action || href !== void 0 || button) && ListGroup_default.action,
    active && ListGroup_default.active,
    disabled && ListGroup_default.disabled,
    variant && variantClasses2[variant],
    className
  );
  const content = /* @__PURE__ */ jsxs(Fragment, { children: [
    /* @__PURE__ */ jsx("div", { className: ListGroup_default.itemText, children }),
    badge !== void 0 && /* @__PURE__ */ jsx("span", { className: ListGroup_default.badge, children: badge })
  ] });
  const itemOnClick = (event) => {
    if (disabled) {
      event.preventDefault();
      return;
    }
    onClick?.(event);
  };
  if (semanticList) {
    return /* @__PURE__ */ jsx("li", { className: itemClasses, "aria-current": active ? "true" : void 0, "aria-disabled": disabled || void 0, children: href !== void 0 ? /* @__PURE__ */ jsx(
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
    ) : button ? /* @__PURE__ */ jsx(
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
    ) : /* @__PURE__ */ jsx("div", { ...props, className: ListGroup_default.semanticContent, children: content }) });
  }
  if (href !== void 0) {
    return /* @__PURE__ */ jsx(
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
    return /* @__PURE__ */ jsx(
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
  return /* @__PURE__ */ jsx(
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

// src/Modal/Modal.module.css
var Modal_default = {};
var ModalContext = createContext(null);
function useModalContext() {
  const context = useContext(ModalContext);
  if (!context) throw new Error("ModalTrigger and ModalContent must be rendered inside Modal.");
  return context;
}
function joinClasses4(...classes2) {
  return classes2.filter(Boolean).join(" ");
}
var Modal = ({
  open,
  defaultOpen = false,
  onOpenChange,
  closeOnEscape = true,
  closeOnBackdrop = true,
  children
}) => {
  const generatedId = useId().replace(/:/g, "");
  const [internalOpen, setInternalOpen] = useState(defaultOpen);
  const isControlled = open !== void 0;
  const expanded = isControlled ? open : internalOpen;
  const setOpen = (nextOpen) => {
    if (!isControlled) setInternalOpen(nextOpen);
    onOpenChange?.(nextOpen);
  };
  return /* @__PURE__ */ jsx(
    ModalContext.Provider,
    {
      value: {
        open: expanded,
        setOpen,
        titleId: `${generatedId}-title`,
        descriptionId: `${generatedId}-description`,
        closeOnEscape,
        closeOnBackdrop
      },
      children
    }
  );
};
var ModalTrigger = ({
  children = "Open modal",
  className = "",
  type = "button",
  onClick,
  ...props
}) => {
  const { open, setOpen } = useModalContext();
  return /* @__PURE__ */ jsx(
    "button",
    {
      ...props,
      type,
      className: joinClasses4(Modal_default.trigger, className),
      "aria-haspopup": "dialog",
      "aria-expanded": open,
      onClick: (event) => {
        onClick?.(event);
        if (!event.defaultPrevented) setOpen(true);
      },
      children
    }
  );
};
var ModalContent = ({
  size = "md",
  centered = false,
  scrollable = false,
  showCloseButton = true,
  children,
  className = "",
  onKeyDown,
  onMouseDown,
  "aria-label": ariaLabel,
  ...props
}) => {
  const { open, setOpen, titleId, descriptionId, closeOnEscape, closeOnBackdrop } = useModalContext();
  const [mounted, setMounted] = useState(false);
  const dialogRef = useRef(null);
  useEffect(() => setMounted(true), []);
  useEffect(() => {
    if (!open || !mounted || typeof document === "undefined") return;
    const previousFocus = document.activeElement instanceof HTMLElement ? document.activeElement : null;
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    const frame = window.requestAnimationFrame(() => {
      const firstFocusable = dialogRef.current?.querySelector(
        '[autofocus], button:not(:disabled), [href], input:not(:disabled), select:not(:disabled), textarea:not(:disabled), [tabindex]:not([tabindex="-1"])'
      );
      (firstFocusable ?? dialogRef.current)?.focus();
    });
    return () => {
      window.cancelAnimationFrame(frame);
      document.body.style.overflow = previousOverflow;
      previousFocus?.focus();
    };
  }, [open, mounted]);
  const handleKeyDown = (event) => {
    onKeyDown?.(event);
    if (event.defaultPrevented) return;
    if (event.key === "Escape" && closeOnEscape) {
      event.preventDefault();
      setOpen(false);
      return;
    }
    if (event.key !== "Tab") return;
    const focusable = Array.from(
      dialogRef.current?.querySelectorAll(
        'button:not(:disabled), [href], input:not(:disabled), select:not(:disabled), textarea:not(:disabled), [tabindex]:not([tabindex="-1"])'
      ) ?? []
    );
    if (!focusable.length) {
      event.preventDefault();
      dialogRef.current?.focus();
      return;
    }
    const first = focusable[0];
    const last = focusable[focusable.length - 1];
    if (event.shiftKey && document.activeElement === first) {
      event.preventDefault();
      last.focus();
    } else if (!event.shiftKey && document.activeElement === last) {
      event.preventDefault();
      first.focus();
    }
  };
  if (!open || !mounted || typeof document === "undefined") return null;
  return createPortal(
    /* @__PURE__ */ jsx(
      "div",
      {
        className: joinClasses4(Modal_default.backdrop, centered && Modal_default.centered),
        onMouseDown: (event) => {
          onMouseDown?.(event);
          if (!event.defaultPrevented && closeOnBackdrop && event.target === event.currentTarget) setOpen(false);
        },
        children: /* @__PURE__ */ jsxs(
          "div",
          {
            ...props,
            ref: dialogRef,
            className: joinClasses4(Modal_default.dialog, Modal_default[size], scrollable && Modal_default.scrollable, className),
            role: "dialog",
            "aria-modal": "true",
            "aria-labelledby": ariaLabel ? void 0 : titleId,
            "aria-label": ariaLabel,
            "aria-describedby": descriptionId,
            tabIndex: -1,
            onKeyDown: handleKeyDown,
            children: [
              showCloseButton && /* @__PURE__ */ jsx(ModalClose, { className: Modal_default.closeButton, "aria-label": "Close dialog" }),
              children
            ]
          }
        )
      }
    ),
    document.body
  );
};
var ModalHeader = ({ children, className = "", ...props }) => {
  return /* @__PURE__ */ jsx("div", { className: joinClasses4(Modal_default.header, className), ...props, children });
};
var ModalTitle = ({ as: Heading2 = "h2", children, className = "", ...props }) => {
  const { titleId } = useModalContext();
  return /* @__PURE__ */ jsx(Heading2, { ...props, id: titleId, className: joinClasses4(Modal_default.title, className), children });
};
var ModalDescription = ({ children, className = "", ...props }) => {
  const { descriptionId } = useModalContext();
  return /* @__PURE__ */ jsx("p", { ...props, id: descriptionId, className: joinClasses4(Modal_default.description, className), children });
};
var ModalBody = ({ children, className = "", ...props }) => {
  return /* @__PURE__ */ jsx("div", { className: joinClasses4(Modal_default.body, className), ...props, children });
};
var ModalFooter = ({ children, className = "", ...props }) => {
  return /* @__PURE__ */ jsx("div", { className: joinClasses4(Modal_default.footer, className), ...props, children });
};
var ModalClose = ({
  children,
  variant = "secondary",
  className = "",
  type = "button",
  onClick,
  ...props
}) => {
  const { setOpen } = useModalContext();
  const closeClass = children === void 0 ? Modal_default.close : joinClasses4(Modal_default.actionClose, Modal_default[`action${variant}`]);
  return /* @__PURE__ */ jsx(
    "button",
    {
      ...props,
      type,
      className: joinClasses4(closeClass, className),
      onClick: (event) => {
        onClick?.(event);
        if (!event.defaultPrevented) setOpen(false);
      },
      children: children ?? /* @__PURE__ */ jsx("svg", { "aria-hidden": "true", viewBox: "0 0 16 16", children: /* @__PURE__ */ jsx("path", { d: "m3 3 10 10M13 3 3 13", fill: "none", stroke: "currentColor", strokeLinecap: "round", strokeWidth: "1.5" }) })
    }
  );
};

// src/Navbar/Navbar.module.css
var Navbar_default = {};
var NavbarContext = createContext(null);
function useNavbarContext() {
  const context = useContext(NavbarContext);
  if (!context) throw new Error("NavbarToggle and NavbarCollapse must be rendered inside Navbar.");
  return context;
}
function joinClasses5(...classes2) {
  return classes2.filter(Boolean).join(" ");
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
  const generatedId = useId().replace(/:/g, "");
  const [internalExpanded, setInternalExpanded] = useState(defaultExpanded);
  const isControlled = expanded !== void 0;
  const isExpanded = isControlled ? expanded : internalExpanded;
  const setExpanded = (nextExpanded) => {
    if (!isControlled) setInternalExpanded(nextExpanded);
    onExpandedChange?.(nextExpanded);
  };
  return /* @__PURE__ */ jsx(NavbarContext.Provider, { value: { collapseId: `${generatedId}-collapse`, expanded: isExpanded, setExpanded }, children: /* @__PURE__ */ jsx(
    "nav",
    {
      className: joinClasses5(
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
  return /* @__PURE__ */ jsx("a", { className: joinClasses5(Navbar_default.brand, className), ...props, children });
};
var NavbarToggle = ({ children, className = "", type = "button", onClick, ...props }) => {
  const { collapseId, expanded, setExpanded } = useNavbarContext();
  return /* @__PURE__ */ jsx(
    "button",
    {
      ...props,
      type,
      className: joinClasses5(Navbar_default.toggle, className),
      "aria-label": props["aria-label"] ?? "Toggle navigation",
      "aria-controls": collapseId,
      "aria-expanded": expanded,
      onClick: (event) => {
        onClick?.(event);
        if (!event.defaultPrevented) setExpanded(!expanded);
      },
      children: children ?? /* @__PURE__ */ jsxs("span", { className: Navbar_default.toggleIcon, "aria-hidden": "true", children: [
        /* @__PURE__ */ jsx("span", {}),
        /* @__PURE__ */ jsx("span", {}),
        /* @__PURE__ */ jsx("span", {})
      ] })
    }
  );
};
var NavbarCollapse = ({ children, className = "", ...props }) => {
  const { collapseId, expanded } = useNavbarContext();
  return /* @__PURE__ */ jsx("div", { id: collapseId, className: joinClasses5(Navbar_default.collapse, expanded && Navbar_default.expanded, className), ...props, children });
};
var NavbarNav = ({ align = "start", children, className = "", ...props }) => {
  return /* @__PURE__ */ jsx("ul", { className: joinClasses5(Navbar_default.nav, Navbar_default[`align${align}`], className), ...props, children });
};
var NavbarItem = ({ children, className = "", ...props }) => {
  return /* @__PURE__ */ jsx("li", { className: joinClasses5(Navbar_default.item, className), ...props, children });
};
var NavbarLink = ({
  active = false,
  disabled = false,
  children,
  className = "",
  onClick,
  ...props
}) => {
  return /* @__PURE__ */ jsx(
    "a",
    {
      ...props,
      className: joinClasses5(Navbar_default.link, active && Navbar_default.active, disabled && Navbar_default.disabled, className),
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
  return /* @__PURE__ */ jsx("span", { className: joinClasses5(Navbar_default.text, className), ...props, children });
};
var NavbarContainer = ({ fluid = false, children, className = "", ...props }) => {
  return /* @__PURE__ */ jsx("div", { className: joinClasses5(Navbar_default.container, fluid && Navbar_default.fluid, className), ...props, children });
};

// src/NavsTabs/NavsTabs.module.css
var NavsTabs_default = {};
var NavsTabsContext = createContext(null);
function joinClasses6(...classes2) {
  return classes2.filter(Boolean).join(" ");
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
          className: joinClasses6(NavsTabs_default.root, NavsTabs_default[`orientation${orientation}`], className),
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
      className: joinClasses6(NavsTabs_default.list, NavsTabs_default[`list${variant}`], className),
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
      className: joinClasses6(NavsTabs_default.tab, selected && NavsTabs_default.selected, disabled && NavsTabs_default.disabled, className),
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
      className: joinClasses6(NavsTabs_default.panel, selected && NavsTabs_default.panelSelected, className),
      role: "tabpanel",
      "aria-labelledby": `${baseId}-tab-${tabKey}`,
      hidden: !selected,
      tabIndex: 0,
      children
    }
  );
};

// src/Skeleton/Skeleton.module.css
var Skeleton_default = {};
function joinClasses7(...classes2) {
  return classes2.filter(Boolean).join(" ");
}
var Skeleton = ({
  animation = "none",
  size,
  color = "default",
  width,
  as: Element = "span",
  className = "",
  style,
  "aria-hidden": ariaHidden = true,
  ...props
}) => {
  const normalizedWidth = typeof width === "number" ? `${width}px` : width;
  return /* @__PURE__ */ jsx(
    Element,
    {
      className: joinClasses7(
        Skeleton_default.skeleton,
        Skeleton_default[animation],
        size && Skeleton_default[`size${size}`],
        Skeleton_default[color],
        className
      ),
      style: { ...style, ...normalizedWidth ? { width: normalizedWidth } : {} },
      "aria-hidden": ariaHidden,
      ...props
    }
  );
};

// src/Popover/Popover.module.css
var Popover_default = {};
var PopoverContext = createContext(null);
function joinClasses8(...classes2) {
  return classes2.filter(Boolean).join(" ");
}
function usePopoverContext() {
  const context = useContext(PopoverContext);
  if (!context) throw new Error("PopoverTrigger and PopoverContent must be rendered inside Popover.");
  return context;
}
var Popover = ({
  open,
  defaultOpen = false,
  onOpenChange,
  placement = "top",
  trigger = "click",
  children,
  className = "",
  onKeyDown,
  ...props
}) => {
  const generatedId = useId().replace(/:/g, "");
  const [internalOpen, setInternalOpen] = useState(defaultOpen);
  const rootRef = useRef(null);
  const triggerRef = useRef(null);
  const contentRef = useRef(null);
  const isControlled = open !== void 0;
  const isOpen = isControlled ? open : internalOpen;
  const setOpen = (nextOpen) => {
    if (!isControlled) setInternalOpen(nextOpen);
    onOpenChange?.(nextOpen);
  };
  useEffect(() => {
    if (!isOpen) return;
    const handlePointerDown = (event) => {
      if (!rootRef.current?.contains(event.target)) setOpen(false);
    };
    const handleDocumentKeyDown = (event) => {
      if (event.key === "Escape") {
        setOpen(false);
        triggerRef.current?.focus();
      }
    };
    document.addEventListener("pointerdown", handlePointerDown);
    document.addEventListener("keydown", handleDocumentKeyDown);
    return () => {
      document.removeEventListener("pointerdown", handlePointerDown);
      document.removeEventListener("keydown", handleDocumentKeyDown);
    };
  }, [isOpen, isControlled, onOpenChange]);
  return /* @__PURE__ */ jsx(
    PopoverContext.Provider,
    {
      value: {
        open: isOpen,
        setOpen,
        toggle: () => setOpen(!isOpen),
        contentId: `${generatedId}-content`,
        titleId: `${generatedId}-title`,
        triggerRef,
        contentRef,
        placement,
        triggerMode: trigger
      },
      children: /* @__PURE__ */ jsx(
        "div",
        {
          ...props,
          ref: rootRef,
          className: joinClasses8(Popover_default.root, Popover_default[placement], className),
          onKeyDown: (event) => {
            onKeyDown?.(event);
            if (!event.defaultPrevented && event.key === "Escape" && isOpen) {
              setOpen(false);
              triggerRef.current?.focus();
            }
          },
          children
        }
      )
    }
  );
};
var PopoverTrigger = ({
  children = "Toggle popover",
  className = "",
  type = "button",
  onClick,
  onMouseEnter,
  onMouseLeave,
  onFocus,
  onBlur,
  ...props
}) => {
  const { open, setOpen, toggle, contentId, triggerRef, contentRef, triggerMode } = usePopoverContext();
  return /* @__PURE__ */ jsx(
    "button",
    {
      ...props,
      ref: triggerRef,
      type,
      className: joinClasses8(Popover_default.trigger, className),
      "aria-haspopup": "dialog",
      "aria-expanded": open,
      "aria-controls": contentId,
      "aria-describedby": open ? contentId : void 0,
      onClick: (event) => {
        onClick?.(event);
        if (!event.defaultPrevented && triggerMode === "click") toggle();
      },
      onMouseEnter: (event) => {
        onMouseEnter?.(event);
        if (triggerMode === "hover") setOpen(true);
      },
      onMouseLeave: (event) => {
        onMouseLeave?.(event);
        if (triggerMode === "hover" && !contentRef.current?.matches(":hover")) setOpen(false);
      },
      onFocus: (event) => {
        onFocus?.(event);
        if (triggerMode === "focus") setOpen(true);
      },
      onBlur: (event) => {
        onBlur?.(event);
        if (triggerMode === "focus" && !contentRef.current?.contains(event.relatedTarget)) setOpen(false);
      },
      children
    }
  );
};
var PopoverContent = ({
  title,
  children,
  className = "",
  onMouseEnter,
  onMouseLeave,
  ...props
}) => {
  const { open, setOpen, contentId, titleId, contentRef, triggerMode } = usePopoverContext();
  if (!open) return null;
  return /* @__PURE__ */ jsxs(
    "div",
    {
      ...props,
      ref: contentRef,
      id: contentId,
      className: joinClasses8(Popover_default.content, className),
      role: "dialog",
      "aria-labelledby": title !== void 0 ? titleId : void 0,
      onMouseEnter: (event) => {
        onMouseEnter?.(event);
        if (triggerMode === "hover") setOpen(true);
      },
      onMouseLeave: (event) => {
        onMouseLeave?.(event);
        if (triggerMode === "hover" && !event.currentTarget.parentElement?.matches(":hover")) setOpen(false);
      },
      children: [
        /* @__PURE__ */ jsx("span", { className: Popover_default.arrow, "aria-hidden": "true" }),
        title !== void 0 && /* @__PURE__ */ jsx("div", { id: titleId, className: Popover_default.header, children: title }),
        /* @__PURE__ */ jsx("div", { className: Popover_default.body, children })
      ]
    }
  );
};

// src/Progress/Progress.module.css
var Progress_default = {};
function joinClasses9(...classes2) {
  return classes2.filter(Boolean).join(" ");
}
var Progress = ({
  value,
  min = 0,
  max = 100,
  variant = "primary",
  striped = false,
  animated = false,
  label,
  showValue = false,
  children,
  className = "",
  style,
  "aria-label": ariaLabel,
  ...props
}) => {
  const range = max - min;
  const percentage = range > 0 ? Math.min(100, Math.max(0, (value - min) / range * 100)) : 0;
  const displayLabel = children ?? label ?? (showValue ? `${Math.round(percentage)}%` : void 0);
  return /* @__PURE__ */ jsx(
    "div",
    {
      ...props,
      className: joinClasses9(Progress_default.track, className),
      role: "progressbar",
      "aria-label": ariaLabel ?? (typeof label === "string" ? label : void 0),
      "aria-valuemin": min,
      "aria-valuemax": max,
      "aria-valuenow": value,
      "aria-valuetext": typeof displayLabel === "string" ? displayLabel : void 0,
      style,
      children: /* @__PURE__ */ jsx(
        "div",
        {
          className: joinClasses9(Progress_default.bar, Progress_default[variant], striped && Progress_default.striped, animated && Progress_default.animated),
          style: { width: `${percentage}%` },
          "aria-hidden": "true",
          children: displayLabel
        }
      )
    }
  );
};
var ProgressSegment = ({
  value,
  min = 0,
  max = 100,
  variant = "primary",
  striped = false,
  animated = false,
  label,
  showValue = false,
  children,
  className = "",
  style,
  "aria-label": ariaLabel,
  ...props
}) => {
  const range = max - min;
  const percentage = range > 0 ? Math.min(100, Math.max(0, (value - min) / range * 100)) : 0;
  const displayLabel = children ?? label ?? (showValue ? `${Math.round(percentage)}%` : void 0);
  return /* @__PURE__ */ jsx(
    "div",
    {
      ...props,
      className: joinClasses9(
        Progress_default.bar,
        Progress_default[variant],
        striped && Progress_default.striped,
        animated && Progress_default.animated,
        className
      ),
      role: "progressbar",
      "aria-label": ariaLabel ?? (typeof label === "string" ? label : void 0),
      "aria-valuemin": min,
      "aria-valuemax": max,
      "aria-valuenow": value,
      "aria-valuetext": typeof displayLabel === "string" ? displayLabel : void 0,
      style: { ...style, width: `${percentage}%` },
      children: displayLabel
    }
  );
};
var ProgressStack = ({
  label = "Progress",
  height,
  children,
  className = "",
  style,
  ...props
}) => {
  const normalizedHeight = typeof height === "number" ? `${height}px` : height;
  return /* @__PURE__ */ jsx(
    "div",
    {
      ...props,
      className: joinClasses9(Progress_default.track, Progress_default.stacked, className),
      role: "group",
      "aria-label": label,
      style: { ...style, ...normalizedHeight ? { height: normalizedHeight } : {} },
      children
    }
  );
};

// src/Spinner/Spinner.module.css
var Spinner_default = {};
function joinClasses10(...classes2) {
  return classes2.filter(Boolean).join(" ");
}
var Spinner = ({
  variant = "border",
  color,
  size,
  label = "Loading...",
  className = "",
  ...props
}) => {
  return /* @__PURE__ */ jsx(
    "span",
    {
      ...props,
      className: joinClasses10(
        Spinner_default.spinner,
        Spinner_default[variant],
        color && Spinner_default[color],
        size === "sm" && Spinner_default.small,
        className
      ),
      role: "status",
      "aria-label": label,
      children: /* @__PURE__ */ jsx("span", { className: Spinner_default.visuallyHidden, children: label })
    }
  );
};

// src/Toast/Toast.module.css
var Toast_default = {};
var ToastContext = createContext(null);
function joinClasses11(...classes2) {
  return classes2.filter(Boolean).join(" ");
}
var placementClasses = {
  "top-start": Toast_default.topstart,
  "top-center": Toast_default.topcenter,
  "top-end": Toast_default.topend,
  "middle-start": Toast_default.middlestart,
  "middle-center": Toast_default.middlecenter,
  "middle-end": Toast_default.middleend,
  "bottom-start": Toast_default.bottomstart,
  "bottom-center": Toast_default.bottomcenter,
  "bottom-end": Toast_default.bottomend
};
function useToastContext() {
  const context = useContext(ToastContext);
  if (!context) throw new Error("ToastClose must be rendered inside Toast.");
  return context;
}
var Toast = ({
  title,
  variant = "light",
  autohide = false,
  delay = 5e3,
  open,
  defaultOpen = true,
  onOpenChange,
  onClose,
  closeButton = true,
  children,
  className = "",
  ...props
}) => {
  const generatedId = useId().replace(/:/g, "");
  const [internalOpen, setInternalOpen] = useState(defaultOpen);
  const isControlled = open !== void 0;
  const isOpen = isControlled ? open : internalOpen;
  const close = () => {
    if (!isControlled) setInternalOpen(false);
    onOpenChange?.(false);
    onClose?.();
  };
  useEffect(() => {
    if (!isOpen || !autohide || delay <= 0) return;
    const timeout = window.setTimeout(close, delay);
    return () => window.clearTimeout(timeout);
  }, [isOpen, autohide, delay, isControlled, onOpenChange, onClose]);
  if (!isOpen) return null;
  return /* @__PURE__ */ jsx(ToastContext.Provider, { value: { titleId: `${generatedId}-title`, close }, children: /* @__PURE__ */ jsxs(
    "div",
    {
      ...props,
      className: joinClasses11(Toast_default.toast, Toast_default[variant], className),
      role: "status",
      "aria-live": variant === "danger" ? "assertive" : "polite",
      "aria-atomic": "true",
      children: [
        /* @__PURE__ */ jsxs("div", { className: Toast_default.header, children: [
          title !== void 0 && /* @__PURE__ */ jsx("strong", { id: `${generatedId}-title`, className: Toast_default.title, children: title }),
          closeButton && /* @__PURE__ */ jsx(ToastClose, { "aria-label": "Close notification" })
        ] }),
        children !== void 0 && /* @__PURE__ */ jsx("div", { className: Toast_default.body, children })
      ]
    }
  ) });
};
var ToastClose = ({ children, className = "", onClick, type = "button", ...props }) => {
  const { close } = useToastContext();
  return /* @__PURE__ */ jsx(
    "button",
    {
      ...props,
      type,
      className: joinClasses11(Toast_default.close, className),
      onClick: (event) => {
        onClick?.(event);
        if (!event.defaultPrevented) close();
      },
      children: children ?? /* @__PURE__ */ jsx("svg", { "aria-hidden": "true", viewBox: "0 0 16 16", children: /* @__PURE__ */ jsx("path", { d: "m3 3 10 10M13 3 3 13", fill: "none", stroke: "currentColor", strokeLinecap: "round", strokeWidth: "1.5" }) })
    }
  );
};
var ToastContainer = ({
  placement = "top-end",
  stacked = false,
  children,
  className = "",
  ...props
}) => {
  return /* @__PURE__ */ jsx(
    "div",
    {
      ...props,
      className: joinClasses11(Toast_default.container, placementClasses[placement], stacked && Toast_default.stacked, className),
      "aria-label": "Notifications",
      children
    }
  );
};

// src/Tooltip/Tooltip.module.css
var Tooltip_default = {};
var TooltipContext = createContext(null);
function joinClasses12(...classes2) {
  return classes2.filter(Boolean).join(" ");
}
var placementClasses2 = {
  top: Tooltip_default.top,
  right: Tooltip_default.right,
  bottom: Tooltip_default.bottom,
  left: Tooltip_default.left
};
function useTooltipContext() {
  const context = useContext(TooltipContext);
  if (!context) throw new Error("TooltipTrigger and TooltipContent must be rendered inside Tooltip.");
  return context;
}
var Tooltip = ({
  content,
  placement = "top",
  trigger = "hover",
  open,
  defaultOpen = false,
  onOpenChange,
  interactive = false,
  children,
  className = "",
  ...props
}) => {
  const generatedId = useId().replace(/:/g, "");
  const [internalOpen, setInternalOpen] = useState(defaultOpen);
  const rootRef = useRef(null);
  const triggerRef = useRef(null);
  const contentRef = useRef(null);
  const isControlled = open !== void 0;
  const isOpen = isControlled ? open : internalOpen;
  const setOpen = (nextOpen) => {
    if (!isControlled) setInternalOpen(nextOpen);
    onOpenChange?.(nextOpen);
  };
  useEffect(() => {
    if (!isOpen) return;
    const handlePointerDown = (event) => {
      if (!rootRef.current?.contains(event.target)) setOpen(false);
    };
    const handleKeyDown = (event) => {
      if (event.key === "Escape") {
        setOpen(false);
        triggerRef.current?.focus();
      }
    };
    document.addEventListener("pointerdown", handlePointerDown);
    document.addEventListener("keydown", handleKeyDown);
    return () => {
      document.removeEventListener("pointerdown", handlePointerDown);
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [isOpen, isControlled, onOpenChange]);
  return /* @__PURE__ */ jsx(
    TooltipContext.Provider,
    {
      value: {
        open: isOpen,
        setOpen,
        toggle: () => setOpen(!isOpen),
        tooltipId: `${generatedId}-tooltip`,
        triggerRef,
        contentRef,
        triggerMode: trigger
      },
      children: /* @__PURE__ */ jsxs(
        "div",
        {
          ...props,
          ref: rootRef,
          className: joinClasses12(Tooltip_default.root, placementClasses2[placement], interactive && Tooltip_default.interactive, className),
          children: [
            children,
            isOpen && /* @__PURE__ */ jsxs("div", { ref: contentRef, id: `${generatedId}-tooltip`, className: Tooltip_default.content, role: "tooltip", children: [
              content,
              /* @__PURE__ */ jsx("span", { className: Tooltip_default.arrow, "aria-hidden": "true" })
            ] })
          ]
        }
      )
    }
  );
};
var TooltipTrigger = ({
  children = "Show tooltip",
  className = "",
  type = "button",
  onClick,
  onMouseEnter,
  onMouseLeave,
  onFocus,
  onBlur,
  ...props
}) => {
  const { open, setOpen, toggle, tooltipId, triggerRef, contentRef, triggerMode } = useTooltipContext();
  return /* @__PURE__ */ jsx(
    "button",
    {
      ...props,
      ref: (node) => {
        triggerRef.current = node;
      },
      type,
      className: joinClasses12(Tooltip_default.trigger, className),
      "aria-describedby": open ? tooltipId : void 0,
      onClick: (event) => {
        onClick?.(event);
        if (!event.defaultPrevented && triggerMode === "click") toggle();
      },
      onMouseEnter: (event) => {
        onMouseEnter?.(event);
        if (triggerMode === "hover") setOpen(true);
      },
      onMouseLeave: (event) => {
        onMouseLeave?.(event);
        if (triggerMode === "hover" && !contentRef.current?.matches(":hover")) setOpen(false);
      },
      onFocus: (event) => {
        onFocus?.(event);
        if (triggerMode === "focus" || triggerMode === "hover") setOpen(true);
      },
      onBlur: (event) => {
        onBlur?.(event);
        if ((triggerMode === "focus" || triggerMode === "hover") && !contentRef.current?.contains(event.relatedTarget))
          setOpen(false);
      },
      children
    }
  );
};
var TooltipLink = ({
  children,
  className = "",
  onClick,
  onMouseEnter,
  onMouseLeave,
  onFocus,
  onBlur,
  ...props
}) => {
  const { setOpen, toggle, tooltipId, triggerRef, contentRef, triggerMode, open } = useTooltipContext();
  return /* @__PURE__ */ jsx(
    "a",
    {
      ...props,
      ref: (node) => {
        triggerRef.current = node;
      },
      className: joinClasses12(Tooltip_default.link, className),
      "aria-describedby": open ? tooltipId : void 0,
      onClick: (event) => {
        onClick?.(event);
        if (!event.defaultPrevented && triggerMode === "click") {
          event.preventDefault();
          toggle();
        }
      },
      onMouseEnter: (event) => {
        onMouseEnter?.(event);
        if (triggerMode === "hover") setOpen(true);
      },
      onMouseLeave: (event) => {
        onMouseLeave?.(event);
        if (triggerMode === "hover" && !contentRef.current?.matches(":hover")) setOpen(false);
      },
      onFocus: (event) => {
        onFocus?.(event);
        if (triggerMode === "focus" || triggerMode === "hover") setOpen(true);
      },
      onBlur: (event) => {
        onBlur?.(event);
        if ((triggerMode === "focus" || triggerMode === "hover") && !contentRef.current?.contains(event.relatedTarget))
          setOpen(false);
      },
      children
    }
  );
};

// src/ColorPicker/ColorPicker.module.css
var ColorPicker_default = {};
function clamp(value, min, max) {
  return Math.min(max, Math.max(min, value));
}
function parseColor(value) {
  const input = value.trim();
  const hex = input.match(/^#?([\da-f]{3,8})$/i)?.[1];
  if (hex) {
    const normalized = hex.length === 3 || hex.length === 4 ? [...hex].map((part) => part + part).join("") : hex;
    if (normalized.length === 6 || normalized.length === 8) {
      return {
        r: parseInt(normalized.slice(0, 2), 16),
        g: parseInt(normalized.slice(2, 4), 16),
        b: parseInt(normalized.slice(4, 6), 16),
        a: normalized.length === 8 ? Math.round(parseInt(normalized.slice(6, 8), 16) / 255 * 100) : 100
      };
    }
  }
  const rgba = input.match(/^rgba?\(\s*(\d+)\s*,\s*(\d+)\s*,\s*(\d+)(?:\s*,\s*([\d.]+))?\s*\)$/i);
  if (rgba) {
    const alpha = rgba[4] === void 0 ? 1 : Number(rgba[4]);
    return {
      r: clamp(Number(rgba[1]), 0, 255),
      g: clamp(Number(rgba[2]), 0, 255),
      b: clamp(Number(rgba[3]), 0, 255),
      a: Math.round(clamp(alpha, 0, 1) * 100)
    };
  }
  return null;
}
function toHex({ r, g, b }) {
  return `#${[r, g, b].map((channel) => Math.round(channel).toString(16).padStart(2, "0")).join("").toUpperCase()}`;
}
function toHsv({ r, g, b, a }) {
  const red = r / 255;
  const green = g / 255;
  const blue = b / 255;
  const max = Math.max(red, green, blue);
  const min = Math.min(red, green, blue);
  const delta = max - min;
  let h = 0;
  if (delta) {
    if (max === red) h = (green - blue) / delta % 6;
    else if (max === green) h = (blue - red) / delta + 2;
    else h = (red - green) / delta + 4;
    h *= 60;
    if (h < 0) h += 360;
  }
  return { h, s: max === 0 ? 0 : delta / max * 100, v: max * 100, a };
}
function fromHsv({ h, s, v, a }) {
  const saturation = s / 100;
  const value = v / 100;
  const chroma = value * saturation;
  const x = chroma * (1 - Math.abs(h / 60 % 2 - 1));
  const m = value - chroma;
  let parts;
  if (h < 60) parts = [chroma, x, 0];
  else if (h < 120) parts = [x, chroma, 0];
  else if (h < 180) parts = [0, chroma, x];
  else if (h < 240) parts = [0, x, chroma];
  else if (h < 300) parts = [x, 0, chroma];
  else parts = [chroma, 0, x];
  return {
    r: Math.round((parts[0] + m) * 255),
    g: Math.round((parts[1] + m) * 255),
    b: Math.round((parts[2] + m) * 255),
    a
  };
}
var ColorPicker = ({
  value,
  defaultValue = "#1708FF",
  onChange,
  label = "Choose color",
  disabled = false,
  showAlpha = true,
  className = "",
  ...props
}) => {
  const generatedId = useId().replace(/:/g, "");
  const rootRef = useRef(null);
  const [internalColor, setInternalColor] = useState(() => parseColor(defaultValue) ?? { r: 23, g: 8, b: 255, a: 100 });
  const [textValue, setTextValue] = useState(value ?? toHex(internalColor));
  const [isOpen, setIsOpen] = useState(false);
  const color = parseColor(value ?? "") ?? internalColor;
  const hsv = toHsv(color);
  const hex = toHex(color);
  useEffect(() => {
    if (value !== void 0) {
      const parsed = parseColor(value);
      if (parsed) {
        setInternalColor(parsed);
        setTextValue(toHex(parsed));
      }
    }
  }, [value]);
  useEffect(() => {
    if (!isOpen) return;
    const onPointerDown = (event) => {
      if (!rootRef.current?.contains(event.target)) setIsOpen(false);
    };
    const onKeyDown = (event) => {
      if (event.key === "Escape") setIsOpen(false);
    };
    document.addEventListener("pointerdown", onPointerDown);
    document.addEventListener("keydown", onKeyDown);
    return () => {
      document.removeEventListener("pointerdown", onPointerDown);
      document.removeEventListener("keydown", onKeyDown);
    };
  }, [isOpen]);
  const commitColor = (next) => {
    setInternalColor(next);
    setTextValue(toHex(next));
    onChange?.(toHex(next), next);
  };
  const updateFromPointer = (event) => {
    const bounds = event.currentTarget.getBoundingClientRect();
    const s = clamp((event.clientX - bounds.left) / bounds.width * 100, 0, 100);
    const v = clamp(100 - (event.clientY - bounds.top) / bounds.height * 100, 0, 100);
    commitColor(fromHsv({ ...hsv, s, v }));
  };
  const handleChannel = (channel, raw) => {
    const numeric = Number(raw);
    if (raw === "" || !Number.isFinite(numeric)) return;
    const next = { ...color, [channel]: clamp(numeric, 0, channel === "a" ? 100 : 255) };
    commitColor(next);
  };
  return /* @__PURE__ */ jsxs("div", { ...props, ref: rootRef, className: `${ColorPicker_default.root} ${className}`.trim(), children: [
    /* @__PURE__ */ jsxs("div", { className: ColorPicker_default.inputWrap, children: [
      /* @__PURE__ */ jsx(
        "button",
        {
          type: "button",
          className: ColorPicker_default.swatch,
          style: { backgroundColor: `rgba(${color.r}, ${color.g}, ${color.b}, ${color.a / 100})` },
          "aria-label": `${label}: ${hex}`,
          "aria-expanded": isOpen,
          "aria-controls": `${generatedId}-panel`,
          disabled,
          onClick: () => setIsOpen((current) => !current)
        }
      ),
      /* @__PURE__ */ jsx(
        "input",
        {
          id: `${generatedId}-input`,
          className: ColorPicker_default.hexInput,
          value: textValue,
          "aria-label": `${label} hex value`,
          disabled,
          onFocus: () => setIsOpen(true),
          onChange: (event) => {
            const nextText = event.currentTarget.value;
            setTextValue(nextText);
            const parsed = parseColor(nextText);
            if (parsed) commitColor(parsed);
          },
          onBlur: () => setTextValue(hex)
        }
      )
    ] }),
    isOpen && !disabled && /* @__PURE__ */ jsxs("div", { id: `${generatedId}-panel`, className: ColorPicker_default.panel, role: "dialog", "aria-label": label, children: [
      /* @__PURE__ */ jsx(
        "div",
        {
          className: ColorPicker_default.saturation,
          style: { "--picker-hue": `hsl(${hsv.h} 100% 50%)` },
          role: "slider",
          "aria-label": "Saturation and brightness",
          "aria-valuemin": 0,
          "aria-valuemax": 100,
          "aria-valuenow": Math.round(hsv.s),
          tabIndex: 0,
          onPointerDown: (event) => {
            event.currentTarget.setPointerCapture(event.pointerId);
            updateFromPointer(event);
          },
          onPointerMove: (event) => {
            if (event.buttons) updateFromPointer(event);
          },
          onKeyDown: (event) => {
            const delta = event.shiftKey ? 10 : 1;
            if (event.key === "ArrowRight" || event.key === "ArrowUp")
              commitColor(fromHsv({ ...hsv, s: clamp(hsv.s + delta, 0, 100) }));
            if (event.key === "ArrowLeft" || event.key === "ArrowDown")
              commitColor(fromHsv({ ...hsv, s: clamp(hsv.s - delta, 0, 100) }));
          },
          children: /* @__PURE__ */ jsx("span", { className: ColorPicker_default.saturationMarker, style: { left: `${hsv.s}%`, top: `${100 - hsv.v}%` } })
        }
      ),
      /* @__PURE__ */ jsx("label", { className: ColorPicker_default.rangeLabel, htmlFor: `${generatedId}-hue`, children: "Hue" }),
      /* @__PURE__ */ jsx(
        "input",
        {
          id: `${generatedId}-hue`,
          className: `${ColorPicker_default.range} ${ColorPicker_default.hueRange}`,
          type: "range",
          min: "0",
          max: "360",
          value: Math.round(hsv.h),
          "aria-label": "Hue",
          onChange: (event) => commitColor(fromHsv({ ...hsv, h: Number(event.currentTarget.value) }))
        }
      ),
      showAlpha && /* @__PURE__ */ jsxs(Fragment, { children: [
        /* @__PURE__ */ jsxs("div", { className: ColorPicker_default.rangeHeading, children: [
          /* @__PURE__ */ jsx("label", { htmlFor: `${generatedId}-alpha`, children: "Opacity" }),
          /* @__PURE__ */ jsxs("output", { htmlFor: `${generatedId}-alpha`, children: [
            color.a,
            "%"
          ] })
        ] }),
        /* @__PURE__ */ jsx(
          "input",
          {
            id: `${generatedId}-alpha`,
            className: `${ColorPicker_default.range} ${ColorPicker_default.alphaRange}`,
            type: "range",
            min: "0",
            max: "100",
            value: color.a,
            "aria-label": "Opacity",
            style: { "--alpha-color": `rgba(${color.r}, ${color.g}, ${color.b}, ${color.a / 100})` },
            onChange: (event) => commitColor({ ...color, a: Number(event.currentTarget.value) })
          }
        )
      ] }),
      /* @__PURE__ */ jsxs("div", { className: ColorPicker_default.channelLabels, children: [
        /* @__PURE__ */ jsx("span", { children: "Hex" }),
        /* @__PURE__ */ jsx("span", { children: "R" }),
        /* @__PURE__ */ jsx("span", { children: "G" }),
        /* @__PURE__ */ jsx("span", { children: "B" }),
        showAlpha && /* @__PURE__ */ jsx("span", { children: "A" })
      ] }),
      /* @__PURE__ */ jsxs("div", { className: ColorPicker_default.channels, children: [
        /* @__PURE__ */ jsx(
          "input",
          {
            "aria-label": "Hex",
            value: textValue,
            onChange: (event) => {
              setTextValue(event.currentTarget.value);
              const parsed = parseColor(event.currentTarget.value);
              if (parsed) commitColor(parsed);
            },
            onBlur: () => setTextValue(hex)
          }
        ),
        ["r", "g", "b"].map((channel) => /* @__PURE__ */ jsx(
          "input",
          {
            "aria-label": channel.toUpperCase(),
            type: "number",
            min: "0",
            max: "255",
            value: color[channel],
            onChange: (event) => handleChannel(channel, event.currentTarget.value)
          },
          channel
        )),
        showAlpha && /* @__PURE__ */ jsx(
          "input",
          {
            "aria-label": "Alpha",
            type: "number",
            min: "0",
            max: "100",
            value: color.a,
            onChange: (event) => handleChannel("a", event.currentTarget.value)
          }
        )
      ] })
    ] })
  ] });
};

// src/DatePicker/DatePicker.module.css
var DatePicker_default = {};
var monthNames = Array.from(
  { length: 12 },
  (_, month) => new Intl.DateTimeFormat(void 0, { month: "short" }).format(new Date(2020, month, 1))
);
var weekdayNames = Array.from(
  { length: 7 },
  (_, day) => new Intl.DateTimeFormat(void 0, { weekday: "short" }).format(new Date(2023, 0, day + 1))
);
function pad(value) {
  return String(value).padStart(2, "0");
}
function formatDate(date) {
  return `${date.getFullYear()}-${pad(date.getMonth() + 1)}-${pad(date.getDate())}`;
}
function parseDate(value) {
  if (!value) return null;
  const match = value.match(/^(\d{4})-(\d{2})-(\d{2})/);
  if (!match) return null;
  const date = new Date(Number(match[1]), Number(match[2]) - 1, Number(match[3]));
  return Number.isNaN(date.getTime()) ? null : date;
}
function sameDay(left, right) {
  return Boolean(
    left && right && left.getFullYear() === right.getFullYear() && left.getMonth() === right.getMonth() && left.getDate() === right.getDate()
  );
}
var DatePicker = ({
  mode = "date",
  value,
  defaultValue,
  onChange,
  placeholder,
  theme = "default",
  disabled = false,
  monthsToShow = 1,
  showTime = false,
  minDate,
  maxDate,
  weekStartsOn = 1,
  closeOnSelect = true,
  className = "",
  ...props
}) => {
  const id = useId().replace(/:/g, "");
  const rootRef = useRef(null);
  const controlled = value !== void 0;
  const [internalValue, setInternalValue] = useState(defaultValue ?? "");
  const selectedValue = controlled ? value : internalValue;
  const selectedDate = typeof selectedValue === "string" ? parseDate(selectedValue) : null;
  const selectedRange = typeof selectedValue === "object" ? selectedValue : null;
  const [open, setOpen] = useState(false);
  const [cursor, setCursor] = useState(() => selectedDate ?? parseDate(selectedRange?.start) ?? /* @__PURE__ */ new Date());
  const [view, setView] = useState(
    mode === "month" ? "months" : mode === "year" ? "years" : mode === "quarter" ? "quarters" : "days"
  );
  const [rangeStart, setRangeStart] = useState("");
  const [time, setTime] = useState("00:00:00");
  useEffect(() => {
    if (!open) return;
    const onPointerDown = (event) => {
      if (!rootRef.current?.contains(event.target)) setOpen(false);
    };
    const onKeyDown = (event) => {
      if (event.key === "Escape") setOpen(false);
    };
    document.addEventListener("pointerdown", onPointerDown);
    document.addEventListener("keydown", onKeyDown);
    return () => {
      document.removeEventListener("pointerdown", onPointerDown);
      document.removeEventListener("keydown", onKeyDown);
    };
  }, [open]);
  const commit = (next) => {
    if (!controlled) setInternalValue(next);
    onChange?.(next);
  };
  const displayValue = typeof selectedValue === "string" ? selectedValue : selectedValue?.start && selectedValue?.end ? `${selectedValue.start}  \u2192  ${selectedValue.end}` : selectedValue?.start ?? "";
  const chooseDay = (date) => {
    const next = formatDate(date);
    if (mode === "range") {
      if (!rangeStart) setRangeStart(next);
      else {
        const [start, end] = rangeStart <= next ? [rangeStart, next] : [next, rangeStart];
        commit({ start, end });
        setRangeStart("");
        if (closeOnSelect && !showTime) setOpen(false);
      }
      return;
    }
    commit(showTime ? `${next}T${time}` : next);
    if (closeOnSelect && !showTime) setOpen(false);
  };
  const chooseMonth = (month) => {
    setCursor(new Date(cursor.getFullYear(), month, 1));
    if (mode === "month") {
      commit(`${cursor.getFullYear()}-${pad(month + 1)}`);
      if (closeOnSelect) setOpen(false);
    } else setView("days");
  };
  const chooseYear = (year) => {
    setCursor(new Date(year, cursor.getMonth(), 1));
    if (mode === "year") {
      commit(String(year));
      if (closeOnSelect) setOpen(false);
    } else setView(mode === "month" ? "months" : "days");
  };
  const chooseQuarter = (quarter) => {
    commit(`${cursor.getFullYear()}-Q${quarter}`);
    if (closeOnSelect) setOpen(false);
  };
  const renderMonth = (offset) => {
    const monthDate = new Date(cursor.getFullYear(), cursor.getMonth() + offset, 1);
    const firstDay = new Date(monthDate.getFullYear(), monthDate.getMonth(), 1);
    const startOffset = (firstDay.getDay() - weekStartsOn + 7) % 7;
    const gridStart = new Date(firstDay.getFullYear(), firstDay.getMonth(), 1 - startOffset);
    const cells = Array.from(
      { length: 42 },
      (_, index) => new Date(gridStart.getFullYear(), gridStart.getMonth(), gridStart.getDate() + index)
    );
    const weekDays = Array.from({ length: 7 }, (_, index) => weekdayNames[(index + weekStartsOn + 6) % 7]);
    return /* @__PURE__ */ jsxs(
      "section",
      {
        className: DatePicker_default.monthCalendar,
        "aria-label": monthDate.toLocaleDateString(void 0, { month: "long", year: "numeric" }),
        children: [
          /* @__PURE__ */ jsxs("div", { className: DatePicker_default.calendarHeading, children: [
            offset === 0 && /* @__PURE__ */ jsx(
              "button",
              {
                type: "button",
                "aria-label": "Previous month",
                onClick: () => setCursor(new Date(cursor.getFullYear(), cursor.getMonth() - 1, 1)),
                children: "\u2039"
              }
            ),
            /* @__PURE__ */ jsx("strong", { children: monthDate.toLocaleDateString(void 0, { month: "short", year: "numeric" }) }),
            offset === monthsToShow - 1 && /* @__PURE__ */ jsx(
              "button",
              {
                type: "button",
                "aria-label": "Next month",
                onClick: () => setCursor(new Date(cursor.getFullYear(), cursor.getMonth() + 1, 1)),
                children: "\u203A"
              }
            )
          ] }),
          /* @__PURE__ */ jsx("div", { className: DatePicker_default.weekdays, children: weekDays.map((day, index) => /* @__PURE__ */ jsx("span", { children: day }, `${day}-${index}`)) }),
          /* @__PURE__ */ jsx("div", { className: DatePicker_default.days, children: cells.map((date) => {
            const dateText = formatDate(date);
            const inMonth = date.getMonth() === monthDate.getMonth();
            const chosen = sameDay(date, selectedDate) || dateText === rangeStart || dateText === selectedRange?.start || dateText === selectedRange?.end;
            const inRange = Boolean(
              (rangeStart || selectedRange?.start) && (rangeStart || selectedRange?.end) && dateText > (rangeStart || selectedRange.start) && dateText < (selectedRange?.end ?? rangeStart)
            );
            const beforeMin = minDate ? dateText < minDate : false;
            const afterMax = maxDate ? dateText > maxDate : false;
            return /* @__PURE__ */ jsx(
              "button",
              {
                type: "button",
                className: [
                  DatePicker_default.day,
                  !inMonth && DatePicker_default.outside,
                  chosen && DatePicker_default.selected,
                  inRange && DatePicker_default.inRange,
                  sameDay(date, /* @__PURE__ */ new Date()) && DatePicker_default.today
                ].filter(Boolean).join(" "),
                disabled: beforeMin || afterMax,
                "aria-pressed": chosen,
                onClick: () => chooseDay(date),
                children: date.getDate()
              },
              dateText
            );
          }) })
        ]
      },
      offset
    );
  };
  return /* @__PURE__ */ jsxs("div", { ...props, ref: rootRef, className: `${DatePicker_default.root} ${DatePicker_default[theme]} ${className}`.trim(), children: [
    /* @__PURE__ */ jsxs("div", { className: `${DatePicker_default.input} ${disabled ? DatePicker_default.disabled : ""}`, children: [
      mode === "range" ? /* @__PURE__ */ jsxs(Fragment, { children: [
        /* @__PURE__ */ jsx(
          "input",
          {
            "aria-label": "Start date",
            placeholder: "Start date",
            value: rangeStart || selectedRange?.start || "",
            disabled,
            onFocus: () => setOpen(true),
            onChange: (event) => setRangeStart(event.currentTarget.value)
          }
        ),
        /* @__PURE__ */ jsx("span", { "aria-hidden": "true", children: "\u2192" }),
        /* @__PURE__ */ jsx(
          "input",
          {
            "aria-label": "End date",
            placeholder: "End date",
            value: selectedRange?.end ?? "",
            disabled,
            onFocus: () => setOpen(true)
          }
        )
      ] }) : /* @__PURE__ */ jsx(
        "input",
        {
          id: `${id}-input`,
          "aria-label": mode === "date" ? "Date" : mode,
          placeholder: placeholder ?? (mode === "date" ? "Select date" : `Select ${mode}`),
          value: displayValue,
          readOnly: true,
          disabled,
          onClick: () => setOpen((current) => !current),
          onFocus: () => setOpen(true)
        }
      ),
      /* @__PURE__ */ jsx(
        "button",
        {
          type: "button",
          className: DatePicker_default.calendarToggle,
          "aria-label": "Open calendar",
          "aria-expanded": open,
          "aria-controls": `${id}-calendar`,
          disabled,
          onClick: () => setOpen((current) => !current),
          children: /* @__PURE__ */ jsx(CalendarIcon, {})
        }
      )
    ] }),
    open && /* @__PURE__ */ jsxs("div", { id: `${id}-calendar`, className: DatePicker_default.popup, children: [
      /* @__PURE__ */ jsxs("div", { className: DatePicker_default.toolbar, children: [
        /* @__PURE__ */ jsxs("button", { type: "button", className: DatePicker_default.selectLike, onClick: () => setView("years"), children: [
          cursor.getFullYear(),
          "\u2304"
        ] }),
        (view === "days" || mode === "month") && /* @__PURE__ */ jsxs("button", { type: "button", className: DatePicker_default.selectLike, onClick: () => setView("months"), children: [
          monthNames[cursor.getMonth()],
          "\u2304"
        ] }),
        /* @__PURE__ */ jsxs("div", { className: DatePicker_default.viewButtons, children: [
          /* @__PURE__ */ jsx(
            "button",
            {
              type: "button",
              className: view === "days" || view === "months" ? DatePicker_default.viewActive : "",
              onClick: () => setView(mode === "month" ? "months" : "days"),
              children: "Month"
            }
          ),
          /* @__PURE__ */ jsx(
            "button",
            {
              type: "button",
              className: view === "years" ? DatePicker_default.viewActive : "",
              onClick: () => setView("years"),
              children: "Year"
            }
          )
        ] })
      ] }),
      view === "days" && /* @__PURE__ */ jsx("div", { className: `${DatePicker_default.calendars} ${monthsToShow === 2 ? DatePicker_default.twoMonths : ""}`, children: Array.from({ length: monthsToShow }, (_, index) => renderMonth(index)) }),
      view === "months" && /* @__PURE__ */ jsx("div", { className: DatePicker_default.selectionGrid, children: monthNames.map((month, index) => /* @__PURE__ */ jsx(
        "button",
        {
          type: "button",
          className: cursor.getMonth() === index ? DatePicker_default.selected : "",
          onClick: () => chooseMonth(index),
          children: month
        },
        month
      )) }),
      view === "years" && /* @__PURE__ */ jsx("div", { className: DatePicker_default.selectionGrid, children: Array.from({ length: 12 }, (_, index) => cursor.getFullYear() - 5 + index).map((year) => /* @__PURE__ */ jsx(
        "button",
        {
          type: "button",
          className: cursor.getFullYear() === year ? DatePicker_default.selected : "",
          onClick: () => chooseYear(year),
          children: year
        },
        year
      )) }),
      view === "quarters" && /* @__PURE__ */ jsx("div", { className: DatePicker_default.selectionGrid, children: [1, 2, 3, 4].map((quarter) => /* @__PURE__ */ jsxs("button", { type: "button", onClick: () => chooseQuarter(quarter), children: [
        "Q",
        quarter
      ] }, quarter)) }),
      showTime && /* @__PURE__ */ jsxs("div", { className: DatePicker_default.timeRow, children: [
        /* @__PURE__ */ jsx("label", { htmlFor: `${id}-time`, children: "Time" }),
        /* @__PURE__ */ jsx(
          "input",
          {
            id: `${id}-time`,
            type: "time",
            step: "1",
            value: time,
            onChange: (event) => setTime(event.currentTarget.value || "00:00:00")
          }
        )
      ] }),
      /* @__PURE__ */ jsxs("div", { className: DatePicker_default.footer, children: [
        /* @__PURE__ */ jsx(
          "button",
          {
            type: "button",
            onClick: () => {
              const today = /* @__PURE__ */ new Date();
              setCursor(today);
              if (mode === "date") chooseDay(today);
            },
            children: mode === "range" ? "Today" : "Today"
          }
        ),
        showTime && /* @__PURE__ */ jsx("button", { type: "button", className: DatePicker_default.confirm, onClick: () => setOpen(false), children: "OK" })
      ] })
    ] })
  ] });
};
var CalendarIcon = () => {
  return /* @__PURE__ */ jsxs("svg", { "aria-hidden": "true", viewBox: "0 0 16 16", children: [
    /* @__PURE__ */ jsx("rect", { x: "2", y: "3", width: "12", height: "11", rx: "1", fill: "none", stroke: "currentColor" }),
    /* @__PURE__ */ jsx("path", { d: "M5 2v3M11 2v3M2 6h12", fill: "none", stroke: "currentColor" }),
    /* @__PURE__ */ jsx("path", { d: "m7 9 1 1 2-2", fill: "none", stroke: "currentColor", strokeWidth: "1.2" })
  ] });
};

// src/TimePicker/TimePicker.module.css
var TimePicker_default = {};
var pad2 = (value) => String(value).padStart(2, "0");
function parseTime(value) {
  const [time = "", meridiem] = (value ?? "").trim().split(/\s+/);
  const parts = time.split(":").map(Number);
  const hour = parts[0] || 0;
  return {
    hour: meridiem ? hour % 12 + (meridiem.toUpperCase() === "PM" ? 12 : 0) : hour,
    minute: parts[1] || 0,
    second: parts[2] || 0,
    meridiem: meridiem?.toUpperCase() === "PM" ? "PM" : "AM"
  };
}
function formatTime(value, useSeconds, hour12) {
  const hour = hour12 ? (value.hour + 11) % 12 + 1 : value.hour;
  return `${pad2(hour)}:${pad2(value.minute)}${useSeconds ? `:${pad2(value.second)}` : ""}${hour12 ? ` ${value.meridiem}` : ""}`;
}
var TimePicker = ({
  mode = "single",
  value,
  defaultValue = "",
  onChange,
  theme = "default",
  disabled = false,
  useSeconds = true,
  hour12 = false,
  minuteStep = 1,
  secondStep = 1,
  placeholder,
  className = "",
  ...props
}) => {
  const id = useId().replace(/:/g, "");
  const rootRef = useRef(null);
  const controlled = value !== void 0;
  const [internalValue, setInternalValue] = useState(defaultValue);
  const selectedValue = controlled ? value : internalValue;
  const selectedStart = typeof selectedValue === "string" ? selectedValue : selectedValue.start;
  const selectedEnd = typeof selectedValue === "string" ? "" : selectedValue.end;
  const [open, setOpen] = useState(false);
  const [activePart, setActivePart] = useState("start");
  const [draft, setDraft] = useState(() => parseTime(selectedStart));
  useEffect(() => {
    if (!open) return;
    const onPointerDown = (event) => {
      if (!rootRef.current?.contains(event.target)) setOpen(false);
    };
    const onKeyDown = (event) => {
      if (event.key === "Escape") setOpen(false);
    };
    document.addEventListener("pointerdown", onPointerDown);
    document.addEventListener("keydown", onKeyDown);
    return () => {
      document.removeEventListener("pointerdown", onPointerDown);
      document.removeEventListener("keydown", onKeyDown);
    };
  }, [open]);
  const openFor = (part) => {
    setActivePart(part);
    setDraft(parseTime(part === "start" ? selectedStart : selectedEnd));
    setOpen(true);
  };
  const setPart = (key, newValue) => setDraft((current) => {
    if (key === "hour") {
      const hour = Number(newValue);
      const normalizedHour = hour12 ? hour % 12 + (current.meridiem === "PM" ? 12 : 0) : hour;
      return { ...current, hour: normalizedHour };
    }
    if (key === "meridiem") {
      const meridiem = newValue;
      const hour = current.hour % 12 + (meridiem === "PM" ? 12 : 0);
      return { ...current, hour, meridiem };
    }
    return { ...current, [key]: newValue };
  });
  const confirm = () => {
    const nextTime = formatTime(draft, useSeconds, hour12);
    let next = nextTime;
    if (mode === "range") {
      const range = typeof selectedValue === "string" ? { start: selectedValue, end: "" } : selectedValue;
      next = { ...range, [activePart]: nextTime };
    }
    if (!controlled) setInternalValue(next);
    onChange?.(next);
    setOpen(false);
  };
  const setNow = () => {
    const now = /* @__PURE__ */ new Date();
    const current = {
      hour: now.getHours(),
      minute: now.getMinutes(),
      second: now.getSeconds(),
      meridiem: now.getHours() >= 12 ? "PM" : "AM"
    };
    setDraft(current);
    const nextTime = formatTime(current, useSeconds, hour12);
    let next = nextTime;
    if (mode === "range") {
      const range = typeof selectedValue === "string" ? { start: selectedValue, end: "" } : selectedValue;
      next = { ...range, [activePart]: nextTime };
    }
    if (!controlled) setInternalValue(next);
    onChange?.(next);
  };
  const hours = Array.from({ length: hour12 ? 12 : 24 }, (_, index) => hour12 ? index === 0 ? 12 : index : index);
  const minutes = Array.from(
    { length: Math.ceil(60 / Math.max(1, minuteStep)) },
    (_, index) => index * Math.max(1, minuteStep)
  );
  const seconds = Array.from(
    { length: Math.ceil(60 / Math.max(1, secondStep)) },
    (_, index) => index * Math.max(1, secondStep)
  );
  const columns = [
    { key: "hour", values: hours, label: "Hour" },
    { key: "minute", values: minutes, label: "Minute" },
    ...useSeconds ? [{ key: "second", values: seconds, label: "Second" }] : [],
    ...hour12 ? [{ key: "meridiem", values: ["AM", "PM"], label: "AM or PM" }] : []
  ];
  return /* @__PURE__ */ jsxs("div", { ...props, ref: rootRef, className: `${TimePicker_default.root} ${TimePicker_default[theme]} ${className}`.trim(), children: [
    /* @__PURE__ */ jsxs("div", { className: `${TimePicker_default.input} ${disabled ? TimePicker_default.disabled : ""}`, children: [
      mode === "range" ? /* @__PURE__ */ jsxs(Fragment, { children: [
        /* @__PURE__ */ jsx("button", { type: "button", className: TimePicker_default.rangeInput, disabled, onClick: () => openFor("start"), children: selectedStart || "Start time" }),
        /* @__PURE__ */ jsx("span", { "aria-hidden": "true", children: "\u2192" }),
        /* @__PURE__ */ jsx("button", { type: "button", className: TimePicker_default.rangeInput, disabled, onClick: () => openFor("end"), children: selectedEnd || "End time" })
      ] }) : /* @__PURE__ */ jsx("button", { type: "button", className: TimePicker_default.singleInput, disabled, onClick: () => openFor("start"), children: selectedStart || placeholder || "Select time" }),
      /* @__PURE__ */ jsx(
        "button",
        {
          type: "button",
          className: TimePicker_default.clockButton,
          "aria-label": "Open time picker",
          "aria-expanded": open,
          "aria-controls": `${id}-panel`,
          disabled,
          onClick: () => openFor(activePart),
          children: /* @__PURE__ */ jsx(ClockIcon, {})
        }
      )
    ] }),
    open && !disabled && /* @__PURE__ */ jsxs("div", { id: `${id}-panel`, className: TimePicker_default.panel, role: "dialog", "aria-label": "Choose time", children: [
      /* @__PURE__ */ jsx("div", { className: TimePicker_default.columns, children: columns.map((column) => /* @__PURE__ */ jsx("div", { className: TimePicker_default.column, role: "listbox", "aria-label": column.label, children: column.values.map((item) => {
        const selected = column.key === "hour" && hour12 ? (draft.hour + 11) % 12 + 1 === item : draft[column.key] === item;
        return /* @__PURE__ */ jsx(
          "button",
          {
            type: "button",
            role: "option",
            "aria-selected": selected,
            className: selected ? TimePicker_default.activeOption : "",
            onClick: () => setPart(column.key, item),
            children: typeof item === "number" ? pad2(item) : item
          },
          item
        );
      }) }, column.key)) }),
      /* @__PURE__ */ jsxs("div", { className: TimePicker_default.footer, children: [
        /* @__PURE__ */ jsx("button", { type: "button", onClick: setNow, children: "Now" }),
        /* @__PURE__ */ jsx("button", { type: "button", className: TimePicker_default.confirm, onClick: confirm, children: "OK" })
      ] })
    ] })
  ] });
};
var ClockIcon = () => {
  return /* @__PURE__ */ jsxs("svg", { "aria-hidden": "true", viewBox: "0 0 16 16", children: [
    /* @__PURE__ */ jsx("circle", { cx: "8", cy: "8", r: "5.5", fill: "none", stroke: "currentColor" }),
    /* @__PURE__ */ jsx("path", { d: "M8 4.5V8l2.5 1.5", fill: "none", stroke: "currentColor", strokeLinecap: "round" })
  ] });
};

// src/InputGroup/InputGroup.module.css
var InputGroup_default = {};
function joinClasses13(...classes2) {
  return classes2.filter(Boolean).join(" ");
}
var InputGroup = ({
  size = "medium",
  rounding = "default",
  wrap = true,
  children,
  className = "",
  role = "group",
  "aria-label": ariaLabel = "Input group",
  ...props
}) => {
  return /* @__PURE__ */ jsx(
    "div",
    {
      ...props,
      className: joinClasses13(InputGroup_default.group, InputGroup_default[size], InputGroup_default[rounding], wrap && InputGroup_default.wrap, className),
      role,
      "aria-label": ariaLabel,
      children
    }
  );
};
var InputGroupText = ({ children, className = "", ...props }) => {
  return /* @__PURE__ */ jsx("span", { ...props, className: joinClasses13(InputGroup_default.text, className), children });
};
var InputGroupButton = ({
  variant = "default",
  children,
  className = "",
  type = "button",
  ...props
}) => {
  return /* @__PURE__ */ jsx("button", { ...props, type, className: joinClasses13(InputGroup_default.button, InputGroup_default[`button${variant}`], className), children });
};
var InputGroupInput = ({ className = "", ...props }) => {
  return /* @__PURE__ */ jsx("input", { ...props, className: joinClasses13(InputGroup_default.input, className) });
};
var InputGroupSelect = ({ children, className = "", ...props }) => {
  return /* @__PURE__ */ jsx("select", { ...props, className: joinClasses13(InputGroup_default.select, className), children });
};
var InputGroupCheck = ({ type = "checkbox", label, className = "", ...props }) => {
  return /* @__PURE__ */ jsxs("label", { className: joinClasses13(InputGroup_default.check, className), children: [
    /* @__PURE__ */ jsx("input", { ...props, type }),
    /* @__PURE__ */ jsx("span", { children: label })
  ] });
};

// src/InputNumber/InputNumber.module.css
var InputNumber_default = {};
function joinClasses14(...classes2) {
  return classes2.filter(Boolean).join(" ");
}
var InputNumber = ({
  value,
  defaultValue = "",
  onValueChange,
  prefix,
  suffix,
  clearable = false,
  size = "medium",
  disabled = false,
  readOnly = false,
  className = "",
  wrapperClassName = "",
  min,
  max,
  step = 1,
  onBlur,
  onKeyDown,
  ...props
}) => {
  const controlled = value !== void 0;
  const [internalValue, setInternalValue] = useState(String(defaultValue));
  const currentValue = controlled ? String(value) : internalValue;
  const updateValue = (next) => {
    if (!controlled) setInternalValue(next);
    if (next === "") onValueChange?.(null);
    else {
      const numeric = Number(next);
      onValueChange?.(Number.isFinite(numeric) ? numeric : null);
    }
  };
  const clear = () => {
    if (disabled || readOnly) return;
    updateValue("");
  };
  return /* @__PURE__ */ jsxs("div", { className: joinClasses14(InputNumber_default.wrapper, InputNumber_default[size], disabled && InputNumber_default.disabled, wrapperClassName), children: [
    prefix !== void 0 && /* @__PURE__ */ jsx("span", { className: InputNumber_default.addon, children: prefix }),
    /* @__PURE__ */ jsx(
      "input",
      {
        ...props,
        type: "number",
        min,
        max,
        step,
        value: currentValue,
        disabled,
        readOnly,
        className: joinClasses14(InputNumber_default.input, className),
        onChange: (event) => updateValue(event.currentTarget.value),
        onBlur: (event) => {
          onBlur?.(event);
          if (event.defaultPrevented) return;
          const numeric = Number(event.currentTarget.value);
          if (event.currentTarget.value !== "" && Number.isFinite(numeric)) {
            const lower = min === void 0 ? numeric : Math.max(numeric, Number(min));
            const bounded = max === void 0 ? lower : Math.min(lower, Number(max));
            if (bounded !== numeric) updateValue(String(bounded));
          }
        },
        onKeyDown: (event) => {
          onKeyDown?.(event);
          if (event.key === "Escape") event.currentTarget.blur();
        }
      }
    ),
    clearable && currentValue !== "" && !disabled && !readOnly && /* @__PURE__ */ jsx("button", { type: "button", className: InputNumber_default.clear, "aria-label": "Clear number", onClick: clear, children: /* @__PURE__ */ jsx(ClearIcon, {}) }),
    suffix !== void 0 && /* @__PURE__ */ jsx("span", { className: InputNumber_default.addon, children: suffix })
  ] });
};
var ClearIcon = () => {
  return /* @__PURE__ */ jsxs("svg", { "aria-hidden": "true", viewBox: "0 0 16 16", children: [
    /* @__PURE__ */ jsx("circle", { cx: "8", cy: "8", r: "6", fill: "currentColor" }),
    /* @__PURE__ */ jsx("path", { d: "m6 6 4 4m0-4-4 4", fill: "none", stroke: "white", strokeLinecap: "round", strokeWidth: "1.5" })
  ] });
};

// src/Slider/Slider.module.css
var Slider_default = {};
var Slider = ({
  value,
  defaultValue = 0,
  onValueChange,
  showValue = false,
  label,
  disabled = false,
  className = "",
  ...props
}) => {
  const controlled = value !== void 0;
  const [internalValue, setInternalValue] = useState(defaultValue);
  const currentValue = controlled ? value : internalValue;
  return /* @__PURE__ */ jsxs("div", { className: Slider_default.root, children: [
    label && /* @__PURE__ */ jsx("label", { className: Slider_default.label, htmlFor: props.id, children: label }),
    /* @__PURE__ */ jsx(
      "input",
      {
        ...props,
        type: "range",
        value: currentValue,
        disabled,
        className: `${Slider_default.slider} ${className}`.trim(),
        onChange: (event) => {
          const nextValue = Number(event.currentTarget.value);
          if (!controlled) setInternalValue(nextValue);
          onValueChange?.(nextValue);
        }
      }
    ),
    showValue && /* @__PURE__ */ jsx("output", { className: Slider_default.value, children: currentValue })
  ] });
};

// src/Rate/Rate.module.css
var Rate_default = {};
function joinClasses15(...classes2) {
  return classes2.filter(Boolean).join(" ");
}
var Rate = ({
  value,
  defaultValue = 0,
  onChange,
  count = 5,
  allowHalf = false,
  allowClear = true,
  readOnly = false,
  disabled = false,
  icon = "star",
  size = "medium",
  label = "Rating",
  className = "",
  ...props
}) => {
  const [internalValue, setInternalValue] = useState(defaultValue);
  const [hoverValue, setHoverValue] = useState(0);
  const controlled = value !== void 0;
  const selected = controlled ? value : internalValue;
  const displayed = hoverValue || selected;
  const step = allowHalf ? 0.5 : 1;
  const selectValue = (next, clearIfSelected = true) => {
    const normalized = clearIfSelected && allowClear && next === selected ? 0 : next;
    if (!controlled) setInternalValue(normalized);
    onChange?.(normalized);
  };
  return /* @__PURE__ */ jsx(
    "div",
    {
      ...props,
      className: joinClasses15(Rate_default.rate, Rate_default[size], disabled && Rate_default.disabled, className),
      role: "radiogroup",
      "aria-label": label,
      "aria-disabled": disabled || void 0,
      onMouseLeave: () => setHoverValue(0),
      children: Array.from({ length: count }, (_, index) => {
        const rating = index + 1;
        const amount = Math.max(0, Math.min(1, displayed - index));
        const options = allowHalf ? [rating - 0.5, rating] : [rating];
        return /* @__PURE__ */ jsx("span", { className: Rate_default.item, onMouseLeave: () => void 0, children: options.map((option) => /* @__PURE__ */ jsxs(
          "button",
          {
            type: "button",
            className: joinClasses15(Rate_default.choice, Rate_default[icon], option % 1 !== 0 && Rate_default.halfChoice),
            role: "radio",
            "aria-checked": selected === option,
            "aria-label": `${option} out of ${count}`,
            "aria-pressed": selected === option,
            disabled: disabled || readOnly,
            tabIndex: selected === option || selected === 0 && option === (allowHalf ? 0.5 : 1) ? 0 : -1,
            onMouseEnter: () => !disabled && !readOnly && setHoverValue(option),
            onFocus: () => !disabled && !readOnly && setHoverValue(option),
            onBlur: () => setHoverValue(0),
            onClick: () => selectValue(option),
            onKeyDown: (event) => {
              if (!["ArrowRight", "ArrowUp", "ArrowLeft", "ArrowDown", "Home", "End"].includes(event.key)) return;
              event.preventDefault();
              const current = options.indexOf(selected);
              const next = event.key === "Home" ? step : event.key === "End" ? count : Math.max(
                step,
                Math.min(count, selected + (["ArrowRight", "ArrowUp"].includes(event.key) ? step : -step))
              );
              selectValue(next, false);
              if (event.key === "Home" || event.key === "End" || current >= 0) {
                const sibling = event.currentTarget.parentElement?.parentElement?.querySelector(
                  `button[aria-label="${next} out of ${count}"]`
                );
                sibling?.focus();
              }
            },
            children: [
              /* @__PURE__ */ jsx("span", { className: Rate_default.iconBase, children: /* @__PURE__ */ jsx(RatingIcon, { type: icon }) }),
              /* @__PURE__ */ jsx(
                "span",
                {
                  className: Rate_default.iconFill,
                  style: { clipPath: `inset(0 ${100 - amount * 100}% 0 0)` },
                  "aria-hidden": "true",
                  children: /* @__PURE__ */ jsx(RatingIcon, { type: icon })
                }
              )
            ]
          },
          option
        )) }, rating);
      })
    }
  );
};
var RatingIcon = ({ type }) => {
  if (type === "face") {
    return /* @__PURE__ */ jsxs("svg", { viewBox: "0 0 24 24", fill: "none", "aria-hidden": "true", children: [
      /* @__PURE__ */ jsx("circle", { cx: "12", cy: "12", r: "9.5", stroke: "currentColor", strokeWidth: "1.8" }),
      /* @__PURE__ */ jsx("ellipse", { cx: "9", cy: "9.5", rx: "1", ry: "1.6", fill: "currentColor" }),
      /* @__PURE__ */ jsx("ellipse", { cx: "15", cy: "9.5", rx: "1", ry: "1.6", fill: "currentColor" }),
      /* @__PURE__ */ jsx("path", { d: "M7.5 14c.8 2 2.3 3 4.5 3s3.7-1 4.5-3", stroke: "currentColor", strokeWidth: "1.6", strokeLinecap: "round" })
    ] });
  }
  return /* @__PURE__ */ jsx("svg", { viewBox: "0 0 24 24", "aria-hidden": "true", children: /* @__PURE__ */ jsx(
    "path",
    {
      d: "m12 2.4 2.95 5.98 6.6.96-4.78 4.66 1.13 6.57L12 17.47l-5.9 3.1 1.13-6.57-4.78-4.66 6.6-.96L12 2.4Z",
      fill: "currentColor"
    }
  ) });
};

// src/Select/Select.module.css
var Select_default = {};
function joinClasses16(...classes2) {
  return classes2.filter(Boolean).join(" ");
}
var Select = ({
  size = "medium",
  nativeSize,
  multiple = false,
  disabled = false,
  className = "",
  children,
  ...props
}) => {
  return /* @__PURE__ */ jsx(
    "select",
    {
      ...props,
      size: nativeSize,
      multiple,
      disabled,
      className: joinClasses16(
        Select_default.select,
        Select_default[size],
        multiple && Select_default.multiple,
        disabled && Select_default.disabled,
        className
      ),
      children
    }
  );
};

// src/Avatar/Avatar.module.css
var Avatar_default = {};
function joinClasses17(...classes2) {
  return classes2.filter(Boolean).join(" ");
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
  const [imageFailed, setImageFailed] = useState(false);
  const customSize = typeof size === "number" ? `${size}px` : void 0;
  const displayInitials = initials ?? getInitials(name);
  return /* @__PURE__ */ jsxs(
    "span",
    {
      ...props,
      className: joinClasses17(
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
        children ?? (src && !imageFailed ? /* @__PURE__ */ jsx(
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
        ) : displayInitials ? /* @__PURE__ */ jsx("span", { "aria-hidden": "true", children: displayInitials }) : /* @__PURE__ */ jsx(PersonIcon, {})),
        status && /* @__PURE__ */ jsx("span", { className: joinClasses17(Avatar_default.status, Avatar_default[status]), "aria-label": status }),
        dot && !status && /* @__PURE__ */ jsx("span", { className: joinClasses17(Avatar_default.badge, Avatar_default.dot), "aria-label": "New activity" }),
        badge !== void 0 && /* @__PURE__ */ jsx("span", { className: Avatar_default.badge, children: badge })
      ]
    }
  );
};
var AvatarGroup = ({ children, max, size, className = "", ...props }) => {
  const items = Array.isArray(children) ? children : [children];
  const visibleItems = max === void 0 ? items : items.slice(0, max);
  const remaining = max === void 0 ? 0 : Math.max(0, items.length - max);
  return /* @__PURE__ */ jsxs(
    "div",
    {
      ...props,
      className: joinClasses17(Avatar_default.group, className),
      role: "group",
      "aria-label": props["aria-label"] ?? "Avatar group",
      children: [
        visibleItems.map(
          (child, index) => isValidElement(child) && size !== void 0 ? cloneElement(child, { size: child.props.size ?? size, key: child.key ?? index }) : child
        ),
        remaining > 0 && /* @__PURE__ */ jsxs(Avatar, { size, className: Avatar_default.more, "aria-label": `${remaining} more people`, children: [
          "+",
          remaining
        ] })
      ]
    }
  );
};
var PersonIcon = () => {
  return /* @__PURE__ */ jsxs("svg", { className: Avatar_default.person, viewBox: "0 0 24 24", "aria-hidden": "true", children: [
    /* @__PURE__ */ jsx("circle", { cx: "12", cy: "8", r: "3.5", fill: "none", stroke: "currentColor", strokeWidth: "1.6" }),
    /* @__PURE__ */ jsx(
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

// src/Tags/Tags.module.css
var Tags_default = {};
function joinClasses18(...classes2) {
  return classes2.filter(Boolean).join(" ");
}
var Tag = ({
  children,
  icon = /* @__PURE__ */ jsx(TagIcon, {}),
  closable = false,
  onClose,
  closeButtonProps,
  size = "medium",
  variant = "default",
  className = "",
  ...props
}) => {
  return /* @__PURE__ */ jsxs("span", { ...props, className: joinClasses18(Tags_default.tag, Tags_default[size], Tags_default[variant], className), children: [
    icon !== null && /* @__PURE__ */ jsx("span", { className: Tags_default.icon, "aria-hidden": "true", children: icon }),
    /* @__PURE__ */ jsx("span", { className: Tags_default.label, children }),
    closable && /* @__PURE__ */ jsx(
      "button",
      {
        ...closeButtonProps,
        type: "button",
        className: joinClasses18(Tags_default.close, closeButtonProps?.className),
        "aria-label": closeButtonProps?.["aria-label"] ?? `Remove ${typeof children === "string" ? children : "tag"}`,
        onClick: onClose,
        children: /* @__PURE__ */ jsx(CloseIcon2, {})
      }
    )
  ] });
};
var Tags = ({ children, gap = "medium", className = "", role = "list", ...props }) => {
  return /* @__PURE__ */ jsx("div", { ...props, className: joinClasses18(Tags_default.tags, Tags_default[`gap${gap}`], className), role, children });
};
var TagIcon = () => {
  return /* @__PURE__ */ jsxs("svg", { viewBox: "0 0 16 16", children: [
    /* @__PURE__ */ jsx(
      "path",
      {
        d: "M2.2 2.2h5.1l6.5 6.5-5.1 5.1-6.5-6.5V2.2Z",
        fill: "none",
        stroke: "currentColor",
        strokeLinejoin: "round",
        strokeWidth: "1.3"
      }
    ),
    /* @__PURE__ */ jsx("circle", { cx: "5.1", cy: "5.1", r: ".85", fill: "currentColor" })
  ] });
};
var CloseIcon2 = () => {
  return /* @__PURE__ */ jsx("svg", { viewBox: "0 0 16 16", children: /* @__PURE__ */ jsx("path", { d: "m3 3 10 10M13 3 3 13", fill: "none", stroke: "currentColor", strokeLinecap: "round", strokeWidth: "1.4" }) });
};

// src/Text/Text.module.css
var Text_default = {};
function joinClasses19(...classes2) {
  return classes2.filter(Boolean).join(" ");
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
      className: joinClasses19(
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
  return /* @__PURE__ */ jsx(Component, { ...props, className: joinClasses19(Text_default.heading, Text_default[`heading${visualLevel}`], className), children });
};
var Display = ({ level = 1, children, className = "", ...props }) => {
  return /* @__PURE__ */ jsx("h1", { ...props, className: joinClasses19(Text_default.display, Text_default[`display${level}`], className), children });
};
var Lead = ({ children, className = "", ...props }) => {
  return /* @__PURE__ */ jsx("p", { ...props, className: joinClasses19(Text_default.text, Text_default.lead, className), children });
};
var Blockquote = ({ cite, footer, align, children, className = "", ...props }) => {
  return /* @__PURE__ */ jsxs("figure", { className: joinClasses19(Text_default.blockquoteFigure, align && Text_default[`align${align}`]), children: [
    /* @__PURE__ */ jsx("blockquote", { ...props, cite, className: joinClasses19(Text_default.blockquote, className), children }),
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
      className: joinClasses19(Text_default.list, unstyled && Text_default.unstyled, inline && Text_default.inlineList, className),
      children
    }
  );
};
var DescriptionList = ({ horizontal = false, children, className = "", ...props }) => {
  return /* @__PURE__ */ jsx("dl", { ...props, className: joinClasses19(Text_default.descriptionList, horizontal && Text_default.horizontal, className), children });
};
var DescriptionTerm = ({ children, className = "", ...props }) => {
  return /* @__PURE__ */ jsx("dt", { ...props, className: joinClasses19(Text_default.term, className), children });
};
var DescriptionDetails = ({ children, className = "", ...props }) => {
  return /* @__PURE__ */ jsx("dd", { ...props, className: joinClasses19(Text_default.details, className), children });
};

export { Accordion, Alert, Avatar, AvatarGroup, Badge, Blockquote, Box, Breadcrumb, Button, ButtonGroup, ButtonGroupToggle, ButtonToolbar, Card, CardBody, CardFooter, CardGroup, CardHeader, CardImage, CardImageOverlay, CardLink, CardListGroup, CardListGroupItem, CardSubtitle, CardText, CardTitle, Carousel, Collapse, CollapsePanel, CollapseTrigger, ColorPicker, DatePicker, DescriptionDetails, DescriptionList, DescriptionTerm, Display, Divider, Dropdown, DropdownDivider, DropdownHeader, DropdownItem, DropdownMenu, DropdownToggle, Heading, InputGroup, InputGroupButton, InputGroupCheck, InputGroupInput, InputGroupSelect, InputGroupText, InputNumber, Lead, ListGroup, ListGroupItem, Modal, ModalBody, ModalClose, ModalContent, ModalDescription, ModalFooter, ModalHeader, ModalTitle, ModalTrigger, Navbar, NavbarBrand, NavbarCollapse, NavbarContainer, NavbarItem, NavbarLink, NavbarNav, NavbarText, NavbarToggle, NavsTabs, NavsTabsList, NavsTabsPanel, NavsTabsTab, Pagination, Popover, PopoverContent, PopoverTrigger, Progress, ProgressSegment, ProgressStack, Rate, Select, Skeleton, Slider, Spinner, Tag, Tags, Text, TextList, TimePicker, Toast, ToastClose, ToastContainer, Tooltip, TooltipLink, TooltipTrigger };
//# sourceMappingURL=index.mjs.map
//# sourceMappingURL=index.mjs.map