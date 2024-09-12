import React, { useState } from 'react';
import './Carousel.css'; // Import the CSS

// Importing images
import image1 from '../components/assets/comp_3step.jpg';
import image2 from '../components/assets/comp_50lac.jpg';
import image3 from '../components/assets/comp_cod.jpg';

const images = [image1, image2, image3];

const CarouselComponent = () => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const handleNext = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length);
  };

  const handlePrev = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === 0 ? images.length - 1 : prevIndex - 1
    );
  };

  return (
    <div className="carousel-container">
      {/* Left Arrow */}
      <div className="arrow prev" onClick={handlePrev}>
        ⬅
      </div>

      {/* Carousel Images */}
      <div className="carousel-images">
        {/* Left Image - Half visible */}
        <div className="image-container left-image">
          <img
            src={images[(currentIndex - 1 + images.length) % images.length]}
            alt="left image"
            className="carousel-image"
          />
        </div>

        {/* Center Image - Fully visible */}
        <div className="image-container center-image">
          <img
            src={images[currentIndex]}
            alt="center image"
            className="carousel-image"
          />
        </div>

        {/* Right Image - Half visible */}
        <div className="image-container right-image">
          <img
            src={images[(currentIndex + 1) % images.length]}
            alt="right image"
            className="carousel-image"
          />
        </div>
      </div>

      {/* Right Arrow */}
      <div className="arrow next" onClick={handleNext}>
        ➡
      </div>
    </div>
  );
};

export default CarouselComponent;
