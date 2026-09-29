import { useEffect, useId, useRef, useState, type HTMLAttributes } from "react";

import styles from "./TimePicker.module.css";

export type TimePickerTheme = "default" | "primary" | "success" | "danger";
export interface TimeRangeValue { start: string; end: string }

export interface TimePickerProps extends Omit<HTMLAttributes<HTMLDivElement>, "onChange" | "defaultValue"> {
  mode?: "single" | "range";
  value?: string | TimeRangeValue;
  defaultValue?: string | TimeRangeValue;
  onChange?: (value: string | TimeRangeValue) => void;
  theme?: TimePickerTheme;
  disabled?: boolean;
  useSeconds?: boolean;
  hour12?: boolean;
  minuteStep?: number;
  secondStep?: number;
  placeholder?: string;
}

interface ClockTime { hour: number; minute: number; second: number; meridiem: "AM" | "PM" }

const pad = (value: number) => String(value).padStart(2, "0");
function parseTime(value?: string): ClockTime {
  const [time = "", meridiem] = (value ?? "").trim().split(/\s+/);
  const parts = time.split(":").map(Number);
  const hour = parts[0] || 0;
  return { hour: meridiem ? (hour % 12) + (meridiem.toUpperCase() === "PM" ? 12 : 0) : hour, minute: parts[1] || 0, second: parts[2] || 0, meridiem: meridiem?.toUpperCase() === "PM" ? "PM" : "AM" };
}
function formatTime(value: ClockTime, useSeconds: boolean, hour12: boolean) {
  const hour = hour12 ? ((value.hour + 11) % 12) + 1 : value.hour;
  return `${pad(hour)}:${pad(value.minute)}${useSeconds ? `:${pad(value.second)}` : ""}${hour12 ? ` ${value.meridiem}` : ""}`;
}

export function TimePicker({
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
}: TimePickerProps) {
  const id = useId().replace(/:/g, "");
  const rootRef = useRef<HTMLDivElement>(null);
  const controlled = value !== undefined;
  const [internalValue, setInternalValue] = useState<string | TimeRangeValue>(defaultValue);
  const selectedValue = controlled ? value : internalValue;
  const selectedStart = typeof selectedValue === "string" ? selectedValue : selectedValue.start;
  const selectedEnd = typeof selectedValue === "string" ? "" : selectedValue.end;
  const [open, setOpen] = useState(false);
  const [activePart, setActivePart] = useState<"start" | "end">("start");
  const [draft, setDraft] = useState<ClockTime>(() => parseTime(selectedStart));

  useEffect(() => {
    if (!open) return;
    const onPointerDown = (event: PointerEvent) => { if (!rootRef.current?.contains(event.target as Node)) setOpen(false); };
    const onKeyDown = (event: KeyboardEvent) => { if (event.key === "Escape") setOpen(false); };
    document.addEventListener("pointerdown", onPointerDown);
    document.addEventListener("keydown", onKeyDown);
    return () => { document.removeEventListener("pointerdown", onPointerDown); document.removeEventListener("keydown", onKeyDown); };
  }, [open]);

  const openFor = (part: "start" | "end") => {
    setActivePart(part);
    setDraft(parseTime(part === "start" ? selectedStart : selectedEnd));
    setOpen(true);
  };

  const setPart = (key: keyof ClockTime, newValue: number | "AM" | "PM") => setDraft((current) => {
    if (key === "hour") {
      const hour = Number(newValue);
      const normalizedHour = hour12 ? (hour % 12) + (current.meridiem === "PM" ? 12 : 0) : hour;
      return { ...current, hour: normalizedHour };
    }
    if (key === "meridiem") {
      const meridiem = newValue as "AM" | "PM";
      const hour = current.hour % 12 + (meridiem === "PM" ? 12 : 0);
      return { ...current, hour, meridiem };
    }
    return { ...current, [key]: newValue };
  });
  const confirm = () => {
    const nextTime = formatTime(draft, useSeconds, hour12);
    let next: string | TimeRangeValue = nextTime;
    if (mode === "range") {
      const range = typeof selectedValue === "string" ? { start: selectedValue, end: "" } : selectedValue;
      next = { ...range, [activePart]: nextTime };
    }
    if (!controlled) setInternalValue(next);
    onChange?.(next);
    setOpen(false);
  };

  const setNow = () => {
    const now = new Date();
    const current = { hour: now.getHours(), minute: now.getMinutes(), second: now.getSeconds(), meridiem: now.getHours() >= 12 ? "PM" as const : "AM" as const };
    setDraft(current);
    const nextTime = formatTime(current, useSeconds, hour12);
    let next: string | TimeRangeValue = nextTime;
    if (mode === "range") {
      const range = typeof selectedValue === "string" ? { start: selectedValue, end: "" } : selectedValue;
      next = { ...range, [activePart]: nextTime };
    }
    if (!controlled) setInternalValue(next);
    onChange?.(next);
  };

  const hours = Array.from({ length: hour12 ? 12 : 24 }, (_, index) => hour12 ? (index === 0 ? 12 : index) : index);
  const minutes = Array.from({ length: Math.ceil(60 / Math.max(1, minuteStep)) }, (_, index) => index * Math.max(1, minuteStep));
  const seconds = Array.from({ length: Math.ceil(60 / Math.max(1, secondStep)) }, (_, index) => index * Math.max(1, secondStep));
  const columns: Array<{ key: "hour" | "minute" | "second" | "meridiem"; values: Array<number | "AM" | "PM">; label: string }> = [
    { key: "hour", values: hours, label: "Hour" },
    { key: "minute", values: minutes, label: "Minute" },
    ...(useSeconds ? [{ key: "second" as const, values: seconds, label: "Second" }] : []),
    ...(hour12 ? [{ key: "meridiem" as const, values: ["AM" as const, "PM" as const], label: "AM or PM" }] : []),
  ];

  return <div {...props} ref={rootRef} className={`${styles.root} ${styles[theme]} ${className}`.trim()}>
    <div className={`${styles.input} ${disabled ? styles.disabled : ""}`}>
      {mode === "range" ? <>
        <button type="button" className={styles.rangeInput} disabled={disabled} onClick={() => openFor("start")}>{selectedStart || "Start time"}</button>
        <span aria-hidden="true">→</span>
        <button type="button" className={styles.rangeInput} disabled={disabled} onClick={() => openFor("end")}>{selectedEnd || "End time"}</button>
      </> : <button type="button" className={styles.singleInput} disabled={disabled} onClick={() => openFor("start")}>{selectedStart || placeholder || "Select time"}</button>}
      <button type="button" className={styles.clockButton} aria-label="Open time picker" aria-expanded={open} aria-controls={`${id}-panel`} disabled={disabled} onClick={() => openFor(activePart)}><ClockIcon /></button>
    </div>

    {open && !disabled && <div id={`${id}-panel`} className={styles.panel} role="dialog" aria-label="Choose time">
      <div className={styles.columns}>
        {columns.map((column) => <div className={styles.column} key={column.key} role="listbox" aria-label={column.label}>
          {column.values.map((item) => {
            const selected = column.key === "hour" && hour12 ? ((draft.hour + 11) % 12) + 1 === item : draft[column.key] === item;
            return <button key={item} type="button" role="option" aria-selected={selected} className={selected ? styles.activeOption : ""} onClick={() => setPart(column.key, item)}>{typeof item === "number" ? pad(item) : item}</button>;
          })}
        </div>)}
      </div>
      <div className={styles.footer}><button type="button" onClick={setNow}>Now</button><button type="button" className={styles.confirm} onClick={confirm}>OK</button></div>
    </div>}
  </div>;
}

function ClockIcon() {
  return <svg aria-hidden="true" viewBox="0 0 16 16"><circle cx="8" cy="8" r="5.5" fill="none" stroke="currentColor"/><path d="M8 4.5V8l2.5 1.5" fill="none" stroke="currentColor" strokeLinecap="round"/></svg>;
}
