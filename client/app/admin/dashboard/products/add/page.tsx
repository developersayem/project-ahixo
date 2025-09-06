import { ProductForm } from "@/components/dashboard/products/product-form";

export default function AddProductPage() {
  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-xl font-bold text-foreground">Add New Product</h2>
        <p className="text-muted-foreground text-sm">
          Create a new product listing for your store.
        </p>
      </div>
      <ProductForm />
    </div>
  );
}
