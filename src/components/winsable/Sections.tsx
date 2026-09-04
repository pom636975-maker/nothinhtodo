import { ArrowUpRight, CtaLink, ServiceIcon } from "./Bits";
import { Reveal } from "./Reveal";

/* ---------------------------------- HERO --------------------------------- */

const heroCards = [
  { label: "ACCOUNT RECOVERY", stage: "Problem", offset: "md:translate-x-0" },
  { label: "DISABLED ACCOUNT", stage: "Review", offset: "md:translate-x-6" },
  { label: "IMPERSONATION", stage: "Prepare", offset: "md:translate-x-2" },
  { label: "COPYRIGHT", stage: "Prepare", offset: "md:translate-x-10" },
  { label: "PLATFORM SUPPORT", stage: "Submit", offset: "md:translate-x-4" },
];

export function Hero() {
  return (
    <section id="top" className="shell pt-14 pb-24 md:pt-24 md:pb-32">
      <div className="grid gap-16 lg:grid-cols-12 lg:gap-10">
        <div className="lg:col-span-7">
          <Reveal>
            <p className="eyebrow">Independent digital case assistance</p>
          </Reveal>
          <Reveal delay={80}>
            <h1 className="display mt-8 text-[clamp(2.8rem,8.2vw,6.4rem)]">
              When the platform
              <br />
              says no,{" "}
              <span className="italic text-accent">clarity</span>
              <br />
              matters.
            </h1>
          </Reveal>
          <Reveal delay={160}>
            <p className="mt-9 max-w-xl text-lg leading-relaxed text-muted-foreground">
              WinsAble helps you navigate difficult digital platform cases with a clear, organized
              and legitimate process.
            </p>
          </Reveal>
          <Reveal delay={220}>
            <div className="mt-11 flex flex-wrap items-center gap-3">
              <CtaLink href="#start">Start a Case</CtaLink>
              <CtaLink href="#services" variant="outline">
                Explore Services
              </CtaLink>
            </div>
          </Reveal>
        </div>

        <div className="lg:col-span-5">
          <Reveal delay={260}>
            <div className="relative rounded-lg border border-rule bg-paper-deep/60 p-5 sm:p-7">
              <div className="flex items-center justify-between">
                <span className="eyebrow">Case flow</span>
                <span className="text-xs text-muted-foreground">Problem → Review → Prepare → Submit</span>
              </div>
              <ul className="mt-6 space-y-3">
                {heroCards.map((c, i) => (
                  <li
                    key={c.label}
                    className={`group flex items-center justify-between gap-4 rounded-md border border-rule bg-card px-4 py-4 transition-transform duration-300 hover:-translate-y-0.5 ${c.offset}`}
                    style={{ transitionDelay: `${i * 20}ms` }}
                  >
                    <span className="min-w-0">
                      <span className="block truncate text-[0.8rem] font-semibold tracking-[0.14em]">
                        {c.label}
                      </span>
                      <span className="mt-1 block text-xs text-muted-foreground">{c.stage}</span>
                    </span>
                    <ArrowUpRight className="size-3.5 shrink-0 text-muted-foreground transition-all duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 group-hover:text-accent" />
                  </li>
                ))}
              </ul>
              <p className="mt-6 text-xs leading-relaxed text-muted-foreground">
                Every case is organized before anything is submitted. The platform makes the final
                decision.
              </p>
            </div>
          </Reveal>
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
      <div className="flex items-center gap-6 overflow-hidden">
        <span className="eyebrow shrink-0 pl-6 md:pl-12 xl:pl-22">Platforms we work with</span>
        <div className="relative flex-1 overflow-hidden">
          <div className="marquee-track gap-14">
            {[0, 1].map((dup) => (
              <div key={dup} className="flex shrink-0 items-center gap-14 pr-14" aria-hidden={dup === 1}>
                {row.map((p, i) => (
                  <span
                    key={`${dup}-${p}-${i}`}
                    className="text-lg font-medium whitespace-nowrap text-ink/45"
                  >
                    {p}
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
    span: "lg:col-span-7 lg:row-span-2",
    big: true,
  },
  {
    n: "02",
    title: "Disabled Accounts",
    icon: "disabled",
    body: "Understand what a disablement usually relates to, and prepare a structured appeal through the right channel.",
    span: "lg:col-span-5",
  },
  {
    n: "03",
    title: "Impersonation",
    icon: "impersonation",
    body: "Document accounts pretending to be you and prepare the appropriate impersonation report.",
    span: "lg:col-span-5",
  },
  {
    n: "04",
    title: "Copyright Assistance",
    icon: "copyright",
    body: "Organize ownership details for copyright-related requests so nothing essential is missing.",
    span: "lg:col-span-6",
  },
  {
    n: "05",
    title: "Platform Support",
    icon: "support",
    body: "General guidance on reaching platform support with a request that is clear and complete.",
    span: "lg:col-span-6",
  },
];

export function Services() {
  return (
    <section id="services" className="shell py-24 md:py-36">
      <div className="grid gap-8 border-b border-rule pb-12 lg:grid-cols-12">
        <Reveal className="lg:col-span-5">
          <p className="eyebrow">Our Services</p>
          <h2 className="display mt-6 text-[clamp(2.4rem,5.4vw,4.5rem)]">How We Can Help</h2>
        </Reveal>
        <Reveal delay={100} className="lg:col-span-5 lg:col-start-8 lg:self-end">
          <p className="text-base leading-relaxed text-muted-foreground">
            Five focused areas. Each one starts the same way — with the facts written down clearly
            and the request prepared properly.
          </p>
        </Reveal>
      </div>

      <div className="mt-12 grid auto-rows-min gap-4 lg:grid-cols-12">
        {services.map((s, i) => (
          <Reveal key={s.n} delay={i * 70} className={s.span}>
            <article
              className={`group flex h-full flex-col justify-between rounded-lg border border-rule bg-card p-7 transition-all duration-300 hover:-translate-y-1 hover:border-ink/30 ${
                s.big ? "md:p-10" : ""
              }`}
            >
              <div className="flex items-start justify-between gap-6">
                <span className="text-xs font-semibold tracking-[0.18em] text-accent">{s.n}</span>
                <ServiceIcon
                  name={s.icon}
                  className="size-6 shrink-0 text-ink/35 transition-colors duration-300 group-hover:text-accent"
                />
              </div>
              <div className={s.big ? "mt-24 md:mt-40" : "mt-14"}>
                <h3 className={`display ${s.big ? "text-4xl md:text-5xl" : "text-2xl md:text-3xl"}`}>
                  {s.title}
                </h3>
                <p
                  className={`mt-4 leading-relaxed text-muted-foreground ${s.big ? "max-w-md text-base" : "text-sm"}`}
                >
                  {s.body}
                </p>
                <span className="mt-7 inline-flex items-center gap-2 text-sm font-semibold">
                  Start here
                  <ArrowUpRight className="size-3.5 transition-transform duration-300 group-hover:translate-x-1 group-hover:-translate-y-1" />
                </span>
              </div>
            </article>
          </Reveal>
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
    <section id="process" className="border-y border-rule bg-paper-deep/40 py-24 md:py-36">
      <div className="shell">
        <Reveal>
          <p className="eyebrow">The Process</p>
          <h2 className="display mt-6 max-w-3xl text-[clamp(2.4rem,5.4vw,4.5rem)]">
            From confusion to a clear case.
          </h2>
        </Reveal>

        <ol className="mt-16 grid gap-px border-t border-rule lg:grid-cols-5">
          {steps.map((s, i) => (
            <Reveal as="li" key={s.n} delay={i * 80} className="group relative">
              <div className="h-full border-b border-rule pt-8 pb-10 lg:border-b-0 lg:border-r lg:pr-6 lg:last:border-r-0">
                <span className="text-xs font-semibold tracking-[0.18em] text-accent">{s.n}</span>
                <span className="mt-6 block h-px w-full bg-rule">
                  <span className="block h-px w-0 bg-accent transition-all duration-500 group-hover:w-full" />
                </span>
                <h3 className="mt-6 text-lg leading-snug font-semibold">{s.title}</h3>
                <p className="mt-3 text-sm leading-relaxed text-muted-foreground">{s.body}</p>
              </div>
            </Reveal>
          ))}
        </ol>
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
              <div className="flex h-full flex-col rounded-lg border border-rule bg-card p-7">
                <span className="eyebrow">{c.k}</span>
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
    <section className="border-t border-rule bg-ink py-28 text-paper md:py-44">
      <div className="shell">
        <Reveal>
          <p className="eyebrow text-paper/50">Our Position</p>
          <h2 className="display mt-10 text-[clamp(3rem,11vw,9rem)] leading-[0.9]">
            Clarity before <span className="italic text-accent">claims.</span>
          </h2>
        </Reveal>
        <div className="mt-20 grid gap-14 lg:grid-cols-12">
          <Reveal delay={100} className="lg:col-span-5">
            <p className="text-lg leading-relaxed text-paper/70">
              People dealing with difficult account situations deserve clear information rather than
              exaggerated promises.
            </p>
          </Reveal>
          <ol className="lg:col-span-6 lg:col-start-7">
            {principles.map((p, i) => (
              <Reveal as="li" key={p} delay={i * 90}>
                <div className="flex items-baseline gap-6 border-t border-paper/15 py-6">
                  <span className="text-xs font-semibold tracking-[0.18em] text-paper/40">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <span className="text-xl md:text-2xl">{p}</span>
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
          <h2 className="display mt-8 text-[clamp(2.3rem,5.2vw,4.4rem)]">
            Digital problems are confusing enough. The process shouldn't be.
          </h2>
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

/* -------------------------------- FINAL CTA ------------------------------- */

export function FinalCta() {
  return (
    <section id="start" className="border-y border-rule bg-paper-deep/50 py-28 md:py-40">
      <div className="shell text-center">
        <Reveal>
          <h2 className="display mx-auto max-w-4xl text-[clamp(2.7rem,9vw,7rem)]">
            Make your next step <span className="italic text-accent">clear.</span>
          </h2>
        </Reveal>
        <Reveal delay={100}>
          <p className="mx-auto mt-8 max-w-md text-lg text-muted-foreground">
            Start with a clear case and a structured process.
          </p>
        </Reveal>
        <Reveal delay={160}>
          <div className="mt-12 flex justify-center">
            <CtaLink href="mailto:hello@winsable.com" variant="accent" className="px-8 py-4 text-base">
              Start a Case
            </CtaLink>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

/* --------------------------------- FOOTER -------------------------------- */

export function Footer() {
  return (
    <footer className="shell py-16">
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
              ["FAQ", "#process"],
              ["Contact", "mailto:hello@winsable.com"],
            ].map(([label, href]) => (
              <li key={label}>
                <a href={href} className="text-muted-foreground transition-colors hover:text-ink">
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
        <span>Final decisions rest with the platform.</span>
      </div>
    </footer>
  );
}
