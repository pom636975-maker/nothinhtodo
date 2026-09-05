import { useEffect, useState } from "react";
import { ArrowUpRight } from "./Bits";

function prefersReduced() {
  return (
    typeof window !== "undefined" && window.matchMedia("(prefers-reduced-motion: reduce)").matches
  );
}

/** Brief editorial intro curtain shown once per session. */
export function IntroCurtain() {
  const [state, setState] = useState<"hidden" | "playing" | "done">("hidden");

  useEffect(() => {
    if (prefersReduced()) return;
    if (sessionStorage.getItem("winsable-intro") === "1") return;
    sessionStorage.setItem("winsable-intro", "1");
    setState("playing");

    // Always start the experience at the hero, never mid-page.
    if ("scrollRestoration" in history) history.scrollRestoration = "manual";
    if (window.location.hash) {
      history.replaceState(null, "", window.location.pathname + window.location.search);
    }
    const pin = () => window.scrollTo(0, 0);
    pin();
    window.addEventListener("scroll", pin);

    document.documentElement.style.overflow = "hidden";
    const lift = window.setTimeout(() => setState("done"), 950);
    const unlock = window.setTimeout(() => {
      window.removeEventListener("scroll", pin);
      window.scrollTo(0, 0);
      document.documentElement.style.overflow = "";
    }, 1450);
    return () => {
      window.clearTimeout(lift);
      window.clearTimeout(unlock);
      window.removeEventListener("scroll", pin);
      document.documentElement.style.overflow = "";
    };
  }, []);

  if (state === "hidden") return null;

  return (
    <div
      aria-hidden="true"
      className={`pointer-events-none fixed inset-0 z-[90] flex items-center justify-center bg-ink transition-transform duration-[900ms] [transition-timing-function:cubic-bezier(0.76,0,0.24,1)] ${
        state === "done" ? "-translate-y-full" : "translate-y-0"
      }`}
    >
      <div className="overflow-hidden px-6">
        <span className="intro-word block font-serif text-[clamp(2.5rem,9vw,6rem)] leading-none tracking-tight text-paper">
          WinsAble.
        </span>
      </div>
      <span className="absolute bottom-10 left-1/2 -translate-x-1/2 font-mono text-[10px] uppercase tracking-[0.35em] text-paper/50">
        Clarity before claims
      </span>
    </div>
  );
}

/** Soft cursor follower — desktop, fine-pointer only. */
export function CursorHalo() {
  const [pos, setPos] = useState<{ x: number; y: number } | null>(null);
  const [active, setActive] = useState(false);

  useEffect(() => {
    if (prefersReduced()) return;
    if (!window.matchMedia("(pointer: fine)").matches) return;
    let frame = 0;
    let next = { x: 0, y: 0 };
    const apply = () => {
      frame = 0;
      setPos(next);
    };
    const onMove = (e: PointerEvent) => {
      next = { x: e.clientX, y: e.clientY };
      const target = e.target as HTMLElement | null;
      setActive(Boolean(target?.closest("a,button")));
      if (!frame) frame = requestAnimationFrame(apply);
    };
    window.addEventListener("pointermove", onMove, { passive: true });
    return () => {
      window.removeEventListener("pointermove", onMove);
      if (frame) cancelAnimationFrame(frame);
    };
  }, []);

  if (!pos) return null;

  return (
    <div
      aria-hidden="true"
      className="pointer-events-none fixed left-0 top-0 z-[70] hidden md:block"
      style={{ transform: `translate3d(${pos.x}px, ${pos.y}px, 0)` }}
    >
      <div
        className={`-ml-1/2 relative -translate-x-1/2 -translate-y-1/2 rounded-full border border-accent/40 bg-accent/10 transition-all duration-300 ease-out ${
          active ? "size-12 opacity-100" : "size-6 opacity-60"
        }`}
      />
    </div>
  );
}

/** Sticky CTA dock that surfaces after the hero. */
export function StickyCta() {
  const [show, setShow] = useState(false);

  useEffect(() => {
    let frame = 0;
    const update = () => {
      frame = 0;
      const y = window.scrollY;
      const max = document.documentElement.scrollHeight - window.innerHeight;
      setShow(y > window.innerHeight * 0.9 && y < max - 320);
    };
    const onScroll = () => {
      if (!frame) frame = requestAnimationFrame(update);
    };
    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
      if (frame) cancelAnimationFrame(frame);
    };
  }, []);

  return (
    <div
      className={`fixed inset-x-0 bottom-5 z-[65] flex justify-center px-4 transition-all duration-500 ease-out ${
        show ? "translate-y-0 opacity-100" : "pointer-events-none translate-y-6 opacity-0"
      }`}
    >
      <a
        href="#start"
        className="group inline-flex items-center gap-3 rounded-full border border-ink/10 bg-ink/95 px-5 py-3 text-paper shadow-[0_18px_40px_-24px_rgba(0,0,0,0.8)] backdrop-blur transition-colors hover:bg-accent"
      >
        <span className="size-1.5 animate-pulse rounded-full bg-accent transition-colors group-hover:bg-paper" />
        <span className="text-sm font-medium">Start a Case</span>
        <ArrowUpRight className="size-3.5 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
      </a>
    </div>
  );
}
