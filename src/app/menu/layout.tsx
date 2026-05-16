import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Full Menu | The Burger House & Crunchy Fried Chicken - Damauli",
  description:
    "Browse our complete menu: burgers, fried chicken, pizza, momos, biryani, snacks, and drinks. Free home delivery across Damauli, Nepal. Fast, fresh, and delicious.",
  keywords: [
    "menu Damauli restaurant",
    "burger menu Nepal",
    "fried chicken menu",
    "food menu Byas",
    "restaurant menu delivery",
    "pizza menu Nepal",
    "biryani menu Damauli",
  ],
  openGraph: {
    title: "Full Menu | The Burger House & Crunchy Fried Chicken",
    description: "17+ food categories with 100+ fresh items. Free delivery!",
    type: "website",
  },
};

export default function MenuLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
