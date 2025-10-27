/* eslint-disable @next/next/no-img-element */
"use client";

import { useState, useEffect } from "react";

interface AutoCarouselProps {
  className?: string;
}

const slides = [
  { image: "/carousel/img1.jpg" },
  { image: "/carousel/img2.jpg" },
  { image: "/carousel/img3.jpg" },
  { image: "/carousel/img4.jpg" },
  { image: "/carousel/img5.jpg" },
  { image: "/carousel/img6.jpg" },
  { image: "/carousel/img7.jpg" },
  { image: "/carousel/img8.jpg" },
];

export function HeroCarousel({ className = "" }: AutoCarouselProps) {
  const [currentSlide, setCurrentSlide] = useState(0);
  const interval = 4000;

  useEffect(() => {
    if (slides.length <= 1) return;

    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length);
    }, interval);

    return () => clearInterval(timer);
  }, [interval]);

  if (!slides.length) return null;

  return (
    <div
      className={`relative w-full md:w-5/6 h-[250px] sm:h-[350px] md:h-[490px] overflow-hidden ${className}`}
    >
      {slides.map((slide, index) => (
        <div
          key={index++}
          className={`absolute inset-0 transition-opacity duration-1000 ease-in-out ${
            index === currentSlide ? "opacity-100" : "opacity-0"
          }`}
        >
          <div className="relative w-full h-full bg-slate-800">
            <img
              src={slide.image || "/placeholder.svg"}
              alt={slide.image || `Slide ${index++}`}
              className="object-cover"
            />
          </div>
        </div>
      ))}
    </div>
  );
}
