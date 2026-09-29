import * as react from 'react';
import { ButtonHTMLAttributes, ReactNode, HTMLAttributes, ImgHTMLAttributes, AnchorHTMLAttributes, MouseEventHandler, InputHTMLAttributes, SelectHTMLAttributes, ElementType } from 'react';

type ButtonVariant = "standard" | "primary" | "secondary" | "base" | "outline-primary" | "outline-secondary" | "link" | "success" | "danger" | "warning" | "info" | "light" | "dark" | "outline-success" | "outline-danger" | "outline-warning" | "outline-info" | "outline-light" | "outline-dark";
type ButtonSize = "small" | "medium" | "large";
interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
    variant?: ButtonVariant;
    size?: ButtonSize;
    iconOnly?: boolean;
    children?: ReactNode;
}
declare function Button({ variant, size, iconOnly, className, type, children, ...props }: ButtonProps): react.JSX.Element;

interface BoxProps extends HTMLAttributes<HTMLDivElement> {
    children?: ReactNode;
    padded?: boolean;
    bordered?: boolean;
    rounded?: boolean;
    shadow?: boolean;
}
declare function Box({ children, className, padded, bordered, rounded, shadow, ...props }: BoxProps): react.JSX.Element;

interface PaginationProps {
    currentPage: number;
    totalItems: number;
    pageSize: number;
    onPageChange: (page: number) => void;
    onPageSizeChange: (pageSize: number) => void;
    pageSizeOptions?: number[];
    className?: string;
}
declare function Pagination({ currentPage, totalItems, pageSize, onPageChange, onPageSizeChange, pageSizeOptions, className, }: PaginationProps): react.JSX.Element;

type AlertVariant = "primary" | "secondary" | "success" | "danger" | "warning" | "info" | "light" | "dark";
interface AlertProps extends Omit<HTMLAttributes<HTMLDivElement>, "title"> {
    variant?: AlertVariant;
    dismissible?: boolean;
    onClose?: () => void;
    icon?: ReactNode;
    title?: ReactNode;
    children?: ReactNode;
}
declare function Alert({ variant, dismissible, onClose, icon, title, children, className, role, ...props }: AlertProps): react.JSX.Element | null;

type DividerOrientation = "horizontal" | "vertical";
type DividerStyle = "solid" | "dashed";
type DividerAlign = "left" | "center" | "right";
interface DividerProps extends HTMLAttributes<HTMLDivElement> {
    orientation?: DividerOrientation;
    variant?: DividerStyle;
    align?: DividerAlign;
    children?: ReactNode;
}
declare function Divider({ orientation, variant, align, children, className, ...props }: DividerProps): react.JSX.Element;

type BadgeVariant = "primary" | "secondary" | "success" | "danger" | "warning" | "info" | "light" | "dark";
type BadgePosition = "top-start" | "top-end" | "bottom-start" | "bottom-end";
interface BadgeProps extends HTMLAttributes<HTMLSpanElement> {
    variant?: BadgeVariant;
    pill?: boolean;
    position?: BadgePosition;
    dot?: boolean;
    children?: ReactNode;
}
declare function Badge({ variant, pill, position, dot, className, children, "aria-label": ariaLabel, ...props }: BadgeProps): react.JSX.Element;

interface AccordionItemData {
    id: string;
    title: ReactNode;
    content: ReactNode;
    disabled?: boolean;
}
interface AccordionProps extends HTMLAttributes<HTMLDivElement> {
    items: AccordionItemData[];
    defaultOpen?: string | string[];
    openItems?: string[];
    onOpenItemsChange?: (openItems: string[]) => void;
    allowMultiple?: boolean;
    flush?: boolean;
    headingLevel?: 2 | 3 | 4 | 5 | 6;
}
declare function Accordion({ items, defaultOpen, openItems, onOpenItemsChange, allowMultiple, flush, headingLevel, className, ...props }: AccordionProps): react.JSX.Element;

interface BreadcrumbItemData {
    label: ReactNode;
    href?: string;
    id?: string;
}
interface BreadcrumbProps extends HTMLAttributes<HTMLElement> {
    items: BreadcrumbItemData[];
    divider?: string;
}
declare function Breadcrumb({ items, divider, className, "aria-label": ariaLabel, style, ...props }: BreadcrumbProps): react.JSX.Element;

type ButtonGroupOrientation = "horizontal" | "vertical";
type ButtonGroupSize = "small" | "medium" | "large";
interface ButtonGroupProps extends HTMLAttributes<HTMLDivElement> {
    children?: ReactNode;
    orientation?: ButtonGroupOrientation;
    size?: ButtonGroupSize;
}
interface ButtonToolbarProps extends HTMLAttributes<HTMLDivElement> {
    children?: ReactNode;
}
interface ButtonGroupToggleOption {
    value: string;
    label: ReactNode;
    disabled?: boolean;
}
interface ButtonGroupToggleProps extends Omit<HTMLAttributes<HTMLDivElement>, "defaultValue"> {
    options: ButtonGroupToggleOption[];
    type: "checkbox" | "radio";
    name?: string;
    value?: string[];
    defaultValue?: string[];
    onValueChange?: (value: string[]) => void;
}
declare function ButtonGroup({ children, orientation, size, className, role, "aria-label": ariaLabel, ...props }: ButtonGroupProps): react.JSX.Element;
declare function ButtonToolbar({ children, className, role, "aria-label": ariaLabel, ...props }: ButtonToolbarProps): react.JSX.Element;
declare function ButtonGroupToggle({ options, type, name, value, defaultValue, onValueChange, className, "aria-label": ariaLabel, ...props }: ButtonGroupToggleProps): react.JSX.Element;

type CardVariant = "primary" | "secondary" | "success" | "danger" | "warning" | "info" | "light" | "dark";
type CardGroupLayout = "group" | "grid";
interface CardProps extends HTMLAttributes<HTMLDivElement> {
    variant?: CardVariant;
    outline?: boolean;
    shadow?: boolean;
    horizontal?: boolean;
    children?: ReactNode;
}
interface CardSectionProps extends HTMLAttributes<HTMLDivElement> {
    children?: ReactNode;
}
interface CardHeadingProps extends HTMLAttributes<HTMLHeadingElement> {
    as?: "h1" | "h2" | "h3" | "h4" | "h5" | "h6";
    children?: ReactNode;
}
interface CardImageProps extends ImgHTMLAttributes<HTMLImageElement> {
    placement?: "top" | "bottom";
}
interface CardGroupProps extends HTMLAttributes<HTMLDivElement> {
    layout?: CardGroupLayout;
    columns?: number;
    children?: ReactNode;
}
declare function Card({ variant, outline, shadow, horizontal, className, children, ...props }: CardProps): react.JSX.Element;
declare function CardHeader({ children, className, ...props }: CardSectionProps): react.JSX.Element;
declare function CardBody({ children, className, ...props }: CardSectionProps): react.JSX.Element;
declare function CardFooter({ children, className, ...props }: CardSectionProps): react.JSX.Element;
declare function CardTitle({ as: Heading, children, className, ...props }: CardHeadingProps): react.JSX.Element;
declare function CardSubtitle({ as: Heading, children, className, ...props }: CardHeadingProps): react.JSX.Element;
declare function CardText({ children, className, ...props }: HTMLAttributes<HTMLParagraphElement>): react.JSX.Element;
declare function CardLink({ children, className, ...props }: AnchorHTMLAttributes<HTMLAnchorElement>): react.JSX.Element;
declare function CardImage({ placement, className, ...props }: CardImageProps): react.JSX.Element;
declare function CardImageOverlay({ children, className, ...props }: CardSectionProps): react.JSX.Element;
declare function CardListGroup({ children, className, ...props }: HTMLAttributes<HTMLUListElement>): react.JSX.Element;
declare function CardListGroupItem({ children, className, ...props }: HTMLAttributes<HTMLLIElement>): react.JSX.Element;
declare function CardGroup({ layout, columns, children, className, style, ...props }: CardGroupProps): react.JSX.Element;

interface CarouselSlide {
    id?: string;
    content: ReactNode;
    caption?: ReactNode;
    label?: string;
}
interface CarouselProps extends Omit<HTMLAttributes<HTMLDivElement>, "defaultValue"> {
    slides: CarouselSlide[];
    activeIndex?: number;
    defaultActiveIndex?: number;
    onSlideChange?: (index: number) => void;
    showControls?: boolean;
    showIndicators?: boolean;
    interval?: number | false;
    pauseOnHover?: boolean;
    wrap?: boolean;
    dark?: boolean;
    transitionDuration?: number;
}
declare function Carousel({ slides, activeIndex, defaultActiveIndex, onSlideChange, showControls, showIndicators, interval, pauseOnHover, wrap, dark, transitionDuration, className, style, "aria-label": ariaLabel, onMouseEnter, onMouseLeave, ...props }: CarouselProps): react.JSX.Element;

interface CollapseProps extends HTMLAttributes<HTMLDivElement> {
    open?: boolean;
    defaultOpen?: boolean;
    onOpenChange?: (open: boolean) => void;
    horizontal?: boolean;
    panelId?: string;
    children?: ReactNode;
}
interface CollapseTriggerProps extends ButtonHTMLAttributes<HTMLButtonElement> {
    children?: ReactNode;
}
interface CollapsePanelProps extends HTMLAttributes<HTMLDivElement> {
    children?: ReactNode;
}
declare function Collapse({ open, defaultOpen, onOpenChange, horizontal, panelId, children, className, ...props }: CollapseProps): react.JSX.Element;
declare function CollapseTrigger({ children, className, type, onClick, ...props }: CollapseTriggerProps): react.JSX.Element;
declare function CollapsePanel({ children, className, ...props }: CollapsePanelProps): react.JSX.Element;

type DropdownPlacement = "bottom-start" | "bottom-end" | "top-start" | "top-end";
type DropdownAutoClose = boolean | "inside" | "outside";
type DropdownVariant = "primary" | "secondary" | "success" | "danger" | "warning" | "info" | "light" | "dark";
interface DropdownProps extends HTMLAttributes<HTMLDivElement> {
    open?: boolean;
    defaultOpen?: boolean;
    onOpenChange?: (open: boolean) => void;
    placement?: DropdownPlacement;
    autoClose?: DropdownAutoClose;
    dark?: boolean;
    split?: boolean;
}
interface DropdownToggleProps extends ButtonHTMLAttributes<HTMLButtonElement> {
    split?: boolean;
    variant?: DropdownVariant;
    children?: ReactNode;
}
interface DropdownMenuProps extends HTMLAttributes<HTMLDivElement> {
    align?: "start" | "end";
    dark?: boolean;
    children?: ReactNode;
}
interface DropdownItemBaseProps {
    active?: boolean;
    disabled?: boolean;
    onSelect?: () => void;
    children?: ReactNode;
    className?: string;
    onClick?: MouseEventHandler<HTMLElement>;
}
type DropdownItemProps = DropdownItemBaseProps & (({
    href: string;
} & Omit<AnchorHTMLAttributes<HTMLAnchorElement>, keyof DropdownItemBaseProps | "href" | "onClick">) | ({
    href?: undefined;
} & Omit<ButtonHTMLAttributes<HTMLButtonElement>, keyof DropdownItemBaseProps | "href" | "onClick">));
declare function Dropdown({ open, defaultOpen, onOpenChange, placement, autoClose, dark, split, children, className, onKeyDown, ...props }: DropdownProps): react.JSX.Element;
declare function DropdownToggle({ split, variant, children, className, type, onClick, ...props }: DropdownToggleProps): react.JSX.Element;
declare function DropdownMenu({ align, dark, children, className, onClick, ...props }: DropdownMenuProps): react.JSX.Element;
declare function DropdownItem({ href, active, disabled, onSelect, onClick, children, className, ...props }: DropdownItemProps): react.JSX.Element;
declare function DropdownHeader({ children, className, ...props }: HTMLAttributes<HTMLDivElement>): react.JSX.Element;
declare function DropdownDivider({ className, ...props }: HTMLAttributes<HTMLHRElement>): react.JSX.Element;

type ListGroupElement = "div" | "ul" | "ol";
type ListGroupVariant = "primary" | "secondary" | "success" | "danger" | "warning" | "info" | "light" | "dark";
interface ListGroupProps extends HTMLAttributes<HTMLElement> {
    as?: ListGroupElement;
    flush?: boolean;
    horizontal?: boolean;
    numbered?: boolean;
    children?: ReactNode;
}
interface ListGroupItemProps extends HTMLAttributes<HTMLElement> {
    href?: string;
    target?: string;
    rel?: string;
    button?: boolean;
    active?: boolean;
    disabled?: boolean;
    action?: boolean;
    variant?: ListGroupVariant;
    badge?: ReactNode;
    children?: ReactNode;
}
declare function ListGroup({ as: Element, flush, horizontal, numbered, children, className, ...props }: ListGroupProps): react.JSX.Element;
declare function ListGroupItem({ href, target, rel, button, active, disabled, action, variant, badge, children, className, onClick, ...props }: ListGroupItemProps): react.JSX.Element;

type ModalSize = "sm" | "md" | "lg" | "xl" | "fullscreen";
interface ModalProps {
    open?: boolean;
    defaultOpen?: boolean;
    onOpenChange?: (open: boolean) => void;
    closeOnEscape?: boolean;
    closeOnBackdrop?: boolean;
    children?: ReactNode;
}
interface ModalTriggerProps extends ButtonHTMLAttributes<HTMLButtonElement> {
    children?: ReactNode;
}
interface ModalCloseProps extends ModalTriggerProps {
    variant?: "primary" | "secondary";
}
interface ModalContentProps extends HTMLAttributes<HTMLDivElement> {
    size?: ModalSize;
    centered?: boolean;
    scrollable?: boolean;
    showCloseButton?: boolean;
    children?: ReactNode;
}
interface ModalSectionProps extends HTMLAttributes<HTMLDivElement> {
    children?: ReactNode;
}
interface ModalTitleProps extends HTMLAttributes<HTMLHeadingElement> {
    as?: "h1" | "h2" | "h3" | "h4" | "h5" | "h6";
    children?: ReactNode;
}
interface ModalDescriptionProps extends HTMLAttributes<HTMLParagraphElement> {
    children?: ReactNode;
}
declare function Modal({ open, defaultOpen, onOpenChange, closeOnEscape, closeOnBackdrop, children, }: ModalProps): react.JSX.Element;
declare function ModalTrigger({ children, className, type, onClick, ...props }: ModalTriggerProps): react.JSX.Element;
declare function ModalContent({ size, centered, scrollable, showCloseButton, children, className, onKeyDown, onMouseDown, "aria-label": ariaLabel, ...props }: ModalContentProps): react.ReactPortal | null;
declare function ModalHeader({ children, className, ...props }: ModalSectionProps): react.JSX.Element;
declare function ModalTitle({ as: Heading, children, className, ...props }: ModalTitleProps): react.JSX.Element;
declare function ModalDescription({ children, className, ...props }: ModalDescriptionProps): react.JSX.Element;
declare function ModalBody({ children, className, ...props }: ModalSectionProps): react.JSX.Element;
declare function ModalFooter({ children, className, ...props }: ModalSectionProps): react.JSX.Element;
declare function ModalClose({ children, variant, className, type, onClick, ...props }: ModalCloseProps): react.JSX.Element;

type NavbarExpand = "sm" | "md" | "lg" | "xl" | "xxl" | "never";
type NavbarTheme = "light" | "dark" | "primary" | "secondary" | "success" | "danger" | "warning" | "info" | "transparent";
type NavbarPosition = "static" | "fixed-top" | "fixed-bottom" | "sticky-top";
interface NavbarProps extends HTMLAttributes<HTMLElement> {
    expand?: NavbarExpand;
    theme?: NavbarTheme;
    position?: NavbarPosition;
    defaultExpanded?: boolean;
    expanded?: boolean;
    onExpandedChange?: (expanded: boolean) => void;
    children?: ReactNode;
}
interface NavbarToggleProps extends ButtonHTMLAttributes<HTMLButtonElement> {
    children?: ReactNode;
}
interface NavbarCollapseProps extends HTMLAttributes<HTMLDivElement> {
    children?: ReactNode;
}
interface NavbarNavProps extends HTMLAttributes<HTMLUListElement> {
    align?: "start" | "center" | "end";
    children?: ReactNode;
}
interface NavbarContainerProps extends HTMLAttributes<HTMLDivElement> {
    fluid?: boolean;
    children?: ReactNode;
}
interface NavbarLinkProps extends AnchorHTMLAttributes<HTMLAnchorElement> {
    active?: boolean;
    disabled?: boolean;
    children?: ReactNode;
}
declare function Navbar({ expand, theme, position, defaultExpanded, expanded, onExpandedChange, children, className, "aria-label": ariaLabel, ...props }: NavbarProps): react.JSX.Element;
declare function NavbarBrand({ children, className, ...props }: AnchorHTMLAttributes<HTMLAnchorElement>): react.JSX.Element;
declare function NavbarToggle({ children, className, type, onClick, ...props }: NavbarToggleProps): react.JSX.Element;
declare function NavbarCollapse({ children, className, ...props }: NavbarCollapseProps): react.JSX.Element;
declare function NavbarNav({ align, children, className, ...props }: NavbarNavProps): react.JSX.Element;
declare function NavbarItem({ children, className, ...props }: HTMLAttributes<HTMLLIElement>): react.JSX.Element;
declare function NavbarLink({ active, disabled, children, className, onClick, ...props }: NavbarLinkProps): react.JSX.Element;
declare function NavbarText({ children, className, ...props }: HTMLAttributes<HTMLSpanElement>): react.JSX.Element;
declare function NavbarContainer({ fluid, children, className, ...props }: NavbarContainerProps): react.JSX.Element;

type NavsTabsVariant = "tabs" | "pills" | "underline" | "plain";
type NavsTabsOrientation = "horizontal" | "vertical";
interface NavsTabsProps extends Omit<HTMLAttributes<HTMLDivElement>, "onChange"> {
    defaultActiveKey?: string;
    activeKey?: string;
    onChange?: (key: string) => void;
    variant?: NavsTabsVariant;
    orientation?: NavsTabsOrientation;
    justified?: boolean;
    fill?: boolean;
    children?: ReactNode;
}
interface NavsTabsListProps extends HTMLAttributes<HTMLDivElement> {
    label?: string;
    children?: ReactNode;
}
interface NavsTabsTabProps extends Omit<AnchorHTMLAttributes<HTMLAnchorElement>, "onChange"> {
    tabKey: string;
    disabled?: boolean;
    children?: ReactNode;
}
interface NavsTabsPanelProps extends HTMLAttributes<HTMLDivElement> {
    tabKey: string;
    children?: ReactNode;
}
declare function NavsTabs({ defaultActiveKey, activeKey, onChange, variant, orientation, justified, fill, children, className, ...props }: NavsTabsProps): react.JSX.Element;
declare function NavsTabsList({ label, children, className, ...props }: NavsTabsListProps): react.JSX.Element;
declare function NavsTabsTab({ tabKey, disabled, children, className, onClick, onFocus, ...props }: NavsTabsTabProps): react.JSX.Element;
declare function NavsTabsPanel({ tabKey, children, className, ...props }: NavsTabsPanelProps): react.JSX.Element;

type SkeletonAnimation = "none" | "glow" | "wave";
type SkeletonSize = "xs" | "sm" | "md" | "lg";
type SkeletonColor = "default" | "primary" | "secondary" | "success" | "danger" | "warning" | "info" | "light" | "dark";
interface SkeletonProps extends HTMLAttributes<HTMLSpanElement> {
    animation?: SkeletonAnimation;
    size?: SkeletonSize;
    color?: SkeletonColor;
    width?: string | number;
    as?: "span" | "div";
    children?: ReactNode;
}
declare function Skeleton({ animation, size, color, width, as: Element, className, style, "aria-hidden": ariaHidden, ...props }: SkeletonProps): react.JSX.Element;

type PopoverPlacement = "top" | "right" | "bottom" | "left";
type PopoverTriggerMode = "click" | "hover" | "focus" | "manual";
interface PopoverProps extends HTMLAttributes<HTMLDivElement> {
    open?: boolean;
    defaultOpen?: boolean;
    onOpenChange?: (open: boolean) => void;
    placement?: PopoverPlacement;
    trigger?: PopoverTriggerMode;
}
interface PopoverTriggerProps extends ButtonHTMLAttributes<HTMLButtonElement> {
    children?: ReactNode;
}
interface PopoverContentProps extends Omit<HTMLAttributes<HTMLDivElement>, "title"> {
    title?: ReactNode;
    children?: ReactNode;
}
declare function Popover({ open, defaultOpen, onOpenChange, placement, trigger, children, className, onKeyDown, ...props }: PopoverProps): react.JSX.Element;
declare function PopoverTrigger({ children, className, type, onClick, onMouseEnter, onMouseLeave, onFocus, onBlur, ...props }: PopoverTriggerProps): react.JSX.Element;
declare function PopoverContent({ title, children, className, onMouseEnter, onMouseLeave, ...props }: PopoverContentProps): react.JSX.Element | null;

type ProgressVariant = "primary" | "secondary" | "success" | "danger" | "warning" | "info";
interface ProgressProps extends Omit<HTMLAttributes<HTMLDivElement>, "children"> {
    value: number;
    min?: number;
    max?: number;
    variant?: ProgressVariant;
    striped?: boolean;
    animated?: boolean;
    label?: ReactNode;
    showValue?: boolean;
    children?: ReactNode;
}
interface ProgressStackProps extends HTMLAttributes<HTMLDivElement> {
    label?: string;
    height?: number | string;
    children?: ReactNode;
}
interface ProgressSegmentProps extends Omit<ProgressProps, "width"> {
}
declare function Progress({ value, min, max, variant, striped, animated, label, showValue, children, className, style, "aria-label": ariaLabel, ...props }: ProgressProps): react.JSX.Element;
declare function ProgressSegment({ value, min, max, variant, striped, animated, label, showValue, children, className, style, "aria-label": ariaLabel, ...props }: ProgressSegmentProps): react.JSX.Element;
declare function ProgressStack({ label, height, children, className, style, ...props }: ProgressStackProps): react.JSX.Element;

type SpinnerVariant = "border" | "grow";
type SpinnerColor = "primary" | "secondary" | "success" | "danger" | "warning" | "info" | "light" | "dark";
type SpinnerSize = "sm" | "md";
interface SpinnerProps extends HTMLAttributes<HTMLSpanElement> {
    variant?: SpinnerVariant;
    color?: SpinnerColor;
    size?: SpinnerSize;
    label?: string;
}
declare function Spinner({ variant, color, size, label, className, ...props }: SpinnerProps): react.JSX.Element;

type ToastVariant = "primary" | "secondary" | "success" | "danger" | "warning" | "info" | "light" | "dark";
type ToastPlacement = "top-start" | "top-center" | "top-end" | "middle-start" | "middle-center" | "middle-end" | "bottom-start" | "bottom-center" | "bottom-end";
interface ToastProps extends Omit<HTMLAttributes<HTMLDivElement>, "title"> {
    title?: ReactNode;
    variant?: ToastVariant;
    autohide?: boolean;
    delay?: number;
    open?: boolean;
    defaultOpen?: boolean;
    onOpenChange?: (open: boolean) => void;
    onClose?: () => void;
    closeButton?: boolean;
    children?: ReactNode;
}
interface ToastContainerProps extends HTMLAttributes<HTMLDivElement> {
    placement?: ToastPlacement;
    stacked?: boolean;
    children?: ReactNode;
}
interface ToastCloseProps extends ButtonHTMLAttributes<HTMLButtonElement> {
    children?: ReactNode;
}
declare function Toast({ title, variant, autohide, delay, open, defaultOpen, onOpenChange, onClose, closeButton, children, className, ...props }: ToastProps): react.JSX.Element | null;
declare function ToastClose({ children, className, onClick, type, ...props }: ToastCloseProps): react.JSX.Element;
declare function ToastContainer({ placement, stacked, children, className, ...props }: ToastContainerProps): react.JSX.Element;

type TooltipPlacement = "top" | "right" | "bottom" | "left";
type TooltipTriggerMode = "hover" | "focus" | "click" | "manual";
interface TooltipProps extends Omit<HTMLAttributes<HTMLDivElement>, "content"> {
    content: ReactNode;
    placement?: TooltipPlacement;
    trigger?: TooltipTriggerMode;
    open?: boolean;
    defaultOpen?: boolean;
    onOpenChange?: (open: boolean) => void;
    interactive?: boolean;
    children?: ReactNode;
}
interface TooltipTriggerProps extends ButtonHTMLAttributes<HTMLButtonElement> {
    children?: ReactNode;
}
interface TooltipLinkProps extends AnchorHTMLAttributes<HTMLAnchorElement> {
    children?: ReactNode;
}
declare function Tooltip({ content, placement, trigger, open, defaultOpen, onOpenChange, interactive, children, className, ...props }: TooltipProps): react.JSX.Element;
declare function TooltipTrigger({ children, className, type, onClick, onMouseEnter, onMouseLeave, onFocus, onBlur, ...props }: TooltipTriggerProps): react.JSX.Element;
declare function TooltipLink({ children, className, onClick, onMouseEnter, onMouseLeave, onFocus, onBlur, ...props }: TooltipLinkProps): react.JSX.Element;

interface RGBAColor {
    r: number;
    g: number;
    b: number;
    a: number;
}
interface ColorPickerProps extends Omit<HTMLAttributes<HTMLDivElement>, "onChange"> {
    value?: string;
    defaultValue?: string;
    onChange?: (color: string, rgba: RGBAColor) => void;
    label?: string;
    disabled?: boolean;
    showAlpha?: boolean;
}
declare function ColorPicker({ value, defaultValue, onChange, label, disabled, showAlpha, className, ...props }: ColorPickerProps): react.JSX.Element;

type DatePickerMode = "date" | "range" | "month" | "year" | "quarter";
type DatePickerTheme = "default" | "primary" | "success" | "danger";
type DateRangeValue = {
    start: string;
    end: string;
};
interface DatePickerProps extends Omit<HTMLAttributes<HTMLDivElement>, "onChange" | "defaultValue"> {
    mode?: DatePickerMode;
    value?: string | DateRangeValue;
    defaultValue?: string | DateRangeValue;
    onChange?: (value: string | DateRangeValue) => void;
    placeholder?: string;
    theme?: DatePickerTheme;
    disabled?: boolean;
    monthsToShow?: 1 | 2;
    showTime?: boolean;
    minDate?: string;
    maxDate?: string;
    weekStartsOn?: 0 | 1;
    closeOnSelect?: boolean;
}
declare function DatePicker({ mode, value, defaultValue, onChange, placeholder, theme, disabled, monthsToShow, showTime, minDate, maxDate, weekStartsOn, closeOnSelect, className, ...props }: DatePickerProps): react.JSX.Element;

type TimePickerTheme = "default" | "primary" | "success" | "danger";
interface TimeRangeValue {
    start: string;
    end: string;
}
interface TimePickerProps extends Omit<HTMLAttributes<HTMLDivElement>, "onChange" | "defaultValue"> {
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
declare function TimePicker({ mode, value, defaultValue, onChange, theme, disabled, useSeconds, hour12, minuteStep, secondStep, placeholder, className, ...props }: TimePickerProps): react.JSX.Element;

type InputGroupSize = "small" | "medium" | "large";
type InputGroupRounding = "default" | "rounded" | "pill";
interface InputGroupProps extends HTMLAttributes<HTMLDivElement> {
    size?: InputGroupSize;
    rounding?: InputGroupRounding;
    wrap?: boolean;
    children?: ReactNode;
}
interface InputGroupTextProps extends HTMLAttributes<HTMLSpanElement> {
    children?: ReactNode;
}
interface InputGroupButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
    variant?: "default" | "primary" | "secondary";
    children?: ReactNode;
}
interface InputGroupInputProps extends InputHTMLAttributes<HTMLInputElement> {
}
interface InputGroupSelectProps extends SelectHTMLAttributes<HTMLSelectElement> {
    children?: ReactNode;
}
interface InputGroupCheckProps extends Omit<InputHTMLAttributes<HTMLInputElement>, "type"> {
    type?: "checkbox" | "radio";
    label?: ReactNode;
}
declare function InputGroup({ size, rounding, wrap, children, className, role, "aria-label": ariaLabel, ...props }: InputGroupProps): react.JSX.Element;
declare function InputGroupText({ children, className, ...props }: InputGroupTextProps): react.JSX.Element;
declare function InputGroupButton({ variant, children, className, type, ...props }: InputGroupButtonProps): react.JSX.Element;
declare function InputGroupInput({ className, ...props }: InputGroupInputProps): react.JSX.Element;
declare function InputGroupSelect({ children, className, ...props }: InputGroupSelectProps): react.JSX.Element;
declare function InputGroupCheck({ type, label, className, ...props }: InputGroupCheckProps): react.JSX.Element;

type InputNumberSize = "small" | "medium" | "large";
interface InputNumberProps extends Omit<InputHTMLAttributes<HTMLInputElement>, "type" | "value" | "defaultValue" | "onChange" | "size" | "prefix"> {
    value?: number | "";
    defaultValue?: number | "";
    onValueChange?: (value: number | null) => void;
    prefix?: ReactNode;
    suffix?: ReactNode;
    clearable?: boolean;
    size?: InputNumberSize;
    wrapperClassName?: string;
}
declare function InputNumber({ value, defaultValue, onValueChange, prefix, suffix, clearable, size, disabled, readOnly, className, wrapperClassName, min, max, step, onBlur, onKeyDown, ...props }: InputNumberProps): react.JSX.Element;

interface SliderProps extends Omit<InputHTMLAttributes<HTMLInputElement>, "type" | "value" | "defaultValue" | "onChange"> {
    value?: number;
    defaultValue?: number;
    onValueChange?: (value: number) => void;
    showValue?: boolean;
    label?: string;
}
declare function Slider({ value, defaultValue, onValueChange, showValue, label, disabled, className, ...props }: SliderProps): react.JSX.Element;

type RateIcon = "star" | "face";
type RateSize = "small" | "medium" | "large";
interface RateProps extends Omit<HTMLAttributes<HTMLDivElement>, "onChange"> {
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
declare function Rate({ value, defaultValue, onChange, count, allowHalf, allowClear, readOnly, disabled, icon, size, label, className, ...props }: RateProps): react.JSX.Element;

type SelectSize = "small" | "medium" | "large";
interface SelectProps extends Omit<SelectHTMLAttributes<HTMLSelectElement>, "size"> {
    size?: SelectSize;
    nativeSize?: number;
    children?: ReactNode;
}
declare function Select({ size, nativeSize, multiple, disabled, className, children, ...props }: SelectProps): react.JSX.Element;

type AvatarSize = "xs" | "sm" | "md" | "lg" | "xl" | number;
type AvatarShape = "circle" | "square";
type AvatarVariant = "neutral" | "primary" | "orange" | "success" | "danger";
type AvatarStatus = "online" | "offline" | "busy" | "away";
interface AvatarProps extends Omit<HTMLAttributes<HTMLSpanElement>, "children"> {
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
interface AvatarGroupProps extends HTMLAttributes<HTMLDivElement> {
    max?: number;
    size?: AvatarSize;
    children?: ReactNode;
}
declare function Avatar({ src, alt, name, initials, size, shape, variant, badge, dot, status, children, imageProps, className, style, ...props }: AvatarProps): react.JSX.Element;
declare function AvatarGroup({ children, max, size, className, ...props }: AvatarGroupProps): react.JSX.Element;

type TagSize = "small" | "medium" | "large";
type TagVariant = "default" | "primary" | "success" | "warning" | "danger";
interface TagProps extends Omit<HTMLAttributes<HTMLSpanElement>, "onRemove"> {
    children?: ReactNode;
    icon?: ReactNode;
    closable?: boolean;
    onClose?: () => void;
    closeButtonProps?: Omit<ButtonHTMLAttributes<HTMLButtonElement>, "onClick" | "children">;
    size?: TagSize;
    variant?: TagVariant;
}
interface TagsProps extends HTMLAttributes<HTMLDivElement> {
    children?: ReactNode;
    gap?: "small" | "medium" | "large";
}
declare function Tag({ children, icon, closable, onClose, closeButtonProps, size, variant, className, ...props }: TagProps): react.JSX.Element;
declare function Tags({ children, gap, className, role, ...props }: TagsProps): react.JSX.Element;

type TextVariant = "body" | "lead" | "small" | "muted" | "bold" | "italic" | "mark" | "deleted" | "inserted" | "subscript" | "superscript" | "code" | "keyboard";
type HeadingLevel = 1 | 2 | 3 | 4 | 5 | 6;
interface TextOwnProps {
    as?: ElementType;
    variant?: TextVariant;
    align?: "start" | "center" | "end";
    truncate?: boolean;
    children?: ReactNode;
}
type TextProps = TextOwnProps & HTMLAttributes<HTMLElement>;
declare function Text({ as, variant, align, truncate, children, className, ...props }: TextProps): react.ReactElement<any, string | react.JSXElementConstructor<any>>;
interface HeadingProps extends HTMLAttributes<HTMLHeadingElement> {
    level?: HeadingLevel;
    visualLevel?: HeadingLevel;
    children?: ReactNode;
}
declare function Heading({ level, visualLevel, children, className, ...props }: HeadingProps): react.JSX.Element;
interface DisplayProps extends HTMLAttributes<HTMLHeadingElement> {
    level?: HeadingLevel;
    children?: ReactNode;
}
declare function Display({ level, children, className, ...props }: DisplayProps): react.JSX.Element;
interface LeadProps extends HTMLAttributes<HTMLParagraphElement> {
    children?: ReactNode;
}
declare function Lead({ children, className, ...props }: LeadProps): react.JSX.Element;
interface BlockquoteProps extends HTMLAttributes<HTMLQuoteElement> {
    cite?: string;
    footer?: ReactNode;
    align?: "start" | "center" | "end";
    children?: ReactNode;
}
declare function Blockquote({ cite, footer, align, children, className, ...props }: BlockquoteProps): react.JSX.Element;
interface TextListProps extends HTMLAttributes<HTMLOListElement> {
    as?: "ul" | "ol";
    unstyled?: boolean;
    inline?: boolean;
    children?: ReactNode;
}
declare function TextList({ as, unstyled, inline, children, className, ...props }: TextListProps): react.JSX.Element;
interface DescriptionListProps extends HTMLAttributes<HTMLDListElement> {
    horizontal?: boolean;
    children?: ReactNode;
}
declare function DescriptionList({ horizontal, children, className, ...props }: DescriptionListProps): react.JSX.Element;
declare function DescriptionTerm({ children, className, ...props }: HTMLAttributes<HTMLElement>): react.JSX.Element;
declare function DescriptionDetails({ children, className, ...props }: HTMLAttributes<HTMLElement>): react.JSX.Element;

export { Accordion, type AccordionItemData, type AccordionProps, Alert, type AlertProps, type AlertVariant, Avatar, AvatarGroup, type AvatarGroupProps, type AvatarProps, type AvatarShape, type AvatarSize, type AvatarStatus, type AvatarVariant, Badge, type BadgePosition, type BadgeProps, type BadgeVariant, Blockquote, type BlockquoteProps, Box, type BoxProps, Breadcrumb, type BreadcrumbItemData, type BreadcrumbProps, Button, ButtonGroup, type ButtonGroupOrientation, type ButtonGroupProps, type ButtonGroupSize, ButtonGroupToggle, type ButtonGroupToggleOption, type ButtonGroupToggleProps, type ButtonProps, type ButtonSize, ButtonToolbar, type ButtonToolbarProps, type ButtonVariant, Card, CardBody, CardFooter, CardGroup, type CardGroupLayout, type CardGroupProps, CardHeader, type CardHeadingProps, CardImage, CardImageOverlay, type CardImageProps, CardLink, CardListGroup, CardListGroupItem, type CardProps, type CardSectionProps, CardSubtitle, CardText, CardTitle, type CardVariant, Carousel, type CarouselProps, type CarouselSlide, Collapse, CollapsePanel, type CollapsePanelProps, type CollapseProps, CollapseTrigger, type CollapseTriggerProps, ColorPicker, type ColorPickerProps, DatePicker, type DatePickerMode, type DatePickerProps, type DatePickerTheme, type DateRangeValue, DescriptionDetails, DescriptionList, type DescriptionListProps, DescriptionTerm, Display, type DisplayProps, Divider, type DividerAlign, type DividerOrientation, type DividerProps, type DividerStyle, Dropdown, type DropdownAutoClose, DropdownDivider, DropdownHeader, DropdownItem, type DropdownItemProps, DropdownMenu, type DropdownMenuProps, type DropdownPlacement, type DropdownProps, DropdownToggle, type DropdownToggleProps, type DropdownVariant, Heading, type HeadingLevel, type HeadingProps, InputGroup, InputGroupButton, type InputGroupButtonProps, InputGroupCheck, type InputGroupCheckProps, InputGroupInput, type InputGroupInputProps, type InputGroupProps, type InputGroupRounding, InputGroupSelect, type InputGroupSelectProps, type InputGroupSize, InputGroupText, type InputGroupTextProps, InputNumber, type InputNumberProps, type InputNumberSize, Lead, type LeadProps, ListGroup, type ListGroupElement, ListGroupItem, type ListGroupItemProps, type ListGroupProps, type ListGroupVariant, Modal, ModalBody, ModalClose, type ModalCloseProps, ModalContent, type ModalContentProps, ModalDescription, type ModalDescriptionProps, ModalFooter, ModalHeader, type ModalProps, type ModalSectionProps, type ModalSize, ModalTitle, type ModalTitleProps, ModalTrigger, type ModalTriggerProps, Navbar, NavbarBrand, NavbarCollapse, type NavbarCollapseProps, NavbarContainer, type NavbarContainerProps, type NavbarExpand, NavbarItem, NavbarLink, type NavbarLinkProps, NavbarNav, type NavbarNavProps, type NavbarPosition, type NavbarProps, NavbarText, type NavbarTheme, NavbarToggle, type NavbarToggleProps, NavsTabs, NavsTabsList, type NavsTabsListProps, type NavsTabsOrientation, NavsTabsPanel, type NavsTabsPanelProps, type NavsTabsProps, NavsTabsTab, type NavsTabsTabProps, type NavsTabsVariant, Pagination, type PaginationProps, Popover, PopoverContent, type PopoverContentProps, type PopoverPlacement, type PopoverProps, PopoverTrigger, type PopoverTriggerMode, type PopoverTriggerProps, Progress, type ProgressProps, ProgressSegment, type ProgressSegmentProps, ProgressStack, type ProgressStackProps, type ProgressVariant, type RGBAColor, Rate, type RateIcon, type RateProps, type RateSize, Select, type SelectProps, type SelectSize, Skeleton, type SkeletonAnimation, type SkeletonColor, type SkeletonProps, type SkeletonSize, Slider, type SliderProps, Spinner, type SpinnerColor, type SpinnerProps, type SpinnerSize, type SpinnerVariant, Tag, type TagProps, type TagSize, type TagVariant, Tags, type TagsProps, Text, TextList, type TextListProps, type TextProps, type TextVariant, TimePicker, type TimePickerProps, type TimePickerTheme, type TimeRangeValue, Toast, ToastClose, type ToastCloseProps, ToastContainer, type ToastContainerProps, type ToastPlacement, type ToastProps, type ToastVariant, Tooltip, TooltipLink, type TooltipLinkProps, type TooltipPlacement, type TooltipProps, TooltipTrigger, type TooltipTriggerMode, type TooltipTriggerProps };
