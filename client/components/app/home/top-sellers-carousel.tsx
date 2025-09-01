/* eslint-disable @next/next/no-img-element */
"use client";

import { useEffect, useRef, useState } from "react";
import { ChevronLeft, ChevronRight, Check } from "lucide-react";
import { Button } from "@/components/ui/button";

interface Seller {
  id: number;
  name: string;
  storeName: string;
  logo: string;
  rating: number;
  reviewCount: number;
  verified: boolean;
}

const sellers: Seller[] = [
  {
    id: 1,
    name: "Lavish Look",
    storeName: "PHILIPS",
    logo: "https://demo.activeitzone.com/ecommerce_repo/public/uploads/all/1RutGcPmMYvLHiatsxAVq9l8XMM3IiuuvGUq20yh.webp",
    rating: 5,
    reviewCount: 4,
    verified: true,
  },
  {
    id: 2,
    name: "Lavish Look",
    storeName: "PHILIPS",
    logo: "https://demo.activeitzone.com/ecommerce_repo/public/uploads/all/1RutGcPmMYvLHiatsxAVq9l8XMM3IiuuvGUq20yh.webp",
    rating: 5,
    reviewCount: 4,
    verified: true,
  },
  {
    id: 3,
    name: "Lavish Look",
    storeName: "PHILIPS",
    logo: "https://demo.activeitzone.com/ecommerce_repo/public/uploads/all/1RutGcPmMYvLHiatsxAVq9l8XMM3IiuuvGUq20yh.webp",
    rating: 5,
    reviewCount: 4,
    verified: true,
  },
  {
    id: 4,
    name: "Lavish Look",
    storeName: "PHILIPS",
    logo: "https://demo.activeitzone.com/ecommerce_repo/public/uploads/all/1RutGcPmMYvLHiatsxAVq9l8XMM3IiuuvGUq20yh.webp",
    rating: 5,
    reviewCount: 4,
    verified: true,
  },
  {
    id: 5,
    name: "Lavish Look",
    storeName: "PHILIPS",
    logo: "https://demo.activeitzone.com/ecommerce_repo/public/uploads/all/1RutGcPmMYvLHiatsxAVq9l8XMM3IiuuvGUq20yh.webp",
    rating: 5,
    reviewCount: 4,
    verified: true,
  },
  {
    id: 6,
    name: "Lavish Look",
    storeName: "PHILIPS",
    logo: "https://demo.activeitzone.com/ecommerce_repo/public/uploads/all/1RutGcPmMYvLHiatsxAVq9l8XMM3IiuuvGUq20yh.webp",
    rating: 5,
    reviewCount: 4,
    verified: true,
  },
  {
    id: 7,
    name: "Lavish Look",
    storeName: "PHILIPS",
    logo: "https://demo.activeitzone.com/ecommerce_repo/public/uploads/all/1RutGcPmMYvLHiatsxAVq9l8XMM3IiuuvGUq20yh.webp",
    rating: 5,
    reviewCount: 4,
    verified: true,
  },
  {
    id: 8,
    name: "Lavish Look",
    storeName: "PHILIPS",
    logo: "https://demo.activeitzone.com/ecommerce_repo/public/uploads/all/1RutGcPmMYvLHiatsxAVq9l8XMM3IiuuvGUq20yh.webp",
    rating: 5,
    reviewCount: 4,
    verified: true,
  },
  {
    id: 9,
    name: "Lavish Look",
    storeName: "PHILIPS",
    logo: "https://demo.activeitzone.com/ecommerce_repo/public/uploads/all/1RutGcPmMYvLHiatsxAVq9l8XMM3IiuuvGUq20yh.webp",
    rating: 5,
    reviewCount: 4,
    verified: true,
  },
  {
    id: 10,
    name: "Lavish Look",
    storeName: "PHILIPS",
    logo: "https://demo.activeitzone.com/ecommerce_repo/public/uploads/all/1RutGcPmMYvLHiatsxAVq9l8XMM3IiuuvGUq20yh.webp",
    rating: 5,
    reviewCount: 4,
    verified: true,
  },
];

export default function TopSellersCarousel() {
  const scrollRef = useRef<HTMLDivElement>(null);

  const [itemsPerView, setItemsPerView] = useState(6);

  // Update items per view based on screen size
  useEffect(() => {
    const updateItemsPerView = () => {
      if (window.innerWidth < 768) {
        setItemsPerView(2); // Mobile: 2 items
      } else if (window.innerWidth < 1024) {
        setItemsPerView(4); // Tablet: 4 items
      } else {
        setItemsPerView(6); // Desktop: 6 items
      }
    };

    updateItemsPerView();
    window.addEventListener("resize", updateItemsPerView);
    return () => window.removeEventListener("resize", updateItemsPerView);
  }, []);

  const scroll = (direction: "left" | "right") => {
    if (scrollRef.current) {
      const scrollAmount = 300; // Adjust based on your card width
      const currentScroll = scrollRef.current.scrollLeft;
      const targetScroll =
        direction === "left"
          ? currentScroll - scrollAmount
          : currentScroll + scrollAmount;

      scrollRef.current.scrollTo({
        left: targetScroll,
        behavior: "smooth",
      });
    }
  };

  const renderStars = (rating: number) => {
    return Array.from({ length: 5 }, (_, i) => (
      <span key={i} className="text-orange-400 text-sm">
        {i < rating ? "★" : "☆"}
      </span>
    ));
  };

  return (
    <section className="">
      {/* Section info */}
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-2xl font-bold text-gray-900">Top Sellers</h2>
        <div className="flex items-center gap-2">
          <Button
            variant="outline"
            size="sm"
            onClick={() => scroll("left")}
            className="h-8 w-8 p-0 border-neutral-200 hover:border-brand-400 rounded-full"
          >
            <ChevronLeft className="h-4 w-4" />
          </Button>
          <Button
            variant="outline"
            size="sm"
            onClick={() => scroll("right")}
            className="h-8 w-8 p-0  border-neutral-200 hover:border-brand-400 rounded-full"
          >
            <ChevronRight className="h-4 w-4" />
          </Button>
        </div>
      </div>

      {/* Carousel Container */}
      <div className="relative bg-neutral-50">
        <div
          ref={scrollRef}
          className="flex gap-0.5 py-0.5 overflow-x-auto scrollbar-hide scroll-smooth"
          style={{
            scrollbarWidth: "none",
            msOverflowStyle: "none",
          }}
        >
          {sellers.map((seller) => (
            <div
              key={seller.id}
              className="flex-shrink-0 bg-white p-6 group cursor-pointer border-2 border-transparent hover:border-2 hover:border-brand-500  transition-all ease-out duration-350"
              style={{ width: `${100 / itemsPerView}%` }}
            >
              {/* Logo with Verification Badge */}
              <div className="relative w-20 h-20 mx-auto mb-4 border rounded-full p-2">
                <img
                  src={seller.logo || "/placeholder.svg"}
                  alt={seller.storeName}
                  className="w-full h-full object-contain"
                />
                {seller.verified && (
                  <div className="absolute -top-1 -right-1 w-6 h-6 bg-blue-500 rounded-full flex items-center justify-center">
                    <Check className="w-3 h-3 text-white" />
                  </div>
                )}
              </div>

              {/* Store Name */}
              <h3 className="text-center font-semibold text-gray-900 mb-2">
                {seller.name}
              </h3>

              {/* Rating */}
              <div className="flex items-center justify-center gap-1 mb-4">
                <span>{renderStars(seller.rating)}</span>
                <span className="text-sm text-gray-500 ml-1">
                  ({seller.reviewCount} reviews)
                </span>
              </div>

              {/* Visit Store Button */}
              <Button
                variant="outline"
                className="w-full text-neutral-700 border-neutral-300 hover:bg-brand-500 hover:border-brand-500 hover:text-white font-medium bg-transparent transition-colors ease-in-out duration-500"
              >
                <ChevronRight className="w-4 h-4 mr-2" />
                VISIT STORE
              </Button>
            </div>
          ))}
        </div>
      </div>

      {/* Gradient Overlays for better visual indication */}
    </section>
  );
}
