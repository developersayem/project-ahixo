"use client";

import { useState } from "react";
import { OrderStatusFilter } from "@/components/app/orders/order-status-filter";
import { EmptyOrders } from "@/components/app/orders/empty-orders";
import { OrderCard } from "@/components/app/orders/order-card";
import useSWR from "swr";
import { fetcher } from "@/lib/fetcher";
import { useAuth } from "@/contexts/auth-context";
import { IOrder } from "@/types/order-type";
import api from "@/lib/axios";
import { toast } from "sonner";

export default function OrdersPage() {
  const [activeTab, setActiveTab] = useState("all");
  const { user } = useAuth();

  const {
    data: orderRes,
    // error,
    mutate: ordersResMutate,
  } = useSWR(`/api/v1/${user?.role}/orders/`, fetcher);
  const orders = orderRes?.data || [];

  console.log(orderRes);

  const removeItemFromOrder = async (orderId: string, productId: string) => {
    // /api/v1/buyer/orders/:orderId/product/:productId
    await api.delete(
      `/api/v1/${user?.role}/orders/${orderId}/product/${productId}`
    );
    ordersResMutate();
    toast.success("Product removed from order successfully");
  };

  const cancelOrder = async (orderId: string) => {
    await api.put(`/api/v1/${user?.role}/orders/${orderId}/cancel`);
    ordersResMutate();
    toast.success("Order canceled successfully");
  };

  const filteredOrders = orders.filter((order: IOrder) => {
    if (activeTab === "all") return true;
    if (activeTab === "cancelled") return order.status === "canceled";
    return order.status === activeTab;
  });

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mx-auto">
        <h1 className="text-3xl font-serif font-bold text-foreground mb-8">
          My Orders
        </h1>

        <OrderStatusFilter
          activeStatus={activeTab}
          onStatusChange={setActiveTab}
        />

        {/* orders card */}
        <div className="space-y-4">
          {filteredOrders.length === 0 ? (
            <EmptyOrders />
          ) : (
            filteredOrders.map((order: IOrder) => (
              <OrderCard
                key={order._id}
                order={order}
                onRemoveItem={removeItemFromOrder}
                onCancelOrder={cancelOrder}
              />
            ))
          )}
        </div>
      </div>
    </div>
  );
}
