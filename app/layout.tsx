import "./globals.css";
import type { Metadata } from "next";
import { Playfair_Display, Inter } from "next/font/google";
import { StoreProvider } from "@/lib/store-context";
import { Navbar } from "@/components/navbar";
import { Footer } from "@/components/footer";
import { CartDrawer } from "@/components/cart-drawer";
import { Toaster } from "@/components/ui/sonner";

const playfair = Playfair_Display({
  subsets: ["latin"],
  variable: "--font-display",
  display: "swap",
});

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-body",
  display: "swap",
});

export const metadata: Metadata = {
  title: "M FASHIONS — Wear Your Identity",
  description:
    "M FASHIONS is a premium menswear brand offering t-shirts, hoodies, jeans, shirts, cargo pants, jackets, oversized tees and streetwear. Wear Your Identity.",

  openGraph: {
    title: "M FASHIONS — Wear Your Identity",
    description:
      "Premium menswear. T-shirts, hoodies, jeans, jackets, streetwear and more.",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "M FASHIONS — Wear Your Identity",
      },
    ],
  },

  twitter: {
    card: "summary_large_image",
    images: ["/og-image.png"],
  },
};
export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${playfair.variable} ${inter.variable}`}>
      <body className="font-body">
        <StoreProvider>
          <Navbar />
          <main className="min-h-screen">{children}</main>
          <Footer />
          <CartDrawer />
          <Toaster position="bottom-right" />
        </StoreProvider>
      </body>
    </html>
  );
}
