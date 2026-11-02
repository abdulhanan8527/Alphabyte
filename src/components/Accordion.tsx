"use client";

import { useState } from "react";
import { Minus, Plus } from "lucide-react";

export type Faq = { q: string; a: string };

/** Single-open FAQ accordion with smooth grid-row expansion. */
export default function Accordion({ items }: { items: Faq[] }) {
  const [open, setOpen] = useState<number | null>(0);

  return (
    <div className="divide-y divide-white/10 border-y border-white/10">
      {items.map((item, i) => {
        const isOpen = open === i;
        return (
          <div key={item.q}>
            <button
              type="button"
              onClick={() => setOpen(isOpen ? null : i)}
              aria-expanded={isOpen}
              className="flex w-full items-center justify-between gap-6 py-5 text-left transition-colors duration-300 hover:text-white"
            >
              <span
                className={`text-base font-medium transition-colors duration-300 md:text-lg ${
                  isOpen ? "text-white" : "text-white/85"
                }`}
              >
                {item.q}
              </span>
              <span
                className={`flex size-8 shrink-0 items-center justify-center rounded-full border transition-all duration-300 ${
                  isOpen
                    ? "border-brand bg-brand text-white"
                    : "border-white/15 text-mist"
                }`}
              >
                {isOpen ? <Minus className="size-4" /> : <Plus className="size-4" />}
              </span>
            </button>
            <div
              className={`grid transition-all duration-400 ease-in-out ${
                isOpen ? "grid-rows-[1fr] pb-6" : "grid-rows-[0fr]"
              }`}
            >
              <div className="overflow-hidden">
                <p className="max-w-3xl pr-12 text-sm leading-relaxed text-mist md:text-base">
                  {item.a}
                </p>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}
