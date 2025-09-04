import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Package, ShoppingCart, DollarSign, TrendingUp } from "lucide-react";
import { cn } from "@/lib/utils";

export function DashboardOverview() {
  const stats = [
    {
      title: "Total Products",
      value: "24",
      change: "+2 this week",
      icon: Package,
      color: "text-chart-1",
    },
    {
      title: "Active Orders",
      value: "12",
      change: "+3 today",
      icon: ShoppingCart,
      color: "text-chart-2",
    },
    {
      title: "Revenue",
      value: "$2,847",
      change: "+12% this month",
      icon: DollarSign,
      color: "text-primary",
    },
    {
      title: "Growth",
      value: "18%",
      change: "+5% from last month",
      icon: TrendingUp,
      color: "text-accent",
    },
  ];

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-3xl font-bold text-foreground">
          Dashboard Overview
        </h2>
        <p className="text-muted-foreground">
          Welcome back! Here&apos;s what&apos;s happening with your store today.
        </p>
      </div>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
        {stats.map((stat) => (
          <Card key={stat.title}>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-card-foreground">
                {stat.title}
              </CardTitle>
              <stat.icon className={cn("h-4 w-4", stat.color)} />
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
        <Card>
          <CardHeader>
            <CardTitle>Recent Orders</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {[1, 2, 3].map((order) => (
                <div key={order} className="flex items-center justify-between">
                  <div>
                    <p className="font-medium">Order #{order}001</p>
                    <p className="text-sm text-muted-foreground">2 items</p>
                  </div>
                  <div className="text-right">
                    <p className="font-medium">$299.00</p>
                    <p className="text-sm text-accent">Processing</p>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Top Products</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {[1, 2, 3].map((product) => (
                <div
                  key={product}
                  className="flex items-center justify-between"
                >
                  <div>
                    <p className="font-medium">Product {product}</p>
                    <p className="text-sm text-muted-foreground">12 sold</p>
                  </div>
                  <div className="text-right">
                    <p className="font-medium">$1,299.00</p>
                    <p className="text-sm text-primary">In Stock</p>
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
