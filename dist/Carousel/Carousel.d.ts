import { type HTMLAttributes, type ReactNode } from 'react';
export interface CarouselSlide {
    id?: string;
    content: ReactNode;
    caption?: ReactNode;
    label?: string;
}
export interface CarouselProps extends Omit<HTMLAttributes<HTMLDivElement>, 'defaultValue'> {
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
export declare function Carousel({ slides, activeIndex, defaultActiveIndex, onSlideChange, showControls, showIndicators, interval, pauseOnHover, wrap, dark, transitionDuration, className, style, 'aria-label': ariaLabel, onMouseEnter, onMouseLeave, ...props }: CarouselProps): import("react").JSX.Element;
