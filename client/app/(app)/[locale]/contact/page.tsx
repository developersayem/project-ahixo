import { Suspense } from "react";
import { getDictionary } from "@/lib/get-dictionary";
import ContactPageContent from "./contact-page-content";

export default async function ProductsPage({
  params,
}: {
  params: { locale: string };
}) {
  const { locale } = await params; // ✅ Await params
  const dict = await getDictionary(locale);

  return (
    <Suspense fallback={<div>Loading...</div>}>
      <ContactPageContent dict={dict} />
    </Suspense>
  );
}
