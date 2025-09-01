"use client";

import { useMemo } from "react";
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";
import { ProductCard } from "./product-card";

const products = [
  {
    id: 1,
    name: "Canon EOS 5D MarkII",
    image: "/products/canon-dslr-camera.png",
    rating: 0,
    price: 899,
    category: "Computer & Accessories",
    inStock: true,
  },
  {
    id: 2,
    name: "97 Inch Class LG OLED evo G4 4K Smart TV 2024 with Supplied...",
    image: "/products/large-oled-tv-screen.png",
    rating: 0,
    price: 2999,
    category: "Home decoration & Appliance",
    inStock: true,
  },
  {
    id: 3,
    name: "HOBIBEAR Unisex Garden Clogs Lightweight Slippers Sandals for Men...",
    image: "/products/black-garden-clogs-sandals.png",
    rating: 5,
    price: 29,
    category: "Men Clothing & Fashion",
    inStock: true,
  },
  {
    id: 4,
    name: "Apple 2024 MacBook Pro Laptop with M4 Max, 16-core CPU...",
    image: "/products/macbook-pro.png",
    rating: 5,
    price: 3999,
    category: "Computer & Accessories",
    inStock: false,
  },
  {
    id: 5,
    name: "Jessica Simpson Womens Setira Solid Slip-On Pumps",
    image: "/products/black-high-heel-pumps.png",
    rating: 5,
    price: 79,
    category: "Women Clothing & Fashion",
    inStock: true,
  },
  {
    id: 6,
    name: "Gold Watches for Women with Gold Stainless Steel...",
    image: "/products/gold-luxury-watch.png",
    rating: 5,
    price: 199,
    category: "Jewelry & Watches",
    inStock: true,
  },
  {
    id: 7,
    name: "Fashion LED Digital Watch Outdoor 30M Waterproof Rubbe...",
    image: "/products/digital-sports-watch.png",
    rating: 5,
    price: 49,
    category: "Jewelry & Watches",
    inStock: true,
  },
  {
    id: 8,
    name: "Bulova Mens Classic Sutton 3-Hand Calendar Date Quartz...",
    image: "/products/mens-dress-watch.png",
    rating: 5,
    price: 149,
    category: "Jewelry & Watches",
    inStock: false,
  },
  {
    id: 9,
    name: "Bulova Mens Modern Gold Tone Stainless Steel 3-Hand Calendar...",
    image: "/products/black-luxury-watch.png",
    rating: 0,
    price: 299,
    category: "Jewelry & Watches",
    inStock: true,
  },
  {
    id: 10,
    name: "Helly-Hansen Mens Crew Waterproof Windproof Breathab...",
    image: "/products/gray-jacket-windbreaker.png",
    rating: 5,
    price: 89,
    category: "Men Clothing & Fashion",
    inStock: true,
  },
  {
    id: 11,
    name: "Fashion Sneakers, Lace-Up Or Slip-On Mens Casual Shoes...",
    image: "/products/white-casual-sneakers.png",
    rating: 5,
    price: 59,
    category: "Men Clothing & Fashion",
    inStock: false,
  },
  {
    id: 12,
    name: "Royal Enfield Motorcycle - Classic Design, Modern Performance",
    image: "/products/yellow-motorcycle-bike.png",
    rating: 5,
    price: 4999,
    category: "Automobile & Motorcycle",
    inStock: true,
  },
  {
    id: 13,
    name: "RoyalBaby Freestyle 5/7 Sport Kids Bike 12 14 16 18 20 Inch...",
    image: "/products/kids-bicycle-bike.png",
    rating: 5,
    price: 129,
    category: "Kids & toy",
    inStock: true,
  },
  {
    id: 14,
    name: "Huffy Stone Mountain Hardtail Mountain Bike for...",
    image: "/products/mountain-bike-bicycle.png",
    rating: 0,
    price: 199,
    category: "Sports & outdoor",
    inStock: false,
  },
  {
    id: 15,
    name: "Whoopi Perkins Acoustic Right Handed",
    image: "/products/acoustic-guitar.png",
    rating: 0,
    price: 299,
    category: "Toy",
    inStock: true,
  },
  {
    id: 16,
    name: "BMW 520d M Sport - Luxury Sedan with TwinPower Turbo...",
    image: "/products/white-bmw-sedan-car.png",
    rating: 0,
    price: 45999,
    category: "Automobile & Motorcycle",
    inStock: true,
  },
];

interface ProductGridProps {
  selectedCategory: string | null;
  availabilityFilters: string[];
  sortBy: string;
  currentPage: number;
  onPageChange: (page: number) => void;
}

const PRODUCTS_PER_PAGE = 12;

export function ProductGrid({
  selectedCategory,
  availabilityFilters,
  sortBy,
  currentPage,
  onPageChange,
}: ProductGridProps) {
  const filteredAndSortedProducts = useMemo(() => {
    let filtered = products;

    // Filter by category
    if (selectedCategory) {
      filtered = filtered.filter(
        (product) => product.category === selectedCategory
      );
    }

    // Filter by availability
    if (availabilityFilters.length > 0) {
      filtered = filtered.filter((product) => {
        if (
          availabilityFilters.includes("in-stock") &&
          availabilityFilters.includes("out-of-stock")
        ) {
          return true; // Show all if both are selected
        }
        if (availabilityFilters.includes("in-stock")) {
          return product.inStock;
        }
        if (availabilityFilters.includes("out-of-stock")) {
          return !product.inStock;
        }
        return true;
      });
    }

    // Sort products
    const sorted = [...filtered].sort((a, b) => {
      switch (sortBy) {
        case "price-low":
          return a.price - b.price;
        case "price-high":
          return b.price - a.price;
        case "rating":
          return b.rating - a.rating;
        case "newest":
          return b.id - a.id;
        default:
          return 0;
      }
    });

    return sorted;
  }, [selectedCategory, availabilityFilters, sortBy]);

  const totalPages = Math.ceil(
    filteredAndSortedProducts.length / PRODUCTS_PER_PAGE
  );
  const startIndex = (currentPage - 1) * PRODUCTS_PER_PAGE;
  const paginatedProducts = filteredAndSortedProducts.slice(
    startIndex,
    startIndex + PRODUCTS_PER_PAGE
  );

  // Reset to page 1 when filters change
  useMemo(() => {
    onPageChange(1);
  }, [onPageChange]);

  return (
    <div className="space-y-8">
      {/* Product Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {paginatedProducts.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>

      {totalPages > 1 && (
        <div className="flex justify-center">
          <Pagination>
            <PaginationContent>
              <PaginationItem>
                <PaginationPrevious
                  onClick={() =>
                    currentPage > 1 && onPageChange(currentPage - 1)
                  }
                  className={
                    currentPage === 1
                      ? "pointer-events-none opacity-50"
                      : "cursor-pointer"
                  }
                />
              </PaginationItem>

              {Array.from({ length: Math.min(totalPages, 5) }, (_, i) => {
                const pageNum = i + 1;
                return (
                  <PaginationItem key={pageNum}>
                    <PaginationLink
                      onClick={() => onPageChange(pageNum)}
                      isActive={currentPage === pageNum}
                      className={`cursor-pointer ${
                        currentPage === pageNum
                          ? "bg-brand-500 text-white hover:bg-brand-600"
                          : ""
                      }`}
                    >
                      {pageNum}
                    </PaginationLink>
                  </PaginationItem>
                );
              })}

              {totalPages > 5 && (
                <>
                  <PaginationItem>
                    <span className="px-3 py-2">...</span>
                  </PaginationItem>
                  <PaginationItem>
                    <PaginationLink
                      onClick={() => onPageChange(totalPages)}
                      className="cursor-pointer"
                    >
                      {totalPages}
                    </PaginationLink>
                  </PaginationItem>
                </>
              )}

              <PaginationItem>
                <PaginationNext
                  onClick={() =>
                    currentPage < totalPages && onPageChange(currentPage + 1)
                  }
                  className={
                    currentPage === totalPages
                      ? "pointer-events-none opacity-50"
                      : "cursor-pointer"
                  }
                />
              </PaginationItem>
            </PaginationContent>
          </Pagination>
        </div>
      )}

      {paginatedProducts.length === 0 && (
        <div className="text-center py-12">
          <p className="text-muted-foreground">
            No products found matching your filters.
          </p>
        </div>
      )}
    </div>
  );
}
