"use client";

import { Suspense, useState, useCallback } from "react";
import { useSearchParams, useRouter, usePathname } from "next/navigation";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { ProductSidebar } from "@/components/app/shared/product-sidebar";
import { ProductGrid } from "@/components/app/shared/product-grid";

function ProductsContent() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const pathname = usePathname();

  const selectedCategory = searchParams.get("category");
  const selectedSubcategory = searchParams.get("subcategory");
  const selectedBrand = searchParams.get("brand");

  const [availabilityFilters, setAvailabilityFilters] = useState<string[]>([]);
  const [sortBy, setSortBy] = useState("newest");
  const [currentPage, setCurrentPage] = useState(1);

  const handleCategoryChange = useCallback(
    (category: string | null) => {
      const params = new URLSearchParams(searchParams.toString());

      if (category) {
        params.set("category", category);
      } else {
        params.delete("category");
      }

      // Clear subcategory when category changes
      params.delete("subcategory");

      router.push(`${pathname}?${params.toString()}`);
      setCurrentPage(1);
    },
    [searchParams, router, pathname]
  );

  const handleAvailabilityChange = useCallback((filters: string[]) => {
    setAvailabilityFilters(filters);
    setCurrentPage(1);
  }, []);

  const handleSortChange = useCallback((value: string) => {
    setSortBy(value);
    setCurrentPage(1);
  }, []);

  const handlePageChange = useCallback((page: number) => {
    setCurrentPage(page);
  }, []);

  // Generate breadcrumb based on filters
  const getBreadcrumbItems = () => {
    const items = [
      { label: "Home", href: "/" },
      { label: "All Products", href: "/products" },
    ];

    if (selectedBrand) {
      items.push({
        label: selectedBrand,
        href: `/products?brand=${selectedBrand}`,
      });
    } else if (selectedCategory) {
      const categoryName = selectedCategory
        .replace(/-/g, " ")
        .replace(/\b\w/g, (l) => l.toUpperCase());
      items.push({
        label: categoryName,
        href: `/products?category=${selectedCategory}`,
      });

      if (selectedSubcategory) {
        const subcategoryName = selectedSubcategory
          .replace(/-/g, " ")
          .replace(/\b\w/g, (l) => l.toUpperCase());
        items.push({
          label: subcategoryName,
          href: `/products?category=${selectedCategory}&subcategory=${selectedSubcategory}`,
        });
      }
    }

    return items;
  };

  const breadcrumbItems = getBreadcrumbItems();
  const pageTitle = selectedBrand
    ? selectedBrand
    : selectedSubcategory
    ? selectedSubcategory
        .replace(/-/g, " ")
        .replace(/\b\w/g, (l) => l.toUpperCase())
    : selectedCategory
    ? selectedCategory
        .replace(/-/g, " ")
        .replace(/\b\w/g, (l) => l.toUpperCase())
    : "All Products";

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-6">
        {/* Breadcrumb Navigation */}
        <div className="mb-6">
          <Breadcrumb>
            <BreadcrumbList>
              {breadcrumbItems.map((item, index) => (
                <div key={index} className="flex items-center">
                  {index > 0 && <BreadcrumbSeparator />}
                  <BreadcrumbItem>
                    {index === breadcrumbItems.length - 1 ? (
                      <BreadcrumbPage>{item.label}</BreadcrumbPage>
                    ) : (
                      <BreadcrumbLink href={item.href}>
                        {item.label}
                      </BreadcrumbLink>
                    )}
                  </BreadcrumbItem>
                </div>
              ))}
            </BreadcrumbList>
          </Breadcrumb>
        </div>

        <div className="flex gap-6">
          {/* Sidebar */}
          <div className="hidden lg:block w-64 flex-shrink-0">
            <ProductSidebar
              selectedCategory={selectedCategory}
              onCategoryChange={handleCategoryChange}
              availabilityFilters={availabilityFilters}
              onAvailabilityChange={handleAvailabilityChange}
            />
          </div>

          {/* Main Content */}
          <div className="flex-1">
            <div className="flex items-center justify-between mb-6">
              <h1 className="text-2xl font-bold text-foreground">
                {pageTitle}
              </h1>
              <Select value={sortBy} onValueChange={handleSortChange}>
                <SelectTrigger className="w-48">
                  <SelectValue placeholder="Sort by" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="newest">Newest First</SelectItem>
                  <SelectItem value="price-low">Price: Low to High</SelectItem>
                  <SelectItem value="price-high">Price: High to Low</SelectItem>
                  <SelectItem value="rating">Highest Rated</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <ProductGrid
              selectedCategory={selectedCategory}
              selectedSubcategory={selectedSubcategory}
              selectedBrand={selectedBrand}
              availabilityFilters={availabilityFilters}
              sortBy={sortBy}
              currentPage={currentPage}
              onPageChange={handlePageChange}
            />
          </div>
        </div>
      </div>
    </div>
  );
}

export default function ProductsPage() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <ProductsContent />
    </Suspense>
  );
}
