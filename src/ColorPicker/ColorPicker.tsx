import { useEffect, useId, useRef, useState, type CSSProperties, type HTMLAttributes, type PointerEvent as ReactPointerEvent } from "react";

import styles from "./ColorPicker.module.css";

export interface RGBAColor {
  r: number;
  g: number;
  b: number;
  a: number;
}

export interface ColorPickerProps extends Omit<HTMLAttributes<HTMLDivElement>, "onChange"> {
  value?: string;
  defaultValue?: string;
  onChange?: (color: string, rgba: RGBAColor) => void;
  label?: string;
  disabled?: boolean;
  showAlpha?: boolean;
}

interface HSVColor { h: number; s: number; v: number; a: number }

function clamp(value: number, min: number, max: number) {
  return Math.min(max, Math.max(min, value));
}

function parseColor(value: string): RGBAColor | null {
  const input = value.trim();
  const hex = input.match(/^#?([\da-f]{3,8})$/i)?.[1];
  if (hex) {
    const normalized = hex.length === 3 || hex.length === 4
      ? [...hex].map((part) => part + part).join("")
      : hex;
    if (normalized.length === 6 || normalized.length === 8) {
      return {
        r: parseInt(normalized.slice(0, 2), 16),
        g: parseInt(normalized.slice(2, 4), 16),
        b: parseInt(normalized.slice(4, 6), 16),
        a: normalized.length === 8 ? Math.round(parseInt(normalized.slice(6, 8), 16) / 255 * 100) : 100,
      };
    }
  }
  const rgba = input.match(/^rgba?\(\s*(\d+)\s*,\s*(\d+)\s*,\s*(\d+)(?:\s*,\s*([\d.]+))?\s*\)$/i);
  if (rgba) {
    const alpha = rgba[4] === undefined ? 1 : Number(rgba[4]);
    return { r: clamp(Number(rgba[1]), 0, 255), g: clamp(Number(rgba[2]), 0, 255), b: clamp(Number(rgba[3]), 0, 255), a: Math.round(clamp(alpha, 0, 1) * 100) };
  }
  return null;
}

function toHex({ r, g, b }: RGBAColor) {
  return `#${[r, g, b].map((channel) => Math.round(channel).toString(16).padStart(2, "0")).join("").toUpperCase()}`;
}

function toHsv({ r, g, b, a }: RGBAColor): HSVColor {
  const red = r / 255; const green = g / 255; const blue = b / 255;
  const max = Math.max(red, green, blue); const min = Math.min(red, green, blue); const delta = max - min;
  let h = 0;
  if (delta) {
    if (max === red) h = ((green - blue) / delta) % 6;
    else if (max === green) h = (blue - red) / delta + 2;
    else h = (red - green) / delta + 4;
    h *= 60;
    if (h < 0) h += 360;
  }
  return { h, s: max === 0 ? 0 : delta / max * 100, v: max * 100, a };
}

function fromHsv({ h, s, v, a }: HSVColor): RGBAColor {
  const saturation = s / 100; const value = v / 100;
  const chroma = value * saturation;
  const x = chroma * (1 - Math.abs((h / 60) % 2 - 1));
  const m = value - chroma;
  let parts: [number, number, number];
  if (h < 60) parts = [chroma, x, 0];
  else if (h < 120) parts = [x, chroma, 0];
  else if (h < 180) parts = [0, chroma, x];
  else if (h < 240) parts = [0, x, chroma];
  else if (h < 300) parts = [x, 0, chroma];
  else parts = [chroma, 0, x];
  return { r: Math.round((parts[0] + m) * 255), g: Math.round((parts[1] + m) * 255), b: Math.round((parts[2] + m) * 255), a };
}

export function ColorPicker({
  value,
  defaultValue = "#1708FF",
  onChange,
  label = "Choose color",
  disabled = false,
  showAlpha = true,
  className = "",
  ...props
}: ColorPickerProps) {
  const generatedId = useId().replace(/:/g, "");
  const rootRef = useRef<HTMLDivElement>(null);
  const [internalColor, setInternalColor] = useState(() => parseColor(defaultValue) ?? { r: 23, g: 8, b: 255, a: 100 });
  const [textValue, setTextValue] = useState(value ?? toHex(internalColor));
  const [isOpen, setIsOpen] = useState(false);
  const color = parseColor(value ?? "") ?? internalColor;
  const hsv = toHsv(color);
  const hex = toHex(color);

  useEffect(() => {
    if (value !== undefined) {
      const parsed = parseColor(value);
      if (parsed) {
        setInternalColor(parsed);
        setTextValue(toHex(parsed));
      }
    }
  }, [value]);

  useEffect(() => {
    if (!isOpen) return;
    const onPointerDown = (event: PointerEvent) => {
      if (!rootRef.current?.contains(event.target as Node)) setIsOpen(false);
    };
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") setIsOpen(false);
    };
    document.addEventListener("pointerdown", onPointerDown);
    document.addEventListener("keydown", onKeyDown);
    return () => {
      document.removeEventListener("pointerdown", onPointerDown);
      document.removeEventListener("keydown", onKeyDown);
    };
  }, [isOpen]);

  const commitColor = (next: RGBAColor) => {
    setInternalColor(next);
    setTextValue(toHex(next));
    onChange?.(toHex(next), next);
  };

  const updateFromPointer = (event: ReactPointerEvent<HTMLDivElement>) => {
    const bounds = event.currentTarget.getBoundingClientRect();
    const s = clamp((event.clientX - bounds.left) / bounds.width * 100, 0, 100);
    const v = clamp(100 - (event.clientY - bounds.top) / bounds.height * 100, 0, 100);
    commitColor(fromHsv({ ...hsv, s, v }));
  };

  const handleChannel = (channel: "r" | "g" | "b" | "a", raw: string) => {
    const numeric = Number(raw);
    if (raw === "" || !Number.isFinite(numeric)) return;
    const next = { ...color, [channel]: clamp(numeric, 0, channel === "a" ? 100 : 255) };
    commitColor(next);
  };

  return (
    <div {...props} ref={rootRef} className={`${styles.root} ${className}`.trim()}>
      <div className={styles.inputWrap}>
        <button
          type="button"
          className={styles.swatch}
          style={{ backgroundColor: `rgba(${color.r}, ${color.g}, ${color.b}, ${color.a / 100})` }}
          aria-label={`${label}: ${hex}`}
          aria-expanded={isOpen}
          aria-controls={`${generatedId}-panel`}
          disabled={disabled}
          onClick={() => setIsOpen((current) => !current)}
        />
        <input
          id={`${generatedId}-input`}
          className={styles.hexInput}
          value={textValue}
          aria-label={`${label} hex value`}
          disabled={disabled}
          onFocus={() => setIsOpen(true)}
          onChange={(event) => {
            const nextText = event.currentTarget.value;
            setTextValue(nextText);
            const parsed = parseColor(nextText);
            if (parsed) commitColor(parsed);
          }}
          onBlur={() => setTextValue(hex)}
        />
      </div>

      {isOpen && !disabled && <div id={`${generatedId}-panel`} className={styles.panel} role="dialog" aria-label={label}>
        <div
          className={styles.saturation}
          style={{ "--picker-hue": `hsl(${hsv.h} 100% 50%)` } as CSSProperties}
          role="slider"
          aria-label="Saturation and brightness"
          aria-valuemin={0}
          aria-valuemax={100}
          aria-valuenow={Math.round(hsv.s)}
          tabIndex={0}
          onPointerDown={(event) => {
            event.currentTarget.setPointerCapture(event.pointerId);
            updateFromPointer(event);
          }}
          onPointerMove={(event) => { if (event.buttons) updateFromPointer(event); }}
          onKeyDown={(event) => {
            const delta = event.shiftKey ? 10 : 1;
            if (event.key === "ArrowRight" || event.key === "ArrowUp") commitColor(fromHsv({ ...hsv, s: clamp(hsv.s + delta, 0, 100) }));
            if (event.key === "ArrowLeft" || event.key === "ArrowDown") commitColor(fromHsv({ ...hsv, s: clamp(hsv.s - delta, 0, 100) }));
          }}
        >
          <span className={styles.saturationMarker} style={{ left: `${hsv.s}%`, top: `${100 - hsv.v}%` }} />
        </div>

        <label className={styles.rangeLabel} htmlFor={`${generatedId}-hue`}>Hue</label>
        <input id={`${generatedId}-hue`} className={`${styles.range} ${styles.hueRange}`} type="range" min="0" max="360" value={Math.round(hsv.h)} aria-label="Hue" onChange={(event) => commitColor(fromHsv({ ...hsv, h: Number(event.currentTarget.value) }))} />

        {showAlpha && <>
          <div className={styles.rangeHeading}><label htmlFor={`${generatedId}-alpha`}>Opacity</label><output htmlFor={`${generatedId}-alpha`}>{color.a}%</output></div>
          <input id={`${generatedId}-alpha`} className={`${styles.range} ${styles.alphaRange}`} type="range" min="0" max="100" value={color.a} aria-label="Opacity" style={{ "--alpha-color": `rgba(${color.r}, ${color.g}, ${color.b}, ${color.a / 100})` } as CSSProperties} onChange={(event) => commitColor({ ...color, a: Number(event.currentTarget.value) })} />
        </>}

        <div className={styles.channelLabels}><span>Hex</span><span>R</span><span>G</span><span>B</span>{showAlpha && <span>A</span>}</div>
        <div className={styles.channels}>
          <input aria-label="Hex" value={textValue} onChange={(event) => { setTextValue(event.currentTarget.value); const parsed = parseColor(event.currentTarget.value); if (parsed) commitColor(parsed); }} onBlur={() => setTextValue(hex)} />
          {(["r", "g", "b"] as const).map((channel) => <input key={channel} aria-label={channel.toUpperCase()} type="number" min="0" max="255" value={color[channel]} onChange={(event) => handleChannel(channel, event.currentTarget.value)} />)}
          {showAlpha && <input aria-label="Alpha" type="number" min="0" max="100" value={color.a} onChange={(event) => handleChannel("a", event.currentTarget.value)} />}
        </div>
      </div>}
    </div>
  );
}
