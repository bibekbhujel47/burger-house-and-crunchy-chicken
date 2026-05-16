import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "About Us | The Burger House & Crunchy Fried Chicken - Damauli",
  description:
    "Learn about The Burger House story. Founded in 2020 during lockdown, we serve authentic burgers, crispy fried chicken, and quality food in Damauli, Nepal. Meet our team and quality protocols.",
  keywords: [
    "about us Damauli",
    "restaurant story Nepal",
    "food quality standards",
    "burger house team",
    "restaurant Byas",
    "our journey",
  ],
  openGraph: {
    title: "About Us | The Burger House & Crunchy Fried Chicken",
    description:
      "From lockdown startup to beloved neighborhood restaurant. Est. 2020",
    type: "website",
  },
};

export default function AboutLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
