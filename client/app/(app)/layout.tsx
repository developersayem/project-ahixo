import Footer from "@/components/home/footer/footer";
import { MainHeader } from "@/components/home/navbar/main-header";
import MobileNavbar from "@/components/home/navbar/mobile-navbar";
import type { Metadata } from "next";
import { Poppins } from "next/font/google";

const poppins = Poppins({
  variable: "--font-poppins",
  subsets: ["latin"],
  weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"],
});

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
    <html lang="en">
      <body className={`${poppins.variable} antialiased`}>
        {/* Header */}
        <MainHeader />
        <MobileNavbar />
        {/* Children */}
        {children}
        {/* Footer */}
        <div className="mt-10">
          <Footer />
        </div>
      </body>
    </html>
  );
}
