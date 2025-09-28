/* eslint-disable @next/next/no-img-element */
"use client";

import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { useCreateOrder } from "@/contexts/create-order-context";
import { useCart } from "@/hooks/api/useCart";
import { ICartItem } from "@/types/cart.type";
import { X } from "lucide-react";
import { useRouter } from "next/navigation";
import React from "react";

const CartPage = () => {
  const router = useRouter();
  const {
    isLoading,
    isError,
    groupedItems,
    subtotal,
    totalShippingCost,
    totalCartItems,
    totalDiscount,
    tax,
    total,
    updateQuantity,
    removeItem,
  } = useCart();

  const context = useCreateOrder();
  if (!context)
    throw new Error("CartPage must be used inside CreateOrderProvider");

  const { setCartFromCartPage, clearOrder } = context;

  // --- Handle Proceed to Checkout ---
  const handleProceedToCheckout = () => {
    const itemsForCheckout: ICartItem[] = Object.values(groupedItems)
      .flat()
      .map((item) => {
        const effectivePrice =
          item.salePrice && item.salePrice < item.price
            ? item.salePrice
            : item.price;

        const cleanedItem: ICartItem = {
          _id: item.productId || "",
          title: item.name || item.title || "",
          images: [item.image],
          image: item.image,
          price: item.price,
          salePrice: item.salePrice,
          quantity: item.quantity,
          total: effectivePrice * item.quantity,
          shippingCost: item.shippingCost,
          category: item.category,
          stock: item.stock,
          sellerId: item.sellerId,
          rating: item.rating || 0,
          colors: item.colors?.length ? item.colors : undefined,
          sizes: item.sizes?.length ? item.sizes : undefined,
          warranty: item.warranty || undefined,
          selectedColor: item.selectedColor || undefined,
          selectedSize: item.selectedSize || undefined,
          customOptions: Object.keys(item.customOptions || {}).length
            ? item.customOptions
            : undefined,
        };

        // Remove undefined fields dynamically
        return Object.fromEntries(
          Object.entries(cleanedItem).filter(
            ([v]) => v !== undefined && v !== null
          )
        ) as ICartItem;
      });

    clearOrder();
    setCartFromCartPage(itemsForCheckout);

    router.push("/checkout");
  };

  if (isLoading) return <div>Loading...</div>;
  if (isError) return <div>Error loading cart</div>;

  return (
    <div className="flex justify-center p-4 bg-gray-50 min-h-screen">
      <div className="w-full max-w-7xl flex flex-col lg:flex-row justify-between gap-6">
        {/* Left side: Cart Items */}
        <div className="w-full lg:w-2/3">
          {Object.entries(groupedItems).map(([category, items]) => (
            <div key={category} className="mb-8">
              <h2 className="text-xl font-semibold mb-4 capitalize border-b pb-2">
                {category} ({items.length})
              </h2>
              {items.map((item) => (
                <div
                  key={item._id}
                  className="flex flex-col sm:flex-row items-center sm:items-start py-4 border-b hover:bg-gray-100 transition rounded-md px-2"
                >
                  <img
                    src={item.image}
                    alt={item.title}
                    className="w-24 h-24 object-cover rounded-md shadow-sm mr-4"
                  />

                  <div className="flex-1 flex flex-col gap-1">
                    <p className="text-base font-medium">{item.title}</p>
                    <div className="flex items-center gap-2 text-sm">
                      <span className="line-through text-gray-400">
                        ${item.price.toFixed(2)}
                      </span>
                      <span className="text-red-600 font-semibold">
                        ${item.salePrice?.toFixed(2) || item.price.toFixed(2)}
                      </span>
                      {item.salePrice && item.salePrice < item.price && (
                        <span className="text-green-600 ml-2">
                          You save $
                          {(
                            item.price -
                            item.salePrice * item.quantity
                          ).toFixed(2)}
                        </span>
                      )}
                    </div>

                    {/* Selected Options */}
                    <div className="flex flex-wrap gap-2 mt-1 text-sm">
                      {item.selectedColor && (
                        <div className="flex items-center gap-1">
                          <span className="font-medium">Color:</span>
                          <span
                            className="w-5 h-5 rounded-full border"
                            style={{ backgroundColor: item.selectedColor }}
                          />
                        </div>
                      )}
                      {item.selectedSize && (
                        <span className="px-2 py-0.5 rounded-md bg-gray-200 text-gray-700">
                          Size: {item.selectedSize}
                        </span>
                      )}
                      {item.warranty && (
                        <span className="px-2 py-0.5 rounded-md bg-green-100 text-green-800 font-medium">
                          Warranty Included
                        </span>
                      )}
                      {item.customOptions &&
                        Object.entries(item.customOptions).map(
                          ([key, value]) => (
                            <span
                              key={key}
                              className="px-2 py-0.5 rounded-md bg-blue-100 text-blue-800 font-medium"
                            >
                              {key}: {value}
                            </span>
                          )
                        )}
                    </div>
                  </div>

                  {/* Quantity Controls */}
                  <div className="flex items-center gap-2 mt-3 sm:mt-0">
                    <button
                      className="w-8 h-8 bg-gray-200 rounded-full flex justify-center items-center hover:bg-gray-300 transition"
                      onClick={() =>
                        updateQuantity(item._id, item.quantity - 1)
                      }
                    >
                      -
                    </button>
                    <span className="px-3">{item.quantity}</span>
                    <button
                      className="w-8 h-8 bg-gray-200 rounded-full flex justify-center items-center hover:bg-gray-300 transition"
                      onClick={() =>
                        updateQuantity(item._id, item.quantity + 1)
                      }
                    >
                      +
                    </button>
                  </div>

                  {/* Total Price */}
                  <p className="text-base font-semibold ml-4 mt-3 sm:mt-0">
                    $
                    {(item.salePrice && item.salePrice < item.price
                      ? item.salePrice
                      : item.price) * item.quantity}
                  </p>

                  {/* Remove Button */}
                  <button
                    className="ml-4 text-gray-500 hover:text-red-600 mt-3 sm:mt-0 transition"
                    onClick={() => removeItem(item._id)}
                  >
                    <X size={20} />
                  </button>
                </div>
              ))}
            </div>
          ))}
        </div>

        {/* Right side: Order Summary */}
        <div className="w-full lg:w-1/3">
          <Card className="shadow-md p-4">
            <h2 className="text-xl font-semibold border-b pb-2 mb-4">
              Order Summary
            </h2>
            <div className="flex flex-col gap-3">
              <div className="flex justify-between text-sm">
                <span>Total Products</span>
                <span>{totalCartItems}</span>
              </div>
              <div className="flex justify-between text-sm">
                <span>Subtotal ({totalCartItems} items)</span>
                <span>${subtotal.toFixed(2)}</span>
              </div>
              <div className="flex justify-between text-sm">
                <span>Tax</span>
                <span>${tax.toFixed(2)}</span>
              </div>
              <div className="flex justify-between text-sm">
                <span>Shipping</span>
                <span>${totalShippingCost.toFixed(2)}</span>
              </div>
              <div className="flex justify-between font-semibold border-t pt-2">
                <span>Total</span>
                <span>${total.toFixed(2)}</span>
              </div>
              <div className="flex justify-between text-sm text-red-600 font-medium">
                <span>You Saved</span>
                <span>-${totalDiscount.toFixed(2)}</span>
              </div>
              <Button
                className="w-full bg-red-500 hover:bg-red-600 text-white mt-2"
                onClick={handleProceedToCheckout}
              >
                Proceed to Checkout ({totalCartItems})
              </Button>
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default CartPage;
