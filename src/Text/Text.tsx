import { createElement, type ElementType, type HTMLAttributes, type ReactNode } from "react";

import styles from "./Text.module.css";

export type TextVariant = "body" | "lead" | "small" | "muted" | "bold" | "italic" | "mark" | "deleted" | "inserted" | "subscript" | "superscript" | "code" | "keyboard";
export type HeadingLevel = 1 | 2 | 3 | 4 | 5 | 6;

interface TextOwnProps {
  as?: ElementType;
  variant?: TextVariant;
  align?: "start" | "center" | "end";
  truncate?: boolean;
  children?: ReactNode;
}

export type TextProps = TextOwnProps & HTMLAttributes<HTMLElement>;

function joinClasses(...classes: Array<string | false | undefined>) {
  return classes.filter(Boolean).join(" ");
}

export function Text({ as = "p", variant = "body", align, truncate = false, children, className = "", ...props }: TextProps) {
  return createElement(as, { ...props, className: joinClasses(styles.text, styles[variant], align && styles[`align${align}`], truncate && styles.truncate, className) }, children);
}

export interface HeadingProps extends HTMLAttributes<HTMLHeadingElement> {
  level?: HeadingLevel;
  visualLevel?: HeadingLevel;
  children?: ReactNode;
}

export function Heading({ level = 2, visualLevel = level, children, className = "", ...props }: HeadingProps) {
  const Component = `h${level}` as const;
  return <Component {...props} className={joinClasses(styles.heading, styles[`heading${visualLevel}`], className)}>{children}</Component>;
}

export interface DisplayProps extends HTMLAttributes<HTMLHeadingElement> {
  level?: HeadingLevel;
  children?: ReactNode;
}

export function Display({ level = 1, children, className = "", ...props }: DisplayProps) {
  return <h1 {...props} className={joinClasses(styles.display, styles[`display${level}`], className)}>{children}</h1>;
}

export interface LeadProps extends HTMLAttributes<HTMLParagraphElement> {
  children?: ReactNode;
}

export function Lead({ children, className = "", ...props }: LeadProps) {
  return <p {...props} className={joinClasses(styles.text, styles.lead, className)}>{children}</p>;
}

export interface BlockquoteProps extends HTMLAttributes<HTMLQuoteElement> {
  cite?: string;
  footer?: ReactNode;
  align?: "start" | "center" | "end";
  children?: ReactNode;
}

export function Blockquote({ cite, footer, align, children, className = "", ...props }: BlockquoteProps) {
  return (
    <figure className={joinClasses(styles.blockquoteFigure, align && styles[`align${align}`])}>
      <blockquote {...props} cite={cite} className={joinClasses(styles.blockquote, className)}>{children}</blockquote>
      {footer !== undefined && <figcaption className={styles.blockquoteFooter}>{footer}{cite && <> — <cite>{cite}</cite></>}</figcaption>}
    </figure>
  );
}

export interface TextListProps extends HTMLAttributes<HTMLOListElement> {
  as?: "ul" | "ol";
  unstyled?: boolean;
  inline?: boolean;
  children?: ReactNode;
}

export function TextList({ as = "ul", unstyled = false, inline = false, children, className = "", ...props }: TextListProps) {
  const Component = as;
  return <Component {...props} className={joinClasses(styles.list, unstyled && styles.unstyled, inline && styles.inlineList, className)}>{children}</Component>;
}

export interface DescriptionListProps extends HTMLAttributes<HTMLDListElement> {
  horizontal?: boolean;
  children?: ReactNode;
}

export function DescriptionList({ horizontal = false, children, className = "", ...props }: DescriptionListProps) {
  return <dl {...props} className={joinClasses(styles.descriptionList, horizontal && styles.horizontal, className)}>{children}</dl>;
}

export function DescriptionTerm({ children, className = "", ...props }: HTMLAttributes<HTMLElement>) {
  return <dt {...props} className={joinClasses(styles.term, className)}>{children}</dt>;
}

export function DescriptionDetails({ children, className = "", ...props }: HTMLAttributes<HTMLElement>) {
  return <dd {...props} className={joinClasses(styles.details, className)}>{children}</dd>;
}
