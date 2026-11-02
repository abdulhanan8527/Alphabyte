"use client";

import { useEffect, useRef, useState, type ReactNode } from "react";
import { motion, AnimatePresence } from "framer-motion";

export type StackItem = {
  eyebrow: string;
  title: string;
  description: string;
  card: ReactNode;
};

/**
 * Two-column section: a sticky heading panel on the left whose text swaps as
 * each card on the right scrolls past; the cards pin and pile up.
 */
export default function StickyStack({ items }: { items: StackItem[] }) {
  const [active, setActive] = useState(0);
  const itemRefs = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            const idx = Number((entry.target as HTMLElement).dataset.index);
            setActive(idx);
          }
        }
      },
      { rootMargin: "-40% 0px -45% 0px", threshold: 0 },
    );
    for (const el of itemRefs.current) if (el) observer.observe(el);
    return () => observer.disconnect();
  }, [items.length]);

  return (
    <div className="grid gap-10 lg:grid-cols-[minmax(0,2fr)_minmax(0,3fr)] lg:gap-16">
      {/* Sticky heading panel */}
      <div className="hidden lg:block">
        <div className="sticky top-32">
          <p className="micro-label mb-4">{items[active].eyebrow}</p>
          <div className="relative min-h-28">
            <AnimatePresence mode="wait">
              <motion.h3
                key={items[active].title}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.25, ease: "easeOut" }}
                className="text-3xl font-semibold tracking-tight text-white"
              >
                {items[active].title}
              </motion.h3>
            </AnimatePresence>
          </div>
          <AnimatePresence mode="wait">
            <motion.p
              key={items[active].description}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.25, delay: 0.05 }}
              className="mt-4 max-w-md text-base leading-relaxed text-mist"
            >
              {items[active].description}
            </motion.p>
          </AnimatePresence>
          <div className="mt-8 flex gap-2">
            {items.map((item, i) => (
              <span
                key={item.title}
                className={`h-1.5 rounded-full transition-all duration-300 ${
                  i === active ? "w-8 bg-burgundy" : "w-3 bg-white/20"
                }`}
              />
            ))}
          </div>
        </div>
      </div>

      {/* Piling sticky cards */}
      <div className="flex flex-col gap-8">
        {items.map((item, i) => (
          <div
            key={item.title}
            data-index={i}
            ref={(el) => {
              itemRefs.current[i] = el;
            }}
            className="lg:sticky"
            style={{ top: `${7 + i * 1.5}rem`, zIndex: i + 1 }}
          >
            {/* Mobile: show heading above each card */}
            <div className="mb-4 lg:hidden">
              <p className="micro-label mb-2">{item.eyebrow}</p>
              <h3 className="text-2xl font-semibold tracking-tight text-white">
                {item.title}
              </h3>
            </div>
            {item.card}
          </div>
        ))}
      </div>
    </div>
  );
}
