import Image from "next/image";
import Link from "next/link";

import { ArrowRightIcon } from "@/components/icons";
import { StatusBadge } from "@/components/ui";
import type { Project } from "@/lib/projects";

export function FlowDiagram({
  flow,
  compact = false,
}: {
  flow: NonNullable<Project["flow"]>;
  compact?: boolean;
}) {
  return (
    <figure
      className={`rounded-xl bg-ink font-mono text-slate-300 ring-1 ring-slate-900/10 ${
        compact ? "p-3.5 text-[0.72rem] leading-snug" : "p-6 text-sm"
      }`}
    >
      <figcaption className={`flex items-center gap-2 text-slate-400 ${compact ? "mb-2" : "mb-3"}`}>
        <span aria-hidden="true" className="text-teal-300">
          $
        </span>
        {flow.title.toLowerCase().replace(/\s+/g, "-")}
      </figcaption>
      <ol className={compact ? "space-y-1" : "space-y-1.5"}>
        {flow.steps.map((step, i) => (
          <li key={step} className="flex items-start gap-2">
            <span aria-hidden="true" className="w-5 shrink-0 text-slate-500">
              {String(i + 1).padStart(2, "0")}
            </span>
            <span aria-hidden="true" className="text-teal-300">
              {i === 0 ? "›" : "→"}
            </span>
            <span className="text-slate-200">{step}</span>
          </li>
        ))}
      </ol>
    </figure>
  );
}

/**
 * Summary of the Cowork security work, styled like an audit log.
 * Used instead of a screenshot because the UI is not Robin's work; the audit is.
 */
const auditItems = [
  "backend security audit + written report",
  "Content Security Policy + violation reporting",
  "Cloudflare Turnstile on public forms",
  "tighter database privileges",
  "server-only token lifetimes",
  "race conditions: atomic PostgreSQL functions",
  "shared login + merge onto shared database",
];

function AuditPanel() {
  return (
    <figure className="overflow-hidden rounded-xl bg-ink font-mono text-[0.78rem] leading-relaxed text-slate-300 ring-1 ring-slate-900/10 sm:text-sm">
      <div className="flex items-center gap-2 border-b border-white/10 px-4 py-3">
        <span aria-hidden="true" className="flex gap-1.5">
          <span className="size-2.5 rounded-full bg-slate-600" />
          <span className="size-2.5 rounded-full bg-slate-600" />
          <span className="size-2.5 rounded-full bg-slate-600" />
        </span>
        <figcaption className="mx-auto pr-10 text-xs text-slate-400">cowork.esthejob.fr · security work</figcaption>
      </div>
      <div className="p-5 sm:p-6">
        <p className="text-slate-100">
          <span aria-hidden="true" className="text-teal-300">
            ${" "}
          </span>
          ./audit --scope backend --fix
        </p>
        <ul className="mt-3 space-y-1.5">
          {auditItems.map((item) => (
            <li key={item} className="flex gap-2.5">
              <span className="shrink-0 text-teal-300">[done]</span>
              <span className="text-slate-200">{item}</span>
            </li>
          ))}
        </ul>
        <p className="mt-4 border-t border-white/10 pt-3 text-slate-400">
          react lint errors: <span className="text-amber-300">39</span> → <span className="text-teal-300">0</span>
          <span className="text-slate-500"> (no behaviour change)</span>
        </p>
      </div>
    </figure>
  );
}

/** Large card with screenshot, used for the two live products */
export function FeaturedProjectCard({ project, reverse = false }: { project: Project; reverse?: boolean }) {
  const shot = project.shots.find((s) => s.device === "desktop");
  return (
    <article className="group relative grid items-center gap-8 rounded-2xl border border-line bg-white p-5 shadow-sm transition-shadow hover:shadow-lg hover:shadow-slate-900/5 sm:p-8 lg:grid-cols-12">
      <div className={`order-2 lg:col-span-5 ${reverse ? "lg:order-2" : "lg:order-1"}`}>
        <div className="flex flex-wrap items-center gap-2">
          {project.status ? <StatusBadge>{project.status}</StatusBadge> : null}
          <span className="font-mono text-xs text-muted">{project.period}</span>
        </div>
        <h3 className="mt-4 text-2xl font-bold tracking-tight text-ink">
          <Link href={`/work/${project.slug}`} className="after:absolute after:inset-0 after:rounded-2xl">
            {project.name}
          </Link>
        </h3>
        <p className="mt-1 font-mono text-xs font-medium tracking-wide text-accent-strong uppercase">
          {project.label}
        </p>
        <p className="mt-4 leading-relaxed text-text">{project.summary}</p>
        <ul className="mt-5 flex flex-wrap gap-1.5" aria-label="Main technologies">
          {project.stack.slice(0, 5).map((s) => (
            <li key={s} className="rounded-md bg-slate-100 px-2 py-1 font-mono text-[0.72rem] leading-none text-slate-700">
              {s}
            </li>
          ))}
        </ul>
        <p className="mt-6 inline-flex items-center gap-1.5 text-sm font-semibold text-ink">
          Read the case study
          <ArrowRightIcon width={16} height={16} className="transition-transform group-hover:translate-x-0.5" />
        </p>
      </div>
      {project.cardVisual === "audit" ? (
        <div className={`order-1 lg:col-span-7 ${reverse ? "lg:order-1" : "lg:order-2"}`}>
          <AuditPanel />
        </div>
      ) : shot ? (
        <div className={`order-1 lg:col-span-7 ${reverse ? "lg:order-1" : "lg:order-2"}`}>
          <div className="overflow-hidden rounded-xl ring-1 ring-slate-900/10">
            <Image
              src={shot.src}
              alt={shot.alt}
              sizes="(min-width: 1024px) 620px, 100vw"
              placeholder="blur"
              className="block h-auto w-full transition-transform duration-500 group-hover:scale-[1.015]"
            />
          </div>
        </div>
      ) : null}
    </article>
  );
}

/** Standard card for the project grid */
export function ProjectCard({ project }: { project: Project }) {
  const shot = project.shots[0];
  return (
    <article className="group relative flex flex-col overflow-hidden rounded-2xl border border-line bg-white shadow-sm transition-shadow hover:shadow-lg hover:shadow-slate-900/5">
      <div className="border-b border-line bg-slate-50 p-4">
        {shot ? (
          <div className="overflow-hidden rounded-lg ring-1 ring-slate-900/10">
            <Image
              src={shot.src}
              alt={shot.alt}
              sizes="(min-width: 1024px) 360px, (min-width: 640px) 50vw, 100vw"
              placeholder="blur"
              className="aspect-[16/9] h-auto w-full object-cover object-top"
            />
          </div>
        ) : project.flow ? (
          <div className="min-h-[11rem]">
            <FlowDiagram flow={project.flow} compact />
          </div>
        ) : null}
      </div>
      <div className="flex flex-1 flex-col p-6">
        <div className="flex flex-wrap items-center gap-2">
          {project.status ? <StatusBadge>{project.status}</StatusBadge> : null}
          <span className="font-mono text-xs text-muted">{project.period}</span>
        </div>
        <h3 className="mt-3 text-lg font-bold tracking-tight text-ink">
          <Link href={`/work/${project.slug}`} className="after:absolute after:inset-0">
            {project.name}
          </Link>
        </h3>
        <p className="mt-2 flex-1 text-sm leading-relaxed text-text">{project.summary}</p>
        <p className="mt-4 font-mono text-[0.72rem] text-muted">{project.stack.slice(0, 4).join(" · ")}</p>
        <p className="mt-4 inline-flex items-center gap-1.5 text-sm font-semibold text-ink">
          Case study
          <ArrowRightIcon width={16} height={16} className="transition-transform group-hover:translate-x-0.5" />
        </p>
      </div>
    </article>
  );
}

/** Compact horizontal card for smaller projects */
export function SmallProjectCard({ project }: { project: Project }) {
  return (
    <article className="group relative flex flex-col gap-3 rounded-xl border border-line bg-white p-5 transition-shadow hover:shadow-md hover:shadow-slate-900/5 sm:flex-row sm:items-center sm:justify-between">
      <div>
        <p className="font-mono text-xs text-muted">
          {project.period} · {project.label}
        </p>
        <h3 className="mt-1 font-bold text-ink">
          <Link href={`/work/${project.slug}`} className="after:absolute after:inset-0 after:rounded-xl">
            {project.name}
          </Link>
        </h3>
        <p className="mt-1 text-sm text-text">{project.tagline}</p>
      </div>
      <span className="inline-flex shrink-0 items-center gap-1.5 text-sm font-semibold text-ink">
        Details
        <ArrowRightIcon width={16} height={16} className="transition-transform group-hover:translate-x-0.5" />
      </span>
    </article>
  );
}
