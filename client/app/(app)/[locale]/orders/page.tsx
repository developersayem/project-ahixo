import { Suspense } from "react";
import { getDictionary } from "@/lib/get-dictionary";
import OrdersPageContent from "./order-page-content";

export default async function OrderPage({
  params,
}: {
  params: { locale: string };
}) {
  const { locale } = await params; // ✅ Await params
  const dict = await getDictionary(locale);
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <OrdersPageContent dict={dict} />
    </Suspense>
  );
}
