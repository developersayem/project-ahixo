"use client";

import { Button } from "@/components/ui/button";
import { WishlistCards } from "@/components/app/wishlist/wishlist-cards";
import useSWR from "swr";
import { fetcher } from "@/lib/fetcher";
import { useAuth } from "@/contexts/auth-context";
import { useRouter } from "next/navigation";
import api from "@/lib/axios";
import { toast } from "sonner";
import { useCart } from "@/hooks/api/useCart";

export default function WishlistPage() {
  const { user } = useAuth();
  const router = useRouter();
  const { mutateCart } = useCart();

  const {
    data: wishlistRes,
    // error,
    mutate: wishlistResMutate,
  } = useSWR(`/api/v1/${user?.role}/wishlist/`, fetcher);
  const wishlistItems = wishlistRes?.data || [];

  const handleUpdateQuantity = (id: string, quantity: number) => {
    console.log(id, quantity);
  };

  const handleRemoveItem = async (id: string) => {
    const res = await api.delete(`/api/v1/${user?.role}/wishlist/${id}`);
    if (res.data.success)
      toast.success("Product removed from order successfully");
    wishlistResMutate();
  };

  const handleAddToCart = async (productId: string, quantity: number) => {
    try {
      const res = await api.post(`/api/v1/${user?.role}/cart/add`, {
        productId,
        quantity,
      });
      if (res.data.success) {
        await mutateCart();
        toast.success("Added to cart");
      }
    } catch (error) {
      console.log(error);
      toast.error("Something went wrong");
    }
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
          <WishlistCards
            items={wishlistItems}
            onUpdateQuantity={handleUpdateQuantity}
            onRemoveItem={handleRemoveItem}
            onAddToCart={handleAddToCart} // <-- pass the function itself, do NOT call it
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
                <Button
                  variant="outline"
                  onClick={() => router.push("/products")}
                >
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
