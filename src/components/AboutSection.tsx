"use client";

import React from "react";
import Image from "next/image";
import { motion } from "motion/react";
import { CheckCircle2 } from "lucide-react";

interface AboutSectionProps {
  badge: string;
  title: string;
  description: string;
  image: string;
  experienceYears: string;
  experienceLabel: string;
  features: string[]; // This will come from t.raw("About.features")
}

export const AboutSection: React.FC<AboutSectionProps> = ({
  badge,
  title,
  description,
  image,
  experienceYears,
  experienceLabel,
  features,
}) => {
  return (
    <section id="about" className="py-24 bg-white overflow-hidden">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          {/* Text Content - Left Side */}
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8, ease: "easeOut" }}
          >
            <div className="inline-block mb-4">
              <span className="text-yellow-600 font-bold uppercase tracking-[0.3em] text-xs">
                {badge}
              </span>
              <div className="h-1 w-12 bg-yellow-400 mt-1" />
            </div>

            <h2 className="text-4xl md:text-5xl font-black text-zinc-900 mb-8 leading-tight">
              {title}
            </h2>

            <p className="text-zinc-600 text-lg leading-relaxed mb-10 whitespace-pre-line">
              {description}
            </p>

            {/* Features Grid - Now Dynamic */}
            <ul className="grid grid-cols-1 md:grid-cols-2 gap-y-4 gap-x-6 mb-10">
              {features.map((feature, i) => (
                <motion.li
                  key={i}
                  initial={{ opacity: 0, y: 10 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1 }}
                  className="flex items-center gap-3 text-zinc-800 font-bold text-sm"
                >
                  <div className="flex-shrink-0 w-6 h-6 rounded-full bg-green-100 flex items-center justify-center">
                    <CheckCircle2 size={16} className="text-green-600" />
                  </div>
                  {feature}
                </motion.li>
              ))}
            </ul>
          </motion.div>

          {/* Visual Content - Right Side */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="relative"
          >
            <div className="absolute -inset-4 bg-yellow-400/10 rounded-[2rem] -rotate-2" />
            <div className="absolute inset-0 border-2 border-zinc-100 rounded-[2rem] rotate-1" />

            <div className="relative z-10 w-full aspect-[4/5] md:aspect-square overflow-hidden rounded-[1.5rem] shadow-2xl">
              <Image
                src={image}
                alt="The Burger House Interior vibe"
                fill
                className="object-cover"
                sizes="(max-width: 768px) 100vw, 50vw"
              />
            </div>

            {/* Floating Experience Badge - Now Dynamic */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.5 }}
              className="absolute -bottom-6 -left-6 md:-bottom-10 md:-left-10 bg-zinc-900 text-white p-6 md:p-8 rounded-2xl z-20 shadow-2xl rotate-3"
            >
              <span className="block text-4xl md:text-5xl font-black text-yellow-400 mb-1">
                {experienceYears}
              </span>
              <span className="block text-[10px] uppercase font-bold tracking-[0.2em] text-zinc-400">
                {experienceLabel}
              </span>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};
