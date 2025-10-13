import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Package } from "lucide-react";
import Link from "next/link";
import { IDictionary } from "@/types/locale/dictionary.type";

export function EmptyOrders({ dict }: { dict: IDictionary }) {
  return (
    <Card>
      <CardContent className="text-center py-12">
        <Package className="w-16 h-16 text-muted-foreground mx-auto mb-4" />
        <h3 className="text-lg font-medium text-foreground mb-2">
          {dict.orders.empty_orders.title}
        </h3>
        <p className="text-muted-foreground mb-4">
          {dict.orders.empty_orders.description}
        </p>
        <Link href="/products">
          <Button className="bg-primary hover:bg-primary/90">
            {dict.orders.empty_orders.button}
          </Button>
        </Link>
      </CardContent>
    </Card>
  );
}
