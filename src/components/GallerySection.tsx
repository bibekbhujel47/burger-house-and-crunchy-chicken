"use client";

import React from "react";
import Image from "next/image";
import { motion } from "motion/react";
import { Camera, Maximize2 } from "lucide-react";
import Link from "next/link";
import buildWhatsAppURL from "@/app/utils/whatsApp";
import SITE_DATA from "@/constants";

interface GalleryImage {
  src: string;
  alt: string;
}

interface GallerySectionProps {
  badge: string;
  title: string;
  titleHighlight: string;
  instagramHandle: string;
  instagramCta: string;
  imageTag: string;
  images: GalleryImage[];
}

export const GallerySection: React.FC<GallerySectionProps> = ({
  badge,
  title,
  titleHighlight,
  instagramHandle,
  instagramCta,
  imageTag,
  images,
}) => {
  return (
    <section className="py-24 bg-zinc-50 overflow-hidden">
      <div className="max-w-7xl mx-auto px-6">
        {/* Header Area */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6">
          <div className="max-w-2xl">
            <motion.span
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-yellow-600 font-black uppercase tracking-[0.3em] text-xs"
            >
              {badge}
            </motion.span>
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
              className="text-5xl md:text-7xl font-black text-zinc-900 mt-4 tracking-tighter leading-none"
            >
              {title}
              <span className="text-zinc-400">{titleHighlight}</span>
            </motion.h2>
          </div>
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="flex items-center gap-2 text-zinc-900 font-bold"
          >
            <Camera size={20} className="text-yellow-500" />
            <span className="tracking-tight">{instagramHandle}</span>
          </motion.div>
        </div>

        {/* Masonry-like Grid */}
        <div className="columns-1 md:columns-2 lg:columns-3 gap-6 space-y-6">
          {images.map((img, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{
                delay: (i % 3) * 0.1,
                duration: 0.6,
                ease: [0.16, 1, 0.3, 1],
              }}
              className="relative group overflow-hidden rounded-[2rem] break-inside-avoid shadow-lg transition-all duration-500 hover:shadow-2xl"
            >
              <div className="relative w-full h-auto">
                <Image
                  src={img.src}
                  alt={img.alt}
                  width={800}
                  height={1000}
                  unoptimized={true}
                  className="w-full object-cover transition-transform duration-700 group-hover:scale-110"
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                />
              </div>

              {/* Hover Overlay */}
              <div className="absolute inset-0 bg-zinc-900/40 opacity-0 group-hover:opacity-100 transition-all duration-500 backdrop-blur-[2px] flex items-center justify-center p-8">
                <div className="text-center transform translate-y-4 group-hover:translate-y-0 transition-transform duration-500">
                  <div className="w-12 h-12 bg-yellow-400 rounded-full flex items-center justify-center mx-auto mb-4 text-black shadow-lg">
                    <Maximize2 size={20} />
                  </div>
                  <p className="text-white font-black text-xl tracking-tight leading-tight">
                    {img.alt}
                  </p>
                  <span className="text-yellow-400/80 text-[10px] font-bold uppercase tracking-[0.2em] mt-2 block">
                    {imageTag}
                  </span>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Bottom CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mt-16 text-center"
        >
          {/* Centering Wrapper */}
          <div className="flex w-full justify-center items-center py-8">
            <Link
              href={SITE_DATA.instagramPageLink}
              target="_blank"
              rel="noopener noreferrer"
              className="
      group relative flex items-center justify-center gap-3 
      bg-zinc-900 text-white px-10 py-5 rounded-2xl 
      font-black uppercase text-[10px] tracking-[0.2em] 
      transition-all duration-300 overflow-hidden
      hover:bg-yellow-400 hover:text-black hover:shadow-xl hover:shadow-yellow-400/20
      active:scale-95 w-full sm:w-max
    "
            >
              <span className="relative z-10">{instagramCta}</span>

              {/* Subtle Splash Effect on Hover */}
              <div className="absolute inset-0 bg-white/10 translate-y-full group-hover:translate-y-0 transition-transform duration-300" />
            </Link>
          </div>
        </motion.div>
      </div>
    </section>
  );
};
