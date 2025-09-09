"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ShoppingCart, Clock, CheckCircle, RefreshCw } from "lucide-react";

interface OrderStatsData {
  totalOrders: number;
  processing: number;
  completed: number;
  onHold: number;
  canceled: number;
}

interface StatItem {
  title: string;
  value: number;
  change?: string;
  icon: React.ComponentType<{ className?: string }>;
  color: string;
}

interface OrderStatsProps {
  data?: { data: OrderStatsData };
  isLoading?: boolean;
  error?: Error;
  mutate?: () => void;
}

export function OrderStats({ data, isLoading, error }: OrderStatsProps) {
  if (isLoading || !data) return <p>Loading...</p>;
  if (error) return <p>Error loading stats</p>;

  const stats: StatItem[] = [
    {
      title: "Total Orders",
      value: data.data.totalOrders,
      icon: ShoppingCart,
      color: "text-primary",
    },
    {
      title: "Processing",
      value: data.data.processing,
      icon: Clock,
      color: "text-yellow-600",
    },
    {
      title: "Completed",
      value: data.data.completed,
      icon: CheckCircle,
      color: "text-green-600",
    },
    {
      title: "On Hold",
      value: data.data.onHold,
      icon: Clock,
      color: "text-orange-600",
    },
    {
      title: "Canceled",
      value: data.data.canceled,
      icon: RefreshCw,
      color: "text-red-600",
    },
  ];

  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-5">
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
  );
}
