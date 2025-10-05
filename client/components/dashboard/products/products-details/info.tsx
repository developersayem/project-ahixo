"use client";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { IProduct } from "@/types/product-type";
import {
  CheckCircle,
  Heart,
  MessagesSquare,
  Minus,
  Plus,
  ShoppingCart,
  Star,
  XCircle,
} from "lucide-react";
import { useState } from "react";

interface InfoProps {
  product: IProduct;
}

export function Info({ product }: InfoProps) {
  const availableColors = product.colors || ["white"];
  const [selectedColor, setSelectedColor] = useState(availableColors[0]);
  const [quantity, setQuantity] = useState(1);

  // currency symbol (fallback to $)
  const currencySymbol =
    product.currency === "NGN"
      ? "₦"
      : product.currency === "USD"
      ? "$"
      : product.currency === "EUR"
      ? "€"
      : product.currency === "BDT"
      ? "৳"
      : product.currency === "INR"
      ? "₹"
      : "$";

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

  const totalPrice = (product.salePrice ?? product.price ?? 0) * quantity;

  return (
    <div className="space-y-6 px-5 md:mx-0 mx-auto">
      {/* Product Title */}
      <div className="space-y-4">
        <h1 className="text-md font-bold text-gray-900">{product.title}</h1>

        {/* Rating + Wishlist */}
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-1">
            {[...Array(5)].map((_, i) => (
              <Star
                key={i}
                className={`w-4 h-4 ${
                  i < (product?.rating ?? 0)
                    ? "fill-[#f79113] text-[#f79113]"
                    : "text-gray-300"
                }`}
              />
            ))}
            <span className="text-sm text-gray-600 ml-1">
              ({product?.ratings?.length || 0} reviews)
            </span>
          </div>

          <Button variant="ghost" size="sm" className="cursor-pointer">
            <Heart className="w-4 h-4 mr-2" />
            Add to wishlist
          </Button>
        </div>

        {/* Brand + Warranty */}
        <div className="flex items-center gap-4 text-sm">
          <div>
            <span className="text-gray-600">Brand:</span>
            <span className="font-medium ml-1 capitalize">{product.brand}</span>
          </div>
          <div className="flex items-center gap-2">
            {product.warranty ? (
              <Badge
                variant="outline"
                className="flex items-center gap-1 text-green-600 border-green-600 p-1 rounded-none font-semibold"
              >
                <CheckCircle className="h-4 w-4" />
                Warranty Available
              </Badge>
            ) : (
              <Badge
                variant="outline"
                className="flex items-center gap-1 text-red-600 border-red-600 p-1 rounded-none font-semibold"
              >
                <XCircle className="h-4 w-4" />
                No Warranty
              </Badge>
            )}
          </div>
        </div>

        {/* Seller + Chat */}
        <div className="flex items-center gap-6">
          {product.inHouseProduct && (
            <Badge
              variant="secondary"
              className="bg-brand-100 text-brand-800 p-[5px] rounded-none text-sm px-3"
            >
              Inhouse product
            </Badge>
          )}
          <Button
            size="sm"
            className="bg-[#f79113] hover:bg-[#c87510] text-white rounded-none"
          >
            <MessagesSquare />
            <span>Message Seller</span>
          </Button>
        </div>
      </div>

      {/* Product Price */}
      <div className="flex items-center gap-20">
        <span className="text-sm text-gray-600">Price</span>
        <div className="flex items-center gap-2">
          <span className="text-md text-gray-500 line-through">
            {currencySymbol}
            {product.price.toLocaleString()}
          </span>
          <div className="text-md font-bold text-brand-600">
            {currencySymbol}
            {product.salePrice?.toLocaleString()}
            <sub className="text-sm text-gray-400 font-light">/pc</sub>
          </div>
        </div>
      </div>

      {/* Colors */}
      <div className="flex items-center gap-20">
        <span className="text-sm text-gray-600">Color</span>
        <div className="flex gap-2">
          {availableColors.map((color) => (
            <button
              key={color}
              onClick={() => setSelectedColor(color)}
              className={`w-8 h-8 border-2 ${
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

      {/* Quantity */}
      <div className="flex items-center gap-14">
        <span className="text-sm text-gray-600">Quantity</span>
        <div className="flex items-center gap-2">
          <button
            onClick={() => setQuantity(Math.max(1, quantity - 1))}
            className="w-[29px] h-[29px] bg-gray-200 hover:bg-brand-50 text-gray-300 flex items-center justify-center "
          >
            <Minus size={15} className="text-black" />
          </button>
          <span className="w-fit px-2 font-bold text-center">{quantity}</span>
          <button
            onClick={() => setQuantity(quantity + 1)}
            className="w-[29px] h-[29px] bg-gray-200 text-gray-300 flex items-center justify-center hover:bg-brand-50"
          >
            <Plus size={15} className="text-black font-[13px]" />
          </button>
          <span className="text-sm text-gray-600 ml-2">
            {product?.stock === 0 ? "Out of stock" : "In stock"}:{" "}
            {product.stock} <span className="text-sm font-light">pc</span>
          </span>
        </div>
      </div>

      {/* Total */}
      <div className="flex items-center gap-10">
        <span className="text-sm text-gray-600">Total Price</span>
        <div className="text-xl font-bold text-brand-600">
          {currencySymbol}
          {totalPrice.toLocaleString()}
        </div>
      </div>

      {/* Buttons */}
      <div className="space-y-6">
        <div className="flex gap-3 md:w-1/2">
          <Button
            className="flex-1 bg-transparent hover:bg-brand-600 hover:text-white text-brand-500 border border-brand-500 font-semibold rounded-none py-5"
            disabled={product.stock === 0}
          >
            <ShoppingCart className="w-4 h-4 mr-2" />
            Add to cart
          </Button>
          <Button
            className="flex-1 bg-brand-600 border border-brand-600 hover:bg-brand-700 text-white py-5 rounded-none font-semibold"
            disabled={product.stock === 0}
          >
            {product.stock === 0 ? "Out of Stock" : "Buy Now"}
          </Button>
        </div>
      </div>
    </div>
  );
}
