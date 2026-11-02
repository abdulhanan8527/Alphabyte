import { ArrowRight, Phone } from "lucide-react";
import ButtonLink from "./ButtonLink";
import Reveal from "./Reveal";
import { whatsappLink, site } from "@/lib/site";

/** Final call-to-action band reused across pages (dark, glow, pill CTA). */
export default function CtaBanner({
  title = "Let's talk about your project",
  description = "Send us a message or book a discovery call. We'll get back to you within one business day with an honest, practical plan.",
}: {
  title?: string;
  description?: string;
}) {
  return (
    <section className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8 lg:py-24">
      <Reveal>
        <div className="relative overflow-hidden rounded-3xl border border-white/10 bg-night-soft px-6 py-14 sm:px-12 sm:py-16 lg:px-16">
          <div className="bg-grid-pattern absolute inset-0" aria-hidden />
          <div
            className="glow-burgundy absolute -top-40 -left-32 h-96 w-96"
            aria-hidden
          />
          <div
            className="glow-brand absolute -right-32 -bottom-40 h-96 w-96"
            aria-hidden
          />
          <div className="relative flex flex-col items-start gap-10 lg:flex-row lg:items-center lg:justify-between">
            <div className="max-w-2xl">
              <h2 className="text-3xl font-semibold tracking-tight text-balance text-white sm:text-4xl">
                {title}
              </h2>
              <div className="accent-bar mt-6 w-24" aria-hidden />
              <p className="mt-6 text-base leading-relaxed text-pretty text-mist sm:text-lg">
                {description}
              </p>
            </div>
            <div className="flex w-full flex-col gap-3 sm:w-auto sm:flex-row">
              <ButtonLink href="/contact" variant="pill" className="px-8">
                Start a Project
                <ArrowRight className="h-4 w-4" aria-hidden />
              </ButtonLink>
              <ButtonLink
                href={whatsappLink(
                  "Hello Alphabyte! I'd like to discuss a project.",
                )}
                variant="secondary"
                external
              >
                <Phone className="h-4 w-4" aria-hidden />
                {site.whatsappDisplay}
              </ButtonLink>
            </div>
          </div>
        </div>
      </Reveal>
    </section>
  );
}
