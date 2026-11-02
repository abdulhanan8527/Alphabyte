import Link from "next/link";
import Image from "next/image";
import { ArrowRight, MessageCircle } from "lucide-react";
import { navLinks, site, whatsappLink } from "@/lib/site";
import { services } from "@/lib/services";
import ScrollTopButton from "./ScrollTopButton";

/** Evaluated once per build/deploy — keeps prerendering stable. */
const CURRENT_YEAR = new Date().getFullYear();

export default function Footer() {
  return (
    <footer className="relative overflow-hidden border-t border-white/8 bg-[#080909] text-white">
      {/* CTA band */}
      <div className="relative border-b border-white/8">
        <div
          className="glow-burgundy absolute -top-24 -left-24 h-80 w-80"
          aria-hidden
        />
        <div
          className="glow-brand absolute -right-20 -bottom-24 h-72 w-72"
          aria-hidden
        />
        <div className="relative mx-auto flex max-w-7xl flex-col gap-8 px-4 py-16 sm:px-6 lg:flex-row lg:items-center lg:justify-between lg:px-8 lg:py-20">
          <div>
            <h2 className="max-w-xl text-3xl font-semibold tracking-tight text-balance sm:text-4xl">
              Ready to build, automate and grow?
            </h2>
            <div className="accent-bar mt-5 w-24" aria-hidden />
            <p className="mt-5 max-w-lg text-sm leading-relaxed text-mist sm:text-base">
              {site.coreMessage}
            </p>
          </div>
          <div className="flex flex-col gap-3 sm:flex-row lg:flex-col xl:flex-row">
            <Link
              href="/contact"
              className="inline-flex items-center justify-center gap-2 rounded-full bg-white px-7 py-3.5 text-sm font-semibold text-charcoal transition-all duration-300 hover:-translate-y-0.5 hover:bg-white/90"
            >
              Start a Project
              <ArrowRight className="h-4 w-4" aria-hidden />
            </Link>
            <a
              href={whatsappLink()}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-2 rounded-full border border-white/25 px-7 py-3.5 text-sm font-semibold text-white transition-all duration-300 hover:-translate-y-0.5 hover:border-brand hover:text-brand"
            >
              <MessageCircle className="h-4 w-4" aria-hidden />
              {site.whatsappDisplay}
            </a>
          </div>
        </div>
      </div>

      {/* Columns */}
      <div className="mx-auto max-w-7xl px-4 py-14 sm:px-6 lg:px-8">
        <div className="grid gap-10 md:grid-cols-2 lg:grid-cols-4 lg:gap-8">
          {/* Brand */}
          <div>
            <Link
              href="/"
              className="flex items-center gap-2.5"
              aria-label="Alphabyte — home"
            >
              <span className="relative block h-9 w-14">
                <Image
                  src="/images/logo-light.png"
                  alt="Alphabyte logo"
                  fill
                  sizes="56px"
                  className="object-contain object-left"
                />
              </span>
              <span className="text-lg font-bold tracking-tight">
                ALPHA<span className="text-brand">BYTE</span>
              </span>
            </Link>
            <p className="mt-4 text-sm font-semibold text-brand">
              {site.tagline}
            </p>
            <p className="mt-2 max-w-xs text-sm leading-relaxed text-white/55">
              Digital solutions that help businesses innovate, automate and
              scale.
            </p>
          </div>

          {/* Company */}
          <nav aria-label="Footer — company">
            <h3 className="micro-label">Company</h3>
            <ul className="mt-4 space-y-2.5">
              {navLinks
                .filter((l) =>
                  [
                    "/about",
                    "/services",
                    "/portfolio",
                    "/industries",
                    "/process",
                    "/insights",
                  ].includes(l.href),
                )
                .map((link) => (
                  <li key={link.href}>
                    <Link
                      href={link.href}
                      className="text-sm text-white/65 transition-colors hover:text-brand"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
            </ul>
          </nav>

          {/* Services */}
          <nav aria-label="Footer — services">
            <h3 className="micro-label">Services</h3>
            <ul className="mt-4 space-y-2.5">
              {services.map((s) => (
                <li key={s.slug}>
                  <Link
                    href={`/services#${s.slug}`}
                    className="text-sm text-white/65 transition-colors hover:text-brand"
                  >
                    {s.title}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          {/* Contact */}
          <div>
            <h3 className="micro-label">Get in touch</h3>
            <ul className="mt-4 space-y-2.5">
              <li>
                <a
                  href={whatsappLink()}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 text-sm text-white/65 transition-colors hover:text-brand"
                >
                  <MessageCircle className="h-4 w-4" aria-hidden />
                  WhatsApp: {site.whatsappDisplay}
                </a>
              </li>
              {site.email && (
                <li>
                  <a
                    href={`mailto:${site.email}`}
                    className="text-sm text-white/65 transition-colors hover:text-brand"
                  >
                    {site.email}
                  </a>
                </li>
              )}
              <li className="text-sm text-white/50">{site.location}</li>
            </ul>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="mt-12 flex flex-col gap-4 border-t border-white/8 pt-6 sm:flex-row sm:items-center sm:justify-between">
          <p className="text-xs text-white/45">
            © {CURRENT_YEAR} {site.name}. All rights reserved.
          </p>
          <div className="flex items-center gap-5">
            <ul className="flex items-center gap-5">
              <li>
                <Link
                  href="/privacy-policy"
                  className="text-xs text-white/45 hover:text-white"
                >
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link
                  href="/terms"
                  className="text-xs text-white/45 hover:text-white"
                >
                  Terms of Service
                </Link>
              </li>
              {site.socials.map((s) => (
                <li key={s.label}>
                  <a
                    href={s.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-xs text-white/45 hover:text-white"
                  >
                    {s.label}
                  </a>
                </li>
              ))}
            </ul>
            <ScrollTopButton />
          </div>
        </div>
      </div>
    </footer>
  );
}
