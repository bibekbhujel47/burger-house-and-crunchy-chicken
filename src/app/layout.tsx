import Navbar from "@/components/Navbar";
import type { Metadata, Viewport } from "next";
import { NextIntlClientProvider } from "next-intl";
import "./globals.css";
import { Montserrat, Open_Sans } from "next/font/google";
import Footer from "@/components/Footer";

const montserrat = Montserrat({
  subsets: ["latin"],
  variable: "--font-montserrat",
  display: "swap",
  weight: ["400", "600", "700", "800", "900"],
});

const openSans = Open_Sans({
  subsets: ["latin"],
  variable: "--font-open-sans",
  display: "swap",
  weight: ["400", "500", "600", "700"],
});

export const metadata: Metadata = {
  title:
    "The Burger House & Crunchy Fried Chicken | Best Burgers in Damauli, Nepal",
  description:
    "Discover the best burgers, crispy fried chicken, and quick meals in Damauli, Tanahun, Nepal. Fresh ingredients, fast delivery, and great vibes. Order now or visit us at Byas, Damauli.",
  keywords: [
    "burger house Damauli",
    "crunchy fried chicken Nepal",
    "restaurant Byas Tanahun",
    "burger delivery Damauli",
    "fried chicken takeaway",
    "fast food Damauli",
    "food delivery Nepal",
    "restaurant Damauli",
  ],
  canonical: "https://theburgerhouse.com",
  openGraph: {
    title: "The Burger House & Crunchy Fried Chicken | Damauli, Nepal",
    description: "Burgers. Fried Chicken. Good Vibes. — Byas, Damauli, Nepal",
    type: "website",
    url: "https://theburgerhouse.com",
    siteName: "The Burger House",
    images: [
      {
        url: "https://theburgerhouse.com/og-image.png",
        width: 1200,
        height: 630,
        alt: "The Burger House and Crunchy Fried Chicken - Best Food in Damauli",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "The Burger House & Crunchy Fried Chicken | Damauli",
    description: "Best burgers and fried chicken in Damauli, Nepal",
  },
  alternates: {
    canonical: "https://theburgerhouse.com",
  },
  robots: {
    index: true,
    follow: true,
    nocache: true,
    googleBot:
      "index, follow, max-snippet:-1, max-image-preview:large, max-video-preview:-1",
  },
  metadataBase: new URL("https://theburgerhouse.com"),
  authors: [
    {
      name: "The Burger House",
      url: "https://theburgerhouse.com",
    },
  ],
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
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
