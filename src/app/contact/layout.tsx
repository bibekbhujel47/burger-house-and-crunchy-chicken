import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Contact Us | The Burger House & Crunchy Fried Chicken - Damauli",
  description:
    "Get in touch with The Burger House. Call, WhatsApp, or visit us at Byas, Damauli, Tanahun, Nepal. Free delivery available. Open daily 9 AM - 9 PM.",
  keywords: [
    "contact restaurant Damauli",
    "phone number Damauli",
    "WhatsApp restaurant",
    "address Byas Tanahun",
    "delivery Damauli",
    "restaurant hours",
  ],
  openGraph: {
    title: "Contact Us | The Burger House & Crunchy Fried Chicken",
    description: "Ready to order? Get our contact info and delivery details.",
    type: "website",
  },
};

export default function ContactLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
