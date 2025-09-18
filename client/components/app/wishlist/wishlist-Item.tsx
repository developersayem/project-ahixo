"use client";

import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Trash2, Minus, Plus, ShoppingCart } from "lucide-react";
import { cn } from "@/lib/utils";
import type { WishlistItem } from "@/types/wishlist.type";

interface WishlistItemRowProps {
  item: WishlistItem;
  onUpdateQuantity: (id: string, quantity: number) => void;
  onRemoveItem: (id: string) => void;
  onAddToCart: (id: string) => void;
}

export function WishlistItem({
  item,
  onUpdateQuantity,
  onRemoveItem,
  onAddToCart,
}: WishlistItemRowProps) {
  const getStatusColor = (status: string) => {
    switch (status) {
      case "In Stock":
        return "bg-green-50 text-green-700 border-green-200";
      case "Out of Stock":
        return "bg-red-50 text-red-700 border-red-200";
      case "Limited Stock":
        return "bg-amber-50 text-amber-700 border-amber-200";
      default:
        return "bg-gray-50 text-gray-700 border-gray-200";
    }
  };

  const isOutOfStock = item.status === "Out of Stock";

  return (
    <tr className="border-b border-gray-100 hover:bg-gray-50 transition-colors">
      {/* Product Info */}
      <td className="p-3 sm:p-5">
        <div className="flex flex-col sm:flex-row items-start sm:items-center space-y-2 sm:space-y-0 sm:space-x-4">
          <div className="relative h-20 w-20 rounded-lg overflow-hidden bg-gray-100 flex-shrink-0">
            <Image
              src={item.image}
              alt={item.name}
              fill
              className="object-cover"
              sizes="80px"
            />
          </div>
          <div className="flex-1 min-w-0">
            <h3 className="font-semibold text-gray-900 mb-1 text-sm sm:text-base leading-5">
              {item.name}
            </h3>
            {item.description && (
              <p className="text-xs sm:text-sm text-gray-600 mb-1 line-clamp-2">
                {item.description}
              </p>
            )}
            <span className="text-xs sm:text-sm text-gray-500 bg-gray-100 px-2 py-1 rounded-full">
              {item.category}
            </span>
          </div>
        </div>
      </td>

      {/* Price */}
      <td className="p-3 sm:p-5 text-left sm:text-center">
        <div className="flex flex-col items-start sm:items-center">
          <span className="text-sm sm:text-lg font-semibold text-gray-900">
            ${item.price}
          </span>
          {item.originalPrice && (
            <span className="text-xs sm:text-sm text-gray-500 line-through">
              ${item.originalPrice}
            </span>
          )}
        </div>
      </td>

      {/* Quantity */}
      <td className="p-3 sm:p-6">
        <div className="flex items-center space-x-1 sm:space-x-2">
          <Button
            variant="outline"
            size="icon"
            className="h-6 w-6 sm:h-8 sm:w-8"
            onClick={() =>
              onUpdateQuantity(item._id, Math.max(1, item.quantity - 1))
            }
            disabled={isOutOfStock}
          >
            <Minus className="h-2 w-2 sm:h-3 sm:w-3" />
          </Button>
          <span className="w-6 sm:w-8 text-center font-medium text-gray-900 text-xs sm:text-sm">
            {item.quantity}
          </span>
          <Button
            variant="outline"
            size="icon"
            className="h-6 w-6 sm:h-8 sm:w-8"
            onClick={() => onUpdateQuantity(item._id, item.quantity + 1)}
            disabled={isOutOfStock}
          >
            <Plus className="h-2 w-2 sm:h-3 sm:w-3" />
          </Button>
        </div>
      </td>

      {/* Status */}
      <td className="p-3 sm:p-6 text-left sm:text-center">
        <Badge
          variant="outline"
          className={cn(
            "text-xs sm:text-sm font-medium",
            getStatusColor(item.status)
          )}
        >
          {item.status}
        </Badge>
      </td>

      {/* Actions */}
      <td className="p-3 sm:p-6">
        <div className="flex flex-col sm:flex-row items-start sm:items-center space-y-1 sm:space-y-0 sm:space-x-2">
          <Button
            variant="default"
            size="sm"
            className="h-8 px-3 w-full sm:w-auto"
            onClick={() => onAddToCart(item._id)}
            disabled={isOutOfStock}
          >
            <ShoppingCart className="h-3 w-3 mr-1" />
            Add to Cart
          </Button>
          <Button
            variant="ghost"
            size="icon"
            className="h-8 w-8 bg-red-500 text-white hover:bg-red-50 hover:text-red-500"
            onClick={() => onRemoveItem(item._id)}
          >
            <Trash2 className="h-3 w-3" />
          </Button>
        </div>
      </td>
    </tr>
  );
}
