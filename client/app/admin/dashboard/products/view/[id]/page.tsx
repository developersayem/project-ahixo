"use client";

import { Images } from "@/components/dashboard/products/products-details/images";
import { Info } from "@/components/dashboard/products/products-details/info";
import { Tabs } from "@/components/dashboard/products/products-details/tabs";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import api from "@/lib/axios";
import { ArrowBigLeftIcon, Pencil } from "lucide-react";
import Link from "next/link";
import useSWR from "swr";

interface ViewProductPageProps {
  params: {
    id: string;
  };
}

export default function ViewProductPage({ params }: ViewProductPageProps) {
  // In a real app, fetch product data by ID
  const productId = params.id;

  const { data: product } = useSWR(
    `/api/v1/seller/products/${productId}`,
    (url) => api.get(url).then((res) => res.data.data)
  );

  if (!product) {
    return <div>Loading...</div>;
  }

  return (
    <div className="min-h-screen container mx-auto">
      <div className="mx-auto px-4 space-y-4">
        <Card className="rounded-none shadow-none">
          <CardContent>
            <div className="">
              <div className="flex justify-between items-center">
                <Link href="/dashboard/products">
                  <Button variant="ghost" className="rounded-none font-bold">
                    <ArrowBigLeftIcon />
                    Back
                  </Button>
                </Link>
                <Link href={`/dashboard/products/edit/${product._id}`}>
                  <Button className="rounded-none" variant="ghost">
                    <Pencil />
                    Edit
                  </Button>
                </Link>
              </div>
              {/* Main Product Content */}
              <div className="bg-white">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-6">
                  <div className="flex justify-center">
                    <Images product={product} />
                  </div>
                  <Info product={product} />
                </div>
              </div>
              <Tabs product={product} />
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
