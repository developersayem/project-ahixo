/* eslint-disable @next/next/no-img-element */
"use client";

import { ChevronRight, ChevronLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useRef } from "react";

interface Product {
  id: number;
  name: string;
  price: string;
  image: string;
}

const featuredProducts: Product[] = [
  {
    id: 1,
    name: "Like Dreams Large Sherpa Tote Bag, Inner Pocket...",
    price: "$72.120",
    image:
      "https://demo.activeitzone.com/ecommerce_repo/public/uploads/all/cJLH3YGg5OBTzgiDvMVE4Bw6d4jDM6l4gbTSCq4R.webp",
  },
  {
    id: 2,
    name: "Insight Cosmetics 3D Highlighter",
    price: "$60.000",
    image:
      "https://demo.activeitzone.com/ecommerce_repo/public/uploads/all/cJLH3YGg5OBTzgiDvMVE4Bw6d4jDM6l4gbTSCq4R.webp",
  },
  {
    id: 3,
    name: "Women's Plain Dress One Piece for Girls",
    price: "$49.000",
    image:
      "https://demo.activeitzone.com/ecommerce_repo/public/uploads/all/cJLH3YGg5OBTzgiDvMVE4Bw6d4jDM6l4gbTSCq4R.webp",
  },
  {
    id: 4,
    name: "Nescafé Clasico, Dark Roast Instant Coffee Jar...",
    price: "$10.390",
    image:
      "https://demo.activeitzone.com/ecommerce_repo/public/uploads/all/cJLH3YGg5OBTzgiDvMVE4Bw6d4jDM6l4gbTSCq4R.webp",
  },
  {
    id: 5,
    name: "Premium executive estate with plenty of cargo...",
    price: "$12,346.000",
    image:
      "https://demo.activeitzone.com/ecommerce_repo/public/uploads/all/cJLH3YGg5OBTzgiDvMVE4Bw6d4jDM6l4gbTSCq4R.webp",
  },
  {
    id: 6,
    name: "Plasticolor 008669R01 Marvel Deadpool Repeat...",
    price: "$50.000",
    image:
      "https://demo.activeitzone.com/ecommerce_repo/public/uploads/all/cJLH3YGg5OBTzgiDvMVE4Bw6d4jDM6l4gbTSCq4R.webp",
  },
  {
    id: 7,
    name: "Plasticolor 008669R01 Marvel Deadpool Repeat...",
    price: "$50.000",
    image:
      "https://demo.activeitzone.com/ecommerce_repo/public/uploads/all/cJLH3YGg5OBTzgiDvMVE4Bw6d4jDM6l4gbTSCq4R.webp",
  },
  {
    id: 8,
    name: "Plasticolor 008669R01 Marvel Deadpool Repeat...",
    price: "$50.000",
    image:
      "https://demo.activeitzone.com/ecommerce_repo/public/uploads/all/cJLH3YGg5OBTzgiDvMVE4Bw6d4jDM6l4gbTSCq4R.webp",
  },
  {
    id: 9,
    name: "Additional Product 1",
    price: "$75.000",
    image:
      "https://demo.activeitzone.com/ecommerce_repo/public/uploads/all/cJLH3YGg5OBTzgiDvMVE4Bw6d4jDM6l4gbTSCq4R.webp",
  },
  {
    id: 10,
    name: "Additional Product 2",
    price: "$85.000",
    image:
      "https://demo.activeitzone.com/ecommerce_repo/public/uploads/all/cJLH3YGg5OBTzgiDvMVE4Bw6d4jDM6l4gbTSCq4R.webp",
  },
];

export default function FeaturedProducts() {
  const scrollRef = useRef<HTMLDivElement>(null);

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

  return (
    <section className="">
      <div className="relative flex justify-center mb-10">
        <img
          className="w-full"
          src="https://img.freepik.com/free-photo/cute-carefree-asian-brunette-showing-application-smartphone-screen-make-victory-peace-sign-smilin_1258-116768.jpg?semt=ais_hybrid&w=740&q=80"
          alt=""
        />
        <div className="absolute top-0 left-0 w-full h-full flex flex-col items-end justify-center text-white bg-opacity-50 p-4 pr-10">
          <div>
            <h1 className="md:text-7xl font-bold text-start">
              Featured Products
            </h1>
            <p className="text-xs md:text-2xl mt-2 md:text-center w-42 md:w-[700px] text-wrap">
              Discover our handpicked selection of featured products, showcasing
              the best items available in our store.
            </p>
          </div>
        </div>
      </div>
      {/* Section info */}
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-2xl font-bold text-gray-900">Featured Products</h2>
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
      <div className="relative">
        <div
          ref={scrollRef}
          className="flex gap-0.5 py-0.5 overflow-x-auto scrollbar-hide scroll-smooth"
          style={{
            scrollbarWidth: "none",
            msOverflowStyle: "none",
          }}
        >
          {featuredProducts.map((product) => (
            <div
              key={product.id}
              className="group cursor-pointer flex-none w-48 sm:w-52 border-2 border-neutral-50 hover:border-2 hover:border-brand-500 transition-all ease-out duration-350"
            >
              <div className="bg-white overflow-hidden ">
                <div className="aspect-square bg-white flex items-center justify-center p-4">
                  <img
                    src={product.image || "/placeholder.svg"}
                    alt={product.name}
                    className="w-full h-full object-contain group-hover:scale-105 transition-transform duration-200"
                  />
                </div>
                <div className="p-3">
                  <h3 className="text-sm text-gray-800 mb-2 line-clamp-2 leading-tight min-h-[2.5rem]">
                    {product.name}
                  </h3>
                  <p className="text-lg font-semibold text-brand-600">
                    {product.price}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Gradient Overlays for better visual indication */}
        <div className="absolute top-0 left-0 w-8 h-full bg-gradient-to-r from-white to-transparent pointer-events-none z-10" />
        <div className="absolute top-0 right-0 w-8 h-full bg-gradient-to-l from-white to-transparent pointer-events-none z-10" />
      </div>

      <style jsx global>{`
        .scrollbar-hide::-webkit-scrollbar {
          display: none;
        }
      `}</style>
    </section>
  );
}
