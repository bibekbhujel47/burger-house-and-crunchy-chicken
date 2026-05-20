import { HeroSection } from "@/components/HeroSection";
import { AboutSection } from "@/components/AboutSection";
import { MenuCategoryGrid } from "@/components/MenuCategoryGrid";
import { ComboDealSection } from "@/components/ComboDealSection";
import { TestimonialSection } from "@/components/TestimonialSection";
import { GallerySection } from "@/components/GallerySection";
import { ContactSection } from "@/components/ContactSection";
import { useTranslations } from "next-intl";
import SITE_DATA from "@/constants";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title:
    "The Burger House & Crunchy Fried Chicken | Best Burgers in Damauli, Nepal",
  description:
    "Discover the best burgers, crispy fried chicken, and quick meals in Damauli, Tanahun. Fresh ingredients, fast delivery, and great vibes. Order now or visit us at Byas, Damauli.",
  keywords: [
    "burger house Damauli",
    "crunchy fried chicken Nepal",
    "restaurant Byas Tanahun",
    "burger delivery Damauli",
    "fried chicken takeaway",
    "fast food Damauli",
    "food delivery Nepal",
  ],
  openGraph: {
    title: "The Burger House & Crunchy Fried Chicken | Damauli",
    description: "Burgers. Fried Chicken. Good Vibes. — Byas, Damauli, Nepal",
    type: "website",
    url: "https://burgerhousedamauli.com",
    images: [
      {
        url: "https://burgerhousedamauli.com/og-image.png",
        width: 1200,
        height: 630,
        alt: "The Burger House and Crunchy Fried Chicken",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "The Burger House & Crunchy Fried Chicken | Damauli",
    description: "Best burgers and fried chicken in Damauli, Nepal",
  },
  alternates: {
    canonical: "https://burgerhousedamauli.com",
  },
};

// --- COMPONENT ---

export default function Home() {
  const t = useTranslations("HomePage");

  return (
    <main className="min-h-screen bg-[#faf6f3]">
      <HeroSection
        badge={t("Hero.locationBadge")}
        headline={t("Hero.headline")}
        subheadline={t("Hero.subheadline")}
        ctaPrimary={t("Hero.ctaPrimary")}
        orderNow={t("Hero.orderNow")}
        reserveTable={t("Hero.reserveTable")}
        ctaSecondary={t("Hero.ctaSecondary")}
        bgImage={t("Hero.bgImage")}
      />

      {/* 2. About Section */}
      <AboutSection
        badge={t("About.badge")}
        title={t("About.title")}
        description={t("About.description")}
        experienceYears={t("About.experienceYears")}
        experienceLabel={t("About.experienceLabel")}
        image={t("About.image")}
        features={t.raw("About.features")}
      />

      {/* 3. Categories Section */}
      <MenuCategoryGrid
        badge={t("Categories.badge")}
        titlePart1={t("Categories.titlePart1")}
        titlePart2={t("Categories.titlePart2")}
        viewAllLabel={t("Categories.viewAll")}
        categories={t.raw("Categories.items")}
      />

      <div className="h-px bg-gradient-to-r from-transparent via-border to-transparent mx-auto max-w-7xl" />

      {/* 4. Combo Deals Section */}
      <ComboDealSection
        badge={t("Combos.badge")}
        title={t("Combos.title")}
        bestSellerLabel={t("Combos.bestSeller")}
        currency={t("Combos.currency")}
        plusFreeLabel={t("Combos.plusFree")}
        // t.raw pulls the entire array including our new splash image URLs
        combos={t.raw("Combos.items")}
      />

      {/* 5. Testimonials Section */}
      <TestimonialSection
        badge={t("Testimonials.badge")}
        title={t("Testimonials.title")}
        titleHighlight={t("Testimonials.titleHighlight")}
        verifiedLabel={t("Testimonials.verifiedLabel")}
        reviews={t.raw("Testimonials.reviews")}
      />

      <GallerySection
        badge={t("Gallery.badge")}
        title={t("Gallery.title")}
        titleHighlight={t("Gallery.titleHighlight")}
        instagramHandle={t("Gallery.instagramHandle")}
        instagramCta={t("Gallery.instagramCta")}
        imageTag={t("Gallery.imageTag")}
        images={t.raw("Gallery.images")}
      />

      <ContactSection
        badge={t("Contact.badge")}
        title={t("Contact.title")}
        titleHighlight={t("Contact.titleHighlight")}
        description={t("Contact.description")}
        phone={SITE_DATA.phoneNumber}
        address={t("Contact.address")}
        hours={t("Contact.hours")}
        deliveryNote={t("Contact.deliveryNote")}
        labels={t.raw("Contact.labels")}
      />
    </main>
  );
}
