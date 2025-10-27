/* eslint-disable @next/next/no-img-element */
"use client";

import { useState } from "react";
import { IProduct } from "@/types/product-type";

interface ImagesProps {
  product: IProduct;
}

export function Images({ product }: ImagesProps) {
  const [selectedImage, setSelectedImage] = useState(0);

  // Ensure it's always a string[]
  const images: string[] =
    product.images && product.images.length > 0
      ? product.images
      : ["/placeholder.svg"];

  return (
    <div className="space-y-4 md:w-5/8">
      {/* Main Image */}
      <div className="aspect-square bg-gray-100 overflow-hidden relative">
        <img
          src={images[selectedImage]}
          alt={product.title}
          width={500}
          height={500}
          className="w-full h-full object-cover"
        />
      </div>

      {/* Thumbnails */}
      <div className="flex gap-2 justify-center">
        {images.map((image, index) => (
          <button
            key={index}
            type="button"
            onClick={() => setSelectedImage(index)}
            className={`w-16 h-16 overflow-hidden border-2 ${
              selectedImage === index ? "border-brand-500" : "border-gray-200"
            }`}
          >
            <img
              src={image}
              alt={`${product.title} ${index + 1}`}
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
