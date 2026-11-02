"use client";

import { ArrowUp } from "lucide-react";
import { useEffect, useState } from "react";

/** Circular scroll-to-top button that appears after scrolling down. */
export default function ScrollTopButton() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const onScroll = () => setVisible(window.scrollY > 600);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <button
      type="button"
      onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
      aria-label="Scroll to top"
      className={`inline-flex size-11 shrink-0 items-center justify-center rounded-full border border-white/15 bg-white/5 text-white backdrop-blur transition-all duration-300 hover:-translate-y-0.5 hover:border-brand hover:bg-brand ${
        visible ? "opacity-100" : "pointer-events-none opacity-0"
      }`}
    >
      <ArrowUp className="size-4" aria-hidden />
    </button>
  );
}
