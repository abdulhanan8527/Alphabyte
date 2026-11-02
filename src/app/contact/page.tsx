"use client";

import { useState, type FormEvent } from "react";
import { CheckCircle2, Loader2, MessageCircle, Send } from "lucide-react";
import PageHero from "@/components/PageHero";
import Reveal from "@/components/Reveal";
import CalendlyInline, { CalendlyBookingButton } from "@/components/Calendly";
import { services } from "@/lib/services";
import { hasCalendly, site, whatsappLink } from "@/lib/site";

interface FormState {
  name: string;
  email: string;
  phone: string;
  company: string;
  service: string;
  message: string;
  website: string; // honeypot, hidden from humans
}

const initialForm: FormState = {
  name: "",
  email: "",
  phone: "",
  company: "",
  service: "",
  message: "",
  website: "",
};

const inputClass =
  "w-full rounded-lg border border-white/12 bg-white/5 px-4 py-3 text-sm text-white placeholder:text-fog transition-colors focus:border-brand focus:outline-none focus:ring-2 focus:ring-brand/25";

export default function ContactPage() {
  const [form, setForm] = useState<FormState>(initialForm);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [status, setStatus] = useState<"idle" | "sending" | "success" | "error">("idle");
  const [serverError, setServerError] = useState("");
  const [lastEmail, setLastEmail] = useState("");
  const [emailSent, setEmailSent] = useState(false);

  const set = (field: keyof FormState) => (value: string) => {
    setForm((f) => ({ ...f, [field]: value }));
    setErrors((e) => {
      if (!e[field]) return e;
      const next = { ...e };
      delete next[field];
      return next;
    });
  };

  async function onSubmit(e: FormEvent) {
    e.preventDefault();
    setStatus("sending");
    setServerError("");
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      const data = await res.json();
      if (res.ok && data.ok) {
        setLastEmail(form.email);
        setEmailSent(Boolean(data.schedulingEmailSent));
        setStatus("success");
        setForm(initialForm);
      } else if (data.errors) {
        setErrors(data.errors);
        setStatus("idle");
      } else {
        setServerError(data.error || "Something went wrong. Please try again.");
        setStatus("error");
      }
    } catch {
      setServerError("Network error. Please try again or reach us on WhatsApp.");
      setStatus("error");
    }
  }

  return (
    <>
      <PageHero
        eyebrow="Contact us"
        title="Tell us about your project"
        description="Share a few details and we'll come back with honest, practical next steps. Prefer chatting? WhatsApp us directly."
      />

      <section className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8 lg:py-24">
        <div className="grid gap-10 lg:grid-cols-12 lg:gap-14">
          {/* Form */}
          <Reveal className="lg:col-span-7">
            {status === "success" ? (
              <div className="flex flex-col items-start gap-4 rounded-2xl border border-brand/35 bg-brand/10 p-8 sm:p-10">
                <CheckCircle2 className="h-10 w-10 text-brand" aria-hidden />
                <h2 className="text-2xl font-semibold text-white">
                  Thank you — your enquiry is with us.
                </h2>
                <p className="text-sm leading-relaxed text-mist sm:text-base">
                  {emailSent && lastEmail ? (
                    <>
                      We&apos;ve emailed a <strong className="text-white">Calendly scheduling link</strong> to{" "}
                      <strong className="text-white">{lastEmail}</strong>. Pick any open slot and
                      you&apos;ll get an instant calendar confirmation for your free discovery call.
                    </>
                  ) : (
                    <>
                      We review every enquiry personally and will respond as soon as
                      possible. You can also book a discovery call directly below.
                    </>
                  )}
                </p>
                <div className="mt-1 flex flex-wrap items-center gap-3">
                  <CalendlyBookingButton
                    label="Book your call now"
                    className="inline-flex items-center justify-center gap-2 rounded-full bg-brand px-6 py-3 text-sm font-semibold text-white shadow-glow transition-all duration-300 hover:-translate-y-0.5 hover:bg-brand-dark"
                  />
                  <a
                    href={whatsappLink()}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center justify-center gap-2 rounded-full border border-white/25 px-6 py-3 text-sm font-semibold text-white transition-colors hover:border-white/50"
                  >
                    <MessageCircle className="h-4 w-4" aria-hidden />
                    WhatsApp us
                  </a>
                </div>
                <p className="text-xs text-fog">
                  Didn&apos;t get the email? Check your spam folder, or use the
                  buttons above — we&apos;ll still reach out personally.
                </p>
                <button
                  type="button"
                  onClick={() => setStatus("idle")}
                  className="text-sm font-semibold text-brand hover:text-brand-dark"
                >
                  Send another enquiry
                </button>
              </div>
            ) : (
              <form onSubmit={onSubmit} noValidate className="glass-strong rounded-2xl p-6 sm:p-8">
                <div className="grid gap-5 sm:grid-cols-2">
                  <div>
                    <label htmlFor="name" className="mb-1.5 block text-sm font-semibold text-white">
                      Full name <span className="text-burgundy-light">*</span>
                    </label>
                    <input
                      id="name"
                      type="text"
                      autoComplete="name"
                      required
                      value={form.name}
                      onChange={(e) => set("name")(e.target.value)}
                      className={inputClass}
                      placeholder="Your name"
                    />
                    {errors.name && <p className="mt-1.5 text-xs font-medium text-burgundy-light">{errors.name}</p>}
                  </div>
                  <div>
                    <label htmlFor="email" className="mb-1.5 block text-sm font-semibold text-white">
                      Business email <span className="text-burgundy-light">*</span>
                    </label>
                    <input
                      id="email"
                      type="email"
                      autoComplete="email"
                      required
                      value={form.email}
                      onChange={(e) => set("email")(e.target.value)}
                      className={inputClass}
                      placeholder="you@company.com"
                    />
                    {errors.email && <p className="mt-1.5 text-xs font-medium text-burgundy-light">{errors.email}</p>}
                  </div>
                  <div>
                    <label htmlFor="phone" className="mb-1.5 block text-sm font-semibold text-white">
                      Phone <span className="text-burgundy-light">*</span>
                    </label>
                    <input
                      id="phone"
                      type="tel"
                      autoComplete="tel"
                      required
                      value={form.phone}
                      onChange={(e) => set("phone")(e.target.value)}
                      className={inputClass}
                      placeholder="+92 3xx xxxxxxx"
                    />
                    {errors.phone && <p className="mt-1.5 text-xs font-medium text-burgundy-light">{errors.phone}</p>}
                  </div>
                  <div>
                    <label htmlFor="company" className="mb-1.5 block text-sm font-semibold text-white">
                      Company name <span className="text-fog">(optional)</span>
                    </label>
                    <input
                      id="company"
                      type="text"
                      autoComplete="organization"
                      value={form.company}
                      onChange={(e) => set("company")(e.target.value)}
                      className={inputClass}
                      placeholder="Your company"
                    />
                  </div>
                  <div className="sm:col-span-2">
                    <label htmlFor="service" className="mb-1.5 block text-sm font-semibold text-white">
                      Service required <span className="text-burgundy-light">*</span>
                    </label>
                    <select
                      id="service"
                      required
                      value={form.service}
                      onChange={(e) => set("service")(e.target.value)}
                      className={inputClass}
                    >
                      <option value="">Select a service…</option>
                      {services.map((s) => (
                        <option key={s.slug} value={s.title}>
                          {s.title}
                        </option>
                      ))}
                      <option value="Other">Something else / not sure yet</option>
                    </select>
                    {errors.service && <p className="mt-1.5 text-xs font-medium text-burgundy-light">{errors.service}</p>}
                  </div>
                  <div className="sm:col-span-2">
                    <label htmlFor="message" className="mb-1.5 block text-sm font-semibold text-white">
                      Project description <span className="text-burgundy-light">*</span>
                    </label>
                    <textarea
                      id="message"
                      rows={6}
                      required
                      value={form.message}
                      onChange={(e) => set("message")(e.target.value)}
                      className={inputClass}
                      placeholder="What problem are you solving? What should the finished project do?"
                    />
                    {errors.message && <p className="mt-1.5 text-xs font-medium text-burgundy-light">{errors.message}</p>}
                  </div>
                </div>

                {/* Honeypot — hidden from humans, traps bots */}
                <div className="hidden" aria-hidden="true">
                  <label htmlFor="website">Website</label>
                  <input
                    id="website"
                    type="text"
                    tabIndex={-1}
                    autoComplete="off"
                    value={form.website}
                    onChange={(e) => set("website")(e.target.value)}
                  />
                </div>

                {serverError && (
                  <p role="alert" className="mt-4 rounded-lg border border-burgundy/40 bg-burgundy/15 px-4 py-3 text-sm font-medium text-burgundy-light">
                    {serverError}
                  </p>
                )}

                <button
                  type="submit"
                  disabled={status === "sending"}
                  className="mt-6 inline-flex w-full items-center justify-center gap-2 rounded-full bg-brand px-6 py-3.5 text-sm font-semibold text-white shadow-glow transition-all duration-300 hover:-translate-y-0.5 hover:bg-brand-dark disabled:cursor-not-allowed disabled:opacity-60 sm:w-auto"
                >
                  {status === "sending" ? (
                    <>
                      <Loader2 className="h-4 w-4 animate-spin" aria-hidden />
                      Sending…
                    </>
                  ) : (
                    <>
                      <Send className="h-4 w-4" aria-hidden />
                      Send enquiry
                    </>
                  )}
                </button>
                <p className="mt-3 text-xs text-fog">
                  By submitting this form you agree to our{" "}
                  <a href="/privacy-policy" className="font-semibold text-brand hover:underline">
                    Privacy Policy
                  </a>
                  . We never share your details.
                </p>
              </form>
            )}
          </Reveal>

          {/* Sidebar */}
          <Reveal delay={0.1} className="lg:col-span-5">
            <div className="space-y-5">
              <a
                href={whatsappLink()}
                target="_blank"
                rel="noopener noreferrer"
                className="glass flex items-start gap-4 rounded-2xl p-6 transition-all duration-300 hover:-translate-y-0.5 hover:border-brand/40 hover:shadow-lift"
              >
                <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-[#25D366]/15 text-[#25D366]">
                  <MessageCircle className="h-6 w-6" aria-hidden />
                </span>
                <span>
                  <span className="block text-base font-semibold text-white">WhatsApp us</span>
                  <span className="mt-1 block text-sm text-mist">
                    {site.whatsappDisplay} — fastest way to reach the team.
                  </span>
                </span>
              </a>

              <div className="glass rounded-2xl p-6">
                <h2 className="text-base font-semibold text-white">What happens next?</h2>
                <ol className="mt-4 space-y-3">
                  {[
                    "We read your enquiry and understand the problem.",
                    "We reply with questions or a proposed first step.",
                    "If it fits, we schedule a free discovery call.",
                  ].map((step, i) => (
                    <li key={step} className="flex items-start gap-3 text-sm leading-relaxed text-mist">
                      <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-brand text-xs font-bold text-white">
                        {i + 1}
                      </span>
                      {step}
                    </li>
                  ))}
                </ol>
              </div>

              <div className="relative overflow-hidden rounded-2xl border border-white/10 bg-charcoal p-6 text-white">
                <div
                  className="glow-burgundy absolute -top-16 -right-16 h-40 w-40"
                  aria-hidden
                />
                <h2 className="relative text-base font-semibold">Prefer email?</h2>
                <p className="relative mt-2 text-sm leading-relaxed text-white/65">
                  Our business email is shared during our first conversation to
                  keep your enquiry in a single, tracked thread.
                </p>
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      {hasCalendly && (
        <section className="border-t border-white/8 bg-night-soft">
          <div className="mx-auto max-w-5xl px-4 py-16 sm:px-6 lg:px-8 lg:py-24">
            <div className="mx-auto max-w-2xl text-center">
              <p className="micro-label">Book a discovery call</p>
              <h2 className="mt-3 text-3xl font-bold tracking-tight text-white sm:text-4xl">
                Pick a time that works for you
              </h2>
              <div className="accent-bar mx-auto mt-5 w-32" />
              <p className="mt-5 text-sm leading-relaxed text-mist sm:text-base">
                Skip the back-and-forth. Choose any open slot below for a free,
                no-pressure discovery call — you&apos;ll get an instant calendar
                confirmation and a scheduling link is emailed to you too.
              </p>
            </div>
            <div className="mt-10">
              <CalendlyInline />
            </div>
          </div>
        </section>
      )}
    </>
  );
}
