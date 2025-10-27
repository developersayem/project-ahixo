/* eslint-disable @next/next/no-img-element */
"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Separator } from "@/components/ui/separator";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { toast } from "sonner";
import { usePathname, useRouter } from "next/navigation";
import { useCreateOrder } from "@/contexts/create-order-context";
import { useCurrency } from "@/contexts/currency-context";
import api from "@/lib/axios";
import { useCart } from "@/hooks/api/useCart";
import { IDictionary } from "@/types/locale/dictionary.type";

const CheckoutPageContents = ({ dict }: { dict: IDictionary }) => {
  const context = useCreateOrder();
  const { mutateCart } = useCart();
  const { currency, symbolMap, convertPrice } = useCurrency();
  const router = useRouter();
  const pathname = usePathname();
  const locale = pathname.split("/")[1] || "en";

  if (!context)
    throw new Error("CheckoutPage must be used inside CreateOrderProvider");

  const {
    cartItems,
    subtotal,
    totalShippingCost,
    totalDiscount,
    tax,
    total,
    totalCartItems,
    clearOrder,
  } = context;

  const [formData, setFormData] = useState({
    fullName: "",
    phone: "",
    address: "",
    city: "",
    postalCode: "",
    note: "",
    paymentMethod: "cod",
  });

  const [loading, setLoading] = useState(false);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handlePlaceOrder = async () => {
    if (!formData.fullName || !formData.phone || !formData.address) {
      toast.error("Please fill all required fields");
      return;
    }

    if (cartItems.length === 0) {
      toast.error("Your cart is empty");
      return;
    }

    setLoading(true);

    try {
      const orderPayload = {
        shippingAddress: `${formData.address}, ${formData.city}, ${formData.postalCode}`,
        phone: formData.phone,
        note: formData.note,
        paymentMethod: formData.paymentMethod,
        products: cartItems.map((item) => ({
          product: item._id,
          quantity: item.quantity,
          price: convertPrice
            ? convertPrice(item.salePrice ?? item.price, item.currency || "USD")
            : item.salePrice ?? item.price,
          shippingCost: convertPrice
            ? convertPrice(item.shippingCost || 0, item.currency || "USD")
            : item.shippingCost || 0,
          title: item.title,
        })),
        total: total,
        totalShippingCost: totalShippingCost,
        currency,
      };

      const res = await api.post("/api/v1/buyer/orders", orderPayload);
      if (!res.data.success)
        throw new Error(res.data.message || "Failed to place order");

      toast.success("Order placed successfully!");
      clearOrder();
      mutateCart();
      router.push(`/${locale}/orders`);
    } catch (err) {
      console.error("Order error:", err);
      toast.error("Something went wrong while placing order");
    } finally {
      setLoading(false);
    }
  };

  if (cartItems.length === 0) {
    return (
      <div className="container mx-auto p-8 text-center">
        <p className="text-lg font-semibold">{dict.checkout.empty}.</p>
        <Button className="mt-4" onClick={() => router.push("/")}>
          {dict.checkout.continue_shopping}
        </Button>
      </div>
    );
  }

  return (
    <div className="container mx-auto p-4 lg:p-8 grid grid-cols-1 lg:grid-cols-3 gap-6">
      {/* Left: Address & Payment */}
      <div className="lg:col-span-2 space-y-6">
        <Card>
          <CardHeader>
            <CardTitle>{dict.checkout.form.title}</CardTitle>
          </CardHeader>
          <CardContent className="grid gap-4">
            <div className="space-y-2">
              <Label>{dict.checkout.form.full_name}</Label>
              <Input
                name="fullName"
                value={formData.fullName}
                onChange={handleChange}
                placeholder={dict.checkout.form.full_name_placeholder}
              />
            </div>
            <div className="space-y-2">
              <Label>{dict.checkout.form.phone_number}</Label>
              <Input
                name="phone"
                value={formData.phone}
                onChange={handleChange}
                placeholder={dict.checkout.form.phone_number_placeholder}
              />
            </div>
            <div className="space-y-2">
              <Label>{dict.checkout.form.address}</Label>
              <Textarea
                name="address"
                value={formData.address}
                onChange={handleChange}
                placeholder={dict.checkout.form.address_placeholder}
              />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label>{dict.checkout.form.city}</Label>
                <Input
                  name="city"
                  value={formData.city}
                  onChange={handleChange}
                  placeholder={dict.checkout.form.city_placeholder}
                />
              </div>
              <div className="space-y-2">
                <Label>{dict.checkout.form.postal_code}</Label>
                <Input
                  name="postalCode"
                  value={formData.postalCode}
                  onChange={handleChange}
                  placeholder={dict.checkout.form.postal_code_placeholder}
                />
              </div>
            </div>
            <div className="space-y-2">
              <Label>
                {dict.checkout.form.order_note} ({dict.checkout.form.optional})
              </Label>
              <Textarea
                name="note"
                value={formData.note}
                onChange={handleChange}
                placeholder={dict.checkout.form.order_note_placeholder}
              />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>{dict.checkout.form.payment.title}</CardTitle>
          </CardHeader>
          <CardContent>
            <RadioGroup
              defaultValue={formData.paymentMethod}
              onValueChange={(val) =>
                setFormData((prev) => ({ ...prev, paymentMethod: val }))
              }
              className="space-y-3"
            >
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="cod" id="cod" />
                <Label htmlFor="cod">
                  {dict.checkout.form.payment.method1}
                </Label>
              </div>
            </RadioGroup>
          </CardContent>
        </Card>
      </div>

      {/* Right: Order Summary */}
      <div>
        <Card className="shadow-md">
          <CardHeader>
            <CardTitle>{dict.checkout.order_summary}</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2 max-h-64 overflow-y-auto pr-2">
              {cartItems.map((item) => {
                const effectivePrice = item.salePrice ?? item.price;
                const convertedPrice = convertPrice
                  ? convertPrice(effectivePrice, item.currency || "USD")
                  : effectivePrice;
                const convertedShipping = convertPrice
                  ? convertPrice(item.shippingCost || 0, item.currency || "USD")
                  : item.shippingCost || 0;

                return (
                  <div
                    key={item._id}
                    className="flex justify-between items-center border-b pb-2"
                  >
                    <div className="flex items-center gap-2">
                      <img
                        src={
                          item.image || item.images?.[0] || "/placeholder.svg"
                        }
                        alt={item.title}
                        className="w-12 h-12 object-cover rounded"
                      />
                      <div>
                        <p className="text-sm font-medium">{item.title}</p>
                        <p className="text-xs text-gray-700 pt-1 text-end">
                          {item.quantity} × {symbolMap[currency]}
                          {convertedPrice?.toFixed(2)} + {dict.checkout.ship}:{" "}
                          {symbolMap[currency]}
                          {convertedShipping?.toFixed(2)}
                        </p>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>

            <Separator />

            <div className="flex justify-between text-sm">
              <span>{dict.checkout.sub_total}</span>
              <span>
                {symbolMap[currency]}
                {subtotal.toFixed(2)}
              </span>
            </div>
            <div className="flex justify-between text-sm">
              <span>{dict.checkout.shipping}</span>
              <span>
                {symbolMap[currency]}
                {totalShippingCost.toFixed(2)}
              </span>
            </div>
            <div className="flex justify-between text-sm">
              <span>{dict.checkout.tax}</span>
              <span>
                {symbolMap[currency]}
                {tax.toFixed(2)}
              </span>
            </div>
            <div className="flex justify-between text-sm text-green-600">
              <span>{dict.checkout.you_saved}</span>
              <span>
                -{symbolMap[currency]}
                {totalDiscount.toFixed(2)}
              </span>
            </div>
            <div className="flex justify-between font-bold border-t pt-2">
              <span>{dict.checkout.total}</span>
              <span>
                {symbolMap[currency]}
                {total.toFixed(2)}
              </span>
            </div>

            <Button
              className="w-full bg-red-500 hover:bg-red-600 text-white mt-4"
              onClick={handlePlaceOrder}
              disabled={loading || cartItems.length === 0}
            >
              {loading
                ? `${dict.checkout.loading_button}`
                : `${dict.checkout.button} (${totalCartItems} ${dict.checkout.items})`}
            </Button>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default CheckoutPageContents;
