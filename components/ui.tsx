import Link from "next/link";
import type { ComponentProps, CSSProperties, ReactNode } from "react";

type Variant = "primary" | "secondary" | "ghost" | "inverse";

const variants: Record<Variant, string> = {
  primary: "bg-ink text-white hover:bg-slate-800 shadow-sm shadow-slate-900/10 hover:shadow-lg hover:shadow-slate-900/15",
  secondary: "bg-white text-ink ring-1 ring-inset ring-line hover:ring-slate-300 hover:bg-slate-50",
  ghost: "text-ink hover:bg-slate-100",
  inverse: "bg-white text-ink hover:bg-slate-100",
};

export function buttonClass(variant: Variant = "primary") {
  return `inline-flex items-center justify-center gap-2 rounded-full px-5 py-2.5 text-sm font-semibold transition-[background-color,box-shadow,translate] duration-300 ease-expo hover:-translate-y-0.5 ${variants[variant]}`;
}

type ButtonLinkProps = ComponentProps<typeof Link> & { variant?: Variant };

/** Internal link styled as a button */
export function ButtonLink({ variant = "primary", className = "", ...props }: ButtonLinkProps) {
  return <Link className={`${buttonClass(variant)} ${className}`} {...props} />;
}

type ButtonAnchorProps = ComponentProps<"a"> & { variant?: Variant; external?: boolean };

/** External / mailto / file link styled as a button */
export function ButtonAnchor({ variant = "primary", external, className = "", ...props }: ButtonAnchorProps) {
  return (
    <a
      className={`${buttonClass(variant)} ${className}`}
      {...(external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
      {...props}
    />
  );
}

/** Inline style helpers for staggered motion */
export const delay = (ms: number) => ({ "--delay": `${ms}ms` }) as CSSProperties;
export const stagger = (i: number) => ({ "--i": i }) as CSSProperties;

/** Section title: strong typography, optional intro set beside it on large screens */
export function SectionTitle({
  id,
  title,
  intro,
  dark = false,
}: {
  id: string;
  title: string;
  intro?: ReactNode;
  dark?: boolean;
}) {
  return (
    <div data-reveal="" className="grid gap-6 lg:grid-cols-12 lg:items-end">
      <h2
        id={id}
        className={`text-title font-extrabold lg:col-span-7 ${dark ? "text-white" : "text-ink"}`}
      >
        {title}
      </h2>
      {intro ? (
        <p
          className={`max-w-xl text-base leading-relaxed sm:text-lg lg:col-span-5 lg:pb-1 ${
            dark ? "text-slate-400" : "text-muted"
          }`}
        >
          {intro}
        </p>
      ) : null}
    </div>
  );
}

/** Quiet status text ("Live", "Used daily", "In development"), no pill */
export function Status({ children, dark = false }: { children: string; dark?: boolean }) {
  const live = /live|daily/i.test(children);
  const tone = live
    ? dark
      ? "text-teal-300"
      : "text-accent-strong"
    : dark
      ? "text-amber-300"
      : "text-amber-700";
  return <span className={`font-semibold ${tone}`}>{children}</span>;
}

/** Status + period on one quiet line */
export function ProjectMeta({ status, period, className = "" }: { status?: string; period: string; className?: string }) {
  return (
    <p className={`text-sm text-muted ${className}`}>
      {status ? (
        <>
          <Status>{status}</Status>
          <span aria-hidden="true" className="mx-2 text-slate-300">
            /
          </span>
        </>
      ) : null}
      {period}
    </p>
  );
}

/** Tech stack as quiet inline text */
export function StackLine({ items, className = "" }: { items: readonly string[]; className?: string }) {
  return <p className={`text-sm text-muted ${className}`}>{items.join(", ")}</p>;
}
