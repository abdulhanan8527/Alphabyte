import Link from "next/link";
import {
  ArrowRight,
  ArrowUpRight,
  CheckCircle2,
  ChevronDown,
  MessageCircle,
} from "lucide-react";
import MatrixRain from "@/components/MatrixRain";
import Marquee from "@/components/Marquee";
import Reveal from "@/components/Reveal";
import ButtonLink from "@/components/ButtonLink";
import SectionHeading from "@/components/SectionHeading";
import ProcessTimeline from "@/components/ProcessTimeline";
import StickyStack from "@/components/StickyStack";
import TiltCard from "@/components/TiltCard";
import Accordion from "@/components/Accordion";
import ProjectCard from "@/components/ProjectCard";
import ProjectVisual from "@/components/ProjectVisual";
import { services } from "@/lib/services";
import { processSteps } from "@/lib/process";
import { industries } from "@/lib/industries";
import { featuredProjects, projects } from "@/lib/projects";
import { faqs } from "@/lib/faq";
import { site, whatsappLink } from "@/lib/site";

const TECH_MARQUEE = [
  "Next.js",
  "React",
  "Node.js",
  "TypeScript",
  "PostgreSQL",
  "React Native",
  "Flutter",
  "Three.js",
  "Tailwind CSS",
  "REST APIs",
  "WebGL",
  "Vercel",
];

export default function Home() {
  const moreProjects = projects.filter((p) => !p.featured);

  return (
    <>
      {/* ── Hero ─────────────────────────────────────────────── */}
      <section className="relative flex min-h-svh items-center overflow-hidden bg-night">
        <div className="bg-grid-pattern absolute inset-0" aria-hidden />
        <div
          className="glow-burgundy absolute -top-32 -left-32 h-[28rem] w-[28rem]"
          aria-hidden
        />
        <div
          className="glow-brand absolute right-0 bottom-0 h-[24rem] w-[24rem]"
          aria-hidden
        />
        <MatrixRain />

        <div className="relative mx-auto w-full max-w-7xl px-4 pt-32 pb-20 sm:px-6 lg:px-8">
          <Reveal>
            <p className="micro-label !text-brand-light">
              {site.name} — Software &amp; Digital Solutions
            </p>
            <h1 className="mt-5 max-w-3xl text-4xl font-bold tracking-tight text-balance text-white sm:text-6xl lg:text-7xl lg:leading-[1.05]">
              Build Smarter.{" "}
              <span className="text-white">Grow Faster.</span>
            </h1>
            <div className="accent-bar mt-7 w-40 sm:w-56" aria-hidden />
            <p className="mt-7 max-w-xl text-base leading-relaxed text-pretty text-mist sm:text-lg">
              We create digital solutions that help businesses innovate,
              automate and scale — websites, mobile apps, ERP and CRM systems,
              and immersive 3D &amp; AR experiences.
            </p>
            <div className="mt-9 flex w-full flex-col gap-3 sm:w-auto sm:flex-row">
              <ButtonLink href="/services" className="px-8 py-3.5">
                Explore Our Services
                <ArrowRight className="h-4 w-4" aria-hidden />
              </ButtonLink>
              <ButtonLink
                href="/contact"
                variant="secondary"
                className="px-8 py-3.5"
              >
                Start a Project
              </ButtonLink>
            </div>
            {/* factual capability strip — no invented numbers */}
            <ul className="mt-12 flex flex-wrap gap-x-8 gap-y-3">
              {[
                "Web & mobile applications",
                "ERP & CRM systems",
                "Business automation",
                "3D & AR experiences",
              ].map((item) => (
                <li
                  key={item}
                  className="flex items-center gap-2 text-sm text-white/70"
                >
                  <CheckCircle2 className="size-4 text-brand" aria-hidden />
                  {item}
                </li>
              ))}
            </ul>
          </Reveal>
        </div>

        {/* scroll cue */}
        <ChevronDown
          className="absolute bottom-6 left-1/2 hidden size-6 -translate-x-1/2 animate-bounce text-white/40 md:block"
          aria-hidden
        />
      </section>

      {/* ── Technology marquee ───────────────────────────────── */}
      <section
        aria-label="Technologies we work with"
        className="border-y border-white/8 bg-night-soft py-6"
      >
        <Marquee>
          {TECH_MARQUEE.map((tech) => (
            <span
              key={tech}
              className="mx-3 flex h-14 items-center rounded-xl border border-white/8 bg-white/4 px-6 text-sm font-medium text-white/55 transition-colors duration-300 hover:text-white"
            >
              {tech}
            </span>
          ))}
        </Marquee>
      </section>

      {/* ── Services ─────────────────────────────────────────── */}
      <section className="mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8 lg:py-28">
        <SectionHeading
          eyebrow="What we do"
          title="Good businesses deserve smarter software."
          description="From company websites to full ERP systems, we deliver practical solutions that move your business forward."
        />
        <div className="mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {services.map((service, i) => (
            <Reveal key={service.slug} delay={i * 0.07}>
              <Link
                href={`/services#${service.slug}`}
                className="group glass flex h-full flex-col rounded-2xl p-7 transition-all duration-300 hover:-translate-y-1 hover:border-burgundy-light/40 hover:shadow-lift"
              >
                <span className="flex size-12 items-center justify-center rounded-xl border border-brand/30 bg-brand/10 text-brand transition-colors duration-300 group-hover:bg-brand group-hover:text-white">
                  <service.icon className="size-6" aria-hidden />
                </span>
                <h3 className="mt-5 text-lg font-semibold text-white">
                  {service.title}
                </h3>
                <p className="mt-3 flex-1 text-sm leading-relaxed text-mist">
                  {service.summary}
                </p>
                <span className="mt-5 inline-flex items-center gap-1.5 text-sm font-semibold text-brand">
                  Learn more
                  <ArrowRight
                    className="size-4 transition-transform duration-300 group-hover:translate-x-1"
                    aria-hidden
                  />
                </span>
              </Link>
            </Reveal>
          ))}
          {/* CTA tile completes the grid */}
          <Reveal delay={services.length * 0.07}>
            <div className="relative flex h-full flex-col justify-between overflow-hidden rounded-2xl border border-brand/30 bg-brand/10 p-7">
              <div
                className="glow-brand absolute -right-16 -bottom-16 h-48 w-48"
                aria-hidden
              />
              <div className="relative">
                <h3 className="text-lg font-semibold text-white">
                  Not sure what you need?
                </h3>
                <p className="mt-3 text-sm leading-relaxed text-white/75">
                  Describe your idea or your bottleneck — we&apos;ll tell you
                  honestly what makes sense.
                </p>
              </div>
              <Link
                href="/contact"
                className="relative mt-6 inline-flex w-fit items-center gap-2 rounded-full bg-brand px-6 py-3 text-sm font-semibold text-white shadow-glow transition-all duration-300 hover:-translate-y-0.5 hover:bg-brand-dark"
              >
                Talk to us
                <ArrowUpRight className="size-4" aria-hidden />
              </Link>
            </div>
          </Reveal>
        </div>
      </section>

      {/* ── Portfolio: sticky stacking cards ─────────────────── */}
      <section className="border-y border-white/8 bg-night-soft py-20 lg:py-28">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <SectionHeading
            eyebrow="Our Portfolio"
            title="Work we've actually shipped."
            description="A snapshot of the applications and systems we've designed and built. Every project below is real work — no mock clients, no invented results."
          />
          <div className="mt-16">
            <StickyStack
              items={featuredProjects.map((project) => ({
                eyebrow: `${project.category} — ${project.industry}`,
                title: project.title,
                description: project.overview,
                card: (
                  <Link
                    href={`/portfolio/${project.slug}`}
                    className="group block"
                    aria-label={`View case study: ${project.title}`}
                  >
                    <TiltCard className="glass overflow-hidden rounded-3xl p-4 transition-shadow duration-300 group-hover:shadow-lift sm:p-6">
                      <ProjectVisual
                        kind={project.visual}
                        label={project.title}
                      />
                      <div className="flex flex-wrap items-center justify-between gap-4 px-2 pt-5 pb-2">
                        <ul className="flex flex-wrap gap-2">
                          {project.technologies.slice(0, 4).map((tech) => (
                            <li
                              key={tech}
                              className="rounded-full border border-white/10 bg-white/5 px-3 py-1 text-[11px] font-medium text-white/75"
                            >
                              {tech}
                            </li>
                          ))}
                        </ul>
                        <span className="inline-flex items-center gap-1.5 text-sm font-semibold text-brand">
                          View case study
                          <ArrowRight
                            className="size-4 transition-transform duration-300 group-hover:translate-x-1"
                            aria-hidden
                          />
                        </span>
                      </div>
                    </TiltCard>
                  </Link>
                ),
              }))}
            />
          </div>
          {moreProjects.length > 0 && (
            <div className="mt-20">
              <div className="grid gap-6 sm:grid-cols-2">
                {moreProjects.map((project, i) => (
                  <Reveal key={project.slug} delay={i * 0.08}>
                    <ProjectCard project={project} />
                  </Reveal>
                ))}
              </div>
              <Reveal className="mt-10 text-center">
                <ButtonLink href="/portfolio" variant="secondary">
                  View all projects
                  <ArrowRight className="size-4" aria-hidden />
                </ButtonLink>
              </Reveal>
            </div>
          )}
        </div>
      </section>

      {/* ── Process timeline ─────────────────────────────────── */}
      <section className="mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8 lg:py-28">
        <SectionHeading
          align="center"
          eyebrow="Our Process"
          title="A process built for results."
          description="Clear milestones, constant communication and zero hand-waving. Here's how we get from idea to launch."
        />
        <div className="mt-16">
          <ProcessTimeline steps={processSteps} />
        </div>
        <Reveal className="mt-14 text-center">
          <ButtonLink href="/process" variant="secondary">
            See the full process
            <ArrowRight className="size-4" aria-hidden />
          </ButtonLink>
        </Reveal>
      </section>

      {/* ── Industries marquee ───────────────────────────────── */}
      <section className="border-y border-white/8 bg-night-soft py-20 lg:py-24">
        <div className="mx-auto mb-12 max-w-7xl px-4 sm:px-6 lg:px-8">
          <SectionHeading
            eyebrow="Industries"
            title="Built for your industry."
            description="We adapt our solutions to the data, workflows and compliance needs of each sector we serve."
          />
        </div>
        <Marquee slow>
          {industries.map((industry) => (
            <Link
              key={industry.slug}
              href={`/industries#${industry.slug}`}
              className="group mx-3 flex w-72 shrink-0 flex-col rounded-2xl border border-white/8 bg-white/4 p-6 transition-all duration-300 hover:-translate-y-1 hover:border-burgundy-light/40"
            >
              <span className="flex size-11 items-center justify-center rounded-xl border border-burgundy/30 bg-burgundy/10 text-burgundy-light transition-colors duration-300 group-hover:bg-burgundy group-hover:text-white">
                <industry.icon className="size-5" aria-hidden />
              </span>
              <h3 className="mt-4 text-base font-semibold text-white">
                {industry.name}
              </h3>
              <p className="mt-2 line-clamp-3 text-sm leading-relaxed text-mist">
                {industry.description}
              </p>
            </Link>
          ))}
        </Marquee>
        <div className="mx-auto mt-10 max-w-7xl px-4 text-center sm:px-6 lg:px-8">
          <ButtonLink href="/industries" variant="secondary">
            Explore industries
            <ArrowRight className="size-4" aria-hidden />
          </ButtonLink>
        </div>
      </section>

      {/* ── FAQ ──────────────────────────────────────────────── */}
      <section className="mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8 lg:py-28">
        <div className="grid gap-12 lg:grid-cols-[minmax(0,2fr)_minmax(0,3fr)] lg:gap-20">
          <div>
            <SectionHeading
              eyebrow="FAQ"
              title="Common questions."
              description="Everything you need to know before we start working together."
            />
            <Reveal className="mt-8">
              <ButtonLink href="/contact">
                Book a discovery call
                <ArrowRight className="size-4" aria-hidden />
              </ButtonLink>
            </Reveal>
          </div>
          <Reveal delay={0.1}>
            <Accordion items={faqs} />
          </Reveal>
        </div>
      </section>

      {/* ── Contact band ─────────────────────────────────────── */}
      <section className="relative overflow-hidden border-t border-white/8 bg-night-soft">
        <div className="bg-triangles absolute inset-0 opacity-40" aria-hidden />
        <div className="relative mx-auto grid max-w-7xl gap-8 px-4 py-20 sm:px-6 lg:grid-cols-2 lg:px-8 lg:py-24">
          <Reveal>
            <p className="micro-label">Let&apos;s talk</p>
            <h2 className="mt-4 text-3xl font-semibold tracking-tight text-balance text-white sm:text-4xl">
              Let&apos;s talk about your project.
            </h2>
            <div className="accent-bar mt-6 w-24" aria-hidden />
            <p className="mt-6 max-w-md text-base leading-relaxed text-mist">
              Send us a message or reach out on WhatsApp. We&apos;ll get back
              to you within one business day.
            </p>
            <ul className="mt-8 space-y-3">
              {[
                "Identify what's worth building (and what isn't)",
                "Discuss your current bottlenecks",
                "Get a clear roadmap for next steps",
              ].map((item) => (
                <li
                  key={item}
                  className="flex items-start gap-3 text-sm text-white/80"
                >
                  <CheckCircle2
                    className="mt-0.5 size-4 shrink-0 text-brand"
                    aria-hidden
                  />
                  {item}
                </li>
              ))}
            </ul>
          </Reveal>
          <Reveal delay={0.1}>
            <div className="glass-strong flex h-full flex-col justify-center gap-4 rounded-3xl p-8 sm:p-10">
              <h3 className="text-xl font-semibold text-white">
                Prefer a quick chat?
              </h3>
              <p className="text-sm leading-relaxed text-mist">
                No pitch, no pressure — describe your idea and we&apos;ll map
                out the options together.
              </p>
              <div className="mt-4 flex flex-col gap-3">
                <Link
                  href="/contact"
                  className="inline-flex items-center justify-center gap-2 rounded-full bg-brand px-7 py-3.5 text-sm font-semibold text-white shadow-glow transition-all duration-300 hover:-translate-y-0.5 hover:bg-brand-dark"
                >
                  Start a Project
                  <ArrowRight className="size-4" aria-hidden />
                </Link>
                <a
                  href={whatsappLink()}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center gap-2 rounded-full border border-white/25 px-7 py-3.5 text-sm font-semibold text-white transition-all duration-300 hover:-translate-y-0.5 hover:border-brand hover:text-brand"
                >
                  <MessageCircle className="size-4" aria-hidden />
                  WhatsApp {site.whatsappDisplay}
                </a>
              </div>
            </div>
          </Reveal>
        </div>
      </section>
    </>
  );
}
