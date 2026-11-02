import type { Metadata } from "next";
import { CheckCircle2 } from "lucide-react";
import CtaBanner from "@/components/CtaBanner";
import PageHero from "@/components/PageHero";
import Reveal from "@/components/Reveal";
import { industries } from "@/lib/industries";

export const metadata: Metadata = {
  title: "Industries We Serve — Healthcare, Education, Retail & More",
  description:
    "Alphabyte builds software for healthcare, education, retail & e-commerce, logistics & supply chain, wholesale & distribution and professional services.",
  alternates: { canonical: "/industries" },
};

export default function IndustriesPage() {
  return (
    <>
      <PageHero
        eyebrow="Industries"
        title="Software shaped around how your sector actually works"
        description="Six industries where we understand the workflows, the regulations and the daily pressure — so your software fits from day one."
      />

      <section className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8 lg:py-24">
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {industries.map((industry, i) => (
            <Reveal key={industry.slug} delay={(i % 3) * 0.08}>
              <article
                id={industry.slug}
                className="glass flex h-full scroll-mt-24 flex-col rounded-2xl p-6 transition-all duration-300 hover:-translate-y-1 hover:border-burgundy-light/40 hover:shadow-lift sm:p-7"
              >
                <span className="inline-flex h-12 w-12 items-center justify-center rounded-xl border border-burgundy/30 bg-burgundy/10 text-burgundy-light">
                  <industry.icon className="h-6 w-6" aria-hidden />
                </span>
                <h2 className="mt-4 text-lg font-semibold text-white">
                  {industry.name}
                </h2>
                <p className="mt-2 text-sm leading-relaxed text-mist">
                  {industry.description}
                </p>
                <h3 className="micro-label mt-5 !text-[11px]">
                  Typical solutions
                </h3>
                <ul className="mt-3 space-y-2">
                  {industry.solutions.map((s) => (
                    <li key={s} className="flex items-start gap-2.5 text-sm leading-relaxed text-mist">
                      <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-brand" aria-hidden />
                      {s}
                    </li>
                  ))}
                </ul>
              </article>
            </Reveal>
          ))}
        </div>
      </section>

      <CtaBanner
        title="Don't see your industry here?"
        description="Our discovery process exists exactly for that: we learn your sector before we design your solution."
      />
    </>
  );
}
