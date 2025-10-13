import { Suspense } from "react";
import { getDictionary } from "@/lib/get-dictionary";
import CartPageContent from "./cart-page-content";

export default async function CartPage({
  params,
}: {
  params: { locale: string };
}) {
  const { locale } = await params; // ✅ Await params
  const dict = await getDictionary(locale);

  return (
    <Suspense fallback={<div>Loading...</div>}>
      <CartPageContent dict={dict} />
    </Suspense>
  );
}
