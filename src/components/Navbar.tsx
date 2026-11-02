"use client";

import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Menu, X, ArrowUpRight } from "lucide-react";
import { navLinks } from "@/lib/site";

/**
 * Fixed navbar: near-transparent over the hero, solidifying with a shadow and
 * slightly shrinking after 50px of scroll. Desktop links get a left-origin
 * underline on hover; mobile opens a right-side dark drawer.
 */
export default function Navbar() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 50);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // The drawer closes via each link's onClick (navigation trigger).

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  const isActive = (href: string) =>
    href === "/" ? pathname === "/" : pathname.startsWith(href);

  return (
    <>
      <header
        className={`fixed inset-x-0 top-0 z-50 transition-all duration-300 ${
          scrolled
            ? "bg-night/95 shadow-[0_4px_20px_rgb(0_0_0/0.35)] backdrop-blur-md"
            : "bg-night/15 backdrop-blur-[2px]"
        }`}
      >
        <nav
          aria-label="Main navigation"
          className={`mx-auto flex max-w-7xl items-center justify-between gap-4 px-4 transition-all duration-300 sm:px-6 lg:px-8 ${
            scrolled ? "h-16" : "h-20"
          }`}
        >
          <Link
            href="/"
            className="flex shrink-0 items-center gap-2.5"
            aria-label="Alphabyte — home"
          >
            <span className="relative block h-8 w-12 sm:h-9 sm:w-14">
              <Image
                src="/images/logo-light.png"
                alt="Alphabyte logo"
                fill
                priority
                sizes="56px"
                className="object-contain object-left"
              />
            </span>
            <span className="hidden text-lg font-bold tracking-tight text-white sm:block">
              ALPHA<span className="text-brand">BYTE</span>
            </span>
          </Link>

          {/* Desktop links */}
          <ul className="hidden items-center gap-6 lg:flex">
            {navLinks.map((link) => (
              <li key={link.href}>
                <Link
                  href={link.href}
                  className={`nav-link py-1 text-[13px] font-medium transition-colors duration-300 ${
                    isActive(link.href)
                      ? "text-white"
                      : "text-mist hover:text-white"
                  }`}
                  aria-current={isActive(link.href) ? "page" : undefined}
                >
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>

          <div className="hidden lg:block">
            <Link
              href="/contact"
              className="inline-flex items-center gap-1.5 rounded-full bg-brand px-5 py-2.5 text-[13px] font-semibold text-white shadow-glow transition-all duration-300 hover:-translate-y-0.5 hover:bg-brand-dark"
            >
              Start a Project
              <ArrowUpRight className="h-4 w-4" aria-hidden />
            </Link>
          </div>

          {/* Mobile toggle */}
          <button
            type="button"
            onClick={() => setOpen(true)}
            className="inline-flex h-10 w-10 items-center justify-center rounded-lg border border-white/15 text-white lg:hidden"
            aria-expanded={open}
            aria-label="Open menu"
          >
            <Menu className="h-5 w-5" />
          </button>
        </nav>
      </header>

      {/* Mobile drawer */}
      <AnimatePresence>
        {open && (
          <>
            <motion.div
              key="overlay"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
              onClick={() => setOpen(false)}
              className="fixed inset-0 z-[60] bg-black/60 lg:hidden"
              aria-hidden="true"
            />
            <motion.aside
              key="drawer"
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ duration: 0.4, ease: [0.2, 0.8, 0.2, 1] }}
              className="fixed top-0 right-0 z-[70] flex h-dvh w-[86%] max-w-sm flex-col bg-night shadow-2xl lg:hidden"
              role="dialog"
              aria-modal="true"
              aria-label="Menu"
            >
              <div className="flex h-16 items-center justify-between border-b border-white/10 px-5">
                <span className="text-base font-bold tracking-tight text-white">
                  ALPHA<span className="text-brand">BYTE</span>
                </span>
                <button
                  type="button"
                  onClick={() => setOpen(false)}
                  className="inline-flex h-10 w-10 items-center justify-center rounded-lg border border-white/15 text-white"
                  aria-label="Close menu"
                >
                  <X className="h-5 w-5" />
                </button>
              </div>
              <ul className="flex-1 divide-y divide-white/8 overflow-y-auto px-5">
                {navLinks.map((link) => (
                  <li key={link.href}>
                    <Link
                      href={link.href}
                      onClick={() => setOpen(false)}
                      className={`block py-4 text-sm font-medium transition-colors ${
                        isActive(link.href)
                          ? "text-brand"
                          : "text-white/85 hover:text-white"
                      }`}
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
              <div className="border-t border-white/10 p-5">
                <Link
                  href="/contact"
                  onClick={() => setOpen(false)}
                  className="flex items-center justify-center gap-2 rounded-full bg-brand px-5 py-3 text-sm font-semibold text-white shadow-glow"
                >
                  Start a Project
                  <ArrowUpRight className="h-4 w-4" aria-hidden />
                </Link>
              </div>
            </motion.aside>
          </>
        )}
      </AnimatePresence>
    </>
  );
}
