"use client";

import { useState, useMemo, useRef } from "react";
import { motion, AnimatePresence } from "motion/react";
import { useTranslations } from "next-intl";
import { Search, X, Sparkles } from "lucide-react";

const CATEGORY_ICONS: Record<string, string> = {
  "burger-house-special": "⭐",
  "crunchy-fried-chicken": "🍗",
  burgers: "🍔",
  pizza: "🍕",
  momos: "🥟",
  "chowmein-rice": "🍜",
  "spring-roll-wrap": "🌯",
  "chopsuey-pasta": "🍝",
  "biryani-sizzler": "🍛",
  "main-course-curry": "🍲",
  "sekuwa-chhoila-fish": "🔥",
  snacks: "🍟",
  "boil-healthy": "🥦",
  "soup-sandwich": "🥣",
  breakfast: "🍳",
  "hot-coffee": "☕",
  "cold-drinks": "🧋",
  hookah: "💨",
};

type Item = {
  name: string;
  price: string;
  isSpecial: boolean;
};

type Category = {
  id: string;
  title: string;
  items: Item[];
};

export default function FullMenuSection() {
  const t = useTranslations("MenuPage");
  const categories = useMemo<Category[]>(() => t.raw("categories"), [t]);

  const [activeCategoryId, setActiveCategoryId] = useState<string>(
    categories[0]?.id ?? "",
  );
  const [query, setQuery] = useState("");
  const resultsRef = useRef<HTMLDivElement>(null);

  const activeCategory = useMemo(
    () => categories.find((c) => c.id === activeCategoryId),
    [categories, activeCategoryId],
  );

  const isSearching = query.trim().length > 0;
  const searchResults = useMemo(() => {
    if (!isSearching) return [];
    const q = query.toLowerCase();
    return categories.flatMap((cat) =>
      cat.items
        .filter((item) => item.name.toLowerCase().includes(q))
        .map((item) => ({ ...item, categoryTitle: cat.title })),
    );
  }, [query, categories, isSearching]);

  const displayedItems = isSearching
    ? searchResults
    : (activeCategory?.items ?? []);

  const handleCategoryChange = (id: string) => {
    setActiveCategoryId(id);
    if (window.innerWidth < 768) {
      setTimeout(() => {
        resultsRef.current?.scrollIntoView({
          behavior: "smooth",
          block: "start",
        });
      }, 100);
    }
  };

  return (
    <section className="min-h-screen bg-bg-offwhite px-4 py-20 md:px-8">
      <div className="mx-auto max-w-7xl">
        {/* ── Header ──────────────────────────────────────── */}
        <header className="mb-12">
          <span className="text-[10px] font-black uppercase tracking-[0.35em] text-accent">
            {t("badge")}
          </span>
          <h2 className="mt-2 text-4xl font-black uppercase italic leading-none tracking-tighter text-primary md:text-7xl">
            {t("titlePart1")} {t("titlePart2")}
          </h2>

          {/* Stats row */}
          <div className="mt-6 flex flex-wrap gap-6">
            {[
              { value: `${categories.length}`, label: "Categories" },
              {
                value: `${categories.reduce((n, c) => n + c.items.length, 0)}+`,
                label: "Items",
              },
              { value: "Free", label: "Home Delivery" },
            ].map(({ value, label }) => (
              <div key={label} className="flex items-baseline gap-1.5">
                <span className="text-2xl font-black text-accent">{value}</span>
                <span className="text-[10px] font-bold uppercase tracking-widest text-primary/30">
                  {label}
                </span>
              </div>
            ))}
          </div>
        </header>

        {/* ── Search bar ──────────────────────────────────── */}
        <div className="relative mb-8 w-full md:w-96">
          <div
            className="relative flex items-center rounded-xl border border-primary/10
                          bg-white transition-all duration-300
                          focus-within:border-accent/50 focus-within:shadow-[0_0_0_3px_rgba(var(--accent-rgb),0.12)]"
          >
            <Search
              size={15}
              className="ml-4 shrink-0 text-primary/30 transition-colors duration-300"
            />
            <input
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search any dish…"
              className="w-full bg-transparent py-3.5 pl-3 pr-10 text-sm
                         text-primary placeholder-primary/25 outline-none"
            />
            {query && (
              <button
                onClick={() => setQuery("")}
                className="mr-3 flex h-5 w-5 shrink-0 items-center justify-center
                           rounded-full bg-primary/8 text-primary/40
                           transition-all hover:bg-accent hover:text-white"
              >
                <X size={11} />
              </button>
            )}
          </div>
          <div
            className="absolute -bottom-px left-0 h-[2px] w-0 rounded-full
                          bg-accent transition-all duration-500
                          focus-within:w-full"
          />
        </div>

        {/* ── Category tabs (hidden while searching) ──────── */}
        <AnimatePresence>
          {!isSearching && (
            <motion.nav
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              className="mb-10 overflow-hidden border-b border-primary/10 pb-6"
            >
              <div className="flex flex-wrap gap-2">
                {categories.map((cat) => {
                  const isActive = activeCategoryId === cat.id;
                  return (
                    <button
                      key={cat.id}
                      onClick={() => handleCategoryChange(cat.id)}
                      className={`flex items-center gap-1.5 rounded-lg px-3.5 py-2
                                  text-[10px] font-black uppercase tracking-widest
                                  border transition-all duration-200
                                  ${
                                    isActive
                                      ? "bg-accent border-accent text-white shadow-lg shadow-accent/25 scale-105"
                                      : "bg-white border-primary/10 text-primary/40 hover:border-accent/40 hover:text-accent hover:bg-accent/5"
                                  }`}
                    >
                      <span>{CATEGORY_ICONS[cat.id] ?? "🍽️"}</span>
                      <span>{cat.title}</span>
                      <span
                        className={`ml-0.5 rounded-full px-1.5 py-0.5 text-[8px] font-black
                                     ${isActive ? "bg-white/20 text-white" : "bg-primary/5 text-primary/25"}`}
                      >
                        {cat.items.length}
                      </span>
                    </button>
                  );
                })}
              </div>
            </motion.nav>
          )}
        </AnimatePresence>

        {/* ── Search results label ─────────────────────────── */}
        {isSearching && (
          <p className="mb-6 text-xs font-bold uppercase tracking-widest text-primary/30">
            {searchResults.length === 0
              ? `No results for "${query}"`
              : `${searchResults.length} result${searchResults.length !== 1 ? "s" : ""} for "${query}"`}
          </p>
        )}

        {/* ── Active category label + scroll anchor ────────── */}
        <div ref={resultsRef} className="scroll-mt-6">
          {!isSearching && activeCategory && (
            <div className="mb-6 flex items-center gap-3">
              <span className="text-3xl">
                {CATEGORY_ICONS[activeCategory.id] ?? "🍽️"}
              </span>
              <div>
                <h3 className="text-xl font-black uppercase text-primary">
                  {activeCategory.title}
                </h3>
                <p className="text-[10px] font-bold uppercase tracking-widest text-primary/30">
                  {activeCategory.items.length} items available
                </p>
              </div>
            </div>
          )}

          {/* ── Menu items grid ──────────────────────────────── */}
          <div className="grid grid-cols-1 gap-x-16 lg:grid-cols-2">
            <AnimatePresence mode="wait">
              <motion.div
                key={isSearching ? `search-${query}` : activeCategoryId}
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -8 }}
                transition={{ duration: 0.2 }}
                className="contents"
              >
                {(displayedItems as any[]).map((item, idx) => (
                  <motion.div
                    key={idx}
                    initial={{ opacity: 0, y: 6 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{
                      delay: Math.min(idx * 0.06, 0.5),
                      duration: 0.2,
                    }}
                    className="group flex items-center justify-between border-b
                               border-primary/8 py-4 transition-all
                               hover:border-accent/30"
                  >
                    {/* Left — name + badges */}
                    <div className="flex flex-wrap items-center gap-2 pr-4">
                      <h3
                        className="text-sm font-bold uppercase text-primary
                                     transition-colors group-hover:text-accent
                                     md:text-base"
                      >
                        {item.name}
                      </h3>

                      {item.isSpecial && (
                        <span
                          className="flex items-center gap-0.5 rounded bg-accent
                                         px-1.5 py-0.5 text-[7px] font-black
                                         italic text-white"
                        >
                          <Sparkles size={7} />
                          {t("specialLabel")}
                        </span>
                      )}

                      {isSearching && (item as any).categoryTitle && (
                        <span
                          className="rounded border border-primary/10 bg-primary/5
                                         px-2 py-0.5 text-[8px] font-bold
                                         uppercase tracking-widest text-primary/30"
                        >
                          {(item as any).categoryTitle}
                        </span>
                      )}
                    </div>

                    {/* Right — price */}
                    <div className="flex shrink-0 items-baseline gap-1">
                      <span className="text-[9px] font-bold uppercase text-primary/30">
                        {t("currency")}
                      </span>
                      <span
                        className="font-display text-lg font-black italic
                                       tracking-tight text-primary md:text-xl"
                      >
                        {item.price}
                      </span>
                    </div>
                  </motion.div>
                ))}

                {/* Empty state */}
                {displayedItems.length === 0 && (
                  <div className="col-span-2 py-20 text-center">
                    <p className="text-4xl mb-4">🔍</p>
                    <p className="text-primary/25 text-sm font-bold uppercase tracking-widest">
                      Nothing found
                    </p>
                  </div>
                )}
              </motion.div>
            </AnimatePresence>
          </div>
        </div>

        {/* ── Footer note ──────────────────────────────────── */}
        <footer className="mt-16 border-t border-primary/8 pt-8">
          <p className="text-center text-[9px] font-bold uppercase tracking-[0.5em] text-primary/20">
            {t("footerNote")}
          </p>
        </footer>
      </div>
    </section>
  );
}
