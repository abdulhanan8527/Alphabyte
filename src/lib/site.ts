/**
 * Central site configuration for Alphabyte.
 * NOTE: Replace placeholder contact details with confirmed business details
 * before publishing (the brief requires email publication only after confirmation).
 */
export const site = {
  name: "Alphabyte",
  tagline: "Build. Automate. Grow.",
  coreMessage:
    "Alphabyte helps businesses build, automate and grow through technology.",
  description:
    "Alphabyte is a software development and digital solutions company. We build websites, mobile apps, ERP and CRM systems and 3D & AR experiences that help businesses innovate, automate and scale.",
  url: process.env.NEXT_PUBLIC_SITE_URL || "https://alphabyte.example.com",
  /** WhatsApp number in international format without "+" — placeholder until confirmed. */
  whatsapp: process.env.NEXT_PUBLIC_WHATSAPP || "923000000000",
  whatsappDisplay: "+92 300 000 0000",
  /** Business email — intentionally empty until confirmed by the company. */
  email: process.env.NEXT_PUBLIC_BUSINESS_EMAIL || "",
  /** Calendly scheduling URL — empty until configured in env. */
  calendly: process.env.NEXT_PUBLIC_CALENDLY_URL || "",
  location: "Pakistan",
  socials: [
    { label: "LinkedIn", href: "https://www.linkedin.com/company/alphabyte" },
    { label: "Facebook", href: "https://facebook.com/alphabyte" },
    { label: "Instagram", href: "https://instagram.com/alphabyte" },
  ],
} as const;

export function whatsappLink(message?: string) {
  const text =
    message || "Hello Alphabyte! I'd like to discuss a project with you.";
  return `https://wa.me/${site.whatsapp}?text=${encodeURIComponent(text)}`;
}

/** True once a real Calendly URL has been configured via env. */
export const hasCalendly = Boolean(site.calendly);

/**
 * Build a Calendly link prefilled with the visitor's name and email so the
 * scheduling page already knows who is booking.
 */
export function calendlyLink(prefill?: { name?: string; email?: string }) {
  if (!site.calendly) return "";
  const params = new URLSearchParams();
  if (prefill?.name) params.set("name", prefill.name);
  if (prefill?.email) params.set("email", prefill.email);
  const query = params.toString();
  return query ? `${site.calendly}?${query}` : site.calendly;
}

export const navLinks = [
  { href: "/", label: "Home" },
  { href: "/about", label: "About Us" },
  { href: "/services", label: "Services" },
  { href: "/portfolio", label: "Portfolio" },
  { href: "/industries", label: "Industries" },
  { href: "/process", label: "Our Process" },
  { href: "/insights", label: "Insights" },
  { href: "/contact", label: "Contact Us" },
] as const;
