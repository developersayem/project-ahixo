import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { ShoppingCart, Clock, CheckCircle, RefreshCw } from "lucide-react"

export function OrderStats() {
  const stats = [
    {
      title: "Total Orders",
      value: "156",
      change: "+12 today",
      icon: ShoppingCart,
      color: "text-primary",
    },
    {
      title: "Processing",
      value: "23",
      change: "Needs attention",
      icon: Clock,
      color: "text-yellow-600",
    },
    {
      title: "Completed",
      value: "128",
      change: "+8 today",
      icon: CheckCircle,
      color: "text-green-600",
    },
    {
      title: "Refunded",
      value: "5",
      change: "2 pending",
      icon: RefreshCw,
      color: "text-blue-600",
    },
  ]

  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
      {stats.map((stat) => (
        <Card key={stat.title}>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-card-foreground">{stat.title}</CardTitle>
            <stat.icon className={`h-4 w-4 ${stat.color}`} />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-foreground">{stat.value}</div>
            <p className="text-xs text-muted-foreground">{stat.change}</p>
          </CardContent>
        </Card>
      ))}
    </div>
  )
}
