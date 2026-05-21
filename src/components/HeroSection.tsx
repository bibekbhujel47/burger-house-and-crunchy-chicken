"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import { motion, Variants } from "motion/react";
import { ChevronRight } from "lucide-react";
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
  heroImage = "/heroImage.webp",
  ctaPrimary,
  ctaSecondary,
  orderNow,
  reserveTable,
}) => {
  // Splits text cleanly by "." while preventing empty element arrays
  const headlineParts = headline.split(".").filter((p) => p.trim() !== "");

  return (
    <section className="relative w-full bg-[#fdfbf7] overflow-hidden min-h-screen">
      <div className="container relative z-20 mx-auto px-6 md:px-12 lg:px-16 min-h-screen flex flex-col justify-center pt-28 pb-16">
        {/* Layout Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center min-h-[85vh]">
          {/* LEFT SIDE: Large Logo Graphic */}
          <motion.div
            variants={logoVariants}
            initial="hidden"
            animate="visible"
            className="lg:col-span-6 flex justify-center items-center relative"
          >
            <div className="relative w-full h-[260px] sm:h-[520px] md:h-[620px] lg:h-[620px] xl:h-[680px]">
              <Image
                src={heroImage}
                alt="The Burger House"
                fill
                priority
                className="object-contain scale-[1.35] sm:scale-[1.45] md:scale-[1.2] lg:scale-[1.45] xl:scale-[1.6]"
                unoptimized
              />
            </div>
          </motion.div>

          {/* RIGHT SIDE: Typography & Navigation Actions */}
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className="lg:col-span-6 flex flex-col justify-center text-left order-2 lg:pl-6"
          >
            {/* Split Colored Headline */}
            <motion.h1
              variants={itemVariants}
              className="text-5xl sm:text-6xl md:text-7xl xl:text-[84px] font-black leading-[1.1] mb-6 tracking-tight"
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
              className="text-[#333333] text-lg sm:text-xl mb-10 max-w-xl leading-relaxed font-medium"
            >
              {subheadline}
            </motion.p>

            {/* CTA Buttons Block */}
            <motion.div
              variants={itemVariants}
              className="flex flex-col sm:flex-row flex-wrap gap-4 items-stretch sm:items-center"
            >
              <Link
                href="/menu"
                className="flex items-center justify-center gap-2 bg-[#d30f0f] hover:bg-[#b50b0b] text-white font-bold px-7 py-4 rounded-2xl transition-all duration-300 shadow-xl shadow-red-700/20 text-base"
              >
                {ctaPrimary}
                <ChevronRight size={18} />
              </Link>

              <a
                href={`tel:${SITE_DATA.phoneNumber}`}
                className="flex items-center justify-center gap-2 bg-[#e07300] hover:bg-[#c66500] text-white font-bold px-7 py-4 rounded-2xl transition-all duration-300 shadow-xl shadow-amber-700/20 text-base"
              >
                {orderNow}
                <ChevronRight size={18} />
              </a>

              <a
                href={`tel:${SITE_DATA.phoneNumber}`}
                className="flex items-center justify-center gap-2 bg-[#e31b23] hover:bg-[#ca141b] text-white font-bold px-7 py-4 rounded-2xl transition-all duration-300 shadow-xl shadow-red-600/20 text-base"
              >
                {reserveTable}
                <ChevronRight size={18} />
              </a>

              {ctaSecondary && (
                <Link
                  href="/contact"
                  className="flex items-center justify-center bg-white border border-gray-200 text-gray-700 hover:bg-gray-50 px-7 py-4 rounded-2xl font-bold transition-all duration-300 text-base shadow-sm"
                >
                  {ctaSecondary}
                </Link>
              )}
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};
