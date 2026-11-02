import Reveal from "./Reveal";

/**
 * Section header in the site's signature style: left-aligned heading with a
 * burgundy→green underline bar and a gray sub-line. `dark` kept for API
 * compatibility — the whole theme is dark now.
 */
export default function SectionHeading({
  eyebrow,
  title,
  description,
  align = "left",
}: {
  eyebrow?: string;
  title: string;
  description?: string;
  align?: "center" | "left";
  /** Deprecated: the whole theme is dark now. Accepted for compatibility. */
  dark?: boolean;
}) {
  const centered = align === "center";
  return (
    <Reveal className={`max-w-3xl ${centered ? "mx-auto text-center" : "text-left"}`}>
      {eyebrow && <p className="micro-label mb-3">{eyebrow}</p>}
      <h2 className="text-3xl font-semibold tracking-tight text-balance text-white sm:text-4xl lg:text-[2.8rem] lg:leading-[1.1]">
        {title}
      </h2>
      <div
        className={`accent-bar mt-5 w-24 ${centered ? "mx-auto" : ""}`}
        aria-hidden="true"
      />
      {description && (
        <p className="mt-5 text-base leading-relaxed text-pretty text-mist sm:text-lg">
          {description}
        </p>
      )}
    </Reveal>
  );
}
