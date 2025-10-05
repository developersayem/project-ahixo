"use client";

import React, {
  createContext,
  useContext,
  useState,
  useMemo,
  ReactNode,
} from "react";
import { IProduct } from "@/types/product-type";
import { ICartItem } from "@/types/cart.type";
import { useCurrency } from "@/contexts/currency-context";

interface CreateOrderContextType {
  cartItems: ICartItem[];
  subtotal: number;
  totalShippingCost: number;
  totalDiscount: number;
  tax: number;
  total: number;
  totalCartItems: number;
  setCartFromCartPage: (items: ICartItem[]) => void;
  setCartFromBuyNow: (product: IProduct, quantity?: number) => void;
  clearOrder: () => void;
}

const CreateOrderContext = createContext<CreateOrderContextType | null>(null);

export const CreateOrderProvider = ({ children }: { children: ReactNode }) => {
  const { convertPrice } = useCurrency();
  const [cartItems, setCartItems] = useState<ICartItem[]>([]);

  // ---------------- Calculations ----------------
  const subtotal = useMemo(() => {
    return cartItems.reduce((acc, item) => {
      const effectivePrice = item.salePrice ?? item.price;
      return (
        acc +
        (convertPrice?.(effectivePrice, item.currency || "USD") ??
          effectivePrice) *
          item.quantity
      );
    }, 0);
  }, [cartItems, convertPrice]);

  const totalShippingCost = useMemo(() => {
    return cartItems.reduce((acc, item) => {
      const shipping = item.shippingCost ?? 0;
      return (
        acc + (convertPrice?.(shipping, item.currency || "USD") ?? shipping)
      );
    }, 0);
  }, [cartItems, convertPrice]);

  const totalCartItems = useMemo(() => {
    return cartItems.reduce((acc, item) => acc + item.quantity, 0);
  }, [cartItems]);

  const totalDiscount = useMemo(() => {
    return cartItems.reduce((acc, item) => {
      if (item.salePrice && item.salePrice < item.price) {
        const discount = item.price - item.salePrice;
        return (
          acc +
          (convertPrice?.(discount, item.currency || "USD") ?? discount) *
            item.quantity
        );
      }
      return acc;
    }, 0);
  }, [cartItems, convertPrice]);

  const tax = 0;
  const total = subtotal + totalShippingCost + tax;

  // ---------------- Actions ----------------
  const setCartFromCartPage = (items: ICartItem[]) => setCartItems(items);

  const setCartFromBuyNow = (product: IProduct, quantity: number = 1) => {
    setCartItems([
      {
        _id: product._id,
        title: product.title,
        name: product.title,
        sellerId: product.seller,
        price: product.price,
        salePrice: product.salePrice,
        quantity,
        images: product.images,
        image: product.images[0],
        shippingCost: 10, // default shipping
        category: product.category,
        stock: product.stock,
        colors: product.colors,
        sizes: product.sizes,
        warranty: product.warranty,
        currency: product.currency,
        total: (product.salePrice ?? product.price) * quantity,
      },
    ]);
  };

  const clearOrder = () => setCartItems([]);

  return (
    <CreateOrderContext.Provider
      value={{
        cartItems,
        subtotal,
        totalShippingCost,
        totalDiscount,
        tax,
        total,
        totalCartItems,
        setCartFromCartPage,
        setCartFromBuyNow,
        clearOrder,
      }}
    >
      {children}
    </CreateOrderContext.Provider>
  );
};

export const useCreateOrder = () => {
  const context = useContext(CreateOrderContext);
  if (!context)
    throw new Error("useCreateOrder must be used inside CreateOrderProvider");
  return context;
};
