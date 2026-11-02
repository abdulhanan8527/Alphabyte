import type { Metadata } from "next";
import CtaBanner from "@/components/CtaBanner";
import PageHero from "@/components/PageHero";
import ProjectCard from "@/components/ProjectCard";
import Reveal from "@/components/Reveal";
import { projects } from "@/lib/projects";

export const metadata: Metadata = {
  title: "Our Portfolio — Case Studies & Project Work",
  description:
    "Explore Alphabyte's project case studies: healthcare applications, business websites, ERP systems, CRM platforms and 3D & AR retail experiences.",
  alternates: { canonical: "/portfolio" },
};

export default function PortfolioPage() {
  return (
    <>
      <PageHero
        eyebrow="Our portfolio"
        title="Real projects, presented as case studies"
        description="Every project below follows the same honest structure: the problem, the solution, the features and the technologies actually used."
      />

      <section className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8 lg:py-24">
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {projects.map((project, i) => (
            <Reveal key={project.slug} delay={(i % 3) * 0.08}>
              <ProjectCard project={project} />
            </Reveal>
          ))}
        </div>

        <Reveal className="mt-12">
          <p className="mx-auto max-w-2xl text-center text-sm leading-relaxed text-mist">
            Portfolio entries present client-approved information only. Approved
            screenshots, demo videos and live links are added to each case study
            as they become available.
          </p>
        </Reveal>
      </section>

      <CtaBanner
        title="Your project could be the next case study"
        description="Tell us what you're building — we'll tell you honestly whether we're the right team for it."
      />
    </>
  );
}
