"use client";

import { useState, useEffect, useCallback } from "react";
import { useTranslations } from "next-intl";
import Image from "next/image";
import { motion, AnimatePresence } from "motion/react";
import { X, ChevronLeft, ChevronRight, Maximize2 } from "lucide-react";

const IMAGES = [
  {
    id: 0,
    src: "/birthday.webp",
    key: "birthday",
    tall: true,
  },
  {
    id: 1,
    src: "/mural.webp",
    key: "mural",
    tall: false,
  },
  {
    id: 2,
    src: "/locationImg.webp",
    key: "location",
    tall: false,
  },
  {
    id: 3,
    src: "/internal.webp",
    key: "internal",
    tall: true,
  },
  {
    id: 4,
    src: "/barista.webp",
    key: "barista",
    tall: false,
  },
  {
    id: 5,
    src: "/friedChicken.webp",
    key: "shake",
    tall: false,
  },
  {
    id: 6,
    src: "/nightEnjoy.webp",
    key: "enjoy",
    tall: false,
  },
  {
    id: 7,
    src: "/cocacola.webp",
    key: "coca",
    tall: true,
  },
  {
    id: 8,
    src: "/people.webp",
    key: "people",
    tall: false,
  },
  {
    id: 9,
    src: "/chickenfries.webp",
    key: "fries",
    tall: true,
  },
  {
    id: 10,
    src: "/food1.webp",
    key: "food1",
    tall: false,
  },
  {
    id: 11,
    src: "/food2.webp",
    key: "food2",
    tall: false,
  },
  {
    id: 12,
    src: "/crewMember1.webp",
    key: "member1",
    tall: false,
  },
  {
    id: 14,
    src: "/keemaNoodles.webp",
    key: "keema",
    tall: true,
  },
];

export default function GalleryPage() {
  const t = useTranslations("GalleryPage");
  const [selectedIndex, setSelectedIndex] = useState<number | null>(null);

  // Navigation Logic
  const nextImage = useCallback(() => {
    setSelectedIndex((prev) =>
      prev !== null && prev < IMAGES.length - 1 ? prev + 1 : 0,
    );
  }, []);

  const prevImage = useCallback(() => {
    setSelectedIndex((prev) =>
      prev !== null && prev > 0 ? prev - 1 : IMAGES.length - 1,
    );
  }, []);

  const closeLightbox = () => setSelectedIndex(null);

  // Keyboard support
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (selectedIndex === null) return;
      if (e.key === "Escape") closeLightbox();
      if (e.key === "ArrowRight") nextImage();
      if (e.key === "ArrowLeft") prevImage();
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [selectedIndex, nextImage, prevImage]);

  return (
    <main className="min-h-screen bg-bg-offwhite py-20 px-6">
      <div className="max-w-7xl mx-auto">
        {/* Animated Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-16"
        >
          <span className="text-accent font-semibold tracking-widest uppercase text-sm mb-2 block">
            {t("subtitle")}
          </span>
          <h1 className="text-5xl md:text-7xl font-display text-primary mb-6">
            {t("title")}
          </h1>
          <div className="h-1 w-24 bg-accent mx-auto mb-6 rounded-full" />
          <p className="text-on-surface-variant max-w-2xl mx-auto text-lg">
            {t("description")}
          </p>
        </motion.div>

        {/* Masonry-style Grid */}
        <div className="columns-1 sm:columns-2 lg:columns-3 gap-6 space-y-6">
          {IMAGES.map((img) => (
            <motion.div
              key={img.id}
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              whileHover={{ y: -5 }}
              onClick={() => setSelectedIndex(img.id)}
              className="relative group cursor-zoom-in overflow-hidden rounded-2xl border-4 border-white shadow-xl"
            >
              <Image
                src={img.src}
                alt={t(`items.${img.key}`)}
                width={800}
                height={img.tall ? 1200 : 800}
                className="object-cover w-full transition-transform duration-700 group-hover:scale-110"
              />

              {/* Refined Overlay */}
              <div className="absolute inset-0 bg-primary/40 opacity-0 group-hover:opacity-100 transition-all duration-300 backdrop-blur-[2px] flex flex-col justify-end p-8">
                <Maximize2 className="text-accent mb-2 w-6 h-6" />
                <h3 className="text-white font-display text-xl">
                  {t(`items.${img.key}`)}
                </h3>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Professional Lightbox */}
        <AnimatePresence>
          {selectedIndex !== null && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 z-50 flex items-center justify-center bg-bg-dark/95 backdrop-blur-xl p-4 md:p-10"
            >
              {/* Close Button */}
              <button
                onClick={closeLightbox}
                className="absolute top-6 right-6 text-white/50 hover:text-accent transition-colors p-2 z-[60]"
              >
                <X size={40} />
              </button>

              {/* Navigation Controls */}
              <div className="absolute inset-x-0 top-1/2 -translate-y-1/2 flex justify-between px-4 md:px-10 z-[60]">
                <button
                  onClick={prevImage}
                  className="bg-white/10 hover:bg-accent hover:text-bg-dark text-white p-4 rounded-full backdrop-blur-md transition-all"
                >
                  <ChevronLeft size={32} />
                </button>
                <button
                  onClick={nextImage}
                  className="bg-white/10 hover:bg-accent hover:text-bg-dark text-white p-4 rounded-full backdrop-blur-md transition-all"
                >
                  <ChevronRight size={32} />
                </button>
              </div>

              {/* Active Image */}
              <motion.div
                key={selectedIndex}
                initial={{ opacity: 0, scale: 0.9, x: 50 }}
                animate={{ opacity: 1, scale: 1, x: 0 }}
                exit={{ opacity: 0, scale: 0.9, x: -50 }}
                transition={{ type: "spring", damping: 25, stiffness: 200 }}
                className="relative w-full h-full flex flex-col items-center justify-center"
              >
                <div className="relative w-full max-w-5xl h-[70vh]">
                  <Image
                    src={IMAGES[selectedIndex].src}
                    alt="Active view"
                    fill
                    className="object-contain"
                    priority
                  />
                </div>
                <motion.p
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="text-accent font-display text-2xl mt-8 text-center"
                >
                  {t(`items.${IMAGES[selectedIndex].key}`)}
                </motion.p>
                <p className="text-white/40 mt-2">
                  {selectedIndex + 1} / {IMAGES.length}
                </p>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </main>
  );
}
