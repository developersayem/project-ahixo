"use client";

import { useState } from "react";
import Link from "next/link";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { fetcher } from "@/lib/fetcher";
import useSWR from "swr";

interface IBrandRes {
  data: IBrand[];
}
interface IBrand {
  _id: string;
  name: string;
}

export default function BrandsPage() {
  const [searchTerm, setSearchTerm] = useState("");

  // Fetch brands from backend
  const { data: brandsRes } = useSWR<IBrandRes>(`/api/v1/brands`, fetcher);
  const brandsData = brandsRes?.data || [];

  // Filter brands based on search term
  const filteredBrands = brandsData?.filter((brand: IBrand) =>
    brand.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto px-4 py-6">
        {/* Breadcrumb Navigation */}
        <div className="mb-6">
          <Breadcrumb>
            <BreadcrumbList>
              <BreadcrumbItem>
                <BreadcrumbLink asChild>
                  <Link href="/">Home</Link>
                </BreadcrumbLink>
              </BreadcrumbItem>
              <BreadcrumbSeparator />
              <BreadcrumbItem>
                <BreadcrumbPage>All Brands</BreadcrumbPage>
              </BreadcrumbItem>
            </BreadcrumbList>
          </Breadcrumb>
        </div>

        {/* Page Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-4">All Brands</h1>

          {/* Search Bar */}
          <div className="max-w-md">
            <input
              type="text"
              placeholder="Search brands..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500 outline-none"
            />
          </div>
        </div>

        {/* Brands Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-0">
          {filteredBrands?.map((brand, index) => (
            <Link
              key={index}
              href={`/products?brand=${encodeURIComponent(brand.name)}`}
              className="group"
            >
              <div className="bg-white p-6 border-spacing-0.5 border-[1px] border-gray-100  hover:shadow-2xl hover:scale-101 transition-all duration-200">
                {/* Brand Logo */}
                {/* <div className="flex items-center justify-center mb-4 h-16">
                  <img
                    src={brand.logo}
                    alt={`${brand.name} logo`}
                    onError={(e) => {
                      (e.currentTarget as HTMLImageElement).src =
                        brand.fallbackLogo;
                    }}
                    className="max-w-full max-h-full object-contain group-hover:scale-105 transition-transform duration-200"
                  />
                </div> */}

                {/* Brand Name */}
                <div className="text-center">
                  <h3 className="text-sm font-medium text-gray-900 group-hover:text-brand-600 transition-colors duration-200">
                    {brand.name}
                  </h3>
                </div>
              </div>
            </Link>
          ))}
        </div>

        {/* No Results Message */}
        {filteredBrands?.length === 0 && searchTerm && (
          <div className="text-center py-12">
            <p className="text-gray-500 text-lg">
              No brands found matching &quot;{searchTerm}&quot;
            </p>
          </div>
        )}

        {/* Total Brands Count */}
        <div className="mt-8 text-center text-gray-600">
          <p>
            Showing {filteredBrands?.length} of {brandsData?.length} brands
          </p>
        </div>
      </div>
    </div>
  );
}
