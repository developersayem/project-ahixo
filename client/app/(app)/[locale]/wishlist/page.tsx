import { Suspense } from "react";
import { getDictionary } from "@/lib/get-dictionary";
import WishlistPageContent from "./wishlist-page-content";

export default async function WishlistPage({
  params,
}: {
  params: { locale: string };
}) {
  const { locale } = await params; // ✅ Await params
  const dict = await getDictionary(locale);
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <WishlistPageContent dict={dict} />
    </Suspense>
  );
}
