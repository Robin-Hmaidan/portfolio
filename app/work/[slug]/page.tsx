import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import type { ReactNode } from "react";

import { BrowserFrame, PhoneFrame } from "@/components/frames";
import {
  ArrowLeftIcon,
  ArrowRightIcon,
  ExternalIcon,
  GitHubIcon,
  LockIcon,
  MailIcon,
} from "@/components/icons";
import { FlowDiagram } from "@/components/project-card";
import { ButtonAnchor, StatusBadge } from "@/components/ui";
import { getProject, projects, type Project } from "@/lib/projects";
import { site } from "@/lib/site";

export const dynamicParams = false;

export function generateStaticParams() {
  return projects.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: PageProps<"/work/[slug]">): Promise<Metadata> {
  const { slug } = await params;
  const project = getProject(slug);
  if (!project) return {};
  const title = `${project.name}: ${project.label}`;
  return {
    title,
    description: project.summary,
    alternates: { canonical: `/work/${project.slug}` },
    openGraph: {
      type: "article",
      url: `/work/${project.slug}`,
      title: `${title} · ${site.name}`,
      description: project.summary,
    },
    twitter: {
      card: "summary_large_image",
      title: `${title} · ${site.name}`,
      description: project.summary,
    },
  };
}

export default async function CaseStudyPage({ params }: PageProps<"/work/[slug]">) {
  const { slug } = await params;
  const project = getProject(slug);
  if (!project) notFound();

  const index = projects.findIndex((p) => p.slug === project.slug);
  const next = projects[(index + 1) % projects.length];

  const desktop = project.shots.filter((s) => s.device === "desktop");
  const mobile = project.shots.filter((s) => s.device === "mobile");
  const [heroShot, ...moreDesktop] = desktop;

  return (
    <article>
      {/* Header */}
      <header className="relative overflow-hidden border-b border-line">
        <div
          aria-hidden="true"
          className="bg-grid pointer-events-none absolute inset-0 [mask-image:linear-gradient(to_bottom,black,transparent_90%)]"
        />
        <div className="container-page relative pt-10 pb-14 sm:pt-14 sm:pb-16">
          <Link
            href="/#work"
            className="inline-flex items-center gap-1.5 rounded-md text-sm font-medium text-muted hover:text-ink"
          >
            <ArrowLeftIcon width={16} height={16} /> All work
          </Link>
          <div className="mt-8 flex flex-wrap items-center gap-2">
            {project.status ? <StatusBadge>{project.status}</StatusBadge> : null}
            <span className="font-mono text-xs text-muted">{project.period}</span>
          </div>
          <h1 className="mt-4 text-4xl font-extrabold tracking-tight text-ink sm:text-5xl">{project.name}</h1>
          <p className="mt-2 font-mono text-sm font-medium tracking-wide text-accent-strong uppercase">
            {project.label}
          </p>
          <p className="mt-5 max-w-2xl text-lg leading-relaxed text-text">{project.tagline}.</p>
          <ProjectLinks project={project} />
        </div>
      </header>

      {/* Visuals */}
      {heroShot ? (
        <div className="border-b border-line bg-slate-50/70">
          <div className="container-page py-12 sm:py-16">
            <div className={`grid items-end gap-8 ${mobile.length ? "lg:grid-cols-[1fr_auto]" : ""}`}>
              <figure>
                <BrowserFrame shot={heroShot} preload sizes="(min-width: 1024px) 860px, 100vw" />
                {heroShot.caption ? (
                  <figcaption className="mt-3 text-center font-mono text-xs text-muted">{heroShot.caption}</figcaption>
                ) : null}
              </figure>
              {mobile.map((m) => (
                <figure key={m.alt} className="mx-auto w-52 sm:w-60">
                  <PhoneFrame shot={m} />
                  {m.caption ? (
                    <figcaption className="mt-3 text-center font-mono text-xs text-muted">{m.caption}</figcaption>
                  ) : null}
                </figure>
              ))}
            </div>
          </div>
        </div>
      ) : null}

      {/* Body */}
      <div className="container-page grid gap-12 py-14 sm:py-20 lg:grid-cols-12">
        <div className="space-y-12 lg:col-span-8">
          <Block title="Context" index="01">
            {project.context.map((p) => (
              <p key={p}>{p}</p>
            ))}
          </Block>

          <Block title="My role" index="02">
            <List items={project.myRole} />
          </Block>

          <Block title={project.slug === "esthejob-cowork" ? "What I did" : "What I built"} index="03">
            <List items={project.built} />
          </Block>

          <Block title="Engineering highlights" index="04">
            <List items={project.highlights} accent />
          </Block>

          {project.flow ? (
            <div className="max-w-xl">
              <FlowDiagram flow={project.flow} />
            </div>
          ) : null}

          {moreDesktop.length ? (
            <div className="space-y-8">
              {moreDesktop.map((s) => (
                <figure key={s.alt}>
                  <BrowserFrame shot={s} sizes="(min-width: 1024px) 760px, 100vw" />
                  {s.caption ? (
                    <figcaption className="mt-3 text-center font-mono text-xs text-muted">{s.caption}</figcaption>
                  ) : null}
                </figure>
              ))}
            </div>
          ) : null}
        </div>

        {/* Sidebar */}
        <aside className="lg:col-span-4" aria-label="Project facts">
          <div className="space-y-6 lg:sticky lg:top-28">
            <dl className="space-y-5 rounded-2xl border border-line bg-white p-6 text-sm">
              <div>
                <dt className="font-mono text-xs text-muted uppercase">Role</dt>
                <dd className="mt-1 font-semibold text-ink">{project.role}</dd>
              </div>
              <div>
                <dt className="font-mono text-xs text-muted uppercase">Period</dt>
                <dd className="mt-1 font-semibold text-ink">{project.period}</dd>
              </div>
              <div>
                <dt className="font-mono text-xs text-muted uppercase">Stack</dt>
                <dd className="mt-2">
                  <ul className="flex flex-wrap gap-1.5">
                    {project.stack.map((s) => (
                      <li
                        key={s}
                        className="rounded-md bg-slate-100 px-2 py-1 font-mono text-[0.72rem] leading-none text-slate-700"
                      >
                        {s}
                      </li>
                    ))}
                  </ul>
                </dd>
              </div>
              {project.links.length ? (
                <div>
                  <dt className="font-mono text-xs text-muted uppercase">Links</dt>
                  <dd className="mt-2">
                    <ul className="space-y-1.5">
                      {project.links.map((l) => (
                        <li key={l.href}>
                          <a
                            href={l.href}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center gap-1.5 font-medium text-accent-strong underline decoration-teal-300 underline-offset-4 hover:decoration-accent"
                          >
                            {l.kind === "github" ? <GitHubIcon width={15} height={15} /> : <ExternalIcon width={15} height={15} />}
                            {l.label}
                          </a>
                        </li>
                      ))}
                    </ul>
                  </dd>
                </div>
              ) : null}
            </dl>

            {project.sourceNote ? (
              <div className="flex gap-3 rounded-2xl border border-line bg-slate-50 p-5 text-sm leading-relaxed">
                <LockIcon width={18} height={18} className="mt-0.5 shrink-0 text-muted" />
                <p>{project.sourceNote}</p>
              </div>
            ) : null}

            <a
              href={`mailto:${site.email}?subject=${encodeURIComponent(`About ${project.name}`)}`}
              className="flex items-center justify-between gap-3 rounded-2xl bg-ink p-5 text-sm font-semibold text-white transition-colors hover:bg-slate-800"
            >
              <span className="flex items-center gap-2.5">
                <MailIcon width={18} height={18} /> Ask me about this project
              </span>
              <ArrowRightIcon width={16} height={16} />
            </a>
          </div>
        </aside>
      </div>

      {/* Next project */}
      <nav aria-label="More work" className="border-t border-line">
        <div className="container-page py-10">
          <Link
            href={`/work/${next.slug}`}
            className="group flex flex-col gap-1 rounded-2xl border border-line p-6 transition-shadow hover:shadow-lg hover:shadow-slate-900/5 sm:flex-row sm:items-center sm:justify-between"
          >
            <span>
              <span className="font-mono text-xs text-muted uppercase">Next case study</span>
              <span className="mt-1 block text-xl font-bold text-ink">{next.name}</span>
              <span className="mt-0.5 block text-sm text-text">{next.tagline}</span>
            </span>
            <ArrowRightIcon
              width={22}
              height={22}
              className="mt-3 text-ink transition-transform group-hover:translate-x-1 sm:mt-0"
            />
          </Link>
        </div>
      </nav>
    </article>
  );
}

function ProjectLinks({ project }: { project: Project }) {
  if (!project.links.length) return null;
  return (
    <div className="mt-8 flex flex-wrap gap-3">
      {project.links.map((l, i) => (
        <ButtonAnchor key={l.href} href={l.href} external variant={i === 0 ? "primary" : "secondary"}>
          {l.kind === "github" ? <GitHubIcon /> : <ExternalIcon />}
          {l.kind === "live" ? `Visit ${l.label}` : l.label}
        </ButtonAnchor>
      ))}
    </div>
  );
}

function Block({ title, index, children }: { title: string; index: string; children: ReactNode }) {
  return (
    <section aria-labelledby={`h-${index}`}>
      <h2 id={`h-${index}`} className="flex items-baseline gap-3 text-2xl font-bold tracking-tight text-ink">
        <span aria-hidden="true" className="font-mono text-sm font-medium text-accent-strong">
          {index}
        </span>
        {title}
      </h2>
      <div className="mt-4 space-y-4 leading-relaxed text-text">{children}</div>
    </section>
  );
}

function List({ items, accent = false }: { items: string[]; accent?: boolean }) {
  return (
    <ul className="space-y-2.5">
      {items.map((it) => (
        <li key={it} className="flex gap-3">
          <span
            aria-hidden="true"
            className={`mt-[0.6rem] size-1.5 shrink-0 rounded-full ${accent ? "bg-accent" : "bg-slate-400"}`}
          />
          <span>{it}</span>
        </li>
      ))}
    </ul>
  );
}
