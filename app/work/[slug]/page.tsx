import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import type { ReactNode } from "react";

import { BrowserFrame, PhoneFrame } from "@/components/frames";
import { ArrowLeftIcon, ArrowRightIcon, ExternalIcon, GitHubIcon, LockIcon, MailIcon } from "@/components/icons";
import { ScrollFx } from "@/components/motion/scroll-fx";
import { FlowSteps } from "@/components/project-card";
import { ButtonAnchor, ProjectMeta, delay, stagger } from "@/components/ui";
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
      <header className="container-page pt-10 pb-14 sm:pt-14 sm:pb-20">
        <Link
          href="/#work"
          className="enter group inline-flex items-center gap-2 text-sm font-medium text-muted hover:text-ink"
        >
          <ArrowLeftIcon
            width={16}
            height={16}
            className="transition-transform duration-300 ease-expo group-hover:-translate-x-1"
          />
          <span className="link-underline">All work</span>
        </Link>
        <ProjectMeta status={project.status} period={project.period} className="enter mt-10 sm:mt-14" />
        <h1 className="mt-4 text-[clamp(2.75rem,8vw,5.5rem)] leading-[0.95] font-extrabold tracking-[-0.045em] text-ink">
          <span className="inline-block overflow-hidden pb-[0.08em] align-bottom">
            <span className="enter-word" style={delay(80)}>
              {project.name}
            </span>
          </span>
        </h1>
        <p className="enter mt-3 text-lg font-medium text-accent-strong sm:text-xl" style={delay(220)}>
          {project.label}
        </p>
        <p
          className="enter mt-6 max-w-3xl text-[1.3rem] leading-snug tracking-[-0.01em] text-muted sm:text-[1.6rem]"
          style={delay(320)}
        >
          {project.tagline}.
        </p>
        <ProjectLinks project={project} />
      </header>

      {/* Visuals */}
      {heroShot ? (
        <div className="overflow-hidden bg-slate-50">
          <div className="container-page py-12 sm:py-20">
            <div className={`grid items-end gap-10 ${mobile.length ? "lg:grid-cols-[1fr_auto]" : ""}`}>
              <figure className="enter" style={delay(450)}>
                <ScrollFx scale={[1, 0.95]} offset={["start 0.4", "end start"]} className="origin-top">
                  <BrowserFrame shot={heroShot} preload sizes="(min-width: 1024px) 860px, 100vw" />
                </ScrollFx>
                {heroShot.caption ? (
                  <figcaption className="mt-4 text-center text-sm text-muted">{heroShot.caption}</figcaption>
                ) : null}
              </figure>
              {mobile.map((m, i) => (
                <figure key={m.alt} className="enter mx-auto w-52 sm:w-60" style={delay(600 + i * 120)}>
                  <ScrollFx y={[0, -60]} offset={["start 0.6", "end start"]}>
                    <PhoneFrame shot={m} />
                  </ScrollFx>
                  {m.caption ? <figcaption className="mt-4 text-center text-sm text-muted">{m.caption}</figcaption> : null}
                </figure>
              ))}
            </div>
          </div>
        </div>
      ) : null}

      {/* Body */}
      <div className="container-page grid gap-16 py-16 sm:py-24 lg:grid-cols-12 lg:gap-12">
        <div className="space-y-16 lg:col-span-8">
          <Block title="Context" id="context">
            {project.context.map((p) => (
              <p key={p}>{p}</p>
            ))}
          </Block>

          <Block title="My role" id="role">
            <List items={project.myRole} />
          </Block>

          <Block title={project.slug === "esthejob-cowork" ? "What I did" : "What I built"} id="built">
            <List items={project.built} />
          </Block>

          <Block title="Engineering highlights" id="highlights">
            <List items={project.highlights} accent />
          </Block>

          {project.flow ? (
            <div data-reveal="" className="max-w-xl rounded-3xl bg-slate-50 p-7 sm:p-10">
              <FlowSteps flow={project.flow} variant="list" />
            </div>
          ) : null}

          {moreDesktop.length ? (
            <div className="space-y-12">
              {moreDesktop.map((s) => (
                <figure key={s.alt} data-reveal="">
                  <ScrollFx scale={[0.94, 1]} offset={["start end", "start 0.45"]} className="origin-top">
                    <BrowserFrame shot={s} sizes="(min-width: 1024px) 760px, 100vw" />
                  </ScrollFx>
                  {s.caption ? <figcaption className="mt-4 text-center text-sm text-muted">{s.caption}</figcaption> : null}
                </figure>
              ))}
            </div>
          ) : null}
        </div>

        {/* Sidebar */}
        <aside className="lg:col-span-4" aria-label="Project facts">
          <div data-reveal="" style={stagger(1)} className="space-y-10 lg:sticky lg:top-28">
            <dl className="space-y-7">
              <Fact label="Role">
                <span className="font-semibold text-ink">{project.role}</span>
              </Fact>
              <Fact label="Period">
                <span className="font-semibold text-ink">{project.period}</span>
              </Fact>
              <Fact label="Stack">
                <span className="leading-relaxed text-text">{project.stack.join(", ")}</span>
              </Fact>
              {project.links.length ? (
                <Fact label="Links">
                  <ul className="space-y-1.5">
                    {project.links.map((l) => (
                      <li key={l.href}>
                        <a
                          href={l.href}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center gap-1.5 font-semibold text-accent-strong"
                        >
                          {l.kind === "github" ? (
                            <GitHubIcon width={15} height={15} />
                          ) : (
                            <ExternalIcon width={15} height={15} />
                          )}
                          <span className="link-underline">{l.label}</span>
                        </a>
                      </li>
                    ))}
                  </ul>
                </Fact>
              ) : null}
            </dl>

            {project.sourceNote ? (
              <p className="flex gap-3 text-sm leading-relaxed text-muted">
                <LockIcon width={16} height={16} className="mt-0.5 shrink-0" />
                <span>{project.sourceNote}</span>
              </p>
            ) : null}

            <a
              href={`mailto:${site.email}?subject=${encodeURIComponent(`About ${project.name}`)}`}
              className="group flex items-center justify-between gap-3 rounded-full bg-ink py-4 pr-5 pl-6 text-sm font-semibold text-white transition-[background-color,translate] duration-300 ease-expo hover:-translate-y-0.5 hover:bg-slate-800"
            >
              <span className="flex items-center gap-2.5">
                <MailIcon width={18} height={18} /> Ask me about this project
              </span>
              <ArrowRightIcon
                width={16}
                height={16}
                className="transition-transform duration-300 ease-expo group-hover:translate-x-1"
              />
            </a>
          </div>
        </aside>
      </div>

      {/* Next project */}
      <nav aria-label="More work" className="bg-slate-50">
        <div className="container-page py-16 sm:py-24">
          <Link href={`/work/${next.slug}`} data-reveal="" className="group block">
            <span className="text-sm font-semibold tracking-wide text-muted uppercase">Next case study</span>
            <span className="mt-3 flex items-center gap-4 sm:gap-6">
              <span className="text-[clamp(2.25rem,6vw,4.5rem)] leading-none font-extrabold tracking-[-0.04em] text-ink transition-colors duration-300 group-hover:text-accent-strong">
                {next.name}
              </span>
              <ArrowRightIcon
                width={40}
                height={40}
                className="shrink-0 text-ink transition-transform duration-500 ease-expo group-hover:translate-x-3 max-sm:size-7"
              />
            </span>
            <span className="mt-3 block max-w-2xl text-text">{next.tagline}</span>
          </Link>
        </div>
      </nav>
    </article>
  );
}

function ProjectLinks({ project }: { project: Project }) {
  if (!project.links.length) return null;
  return (
    <div className="enter mt-10 flex flex-wrap gap-3" style={delay(420)}>
      {project.links.map((l, i) => (
        <ButtonAnchor key={l.href} href={l.href} external variant={i === 0 ? "primary" : "secondary"}>
          {l.kind === "github" ? <GitHubIcon /> : <ExternalIcon />}
          {l.kind === "live" ? `Visit ${l.label}` : l.label}
        </ButtonAnchor>
      ))}
    </div>
  );
}

function Fact({ label, children }: { label: string; children: ReactNode }) {
  return (
    <div>
      <dt className="text-xs font-semibold tracking-wide text-muted uppercase">{label}</dt>
      <dd className="mt-1.5">{children}</dd>
    </div>
  );
}

function Block({ title, id, children }: { title: string; id: string; children: ReactNode }) {
  return (
    <section aria-labelledby={`h-${id}`} data-reveal="">
      <h2 id={`h-${id}`} className="text-3xl font-bold tracking-[-0.03em] text-ink sm:text-4xl">
        {title}
      </h2>
      <div className="mt-5 space-y-4 text-[1.05rem] leading-relaxed text-text">{children}</div>
    </section>
  );
}

function List({ items, accent = false }: { items: string[]; accent?: boolean }) {
  return (
    <ul className="space-y-3">
      {items.map((it) => (
        <li key={it} className="flex gap-3.5">
          <span
            aria-hidden="true"
            className={`mt-[0.8rem] h-px w-3.5 shrink-0 ${accent ? "bg-accent" : "bg-slate-400"}`}
          />
          <span>{it}</span>
        </li>
      ))}
    </ul>
  );
}
