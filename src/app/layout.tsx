import type { Metadata } from "next";
import { Providers } from "./providers";
import Layout from "@/components/Layout";
import "./globals.css";

export const metadata: Metadata = {
  title: "Somsuite Technology",
  description: "Empowering businesses through innovative technology solutions",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body>
        <Providers>
          <Layout>{children}</Layout>
        </Providers>
      </body>
    </html>
  );
}
