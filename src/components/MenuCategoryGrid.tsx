"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import { motion } from "motion/react";
import { ArrowUpRight } from "lucide-react";

interface Category {
  name: string;
  image: string;
  description: string;
  slug: string;
}

interface MenuCategoryGridProps {
  badge: string;
  titlePart1: string;
  titlePart2: string;
  viewAllLabel: string;
  categories: Category[];
}

export const MenuCategoryGrid: React.FC<MenuCategoryGridProps> = ({
  badge,
  titlePart1,
  titlePart2,
  viewAllLabel,
  categories,
}) => {
  return (
    <section className="py-24 bg-[#faf6f3]">
      <div className="max-w-7xl mx-auto px-6">
        {/* Header Section */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-8">
          <div className="max-w-2xl">
            <motion.span
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-primary font-black uppercase tracking-[0.3em] text-xs"
            >
              {badge}
            </motion.span>
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
              className="text-5xl md:text-7xl font-black text-primary mt-4 tracking-tighter leading-none"
            >
              {titlePart1} <span className="text-on-surface-variant">{titlePart2}</span>
            </motion.h2>
          </div>
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
          >
            <Link
              href="/menu"
              className="group flex items-center gap-3 text-primary font-black uppercase text-xs tracking-widest border-b-2 border-secondary pb-2 hover:text-secondary transition-colors"
            >
              {viewAllLabel}{" "}
              <ArrowUpRight
                size={18}
                className="group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform"
              />
            </Link>
          </motion.div>
        </div>

        {/* Categories Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {categories.map((cat, i) => (
            <motion.div
              key={cat.slug}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1, duration: 0.6 }}
            >
              <Link
                href={`/menu?category=${cat.slug}`}
                className="group block relative"
              >
                <div className="relative aspect-[4/5] rounded-[2.5rem] shadow-xl transition-all duration-500 group-hover:shadow-2xl group-hover:-translate-y-2">
                  <Image
                    src={cat.image}
                    alt={cat.name}
                    fill
                    unoptimized={true}
                    className="object-cover rounded-[2.5rem] transition-transform duration-700 group-hover:scale-105"
                    quality={100}
                    sizes="(max-width: 768px) 100vw, 33vw"
                  />
                  <div className="absolute inset-0 rounded-[2.5rem] bg-gradient-to-t from-zinc-900/90 via-zinc-900/20 to-transparent opacity-80" />
                  <div className="absolute inset-0 p-8 flex flex-col justify-end">
                    <h3 className="text-3xl font-black text-white mb-2 tracking-tight group-hover:text-secondary transition-colors">
                      {cat.name}
                    </h3>
                    <p className="text-zinc-300 text-sm font-medium leading-relaxed max-w-[200px] transform translate-y-4 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-500">
                      {cat.description}
                    </p>
                  </div>
                  <div className="absolute top-6 right-6 w-12 h-12 bg-white/10 backdrop-blur-md rounded-2xl flex items-center justify-center text-white border border-white/20 group-hover:bg-secondary group-hover:text-white group-hover:border-transparent transition-all duration-300">
                    <ArrowUpRight size={20} />
                  </div>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};
