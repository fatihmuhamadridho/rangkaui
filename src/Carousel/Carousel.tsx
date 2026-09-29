import { useEffect, useState, type CSSProperties, type HTMLAttributes, type ReactNode } from "react";

import styles from "./Carousel.module.css";

export interface CarouselSlide {
  id?: string;
  content: ReactNode;
  caption?: ReactNode;
  label?: string;
}

export interface CarouselProps extends Omit<HTMLAttributes<HTMLDivElement>, "defaultValue"> {
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

function Arrow({ direction }: { direction: "previous" | "next" }) {
  return (
    <svg aria-hidden="true" viewBox="0 0 16 16" className={styles.arrow}>
      <path
        d={direction === "previous" ? "m10 2-6 6 6 6" : "m6 2 6 6-6 6"}
        fill="none"
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="1.5"
      />
    </svg>
  );
}

export function Carousel({
  slides,
  activeIndex,
  defaultActiveIndex = 0,
  onSlideChange,
  showControls = true,
  showIndicators = true,
  interval = false,
  pauseOnHover = true,
  wrap = true,
  dark = false,
  transitionDuration = 600,
  className = "",
  style,
  "aria-label": ariaLabel = "Carousel",
  onMouseEnter,
  onMouseLeave,
  ...props
}: CarouselProps) {
  const [internalIndex, setInternalIndex] = useState(defaultActiveIndex);
  const [paused, setPaused] = useState(false);
  const isControlled = activeIndex !== undefined;
  const requestedIndex = isControlled ? activeIndex : internalIndex;
  const currentIndex = slides.length ? Math.min(Math.max(requestedIndex, 0), slides.length - 1) : 0;

  const goTo = (nextIndex: number) => {
    if (!slides.length) return;
    const boundedIndex = wrap
      ? (nextIndex + slides.length) % slides.length
      : Math.min(Math.max(nextIndex, 0), slides.length - 1);
    if (boundedIndex === currentIndex) return;
    if (!isControlled) setInternalIndex(boundedIndex);
    onSlideChange?.(boundedIndex);
  };

  useEffect(() => {
    if (!interval || interval <= 0 || paused || slides.length < 2) return;
    const timer = window.setInterval(() => goTo(currentIndex + 1), interval);
    return () => window.clearInterval(timer);
  }, [interval, paused, currentIndex, slides.length, wrap, isControlled, onSlideChange]);

  const carouselStyle = {
    ...style,
    "--carousel-duration": `${Math.max(0, transitionDuration)}ms`,
  } as CSSProperties;

  return (
    <div
      className={[styles.carousel, dark && styles.dark, className].filter(Boolean).join(" ")}
      role="region"
      aria-roledescription="carousel"
      aria-label={ariaLabel}
      style={carouselStyle}
      onMouseEnter={(event) => {
        if (pauseOnHover) setPaused(true);
        onMouseEnter?.(event);
      }}
      onMouseLeave={(event) => {
        setPaused(false);
        onMouseLeave?.(event);
      }}
      {...props}
    >
      <div className={styles.viewport}>
        <div className={styles.track} style={{ transform: `translateX(-${currentIndex * 100}%)` }}>
          {slides.map((slide, index) => {
            const isActive = index === currentIndex;
            return (
              <div
                key={slide.id ?? index}
                className={styles.slide}
                role="group"
                aria-roledescription="slide"
                aria-label={slide.label ?? `${index + 1} of ${slides.length}`}
                aria-hidden={!isActive}
                inert={!isActive}
              >
                <div className={styles.content}>{slide.content}</div>
                {slide.caption && <div className={styles.caption}>{slide.caption}</div>}
              </div>
            );
          })}
        </div>
      </div>

      {showControls && slides.length > 1 && (
        <>
          <button
            type="button"
            className={[styles.control, styles.previous].join(" ")}
            aria-label="Previous slide"
            disabled={!wrap && currentIndex === 0}
            onClick={() => goTo(currentIndex - 1)}
          >
            <Arrow direction="previous" />
          </button>
          <button
            type="button"
            className={[styles.control, styles.next].join(" ")}
            aria-label="Next slide"
            disabled={!wrap && currentIndex === slides.length - 1}
            onClick={() => goTo(currentIndex + 1)}
          >
            <Arrow direction="next" />
          </button>
        </>
      )}

      {showIndicators && slides.length > 1 && (
        <div className={styles.indicators} role="group" aria-label="Choose slide">
          {slides.map((slide, index) => (
            <button
              key={slide.id ?? index}
              type="button"
              className={[styles.indicator, index === currentIndex && styles.indicatorActive].filter(Boolean).join(" ")}
              aria-label={`Go to slide ${index + 1}`}
              aria-current={index === currentIndex ? "true" : undefined}
              onClick={() => goTo(index)}
            />
          ))}
        </div>
      )}
    </div>
  );
}
