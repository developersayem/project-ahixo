import { Suspense } from "react";
import { getDictionary } from "@/lib/get-dictionary";
import BrandsPageContent from "./brand-page-content";

export default async function BrandPage({
  params,
}: {
  params: { locale: string };
}) {
  const { locale } = await params; // ✅ Await params
  const dict = await getDictionary(locale);

  return (
    <Suspense fallback={<div>Loading...</div>}>
      <BrandsPageContent dict={dict} />
    </Suspense>
  );
}
