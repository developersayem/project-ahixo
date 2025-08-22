"use client";

import { useState, useEffect } from "react";
import Image from "next/image";

interface AutoCarouselProps {
  className?: string;
}

const slides = [
  {
    id: 1,
    image:
      "https://demo.activeitzone.com/ecommerce_repo/public/uploads/all/sY9upW7zlKDDx3CTxnE3h1uv89fbPU9JBGbbnjF2.webp",
  },
  {
    id: 2,
    image:
      "https://demo.activeitzone.com/ecommerce_repo/public/uploads/all/dbZvNvIJbghWindaOQxhrM0isq5twF9cRX0RBmJA.webp",
  },
  {
    id: 3,
    image:
      "https://demo.activeitzone.com/ecommerce_repo/public/uploads/all/f9Ja3KaY5iDcYDen8vTvorlP926Y8JCKt4LSzLeF.webp",
  },
  {
    id: 4,
    image:
      "https://demo.activeitzone.com/ecommerce_repo/public/uploads/all/K11jEaa22um8nGJD5niqHNNTHYZtV0iGLng26x2Y.webp",
  },
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
          key={slide.id}
          className={`absolute inset-0 transition-opacity duration-1000 ease-in-out ${
            index === currentSlide ? "opacity-100" : "opacity-0"
          }`}
        >
          <div className="relative w-full h-full bg-slate-800">
            <Image
              src={slide.image || "/placeholder.svg"}
              alt={`Slide ${slide.id}`}
              fill
              className="object-cover"
              priority={index === 0}
            />
          </div>
        </div>
      ))}
    </div>
  );
}
