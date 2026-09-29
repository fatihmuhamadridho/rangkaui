import { useState, type HTMLAttributes } from "react";

import styles from "./Rate.module.css";

export type RateIcon = "star" | "face";
export type RateSize = "small" | "medium" | "large";

export interface RateProps extends Omit<HTMLAttributes<HTMLDivElement>, "onChange"> {
  value?: number;
  defaultValue?: number;
  onChange?: (value: number) => void;
  count?: number;
  allowHalf?: boolean;
  allowClear?: boolean;
  readOnly?: boolean;
  disabled?: boolean;
  icon?: RateIcon;
  size?: RateSize;
  label?: string;
}

function joinClasses(...classes: Array<string | false | undefined>) {
  return classes.filter(Boolean).join(" ");
}

export function Rate({
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
}: RateProps) {
  const [internalValue, setInternalValue] = useState(defaultValue);
  const [hoverValue, setHoverValue] = useState(0);
  const controlled = value !== undefined;
  const selected = controlled ? value : internalValue;
  const displayed = hoverValue || selected;
  const step = allowHalf ? 0.5 : 1;

  const selectValue = (next: number, clearIfSelected = true) => {
    const normalized = clearIfSelected && allowClear && next === selected ? 0 : next;
    if (!controlled) setInternalValue(normalized);
    onChange?.(normalized);
  };

  return (
    <div
      {...props}
      className={joinClasses(styles.rate, styles[size], disabled && styles.disabled, className)}
      role="radiogroup"
      aria-label={label}
      aria-disabled={disabled || undefined}
      onMouseLeave={() => setHoverValue(0)}
    >
      {Array.from({ length: count }, (_, index) => {
        const rating = index + 1;
        const amount = Math.max(0, Math.min(1, displayed - index));
        const options = allowHalf ? [rating - 0.5, rating] : [rating];
        return (
          <span className={styles.item} key={rating} onMouseLeave={() => undefined}>
            {options.map((option) => (
              <button
                key={option}
                type="button"
                className={joinClasses(styles.choice, styles[icon], option % 1 !== 0 && styles.halfChoice)}
                role="radio"
                aria-checked={selected === option}
                aria-label={`${option} out of ${count}`}
                aria-pressed={selected === option}
                disabled={disabled || readOnly}
                tabIndex={selected === option || (selected === 0 && option === (allowHalf ? 0.5 : 1)) ? 0 : -1}
                onMouseEnter={() => !disabled && !readOnly && setHoverValue(option)}
                onFocus={() => !disabled && !readOnly && setHoverValue(option)}
                onBlur={() => setHoverValue(0)}
                onClick={() => selectValue(option)}
                onKeyDown={(event) => {
                  if (!["ArrowRight", "ArrowUp", "ArrowLeft", "ArrowDown", "Home", "End"].includes(event.key)) return;
                  event.preventDefault();
                  const current = options.indexOf(selected);
                  const next = event.key === "Home" ? step : event.key === "End" ? count : Math.max(step, Math.min(count, selected + (["ArrowRight", "ArrowUp"].includes(event.key) ? step : -step)));
                  selectValue(next, false);
                  if (event.key === "Home" || event.key === "End" || current >= 0) {
                    const sibling = event.currentTarget.parentElement?.parentElement?.querySelector<HTMLButtonElement>(`button[aria-label="${next} out of ${count}"]`);
                    sibling?.focus();
                  }
                }}
              >
                <span className={styles.iconBase}><RatingIcon type={icon} /></span>
                <span className={styles.iconFill} style={{ clipPath: `inset(0 ${100 - amount * 100}% 0 0)` }} aria-hidden="true"><RatingIcon type={icon} /></span>
              </button>
            ))}
          </span>
        );
      })}
    </div>
  );
}

function RatingIcon({ type }: { type: RateIcon }) {
  if (type === "face") {
    return <svg viewBox="0 0 24 24" fill="none" aria-hidden="true"><circle cx="12" cy="12" r="9.5" stroke="currentColor" strokeWidth="1.8"/><ellipse cx="9" cy="9.5" rx="1" ry="1.6" fill="currentColor"/><ellipse cx="15" cy="9.5" rx="1" ry="1.6" fill="currentColor"/><path d="M7.5 14c.8 2 2.3 3 4.5 3s3.7-1 4.5-3" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round"/></svg>;
  }
  return <svg viewBox="0 0 24 24" aria-hidden="true"><path d="m12 2.4 2.95 5.98 6.6.96-4.78 4.66 1.13 6.57L12 17.47l-5.9 3.1 1.13-6.57-4.78-4.66 6.6-.96L12 2.4Z" fill="currentColor" /></svg>;
}
