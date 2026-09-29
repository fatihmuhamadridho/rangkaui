import type { AnchorHTMLAttributes, CSSProperties, HTMLAttributes, ImgHTMLAttributes, ReactNode } from "react";

import styles from "./Card.module.css";

export type CardVariant = "primary" | "secondary" | "success" | "danger" | "warning" | "info" | "light" | "dark";
export type CardGroupLayout = "group" | "grid";

export interface CardProps extends HTMLAttributes<HTMLDivElement> {
  variant?: CardVariant;
  outline?: boolean;
  shadow?: boolean;
  horizontal?: boolean;
  children?: ReactNode;
}

export interface CardSectionProps extends HTMLAttributes<HTMLDivElement> {
  children?: ReactNode;
}

export interface CardHeadingProps extends HTMLAttributes<HTMLHeadingElement> {
  as?: "h1" | "h2" | "h3" | "h4" | "h5" | "h6";
  children?: ReactNode;
}

export interface CardImageProps extends ImgHTMLAttributes<HTMLImageElement> {
  placement?: "top" | "bottom";
}

export interface CardGroupProps extends HTMLAttributes<HTMLDivElement> {
  layout?: CardGroupLayout;
  columns?: number;
  children?: ReactNode;
}

const variantClasses: Record<CardVariant, string> = {
  primary: styles.primary,
  secondary: styles.secondary,
  success: styles.success,
  danger: styles.danger,
  warning: styles.warning,
  info: styles.info,
  light: styles.light,
  dark: styles.dark,
};

function classes(...values: Array<string | false | undefined>) {
  return values.filter(Boolean).join(" ");
}

export function Card({
  variant,
  outline = false,
  shadow = false,
  horizontal = false,
  className = "",
  children,
  ...props
}: CardProps) {
  return (
    <div
      className={classes(styles.card, variant && variantClasses[variant], outline && styles.outline, shadow && styles.shadow, horizontal && styles.horizontal, className)}
      {...props}
    >
      {children}
    </div>
  );
}

export function CardHeader({ children, className = "", ...props }: CardSectionProps) {
  return <div className={classes(styles.header, className)} {...props}>{children}</div>;
}

export function CardBody({ children, className = "", ...props }: CardSectionProps) {
  return <div className={classes(styles.body, className)} {...props}>{children}</div>;
}

export function CardFooter({ children, className = "", ...props }: CardSectionProps) {
  return <div className={classes(styles.footer, className)} {...props}>{children}</div>;
}

export function CardTitle({ as: Heading = "h5", children, className = "", ...props }: CardHeadingProps) {
  return <Heading className={classes(styles.title, className)} {...props}>{children}</Heading>;
}

export function CardSubtitle({ as: Heading = "h6", children, className = "", ...props }: CardHeadingProps) {
  return <Heading className={classes(styles.subtitle, className)} {...props}>{children}</Heading>;
}

export function CardText({ children, className = "", ...props }: HTMLAttributes<HTMLParagraphElement>) {
  return <p className={classes(styles.text, className)} {...props}>{children}</p>;
}

export function CardLink({ children, className = "", ...props }: AnchorHTMLAttributes<HTMLAnchorElement>) {
  return <a className={classes(styles.link, className)} {...props}>{children}</a>;
}

export function CardImage({ placement = "top", className = "", ...props }: CardImageProps) {
  return <img className={classes(styles.image, placement === "bottom" && styles.imageBottom, className)} {...props} />;
}

export function CardImageOverlay({ children, className = "", ...props }: CardSectionProps) {
  return <div className={classes(styles.imageOverlay, className)} {...props}>{children}</div>;
}

export function CardListGroup({ children, className = "", ...props }: HTMLAttributes<HTMLUListElement>) {
  return <ul className={classes(styles.listGroup, className)} {...props}>{children}</ul>;
}

export function CardListGroupItem({ children, className = "", ...props }: HTMLAttributes<HTMLLIElement>) {
  return <li className={classes(styles.listGroupItem, className)} {...props}>{children}</li>;
}

export function CardGroup({
  layout = "group",
  columns = 3,
  children,
  className = "",
  style,
  ...props
}: CardGroupProps) {
  const groupStyle = { ...style, "--card-columns": Math.max(1, columns) } as CSSProperties;
  return (
    <div className={classes(styles.cardGroup, styles[layout], className)} style={groupStyle} {...props}>
      {children}
    </div>
  );
}
