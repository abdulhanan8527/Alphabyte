import type { Metadata } from "next";
import { CheckCircle2 } from "lucide-react";
import CtaBanner from "@/components/CtaBanner";
import PageHero from "@/components/PageHero";
import Reveal from "@/components/Reveal";
import { processSteps } from "@/lib/process";

export const metadata: Metadata = {
  title: "Our Process — Discovery to Launch & Support",
  description:
    "Alphabyte's six-stage development process: Discovery, Planning, UI/UX Design, Development, Testing and Launch & Support — with approvals at every milestone.",
  alternates: { canonical: "/process" },
};

export default function ProcessPage() {
  return (
    <>
      <PageHero
        eyebrow="Our process"
        title="Discovery → Planning → Design → Development → Testing → Launch"
        description="A transparent six-stage process. You always know what is happening, what comes next and what you need to approve."
      />

      <section className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8 lg:py-24">
        <ol className="relative space-y-6 lg:space-y-8">
          {processSteps.map((step, i) => (
            <Reveal key={step.step} delay={i * 0.05}>
              <li className="glass relative grid gap-6 rounded-2xl p-6 transition-all duration-300 hover:-translate-y-1 hover:border-burgundy-light/40 sm:p-8 lg:grid-cols-12 lg:gap-10">
                <div className="flex items-start gap-4 lg:col-span-5">
                  <span className="relative flex h-12 w-12 shrink-0 items-center justify-center rounded-full border border-white/15 bg-charcoal text-lg font-bold text-white">
                    <span className="absolute inset-0 rounded-full border border-burgundy/70 animate-pulse-ring" aria-hidden />
                    {String(step.step).padStart(2, "0")}
                  </span>
                  <div>
                    <span className="inline-flex h-9 w-9 items-center justify-center rounded-lg border border-brand/30 bg-brand/10 text-brand">
                      <step.icon className="h-4.5 w-4.5" aria-hidden />
                    </span>
                    <h2 className="mt-2 text-xl font-semibold text-white sm:text-2xl">
                      {step.title}
                    </h2>
                  </div>
                </div>
                <div className="lg:col-span-7">
                  <p className="text-base leading-relaxed text-pretty text-mist">
                    {step.description}
                  </p>
                  <h3 className="micro-label mt-4 !text-[11px]">
                    What you get
                  </h3>
                  <ul className="mt-2.5 flex flex-wrap gap-2">
                    {step.outcomes.map((o) => (
                      <li
                        key={o}
                        className="inline-flex items-center gap-1.5 rounded-full border border-white/10 bg-white/5 px-3.5 py-1.5 text-xs font-medium text-white/80"
                      >
                        <CheckCircle2 className="h-3.5 w-3.5 text-brand" aria-hidden />
                        {o}
                      </li>
                    ))}
                  </ul>
                </div>
              </li>
            </Reveal>
          ))}
        </ol>
      </section>

      <CtaBanner
        title="Start at step one — a conversation"
        description="Discovery begins with listening. Tell us where your business is stuck and we'll map the first step together."
      />
    </>
  );
}
