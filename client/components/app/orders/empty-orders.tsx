import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Package } from "lucide-react";
import Link from "next/link";

export function EmptyOrders() {
  return (
    <Card>
      <CardContent className="text-center py-12">
        <Package className="w-16 h-16 text-muted-foreground mx-auto mb-4" />
        <h3 className="text-lg font-medium text-foreground mb-2">
          No orders found
        </h3>
        <p className="text-muted-foreground mb-4">
          You haven&apos;t placed any orders yet.
        </p>
        <Link href="/products">
          <Button className="bg-primary hover:bg-primary/90">
            Start Shopping
          </Button>
        </Link>
      </CardContent>
    </Card>
  );
}
