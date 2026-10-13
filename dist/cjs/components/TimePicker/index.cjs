'use strict';

var react = require('react');
var jsxRuntime = require('react/jsx-runtime');

// src/TimePicker/TimePicker.tsx

// src/TimePicker/TimePicker.module.css
var TimePicker_default = {};
var pad = (value) => String(value).padStart(2, "0");
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
  return `${pad(hour)}:${pad(value.minute)}${useSeconds ? `:${pad(value.second)}` : ""}${hour12 ? ` ${value.meridiem}` : ""}`;
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
  const id = react.useId().replace(/:/g, "");
  const rootRef = react.useRef(null);
  const controlled = value !== void 0;
  const [internalValue, setInternalValue] = react.useState(defaultValue);
  const selectedValue = controlled ? value : internalValue;
  const selectedStart = typeof selectedValue === "string" ? selectedValue : selectedValue.start;
  const selectedEnd = typeof selectedValue === "string" ? "" : selectedValue.end;
  const [open, setOpen] = react.useState(false);
  const [activePart, setActivePart] = react.useState("start");
  const [draft, setDraft] = react.useState(() => parseTime(selectedStart));
  react.useEffect(() => {
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
  return /* @__PURE__ */ jsxRuntime.jsxs("div", { ...props, ref: rootRef, className: `${TimePicker_default.root} ${TimePicker_default[theme]} ${className}`.trim(), children: [
    /* @__PURE__ */ jsxRuntime.jsxs("div", { className: `${TimePicker_default.input} ${disabled ? TimePicker_default.disabled : ""}`, children: [
      mode === "range" ? /* @__PURE__ */ jsxRuntime.jsxs(jsxRuntime.Fragment, { children: [
        /* @__PURE__ */ jsxRuntime.jsx("button", { type: "button", className: TimePicker_default.rangeInput, disabled, onClick: () => openFor("start"), children: selectedStart || "Start time" }),
        /* @__PURE__ */ jsxRuntime.jsx("span", { "aria-hidden": "true", children: "\u2192" }),
        /* @__PURE__ */ jsxRuntime.jsx("button", { type: "button", className: TimePicker_default.rangeInput, disabled, onClick: () => openFor("end"), children: selectedEnd || "End time" })
      ] }) : /* @__PURE__ */ jsxRuntime.jsx("button", { type: "button", className: TimePicker_default.singleInput, disabled, onClick: () => openFor("start"), children: selectedStart || placeholder || "Select time" }),
      /* @__PURE__ */ jsxRuntime.jsx(
        "button",
        {
          type: "button",
          className: TimePicker_default.clockButton,
          "aria-label": "Open time picker",
          "aria-expanded": open,
          "aria-controls": `${id}-panel`,
          disabled,
          onClick: () => openFor(activePart),
          children: /* @__PURE__ */ jsxRuntime.jsx(ClockIcon, {})
        }
      )
    ] }),
    open && !disabled && /* @__PURE__ */ jsxRuntime.jsxs("div", { id: `${id}-panel`, className: TimePicker_default.panel, role: "dialog", "aria-label": "Choose time", children: [
      /* @__PURE__ */ jsxRuntime.jsx("div", { className: TimePicker_default.columns, children: columns.map((column) => /* @__PURE__ */ jsxRuntime.jsx("div", { className: TimePicker_default.column, role: "listbox", "aria-label": column.label, children: column.values.map((item) => {
        const selected = column.key === "hour" && hour12 ? (draft.hour + 11) % 12 + 1 === item : draft[column.key] === item;
        return /* @__PURE__ */ jsxRuntime.jsx(
          "button",
          {
            type: "button",
            role: "option",
            "aria-selected": selected,
            className: selected ? TimePicker_default.activeOption : "",
            onClick: () => setPart(column.key, item),
            children: typeof item === "number" ? pad(item) : item
          },
          item
        );
      }) }, column.key)) }),
      /* @__PURE__ */ jsxRuntime.jsxs("div", { className: TimePicker_default.footer, children: [
        /* @__PURE__ */ jsxRuntime.jsx("button", { type: "button", onClick: setNow, children: "Now" }),
        /* @__PURE__ */ jsxRuntime.jsx("button", { type: "button", className: TimePicker_default.confirm, onClick: confirm, children: "OK" })
      ] })
    ] })
  ] });
};
var ClockIcon = () => {
  return /* @__PURE__ */ jsxRuntime.jsxs("svg", { "aria-hidden": "true", viewBox: "0 0 16 16", children: [
    /* @__PURE__ */ jsxRuntime.jsx("circle", { cx: "8", cy: "8", r: "5.5", fill: "none", stroke: "currentColor" }),
    /* @__PURE__ */ jsxRuntime.jsx("path", { d: "M8 4.5V8l2.5 1.5", fill: "none", stroke: "currentColor", strokeLinecap: "round" })
  ] });
};

exports.TimePicker = TimePicker;
//# sourceMappingURL=index.cjs.map
//# sourceMappingURL=index.cjs.map