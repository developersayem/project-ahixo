/* eslint-disable @next/next/no-img-element */
"use client";

import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { Truck, CheckCircle, Clock, XCircle, Trash2 } from "lucide-react";
import { IOrder } from "@/types/order-type";
import { useCurrency } from "@/contexts/currency-context";
import { IDictionary } from "@/types/locale/dictionary.type";

interface OrderCardProps {
  dict: IDictionary;
  order: IOrder;
  onRemoveItem: (orderId: string, itemId: string) => void;
  onCancelOrder: (orderId: string) => void;
}

export function OrderCard({
  dict,
  order,
  onRemoveItem,
  onCancelOrder,
}: OrderCardProps) {
  const { currency, convertPrice, symbolMap } = useCurrency();

  const getStatusBadge = (status: string) => {
    const statusConfig = {
      "on-hold": {
        label: dict.orders.status.on_hold,
        color: "bg-orange-100 text-orange-600",
        icon: Truck,
      },
      delivered: {
        label: dict.orders.status.delivered,
        color: "bg-green-100 text-green-600",
        icon: CheckCircle,
      },
      processing: {
        label: dict.orders.status.processing,
        color: "bg-blue-100 text-blue-600",
        icon: Clock,
      },
      canceled: {
        label: dict.orders.status.canceled,
        color: "bg-red-100 text-red-600",
        icon: XCircle,
      },
    };

    const normalizedStatus = status === "canceled" ? "canceled" : status;
    const config = statusConfig[
      normalizedStatus as keyof typeof statusConfig
    ] || {
      label: status,
      color: "bg-gray-100 text-gray-600",
      icon: Clock,
    };

    const Icon = config.icon;

    return (
      <Badge className={`${config.color} font-medium px-3 py-1 rounded-full`}>
        <Icon className="w-3 h-3 mr-1" />
        {config.label}
      </Badge>
    );
  };

  return (
    <Card className="overflow-hidden rounded-none shadow-none">
      <CardHeader className="bg-muted/50">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <div>
              <h3 className="text-lg font-medium">
                {dict.orders.order_id}: {order._id}
              </h3>
              <p className="text-sm text-muted-foreground">
                {dict.orders.order_placed}:{" "}
                {new Date(order.date).toLocaleDateString()}
              </p>
            </div>
          </div>
          <div className="flex items-center space-x-4">
            {getStatusBadge(order.status)}
            {order.status === "processing" && (
              <Button
                variant="outline"
                onClick={() => {
                  console.log("cancelling order", order._id);
                  onCancelOrder(order._id);
                }}
                className="text-destructive hover:text-destructive hover:bg-destructive/10"
              >
                <XCircle className="w-4 h-4 mr-2" />
                {dict.orders.cancel_order}
              </Button>
            )}
          </div>
        </div>
      </CardHeader>

      <CardContent className="p-6">
        <div className="space-y-4">
          {order.products.map((product) => {
            const convertedPrice = convertPrice
              ? convertPrice(product.price, product.currency || "USD")
              : product.price;

            return (
              <div
                key={product._id}
                className="flex flex-col sm:flex-row items-start sm:items-center justify-between p-4 border border-border gap-4"
              >
                {/* Product Image */}
                <div className="w-20 h-20 bg-muted overflow-hidden flex-shrink-0">
                  <img
                    src={product.images?.[0] || "/placeholder.svg"}
                    alt={product.title || product.name}
                    width={80}
                    height={80}
                    className="w-full h-full object-cover"
                  />
                </div>

                {/* Product Info */}
                <div className="flex-1 flex flex-col sm:flex-row sm:items-center sm:justify-between w-full gap-2">
                  <div>
                    <h4 className="font-medium text-foreground">
                      {product.title || product.name}
                    </h4>
                    {product.brand && (
                      <p className="text-sm text-muted-foreground">
                        {product.brand}
                      </p>
                    )}
                    <div className="flex items-center space-x-4 mt-1">
                      <span className="text-sm text-muted-foreground">
                        Qty: {product.quantity}
                      </span>
                      <span className="font-medium">
                        {symbolMap[currency]}
                        {convertedPrice?.toFixed(2)}
                      </span>
                    </div>
                  </div>

                  {/* Delete Button */}
                  {order.status === "processing" && (
                    <div className="mt-2 sm:mt-0 flex-shrink-0">
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => onRemoveItem(order._id, product._id)}
                        className="text-destructive hover:text-destructive hover:bg-destructive/10"
                      >
                        <Trash2 className="w-4 h-4" />
                      </Button>
                    </div>
                  )}
                </div>
              </div>
            );
          })}
        </div>

        <Separator className="my-4" />

        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <span className="text-sm text-muted-foreground">
              {dict.orders.return_order}:
            </span>
          </div>

          <div className="text-right">
            <p className="text-lg font-bold text-foreground">
              {symbolMap[currency]}
              {convertPrice
                ? convertPrice(order.total)?.toFixed(2)
                : order.total.toFixed(2)}
            </p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
