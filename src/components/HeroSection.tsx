"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import { motion, Variants } from "motion/react";
import { ChevronRight } from "lucide-react";

interface HeroSectionProps {
  badge: string;
  headline: string;
  subheadline: string;
  bgImage: string; // Renamed from backgroundImage to match your call
  ctaPrimary: string; // Changed to string to match t("Hero.ctaPrimary")
  ctaSecondary: string; // Changed to string
}

export const HeroSection: React.FC<HeroSectionProps> = ({
  badge,
  headline,
  subheadline,
  bgImage,
  ctaPrimary,
  ctaSecondary,
}) => {
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

  return (
    <section className="relative min-h-screen w-full flex items-center justify-center overflow-hidden bg-zinc-950">
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
          className="object-cover opacity-60"
          quality={100}
          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 25vw, 20vw"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-black via-black/40 to-transparent z-10" />
        <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent z-10" />
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
            <span className="inline-flex items-center gap-3 bg-white/10 backdrop-blur-md border border-white/20 text-white px-4 py-2 rounded-full text-[11px] font-bold uppercase tracking-[0.2em]">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-yellow-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-yellow-500"></span>
              </span>
              {badge}
            </span>
          </motion.div>

          {/* Headline logic remains the same */}
          <motion.h1
            variants={itemVariants}
            className="text-6xl md:text-8xl lg:text-9xl font-black text-white leading-[0.9] mb-6 tracking-tighter"
          >
            {headline.split(".").map((part, i) => (
              <span
                key={i}
                className={i % 2 !== 0 ? "text-yellow-400 block" : "block"}
              >
                {part.trim()}
                {i < headline.split(".").length - 1 ? "." : ""}
              </span>
            ))}
          </motion.h1>

          <motion.p
            variants={itemVariants}
            className="text-zinc-300 text-lg md:text-xl mb-10 max-w-xl leading-relaxed font-medium"
          >
            {subheadline}
          </motion.p>

          <motion.div
            variants={itemVariants}
            className="flex flex-col sm:flex-row gap-4 mb-10"
          >
            <Link
              href="/menu"
              className="group relative flex items-center justify-center gap-3 bg-yellow-400 hover:bg-yellow-500 text-black px-8 py-4 rounded-2xl font-black transition-all duration-300 shadow-xl shadow-yellow-400/20"
            >
              {ctaPrimary}
              <ChevronRight size={18} />
            </Link>

            <Link
              href="/contact"
              className="flex items-center justify-center bg-white/5 hover:bg-white/10 border border-white/20 text-white px-8 py-4 rounded-2xl font-bold backdrop-blur-md transition-all duration-300"
            >
              {ctaSecondary}
            </Link>
          </motion.div>
        </motion.div>
      </div>
      <div className="absolute bottom-0 left-0 w-full h-24 bg-gradient-to-t from-zinc-950 to-transparent z-10" />
    </section>
  );
};
