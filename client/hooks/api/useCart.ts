// hooks/useCart.ts
import { useMemo } from "react";
import useSWR from "swr";
import { fetcher } from "@/lib/fetcher";
import { useAuth } from "@/contexts/auth-context";
import { ICartItem } from "@/types/cart.type";
import api from "@/lib/axios";
import { toast } from "sonner";

export const useCart = () => {
  const { user } = useAuth();
  const isBuyer = user?.role === "buyer";

  // Fetch cart only if logged in as buyer
  const { data, error, mutate } = useSWR<{ success: boolean; data: ICartItem[] }>(
    isBuyer ? `/api/v1/buyer/cart` : null,
    fetcher
  );

  // ---------------- Cart Items ----------------
  const cartItems = useMemo(() => (isBuyer ? data?.data || [] : []), [data, isBuyer]);

  // ---------------- Group items by category ----------------
  const groupedItems = useMemo(() => {
    return cartItems.reduce<Record<string, ICartItem[]>>((acc, item) => {
      const category = item.category || "Uncategorized";
      if (!acc[category]) acc[category] = [];
      acc[category].push(item);
      return acc;
    }, {});
  }, [cartItems]);

  // ---------------- Calculations ----------------
  const subtotal = useMemo(
    () =>
      cartItems.reduce((acc, item) => {
        const effectivePrice = item.salePrice ?? item.price;
        return acc + effectivePrice * item.quantity;
      }, 0),
    [cartItems]
  );

  const totalShippingCost = useMemo(
    () => cartItems.reduce((acc, item) => acc + (item.shippingCost ?? 0), 0),
    [cartItems]
  );

  const totalCartItems = useMemo(
    () => cartItems.reduce((acc, item) => acc + item.quantity, 0),
    [cartItems]
  );

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

  const tax = 0; // Add tax calculation logic if needed
  const total = subtotal + totalShippingCost + tax;

  // ---------------- Update Quantity ----------------
  const updateQuantity = async (itemId: string, quantity: number) => {
    if (!isBuyer || quantity < 1) return;
    try {
      const res = await api.put(`/api/v1/buyer/cart/update/${itemId}`, { quantity });
      if (res.data.success) {
        mutate(); // refresh SWR cache
        toast.success("Cart quantity updated");
      }
    } catch (err) {
      console.error("Failed to update quantity:", err);
      toast.error("Failed to update quantity");
    }
  };

  // ---------------- Remove Item ----------------
  const removeItem = async (itemId: string) => {
    if (!isBuyer) return;
    try {
      const res = await api.delete(`/api/v1/buyer/cart/remove/${itemId}`);
      if (res.data.success) {
        mutate(); // refresh SWR cache
        toast.success("Item removed from cart");
      }
    } catch (err) {
      console.error("Failed to remove item:", err);
      toast.error("Failed to remove item");
    }
  };

  // ---------------- Add Item to Cart (optional helper) ----------------
  const addItem = async (item: Partial<ICartItem> & { productId: string; quantity?: number }) => {
    if (!isBuyer) return;
    try {
      const payload = {
  productId: item.productId,
  quantity: item.quantity && item.quantity > 0 ? item.quantity : 1,
  selectedColor: item.selectedColor || null,
  selectedSize: item.selectedSize || null,
  customOptions: item.customOptions || {},
};
      const res = await api.post("/api/v1/buyer/cart/add", payload);
      if (res.data.success) {
        mutate();
        toast.success("Item added to cart");
      }
    } catch (err) {
      console.error("Failed to add item to cart:", err);
      toast.error("Failed to add item to cart");
    }
  };

  return {
    cartItems,
    groupedItems,
    isLoading: isBuyer && !error && !data,
    isError: !!error,
    mutateCart: mutate,
    subtotal,
    totalShippingCost,
    totalCartItems,
    totalDiscount,
    tax,
    total,
    updateQuantity,
    removeItem,
    addItem,
  };
};
