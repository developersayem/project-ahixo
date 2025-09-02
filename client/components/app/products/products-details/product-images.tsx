"use client";

import type React from "react";

import { useState } from "react";
import Image from "next/image";
import type { Product } from "@/app/data/products";

interface ProductImagesProps {
  product: Product;
}

export function ProductImages({ product }: ProductImagesProps) {
  const [selectedImage, setSelectedImage] = useState(0);
  const [isHovered, setIsHovered] = useState(false);
  const [backgroundPosition, setBackgroundPosition] = useState("center");

  const images =
    product.images && product.images.length > 0
      ? product.images
      : [product.image];

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    const { left, top, width, height } =
      e.currentTarget.getBoundingClientRect();
    const x = ((e.pageX - left) / width) * 100;
    const y = ((e.pageY - top) / height) * 100;
    setBackgroundPosition(`${x}% ${y}%`);
  };

  return (
    <div className="space-y-4">
      {/* Main Zoomable Image */}
      <div
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => {
          setIsHovered(false);
          setBackgroundPosition("center");
        }}
        onMouseMove={handleMouseMove}
        className="aspect-square bg-gray-100 overflow-hidden relative cursor-zoom-in"
        style={{
          backgroundImage: isHovered ? `url(${images[selectedImage]})` : "none",
          backgroundRepeat: "no-repeat",
          backgroundPosition: backgroundPosition,
          backgroundSize: isHovered ? "150%" : "100%",
          transition: "background-size 0.3s ease",
        }}
      >
        <Image
          src={images[selectedImage] || "/placeholder.svg"}
          alt={product.name}
          width={500}
          height={500}
          className={`w-full h-full object-cover transition-opacity duration-300 ${
            isHovered ? "opacity-0" : "opacity-100"
          }`}
        />
      </div>

      {/* Thumbnails */}
      <div className="flex gap-2">
        {images.map((image, index) => (
          <button
            key={index}
            onClick={() => setSelectedImage(index)}
            className={`w-16 h-16 overflow-hidden border-2 ${
              selectedImage === index ? "border-brand-500" : "border-gray-200"
            }`}
          >
            <Image
              src={image || "/placeholder.svg"}
              alt={`${product.name} ${index + 1}`}
              width={64}
              height={64}
              className="w-full h-full object-cover"
            />
          </button>
        ))}
      </div>
    </div>
  );
}
