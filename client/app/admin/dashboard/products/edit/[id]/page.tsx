import { ProductForm } from "@/components/dashboard/products/product-form";

interface EditProductPageProps {
  params: {
    id: string;
  };
}

export default function EditProductPage({ params }: EditProductPageProps) {
  // In a real app, fetch product data by ID
  const productId = params.id;

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-3xl font-bold text-foreground">Edit Product</h2>
        <p className="text-muted-foreground">
          Update your product information and settings.
        </p>
      </div>

      <ProductForm productId={productId} />
    </div>
  );
}
