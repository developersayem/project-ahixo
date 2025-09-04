"use client";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { IProduct } from "@/types/product-type";
import {
  CheckCircle,
  Heart,
  Mail,
  MessageCircle,
  MessagesSquare,
  Minus,
  Plus,
  ShoppingCart,
  Star,
  XCircle,
} from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";

interface InfoProps {
  product: IProduct;
}

export function Info({ product }: InfoProps) {
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
    <div className="space-y-6 px-5 md:mx-0 mx-auto">
      <div className="space-y-4">
        <h1 className="text-md font-bold text-gray-900">{product.title}</h1>

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

        <div className="flex items-center gap-4 text-sm">
          <div>
            <span className="text-gray-600">Brand:</span>
            <span className="font-medium ml-1 capitalize">{product.brand}</span>
          </div>
          <div className="flex items-center gap-2">
            {product.warranty ? (
              <Badge
                variant="outline"
                className="flex items-center gap-1 text-green-600 border-green-600 p-1 rounded-none front-semibold"
              >
                <CheckCircle className="h-4 w-4" />
                Warranty Available
              </Badge>
            ) : (
              <Badge
                variant="outline"
                className="flex items-center gap-1 text-red-600 border-red-600  p-1 rounded-none front-semibold"
              >
                <XCircle className="h-4 w-4" />
                No Warranty
              </Badge>
            )}
          </div>
        </div>

        <div className="flex items-center gap-6">
          {product.isInHouseProduct && (
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
      {/* Product price */}
      <div className="flex items-center gap-20">
        <span className="text-sm text-gray-600">Price</span>
        <div className="flex items-center gap-2">
          <span className="text-md text-gray-500 line-through">
            ${product.price ?? 0}
          </span>
          <div className="text-md font-bold text-brand-600">
            ${product.salePrice}
            <sub className="text-sm text-gray-400 font-light">/pc</sub>
          </div>
        </div>
      </div>
      {/* Product colors */}
      <div className="flex items-center gap-20">
        <span className="text-sm text-gray-600 block mb-2">Color</span>
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
      {/* Product quantity */}
      <div className="flex items-center gap-14">
        <span className="text-sm text-gray-600 block mb-2">Quantity</span>
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
      {/* Product total price */}
      <div className="flex items-center gap-10">
        <span className="text-sm text-gray-600">Total Price</span>
        <div className="text-xl font-bold text-brand-600">
          ${(product?.salePrice ?? 0 * quantity).toLocaleString()}
        </div>
      </div>
      {/* Product actions */}

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
            {product.stock === 0 ? "Buy Now" : "Out of Stock"}
          </Button>
        </div>

        <div className="space-y-4">
          <div className="flex items-center text-sm gap-15">
            <span className="text-sm text-gray-600">Refund</span>
            <div className="flex items-center gap-2">
              <Image
                src="/images/refund-sticker.png"
                alt=""
                width={200}
                height={64}
              />
              <Link
                href="#"
                className="text-green-600 hover:text-green-700 underline font-semibold text-xs"
              >
                View Policy
              </Link>
            </div>
          </div>
          {/* refund and share section */}
          <div className="flex items-center gap-20">
            <span className="text-sm text-gray-600">Share</span>
            <div className="flex gap-2">
              <Button
                size="sm"
                className="bg-blue-500 hover:bg-blue-600 text-white p-2 h-6 w-6 rounded-none"
              >
                <Mail className="w-4 h-4" />
              </Button>
              <Button
                size="sm"
                className="bg-sky-400 hover:bg-sky-500 text-white p-2 h-6 w-6 rounded-none"
              >
                <svg
                  className="w-4 h-4"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path d="M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723c-.951.555-2.005.959-3.127 1.184a4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.212.085 4.936 4.936 0 004.604 3.417 9.867 9.867 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.053 0 13.998-7.496 13.998-13.985 0-.21 0-.42-.015-.63A9.935 9.935 0 0024 4.59z" />
                </svg>
              </Button>
              <Button
                size="sm"
                className="bg-blue-600 hover:bg-blue-700 text-white p-2 h-6 w-6 rounded-none"
              >
                <svg
                  className="w-4 h-4"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
                </svg>
              </Button>
              <Button
                size="sm"
                className="bg-blue-700 hover:bg-blue-800 text-white p-2 h-6 w-6 rounded-none"
              >
                <svg
                  className="w-4 h-4"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
                </svg>
              </Button>
              <Button
                size="sm"
                className="bg-green-500 hover:bg-green-600 text-white p-2 h-6 w-6 rounded-none"
              >
                <MessageCircle className="w-4 h-4" />
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
