import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "AHIXO",
  description: "A multi vendor e-commerce platform",
};

export default async function LocaleLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="min-h-screen flex flex-col">{children}</body>
    </html>
  );
}
