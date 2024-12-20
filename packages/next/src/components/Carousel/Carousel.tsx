import React, { useState } from 'react';
import classes from './Carousel.module.css';

interface CarouselProps {
  slides: string[];
}

const Carousel: React.FC<CarouselProps> = ({ slides }) => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const nextSlide = () => {
    setCurrentIndex((prevIndex) => (prevIndex === slides.length - 1 ? 0 : prevIndex + 1));
  };

  const prevSlide = () => {
    setCurrentIndex((prevIndex) => (prevIndex === 0 ? slides.length - 1 : prevIndex - 1));
  };

  return (
    <div className={classes.carousel}>
      <button className={classes.prev} onClick={prevSlide}>
        ❮
      </button>
      <div
        className={classes.carouselContent}
        style={{
          transform: `translateX(-${currentIndex * 100}%)`,
        }}
      >
        {slides.map((slide, index) => (
          <img key={index} src={slide} alt={`Slide ${index + 1}`} className={classes.slide} />
        ))}
      </div>
      <button className={classes.next} onClick={nextSlide}>
        ❯
      </button>
    </div>
  );
};

export default Carousel;
