"use client";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Heart,
  Mail,
  MessageCircle,
  MessagesSquare,
  Minus,
  Plus,
  ShoppingCart,
  Star,
} from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { IProduct } from "@/types/product-type";
import { MessageSellerModal } from "./message-seller-modal";

interface ProductInfoProps {
  product: IProduct;
}

export function ProductInfo({ product }: ProductInfoProps) {
  const availableColors =
    product.colors && product.colors.length > 0 ? product.colors : ["white"];
  const [selectedColor, setSelectedColor] = useState(availableColors[0]);
  const [quantity, setQuantity] = useState(1);
  const [isModalOpen, setIsModalOpen] = useState(false);

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

  const inStock = product.stock > 0;

  return (
    <div className="space-y-6 px-5 md:mx-0 mx-auto">
      <div className="space-y-4">
        {/* Title */}
        <h1 className="text-md font-bold text-gray-900">{product.title}</h1>

        {/* Rating + Wishlist */}
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-1">
            {[...Array(5)].map((_, i) => (
              <Star
                key={i}
                className={`w-4 h-4 ${
                  i < (product.rating || 0)
                    ? "fill-[#f79113] text-[#f79113]"
                    : "text-gray-300"
                }`}
              />
            ))}
            <span className="text-sm text-gray-600 ml-1">
              ({product.ratings?.length || 0} reviews)
            </span>
          </div>

          <Button variant="ghost" size="sm" className="cursor-pointer">
            <Heart className="w-4 h-4 mr-2" />
            Add to wishlist
          </Button>
        </div>

        {/* Brand + Warranty */}
        <div className="flex items-center gap-4 text-sm">
          {product.brand && (
            <div>
              <span className="text-gray-600">Brand:</span>
              <span className="font-medium ml-1">{product.brand}</span>
            </div>
          )}
          <div className="flex items-center gap-2">
            <span className="text-gray-600">Warranty:</span>
            <Badge variant="secondary" className="text-sm">
              {product.warranty ? "Warranty Available" : "No Warranty"}
            </Badge>
          </div>
        </div>

        {/* Labels + Message Seller */}
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
            onClick={() => setIsModalOpen(true)}
          >
            <MessagesSquare className="mr-2" />
            Message Seller
          </Button>
        </div>
      </div>

      {/* Price */}
      <div className="flex items-center gap-20">
        <span className="text-sm text-gray-600">Price</span>
        <div className="flex items-center gap-2">
          {product.salePrice && product.salePrice < product.price && (
            <span className="text-md text-gray-500 line-through">
              ${product.price.toLocaleString()}
            </span>
          )}
          <div className="text-md font-bold text-brand-600">
            ${(product.salePrice || product.price).toLocaleString()}
            <sub className="text-sm text-gray-400 font-light">/pc</sub>
          </div>
        </div>
      </div>

      {/* Colors */}
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

      {/* Quantity */}
      <div className="flex items-center gap-14">
        <span className="text-sm text-gray-600 block mb-2">Quantity</span>
        <div className="flex items-center gap-2">
          <button
            onClick={() => setQuantity(Math.max(1, quantity - 1))}
            className="w-[29px] h-[29px] bg-gray-200 hover:bg-brand-50 flex items-center justify-center"
          >
            <Minus size={15} className="text-black" />
          </button>
          <span className="w-fit px-2 font-bold text-center">{quantity}</span>
          <button
            onClick={() => setQuantity(quantity + 1)}
            className="w-[29px] h-[29px] bg-gray-200 flex items-center justify-center hover:bg-brand-50"
          >
            <Plus size={15} className="text-black" />
          </button>
          <span className="text-sm text-gray-600 ml-2">
            ({inStock ? "In stock" : "Out of stock"})
          </span>
        </div>
      </div>

      {/* Total Price */}
      <div className="flex items-center gap-10">
        <span className="text-sm text-gray-600">Total Price</span>
        <div className="text-xl font-bold text-brand-600">
          ${((product.salePrice || product.price) * quantity).toLocaleString()}
        </div>
      </div>

      {/* Actions */}
      <div className="space-y-6">
        <div className="flex gap-3 md:w-1/2">
          <Button
            className="flex-1 bg-transparent hover:bg-brand-600 hover:text-white text-brand-500 border border-brand-500 font-semibold rounded-none py-5"
            disabled={!inStock}
          >
            <ShoppingCart className="w-4 h-4 mr-2" />
            Add to cart
          </Button>
          <Button
            className="flex-1 bg-brand-600 border border-brand-600 hover:bg-brand-700 text-white py-5 rounded-none font-semibold"
            disabled={!inStock}
          >
            {inStock ? "Buy Now" : "Out of Stock"}
          </Button>
        </div>

        {/* Refund + Share */}
        <div className="space-y-4">
          <div className="flex items-center text-sm gap-16">
            <span className="text-sm text-gray-600">Refund</span>
            <div className="flex items-center gap-2">
              <Image
                src="/images/refund-sticker.png"
                alt="Refund Policy"
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

          <div className="flex items-center gap-20">
            <span className="text-sm text-gray-600">Share</span>
            <div className="flex gap-2">
              {/* Social Buttons */}
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
                {/* Twitter/X */}
                <svg
                  className="w-4 h-4"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path d="M23.953 4.57a10 10 0 01-2.825.775 4.958..." />
                </svg>
              </Button>
              <Button
                size="sm"
                className="bg-blue-600 hover:bg-blue-700 text-white p-2 h-6 w-6 rounded-none"
              >
                {/* Facebook */}
                <svg
                  className="w-4 h-4"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path d="M24 12.073c0-6.627-5.373-12-12-12s..." />
                </svg>
              </Button>
              <Button
                size="sm"
                className="bg-blue-700 hover:bg-blue-800 text-white p-2 h-6 w-6 rounded-none"
              >
                {/* LinkedIn */}
                <svg
                  className="w-4 h-4"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path d="M20.447 20.452h-3.554v-5.569..." />
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
      {/* Modal */}
      <MessageSellerModal
        open={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        sellerId={product.seller}
      />
    </div>
  );
}
