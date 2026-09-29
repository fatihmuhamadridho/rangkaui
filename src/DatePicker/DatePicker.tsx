import { useEffect, useId, useRef, useState, type HTMLAttributes } from "react";

import styles from "./DatePicker.module.css";

export type DatePickerMode = "date" | "range" | "month" | "year" | "quarter";
export type DatePickerTheme = "default" | "primary" | "success" | "danger";
export type DateRangeValue = { start: string; end: string };
type CalendarView = "days" | "months" | "years" | "quarters";

export interface DatePickerProps extends Omit<HTMLAttributes<HTMLDivElement>, "onChange" | "defaultValue"> {
  mode?: DatePickerMode;
  value?: string | DateRangeValue;
  defaultValue?: string | DateRangeValue;
  onChange?: (value: string | DateRangeValue) => void;
  placeholder?: string;
  theme?: DatePickerTheme;
  disabled?: boolean;
  monthsToShow?: 1 | 2;
  showTime?: boolean;
  minDate?: string;
  maxDate?: string;
  weekStartsOn?: 0 | 1;
  closeOnSelect?: boolean;
}

const monthNames = Array.from({ length: 12 }, (_, month) => new Intl.DateTimeFormat(undefined, { month: "short" }).format(new Date(2020, month, 1)));
const weekdayNames = Array.from({ length: 7 }, (_, day) => new Intl.DateTimeFormat(undefined, { weekday: "short" }).format(new Date(2023, 0, day + 1)));

function pad(value: number) { return String(value).padStart(2, "0"); }
function formatDate(date: Date) { return `${date.getFullYear()}-${pad(date.getMonth() + 1)}-${pad(date.getDate())}`; }
function parseDate(value?: string): Date | null {
  if (!value) return null;
  const match = value.match(/^(\d{4})-(\d{2})-(\d{2})/);
  if (!match) return null;
  const date = new Date(Number(match[1]), Number(match[2]) - 1, Number(match[3]));
  return Number.isNaN(date.getTime()) ? null : date;
}
function sameDay(left: Date | null, right: Date | null) {
  return Boolean(left && right && left.getFullYear() === right.getFullYear() && left.getMonth() === right.getMonth() && left.getDate() === right.getDate());
}

export function DatePicker({
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
}: DatePickerProps) {
  const id = useId().replace(/:/g, "");
  const rootRef = useRef<HTMLDivElement>(null);
  const controlled = value !== undefined;
  const [internalValue, setInternalValue] = useState<string | DateRangeValue>(defaultValue ?? "");
  const selectedValue = controlled ? value : internalValue;
  const selectedDate = typeof selectedValue === "string" ? parseDate(selectedValue) : null;
  const selectedRange = typeof selectedValue === "object" ? selectedValue : null;
  const [open, setOpen] = useState(false);
  const [cursor, setCursor] = useState(() => selectedDate ?? parseDate(selectedRange?.start) ?? new Date());
  const [view, setView] = useState<CalendarView>(mode === "month" ? "months" : mode === "year" ? "years" : mode === "quarter" ? "quarters" : "days");
  const [rangeStart, setRangeStart] = useState("");
  const [time, setTime] = useState("00:00:00");

  useEffect(() => {
    if (!open) return;
    const onPointerDown = (event: PointerEvent) => { if (!rootRef.current?.contains(event.target as Node)) setOpen(false); };
    const onKeyDown = (event: KeyboardEvent) => { if (event.key === "Escape") setOpen(false); };
    document.addEventListener("pointerdown", onPointerDown);
    document.addEventListener("keydown", onKeyDown);
    return () => { document.removeEventListener("pointerdown", onPointerDown); document.removeEventListener("keydown", onKeyDown); };
  }, [open]);

  const commit = (next: string | DateRangeValue) => {
    if (!controlled) setInternalValue(next);
    onChange?.(next);
  };

  const displayValue = typeof selectedValue === "string"
    ? selectedValue
    : selectedValue?.start && selectedValue?.end ? `${selectedValue.start}  →  ${selectedValue.end}` : selectedValue?.start ?? "";

  const chooseDay = (date: Date) => {
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

  const chooseMonth = (month: number) => {
    setCursor(new Date(cursor.getFullYear(), month, 1));
    if (mode === "month") {
      commit(`${cursor.getFullYear()}-${pad(month + 1)}`);
      if (closeOnSelect) setOpen(false);
    } else setView("days");
  };

  const chooseYear = (year: number) => {
    setCursor(new Date(year, cursor.getMonth(), 1));
    if (mode === "year") {
      commit(String(year));
      if (closeOnSelect) setOpen(false);
    } else setView(mode === "month" ? "months" : "days");
  };

  const chooseQuarter = (quarter: number) => {
    commit(`${cursor.getFullYear()}-Q${quarter}`);
    if (closeOnSelect) setOpen(false);
  };

  const renderMonth = (offset: number) => {
    const monthDate = new Date(cursor.getFullYear(), cursor.getMonth() + offset, 1);
    const firstDay = new Date(monthDate.getFullYear(), monthDate.getMonth(), 1);
    const startOffset = (firstDay.getDay() - weekStartsOn + 7) % 7;
    const gridStart = new Date(firstDay.getFullYear(), firstDay.getMonth(), 1 - startOffset);
    const cells = Array.from({ length: 42 }, (_, index) => new Date(gridStart.getFullYear(), gridStart.getMonth(), gridStart.getDate() + index));
    const weekDays = Array.from({ length: 7 }, (_, index) => weekdayNames[(index + weekStartsOn + 6) % 7]);
    return <section className={styles.monthCalendar} key={offset} aria-label={monthDate.toLocaleDateString(undefined, { month: "long", year: "numeric" })}>
      <div className={styles.calendarHeading}>{offset === 0 && <button type="button" aria-label="Previous month" onClick={() => setCursor(new Date(cursor.getFullYear(), cursor.getMonth() - 1, 1))}>‹</button>}<strong>{monthDate.toLocaleDateString(undefined, { month: "short", year: "numeric" })}</strong>{offset === monthsToShow - 1 && <button type="button" aria-label="Next month" onClick={() => setCursor(new Date(cursor.getFullYear(), cursor.getMonth() + 1, 1))}>›</button>}</div>
      <div className={styles.weekdays}>{weekDays.map((day, index) => <span key={`${day}-${index}`}>{day}</span>)}</div>
      <div className={styles.days}>{cells.map((date) => {
        const dateText = formatDate(date);
        const inMonth = date.getMonth() === monthDate.getMonth();
        const chosen = sameDay(date, selectedDate) || dateText === rangeStart || dateText === selectedRange?.start || dateText === selectedRange?.end;
        const inRange = Boolean((rangeStart || selectedRange?.start) && (rangeStart || selectedRange?.end) && dateText > (rangeStart || selectedRange!.start) && dateText < (selectedRange?.end ?? rangeStart));
        const beforeMin = minDate ? dateText < minDate : false;
        const afterMax = maxDate ? dateText > maxDate : false;
        return <button key={dateText} type="button" className={[styles.day, !inMonth && styles.outside, chosen && styles.selected, inRange && styles.inRange, sameDay(date, new Date()) && styles.today].filter(Boolean).join(" ")} disabled={beforeMin || afterMax} aria-pressed={chosen} onClick={() => chooseDay(date)}>{date.getDate()}</button>;
      })}</div>
    </section>;
  };

  return <div {...props} ref={rootRef} className={`${styles.root} ${styles[theme]} ${className}`.trim()}>
    <div className={`${styles.input} ${disabled ? styles.disabled : ""}`}>
      {mode === "range" ? <>
        <input aria-label="Start date" placeholder="Start date" value={rangeStart || selectedRange?.start || ""} disabled={disabled} onFocus={() => setOpen(true)} onChange={(event) => setRangeStart(event.currentTarget.value)} />
        <span aria-hidden="true">→</span>
        <input aria-label="End date" placeholder="End date" value={selectedRange?.end ?? ""} disabled={disabled} onFocus={() => setOpen(true)} />
      </> : <input id={`${id}-input`} aria-label={mode === "date" ? "Date" : mode} placeholder={placeholder ?? (mode === "date" ? "Select date" : `Select ${mode}`)} value={displayValue} readOnly disabled={disabled} onClick={() => setOpen((current) => !current)} onFocus={() => setOpen(true)} />}
      <button type="button" className={styles.calendarToggle} aria-label="Open calendar" aria-expanded={open} aria-controls={`${id}-calendar`} disabled={disabled} onClick={() => setOpen((current) => !current)}><CalendarIcon /></button>
    </div>

    {open && <div id={`${id}-calendar`} className={styles.popup}>
      <div className={styles.toolbar}>
        <button type="button" className={styles.selectLike} onClick={() => setView("years")}>{cursor.getFullYear()}⌄</button>
        {(view === "days" || mode === "month") && <button type="button" className={styles.selectLike} onClick={() => setView("months")}>{monthNames[cursor.getMonth()]}⌄</button>}
        <div className={styles.viewButtons}>
          <button type="button" className={view === "days" || view === "months" ? styles.viewActive : ""} onClick={() => setView(mode === "month" ? "months" : "days")}>Month</button>
          <button type="button" className={view === "years" ? styles.viewActive : ""} onClick={() => setView("years")}>Year</button>
        </div>
      </div>
      {view === "days" && <div className={`${styles.calendars} ${monthsToShow === 2 ? styles.twoMonths : ""}`}>{Array.from({ length: monthsToShow }, (_, index) => renderMonth(index))}</div>}
      {view === "months" && <div className={styles.selectionGrid}>{monthNames.map((month, index) => <button key={month} type="button" className={cursor.getMonth() === index ? styles.selected : ""} onClick={() => chooseMonth(index)}>{month}</button>)}</div>}
      {view === "years" && <div className={styles.selectionGrid}>{Array.from({ length: 12 }, (_, index) => cursor.getFullYear() - 5 + index).map((year) => <button key={year} type="button" className={cursor.getFullYear() === year ? styles.selected : ""} onClick={() => chooseYear(year)}>{year}</button>)}</div>}
      {view === "quarters" && <div className={styles.selectionGrid}>{[1, 2, 3, 4].map((quarter) => <button key={quarter} type="button" onClick={() => chooseQuarter(quarter)}>Q{quarter}</button>)}</div>}
      {showTime && <div className={styles.timeRow}><label htmlFor={`${id}-time`}>Time</label><input id={`${id}-time`} type="time" step="1" value={time} onChange={(event) => setTime(event.currentTarget.value || "00:00:00")} /></div>}
      <div className={styles.footer}><button type="button" onClick={() => { const today = new Date(); setCursor(today); if (mode === "date") chooseDay(today); }}>{mode === "range" ? "Today" : "Today"}</button>{showTime && <button type="button" className={styles.confirm} onClick={() => setOpen(false)}>OK</button>}</div>
    </div>}
  </div>;
}

function CalendarIcon() {
  return <svg aria-hidden="true" viewBox="0 0 16 16"><rect x="2" y="3" width="12" height="11" rx="1" fill="none" stroke="currentColor"/><path d="M5 2v3M11 2v3M2 6h12" fill="none" stroke="currentColor"/><path d="m7 9 1 1 2-2" fill="none" stroke="currentColor" strokeWidth="1.2"/></svg>;
}
