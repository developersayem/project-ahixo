import { Suspense } from "react";
import { getDictionary } from "@/lib/get-dictionary";
import CategoriesPageContent from "./categories-content";

export default async function CategoriesPage({
  params,
}: {
  params: { locale: string };
}) {
  const { locale } = await params; // ✅ Await params
  const dict = await getDictionary(locale);

  return (
    <Suspense fallback={<div>Loading...</div>}>
      <CategoriesPageContent dict={dict} />
    </Suspense>
  );
}
