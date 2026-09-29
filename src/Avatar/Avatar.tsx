import { cloneElement, isValidElement, useState, type HTMLAttributes, type ImgHTMLAttributes, type ReactNode } from "react";

import styles from "./Avatar.module.css";

export type AvatarSize = "xs" | "sm" | "md" | "lg" | "xl" | number;
export type AvatarShape = "circle" | "square";
export type AvatarVariant = "neutral" | "primary" | "orange" | "success" | "danger";
export type AvatarStatus = "online" | "offline" | "busy" | "away";

export interface AvatarProps extends Omit<HTMLAttributes<HTMLSpanElement>, "children"> {
  src?: string;
  alt?: string;
  name?: string;
  initials?: string;
  size?: AvatarSize;
  shape?: AvatarShape;
  variant?: AvatarVariant;
  badge?: ReactNode;
  dot?: boolean;
  status?: AvatarStatus;
  children?: ReactNode;
  imageProps?: Omit<ImgHTMLAttributes<HTMLImageElement>, "src" | "alt">;
}

export interface AvatarGroupProps extends HTMLAttributes<HTMLDivElement> {
  max?: number;
  size?: AvatarSize;
  children?: ReactNode;
}

function joinClasses(...classes: Array<string | false | undefined>) {
  return classes.filter(Boolean).join(" ");
}

function getInitials(name?: string) {
  if (!name) return "";
  return name.trim().split(/\s+/).slice(0, 2).map((part) => part[0]?.toUpperCase()).join("");
}

export function Avatar({
  src,
  alt,
  name,
  initials,
  size = "md",
  shape = "circle",
  variant = "neutral",
  badge,
  dot = false,
  status,
  children,
  imageProps,
  className = "",
  style,
  ...props
}: AvatarProps) {
  const [imageFailed, setImageFailed] = useState(false);
  const customSize = typeof size === "number" ? `${size}px` : undefined;
  const displayInitials = initials ?? getInitials(name);

  return (
    <span
      {...props}
      className={joinClasses(styles.avatar, typeof size === "string" && styles[size], styles[shape], styles[variant], className)}
      style={{ ...style, ...(customSize ? { width: customSize, height: customSize, fontSize: `calc(${customSize} * 0.38)` } : {}) }}
      role={props.role ?? (alt || name ? "img" : undefined)}
      aria-label={props["aria-label"] ?? alt ?? name}
    >
      {children ?? (src && !imageFailed
        ? <img {...imageProps} src={src} alt={alt ?? name ?? ""} onError={(event) => { imageProps?.onError?.(event); setImageFailed(true); }} />
        : displayInitials
          ? <span aria-hidden="true">{displayInitials}</span>
          : <PersonIcon />)}
      {status && <span className={joinClasses(styles.status, styles[status])} aria-label={status} />}
      {dot && !status && <span className={joinClasses(styles.badge, styles.dot)} aria-label="New activity" />}
      {badge !== undefined && <span className={styles.badge}>{badge}</span>}
    </span>
  );
}

export function AvatarGroup({ children, max, size, className = "", ...props }: AvatarGroupProps) {
  const items = Array.isArray(children) ? children : [children];
  const visibleItems = max === undefined ? items : items.slice(0, max);
  const remaining = max === undefined ? 0 : Math.max(0, items.length - max);

  return (
    <div {...props} className={joinClasses(styles.group, className)} role="group" aria-label={props["aria-label"] ?? "Avatar group"}>
      {visibleItems.map((child, index) => isValidElement<AvatarProps>(child) && size !== undefined
        ? cloneElement(child, { size: child.props.size ?? size, key: child.key ?? index })
        : child)}
      {remaining > 0 && <Avatar size={size} className={styles.more} aria-label={`${remaining} more people`}>+{remaining}</Avatar>}
    </div>
  );
}

function PersonIcon() {
  return <svg className={styles.person} viewBox="0 0 24 24" aria-hidden="true"><circle cx="12" cy="8" r="3.5" fill="none" stroke="currentColor" strokeWidth="1.6"/><path d="M4.5 20c.4-4 3-6 7.5-6s7.1 2 7.5 6H4.5Z" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinejoin="round"/></svg>;
}
