"use client";

import { motion } from "motion/react";
import { useTranslations } from "next-intl";
import Image from "next/image";
import {
  Zap,
  Users,
  ShieldCheck,
  Target,
  Droplets,
  Sparkles,
  History,
  Shield,
  Clock,
  Camera, // Added for the photo placeholder
} from "lucide-react";

export default function AboutPage() {
  const t = useTranslations("AboutPage");

  // Data mapping for specific card behaviors
  const protocolMeta = [
    {
      icon: <Zap size={20} />,
      hoverColor: "hover:border-amber-500 hover:bg-amber-50/50",
      iconColor: "text-amber-500",
      shadow: "shadow-amber-500/10",
    },
    {
      icon: <Users size={20} />,
      hoverColor: "hover:border-blue-500 hover:bg-blue-50/50",
      iconColor: "text-blue-500",
      shadow: "shadow-blue-500/10",
    },
    {
      icon: <ShieldCheck size={20} />,
      hoverColor: "hover:border-emerald-500 hover:bg-emerald-50/50",
      iconColor: "text-emerald-500",
      shadow: "shadow-emerald-500/10",
    },
    {
      icon: <Target size={20} />,
      hoverColor: "hover:border-rose-500 hover:bg-rose-50/50",
      iconColor: "text-rose-500",
      shadow: "shadow-rose-500/10",
    },
    {
      icon: <Droplets size={20} />,
      hoverColor: "hover:border-cyan-500 hover:bg-cyan-50/50",
      iconColor: "text-cyan-500",
      shadow: "shadow-cyan-500/10",
    },
    {
      icon: <Clock size={20} />,
      hoverColor: "hover:border-purple-500 hover:bg-purple-50/50",
      iconColor: "text-purple-500",
      shadow: "shadow-purple-500/10",
    },
  ];

  const protocols = t.raw("protocols");

  return (
    <main className="min-h-screen bg-bg-offwhite selection:bg-accent selection:text-white">
      {/* ── Top Spacer ── */}
      <div className="h-16 border-b border-primary/5 bg-white/50 backdrop-blur-md" />

      {/* ── Header ──────────────────────────────────────── */}
      <header className="px-6 py-20 md:px-8 border-b border-primary/5">
        <div className="mx-auto max-w-7xl">
          <motion.span
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-[10px] font-black uppercase tracking-[0.4em] text-accent"
          >
            {t("badge")}
          </motion.span>
          <h1 className="mt-4 text-5xl font-black uppercase italic leading-[0.85] tracking-tighter text-primary md:text-8xl">
            {t("titlePart1")} <br />
            <div className="mt-6 inline-block text-primary/10 transition-colors hover:text-primary/20 md:mt-8">
              {t("titlePart2")}
            </div>
          </h1>

          <div className="mt-12 flex flex-wrap gap-10 border-l-2 border-accent pl-8">
            {[
              { val: "2020", lab: t("stats.lockdown") },
              { val: "10K+", lab: t("stats.delivered") },
              { val: "01", lab: t("stats.hub") },
            ].map((stat, i) => (
              <div key={i} className="group">
                <p className="text-3xl font-black italic tracking-tighter text-primary md:text-4xl group-hover:text-accent transition-colors">
                  {stat.val}
                </p>
                <p className="text-[10px] font-bold uppercase tracking-widest text-primary/30">
                  {stat.lab}
                </p>
              </div>
            ))}
          </div>
        </div>
      </header>

      {/* ── Narrative Section ───────────────────────────── */}
      <section className="mx-auto max-w-7xl px-6 py-24 md:px-8">
        <div className="grid grid-cols-1 gap-20 lg:grid-cols-2 items-center">
          <div className="space-y-8">
            <div className="flex items-center gap-3">
              <History className="text-accent" size={20} />
              <h3 className="text-2xl font-black uppercase italic text-primary">
                Our Origin
              </h3>
            </div>
            <p className="text-xl md:text-2xl font-bold leading-tight text-primary/80 italic">
              "{t("narrative.p1")}"
            </p>
            <p className="text-base leading-relaxed text-primary/50 font-medium max-w-xl">
              {t("narrative.p2")}
            </p>
          </div>

          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            className="relative aspect-square overflow-hidden rounded-2xl border border-primary/10 bg-white p-4 shadow-xl shadow-primary/5"
          >
            <img
              src="https://images.unsplash.com/photo-1514933651103-005eec06c04b?auto=format&fit=crop&q=80&w=1200"
              alt="Kitchen"
              className="h-full w-full rounded-xl object-cover transition-all duration-700 "
            />
          </motion.div>
        </div>
      </section>

      {/* ── NEW SECTION: Our Members ──────────────────────── */}
      <section className="border-t border-primary/5 bg-primary/[0.02] py-24 px-6 md:px-8">
        <div className="mx-auto max-w-7xl">
          <div className="flex flex-col items-center text-center mb-16">
            <Users className="text-accent mb-4" size={32} />
            <h2 className="text-4xl md:text-6xl font-black uppercase italic text-primary tracking-tighter">
              {t("members.title")}
            </h2>
            <p className="mt-4 text-primary/40 text-xs font-bold uppercase tracking-[0.3em]">
              {t("members.subtitle")}
            </p>
          </div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            className="group relative aspect-[16/7] w-full overflow-hidden rounded-3xl border-4 border-white bg-white shadow-2xl shadow-primary/10"
          >
            <Image
              src={t("members.image")}
              alt={t("members.title")}
              fill
              className="object-cover transition-transform duration-1000 group-hover:scale-105"
              sizes="(max-w-7xl) 100vw"
            />

            {/* Subtle Overlay to make the image feel integrated */}
            <div className="absolute inset-0 bg-gradient-to-t from-primary/60 via-transparent to-transparent opacity-60 transition-opacity group-hover:opacity-40" />

            {/* Bottom Brand Detail */}
            <div className="absolute bottom-8 left-8 flex items-center gap-3">
              <div className="h-[1px] w-12 bg-accent" />
              <span className="text-[10px] font-black uppercase tracking-[0.4em] text-white">
                Damauli Crew
              </span>
            </div>
          </motion.div>
        </div>
      </section>

      {/* ── Protocols: Colorful Hover Effects ─────────── */}
      <section className="bg-white/50 border-y border-primary/5 py-24 px-6 md:px-8">
        <div className="mx-auto max-w-7xl">
          <div className="mb-16">
            <div className="flex items-center gap-3">
              <Shield className="text-accent" size={24} />
              <h2 className="text-3xl font-black uppercase italic text-primary tracking-tight">
                {t("protocolsTitle")}
              </h2>
            </div>
            <p className="mt-2 text-[10px] font-bold uppercase tracking-[0.3em] text-primary/30">
              {t("protocolsSubtitle")}
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-px bg-primary/10 border border-primary/10 overflow-hidden rounded-xl shadow-2xl shadow-primary/5">
            {(protocols as any[]).map((protocol, idx) => {
              const meta = protocolMeta[idx];
              return (
                <motion.div
                  key={idx}
                  className={`bg-white p-10 flex flex-col justify-between min-h-[320px] border-transparent border-2 transition-all duration-300 group ${meta.hoverColor} hover:shadow-2xl hover:z-10`}
                >
                  <div>
                    <div className="flex items-center justify-between mb-8">
                      <div
                        className={`p-3 bg-primary/5 rounded-lg transition-colors duration-300 group-hover:bg-white group-hover:shadow-md ${meta.iconColor}`}
                      >
                        {meta.icon}
                      </div>
                      <span className="text-5xl font-black italic text-primary/5 leading-none transition-colors duration-300 group-hover:text-primary/10">
                        /0{idx + 1}
                      </span>
                    </div>
                    <h4 className="text-xl font-black uppercase tracking-tight text-primary mb-4">
                      {protocol.name}
                    </h4>
                    <p className="text-sm leading-relaxed text-primary/50 font-medium group-hover:text-primary/80 transition-colors">
                      {protocol.desc}
                    </p>
                  </div>

                  {protocol.label && (
                    <div className="mt-8 flex items-center gap-2">
                      <Sparkles size={10} className={meta.iconColor} />
                      <span
                        className={`text-[9px] font-black uppercase tracking-[0.2em] border-b pb-0.5 transition-colors ${meta.iconColor} border-current`}
                      >
                        {protocol.label}
                      </span>
                    </div>
                  )}
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ── Footer ──────────────────────────────────────── */}
      <footer className="py-20 text-center">
        <p className="text-[10px] font-bold uppercase tracking-[0.6em] text-primary/20 transition-colors hover:text-accent">
          {t("footer")} // {new Date().getFullYear()}
        </p>
      </footer>
    </main>
  );
}
