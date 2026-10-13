'use strict';

var react = require('react');
var jsxRuntime = require('react/jsx-runtime');

// src/DatePicker/DatePicker.tsx

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
  const id = react.useId().replace(/:/g, "");
  const rootRef = react.useRef(null);
  const controlled = value !== void 0;
  const [internalValue, setInternalValue] = react.useState(defaultValue ?? "");
  const selectedValue = controlled ? value : internalValue;
  const selectedDate = typeof selectedValue === "string" ? parseDate(selectedValue) : null;
  const selectedRange = typeof selectedValue === "object" ? selectedValue : null;
  const [open, setOpen] = react.useState(false);
  const [cursor, setCursor] = react.useState(() => selectedDate ?? parseDate(selectedRange?.start) ?? /* @__PURE__ */ new Date());
  const [view, setView] = react.useState(
    mode === "month" ? "months" : mode === "year" ? "years" : mode === "quarter" ? "quarters" : "days"
  );
  const [rangeStart, setRangeStart] = react.useState("");
  const [time, setTime] = react.useState("00:00:00");
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
    return /* @__PURE__ */ jsxRuntime.jsxs(
      "section",
      {
        className: DatePicker_default.monthCalendar,
        "aria-label": monthDate.toLocaleDateString(void 0, { month: "long", year: "numeric" }),
        children: [
          /* @__PURE__ */ jsxRuntime.jsxs("div", { className: DatePicker_default.calendarHeading, children: [
            offset === 0 && /* @__PURE__ */ jsxRuntime.jsx(
              "button",
              {
                type: "button",
                "aria-label": "Previous month",
                onClick: () => setCursor(new Date(cursor.getFullYear(), cursor.getMonth() - 1, 1)),
                children: "\u2039"
              }
            ),
            /* @__PURE__ */ jsxRuntime.jsx("strong", { children: monthDate.toLocaleDateString(void 0, { month: "short", year: "numeric" }) }),
            offset === monthsToShow - 1 && /* @__PURE__ */ jsxRuntime.jsx(
              "button",
              {
                type: "button",
                "aria-label": "Next month",
                onClick: () => setCursor(new Date(cursor.getFullYear(), cursor.getMonth() + 1, 1)),
                children: "\u203A"
              }
            )
          ] }),
          /* @__PURE__ */ jsxRuntime.jsx("div", { className: DatePicker_default.weekdays, children: weekDays.map((day, index) => /* @__PURE__ */ jsxRuntime.jsx("span", { children: day }, `${day}-${index}`)) }),
          /* @__PURE__ */ jsxRuntime.jsx("div", { className: DatePicker_default.days, children: cells.map((date) => {
            const dateText = formatDate(date);
            const inMonth = date.getMonth() === monthDate.getMonth();
            const chosen = sameDay(date, selectedDate) || dateText === rangeStart || dateText === selectedRange?.start || dateText === selectedRange?.end;
            const inRange = Boolean(
              (rangeStart || selectedRange?.start) && (rangeStart || selectedRange?.end) && dateText > (rangeStart || selectedRange.start) && dateText < (selectedRange?.end ?? rangeStart)
            );
            const beforeMin = minDate ? dateText < minDate : false;
            const afterMax = maxDate ? dateText > maxDate : false;
            return /* @__PURE__ */ jsxRuntime.jsx(
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
  return /* @__PURE__ */ jsxRuntime.jsxs("div", { ...props, ref: rootRef, className: `${DatePicker_default.root} ${DatePicker_default[theme]} ${className}`.trim(), children: [
    /* @__PURE__ */ jsxRuntime.jsxs("div", { className: `${DatePicker_default.input} ${disabled ? DatePicker_default.disabled : ""}`, children: [
      mode === "range" ? /* @__PURE__ */ jsxRuntime.jsxs(jsxRuntime.Fragment, { children: [
        /* @__PURE__ */ jsxRuntime.jsx(
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
        /* @__PURE__ */ jsxRuntime.jsx("span", { "aria-hidden": "true", children: "\u2192" }),
        /* @__PURE__ */ jsxRuntime.jsx(
          "input",
          {
            "aria-label": "End date",
            placeholder: "End date",
            value: selectedRange?.end ?? "",
            disabled,
            onFocus: () => setOpen(true)
          }
        )
      ] }) : /* @__PURE__ */ jsxRuntime.jsx(
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
      /* @__PURE__ */ jsxRuntime.jsx(
        "button",
        {
          type: "button",
          className: DatePicker_default.calendarToggle,
          "aria-label": "Open calendar",
          "aria-expanded": open,
          "aria-controls": `${id}-calendar`,
          disabled,
          onClick: () => setOpen((current) => !current),
          children: /* @__PURE__ */ jsxRuntime.jsx(CalendarIcon, {})
        }
      )
    ] }),
    open && /* @__PURE__ */ jsxRuntime.jsxs("div", { id: `${id}-calendar`, className: DatePicker_default.popup, children: [
      /* @__PURE__ */ jsxRuntime.jsxs("div", { className: DatePicker_default.toolbar, children: [
        /* @__PURE__ */ jsxRuntime.jsxs("button", { type: "button", className: DatePicker_default.selectLike, onClick: () => setView("years"), children: [
          cursor.getFullYear(),
          "\u2304"
        ] }),
        (view === "days" || mode === "month") && /* @__PURE__ */ jsxRuntime.jsxs("button", { type: "button", className: DatePicker_default.selectLike, onClick: () => setView("months"), children: [
          monthNames[cursor.getMonth()],
          "\u2304"
        ] }),
        /* @__PURE__ */ jsxRuntime.jsxs("div", { className: DatePicker_default.viewButtons, children: [
          /* @__PURE__ */ jsxRuntime.jsx(
            "button",
            {
              type: "button",
              className: view === "days" || view === "months" ? DatePicker_default.viewActive : "",
              onClick: () => setView(mode === "month" ? "months" : "days"),
              children: "Month"
            }
          ),
          /* @__PURE__ */ jsxRuntime.jsx(
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
      view === "days" && /* @__PURE__ */ jsxRuntime.jsx("div", { className: `${DatePicker_default.calendars} ${monthsToShow === 2 ? DatePicker_default.twoMonths : ""}`, children: Array.from({ length: monthsToShow }, (_, index) => renderMonth(index)) }),
      view === "months" && /* @__PURE__ */ jsxRuntime.jsx("div", { className: DatePicker_default.selectionGrid, children: monthNames.map((month, index) => /* @__PURE__ */ jsxRuntime.jsx(
        "button",
        {
          type: "button",
          className: cursor.getMonth() === index ? DatePicker_default.selected : "",
          onClick: () => chooseMonth(index),
          children: month
        },
        month
      )) }),
      view === "years" && /* @__PURE__ */ jsxRuntime.jsx("div", { className: DatePicker_default.selectionGrid, children: Array.from({ length: 12 }, (_, index) => cursor.getFullYear() - 5 + index).map((year) => /* @__PURE__ */ jsxRuntime.jsx(
        "button",
        {
          type: "button",
          className: cursor.getFullYear() === year ? DatePicker_default.selected : "",
          onClick: () => chooseYear(year),
          children: year
        },
        year
      )) }),
      view === "quarters" && /* @__PURE__ */ jsxRuntime.jsx("div", { className: DatePicker_default.selectionGrid, children: [1, 2, 3, 4].map((quarter) => /* @__PURE__ */ jsxRuntime.jsxs("button", { type: "button", onClick: () => chooseQuarter(quarter), children: [
        "Q",
        quarter
      ] }, quarter)) }),
      showTime && /* @__PURE__ */ jsxRuntime.jsxs("div", { className: DatePicker_default.timeRow, children: [
        /* @__PURE__ */ jsxRuntime.jsx("label", { htmlFor: `${id}-time`, children: "Time" }),
        /* @__PURE__ */ jsxRuntime.jsx(
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
      /* @__PURE__ */ jsxRuntime.jsxs("div", { className: DatePicker_default.footer, children: [
        /* @__PURE__ */ jsxRuntime.jsx(
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
        showTime && /* @__PURE__ */ jsxRuntime.jsx("button", { type: "button", className: DatePicker_default.confirm, onClick: () => setOpen(false), children: "OK" })
      ] })
    ] })
  ] });
};
var CalendarIcon = () => {
  return /* @__PURE__ */ jsxRuntime.jsxs("svg", { "aria-hidden": "true", viewBox: "0 0 16 16", children: [
    /* @__PURE__ */ jsxRuntime.jsx("rect", { x: "2", y: "3", width: "12", height: "11", rx: "1", fill: "none", stroke: "currentColor" }),
    /* @__PURE__ */ jsxRuntime.jsx("path", { d: "M5 2v3M11 2v3M2 6h12", fill: "none", stroke: "currentColor" }),
    /* @__PURE__ */ jsxRuntime.jsx("path", { d: "m7 9 1 1 2-2", fill: "none", stroke: "currentColor", strokeWidth: "1.2" })
  ] });
};

exports.DatePicker = DatePicker;
//# sourceMappingURL=index.cjs.map
//# sourceMappingURL=index.cjs.map