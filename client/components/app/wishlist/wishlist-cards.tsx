"use client";

import Image from "next/image";
import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Trash2, Minus, Plus, ShoppingCart } from "lucide-react";
import { cn } from "@/lib/utils";
import type { WishlistItem } from "@/types/wishlist.type";

export interface WishlistProps {
  items: WishlistItem[];
  onUpdateQuantity?: (id: string, quantity: number) => void;
  onRemoveItem?: (id: string) => void;
  onAddToCart?: (id: string, quantity: number) => void;
}

export function WishlistCards({
  items: initialItems,
  onUpdateQuantity,
  onRemoveItem,
  onAddToCart,
}: WishlistProps) {
  // Set default quantity to 1 if undefined
  const [items, setItems] = useState<WishlistItem[]>(
    initialItems.map((item) => ({ ...item, quantity: item.quantity || 1 }))
  );

  useEffect(() => {
    setItems(
      initialItems.map((item) => ({ ...item, quantity: item.quantity || 1 }))
    );
  }, [initialItems]);

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

  const updateQuantity = (id: string, quantity: number) => {
    setItems((prev) =>
      prev.map((item) => (item._id === id ? { ...item, quantity } : item))
    );
    if (onUpdateQuantity) onUpdateQuantity(id, quantity);
  };

  const removeItem = (id: string) => {
    setItems((prev) => prev.filter((item) => item._id !== id));
    if (onRemoveItem) onRemoveItem(id);
  };

  const addToCart = (id: string) => {
    const item = items.find((i) => i._id === id);
    if (!item) return;
    if (onAddToCart) onAddToCart(id, item.quantity);
  };

  if (items.length === 0) {
    return (
      <div className="text-center py-12">
        <div className="mx-auto mb-4 rounded-full bg-gray-100 flex items-center justify-center">
          <svg
            className="w-12 h-12 text-gray-400"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={1.5}
              d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
            />
          </svg>
        </div>
        <h3 className="text-lg font-medium text-gray-900 mb-2">
          Your wishlist is empty
        </h3>
        <p className="text-gray-600 mb-4">
          Start adding items to your wishlist to keep track of products you
          love.
        </p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
      {items.map((item) => {
        const isOutOfStock = item.status === "Out of Stock";

        return (
          <div
            key={item._id}
            className="bg-white rounded-xl border border-gray-200 shadow-sm p-4 flex flex-col"
          >
            {/* Product Image */}
            <div className="relative w-full h-48 rounded-lg overflow-hidden mb-3">
              <Image
                src={item.image}
                alt={item.name}
                fill
                className="object-cover"
                sizes="100%"
              />
            </div>

            {/* Product Info */}
            <div className="flex-1 flex flex-col justify-between">
              <div>
                <h3 className="font-semibold text-gray-900 mb-1 text-sm sm:text-base line-clamp-2">
                  {item.name}
                </h3>
                {item.description && (
                  <p className="text-xs sm:text-sm text-gray-600 mb-2 line-clamp-3">
                    {item.description}
                  </p>
                )}
                <span className="text-xs sm:text-sm text-gray-500 bg-gray-100 px-2 py-1 rounded-full">
                  {item.category}
                </span>
              </div>

              {/* Price & Quantity */}
              <div className="mt-3 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2">
                <div>
                  <span className="text-sm sm:text-lg font-semibold text-gray-900">
                    ${item.price}
                  </span>
                  {item.originalPrice && (
                    <span className="text-xs sm:text-sm text-gray-500 line-through ml-2">
                      ${item.originalPrice}
                    </span>
                  )}
                </div>

                {/* Quantity Selector */}
                <div className="flex items-center space-x-2">
                  <Button
                    variant="outline"
                    size="icon"
                    className="h-8 w-8"
                    onClick={() =>
                      updateQuantity(item._id, Math.max(1, item.quantity - 1))
                    }
                    disabled={isOutOfStock}
                  >
                    <Minus className="h-3 w-3" />
                  </Button>
                  <span className="w-6 text-center font-medium text-gray-900">
                    {item.quantity}
                  </span>
                  <Button
                    variant="outline"
                    size="icon"
                    className="h-8 w-8"
                    onClick={() => updateQuantity(item._id, item.quantity + 1)}
                    disabled={isOutOfStock}
                  >
                    <Plus className="h-3 w-3" />
                  </Button>
                </div>
              </div>

              {/* Status */}
              <div className="mt-2">
                <Badge
                  variant="outline"
                  className={cn(
                    "text-xs sm:text-sm font-medium",
                    getStatusColor(item.status)
                  )}
                >
                  {item.status}
                </Badge>
              </div>

              {/* Actions */}
              <div className="mt-3 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2">
                <Button
                  variant="default"
                  size="sm"
                  className="h-8 w-full sm:w-auto"
                  onClick={() => addToCart(item._id)}
                  disabled={isOutOfStock}
                >
                  <ShoppingCart className="h-3 w-3 mr-1" />
                  Add to Cart
                </Button>
                <Button
                  variant="ghost"
                  size="icon"
                  className="h-8 w-8 bg-red-500 text-white hover:bg-red-50 hover:text-red-500"
                  onClick={() => removeItem(item._id)}
                >
                  <Trash2 className="h-3 w-3" />
                </Button>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}
