import OrdersCom from "@/components/dashboard/orders/orders-com";

export default function OrdersPage() {
  return (
    <div className="space-y-6 w-full h-full">
      <div>
        <h2 className="text-xl font-semibold text-foreground">
          Order Management
        </h2>
        <p className="text-muted-foreground text-sm">
          View and process your customer orders.
        </p>
      </div>
      <OrdersCom />
    </div>
  );
}
