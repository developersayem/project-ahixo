import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Package, ShoppingCart, DollarSign, TrendingUp } from "lucide-react";
import useSWR from "swr";
import { fetcher } from "@/lib/fetcher";
import { IOrder } from "@/types/order-type";

interface ITopProduct {
  _id: string; // ObjectId of the product
  totalSold: number;
  price: number;
  stock: number;
  title: string;
}

export function DashboardOverview() {
  const { data, error } = useSWR("/api/v1/seller/overview/stats", fetcher);
  const { data: recentOrders, error: recentOrdersError } = useSWR(
    "/api/v1/seller/overview/recent-orders",
    fetcher
  );
  const { data: topProducts, error: topProductsError } = useSWR(
    "/api/v1/seller/overview/top-products",
    fetcher
  );
  console.log(recentOrders);

  if (error) return <div>Error loading dashboard overview.</div>;
  if (!data) return <div>Loading...</div>;

  const stats = [
    {
      title: "Total Products",
      value: data?.data?.totalProducts || "0",
      change: "+2 this week",
      icon: Package,
      color: "text-chart-1",
    },
    {
      title: "Total Orders",
      value: data?.data?.totalOrders || "0",
      change: "+3 today",
      icon: ShoppingCart,
      color: "text-chart-2",
    },
    {
      title: "Revenue",
      value: data?.data?.revenue || "0",
      change: "+12% this month",
      icon: DollarSign,
      color: "text-primary",
    },
    {
      title: "Growth",
      value: data?.data?.growth || "0",
      change: "+5% from last month",
      icon: TrendingUp,
      color: "text-green-500",
    },
  ];

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-xl font-bold text-foreground">
          Dashboard Overview
        </h2>
        <p className="text-sm text-muted-foreground">
          Welcome back! Here&apos;s what&apos;s happening with your store today.
        </p>
      </div>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
        {stats.map((stat) => (
          <Card key={stat.title} className="shadow-none rounded-none">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <stat.icon className={`h-8 w-8 ${stat.color}`} />
              <CardTitle className="text-sm font-medium text-card-foreground">
                {stat.title}
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-foreground">
                {stat.value}
              </div>
              <p className="text-xs text-muted-foreground">{stat.change}</p>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        {/* top recent orders */}
        <Card className="rounded-none shadow-none">
          <CardHeader>
            <CardTitle>Recent Orders</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {recentOrders?.data?.map((order: IOrder) => (
                <div
                  key={order._id}
                  className="flex items-center justify-between bg-accent p-5 gap-5"
                >
                  <div>
                    <p className="font-medium">Order #{order.orderNumber}</p>
                    <p className="text-sm text-muted-foreground">
                      {order.totalItems} items
                    </p>
                  </div>
                  <div className="text-right">
                    <p className="font-medium">${order.total}</p>
                    <p className="text-sm text-muted-foreground">
                      {order.status}
                    </p>
                  </div>
                </div>
              ))}
              {recentOrdersError && (
                <div className="text-center py-8 text-red-600">
                  There was a problem loading recent orders.
                </div>
              )}
            </div>
          </CardContent>
        </Card>

        {/* top products */}
        <Card className="rounded-none shadow-none">
          <CardHeader>
            <CardTitle>Top Products</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {topProducts?.data?.map((product: ITopProduct) => (
                <div
                  key={product._id}
                  className="flex items-center justify-between bg-accent p-5 gap-5"
                >
                  <div>
                    <p className="font-medium">Product {product.title}</p>
                    <p className="text-sm text-muted-foreground">
                      {product.totalSold} sold
                    </p>
                  </div>
                  <div className="text-right">
                    <p className="font-medium">$1,299.00</p>
                    <p className="text-sm text-muted-foreground">In Stock</p>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
