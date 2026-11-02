import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, CalendarDays, Clock3 } from "lucide-react";
import CtaBanner from "@/components/CtaBanner";
import Reveal from "@/components/Reveal";
import { getPost, posts } from "@/lib/posts";

interface PageProps {
  params: Promise<{ slug: string }>;
}

export function generateStaticParams() {
  return posts.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const post = getPost(slug);
  if (!post) return { title: "Article not found" };
  return {
    title: post.title,
    description: post.excerpt,
    alternates: { canonical: `/insights/${post.slug}` },
    openGraph: {
      type: "article",
      title: `${post.title} | Alphabyte Insights`,
      description: post.excerpt,
      publishedTime: post.date,
    },
  };
}

export default async function ArticlePage({ params }: PageProps) {
  const { slug } = await params;
  const post = getPost(slug);
  if (!post) notFound();

  const publishedAt = new Date(post.date).toISOString();

  return (
    <>
      <article className="mx-auto max-w-3xl px-4 pt-32 pb-14 sm:px-6 lg:py-20 lg:pt-40">
        <Reveal>
          <Link
            href="/insights"
            className="inline-flex items-center gap-1.5 text-sm font-semibold text-mist transition-colors hover:text-brand"
          >
            <ArrowLeft className="h-4 w-4" aria-hidden />
            All insights
          </Link>

          <header className="mt-6">
            <span className="rounded-full border border-brand/40 bg-brand/10 px-3 py-1 text-xs font-medium text-brand-light">
              {post.category}
            </span>
            <h1 className="mt-4 text-3xl font-semibold tracking-tight text-balance text-white sm:text-4xl">
              {post.title}
            </h1>
            <div className="accent-bar mt-5 w-20" aria-hidden />
            <div className="mt-5 flex flex-wrap items-center gap-4 text-sm text-mist">
              <span className="inline-flex items-center gap-1.5">
                <CalendarDays className="h-4 w-4" aria-hidden />
                <time dateTime={post.date}>
                  {new Date(post.date).toLocaleDateString("en-GB", {
                    day: "numeric",
                    month: "long",
                    year: "numeric",
                  })}
                </time>
              </span>
              <span className="inline-flex items-center gap-1.5">
                <Clock3 className="h-4 w-4" aria-hidden />
                {post.readTime}
              </span>
              <span className="font-semibold text-white">Alphabyte Team</span>
            </div>
          </header>

          <p className="mt-6 border-l-4 border-brand pl-4 text-lg leading-relaxed text-pretty text-white/80">
            {post.excerpt}
          </p>
        </Reveal>

        <div className="mt-10 space-y-10">
          {post.sections.map((section) => (
            <Reveal key={section.heading}>
              <section>
                <h2 className="text-xl font-semibold text-white sm:text-2xl">
                  {section.heading}
                </h2>
                {section.paragraphs.map((p) => (
                  <p key={p.slice(0, 32)} className="mt-3 text-base leading-relaxed text-pretty text-mist">
                    {p}
                  </p>
                ))}
                {section.bullets && (
                  <ul className="mt-4 space-y-2.5">
                    {section.bullets.map((b) => (
                      <li
                        key={b}
                        className="glass flex items-start gap-3 rounded-xl px-4 py-3 text-sm leading-relaxed text-white/85"
                      >
                        <span className="mt-1.5 h-2 w-2 shrink-0 rounded-full bg-brand" aria-hidden />
                        {b}
                      </li>
                    ))}
                  </ul>
                )}
              </section>
            </Reveal>
          ))}
        </div>

        {/* Structured data for SEO */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "Article",
              headline: post.title,
              description: post.excerpt,
              datePublished: publishedAt,
              author: { "@type": "Organization", name: "Alphabyte" },
              publisher: { "@type": "Organization", name: "Alphabyte" },
            }),
          }}
        />
      </article>

      <CtaBanner
        title="Want this thinking applied to your business?"
        description="From article to implementation — start with a free conversation about your goals."
      />
    </>
  );
}
