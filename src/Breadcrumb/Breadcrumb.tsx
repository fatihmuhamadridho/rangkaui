import type { CSSProperties, HTMLAttributes, ReactNode } from "react";

import styles from "./Breadcrumb.module.css";

export interface BreadcrumbItemData {
  label: ReactNode;
  href?: string;
  id?: string;
}

export interface BreadcrumbProps extends HTMLAttributes<HTMLElement> {
  items: BreadcrumbItemData[];
  divider?: string;
}

export function Breadcrumb({
  items,
  divider = "/",
  className = "",
  "aria-label": ariaLabel = "Breadcrumb",
  style,
  ...props
}: BreadcrumbProps) {
  const breadcrumbStyle = {
    ...style,
    "--breadcrumb-divider": divider ? `"${divider.replace(/\\/g, "\\\\").replace(/"/g, '\\"').replace(/[\r\n]/g, " ")}"` : '""',
  } as CSSProperties;

  return (
    <nav
      className={[styles.breadcrumb, !divider && styles.noDivider, className].filter(Boolean).join(" ")}
      aria-label={ariaLabel}
      style={breadcrumbStyle}
      {...props}
    >
      <ol className={styles.list}>
        {items.map((item, index) => {
          const isCurrent = index === items.length - 1;
          return (
            <li
              key={item.id ?? `${index}-${String(item.label)}`}
              className={[styles.item, isCurrent && styles.current].filter(Boolean).join(" ")}
              aria-current={isCurrent ? "page" : undefined}
            >
              {!isCurrent && item.href ? <a href={item.href}>{item.label}</a> : <span>{item.label}</span>}
            </li>
          );
        })}
      </ol>
    </nav>
  );
}
