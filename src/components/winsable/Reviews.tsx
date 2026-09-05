import calmPhone from "@/assets/calm-phone.webp.asset.json";
import calmDesk from "@/assets/calm-desk.webp.asset.json";
import { Reveal } from "./Reveal";

/**
 * Replace these with real, verified client reviews before going live.
 * Keep them factual — no guarantees, percentages or invented results.
 */
const reviews = [
  {
    quote:
      "The process was explained step by step, so I finally understood what was actually being submitted and why.",
    name: "A. M.",
    role: "Creator, Instagram case",
  },
  {
    quote:
      "No exaggerated promises. Just an organised summary of my situation and a clear next step.",
    name: "R. K.",
    role: "Small business owner",
  },
  {
    quote:
      "They kept everything documented and easy to follow, which made a stressful week much calmer.",
    name: "S. D.",
    role: "Photographer, copyright case",
  },
  {
    quote:
      "Straightforward communication and a proper case reference at the end. That was all I needed.",
    name: "T. N.",
    role: "YouTube channel owner",
  },
];

function Stars() {
  return (
    <span className="flex gap-0.5 text-accent" aria-label="5 out of 5">
      {[0, 1, 2, 3, 4].map((i) => (
        <svg key={i} viewBox="0 0 20 20" className="size-3.5 fill-current" aria-hidden="true">
          <path d="M10 1.6l2.5 5.3 5.6.8-4 4 1 5.7L10 14.7 4.9 17.4l1-5.7-4-4 5.6-.8z" />
        </svg>
      ))}
    </span>
  );
}

export function Reviews() {
  return (
    <section id="reviews" className="relative overflow-hidden border-t border-rule py-20 md:py-28">
      <div className="shell">
        <div className="grid gap-12 lg:grid-cols-12 lg:gap-10">
          <div className="lg:col-span-5">
            <Reveal>
              <span className="text-[0.65rem] font-bold tracking-[0.28em] text-accent uppercase">
                Reviews
              </span>
              <h2 className="display mt-5 text-[clamp(2.2rem,4.6vw,3.6rem)] leading-[1.02]">
                Calm words from
                <br />
                calmer cases.
              </h2>
              <p className="mt-6 max-w-sm text-muted-foreground">
                People come to WinsAble confused and stuck. What they take away is a clear,
                documented process — not a promise about the platform&apos;s decision.
              </p>
            </Reveal>

            <Reveal delay={140}>
              <div className="mt-10 grid grid-cols-2 gap-4">
                <img
                  src={calmPhone.url}
                  alt="Person reviewing a platform notification on their phone"
                  width={700}
                  height={875}
                  loading="lazy"
                  decoding="async"
                  className="h-56 w-full rounded-xl border border-rule object-cover transition-transform duration-700 ease-out hover:scale-[1.02] sm:h-64"
                />
                <img
                  src={calmDesk.url}
                  alt="Quiet desk with a notebook where case details are organised"
                  width={900}
                  height={675}
                  loading="lazy"
                  decoding="async"
                  className="mt-8 h-56 w-full rounded-xl border border-rule object-cover transition-transform duration-700 ease-out hover:scale-[1.02] sm:h-64"
                />
              </div>
            </Reveal>
          </div>

          <div className="lg:col-span-7">
            <div className="grid gap-4 sm:grid-cols-2">
              {reviews.map((r, i) => (
                <Reveal key={r.name} delay={80 * i}>
                  <figure
                    className={`group flex h-full flex-col justify-between rounded-xl border border-rule bg-card p-6 transition-[transform,box-shadow,border-color] duration-500 hover:-translate-y-1 hover:border-accent/50 hover:shadow-[0_28px_60px_-40px_oklch(0.2_0.02_60/0.6)] ${
                      i % 2 === 1 ? "sm:mt-8" : ""
                    }`}
                  >
                    <div>
                      <Stars />
                      <blockquote className="mt-5 text-[1.05rem] leading-relaxed text-ink">
                        &ldquo;{r.quote}&rdquo;
                      </blockquote>
                    </div>
                    <figcaption className="mt-7 flex items-center gap-3 border-t border-rule pt-5">
                      <span className="grid size-9 shrink-0 place-items-center rounded-full border border-rule text-[0.7rem] font-bold tracking-[0.06em] text-muted-foreground transition-colors duration-500 group-hover:border-accent group-hover:text-accent">
                        {r.name.replace(/[^A-Z]/g, "").slice(0, 2)}
                      </span>
                      <span className="leading-tight">
                        <span className="block text-sm font-semibold">{r.name}</span>
                        <span className="block text-xs text-muted-foreground">{r.role}</span>
                      </span>
                    </figcaption>
                  </figure>
                </Reveal>
              ))}
            </div>

            <Reveal delay={320}>
              <p className="mt-8 text-xs text-muted-foreground">
                Reviews are shared with permission and shortened for clarity. WinsAble does not
                guarantee any platform outcome.
              </p>
            </Reveal>
          </div>
        </div>
      </div>
    </section>
  );
}
