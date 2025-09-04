"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { Search, MoreHorizontal, Eye, Package, Truck, CheckCircle, XCircle, RefreshCw, Clock } from "lucide-react"
import { OrderDetailsModal } from "./order-details-modal"

// Mock order data
const mockOrders = [
  {
    id: "ORD-001",
    customer: "John Doe",
    email: "john@example.com",
    products: [
      { name: "iPhone 14 Pro", quantity: 1, price: 999 },
      { name: "AirPods Pro", quantity: 1, price: 249 },
    ],
    total: 1248,
    status: "processing",
    date: "2025-01-15",
    shippingAddress: "123 Main St, New York, NY 10001",
  },
  {
    id: "ORD-002",
    customer: "Jane Smith",
    email: "jane@example.com",
    products: [{ name: "Samsung Galaxy S23", quantity: 1, price: 799 }],
    total: 799,
    status: "completed",
    date: "2025-01-14",
    shippingAddress: "456 Oak Ave, Los Angeles, CA 90210",
  },
  {
    id: "ORD-003",
    customer: "Mike Johnson",
    email: "mike@example.com",
    products: [{ name: "Nike Air Max", quantity: 2, price: 150 }],
    total: 300,
    status: "on-hold",
    date: "2025-01-13",
    shippingAddress: "789 Pine St, Chicago, IL 60601",
  },
  {
    id: "ORD-004",
    customer: "Sarah Wilson",
    email: "sarah@example.com",
    products: [{ name: "MacBook Pro", quantity: 1, price: 1999 }],
    total: 1999,
    status: "canceled",
    date: "2025-01-12",
    shippingAddress: "321 Elm St, Houston, TX 77001",
  },
  {
    id: "ORD-005",
    customer: "David Brown",
    email: "david@example.com",
    products: [{ name: "iPad Air", quantity: 1, price: 599 }],
    total: 599,
    status: "refunded",
    date: "2025-01-11",
    shippingAddress: "654 Maple Dr, Phoenix, AZ 85001",
  },
]

type OrderStatus = "all" | "processing" | "completed" | "on-hold" | "canceled" | "refunded"

export function OrderList() {
  const [searchTerm, setSearchTerm] = useState("")
  const [statusFilter, setStatusFilter] = useState<OrderStatus>("all")
  const [orders, setOrders] = useState(mockOrders)
  const [selectedOrder, setSelectedOrder] = useState<(typeof mockOrders)[0] | null>(null)

  const filteredOrders = orders.filter((order) => {
    const matchesSearch =
      order.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
      order.customer.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesStatus = statusFilter === "all" || order.status === statusFilter
    return matchesSearch && matchesStatus
  })

  const getStatusBadge = (status: string) => {
    const statusConfig = {
      processing: { label: "Processing", variant: "default" as const, color: "bg-yellow-100 text-yellow-800" },
      completed: { label: "Completed", variant: "default" as const, color: "bg-green-100 text-green-800" },
      "on-hold": { label: "On Hold", variant: "secondary" as const, color: "bg-orange-100 text-orange-800" },
      canceled: { label: "Canceled", variant: "destructive" as const, color: "bg-red-100 text-red-800" },
      refunded: { label: "Refunded", variant: "outline" as const, color: "bg-blue-100 text-blue-800" },
    }

    const config = statusConfig[status as keyof typeof statusConfig]
    return <Badge className={config.color}>{config.label}</Badge>
  }

  const getStatusIcon = (status: string) => {
    const icons = {
      processing: Clock,
      completed: CheckCircle,
      "on-hold": Package,
      canceled: XCircle,
      refunded: RefreshCw,
    }
    const Icon = icons[status as keyof typeof icons]
    return Icon ? <Icon className="h-4 w-4" /> : null
  }

  const updateOrderStatus = (orderId: string, newStatus: string) => {
    setOrders(orders.map((order) => (order.id === orderId ? { ...order, status: newStatus } : order)))
  }

  return (
    <>
      <Card>
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
                  className="pl-10"
                />
              </div>
              <Select value={statusFilter} onValueChange={(value: OrderStatus) => setStatusFilter(value)}>
                <SelectTrigger className="w-40">
                  <SelectValue placeholder="Filter by status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Orders</SelectItem>
                  <SelectItem value="processing">Processing</SelectItem>
                  <SelectItem value="completed">Completed</SelectItem>
                  <SelectItem value="on-hold">On Hold</SelectItem>
                  <SelectItem value="canceled">Canceled</SelectItem>
                  <SelectItem value="refunded">Refunded</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {filteredOrders.map((order) => (
              <div key={order.id} className="flex items-center justify-between p-4 border border-border rounded-lg">
                <div className="flex items-center space-x-4">
                  {getStatusIcon(order.status)}
                  <div>
                    <h3 className="font-medium">{order.id}</h3>
                    <p className="text-sm text-muted-foreground">{order.customer}</p>
                  </div>
                </div>

                <div className="flex items-center space-x-6">
                  <div className="text-right">
                    <p className="font-medium">${order.total}</p>
                    <p className="text-sm text-muted-foreground">{order.products.length} items</p>
                  </div>

                  <div className="text-right">
                    <p className="text-sm text-muted-foreground">{order.date}</p>
                    {getStatusBadge(order.status)}
                  </div>

                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="ghost" size="icon">
                        <MoreHorizontal className="h-4 w-4" />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                      <DropdownMenuItem onClick={() => setSelectedOrder(order)}>
                        <Eye className="h-4 w-4 mr-2" />
                        View Details
                      </DropdownMenuItem>
                      {order.status === "processing" && (
                        <>
                          <DropdownMenuItem onClick={() => updateOrderStatus(order.id, "completed")}>
                            <CheckCircle className="h-4 w-4 mr-2" />
                            Mark as Completed
                          </DropdownMenuItem>
                          <DropdownMenuItem onClick={() => updateOrderStatus(order.id, "on-hold")}>
                            <Package className="h-4 w-4 mr-2" />
                            Put on Hold
                          </DropdownMenuItem>
                        </>
                      )}
                      {order.status === "on-hold" && (
                        <DropdownMenuItem onClick={() => updateOrderStatus(order.id, "processing")}>
                          <Truck className="h-4 w-4 mr-2" />
                          Resume Processing
                        </DropdownMenuItem>
                      )}
                      {(order.status === "completed" || order.status === "processing") && (
                        <DropdownMenuItem
                          onClick={() => updateOrderStatus(order.id, "refunded")}
                          className="text-destructive focus:text-destructive"
                        >
                          <RefreshCw className="h-4 w-4 mr-2" />
                          Process Refund
                        </DropdownMenuItem>
                      )}
                    </DropdownMenuContent>
                  </DropdownMenu>
                </div>
              </div>
            ))}

            {filteredOrders.length === 0 && (
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
  )
}
