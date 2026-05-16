import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Gallery | The Burger House & Crunchy Fried Chicken - Photo Gallery",
  description:
    "Explore stunning photos of our restaurant, food, and team. Beautiful moments from The Burger House and Crunchy Fried Chicken in Damauli. Behind-the-scenes and delicious food photography.",
  keywords: [
    "gallery Damauli",
    "restaurant photos",
    "food photography Nepal",
    "burger photos",
    "fried chicken pictures",
    "restaurant gallery",
  ],
  openGraph: {
    title: "Gallery | The Burger House & Crunchy Fried Chicken",
    description: "Visual story of our restaurant, food, and good vibes",
    type: "website",
  },
};

export default function GalleryLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
