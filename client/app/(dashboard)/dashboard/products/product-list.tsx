/* eslint-disable @next/next/no-img-element */
"use client";

import useSWR from "swr";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Search, MoreHorizontal, Edit, Trash2, Eye } from "lucide-react";
import Link from "next/link";
import { useState } from "react";
import api from "@/lib/axios";
import { fetcher } from "@/lib/fetcher";
import { toast } from "sonner";

interface Product {
  _id: string;
  title: string;
  price: number;
  salePrice?: number;
  stock: number;
  status: "active" | "inactive" | "out-of-stock";
  category: string;
  images: string[];
  sales?: number;
}

export function ProductList() {
  const [searchTerm, setSearchTerm] = useState("");

  const { data, error, isLoading, mutate } = useSWR(
    "/api/v1/seller/products",
    fetcher
  );

  //  Extract products array correctly
  const products: Product[] = data?.data?.products || [];

  const handleDelete = async (productId: string) => {
    try {
      await api.delete(`/api/v1/seller/products/${productId}`);
      toast.success("Product deleted successfully");
      mutate();
    } catch (error) {
      console.error("Delete failed", error);
    }
  };

  const getStockBadge = (stock: number) => {
    if (stock === 0) {
      return <Badge variant="destructive">Out of Stock</Badge>;
    } else if (stock <= 5) {
      return <Badge variant="destructive">Low Stock</Badge>;
    } else {
      return <p className="font-medium">{stock} in stock</p>;
    }
  };

  if (isLoading) {
    return (
      <Card className="shadow-none rounded-none">
        <CardContent className="py-8 text-center">
          Loading products...
        </CardContent>
      </Card>
    );
  }

  if (error) {
    return (
      <Card className="shadow-none rounded-none">
        <CardContent className="py-8 text-center text-destructive">
          Failed to load products
        </CardContent>
      </Card>
    );
  }

  const filteredProducts =
    products.filter((product: Product) =>
      product.title.toLowerCase().includes(searchTerm.toLowerCase())
    ) || [];

  return (
    <Card className="shadow-none rounded-none">
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle>Your Products</CardTitle>
          <div className="relative w-80">
            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
            <Input
              placeholder="Search products..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10 rounded-none"
            />
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {filteredProducts.map((product: Product) => (
            <div
              key={product._id}
              className="flex items-center justify-between p-2 border border-border"
            >
              <div className="flex items-center space-x-4">
                <img
                  src={product.images[0] || "/placeholder.svg"}
                  alt={product.title}
                  width={60}
                  height={60}
                  className="rounded-lg object-cover"
                />
                <div>
                  <h3 className="font-medium capitalize">{product.title}</h3>
                  <p className="text-sm text-muted-foreground capitalize">
                    {product.category}
                  </p>
                </div>
              </div>

              <div className="flex items-center space-x-6">
                <div className="text-right">
                  <p className="font-medium">
                    ${product.salePrice || product.price}
                  </p>
                  {product.salePrice && (
                    <p className="text-sm line-through text-muted-foreground">
                      ${product.price}
                    </p>
                  )}
                </div>

                <div className="text-right flex justify-center gap-2">
                  {getStockBadge(product.stock)}
                </div>

                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="ghost" size="icon">
                      <MoreHorizontal className="h-4 w-4" />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end" className="rounded-none">
                    <DropdownMenuItem asChild>
                      <Link href={`/dashboard/products/view/${product._id}`}>
                        <Eye className="h-4 w-4 mr-2" /> View
                      </Link>
                    </DropdownMenuItem>
                    <DropdownMenuItem asChild>
                      <Link href={`/dashboard/products/edit/${product._id}`}>
                        <Edit className="h-4 w-4 mr-2" /> Edit
                      </Link>
                    </DropdownMenuItem>
                    <DropdownMenuItem
                      onClick={() => handleDelete(product._id)}
                      className="text-destructive focus:text-destructive"
                    >
                      <Trash2 className="h-4 w-4 mr-2" /> Delete
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </div>
            </div>
          ))}

          {filteredProducts.length === 0 && (
            <div className="text-center py-8">
              <p className="text-muted-foreground">No products found.</p>
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
}
