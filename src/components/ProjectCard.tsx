import Link from "next/link";
import { ArrowRight } from "lucide-react";
import type { Project } from "@/lib/projects";
import ProjectVisual from "./ProjectVisual";

export default function ProjectCard({ project }: { project: Project }) {
  return (
    <Link
      href={`/portfolio/${project.slug}`}
      className="group glass flex flex-col overflow-hidden rounded-2xl transition-all duration-300 hover:-translate-y-1 hover:border-burgundy-light/40 hover:shadow-lift"
    >
      <ProjectVisual kind={project.visual} label={project.title} />
      <div className="flex flex-1 flex-col p-5 sm:p-6">
        <div className="flex flex-wrap items-center gap-2 text-[11px] font-semibold">
          <span className="rounded-full border border-brand/40 bg-brand/10 px-2.5 py-1 text-brand-light">
            {project.category}
          </span>
          <span className="rounded-full border border-white/10 bg-white/5 px-2.5 py-1 text-mist">
            {project.industry}
          </span>
        </div>
        <h3 className="mt-3 text-lg font-semibold text-white transition-colors group-hover:text-brand">
          {project.title}
        </h3>
        <p className="mt-2 line-clamp-3 text-sm leading-relaxed text-mist">
          {project.overview}
        </p>
        <span className="mt-4 inline-flex items-center gap-1.5 text-sm font-semibold text-brand">
          View case study
          <ArrowRight
            className="h-4 w-4 transition-transform group-hover:translate-x-1"
            aria-hidden
          />
        </span>
      </div>
    </Link>
  );
}
