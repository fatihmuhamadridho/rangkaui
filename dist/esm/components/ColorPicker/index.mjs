import { useId, useRef, useState, useEffect } from 'react';
import { jsxs, jsx, Fragment } from 'react/jsx-runtime';

// src/ColorPicker/ColorPicker.tsx

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

export { ColorPicker };
//# sourceMappingURL=index.mjs.map
//# sourceMappingURL=index.mjs.map