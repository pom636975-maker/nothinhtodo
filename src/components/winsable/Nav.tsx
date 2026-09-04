import { useEffect, useState } from "react";
import { ArrowUpRight } from "./Bits";

const links = [
  { label: "Services", href: "#services" },
  { label: "How It Works", href: "#process" },
  { label: "About", href: "#about" },
];

export function Nav() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [active, setActive] = useState<string | null>(null);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    const ids = links.map((l) => l.href.slice(1));
    const nodes = ids
      .map((id) => document.getElementById(id))
      .filter((n): n is HTMLElement => Boolean(n));
    if (!nodes.length) return;
    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((e) => e.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];
        if (visible) setActive(`#${visible.target.id}`);
      },
      { rootMargin: "-45% 0px -45% 0px", threshold: [0, 0.25, 0.6, 1] },
    );
    nodes.forEach((n) => observer.observe(n));
    return () => observer.disconnect();
  }, []);


  return (
    <header
      className={`sticky top-0 z-50 border-b transition-colors duration-300 ${
        scrolled ? "border-rule bg-paper/85 backdrop-blur-md" : "border-transparent bg-transparent"
      }`}
    >
      <div className="shell flex h-20 items-center justify-between gap-6">
        <a href="#top" className="display text-2xl tracking-tight">
          WinsAble<span className="text-accent">.</span>
        </a>

        <nav className="hidden items-center gap-9 md:flex" aria-label="Primary">
          {links.map((l) => (
            <a
              key={l.href}
              href={l.href}
              className="relative text-sm text-muted-foreground transition-colors duration-300 hover:text-ink"
            >
              {l.label}
            </a>
          ))}
        </nav>

        <div className="flex items-center gap-2">
          <a
            href="#start"
            className="group hidden items-center gap-2 rounded-full bg-ink px-5 py-2.5 text-sm font-semibold text-paper transition-colors duration-300 hover:bg-accent sm:inline-flex"
          >
            Start a Case
            <ArrowUpRight className="size-3.5 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
          </a>
          <button
            type="button"
            aria-label={open ? "Close menu" : "Open menu"}
            aria-expanded={open}
            onClick={() => setOpen((v) => !v)}
            className="grid size-11 place-items-center rounded-full border border-ink/20 md:hidden"
          >
            <span className="relative block h-3 w-4">
              <span
                className={`absolute left-0 h-px w-4 bg-ink transition-transform duration-300 ${open ? "top-1.5 rotate-45" : "top-0"}`}
              />
              <span
                className={`absolute left-0 h-px w-4 bg-ink transition-transform duration-300 ${open ? "top-1.5 -rotate-45" : "top-3"}`}
              />
            </span>
          </button>
        </div>
      </div>

      {open && (
        <div className="border-t border-rule bg-paper md:hidden">
          <nav className="shell flex flex-col py-4" aria-label="Mobile">
            {links.map((l) => (
              <a
                key={l.href}
                href={l.href}
                onClick={() => setOpen(false)}
                className="border-b border-rule/70 py-4 text-lg"
              >
                {l.label}
              </a>
            ))}
            <a
              href="#start"
              onClick={() => setOpen(false)}
              className="mt-5 inline-flex items-center justify-center gap-2 rounded-full bg-ink px-5 py-3 text-sm font-semibold text-paper"
            >
              Start a Case <ArrowUpRight className="size-3.5" />
            </a>
          </nav>
        </div>
      )}
    </header>
  );
}
