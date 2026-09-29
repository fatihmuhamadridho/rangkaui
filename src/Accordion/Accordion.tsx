import { useState, type HTMLAttributes, type ReactNode } from "react";

import styles from "./Accordion.module.css";

export interface AccordionItemData {
  id: string;
  title: ReactNode;
  content: ReactNode;
  disabled?: boolean;
}

export interface AccordionProps extends HTMLAttributes<HTMLDivElement> {
  items: AccordionItemData[];
  defaultOpen?: string | string[];
  openItems?: string[];
  onOpenItemsChange?: (openItems: string[]) => void;
  allowMultiple?: boolean;
  flush?: boolean;
  headingLevel?: 2 | 3 | 4 | 5 | 6;
}

function asList(value?: string | string[]): string[] {
  if (value === undefined) return [];
  return Array.isArray(value) ? value : [value];
}

export function Accordion({
  items,
  defaultOpen,
  openItems,
  onOpenItemsChange,
  allowMultiple = false,
  flush = false,
  headingLevel = 3,
  className = "",
  ...props
}: AccordionProps) {
  const [internalOpenItems, setInternalOpenItems] = useState(() => asList(defaultOpen));
  const isControlled = openItems !== undefined;
  const selectedItems = isControlled ? openItems : internalOpenItems;
  const activeItems = allowMultiple ? selectedItems : selectedItems.slice(0, 1);

  const toggleItem = (id: string) => {
    const isOpen = activeItems.includes(id);
    const nextItems = isOpen
      ? activeItems.filter((itemId) => itemId !== id)
      : allowMultiple
        ? [...activeItems, id]
        : [id];

    if (!isControlled) setInternalOpenItems(nextItems);
    onOpenItemsChange?.(nextItems);
  };

  const Heading = `h${headingLevel}` as const;

  return (
    <div className={[styles.accordion, flush && styles.flush, className].filter(Boolean).join(" ")} {...props}>
      {items.map((item) => {
        const expanded = activeItems.includes(item.id);
        const triggerId = `${item.id}-trigger`;
        const panelId = `${item.id}-panel`;

        return (
          <section className={styles.item} key={item.id}>
            <Heading className={styles.heading}>
              <button
                id={triggerId}
                type="button"
                className={[styles.trigger, expanded && styles.expanded].filter(Boolean).join(" ")}
                aria-expanded={expanded}
                aria-controls={panelId}
                disabled={item.disabled}
                onClick={() => toggleItem(item.id)}
              >
                <span>{item.title}</span>
                <span className={styles.chevron} aria-hidden="true" />
              </button>
            </Heading>
            <div
              id={panelId}
              className={[styles.panel, expanded && styles.panelExpanded].filter(Boolean).join(" ")}
              role="region"
              aria-labelledby={triggerId}
              aria-hidden={!expanded}
              inert={!expanded}
            >
              <div className={styles.panelInner}>
                <div className={styles.body}>{item.content}</div>
              </div>
            </div>
          </section>
        );
      })}
    </div>
  );
}
