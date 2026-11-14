import type { Metadata } from "next";
import Header from "./components/Header";
import Footer from "./components/Footer";
import WebGiJewelry from "./WebGiJewelry";
import ScrollToTop from "./components/ScrollToTop";
import { CartProvider } from "./context/CartContext";
import { WishlistProvider } from "./context/WishlistContext";
import { CustomerAuthProvider } from "./context/CustomerAuthContext";
import { AuthProvider } from "@/context/AuthContext";
import { ThemeProvider } from "@/context/ThemeContext";
import { SettingsProvider } from "@/context/SettingsContext";
import { GoogleTranslateBridge } from "@/components/GoogleTranslateBridge";
import { siteAsset } from "./site";
import "./global.css";

export const metadata: Metadata = {
  title: "NEOS7 GOLD",
  description: "Neos7 Gold Jewelry Product.",
  icons: {
    icon: [
      { url: siteAsset("favicons/favicon.ico"), sizes: "any" },
      {
        url: siteAsset("favicons/favicon-32x32.png"),
        type: "image/png",
        sizes: "32x32",
      },
      {
        url: siteAsset("favicons/favicon-16x16.png"),
        type: "image/png",
        sizes: "16x16",
      },
      {
        url: siteAsset("favicons/android-chrome-192x192.png"),
        type: "image/png",
        sizes: "192x192",
      },
      {
        url: siteAsset("favicons/android-chrome-512x512.png"),
        type: "image/png",
        sizes: "512x512",
      },
    ],
    apple: [
      {
        url: siteAsset("favicons/apple-touch-icon.png"),
        type: "image/png",
        sizes: "180x180",
      },
    ],
  },
  manifest: siteAsset("favicons/site.webmanifest"),
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark" suppressHydrationWarning>
      <body suppressHydrationWarning>
        <GoogleTranslateBridge />
        <SettingsProvider>
          <ThemeProvider>
            <AuthProvider>
              <CustomerAuthProvider>
                <CartProvider>
                  <WishlistProvider>
                    <Header />
                    <WebGiJewelry />
                    <ScrollToTop />
                    {children}
                    <Footer />
                  </WishlistProvider>
                </CartProvider>
              </CustomerAuthProvider>
            </AuthProvider>
          </ThemeProvider>
        </SettingsProvider>
      </body>
    </html>
  );
}
