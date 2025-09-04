"use client"

import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Package, Truck, CheckCircle, MapPin, Mail } from "lucide-react"

interface Order {
  id: string
  customer: string
  email: string
  products: Array<{ name: string; quantity: number; price: number }>
  total: number
  status: string
  date: string
  shippingAddress: string
}

interface OrderDetailsModalProps {
  order: Order
  onClose: () => void
  onUpdateStatus: (orderId: string, status: string) => void
}

export function OrderDetailsModal({ order, onClose, onUpdateStatus }: OrderDetailsModalProps) {
  const getStatusBadge = (status: string) => {
    const statusConfig = {
      processing: { label: "Processing", color: "bg-yellow-100 text-yellow-800" },
      completed: { label: "Completed", color: "bg-green-100 text-green-800" },
      "on-hold": { label: "On Hold", color: "bg-orange-100 text-orange-800" },
      canceled: { label: "Canceled", color: "bg-red-100 text-red-800" },
      refunded: { label: "Refunded", color: "bg-blue-100 text-blue-800" },
    }

    const config = statusConfig[status as keyof typeof statusConfig]
    return <Badge className={config.color}>{config.label}</Badge>
  }

  const handleStatusChange = (newStatus: string) => {
    onUpdateStatus(order.id, newStatus)
    onClose()
  }

  const subtotal = order.products.reduce((sum, product) => sum + product.price * product.quantity, 0)
  const shipping = 25
  const tax = subtotal * 0.08

  return (
    <Dialog open={true} onOpenChange={onClose}>
      <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="flex items-center justify-between">
            <span>Order Details - {order.id}</span>
            {getStatusBadge(order.status)}
          </DialogTitle>
        </DialogHeader>

        <div className="space-y-6">
          {/* Customer Information */}
          <div>
            <h3 className="font-medium mb-3">Customer Information</h3>
            <div className="space-y-2">
              <div className="flex items-center space-x-2">
                <Package className="h-4 w-4 text-muted-foreground" />
                <span>{order.customer}</span>
              </div>
              <div className="flex items-center space-x-2">
                <Mail className="h-4 w-4 text-muted-foreground" />
                <span>{order.email}</span>
              </div>
              <div className="flex items-center space-x-2">
                <MapPin className="h-4 w-4 text-muted-foreground" />
                <span>{order.shippingAddress}</span>
              </div>
            </div>
          </div>

          <Separator />

          {/* Order Items */}
          <div>
            <h3 className="font-medium mb-3">Order Items</h3>
            <div className="space-y-3">
              {order.products.map((product, index) => (
                <div key={index} className="flex items-center justify-between p-3 bg-muted rounded-lg">
                  <div>
                    <p className="font-medium">{product.name}</p>
                    <p className="text-sm text-muted-foreground">Quantity: {product.quantity}</p>
                  </div>
                  <div className="text-right">
                    <p className="font-medium">${product.price}</p>
                    <p className="text-sm text-muted-foreground">Total: ${product.price * product.quantity}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <Separator />

          {/* Order Summary */}
          <div>
            <h3 className="font-medium mb-3">Order Summary</h3>
            <div className="space-y-2">
              <div className="flex justify-between">
                <span>Subtotal:</span>
                <span>${subtotal}</span>
              </div>
              <div className="flex justify-between">
                <span>Shipping:</span>
                <span>${shipping}</span>
              </div>
              <div className="flex justify-between">
                <span>Tax:</span>
                <span>${tax.toFixed(2)}</span>
              </div>
              <Separator />
              <div className="flex justify-between font-medium text-lg">
                <span>Total:</span>
                <span>${order.total}</span>
              </div>
            </div>
          </div>

          <Separator />

          {/* Status Management */}
          <div>
            <h3 className="font-medium mb-3">Update Order Status</h3>
            <div className="flex items-center space-x-4">
              <Select value={order.status} onValueChange={handleStatusChange}>
                <SelectTrigger className="w-48">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="processing">Processing</SelectItem>
                  <SelectItem value="completed">Completed</SelectItem>
                  <SelectItem value="on-hold">On Hold</SelectItem>
                  <SelectItem value="canceled">Canceled</SelectItem>
                  <SelectItem value="refunded">Refunded</SelectItem>
                </SelectContent>
              </Select>

              <div className="flex space-x-2">
                {order.status === "processing" && (
                  <>
                    <Button size="sm" onClick={() => handleStatusChange("completed")}>
                      <CheckCircle className="h-4 w-4 mr-2" />
                      Complete
                    </Button>
                    <Button variant="outline" size="sm" onClick={() => handleStatusChange("on-hold")}>
                      <Package className="h-4 w-4 mr-2" />
                      Hold
                    </Button>
                  </>
                )}
                {order.status === "on-hold" && (
                  <Button size="sm" onClick={() => handleStatusChange("processing")}>
                    <Truck className="h-4 w-4 mr-2" />
                    Resume
                  </Button>
                )}
              </div>
            </div>
          </div>

          {/* Order Timeline */}
          <div>
            <h3 className="font-medium mb-3">Order Timeline</h3>
            <div className="space-y-3">
              <div className="flex items-center space-x-3">
                <CheckCircle className="h-4 w-4 text-primary" />
                <div>
                  <p className="text-sm font-medium">Order Placed</p>
                  <p className="text-xs text-muted-foreground">{order.date}</p>
                </div>
              </div>
              {order.status !== "canceled" && (
                <div className="flex items-center space-x-3">
                  <CheckCircle className="h-4 w-4 text-primary" />
                  <div>
                    <p className="text-sm font-medium">Payment Confirmed</p>
                    <p className="text-xs text-muted-foreground">{order.date}</p>
                  </div>
                </div>
              )}
              {order.status === "completed" && (
                <div className="flex items-center space-x-3">
                  <CheckCircle className="h-4 w-4 text-primary" />
                  <div>
                    <p className="text-sm font-medium">Order Delivered</p>
                    <p className="text-xs text-muted-foreground">{order.date}</p>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}
