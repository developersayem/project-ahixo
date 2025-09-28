"use client";

import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Star } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { IProduct } from "@/types/product-type";
import { useCart } from "@/hooks/api/useCart";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import { useCreateOrder } from "@/contexts/create-order-context";

interface ProductCardProps {
  product: IProduct;
}

export function ProductCard({ product }: ProductCardProps) {
  const router = useRouter();
  const { addItem } = useCart();
  const { setCartFromBuyNow } = useCreateOrder(); // ✅ use context

  if (!setCartFromBuyNow)
    throw new Error("ProductCard must be used inside CreateOrderProvider");

  const inStock = product.stock > 0;

  // --- Render stars ---
  const renderStars = (rating: number) => {
    return Array.from({ length: 5 }, (_, i) => (
      <Star
        key={i}
        className={`h-3 w-3 ${
          i < rating
            ? "fill-yellow-400 text-yellow-400"
            : "fill-gray-200 text-gray-200"
        }`}
      />
    ));
  };

  // --- Add to Cart ---
  const handleAddToCart = async () => {
    if (!inStock) return;
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

  // --- Buy Now ---
  const handleBuyNow = () => {
    if (!inStock) return;
    try {
      setCartFromBuyNow(product, 1); // ✅ set single product in order context
      router.push("/checkout"); // ✅ go to checkout page
    } catch (err) {
      console.error(err);
      toast.error("Failed to process Buy Now");
    }
  };

  return (
    <Card className="group hover:shadow-lg transition-shadow duration-200 rounded-none h-full w-full gap-0 p-0 m-0 border-gray-100 shadow-gray-100 hover:scale-102">
      <CardContent className="p-4 flex flex-col h-full">
        <Link href={`/products/${product._id}`}>
          {/* Product Image */}
          <div className="relative aspect-square mb-4 bg-gray-50 overflow-hidden">
            <Image
              src={product.images[0] || "/placeholder.svg"}
              alt={product.title}
              fill
              className="object-contain group-hover:scale-105 transition-transform duration-200"
            />
          </div>

          {/* Product Info */}
          <div className="flex flex-col flex-1 justify-between">
            <div className="space-y-2">
              <h3 className="text-sm font-medium text-foreground leading-tight line-clamp-2">
                {product.title}
              </h3>

              {/* Rating */}
              <div className="flex items-center gap-1">
                {renderStars(Number(product.rating))}
              </div>

              {/* Price */}
              <div className="text-lg font-semibold text-foreground mb-3">
                ${product.price.toLocaleString()}
              </div>
            </div>
          </div>
        </Link>

        {/* Buttons */}
        <div className="flex flex-col md:flex-row gap-2 mt-auto">
          <Button
            size="sm"
            className="flex-1 py-2 bg-brand-500 hover:bg-brand-600 text-white rounded-none"
            onClick={handleBuyNow} // ✅ buy now action
            disabled={!inStock}
          >
            Buy Now
          </Button>
          <Button
            disabled={!inStock}
            onClick={handleAddToCart}
            size="sm"
            variant="outline"
            className="flex-1 py-2 border-brand-500 text-brand-500 hover:bg-brand-50 bg-transparent rounded-none"
          >
            Add to Cart
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}
