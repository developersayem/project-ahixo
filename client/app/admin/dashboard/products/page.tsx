import { ProductList } from "@/components/dashboard/products/product-list";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import Link from "next/link";

export default function ProductsPage() {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-xl font-semibold text-foreground">
            Product Management
          </h2>
          <p className="text-muted-foreground text-sm">
            Manage your product inventory and listings.
          </p>
        </div>
        <Link href="/dashboard/products/add">
          <Button className="rounded-none">
            <Plus className="h-4 w-4 mr-2" />
            Add Product
          </Button>
        </Link>
      </div>
      <ProductList />
    </div>
  );
}
