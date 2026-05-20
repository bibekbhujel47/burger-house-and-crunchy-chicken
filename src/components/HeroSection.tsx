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
  bgImage: string; // Renamed from backgroundImage to match your call
  ctaPrimary: string; // Changed to string to match t("Hero.ctaPrimary")
  ctaSecondary: string; // Changed to string
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

export const HeroSection: React.FC<HeroSectionProps> = ({
  badge,
  headline,
  subheadline,
  bgImage,
  ctaPrimary,
  ctaSecondary,
  orderNow,
  reserveTable,
}) => {
  return (
    <section 
      className="relative min-h-screen w-full flex items-center justify-center overflow-hidden bg-gradient-to-br from-slate-100 via-amber-50 to-orange-50"
    >
      <motion.div
        initial={{ scale: 1.1 }}
        animate={{ scale: 1 }}
        transition={{ duration: 8, ease: "easeOut" }}
        className="absolute inset-0 z-0"
      >
        <Image
          src={bgImage}
          alt="Background"
          fill
          priority
          className="object-cover opacity-70"
          quality={100}
          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 25vw, 20vw"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-white/80 via-white/40 to-transparent z-10" />
        <div className="absolute inset-0 bg-gradient-to-t from-white/60 via-transparent to-transparent z-10" />
      </motion.div>

      <div className="container relative z-20 mx-auto px-6 pt-32 pb-20">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="max-w-4xl"
        >
          {/* Dynamic Badge */}
          <motion.div variants={itemVariants} className="mb-6">
            <span className="inline-flex items-center gap-3 bg-primary/10 backdrop-blur-md border border-primary/30 text-primary px-4 py-2 rounded-full text-[11px] font-bold uppercase tracking-[0.2em]">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-500 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-red-600"></span>
              </span>
              {badge}
            </span>
          </motion.div>

          {/* Headline logic remains the same */}
          <motion.h1
            variants={itemVariants}
            className="text-5xl md:text-7xl lg:text-8xl font-black text-primary leading-[1.15] mb-6 tracking-normal"
          >
            {headline.split(".").map((part, i) => (
              <span
                key={i}
                className={i % 2 !== 0 ? "text-secondary block" : "block"}
              >
                {part.trim()}
                {i < headline.split(".").length - 1 ? "." : ""}
              </span>
            ))}
          </motion.h1>

          <motion.p
            variants={itemVariants}
            className="text-on-surface text-lg md:text-xl mb-10 max-w-xl leading-relaxed font-medium"
          >
            {subheadline}
          </motion.p>

          <motion.div
            variants={itemVariants}
            className="flex flex-col sm:flex-row flex-wrap gap-4 mb-10"
          >
            <Link
              href="/menu"
              className="group relative flex items-center justify-center gap-3 bg-red-600 hover:bg-red-700 text-white px-8 py-4 rounded-2xl font-black transition-all duration-300 shadow-xl shadow-red-600/30"
            >
              {ctaPrimary}
              <ChevronRight size={18} />
            </Link>

            <a
              href={`tel:${SITE_DATA.phoneNumber}`}
              className="group flex items-center justify-center gap-3 bg-amber-600 hover:bg-amber-700 text-white px-8 py-4 rounded-2xl font-black transition-all duration-300 shadow-xl shadow-amber-600/30"
            >
              {orderNow}
              <ChevronRight size={18} />
            </a>

            <a
              href={`tel:${SITE_DATA.phoneNumber}`}
              className="group flex items-center justify-center gap-3 bg-red-500 hover:bg-red-600 text-white px-8 py-4 rounded-2xl font-black transition-all duration-300 shadow-xl shadow-red-500/30"
            >
              {reserveTable}
              <ChevronRight size={18} />
            </a>

            <Link
              href="/contact"
              className="flex items-center justify-center bg-white/40 hover:bg-white/60 border border-primary/30 text-primary px-8 py-4 rounded-2xl font-bold backdrop-blur-md transition-all duration-300"
            >
              {ctaSecondary}
            </Link>
          </motion.div>
        </motion.div>
      </div>
      <div className="absolute bottom-0 left-0 w-full h-24 bg-gradient-to-t from-slate-100 to-transparent z-10" />
    </section>
  );
};
