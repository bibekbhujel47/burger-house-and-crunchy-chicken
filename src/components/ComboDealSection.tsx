"use client";

import React from "react";
import Image from "next/image";
import { Gift, Zap } from "lucide-react";

interface ComboItem {
  id: string;
  title: string;
  price: string;
  contents: string;
  free: string;
  isFamily: boolean;
  image: string;
}

interface ComboDealSectionProps {
  badge: string;
  title: string;
  bestSellerLabel: string;
  currency: string;
  plusFreeLabel: string;
  combos: ComboItem[];
}

export function ComboDealSection({
  badge,
  title,
  bestSellerLabel,
  currency,
  plusFreeLabel,
  combos,
}: ComboDealSectionProps) {
  const standardPacks = combos.filter((item) => !item.isFamily);
  const familyPack = combos.find((item) => item.isFamily);

  return (
    <section className="bg-gradient-to-br from-amber-50 to-orange-50 py-24 px-6 relative overflow-hidden">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-16">
          <span className="inline-block py-1 px-3 rounded-full bg-primary/10 text-primary text-[10px] font-black uppercase tracking-widest mb-4">
            {badge}
          </span>
          <h2 className="text-4xl md:text-6xl font-display font-black text-primary uppercase tracking-tighter">
            {title}
          </h2>
        </div>

        {/* Grid for Packs 1-4 */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
          {standardPacks.map((pack) => (
            <div
              key={pack.id}
              className="group relative bg-white rounded-[2rem] overflow-hidden border border-border flex flex-col sm:flex-row transition-all hover:shadow-2xl hover:shadow-primary/8"
            >
              {/* Splash Image Section */}
              <div className="sm:w-2/5 h-64 sm:h-auto relative overflow-hidden bg-gray-200">
                <Image
                  src={pack.image}
                  alt={pack.title}
                  unoptimized={true}
                  fill
                  className="object-cover object-left transition-transform duration-700 group-hover:scale-110"
                  sizes="(max-width: 640px) 100vw, (max-width: 1024px) 25vw, 20vw"
                />
                <div className="absolute top-4 right-4 z-10 bg-primary text-white font-black px-3 py-1 rounded-lg text-sm shadow-xl transform group-hover:rotate-3 transition-transform">
                  {currency} {pack.price}
                </div>
                <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
              </div>

              {/* Content Section */}
              <div className="p-8 sm:w-3/5 flex flex-col justify-center relative">
                <h3 className="text-2xl font-black uppercase mb-2 group-hover:text-accent transition-colors">
                  {pack.title}
                </h3>
                <p className="text-black/50 text-xs font-medium mb-6 leading-relaxed">
                  ({pack.contents})
                </p>

                <div className="bg-[#faf6f3] p-4 rounded-2xl border border-border shadow-sm group-hover:border-secondary/40 transition-colors relative overflow-hidden">
                  <div className="flex items-center gap-2 text-secondary font-black text-[9px] uppercase tracking-[0.2em] mb-1">
                    <Gift size={12} />
                    {plusFreeLabel}
                  </div>
                  <p className="text-black font-bold text-xs">{pack.free}</p>
                  <Gift
                    size={40}
                    className="absolute -right-2 -bottom-2 text-black/[0.03] rotate-12"
                  />
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Featured Family Combo */}
        {familyPack && (
          <div className="relative bg-[#3d2817] rounded-[3rem] overflow-hidden group min-h-[550px] flex items-center">
            <div className="absolute inset-0 z-0">
              <Image
                src={familyPack?.image}
                alt="The Ultimate Family Combo"
                fill
                className="object-cover opacity-60 grayscale-[20%] group-hover:grayscale-0 transition-all duration-1000 group-hover:scale-105"
                sizes="(max-width: 1280px) 100vw, 1280px"
                priority
              />
              <div className="absolute inset-0 bg-gradient-to-r from-[#3d2817] via-[#3d2817]/80 to-transparent" />
            </div>

            <div className="relative z-10 max-w-3xl p-8 md:p-20">
              <div className="flex items-center gap-3 mb-8">
                <span className="bg-secondary text-on-surface text-[10px] font-black px-4 py-1.5 rounded-full uppercase tracking-tighter animate-pulse">
                  {bestSellerLabel}
                </span>
                <div className="h-px w-16 bg-white/30" />
              </div>

              <h3 className="text-5xl md:text-7xl font-display font-black text-white uppercase mb-6 leading-[0.85] tracking-tighter">
                {familyPack.title} <br />
                <span className="text-secondary italic">
                  {currency} {familyPack.price}
                </span>
              </h3>

              <p className="text-white/70 text-sm md:text-xl leading-relaxed mb-12 font-medium max-w-xl">
                ({familyPack.contents})
              </p>

              <div className="inline-flex items-center gap-6 bg-white/10 backdrop-blur-2xl border border-white/20 p-6 pr-10 rounded-[2rem] group-hover:bg-white/20 transition-all group-hover:translate-x-2">
                <div className="w-16 h-16 rounded-2xl bg-secondary flex items-center justify-center text-white shadow-2xl shadow-secondary/40 rotate-3 group-hover:rotate-0 transition-transform">
                  <Zap size={32} fill="currentColor" />
                </div>
                <div>
                  <p className="text-secondary text-[10px] font-black uppercase tracking-[0.3em] mb-1">
                    {plusFreeLabel}
                  </p>
                  <p className="text-white font-black text-xl md:text-2xl tracking-tight">
                    {familyPack.free}
                  </p>
                </div>
              </div>
            </div>

            <div className="absolute right-[-5%] bottom-[-5%] text-white/[0.05] group-hover:text-secondary/[0.05] transition-colors pointer-events-none">
              <Zap size={400} strokeWidth={1} />
            </div>
          </div>
        )}
      </div>
    </section>
  );
}
