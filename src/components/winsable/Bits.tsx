import type { ReactNode } from "react";

export function ArrowUpRight({ className = "" }: { className?: string }) {
  return (
    <svg viewBox="0 0 16 16" aria-hidden="true" className={className} fill="none">
      <path
        d="M4.5 11.5 11.5 4.5M6 4.5h5.5V10"
        stroke="currentColor"
        strokeWidth="1.3"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export function CtaLink({
  href,
  children,
  variant = "solid",
  className = "",
}: {
  href: string;
  children: ReactNode;
  variant?: "solid" | "outline" | "accent";
  className?: string;
}) {
  const base =
    "group inline-flex items-center gap-2 rounded-full px-6 py-3 text-sm font-semibold transition-colors duration-300";
  const styles = {
    solid: "bg-ink text-paper hover:bg-accent",
    accent: "bg-accent text-accent-foreground hover:bg-ink hover:text-paper",
    outline: "border border-ink/25 text-ink hover:border-ink hover:bg-ink hover:text-paper",
  }[variant];

  return (
    <a href={href} className={`${base} ${styles} ${className}`}>
      {children}
      <ArrowUpRight className="size-3.5 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
    </a>
  );
}

export function ServiceIcon({ name, className = "" }: { name: string; className?: string }) {
  const paths: Record<string, ReactNode> = {
    recovery: (
      <>
        <path d="M4 12a8 8 0 1 0 3-6.2" />
        <path d="M4 4v4h4" />
      </>
    ),
    disabled: (
      <>
        <circle cx="12" cy="12" r="8" />
        <path d="M6.5 6.5 17.5 17.5" />
      </>
    ),
    impersonation: (
      <>
        <circle cx="9" cy="9" r="3.2" />
        <path d="M3.5 19.5c.8-3.1 3-4.8 5.5-4.8s4.7 1.7 5.5 4.8" />
        <path d="M16 6.5h5M18.5 4v5" />
      </>
    ),
    copyright: (
      <>
        <circle cx="12" cy="12" r="8" />
        <path d="M14.5 9.6a3.4 3.4 0 1 0 0 4.8" />
      </>
    ),
    support: (
      <>
        <path d="M4 13a8 8 0 0 1 16 0" />
        <rect x="3" y="13" width="3.5" height="6" rx="1.6" />
        <rect x="17.5" y="13" width="3.5" height="6" rx="1.6" />
      </>
    ),
  };

  return (
    <svg
      viewBox="0 0 24 24"
      aria-hidden="true"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.25"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
    >
      {paths[name]}
    </svg>
  );
}
