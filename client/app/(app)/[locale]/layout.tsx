import Footer from "@/components/app/footer/footer";
import { MainHeader } from "@/components/app/navbar/main-header";
import MobileNavbar from "@/components/app/navbar/mobile-navbar";
import { CreateOrderProvider } from "@/contexts/create-order-context";
import { getDictionary } from "@/lib/get-dictionary";

export default async function LocaleLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const resolvedParams = await params;
  const dict = await getDictionary(resolvedParams.locale);
  return (
    <html lang={resolvedParams.locale}>
      <body>
        {/* You can now pass dict to header/footer or context */}
        {/* Header */}
        <MainHeader dict={dict} />
        <MobileNavbar />
        {/* Page Content */}
        <CreateOrderProvider>{children}</CreateOrderProvider>
        {/* Footer */}
        <div className="mt-10">
          <Footer dict={dict} />
        </div>
      </body>
    </html>
  );
}
