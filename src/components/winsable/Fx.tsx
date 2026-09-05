import {
  useCallback,
  useEffect,
  useRef,
  useState,
  type CSSProperties,
  type PointerEvent as ReactPointerEvent,
  type ReactNode,
} from "react";

function reduced() {
  return (
    typeof window !== "undefined" && window.matchMedia("(prefers-reduced-motion: reduce)").matches
  );
}

/** Button/element that leans toward the cursor. Desktop, fine pointer only. */
export function Magnetic({
  children,
  strength = 0.35,
  className = "",
}: {
  children: ReactNode;
  strength?: number;
  className?: string;
}) {
  const ref = useRef<HTMLSpanElement | null>(null);
  const [offset, setOffset] = useState({ x: 0, y: 0 });

  const onMove = (e: ReactPointerEvent<HTMLSpanElement>) => {
    const el = ref.current;
    if (!el) return;
    if (reduced() || !window.matchMedia("(pointer: fine)").matches) return;
    const r = el.getBoundingClientRect();
    setOffset({
      x: (e.clientX - (r.left + r.width / 2)) * strength,
      y: (e.clientY - (r.top + r.height / 2)) * strength,
    });
  };

  return (
    <span
      ref={ref}
      onPointerMove={onMove}
      onPointerLeave={() => setOffset({ x: 0, y: 0 })}
      className={`inline-block will-change-transform ${className}`}
      style={{
        transform: `translate3d(${offset.x}px, ${offset.y}px, 0)`,
        transition:
          offset.x === 0 && offset.y === 0
            ? "transform 0.5s cubic-bezier(0.22,1,0.36,1)"
            : "transform 0.12s linear",
      }}
    >
      {children}
    </span>
  );
}

const GLYPHS = "ABCDEFGHIJKLMNOPQRSTUVWXYZ#%&*/<>";

/** Letters shuffle into place the first time the word enters the viewport. */
export function Scramble({
  text,
  className = "",
  speed = 45,
}: {
  text: string;
  className?: string;
  speed?: number;
}) {
  const ref = useRef<HTMLSpanElement | null>(null);
  const [out, setOut] = useState(text);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (reduced()) return;

    let timer = 0;
    const io = new IntersectionObserver(
      (entries) => {
        if (!entries.some((e) => e.isIntersecting)) return;
        io.disconnect();
        let frame = 0;
        const total = text.length * 3 + 6;
        timer = window.setInterval(() => {
          frame += 1;
          const revealed = Math.floor((frame / total) * text.length);
          setOut(
            text
              .split("")
              .map((c, i) =>
                i < revealed || c === " " ? c : GLYPHS[Math.floor(Math.random() * GLYPHS.length)],
              )
              .join(""),
          );
          if (frame >= total) {
            window.clearInterval(timer);
            setOut(text);
          }
        }, speed);
      },
      { threshold: 0.4 },
    );
    io.observe(el);
    return () => {
      io.disconnect();
      window.clearInterval(timer);
    };
  }, [text, speed]);

  return (
    <span ref={ref} className={className} aria-label={text}>
      <span aria-hidden="true">{out}</span>
    </span>
  );
}

/** Cursor-following spotlight for cards. Spread on the element. */
export function useSpotlight() {
  const [style, setStyle] = useState<CSSProperties>({
    "--mx": "50%",
    "--my": "0%",
  } as CSSProperties);

  const onPointerMove = useCallback((e: ReactPointerEvent<HTMLElement>) => {
    const r = e.currentTarget.getBoundingClientRect();
    setStyle({
      "--mx": `${((e.clientX - r.left) / r.width) * 100}%`,
      "--my": `${((e.clientY - r.top) / r.height) * 100}%`,
    } as CSSProperties);
  }, []);

  return { style, onPointerMove };
}

export function Spotlight() {
  return (
    <span
      aria-hidden="true"
      className="spotlight pointer-events-none absolute inset-0 z-0 opacity-0 transition-opacity duration-500 group-hover:opacity-100"
    />
  );
}

/** Slowly rotating circular seal — editorial flourish. */
export function Seal({ className = "" }: { className?: string }) {
  return (
    <span
      aria-hidden="true"
      className={`pointer-events-none inline-flex items-center justify-center ${className}`}
    >
      <svg viewBox="0 0 120 120" className="seal-spin size-full">
        <defs>
          <path id="seal-path" d="M60,60 m-44,0 a44,44 0 1,1 88,0 a44,44 0 1,1 -88,0" fill="none" />
        </defs>
        <text className="fill-current text-[10.5px] font-semibold tracking-[0.32em] uppercase">
          <textPath href="#seal-path">Clarity • WinsAble •</textPath>
        </text>
      </svg>
    </span>
  );
}
