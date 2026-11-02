import type { Metadata } from "next";
import { ArrowRight, CheckCircle2 } from "lucide-react";
import ButtonLink from "@/components/ButtonLink";
import CtaBanner from "@/components/CtaBanner";
import PageHero from "@/components/PageHero";
import Reveal from "@/components/Reveal";
import { services } from "@/lib/services";

export const metadata: Metadata = {
  title: "Services — Web, Mobile, ERP, CRM & 3D/AR Development",
  description:
    "Alphabyte delivers web development, mobile app development, ERP solutions, CRM & business automation and 3D & AR experiences — each built for measurable business value.",
  alternates: { canonical: "/services" },
};

export default function ServicesPage() {
  return (
    <>
      <PageHero
        eyebrow="Our services"
        title="Five ways we help you build, automate and grow"
        description="Each service line combines design, engineering and business thinking. Scroll to see what we deliver and the value it creates."
      />

      <section className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8 lg:py-24">
        <div className="space-y-16 lg:space-y-24">
          {services.map((service, i) => (
            <Reveal key={service.slug}>
              <article
                id={service.slug}
                className={`grid scroll-mt-24 gap-8 lg:grid-cols-12 lg:gap-12 ${
                  i > 0 ? "border-t border-white/8 pt-16 lg:pt-24" : ""
                }`}
              >
                <div className="lg:col-span-5">
                  <div className="flex items-center gap-4">
                    <span className="inline-flex h-12 w-12 shrink-0 items-center justify-center rounded-xl border border-brand/30 bg-brand/10 text-brand">
                      <service.icon className="h-6 w-6" aria-hidden />
                    </span>
                    <div>
                      <p className="micro-label">
                        Service {String(i + 1).padStart(2, "0")}
                      </p>
                      <h2 className="text-2xl font-semibold tracking-tight text-white sm:text-3xl">
                        {service.title}
                      </h2>
                    </div>
                  </div>
                  <p className="mt-5 text-base leading-relaxed text-pretty text-mist">
                    {service.summary}
                  </p>
                  <div className="mt-6">
                    <ButtonLink href="/contact">
                      Discuss this service
                      <ArrowRight className="h-4 w-4" aria-hidden />
                    </ButtonLink>
                  </div>
                </div>

                <div className="grid gap-5 sm:grid-cols-2 lg:col-span-7">
                  <div className="glass rounded-2xl p-6">
                    <h3 className="micro-label !text-xs">What we deliver</h3>
                    <ul className="mt-4 space-y-2.5">
                      {service.capabilities.map((c) => (
                        <li key={c} className="flex items-start gap-2.5 text-sm leading-relaxed text-mist">
                          <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-brand" aria-hidden />
                          {c}
                        </li>
                      ))}
                    </ul>
                  </div>
                  <div className="glass-strong rounded-2xl p-6">
                    <h3 className="micro-label !text-xs">Business value</h3>
                    <ul className="mt-4 space-y-2.5">
                      {service.businessValue.map((v) => (
                        <li key={v} className="flex items-start gap-2.5 text-sm leading-relaxed text-mist">
                          <span
                            className="mt-1.5 h-2 w-2 shrink-0 rounded-full bg-burgundy"
                            aria-hidden
                          />
                          {v}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </article>
            </Reveal>
          ))}
        </div>
      </section>

      <CtaBanner
        title="Not sure which service fits your problem?"
        description="Describe the problem in plain language — we'll map it to the right solution, or tell you honestly if you don't need one."
      />
    </>
  );
}
