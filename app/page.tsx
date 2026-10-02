import Link from "next/link";

import { ArrowRightIcon, DownloadIcon, ExternalIcon } from "@/components/icons";
import { Marquee } from "@/components/marquee";
import { CountUp } from "@/components/motion/count-up";
import {
  AuditProject,
  FeaturedProject,
  ImageProject,
  MinorProject,
  TextProject,
} from "@/components/project-card";
import { ButtonAnchor, SectionTitle, delay, stagger } from "@/components/ui";
import { education, experience, pentestFindings, security, skills, stats } from "@/lib/content";
import { projects } from "@/lib/projects";
import { site } from "@/lib/site";

/** Tech shown in the marquee: all of it is listed in the skills below (and on the CV) */
const marqueeStack = [
  "Next.js",
  "TypeScript",
  "PostgreSQL",
  "Supabase",
  "React",
  "Stripe",
  "Node.js",
  "Tailwind CSS",
  "Playwright",
  "GitHub Actions",
  "Sentry",
  "Vercel",
  "Claude API",
  "Kali Linux",
];

const commaList = (s: string) => s.split(" · ").join(", ");

export default function Home() {
  const featured = projects.filter((p) => p.size === "featured");
  const withShots = projects.filter((p) => p.size === "standard" && p.shots.length > 0);
  const textOnly = projects.filter((p) => p.size === "standard" && p.shots.length === 0);
  const small = projects.filter((p) => p.size === "small");

  return (
    <>
      <Hero />

      {/* Selected work */}
      <section aria-labelledby="work" className="scroll-mt-20 pt-16 pb-24 sm:pt-24 sm:pb-36">
        <div className="container-page">
          <SectionTitle
            id="work"
            title="Selected work"
            intro="Two live products in the esthéJob ecosystem, a POS system used daily by a clothing factory, and projects where I push on AI and security."
          />

          <div className="mt-16 space-y-28 sm:mt-20 sm:space-y-36">
            {featured.map((p) =>
              p.cardVisual === "audit" ? (
                <AuditProject key={p.slug} project={p} />
              ) : (
                <FeaturedProject key={p.slug} project={p} />
              ),
            )}
          </div>

          <div className="mt-28 grid gap-x-16 gap-y-20 sm:mt-36 lg:grid-cols-12">
            <div className="space-y-20 lg:col-span-7">
              {withShots.map((p) => (
                <ImageProject key={p.slug} project={p} />
              ))}
            </div>
            <div className="space-y-16 lg:col-span-5 lg:pt-28">
              {textOnly.map((p, i) => (
                <TextProject key={p.slug} project={p} index={i} />
              ))}
            </div>
          </div>

          {small.length ? (
            <div className="mt-24 space-y-10">
              {small.map((p) => (
                <MinorProject key={p.slug} project={p} />
              ))}
            </div>
          ) : null}
        </div>
      </section>

      {/* Security */}
      <section aria-labelledby="security" className="scroll-mt-20 bg-ink py-24 text-slate-300 sm:py-36">
        <div className="container-page">
          <SectionTitle
            id="security"
            title="Security on real products"
            intro="Auditing a production SaaS and fixing what I found, designing database access rules, and black-box testing an AI application."
            dark
          />
          <div className="mt-16 space-y-20 sm:mt-24 sm:space-y-24">
            {security.map((item) => (
              <article key={item.title} data-reveal="" className="grid gap-8 lg:grid-cols-12">
                <div className="lg:col-span-5">
                  <h3 className="text-2xl font-bold tracking-tight text-white sm:text-3xl">{item.title}</h3>
                  <p className="mt-2 text-slate-400">{item.context}</p>
                  {item.href ? (
                    <Link
                      href={item.href}
                      className="group mt-5 inline-flex items-center gap-2 text-sm font-semibold text-teal-300 hover:text-teal-200"
                    >
                      <span className="link-underline">Related case study</span>
                      <ArrowRightIcon
                        width={16}
                        height={16}
                        className="transition-transform duration-300 ease-expo group-hover:translate-x-1"
                      />
                      <span className="sr-only">: {item.context}</span>
                    </Link>
                  ) : null}
                </div>
                <div className="lg:col-span-7">
                  <ul
                    className={`grid gap-x-10 gap-y-3.5 leading-relaxed ${item.points.length > 3 ? "sm:grid-cols-2" : ""}`}
                  >
                    {item.points.map((pt, i) => (
                      <li key={pt} data-reveal="" style={stagger(i)} className="flex gap-3">
                        <span aria-hidden="true" className="mt-[0.7rem] h-px w-3 shrink-0 bg-teal-400" />
                        <span>{pt}</span>
                      </li>
                    ))}
                  </ul>
                  {item.tag === "pentest" ? (
                    <div className="mt-10 flex flex-col gap-3 sm:flex-row sm:items-center sm:gap-8">
                      <p className="text-7xl leading-none font-bold tracking-tight text-white tabular-nums">
                        {pentestFindings.length}
                      </p>
                      <div>
                        <p className="font-semibold text-white">vulnerabilities found and documented</p>
                        <p className="mt-1 text-slate-400">{pentestFindings.join(", ")}</p>
                      </div>
                    </div>
                  ) : null}
                </div>
              </article>
            ))}
          </div>
          <p data-reveal="" className="mt-20 max-w-3xl text-sm leading-relaxed text-slate-400 sm:mt-24">
            <span className="font-semibold text-slate-200">Tools: </span>
            Kali Linux, sqlmap, jwt_tool, OWASP Top 10, CSP, Row Level Security, Cloudflare Turnstile
          </p>
        </div>
      </section>

      {/* Experience */}
      <section aria-labelledby="experience" className="scroll-mt-20 py-24 sm:py-36">
        <div className="container-page">
          <SectionTitle
            id="experience"
            title="Where I've worked"
            intro="Product work, freelance client projects, and teaching."
          />
          <ol className="mt-16 space-y-20 sm:mt-24">
            {experience.map((job) => (
              <li key={job.title + job.period} data-reveal="" className="grid gap-4 lg:grid-cols-12 lg:gap-10">
                <div className="lg:col-span-3 lg:pt-2">
                  <p className="text-sm font-semibold text-ink tabular-nums">{job.period}</p>
                  <p className="mt-0.5 text-sm text-muted">{job.location}</p>
                </div>
                <div className="lg:col-span-9">
                  <h3 className="text-2xl font-bold tracking-tight text-ink sm:text-[1.7rem]">{job.title}</h3>
                  <p className="mt-1 text-lg">
                    {job.orgHref ? (
                      <a
                        href={job.orgHref}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="link-underline font-medium text-accent-strong"
                      >
                        {job.org}
                      </a>
                    ) : (
                      <span className="font-medium text-accent-strong">{job.org}</span>
                    )}
                  </p>
                  <ul className="mt-4 max-w-3xl space-y-2 leading-relaxed">
                    {job.points.map((pt) => (
                      <li key={pt} className="flex gap-3">
                        <span aria-hidden="true" className="mt-[0.7rem] h-px w-3 shrink-0 bg-slate-400" />
                        <span>{pt}</span>
                      </li>
                    ))}
                  </ul>
                  {job.stack ? <p className="mt-4 text-sm text-muted">{commaList(job.stack)}</p> : null}

                  {job.sub ? (
                    <div className="mt-8 rounded-3xl bg-slate-50 p-6 sm:p-8">
                      <p className="text-sm font-semibold text-ink tabular-nums">{job.sub.period}</p>
                      <h4 className="mt-1 text-lg font-bold text-ink">
                        {job.sub.href ? (
                          <a href={job.sub.href} target="_blank" rel="noopener noreferrer" className="link-underline">
                            {job.sub.title}
                          </a>
                        ) : (
                          job.sub.title
                        )}
                      </h4>
                      <ul className="mt-3 space-y-2 leading-relaxed">
                        {job.sub.points.map((pt) => (
                          <li key={pt} className="flex gap-3">
                            <span aria-hidden="true" className="mt-[0.7rem] h-px w-3 shrink-0 bg-accent" />
                            <span>{pt}</span>
                          </li>
                        ))}
                      </ul>
                      {job.sub.stack ? <p className="mt-4 text-sm text-muted">{commaList(job.sub.stack)}</p> : null}
                    </div>
                  ) : null}

                  {job.caseStudy ? (
                    <Link
                      href={job.caseStudy}
                      className="group mt-5 inline-flex items-center gap-2 text-sm font-semibold text-ink"
                    >
                      <span className="link-underline">Case study</span>
                      <ArrowRightIcon
                        width={16}
                        height={16}
                        className="transition-transform duration-300 ease-expo group-hover:translate-x-1"
                      />
                      <span className="sr-only">: {job.org}</span>
                    </Link>
                  ) : null}
                </div>
              </li>
            ))}
            <li data-reveal="" className="grid gap-4 lg:grid-cols-12 lg:gap-10">
              <div className="lg:col-span-3 lg:pt-2">
                <p className="text-sm font-semibold text-ink tabular-nums">{education.period}</p>
                <p className="mt-0.5 text-sm text-muted">Education</p>
              </div>
              <div className="lg:col-span-9">
                <h3 className="text-2xl font-bold tracking-tight text-ink sm:text-[1.7rem]">{education.degree}</h3>
                <p className="mt-1 text-lg">
                  <span className="font-medium text-accent-strong">{education.school}</span>
                  <span className="text-muted"> · {education.location}</span>
                </p>
              </div>
            </li>
          </ol>
        </div>
      </section>

      {/* Skills */}
      <section aria-labelledby="skills" className="scroll-mt-20 bg-slate-50 py-24 sm:py-36">
        <div className="container-page">
          <SectionTitle id="skills" title="Tools I work with" />
        </div>
        <div className="mt-12 sm:mt-16">
          <Marquee items={marqueeStack} />
        </div>
        <div className="container-page">
          <dl className="mt-14 grid gap-x-12 gap-y-10 sm:mt-20 sm:grid-cols-2 lg:grid-cols-3">
            {skills.map((g, i) => (
              <div key={g.group} data-reveal="" style={stagger(i % 3)}>
                <dt className="text-sm font-semibold tracking-wide text-ink uppercase">{g.group}</dt>
                <dd className="mt-3 leading-relaxed text-text">{g.items.join(", ")}</dd>
              </div>
            ))}
          </dl>
        </div>
      </section>

      {/* Contact */}
      <section aria-labelledby="contact" className="scroll-mt-20 py-28 sm:py-40">
        <div className="container-page">
          <h2 id="contact" data-reveal="" className="text-display font-extrabold text-ink">
            Let&apos;s talk<span className="text-accent">.</span>
          </h2>
          <div data-reveal="" style={stagger(1)} className="mt-10 grid gap-10 lg:mt-14 lg:grid-cols-12 lg:items-end">
            <p className="max-w-xl text-lg leading-relaxed text-text sm:text-xl lg:col-span-6">
              I&apos;m looking for full-stack roles in Lebanon, the Gulf, or remote with EU companies. Email is the
              fastest way to reach me.
            </p>
            <div className="lg:col-span-6 lg:text-right">
              <a
                href={`mailto:${site.email}`}
                className="link-underline-strong text-2xl font-semibold tracking-tight [overflow-wrap:anywhere] text-ink sm:text-4xl"
              >
                {site.email}
              </a>
              <ul className="mt-7 flex flex-wrap gap-x-7 gap-y-3 text-sm font-semibold text-ink lg:justify-end">
                <li>
                  <a href={site.github} target="_blank" rel="noopener noreferrer" className="group inline-flex items-center gap-1.5">
                    <span className="link-underline">GitHub</span>
                    <ExternalIcon width={14} height={14} className="text-muted" />
                  </a>
                </li>
                {site.linkedin ? (
                  <li>
                    <a href={site.linkedin} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-1.5">
                      <span className="link-underline">LinkedIn</span>
                      <ExternalIcon width={14} height={14} className="text-muted" />
                    </a>
                  </li>
                ) : null}
                <li>
                  <a href={site.cvPath} download className="inline-flex items-center gap-1.5">
                    <span className="link-underline">Download CV</span>
                    <DownloadIcon width={14} height={14} className="text-muted" />
                    <span className="sr-only">(PDF)</span>
                  </a>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

function Hero() {
  const words = site.name.split(" ");
  return (
    <section aria-labelledby="hero-title">
      <div className="container-page pt-8 pb-16 sm:pt-16 sm:pb-24 lg:pt-20 lg:pb-24">
        <div className="grid gap-14 lg:grid-cols-12 lg:items-end lg:gap-10">
          <div className="lg:col-span-8">
            <p className="enter text-sm font-medium text-muted sm:text-base" style={delay(0)}>
              Founding full-stack developer at{" "}
              <a
                href="https://esthejob.fr"
                target="_blank"
                rel="noopener noreferrer"
                className="link-underline-strong font-semibold text-ink"
              >
                esthéJob
              </a>
              <span aria-hidden="true" className="mx-2 text-slate-300">
                /
              </span>
              <span className="whitespace-nowrap">{site.location}</span>
            </p>

            <h1 id="hero-title" className="text-display mt-6 font-extrabold text-ink sm:mt-8">
              {words.map((w, i) => (
                <span key={w} className="mr-[0.2em] inline-block overflow-hidden pb-[0.06em] align-bottom last:mr-0">
                  <span className="enter-word" style={delay(90 + i * 110)}>
                    {w}
                  </span>
                </span>
              ))}
            </h1>

            <p
              className="enter mt-8 max-w-3xl text-[1.2rem] leading-snug tracking-[-0.01em] text-muted sm:text-[1.75rem]"
              style={delay(380)}
            >
              <span className="font-semibold text-ink">{site.role}.</span> {site.pitch}
            </p>

            <div className="enter mt-10 flex flex-wrap items-center gap-x-6 gap-y-4 sm:gap-x-7" style={delay(540)}>
              <ButtonAnchor href={site.cvPath} download>
                <DownloadIcon /> Download CV <span className="sr-only">(PDF)</span>
              </ButtonAnchor>
              <span className="flex items-center gap-x-6 sm:gap-x-7">
                <a href={`mailto:${site.email}`} className="link-underline text-sm font-semibold text-ink">
                  Email me
                </a>
                <a
                  href={site.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="link-underline text-sm font-semibold text-ink"
                >
                  GitHub
                </a>
                {site.linkedin ? (
                  <a
                    href={site.linkedin}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="link-underline text-sm font-semibold text-ink"
                  >
                    LinkedIn
                  </a>
                ) : null}
              </span>
            </div>
          </div>

          <dl className="grid grid-cols-2 gap-x-6 gap-y-9 lg:col-span-4 lg:grid-cols-1 lg:gap-y-7 lg:pl-10">
            {stats.map((s, i) => (
              <div key={s.label} data-count-host="" className="enter flex flex-col" style={delay(680 + i * 90)}>
                <dt className="mt-1 text-sm leading-snug text-muted">{s.label}</dt>
                <dd className="order-first text-4xl font-bold tracking-[-0.04em] text-ink sm:text-5xl">
                  <CountUp value={s.value} />
                </dd>
              </div>
            ))}
          </dl>
        </div>
      </div>
    </section>
  );
}
