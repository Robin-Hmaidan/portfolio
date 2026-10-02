import Link from "next/link";
import type { ComponentProps, ReactNode } from "react";

type Variant = "primary" | "secondary" | "ghost" | "inverse";

const variants: Record<Variant, string> = {
  primary:
    "bg-ink text-white hover:bg-slate-800 shadow-sm shadow-slate-900/10",
  secondary:
    "bg-white text-ink ring-1 ring-inset ring-line hover:ring-slate-300 hover:bg-slate-50",
  ghost: "text-ink hover:bg-slate-100",
  inverse: "bg-white text-ink hover:bg-slate-100",
};

export function buttonClass(variant: Variant = "primary") {
  return `inline-flex items-center justify-center gap-2 rounded-lg px-4 py-2.5 text-sm font-semibold transition-colors ${variants[variant]}`;
}

type ButtonLinkProps = ComponentProps<typeof Link> & { variant?: Variant };

/** Internal link styled as a button */
export function ButtonLink({ variant = "primary", className = "", ...props }: ButtonLinkProps) {
  return <Link className={`${buttonClass(variant)} ${className}`} {...props} />;
}

type ButtonAnchorProps = ComponentProps<"a"> & { variant?: Variant; external?: boolean };

/** External / mailto / file link styled as a button */
export function ButtonAnchor({
  variant = "primary",
  external,
  className = "",
  ...props
}: ButtonAnchorProps) {
  return (
    <a
      className={`${buttonClass(variant)} ${className}`}
      {...(external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
      {...props}
    />
  );
}

/** Small mono label, e.g. "// 01 selected work" */
export function Eyebrow({ children, className = "" }: { children: ReactNode; className?: string }) {
  return (
    <p className={`font-mono text-xs font-medium tracking-wider text-accent-strong uppercase ${className}`}>
      {children}
    </p>
  );
}

export function SectionHeading({
  id,
  index,
  eyebrow,
  title,
  intro,
  dark = false,
}: {
  id: string;
  index: string;
  eyebrow: string;
  title: string;
  intro?: ReactNode;
  dark?: boolean;
}) {
  return (
    <div className="max-w-2xl">
      <p
        className={`font-mono text-xs font-medium tracking-wider uppercase ${
          dark ? "text-teal-300" : "text-accent-strong"
        }`}
      >
        <span aria-hidden="true">{index} / </span>
        {eyebrow}
      </p>
      <h2
        id={id}
        className={`mt-3 text-3xl font-bold tracking-tight sm:text-4xl ${dark ? "text-white" : "text-ink"}`}
      >
        {title}
      </h2>
      {intro ? (
        <p className={`mt-4 text-base leading-relaxed sm:text-lg ${dark ? "text-slate-300" : "text-text"}`}>
          {intro}
        </p>
      ) : null}
    </div>
  );
}

export function Chip({ children, dark = false }: { children: ReactNode; dark?: boolean }) {
  return (
    <li
      className={`rounded-md px-2 py-1 font-mono text-[0.75rem] leading-none ${
        dark ? "bg-white/5 text-slate-300 ring-1 ring-white/10" : "bg-slate-100 text-slate-700"
      }`}
    >
      {children}
    </li>
  );
}

export function StatusBadge({ children }: { children: ReactNode }) {
  const live = /live|daily/i.test(String(children));
  return (
    <span
      className={`inline-flex items-center gap-1.5 rounded-full px-2.5 py-1 font-mono text-[0.7rem] font-medium ${
        live ? "bg-accent-soft text-accent-strong ring-1 ring-teal-200" : "bg-amber-50 text-amber-800 ring-1 ring-amber-200"
      }`}
    >
      <span
        aria-hidden="true"
        className={`size-1.5 rounded-full ${live ? "bg-accent" : "bg-amber-500"}`}
      />
      {children}
    </span>
  );
}
