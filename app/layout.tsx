import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
  display: 'swap',
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
  display: 'swap',
});

export const metadata: Metadata = {
  title: "MUSE. | Premium Minimalist Storefront",
  description: "Experience the pinnacle of minimalist design with Muse. Shop curated monochrome collections, winter essentials, and urban utility gear. Timeless design, sustainable quality.",
  keywords: ["fashion", "minimalist", "monochrome", "ecommerce", "luxury", "streetwear"],
  openGraph: {
    title: "MUSE. | Premium Minimalist Storefront",
    description: "Curated monochrome collections and urban essentials.",
    type: "website",
    locale: "en_US",
    siteName: "MUSE",
  },
  twitter: {
    card: "summary_large_image",
    title: "MUSE. | Premium Minimalist Storefront",
    description: "Curated monochrome collections and urban essentials.",
  },
};

import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { CartProvider } from "@/lib/cart-context";
import { NewsletterModal } from "@/components/NewsletterModal";
import { BackToTop } from "@/components/BackToTop";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://images.unsplash.com" />
        <link rel="preconnect" href="https://api.escuelajs.co" />
      </head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <CartProvider>
          <Header />
          <NewsletterModal />
          <BackToTop />
          <main className="pt-28 min-h-screen">
              {children}
          </main>
          <Footer />
        </CartProvider>
      </body>
    </html>
  );
}
