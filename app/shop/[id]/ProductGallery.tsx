"use client";

import { useState } from "react";

type ProductGalleryProps = {
  images: string[];
  productName: string;
  availability: string;
};

export default function ProductGallery({
  images,
  productName,
  availability,
}: ProductGalleryProps) {
  const [currentImage, setCurrentImage] = useState(0);

  const showPrevious = () => {
    setCurrentImage((prev) =>
      prev === 0 ? images.length - 1 : prev - 1
    );
  };

  const showNext = () => {
    setCurrentImage((prev) =>
      prev === images.length - 1 ? 0 : prev + 1
    );
  };

  const selectImage = (index: number) => {
    setCurrentImage(index);
  };

  return (
    <>
      {/* Main image */}
      <div className="main-product-view">

        <div className="image-light"></div>

        <img
          id="mainProductImage"
          src={images[currentImage]}
          alt={productName}
          className="main-product-image"
        />

        {/* Availability */}
        <div className="image-availability">
          <span></span>
          {availability}
        </div>

        {/* Previous Button */}
        <button
          className="viewer-arrow viewer-prev"
          onClick={showPrevious}
          aria-label="Previous product angle"
        >
          ←
        </button>

        {/* Next Button */}
        <button
          className="viewer-arrow viewer-next"
          onClick={showNext}
          aria-label="Next product angle"
        >
          →
        </button>

        {/* 360 Indicator */}
        <div className="viewer-360">
          <div className="rotate-icon">↻</div>

          <div>
            <strong>360° VIEW</strong>
            <small>Click arrows to explore</small>
          </div>
        </div>

        {/* Image Number */}
        <div className="image-number">
          <strong>
            {String(currentImage + 1).padStart(2, "0")}
          </strong>

          <span>/</span>

          <span>
            {String(images.length).padStart(2, "0")}
          </span>
        </div>

      </div>


      {/* Thumbnails */}
      <div className="product-thumbnails">

        {images.map((image, index) => (
          <button
            key={index}
            className={`product-thumbnail ${
              index === currentImage ? "active" : ""
            }`}
            onClick={() => selectImage(index)}
            aria-label={`View angle ${index + 1}`}
          >
            <img
              src={image}
              alt={`${productName} angle ${index + 1}`}
            />
            <span>
              {String(index + 1).padStart(2, "0")}
            </span>

          </button>
        ))}

      </div>
    </>
  );
}