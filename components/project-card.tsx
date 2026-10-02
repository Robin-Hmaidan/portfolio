import Image from "next/image";
import Link from "next/link";

import { BrowserFrame, PhoneFrame } from "@/components/frames";
import { ArrowRightIcon, CheckIcon } from "@/components/icons";
import { ScrollFx } from "@/components/motion/scroll-fx";
import { ProjectMeta, StackLine, stagger } from "@/components/ui";
import type { Project } from "@/lib/projects";

/**
 * Stretched link: makes the whole card clickable, above transformed children.
 * Keep [data-reveal] on the <article> itself (never on a wrapper between the
 * link and the article): a transform on that wrapper would become the
 * containing block and shrink the clickable area while it is hidden.
 */
const stretched = "after:absolute after:inset-0 after:z-10 after:rounded-2xl";

function ReadMore({ label = "Case study" }: { label?: string }) {
  return (
    <p className="mt-5 inline-flex items-center gap-2 text-sm font-semibold text-ink">
      <span className="link-underline group-hover:[background-size:100%_1px]">{label}</span>
      <ArrowRightIcon
        width={16}
        height={16}
        className="transition-transform duration-300 ease-expo group-hover:translate-x-1"
      />
    </p>
  );
}

/**
 * How a project works, as a quiet sequence.
 * "inline": one wrapping line with arrows (home page).
 * "list": vertical steps (case study page).
 */
export function FlowSteps({
  flow,
  variant = "inline",
}: {
  flow: NonNullable<Project["flow"]>;
  variant?: "inline" | "list";
}) {
  if (variant === "inline") {
    return (
      <div className="mt-5">
        <p className="text-xs font-semibold tracking-wide text-muted uppercase">{flow.title}</p>
        <ol className="mt-2 flex flex-wrap items-center gap-x-2 gap-y-1 text-sm text-ink">
          {flow.steps.map((step, i) => (
            <li key={step} className="flex items-center gap-2">
              {i > 0 ? (
                <span aria-hidden="true" className="text-accent">
                  →
                </span>
              ) : null}
              <span>{step}</span>
            </li>
          ))}
        </ol>
      </div>
    );
  }
  return (
    <figure>
      <figcaption className="text-xl font-bold tracking-tight text-ink">{flow.title}</figcaption>
      <ol className="mt-6">
        {flow.steps.map((step, i) => (
          <li
            key={step}
            data-reveal=""
            style={stagger(i)}
            className="relative flex items-center gap-4 pb-5 last:pb-0"
          >
            {i < flow.steps.length - 1 ? (
              <span aria-hidden="true" className="absolute top-7 bottom-0 left-[0.6875rem] w-px bg-line" />
            ) : null}
            <span
              aria-hidden="true"
              className="relative grid size-6 shrink-0 place-items-center rounded-full bg-accent-soft text-[0.7rem] font-semibold text-accent-strong tabular-nums"
            >
              {i + 1}
            </span>
            <span className="text-text">{step}</span>
          </li>
        ))}
      </ol>
    </figure>
  );
}

/**
 * Summary of the Cowork security work. Used instead of a screenshot because the
 * UI is not Robin's work; the audit is.
 */
const auditItems = [
  "Backend security audit and written report",
  "Content Security Policy with violation reporting",
  "Cloudflare Turnstile on public forms",
  "Tighter database privileges",
  "Server-only token lifetimes",
  "Race conditions fixed with atomic PostgreSQL functions",
  "Shared login and merge onto the shared database",
];

function AuditSheet() {
  return (
    <figure className="rounded-3xl bg-slate-50 p-7 ring-1 ring-slate-900/5 transition-[translate,box-shadow] duration-500 ease-expo group-hover:-translate-y-1.5 group-hover:shadow-[0_30px_60px_-30px_rgb(15_23_42/0.3)] sm:p-10">
      <figcaption className="flex flex-wrap items-baseline justify-between gap-x-4 gap-y-1">
        <span className="text-lg font-semibold text-ink">Security work</span>
        <span className="font-mono text-xs text-muted">cowork.esthejob.fr</span>
      </figcaption>
      <ul className="mt-6 space-y-3">
        {auditItems.map((item, i) => (
          <li key={item} data-reveal="" style={stagger(i + 1)} className="flex gap-3 text-[0.95rem] text-text">
            <CheckIcon width={18} height={18} className="mt-0.5 shrink-0 text-accent" />
            {item}
          </li>
        ))}
      </ul>
      <p className="mt-9 flex flex-wrap items-baseline gap-x-4 gap-y-1">
        <span className="text-5xl font-bold tracking-tight text-ink tabular-nums">
          39 <span className="text-slate-300">→</span> 0
        </span>
        <span className="text-sm text-muted">React lint errors, no change in behaviour</span>
      </p>
    </figure>
  );
}

/** The flagship: big title row, then a large screenshot that settles into place as you scroll */
export function FeaturedProject({ project }: { project: Project }) {
  const desktop = project.shots.find((s) => s.device === "desktop");
  const mobile = project.shots.find((s) => s.device === "mobile");
  return (
    <article data-reveal="" className="group relative">
      <div className="grid gap-6 lg:grid-cols-12 lg:items-end">
        <div className="lg:col-span-6">
          <ProjectMeta status={project.status} period={project.period} />
          <h3 className="mt-3 text-4xl font-bold tracking-[-0.03em] text-ink sm:text-5xl">
            <Link href={`/work/${project.slug}`} className={stretched}>
              {project.name}
            </Link>
          </h3>
          <p className="mt-2 text-lg text-accent-strong">{project.label}</p>
        </div>
        <div className="lg:col-span-6">
          <p className="text-lg leading-relaxed text-text">{project.summary}</p>
          <StackLine items={project.stack.slice(0, 5)} className="mt-4" />
        </div>
      </div>

      {desktop ? (
        <div className="relative mt-10 sm:mt-14">
          <ScrollFx scale={[0.9, 1]} offset={["start end", "start 0.3"]} className="origin-top">
            <BrowserFrame shot={desktop} zoom sizes="(min-width: 1152px) 1088px, 100vw" />
          </ScrollFx>
          {mobile ? (
            <ScrollFx y={[50, -50]} className="absolute right-4 -bottom-16 hidden w-[19%] lg:block xl:-right-8">
              <PhoneFrame shot={mobile} sizes="220px" />
            </ScrollFx>
          ) : null}
        </div>
      ) : null}

      <ReadMore label="Read the case study" />
    </article>
  );
}

/** Security-led project: audit sheet on one side, text on the other */
export function AuditProject({ project }: { project: Project }) {
  return (
    <article data-reveal="" className="group relative grid gap-10 lg:grid-cols-12 lg:items-center">
      <div className="lg:col-span-6">
        <AuditSheet />
      </div>
      <div className="lg:col-span-5 lg:col-start-8">
        <ProjectMeta status={project.status} period={project.period} />
        <h3 className="mt-3 text-3xl font-bold tracking-[-0.03em] text-ink sm:text-4xl">
          <Link href={`/work/${project.slug}`} className={stretched}>
            {project.name}
          </Link>
        </h3>
        <p className="mt-2 text-lg text-accent-strong">{project.label}</p>
        <p className="mt-5 text-lg leading-relaxed text-text">{project.summary}</p>
        <StackLine items={project.stack.slice(0, 5)} className="mt-4" />
        <ReadMore />
      </div>
    </article>
  );
}

/** Project led by a screenshot, which zooms out slightly as it scrolls through */
export function ImageProject({ project }: { project: Project }) {
  const shot = project.shots[0];
  return (
    <article data-reveal="" className="group relative">
      {shot ? (
        <div className="overflow-hidden rounded-2xl bg-slate-100 ring-1 ring-slate-900/10 transition-[translate,box-shadow] duration-500 ease-expo group-hover:-translate-y-1.5 group-hover:shadow-[0_30px_60px_-30px_rgb(15_23_42/0.35)]">
          <ScrollFx scale={[1.1, 1]} offset={["start end", "end 0.6"]} className="origin-top">
            <Image
              src={shot.src}
              alt={shot.alt}
              sizes="(min-width: 1024px) 640px, 100vw"
              placeholder="blur"
              className="block h-auto w-full transition-transform duration-700 ease-expo group-hover:scale-[1.03]"
            />
          </ScrollFx>
        </div>
      ) : null}
      <ProjectMeta status={project.status} period={project.period} className="mt-7" />
      <h3 className="mt-2 text-3xl font-bold tracking-[-0.03em] text-ink">
        <Link href={`/work/${project.slug}`} className={stretched}>
          {project.name}
        </Link>
      </h3>
      <p className="mt-3 max-w-xl leading-relaxed text-text">{project.summary}</p>
      <StackLine items={project.stack.slice(0, 4)} className="mt-3" />
      <ReadMore />
    </article>
  );
}

/** Project without screenshots: text first, with its flow as a quiet sequence */
export function TextProject({ project, index = 0 }: { project: Project; index?: number }) {
  return (
    <article data-reveal="" style={stagger(index)} className="group relative">
      <ProjectMeta status={project.status} period={project.period} />
      <h3 className="mt-2 text-2xl font-bold tracking-tight text-ink transition-colors group-hover:text-accent-strong">
        <Link href={`/work/${project.slug}`} className={stretched}>
          {project.name}
        </Link>
      </h3>
      <p className="mt-1 text-sm font-medium text-accent-strong">{project.label}</p>
      <p className="mt-3 leading-relaxed text-text">{project.summary}</p>
      {project.flow ? <FlowSteps flow={project.flow} /> : null}
      <StackLine items={project.stack.slice(0, 4)} className="mt-4" />
      <ReadMore />
    </article>
  );
}

/** Compact row for smaller projects: small thumbnail and one line */
export function MinorProject({ project }: { project: Project }) {
  const shot = project.shots[0];
  return (
    <article data-reveal="" className="group relative flex flex-col gap-5 sm:flex-row sm:items-center sm:gap-8">
      {shot ? (
        <div className="shrink-0 overflow-hidden rounded-xl ring-1 ring-slate-900/10 sm:w-60">
          <Image
            src={shot.src}
            alt={shot.alt}
            sizes="(min-width: 640px) 240px, 100vw"
            placeholder="blur"
            className="block h-auto w-full transition-transform duration-700 ease-expo group-hover:scale-[1.05]"
          />
        </div>
      ) : null}
      <div className="flex-1">
        <p className="text-sm text-muted">
          {project.period}
          <span aria-hidden="true" className="mx-2 text-slate-300">
            /
          </span>
          {project.label}
        </p>
        <h3 className="mt-1 text-xl font-bold tracking-tight text-ink transition-colors group-hover:text-accent-strong">
          <Link href={`/work/${project.slug}`} className={stretched}>
            {project.name}
          </Link>
        </h3>
        <p className="mt-1 text-text">{project.tagline}</p>
      </div>
      <ArrowRightIcon
        width={22}
        height={22}
        className="hidden shrink-0 text-ink transition-transform duration-300 ease-expo group-hover:translate-x-1.5 sm:block"
      />
    </article>
  );
}
