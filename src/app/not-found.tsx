import type { Metadata } from "next";
import Link from "next/link";
import ButtonLink from "@/components/ButtonLink";

export const metadata: Metadata = {
  title: "Page not found",
  robots: { index: false, follow: true },
};

export default function NotFound() {
  return (
    <section className="relative overflow-hidden bg-night">
      <div className="bg-grid-pattern absolute inset-0" aria-hidden />
      <div
        className="glow-burgundy absolute -top-32 -left-24 h-96 w-96"
        aria-hidden
      />
      <div className="relative mx-auto flex max-w-3xl flex-col items-center px-4 pt-40 pb-24 text-center sm:pt-44 sm:pb-32">
        <p className="text-6xl font-bold text-brand sm:text-7xl">404</p>
        <h1 className="mt-4 text-2xl font-semibold text-balance text-white sm:text-3xl">
          This page seems to have been refactored away
        </h1>
        <p className="mt-3 max-w-md text-base text-pretty text-white/65">
          The page you&apos;re looking for doesn&apos;t exist or has moved.
          Let&apos;s get you back to solid ground.
        </p>
        <div className="mt-8 flex flex-col gap-3 sm:flex-row">
          <ButtonLink href="/">Back to home</ButtonLink>
          <ButtonLink href="/contact" variant="secondary">
            Contact us
          </ButtonLink>
        </div>
        <p className="mt-8 text-sm text-white/50">
          Or explore:{" "}
          <Link href="/services" className="font-semibold text-brand hover:underline">
            Services
          </Link>{" "}
          ·{" "}
          <Link href="/portfolio" className="font-semibold text-brand hover:underline">
            Portfolio
          </Link>{" "}
          ·{" "}
          <Link href="/insights" className="font-semibold text-brand hover:underline">
            Insights
          </Link>
        </p>
      </div>
    </section>
  );
}
