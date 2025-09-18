// hooks/useCart.ts (Fixed calculations section)
import { useMemo } from "react";
import useSWR from "swr";
import { fetcher } from "@/lib/fetcher";
import { useAuth } from "@/contexts/auth-context";
import { ICartItem } from "@/types/cart.type";
import api from "@/lib/axios";
import { toast } from "sonner";

export const useCart = () => {
  const { user } = useAuth();

  const { data, error, mutate } = useSWR<{ success: boolean; data: ICartItem[] }>(
    user ? `/api/v1/${user.role}/cart` : null,
    fetcher
  );

  const cartItems = useMemo(() => data?.data || [], [data]);

  // ---------------- Group items by category ----------------
  const groupedItems = useMemo(() => {
    return cartItems.reduce<Record<string, ICartItem[]>>((acc, item) => {
      const category = item.category || "Uncategorized";
      if (!acc[category]) acc[category] = [];
      acc[category].push(item);
      return acc;
    }, {});
  }, [cartItems]);

  // ---------------- FIXED CALCULATIONS ----------------
  
  // Calculate subtotal using sale price (or regular price if no sale price)
  const subtotal = useMemo(
    () => cartItems.reduce((acc, item) => {
      const effectivePrice = item.salePrice || item.price;
      return acc + (effectivePrice * item.quantity);
    }, 0),
    [cartItems]
  );

  const totalShippingCost = useMemo(
    () => cartItems.reduce((acc, item) => acc + item.ShoppingCost, 0),
    [cartItems]
  );

  const totalCartItems = useMemo(
    () => cartItems.reduce((acc, item) => acc + item.quantity, 0),
    [cartItems]
  );

  // Calculate total discount (difference between original and sale price)
  const totalDiscount = useMemo(
    () =>
      cartItems.reduce((acc, item) => {
        if (item.salePrice && item.salePrice < item.price) {
          return acc + (item.price - item.salePrice) * item.quantity;
        }
        return acc;
      }, 0),
    [cartItems]
  );

  const tax = 0;
  
  // Final total should be: subtotal + shipping + tax
  // (discount is already applied in subtotal calculation)
  const total = subtotal + totalShippingCost + tax;

  const updateQuantity = async (itemId: string, quantity: number) => {
    if (quantity < 1) return;
    try {
      const res = await api.put(`/api/v1/${user?.role}/cart/update/${itemId}`, {
        quantity,
      });
      if (res.data.success) mutate();
    } catch (err) {
      console.error("Failed to update quantity:", err);
      toast.error("Failed to update quantity");
    }
  };

  const removeItem = async (itemId: string) => {
    console.log(itemId);
    try {
      const res = await api.delete(
        `/api/v1/${user?.role}/cart/remove/${itemId}`
      );
      if (res.data.success) {
        mutate();
        toast.success("Item removed from cart");
      }
    } catch (err) {
      console.error("Failed to remove item:", err);
      toast.error("Failed to remove item");
    }
  };

  return {
    cartItems,
    groupedItems,
    isLoading: !error && !data,
    isError: !!error,
    mutateCart: mutate,
    subtotal,
    totalShippingCost,
    totalCartItems,
    totalDiscount,
    tax,
    total,
    updateQuantity,
    removeItem
  };
};