/* eslint-disable @next/next/no-img-element */
"use client";

import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { useCreateOrder } from "@/contexts/create-order-context";
import { useCart } from "@/hooks/api/useCart";
import { ICartItem } from "@/types/cart.type";
import { X } from "lucide-react";
import { usePathname, useRouter } from "next/navigation";
import React from "react";
import { useCurrency } from "@/contexts/currency-context";
import { IDictionary } from "@/types/locale/dictionary.type";

const CartPageContent = ({ dict }: { dict: IDictionary }) => {
  const router = useRouter();
  const pathname = usePathname();
  const locale = pathname.split("/")[1] || "en";
  const { currency, convertPrice, symbolMap } = useCurrency(); // ✅ Currency context
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

        const convertedPrice = convertPrice
          ? convertPrice(effectivePrice, item.currency || "USD")
          : effectivePrice;

        const cleanedItem: ICartItem = {
          _id: item.productId || "",
          title: item.name || item.title || "",
          images: [item.image],
          image: item.image,
          price: item.price,
          salePrice: item.salePrice,
          quantity: item.quantity,
          total: (convertedPrice ?? effectivePrice) * item.quantity,
          shippingCost: item.shippingCost,
          category: item.category,
          stock: item.stock,
          currency: item.currency || "USD",
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

        return Object.fromEntries(
          Object.entries(cleanedItem).filter(
            ([v]) => v !== undefined && v !== null
          )
        ) as ICartItem;
      });

    clearOrder();
    setCartFromCartPage(itemsForCheckout);

    router.push(`/${locale}/checkout`);
  };

  if (isLoading) return <div>Loading...</div>;
  if (isError) return <div>Error loading cart</div>;
  if (Array.isArray(groupedItems) && groupedItems.length === 0)
    return (
      <div className="flex justify-center items-center text-lg">
        {dict.cart.empty}
      </div>
    );

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
              {items.map((item) => {
                const effectivePrice =
                  item.salePrice && item.salePrice < item.price
                    ? item.salePrice
                    : item.price;

                const convertedPrice = convertPrice
                  ? convertPrice(effectivePrice, item.currency || "USD")
                  : effectivePrice;

                const totalItemPrice = convertedPrice
                  ? convertedPrice * item.quantity
                  : 0;

                return (
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
                          {symbolMap[currency]}
                          {convertPrice
                            ? (
                                convertPrice(
                                  item.price,
                                  item.currency || "USD"
                                ) ?? item.price
                              ).toFixed(2)
                            : item.price.toFixed(2)}
                        </span>
                        <span className="text-red-600 font-semibold">
                          {symbolMap[currency]}
                          {convertedPrice?.toFixed(2)}
                        </span>
                        {item.salePrice && item.salePrice < item.price && (
                          <span className="text-green-600 ml-2">
                            {dict.cart.you_saved} {symbolMap[currency]}
                            {(
                              (item.price - item.salePrice) *
                              item.quantity
                            ).toFixed(2)}
                          </span>
                        )}
                      </div>

                      {/* Selected Options */}
                      <div className="flex flex-wrap gap-2 mt-1 text-sm">
                        {item.selectedColor && (
                          <div className="flex items-center gap-1">
                            <span className="font-medium">
                              {dict.cart.color}:
                            </span>
                            <span
                              className="w-5 h-5 rounded-full border"
                              style={{ backgroundColor: item.selectedColor }}
                            />
                          </div>
                        )}
                        {item.selectedSize && (
                          <span className="px-2 py-0.5 rounded-md bg-gray-200 text-gray-700">
                            {dict.cart.size}: {item.selectedSize}
                          </span>
                        )}
                        {item.warranty && (
                          <span className="px-2 py-0.5 rounded-md bg-green-100 text-green-800 font-medium">
                            {dict.cart.warranty_included}
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
                      {symbolMap[currency]}
                      {totalItemPrice.toFixed(2)}
                    </p>

                    {/* Remove Button */}
                    <button
                      className="ml-4 text-gray-500 hover:text-red-600 mt-3 sm:mt-0 transition"
                      onClick={() => removeItem(item._id)}
                    >
                      <X size={20} />
                    </button>
                  </div>
                );
              })}
            </div>
          ))}
        </div>

        {/* Right side: Order Summary */}
        <div className="w-full lg:w-1/3">
          <Card className="shadow-md p-4">
            <h2 className="text-xl font-semibold border-b pb-2 mb-4">
              {dict.cart.order_summary}
            </h2>
            <div className="flex flex-col gap-3">
              <div className="flex justify-between text-sm">
                <span>{dict.cart.total_products}</span>
                <span>{totalCartItems}</span>
              </div>
              <div className="flex justify-between text-sm">
                <span>
                  {dict.cart.sub_total} ({totalCartItems} {dict.cart.item})
                </span>
                <span>
                  {symbolMap[currency]}
                  {subtotal.toFixed(2)}
                </span>
              </div>
              <div className="flex justify-between text-sm">
                <span>{dict.cart.tax}</span>
                <span>
                  {symbolMap[currency]}
                  {tax.toFixed(2)}
                </span>
              </div>
              <div className="flex justify-between text-sm">
                <span>{dict.cart.shipping}</span>
                <span>
                  {symbolMap[currency]}
                  {totalShippingCost.toFixed(2)}
                </span>
              </div>
              <div className="flex justify-between font-semibold border-t pt-2">
                <span>{dict.cart.total}</span>
                <span>
                  {symbolMap[currency]}
                  {total.toFixed(2)}
                </span>
              </div>
              <div className="flex justify-between text-sm text-red-600 font-medium">
                <span>{dict.cart.you_saved}</span>
                <span>
                  -{symbolMap[currency]}
                  {totalDiscount.toFixed(2)}
                </span>
              </div>
              <Button
                className="w-full bg-red-500 hover:bg-red-600 text-white mt-2"
                onClick={handleProceedToCheckout}
              >
                {dict.cart.button} ({totalCartItems})
              </Button>
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default CartPageContent;
