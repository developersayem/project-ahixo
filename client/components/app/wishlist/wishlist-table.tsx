"use client";

import { WishlistItem } from "@/types/wishlist.type";
import { WishlistItem as WishlistItemComponent } from "./wishlist-Item";

export interface WishlistProps {
  items: WishlistItem[];
  onUpdateQuantity: (id: string, quantity: number) => void;
  onRemoveItem: (id: string) => void;
  onAddToCart: (id: string) => void;
}
export function WishlistTable({
  items,
  onUpdateQuantity,
  onRemoveItem,
  onAddToCart,
}: WishlistProps) {
  if (items.length === 0) {
    return (
      <div className="text-center py-12">
        <div className="w-24 h-24 mx-auto mb-4 rounded-full bg-gray-100 flex items-center justify-center">
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
    <div className="bg-white rounded-xl border border-gray-200 overflow-hidden">
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead className="bg-gray-50/50">
            <tr>
              <th className="text-left py-4 pr-6 pl-6 text-sm font-semibold text-gray-900">
                Product
              </th>
              <th className="text-left py-4 px-6 text-sm font-semibold text-gray-900">
                Price
              </th>
              <th className="text-left py-4 px-6 text-sm font-semibold text-gray-900">
                Qty
              </th>
              <th className="text-left py-4 px-6 text-sm font-semibold text-gray-900">
                Status
              </th>
              <th className="text-left py-4 pl-6 pr-6 text-sm font-semibold text-gray-900">
                Actions
              </th>
            </tr>
          </thead>
          <tbody>
            {items.map((item) => (
              <WishlistItemComponent
                key={item.id}
                item={item}
                onUpdateQuantity={onUpdateQuantity}
                onRemoveItem={onRemoveItem}
                onAddToCart={onAddToCart}
              />
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
