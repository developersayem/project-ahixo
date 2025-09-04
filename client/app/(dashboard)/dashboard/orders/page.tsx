import { OrderList } from "@/components/dashboard/orders/order-list";
import { OrderStats } from "@/components/dashboard/orders/order-stats";

export default function OrdersPage() {
  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-3xl font-bold text-foreground">Order Management</h2>
        <p className="text-muted-foreground">
          View and process your customer orders.
        </p>
      </div>

      <OrderStats />
      <OrderList />
    </div>
  );
}
