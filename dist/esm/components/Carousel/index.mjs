import { useState, useEffect } from 'react';
import { jsxs, jsx, Fragment } from 'react/jsx-runtime';

// src/Carousel/Carousel.tsx

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

export { Carousel };
//# sourceMappingURL=index.mjs.map
//# sourceMappingURL=index.mjs.map