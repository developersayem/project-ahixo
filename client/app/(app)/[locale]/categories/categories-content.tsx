"use client";

import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { Card, CardContent } from "@/components/ui/card";
import useSWR from "swr";
import { fetcher } from "@/lib/fetcher";
import Link from "next/link";
import { IDictionary } from "@/types/locale/dictionary.type";

// TypeScript interfaces
interface Subcategory {
  _id: string;
  name: string;
  subCategories?: Subcategory[];
}

interface Category {
  _id: string;
  name: string;
  subCategories?: Subcategory[];
}

// Capitalize helper
const capitalize = (str: string) =>
  str.replace(/\b\w/g, (l) => l.toUpperCase());

export default function CategoriesPageContent({ dict }: { dict: IDictionary }) {
  const { data: CategoriesRes } = useSWR(`/api/v1/categories`, fetcher);
  const categories: Category[] = CategoriesRes?.data || [];

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-6">
        <div className="mb-6">
          <Breadcrumb>
            <BreadcrumbList>
              <BreadcrumbItem>
                <BreadcrumbLink href="/">
                  {dict.bottom_navbar.pages.home}
                </BreadcrumbLink>
              </BreadcrumbItem>
              <BreadcrumbSeparator />
              <BreadcrumbItem>
                <BreadcrumbPage>
                  {dict.bottom_navbar.pages.categories}
                </BreadcrumbPage>
              </BreadcrumbItem>
            </BreadcrumbList>
          </Breadcrumb>
        </div>

        <h1 className="text-2xl font-semibold text-foreground mb-8">
          All Categories
        </h1>

        <div className="space-y-8">
          {categories.map((category) => (
            <Card
              key={category._id}
              className="border border-gray-100 rounded-none shadow-none gap-0 p-0"
            >
              <CardContent className="p-6">
                <h2 className="text-lg font-semibold text-foreground mb-6">
                  {capitalize(category.name)}
                </h2>

                {category.subCategories &&
                  category.subCategories.length > 0 && (
                    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-8">
                      {category.subCategories.map((sub) => (
                        <div key={sub._id} className="space-y-3">
                          <h3 className="font-medium text-foreground text-sm">
                            <Link
                              href={`/products?category=${encodeURIComponent(
                                sub.name
                              )}`}
                              className="text-sm text-muted-foreground hover:text-foreground hover:underline transition-colors"
                            >
                              {capitalize(sub.name)}
                            </Link>
                          </h3>
                        </div>
                      ))}
                    </div>
                  )}
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
}
