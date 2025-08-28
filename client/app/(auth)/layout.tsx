import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "AHIXO-AUTH",
  description: "A multi vendor e-commerce platform",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <>
      {/* Children */}
      {children}
    </>
  );
}
