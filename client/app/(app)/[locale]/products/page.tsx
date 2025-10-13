import { Suspense } from "react";
import ProductsContent from "./products-content";
import { getDictionary } from "@/lib/get-dictionary";

export default async function ProductsPage({
  params,
}: {
  params: { locale: string };
}) {
  const { locale } = await params; // ✅ Await params
  const dict = await getDictionary(locale);

  return (
    <Suspense fallback={<div>Loading...</div>}>
      <ProductsContent dict={dict} />
    </Suspense>
  );
}
