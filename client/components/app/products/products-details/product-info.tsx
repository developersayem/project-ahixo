"use client";

import type { Product } from "@/app/data/products";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Heart, Shield, ShoppingCart, Star } from "lucide-react";
import { useState } from "react";

interface ProductInfoProps {
  product: Product;
}

export function ProductInfo({ product }: ProductInfoProps) {
  const availableColors = product.colors || ["white"];
  const [selectedColor, setSelectedColor] = useState(availableColors[0]);
  const [quantity, setQuantity] = useState(1);

  const colorClasses: Record<string, string> = {
    white: "bg-white border-gray-300",
    black: "bg-black",
    blue: "bg-blue-500",
    pink: "bg-pink-300",
    red: "bg-red-500",
    gray: "bg-gray-500",
    green: "bg-green-500",
    yellow: "bg-yellow-400",
    purple: "bg-purple-500",
  };

  return (
    <div className="space-y-6">
      <div className="space-y-4">
        <h1 className="text-2xl font-bold text-gray-900">{product.name}</h1>

        <div className="flex items-center gap-4">
          <div className="flex items-center gap-1">
            {[...Array(5)].map((_, i) => (
              <Star
                key={i}
                className={`w-4 h-4 ${
                  i < product.rating
                    ? "fill-yellow-400 text-yellow-400"
                    : "text-gray-300"
                }`}
              />
            ))}
            <span className="text-sm text-gray-600 ml-1">
              ({product.reviewCount || 0} reviews)
            </span>
          </div>

          <Button variant="ghost" size="sm" className="cursor-pointer">
            <Heart className="w-4 h-4 mr-2" />
            Add to wishlist
          </Button>
        </div>

        <div className="flex items-center gap-4 text-sm">
          <div>
            <span className="text-gray-600">Brand:</span>
            <span className="font-medium ml-1">{product.brand}</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="text-gray-600">Warranty:</span>
            <Badge variant="secondary" className="text-xs">
              {product.warranty || "No warranty"}
            </Badge>
          </div>
        </div>

        <div className="flex items-center gap-4">
          {product.isInhouseProduct && (
            <Badge
              variant="secondary"
              className="bg-brand-100 text-brand-800 p-2 rounded-none"
            >
              Inhouse product
            </Badge>
          )}
          <Button
            size="sm"
            className="bg-brand-500 hover:bg-brand-600 text-white rounded-none"
          >
            Message Seller
          </Button>
        </div>
      </div>
      <div>
        <span className="text-sm text-gray-600">Price</span>
        <div className="flex items-center gap-2">
          {product.originalPrice && product.originalPrice > product.price && (
            <span className="text-lg text-gray-500 line-through">
              ${product.originalPrice.toLocaleString()}
            </span>
          )}
          <div className="text-3xl font-bold text-brand-600">
            ${product.price.toLocaleString()}
          </div>
        </div>
      </div>

      <div>
        <span className="text-sm text-gray-600 block mb-2">Color</span>
        <div className="flex gap-2">
          {availableColors.map((color) => (
            <button
              key={color}
              onClick={() => setSelectedColor(color)}
              className={`w-8 h-8 rounded border-2 ${
                colorClasses[color.toLowerCase()] || "bg-gray-300"
              } ${
                selectedColor === color
                  ? "ring-2 ring-brand-500 ring-offset-2"
                  : ""
              }`}
              title={color}
            />
          ))}
        </div>
      </div>

      <div>
        <span className="text-sm text-gray-600 block mb-2">Quantity</span>
        <div className="flex items-center gap-2">
          <button
            onClick={() => setQuantity(Math.max(1, quantity - 1))}
            className="w-8 h-8 rounded border border-gray-300 flex items-center justify-center hover:bg-gray-50"
          >
            -
          </button>
          <span className="w-12 text-center">{quantity}</span>
          <button
            onClick={() => setQuantity(quantity + 1)}
            className="w-8 h-8 rounded border border-gray-300 flex items-center justify-center hover:bg-gray-50"
          >
            +
          </button>
          <span className="text-sm text-gray-600 ml-2">
            ({product.inStock ? "In stock" : "Out of stock"})
          </span>
        </div>
      </div>
      <div>
        <span className="text-sm text-gray-600">Total Price</span>
        <div className="text-2xl font-bold text-brand-600">
          ${(product.price * quantity).toLocaleString()}
        </div>
      </div>
      {/* Product actions */}

      <div className="space-y-6">
        <div className="flex gap-3">
          <Button
            className="flex-1 bg-transparent hover:bg-brand-600 hover:text-white text-brand-500 border border-brand-500 font-medium py-3"
            disabled={!product.inStock}
          >
            <ShoppingCart className="w-4 h-4 mr-2" />
            Add to cart
          </Button>
          <Button
            className="flex-1 bg-brand-600 hover:bg-brand-700 text-white font-medium py-3"
            disabled={!product.inStock}
          >
            {product.inStock ? "Buy Now" : "Out of Stock"}
          </Button>
        </div>

        <div className="flex items-center gap-2 text-sm">
          <Shield className="w-4 h-4 text-green-600" />
          <span className="text-green-600">30 Days Cash Back Guarantee</span>
        </div>
      </div>
    </div>
  );
}
