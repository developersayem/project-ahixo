import { Suspense } from "react";
import { getDictionary } from "@/lib/get-dictionary";
import CheckoutPageContents from "./checkout-page-content";

export default async function CheckOutPage({
  params,
}: {
  params: { locale: string };
}) {
  const { locale } = await params; // ✅ Await params
  const dict = await getDictionary(locale);

  return (
    <Suspense fallback={<div>Loading...</div>}>
      <CheckoutPageContents dict={dict} />
    </Suspense>
  );
}
