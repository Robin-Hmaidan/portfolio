import Link from "next/link";
import type { ReactNode } from "react";

import {
  DownloadIcon,
  GitHubIcon,
  LinkedInIcon,
  MailIcon,
  PinIcon,
} from "@/components/icons";
import {
  FeaturedProjectCard,
  ProjectCard,
  SmallProjectCard,
} from "@/components/project-card";
import { ButtonAnchor, Chip, SectionHeading } from "@/components/ui";
import {
  education,
  experience,
  pentestFindings,
  security,
  skills,
  stats,
} from "@/lib/content";
import { projects } from "@/lib/projects";
import { site } from "@/lib/site";

export default function Home() {
  const featured = projects.filter((p) => p.size === "featured");
  const standard = projects.filter((p) => p.size === "standard");
  const small = projects.filter((p) => p.size === "small");

  return (
    <>
      <Hero />

      {/* Selected work */}
      <section aria-labelledby="work" className="scroll-mt-20 py-20 sm:py-28">
        <div className="container-page">
          <SectionHeading
            id="work"
            index="01"
            eyebrow="Selected work"
            title="Production software, shipped"
            intro="Two live products in the esthéJob ecosystem, a POS system used daily by a clothing factory, and projects where I push on AI and security."
          />
          <div className="mt-12 space-y-8">
            {featured.map((p, i) => (
              <FeaturedProjectCard key={p.slug} project={p} reverse={i % 2 === 1} />
            ))}
          </div>
          <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {standard.map((p) => (
              <ProjectCard key={p.slug} project={p} />
            ))}
          </div>
          {small.length ? (
            <div className="mt-6 space-y-4">
              {small.map((p) => (
                <SmallProjectCard key={p.slug} project={p} />
              ))}
            </div>
          ) : null}
        </div>
      </section>

      {/* Security */}
      <section aria-labelledby="security" className="scroll-mt-20 bg-ink py-20 text-slate-300 sm:py-28">
        <div className="container-page">
          <SectionHeading
            id="security"
            index="02"
            eyebrow="Security"
            title="Security on real products"
            intro="Auditing a production SaaS and fixing what I found, designing database access rules, and black-box testing an AI application."
            dark
          />
          <div className="mt-12 grid gap-6 lg:grid-cols-3">
            {security.map((item) => (
              <article
                key={item.title}
                className="flex flex-col rounded-2xl bg-white/[0.03] p-6 ring-1 ring-white/10"
              >
                <p className="font-mono text-xs text-teal-300">[{item.tag}]</p>
                <h3 className="mt-3 text-lg font-semibold text-white">{item.title}</h3>
                <p className="mt-1 text-sm text-slate-400">{item.context}</p>
                <ul className="mt-5 space-y-2.5 text-sm leading-relaxed">
                  {item.points.map((pt) => (
                    <li key={pt} className="flex gap-2.5">
                      <span aria-hidden="true" className="mt-[0.55rem] size-1 shrink-0 rounded-full bg-teal-400" />
                      <span>{pt}</span>
                    </li>
                  ))}
                </ul>
                {item.tag === "pentest" ? (
                  <div className="mt-5 rounded-lg bg-black/30 p-4 font-mono text-[0.78rem] ring-1 ring-white/10">
                    <p className="text-slate-400">findings: {pentestFindings.length}</p>
                    <ul className="mt-2 space-y-1.5">
                      {pentestFindings.map((f, i) => (
                        <li key={f} className="flex gap-2">
                          <span className="shrink-0 whitespace-nowrap text-amber-300">F-{String(i + 1).padStart(2, "0")}</span>
                          <span className="text-slate-200">{f}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                ) : null}
                {item.href ? (
                  <Link
                    href={item.href}
                    className="mt-auto inline-flex items-center gap-1.5 pt-6 text-sm font-semibold text-teal-300 hover:text-teal-200"
                  >
                    Related case study<span aria-hidden="true">→</span>
                    <span className="sr-only">: {item.context}</span>
                  </Link>
                ) : null}
              </article>
            ))}
          </div>
          <p className="mt-10 font-mono text-xs text-slate-400">
            tools: Kali Linux · sqlmap · jwt_tool · OWASP Top 10 · CSP · Row Level Security · Cloudflare Turnstile
          </p>
        </div>
      </section>

      {/* Experience */}
      <section aria-labelledby="experience" className="scroll-mt-20 py-20 sm:py-28">
        <div className="container-page grid gap-12 lg:grid-cols-12">
          <div className="lg:col-span-4">
            <div className="lg:sticky lg:top-28">
              <SectionHeading
                id="experience"
                index="03"
                eyebrow="Experience"
                title="Where I've worked"
                intro="Product work, freelance client projects, and teaching."
              />
            </div>
          </div>
          <ol className="relative space-y-10 border-l border-line pl-6 sm:pl-8 lg:col-span-8">
            {experience.map((job) => (
              <li key={job.title + job.period} className="relative">
                <span
                  aria-hidden="true"
                  className="absolute top-1.5 -left-[calc(1.5rem+5px)] size-2.5 rounded-full bg-accent ring-4 ring-white sm:-left-[calc(2rem+5px)]"
                />
                <p className="font-mono text-xs text-muted">{job.period}</p>
                <h3 className="mt-1 text-lg font-bold text-ink">{job.title}</h3>
                <p className="mt-0.5 text-sm">
                  {job.orgHref ? (
                    <a
                      href={job.orgHref}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="font-semibold text-accent-strong underline decoration-teal-300 underline-offset-4 hover:decoration-accent"
                    >
                      {job.org}
                    </a>
                  ) : (
                    <span className="font-semibold text-accent-strong">{job.org}</span>
                  )}
                  <span className="text-muted"> · {job.location}</span>
                </p>
                <ul className="mt-3 space-y-1.5 text-[0.95rem] leading-relaxed">
                  {job.points.map((pt) => (
                    <li key={pt} className="flex gap-2.5">
                      <span aria-hidden="true" className="mt-[0.6rem] size-1 shrink-0 rounded-full bg-slate-400" />
                      <span>{pt}</span>
                    </li>
                  ))}
                </ul>
                {job.stack ? <p className="mt-3 font-mono text-xs text-muted">{job.stack}</p> : null}

                {job.sub ? (
                  <div className="mt-5 rounded-xl border-l-2 border-accent bg-accent-soft/60 p-4 sm:p-5">
                    <p className="font-mono text-xs text-muted">{job.sub.period}</p>
                    <h4 className="mt-1 font-semibold text-ink">
                      {job.sub.href ? (
                        <a
                          href={job.sub.href}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="underline decoration-teal-300 underline-offset-4 hover:decoration-accent"
                        >
                          {job.sub.title}
                        </a>
                      ) : (
                        job.sub.title
                      )}
                    </h4>
                    <ul className="mt-2 space-y-1.5 text-[0.95rem] leading-relaxed">
                      {job.sub.points.map((pt) => (
                        <li key={pt} className="flex gap-2.5">
                          <span aria-hidden="true" className="mt-[0.6rem] size-1 shrink-0 rounded-full bg-accent" />
                          <span>{pt}</span>
                        </li>
                      ))}
                    </ul>
                    {job.sub.stack ? <p className="mt-3 font-mono text-xs text-muted">{job.sub.stack}</p> : null}
                  </div>
                ) : null}

                {job.caseStudy ? (
                  <Link
                    href={job.caseStudy}
                    className="mt-3 inline-flex items-center gap-1 text-sm font-semibold text-ink hover:text-accent-strong"
                  >
                    Case study<span aria-hidden="true">→</span>
                    <span className="sr-only">: {job.org}</span>
                  </Link>
                ) : null}
              </li>
            ))}
            <li className="relative">
              <span
                aria-hidden="true"
                className="absolute top-1.5 -left-[calc(1.5rem+5px)] size-2.5 rounded-full bg-white ring-2 ring-accent sm:-left-[calc(2rem+5px)]"
              />
              <p className="font-mono text-xs text-muted">{education.period} · Education</p>
              <h3 className="mt-1 text-lg font-bold text-ink">{education.degree}</h3>
              <p className="mt-0.5 text-sm">
                <span className="font-semibold text-accent-strong">{education.school}</span>
                <span className="text-muted"> · {education.location}</span>
              </p>
            </li>
          </ol>
        </div>
      </section>

      {/* Skills */}
      <section aria-labelledby="skills" className="scroll-mt-20 border-y border-line bg-slate-50/70 py-20 sm:py-28">
        <div className="container-page">
          <SectionHeading id="skills" index="04" eyebrow="Skills" title="Tools I work with" />
          <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {skills.map((g) => (
              <div
                key={g.group}
                className={`rounded-2xl border bg-white p-6 ${
                  g.group === "Security" ? "border-teal-200 lg:col-span-2" : g.group === "AI" ? "border-line lg:col-span-2" : "border-line"
                }`}
              >
                <h3 className="flex items-center gap-2 font-semibold text-ink">
                  <span aria-hidden="true" className="font-mono text-accent">
                    #
                  </span>
                  {g.group}
                </h3>
                <ul className="mt-4 flex flex-wrap gap-1.5">
                  {g.items.map((s) => (
                    <Chip key={s}>{s}</Chip>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Contact */}
      <section aria-labelledby="contact" className="scroll-mt-20 py-20 sm:py-28">
        <div className="container-page">
          <div className="relative overflow-hidden rounded-3xl bg-ink px-6 py-14 text-center sm:px-12 sm:py-20">
            <div
              aria-hidden="true"
              className="pointer-events-none absolute inset-0 opacity-40 [background:radial-gradient(60%_80%_at_50%_0%,rgb(13_148_136/0.45),transparent_70%)]"
            />
            <div className="relative">
              <p className="font-mono text-xs font-medium tracking-wider text-teal-300 uppercase">
                <span aria-hidden="true">05 / </span>Contact
              </p>
              <h2 id="contact" className="mt-3 text-3xl font-bold tracking-tight text-white sm:text-4xl">
                Let&apos;s talk
              </h2>
              <p className="mx-auto mt-4 max-w-xl text-slate-300 sm:text-lg">
                I&apos;m looking for full-stack roles in Lebanon, the Gulf, or remote with EU companies.
                Email is the fastest way to reach me.
              </p>
              <a
                href={`mailto:${site.email}`}
                className="mt-8 inline-flex items-center gap-2.5 rounded-xl bg-white px-5 py-3 font-mono text-sm font-medium text-ink shadow-lg shadow-black/20 transition-colors hover:bg-teal-50 sm:text-base"
              >
                <MailIcon />
                {site.email}
              </a>
              <div className="mt-6 flex flex-wrap items-center justify-center gap-3">
                <ButtonAnchor
                  href={site.github}
                  external
                  variant="ghost"
                  className="text-white ring-1 ring-white/20 hover:bg-white/10"
                >
                  <GitHubIcon /> GitHub
                </ButtonAnchor>
                {site.linkedin ? (
                  <ButtonAnchor
                    href={site.linkedin}
                    external
                    variant="ghost"
                    className="text-white ring-1 ring-white/20 hover:bg-white/10"
                  >
                    <LinkedInIcon /> LinkedIn
                  </ButtonAnchor>
                ) : null}
                <ButtonAnchor
                  href={site.cvPath}
                  download
                  variant="ghost"
                  className="text-white ring-1 ring-white/20 hover:bg-white/10"
                >
                  <DownloadIcon /> Download CV <span className="sr-only">(PDF)</span>
                </ButtonAnchor>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

function Hero() {
  return (
    <section aria-labelledby="hero-title" className="relative overflow-hidden border-b border-line">
      <div
        aria-hidden="true"
        className="bg-grid pointer-events-none absolute inset-0 [mask-image:linear-gradient(to_bottom,black,transparent_85%)]"
      />
      <div className="container-page relative pt-14 pb-16 sm:pt-20 sm:pb-20 lg:pt-24">
        <div className="grid items-center gap-12 lg:grid-cols-12">
          <div className="lg:col-span-7">
            <p className="inline-flex items-center gap-2 rounded-full bg-accent-soft px-3 py-1 font-mono text-xs font-medium text-accent-strong ring-1 ring-teal-200">
              <span aria-hidden="true" className="relative flex size-2">
                <span className="absolute inline-flex size-full animate-ping rounded-full bg-accent opacity-60" />
                <span className="relative inline-flex size-2 rounded-full bg-accent" />
              </span>
              Open to full-stack roles
            </p>
            <h1 id="hero-title" className="mt-6 text-5xl font-extrabold tracking-tight text-ink sm:text-6xl">
              {site.name}
            </h1>
            <p className="mt-3 text-xl font-semibold text-accent-strong sm:text-2xl">{site.role}</p>
            <p className="mt-6 max-w-xl text-lg leading-relaxed text-text">{site.pitch}</p>
            <p className="mt-5 inline-flex items-center gap-2 text-sm text-muted">
              <PinIcon width={16} height={16} className="text-accent" />
              {site.location}
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <ButtonAnchor href={site.cvPath} download>
                <DownloadIcon /> Download CV <span className="sr-only">(PDF)</span>
              </ButtonAnchor>
              <ButtonAnchor href={site.github} external variant="secondary">
                <GitHubIcon /> GitHub
              </ButtonAnchor>
              <ButtonAnchor href={`mailto:${site.email}`} variant="secondary">
                <MailIcon /> Email
              </ButtonAnchor>
            </div>
          </div>

          <div className="lg:col-span-5">
            <Terminal />
          </div>
        </div>

        <dl className="mt-14 grid grid-cols-2 gap-3 sm:gap-4 lg:grid-cols-4">
          {stats.map((s) => (
            <div
              key={s.label}
              className="flex flex-col rounded-r-xl border-l-[3px] border-accent bg-accent-soft px-4 py-4 sm:px-5"
            >
              <dt className="text-sm text-muted">{s.label}</dt>
              <dd className="order-first text-2xl font-extrabold tracking-tight text-ink sm:text-3xl">{s.value}</dd>
            </div>
          ))}
        </dl>
      </div>
    </section>
  );
}

function Terminal() {
  const lines: { cmd: string; out: ReactNode }[] = [
    { cmd: "whoami", out: "full-stack developer · BSc Computer Science" },
    { cmd: "cat stack.txt", out: "Next.js · TypeScript · PostgreSQL · Supabase · Stripe" },
    {
      cmd: "ls ~/live",
      out: (
        <span className="flex flex-wrap gap-x-4">
          <a
            href="https://esthejob.fr"
            target="_blank"
            rel="noopener noreferrer"
            className="text-teal-300 underline decoration-teal-300/40 underline-offset-2 hover:decoration-teal-300"
          >
            esthejob.fr
          </a>
          <a
            href="https://cowork.esthejob.fr"
            target="_blank"
            rel="noopener noreferrer"
            className="text-teal-300 underline decoration-teal-300/40 underline-offset-2 hover:decoration-teal-300"
          >
            cowork.esthejob.fr
          </a>
        </span>
      ),
    },
    { cmd: "cat security.txt", out: "audits · RLS · CSP · web pentesting" },
  ];
  return (
    <figure className="overflow-hidden rounded-2xl bg-ink shadow-2xl shadow-slate-900/25 ring-1 ring-slate-900/10">
      <div className="flex items-center gap-2 border-b border-white/10 px-4 py-3">
        <span aria-hidden="true" className="flex gap-1.5">
          <span className="size-2.5 rounded-full bg-[#ff5f57]" />
          <span className="size-2.5 rounded-full bg-[#febc2e]" />
          <span className="size-2.5 rounded-full bg-[#28c840]" />
        </span>
        <figcaption className="mx-auto pr-10 font-mono text-xs text-slate-400">robin@hmaidan: ~</figcaption>
      </div>
      <div className="space-y-3 p-5 font-mono text-[0.8rem] leading-relaxed sm:p-6 sm:text-sm">
        {lines.map((l) => (
          <div key={l.cmd}>
            <p className="text-slate-100">
              <span aria-hidden="true" className="text-teal-300 select-none">
                ${" "}
              </span>
              {l.cmd}
            </p>
            <div className="text-slate-400">{l.out}</div>
          </div>
        ))}
        <p className="text-slate-100" aria-hidden="true">
          <span className="text-teal-300">$ </span>
          <span className="caret inline-block h-4 w-2 translate-y-0.5 bg-teal-300" />
        </p>
      </div>
    </figure>
  );
}
