"use client";

import { motion } from "motion/react";
import {
  MessageCircle,
  Phone,
  MapPin,
  Clock,
  Volume2,
  Users,
  Sparkles,
  ArrowUpRight,
} from "lucide-react";
import { GoogleMapsEmbed } from "@next/third-parties/google";
import { useTranslations } from "next-intl";
import SITE_DATA from "@/constants";
import buildWhatsAppURL from "../utils/whatsApp";

export default function ContactPage() {
  const t = useTranslations("ContactPage");
  const whatsappMessages = t.raw("whatsappMessages") as any[];
  const mealHours = t.raw("hours.items") as any[];

  const contactMeta = [
    {
      icon: <MessageCircle size={20} />,
      hover: "hover:border-green-500 hover:bg-green-50/50",
      color: "text-green-500",
    },
    {
      icon: <Users size={20} />,
      hover: "hover:border-blue-500 hover:bg-blue-50/50",
      color: "text-blue-500",
    },
    {
      icon: <Volume2 size={20} />,
      hover: "hover:border-amber-500 hover:bg-amber-50/50",
      color: "text-amber-500",
    },
  ];

  return (
    <main className="min-h-screen bg-bg-offwhite selection:bg-accent selection:text-white pb-20">
      {/* ── Top Spacer ── */}
      <div className="h-16 border-b border-primary/5 bg-white/50 backdrop-blur-md" />

      {/* ── Header: Scaled down to prevent overflow ── */}
      <header className="px-6 py-12 md:py-20 md:px-8 border-b border-primary/5 relative overflow-hidden">
        <div className="absolute top-0 right-0 text-[15vw] font-black italic text-primary/[0.02] leading-none select-none translate-x-1/4 -translate-y-1/4">
          CONNECT
        </div>

        <div className="mx-auto max-w-7xl relative">
          <motion.span
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-[10px] font-black uppercase tracking-[0.4em] text-accent"
          >
            {t("hero.badge")}
          </motion.span>

          {/* Fluid text: starts smaller on mobile, caps at 7xl to avoid pushing content too far down */}
          <h1 className="mt-4 text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-black uppercase italic leading-[1.1] tracking-tighter text-primary">
            {t("hero.title")} <br />
            <div className="mt-2 inline-block text-primary/10 transition-colors hover:text-primary/20 text-2xl sm:text-3xl md:text-5xl">
              {t("hero.description")}
            </div>
          </h1>
        </div>
      </header>

      {/* ── Main Grid Section ───────────────────────────── */}
      <section className="mx-auto max-w-7xl px-6 py-12 md:py-16 md:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-px bg-primary/10 border border-primary/10 overflow-hidden rounded-xl shadow-2xl shadow-primary/5">
          {/* Left Side: Cards */}
          <div className="lg:col-span-7 grid grid-cols-1 md:grid-cols-2 gap-px bg-primary/10">
            {whatsappMessages.map((msg, idx) => {
              const meta = contactMeta[idx % contactMeta.length];
              return (
                <motion.a
                  key={idx}
                  href={buildWhatsAppURL()}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`bg-white p-8 md:p-10 flex flex-col justify-between min-h-[280px] transition-all duration-300 group ${meta.hover}`}
                >
                  <div className="flex justify-between items-start">
                    <div
                      className={`p-3 bg-primary/5 rounded-lg transition-all group-hover:bg-white group-hover:shadow-md ${meta.color}`}
                    >
                      {meta.icon}
                    </div>
                    <span className="text-4xl font-black italic text-primary/5 group-hover:text-primary/10 transition-colors">
                      /0{idx + 1}
                    </span>
                  </div>

                  <div>
                    <h3 className="text-lg font-black uppercase tracking-tight text-primary mb-2 flex items-center gap-2">
                      {msg.label}{" "}
                      <ArrowUpRight
                        size={14}
                        className="opacity-0 group-hover:opacity-100 transition-opacity"
                      />
                    </h3>
                    <p className="text-sm leading-relaxed text-primary/50 font-medium group-hover:text-primary/80 transition-colors">
                      {msg.text}
                    </p>
                  </div>
                </motion.a>
              );
            })}

            {/* Hotline Block */}
            <div className="bg-primary p-8 md:p-10 flex flex-col justify-between min-h-[220px] md:col-span-2">
              <div className="flex justify-between items-start">
                <div className="p-3 bg-white/10 rounded-lg text-accent">
                  <Phone size={24} />
                </div>
                <span className="text-[10px] font-black uppercase tracking-[0.4em] text-white/20">
                  Hotline
                </span>
              </div>
              <div>
                <p className="text-[10px] font-black uppercase tracking-widest text-accent mb-2">
                  {t("main.phoneLabel")}
                </p>
                <a
                  href={`tel:${SITE_DATA.phoneNumber}`}
                  className="text-2xl sm:text-3xl md:text-5xl font-black italic tracking-tighter text-white hover:text-accent transition-colors break-all"
                >
                  {SITE_DATA.phoneNumber}
                </a>
              </div>
            </div>
          </div>

          {/* Right Side: Sidebar */}
          <div className="lg:col-span-5 bg-white p-0 flex flex-col gap-px border-l border-primary/5">
            <div className="p-8 md:p-10 border-b border-primary/5">
              <div className="flex items-center gap-3 mb-6">
                <MapPin className="text-accent" size={20} />
                <h3 className="text-xl font-black uppercase italic text-primary">
                  {t("location.title")}
                </h3>
              </div>
              <div className="rounded-xl overflow-hidden transition-all duration-700 border border-primary/10 mb-6 aspect-video">
                <GoogleMapsEmbed
                  apiKey={process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY!}
                  height={200}
                  width="100%"
                  mode="place"
                  q="The+Burger+House+and+Crunchy+Fried+Chicken+Damauli"
                />
              </div>
              <p className="text-[9px] font-bold uppercase tracking-widest text-primary/30 leading-relaxed">
                {t("location.name")} <br /> {t("location.address")}
              </p>
            </div>

            <div className="p-8 md:p-10 flex-1 bg-primary/[0.02]">
              <div className="flex items-center gap-3 mb-8">
                <Clock className="text-accent" size={20} />
                <h3 className="text-xl font-black uppercase italic text-primary">
                  {t("hours.title")}
                </h3>
              </div>
              <div className="space-y-6">
                {mealHours.map((item, i) => (
                  <div key={i} className="border-l-2 border-primary/10 pl-4">
                    <p className="text-[9px] font-black uppercase tracking-[0.2em] text-primary/30 mb-0.5">
                      {item.label}
                    </p>
                    <p className="text-xl font-black italic tracking-tighter text-primary">
                      {item.time}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
