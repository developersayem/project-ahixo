"use client";

import { useMemo } from "react";
import useSWR from "swr";
import { fetcher } from "@/lib/fetcher";
import { useAuth } from "@/contexts/auth-context";
import { ICartItem } from "@/types/cart.type";
import api from "@/lib/axios";
import { toast } from "sonner";
import { useCurrency } from "@/contexts/currency-context"; // ✅ Import your currency context

export const useCart = () => {
  const { user } = useAuth();
  const isBuyer = user?.role === "buyer";

  const { currency, convertPrice } = useCurrency(); // ✅ get selected currency & converter

  // ---------------- Fetch Cart ----------------
  const { data, error, mutate } = useSWR<{ success: boolean; data: ICartItem[] }>(
    isBuyer ? `/api/v1/buyer/cart` : null,
    fetcher
  );

  // ---------------- Cart Items ----------------
  const cartItems = useMemo(() => (isBuyer ? data?.data || [] : []), [data, isBuyer]);

  // ---------------- Group by Category ----------------
  const groupedItems = useMemo(() => {
    return cartItems.reduce<Record<string, ICartItem[]>>((acc, item) => {
      const category = item.category || "Uncategorized";
      if (!acc[category]) acc[category] = [];
      acc[category].push(item);
      return acc;
    }, {});
  }, [cartItems]);

  // ---------------- Calculations ----------------
  const subtotal = useMemo(() => {
    return cartItems.reduce((acc, item) => {
      const effectivePrice = item.salePrice ?? item.price;
      // ✅ Convert each item's price to selected currency
      const convertedPrice = convertPrice ? convertPrice(effectivePrice, item.currency || "USD") : effectivePrice;
      return acc + (convertedPrice ?? 0) * item.quantity;
    }, 0);
  }, [cartItems, convertPrice]);

  const totalShippingCost = useMemo(() => {
    return cartItems.reduce((acc, item) => acc + (item.shippingCost ?? 0), 0);
  }, [cartItems]);

  const totalCartItems = useMemo(() => {
    return cartItems.reduce((acc, item) => acc + item.quantity, 0);
  }, [cartItems]);

  const totalDiscount = useMemo(() => {
    return cartItems.reduce((acc, item) => {
      if (item.salePrice && item.salePrice < item.price) {
        const discount = item.price - item.salePrice;
        const convertedDiscount = convertPrice ? convertPrice(discount, item.currency || "USD") : discount;
        return acc + (convertedDiscount ?? 0) * item.quantity;
      }
      return acc;
    }, 0);
  }, [cartItems, convertPrice]);

  const tax = 0; // Add tax logic if needed
  const total = subtotal + totalShippingCost + tax;

  // ---------------- Update Quantity ----------------
  const updateQuantity = async (itemId: string, quantity: number) => {
    if (!isBuyer || quantity < 1) return;
    try {
      const res = await api.put(`/api/v1/buyer/cart/update/${itemId}`, { quantity });
      if (res.data.success) {
        mutate();
        toast.success("Cart quantity updated");
      }
    } catch (err) {
      console.error("❌ Failed to update quantity:", err);
      toast.error("Failed to update quantity");
    }
  };

  // ---------------- Remove Item ----------------
  const removeItem = async (itemId: string) => {
    if (!isBuyer) return;
    try {
      const res = await api.delete(`/api/v1/buyer/cart/remove/${itemId}`);
      if (res.data.success) {
        mutate();
        toast.success("Item removed from cart");
      }
    } catch (err) {
      console.error("❌ Failed to remove item:", err);
      toast.error("Failed to remove item");
    }
  };

  // ---------------- Add Item ----------------
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
      await mutate(); // refresh SWR cache
      return res.data.data; // optional: return updated cart
    }
  } catch (err) {
    console.error("❌ Failed to add item to cart:", err);
    toast.error("Failed to add item to cart");
  }
};


  // ---------------- Return ----------------
  return {
    cartItems,
    groupedItems,
    isLoading: isBuyer && !error && !data,
    isError: !!error,
    subtotal,
    totalShippingCost,
    totalCartItems,
    totalDiscount,
    tax,
    total,
    currency, // ✅ expose selected currency
    mutateCart: mutate,
    updateQuantity,
    removeItem,
    addItem,
  };
};
