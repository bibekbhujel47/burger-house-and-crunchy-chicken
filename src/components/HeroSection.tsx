"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import { motion, Variants } from "motion/react";
import { ChevronRight, MapPin } from "lucide-react";
import SITE_DATA from "@/constants";

interface HeroSectionProps {
  badge: string;
  headline: string;
  subheadline: string;
  bgImage: string;
  heroImage?: string;
  ctaPrimary: string;
  ctaSecondary: string;
  orderNow: string;
  reserveTable: string;
}

const containerVariants: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.15, delayChildren: 0.2 },
  },
};

const itemVariants: Variants = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] },
  },
};

const logoVariants: Variants = {
  hidden: { opacity: 0, scale: 0.95 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: { duration: 1, ease: [0.16, 1, 0.3, 1], delay: 0.2 },
  },
};

export const HeroSection: React.FC<HeroSectionProps> = ({
  badge,
  headline,
  subheadline,
  heroImage = "/heroImg.webp",
  ctaPrimary,
  ctaSecondary,
  orderNow,
  reserveTable,
}) => {
  // Splits text cleanly by "." while preventing empty element arrays
  const headlineParts = headline.split(".").filter((p) => p.trim() !== "");

  return (
    <section className="relative w-full bg-[#F4F1EE] overflow-hidden min-h-screen flex items-center justify-center">
      {/* Optimized responsive paddings to fit cleanly inside regular viewports */}
      <div className="container relative z-20 mx-auto px-6 md:px-12 xl:px-16 pt-24 pb-12 lg:py-16">
        {/* Layout Grid: Upgraded breakpoint to xl for side-by-side mode to prevent awkward squeezes */}
        <div className="grid grid-cols-1 xl:grid-cols-12 gap-10 xl:gap-8 items-center">
          {/* LEFT SIDE: Large Logo Graphic */}
          <motion.div
            variants={logoVariants}
            initial="hidden"
            animate="visible"
            className="xl:col-span-6 flex justify-center xl:justify-start items-center"
          >
            {/* Fluid max-widths to handle middle zooms smoothly */}
            <div className="relative w-full max-w-[360px] sm:max-w-[420px] md:max-w-[460px] lg:max-w-[500px] xl:max-w-[580px] 2xl:max-w-[660px] xl:-ml-6">
              <Image
                src={heroImage}
                alt="The Burger House"
                width={650}
                height={650}
                priority
                className="w-full h-auto object-contain"
                unoptimized
              />
            </div>
          </motion.div>

          {/* RIGHT SIDE: Typography & Navigation Actions */}
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className="xl:col-span-6 flex flex-col justify-center text-left xl:pl-6"
          >
            {/* Dynamic Badge */}
            <motion.div
              variants={itemVariants}
              className="mb-6"
            >
              <span className="inline-flex items-center gap-3 bg-[#fbebeb] border border-[#f3cece] text-[#dc2626] px-5 py-2.5 rounded-full text-[12px] font-black uppercase tracking-[0.15em]">
                <span className="relative flex h-2 w-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-500 opacity-75" />
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-red-600" />
                </span>
                {badge}
              </span>
            </motion.div>

            <motion.h1
              variants={itemVariants}
              className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl 2xl:text-[84px] font-black leading-[1.1] mb-5 tracking-tight"
            >
              {headlineParts.map((part, i) => {
                const isAlternativeColor = i === 1;
                return (
                  <span
                    key={i}
                    className={`block ${
                      isAlternativeColor ? "text-[#c29663]" : "text-[#d31111]"
                    }`}
                  >
                    {part.trim()}.
                  </span>
                );
              })}
            </motion.h1>

            {/* Description Sub-text */}
            <motion.p
              variants={itemVariants}
              className="text-[#333333] text-base sm:text-lg lg:text-xl mb-8 max-w-xl leading-relaxed font-medium"
            >
              {subheadline}
            </motion.p>

            {/* CTA Buttons Block */}
            <motion.div
              variants={itemVariants}
              className="flex flex-col sm:flex-row flex-wrap gap-3 items-stretch sm:items-center"
            >
              <Link
                href="/menu"
                className="flex items-center justify-center gap-2 bg-[#d30f0f] hover:bg-[#b50b0b] text-white font-bold px-6 py-3.5 rounded-2xl transition-all duration-300 shadow-xl shadow-red-700/20 text-sm sm:text-base whitespace-nowrap"
              >
                {ctaPrimary}
                <ChevronRight size={18} />
              </Link>

              <a
                href={`tel:${SITE_DATA.phoneNumber}`}
                className="flex items-center justify-center gap-2 bg-[#e07300] hover:bg-[#c66500] text-white font-bold px-6 py-3.5 rounded-2xl transition-all duration-300 shadow-xl shadow-amber-700/20 text-sm sm:text-base whitespace-nowrap"
              >
                {orderNow}
                <ChevronRight size={18} />
              </a>

              <a
                href={`tel:${SITE_DATA.phoneNumber}`}
                className="flex items-center justify-center gap-2 bg-[#e31b23] hover:bg-[#ca141b] text-white font-bold px-6 py-3.5 rounded-2xl transition-all duration-300 shadow-xl shadow-red-600/20 text-sm sm:text-base whitespace-nowrap"
              >
                {reserveTable}
                <ChevronRight size={18} />
              </a>

              {ctaSecondary && (
                <a
                  href={SITE_DATA.burgerHouseGoogleMapLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-center gap-2 bg-white border border-gray-200 text-gray-700 hover:bg-gray-50 px-6 py-3.5 rounded-2xl font-bold transition-all duration-300 text-sm sm:text-base shadow-sm whitespace-nowrap"
                >
                  <MapPin size={18} />
                  {ctaSecondary}
                </a>
              )}
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};
