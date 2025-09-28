"use client";

import React, { createContext, useContext, useState, useMemo } from "react";
import { IProduct } from "@/types/product-type";
import { ICartItem } from "@/types/cart.type";

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

export const CreateOrderProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [cartItems, setCartItems] = useState<ICartItem[]>([]);

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

  const tax = 0; // keep tax calculation same as useCart, can update later
  const total = subtotal + totalShippingCost + tax;

  // ---------------- Actions ----------------
  const setCartFromCartPage = (items: ICartItem[]) => setCartItems(items);

  const setCartFromBuyNow = (product: IProduct, quantity: number = 1) =>
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
        shippingCost: 10,
        category: product.category,
        stock: product.stock,
        colors: product.colors,
        sizes: product.sizes,
        warranty: product.warranty,
        total: (product.salePrice ?? product.price) * quantity,
      },
    ]);

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
  if (!context) {
    throw new Error("useCreateOrder must be used inside CreateOrderProvider");
  }
  return context;
};
