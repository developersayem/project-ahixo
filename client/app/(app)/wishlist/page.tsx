"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { WishlistTable } from "@/components/app/wishlist/wishlist-table";
import { WishlistItem } from "@/types/wishlist.type";
import { demoWishlistItems } from "./data";

export default function WishlistPage() {
  const [wishlistItems, setWishlistItems] =
    useState<WishlistItem[]>(demoWishlistItems);

  const handleUpdateQuantity = (id: string, quantity: number) => {
    setWishlistItems((items) =>
      items.map((item) => (item.id === id ? { ...item, quantity } : item))
    );
  };

  const handleRemoveItem = (id: string) => {
    setWishlistItems((items) => items.filter((item) => item.id !== id));
  };

  const handleAddToCart = (id: string) => {
    // Handle add to cart logic here
    console.log("Adding to cart:", id);
    // You could show a toast notification here
  };

  const handleContinueShopping = () => {
    // Navigate to products page
    console.log("Continue shopping");
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center justify-start mb-6">
            <div className="flex items-center space-x-3">
              <div>
                <h1 className="text-3xl font-bold text-gray-900">
                  My Wishlist
                </h1>
                <p className="text-gray-600 mt-1">
                  All your favorite items in one place.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Wishlist Table */}
        <div className="mb-8">
          <WishlistTable
            items={wishlistItems}
            onUpdateQuantity={handleUpdateQuantity}
            onRemoveItem={handleRemoveItem}
            onAddToCart={handleAddToCart}
          />
        </div>

        {/* Footer Actions */}
        {wishlistItems.length > 0 && (
          <div className="bg-white rounded-xl border border-gray-200 p-6">
            <div className="flex flex-col sm:flex-row items-center justify-between space-y-4 sm:space-y-0">
              <div className="text-center sm:text-left">
                <h3 className="text-lg font-semibold text-gray-900">
                  Ready to purchase?
                </h3>
              </div>
              <div className="flex space-x-3">
                <Button variant="outline" onClick={handleContinueShopping}>
                  Continue Shopping
                </Button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
