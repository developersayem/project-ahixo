import Footer from "@/components/home/footer/footer";
import { MainHeader } from "@/components/home/navbar/main-header";
import MobileNavbar from "@/components/home/navbar/mobile-navbar";
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
      {children}
      {/* Footer */}
      <div className="mt-10">
        <Footer />
      </div>
    </>
  );
}
