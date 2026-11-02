import Link from "next/link";
import type { ReactNode } from "react";

type Variant = "primary" | "secondary" | "secondaryDark" | "burgundy" | "pill";

const styles: Record<Variant, string> = {
  // Solid green CTA with glow, lifts slightly on hover
  primary:
    "bg-brand text-white shadow-glow hover:bg-brand-dark hover:-translate-y-0.5",
  // Outline on dark surfaces
  secondary:
    "border border-white/25 text-white hover:-translate-y-0.5 hover:border-white/60 hover:bg-white/5",
  secondaryDark:
    "border border-white/25 text-white hover:-translate-y-0.5 hover:border-white/60 hover:bg-white/5",
  burgundy:
    "bg-burgundy text-white shadow-[0_4px_18px_rgb(163_13_80/0.35)] hover:bg-burgundy-dark hover:-translate-y-0.5",
  // White pill with dark text + arrow, for footer/CTA bands
  pill:
    "rounded-full bg-white text-charcoal hover:-translate-y-0.5 hover:bg-white/90",
};

export default function ButtonLink({
  href,
  children,
  variant = "primary",
  external = false,
  className = "",
}: {
  href: string;
  children: ReactNode;
  variant?: Variant;
  external?: boolean;
  className?: string;
}) {
  const base = `inline-flex items-center justify-center gap-2 rounded-lg px-6 py-3 text-sm font-semibold transition-all duration-300 ${styles[variant]} ${className}`;
  if (external) {
    return (
      <a
        href={href}
        target="_blank"
        rel="noopener noreferrer"
        className={base}
      >
        {children}
      </a>
    );
  }
  return (
    <Link href={href} className={base}>
      {children}
    </Link>
  );
}
