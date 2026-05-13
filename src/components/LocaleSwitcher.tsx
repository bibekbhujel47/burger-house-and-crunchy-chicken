"use client";

import { useState } from "react";
import { Locale, useLocale } from "next-intl";
import { ChevronDown, Globe } from "lucide-react";

type LocaleSwitcherProps = {
  changeLocaleAction: (locale: Locale) => Promise<void>;
  isScrolled?: boolean; // controls light vs dark styling
};

const locales = [
  { code: "en", label: "EN" },
  { code: "np", label: "NP" },
];

export default function LocaleSwitcher({
  changeLocaleAction,
  isScrolled = false,
}: LocaleSwitcherProps) {
  const locale = useLocale();
  const [isOpen, setIsOpen] = useState(false);
  const [selected, setSelected] = useState(locales[locale === "en" ? 0 : 1]);

  const handleSelect = async (item: (typeof locales)[0]) => {
    setSelected(item);
    setIsOpen(false);
    await changeLocaleAction(item.code as Locale);
  };

  // Trigger button adapts to navbar background
  const triggerClass = isScrolled
    ? "border-primary/20 text-primary hover:border-primary hover:text-primary"
    : "border-white/40 text-white hover:border-secondary hover:text-secondary";

  return (
    <div className="relative">
      {/* ── Trigger Button ───────────────────────────── */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        aria-haspopup="listbox"
        aria-expanded={isOpen}
        className={`flex items-center gap-1.5 rounded-full border px-3 py-1.5
                    text-xs font-bold uppercase tracking-widest
                    transition-all duration-200 active:scale-95
                    ${triggerClass}`}
      >
        <Globe size={13} />
        {selected.label}
        <ChevronDown
          size={13}
          className={`transition-transform duration-200 ${isOpen ? "rotate-180" : ""}`}
        />
      </button>

      {/* ── Dropdown ─────────────────────────────────── */}
      {isOpen && (
        <>
          {/* Backdrop */}
          <div
            className="fixed inset-0 z-10"
            onClick={() => setIsOpen(false)}
          />

          {/* Menu */}
          <ul
            role="listbox"
            className="absolute right-0 top-full z-20 mt-2 w-28 overflow-hidden
                       rounded-xl border border-border bg-white shadow-card"
          >
            {locales.map((item) => {
              const isActive = selected.code === item.code;
              return (
                <li key={item.code} role="option" aria-selected={isActive}>
                  <button
                    onClick={() => handleSelect(item)}
                    className={`flex w-full items-center gap-2.5 px-4 py-3
                                text-xs font-bold uppercase tracking-widest
                                transition-colors duration-150
                                ${
                                  isActive
                                    ? "bg-primary text-secondary"
                                    : "text-on-surface-variant hover:bg-bg-offwhite"
                                }`}
                  >
                    {isActive && (
                      <span className="h-1.5 w-1.5 shrink-0 rounded-full bg-secondary" />
                    )}
                    {item.label}
                  </button>
                </li>
              );
            })}
          </ul>
        </>
      )}
    </div>
  );
}
