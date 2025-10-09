/* eslint-disable @next/next/no-img-element */
"use client";

import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Star, Heart, ShoppingCart } from "lucide-react";
import Link from "next/link";
import useSWR from "swr";
import { IProduct } from "@/types/product-type";
import { fetcher } from "@/lib/fetcher";
import { useCurrency } from "@/contexts/currency-context";
import { toast } from "sonner";
import { useCart } from "@/hooks/api/useCart";
import api from "@/lib/axios";

export function ProductsShowcase() {
  // Fetch products from backend
  const { data: products } = useSWR<IProduct[]>(
    "/api/v1/products?page=1&limit=20",
    fetcher
  );

  // Use currency context
  const { currency, symbolMap, convertPrice } = useCurrency();
  const { addItem } = useCart();

  // =============================
  // 🔸 Add to cart
  // =============================
  const handleAddToCart = async (product: IProduct) => {
    if (product.stock === 0) return;
    try {
      const selectedColor = product?.colors?.[0] || undefined;
      await addItem({
        productId: product._id,
        quantity: 1,
        selectedColor,
      });
      toast.success("Product added to cart");
    } catch (err) {
      console.error(err);
      toast.error("Failed to add product to cart");
    }
  };

  // =============================
  // 🔸 Add to wishlist
  // =============================
  const handleAddToWishlist = async (productId: string) => {
    try {
      const res = await api.post(`/api/v1/buyer/wishlist/${productId}`);
      if (res.data.success) toast.success("Product added to wishlist");
    } catch (error) {
      console.error(error);
      toast.error("Failed to add product to wishlist");
    }
  };

  return (
    <section className="py-10 transition-all duration-300 ease-in-out">
      <div className="container mx-auto px-4">
        <div className="text-center mb-8">
          <h2 className="text-3xl font-bold text-[#0F4F2A] mb-3">
            Featured Products
          </h2>
          <p className="text-gray-600 text-lg max-w-2xl mx-auto">
            Discover authentic African products from verified sellers across the
            continent
          </p>
        </div>

        {/* Products Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
          {products?.map((product) => {
            const salePriceConverted = convertPrice(
              product.salePrice ?? product.price ?? 0,
              product.currency
            );
            const priceConverted = product.price
              ? convertPrice(product.price, product.currency)
              : null;

            return (
              <Link href={`/products/${product._id}`} key={product._id}>
                <Card className="group hover:shadow-xl transition-all duration-300 border-0 bg-white">
                  <CardContent className="p-0">
                    {/* Product Image */}
                    <div className="relative overflow-hidden rounded-t-lg">
                      <img
                        src={product.images?.[0] || "/placeholder.svg"}
                        alt={product.title}
                        className="w-full h-40 object-cover group-hover:scale-105 transition-transform duration-300"
                      />

                      <Button
                        size="sm"
                        variant="ghost"
                        className="absolute top-2 right-2 bg-white/80 hover:bg-white text-gray-600 hover:text-red-500 w-8 h-8 p-0"
                        onClick={() => handleAddToWishlist(product._id)}
                      >
                        <Heart className="w-4 h-4" />
                      </Button>
                    </div>

                    {/* Product Info */}
                    <div className="p-3">
                      <h3 className="font-semibold text-[#0F4F2A] mb-2 text-sm line-clamp-2 group-hover:text-[#F4B400] transition-colors">
                        {product.title}
                      </h3>

                      <div className="flex items-center mb-2">
                        <div className="flex items-center">
                          {[...Array(5)].map((_, i) => (
                            <Star
                              key={i}
                              className={`w-3 h-3 ${
                                i < Math.floor(product.rating || 0)
                                  ? "text-yellow-400 fill-current"
                                  : "text-gray-300"
                              }`}
                            />
                          ))}
                        </div>
                        <span className="text-xs text-gray-500 ml-1">
                          ({product.rating || 0})
                        </span>
                      </div>

                      <div className="flex items-center justify-between mb-2">
                        <div className="flex items-center space-x-1">
                          <span className="text-base font-bold text-[#0F4F2A]">
                            {symbolMap[currency]}{" "}
                            {salePriceConverted?.toFixed(2)}
                          </span>
                          {priceConverted && (
                            <span className="text-xs text-gray-500 line-through">
                              {symbolMap[currency]} {priceConverted.toFixed(2)}
                            </span>
                          )}
                        </div>
                      </div>

                      <Button
                        onClick={() => handleAddToCart(product)}
                        className="w-full bg-[#F4B400] hover:bg-[#e6a200] text-[#0F4F2A] font-medium text-xs h-8"
                      >
                        <ShoppingCart className="w-3 h-3 mr-1" />
                        Add to Cart
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              </Link>
            );
          })}
        </div>

        <div className="text-center mt-8">
          <Link href="/products">
            <Button
              size="lg"
              variant="outline"
              className="border-[#0F4F2A] text-[#0F4F2A] hover:bg-[#0F4F2A] hover:text-white bg-transparent"
            >
              View All Products
            </Button>
          </Link>
        </div>
      </div>
    </section>
  );
}
