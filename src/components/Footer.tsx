"use client";

import Link from "next/link";
import { Phone, MapPin, Clock, ArrowUpRight, Heart } from "lucide-react";
import { FaFacebook, FaInstagram, FaWhatsapp } from "react-icons/fa6";
import { useTranslations } from "next-intl";
import SITE_DATA from "@/constants";
import buildWhatsAppURL from "@/app/utils/whatsApp";

export default function Footer() {
  const t = useTranslations();

  const navigations = t.raw("Navbar.navigations") as Array<{
    name: string;
    href: string;
  }>;

  const phone = t("footer.phoneNumber");

  // Updated Facebook link with your specific Damauli page URL
  const socialLinks = [
    {
      icon: FaFacebook,
      href: SITE_DATA.facebookPageLink,
      label: "Facebook",
    },
    {
      icon: FaInstagram,
      href: SITE_DATA.instagramPageLink,
      label: "Instagram",
    },
    {
      icon: FaWhatsapp,
      href: buildWhatsAppURL(),
      label: "WhatsApp",
    },
  ];

  return (
    <footer className="border-t border-white/5 bg-[#0A0A0A] font-sans text-white">
      <div className="mx-auto max-w-7xl px-6 py-20">
        <div className="grid grid-cols-1 gap-16 md:grid-cols-2 lg:grid-cols-4">
          {/* ── Brand Identity ───────────────────────────── */}
          <div className="flex flex-col gap-6">
            <Link href="/" className="group flex w-fit flex-col">
              <span className="text-2xl font-black uppercase leading-none tracking-tighter transition-colors group-hover:text-accent">
                {t("Navbar.brandName")}
              </span>
              <span className="mt-2 text-[10px] font-bold uppercase leading-none tracking-[0.25em] text-accent">
                {t("Navbar.tagline")}
              </span>
            </Link>

            <p className="max-w-xs text-sm leading-relaxed text-white/50">
              {t("footer.description")}
            </p>

            <div className="flex items-center gap-3">
              {socialLinks.map(({ icon: Icon, href, label }) => (
                <a
                  key={label}
                  href={href}
                  target="_blank" // Opens in a new tab
                  rel="noopener noreferrer" // Security best practice
                  aria-label={label}
                  className="flex h-10 w-10 items-center justify-center rounded-full
                             bg-white/5 transition-all duration-300
                             hover:bg-accent hover:text-black"
                >
                  <Icon size={18} />
                </a>
              ))}
            </div>
          </div>

          {/* ── Quick Nav ────────────────────────────────── */}
          <div className="flex flex-col gap-8">
            <h3 className="text-xs font-bold uppercase tracking-[0.3em] text-accent/80">
              {t("footer.quick-links")}
            </h3>
            <ul className="flex flex-col gap-4">
              {navigations.map((link) => (
                <li key={link.name}>
                  <Link
                    href={link.href}
                    className="group flex items-center gap-2 text-sm text-white/60 transition-colors hover:text-white"
                  >
                    <span className="h-[1px] w-0 bg-accent transition-all duration-300 group-hover:w-4" />
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* ── Contact Details ──────────────────────────── */}
          <div className="flex flex-col gap-8">
            <h3 className="text-xs font-bold uppercase tracking-[0.3em] text-accent/80">
              {t("footer.contact-us")}
            </h3>
            <div className="space-y-6">
              <div className="flex items-start gap-4">
                <MapPin size={18} className="mt-0.5 shrink-0 text-accent" />
                <span className="text-sm leading-relaxed text-white/60">
                  {t("HomePage.Contact.address")}
                </span>
              </div>
              <div className="flex items-center gap-4">
                <Phone size={18} className="shrink-0 text-accent" />
                <span className="text-sm text-white/60">{phone}</span>
              </div>
              <div className="flex items-start gap-4">
                <Clock size={18} className="mt-0.5 shrink-0 text-accent" />
                <div className="flex flex-col">
                  <span className="text-sm text-white/60">
                    {t("footer.hours")}
                  </span>
                  <span className="mt-1 text-[10px] uppercase tracking-wider text-accent/40">
                    {t("footer.deliveryNote")}
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* ── WhatsApp CTA Card ──────────────────────── */}
          <div className="relative overflow-hidden rounded-2xl border border-white/10 bg-white/5 p-6 flex flex-col gap-4 group">
            <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-accent/15 text-accent transition-colors group-hover:bg-accent/25">
              <FaWhatsapp size={24} />
            </div>

            <h4 className="text-lg font-bold">
              {t("footer.whatsAppCTA.title")}
            </h4>

            <p className="text-xs leading-relaxed text-white/50">
              {t("footer.whatsAppCTA.description")}
            </p>

            <Link
              href={buildWhatsAppURL()}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-auto flex w-full items-center justify-center gap-2
                         rounded-xl bg-accent py-3 text-[10px] font-black
                         uppercase tracking-widest text-black
                         transition-all hover:bg-white active:scale-95"
            >
              {t("footer.whatsAppCTA.button")}
              <ArrowUpRight size={14} />
            </Link>
          </div>
        </div>
      </div>

      {/* ── Bottom Bar ─────────────────────────────────── */}
      <div className="border-t border-white/5 bg-black/20 px-6 py-8">
        <div
          className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-6
                        text-[10px] font-bold uppercase tracking-[0.2em] text-white/30
                        md:flex-row"
        >
          <p>
            © {new Date().getFullYear()} {t("Navbar.brandName")}.{" "}
            {t("footer.rights")}
          </p>
          <div className="flex items-center gap-2">
            <span>{t("footer.madeWith")}</span>
            <Heart size={10} className="fill-accent text-accent" />
            <span>{t("footer.forDamauli")}</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
