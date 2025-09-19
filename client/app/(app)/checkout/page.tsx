/* eslint-disable @next/next/no-img-element */
"use client";

import { useState } from "react";
import { useCart } from "@/hooks/api/useCart";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Separator } from "@/components/ui/separator";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import api from "@/lib/axios";
import { toast } from "sonner";
import { useRouter } from "next/navigation";

const CheckoutPage = () => {
  const {
    cartItems,
    subtotal,
    totalShippingCost,
    totalDiscount,
    tax,
    total,
    totalCartItems,
  } = useCart();

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

  const router = useRouter();

  const handlePlaceOrder = async () => {
    try {
      if (!formData.fullName || !formData.phone || !formData.address) {
        toast.error("Please fill all required fields");
        return;
      }

      if (cartItems.length === 0) {
        toast.error("Your cart is empty");
        return;
      }

      setLoading(true);

      // Prepare products for backend (no sellerId required)
      const orderPayload = {
        shippingAddress: `${formData.address}, ${formData.city}, ${formData.postalCode}`,
        phone: formData.phone,
        note: formData.note,
        paymentMethod: formData.paymentMethod,
        products: cartItems.map((item) => ({
          product: item._id,
          quantity: item.quantity,
          price:
            item.salePrice && item.salePrice < item.price
              ? item.salePrice
              : item.price,
          name: item.name,
        })),
        total,
      };

      const res = await api.post("/api/v1/buyer/orders", orderPayload, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });

      if (!res.data.success) {
        throw new Error(res.data.message || "Failed to place order");
      }

      toast.success("Order placed successfully!");
      router.push("/orders"); // Redirect to orders page
    } catch (error: unknown) {
      console.error("Error placing order:", error);
      toast.error("Something went wrong while placing order");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container mx-auto p-4 lg:p-8 grid grid-cols-1 lg:grid-cols-3 gap-6">
      {/* Left: Address & Payment */}
      <div className="lg:col-span-2 space-y-6">
        {/* Shipping Address */}
        <Card>
          <CardHeader>
            <CardTitle>Shipping Address</CardTitle>
          </CardHeader>
          <CardContent className="grid gap-4">
            <div className="space-y-2">
              <Label>Full Name</Label>
              <Input
                name="fullName"
                value={formData.fullName}
                onChange={handleChange}
                placeholder="John Doe"
              />
            </div>
            <div className="space-y-2">
              <Label>Phone Number</Label>
              <Input
                name="phone"
                value={formData.phone}
                onChange={handleChange}
                placeholder="+1XXXXXXXXX"
              />
            </div>
            <div className="space-y-2">
              <Label>Address</Label>
              <Textarea
                name="address"
                value={formData.address}
                onChange={handleChange}
                placeholder="Street address, house, apartment, etc."
              />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label>City</Label>
                <Input
                  name="city"
                  value={formData.city}
                  onChange={handleChange}
                  placeholder="City"
                />
              </div>
              <div className="space-y-2">
                <Label>Postal Code</Label>
                <Input
                  name="postalCode"
                  value={formData.postalCode}
                  onChange={handleChange}
                  placeholder="1207"
                />
              </div>
            </div>
            <div className="space-y-2">
              <Label>Order Note</Label>
              <Textarea
                name="note"
                value={formData.note}
                onChange={handleChange}
                placeholder="Any special instruction for delivery..."
              />
            </div>
          </CardContent>
        </Card>

        {/* Payment Method */}
        <Card>
          <CardHeader>
            <CardTitle>Payment Method</CardTitle>
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
                <Label htmlFor="cod">Cash on Delivery</Label>
              </div>
            </RadioGroup>
          </CardContent>
        </Card>
      </div>

      {/* Right: Order Summary */}
      <div>
        <Card className="shadow-md">
          <CardHeader>
            <CardTitle>Order Summary</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {/* Items */}
            <div className="space-y-2 max-h-64 overflow-y-auto pr-2">
              {cartItems.map((item) => (
                <div
                  key={item._id}
                  className="flex justify-between items-center border-b pb-2"
                >
                  <div className="flex items-center gap-2">
                    <img
                      src={item.image}
                      alt={item.name}
                      className="w-12 h-12 object-cover rounded"
                    />
                    <div>
                      <p className="text-sm font-medium">{item.name}</p>
                      <p className="text-xs text-gray-500">
                        {item.quantity} × $
                        {item.salePrice && item.salePrice < item.price
                          ? item.salePrice.toFixed(2)
                          : item.price.toFixed(2)}
                      </p>
                    </div>
                  </div>
                  <p className="text-sm font-semibold">
                    $
                    {(
                      (item.salePrice && item.salePrice < item.price
                        ? item.salePrice
                        : item.price) * item.quantity
                    ).toFixed(2)}
                  </p>
                </div>
              ))}
            </div>

            <Separator />

            {/* Summary */}
            <div className="flex justify-between text-sm">
              <span>Subtotal</span>
              <span>${subtotal.toFixed(2)}</span>
            </div>
            <div className="flex justify-between text-sm">
              <span>Shipping</span>
              <span>${totalShippingCost.toFixed(2)}</span>
            </div>
            <div className="flex justify-between text-sm">
              <span>Tax</span>
              <span>${tax.toFixed(2)}</span>
            </div>
            <div className="flex justify-between text-sm text-green-600">
              <span>You Saved</span>
              <span>- ${totalDiscount.toFixed(2)}</span>
            </div>
            <div className="flex justify-between font-bold border-t pt-2">
              <span>Total</span>
              <span>${total.toFixed(2)}</span>
            </div>

            <Button
              className="w-full bg-red-500 hover:bg-red-600 text-white mt-4"
              onClick={handlePlaceOrder}
              disabled={loading}
            >
              {loading
                ? "Placing Order..."
                : `Place Order (${totalCartItems} Items)`}
            </Button>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default CheckoutPage;
