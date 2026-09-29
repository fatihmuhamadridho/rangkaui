import { createContext, useContext, useId, useState, type ButtonHTMLAttributes, type HTMLAttributes, type ReactNode } from "react";

import styles from "./Collapse.module.css";

interface CollapseContextValue {
  panelId: string;
  open: boolean;
  toggle: () => void;
}

const CollapseContext = createContext<CollapseContextValue | null>(null);

export interface CollapseProps extends HTMLAttributes<HTMLDivElement> {
  open?: boolean;
  defaultOpen?: boolean;
  onOpenChange?: (open: boolean) => void;
  horizontal?: boolean;
  panelId?: string;
  children?: ReactNode;
}

export interface CollapseTriggerProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  children?: ReactNode;
}

export interface CollapsePanelProps extends HTMLAttributes<HTMLDivElement> {
  children?: ReactNode;
}

function useCollapseContext() {
  const context = useContext(CollapseContext);
  if (!context) throw new Error("CollapseTrigger and CollapsePanel must be rendered inside Collapse.");
  return context;
}

export function Collapse({
  open,
  defaultOpen = false,
  onOpenChange,
  horizontal = false,
  panelId,
  children,
  className = "",
  ...props
}: CollapseProps) {
  const generatedId = useId().replace(/:/g, "");
  const [internalOpen, setInternalOpen] = useState(defaultOpen);
  const isControlled = open !== undefined;
  const expanded = isControlled ? open : internalOpen;
  const resolvedPanelId = panelId ?? `${generatedId}-panel`;

  const toggle = () => {
    const nextOpen = !expanded;
    if (!isControlled) setInternalOpen(nextOpen);
    onOpenChange?.(nextOpen);
  };

  return (
    <CollapseContext.Provider value={{ panelId: resolvedPanelId, open: expanded, toggle }}>
      <div className={[styles.collapse, horizontal && styles.horizontal, className].filter(Boolean).join(" ")} {...props}>
        {children}
      </div>
    </CollapseContext.Provider>
  );
}

export function CollapseTrigger({ children, className = "", type = "button", onClick, ...props }: CollapseTriggerProps) {
  const { panelId, open, toggle } = useCollapseContext();
  return (
    <button
      {...props}
      type={type}
      className={[styles.trigger, className].filter(Boolean).join(" ")}
      aria-expanded={open}
      aria-controls={panelId}
      onClick={(event) => {
        onClick?.(event);
        if (!event.defaultPrevented) toggle();
      }}
    >
      {children}
    </button>
  );
}

export function CollapsePanel({ children, className = "", ...props }: CollapsePanelProps) {
  const { panelId, open } = useCollapseContext();
  return (
    <div
      {...props}
      id={panelId}
      className={[styles.panel, open && styles.open, className].filter(Boolean).join(" ")}
      aria-hidden={!open}
      inert={!open}
    >
      <div className={styles.panelInner}>
        <div className={styles.content}>{children}</div>
      </div>
    </div>
  );
}
