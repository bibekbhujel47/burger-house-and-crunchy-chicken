"use client";

import { useState, useMemo, useRef } from "react";
import { motion, AnimatePresence } from "motion/react";
import { useTranslations } from "next-intl";
import { Search, X, Sparkles } from "lucide-react";

const CATEGORY_COLORS: Record<string, { active: string; inactive: string }> = {
  "burger-house-special": {
    active: "bg-amber-500  border-amber-500  shadow-amber-200/60",
    inactive:
      "bg-amber-50  border-amber-300  text-amber-700  hover:bg-amber-100  hover:border-amber-500  hover:text-amber-900",
  },
  "crunchy-fried-chicken": {
    active: "bg-orange-500 border-orange-500 shadow-orange-200/60",
    inactive:
      "bg-orange-50 border-orange-300 text-orange-700 hover:bg-orange-100 hover:border-orange-500 hover:text-orange-900",
  },
  burgers: {
    active: "bg-yellow-700 border-yellow-700 shadow-yellow-300/60",
    inactive:
      "bg-yellow-50 border-yellow-400 text-yellow-800 hover:bg-yellow-100 hover:border-yellow-600 hover:text-yellow-900",
  },
  pizza: {
    active: "bg-red-500    border-red-500    shadow-red-200/60",
    inactive:
      "bg-red-50    border-red-300    text-red-700    hover:bg-red-100    hover:border-red-500    hover:text-red-900",
  },
  momos: {
    active: "bg-indigo-400 border-indigo-400 shadow-indigo-200/60",
    inactive:
      "bg-indigo-50 border-indigo-300 text-indigo-700 hover:bg-indigo-100 hover:border-indigo-500 hover:text-indigo-900",
  },
  "chowmein-rice": {
    active: "bg-yellow-500 border-yellow-500 shadow-yellow-200/60",
    inactive:
      "bg-yellow-50 border-yellow-300 text-yellow-700 hover:bg-yellow-100 hover:border-yellow-500 hover:text-yellow-900",
  },
  "spring-roll-wrap": {
    active: "bg-green-600  border-green-600  shadow-green-200/60",
    inactive:
      "bg-green-50  border-green-300  text-green-700  hover:bg-green-100  hover:border-green-500  hover:text-green-900",
  },
  "chopsuey-pasta": {
    active: "bg-rose-500   border-rose-500   shadow-rose-200/60",
    inactive:
      "bg-rose-50   border-rose-300   text-rose-700   hover:bg-rose-100   hover:border-rose-500   hover:text-rose-900",
  },
  "biryani-sizzler": {
    active: "bg-amber-700  border-amber-700  shadow-amber-300/60",
    inactive:
      "bg-amber-50  border-amber-400  text-amber-800  hover:bg-amber-100  hover:border-amber-600  hover:text-amber-900",
  },
  "main-course-curry": {
    active: "bg-orange-700 border-orange-700 shadow-orange-300/60",
    inactive:
      "bg-orange-50 border-orange-400 text-orange-800 hover:bg-orange-100 hover:border-orange-600 hover:text-orange-900",
  },
  "sekuwa-chhoila-fish": {
    active: "bg-red-700    border-red-700    shadow-red-300/60",
    inactive:
      "bg-red-50    border-red-400    text-red-800    hover:bg-red-100    hover:border-red-600    hover:text-red-900",
  },
  snacks: {
    active: "bg-yellow-400 border-yellow-400 shadow-yellow-200/60",
    inactive:
      "bg-yellow-50 border-yellow-300 text-yellow-600 hover:bg-yellow-100 hover:border-yellow-400 hover:text-yellow-800",
  },
  "boil-healthy": {
    active: "bg-green-500  border-green-500  shadow-green-200/60",
    inactive:
      "bg-green-50  border-green-300  text-green-600  hover:bg-green-100  hover:border-green-400  hover:text-green-800",
  },
  "soup-sandwich": {
    active: "bg-stone-500  border-stone-500  shadow-stone-200/60",
    inactive:
      "bg-stone-100 border-stone-300  text-stone-600  hover:bg-stone-200  hover:border-stone-500  hover:text-stone-800",
  },
  breakfast: {
    active: "bg-amber-400  border-amber-400  shadow-amber-200/60",
    inactive:
      "bg-amber-50  border-amber-300  text-amber-600  hover:bg-amber-100  hover:border-amber-400  hover:text-amber-800",
  },
  "hot-coffee": {
    active: "bg-stone-700  border-stone-700  shadow-stone-300/60",
    inactive:
      "bg-stone-100 border-stone-400  text-stone-700  hover:bg-stone-200  hover:border-stone-600  hover:text-stone-900",
  },
  "cold-drinks": {
    active: "bg-cyan-500   border-cyan-500   shadow-cyan-200/60",
    inactive:
      "bg-cyan-50   border-cyan-300   text-cyan-700   hover:bg-cyan-100   hover:border-cyan-500   hover:text-cyan-900",
  },
  hookah: {
    active: "bg-purple-500 border-purple-500 shadow-purple-200/60",
    inactive:
      "bg-purple-50 border-purple-300 text-purple-700 hover:bg-purple-100 hover:border-purple-500 hover:text-purple-900",
  },
};

const DEFAULT_CATEGORY_COLOR = {
  active: "bg-accent border-accent shadow-accent/25",
  inactive:
    "bg-accent/5 border-accent/30 text-accent hover:bg-accent/10 hover:border-accent/60",
};

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
            className="relative flex items-center rounded-xl border-2 border-accent/30
                          bg-accent/5 shadow-sm transition-all duration-300
                          focus-within:border-accent focus-within:bg-white focus-within:shadow-[0_0_0_3px_rgba(var(--accent-rgb),0.15)]"
          >
            <Search
              size={16}
              className="ml-4 shrink-0 text-accent/70 transition-colors duration-300 group-focus-within:text-accent"
            />
            <input
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search any dish…"
              className="w-full bg-transparent py-3.5 pl-3 pr-10 text-sm
                         text-primary placeholder-accent/50 outline-none"
            />
            {query && (
              <button
                onClick={() => setQuery("")}
                aria-label="Clear search"
                className="mr-3 flex h-6 w-6 shrink-0 items-center justify-center
                           rounded-full bg-accent/15 text-accent
                           transition-all hover:bg-accent hover:text-white"
              >
                <X size={12} />
              </button>
            )}
          </div>
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
                  const colors =
                    CATEGORY_COLORS[cat.id] ?? DEFAULT_CATEGORY_COLOR;
                  return (
                    <button
                      key={cat.id}
                      onClick={() => handleCategoryChange(cat.id)}
                      className={`flex items-center gap-2 rounded-lg px-4 py-2.5
                                  text-xs font-black uppercase tracking-wider
                                  border transition-all duration-200
                                  ${
                                    isActive
                                      ? `text-white scale-105 shadow-lg ${colors.active}`
                                      : colors.inactive
                                  }`}
                    >
                      <span className="text-sm leading-none">
                        {CATEGORY_ICONS[cat.id] ?? "🍽️"}
                      </span>
                      <span>{cat.title}</span>
                      <span
                        className={`ml-0.5 rounded-full px-1.5 py-0.5 text-[9px] font-black
                                     ${isActive ? "bg-white/20 text-white" : "bg-primary/8 text-primary/40"}`}
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
