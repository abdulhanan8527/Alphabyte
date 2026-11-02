import type { VisualKind } from "@/lib/projects";

/**
 * Abstract wireframe device mockups used as portfolio placeholders.
 * Per the brand brief, approved real screenshots must replace these before launch.
 */

function SkeletonLine({ w = "w-full", tone = "bg-charcoal/10" }: { w?: string; tone?: string }) {
  return <div className={`h-2 rounded-full ${tone} ${w}`} />;
}

function BrowserChrome({ children }: { children: React.ReactNode }) {
  return (
    <div className="overflow-hidden rounded-xl border border-charcoal/10 bg-white shadow-lift">
      <div className="flex items-center gap-1.5 border-b border-charcoal/8 bg-[#eef1ee] px-4 py-2.5">
        <span className="h-2.5 w-2.5 rounded-full bg-burgundy/70" />
        <span className="h-2.5 w-2.5 rounded-full bg-charcoal/15" />
        <span className="h-2.5 w-2.5 rounded-full bg-brand/60" />
        <div className="ml-3 h-4 flex-1 rounded-md bg-charcoal/6" />
      </div>
      <div className="p-4 sm:p-5">{children}</div>
    </div>
  );
}

function PhoneFrame({ children }: { children: React.ReactNode }) {
  return (
    <div className="mx-auto w-44 overflow-hidden rounded-[1.75rem] border-[6px] border-charcoal bg-white shadow-lift sm:w-52">
      <div className="flex justify-center bg-charcoal py-1.5">
        <span className="h-1 w-10 rounded-full bg-white/30" />
      </div>
      <div className="space-y-3 p-4">{children}</div>
    </div>
  );
}

export default function ProjectVisual({
  kind,
  label,
}: {
  kind: VisualKind;
  label: string;
}) {
  return (
    <div
      role="img"
      aria-label={`${label} — interface preview placeholder`}
      className="bg-grid-pattern relative flex min-h-56 items-center justify-center overflow-hidden rounded-xl border border-white/10 bg-night-soft p-6 sm:min-h-64 sm:p-10"
    >
      {kind === "mobile" && (
        <PhoneFrame>
          <div className="h-14 rounded-lg bg-brand/15" />
          <SkeletonLine w="w-3/4" />
          <SkeletonLine />
          <div className="grid grid-cols-2 gap-2 pt-1">
            <div className="h-10 rounded-md bg-charcoal/8" />
            <div className="h-10 rounded-md bg-charcoal/8" />
          </div>
          <div className="h-7 rounded-md bg-brand/80" />
          <SkeletonLine w="w-2/3" />
        </PhoneFrame>
      )}

      {kind === "web" && (
        <div className="w-full max-w-md">
          <BrowserChrome>
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <SkeletonLine w="w-16" tone="bg-brand/60" />
                <div className="flex gap-2">
                  <SkeletonLine w="w-8" />
                  <SkeletonLine w="w-8" />
                  <SkeletonLine w="w-8" />
                </div>
              </div>
              <div className="rounded-lg bg-charcoal/90 p-4">
                <SkeletonLine w="w-2/3" tone="bg-white/40" />
                <div className="mt-2">
                  <SkeletonLine w="w-1/2" tone="bg-white/20" />
                </div>
                <div className="mt-3 h-6 w-24 rounded-md bg-brand" />
              </div>
              <div className="grid grid-cols-3 gap-2">
                <div className="h-12 rounded-md bg-charcoal/8" />
                <div className="h-12 rounded-md bg-charcoal/8" />
                <div className="h-12 rounded-md bg-charcoal/8" />
              </div>
            </div>
          </BrowserChrome>
        </div>
      )}

      {kind === "dashboard" && (
        <div className="w-full max-w-md">
          <BrowserChrome>
            <div className="flex gap-3">
              <div className="hidden w-16 space-y-2 sm:block">
                <SkeletonLine tone="bg-brand/60" />
                <SkeletonLine />
                <SkeletonLine />
                <SkeletonLine />
              </div>
              <div className="flex-1 space-y-3">
                <div className="grid grid-cols-3 gap-2">
                  <div className="h-10 rounded-md bg-brand/15" />
                  <div className="h-10 rounded-md bg-charcoal/8" />
                  <div className="h-10 rounded-md bg-burgundy/15" />
                </div>
                <div className="flex h-20 items-end gap-1.5 rounded-md bg-charcoal/5 p-2">
                  {[35, 55, 40, 70, 50, 80, 62].map((h, i) => (
                    <div
                      key={i}
                      style={{ height: `${h}%` }}
                      className={`flex-1 rounded-sm ${i % 2 ? "bg-brand/70" : "bg-brand/35"}`}
                    />
                  ))}
                </div>
                <SkeletonLine />
                <SkeletonLine w="w-5/6" />
              </div>
            </div>
          </BrowserChrome>
        </div>
      )}

      {kind === "crm" && (
        <div className="w-full max-w-md">
          <BrowserChrome>
            <div className="grid grid-cols-3 gap-2">
              {["bg-brand/20", "bg-charcoal/10", "bg-burgundy/15"].map((tone, col) => (
                <div key={col} className="space-y-2 rounded-md bg-charcoal/5 p-2">
                  <div className={`h-1.5 w-2/3 rounded-full ${tone}`} />
                  <div className="rounded bg-white p-2 shadow-sm">
                    <SkeletonLine w="w-4/5" />
                    <div className="mt-1.5">
                      <SkeletonLine w="w-1/2" />
                    </div>
                  </div>
                  {col < 2 && (
                    <div className="rounded bg-white p-2 shadow-sm">
                      <SkeletonLine w="w-3/5" />
                    </div>
                  )}
                </div>
              ))}
            </div>
          </BrowserChrome>
        </div>
      )}

      {kind === "ar" && (
        <PhoneFrame>
          <div className="relative flex h-40 items-center justify-center rounded-lg bg-charcoal/90 sm:h-48">
            {/* wireframe cube */}
            <svg viewBox="0 0 100 100" className="h-20 w-20 sm:h-24 sm:w-24" aria-hidden>
              <g fill="none" stroke="#16851D" strokeWidth="2">
                <path d="M30 35 L70 35 L70 75 L30 75 Z" />
                <path d="M42 23 L82 23 L82 63 L70 75 L70 35 L30 35 Z" stroke="#ffffff" strokeOpacity="0.55" />
                <path d="M30 35 L42 23 M70 35 L82 23 M70 75 L82 63" stroke="#ffffff" strokeOpacity="0.55" />
              </g>
              <circle cx="30" cy="35" r="3" fill="#16851D" />
              <circle cx="70" cy="75" r="3" fill="#16851D" />
              <circle cx="82" cy="23" r="3" fill="#A30D50" />
            </svg>
            <span className="absolute bottom-2 rounded-full bg-brand px-2 py-0.5 text-[9px] font-semibold text-white">
              View in your space
            </span>
          </div>
          <SkeletonLine w="w-2/3" />
          <SkeletonLine />
        </PhoneFrame>
      )}
    </div>
  );
}
