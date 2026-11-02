import type { ProcessStep } from "@/lib/process";
import Reveal from "./Reveal";

/**
 * Centred vertical timeline: numbered nodes on a spine with alternating
 * glass cards, pulsing node rings and staggered scroll reveals.
 */
export default function ProcessTimeline({ steps }: { steps: ProcessStep[] }) {
  return (
    <div className="relative mx-auto max-w-5xl">
      {/* spine */}
      <div
        aria-hidden="true"
        className="absolute top-0 bottom-0 left-6 w-px bg-gradient-to-b from-transparent via-white/15 to-transparent md:left-1/2"
      />

      <ol className="space-y-12 md:space-y-16">
        {steps.map((step, i) => {
          const left = i % 2 === 0;
          return (
            <li key={step.title} className="relative">
              <div
                className={`flex items-start gap-6 md:w-1/2 ${
                  left ? "md:pr-16" : "md:ml-auto md:flex-row-reverse md:pl-16"
                }`}
              >
                {/* node */}
                <span
                  aria-hidden="true"
                  className="relative z-10 mt-1 flex size-12 shrink-0 items-center justify-center rounded-full border border-white/15 bg-charcoal font-semibold text-white md:absolute md:top-0 md:left-1/2 md:-translate-x-1/2"
                  style={left ? { right: "-4.15rem" } : { left: "-4.15rem" }}
                >
                  <span className="absolute inset-0 rounded-full border border-burgundy/70 animate-pulse-ring" />
                  {String(step.step).padStart(2, "0")}
                </span>

                {/* card */}
                <Reveal
                  className="glass flex-1 rounded-2xl p-6 transition-all duration-300 hover:-translate-y-1 hover:border-burgundy-light/40 hover:shadow-lift md:ml-0"
                  delay={i * 0.06}
                >
                  <div className="flex items-center gap-3">
                    <step.icon className="size-5 text-brand" aria-hidden="true" />
                    <h3 className="micro-label !text-xs">{step.title}</h3>
                  </div>
                  <p className="mt-3 text-sm leading-relaxed text-mist md:text-base">
                    {step.description}
                  </p>
                  <ul className="mt-4 flex flex-wrap gap-2">
                    {step.outcomes.map((o) => (
                      <li
                        key={o}
                        className="rounded-full border border-white/10 bg-white/5 px-3 py-1 text-[11px] font-medium text-white/75"
                      >
                        {o}
                      </li>
                    ))}
                  </ul>
                </Reveal>
              </div>
            </li>
          );
        })}
      </ol>
    </div>
  );
}
