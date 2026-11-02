"use client";

import { useEffect, useRef, useState } from "react";
import { CalendarCheck2, ExternalLink } from "lucide-react";
import { site } from "@/lib/site";

/**
 * Calendly booking widget.
 *
 * Loads Calendly's official embed script once, then:
 *  - renders an inline scheduler (CalendlyInline), and
 *  - exposes a popup trigger (CalendlyBookingButton).
 *
 * Resilience: the script's `onload` firing does NOT guarantee that the
 * `window.Calendly` global is attached (ad-blockers, privacy extensions and
 * network issues can prevent it). We therefore poll for the real global and,
 * if it never appears, fall back to a plain link that opens the Calendly page
 * in a new tab — so users always have a working way to book.
 *
 * If no Calendly URL is configured (env not set), nothing is rendered.
 */

declare global {
  interface Window {
    Calendly?: {
      initInlineWidget: (opts: {
        url: string;
        parentElement: HTMLElement;
        prefill?: Record<string, string>;
      }) => void;
      initPopupWidget: (opts: {
        url: string;
        prefill?: Record<string, string>;
      }) => void;
    };
  }
}

const SCRIPT_SRC = "https://assets.calendly.com/assets/external/widget.js";
const STYLE_SRC = "https://assets.calendly.com/assets/external/widget.css";

let scriptPromise: Promise<void> | null = null;

/** Inject Calendly's stylesheet + script once. Resolves when the script loads. */
function loadCalendlyScript(): Promise<void> {
  if (typeof window === "undefined") return Promise.resolve();
  if (window.Calendly) return Promise.resolve();
  if (scriptPromise) return scriptPromise;

  scriptPromise = new Promise<void>((resolve, reject) => {
    if (!document.querySelector(`link[href="${STYLE_SRC}"]`)) {
      const link = document.createElement("link");
      link.rel = "stylesheet";
      link.href = STYLE_SRC;
      document.head.appendChild(link);
    }
    const existing = document.querySelector(
      `script[src="${SCRIPT_SRC}"]`,
    ) as HTMLScriptElement | null;
    if (existing) {
      if (window.Calendly) return resolve();
      existing.addEventListener("load", () => resolve());
      existing.addEventListener("error", () =>
        reject(new Error("calendly-script-error")),
      );
      return;
    }
    const script = document.createElement("script");
    script.src = SCRIPT_SRC;
    script.async = true;
    script.onload = () => resolve();
    script.onerror = () => reject(new Error("calendly-script-error"));
    document.head.appendChild(script);
  });
  return scriptPromise;
}

/**
 * Resolve to `true` only once the real `window.Calendly` global is available.
 * Polls briefly after the script loads, then gives up so callers can fall back.
 */
function waitForCalendly(timeoutMs = 4000): Promise<boolean> {
  if (typeof window === "undefined") return Promise.resolve(false);
  if (window.Calendly) return Promise.resolve(true);

  return loadCalendlyScript()
    .then(
      () =>
        new Promise<boolean>((resolve) => {
          if (window.Calendly) return resolve(true);
          const startedAt = Date.now();
          const id = window.setInterval(() => {
            if (window.Calendly) {
              window.clearInterval(id);
              resolve(true);
            } else if (Date.now() - startedAt > timeoutMs) {
              window.clearInterval(id);
              resolve(false);
            }
          }, 100);
        }),
    )
    .catch(() => false);
}

const BTN_FALLBACK =
  "inline-flex items-center justify-center gap-2 rounded-full bg-white px-6 py-3 text-sm font-semibold text-charcoal transition-all duration-300 hover:-translate-y-0.5 hover:shadow-glow";

type Availability = "loading" | "widget" | "link";

/** A popup trigger that degrades to a direct Calendly link if the widget is unavailable. */
export function CalendlyBookingButton({
  label = "Book a discovery call",
  className,
}: {
  label?: string;
  className?: string;
}) {
  const [availability, setAvailability] = useState<Availability>("loading");

  useEffect(() => {
    if (!site.calendly) return;
    let active = true;
    waitForCalendly().then((ok) => {
      if (active) setAvailability(ok ? "widget" : "link");
    });
    return () => {
      active = false;
    };
  }, []);

  if (!site.calendly || availability === "loading") return null;

  const cls = className || BTN_FALLBACK;

  if (availability === "widget") {
    return (
      <button
        type="button"
        onClick={() => window.Calendly?.initPopupWidget({ url: site.calendly })}
        className={cls}
      >
        <CalendarCheck2 className="h-4 w-4" aria-hidden />
        {label}
      </button>
    );
  }

  return (
    <a
      href={site.calendly}
      target="_blank"
      rel="noopener noreferrer"
      className={cls}
    >
      <CalendarCheck2 className="h-4 w-4" aria-hidden />
      {label}
    </a>
  );
}

/** Inline Calendly scheduler with a branded link fallback if the widget can't load. */
export default function CalendlyInline({
  prefillName,
  prefillEmail,
}: {
  prefillName?: string;
  prefillEmail?: string;
}) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [availability, setAvailability] = useState<Availability>("loading");

  useEffect(() => {
    if (!site.calendly) return;
    let active = true;

    waitForCalendly().then((ok) => {
      if (!active) return;
      const el = containerRef.current;
      if (ok && window.Calendly && el) {
        const prefill: Record<string, string> = {};
        if (prefillName) prefill.name = prefillName;
        if (prefillEmail) prefill.email = prefillEmail;
        el.innerHTML = "";
        window.Calendly.initInlineWidget({
          url: site.calendly,
          parentElement: el,
          prefill,
        });
        setAvailability("widget");
      } else {
        setAvailability("link");
      }
    });

    return () => {
      active = false;
    };
  }, [prefillName, prefillEmail]);

  // Don't render anything until a Calendly URL is configured.
  if (!site.calendly) return null;

  if (availability === "link") {
    return (
      <div className="glass flex flex-col items-center gap-4 rounded-2xl p-8 text-center sm:p-12">
        <span className="flex h-14 w-14 items-center justify-center rounded-2xl border border-brand/30 bg-brand/10 text-brand">
          <CalendarCheck2 className="h-7 w-7" aria-hidden />
        </span>
        <div>
          <h3 className="text-lg font-semibold text-white">
            Schedule your free discovery call
          </h3>
          <p className="mx-auto mt-2 max-w-md text-sm leading-relaxed text-mist">
            Our live calendar couldn&apos;t load in your browser (an extension may
            be blocking it). Open the scheduling page directly to pick a time.
          </p>
        </div>
        <a
          href={site.calendly}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center justify-center gap-2 rounded-full bg-brand px-6 py-3 text-sm font-semibold text-white shadow-glow transition-all duration-300 hover:-translate-y-0.5 hover:bg-brand-dark"
        >
          Open the scheduler
          <ExternalLink className="h-4 w-4" aria-hidden />
        </a>
      </div>
    );
  }

  return (
    <div className="relative">
      <div
        ref={containerRef}
        className="calendly-inline-widget min-h-[680px] w-full overflow-hidden rounded-2xl border border-white/10 bg-white"
      />
      {availability === "loading" && (
        <div className="absolute inset-0 flex items-center justify-center rounded-2xl bg-night-soft">
          <span className="text-sm text-fog">Loading scheduler…</span>
        </div>
      )}
    </div>
  );
}
