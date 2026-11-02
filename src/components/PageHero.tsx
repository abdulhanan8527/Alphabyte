import Reveal from "./Reveal";

/** Consistent dark header band for inner pages (clears the fixed navbar). */
export default function PageHero({
  eyebrow,
  title,
  description,
}: {
  eyebrow: string;
  title: string;
  description: string;
}) {
  return (
    <section className="relative overflow-hidden bg-night">
      <div className="bg-grid-pattern absolute inset-0" aria-hidden />
      <div
        className="glow-burgundy absolute -top-32 -left-24 h-96 w-96 blur-2xl"
        aria-hidden
      />
      <div
        className="glow-brand absolute -right-24 -bottom-32 h-96 w-96 blur-2xl"
        aria-hidden
      />
      <div className="relative mx-auto max-w-7xl px-4 pt-32 pb-16 sm:px-6 sm:pt-36 sm:pb-20 lg:px-8 lg:pt-40 lg:pb-24">
        <Reveal>
          <p className="micro-label !text-brand-light">{eyebrow}</p>
          <h1 className="mt-4 max-w-3xl text-4xl font-semibold tracking-tight text-balance text-white sm:text-5xl">
            {title}
          </h1>
          <div className="accent-bar mt-6 w-24" aria-hidden />
          <p className="mt-6 max-w-2xl text-base leading-relaxed text-pretty text-mist sm:text-lg">
            {description}
          </p>
        </Reveal>
      </div>
    </section>
  );
}
