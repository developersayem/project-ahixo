"use client";

import { useMemo, useEffect } from "react";
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";
import { products } from "@/app/data/products";
import { ProductCard } from "./product-card";

interface ProductGridProps {
  selectedCategory: string | null;
  selectedSubcategory?: string | null;
  selectedBrand?: string | null;
  availabilityFilters: string[];
  sortBy: string;
  currentPage: number;
  onPageChange: (page: number) => void;
}

const PRODUCTS_PER_PAGE = 12;

export function ProductGrid({
  selectedCategory,
  selectedSubcategory,
  selectedBrand,
  availabilityFilters,
  sortBy,
  currentPage,
  onPageChange,
}: ProductGridProps) {
  const filteredAndSortedProducts = useMemo(() => {
    let filtered = products;

    if (selectedCategory) {
      filtered = filtered.filter(
        (product) =>
          product.category.toLowerCase() === selectedCategory.toLowerCase()
      );
    }

    if (selectedSubcategory) {
      filtered = filtered.filter(
        (product) =>
          product.subcategory.toLowerCase() ===
          selectedSubcategory.toLowerCase()
      );
    }

    if (selectedBrand) {
      filtered = filtered.filter(
        (product) => product.brand.toLowerCase() === selectedBrand.toLowerCase()
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
  }, [
    selectedCategory,
    selectedSubcategory,
    selectedBrand,
    availabilityFilters,
    sortBy,
  ]);

  const totalPages = Math.ceil(
    filteredAndSortedProducts.length / PRODUCTS_PER_PAGE
  );
  const startIndex = (currentPage - 1) * PRODUCTS_PER_PAGE;
  const paginatedProducts = filteredAndSortedProducts.slice(
    startIndex,
    startIndex + PRODUCTS_PER_PAGE
  );

  useEffect(() => {
    onPageChange(1);
  }, [
    selectedCategory,
    selectedSubcategory,
    selectedBrand,
    availabilityFilters,
    sortBy,
    onPageChange, // ✅ include it here
  ]);

  return (
    <div className="space-y-8">
      {paginatedProducts.length === 0 && (
        <div className="text-center py-16">
          <div className="max-w-md mx-auto">
            <div className="w-24 h-24 mx-auto mb-6 bg-gray-100 rounded-full flex items-center justify-center">
              <svg
                className="w-12 h-12 text-gray-400"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M9.172 16.172a4 4 0 015.656 0M9 12h6m-6-4h6m2 5.291A7.962 7.962 0 0112 15c-2.34 0-4.467-.881-6.08-2.33"
                />
              </svg>
            </div>
            <h3 className="text-xl font-semibold text-foreground mb-2">
              No Products Found
            </h3>
            <p className="text-muted-foreground mb-4">
              {selectedCategory || selectedBrand || selectedSubcategory
                ? "No products match your current filters. Try adjusting your search criteria."
                : "No products found matching your filters."}
            </p>
            <div className="text-sm text-muted-foreground">
              {selectedCategory && (
                <p>
                  Category:{" "}
                  <span className="font-medium">
                    {selectedCategory.replace("-", " ")}
                  </span>
                </p>
              )}
              {selectedBrand && (
                <p>
                  Brand: <span className="font-medium">{selectedBrand}</span>
                </p>
              )}
              {selectedSubcategory && (
                <p>
                  Subcategory:{" "}
                  <span className="font-medium">
                    {selectedSubcategory.replace("-", " ")}
                  </span>
                </p>
              )}
            </div>
          </div>
        </div>
      )}

      {/* Product Grid */}
      {paginatedProducts.length > 0 && (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {paginatedProducts.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      )}

      {totalPages > 1 && paginatedProducts.length > 0 && (
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
                          ? "bg-orange-500 text-white hover:bg-orange-600"
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
    </div>
  );
}
