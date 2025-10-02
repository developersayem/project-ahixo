"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";
import { fetcher } from "@/lib/fetcher";
import { ChevronDown } from "lucide-react";
import useSWR from "swr";

interface ICat {
  _id: string;
  name: string;
}

interface ProductSidebarProps {
  selectedCategory: string | null;
  onCategoryChange: (category: string | null) => void;
  availabilityFilters: string[];
  onAvailabilityChange: (filters: string[]) => void;
}

export function ProductSidebar({
  selectedCategory,
  onCategoryChange,
  availabilityFilters = [],
  onAvailabilityChange,
}: ProductSidebarProps) {
  // Fetch top categories from backend
  const { data: categoriesRes } = useSWR("/api/v1/categories/top", fetcher);

  const categories = categoriesRes?.data || [];

  const handleAvailabilityChange = (filter: string, checked: boolean) => {
    if (checked) {
      onAvailabilityChange([...availabilityFilters, filter]);
    } else {
      onAvailabilityChange(availabilityFilters.filter((f) => f !== filter));
    }
  };

  const handleCategoryClick = (categoryName: string) => {
    // Use category name as filter directly
    onCategoryChange(categoryName.toLowerCase());
  };

  return (
    <div className="space-y-4">
      {/* Categories */}
      <Card className="border-gray-100 shadow-none rounded-none">
        <Collapsible defaultOpen>
          <CollapsibleTrigger asChild>
            <CardHeader className="cursor-pointer hover:bg-muted/50 transition-colors">
              <CardTitle className="flex items-center justify-between text-base">
                Categories
                <ChevronDown className="h-4 w-4" />
              </CardTitle>
            </CardHeader>
          </CollapsibleTrigger>
          <CollapsibleContent>
            <CardContent className="pt-0">
              <div className="space-y-2">
                <button
                  onClick={() => onCategoryChange(null)}
                  className={`block w-full text-left text-sm transition-colors py-1 ${
                    selectedCategory === null
                      ? "text-brand-500 font-medium"
                      : "text-muted-foreground hover:text-foreground"
                  }`}
                >
                  All Categories
                </button>

                {categories.map((cat: ICat) => (
                  <button
                    key={cat._id}
                    onClick={() => handleCategoryClick(cat.name)}
                    className={`block w-full text-left text-sm transition-colors py-1 ${
                      selectedCategory === cat.name.toLowerCase()
                        ? "text-brand-500 font-medium"
                        : "text-muted-foreground hover:text-foreground"
                    }`}
                  >
                    {cat.name.charAt(0).toUpperCase() + cat.name.slice(1)}
                  </button>
                ))}
              </div>
            </CardContent>
          </CollapsibleContent>
        </Collapsible>
      </Card>

      {/* Filter by Availability */}
      <Card className="border-gray-100 shadow-none rounded-none">
        <Collapsible defaultOpen>
          <CollapsibleTrigger asChild>
            <CardHeader className="cursor-pointer hover:bg-muted/50 transition-colors">
              <CardTitle className="flex items-center justify-between text-base">
                Filter by Availability
                <ChevronDown className="h-4 w-4" />
              </CardTitle>
            </CardHeader>
          </CollapsibleTrigger>
          <CollapsibleContent>
            <CardContent className="pt-0">
              <div className="space-y-2">
                <label className="flex items-center space-x-2 cursor-pointer">
                  <input
                    type="checkbox"
                    className="rounded border-border"
                    checked={availabilityFilters.includes("in-stock")}
                    onChange={(e) =>
                      handleAvailabilityChange("in-stock", e.target.checked)
                    }
                  />
                  <span className="text-sm text-muted-foreground">
                    In Stock
                  </span>
                </label>
                <label className="flex items-center space-x-2 cursor-pointer">
                  <input
                    type="checkbox"
                    className="rounded border-border"
                    checked={availabilityFilters.includes("out-of-stock")}
                    onChange={(e) =>
                      handleAvailabilityChange("out-of-stock", e.target.checked)
                    }
                  />
                  <span className="text-sm text-muted-foreground">
                    Out of Stock
                  </span>
                </label>
              </div>
            </CardContent>
          </CollapsibleContent>
        </Collapsible>
      </Card>
    </div>
  );
}
