import Footer from "@/components/app/footer/footer";
import { MainHeader } from "@/components/app/navbar/main-header";
import MobileNavbar from "@/components/app/navbar/mobile-navbar";
import { CreateOrderProvider } from "@/contexts/create-order-context";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "AHIXO",
  description: "A multi vendor e-commerce platform",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <>
      {/* Header */}
      <MainHeader />
      <MobileNavbar />
      {/* Children */}
      <CreateOrderProvider>{children}</CreateOrderProvider>
      {/* Footer */}
      <div className="mt-10">
        <Footer />
      </div>
    </>
  );
}
