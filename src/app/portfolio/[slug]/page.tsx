import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, ArrowRight, CheckCircle2, ExternalLink } from "lucide-react";
import ButtonLink from "@/components/ButtonLink";
import CtaBanner from "@/components/CtaBanner";
import ProjectVisual from "@/components/ProjectVisual";
import Reveal from "@/components/Reveal";
import { getProject, projects } from "@/lib/projects";

interface PageProps {
  params: Promise<{ slug: string }>;
}

export function generateStaticParams() {
  return projects.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const project = getProject(slug);
  if (!project) return { title: "Case study not found" };
  return {
    title: `${project.title} — ${project.category} Case Study`,
    description: project.overview,
    alternates: { canonical: `/portfolio/${project.slug}` },
    openGraph: {
      title: `${project.title} | Alphabyte case study`,
      description: project.overview,
    },
  };
}

export default async function CaseStudyPage({ params }: PageProps) {
  const { slug } = await params;
  const project = getProject(slug);
  if (!project) notFound();

  const index = projects.findIndex((p) => p.slug === slug);
  const next = projects[(index + 1) % projects.length];

  return (
    <>
      {/* Case study header */}
      <section className="relative overflow-hidden bg-night">
        <div className="bg-grid-pattern absolute inset-0" aria-hidden />
        <div
          className="glow-burgundy absolute -top-32 -left-24 h-96 w-96"
          aria-hidden
        />
        <div className="relative mx-auto max-w-7xl px-4 pt-32 pb-14 sm:px-6 sm:pt-36 sm:pb-20 lg:px-8">
          <Reveal>
            <Link
              href="/portfolio"
              className="inline-flex items-center gap-1.5 text-sm font-semibold text-white/60 transition-colors hover:text-white"
            >
              <ArrowLeft className="h-4 w-4" aria-hidden />
              All case studies
            </Link>
            <div className="mt-6 flex flex-wrap items-center gap-2 text-[11px] font-semibold">
              <span className="rounded-full bg-brand px-3 py-1 text-white">
                {project.category}
              </span>
              <span className="rounded-full bg-white/10 px-3 py-1 text-white/80">
                {project.industry}
              </span>
            </div>
            <h1 className="mt-4 max-w-3xl text-3xl font-semibold tracking-tight text-balance text-white sm:text-4xl lg:text-5xl">
              {project.title}
            </h1>
            <div className="accent-bar mt-6 w-24" aria-hidden />
          </Reveal>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 py-14 sm:px-6 lg:px-8 lg:py-20">
        <div className="grid gap-10 lg:grid-cols-12 lg:gap-14">
          {/* Main narrative */}
          <div className="lg:col-span-7">
            <Reveal>
              <ProjectVisual kind={project.visual} label={project.title} />
              <p className="mt-3 text-xs text-fog">
                Interface preview placeholder — approved project screenshots are
                published here.
              </p>
            </Reveal>

            <Reveal className="mt-10">
              <h2 className="text-xl font-semibold text-white sm:text-2xl">
                Project overview
              </h2>
              <p className="mt-3 text-base leading-relaxed text-pretty text-mist">
                {project.overview}
              </p>
            </Reveal>

            <Reveal className="mt-8">
              <h2 className="text-xl font-semibold text-white sm:text-2xl">
                The challenge
              </h2>
              <p className="mt-3 text-base leading-relaxed text-pretty text-mist">
                {project.challenge}
              </p>
            </Reveal>

            <Reveal className="mt-8">
              <h2 className="text-xl font-semibold text-white sm:text-2xl">
                Our solution
              </h2>
              <p className="mt-3 text-base leading-relaxed text-pretty text-mist">
                {project.solution}
              </p>
            </Reveal>

            <Reveal className="mt-8">
              <h2 className="text-xl font-semibold text-white sm:text-2xl">
                Key features
              </h2>
              <ul className="mt-4 grid gap-3 sm:grid-cols-2">
                {project.features.map((f) => (
                  <li
                    key={f}
                    className="glass flex items-start gap-2.5 rounded-xl px-4 py-3 text-sm leading-relaxed text-white/85"
                  >
                    <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-brand" aria-hidden />
                    {f}
                  </li>
                ))}
              </ul>
            </Reveal>
          </div>

          {/* Sidebar facts */}
          <aside className="lg:col-span-5">
            <Reveal delay={0.1}>
              <div className="glass-strong rounded-2xl p-6 lg:sticky lg:top-24">
                <h2 className="micro-label !text-xs">Project facts</h2>
                <dl className="mt-4 space-y-4 text-sm">
                  <div>
                    <dt className="font-semibold text-fog">Category</dt>
                    <dd className="mt-0.5 font-medium text-white">{project.category}</dd>
                  </div>
                  <div>
                    <dt className="font-semibold text-fog">Client industry</dt>
                    <dd className="mt-0.5 font-medium text-white">{project.industry}</dd>
                  </div>
                  <div>
                    <dt className="font-semibold text-fog">Technologies used</dt>
                    <dd className="mt-2 flex flex-wrap gap-2">
                      {project.technologies.map((t) => (
                        <span
                          key={t}
                          className="rounded-full border border-brand/40 bg-brand/10 px-3 py-1 text-xs font-medium text-brand-light"
                        >
                          {t}
                        </span>
                      ))}
                    </dd>
                  </div>
                  {(project.demoUrl || project.liveUrl) && (
                    <div className="space-y-2 pt-1">
                      {project.demoUrl && (
                        <a
                          href={project.demoUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center gap-1.5 font-semibold text-brand hover:text-brand-dark"
                        >
                          <ExternalLink className="h-4 w-4" aria-hidden />
                          Watch demo
                        </a>
                      )}
                      {project.liveUrl && (
                        <a
                          href={project.liveUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center gap-1.5 font-semibold text-brand hover:text-brand-dark"
                        >
                          <ExternalLink className="h-4 w-4" aria-hidden />
                          Visit live project
                        </a>
                      )}
                    </div>
                  )}
                </dl>
                <div className="mt-6 border-t border-white/10 pt-5">
                  <ButtonLink href="/contact" className="w-full">
                    Start a similar project
                  </ButtonLink>
                </div>
              </div>
            </Reveal>
          </aside>
        </div>

        {/* Next project */}
        <Reveal className="mt-14">
          <Link
            href={`/portfolio/${next.slug}`}
            className="group glass flex items-center justify-between gap-4 rounded-2xl px-6 py-5 transition-all duration-300 hover:-translate-y-0.5 hover:border-brand/40"
          >
            <div>
              <p className="micro-label">Next case study</p>
              <p className="mt-1 text-base font-semibold text-white group-hover:text-brand">
                {next.title}
              </p>
            </div>
            <ArrowRight
              className="h-5 w-5 shrink-0 text-brand transition-transform group-hover:translate-x-1"
              aria-hidden
            />
          </Link>
        </Reveal>
      </section>

      <CtaBanner />
    </>
  );
}
