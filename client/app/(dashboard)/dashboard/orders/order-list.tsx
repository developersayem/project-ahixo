"use client";

import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Search,
  MoreHorizontal,
  Eye,
  Package,
  Truck,
  CheckCircle,
  XCircle,
  Clock,
} from "lucide-react";
import { OrderDetailsModal } from "./order-details-modal";
import { fetcher } from "@/lib/fetcher";
import useSWR from "swr";
import { IOrder } from "@/types/order-type";
import api from "@/lib/axios";
import { toast } from "sonner";

type OrderStatus = "all" | "processing" | "completed" | "on-hold" | "canceled";

export function OrderList({
  ordersStatsMutate,
}: {
  ordersStatsMutate?: () => void;
}) {
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState<OrderStatus>("all");
  const [selectedOrder, setSelectedOrder] = useState<IOrder | null>(null);

  const { data, error, isLoading, mutate } = useSWR(
    "/api/v1/admin/orders",
    fetcher
  );

  const orders: IOrder[] = data?.data || [];

  const filteredOrders = orders.filter((order: IOrder) => {
    const buyerName = order.buyer?.name || "Unknown Buyer";
    const orderNumber = `ORD-${order.orderNumber}`;
    const matchesSearch =
      order._id.toLowerCase().includes(searchTerm.toLowerCase()) ||
      orderNumber.toLowerCase().includes(searchTerm.toLowerCase()) ||
      buyerName.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus =
      statusFilter === "all" || order.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  const getStatusBadge = (status: string) => {
    const statusConfig = {
      processing: {
        label: "Processing",
        color: "bg-yellow-100 text-yellow-800",
      },
      completed: { label: "Completed", color: "bg-green-100 text-green-800" },
      "on-hold": { label: "On Hold", color: "bg-orange-100 text-orange-800" },
      canceled: { label: "Canceled", color: "bg-red-100 text-red-800" },
    };
    const config = statusConfig[status as keyof typeof statusConfig];
    return <Badge className={config.color}>{config.label}</Badge>;
  };

  const getStatusIcon = (status: string) => {
    const icons = {
      processing: Clock,
      completed: CheckCircle,
      "on-hold": Package,
      canceled: XCircle,
    };
    const Icon = icons[status as keyof typeof icons];
    return Icon ? <Icon className="h-4 w-4" /> : null;
  };

  const updateOrderStatus = async (orderId: string, newStatus: string) => {
    try {
      await api.put(
        `/api/v1/seller/orders/${orderId}/status`,
        { status: newStatus },
        {
          headers: { "Content-Type": "application/json" },
        }
      );
      toast.success("Order status updated successfully");
      mutate();
      if (ordersStatsMutate) {
        ordersStatsMutate();
      }
    } catch (error) {
      toast.error("Failed to update order status");
      console.error("Error updating order status:", error);
    }
  };

  if (error) {
    return (
      <div className="text-center py-8 text-red-600">
        There was a problem loading orders.
      </div>
    );
  }

  if (isLoading) {
    return (
      <div className="text-center py-8 text-muted-foreground">
        Loading orders...
      </div>
    );
  }

  return (
    <>
      <Card className="shadow-none rounded-none">
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle>Orders</CardTitle>
            <div className="flex items-center space-x-4">
              <div className="relative w-80">
                <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                <Input
                  placeholder="Search orders..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10 rounded-none"
                />
              </div>
              <Select
                value={statusFilter}
                onValueChange={(value: OrderStatus) => setStatusFilter(value)}
              >
                <SelectTrigger className="w-40 rounded-none">
                  <SelectValue placeholder="Filter by status" />
                </SelectTrigger>
                <SelectContent className="rounded-none">
                  <SelectItem value="all">All Orders</SelectItem>
                  <SelectItem value="processing">Processing</SelectItem>
                  <SelectItem value="completed">Completed</SelectItem>
                  <SelectItem value="on-hold">On Hold</SelectItem>
                  <SelectItem value="canceled">Canceled</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {filteredOrders.length > 0 ? (
              filteredOrders.map((order: IOrder) => (
                <div
                  key={order._id}
                  className="flex items-center justify-between p-4 border border-border"
                >
                  <div className="flex items-center space-x-4">
                    {getStatusIcon(order.status)}
                    <div>
                      <h3 className="text-lg">
                        <span>Order-</span>
                        <span>{order.orderNumber}</span>
                      </h3>
                      <p className="text-sm text-muted-foreground capitalize">
                        Placed by:{" "}
                        {order.buyer ? (
                          <span className="font-medium">
                            {order.buyer.name}
                          </span>
                        ) : (
                          <span className="italic">Unknown Buyer</span>
                        )}
                      </p>
                    </div>
                  </div>

                  <div className="flex items-center space-x-6">
                    <p className="text-sm text-muted-foreground">
                      {order.products.length} items
                    </p>
                    <p className="font-medium">${order.total}</p>

                    <p className="text-sm text-muted-foreground">
                      {new Intl.DateTimeFormat("en-US", {
                        year: "numeric",
                        month: "short",
                        day: "numeric",
                        hour: "numeric",
                        minute: "numeric",
                        hour12: true,
                      }).format(new Date(order.date))}
                    </p>
                    {getStatusBadge(order.status)}

                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" size="icon">
                          <MoreHorizontal className="h-4 w-4" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end" className="rounded-none">
                        <DropdownMenuItem
                          onClick={() => setSelectedOrder(order)}
                        >
                          <Eye className="h-4 w-4 mr-2" />
                          View Details
                        </DropdownMenuItem>
                        {order.status === "processing" && (
                          <>
                            <DropdownMenuItem
                              onClick={() =>
                                updateOrderStatus(order._id, "completed")
                              }
                            >
                              <CheckCircle className="h-4 w-4 mr-2" />
                              Mark as Completed
                            </DropdownMenuItem>
                            <DropdownMenuItem
                              onClick={() =>
                                updateOrderStatus(order._id, "on-hold")
                              }
                            >
                              <Package className="h-4 w-4 mr-2" />
                              Put on Hold
                            </DropdownMenuItem>
                          </>
                        )}
                        {order.status === "on-hold" && (
                          <DropdownMenuItem
                            onClick={() =>
                              updateOrderStatus(order._id, "processing")
                            }
                          >
                            <Truck className="h-4 w-4 mr-2" />
                            Resume Processing
                          </DropdownMenuItem>
                        )}
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </div>
                </div>
              ))
            ) : (
              <div className="text-center py-8">
                <p className="text-muted-foreground">No orders found.</p>
              </div>
            )}
          </div>
        </CardContent>
      </Card>

      {selectedOrder && (
        <OrderDetailsModal
          order={selectedOrder}
          onClose={() => setSelectedOrder(null)}
          onUpdateStatus={updateOrderStatus}
        />
      )}
    </>
  );
}
