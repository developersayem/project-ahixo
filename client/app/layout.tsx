// app/layout.tsx (server component)
import type { Metadata } from "next";
import { Poppins } from "next/font/google";
import "./globals.css";
import { AuthProvider } from "@/contexts/auth-context";
import { Toaster } from "sonner";
import SocketInitializer from "./SocketInitializer";
import { CurrencyProvider } from "@/contexts/currency-context";

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["300", "400", "600", "700"],
  variable: "--font-poppins",
  display: "swap",
});

export const metadata: Metadata = {
  title: "AHIXO - Your E-commerce Destination",
  description: "Find the best products at AHIXO.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={poppins.className}>
        <CurrencyProvider>
          <AuthProvider>
            <SocketInitializer>{children}</SocketInitializer>
            <Toaster richColors position="top-right" />
          </AuthProvider>
        </CurrencyProvider>
      </body>
    </html>
  );
}
