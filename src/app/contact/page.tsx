"use client";

import { motion } from "motion/react";
import { lazy, Suspense } from "react";
import {
  MessageCircle,
  Phone,
  MapPin,
  Clock,
  Volume2,
  Users,
  ArrowUpRight,
  Truck,
} from "lucide-react";
import { useTranslations } from "next-intl";
import { FaWhatsapp } from "react-icons/fa6";
import SITE_DATA from "@/constants";
import buildWhatsAppURL from "../utils/whatsApp";

const GoogleMapsEmbed = lazy(() =>
  import("@next/third-parties/google").then((mod) => ({
    default: mod.GoogleMapsEmbed,
  })),
);

const CARD_META = [
  {
    icon: MessageCircle,
    accent: "#22c55e",
    bg: "bg-green-50",
    border: "border-green-100",
    text: "text-green-600",
  },
  {
    icon: Users,
    accent: "#3b82f6",
    bg: "bg-blue-50",
    border: "border-blue-100",
    text: "text-blue-600",
  },
  {
    icon: Volume2,
    accent: "#f59e0b",
    bg: "bg-amber-50",
    border: "border-amber-100",
    text: "text-amber-600",
  },
];

export default function ContactPage() {
  const t = useTranslations("ContactPage");
  const whatsappMessages = t.raw("whatsappMessages") as any[];
  const mealHours = t.raw("hours.items") as any[];

  return (
    <main className="min-h-screen bg-bg-offwhite">
      {/* ── Hero ────────────────────────────────────────── */}
      <section className="section-dark relative overflow-hidden px-6 pb-24 pt-36 md:px-8">
        <div
          className="pointer-events-none absolute -top-40 left-1/3 h-80 w-80
                        rounded-full bg-secondary/10 blur-[100px]"
        />
        <div
          className="pointer-events-none absolute bottom-0 right-1/4 h-60 w-60
                        rounded-full bg-primary/40 blur-[80px]"
        />

        <div className="relative z-10 mx-auto max-w-7xl">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <span
              className="mb-5 inline-block text-[11px] font-black
                             uppercase tracking-[0.4em] text-secondary"
            >
              {t("hero.badge")}
            </span>
            <h1
              className="text-5xl font-black uppercase italic leading-none
                           tracking-tighter text-white md:text-7xl lg:text-8xl"
            >
              {t("hero.title")}
            </h1>
            <p className="mt-6 max-w-lg text-base leading-relaxed text-white/45">
              {t("hero.description")}
            </p>
          </motion.div>

          {/* Info pills */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.25 }}
            className="mt-10 flex flex-wrap gap-3"
          >
            {[
              { icon: Phone, label: SITE_DATA.phoneNumber },
              { icon: MapPin, label: "Byas, Damauli" },
              { icon: Clock, label: "9 AM – 9 PM" },
              { icon: Truck, label: "Free Delivery" },
            ].map(({ icon: Icon, label }) => (
              <span
                key={label}
                className="flex items-center gap-2 rounded-full border border-white/10
                           bg-white/5 px-4 py-2 text-xs font-bold
                           text-white/55 backdrop-blur-sm"
              >
                <Icon size={12} className="text-secondary" />
                {label}
              </span>
            ))}
          </motion.div>
        </div>
      </section>

      {/* ── Content ─────────────────────────────────────── */}
      <section className="mx-auto max-w-7xl px-4 py-16 md:px-8">
        <div className="grid grid-cols-1 gap-8 lg:grid-cols-12">
          {/* ══ Left column ═════════════════════════════ */}
          <div className="space-y-6 lg:col-span-7">
            {/* WhatsApp cards — stacked, full-width, no cramping */}
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
              {whatsappMessages.map((msg: any, idx: number) => {
                const meta = CARD_META[idx % CARD_META.length];
                const Icon = meta.icon;
                return (
                  <motion.a
                    key={idx}
                    href={buildWhatsAppURL()}
                    target="_blank"
                    rel="noopener noreferrer"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: idx * 0.1, duration: 0.45 }}
                    className="group flex flex-col gap-5 rounded-2xl border
                               border-border bg-white p-7 shadow-card
                               transition-all duration-300 hover:-translate-y-1
                               hover:shadow-card-hover"
                  >
                    {/* Top row: icon + number */}
                    <div className="flex items-start justify-between">
                      <div
                        className={`flex h-11 w-11 items-center justify-center
                                      rounded-xl ${meta.bg} ${meta.text}
                                      transition-transform duration-300
                                      group-hover:scale-110`}
                      >
                        <Icon size={19} />
                      </div>
                      <span className="text-3xl font-black italic text-primary/8">
                        0{idx + 1}
                      </span>
                    </div>

                    {/* Label + message */}
                    <div className="flex flex-col gap-2">
                      <div className="flex items-center gap-1">
                        <h3 className="text-sm font-black uppercase tracking-tight text-primary">
                          {msg.label}
                        </h3>
                        <ArrowUpRight
                          size={13}
                          className={`shrink-0 opacity-0 transition-opacity
                                     group-hover:opacity-100 ${meta.text}`}
                        />
                      </div>
                      {/* Full message text — no truncation */}
                      <p className="text-sm leading-relaxed text-on-surface-variant">
                        {msg.text}
                      </p>
                    </div>

                    {/* Bottom: colored tap hint */}
                    <div
                      className={`mt-auto flex items-center gap-2 text-[10px]
                                    font-black uppercase tracking-widest ${meta.text}
                                    opacity-0 transition-opacity group-hover:opacity-100`}
                    >
                      <FaWhatsapp size={12} />
                      Tap to open WhatsApp
                    </div>
                  </motion.a>
                );
              })}
            </div>

            {/* Hotline block */}
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4, duration: 0.5 }}
              className="relative overflow-hidden rounded-2xl bg-primary px-8 py-10"
              style={{ boxShadow: "0 8px 40px rgba(87,0,0,0.3)" }}
            >
              {/* Decorative glow */}
              <div
                className="pointer-events-none absolute -right-10 -top-10 h-40
                              w-40 rounded-full bg-secondary/15 blur-[50px]"
              />

              <div
                className="relative z-10 flex flex-col gap-8 md:flex-row
                              md:items-center md:justify-between"
              >
                {/* Phone number */}
                <div className="flex flex-col gap-3">
                  <div
                    className="flex h-11 w-11 items-center justify-center
                                  rounded-xl bg-white/10 text-secondary"
                  >
                    <Phone size={20} />
                  </div>
                  <div>
                    <p
                      className="mb-1 text-[10px] font-black uppercase
                                  tracking-[0.3em] text-secondary/60"
                    >
                      {t("main.phoneLabel")}
                    </p>
                    <a
                      href={`tel:${SITE_DATA.phoneNumber}`}
                      className="text-3xl font-black italic tracking-tighter
                                 text-white transition-colors hover:text-secondary
                                 md:text-4xl"
                    >
                      {SITE_DATA.phoneNumber}
                    </a>
                  </div>
                </div>

                {/* WhatsApp button */}
                <a
                  href={buildWhatsAppURL()}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex w-full items-center justify-center gap-3
                             rounded-xl bg-secondary py-4 text-sm font-black
                             uppercase tracking-widest text-primary
                             transition-all hover:brightness-95 md:w-auto md:px-8"
                  style={{ boxShadow: "0 0 24px rgba(232,168,0,0.35)" }}
                >
                  <FaWhatsapp size={20} />
                  WhatsApp Us
                </a>
              </div>
            </motion.div>

            {/* Free delivery strip */}
            <motion.div
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5, duration: 0.45 }}
              className="flex items-center gap-4 rounded-2xl border
                         border-secondary/25 bg-secondary/8 px-6 py-5"
            >
              <div
                className="flex h-10 w-10 shrink-0 items-center justify-center
                              rounded-full bg-secondary/20 text-secondary"
              >
                <Truck size={18} />
              </div>
              <div>
                <p className="text-sm font-black uppercase tracking-wide text-primary">
                  Free Home & Office Delivery
                </p>
                <p className="mt-0.5 text-xs text-on-surface-variant">
                  Available across Damauli — call or WhatsApp to order
                </p>
              </div>
            </motion.div>
          </div>

          {/* ══ Right column ════════════════════════════ */}
          <motion.div
            initial={{ opacity: 0, x: 24 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2, duration: 0.6 }}
            className="flex flex-col gap-6 lg:col-span-5"
          >
            {/* Map card */}
            <div
              className="overflow-hidden rounded-2xl border border-border
                            bg-white shadow-card"
            >
              {/* Card header */}
              <div className="flex items-center gap-3 border-b border-border px-6 py-5">
                <div
                  className="flex h-9 w-9 shrink-0 items-center justify-center
                                rounded-lg bg-secondary/10 text-secondary"
                >
                  <MapPin size={16} />
                </div>
                <div className="min-w-0">
                  <p
                    className="truncate text-sm font-black uppercase
                                italic tracking-tight text-primary"
                  >
                    {t("location.title")}
                  </p>
                  <p
                    className="truncate text-[10px] font-bold uppercase
                                tracking-widest text-on-surface-variant"
                  >
                    {t("location.address")}
                  </p>
                </div>
              </div>

              {/* Map embed — taller for better usability */}
              <div className="h-[260px] w-full">
                <Suspense
                  fallback={
                    <div className="h-full bg-gray-100 animate-pulse flex items-center justify-center">
                      <span className="text-gray-400">Loading map...</span>
                    </div>
                  }
                >
                  <GoogleMapsEmbed
                    apiKey={process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY!}
                    height="260"
                    width="100%"
                    mode="place"
                    q="The+Burger+House+and+Crunchy+Fried+Chicken+Damauli"
                  />
                </Suspense>
              </div>

              <div className="bg-bg-offwhite px-6 py-3">
                <p
                  className="text-[10px] font-bold uppercase tracking-widest
                              text-on-surface-variant"
                >
                  {t("location.name")}
                </p>
              </div>
            </div>

            {/* Hours card */}
            <div
              className="overflow-hidden rounded-2xl border border-border
                            bg-white shadow-card"
            >
              <div className="flex items-center gap-3 border-b border-border px-6 py-5">
                <div
                  className="flex h-9 w-9 shrink-0 items-center justify-center
                                rounded-lg bg-secondary/10 text-secondary"
                >
                  <Clock size={16} />
                </div>
                <p className="text-sm font-black uppercase italic tracking-tight text-primary">
                  {t("hours.title")}
                </p>
              </div>

              <div className="divide-y divide-border">
                {mealHours.map((item: any, i: number) => (
                  <div
                    key={i}
                    className="flex items-center justify-between
                               px-6 py-4 transition-colors hover:bg-bg-offwhite"
                  >
                    <div className="flex items-center gap-3">
                      <span
                        className={`h-2 w-2 rounded-full ${
                          i === 0
                            ? "bg-green-500 shadow-[0_0_6px_rgba(34,197,94,0.6)] animate-pulse"
                            : "bg-border"
                        }`}
                      />
                      <p
                        className="text-xs font-bold uppercase
                                   tracking-widest text-on-surface-variant"
                      >
                        {item.label}
                      </p>
                    </div>
                    <p
                      className="text-base font-black italic
                                 tracking-tight text-primary"
                    >
                      {item.time}
                    </p>
                  </div>
                ))}
              </div>

              {/* Open today footer */}
              <div
                className="flex items-center justify-center gap-2
                              border-t border-border bg-green-50 py-3.5"
              >
                <span className="h-2 w-2 animate-pulse rounded-full bg-green-500" />
                <p
                  className="text-[11px] font-black uppercase
                              tracking-widest text-green-600"
                >
                  Open Today
                </p>
              </div>
            </div>
          </motion.div>
        </div>
      </section>
    </main>
  );
}
