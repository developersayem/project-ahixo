import { products } from "@/app/data/products";
import { ProductImages } from "@/components/app/products/products-details/product-images";
import { ProductInfo } from "@/components/app/products/products-details/product-info";
import { ProductTabs } from "@/components/app/products/products-details/product-tabs";
import { notFound } from "next/navigation";

interface ProductPageProps {
  params: {
    id: string;
  };
}

export default function ProductPage({ params }: ProductPageProps) {
  const product = products.find((p) => p.id === Number.parseInt(params.id));

  if (!product) {
    notFound();
  }

  return (
    <div className="min-h-screen container mx-auto">
      <div className="mx-auto px-4 py-6">
        <div className="">
          {/* Main Product Content */}
          <div className="">
            <div className="bg-white">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-6">
                <div className="flex justify-center">
                  <ProductImages product={product} />
                </div>
                <ProductInfo product={product} />
              </div>
            </div>
            <ProductTabs product={product} />
          </div>
        </div>
      </div>
    </div>
  );
}
