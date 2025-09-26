// app/products/[id]/page.tsx
"use client";

import useSWR from "swr";
import { notFound, useParams } from "next/navigation";
import { ProductImages } from "@/components/app/products/products-details/product-images";
import { ProductInfo } from "@/components/app/products/products-details/product-info";
import { ProductTabs } from "@/components/app/products/products-details/product-tabs";
import { Loader2 } from "lucide-react";
import { IProduct } from "@/types/product-type";
import { fetcher } from "@/lib/fetcher";

export default function ProductPage() {
  const { id } = useParams<{ id: string }>();

  // ✅ Use SWR for fetching product by id
  const {
    data: product,
    error,
    isLoading,
  } = useSWR<IProduct>(id ? `/api/v1/products/${id}` : null, fetcher);

  if (isLoading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <Loader2 className="h-10 w-10 animate-spin text-gray-500" />
      </div>
    );
  }

  if (error || !product) {
    return notFound();
  }

  return (
    <div className="min-h-screen container mx-auto">
      <div className="mx-auto px-4 py-6">
        <div>
          <div className="bg-white">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-6">
              {/* Product Images */}
              <div className="flex justify-center">
                <ProductImages product={product} />
              </div>

              {/* Product Info */}
              <ProductInfo product={product} />
            </div>
          </div>

          {/* Tabs (description, ratings, etc.) */}
          <ProductTabs product={product} />
        </div>
      </div>
    </div>
  );
}
