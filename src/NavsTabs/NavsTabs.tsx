import { createContext, useContext, useId, useState, type AnchorHTMLAttributes, type HTMLAttributes, type KeyboardEvent, type ReactNode } from "react";

import styles from "./NavsTabs.module.css";

export type NavsTabsVariant = "tabs" | "pills" | "underline" | "plain";
export type NavsTabsOrientation = "horizontal" | "vertical";

interface NavsTabsContextValue {
  baseId: string;
  activeKey: string;
  setActiveKey: (key: string) => void;
  variant: NavsTabsVariant;
  orientation: NavsTabsOrientation;
  keys: string[];
  registerKey: (key: string) => void;
}

const NavsTabsContext = createContext<NavsTabsContextValue | null>(null);

export interface NavsTabsProps extends Omit<HTMLAttributes<HTMLDivElement>, "onChange"> {
  defaultActiveKey?: string;
  activeKey?: string;
  onChange?: (key: string) => void;
  variant?: NavsTabsVariant;
  orientation?: NavsTabsOrientation;
  justified?: boolean;
  fill?: boolean;
  children?: ReactNode;
}

export interface NavsTabsListProps extends HTMLAttributes<HTMLDivElement> {
  label?: string;
  children?: ReactNode;
}

export interface NavsTabsTabProps extends Omit<AnchorHTMLAttributes<HTMLAnchorElement>, "onChange"> {
  tabKey: string;
  disabled?: boolean;
  children?: ReactNode;
}

export interface NavsTabsPanelProps extends HTMLAttributes<HTMLDivElement> {
  tabKey: string;
  children?: ReactNode;
}

function joinClasses(...classes: Array<string | false | undefined>) {
  return classes.filter(Boolean).join(" ");
}

function useNavsTabs() {
  const context = useContext(NavsTabsContext);
  if (!context) throw new Error("NavsTabs parts must be rendered inside NavsTabs.");
  return context;
}

export function NavsTabs({
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
}: NavsTabsProps) {
  const generatedId = useId().replace(/:/g, "");
  const [internalKey, setInternalKey] = useState(defaultActiveKey ?? "");
  const [keys, setKeys] = useState<string[]>([]);
  const selectedKey = activeKey ?? internalKey;

  const setActiveKey = (key: string) => {
    if (activeKey === undefined) setInternalKey(key);
    onChange?.(key);
  };

  const registerKey = (key: string) => {
    setKeys((current) => current.includes(key) ? current : [...current, key]);
  };

  return (
    <NavsTabsContext.Provider value={{ baseId: generatedId, activeKey: selectedKey, setActiveKey, variant, orientation, keys, registerKey }}>
      <div
        className={joinClasses(styles.root, styles[`orientation${orientation}`], className)}
        data-variant={variant}
        data-fill={fill || undefined}
        data-justified={justified || undefined}
        {...props}
      >
        {children}
      </div>
    </NavsTabsContext.Provider>
  );
}

export function NavsTabsList({ label = "Tabs", children, className = "", ...props }: NavsTabsListProps) {
  const { orientation, variant, keys, activeKey, setActiveKey } = useNavsTabs();

  const handleKeyDown = (event: KeyboardEvent<HTMLDivElement>) => {
    props.onKeyDown?.(event);
    if (event.defaultPrevented) return;

    const isVertical = orientation === "vertical";
    const nextKey = isVertical
      ? event.key === "ArrowDown" ? 1 : event.key === "ArrowUp" ? -1 : 0
      : event.key === "ArrowRight" ? 1 : event.key === "ArrowLeft" ? -1 : 0;

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

  return (
    <div
      className={joinClasses(styles.list, styles[`list${variant}`], className)}
      role={variant === "plain" ? "navigation" : "tablist"}
      aria-label={label}
      aria-orientation={orientation === "vertical" ? "vertical" : undefined}
      onKeyDown={handleKeyDown}
      {...props}
    >
      {children}
    </div>
  );
}

export function NavsTabsTab({ tabKey, disabled = false, children, className = "", onClick, onFocus, ...props }: NavsTabsTabProps) {
  const { baseId, activeKey, setActiveKey, variant, registerKey } = useNavsTabs();
  const selected = activeKey === tabKey;
  registerKey(tabKey);

  return (
    <a
      {...props}
      id={`${baseId}-tab-${tabKey}`}
      href={props.href ?? `#${baseId}-panel-${tabKey}`}
      className={joinClasses(styles.tab, selected && styles.selected, disabled && styles.disabled, className)}
      role={variant === "plain" ? undefined : "tab"}
      aria-selected={variant === "plain" ? undefined : selected}
      aria-controls={variant === "plain" ? undefined : `${baseId}-panel-${tabKey}`}
      aria-current={variant === "plain" && selected ? "page" : undefined}
      aria-disabled={disabled || undefined}
      tabIndex={variant === "plain" ? undefined : (selected ? 0 : -1)}
      onFocus={(event) => {
        onFocus?.(event);
        if (!event.defaultPrevented && variant !== "plain" && !disabled) setActiveKey(tabKey);
      }}
      onClick={(event) => {
        onClick?.(event);
        if (disabled) event.preventDefault();
        else if (variant !== "plain" && !event.defaultPrevented) {
          event.preventDefault();
          setActiveKey(tabKey);
        }
      }}
    >
      {children}
    </a>
  );
}

export function NavsTabsPanel({ tabKey, children, className = "", ...props }: NavsTabsPanelProps) {
  const { baseId, activeKey } = useNavsTabs();
  const selected = activeKey === tabKey;

  return (
    <div
      {...props}
      id={`${baseId}-panel-${tabKey}`}
      className={joinClasses(styles.panel, selected && styles.panelSelected, className)}
      role="tabpanel"
      aria-labelledby={`${baseId}-tab-${tabKey}`}
      hidden={!selected}
      tabIndex={0}
    >
      {children}
    </div>
  );
}

