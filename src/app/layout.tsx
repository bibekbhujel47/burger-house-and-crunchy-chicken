import Navbar from "@/components/Navbar";
import type { Metadata } from "next";
import { NextIntlClientProvider } from "next-intl";
import "./globals.css";
import { Montserrat, Open_Sans } from "next/font/google";
import Footer from "@/components/Footer";

const montserrat = Montserrat({
  subsets: ["latin"],
  variable: "--font-montserrat", // ← matches var(--font-montserrat) in @theme
  display: "swap",
  weight: ["400", "600", "700", "800", "900"],
});

const openSans = Open_Sans({
  subsets: ["latin"],
  variable: "--font-open-sans", // ← matches var(--font-open-sans) in @theme
  display: "swap",
  weight: ["400", "500", "600", "700"],
});

export const metadata: Metadata = {
  title: "The Burger House and Crunchy Fried Chicken | Damauli",
  description:
    "Enjoy freshly prepared burgers, crispy fried chicken, snacks, and quick meals at The Burger House and Crunchy Fried Chicken in Damauli, Tanahun. Open daily for dine-in and takeaway.",
  keywords: [
    "Burger House Damauli",
    "Crunchy Fried Chicken Nepal",
    "restaurant Byas Tanahun",
    "fried chicken delivery Damauli",
  ],
  openGraph: {
    title: "The Burger House and Crunchy Fried Chicken",
    description: "Burgers. Fried Chicken. Good Vibes. — Byas, Damauli",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      data-scroll-behavior="smooth"
      className={`${montserrat.variable} ${openSans.variable}`}
    >
      <body className="min-h-screen flex flex-col font-body antialiased">
        <NextIntlClientProvider>
          <Navbar />
          <main className="flex-grow">{children}</main>
          <Footer />
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
