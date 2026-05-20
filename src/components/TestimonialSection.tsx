"use client";

import React from "react";
import Image from "next/image";
import { motion } from "motion/react";
import { Star, Quote } from "lucide-react";

interface Review {
  name: string;
  rating: number;
  comment: string;
  image?: string;
}

interface TestimonialSectionProps {
  badge: string;
  title: string;
  titleHighlight: string;
  verifiedLabel: string;
  reviews: Review[];
}

export const TestimonialSection: React.FC<TestimonialSectionProps> = ({
  badge,
  title,
  titleHighlight,
  verifiedLabel,
  reviews,
}) => {
  return (
    <section className="py-24 bg-gradient-to-br from-slate-50 to-amber-50 relative overflow-hidden">
      {/* Decorative Quote Icon in Background */}
      <div className="absolute top-0 left-0 text-primary/5 -translate-x-1/4 -translate-y-1/4 select-none pointer-events-none">
        <Quote size={400} />
      </div>

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        <div className="text-center mb-16">
          <motion.span
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            className="text-primary font-black uppercase tracking-[0.3em] text-xs"
          >
            {badge}
          </motion.span>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            className="text-4xl md:text-6xl font-black text-primary mt-4 tracking-tighter"
          >
            {title} <span className="text-secondary">{titleHighlight}</span>
          </motion.h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {reviews.map((review, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.15 }}
              className="bg-white p-10 rounded-[2.5rem] shadow-xl shadow-primary/10 flex flex-col justify-between relative group hover:-translate-y-2 transition-all duration-500"
            >
              <div>
                <div className="flex gap-1 mb-8">
                  {[...Array(5)].map((_, j) => (
                    <Star
                      key={j}
                      size={14}
                      className={
                        j < review.rating
                          ? "text-secondary fill-secondary"
                          : "text-border"
                      }
                    />
                  ))}
                </div>
                <p className="text-on-surface-variant text-xl font-medium leading-relaxed italic mb-10">
                  &quot;{review.comment}&quot;
                </p>
              </div>

              <div className="flex items-center gap-4 pt-6 border-t border-border">
                {review.image && (
                  <div className="relative w-12 h-12 rounded-full overflow-hidden border-2 border-secondary">
                    <Image
                      src={review.image}
                      alt={review.name}
                      fill
                      className="object-cover"
                      sizes="48px"
                    />
                  </div>
                )}
                <div>
                  <span className="block font-black text-on-surface tracking-tight">
                    {review.name}
                  </span>
                  <span className="text-[10px] uppercase font-bold text-on-surface-variant tracking-widest">
                    {verifiedLabel}
                  </span>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};
