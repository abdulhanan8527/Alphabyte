import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, CalendarDays, Clock3 } from "lucide-react";
import CtaBanner from "@/components/CtaBanner";
import PageHero from "@/components/PageHero";
import Reveal from "@/components/Reveal";
import { posts } from "@/lib/posts";

export const metadata: Metadata = {
  title: "Insights — Articles on Automation, ERP, CRM & Development",
  description:
    "Practical articles from Alphabyte on business automation, ERP, CRM, website development, mobile apps and digital transformation.",
  alternates: { canonical: "/insights" },
};

function formatDate(iso: string) {
  return new Date(iso).toLocaleDateString("en-GB", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });
}

export default function InsightsPage() {
  return (
    <>
      <PageHero
        eyebrow="Insights"
        title="Practical thinking on technology that runs businesses"
        description="No hype, no keyword stuffing — clear articles about automation, ERP, CRM, web and mobile development from the team that builds them."
      />

      <section className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8 lg:py-24">
        <div className="grid gap-6 md:grid-cols-2">
          {posts.map((post, i) => (
            <Reveal key={post.slug} delay={(i % 2) * 0.08}>
              <Link
                href={`/insights/${post.slug}`}
                className="group glass flex h-full flex-col rounded-2xl p-6 transition-all duration-300 hover:-translate-y-1 hover:border-burgundy-light/40 hover:shadow-lift sm:p-8"
              >
                <div className="flex flex-wrap items-center gap-3 text-xs text-mist">
                  <span className="rounded-full border border-brand/40 bg-brand/10 px-3 py-1 font-medium text-brand-light">
                    {post.category}
                  </span>
                  <span className="inline-flex items-center gap-1.5">
                    <CalendarDays className="h-3.5 w-3.5" aria-hidden />
                    {formatDate(post.date)}
                  </span>
                  <span className="inline-flex items-center gap-1.5">
                    <Clock3 className="h-3.5 w-3.5" aria-hidden />
                    {post.readTime}
                  </span>
                </div>
                <h2 className="mt-4 text-xl font-semibold text-balance text-white transition-colors group-hover:text-brand sm:text-2xl">
                  {post.title}
                </h2>
                <p className="mt-3 flex-1 text-sm leading-relaxed text-pretty text-mist sm:text-base">
                  {post.excerpt}
                </p>
                <span className="mt-5 inline-flex items-center gap-1.5 text-sm font-semibold text-brand">
                  Read article
                  <ArrowRight
                    className="h-4 w-4 transition-transform group-hover:translate-x-1"
                    aria-hidden
                  />
                </span>
              </Link>
            </Reveal>
          ))}
        </div>
      </section>

      <CtaBanner
        title="Prefer a conversation to an article?"
        description="Ask us your question directly — we answer with the same honesty we write with."
      />
    </>
  );
}
