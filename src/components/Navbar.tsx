"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Menu, X, Phone, ChevronRight } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useTranslations, useLocale } from "next-intl";
import LocaleSwitcher from "@/components/LocaleSwitcher";
import changeLocaleAction from "../app/utils/localeAction";
import SITE_DATA from "../constants/index";

type LinkItem = {
  name: string;
  href: string;
};

export default function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const pathname = usePathname();

  const t = useTranslations("Navbar");
  const navigations: [LinkItem] = t.raw("navigations");
  const locale = useLocale();
  const isNepali = locale === "np";

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 24);
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    setIsMenuOpen(false);
  }, [pathname]);

  useEffect(() => {
    document.body.style.overflow = isMenuOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [isMenuOpen]);

  return (
    <>
      <header
        className={`fixed top-0 z-50 w-full transition-all duration-500 ${
          isScrolled
            ? "navbar-glass py-0 shadow-sm border-b border-primary/10"
            : "bg-gradient-to-r from-slate-50 to-amber-50 py-2 border-b border-primary/8"
        }`}
      >
        <nav className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
          {/* ── Logo ─────────────────────────────────────────── */}
          <Link href="/" className="group flex flex-col shrink-0 select-none">
            <span
              className={`font-black leading-none transition-colors duration-300 ${
                isNepali
                  ? "text-xl tracking-normal normal-case"
                  : "text-xl md:text-2xl tracking-tighter uppercase"
              } ${isScrolled ? "text-primary" : "text-primary"}`}
            >
              {t("brandName")
                .split(" ")
                .map((word, i) => (
                  <span key={i} className={i === 1 ? "text-secondary" : ""}>
                    {word}{" "}
                  </span>
                ))}
            </span>

            <span
              className={`font-semibold leading-none uppercase transition-colors duration-300 mt-0.5 ${
                isNepali
                  ? "text-[10px] tracking-normal"
                  : "text-[10px] md:text-[11px] tracking-[0.22em]"
              } ${isScrolled ? "text-on-surface-variant" : "text-on-surface-variant"}`}
            >
              {t("tagline")}
            </span>
          </Link>

          {/* ── Desktop Nav Links ─────────────────────────────── */}
          <div className="hidden lg:flex flex-1 items-center justify-center gap-8">
            {navigations.map((item: LinkItem) => {
              const isActive = pathname === item.href;
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={`relative text-sm font-bold uppercase transition-all duration-200 group flex flex-col items-center ${
                    isActive
                      ? "text-secondary"
                      : isScrolled
                        ? "text-primary hover:text-secondary"
                        : "text-primary hover:text-secondary"
                  }`}
                >
                  <span
                    className={`text-center transition-all ${
                      isNepali
                        ? "text-base normal-case tracking-normal px-1"
                        : "tracking-widest"
                    }`}
                  >
                    {item.name}
                  </span>
                  <span
                    className={`absolute -bottom-1 left-0 h-0.5 rounded-full bg-secondary transition-all duration-300 ${
                      isActive ? "w-full" : "w-0 group-hover:w-full"
                    }`}
                  />
                </Link>
              );
            })}
          </div>

          {/* ── Desktop Right Controls ────────────────────────── */}
          <div className="hidden lg:flex items-center gap-2">
            <div
              className={`flex items-center gap-2 border-l pl-4 transition-colors duration-300 ${
                isScrolled ? "border-primary/15" : "border-primary/10"
              }`}
            >
              <a
                href={`tel:${SITE_DATA.phoneNumber}`}
                className={`group flex items-center gap-2 text-sm font-bold transition-colors duration-200 ${
                  isScrolled
                    ? "text-primary hover:text-secondary"
                    : "text-primary hover:text-secondary"
                }`}
              >
                <Phone size={15} className="text-secondary" />
                <span className="hidden xl:inline tabular-nums">
                  {SITE_DATA.phoneNumber}
                </span>
              </a>
            </div>
            <div className="ml-6 w-[70px] flex justify-end">
              <LocaleSwitcher
                changeLocaleAction={changeLocaleAction}
                isScrolled={isScrolled}
              />
            </div>
          </div>

          {/* ── Mobile Controls ───────────────────────────────── */}
          <div className="flex shrink-0 items-center gap-3 lg:hidden">
            <LocaleSwitcher
              changeLocaleAction={changeLocaleAction}
              isScrolled={isScrolled}
            />
            <button
              className={`flex h-9 w-9 items-center justify-center rounded-full transition-all duration-200 ${
                isScrolled
                  ? "bg-primary/8 text-primary hover:bg-primary/15"
                  : "bg-primary/10 text-primary hover:bg-primary/15"
              }`}
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              aria-label={isMenuOpen ? "Close menu" : "Open menu"}
              aria-expanded={isMenuOpen}
            >
              <AnimatePresence mode="wait" initial={false}>
                <motion.span
                  key={isMenuOpen ? "close" : "open"}
                  initial={{ rotate: -90, opacity: 0 }}
                  animate={{ rotate: 0, opacity: 1 }}
                  exit={{ rotate: 90, opacity: 0 }}
                  transition={{ duration: 0.15 }}
                >
                  {isMenuOpen ? <X size={22} /> : <Menu size={22} />}
                </motion.span>
              </AnimatePresence>
            </button>
          </div>
        </nav>

        {/* ── Mobile Menu Panel ─────────────────────────────── */}
        <AnimatePresence>
          {isMenuOpen && (
            <>
              <motion.div
                key="backdrop"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.2 }}
                className="fixed inset-0 z-[59] bg-black/40 lg:hidden"
                onClick={() => setIsMenuOpen(false)}
              />

              <motion.div
                key="panel"
                initial={{ x: "100%" }}
                animate={{ x: 0 }}
                exit={{ x: "100%" }}
                transition={{ type: "spring", damping: 28, stiffness: 220 }}
                className="fixed inset-y-0 right-0 z-[60] flex w-[min(320px,85vw)] flex-col
                         bg-primary text-white shadow-2xl lg:hidden overflow-y-auto"
              >
                {/* Panel header — uses t("mobileMenuHeading") and t("brandName") */}
                <div className="flex items-center justify-between px-6 py-5 border-b border-white/10">
                  <div>
                    <p className="text-xs font-semibold uppercase tracking-[0.2em] text-white/50">
                      {t("mobileMenuHeading")}
                    </p>
                    <p className="text-base font-black uppercase tracking-tight text-secondary leading-none mt-0.5">
                      {t("brandName")}
                    </p>
                  </div>
                  <button
                    onClick={() => setIsMenuOpen(false)}
                    className="flex h-9 w-9 items-center justify-center rounded-full bg-white/10 hover:bg-white/20 transition-colors"
                    aria-label="Close menu"
                  >
                    <X size={20} />
                  </button>
                </div>

                {/* Nav links */}
                <nav className="flex flex-col gap-1 px-4 py-6 flex-grow">
                  {navigations.map((item: LinkItem, i: number) => {
                    const isActive = pathname === item.href;
                    return (
                      <motion.div
                        key={item.href}
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 0.05 * i, duration: 0.2 }}
                      >
                        <Link
                          href={item.href}
                          onClick={() => setIsMenuOpen(false)}
                          className={`flex items-center justify-between rounded-xl px-4 py-3.5
                                    font-bold uppercase tracking-widest text-sm transition-all ${
                                      isActive
                                        ? "bg-secondary text-primary"
                                        : "text-white/85 hover:bg-white/8 hover:text-white"
                                    }`}
                        >
                          <span
                            className={
                              isNepali
                                ? "text-base normal-case tracking-normal"
                                : ""
                            }
                          >
                            {item.name}
                          </span>
                          <ChevronRight
                            size={16}
                            className={
                              isActive ? "text-primary" : "text-white/30"
                            }
                          />
                        </Link>
                      </motion.div>
                    );
                  })}
                </nav>

                {/* Footer CTA — uses t("callToOrder") and t("openingHours") */}
                <div className="px-6 py-6 border-t border-white/10">
                  <p className="text-[10px] uppercase tracking-widest text-white/40 mb-3 font-semibold">
                    {t("callToOrder")}
                  </p>
                  <a
                    href={`tel:${SITE_DATA.phoneNumber}`}
                    className="flex items-center gap-3 rounded-xl bg-secondary px-4 py-3
                             text-primary font-black text-sm hover:brightness-95 transition-all"
                    style={{ boxShadow: "0 0 16px rgba(255,215,0,0.35)" }}
                  >
                    <Phone size={18} />
                    {SITE_DATA.phoneNumber}
                  </a>
                  <p className="text-[10px] text-white/30 mt-3 text-center">
                    {t("openingHours")}
                  </p>
                </div>
              </motion.div>
            </>
          )}
        </AnimatePresence>
      </header>
    </>
  );
}
