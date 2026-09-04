import { Fragment, useEffect, useRef, useState } from "react";
import { ArrowUpRight, CtaLink, PlatformMark, ServiceIcon } from "./Bits";
import { Reveal } from "./Reveal";
import { ScrollText } from "./ScrollText";
import { Magnetic, Scramble, Seal, Spotlight, useSpotlight } from "./Fx";

/* ---------------------------------- HERO --------------------------------- */

const heroCards = [
  { label: "ACCOUNT RECOVERY", stage: "Problem", rot: "-4deg", x: "-1rem", y: "0rem", z: 5 },
  { label: "DISABLED ACCOUNT", stage: "Review", rot: "-1.5deg", x: "0.75rem", y: "6.7rem", z: 4 },
  { label: "IMPERSONATION", stage: "Review", rot: "1.5deg", x: "2.5rem", y: "13.4rem", z: 3 },
  { label: "COPYRIGHT", stage: "Prepare", rot: "4deg", x: "4.25rem", y: "20.1rem", z: 2 },
  { label: "PLATFORM SUPPORT", stage: "Submit", rot: "7deg", x: "6rem", y: "26.8rem", z: 1 },
];

const flow = ["Problem", "Review", "Prepare", "Submit"];

const headline: { text: string; mark?: boolean; br?: boolean }[] = [
  { text: "When" },
  { text: "the" },
  { text: "platform", br: true },
  { text: "says" },
  { text: "no," },
  { text: "clarity", mark: true, br: true },
  { text: "matters." },
];

const rotating = ["account recovery", "disabled accounts", "impersonation", "copyright", "platform support"];

export function Hero() {
  const [ready, setReady] = useState(false);
  const [tilt, setTilt] = useState({ x: 0, y: 0 });
  const [active, setActive] = useState(0);
  const [word, setWord] = useState(0);
  const stackRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const id = window.setTimeout(() => setReady(true), 80);
    return () => window.clearTimeout(id);
  }, []);

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const a = window.setInterval(() => setActive((v) => (v + 1) % heroCards.length), 2200);
    const b = window.setInterval(() => setWord((v) => (v + 1) % rotating.length), 2400);
    return () => {
      window.clearInterval(a);
      window.clearInterval(b);
    };
  }, []);


  useEffect(() => {
    const el = stackRef.current;
    if (!el) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    if (window.matchMedia("(pointer: coarse)").matches) return;

    const onMove = (e: PointerEvent) => {
      const r = el.getBoundingClientRect();
      setTilt({
        x: ((e.clientX - (r.left + r.width / 2)) / r.width) * 2,
        y: ((e.clientY - (r.top + r.height / 2)) / r.height) * 2,
      });
    };
    const onLeave = () => setTilt({ x: 0, y: 0 });

    el.addEventListener("pointermove", onMove);
    el.addEventListener("pointerleave", onLeave);
    return () => {
      el.removeEventListener("pointermove", onMove);
      el.removeEventListener("pointerleave", onLeave);
    };
  }, []);

  return (
    <section id="top" className="relative overflow-hidden pt-10 pb-20 md:pt-16 md:pb-28">
      <span className="glow-accent float-slow -top-40 -left-32 h-[26rem] w-[26rem] opacity-40" />
      <span className="glow-accent top-24 right-[-10rem] h-[22rem] w-[22rem] opacity-25" />

      <div className="shell relative">
        <div className="grid gap-14 lg:grid-cols-12 lg:gap-8">
          <div className="lg:col-span-7">
            <Reveal>
              <span className="inline-flex items-center gap-3 rounded-full border border-rule bg-card px-2 py-1.5 pr-4">
                <span className="rounded-full bg-ink px-2.5 py-1 text-[0.65rem] font-bold tracking-[0.12em] text-paper">
                  2026
                </span>
                <span className="text-xs font-medium tracking-[0.06em] text-muted-foreground">
                  Independent digital case assistance
                </span>
              </span>
            </Reveal>

            <h1 className="display mt-8 text-[clamp(2.9rem,8.4vw,6.6rem)]" data-shown={ready}>
              {headline.map((w, i) => (
                <Fragment key={w.text}>
                  <span className="word-rise mr-[0.22em]">
                    <span
                      style={{ transitionDelay: `${120 + i * 90}ms` }}
                      className={w.mark ? "mark-highlight italic" : ""}
                    >
                      {w.text}
                    </span>
                  </span>
                  {w.br && <br />}
                </Fragment>
              ))}
            </h1>

            <Reveal delay={160}>
              <p className="mt-9 max-w-lg text-lg leading-relaxed text-muted-foreground">
                WinsAble helps you navigate difficult digital platform cases with a clear, organized
                and legitimate process.
              </p>
            </Reveal>

            <Reveal delay={190}>
              <p className="mt-6 flex items-center gap-2 text-sm font-medium tracking-[0.04em] text-muted-foreground">
                <span className="inline-block size-1.5 rounded-full bg-accent" aria-hidden="true" />
                Assisting with
                <span className="relative inline-grid h-5 overflow-hidden align-middle">
                  {rotating.map((r, i) => (
                    <span
                      key={r}
                      className="col-start-1 row-start-1 block whitespace-nowrap text-ink transition-[transform,opacity] duration-500 ease-[cubic-bezier(0.16,1,0.3,1)]"
                      style={{
                        transform: `translateY(${(i - word) * 100}%)`,
                        opacity: i === word ? 1 : 0,
                      }}
                    >
                      {r}
                    </span>
                  ))}
                </span>
              </p>
            </Reveal>



            <Reveal delay={220}>
              <div className="mt-10 flex flex-wrap items-center gap-3">
                <CtaLink href="#start">Start a Case</CtaLink>
                <CtaLink href="#services" variant="outline">
                  Explore Services
                </CtaLink>
              </div>
            </Reveal>

            <Reveal delay={280}>
              <ol className="mt-14 flex flex-wrap items-center gap-x-5 gap-y-3 border-t border-rule pt-6">
                {flow.map((f, i) => (
                  <li key={f} className="flex items-center gap-5">
                    <span className="flex items-baseline gap-2">
                      <span className="text-[0.65rem] font-bold tracking-[0.16em] text-accent">
                        0{i + 1}
                      </span>
                      <span className="text-sm font-medium">{f}</span>
                    </span>
                    {i < flow.length - 1 && (
                      <span
                        className="line-draw h-px w-6 bg-rule sm:w-10"
                        style={{ animationDelay: `${700 + i * 180}ms` }}
                      />
                    )}
                  </li>
                ))}
              </ol>
            </Reveal>

            <div className="mt-12 flex items-center gap-3 text-[10px] font-semibold tracking-[0.28em] text-muted-foreground uppercase">
              <span className="scroll-cue relative block h-8 w-px bg-rule" aria-hidden="true" />
              Scroll
            </div>
          </div>

          {/* Fanned case-card composition */}
          <div className="lg:col-span-5">
            <div
              ref={stackRef}
              className="group relative h-[38rem] sm:h-[39rem]"
              style={{ perspective: "1200px" }}
            >
              {heroCards.map((c, i) => {
                const depth = (heroCards.length - i) / heroCards.length;
                return (
                  <div
                    key={c.label}
                    className="absolute top-0 left-0 w-[76%] max-w-[17.5rem] rounded-xl border border-rule bg-card p-5 shadow-[0_18px_40px_-28px_oklch(0.2_0.02_60/0.45)] transition-[transform,opacity,box-shadow,border-color] duration-[900ms] ease-[cubic-bezier(0.16,1,0.3,1)] hover:z-10 hover:shadow-[0_28px_60px_-30px_oklch(0.2_0.02_60/0.55)] sm:w-[72%]"
                    style={{
                      zIndex: c.z,
                      opacity: ready ? 1 : 0,
                      transitionDelay: `${240 + i * 110}ms`,
                      borderColor: active === i ? "var(--accent)" : undefined,
                      transform: ready
                        ? `translate(calc(${c.x} + ${tilt.x * depth * 14}px), calc(${c.y} + ${tilt.y * depth * 10}px)) rotate(${c.rot}) scale(${active === i ? 1.035 : 1})`
                        : `translate(${c.x}, calc(${c.y} + 2.5rem)) rotate(0deg) scale(0.96)`,
                    }}
                  >
                    <div className="flex items-start justify-between gap-4">
                      <span className="text-[0.65rem] font-bold tracking-[0.16em] text-muted-foreground">
                        CASE {String(i + 1).padStart(2, "0")}
                      </span>
                      <span className={`rounded-full border px-2 py-0.5 text-[0.6rem] font-semibold tracking-[0.12em] text-accent transition-colors duration-500 ${active === i ? "border-accent bg-accent/10" : "border-rule"}`}>
                        {c.stage.toUpperCase()}
                      </span>
                    </div>
                    <p className="display mt-6 text-xl leading-tight sm:text-2xl">{c.label}</p>
                    <div className="mt-5 flex items-center justify-between border-t border-rule pt-4">
                      <span className="flex gap-1.5" aria-hidden="true">
                        {[0, 1, 2, 3].map((d) => (
                          <span
                            key={d}
                            className={`h-1 w-6 rounded-full transition-colors duration-700 ${d <= i % 4 ? "bg-accent" : "bg-rule"}`}
                            style={{ transitionDelay: `${600 + d * 120}ms` }}
                          />
                        ))}
                      </span>
                      <ArrowUpRight className="size-3.5 text-muted-foreground" />
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}


/* ----------------------------- PLATFORM STRIP ---------------------------- */

const platforms = ["Instagram", "Facebook", "TikTok", "YouTube", "X"];

export function PlatformStrip() {
  const row = [...platforms, ...platforms, ...platforms, ...platforms];
  return (
    <section className="border-y border-rule bg-paper-deep/50 py-6">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:gap-6">
        <span className="eyebrow shrink-0 pl-6 md:pl-12 xl:pl-22">Platforms we work with</span>
        <div
          className="relative min-w-0 flex-1 overflow-hidden sm:ml-6"
          style={{
            maskImage: "linear-gradient(to right, transparent, black 2rem, black 88%, transparent)",
          }}
        >
          <div className="marquee-track gap-12">
            {[0, 1].map((dup) => (
              <div key={dup} className="flex shrink-0 items-center gap-12 pr-12" aria-hidden={dup === 1}>
                {row.map((p, i) => (
                  <span
                    key={`${dup}-${p}-${i}`}
                    className="flex items-center gap-2.5 whitespace-nowrap text-ink/45 transition-colors duration-300 hover:text-ink"
                  >
                    <PlatformMark name={p} className="size-5" />
                    <span className="text-lg font-medium">{p}</span>
                  </span>
                ))}
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

/* -------------------------------- SERVICES ------------------------------- */

const services = [
  {
    n: "01",
    title: "Account Recovery",
    icon: "recovery",
    body: "Lost access to an account you own? We organize your details and ownership evidence into a clear recovery request.",
    tags: ["Ownership evidence", "Login history", "Recovery form"],
    span: "lg:col-span-7 lg:row-span-2",
    big: true,
  },
  {
    n: "02",
    title: "Disabled Accounts",
    icon: "disabled",
    body: "Understand what a disablement usually relates to, and prepare a structured appeal through the right channel.",
    tags: ["Appeal draft", "Policy context"],
    span: "lg:col-span-5",
  },
  {
    n: "03",
    title: "Impersonation",
    icon: "impersonation",
    body: "Document accounts pretending to be you and prepare the appropriate impersonation report.",
    tags: ["Identity proof", "Report pack"],
    span: "lg:col-span-5",
  },
  {
    n: "04",
    title: "Copyright Assistance",
    icon: "copyright",
    body: "Organize ownership details for copyright-related requests so nothing essential is missing.",
    tags: ["Original files", "Rights summary"],
    span: "lg:col-span-6",
  },
  {
    n: "05",
    title: "Platform Support",
    icon: "support",
    body: "General guidance on reaching platform support with a request that is clear and complete.",
    tags: ["Right channel", "Clear summary"],
    span: "lg:col-span-6",
  },
];

export function Services() {
  return (
    <section id="services" className="shell py-24 md:py-36">
      <div className="grid gap-8 border-b border-rule pb-12 lg:grid-cols-12">
        <Reveal className="lg:col-span-6">
          <p className="eyebrow">Our Services</p>
          <h2 className="display mt-6 text-[clamp(2.4rem,5.4vw,4.5rem)]">
            How We Can{" "}
            <span className="relative inline-block">
              <span className="relative z-10">Help</span>
              <span
                aria-hidden="true"
                className="absolute inset-x-0 bottom-[0.12em] z-0 h-[0.28em] origin-left bg-accent/25"
              />
            </span>
          </h2>
        </Reveal>
        <Reveal delay={100} className="lg:col-span-5 lg:col-start-8 lg:self-end">
          <p className="text-base leading-relaxed text-muted-foreground">
            Five focused areas. Each one starts the same way — with the facts written down clearly
            and the request prepared properly.
          </p>
          <p className="mt-5 flex flex-wrap items-center gap-x-3 gap-y-2 text-xs font-semibold tracking-[0.16em] text-ink/45 uppercase">
            <span>Organize</span>
            <span className="h-px w-5 bg-rule" />
            <span>Prepare</span>
            <span className="h-px w-5 bg-rule" />
            <span>Submit</span>
          </p>
        </Reveal>
      </div>

      <div className="mt-12 grid auto-rows-min gap-4 lg:grid-cols-12">
        {services.map((s, i) => (
          <Reveal key={s.n} delay={i * 70} className={s.span}>
            <ServiceCard s={s} />
          </Reveal>
        ))}
      </div>
    </section>
  );
}

function ServiceCard({ s }: { s: (typeof services)[number] }) {
  const spot = useSpotlight();

  return (
    <article
      onPointerMove={spot.onPointerMove}
      style={spot.style}
      className={`group relative flex h-full flex-col justify-between overflow-hidden rounded-xl border border-rule bg-card p-7 transition-all duration-500 hover:-translate-y-1.5 hover:border-ink/25 hover:shadow-[0_34px_70px_-42px_oklch(0.2_0.02_60/0.55)] ${
        s.big ? "md:p-10" : ""
      }`}
    >
      {/* cursor spotlight */}
      <Spotlight />
      {/* top hairline sweep */}
      <span
        aria-hidden="true"
        className="pointer-events-none absolute inset-x-0 top-0 z-10 h-px origin-left scale-x-0 bg-accent transition-transform duration-700 ease-out group-hover:scale-x-100"
      />
      <span
        aria-hidden="true"
        className={`display pointer-events-none absolute -right-2 -bottom-6 leading-none text-ink/[0.045] transition-all duration-700 group-hover:-translate-y-1 group-hover:text-accent/15 ${
          s.big ? "text-[13rem]" : "text-[9rem]"
        }`}
      >
        {s.n}
      </span>
      <div className="relative z-10 flex items-start justify-between gap-6">
        <span className="flex items-center gap-2 text-xs font-semibold tracking-[0.18em] text-accent">
          {s.n}
          <span className="h-px w-6 bg-accent/40 transition-all duration-500 group-hover:w-12" />
        </span>
        <span className="flex size-10 items-center justify-center rounded-full border border-rule transition-all duration-500 group-hover:rotate-12 group-hover:border-accent/40 group-hover:bg-accent/10">
          <ServiceIcon
            name={s.icon}
            className="size-5 shrink-0 text-ink/40 transition-all duration-500 group-hover:-rotate-6 group-hover:text-accent"
          />
        </span>
      </div>
      <div className={`relative z-10 ${s.big ? "mt-20 md:mt-28" : "mt-14"}`}>
        <h3 className={`display ${s.big ? "text-4xl md:text-5xl" : "text-2xl md:text-3xl"}`}>
          {s.title}
        </h3>
        <p
          className={`mt-4 leading-relaxed text-muted-foreground ${s.big ? "max-w-md text-base" : "text-sm"}`}
        >
          {s.body}
        </p>
        <ul className="mt-5 flex flex-wrap gap-2">
          {s.tags.map((t) => (
            <li
              key={t}
              className="rounded-full border border-rule px-3 py-1 text-[0.68rem] font-medium tracking-[0.08em] text-ink/55 uppercase transition-colors duration-500 group-hover:border-accent/30 group-hover:text-ink/75"
            >
              {t}
            </li>
          ))}
        </ul>
        <span className="mt-7 inline-flex items-center gap-2 text-sm font-semibold">
          <span className="link-underline">Start here</span>
          <ArrowUpRight className="size-3.5 transition-transform duration-300 group-hover:translate-x-1 group-hover:-translate-y-1" />
        </span>
      </div>
    </article>
  );
}



/* ------------------------------- TEXT BAND -------------------------------- */

const bandWords = [
  "Organize the facts",
  "Prepare the request",
  "Submit properly",
  "Stay informed",
];

export function TextBand() {
  const row = [...bandWords, ...bandWords, ...bandWords];
  return (
    <section aria-hidden="true" className="grain overflow-hidden border-y border-rule bg-ink py-7">
      <div className="band-marquee">
        {[0, 1].map((dup) => (
          <div key={dup} className="flex shrink-0 items-center">
            {row.map((w, i) => (
              <span
                key={`${dup}-${w}-${i}`}
                className="display flex items-center gap-8 px-8 text-3xl whitespace-nowrap text-paper md:text-5xl"
              >
                {w}
                <span className="text-accent">✳</span>
              </span>
            ))}
          </div>
        ))}
      </div>
    </section>
  );
}

/* ------------------------------ HOW IT WORKS ----------------------------- */

const steps = [
  { n: "01", title: "Tell Us What Happened", body: "Share the situation in your own words." },
  { n: "02", title: "We Organize the Details", body: "Facts, dates and evidence in one place." },
  { n: "03", title: "Prepare the Appropriate Request", body: "Written clearly, without exaggeration." },
  { n: "04", title: "Submit Through the Relevant Channel", body: "The official route for your case type." },
  { n: "05", title: "Receive Your Case Reference", body: "So you always know where things stand." },
];

export function Process() {
  return (
    <section id="process" className="border-b border-rule bg-paper-deep/40 py-24 md:py-36">
      <div className="shell">
        <div className="grid gap-8 lg:grid-cols-12">
          <Reveal className="lg:col-span-7">
            <p className="eyebrow">The Process</p>
            <h2 className="display mt-6 max-w-3xl text-[clamp(2.4rem,5.4vw,4.5rem)]">
              From confusion to a <span className="italic text-accent">clear case.</span>
            </h2>
          </Reveal>
          <Reveal delay={100} className="lg:col-span-4 lg:col-start-9 lg:self-end">
            <p className="text-base leading-relaxed text-muted-foreground">
              Five steps, always in the same order. No shortcuts and no guessing.
            </p>
          </Reveal>
        </div>

        <div className="relative mt-16">
          <span aria-hidden="true" className="absolute top-0 left-0 hidden h-px w-full bg-rule lg:block" />
          <ol className="grid gap-px lg:grid-cols-5">
            {steps.map((s, i) => (
              <Reveal as="li" key={s.n} delay={i * 80} className="group relative">
                <div className="h-full border-b border-rule pt-8 pb-10 lg:border-b-0 lg:border-r lg:pr-6 lg:last:border-r-0">
                  <span
                    aria-hidden="true"
                    className="absolute -top-[5px] left-0 hidden size-[9px] rounded-full border border-rule bg-paper transition-colors duration-300 group-hover:border-accent group-hover:bg-accent lg:block"
                  />
                  <span className="text-xs font-semibold tracking-[0.18em] text-accent">{s.n}</span>
                  <h3 className="display mt-6 text-2xl leading-tight">{s.title}</h3>
                  <p className="mt-3 text-sm leading-relaxed text-muted-foreground">{s.body}</p>
                  <span className="mt-6 block h-px w-full bg-rule">
                    <span className="block h-px w-0 bg-accent transition-all duration-500 group-hover:w-full" />
                  </span>
                </div>
              </Reveal>
            ))}
          </ol>
        </div>
      </div>
    </section>
  );
}

/* ----------------------------- FEATURED CASE ----------------------------- */

export function FeaturedScenario() {
  return (
    <section className="shell py-24 md:py-36">
      <div className="grid gap-12 lg:grid-cols-12">
        <Reveal className="lg:col-span-4">
          <p className="eyebrow">Example scenario</p>
          <h2 className="display mt-6 text-[clamp(2.2rem,4.6vw,3.6rem)]">Account access issue</h2>
          <p className="mt-6 text-sm leading-relaxed text-muted-foreground">
            An illustrative example of how a case is structured. Not a client record.
          </p>

          <div className="mt-10 rounded-xl border border-rule bg-card p-5">
            <div className="flex items-center gap-2">
              <span className="size-2 rounded-full bg-accent" />
              <span className="text-[0.65rem] font-bold tracking-[0.16em] text-muted-foreground">
                PLATFORM NOTICE (EXAMPLE)
              </span>
            </div>
            <p className="mt-4 text-sm leading-relaxed">
              "We couldn't verify your identity. Your account access is currently restricted."
            </p>
            <div className="mt-5 flex items-center justify-between border-t border-rule pt-4 text-xs text-muted-foreground">
              <span>Ref · WA-0000-EXAMPLE</span>
              <span>Illustrative only</span>
            </div>
          </div>
        </Reveal>

        <div className="grid gap-4 lg:col-span-8 sm:grid-cols-3">
          {[
            {
              k: "Situation",
              v: "A creator can no longer log in. Recovery emails are not arriving and the account shows a restriction notice.",
            },
            {
              k: "What WinsAble does",
              v: "We collect ownership details, previous login context and the exact notice text, then prepare the matching request.",
            },
            {
              k: "Next step",
              v: "The request is submitted through the platform's official channel and you receive a case reference to follow.",
            },
          ].map((c, i) => (
            <Reveal key={c.k} delay={i * 90}>
              <div className="group flex h-full flex-col rounded-xl border border-rule bg-card p-7 transition-all duration-500 hover:-translate-y-1 hover:border-ink/25">
                <span className="eyebrow">{c.k}</span>
                <span className="mt-4 block h-px w-10 bg-accent transition-all duration-500 group-hover:w-20" />
                <p className="mt-6 text-base leading-relaxed">{c.v}</p>
                <span className="mt-auto pt-8 text-xs text-muted-foreground">
                  {String(i + 1).padStart(2, "0")} / 03
                </span>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ---------------------------- BRAND PHILOSOPHY --------------------------- */

const principles = [
  "Organize the facts.",
  "Prepare the request.",
  "Make the process easier to understand.",
  "The platform makes the final decision.",
];

export function Philosophy() {
  return (
    <section className="grain relative overflow-hidden border-t border-rule bg-ink py-28 text-paper md:py-44">
      <span className="glow-accent -bottom-32 left-1/3 h-[24rem] w-[24rem] opacity-30" />
      <div className="shell relative z-1">
        <Reveal>
          <p className="eyebrow text-paper/50">Our Position</p>
          <h2 className="display mt-10 text-[clamp(3rem,11vw,9rem)] leading-[0.9]">
            Clarity before{" "}
            <span className="italic text-accent">
              <Scramble text="claims." />
            </span>
          </h2>
        </Reveal>
        <div className="mt-20 grid gap-14 lg:grid-cols-12">
          <Reveal delay={100} className="lg:col-span-5">
            <ScrollText
              className="text-lg leading-relaxed text-paper"
              dim={0.22}
              text="People dealing with difficult account situations deserve clear information rather than exaggerated promises."
            />
          </Reveal>
          <ol className="lg:col-span-6 lg:col-start-7">
            {principles.map((p, i) => (
              <Reveal as="li" key={p} delay={i * 90}>
                <div className="group flex items-baseline gap-6 border-t border-paper/15 py-6 transition-colors duration-300 hover:border-accent">
                  <span className="text-xs font-semibold tracking-[0.18em] text-paper/40 transition-colors duration-300 group-hover:text-accent">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <span className="display text-2xl md:text-3xl">{p}</span>
                </div>
              </Reveal>
            ))}
          </ol>
        </div>
      </div>
    </section>
  );
}

/* ---------------------------------- ABOUT -------------------------------- */

export function About() {
  return (
    <section id="about" className="shell py-24 md:py-36">
      <div className="grid gap-14 lg:grid-cols-12">
        <Reveal className="lg:col-span-6">
          <p className="eyebrow">About</p>
          <ScrollText
            as="h2"
            className="display mt-8 text-[clamp(2.3rem,5.2vw,4.4rem)]"
            dim={0.14}
            text="Digital problems are confusing enough. The process shouldn't be."
          />
        </Reveal>
        <Reveal delay={120} className="lg:col-span-5 lg:col-start-8 lg:self-end">
          <div className="space-y-6 text-base leading-relaxed text-muted-foreground">
            <p>
              WinsAble is an independent service for people facing difficult situations on digital
              platforms — recovery, disablements, impersonation, copyright and support requests.
            </p>
            <p>
              We don't promise outcomes. We organize what happened, prepare the appropriate request,
              submit it through the relevant channel and keep you informed with a case reference.
            </p>
            <p className="text-ink">A small team. A clear method. Nothing exaggerated.</p>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

/* ----------------------------------- FAQ --------------------------------- */

const faqs = [
  {
    q: "Can you guarantee my account comes back?",
    a: "No. The platform makes every final decision. What we can do is make sure your request is complete, accurate and sent through the right channel.",
  },
  {
    q: "Which situations do you work on?",
    a: "Account recovery, disabled accounts, impersonation, copyright assistance and general platform support requests.",
  },
  {
    q: "What do you need from me to start?",
    a: "Your description of what happened, any notice text you received, and details that show the account belongs to you.",
  },
  {
    q: "How do I follow my case?",
    a: "Once the request is submitted you receive a case reference, so you always know which stage your case is at.",
  },
];

export function Faq() {
  const [open, setOpen] = useState<number | null>(0);
  return (
    <section id="faq" className="border-y border-rule bg-paper-deep/40 py-24 md:py-32">
      <div className="shell grid gap-12 lg:grid-cols-12">
        <Reveal className="lg:col-span-4">
          <p className="eyebrow">Questions</p>
          <h2 className="display mt-6 text-[clamp(2.2rem,4.6vw,3.6rem)]">Straight answers.</h2>
        </Reveal>
        <div className="lg:col-span-7 lg:col-start-6">
          {faqs.map((f, i) => {
            const isOpen = open === i;
            return (
              <Reveal key={f.q} delay={i * 70}>
                <div className="border-t border-rule last:border-b">
                  <button
                    type="button"
                    onClick={() => setOpen(isOpen ? null : i)}
                    aria-expanded={isOpen}
                    className="group flex w-full items-start justify-between gap-6 py-6 text-left"
                  >
                    <span className="display text-xl leading-snug md:text-2xl">{f.q}</span>
                    <span
                      className={`mt-1 grid size-8 shrink-0 place-items-center rounded-full border transition-all duration-300 ${
                        isOpen ? "rotate-45 border-accent bg-accent text-accent-foreground" : "border-rule text-ink"
                      }`}
                      aria-hidden="true"
                    >
                      <svg viewBox="0 0 16 16" className="size-3.5" fill="none">
                        <path d="M8 3v10M3 8h10" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" />
                      </svg>
                    </span>
                  </button>
                  <div
                    className="overflow-hidden transition-all duration-500 ease-[cubic-bezier(0.22,1,0.36,1)]"
                    style={{ maxHeight: isOpen ? "16rem" : "0px", opacity: isOpen ? 1 : 0 }}
                  >
                    <p className="max-w-xl pb-7 text-base leading-relaxed text-muted-foreground">
                      {f.a}
                    </p>
                  </div>
                </div>
              </Reveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}

/* -------------------------------- FINAL CTA ------------------------------- */

export function FinalCta() {
  return (
    <section id="start" className="relative overflow-hidden py-28 md:py-40">
      <span className="glow-accent top-1/2 left-1/2 h-[30rem] w-[30rem] -translate-x-1/2 -translate-y-1/2 opacity-30" />
      <div className="shell relative text-center">
        <Reveal>
          <p className="eyebrow">Start here</p>
          <h2 className="display mx-auto mt-8 max-w-4xl text-[clamp(2.7rem,9vw,7rem)]">
            Make your next step{" "}
            <span className="mark-highlight italic">
              <Scramble text="clear." />
            </span>
          </h2>
        </Reveal>
        <Reveal delay={100}>
          <p className="mx-auto mt-8 max-w-md text-lg text-muted-foreground">
            Start with a clear case and a structured process.
          </p>
        </Reveal>
        <Reveal delay={160}>
          <div className="relative mt-12 flex justify-center">
            <Seal className="absolute -top-16 right-2 size-28 text-ink/25 md:right-16 md:size-32" />
            <Magnetic strength={0.28}>
              <CtaLink href="mailto:hello@winsable.com" variant="solid" className="px-8 py-4 text-base">
                Start a Case
              </CtaLink>
            </Magnetic>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

/* --------------------------------- FOOTER -------------------------------- */

export function Footer() {
  return (
    <footer className="border-t border-rule">
      <div className="shell py-16">
        <div className="grid gap-10 md:grid-cols-12">
          <div className="md:col-span-5">
            <p className="display text-3xl">
              WinsAble<span className="text-accent">.</span>
            </p>
            <p className="mt-4 max-w-xs text-sm leading-relaxed text-muted-foreground">
              Independent assistance for difficult digital platform cases.
            </p>
          </div>
          <nav className="md:col-span-4 md:col-start-7" aria-label="Footer">
            <p className="eyebrow">Navigate</p>
            <ul className="mt-5 grid grid-cols-2 gap-3 text-sm">
              {[
                ["Services", "#services"],
                ["How It Works", "#process"],
                ["About", "#about"],
                ["FAQ", "#faq"],
                ["Contact", "mailto:hello@winsable.com"],
              ].map(([label, href]) => (
                <li key={label}>
                  <a href={href} className="link-underline text-muted-foreground transition-colors hover:text-ink">
                    {label}
                  </a>
                </li>
              ))}
            </ul>
          </nav>
          <div className="md:col-span-2">
            <p className="eyebrow">Social</p>
            <a
              href="https://instagram.com"
              className="group mt-5 inline-flex items-center gap-2 text-sm text-muted-foreground transition-colors hover:text-ink"
            >
              Instagram
              <ArrowUpRight className="size-3 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
            </a>
          </div>
        </div>
        <div className="mt-14 flex flex-wrap items-center justify-between gap-3 border-t border-rule pt-6 text-xs text-muted-foreground">
          <span>© {new Date().getFullYear()} WinsAble. All rights reserved.</span>
          <span className="hidden sm:inline">Final decisions rest with the platform.</span>
          <a
            href="#top"
            className="group inline-flex items-center gap-2 uppercase tracking-[0.2em] transition-colors hover:text-ink"
          >
            Back to top
            <span className="inline-block transition-transform duration-300 group-hover:-translate-y-0.5">↑</span>
          </a>
        </div>

      </div>
    </footer>
  );
}
