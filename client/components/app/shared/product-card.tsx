import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Star } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { IProduct } from "@/types/product-type";

interface ProductCardProps {
  product: IProduct;
}

export function ProductCard({ product }: ProductCardProps) {
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

  return (
    <Link href={`/products/${product._id}`} className="flex-1">
      <Card className="group hover:shadow-lg transition-shadow duration-200 rounded-none h-full w-full gap-0 p-0 m-0 border-gray-100 shadow-gray-100 hover:scale-102">
        <CardContent className="p-4 flex flex-col h-full">
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
              {/* Product Name (truncate with ...) */}
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

            {/* Buttons at bottom (consistent height) */}
            <div className="flex flex-col md:flex-row gap-2 mt-auto">
              <Button
                size="sm"
                className="flex-1 py-2 bg-brand-500 hover:bg-brand-600 text-white rounded-none"
              >
                Buy Now
              </Button>
              <Button
                size="sm"
                variant="outline"
                className="flex-1 py-2 border-brand-500 text-brand-500 hover:bg-brand-50 bg-transparent rounded-none"
              >
                Add to Cart
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>
    </Link>
  );
}
