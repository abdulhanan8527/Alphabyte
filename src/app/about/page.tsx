import type { Metadata } from "next";
import {
  Compass,
  Eye,
  HeartHandshake,
  Lightbulb,
  Scale,
  Sparkles,
  Target,
} from "lucide-react";
import CtaBanner from "@/components/CtaBanner";
import PageHero from "@/components/PageHero";
import Reveal from "@/components/Reveal";
import SectionHeading from "@/components/SectionHeading";

export const metadata: Metadata = {
  title: "About Us — Who We Are, Mission & Values",
  description:
    "Alphabyte is a software development company building technology that moves businesses forward. Learn who we are, our mission, vision and the values behind our work.",
  alternates: { canonical: "/about" },
};

const values = [
  {
    icon: HeartHandshake,
    title: "Client-first honesty",
    text: "We recommend what your business needs, not what inflates the invoice. If a smaller solution solves the problem, we say so.",
  },
  {
    icon: Sparkles,
    title: "Craft in the details",
    text: "Consistent typography, clean layouts, fast loading and accessible contrast — quality lives in the details users feel.",
  },
  {
    icon: Scale,
    title: "Accountability",
    text: "One team owns the outcome from discovery to support. No handoffs into silence, no blurred responsibility.",
  },
  {
    icon: Lightbulb,
    title: "Practical innovation",
    text: "We adopt new technology — 3D, AR, automation — when it creates real business value, never as decoration.",
  },
];

const reasons = [
  "Senior attention on every project, from first call to launch",
  "Brand-consistent, mobile-first design as standard",
  "Approval milestones before full development begins",
  "Genuine portfolio: real projects, real technologies, no invented claims",
  "Support that continues after the launch celebration ends",
];

export default function AboutPage() {
  return (
    <>
      <PageHero
        eyebrow="About Alphabyte"
        title="Building Technology That Moves Businesses Forward."
        description="We are a software development and digital solutions company. We don't just build websites — we create digital experiences, software products and business solutions that help companies move forward."
      />

      {/* Who we are */}
      <section className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8 lg:py-24">
        <div className="grid gap-12 lg:grid-cols-2 lg:gap-16">
          <Reveal>
            <h2 className="text-2xl font-semibold tracking-tight text-white sm:text-3xl">
              Who we are
            </h2>
            <div className="mt-4 space-y-4 text-base leading-relaxed text-pretty text-mist">
              <p>
                Alphabyte is a team of designers, engineers and problem-solvers
                who build technology for businesses that want to grow. We work
                across web development, mobile applications, ERP and CRM
                systems, business automation and immersive 3D &amp; AR
                experiences.
              </p>
              <p>
                Our name carries our promise: from the first byte to the whole
                alphabet of your digital needs, we build systems that are
                structured, reliable and ready to scale with you.
              </p>
              <p>
                We keep our teams small enough to care and skilled enough to
                deliver. Every project gets senior attention, honest feedback
                and a plan you can follow week by week.
              </p>
            </div>
          </Reveal>
          <div className="grid gap-4 sm:grid-cols-2">
            <Reveal delay={0.05}>
              <div className="glass h-full rounded-2xl p-6 transition-all duration-300 hover:-translate-y-1 hover:border-burgundy-light/40">
                <Target className="h-6 w-6 text-brand" aria-hidden />
                <h3 className="mt-3 text-lg font-semibold text-white">
                  Our mission
                </h3>
                <p className="mt-2 text-sm leading-relaxed text-mist">
                  To help businesses build, automate and grow through
                  technology — delivering software that solves real problems
                  and earns its place in your operations.
                </p>
              </div>
            </Reveal>
            <Reveal delay={0.12}>
              <div className="glass h-full rounded-2xl p-6 transition-all duration-300 hover:-translate-y-1 hover:border-burgundy-light/40">
                <Eye className="h-6 w-6 text-burgundy" aria-hidden />
                <h3 className="mt-3 text-lg font-semibold text-white">
                  Our vision
                </h3>
                <p className="mt-2 text-sm leading-relaxed text-mist">
                  A business landscape where companies of every size can
                  compete with premium technology — without premium waste,
                  complexity or lock-in.
                </p>
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      {/* Approach */}
      <section className="border-y border-white/8 bg-night-soft">
        <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8 lg:py-24">
          <div className="grid gap-12 lg:grid-cols-2 lg:items-center lg:gap-16">
            <Reveal>
              <p className="micro-label !text-brand-light">
                Our approach to technology
              </p>
              <h2 className="mt-3 text-3xl font-semibold tracking-tight text-balance text-white sm:text-4xl">
                Technology should serve the business, not the other way around
              </h2>
              <p className="mt-4 text-base leading-relaxed text-pretty text-white/70">
                We choose tools for maintainability, not fashion. Modern
                frameworks, clean architecture and documented decisions mean
                your system stays an asset years after launch — whoever
                maintains it next.
              </p>
            </Reveal>
            <div className="space-y-4">
              {[
                [
                  Compass,
                  "Business outcome first",
                  "Every feature traces back to a problem worth solving or time worth saving.",
                ],
                [
                  Sparkles,
                  "Premium, minimal design",
                  "Strong hierarchy, generous whitespace and subtle motion — never clutter.",
                ],
                [
                  Scale,
                  "Built to scale",
                  "We design for the volume and team you will have in three years, not just today.",
                ],
              ].map(([Icon, title, text], i) => {
                const IconComp = Icon as typeof Compass;
                return (
                  <Reveal key={title as string} delay={i * 0.08}>
                    <div className="glass flex items-start gap-4 rounded-2xl p-5 transition-all duration-300 hover:-translate-y-1">
                      <IconComp className="mt-0.5 h-5 w-5 shrink-0 text-brand" aria-hidden />
                      <div>
                        <h3 className="text-base font-semibold text-white">{title as string}</h3>
                        <p className="mt-1.5 text-sm leading-relaxed text-white/65">
                          {text as string}
                        </p>
                      </div>
                    </div>
                  </Reveal>
                );
              })}
            </div>
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8 lg:py-24">
        <SectionHeading
          eyebrow="Company values"
          title="What we refuse to compromise on"
          description="Values are only real when they cost something. These are the commitments we keep even when shortcuts are easier."
        />
        <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {values.map((value, i) => (
            <Reveal key={value.title} delay={i * 0.07}>
              <div className="glass h-full rounded-2xl p-6 transition-all duration-300 hover:-translate-y-1 hover:border-burgundy-light/40">
                <span className="inline-flex h-11 w-11 items-center justify-center rounded-lg border border-brand/30 bg-brand/10 text-brand">
                  <value.icon className="h-5 w-5" aria-hidden />
                </span>
                <h3 className="mt-4 text-base font-semibold text-white">
                  {value.title}
                </h3>
                <p className="mt-2 text-sm leading-relaxed text-mist">
                  {value.text}
                </p>
              </div>
            </Reveal>
          ))}
        </div>
      </section>

      {/* Reasons to work with us */}
      <section className="border-t border-white/8 bg-night-soft">
        <div className="mx-auto grid max-w-7xl gap-10 px-4 py-16 sm:px-6 lg:grid-cols-2 lg:items-center lg:gap-16 lg:px-8 lg:py-24">
          <Reveal>
            <p className="micro-label !text-brand-light">
              Why work with Alphabyte
            </p>
            <h2 className="mt-3 text-3xl font-semibold tracking-tight text-balance text-white sm:text-4xl">
              Reasons teams trust us with their next big project
            </h2>
          </Reveal>
          <ul className="space-y-3.5">
            {reasons.map((reason, i) => (
              <Reveal key={reason} delay={i * 0.06}>
                <li className="glass flex items-start gap-3 rounded-xl px-5 py-4 transition-all duration-300 hover:-translate-y-0.5 hover:border-brand/40">
                  <span
                    className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-brand text-[11px] font-bold text-white"
                    aria-hidden
                  >
                    ✓
                  </span>
                  <span className="text-sm leading-relaxed font-medium text-white">
                    {reason}
                  </span>
                </li>
              </Reveal>
            ))}
          </ul>
        </div>
      </section>

      <CtaBanner
        title="Let's build something that moves your business forward"
        description="Start with a conversation — we'll listen first, then propose a practical path."
      />
    </>
  );
}
