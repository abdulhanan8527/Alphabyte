import type { ReactNode } from "react";

/**
 * Infinite horizontal marquee. Children are rendered twice and the track
 * slides -50% forever; CSS pauses it on hover and fades the edges.
 */
export default function Marquee({
  children,
  slow = false,
  className = "",
}: {
  children: ReactNode;
  slow?: boolean;
  className?: string;
}) {
  return (
    <div className={`marquee-mask overflow-hidden ${className}`}>
      <div
        className={`marquee-track flex w-max ${
          slow ? "animate-marquee-slow" : "animate-marquee"
        }`}
      >
        <div className="flex shrink-0 items-stretch">{children}</div>
        <div className="flex shrink-0 items-stretch" aria-hidden="true">
          {children}
        </div>
      </div>
    </div>
  );
}
