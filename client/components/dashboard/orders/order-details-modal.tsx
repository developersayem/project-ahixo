"use client";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Package, Truck, CheckCircle, MapPin, Mail, Clock } from "lucide-react";
import { IOrder } from "@/types/order-type";

interface OrderDetailsModalProps {
  order: IOrder;
  onClose: () => void;
  onUpdateStatus: (orderId: string, status: string) => void;
}

export function OrderDetailsModal({
  order,
  onClose,
  onUpdateStatus,
}: OrderDetailsModalProps) {
  const getStatusBadge = (status: string) => {
    const statusConfig = {
      processing: {
        label: "Processing",
        color: "bg-yellow-100 text-yellow-800",
        icon: Clock,
      },
      completed: {
        label: "Completed",
        color: "bg-green-100 text-green-800",
        icon: CheckCircle,
      },
      "on-hold": {
        label: "On Hold",
        color: "bg-orange-100 text-orange-800",
        icon: Package,
      },
      canceled: {
        label: "Canceled",
        color: "bg-red-100 text-red-800",
        icon: Package,
      },
    };

    const config = statusConfig[status as keyof typeof statusConfig];
    return <Badge className={config.color}>{config.label}</Badge>;
  };

  const getStatusIcon = (status: string) => {
    const statusConfig = {
      processing: Clock,
      completed: CheckCircle,
      "on-hold": Package,
      canceled: Package,
      refunded: Package,
    };

    const Icon = statusConfig[status as keyof typeof statusConfig] || Clock;
    return <Icon className="h-4 w-4" />;
  };

  const getStatusColor = (status: string) => {
    const colors = {
      processing: "text-yellow-600",
      completed: "text-green-600",
      "on-hold": "text-orange-600",
      canceled: "text-red-600",
      refunded: "text-purple-600",
    };
    return colors[status as keyof typeof colors] || "text-gray-600";
  };

  const handleStatusChange = (newStatus: string) => {
    onUpdateStatus(order._id, newStatus);
    onClose();
  };

  // Fallback timeline if not provided by API
  const getDefaultTimeline = () => {
    const timeline = [];

    // Order placed
    timeline.push({
      status: "processing" as const,
      timestamp: order.date,
      note: "Order placed",
    });

    // Add completed entry if status is completed
    if (order.status === "completed") {
      timeline.push({
        status: "completed" as const,
        timestamp: order.updatedAt || order.date,
        note: "Order completed",
      });
    }

    return timeline;
  };

  const timeline = order.timeline || getDefaultTimeline();

  return (
    <Dialog open={true} onOpenChange={onClose}>
      <DialogContent className="w-[90vw] max-h-[90vh] overflow-y-auto rounded-none">
        <DialogHeader>
          <DialogTitle className="flex items-center justify-start space-x-4">
            <span>Order Details - ORD-{order.orderNumber}</span>
            {getStatusBadge(order.status)}
          </DialogTitle>
        </DialogHeader>

        <div className="space-y-6">
          <div className="grid grid-cols-3 gap-3">
            {/* Customer Information */}
            <div className="col-span-2">
              <h3 className="font-medium mb-3">Customer Information</h3>
              <div className="space-y-2">
                <div className="flex items-center space-x-2 capitalize">
                  <Package className="h-4 w-4 text-muted-foreground" />
                  <span>{order.buyer?.name || "Unknown Buyer"}</span>
                </div>
                <div className="flex items-center space-x-2">
                  <Mail className="h-4 w-4 text-muted-foreground" />
                  <span>{order.buyer?.email || "No Email"}</span>
                </div>
                <div className="flex items-center space-x-2">
                  <MapPin className="h-4 w-4 text-muted-foreground" />
                  <span>{order.shippingAddress}</span>
                </div>
              </div>
            </div>
            {/* Status Management */}
            <div>
              <h3 className="font-medium">Order Status</h3>
              <div className="space-y-2">
                <Select value={order.status} onValueChange={handleStatusChange}>
                  <SelectTrigger className="w-fit rounded-none">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent className="rounded-none">
                    <SelectItem value="processing">Processing</SelectItem>
                    <SelectItem value="completed">Completed</SelectItem>
                    <SelectItem value="on-hold">On Hold</SelectItem>
                    <SelectItem value="canceled">Canceled</SelectItem>
                  </SelectContent>
                </Select>

                <div className="space-y-2">
                  {order.status === "processing" && (
                    <>
                      <Button
                        size="sm"
                        onClick={() => handleStatusChange("completed")}
                      >
                        <CheckCircle className="h-4 w-4 mr-2" />
                        Complete
                      </Button>
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => handleStatusChange("on-hold")}
                      >
                        <Package className="h-4 w-4 mr-2" />
                        Hold
                      </Button>
                    </>
                  )}
                  {order.status === "on-hold" && (
                    <Button
                      size="sm"
                      onClick={() => handleStatusChange("processing")}
                    >
                      <Truck className="h-4 w-4 mr-2" />
                      Resume
                    </Button>
                  )}
                </div>
              </div>
            </div>
          </div>

          <Separator />

          {/* Order Items */}
          <div>
            <h3 className="font-medium mb-3">Order Items</h3>
            <div className="space-y-3">
              {order.products.map((product, index) => (
                <div
                  key={product._id || index}
                  className="flex items-center justify-between p-3 bg-muted"
                >
                  <div>
                    <p className="font-medium">{product.name || "Product"}</p>
                    <p className="text-sm text-muted-foreground">
                      Quantity: {product.quantity}
                    </p>
                  </div>
                  <div className="text-right">
                    <p className="font-medium">${product.price}</p>
                    <p className="text-sm text-muted-foreground">
                      Total: ${product.price * product.quantity}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <Separator />
          {/* Order Summary */}
          <div className="flex justify-between font-medium text-lg">
            <span>Total:</span>
            <span>${order.total}</span>
          </div>
          <Separator />

          {/* Enhanced Order Timeline */}
          <div>
            <h3 className="font-medium mb-3">Order Timeline</h3>
            <div className="space-y-4">
              {timeline.map((entry, index) => (
                <div key={index} className="flex items-start space-x-3">
                  <div className={`mt-0.5 ${getStatusColor(entry.status)}`}>
                    {getStatusIcon(entry.status)}
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center justify-between">
                      <p className="text-sm font-medium">
                        {entry.note || `Status: ${entry.status}`}
                      </p>
                    </div>
                    <p className="text-xs text-muted-foreground">
                      {new Intl.DateTimeFormat("en-US", {
                        year: "numeric",
                        month: "short",
                        day: "numeric",
                        hour: "numeric",
                        minute: "numeric",
                        hour12: true,
                      }).format(new Date(entry.timestamp))}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
