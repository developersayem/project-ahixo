"use client";

import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Star } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { IProduct } from "@/types/product-type";
import { useCart } from "@/hooks/api/useCart";
import { toast } from "sonner";
import { usePathname, useRouter } from "next/navigation";
import { useCreateOrder } from "@/contexts/create-order-context";
import { useCurrency } from "@/contexts/currency-context";
import { IDictionary } from "@/types/locale/dictionary.type";

interface ProductCardProps {
  dict: IDictionary;
  product: IProduct;
}

export function ProductCard({ product, dict }: ProductCardProps) {
  const pathname = usePathname();
  const router = useRouter();
  const { addItem } = useCart();
  const { setCartFromBuyNow } = useCreateOrder();
  const { currency, symbolMap, convertPrice } = useCurrency();

  // Extract current locale from URL (e.g. /en/products)
  const locale = pathname.split("/")[1] || "en";

  if (!setCartFromBuyNow)
    throw new Error("ProductCard must be used inside CreateOrderProvider");

  const inStock = product.stock > 0;

  // =============================
  // 🔸 Convert product price to user currency
  // =============================
  const formatPrice = (price: number, fromCurrency?: string) => {
    const converted = convertPrice(price, fromCurrency || "USD");
    if (converted == null) return "—";
    const symbol = symbolMap[currency] || "$";
    return `${symbol}${converted.toLocaleString(undefined, {
      minimumFractionDigits: 0,
      maximumFractionDigits: 2,
    })}`;
  };

  // =============================
  // 🔸 Render stars
  // =============================
  const renderStars = (rating: number) =>
    Array.from({ length: 5 }, (_, i) => (
      <Star
        key={i}
        className={`h-3 w-3 ${
          i < rating
            ? "fill-yellow-400 text-yellow-400"
            : "fill-gray-200 text-gray-200"
        }`}
      />
    ));

  // =============================
  // 🔸 Add to cart
  // =============================
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

  // =============================
  // 🔸 Buy Now
  // =============================
  const handleBuyNow = () => {
    if (!inStock) return;
    try {
      setCartFromBuyNow(product, 1);
      router.push("/checkout");
    } catch (err) {
      console.error(err);
      toast.error("Failed to process Buy Now");
    }
  };

  // =============================
  // 🔸 Price logic
  // =============================
  const basePrice = product.price || 0;
  const salePrice =
    product.salePrice && product.salePrice < basePrice
      ? product.salePrice
      : basePrice;

  // =============================
  // 🔸 JSX
  // =============================
  return (
    <Card className="group hover:shadow-lg transition-transform duration-200 rounded-none h-full w-full border-gray-100 hover:scale-[1.02] py-0">
      <CardContent className="p-4 flex flex-col h-full">
        <Link href={`/${locale}/products/${product._id}`}>
          {/* 🖼️ Image */}
          <div className="relative aspect-square mb-4 bg-gray-50 overflow-hidden">
            <Image
              src={product.images?.[0] || "/placeholder.svg"}
              alt={product.title}
              fill
              className="object-contain group-hover:scale-105 transition-transform duration-200"
            />
          </div>

          {/* 📝 Info */}
          <div className="flex flex-col flex-1 justify-between space-y-2">
            <h3 className="text-sm font-medium text-foreground leading-tight line-clamp-2">
              {product.title}
            </h3>

            <div className="flex items-center gap-1">
              {renderStars(Number(product.rating || 0))}
            </div>

            {/* 💰 Price */}
            <div className="flex flex-col">
              {product.salePrice && product.salePrice < product.price && (
                <span className="text-xs text-gray-500 line-through">
                  {formatPrice(product.price, product.currency)}
                </span>
              )}
              <span className="text-lg font-semibold text-foreground">
                {formatPrice(salePrice, product.currency)}
              </span>
            </div>
          </div>
        </Link>

        {/* 🛒 Buttons */}
        <div className="flex flex-col md:flex-col gap-2 mt-auto">
          <Button
            size="sm"
            className="flex-1 py-2 bg-brand-500 hover:bg-brand-600 text-white rounded-none"
            onClick={handleBuyNow}
            disabled={!inStock}
          >
            {inStock ? dict.products.products_card.buy_now : "Out of Stock"}
          </Button>

          <Button
            disabled={!inStock}
            onClick={handleAddToCart}
            size="sm"
            variant="outline"
            className="flex-1 py-2 border-brand-500 text-brand-500 hover:bg-brand-50 bg-transparent rounded-none"
          >
            {dict.products.products_card.add_to_cart}
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}
